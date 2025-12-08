import { createClient } from '@supabase/supabase-js';

// --- CẤU HÌNH SUPABASE ONLINE (ƯU TIÊN BIẾN MÔI TRƯỜNG) ---
const meta = import.meta as any;
const env = meta.env || {};
const envUrl = env.VITE_SUPABASE_URL;
const envKey = env.VITE_SUPABASE_ANON_KEY;

// Kiểm tra xem có cấu hình online không
const hasEnvConfig = envUrl && envKey && envUrl.startsWith('http');

// --- MOCK CLIENT (CHẠY OFFLINE KHI CHƯA CÓ KEY) ---
class MockSupabaseClient {
  private authListeners: Function[] = [];

  private getLocal(table: string) {
    return JSON.parse(localStorage.getItem(`supamock_${table}`) || '[]');
  }
  private setLocal(table: string, data: any[]) {
    localStorage.setItem(`supamock_${table}`, JSON.stringify(data));
  }
  
  private notifyAuthListeners(event: string, session: any) {
      this.authListeners.forEach(cb => cb(event, session));
  }

  auth = {
    getSession: async () => {
      const userStr = localStorage.getItem('supamock_user');
      const user = userStr ? JSON.parse(userStr) : null;
      return { data: { session: user ? { user } : null }, error: null };
    },
    signInWithPassword: async ({ email, password }: any) => {
      const users = this.getLocal('auth_users');
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('supamock_user', JSON.stringify(user));
        const session = { user };
        this.notifyAuthListeners('SIGNED_IN', session);
        return { data: { user, session }, error: null };
      }
      return { data: null, error: { message: "Sai tài khoản hoặc mật khẩu" } };
    },
    signUp: async ({ email, password }: any) => {
      const users = this.getLocal('auth_users');
      if (users.find((u: any) => u.email === email)) return { data: null, error: { message: "Email đã tồn tại" } };
      const newUser = { id: 'user_' + Date.now(), email, password };
      users.push(newUser);
      this.setLocal('auth_users', users);
      // Removed auto-login logic here to force manual login
      return { data: { user: newUser, session: null }, error: null };
    },
    signOut: async () => {
      localStorage.removeItem('supamock_user');
      this.notifyAuthListeners('SIGNED_OUT', null);
      return { error: null };
    },
    onAuthStateChange: (callback: any) => {
        this.authListeners.push(callback);
        return { data: { subscription: { unsubscribe: () => {
            this.authListeners = this.authListeners.filter(cb => cb !== callback);
        } } } };
    }
  };

  from(table: string) {
    const db = this;
    let queryData = this.getLocal(table);
    let single = false;

    const builder: any = {
      select: (cols?: string) => {
          if (table === 'players') {
             queryData = queryData.map((p:any, idx: number) => {
                 if(!p.rank) p.rank = idx + 1;
                 return p;
             });
          }
          return builder;
      },
      insert: (rows: any[]) => {
        const newData = rows.map(r => ({ ...r, id: r.id || `${table}_${Date.now()}_${Math.random()}`, created_at: new Date().toISOString() }));
        const current = db.getLocal(table);
        if (table === 'players') {
            const maxRank = current.length > 0 ? Math.max(...current.map((c:any) => c.rank || 0)) : 0;
            newData.forEach((d:any) => d.rank = maxRank + 1);
        }
        db.setLocal(table, [...current, ...newData]);
        queryData = newData;
        return builder;
      },
      update: (updates: any) => {
          builder._updates = updates;
          return builder;
      },
      delete: () => {
          builder._isDelete = true;
          return builder;
      },
      eq: (col: string, val: any) => {
        if (builder._updates) {
             const current = db.getLocal(table);
             const updated = current.map((row: any) => row[col] === val ? { ...row, ...builder._updates } : row);
             db.setLocal(table, updated);
             queryData = updated.filter((row: any) => row[col] === val);
        } else if (builder._isDelete) {
             const current = db.getLocal(table);
             const remaining = current.filter((row: any) => row[col] !== val);
             db.setLocal(table, remaining);
             queryData = []; 
        } else {
             queryData = queryData.filter((row: any) => row[col] === val);
        }
        return builder;
      },
      ilike: (col: string, val: string) => {
        const pattern = val.replace(/%/g, '').toLowerCase();
        queryData = queryData.filter((row: any) => 
            row[col] && row[col].toString().toLowerCase().includes(pattern)
        );
        return builder;
      },
      order: (col: string, { ascending }: any) => {
        queryData.sort((a: any, b: any) => ascending ? a[col] - b[col] : b[col] - a[col]);
        return builder;
      },
      limit: (n: number) => {
        queryData = queryData.slice(0, n);
        return builder;
      },
      single: () => {
        single = true;
        return builder;
      },
      then: (resolve: any) => {
        if (single) {
            resolve({ data: queryData[0] || null, error: null });
        } else {
            resolve({ data: queryData, error: null });
        }
      }
    };
    return builder;
  }

  channel(name: string) {
      const builder: any = {
          on: (event: any, schema: any, callback: any) => {
              return builder; 
          },
          subscribe: () => {
              return builder;
          },
          unsubscribe: () => {},
          removeChannel: () => {}
      };
      return builder;
  }
  
  removeChannel() {}
}

export const supabase = hasEnvConfig ? createClient(envUrl, envKey) : new MockSupabaseClient() as any;
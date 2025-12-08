
import React from 'react';

export interface PlayerStats {
  hp: number; atk: number; def: number; speed: number; breakthroughChance?: number;
  lifestealPercent?: number;
  cultivationSpeedPercent?: number;
}

export enum ItemType { RESOURCE = 'resource', EQUIPMENT = 'equipment' }
export enum ItemRarity { GREY = 'grey', GREEN = 'green', BLUE = 'blue', PURPLE = 'purple', GOLD = 'gold', ORANGE = 'orange', RED = 'red' }
export enum EquipSlot { WEAPON = 'weapon', HEAD = 'head', BODY = 'body', RING = 'ring', FEET = 'feet', AMULET = 'amulet' }

export interface ItemStats {
  hp?: number; atk?: number; def?: number; speed?: number; breakthroughChance?: number;
  hpPercent?: number; atkPercent?: number; defPercent?: number;
  lifestealPercent?: number; cultivationSpeedPercent?: number;
}

export interface StatLine { code: string; value: number; isMain: boolean; }

export interface Item {
  id: string; name: string; type: ItemType; rarity: ItemRarity; description: string; value: number;
  slot?: EquipSlot; stats?: ItemStats; statLines?: StatLine[]; enhancementLevel?: number;
  embeddedStones?: Item[]; // New field for Refined stones
}

export interface InventoryItem extends Item { count: number; }

export interface SecretRealm { id: number; name: string; minRealmIdx: number; description: string; dropRate: number; }

export type EquipmentState = { [key in EquipSlot]?: Item; };

export interface Player {
  id: string; username: string; password?: string;
  majorRealmIdx: number; minorRealmIdx: number;
  qi: number; maxQi: number; potential: number; breakthroughFailCount: number;
  stats: PlayerStats; equipment: EquipmentState; inventory: InventoryItem[];
  name?: string; money: number; lastSaveTime: number;
  clanId?: string; 
  rank?: number; // Arena Rank (1 is highest)
  towerCooldown?: number; // Timestamp when tower cooldown ends
  usedCodes?: string[]; // Track redeemed giftcodes
}

export interface LogEntry {
  id: string; message: string; type: 'normal' | 'success' | 'fail' | 'info' | 'item' | 'combat'; timestamp: string;
}

export enum TabType { SMITHING = 'smithing', INVENTORY = 'inventory', FEATURES = 'features', LEADERBOARD = 'leaderboard', MARKET = 'market', BOSS = 'boss', CLAN = 'clan', TOWER = 'tower', INFO = 'info', NOTICE = 'notice' }

export interface LeaderboardEntry {
  rank: number; name: string; realm: string; power: number;
  equipment: EquipmentState; stats: PlayerStats; isPlayer?: boolean; 
  id: string; // Needed for PvP challenge
}

export interface MarketListing {
  id: string; sellerName: string; sellerId: string; item: Item; price: number; timestamp: number;
}

export interface WorldBoss {
  id: string; name: string; description: string; currentHp: number; maxHp: number; level: number;
  status: 'alive' | 'dead'; respawnTime?: number;
}

export interface ChatMessage {
  id: string; sender: string; content: string; isSystem: boolean; timestamp: string;
}

export interface Fighter {
  id: string; name: string; maxHp: number; currentHp: number; atk: number; def: number; speed: number;
  avatar?: React.ReactNode; isPlayer: boolean;
  lifestealPercent?: number; // Added for combat logic
}

export interface CombatLog {
  turn: number; attacker: string; defender: string; damage: number; timestamp: number; heal?: number;
}

export enum AuthStatus { CHECKING = 'checking', LOGGED_OUT = 'logged_out', LOGGED_IN = 'logged_in' }

export interface ServerState {
  market: MarketListing[]; bosses: WorldBoss[]; chat: ChatMessage[]; leaderboard: LeaderboardEntry[];
}

// Clan Types
export interface Clan {
  id: string;
  name: string;
  master_id: string;
  level: number;
  funds: number;
  member_count?: number; 
}

export interface ClanMessage {
  id: number;
  clan_id: string;
  sender: string;
  content: string;
  created_at: string;
}

export interface Monster {
    name: string;
    maxHp: number;
    currentHp: number;
    atk: number;
    def: number;
    level: number;
}


import { Item, ItemType, ItemRarity, SecretRealm, EquipSlot, ItemStats, LeaderboardEntry, MarketListing, WorldBoss, StatLine, ChatMessage, Player, InventoryItem } from './types';

export const MAJOR_REALMS = [
  "Phàm Nhân", "Luyện Khí", "Trúc Cơ", "Kim Đan", "Nguyên Anh", "Hóa Thần", "Luyện Hư", "Hợp Thể", "Đại Thừa", "Độ Kiếp",
  "Tán Tiên", "Địa Tiên", "Thiên Tiên", "Huyền Tiên", "Kim Tiên", "Đại La Kim Tiên"
];

export const MINOR_REALMS = ["Sơ Kỳ", "Trung Kỳ", "Hậu Kỳ", "Viên Mãn"];
export const TICK_RATE_MS = 1000;

// DANH SÁCH NHẠC NỀN (PLAYLIST)
export const MUSIC_PLAYLIST = [
    { name: "Nền 1", url: "https://files.catbox.moe/zzi19a.mp3" },
    { name: "Nền 2", url: "https://files.catbox.moe/eftucv.mp3" }
];

export const INITIAL_PLAYER_STATE: Player = {
  id: 'guest', username: 'guest', majorRealmIdx: 0, minorRealmIdx: 0, qi: 0, maxQi: 100,
  potential: 0, breakthroughFailCount: 0,
  stats: { hp: 100, atk: 10, def: 5, speed: 5, breakthroughChance: 0 },
  equipment: {},
  inventory: [
    { id: 'spirit_stone', name: 'Linh Thạch', type: ItemType.RESOURCE, rarity: ItemRarity.GREY, description: 'Tiền tệ giao dịch.', value: 1, count: 0 },
    { id: 'black_iron', name: 'Hắc Thiết', type: ItemType.RESOURCE, rarity: ItemRarity.GREY, description: 'Nguyên liệu cường hóa.', value: 10, count: 0 },
  ],
  name: "Đạo Hữu Vô Danh", money: 0, lastSaveTime: Date.now(),
  towerCooldown: 0,
  usedCodes: [],
};

// GIFTCODES
export const GIFT_CODES: Record<string, { stones: number, iron: number }> = {
    'TANTHU': { stones: 1000, iron: 100 },
    'TUTIEN': { stones: 5000, iron: 500 },
    'VIPCODE': { stones: 10000, iron: 1000 },
};

export const SECRET_REALMS: SecretRealm[] = [
  { id: 1, name: "Hoang Sơn Thôn", minRealmIdx: 0, description: "Nơi khởi đầu (Chỉ rơi Linh Thạch).", dropRate: 0 },
  { id: 2, name: "Rừng Mê Vụ", minRealmIdx: 1, description: "Sương mù dày đặc (Chỉ rơi Linh Thạch).", dropRate: 0 },
  { id: 3, name: "Hang Động U Tối", minRealmIdx: 2, description: "Nơi dơi quỷ trú ngụ (Rơi: Phàm).", dropRate: 90 },
  { id: 4, name: "Thác Nước Bạc", minRealmIdx: 3, description: "Thủy quái canh giữ (Rơi: Thanh Linh).", dropRate: 80 },
  { id: 5, name: "Đỉnh Núi Lửa", minRealmIdx: 4, description: "Hỏa tinh nóng bỏng (Rơi: Huyền Băng).", dropRate: 70 },
  { id: 6, name: "Cổ Mộ Hoang Phế", minRealmIdx: 5, description: "Mộ phần cổ đại (Rơi: Tử Vi).", dropRate: 50 },
  { id: 7, name: "Vực Thẳm Băng Giá", minRealmIdx: 6, description: "Lạnh thấu xương (Rơi: Kim Ô).", dropRate: 35 },
  { id: 8, name: "Thiên Đảo", minRealmIdx: 7, description: "Đảo bay trên trời (Rơi: Hạo Thiên).", dropRate: 15 },
  { id: 9, name: "Hư Không Chi Môn", minRealmIdx: 8, description: "Cổng hư không (Rơi: Thái Cổ).", dropRate: 8 },
];

interface RarityConfig { namePrefix: string; multiplier: number; colorDesc: string; statLines: number; breakthroughVal: number; percentVal: number; }

export const RARITY_CONFIG: Record<ItemRarity, RarityConfig> = {
  [ItemRarity.GREY]:   { namePrefix: 'Phàm Thiết', multiplier: 1.0, colorDesc: 'Thô sơ', statLines: 1, breakthroughVal: 2, percentVal: 0 }, 
  [ItemRarity.GREEN]:  { namePrefix: 'Thanh Linh', multiplier: 2.0, colorDesc: 'Sức sống', statLines: 2, breakthroughVal: 3, percentVal: 2 },
  [ItemRarity.BLUE]:   { namePrefix: 'Huyền Băng', multiplier: 4.0, colorDesc: 'Sắc bén', statLines: 2, breakthroughVal: 4, percentVal: 4 },
  [ItemRarity.PURPLE]: { namePrefix: 'Tử Vi', multiplier: 10.0, colorDesc: 'Mộng ảo', statLines: 3, breakthroughVal: 5, percentVal: 10 },
  [ItemRarity.GOLD]:   { namePrefix: 'Kim Ô', multiplier: 25.0, colorDesc: 'Rực rỡ', statLines: 3, breakthroughVal: 6, percentVal: 25 },
  [ItemRarity.ORANGE]: { namePrefix: 'Hạo Thiên', multiplier: 60.0, colorDesc: 'Tiên khí', statLines: 4, breakthroughVal: 8, percentVal: 60 },
  [ItemRarity.RED]:    { namePrefix: 'Thái Cổ', multiplier: 120.0, colorDesc: 'Thần lực', statLines: 5, breakthroughVal: 10, percentVal: 120 },
};

export const DISMANTLE_RATES: Record<ItemRarity, number> = {
  [ItemRarity.GREY]: 2, [ItemRarity.GREEN]: 5, [ItemRarity.BLUE]: 20,
  [ItemRarity.PURPLE]: 40, [ItemRarity.GOLD]: 100, [ItemRarity.ORANGE]: 200, [ItemRarity.RED]: 500,
};

// Giá trị cơ bản (Linh Thạch) của vật phẩm theo phẩm chất để NPC định giá
export const MARKET_BASE_VALUES: Record<ItemRarity, number> = {
    [ItemRarity.GREY]: 20,
    [ItemRarity.GREEN]: 100,
    [ItemRarity.BLUE]: 800,
    [ItemRarity.PURPLE]: 5000,
    [ItemRarity.GOLD]: 38000,
    [ItemRarity.ORANGE]: 200000,
    [ItemRarity.RED]: 1000000,
};

// Cấu hình BOSS
export const BOSS_RESPAWN_MS: Record<string, number> = {
  'boss_low': 20 * 60 * 1000,   // 20 phút
  'boss_mid': 40 * 60 * 1000,   // 40 phút
  'boss_high': 60 * 60 * 1000   // 60 phút
};

export const BOSS_KILL_REWARD_IRON: Record<string, number> = {
  'boss_low': 1000,
  'boss_mid': 2000,
  'boss_high': 5000
};

// Clan Configuration
export const CLAN_CREATE_COST = 5000;

// Chi phí nâng cấp Clan (Key là Level hiện tại, Value là giá để lên Level tiếp theo)
export const CLAN_UPGRADE_COSTS: Record<number, number> = {
    1: 50000,       // Lên Lv 2
    2: 200000,      // Lên Lv 3
    3: 1000000,     // Lên Lv 4
    4: 5000000,     // Lên Lv 5
    5: 20000000,    // Lên Lv 6
    6: 100000000,   // Lên Lv 7 (Max)
};

export const CLAN_LEVEL_BUFFS = [
  { level: 1, name: "Tụ Khí Trận - Cấp 1", desc: "+10% Tốc độ tu luyện", effect: { speedPercent: 10 } },
  { level: 2, name: "Tụ Khí Trận - Cấp 2", desc: "+20% Tốc độ tu luyện", effect: { speedPercent: 20 } },
  { level: 3, name: "Tụ Khí Trận - Cấp 3", desc: "+35% Tốc độ tu luyện", effect: { speedPercent: 35 } },
  { level: 4, name: "Tụ Khí Trận - Cấp 4", desc: "+55% Tốc độ tu luyện", effect: { speedPercent: 55 } },
  { level: 5, name: "Tụ Khí Trận - Cấp 5", desc: "+75% Tốc độ tu luyện", effect: { speedPercent: 75 } },
  { level: 6, name: "Tụ Khí Trận - Cấp 6", desc: "+95% Tốc độ tu luyện", effect: { speedPercent: 95 } },
  { level: 7, name: "Tụ Khí Trận - Cấp 7", desc: "+120% Tốc độ tu luyện", effect: { speedPercent: 120 } },
];

// Tower (Chấn Yêu Quan) Configuration
export const TOWER_DEATH_COOLDOWN_MS = 20 * 60 * 1000; // 20 minutes

export const TOWER_MONSTERS = [
    "Tiểu Yêu Tinh", "Huyết Lang", "Bạch Cốt Tinh", "Mộc Yêu", "Hắc Hổ", 
    "Xà Vương", "Thạch Cự Nhân", "Quỷ Diện Nhện", "Liệt Hỏa Điểu", "Băng Sương Hùng"
];

// Stats Multiplier per Floor (Base Stats: HP 50k, Atk 2k)
export const TOWER_FLOOR_CONFIG = [
    { floor: 1, hpMult: 1, atkMult: 1, name: "Tầng 1", dropRate: 10 },      
    { floor: 2, hpMult: 2, atkMult: 1.5, name: "Tầng 2", dropRate: 10 },    
    { floor: 3, hpMult: 4, atkMult: 2, name: "Tầng 3", dropRate: 10 },      
    { floor: 4, hpMult: 8, atkMult: 3, name: "Tầng 4", dropRate: 3 },      
    { floor: 5, hpMult: 15, atkMult: 5, name: "Tầng 5", dropRate: 3 },     
    { floor: 6, hpMult: 30, atkMult: 8, name: "Tầng 6", dropRate: 3 },     
    { floor: 7, hpMult: 60, atkMult: 12, name: "Tầng 7", dropRate: 1 },    
    { floor: 8, hpMult: 100, atkMult: 18, name: "Tầng 8", dropRate: 1 },   
    { floor: 9, hpMult: 200, atkMult: 25, name: "Tầng 9", dropRate: 1 },   
];

// Refine Constants
export const REFINE_COST_IRON = 100;
export const REFINE_SUCCESS_RATE = 20; // 20%

// STONE GENERATOR
export const generateStone = (floor: number): Item => {
    const isLifesteal = Math.random() > 0.5;
    const value = 2 + (floor - 1); // 2% to 10%
    const typeName = isLifesteal ? "Vạn Ma Thạch" : "Vô Cực Thạch";
    const statCode = isLifesteal ? "lifestealPercent" : "cultivationSpeedPercent";
    const desc = isLifesteal ? "Tăng hút máu" : "Tăng tốc độ tu luyện";
    
    // Determine Rarity based on Floor
    let rarity = ItemRarity.GREEN;
    if (floor >= 4) rarity = ItemRarity.PURPLE;
    if (floor >= 7) rarity = ItemRarity.RED;

    // Use Ring slot for Lifesteal, Amulet for Speed (arbitrary assignment to fit existing slots)
    const slot = isLifesteal ? EquipSlot.RING : EquipSlot.AMULET;

    const statLines: StatLine[] = [
        { code: statCode, value: value, isMain: true }
    ];
    
    const stats: ItemStats = {
        [statCode]: value
    };

    return {
        id: `stone_${floor}_${Date.now()}_${Math.random()}`,
        name: `${typeName} Cấp ${floor}`,
        type: ItemType.EQUIPMENT,
        rarity: rarity,
        description: `${desc} +${value}%.`,
        value: floor * 500,
        slot: slot,
        stats: stats,
        statLines: statLines,
        enhancementLevel: 0
    };
};

// Tốc độ tu luyện cơ bản theo Cảnh giới (Exp/s)
export const getRealmBaseSpeed = (realmIdx: number) => {
    // Phàm Nhân: 5, Luyện Khí: 10, Trúc Cơ: 20... Tăng dần
    const base = 5;
    const multipliers = [1, 2, 4, 8, 15, 30, 60, 120, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000];
    return base * (multipliers[realmIdx] || multipliers[multipliers.length-1]);
};

const EQUIPMENT_TEMPLATES = [
  { slot: EquipSlot.WEAPON, baseName: 'Kiếm', mainStat: 'atk', baseValue: 5, desc: 'Vũ khí sắc bén.' },
  { slot: EquipSlot.HEAD, baseName: 'Mạo', mainStat: 'def', baseValue: 2, desc: 'Bảo vệ đầu.' },
  { slot: EquipSlot.BODY, baseName: 'Giáp', mainStat: 'hp', baseValue: 50, desc: 'Hộ thân bảo giáp.' },
  { slot: EquipSlot.RING, baseName: 'Giới Chỉ', mainStat: 'atk', baseValue: 3, desc: 'Nhẫn chứa linh lực.' },
  { slot: EquipSlot.FEET, baseName: 'Hài', mainStat: 'cultivationSpeedPercent', baseValue: 5, desc: 'Tăng tốc độ hấp thu Linh Khí.' },
  { slot: EquipSlot.AMULET, baseName: 'Ngọc Bội', mainStat: 'breakthroughChance', baseValue: 0, desc: 'Ngọc quý hộ mệnh.' },
];

export const generateEquipment = (rarity: ItemRarity, forcedSlot?: EquipSlot): Item => {
  const config = RARITY_CONFIG[rarity];
  let template = forcedSlot ? EQUIPMENT_TEMPLATES.find(t => t.slot === forcedSlot) : EQUIPMENT_TEMPLATES[Math.floor(Math.random() * EQUIPMENT_TEMPLATES.length)];
  if (!template) template = EQUIPMENT_TEMPLATES[0];

  const stats: ItemStats = {};
  const statLines: StatLine[] = [];

  let mainVal = 0;
  const mainCode = template.mainStat;
  
  if (mainCode === 'breakthroughChance') {
      mainVal = config.breakthroughVal;
  } else if (mainCode === 'speed') {
      mainVal = parseFloat((template.baseValue * config.multiplier).toFixed(2));
  } else {
      // Default multiplier logic
      let effectiveMultiplier = config.multiplier;
      
      // SPECIAL LOGIC FOR BOOTS (Cultivation Speed)
      // Goal: Base 5% -> Red ~120%. 
      // Formula: 1 + (OriginalMult - 1) / X
      // 1 + 119 / 5.174 = 1 + 23 = 24.
      // 5 * 24 = 120.
      if (mainCode === 'cultivationSpeedPercent') {
          effectiveMultiplier = 1 + (config.multiplier - 1) / 5.174;
      }

      mainVal = Math.floor(template.baseValue * effectiveMultiplier);
  }
  
  statLines.push({ code: mainCode, value: mainVal, isMain: true });
  // @ts-ignore
  stats[mainCode] = (stats[mainCode] || 0) + mainVal;

  const subLineCount = Math.max(0, config.statLines - 1);
  const possibleSubStats = ['hpPercent', 'atkPercent', 'defPercent', 'breakthroughChance'];

  for (let i = 0; i < subLineCount; i++) {
    const randomCode = possibleSubStats[Math.floor(Math.random() * possibleSubStats.length)];
    let val = (randomCode === 'breakthroughChance') ? config.breakthroughVal : config.percentVal;
    if (val > 0) {
        statLines.push({ code: randomCode, value: val, isMain: false });
        // @ts-ignore
        stats[randomCode] = (stats[randomCode] || 0) + val;
    }
  }

  return {
    id: `${rarity}_${template.slot}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: `${config.namePrefix} ${template.baseName}`,
    type: ItemType.EQUIPMENT, rarity: rarity, description: `${template.desc} (${config.colorDesc})`,
    value: 10 * Math.max(1, config.multiplier), slot: template.slot, stats: stats, statLines: statLines, enhancementLevel: 0
  };
};

export const calculateEnhanceChance = (currentLevel: number) => {
  if (currentLevel >= 16) return 0;
  if (currentLevel === 15) return 5;
  if (currentLevel === 14) return 10;
  if (currentLevel === 13) return 15;
  if (currentLevel >= 10) return 20;
  return Math.max(25, 100 - (currentLevel * 8));
};

export const calculateEnhanceCost = (currentLevel: number) => {
  const maxSteps = 16;
  const ironStart = 5, ironEnd = 1500;
  const ironGrowth = Math.pow(ironEnd / ironStart, 1 / maxSteps);
  const costIron = Math.floor(ironStart * Math.pow(ironGrowth, currentLevel));
  const stoneStart = 10, stoneEnd = 300000;
  const stoneGrowth = Math.pow(stoneEnd / stoneStart, 1 / maxSteps);
  const costStones = Math.floor(stoneStart * Math.pow(stoneGrowth, currentLevel));
  return { costIron, costStones };
};

const BASE_ITEMS: InventoryItem[] = [
  { id: 'spirit_stone', name: 'Linh Thạch', type: ItemType.RESOURCE, rarity: ItemRarity.GREY, description: 'Tiền tệ giao dịch.', value: 1, count: 0 },
  { id: 'black_iron', name: 'Hắc Thiết', type: ItemType.RESOURCE, rarity: ItemRarity.GREY, description: 'Nguyên liệu cường hóa.', value: 10, count: 0 },
];
export const POSSIBLE_ITEMS: InventoryItem[] = [...BASE_ITEMS];

const createMockItem = (id: string, name: string, rarity: ItemRarity, slot: EquipSlot, enhance: number, statLinesInput: StatLine[], price: number): MarketListing => {
    const stats: ItemStats = {};
    const statLines: StatLine[] = [];
    statLinesInput.forEach((line) => {
        statLines.push(line);
        // @ts-ignore
        stats[line.code] = (stats[line.code] || 0) + line.value;
    });
    return {
        id, sellerName: ['Vô Danh Lão Tổ', 'Thiên Cơ Tử', 'Huyết Ma', 'Bạch Y Tiên'].sort(() => 0.5 - Math.random())[0], sellerId: 'npc_seller',
        price, timestamp: Date.now(),
        item: { id: `item_${id}`, name, type: ItemType.EQUIPMENT, rarity, slot, description: 'Vật phẩm truyền thuyết.', value: price / 2, enhancementLevel: enhance, stats, statLines }
    };
};

export const MOCK_MARKET: MarketListing[] = [
    createMockItem('red_wp_12', 'Thái Cổ Tru Tiên Kiếm', ItemRarity.RED, EquipSlot.WEAPON, 12, [
        { code: 'atk', value: 600, isMain: true }, { code: 'atkPercent', value: 120, isMain: false }, { code: 'atkPercent', value: 120, isMain: false }, { code: 'hpPercent', value: 120, isMain: false }, { code: 'breakthroughChance', value: 10, isMain: false }
    ], 88000000),
    createMockItem('red_body_16', 'Thái Cổ Long Thần Giáp', ItemRarity.RED, EquipSlot.BODY, 16, [
        { code: 'hp', value: 6000, isMain: true }, { code: 'defPercent', value: 120, isMain: false }, { code: 'hpPercent', value: 120, isMain: false }, { code: 'hpPercent', value: 120, isMain: false }, { code: 'breakthroughChance', value: 10, isMain: false }
    ], 150000000),
    createMockItem('red_head_0', 'Thái Cổ Ma Thần Mạo', ItemRarity.RED, EquipSlot.HEAD, 0, [
        { code: 'def', value: 240, isMain: true }, { code: 'defPercent', value: 120, isMain: false }, { code: 'defPercent', value: 120, isMain: false }, { code: 'hpPercent', value: 120, isMain: false }, { code: 'defPercent', value: 120, isMain: false }
    ], 50000000),
];

export const WORLD_BOSSES: WorldBoss[] = [
  { id: 'boss_low', name: 'Hắc Phong Lang Vương [Hạ]', description: 'Yêu thú cấp thấp.', maxHp: 10000000, currentHp: 10000000, level: 30, status: 'alive' },
  { id: 'boss_mid', name: 'Xích Hỏa Kỳ Lân', description: 'Thần thú sa đọa.', maxHp: 50000000, currentHp: 50000000, level: 60, status: 'alive' },
  { id: 'boss_high', name: 'Thôn Thiên Ma Đế [Thượng]', description: 'Thượng cổ ma thần.', maxHp: 250000000, currentHp: 250000000, level: 99, status: 'alive' }
];

const calculateRealmBaseStats = (majorIdx: number, minorIdx: number) => {
    let hp = 100, atk = 10, def = 5;
    for (let m = 0; m <= majorIdx; m++) {
        const minorSteps = (m === majorIdx) ? minorIdx : 3;
        for (let min = 0; min < minorSteps; min++) { hp = Math.ceil(hp * 1.1); atk = Math.ceil(atk * 1.1); def = Math.ceil(def * 1.1); }
        if (m < majorIdx) { hp = Math.ceil(hp * 1.5); atk = Math.ceil(atk * 1.5); def = Math.ceil(def * 1.5); }
    }
    return { hp, atk, def };
};

const calculateFullStats = (baseStats: {hp: number, atk: number, def: number}, equipment: {[key: string]: Item}) => {
    const current = { hp: baseStats.hp, atk: baseStats.atk, def: baseStats.def, speed: 5 };
    let hpPercent = 0, atkPercent = 0, defPercent = 0;
    (Object.values(equipment) as Item[]).forEach(item => {
      if (item && item.stats) {
        const enhanceMult = 1 + ((item.enhancementLevel || 0) * 0.1);
        if (item.stats.hp) current.hp += Math.floor(item.stats.hp * enhanceMult);
        if (item.stats.atk) current.atk += Math.floor(item.stats.atk * enhanceMult);
        if (item.stats.def) current.def += Math.floor(item.stats.def * enhanceMult);
        if (item.stats.speed) current.speed += parseFloat((item.stats.speed * enhanceMult).toFixed(2));
        if (item.stats.hpPercent) hpPercent += Math.floor(item.stats.hpPercent * enhanceMult);
        if (item.stats.atkPercent) atkPercent += Math.floor(item.stats.atkPercent * enhanceMult);
        if (item.stats.defPercent) defPercent += Math.floor(item.stats.defPercent * enhanceMult);
      }
    });
    current.hp = Math.floor(current.hp * (1 + hpPercent / 100));
    current.atk = Math.floor(current.atk * (1 + atkPercent / 100));
    current.def = Math.floor(current.def * (1 + defPercent / 100));
    return current;
};

export const MOCK_LEADERBOARD: LeaderboardEntry[] = Array.from({length: 10}).map((_, i) => {
  const majorIdx = MAJOR_REALMS.length - 1 - Math.floor(i / 3); 
  const minorIdx = 3 - (i % 4);
  const realmName = `${MAJOR_REALMS[majorIdx]} ${MINOR_REALMS[minorIdx]}`;
  let rarity = ItemRarity.RED;
  let enhanceLvl = 16; 
  if (i > 0) enhanceLvl = 14;
  if (i > 3) { rarity = ItemRarity.ORANGE; enhanceLvl = 12; }
  if (i > 6) { rarity = ItemRarity.GOLD; enhanceLvl = 10; }

  const equipment: any = {
       [EquipSlot.WEAPON]: generateEquipment(rarity, EquipSlot.WEAPON),
       [EquipSlot.BODY]: generateEquipment(rarity, EquipSlot.BODY),
       [EquipSlot.HEAD]: generateEquipment(rarity, EquipSlot.HEAD),
       [EquipSlot.RING]: generateEquipment(rarity, EquipSlot.RING),
       [EquipSlot.FEET]: generateEquipment(rarity, EquipSlot.FEET),
       [EquipSlot.AMULET]: generateEquipment(rarity, EquipSlot.AMULET),
  };
  Object.values(equipment).forEach((item: any) => item.enhancementLevel = enhanceLvl);
  const baseStats = calculateRealmBaseStats(majorIdx, minorIdx);
  const exactStats = calculateFullStats(baseStats, equipment);
  const exactPower = exactStats.hp + (exactStats.atk * 3) + (exactStats.def * 3);

  return { 
    rank: i + 1, 
    name: i===0 ? 'Độc Cô Cầu Bại' : `Top ${i+1} Đại Thần`, 
    realm: realmName, 
    power: exactPower, 
    equipment: equipment, 
    stats: exactStats,
    id: `mock_player_${i+1}`
  };
});

export const MOCK_WORLD_CHAT: ChatMessage[] = [
  { id: '1', sender: 'Hệ Thống', content: 'Chào mừng các đạo hữu!', isSystem: true, timestamp: '10:00' },
];

export const NPC_NAMES = ['Lý Thất Dạ', 'Hàn Lập', 'Bạch Tiểu Thuần', 'Phương Nguyên', 'Vương Lâm', 'Tiêu Viêm', 'Đường Tam', 'Diệp Phàm'];
export const NPC_MESSAGES = [
    'Hôm nay trời đẹp, thích hợp độ kiếp!',
    'Có ai bán Hắc Thiết số lượng lớn không?',
    'Cần tìm đạo lữ song tu, yêu cầu Giới Tính: Nữ.',
    'Bí cảnh Rừng Mê Vụ hôm nay rơi nhiều đồ ngon quá!',
    'Ta vừa đập xịt vũ khí +12, chán đời quá...',
    'Ai solo không? Chấp 1 tay!',
    'Mua Linh Thạch SLL, giá cao!',
    'Cầu đại gia bao nuôi...'
];
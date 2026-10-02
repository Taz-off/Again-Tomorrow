export interface MemoryEntry {
  id: string;
  title: string;
  text: string;
}

export interface GameState {
  saveVersion: number;
  livedMinutes: number;
  ideas: number;
  knowledge: number;
  money: number;
  efficiency: number;
  timeSavedMinutes: number;
  unlockedActionIds: string[];
  unlockedUpgradeIds: string[];
  memories: MemoryEntry[];
  flags: Record<string, boolean>;
}

export interface ActionDef {
  id: string;
  name: string;
  durationMinutes: number;
  rewards: Partial<Pick<GameState, "ideas" | "knowledge" | "money">>;
  memoryId?: string;
  unlockAtLivedMinutes?: number;
}

export const SAVE_VERSION = 1;

export function createInitialState(): GameState {
  return {
    saveVersion: SAVE_VERSION,
    livedMinutes: 0,
    ideas: 0,
    knowledge: 0,
    money: 0,
    efficiency: 1,
    timeSavedMinutes: 0,
    unlockedActionIds: ["pass", "observe"],
    unlockedUpgradeIds: [],
    memories: [],
    flags: {},
  };
}

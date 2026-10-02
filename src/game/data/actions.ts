import type { ActionDef } from "../types";

export const ACTIONS: Record<string, ActionDef> = {
  observe: {
    id: "observe",
    name: "Observer",
    durationMinutes: 2,
    rewards: { knowledge: 1 },
    unlockAtLivedMinutes: 1,
  },
  think: {
    id: "think",
    name: "Réfléchir",
    durationMinutes: 3,
    rewards: { ideas: 1 },
    unlockAtLivedMinutes: 3,
  },
  "watch-rain": {
    id: "watch-rain",
    name: "Regarder la pluie",
    durationMinutes: 17,
    rewards: {},
    memoryId: "rain-window",
    unlockAtLivedMinutes: 8,
  },
  work: {
    id: "work",
    name: "Travailler",
    durationMinutes: 30,
    rewards: { money: 10 },
    unlockAtLivedMinutes: 10,
  },
};

export interface UpgradeDef {
  id: string;
  name: string;
  targetActionId: string;
  newDurationMinutes: number;
  cost: Partial<{ ideas: number; knowledge: number; money: number }>;
  unlockAtLivedMinutes?: number;
}

export const UPGRADES: Record<string, UpgradeDef> = {
  "better-tools": {
    id: "better-tools",
    name: "Outils améliorés",
    targetActionId: "work",
    newDurationMinutes: 25,
    cost: { ideas: 2 },
    unlockAtLivedMinutes: 6,
  },
};

export const TIME_CONTROLS = {
  multiPassAmount: 10,
  multiPassUnlockAtLivedMinutes: 30,
};

export const MEMORIES: Record<string, { id: string; title: string; text: string }> = {
  "rain-window": {
    id: "rain-window",
    title: "Pluie",
    text: "Il pleuvait. Tu avais quelque chose d'important à faire. Tu es quand même resté près de la fenêtre.",
  },
};

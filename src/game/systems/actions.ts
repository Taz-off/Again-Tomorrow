import { ACTIONS, MEMORIES, UPGRADES } from "../data/actions";
import type { GameState } from "../types";
import { applyDuration } from "./time";

export function getEffectiveDuration(actionId: string, unlockedUpgradeIds: string[]): number {
  const def = ACTIONS[actionId];
  if (!def) throw new Error(`Unknown action: ${actionId}`);
  let duration = def.durationMinutes;
  for (const upId of unlockedUpgradeIds) {
    const up = UPGRADES[upId];
    if (up && up.targetActionId === actionId) {
      duration = Math.min(duration, up.newDurationMinutes);
    }
  }
  return duration;
}

export function applyAction(state: GameState, actionId: string): GameState {
  const def = ACTIONS[actionId];
  if (!def) throw new Error(`Unknown action: ${actionId}`);
  const duration = getEffectiveDuration(actionId, state.unlockedUpgradeIds);
  const livedMinutes = applyDuration(state.livedMinutes, duration);
  const next: GameState = {
    ...state,
    livedMinutes,
    ideas: state.ideas + (def.rewards.ideas ?? 0),
    knowledge: state.knowledge + (def.rewards.knowledge ?? 0),
    money: state.money + (def.rewards.money ?? 0),
    memories: [...state.memories],
    unlockedActionIds: [...state.unlockedActionIds],
  };
  if (def.memoryId && !next.memories.some((m) => m.id === def.memoryId)) {
    const mem = MEMORIES[def.memoryId];
    if (mem) next.memories.push({ ...mem });
  }
  for (const candidate of Object.values(ACTIONS)) {
    if (
      candidate.unlockAtLivedMinutes !== undefined &&
      next.livedMinutes >= candidate.unlockAtLivedMinutes &&
      !next.unlockedActionIds.includes(candidate.id)
    ) {
      next.unlockedActionIds.push(candidate.id);
    }
  }
  return next;
}

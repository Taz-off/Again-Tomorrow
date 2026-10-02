import { ACTIONS } from "../data/actions";
import type { GameState } from "../types";

export function applyUnlocks(state: GameState): GameState {
  const unlocked = [...state.unlockedActionIds];
  for (const candidate of Object.values(ACTIONS)) {
    if (
      candidate.unlockAtLivedMinutes !== undefined &&
      state.livedMinutes >= candidate.unlockAtLivedMinutes &&
      !unlocked.includes(candidate.id)
    ) {
      unlocked.push(candidate.id);
    }
  }
  if (unlocked.length === state.unlockedActionIds.length) return state;
  return { ...state, unlockedActionIds: unlocked };
}

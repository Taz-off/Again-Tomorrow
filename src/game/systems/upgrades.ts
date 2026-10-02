import { UPGRADES } from "../data/actions";
import type { GameState } from "../types";

export function canAfford(state: GameState, upgradeId: string): boolean {
  const up = UPGRADES[upgradeId];
  if (!up) throw new Error(`Unknown upgrade: ${upgradeId}`);
  return (
    state.ideas >= (up.cost.ideas ?? 0) &&
    state.knowledge >= (up.cost.knowledge ?? 0) &&
    state.money >= (up.cost.money ?? 0)
  );
}

export function purchaseUpgrade(state: GameState, upgradeId: string): GameState {
  const up = UPGRADES[upgradeId];
  if (!up) throw new Error(`Unknown upgrade: ${upgradeId}`);
  if (state.unlockedUpgradeIds.includes(upgradeId)) {
    throw new Error(`Upgrade already owned: ${upgradeId}`);
  }
  if (!canAfford(state, upgradeId)) {
    throw new Error(`Cannot afford upgrade: ${upgradeId}`);
  }
  return {
    ...state,
    ideas: state.ideas - (up.cost.ideas ?? 0),
    knowledge: state.knowledge - (up.cost.knowledge ?? 0),
    money: state.money - (up.cost.money ?? 0),
    unlockedUpgradeIds: [...state.unlockedUpgradeIds, upgradeId],
  };
}

import { create } from "zustand";
import { applyAction } from "../systems/actions";
import { passMinutes } from "../systems/time";
import { applyUnlocks } from "../systems/unlocks";
import { createInitialState, type GameState } from "../types";
import { loadSave, saveNow } from "../persistence/save";

interface GameStore extends GameState {
  passOneMinute: () => void;
  doAction: (id: string) => void;
  reset: () => void;
}

const loaded = loadSave();

export const useGameStore = create<GameStore>((set) => ({
  ...(loaded ?? createInitialState()),
  passOneMinute: () =>
    set((s) => {
      const advanced: GameState = { ...s, livedMinutes: passMinutes(s.livedMinutes, 1) };
      const next = applyUnlocks(advanced);
      saveNow(next);
      return next;
    }),
  doAction: (id: string) =>
    set((s) => {
      const next = applyAction(s, id);
      saveNow(next);
      return next;
    }),
  reset: () =>
    set(() => {
      const fresh = createInitialState();
      saveNow(fresh);
      return fresh;
    }),
}));

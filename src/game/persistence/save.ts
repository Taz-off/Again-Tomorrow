import { SAVE_VERSION, type GameState } from "../types";

const KEY = "again-tomorrow-save-v1";

function isValidSave(v: unknown): v is GameState {
  if (typeof v !== "object" || v === null) return false;
  const s = v as Record<string, unknown>;
  return (
    s["saveVersion"] === SAVE_VERSION &&
    typeof s["livedMinutes"] === "number" &&
    (s["livedMinutes"] as number) >= 0 &&
    Array.isArray(s["unlockedActionIds"])
  );
}

export function loadSave(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidSave(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveNow(state: GameState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Quota ou environnement privé : le jeu reste jouable sans sauvegarde.
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Ignoré.
  }
}

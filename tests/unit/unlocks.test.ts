import { describe, expect, test } from "vitest";
import { applyUnlocks } from "../../src/game/systems/unlocks";
import { createInitialState } from "../../src/game/types";

describe("unlock system — shared by pass + actions", () => {
  test("observe unlocked from the start", () => {
    const s = applyUnlocks(createInitialState());
    expect(s.unlockedActionIds).toContain("observe");
  });

  test("reaching 3 lived minutes unlocks think (pass button path)", () => {
    const s = applyUnlocks({ ...createInitialState(), livedMinutes: 3 });
    expect(s.unlockedActionIds).toContain("think");
  });

  test("reaching 10 lived minutes unlocks work and rain", () => {
    const s = applyUnlocks({ ...createInitialState(), livedMinutes: 10 });
    expect(s.unlockedActionIds).toContain("work");
    expect(s.unlockedActionIds).toContain("watch-rain");
  });

  test("idempotent: no duplicates on re-apply", () => {
    let s = applyUnlocks({ ...createInitialState(), livedMinutes: 10 });
    s = applyUnlocks(s);
    expect(s.unlockedActionIds.filter((id) => id === "think")).toHaveLength(1);
  });
});

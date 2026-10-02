import { describe, expect, test } from "vitest";
import { applyAction } from "../../src/game/systems/actions";
import { purchaseUpgrade } from "../../src/game/systems/upgrades";
import { getEffectiveDuration } from "../../src/game/systems/actions";
import { passMinutes } from "../../src/game/systems/time";
import { createInitialState } from "../../src/game/types";

describe("opening progression — first minutes", () => {
  test("clicking pass advances lived time, no late systems revealed", () => {
    let lived = 0;
    for (let i = 0; i < 5; i++) lived = passMinutes(lived, 1);
    expect(lived).toBe(5);
  });

  test("observe then think unlocks ideas without temp-restant leak", () => {
    let s = createInitialState();
    s = { ...s, livedMinutes: 1 };
    s = applyAction(s, "observe");
    expect(s.livedMinutes).toBe(3);
    s = applyAction(s, "think");
    expect(s.ideas).toBe(1);
    expect(s.livedMinutes).toBe(6);
    expect("timeRemaining" in s).toBe(false);
    expect(s.unlockedActionIds).not.toContain("tempus-loan");
  });

  test("no soft-lock: from start, pass always progresses", () => {
    const s = createInitialState();
    expect(passMinutes(s.livedMinutes, 1)).toBe(1);
  });

  test("first optimization: 2 ideas buy faster work (30 -> 25 min)", () => {
    let s = { ...createInitialState(), livedMinutes: 10, ideas: 2 };
    s = purchaseUpgrade(s, "better-tools");
    expect(getEffectiveDuration("work", s.unlockedUpgradeIds)).toBe(25);
    const after = applyAction(s, "work");
    expect(after.livedMinutes).toBe(s.livedMinutes + 25);
    expect(after.money).toBe(10);
  });
});

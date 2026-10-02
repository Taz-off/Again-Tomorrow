import { describe, expect, test } from "vitest";
import { purchaseUpgrade } from "../../src/game/systems/upgrades";
import { createInitialState } from "../../src/game/types";

describe("upgrade system — spend ideas to reduce durations", () => {
  test("buying better-tools with 2 ideas unlocks it and deducts cost", () => {
    const s = { ...createInitialState(), ideas: 2 };
    const next = purchaseUpgrade(s, "better-tools");
    expect(next.unlockedUpgradeIds).toContain("better-tools");
    expect(next.ideas).toBe(0);
  });

  test("insufficient ideas throws, state untouched", () => {
    const s = { ...createInitialState(), ideas: 1 };
    expect(() => purchaseUpgrade(s, "better-tools")).toThrow();
    expect(s.unlockedUpgradeIds).not.toContain("better-tools");
  });

  test("unknown upgrade throws", () => {
    expect(() => purchaseUpgrade(createInitialState(), "nope")).toThrow();
  });

  test("buying twice throws", () => {
    const s = { ...createInitialState(), ideas: 5 };
    const once = purchaseUpgrade(s, "better-tools");
    expect(() => purchaseUpgrade(once, "better-tools")).toThrow();
  });
});

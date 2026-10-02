import { describe, expect, test } from "vitest";
import { applyAction, getEffectiveDuration } from "../../src/game/systems/actions";
import { createInitialState } from "../../src/game/types";

describe("action system — data-driven, lived time advances", () => {
  test("canonical: think at 12min gives 15min + 1 idea", () => {
    const s = { ...createInitialState(), livedMinutes: 12, ideas: 0 };
    const next = applyAction(s, "think");
    expect(next.livedMinutes).toBe(15);
    expect(next.ideas).toBe(1);
  });

  test("unknown action throws", () => {
    const s = createInitialState();
    expect(() => applyAction(s, "nope")).toThrow();
  });

  test("upgrade reduces duration (optimization saves life, no currency)", () => {
    const base = getEffectiveDuration("work", []);
    const reduced = getEffectiveDuration("work", ["better-tools"]);
    expect(reduced).toBeLessThan(base);
  });

  test("watch-rain creates a memory without quantitative reward", () => {
    const s = createInitialState();
    const next = applyAction(s, "watch-rain");
    expect(next.livedMinutes).toBe(s.livedMinutes + 17);
    expect(next.memories.some((m) => m.id === "rain-window")).toBe(true);
  });
});

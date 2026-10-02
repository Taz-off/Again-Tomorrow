import { describe, expect, test } from "vitest";
import { applyDuration, passMinutes } from "../../src/game/systems/time";

describe("time system — DEC-001 lived time only increases", () => {
  test("passMinutes(1) increases livedMinutes by 1", () => {
    expect(passMinutes(0, 1)).toBe(1);
  });

  test("canonical example: 12 + think(3) -> 15", () => {
    expect(applyDuration(12, 3)).toBe(15);
  });

  test("never decreases and rejects negative duration", () => {
    expect(() => applyDuration(12, -3)).toThrow();
    expect(() => passMinutes(5, -1)).toThrow();
  });
});

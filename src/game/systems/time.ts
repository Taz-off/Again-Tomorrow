export function assertValidDuration(minutes: number): void {
  if (!Number.isFinite(minutes) || minutes < 0) {
    throw new Error(`Invalid duration: ${String(minutes)}. Duration must be >= 0.`);
  }
}

export function applyDuration(livedMinutes: number, durationMinutes: number): number {
  assertValidDuration(durationMinutes);
  return livedMinutes + durationMinutes;
}

export function passMinutes(livedMinutes: number, minutes: number): number {
  assertValidDuration(minutes);
  if (minutes === 0) return livedMinutes;
  return livedMinutes + minutes;
}

interface Props {
  livedMinutes: number;
}

export function formatLived(minutes: number): string {
  return `${String(minutes)}`;
}

export default function TimeDisplay({ livedMinutes }: Props) {
  return (
    <div aria-live="polite" aria-label="Temps vécu">
      <div className="time" data-testid="lived-time">
        {formatLived(livedMinutes)}
        <small>min</small>
      </div>
    </div>
  );
}

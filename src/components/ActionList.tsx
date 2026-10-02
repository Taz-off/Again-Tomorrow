import { ACTIONS } from "../game/data/actions";

interface Props {
  unlockedActionIds: string[];
  onAction: (id: string) => void;
}

export default function ActionList({ unlockedActionIds, onAction }: Props) {
  const visible = unlockedActionIds
    .map((id) => ACTIONS[id])
    .filter((a) => a !== undefined && a.id !== "observe" && a.id !== "pass");
  if (visible.length === 0) return null;
  return (
    <div className="actions">
      {visible.map((a) => (
        <button
          key={a.id}
          type="button"
          className="action-btn"
          onClick={() => onAction(a.id)}
        >
          {a.name} — {a.durationMinutes} min
        </button>
      ))}
    </div>
  );
}

import ActionList from "../components/ActionList";
import PassMinuteButton from "../components/PassMinuteButton";
import TimeDisplay from "../components/TimeDisplay";
import { ACTIONS } from "../game/data/actions";
import { useGameStore } from "../game/state/store";

export default function App() {
  const livedMinutes = useGameStore((s) => s.livedMinutes);
  const ideas = useGameStore((s) => s.ideas);
  const knowledge = useGameStore((s) => s.knowledge);
  const unlockedActionIds = useGameStore((s) => s.unlockedActionIds);
  const passOneMinute = useGameStore((s) => s.passOneMinute);
  const doAction = useGameStore((s) => s.doAction);

  const showResources = ideas > 0 || knowledge > 0;
  const observeUnlocked = unlockedActionIds.includes("observe");

  return (
    <main className="stage">
      <div className="title-fade">AGAIN, TOMORROW</div>
      <TimeDisplay livedMinutes={livedMinutes} />
      <PassMinuteButton onPass={passOneMinute} />
      {observeUnlocked ? (
        <div className="actions">
          <button
            type="button"
            className="action-btn"
            onClick={() => doAction("observe")}
          >
            {ACTIONS["observe"].name} — {ACTIONS["observe"].durationMinutes} min
          </button>
        </div>
      ) : null}
      <ActionList
        unlockedActionIds={unlockedActionIds.filter((id) => id !== "observe")}
        onAction={doAction}
      />
      {showResources ? (
        <div className="resources" data-testid="resources">
          {ideas > 0 ? <span data-testid="ideas">Idées : {ideas} </span> : null}
          {knowledge > 0 ? <span>Connaissance : {knowledge}</span> : null}
        </div>
      ) : null}
    </main>
  );
}

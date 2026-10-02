import { ACTIONS, TIME_CONTROLS, UPGRADES } from "../game/data/actions";
import { useGameStore } from "../game/state/store";
import { getEffectiveDuration } from "../game/systems/actions";
import { canAfford } from "../game/systems/upgrades";
import ActionList from "../components/ActionList";
import PassMinuteButton from "../components/PassMinuteButton";
import TimeDisplay from "../components/TimeDisplay";

export default function App() {
  const livedMinutes = useGameStore((s) => s.livedMinutes);
  const ideas = useGameStore((s) => s.ideas);
  const knowledge = useGameStore((s) => s.knowledge);
  const money = useGameStore((s) => s.money);
  const unlockedActionIds = useGameStore((s) => s.unlockedActionIds);
  const unlockedUpgradeIds = useGameStore((s) => s.unlockedUpgradeIds);
  const passOneMinute = useGameStore((s) => s.passOneMinute);
  const passManyMinutes = useGameStore((s) => s.passManyMinutes);
  const doAction = useGameStore((s) => s.doAction);
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);

  const showResources = ideas > 0 || knowledge > 0 || money > 0;
  const observeUnlocked = unlockedActionIds.includes("observe");
  const showMultiPass = livedMinutes >= TIME_CONTROLS.multiPassUnlockAtLivedMinutes;
  const visibleUpgrades = Object.values(UPGRADES).filter(
    (u) =>
      !unlockedUpgradeIds.includes(u.id) &&
      (u.unlockAtLivedMinutes ?? 0) <= livedMinutes,
  );

  return (
    <main className="stage">
      <div className="title-fade">AGAIN, TOMORROW</div>
      <TimeDisplay livedMinutes={livedMinutes} />
      <PassMinuteButton onPass={passOneMinute} />
      {showMultiPass ? (
        <div className="actions">
          <button
            type="button"
            className="action-btn"
            onClick={() => passManyMinutes(TIME_CONTROLS.multiPassAmount)}
          >
            PASSER {TIME_CONTROLS.multiPassAmount} MINUTES
          </button>
        </div>
      ) : null}
      {observeUnlocked ? (
        <div className="actions">
          <button
            type="button"
            className="action-btn"
            onClick={() => doAction("observe")}
          >
            {ACTIONS["observe"].name} —{" "}
            {getEffectiveDuration("observe", unlockedUpgradeIds)} min
          </button>
        </div>
      ) : null}
      <ActionList
        unlockedActionIds={unlockedActionIds.filter((id) => id !== "observe")}
        unlockedUpgradeIds={unlockedUpgradeIds}
        onAction={doAction}
      />
      {visibleUpgrades.length > 0 ? (
        <div className="actions" data-testid="upgrades">
          {visibleUpgrades.map((u) => {
            const affordable = canAfford(useGameStore.getState(), u.id);
            return (
              <button
                key={u.id}
                type="button"
                className="action-btn"
                disabled={!affordable}
                onClick={() => buyUpgrade(u.id)}
              >
                {u.name} — {u.cost.ideas ?? 0} idées
              </button>
            );
          })}
        </div>
      ) : null}
      {showResources ? (
        <div className="resources" data-testid="resources">
          {ideas > 0 ? <span data-testid="ideas">Idées : {ideas} </span> : null}
          {knowledge > 0 ? <span>Connaissance : {knowledge} </span> : null}
          {money > 0 ? <span>Argent : {money}</span> : null}
        </div>
      ) : null}
    </main>
  );
}

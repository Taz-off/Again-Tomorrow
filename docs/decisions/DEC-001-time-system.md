# DEC-001 — Time is lived, not stored

Status: Accepted

## Context

Le prompt fondateur impose que le compteur principal ne soit pas un portefeuille.

## Decision

- `livedMinutes: number` augmente via `applyDuration` / `passMinutes`.
- Aucune variable `timeCurrency` qui diminue.
- Les actions avancent la vie ; les optimisations réduisent `durationMinutes`.

## Why

Préserve l'identité du jeu : le joueur ressent qu'il a passé sa vie,
pas qu'il a dépensé une monnaie.

## Alternatives considered

- Portefeuille de minutes : rejeté, casse la révélation du temps restant.

## Consequences

- Tests `tests/unit/time.test.ts` verrouillent la règle.
- Toute exception exige une nouvelle DEC.

## Files/systems affected

- `src/game/types.ts`, `src/game/systems/time.ts`, `src/game/systems/actions.ts`

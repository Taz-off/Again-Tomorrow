# Again, Tomorrow

Idle game narratif : tu passes du temps, tu optimises, puis tu te demandes
pourquoi. ~10 heures visées, slice actuel : 30 premières minutes.

## Stack

Vite + React 19 + TypeScript strict + Zustand + Vitest. Tauri 2 prévu
(Rust absent au bootstrap, voir `docs/decisions/DEC-002-frontend-stack.md`).

## Prérequis

Node 22+, npm 10+.

## Installation

```powershell
cd "again-tomorrow"
npm install
```

## Développement

```powershell
npm run dev
npm test
npm run typecheck
npm run build
```

## Architecture

`src/game/` (types, systems, data, state, persistence) hors React.
`src/app/`, `src/components/`, `src/styles/` pour la présentation.
Docs canon : `docs/00_VISION.md` → `05_GAMEPLAY_RULES.md`.
Travail courant : `docs/roadmap/CURRENT_SLICE.md`.

## Workflow OpenCode

Voir `AGENTS.md`, `.opencode/agents/`, `.opencode/commands/`.

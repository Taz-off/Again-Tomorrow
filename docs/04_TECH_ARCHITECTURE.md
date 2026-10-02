# Tech Architecture (canon)

Stack : Vite + React 19 + TypeScript strict + Zustand + Vitest + Testing Library.
Tauri 2 préparé, `src-tauri/` différé (Rust absent le 2026-10-02, voir DEC-002).

Séparation : `src/game/types/` état, `systems/` règles, `data/` contenu,
`persistence/` sauvegarde, `components/` + `app/` présentation.
Logique testable hors React, actions data-driven, pas de `any` sans motif.

Sauvegarde : JSON localStorage versionné (`saveVersion: 1`), validation au
chargement, corrumpu → nouvelle partie. SQLite seulement si besoin démontré.

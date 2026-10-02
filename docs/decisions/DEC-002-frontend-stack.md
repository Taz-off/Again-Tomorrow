# DEC-002 — Tauri + React + TypeScript (web d'abord)

Status: Accepted (partiel : web implémenté, Tauri différé)

## Context

Prompt §17 impose Tauri 2 + React 19 + TS strict. Rust absent le 2026-10-02.

## Decision

- Bootstrap web : Vite + React 19 + TS strict + Zustand + Vitest.
- `src-tauri/` non créé tant que Rust n'est pas installé (décision humaine requise).
- Jeu offline, sans backend, sauvegarde locale JSON.

## Why

Un slice jouable et testé vaut mieux qu'un scaffold Tauri non compilable.

## Alternatives considered

- Installer Rust sans autorisation : refusé (règle workspace).
- Scaffold Tauri vide non compilé : refusé, dette sans preuve.

## Consequences

- `npm run dev` / `build` web vérifiés. Tauri = NON VÉRIFIÉ, à reprendre.
- Fichier à créer plus tard : `src-tauri/tauri.conf.json`, icônes, updater off.

## Files/systems affected

- `package.json`, `vite.config.ts`, `vitest.config.ts`, `src/game/**`

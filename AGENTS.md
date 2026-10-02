# AGENTS — Again, Tomorrow

## Sources de vérité (priorité)

1. `docs/decisions/` validées (DEC-001 temps vécu, DEC-002 stack).
2. `docs/00_VISION.md` + `01_GAME_DESIGN.md` + `05_GAMEPLAY_RULES.md`.
3. `docs/roadmap/CURRENT_SLICE.md` (filtre du travail courant).
4. `docs/04_TECH_ARCHITECTURE.md`.
5. Code et tests existants.
6. `docs/lab/` = inspiration non canonique uniquement.

## Anti-hallucination

- Ne jamais inventer une mécanique ou valeur à impact sans `DECISION REQUIRED`.
- Ne jamais prétendre un test exécuté ou une UI vue sans preuve.
- Ne jamais supposer un fichier ou une dépendance : vérifier.
- Conflit code vs doc → signaler avant de trancher.
- Info essentielle manquante → marquer `DECISION REQUIRED`.

## Scope

- Lire d'abord les fichiers utiles, pas tout le dépôt.
- Fichier supplémentaire nécessaire → dire pourquoi.
- Pas de refactor global, pas de hors-scope sans justification.
- Préserver les API publiques sauf décision explicite.

## Qualité

- « Ça compile » ne suffit pas : typecheck + tests ciblés + build pertinent.
- Vérifié / non vérifié toujours distingués (visuel, Tauri, installateur).
- Workflow : IDÉE → DESIGN → PLAN → BUILD → TESTS → REVIEW → PLAYTEST → VALIDATION.

## Session 2026-10-02 (humain : Taz-off, build bootstrap ce5d265)

Slice: 30 premières minutes. Durée jouée: ~250 clics.

### Observé

- Écran : seul le bouton PASSER UNE MINUTE, compteur monte (250 min), RIEN ne se débloque.
- Capture : 246 min, aucune action visible.

### Compréhension du joueur

- Attendait Observer / Réfléchir vers 1-3 min (annoncé au brief).

### Ennui / friction

- BLOCKER : 250 clics sans nouveauté = boucle morte.

### Bugs

- Cause : `passOneMinute` n'évaluait jamais les déblocages + `App.tsx` conditionnait
  Observer à `think` déjà débloqué (cercle vicieux). Fix : `src/game/systems/unlocks.ts`
  partagé (pass + actions), gating corrigé. Tests : 17/17.

## Session 2026-10-02 (humain : Taz-off, capture 4803 min)

Durée jouée: ~4800 clics. État : 4803 min, 41 idées, 73 connaissance, 4 actions visibles.

### Observé

- Boucle fonctionnelle après fix, mais grind au clic massif pour arriver là.
- Le joueur a trouvé seul les 4 actions. Pas encore d'usage pour les idées.

### Réponse (dev)

- Ajout : achat Outils améliorés (2 idées → Travailler 30→25 min), bouton
  PASSER 10 MINUTES dès 30 min, affichage argent, durées effectives.
  Coûts provisoires, réversibles. Tests 23/23.

### Idées apparues

- (aucune, à trier vers lab si besoin)

### Décisions

- Aucune idée devient canon automatiquement.

### Observé

- Premier écran sobre, compteur + bouton fonctionnels (tests auto).

### Compréhension du joueur

- Non testé humain.

### Ennui / friction

- Non testé humain.

### Moments forts

- Aucun relevé humain.

### Bugs

- Aucun relevé humain.

### Idées apparues

- Aucune (le lab accueille les idées non validées).

### Décisions

- Aucune idée devient canon automatiquement.

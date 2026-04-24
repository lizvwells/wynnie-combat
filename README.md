# Wynnie — Combat Assistant

A D&D combat turn planner for Wynnie, a Level 5 Half-Elf Arcane Trickster Rogue.

## Setup

```bash
npm install
npm run dev
```

## Project Structure

```
wynnie-combat/
├── public/
│   ├── avatar.png        # Cropped face portrait
│   └── portrait.jpg      # Full illustration (background)
├── src/
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Features

- **Turn Planner** — Input your combat situation and get recommended action, bonus action, and reaction
- **Action Reference** — All actions, bonus actions, reactions, and free actions with weapon mastery details
- **Spell Reference** — Cantrips, 1st and 2nd level spells with save DCs and tactical notes
- **HP & Status Tracker** — Live HP, temp HP, concentration, and condition tracking
- **Resource Tracker** — Spell slots, Shadow Touched uses, and hit dice
- **Rest System** — Short and long rest with proper hit dice recovery (half on long rest)

## Character Data

All of Wynnie's stats are hardcoded in `App.jsx`. To update for level-ups, edit the constants at the top of the file:

- `MAX_HP` — Maximum hit points
- `ACTIONS` — Weapons, actions, bonus actions, reactions
- `SPELLS` — Cantrips and leveled spells
- `CUNNING_STRIKES` — Cunning Strike options and DCs
- `CONDITIONS` — Available condition toggles
- `generatePlan()` — The planner logic

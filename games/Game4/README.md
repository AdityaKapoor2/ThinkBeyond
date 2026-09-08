# BHARATAM — "Build Harappa" Minigame (~2500 BCE)
> **Gamified Digital Heritage Platform | Era: Indus Valley Civilization**

---

## 🏛️ Architecture Overview

The game is structured as a **generic, decoupled turn-based city builder engine** designed for easy reskinning across different ancient Indian historical eras (e.g. *Mauryan pillar builder*, *Qutub Minar complex*, *Chola temple planner*).

```
Game (build harappa)/
├── cityBuilderEngine.js    # Decoupled core mechanics, formulas, connectivity, & turn cycle
├── harappaConfig.js        # Harappan assets, costs, color tokens, and lore
├── useHarappaAudio.js      # Procedural Web Audio API sound engine (zero asset files needed)
├── BuildHarappa.jsx        # Master React component (Tabler outline icons, no emoji, 3-zone layout)
├── index.html              # Standalone, zero-install browser demo (open directly in browser)
└── README.md               # Documentation & integration guide
```

---

## 🎮 Game State & Exact Formulas

### 1. Grid Specifications
- **Grid Size**: $6 \times 6$ cells ($36$ total), indices $0$ to $35$.
- `row = Math.floor(index / 6)`, `col = index % 6`.
- **Fixed River**: Column 0 ($i \in \{0, 6, 12, 18, 24, 30\}$) is permanently locked as the **Indus River** (`W`). Clicking it displays an inline toast: `"Can't build on the river."`.
- **Buildable Cells**: The remaining 30 tiles start as empty (`.`).

### 2. Building Costs (Materials)
| Building | ID | Cost | Category | Effect |
|---|---|---|---|---|
| **House** | `H` | 10 | Residential | `+40 Population`, requires adjacent Road (`R`) & Drain (`D`) |
| **Road** | `R` | 5 | Infrastructure | Provides road frontage for houses |
| **Drain** | `D` | 5 | Infrastructure | Covered sanitation conduit for houses |
| **Granary** | `G` | 25 | Production | `+15 Food` per turn |
| **Well** | `L` | 20 | Production | `+15 Water` per turn, `+10 Trade` |
| **Workshop** | `K` | 30 | Commerce | `+30 Trade` capacity |
| **Clear Tile** | `CLEAR` | 0 | Utility | Demolishes structure |

### 3. Mathematical Formulas
```javascript
population = houseCount * 40

for each house tile:
  connected = neighbor tiles include at least one 'R' AND at least one 'D'
ratio = connectedHouses / totalHouses   // (ratio = 1 if there are no houses yet)

health    = Math.round(40 + ratio * 60)
happiness = Math.round(30 + ratio * 70)
trade     = Math.min(100, workshopCount * 30 + wellCount * 10)

if (water <= 0 || food <= 0) {
  happiness = Math.max(0, happiness - 20)
  health    = Math.max(0, health - 10)
}

civilizationScore = Math.round(population * 0.4 + health * 2 + happiness * 1.5 + trade)
```

### 4. End Turn Lifecycle
```javascript
waterUse = Math.round(population * 0.05)
foodUse  = Math.round(population * 0.05)
water = clamp(water - waterUse + wellCount * 15, 0, 200)
food  = clamp(food - foodUse + granaryCount * 15, 0, 200)
```
Then all stats and the `civilizationScore` are recalculated with the new resource pool.

### 5. Win Condition
When `civilizationScore >= 500`:
- Unlocks the **"Master Architect of Meluhha"** badge.
- Unlocks Knowledge Vault entry: *"Grid-iron town planning and civil engineering"*.
- Animates **`+100 XP`** and **`+40 Coins`**.
- Triggers the stubbed `saveProgress` function.
- Player can dismiss the win modal and continue in sandbox mode without being locked out.

---

## 🔊 Sound Design (Web Audio API)

All audio is procedurally synthesized in real time via the browser's native `AudioContext` (no external audio files required, zero 404 risk, zero latency):

- **Ambient Bed** (`~ -18dB`): Procedural river water trickling with sparse, distant clay-pot pings. Starts strictly upon first user gesture (complying with autoplay policies).
- **Tile Placement**:
  - `place-house`: Warm low ceramic thud (triangle pitch drop $140\text{Hz} \to 48\text{Hz}$).
  - `place-road`: Soft stone-scrape/shuffle (shaped bandpassed noise $1400\text{Hz} \to 750\text{Hz}$).
  - `place-drain`: Ceramic thud with an authentic water-gurgle bubble tail.
  - `place-special` (Granary, Well, Workshop): Ceramic thud + high-Q resonant clay-pot ring.
- **Invalid Action**: Soft low double-tap (two $110\text{Hz}$ pings).
- **Clear Tile**: Dry brush/sweep sound.
- **End Turn**: Resonant singing bowl / bronze temple-bell strike ($288\text{Hz}$ harmonic series).
- **Stat Increase**: Ascending 3-note bansuri flute flourish ($384\text{Hz} \to 480\text{Hz} \to 576\text{Hz}$).
- **Win Condition**: Triumphant Shankha (conch shell) swell paired with a deep, resonant Mridangam / Dhol sub-bass impact.
- **Mute Control**: Persistent mute/unmute icon in the header controlling master gain.

---

## 🎨 Palette Tokens

- **Background Outer**: `#241b14`
- **Panel / Toolbar / Stats**: `#3a2c1e`
- **Grid Canvas**: `#2e2216`
- **Empty Tile**: `#241b14`
- **Border / Hairline**: `#6b4f30`
- **Gold Accent**: `#e8c77e`
- **Muted Gold**: `#c9a875`
- **Cream Text**: `#f0e4cf` / `#d9c9a8`
- **River / Water**: `#2a4250` (icon `#7bb8d9`)
- **House**: `#4a3620` (icon `#e8c77e`)
- **Road**: `#3a2c1e` (icon `#c9a875`)
- **Drain**: `#2d4a42` (icon `#7bb8a5`)
- **Success State**: `#9fc98a`
- **Warning State**: `#d9a850`

---

## 🔌 Supabase Integration Stub

Located in [`BuildHarappa.jsx`](./BuildHarappa.jsx):

```javascript
// TODO: Supabase Integration
// Replace this stub with your Supabase table update:
const saveProgress = useCallback((result) => {
  /*
  await supabase.from('player_progress').upsert({
    user_id: user.id,
    era: 'indus_valley',
    minigame: 'build_harappa',
    xp_earned: result.xp,
    coins_earned: result.coins,
    badge_unlocked: result.badge,
    vault_entry_unlocked: result.vaultEntry,
    completed_at: new Date().toISOString()
  });
  */
  console.log('[BHARATAM - Supabase Stub] Progress Saved:', result);
}, []);
```

---

## 🚀 How to Run & Test

1. **Standalone**: Double-click [`index.html`](./index.html) in your browser or run:
   ```bash
   python -m http.server 8080
   ```
   Open `http://localhost:8080/index.html`.
2. **In your Vite + React App**:
   Import `BuildHarappa.jsx` directly into your page:
   ```jsx
   import BuildHarappa from './components/BuildHarappa';

   export default function HarappaPage() {
     return (
       <BuildHarappa 
         onNextMission={() => navigate('/missions/next')}
         onReturnToTimeline={() => navigate('/timeline')}
       />
     );
   }
   ```

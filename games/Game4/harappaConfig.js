/**
 * ============================================================================
 * BHARATAM: Harappa Configuration & Theme
 * ============================================================================
 * Contains building metadata, materials costs, historical lore, and color tokens
 * specific to the Indus Valley Civilization (c. 2500 BCE).
 */

export const HARAPPA_THEME = {
  bgOuter: '#241b14',
  panelBg: '#3a2c1e',
  gridCanvasBg: '#2e2216',
  tileEmpty: '#241b14',
  border: '#6b4f30',
  goldAccent: '#e8c77e',
  mutedGold: '#c9a875',
  creamText: '#f0e4cf',
  creamMuted: '#d9c9a8',
  waterTile: '#2a4250',
  waterIcon: '#7bb8d9',
  houseTile: '#4a3620',
  houseIcon: '#e8c77e',
  roadTile: '#3a2c1e',
  roadIcon: '#c9a875',
  drainTile: '#2d4a42',
  drainIcon: '#7bb8a5',
  successGood: '#9fc98a',
  warningLow: '#d9a850',
};

export const BUILDING_DEFINITIONS = [
  {
    id: 'H',
    name: 'House',
    cost: 10,
    category: 'residential',
    description: 'Baked-brick dwelling (+40 Population). Needs adjacent Road and Drain.',
    tileBg: HARAPPA_THEME.houseTile,
    iconTint: HARAPPA_THEME.houseIcon,
  },
  {
    id: 'R',
    name: 'Road',
    cost: 5,
    category: 'infrastructure',
    description: 'Paved thoroughfare for access and traffic.',
    tileBg: HARAPPA_THEME.roadTile,
    iconTint: HARAPPA_THEME.roadIcon,
  },
  {
    id: 'D',
    name: 'Drain',
    cost: 5,
    category: 'infrastructure',
    description: 'Covered sanitation conduit with inspection slabs.',
    tileBg: HARAPPA_THEME.drainTile,
    iconTint: HARAPPA_THEME.drainIcon,
  },
  {
    id: 'G',
    name: 'Granary',
    cost: 25,
    category: 'production',
    description: 'Ventilated brick silo (+15 Food production per turn).',
    tileBg: '#3d2e1c',
    iconTint: '#e8c77e',
  },
  {
    id: 'L',
    name: 'Well',
    cost: 20,
    category: 'production',
    description: 'Circular burnt-brick well (+15 Water per turn, +10 Trade).',
    tileBg: '#24343d',
    iconTint: '#7bb8d9',
  },
  {
    id: 'K',
    name: 'Workshop',
    cost: 30,
    category: 'commerce',
    description: 'Bead & metallurgy craft guild (+30 Trade capacity).',
    tileBg: '#442d1f',
    iconTint: '#e5a35c',
  },
  {
    id: 'CLEAR',
    name: 'Clear tile',
    cost: 0,
    category: 'utility',
    description: 'Demolish structure and return cell to bedrock.',
    tileBg: HARAPPA_THEME.tileEmpty,
    iconTint: '#a88d72',
  }
];

export const GAME_CONSTANTS = {
  WIN_SCORE_TARGET: 500,
  INITIAL_RESOURCES: {
    water: 200,
    food: 200,
    materials: 200,
  },
  MAX_RESOURCES: 200,
  REWARD: {
    xp: 100,
    coins: 40,
    badge: 'master-architect-of-meluhha',
    badgeTitle: 'Master Architect of Meluhha',
    vaultEntry: 'grid-iron-town-planning',
    vaultTitle: 'Grid-Iron Town Planning & Civil Engineering',
    vaultLore: 'Around 2500 BCE, Harappa and Mohenjo-daro introduced the ancient world\'s first strict cardinal street grids. Homes opened onto protected secondary lanes, and covered brick gutters carried municipal wastewater out of residential sectors—millennia before comparable systems appeared in Europe.',
  }
};

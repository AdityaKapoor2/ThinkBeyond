/**
 * ============================================================================
 * BHARATAM: Generic Turn-Based City Builder Engine
 * ============================================================================
 * Decoupled game engine logic designed for reskinning across different
 * ancient Indian eras (Harappan grid, Mauryan pillar complex, Qutub Minar, etc.)
 */

export const DEFAULT_GRID_ROWS = 6;
export const DEFAULT_GRID_COLS = 6;

/**
 * Calculates 4-directional cardinal neighbors for a grid cell.
 * @param {number} index - 0-indexed cell index (0 to rows*cols - 1)
 * @param {number} rows - Number of rows (default 6)
 * @param {number} cols - Number of columns (default 6)
 * @returns {number[]} Array of valid neighbor indices
 */
export function getCardinalNeighbors(index, rows = DEFAULT_GRID_ROWS, cols = DEFAULT_GRID_COLS) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const neighbors = [];

  // North (Up)
  if (row > 0) neighbors.push((row - 1) * cols + col);
  // South (Down)
  if (row < rows - 1) neighbors.push((row + 1) * cols + col);
  // West (Left)
  if (col > 0) neighbors.push(row * cols + (col - 1));
  // East (Right)
  if (col < cols - 1) neighbors.push(row * cols + (col + 1));

  return neighbors;
}

/**
 * Recomputes live stats for the settlement based on the exact game formulas:
 * 
 * population = houseCount * 40
 * for each house: connected = hasNeighbor('R') && hasNeighbor('D')
 * ratio = connectedHouses / totalHouses (1 if totalHouses === 0)
 * health = round(40 + ratio * 60)
 * happiness = round(30 + ratio * 70)
 * trade = min(100, workshopCount * 30 + wellCount * 10)
 * if water <= 0 OR food <= 0:
 *   happiness = max(0, happiness - 20)
 *   health = max(0, health - 10)
 * civilizationScore = round(population * 0.4 + health * 2 + happiness * 1.5 + trade)
 */
export function calculateCityStats(grid, resources, rows = DEFAULT_GRID_ROWS, cols = DEFAULT_GRID_COLS) {
  let houseCount = 0;
  let roadCount = 0;
  let drainCount = 0;
  let granaryCount = 0;
  let wellCount = 0;
  let workshopCount = 0;

  const houseIndices = [];

  // Count building types
  for (let i = 0; i < grid.length; i++) {
    const type = grid[i];
    if (type === 'H') {
      houseCount++;
      houseIndices.push(i);
    } else if (type === 'R') roadCount++;
    else if (type === 'D') drainCount++;
    else if (type === 'G') granaryCount++;
    else if (type === 'L') wellCount++;
    else if (type === 'K') workshopCount++;
  }

  const population = houseCount * 40;

  // Check connectivity for each house
  let connectedHouses = 0;
  const connectedHouseMap = {};

  for (const hIndex of houseIndices) {
    const neighbors = getCardinalNeighbors(hIndex, rows, cols);
    let hasRoad = false;
    let hasDrain = false;

    for (const nIndex of neighbors) {
      if (grid[nIndex] === 'R') hasRoad = true;
      if (grid[nIndex] === 'D') hasDrain = true;
    }

    const isConnected = hasRoad && hasDrain;
    if (isConnected) connectedHouses++;
    connectedHouseMap[hIndex] = isConnected;
  }

  const ratio = houseCount === 0 ? 1 : connectedHouses / houseCount;

  let health = Math.round(40 + ratio * 60);
  let happiness = Math.round(30 + ratio * 70);
  const trade = Math.min(100, workshopCount * 30 + wellCount * 10);

  // Penalty if water or food run out
  if (resources.water <= 0 || resources.food <= 0) {
    happiness = Math.max(0, happiness - 20);
    health = Math.max(0, health - 10);
  }

  const civilizationScore = Math.round(
    population * 0.4 + health * 2 + happiness * 1.5 + trade
  );

  return {
    population,
    houseCount,
    roadCount,
    drainCount,
    granaryCount,
    wellCount,
    workshopCount,
    connectedHouses,
    connectedRatio: ratio,
    connectedHouseMap,
    health,
    happiness,
    trade,
    civilizationScore,
  };
}

/**
 * Computes End Turn updates:
 * waterUse = round(population * 0.05)
 * foodUse = round(population * 0.05)
 * water = clamp(water - waterUse + wellCount * 15, 0, 200)
 * food = clamp(food - foodUse + granaryCount * 15, 0, 200)
 */
export function processEndTurn(grid, currentResources, rows = DEFAULT_GRID_ROWS, cols = DEFAULT_GRID_COLS) {
  // First calculate current population & buildings
  const currentStats = calculateCityStats(grid, currentResources, rows, cols);

  const waterUse = Math.round(currentStats.population * 0.05);
  const foodUse = Math.round(currentStats.population * 0.05);

  const newWater = Math.min(200, Math.max(0, currentResources.water - waterUse + currentStats.wellCount * 15));
  const newFood = Math.min(200, Math.max(0, currentResources.food - foodUse + currentStats.granaryCount * 15));

  const updatedResources = {
    ...currentResources,
    water: newWater,
    food: newFood,
  };

  // Recalculate stats using new resources
  const updatedStats = calculateCityStats(grid, updatedResources, rows, cols);

  return {
    updatedResources,
    updatedStats,
    turnReport: {
      waterUse,
      foodUse,
      waterGained: currentStats.wellCount * 15,
      foodGained: currentStats.granaryCount * 15,
    }
  };
}

/**
 * Initializes a 6x6 grid with column 0 as fixed River 'W' and all others empty '.'
 */
export function createInitialGrid(rows = DEFAULT_GRID_ROWS, cols = DEFAULT_GRID_COLS) {
  const grid = new Array(rows * cols).fill('.');
  for (let r = 0; r < rows; r++) {
    grid[r * cols] = 'W'; // Column 0 is the fixed river
  }
  return grid;
}

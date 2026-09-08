import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  getCardinalNeighbors, 
  calculateCityStats, 
  processEndTurn, 
  createInitialGrid,
  DEFAULT_GRID_ROWS,
  DEFAULT_GRID_COLS 
} from './cityBuilderEngine';
import { 
  HARAPPA_THEME, 
  BUILDING_DEFINITIONS, 
  GAME_CONSTANTS 
} from './harappaConfig';
import { useHarappaAudio } from './useHarappaAudio';

/**
 * ============================================================================
 * BHARATAM: "Build Harappa" Turn-Based Ancient City Builder
 * ============================================================================
 * An ancient Indus Valley Civilization urban planner component (~2500 BCE).
 * Built with decoupled engine logic for seamless reskinning across eras.
 */

// ============================================================================
// CLEAN TABLER-STYLE OUTLINE SVG ICONS (NO EMOJIS)
// ============================================================================

export function HouseIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
      <path d="M9 7h.01M15 7h.01" />
    </svg>
  );
}

export function RoadIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M12 5v3m0 4v3m0 4v2" strokeDasharray="1 1" />
      <path d="M4 12h16" opacity="0.4" />
    </svg>
  );
}

export function DrainIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v4H4z" />
      <path d="M6 8v12h12V8" />
      <path d="M9 11v6M12 11v6M15 11v6" />
      <path d="M4 14h16" opacity="0.4" />
    </svg>
  );
}

export function GranaryIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16" />
      <path d="M5 20V9l7-5 7 5v11" />
      <path d="M9 13h6M9 16h6" />
      <path d="M12 9v1" />
    </svg>
  );
}

export function WellIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="7" />
      <path d="M12 3v4M8 5l4-2 4 2" />
      <circle cx="12" cy="14" r="3" strokeDasharray="2 2" />
      <path d="M12 11v3" />
    </svg>
  );
}

export function WorkshopIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10h3v7H7z" />
      <path d="M10 13l4-4 3 3-4 4" />
      <path d="M14 6l3 3" />
      <path d="M4 21h16" />
      <path d="M18 17l2 2" />
    </svg>
  );
}

export function TrashIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  );
}

export function RiverWaterIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 12c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 17c3-2 6-2 9 0s6 2 9 0" />
    </svg>
  );
}

export function VolumeIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

export function VolumeMuteIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export function TrophyIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h1M17 6h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-1" />
    </svg>
  );
}

export function BadgeSealIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
      <circle cx="12" cy="12" r="3" strokeDasharray="2 2" />
    </svg>
  );
}

export function CoinIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9h-4a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4M12 7v10" />
    </svg>
  );
}

export function SparkleIcon({ className = "w-5 h-5", stroke = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 6.8L21.2 11.2l-6.8 2.4L12 20.4l-2.4-6.8L2.8 11.2l6.8-2.4z" />
    </svg>
  );
}

// Icon mapper helper
function renderToolIcon(id, className, stroke) {
  switch (id) {
    case 'H': return <HouseIcon className={className} stroke={stroke} />;
    case 'R': return <RoadIcon className={className} stroke={stroke} />;
    case 'D': return <DrainIcon className={className} stroke={stroke} />;
    case 'G': return <GranaryIcon className={className} stroke={stroke} />;
    case 'L': return <WellIcon className={className} stroke={stroke} />;
    case 'K': return <WorkshopIcon className={className} stroke={stroke} />;
    case 'CLEAR': return <TrashIcon className={className} stroke={stroke} />;
    case 'W': return <RiverWaterIcon className={className} stroke={stroke} />;
    default: return null;
  }
}

// ============================================================================
// MAIN COMPONENT: BuildHarappa
// ============================================================================

export default function BuildHarappa({ onReturnToTimeline, onNextMission }) {
  // --------------------------------------------------------------------------
  // SOUND HOOK
  // --------------------------------------------------------------------------
  const { playSound, isMuted, toggleMute } = useHarappaAudio();

  // --------------------------------------------------------------------------
  // GAME STATE
  // --------------------------------------------------------------------------
  const [grid, setGrid] = useState(() => createInitialGrid());
  const [resources, setResources] = useState(() => ({ ...GAME_CONSTANTS.INITIAL_RESOURCES }));
  const [activeTool, setActiveTool] = useState('H'); // 'H' (House) selected by default
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [inlineMessage, setInlineMessage] = useState(null);
  const inlineTimerRef = useRef(null);

  // Turn count & Previous score tracking for stat increase audio cues
  const [turnNumber, setTurnNumber] = useState(1);
  const prevScoreRef = useRef(0);

  // Win condition states
  const [hasWon, setHasWon] = useState(false);
  const [showWinBanner, setShowWinBanner] = useState(false);

  // Animated reward counters
  const [animatedXP, setAnimatedXP] = useState(0);
  const [animatedCoins, setAnimatedCoins] = useState(0);

  // Computed Live Stats
  const cityStats = calculateCityStats(grid, resources);

  // --------------------------------------------------------------------------
  // NOTIFICATION BANNER / INLINE MESSAGE HELPER
  // --------------------------------------------------------------------------
  const showInlineError = useCallback((message) => {
    playSound('invalid');
    setInlineMessage(message);
    if (inlineTimerRef.current) clearTimeout(inlineTimerRef.current);
    inlineTimerRef.current = setTimeout(() => {
      setInlineMessage(null);
    }, 2400);
  }, [playSound]);

  // --------------------------------------------------------------------------
  // SUPABASE SAVE PROGRESS STUB
  // --------------------------------------------------------------------------
  const saveProgress = useCallback((result) => {
    // ========================================================================
    // TODO: Supabase Integration
    // Replace this stub with your Supabase table update:
    // await supabase.from('player_progress').upsert({
    //   user_id: user.id,
    //   era: 'indus_valley',
    //   minigame: 'build_harappa',
    //   xp_earned: result.xp,
    //   coins_earned: result.coins,
    //   badge_unlocked: result.badge,
    //   vault_entry_unlocked: result.vaultEntry,
    //   completed_at: new Date().toISOString()
    // });
    // ========================================================================
    console.log('[BHARATAM - Supabase Stub] Progress Saved:', result);
  }, []);

  // --------------------------------------------------------------------------
  // WIN CONDITION CHECK (civilizationScore >= 500)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!hasWon && cityStats.civilizationScore >= GAME_CONSTANTS.WIN_SCORE_TARGET) {
      setHasWon(true);
      setShowWinBanner(true);
      playSound('win');

      // Animate XP and Coins count up
      let curXp = 0;
      let curCoins = 0;
      const targetXp = GAME_CONSTANTS.REWARD.xp;
      const targetCoins = GAME_CONSTANTS.REWARD.coins;
      const interval = setInterval(() => {
        curXp = Math.min(targetXp, curXp + 4);
        curCoins = Math.min(targetCoins, curCoins + 2);
        setAnimatedXP(curXp);
        setAnimatedCoins(curCoins);
        if (curXp >= targetXp && curCoins >= targetCoins) {
          clearInterval(interval);
        }
      }, 40);

      // Trigger stubbed Supabase save
      saveProgress({
        xp: GAME_CONSTANTS.REWARD.xp,
        coins: GAME_CONSTANTS.REWARD.coins,
        badge: GAME_CONSTANTS.REWARD.badge,
        vaultEntry: GAME_CONSTANTS.REWARD.vaultEntry,
      });
    }
  }, [cityStats.civilizationScore, hasWon, playSound, saveProgress]);

  // --------------------------------------------------------------------------
  // TOOLBAR SELECTION
  // --------------------------------------------------------------------------
  const handleToolClick = (toolId) => {
    if (activeTool === toolId) {
      setActiveTool(null); // Clicking again deselects tool
    } else {
      setActiveTool(toolId);
    }
  };

  // --------------------------------------------------------------------------
  // TILE INTERACTION (PLACEMENT & CLEARING)
  // --------------------------------------------------------------------------
  const handleCellClick = (index) => {
    const col = index % DEFAULT_GRID_COLS;
    const currentType = grid[index];

    // Rule: Column 0 is the fixed, non-buildable river
    if (col === 0 || currentType === 'W') {
      showInlineError("Can't build on the river.");
      return;
    }

    if (!activeTool) {
      showInlineError("Select a building or clear tool first.");
      return;
    }

    // Clear Tile Tool
    if (activeTool === 'CLEAR') {
      if (currentType === '.') return; // already empty
      playSound('clear-tile');
      const newGrid = [...grid];
      newGrid[index] = '.';
      setGrid(newGrid);
      return;
    }

    // Placing a Building
    const building = BUILDING_DEFINITIONS.find((b) => b.id === activeTool);
    if (!building) return;

    // Cost verification
    if (resources.materials < building.cost) {
      showInlineError("Not enough materials.");
      return;
    }

    // Skip if cell already has this exact building
    if (currentType === building.id) return;

    // Deduct materials immediately
    setResources((prev) => ({
      ...prev,
      materials: prev.materials - building.cost,
    }));

    // Update grid immutably
    const newGrid = [...grid];
    newGrid[index] = building.id;
    setGrid(newGrid);

    // Play building-specific placement sound
    switch (building.id) {
      case 'H': playSound('place-house'); break;
      case 'R': playSound('place-road'); break;
      case 'D': playSound('place-drain'); break;
      case 'G': playSound('place-granary'); break;
      case 'L': playSound('place-well'); break;
      case 'K': playSound('place-workshop'); break;
      default: playSound('place-house'); break;
    }
  };

  // --------------------------------------------------------------------------
  // END TURN LOGIC
  // --------------------------------------------------------------------------
  const handleEndTurn = () => {
    playSound('end-turn');

    const { updatedResources, updatedStats } = processEndTurn(grid, resources);
    setResources(updatedResources);
    setTurnNumber((prev) => prev + 1);

    // Check for meaningful score increase to play the bansuri flourish
    if (updatedStats.civilizationScore > prevScoreRef.current + 25) {
      setTimeout(() => {
        playSound('stat-increase');
      }, 750);
    }
    prevScoreRef.current = updatedStats.civilizationScore;
  };

  // --------------------------------------------------------------------------
  // RESET CITY
  // --------------------------------------------------------------------------
  const handleResetCity = () => {
    playSound('clear-tile');
    setGrid(createInitialGrid());
    setResources({ ...GAME_CONSTANTS.INITIAL_RESOURCES });
    setTurnNumber(1);
    setHasWon(false);
    setShowWinBanner(false);
    prevScoreRef.current = 0;
  };

  // Pre-fetch active building definition for tooltips
  const currentActiveBuilding = BUILDING_DEFINITIONS.find((b) => b.id === activeTool);

  return (
    <div 
      className="w-full h-screen max-h-screen flex flex-col justify-between select-none overflow-hidden font-sans"
      style={{
        backgroundColor: HARAPPA_THEME.bgOuter,
        color: HARAPPA_THEME.creamText,
      }}
    >
      {/* =====================================================================
          1. TOP RESOURCE BAR
      ===================================================================== */}
      <header 
        className="w-full px-6 py-2.5 flex items-center justify-between border-b"
        style={{
          backgroundColor: HARAPPA_THEME.panelBg,
          borderColor: HARAPPA_THEME.border,
        }}
      >
        {/* Title & Era Badge */}
        <div className="flex items-center space-x-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center border"
            style={{ 
              backgroundColor: HARAPPA_THEME.gridCanvasBg,
              borderColor: HARAPPA_THEME.border,
              color: HARAPPA_THEME.goldAccent 
            }}
          >
            <BadgeSealIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span 
                className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border"
                style={{ 
                  backgroundColor: 'rgba(232, 199, 126, 0.12)', 
                  borderColor: 'rgba(232, 199, 126, 0.3)',
                  color: HARAPPA_THEME.goldAccent 
                }}
              >
                BHARATAM • INDUS VALLEY
              </span>
              <span className="text-[11px] font-mono" style={{ color: HARAPPA_THEME.creamMuted }}>
                Turn {turnNumber}
              </span>
            </div>
            <h1 
              className="text-sm font-extrabold tracking-wide"
              style={{ color: HARAPPA_THEME.goldAccent }}
            >
              Build Harappa (~2500 BCE)
            </h1>
          </div>
        </div>

        {/* 4 Resource Chips */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Water Chip */}
          <div 
            className="px-3 py-1 rounded-lg border flex items-center space-x-2 text-xs font-mono"
            style={{ 
              backgroundColor: HARAPPA_THEME.gridCanvasBg,
              borderColor: resources.water <= 20 ? HARAPPA_THEME.warningLow : HARAPPA_THEME.border 
            }}
          >
            <RiverWaterIcon className="w-4 h-4" stroke={HARAPPA_THEME.waterIcon} />
            <div>
              <span className="text-[10px] uppercase font-sans block" style={{ color: HARAPPA_THEME.creamMuted }}>Water</span>
              <span className="font-bold">{resources.water}</span>
              <span className="text-[10px] opacity-60">/200</span>
            </div>
          </div>

          {/* Food Chip */}
          <div 
            className="px-3 py-1 rounded-lg border flex items-center space-x-2 text-xs font-mono"
            style={{ 
              backgroundColor: HARAPPA_THEME.gridCanvasBg,
              borderColor: resources.food <= 20 ? HARAPPA_THEME.warningLow : HARAPPA_THEME.border 
            }}
          >
            <GranaryIcon className="w-4 h-4" stroke={HARAPPA_THEME.goldAccent} />
            <div>
              <span className="text-[10px] uppercase font-sans block" style={{ color: HARAPPA_THEME.creamMuted }}>Food</span>
              <span className="font-bold">{resources.food}</span>
              <span className="text-[10px] opacity-60">/200</span>
            </div>
          </div>

          {/* Materials Chip */}
          <div 
            className="px-3 py-1 rounded-lg border flex items-center space-x-2 text-xs font-mono"
            style={{ 
              backgroundColor: HARAPPA_THEME.gridCanvasBg,
              borderColor: resources.materials < 10 ? HARAPPA_THEME.warningLow : HARAPPA_THEME.border 
            }}
          >
            <HouseIcon className="w-4 h-4" stroke={HARAPPA_THEME.mutedGold} />
            <div>
              <span className="text-[10px] uppercase font-sans block" style={{ color: HARAPPA_THEME.creamMuted }}>Materials</span>
              <span className="font-bold">{resources.materials}</span>
              <span className="text-[10px] opacity-60">/200</span>
            </div>
          </div>

          {/* Highlighted Civilization Score Chip */}
          <div 
            className="px-4 py-1.5 rounded-lg border flex items-center space-x-2.5 shadow-md transition-all"
            style={{ 
              backgroundColor: 'rgba(232, 199, 126, 0.15)',
              borderColor: HARAPPA_THEME.goldAccent,
            }}
          >
            <TrophyIcon className="w-5 h-5" stroke={HARAPPA_THEME.goldAccent} />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: HARAPPA_THEME.goldAccent }}>
                Civilization Score
              </span>
              <span className="text-base font-extrabold font-mono" style={{ color: HARAPPA_THEME.goldAccent }}>
                {cityStats.civilizationScore}
              </span>
              <span className="text-[10px] ml-1 opacity-70" style={{ color: HARAPPA_THEME.creamText }}>/500</span>
            </div>
          </div>

          {/* Persistent Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg border transition-colors hover:opacity-80 ml-2"
            style={{ 
              backgroundColor: HARAPPA_THEME.gridCanvasBg,
              borderColor: HARAPPA_THEME.border,
              color: isMuted ? HARAPPA_THEME.warningLow : HARAPPA_THEME.goldAccent 
            }}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeMuteIcon className="w-4 h-4" /> : <VolumeIcon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* =====================================================================
          2. THREE-ZONE MAIN LAYOUT (TOOLBAR, GRID CANVAS, STATS PANEL)
      ===================================================================== */}
      <main className="flex-1 flex flex-row items-stretch justify-center p-3 gap-4 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* -------------------------------------------------------------------
            LEFT TOOLBAR: Vertical Building Selection
        ------------------------------------------------------------------- */}
        <aside 
          className="w-56 flex flex-col justify-between p-3 rounded-xl border shadow-lg overflow-y-auto"
          style={{
            backgroundColor: HARAPPA_THEME.panelBg,
            borderColor: HARAPPA_THEME.border,
          }}
        >
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center justify-between" style={{ color: HARAPPA_THEME.mutedGold }}>
              <span>Architecture Tools</span>
              {activeTool && (
                <span className="text-[10px] font-normal" style={{ color: HARAPPA_THEME.creamMuted }}>
                  Click to deselect
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              {BUILDING_DEFINITIONS.map((tool) => {
                const isSelected = activeTool === tool.id;
                const canAfford = resources.materials >= tool.cost;

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className={`
                      w-full p-2 rounded-lg border text-left flex items-center justify-between transition-all duration-150
                      ${isSelected ? 'ring-2 scale-[1.02]' : 'hover:brightness-110'}
                    `}
                    style={{
                      backgroundColor: isSelected ? 'rgba(232, 199, 126, 0.18)' : HARAPPA_THEME.gridCanvasBg,
                      borderColor: isSelected ? HARAPPA_THEME.goldAccent : HARAPPA_THEME.border,
                      ringColor: HARAPPA_THEME.goldAccent,
                    }}
                    title={tool.description}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div 
                        className="w-7 h-7 rounded flex items-center justify-center border"
                        style={{ 
                          backgroundColor: tool.tileBg,
                          borderColor: HARAPPA_THEME.border,
                          color: tool.iconTint 
                        }}
                      >
                        {renderToolIcon(tool.id, "w-4 h-4", tool.iconTint)}
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: isSelected ? HARAPPA_THEME.goldAccent : HARAPPA_THEME.creamText }}>
                          {tool.name}
                        </div>
                        <div className="text-[10px] font-mono" style={{ color: canAfford ? HARAPPA_THEME.creamMuted : HARAPPA_THEME.warningLow }}>
                          {tool.cost > 0 ? `${tool.cost} materials` : 'Free'}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: HARAPPA_THEME.goldAccent }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool Info Tip */}
          <div 
            className="p-2.5 rounded-lg border text-[11px] leading-relaxed mt-2"
            style={{ 
              backgroundColor: HARAPPA_THEME.gridCanvasBg,
              borderColor: HARAPPA_THEME.border,
              color: HARAPPA_THEME.creamMuted 
            }}
          >
            {currentActiveBuilding ? (
              <>
                <strong className="block mb-0.5" style={{ color: HARAPPA_THEME.goldAccent }}>
                  {currentActiveBuilding.name}
                </strong>
                {currentActiveBuilding.description}
              </>
            ) : (
              <span className="italic">Click a building from the toolbar to begin construction.</span>
            )}
          </div>
        </aside>

        {/* -------------------------------------------------------------------
            CENTER GRID CANVAS: 6x6 Ancient City Grid
        ------------------------------------------------------------------- */}
        <section className="flex-1 flex flex-col items-center justify-center relative">
          
          {/* Inline Error Toast */}
          {inlineMessage && (
            <div 
              className="absolute top-2 z-30 px-4 py-1.5 rounded-full border text-xs font-semibold shadow-xl transition-all duration-200 animate-pulse"
              style={{
                backgroundColor: 'rgba(58, 44, 30, 0.95)',
                borderColor: HARAPPA_THEME.warningLow,
                color: HARAPPA_THEME.warningLow,
              }}
            >
              {inlineMessage}
            </div>
          )}

          {/* Grid Canvas Wrapper */}
          <div 
            className="p-3.5 sm:p-5 rounded-2xl border-2 shadow-2xl flex flex-col items-center"
            style={{
              backgroundColor: HARAPPA_THEME.gridCanvasBg,
              borderColor: HARAPPA_THEME.border,
            }}
          >
            {/* Cardinal Markers / River Header */}
            <div className="w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-widest px-1 mb-2" style={{ color: HARAPPA_THEME.mutedGold }}>
              <span className="flex items-center space-x-1" style={{ color: HARAPPA_THEME.waterIcon }}>
                <RiverWaterIcon className="w-3.5 h-3.5" />
                <span>Indus River Basin</span>
              </span>
              <span>Cardinal Grid Layout (6x6)</span>
            </div>

            {/* The 6x6 Interactive Grid */}
            <div 
              className="grid grid-cols-6 gap-1.5 sm:gap-2 select-none"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {grid.map((cellType, index) => {
                const isRiver = cellType === 'W';
                const isHovered = hoveredIndex === index;
                const isConnectedHouse = cellType === 'H' && cityStats.connectedHouseMap[index];
                const isDisconnectedHouse = cellType === 'H' && !cityStats.connectedHouseMap[index];

                // Determine styling based on cell type
                let cellBg = HARAPPA_THEME.tileEmpty;
                let strokeColor = HARAPPA_THEME.creamMuted;
                let borderColor = HARAPPA_THEME.border;

                if (isRiver) {
                  cellBg = HARAPPA_THEME.waterTile;
                  strokeColor = HARAPPA_THEME.waterIcon;
                  borderColor = 'rgba(123, 184, 217, 0.4)';
                } else if (cellType === 'H') {
                  cellBg = HARAPPA_THEME.houseTile;
                  strokeColor = HARAPPA_THEME.houseIcon;
                  borderColor = isConnectedHouse ? HARAPPA_THEME.successGood : HARAPPA_THEME.warningLow;
                } else if (cellType === 'R') {
                  cellBg = HARAPPA_THEME.roadTile;
                  strokeColor = HARAPPA_THEME.roadIcon;
                } else if (cellType === 'D') {
                  cellBg = HARAPPA_THEME.drainTile;
                  strokeColor = HARAPPA_THEME.drainIcon;
                } else if (cellType === 'G') {
                  cellBg = '#3d2e1c';
                  strokeColor = HARAPPA_THEME.goldAccent;
                } else if (cellType === 'L') {
                  cellBg = '#24343d';
                  strokeColor = HARAPPA_THEME.waterIcon;
                } else if (cellType === 'K') {
                  cellBg = '#442d1f';
                  strokeColor = '#e5a35c';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={`
                      w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl border flex flex-col items-center justify-center
                      relative transition-all duration-150 overflow-hidden group
                      ${isHovered && !isRiver ? 'scale-[1.03] z-10' : ''}
                      ${isRiver ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}
                    `}
                    style={{
                      backgroundColor: cellBg,
                      borderColor: isHovered && !isRiver ? HARAPPA_THEME.goldAccent : borderColor,
                      boxShadow: isHovered && !isRiver ? `0 0 12px rgba(232, 199, 126, 0.25)` : 'none'
                    }}
                    aria-label={`Cell ${index}: ${cellType}`}
                  >
                    {/* River Water Ripple Pattern */}
                    {isRiver && (
                      <div className="flex flex-col items-center justify-center">
                        <RiverWaterIcon className="w-5 h-5 sm:w-6 sm:h-6" stroke={HARAPPA_THEME.waterIcon} />
                        <span className="text-[8px] sm:text-[9px] font-mono tracking-tighter uppercase mt-0.5" style={{ color: HARAPPA_THEME.waterIcon }}>
                          River
                        </span>
                      </div>
                    )}

                    {/* Empty Tile */}
                    {cellType === '.' && (
                      <div className="w-full h-full flex items-center justify-center">
                        {isHovered && activeTool && activeTool !== 'CLEAR' ? (
                          <div className="opacity-60 scale-105 transition-transform">
                            {renderToolIcon(activeTool, "w-6 h-6", HARAPPA_THEME.goldAccent)}
                          </div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full opacity-20" style={{ backgroundColor: HARAPPA_THEME.border }} />
                        )}
                      </div>
                    )}

                    {/* Placed Building Icon & Tag */}
                    {!isRiver && cellType !== '.' && (
                      <div className="flex flex-col items-center justify-center">
                        {renderToolIcon(cellType, "w-6 h-6 sm:w-7 sm:h-7", strokeColor)}
                        <span 
                          className="text-[8px] sm:text-[9px] font-semibold tracking-tighter uppercase mt-0.5"
                          style={{ color: strokeColor }}
                        >
                          {cellType === 'H' ? 'House' : cellType === 'R' ? 'Road' : cellType === 'D' ? 'Drain' : cellType === 'G' ? 'Granary' : cellType === 'L' ? 'Well' : 'Workshop'}
                        </span>
                      </div>
                    )}

                    {/* House Connection Status Indicator */}
                    {cellType === 'H' && (
                      <div 
                        className="absolute top-1 right-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: isConnectedHouse ? HARAPPA_THEME.successGood : HARAPPA_THEME.warningLow }}
                        title={isConnectedHouse ? "Connected to Road & Drain (+Health & Happiness)" : "Disconnected: Requires adjacent Road AND Drain"}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            RIGHT STATS PANEL: Live City Metrics & End Turn
        ------------------------------------------------------------------- */}
        <aside 
          className="w-64 flex flex-col justify-between p-4 rounded-xl border shadow-lg overflow-y-auto"
          style={{
            backgroundColor: HARAPPA_THEME.panelBg,
            borderColor: HARAPPA_THEME.border,
          }}
        >
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: HARAPPA_THEME.mutedGold }}>
              City Demographics & Metrics
            </div>

            <div className="space-y-3">
              {/* Population */}
              <div 
                className="p-2.5 rounded-lg border"
                style={{ backgroundColor: HARAPPA_THEME.gridCanvasBg, borderColor: HARAPPA_THEME.border }}
              >
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: HARAPPA_THEME.creamMuted }}>Population</span>
                  <span className="font-mono font-bold" style={{ color: HARAPPA_THEME.creamText }}>
                    {cityStats.population}
                  </span>
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: HARAPPA_THEME.creamMuted }}>
                  {cityStats.houseCount} house(s) × 40 citizens
                </div>
              </div>

              {/* Health % */}
              <div 
                className="p-2.5 rounded-lg border"
                style={{ backgroundColor: HARAPPA_THEME.gridCanvasBg, borderColor: HARAPPA_THEME.border }}
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span style={{ color: HARAPPA_THEME.creamMuted }}>Health</span>
                  <span className="font-mono font-bold" style={{ color: cityStats.health >= 70 ? HARAPPA_THEME.successGood : HARAPPA_THEME.warningLow }}>
                    {cityStats.health}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: HARAPPA_THEME.panelBg }}>
                  <div 
                    className="h-full transition-all duration-300 rounded-full"
                    style={{ 
                      width: `${cityStats.health}%`, 
                      backgroundColor: cityStats.health >= 70 ? HARAPPA_THEME.successGood : HARAPPA_THEME.warningLow 
                    }}
                  />
                </div>
              </div>

              {/* Happiness % */}
              <div 
                className="p-2.5 rounded-lg border"
                style={{ backgroundColor: HARAPPA_THEME.gridCanvasBg, borderColor: HARAPPA_THEME.border }}
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span style={{ color: HARAPPA_THEME.creamMuted }}>Happiness</span>
                  <span className="font-mono font-bold" style={{ color: cityStats.happiness >= 70 ? HARAPPA_THEME.successGood : HARAPPA_THEME.warningLow }}>
                    {cityStats.happiness}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: HARAPPA_THEME.panelBg }}>
                  <div 
                    className="h-full transition-all duration-300 rounded-full"
                    style={{ 
                      width: `${cityStats.happiness}%`, 
                      backgroundColor: cityStats.happiness >= 70 ? HARAPPA_THEME.successGood : HARAPPA_THEME.warningLow 
                    }}
                  />
                </div>
              </div>

              {/* Trade % */}
              <div 
                className="p-2.5 rounded-lg border"
                style={{ backgroundColor: HARAPPA_THEME.gridCanvasBg, borderColor: HARAPPA_THEME.border }}
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span style={{ color: HARAPPA_THEME.creamMuted }}>Trade Capacity</span>
                  <span className="font-mono font-bold" style={{ color: HARAPPA_THEME.goldAccent }}>
                    {cityStats.trade}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: HARAPPA_THEME.panelBg }}>
                  <div 
                    className="h-full transition-all duration-300 rounded-full"
                    style={{ width: `${cityStats.trade}%`, backgroundColor: HARAPPA_THEME.goldAccent }}
                  />
                </div>
              </div>

              {/* Objective Banner */}
              <div 
                className="p-2.5 rounded-lg border text-xs"
                style={{ 
                  backgroundColor: 'rgba(232, 199, 126, 0.08)', 
                  borderColor: 'rgba(232, 199, 126, 0.25)',
                  color: HARAPPA_THEME.goldAccent 
                }}
              >
                <strong className="block text-[11px] uppercase tracking-wider mb-0.5">Directive</strong>
                Connect houses to road and drain. Reach score 500.
              </div>
            </div>
          </div>

          {/* End Turn & Reset City Action Buttons */}
          <div className="space-y-2 mt-4">
            <button
              onClick={handleEndTurn}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-[0.98] hover:brightness-105 flex items-center justify-center space-x-2"
              style={{
                backgroundColor: HARAPPA_THEME.goldAccent,
                color: '#241b14',
              }}
            >
              <span>End Turn</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/15">
                Turn {turnNumber}
              </span>
            </button>

            <button
              onClick={handleResetCity}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold border transition-colors hover:border-red-500/50"
              style={{
                backgroundColor: HARAPPA_THEME.gridCanvasBg,
                borderColor: HARAPPA_THEME.border,
                color: HARAPPA_THEME.creamMuted,
              }}
            >
              Reset City
            </button>
          </div>
        </aside>
      </main>

      {/* =====================================================================
          3. WIN BANNER & PROGRESSION REWARD MODAL
      ===================================================================== */}
      {showWinBanner && (
        <section 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
        >
          <div 
            className="relative w-full max-w-lg rounded-2xl border-2 p-6 text-center shadow-2xl overflow-hidden"
            style={{
              backgroundColor: HARAPPA_THEME.panelBg,
              borderColor: HARAPPA_THEME.goldAccent,
              color: HARAPPA_THEME.creamText,
            }}
          >
            {/* Top Seal Stamp */}
            <div className="w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center mb-3 shadow-inner" style={{ borderColor: HARAPPA_THEME.goldAccent, backgroundColor: HARAPPA_THEME.gridCanvasBg }}>
              <TrophyIcon className="w-8 h-8" stroke={HARAPPA_THEME.goldAccent} />
            </div>

            <div className="text-[11px] font-mono uppercase tracking-widest font-bold" style={{ color: HARAPPA_THEME.goldAccent }}>
              Civilization Milestone Achieved
            </div>

            <h2 className="text-xl sm:text-2xl font-black mt-1" style={{ color: HARAPPA_THEME.goldAccent }}>
              {GAME_CONSTANTS.REWARD.badgeTitle}
            </h2>

            <p className="text-xs mt-1 leading-relaxed" style={{ color: HARAPPA_THEME.creamMuted }}>
              Your standardized brick grid, sanitary conduits, and municipal trade satisfy the ancient civil bylaws of Meluhha!
            </p>

            {/* Rewards: Animated XP & Coins */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div 
                className="p-3 rounded-xl border flex items-center space-x-3"
                style={{ backgroundColor: HARAPPA_THEME.gridCanvasBg, borderColor: HARAPPA_THEME.border }}
              >
                <SparkleIcon className="w-6 h-6" stroke={HARAPPA_THEME.goldAccent} />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold" style={{ color: HARAPPA_THEME.mutedGold }}>Experience</div>
                  <div className="text-lg font-mono font-black" style={{ color: HARAPPA_THEME.goldAccent }}>
                    +{animatedXP} XP
                  </div>
                </div>
              </div>

              <div 
                className="p-3 rounded-xl border flex items-center space-x-3"
                style={{ backgroundColor: HARAPPA_THEME.gridCanvasBg, borderColor: HARAPPA_THEME.border }}
              >
                <CoinIcon className="w-6 h-6" stroke={HARAPPA_THEME.goldAccent} />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold" style={{ color: HARAPPA_THEME.mutedGold }}>Ancient Coins</div>
                  <div className="text-lg font-mono font-black" style={{ color: HARAPPA_THEME.goldAccent }}>
                    +{animatedCoins} Coins
                  </div>
                </div>
              </div>
            </div>

            {/* Knowledge Vault Unlock Card */}
            <div 
              className="p-3.5 rounded-xl border text-left mb-4"
              style={{ 
                backgroundColor: 'rgba(46, 34, 22, 0.95)',
                borderColor: HARAPPA_THEME.border,
              }}
            >
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: HARAPPA_THEME.goldAccent }}>
                <span>Knowledge Vault Unlocked</span>
              </div>
              <h4 className="text-xs font-bold" style={{ color: HARAPPA_THEME.creamText }}>
                {GAME_CONSTANTS.REWARD.vaultTitle}
              </h4>
              <p className="text-[11px] mt-1 leading-relaxed" style={{ color: HARAPPA_THEME.creamMuted }}>
                {GAME_CONSTANTS.REWARD.vaultLore}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              {onNextMission && (
                <button
                  onClick={onNextMission}
                  className="flex-1 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all"
                  style={{ backgroundColor: HARAPPA_THEME.goldAccent, color: '#241b14' }}
                >
                  Next Era Chapter →
                </button>
              )}

              {onReturnToTimeline && (
                <button
                  onClick={onReturnToTimeline}
                  className="py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider border"
                  style={{ backgroundColor: HARAPPA_THEME.gridCanvasBg, borderColor: HARAPPA_THEME.border, color: HARAPPA_THEME.creamText }}
                >
                  Return to Timeline
                </button>
              )}

              <button
                onClick={() => setShowWinBanner(false)}
                className="py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider border"
                style={{ 
                  backgroundColor: HARAPPA_THEME.gridCanvasBg, 
                  borderColor: HARAPPA_THEME.border, 
                  color: HARAPPA_THEME.goldAccent 
                }}
              >
                Continue City (Sandbox)
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

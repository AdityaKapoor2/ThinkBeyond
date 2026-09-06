/* ============================================================
   BHARATAM — REACTIVE PLAYER STATE ENGINE (state.js)
   Fully dynamic state store managing player growth, currency,
   journey progression, quests, paths, and recent unlocks.
   ============================================================ */

(function () {
  const STORAGE_KEY = 'bharatam_player_state_v1';

  const defaultState = {
    user: {
      name: 'Anveshak',
      title: 'Seeker of Knowledge',
      level: 15,
      xp: 620,
      nextLevelXp: 1000,
      avatar: 'avatar-anveshak'
    },
    currencies: {
      coins: 1250,
      gems: 340,
      shards: 18
    },
    streak: {
      days: 7,
      keepItUpText: 'Keep it up!',
      lastClaimedDate: new Date().toISOString().split('T')[0]
    },
    activeJourney: {
      era: 'TRETA YUGA',
      chapter: 'The Exile Begins',
      description: 'Journey alongside Shri Rama, Sita, and Lakshmana as they step into the sacred Dandakaranya forest.',
      progress: 60,
      stage: 3,
      totalStages: 5
    },
    dailyQuest: {
      id: 'quest_timeline_events',
      title: 'Daily Quest',
      description: 'Complete 2 events from any timeline',
      current: 1,
      target: 2,
      reward: 50,
      claimed: false
    },
    paths: [
      {
        id: 'hindu',
        title: 'Hindu Traditions',
        subtitle: 'Yugas, Epics, Philosophy & more',
        emblem: 'ॐ',
        colorClass: 'path-hindu',
        progress: 45,
        totalEvents: 12,
        completedEvents: 5,
        currentModule: {
          title: 'The Principles of Dharma & Karma',
          question: 'In the epic Mahabharata, which foundational concept dictates righteous duty and moral cosmic order?',
          options: [
            { text: 'Moksha (Liberation)', correct: false },
            { text: 'Dharma (Cosmic Order & Righteous Duty)', correct: true },
            { text: 'Artha (Material Prosperity)', correct: false },
            { text: 'Kama (Desire)', correct: false }
          ],
          rewardXp: 150,
          rewardCoins: 40,
          rewardRelic: {
            id: 'relic_gita',
            title: 'Sacred Palm Leaf of Dharma',
            type: 'Manuscript',
            era: 'Dvapara Yuga',
            icon: '📜'
          }
        }
      },
      {
        id: 'buddhist',
        title: 'Buddhist Heritage',
        subtitle: 'Teachings, Stupas, Spread & more',
        emblem: '☸',
        colorClass: 'path-buddhist',
        progress: 30,
        totalEvents: 10,
        completedEvents: 3,
        currentModule: {
          title: 'The Great Stupa at Sanchi',
          question: 'Emperor Ashoka commissioned the monumental Great Stupa at Sanchi primarily to enshrine what sacred elements?',
          options: [
            { text: 'Royal battle armaments', correct: false },
            { text: 'Relics of the Buddha & Dhamma teachings', correct: true },
            { text: 'State taxation treasuries', correct: false },
            { text: 'Foreign diplomatic gifts', correct: false }
          ],
          rewardXp: 140,
          rewardCoins: 35,
          rewardRelic: {
            id: 'relic_sanchi',
            title: 'Torana Gateway Relief',
            type: 'Stone Carving',
            era: 'Mauryan Era',
            icon: '🏛️'
          }
        }
      },
      {
        id: 'jain',
        title: 'Jain Philosophy',
        subtitle: 'Tirthankaras, Values & more',
        emblem: '✋',
        colorClass: 'path-jain',
        progress: 20,
        totalEvents: 8,
        completedEvents: 2,
        currentModule: {
          title: 'Ahimsa Paramo Dharma',
          question: 'Which paramount ethical principle is symbolized by the wheel inscribed within the open palm of Jain iconography?',
          options: [
            { text: 'Aparigraha (Non-possession)', correct: false },
            { text: 'Satya (Truthfulness)', correct: false },
            { text: 'Ahimsa (Universal Non-Violence)', correct: true },
            { text: 'Brahmacharya (Chastity)', correct: false }
          ],
          rewardXp: 130,
          rewardCoins: 30,
          rewardRelic: {
            id: 'relic_ahimsa',
            title: 'Embossed Brass Vow Tablet',
            type: 'Relic Seal',
            era: 'Ancient Bharat',
            icon: '✋'
          }
        }
      },
      {
        id: 'sikh',
        title: 'Sikh Legacy',
        subtitle: 'Gurus, History, Sacrifice & more',
        emblem: '☬',
        colorClass: 'path-sikh',
        progress: 15,
        totalEvents: 8,
        completedEvents: 1,
        currentModule: {
          title: 'The Foundation of Langar',
          question: 'Guru Nanak Dev Ji instituted the timeless practice of "Langar" to foster which core civilizational virtue?',
          options: [
            { text: 'Military marching discipline', correct: false },
            { text: 'Universal equality & selfless community service (Seva)', correct: true },
            { text: 'Guild trading negotiations', correct: false },
            { text: 'Secret philosophical discourse', correct: false }
          ],
          rewardXp: 160,
          rewardCoins: 45,
          rewardRelic: {
            id: 'relic_khanda',
            title: 'Wootz Steel Kirpan Emblem',
            type: 'Royal Metalwork',
            era: 'Medieval Punjab',
            icon: '⚔️'
          }
        }
      },
      {
        id: 'kingdoms',
        title: 'Indian Kingdoms',
        subtitle: 'Empires, Battles, Administration',
        emblem: '🏰',
        colorClass: 'path-kingdoms',
        progress: 50,
        totalEvents: 14,
        completedEvents: 7,
        currentModule: {
          title: 'Maritime Supremacy of Rajendra Chola I',
          question: 'The Chola Empire deployed its formidable naval armada across the Bay of Bengal to secure trade routes to which kingdom?',
          options: [
            { text: 'The Srivijaya Empire (Southeast Asia)', correct: true },
            { text: 'The Roman Senate', correct: false },
            { text: 'The Kingdom of Aksum', correct: false },
            { text: 'The Han Dynasty frontier', correct: false }
          ],
          rewardXp: 180,
          rewardCoins: 60,
          rewardRelic: {
            id: 'relic_chola',
            title: 'Chola Royal Tiger Coin',
            type: 'Imperial Currency',
            era: 'Chola Dynasty',
            icon: '🪙'
          }
        }
      }
    ],
    recentUnlocks: [
      {
        id: 'unlock_1',
        title: 'Ayodhya Stele Inscription',
        era: 'Treta Yuga',
        type: 'Carved Bas-Relief',
        icon: '🪨',
        image: 'stele'
      },
      {
        id: 'unlock_2',
        title: 'Vedic Fire Altar Layout',
        era: 'Vedic Period',
        type: 'Sacred Architecture',
        icon: '🔥',
        image: 'altar'
      },
      {
        id: 'unlock_3',
        title: 'Sudarshana Reservoir Blueprint',
        era: 'Mauryan Empire',
        type: 'Hydraulic Engineering',
        icon: '🌊',
        image: 'reservoir'
      },
      {
        id: 'unlock_4',
        title: 'Nalanda Copper Plate Charter',
        era: 'Gupta Renaissance',
        type: 'Royal Manuscript',
        icon: '📜',
        image: 'plate'
      },
      {
        id: 'unlock_5',
        title: 'Brihadisvara Granite Pillar',
        era: 'Chola Dynasty',
        type: 'Temple Sculpture',
        icon: '🏛️',
        image: 'temple'
      },
      {
        id: 'unlock_6',
        title: 'Rigvedic Hymn Manuscript',
        era: 'Ancient Saptasindhu',
        type: 'Sacred Text',
        icon: '📖',
        image: 'hymn'
      },
      {
        id: 'unlock_7',
        title: 'Golden Ashoka Chakra Medal',
        era: 'Imperial Magadha',
        type: 'Imperial Medallion',
        icon: '☸️',
        image: 'chakra'
      }
    ]
  };

  class PlayerStateStore {
    constructor() {
      this.listeners = [];
      this.state = this.loadState();
    }

    loadState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...defaultState, ...parsed };
        }
      } catch (e) {
        console.warn('Could not read saved state from localStorage:', e);
      }
      return JSON.parse(JSON.stringify(defaultState));
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Could not save state to localStorage:', e);
      }
      this.notify();
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify() {
      for (const listener of this.listeners) {
        try {
          listener(this.state);
        } catch (e) {
          console.error('Error in state subscriber:', e);
        }
      }
    }

    // ─── Dynamic Growth & Progression Actions ───

    addXP(amount) {
      this.state.user.xp += amount;
      let leveledUp = false;

      while (this.state.user.xp >= this.state.user.nextLevelXp) {
        this.state.user.xp -= this.state.user.nextLevelXp;
        this.state.user.level += 1;
        this.state.user.nextLevelXp = Math.floor(this.state.user.nextLevelXp * 1.25);
        leveledUp = true;
      }

      this.saveState();
      return { leveledUp, newLevel: this.state.user.level, xp: this.state.user.xp, nextLevelXp: this.state.user.nextLevelXp };
    }

    addCurrencies(coins = 0, gems = 0, shards = 0) {
      this.state.currencies.coins += coins;
      this.state.currencies.gems += gems;
      this.state.currencies.shards += shards;
      this.saveState();
    }

    advanceJourney(amount = 15) {
      let journey = this.state.activeJourney;
      journey.progress = Math.min(100, journey.progress + amount);

      // Advance daily quest count if not already finished
      this.advanceDailyQuest();

      // Award XP and coins
      this.addXP(120);
      this.addCurrencies(40, 5, 0);

      // If chapter completed, cycle to next story
      if (journey.progress >= 100) {
        journey.stage += 1;
        if (journey.stage > journey.totalStages) {
          journey.stage = 1;
          journey.chapter = 'Dandaka Hermitages';
        } else if (journey.stage === 4) {
          journey.chapter = 'Panchavati Sanctum';
        }
        journey.progress = 10;
      }

      this.saveState();
      return journey;
    }

    advanceDailyQuest() {
      if (!this.state.dailyQuest.claimed && this.state.dailyQuest.current < this.state.dailyQuest.target) {
        this.state.dailyQuest.current += 1;
        this.saveState();
      }
    }

    claimDailyQuest() {
      if (this.state.dailyQuest.current >= this.state.dailyQuest.target && !this.state.dailyQuest.claimed) {
        this.state.dailyQuest.claimed = true;
        this.addCurrencies(this.state.dailyQuest.reward, 10, 1);
        this.addXP(200);
        this.saveState();
        return true;
      }
      return false;
    }

    completePathModule(pathId) {
      const path = this.state.paths.find(p => p.id === pathId);
      if (!path) return null;

      // Increment progress
      path.completedEvents = Math.min(path.totalEvents, path.completedEvents + 1);
      path.progress = Math.min(100, Math.round((path.completedEvents / path.totalEvents) * 100));

      const module = path.currentModule;
      const xpGained = module.rewardXp || 100;
      const coinsGained = module.rewardCoins || 30;

      // Add to recent unlocks
      if (module.rewardRelic) {
        const newRelic = {
          id: module.rewardRelic.id + '_' + Date.now(),
          title: module.rewardRelic.title,
          era: module.rewardRelic.era,
          type: module.rewardRelic.type,
          icon: module.rewardRelic.icon || '🏺',
          image: path.id
        };
        // Prepend to recent unlocks
        this.state.recentUnlocks.unshift(newRelic);
        if (this.state.recentUnlocks.length > 12) {
          this.state.recentUnlocks.pop();
        }
      }

      // Check daily quest
      this.advanceDailyQuest();

      // Award XP & Coins
      const levelResult = this.addXP(xpGained);
      this.addCurrencies(coinsGained, 8, 1);

      this.saveState();
      return {
        path,
        xpGained,
        coinsGained,
        relic: module.rewardRelic,
        leveledUp: levelResult.leveledUp,
        newLevel: levelResult.newLevel
      };
    }

    resetProgress() {
      this.state = JSON.parse(JSON.stringify(defaultState));
      this.saveState();
    }
  }

  // Expose singleton on window
  window.PlayerState = new PlayerStateStore();
})();

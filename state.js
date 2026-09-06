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
    selectedReligiousPathId: 'hindu_traditions',
    religiousTraditions: [
      {
        id: 'hindu_traditions',
        title: 'Hindu Traditions',
        emblem: 'ॐ',
        emblemText: 'ॐ',
        description: 'Explore the wisdom of Yugas, Epics, Deities, Festivals & Ancient Knowledge',
        image: 'assets/path_hindu.jpg',
        badge: 'Sanatana Dharma',
        colorClass: 'subpath-hindu',
        accentColor: '#D4993B',
        progress: 55,
        totalEvents: 16,
        completedEvents: 9,
        currentModule: {
          title: 'Sanatana Dharma & The Cosmic Order',
          question: 'In Hindu philosophy and tradition, what fundamental concept represents the cosmic order, universal harmony, righteousness, and the sacred duties of each being?',
          options: [
            { text: 'Karma (Action and reaction)', correct: false },
            { text: 'Dharma (Cosmic order and righteous duty)', correct: true },
            { text: 'Moksha (Liberation from rebirth)', correct: false },
            { text: 'Samsara (The cycle of existence)', correct: false }
          ],
          rewardXp: 180,
          rewardCoins: 50,
          rewardRelic: {
            id: 'relic_om_yantra',
            title: 'Sacred Golden Om Yantra',
            type: 'Sacred Antiquity',
            era: 'Vedic Antiquity',
            icon: '🕉️'
          }
        }
      },
      {
        id: 'buddhist_heritage',
        title: 'Buddhist Heritage',
        emblem: '☸',
        emblemText: '☸',
        description: 'Follow the path of Buddha, his teachings and the spread of Dharma',
        image: 'assets/path_buddhist.jpg',
        badge: 'Noble Eightfold Path',
        colorClass: 'subpath-buddhist',
        accentColor: '#6B90B5',
        progress: 35,
        totalEvents: 14,
        completedEvents: 5,
        currentModule: {
          title: 'The First Sermon at Sarnath',
          question: 'Where did Gautama Buddha deliver his historic first discourse, known as the Dhammacakkappavattana Sutta, setting the Wheel of Dhamma in motion?',
          options: [
            { text: 'Bodh Gaya under the sacred Bodhi Tree', correct: false },
            { text: 'Deer Park in Sarnath near Varanasi', correct: true },
            { text: 'Nalanda Monastic University', correct: false },
            { text: 'The mountain cave at Rajgir', correct: false }
          ],
          rewardXp: 160,
          rewardCoins: 45,
          rewardRelic: {
            id: 'relic_dharmachakra',
            title: 'Sarnath Monolithic Dharmachakra',
            type: 'Imperial Stone Relic',
            era: 'Mauryan Empire',
            icon: '☸️'
          }
        }
      },
      {
        id: 'jain_philosophy',
        title: 'Jain Philosophy',
        emblem: '✋',
        emblemText: '✋',
        description: 'Discover the journey of Tirthankaras, Ahimsa, and Jain heritage',
        image: 'assets/path_jain.jpg',
        badge: 'Ahimsa & Anekantavada',
        colorClass: 'subpath-jain',
        accentColor: '#C49752',
        progress: 25,
        totalEvents: 12,
        completedEvents: 3,
        currentModule: {
          title: 'The Teachings of Lord Mahavira',
          question: 'Who was the 24th and last Tirthankara of the current cosmic time cycle, renowned for revitalizing the core vows of Ahimsa (non-violence) and Satya?',
          options: [
            { text: 'Lord Rishabhanatha (Adinatha)', correct: false },
            { text: 'Lord Parshvanatha', correct: false },
            { text: 'Lord Mahavira (Vardhamana)', correct: true },
            { text: 'Lord Neminatha', correct: false }
          ],
          rewardXp: 160,
          rewardCoins: 45,
          rewardRelic: {
            id: 'relic_ahimsa_wheel',
            title: 'Dilwara Carved Marble Ahimsa Wheel',
            type: 'Sacred Marble Sculpture',
            era: 'Solanki Period',
            icon: '🪷'
          }
        }
      },
      {
        id: 'sikh_legacy',
        title: 'Sikh Legacy',
        emblem: '☬',
        emblemText: '☬',
        description: 'Learn about the Sikh Gurus, battles, values & culture',
        image: 'assets/path_sikh.jpg',
        badge: 'Khalsa Panth & Seva',
        colorClass: 'subpath-sikh',
        accentColor: '#4A7F99',
        progress: 40,
        totalEvents: 14,
        completedEvents: 6,
        currentModule: {
          title: 'The Foundation of the Khalsa',
          question: 'Which revered Sikh Guru formalized the Khalsa Panth in 1699 on Vaisakhi at Anandpur Sahib, inaugurating the Panj Pyare?',
          options: [
            { text: 'Guru Nanak Dev Ji', correct: false },
            { text: 'Guru Gobind Singh Ji', correct: true },
            { text: 'Guru Arjan Dev Ji', correct: false },
            { text: 'Guru Tegh Bahadur Ji', correct: false }
          ],
          rewardXp: 170,
          rewardCoins: 50,
          rewardRelic: {
            id: 'relic_kirpan',
            title: 'Sacred Steel Kirpan of Anandpur',
            type: 'Sacred Regalia',
            era: 'Khalsa Era',
            icon: '⚔️'
          }
        }
      },
      {
        id: 'folk_traditions',
        title: 'Other Traditions & Folk Cultures',
        emblem: '🎭',
        emblemText: '🎭',
        description: 'Explore diverse tribal, folk and regional traditions',
        image: 'assets/path_folk.jpg',
        badge: 'Living Folk & Tribal Lore',
        colorClass: 'subpath-folk',
        accentColor: '#9C5832',
        progress: 20,
        totalEvents: 12,
        completedEvents: 2,
        currentModule: {
          title: 'The Sacred Theatre of Theyyam',
          question: 'The ritual dance-theatre tradition of Theyyam, invoking sacred deities and folk legends through monumental headdresses and vibrant sacred face paint, originates primarily in:',
          options: [
            { text: 'North Malabar region of Kerala', correct: true },
            { text: 'Shekhawati desert region of Rajasthan', correct: false },
            { text: 'Kullu Valley of Himachal Pradesh', correct: false },
            { text: 'Sundarbans of Bengal', correct: false }
          ],
          rewardXp: 150,
          rewardCoins: 40,
          rewardRelic: {
            id: 'relic_theyyam_crown',
            title: 'Ceremonial Theyyam Headdress Relief',
            type: 'Folk Antiquity',
            era: 'Traditional Heritage',
            icon: '👺'
          }
        }
      }
    ],
    paths: [
      {
        id: 'spiritual',
        title: 'Religious & Spiritual Traditions',
        subtitle: 'Vedas, Dharma, Rituals & Devotion',
        emblem: '🙏',
        colorClass: 'path-spiritual',
        progress: 45,
        totalEvents: 12,
        completedEvents: 5,
        currentModule: {
          title: 'The Vedic Fire Rituals',
          question: 'The ancient Vedic Yajna (fire ritual) was performed to invoke the blessings of the gods. Which Veda is primarily a collection of hymns and mantras used during these rituals?',
          options: [
            { text: 'Yajur Veda', correct: false },
            { text: 'Rig Veda', correct: true },
            { text: 'Sama Veda', correct: false },
            { text: 'Atharva Veda', correct: false }
          ],
          rewardXp: 150,
          rewardCoins: 40,
          rewardRelic: {
            id: 'relic_veda',
            title: 'Sacred Palm Leaf of Rig Veda',
            type: 'Manuscript',
            era: 'Vedic Period',
            icon: '📜'
          }
        }
      },
      {
        id: 'civilisation',
        title: 'Civilisation & Ancient India',
        subtitle: 'Indus Valley, Empires & Governance',
        emblem: '🏛️',
        colorClass: 'path-civilisation',
        progress: 30,
        totalEvents: 10,
        completedEvents: 3,
        currentModule: {
          title: 'The Great Bath of Mohenjo-daro',
          question: 'The advanced urban planning of the Indus Valley Civilisation is showcased by the Great Bath at Mohenjo-daro. What was its primary purpose?',
          options: [
            { text: 'A royal swimming pool', correct: false },
            { text: 'Ritualistic bathing & purification', correct: true },
            { text: 'A water storage reservoir', correct: false },
            { text: 'A military training ground', correct: false }
          ],
          rewardXp: 140,
          rewardCoins: 35,
          rewardRelic: {
            id: 'relic_indus',
            title: 'Indus Valley Seal',
            type: 'Stone Seal',
            era: 'Indus Valley Period',
            icon: '🔱'
          }
        }
      },
      {
        id: 'artculture',
        title: 'Art, Architecture & Culture',
        subtitle: 'Temples, Dance, Music & Crafts',
        emblem: '🎭',
        colorClass: 'path-artculture',
        progress: 20,
        totalEvents: 8,
        completedEvents: 2,
        currentModule: {
          title: 'The Rock-Cut Temples of Ellora',
          question: 'The Kailasa Temple at Ellora, carved from a single monolithic rock, is dedicated to which Hindu deity?',
          options: [
            { text: 'Lord Vishnu', correct: false },
            { text: 'Lord Brahma', correct: false },
            { text: 'Lord Shiva', correct: true },
            { text: 'Lord Ganesha', correct: false }
          ],
          rewardXp: 130,
          rewardCoins: 30,
          rewardRelic: {
            id: 'relic_ellora',
            title: 'Kailasa Temple Miniature',
            type: 'Stone Carving',
            era: 'Rashtrakuta Dynasty',
            icon: '🛕'
          }
        }
      },
      {
        id: 'folklore',
        title: 'Stories & Folklore',
        subtitle: 'Epics, Legends, Myths & Tales',
        emblem: '📖',
        colorClass: 'path-folklore',
        progress: 15,
        totalEvents: 8,
        completedEvents: 1,
        currentModule: {
          title: 'The Panchatantra Tales',
          question: 'The Panchatantra, one of the oldest collections of fables, was written by which ancient scholar to educate the princes of a king?',
          options: [
            { text: 'Chanakya (Kautilya)', correct: false },
            { text: 'Vishnu Sharma', correct: true },
            { text: 'Valmiki', correct: false },
            { text: 'Kalidasa', correct: false }
          ],
          rewardXp: 160,
          rewardCoins: 45,
          rewardRelic: {
            id: 'relic_panchatantra',
            title: 'Illustrated Panchatantra Scroll',
            type: 'Ancient Manuscript',
            era: 'Classical India',
            icon: '📜'
          }
        }
      },
      {
        id: 'tradgames',
        title: 'Traditional Games',
        subtitle: 'Chaturanga, Kabaddi, Gilli-Danda',
        emblem: '🎲',
        colorClass: 'path-tradgames',
        progress: 50,
        totalEvents: 14,
        completedEvents: 7,
        currentModule: {
          title: 'Chaturanga — The Origin of Chess',
          question: 'Chaturanga, the ancient Indian game that evolved into modern chess, derives its name from four divisions of which institution?',
          options: [
            { text: 'The ancient Indian army (infantry, cavalry, elephants, chariots)', correct: true },
            { text: 'The four Vedas', correct: false },
            { text: 'The four stages of life (Ashramas)', correct: false },
            { text: 'The four cardinal directions', correct: false }
          ],
          rewardXp: 180,
          rewardCoins: 60,
          rewardRelic: {
            id: 'relic_chaturanga',
            title: 'Ivory Chaturanga Piece',
            type: 'Game Artifact',
            era: 'Gupta Empire',
            icon: '♟️'
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
          return {
            ...defaultState,
            ...parsed,
            religiousTraditions: parsed.religiousTraditions && parsed.religiousTraditions.length === 5 ? parsed.religiousTraditions : defaultState.religiousTraditions,
            selectedReligiousPathId: parsed.selectedReligiousPathId || defaultState.selectedReligiousPathId
          };
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

    selectReligiousTradition(subPathId) {
      if (!this.state.religiousTraditions) return null;
      const found = this.state.religiousTraditions.find(t => t.id === subPathId);
      if (found) {
        this.state.selectedReligiousPathId = subPathId;
        this.saveState();
        return found;
      }
      return null;
    }

    getSelectedReligiousTradition() {
      if (!this.state.religiousTraditions) return null;
      return this.state.religiousTraditions.find(t => t.id === this.state.selectedReligiousPathId) || this.state.religiousTraditions[0];
    }

    completeReligiousTraditionModule(subPathId) {
      const tradition = (this.state.religiousTraditions || []).find(t => t.id === subPathId);
      if (!tradition) return null;

      tradition.completedEvents = Math.min(tradition.totalEvents, tradition.completedEvents + 1);
      tradition.progress = Math.min(100, Math.round((tradition.completedEvents / tradition.totalEvents) * 100));

      const module = tradition.currentModule;
      const xpGained = module.rewardXp || 150;
      const coinsGained = module.rewardCoins || 45;

      if (module.rewardRelic) {
        const newRelic = {
          id: module.rewardRelic.id + '_' + Date.now(),
          title: module.rewardRelic.title,
          era: module.rewardRelic.era,
          type: module.rewardRelic.type,
          icon: module.rewardRelic.icon || '🏺',
          image: tradition.id
        };
        this.state.recentUnlocks.unshift(newRelic);
        if (this.state.recentUnlocks.length > 15) {
          this.state.recentUnlocks.pop();
        }
      }

      this.advanceDailyQuest();
      const levelResult = this.addXP(xpGained);
      this.addCurrencies(coinsGained, 8, 1);

      // Also advance overall spiritual path progress
      const spiritualPath = this.state.paths.find(p => p.id === 'spiritual');
      if (spiritualPath) {
        spiritualPath.completedEvents = Math.min(spiritualPath.totalEvents, spiritualPath.completedEvents + 1);
        spiritualPath.progress = Math.min(100, Math.round((spiritualPath.completedEvents / spiritualPath.totalEvents) * 100));
      }

      this.saveState();
      return {
        tradition,
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

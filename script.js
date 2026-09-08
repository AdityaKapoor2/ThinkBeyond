document.addEventListener('DOMContentLoaded', () => {
  // ─── DOM Elements ───
  const splashScreen = document.getElementById('splash-screen');
  const splashVideo = document.getElementById('splash-video');
  const progressFill = document.getElementById('splash-progress-fill');
  const skipBtn = document.getElementById('skip-btn');
  const landingPage = document.getElementById('landing-page');
  const startJourneyBtn = document.getElementById('start-journey-btn');
  const ambientCanvas = document.getElementById('ambient-canvas');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const soundOnIcon = document.getElementById('sound-on-icon');
  const soundOffIcon = document.getElementById('sound-off-icon');

  // Dashboard Screen
  const dashboardScreen = document.getElementById('dashboard-screen');
  const btnBackToLanding = document.getElementById('btn-back-to-landing');
  const btnDashSound = document.getElementById('btn-dash-sound');

  // Dashboard Profile & Currencies
  const dashUserName = document.getElementById('dash-user-name');
  const dashUserTitle = document.getElementById('dash-user-title');
  const dashUserLevel = document.getElementById('dash-user-level');
  const dashXpFill = document.getElementById('dash-xp-fill');
  const dashXpText = document.getElementById('dash-xp-text');
  const dashCoins = document.getElementById('dash-coins');
  const dashGems = document.getElementById('dash-gems');
  const dashShards = document.getElementById('dash-shards');

  // Dashboard Journey & Quests
  const dashJourneyEra = document.getElementById('dash-journey-era');
  const dashJourneyChapter = document.getElementById('dash-journey-chapter');
  const dashJourneyPct = document.getElementById('dash-journey-pct');
  const dashJourneyFill = document.getElementById('dash-journey-fill');
  const btnResumeJourney = document.getElementById('btn-resume-journey');

  const dashQuestDesc = document.getElementById('dash-quest-desc');
  const dashQuestFill = document.getElementById('dash-quest-fill');
  const dashQuestFraction = document.getElementById('dash-quest-fraction');
  const dashQuestRewardVal = document.getElementById('dash-quest-reward-val');
  const btnClaimQuest = document.getElementById('btn-claim-quest');
  const dashQuestStatus = document.getElementById('dash-quest-status');

  const dashStreakDays = document.getElementById('dash-streak-days');
  const dashStreakSub = document.getElementById('dash-streak-sub');

  // Dynamic Grids
  const dashPathsGrid = document.getElementById('dash-paths-grid');
  const dashUnlocksTray = document.getElementById('dash-unlocks-tray');
  const unlocksTotalCount = document.getElementById('unlocks-total-count');

  // Dedicated Path Selection Screen (Religious & Spiritual Traditions)
  const pathSelectionScreen = document.getElementById('path-selection-screen');
  const btnBackFromSubpaths = document.getElementById('btn-back-from-subpaths');
  const activeTraditionTag = document.getElementById('active-tradition-tag');
  const subpathsCardsContainer = document.getElementById('subpaths-cards-container');
  const btnEnterTradition = document.getElementById('btn-enter-tradition');
  const btnEnterTraditionText = document.getElementById('btn-enter-tradition-text');

  // Ramayana Timeline Map Screen Elements
  const ramayanaMapScreen = document.getElementById('ramayana-map-screen');
  const btnBackFromRamayana = document.getElementById('btn-back-from-ramayana');
  const btnRamayanaInfo = document.getElementById('btn-ramayana-info');
  const ramayanaSvgPaths = document.getElementById('ramayana-svg-paths');
  const ramayanaNodesLayer = document.getElementById('ramayana-nodes-layer');

  // TradGames Map Screen Elements
  const tradgamesMapScreen = document.getElementById('tradgames-map-screen');
  const btnBackFromTradgames = document.getElementById('btn-back-from-tradgames');
  const tradgamesSvgPaths = document.getElementById('tradgames-svg-paths');
  const tradgamesNodesLayer = document.getElementById('tradgames-nodes-layer');

  // Ramayana Dedicated Event Screen Elements
  const ramayanaEventScreen = document.getElementById('ramayana-event-screen');
  const btnBackToMap = document.getElementById('btn-back-to-map');
  const btnFooterBackMap = document.getElementById('btn-footer-back-map');
  const eventCrumbTitle = document.getElementById('event-crumb-title');
  const eventChapterCounter = document.getElementById('event-chapter-counter');
  const btnPrevEvent = document.getElementById('btn-prev-event');
  const btnNextEvent = document.getElementById('btn-next-event');
  const btnFooterNext = document.getElementById('btn-footer-next');
  const eventHeroImg = document.getElementById('event-hero-img');
  const eventHeroBadge = document.getElementById('event-hero-badge');
  const eventHeroTitle = document.getElementById('event-hero-title');
  const eventHeroSubtitle = document.getElementById('event-hero-subtitle');
  const eventKandaPill = document.getElementById('event-kanda-pill');
  const eventGeoTag = document.getElementById('event-geo-tag');
  const eventStoryParagraphs = document.getElementById('event-story-paragraphs');
  const btnReciteShloka = document.getElementById('btn-recite-shloka');
  const eventShlokaSanskrit = document.getElementById('event-shloka-sanskrit');
  const eventShlokaTranslit = document.getElementById('event-shloka-translit');
  const eventShlokaMeaning = document.getElementById('event-shloka-meaning');
  const eventGeoDetails = document.getElementById('event-geo-details');
  const eventCharactersList = document.getElementById('event-characters-list');
  const eventDharmaText = document.getElementById('event-dharma-text');
  const eventQuizRewards = document.getElementById('event-quiz-rewards');
  const eventQuizPrompt = document.getElementById('event-quiz-prompt');
  const eventQuizOptions = document.getElementById('event-quiz-options');
  const eventQuizFeedback = document.getElementById('event-quiz-feedback');
  const btnSubmitEventQuiz = document.getElementById('btn-submit-event-quiz');
  const btnCompleteEvent = document.getElementById('btn-complete-event');
  const btnCompleteEventText = document.getElementById('btn-complete-event-text');

  // Ramayana Timeline Info Modal
  const timelineInfoModal = document.getElementById('timeline-info-modal');
  const timelineInfoCloseBtn = document.getElementById('timeline-info-close-btn');
  const timelineInfoOkBtn = document.getElementById('timeline-info-ok-btn');

  // Sidebar navigation
  const sidebarNavItems = document.querySelectorAll('.dash-sidebar .nav-item');
  const viewPanels = document.querySelectorAll('.dash-view-panel');

  // Modals & Toasts
  const infoModal = document.getElementById('info-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalKicker = document.getElementById('modal-kicker');
  const modalHeadline = document.getElementById('modal-headline');
  const modalBody = document.getElementById('modal-body');

  const moduleModal = document.getElementById('module-modal');
  const moduleCloseBtn = document.getElementById('module-close-btn');
  const moduleKicker = document.getElementById('module-kicker');
  const moduleTitle = document.getElementById('module-title');
  const modulePrompt = document.getElementById('module-prompt');
  const moduleOptionsContainer = document.getElementById('module-options-container');
  const moduleFeedback = document.getElementById('module-feedback');
  const moduleSubmitBtn = document.getElementById('module-submit-btn');

  const rewardToast = document.getElementById('reward-toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');

  // Bottom dock items (landing page)
  const dockGames = document.getElementById('dock-games');
  const dockHistory = document.getElementById('dock-history');
  const dockRewards = document.getElementById('dock-rewards');
  const dockCulture = document.getElementById('dock-culture');

  let isSoundMuted = false;
  let hasTransitioned = false;
  let audioCtx = null;
  let currentActiveChallenge = null;

  // ─── Web Audio API Synthesizer (Harmonic Temple Bell / Chime) ───
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTempleChime(freq = 528, duration = 1.6) {
    if (isSoundMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.5, now);

      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.8);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(audioCtx.destination);
      gain2.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) { }
  }

  function playClickSound() {
    if (isSoundMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) { }
  }

  function playCelebrationChime() {
    playTempleChime(528, 1.4);
    setTimeout(() => playTempleChime(660, 1.6), 180);
    setTimeout(() => playTempleChime(792, 2.0), 380);
  }

  // ─── Transition: Splash Video to Landing Page ───
  function revealLandingPage() {
    if (hasTransitioned) return;
    hasTransitioned = true;

    splashScreen.classList.add('fade-out');

    setTimeout(() => {
      splashVideo.pause();
      splashScreen.style.display = 'none';
    }, 850);

    landingPage.classList.add('active');
    startAmbientCanvas();

    setTimeout(() => {
      playTempleChime(440, 2.0);
    }, 400);
  }

  splashVideo.play().catch(() => { });

  splashVideo.addEventListener('timeupdate', () => {
    if (splashVideo.duration) {
      const progress = (splashVideo.currentTime / splashVideo.duration) * 100;
      progressFill.style.width = progress + '%';
    }
  });

  skipBtn.classList.add('visible');

  skipBtn.addEventListener('click', () => {
    initAudio();
    revealLandingPage();
  });

  splashVideo.addEventListener('ended', () => {
    progressFill.style.width = '100%';
    revealLandingPage();
  });

  // ─── Transition: Landing Page to Dashboard ───
  function openDashboard() {
    initAudio();
    playTempleChime(528, 2.2);

    landingPage.classList.remove('active');
    landingPage.style.opacity = '0';
    landingPage.style.pointerEvents = 'none';

    window.location.hash = 'dashboard';

    setTimeout(() => {
      dashboardScreen.classList.remove('hidden');
      dashboardScreen.classList.add('active');
      renderDashboard();
    }, 350);
  }

  function closeDashboardToLanding() {
    playClickSound();
    dashboardScreen.classList.remove('active');
    history.replaceState(null, null, window.location.pathname);

    setTimeout(() => {
      dashboardScreen.classList.add('hidden');
      landingPage.classList.add('active');
      landingPage.style.opacity = '1';
      landingPage.style.pointerEvents = 'auto';
    }, 350);
  }

  startJourneyBtn.addEventListener('click', openDashboard);
  if (btnBackToLanding) {
    btnBackToLanding.addEventListener('click', closeDashboardToLanding);
  }

  // Direct access check on initial load (e.g. #dashboard)
  if (window.location.hash === '#dashboard' || window.location.search.includes('dashboard')) {
    hasTransitioned = true;
    if (splashVideo) splashVideo.pause();
    splashScreen.style.display = 'none';
    landingPage.classList.remove('active');
    landingPage.style.display = 'none';
    dashboardScreen.classList.remove('hidden');
    dashboardScreen.classList.add('active');
    renderDashboard();
  } else if (window.location.hash === '#traditions' || window.location.hash === '#paths' || window.location.search.includes('traditions')) {
    hasTransitioned = true;
    if (splashVideo) splashVideo.pause();
    splashScreen.style.display = 'none';
    landingPage.classList.remove('active');
    landingPage.style.display = 'none';
    dashboardScreen.classList.add('hidden');
    pathSelectionScreen.classList.remove('hidden');
    renderSubpathsScreen();
  }

  // ─── Sound Toggle Controls ───
  function toggleSound() {
    isSoundMuted = !isSoundMuted;
    if (isSoundMuted) {
      if (soundOnIcon) soundOnIcon.style.display = 'none';
      if (soundOffIcon) soundOffIcon.style.display = 'block';
      if (btnDashSound) btnDashSound.style.opacity = '0.5';
    } else {
      if (soundOnIcon) soundOnIcon.style.display = 'block';
      if (soundOffIcon) soundOffIcon.style.display = 'none';
      if (btnDashSound) btnDashSound.style.opacity = '1';
      playClickSound();
    }
  }

  audioToggleBtn.addEventListener('click', toggleSound);
  if (btnDashSound) {
    btnDashSound.addEventListener('click', toggleSound);
  }

  // ─── Dynamic Toast Celebration ───
  function showRewardToast(title, message, icon = '⚡') {
    if (!rewardToast) return;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toastIcon.textContent = icon;
    rewardToast.classList.add('show');
    setTimeout(() => {
      rewardToast.classList.remove('show');
    }, 4500);
  }

  // ─── Render Dynamic Dashboard State ───
  function renderDashboard() {
    if (!window.PlayerState) return;
    const state = window.PlayerState.getState();

    // Profile Bar
    dashUserName.textContent = state.user.name;
    dashUserTitle.textContent = state.user.title;
    dashUserLevel.textContent = `Level ${state.user.level}`;

    const xpPct = Math.min(100, Math.round((state.user.xp / state.user.nextLevelXp) * 100));
    dashXpFill.style.width = `${xpPct}%`;
    dashXpText.textContent = `${state.user.xp} / ${state.user.nextLevelXp} XP`;

    // Currencies
    dashCoins.textContent = state.currencies.coins.toLocaleString();
    dashGems.textContent = state.currencies.gems.toLocaleString();
    dashShards.textContent = state.currencies.shards.toLocaleString();

    // Continue Your Journey Card
    dashJourneyEra.textContent = state.activeJourney.era;
    dashJourneyChapter.textContent = state.activeJourney.chapter;
    dashJourneyPct.textContent = `${state.activeJourney.progress}%`;
    dashJourneyFill.style.width = `${state.activeJourney.progress}%`;

    // Daily Quest Card
    dashQuestDesc.textContent = state.dailyQuest.description;
    const questPct = Math.min(100, Math.round((state.dailyQuest.current / state.dailyQuest.target) * 100));
    dashQuestFill.style.width = `${questPct}%`;
    dashQuestFraction.textContent = `${state.dailyQuest.current}/${state.dailyQuest.target}`;
    dashQuestRewardVal.textContent = state.dailyQuest.reward;

    if (state.dailyQuest.claimed) {
      btnClaimQuest.classList.remove('ready');
      dashQuestStatus.textContent = 'Claimed ✓';
      btnClaimQuest.style.opacity = '0.6';
      btnClaimQuest.style.cursor = 'default';
    } else if (state.dailyQuest.current >= state.dailyQuest.target) {
      btnClaimQuest.classList.add('ready');
      dashQuestStatus.textContent = 'Claim Reward!';
      btnClaimQuest.style.opacity = '1';
      btnClaimQuest.style.cursor = 'pointer';
    } else {
      btnClaimQuest.classList.remove('ready');
      dashQuestStatus.textContent = 'In Progress';
      btnClaimQuest.style.opacity = '0.85';
      btnClaimQuest.style.cursor = 'default';
    }

    // Daily Streak Card
    dashStreakDays.textContent = state.streak.days;
    dashStreakSub.textContent = state.streak.keepItUpText;

    // Explore Paths Grid (Render Dynamic 5 Cultural Paths)
    renderExplorePaths(state.paths);

    // Recent Unlocks Tray
    renderRecentUnlocks(state.recentUnlocks);

    // Also populate secondary tabs if open
    populateCollectionTab(state.recentUnlocks);
  }

  // ─── Render Explore Paths ───
  function renderExplorePaths(paths) {
    if (!dashPathsGrid) return;
    dashPathsGrid.innerHTML = '';

    paths.forEach(path => {
      const card = document.createElement('div');
      card.className = `path-card ${path.colorClass}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Explore ${path.title}`);

      const isSpiritual = (path.id === 'spiritual');
      card.innerHTML = `
        <div class="path-emblem-wrap">${path.emblem}</div>
        <h4 class="path-title">${path.title}</h4>
        <p class="path-subtitle">${path.subtitle}</p>
        ${isSpiritual ? '<span style="display:inline-block; font-size:0.68rem; color:#F5C66C; background:rgba(212,163,89,0.18); border:1px solid rgba(212,163,89,0.35); padding:2px 8px; border-radius:10px; margin-bottom:6px;">✦ 5 Sacred Paths</span>' : ''}
        <div class="path-mini-progress" title="${path.progress}% Complete">
          <div class="path-mini-fill" style="width: ${path.progress}%;"></div>
        </div>
      `;

      card.addEventListener('click', () => {
        playClickSound();
        if (path.id === 'spiritual') {
          openPathSelectionScreen();
        } else if (path.id === 'tradgames') {
          openTradGamesMapScreen();
        } else {
          launchPathModule(path);
        }
      });

      dashPathsGrid.appendChild(card);
    });
  }

  // ─── Render Recent Unlocks Tray ───
  function renderRecentUnlocks(unlocks) {
    if (!dashUnlocksTray) return;
    dashUnlocksTray.innerHTML = '';
    if (unlocksTotalCount) {
      unlocksTotalCount.textContent = `${unlocks.length} Relics Discovered`;
    }

    unlocks.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'unlock-item-card';
      itemEl.setAttribute('title', `${item.title} (${item.era})`);

      itemEl.innerHTML = `
        <div class="unlock-icon-badge">${item.icon}</div>
        <div class="unlock-meta">
          <span class="unlock-title">${item.title}</span>
          <span class="unlock-era">${item.era}</span>
        </div>
      `;

      itemEl.addEventListener('click', () => {
        playClickSound();
        openGenericInfoModal(item.type, item.title, `
          <p><strong>Era:</strong> ${item.era}</p>
          <p>This artifact was uncovered during your explorations of ancient civilizational milestones.</p>
        `);
      });

      dashUnlocksTray.appendChild(itemEl);
    });
  }

  // ─── Subscribe State Engine to Auto-Update UI ───
  if (window.PlayerState) {
    window.PlayerState.subscribe(() => {
      renderDashboard();
    });
  }

  // ─── Interactive Action: Resume Journey ───
  btnResumeJourney.addEventListener('click', () => {
    playClickSound();
    const state = window.PlayerState.getState();
    const journey = state.activeJourney;

    currentActiveChallenge = {
      type: 'journey',
      title: `${journey.era} — Chapter ${journey.stage}`,
      kicker: 'CONTINUE YOUR JOURNEY',
      prompt: `You have arrived at the banks of the sacred Sarayu River in ${journey.era}. Which ancient martial and philosophical code must a true Kshatriya warrior uphold before embarking on righteous exile?`,
      options: [
        { text: 'Dharma, selfless duty, and vow of truth (Satya)', correct: true },
        { text: 'Conquest of foreign merchant treasuries', correct: false },
        { text: 'Retreating into absolute silence without defense', correct: false },
        { text: 'Establishing trade monopolies across the subcontinent', correct: false }
      ],
      onSuccess: () => {
        const updated = window.PlayerState.advanceJourney(15);
        playCelebrationChime();
        showRewardToast(
          'STAGE COMPLETED!',
          `Journey advanced to ${updated.progress}%. +120 XP, +40 Coins granted!`,
          '🏹'
        );
      }
    };

    openChallengeModal(currentActiveChallenge);
  });

  // ─── Interactive Action: Launch Path Module ───
  function launchPathModule(path) {
    const mod = path.currentModule;
    if (!mod) return;

    currentActiveChallenge = {
      type: 'path',
      pathId: path.id,
      title: mod.title,
      kicker: `${path.title.toUpperCase()} // MODULE CHALLENGE`,
      prompt: mod.question,
      options: mod.options,
      onSuccess: () => {
        const result = window.PlayerState.completePathModule(path.id);
        playCelebrationChime();
        showRewardToast(
          result.leveledUp ? `LEVEL UP! LEVEL ${result.newLevel}` : 'PATH CHALLENGE MASTERED!',
          `Earned +${result.xpGained} XP, +${result.coinsGained} Coins, and unlocked '${result.relic.title}'!`,
          result.relic.icon || '🏺'
        );
      }
    };

    openChallengeModal(currentActiveChallenge);
  }

  // ─── 3. PATH SELECTION SCREEN CONTROLLER ───
  function openPathSelectionScreen() {
    initAudio();
    playTempleChime(528, 2.0);

    dashboardScreen.classList.remove('active');
    dashboardScreen.classList.add('hidden');
    pathSelectionScreen.classList.remove('hidden');

    renderSubpathsScreen();
  }

  function closeSubpathSelectionToDashboard() {
    playClickSound();
    pathSelectionScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
    dashboardScreen.classList.add('active');
    renderDashboard();
  }

  if (btnBackFromSubpaths) {
    btnBackFromSubpaths.addEventListener('click', closeSubpathSelectionToDashboard);
  }

  function renderSubpathsScreen() {
    if (!window.PlayerState || !subpathsCardsContainer) return;
    const state = window.PlayerState.getState();
    const traditions = state.religiousTraditions || [];
    const selectedId = state.selectedReligiousPathId || 'hindu_traditions';

    const currentSelected = traditions.find(t => t.id === selectedId) || traditions[0];
    if (activeTraditionTag && currentSelected) {
      activeTraditionTag.textContent = `Active: ${currentSelected.title}`;
    }
    if (btnEnterTraditionText && currentSelected) {
      btnEnterTraditionText.textContent = `EXPLORE ${currentSelected.title.toUpperCase()}`;
    }

    subpathsCardsContainer.innerHTML = '';

    traditions.forEach(item => {
      const isSelected = (item.id === selectedId);
      const card = document.createElement('div');
      card.className = `subpath-card ${item.colorClass || ''} ${isSelected ? 'selected' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${item.title}: ${item.description}`);

      card.innerHTML = `
        <div class="subpath-card-art">
          <img class="subpath-card-img" src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="subpath-card-gradient"></div>
          <div class="subpath-card-emblem">${item.emblem || '🕉️'}</div>
        </div>

        <div class="subpath-card-body">
          <h3 class="subpath-card-title">${item.title}</h3>
          <p class="subpath-card-desc">${item.description}</p>
          <button class="btn-subpath-select" type="button" aria-label="${isSelected ? 'Selected' : 'Select'} ${item.title}">
            ${isSelected ? 'SELECTED' : 'SELECT'}
          </button>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (item.id === 'hindu_traditions' && isSelected && e.target.closest('.btn-subpath-select')) {
          playClickSound();
          openRamayanaMapScreen();
          return;
        }

        if (isSelected && (e.target.closest('.btn-subpath-select') || e.detail >= 2)) {
          if (item.id === 'hindu_traditions') {
            openRamayanaMapScreen();
          } else {
            launchReligiousTraditionModule(item);
          }
          return;
        }

        playClickSound();
        window.PlayerState.selectReligiousTradition(item.id);
        renderSubpathsScreen();
      });

      subpathsCardsContainer.appendChild(card);
    });
  }

  function launchReligiousTraditionModule(tradition) {
    if (!tradition || !tradition.currentModule) return;
    const mod = tradition.currentModule;

    currentActiveChallenge = {
      type: 'tradition',
      traditionId: tradition.id,
      title: mod.title,
      kicker: `${tradition.title.toUpperCase()} // SACRED ENQUIRY`,
      prompt: mod.question,
      options: mod.options,
      onSuccess: () => {
        const result = window.PlayerState.completeReligiousTraditionModule(tradition.id);
        playCelebrationChime();
        showRewardToast(
          result.leveledUp ? `LEVEL UP! LEVEL ${result.newLevel}` : `${tradition.title.toUpperCase()} MASTERED!`,
          `Earned +${result.xpGained} XP, +${result.coinsGained} Coins, and discovered '${result.relic.title}'!`,
          result.relic.icon || '🕉️'
        );
        renderSubpathsScreen();
      }
    };

    openChallengeModal(currentActiveChallenge);
  }

  if (btnEnterTradition) {
    btnEnterTradition.addEventListener('click', () => {
      playClickSound();
      const selected = window.PlayerState.getSelectedReligiousTradition();
      if (selected) {
        if (selected.id === 'hindu_traditions') {
          openRamayanaMapScreen();
        } else {
          launchReligiousTraditionModule(selected);
        }
      }
    });
  }

  // ════════════════════════════════════════════════════════════
  // 3C & 3D. RAMAYANA CONNECTIVE TIMELINE MAP & EVENT PAGES
  // ════════════════════════════════════════════════════════════
  let currentActiveRamayanaEventId = null;
  let currentQuizSelectedOptionIdx = null;

  function openRamayanaMapScreen() {
    if (!ramayanaMapScreen) return;
    pathSelectionScreen.classList.add('hidden');
    if (ramayanaEventScreen) ramayanaEventScreen.classList.add('hidden');
    ramayanaMapScreen.classList.remove('hidden');
    renderRamayanaMap();
  }

  function closeRamayanaMapScreen() {
    if (!ramayanaMapScreen) return;
    ramayanaMapScreen.classList.add('hidden');
    pathSelectionScreen.classList.remove('hidden');
    renderSubpathsScreen();
  }

  if (btnBackFromRamayana) {
    btnBackFromRamayana.addEventListener('click', () => {
      playClickSound();
      closeRamayanaMapScreen();
    });
  }

  if (btnRamayanaInfo) {
    btnRamayanaInfo.addEventListener('click', () => {
      playClickSound();
      openTimelineInfoModal();
    });
  }

  function openTimelineInfoModal() {
    if (!timelineInfoModal) return;
    timelineInfoModal.classList.remove('hidden');
    timelineInfoModal.setAttribute('aria-hidden', 'false');
  }

  function closeTimelineInfoModal() {
    if (!timelineInfoModal) return;
    timelineInfoModal.classList.add('hidden');
    timelineInfoModal.setAttribute('aria-hidden', 'true');
  }

  if (timelineInfoCloseBtn) timelineInfoCloseBtn.addEventListener('click', closeTimelineInfoModal);
  if (timelineInfoOkBtn) timelineInfoOkBtn.addEventListener('click', closeTimelineInfoModal);

  function renderRamayanaMap() {
    if (!window.PlayerState || !ramayanaNodesLayer || !ramayanaSvgPaths) return;
    const events = window.PlayerState.getRamayanaEvents();

    // Render SVG connecting line matching the user's reference mockup path
    ramayanaSvgPaths.innerHTML = `
      <defs>
        <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Connected golden dashed pathway -->
      <path class="timeline-conn-path" filter="url(#gold-glow)"
        d="M 115 230 C 185 210, 225 205, 282 205 C 315 205, 305 315, 339 335 C 375 355, 410 245, 462 235 C 520 225, 580 220, 638 225 C 700 230, 760 230, 823 235 C 870 240, 915 290, 918 360 C 920 420, 840 435, 780 440 C 720 445, 650 425, 590 425 C 530 425, 480 445, 427 445" />
    `;

    // Render the 10 interactive node markers
    ramayanaNodesLayer.innerHTML = '';

    events.forEach(event => {
      const marker = document.createElement('button');
      marker.className = 'ramayana-node-marker';
      marker.style.left = `${event.coords.left}%`;
      marker.style.top = `${event.coords.top}%`;
      marker.setAttribute('type', 'button');
      marker.setAttribute('aria-label', `${event.title} (${event.location}): ${event.status}`);
      marker.dataset.eventId = event.id;

      let badgeSymbol = '✓';
      let badgeClass = 'badge-completed';
      if (event.status === 'completed') {
        badgeSymbol = '✓';
        badgeClass = 'badge-completed';
      } else if (event.status === 'in_progress') {
        badgeSymbol = '◯';
        badgeClass = 'badge-inprogress';
      } else if (event.status === 'boss') {
        badgeSymbol = '!';
        badgeClass = 'badge-boss';
      } else if (event.status === 'locked') {
        badgeSymbol = '🔒';
        badgeClass = 'badge-locked';
      } else {
        badgeSymbol = '◯';
        badgeClass = 'badge-available';
      }

      marker.innerHTML = `
        <div class="node-circle-portal">
          <img src="${event.image}" alt="${event.title}" class="node-thumb-img" loading="lazy" />
          <span class="node-status-icon-badge ${badgeClass}">${badgeSymbol}</span>
        </div>
        <div class="node-label-pill">
          <span class="node-title-text">${event.title}</span>
          <span class="node-location-text">(${event.location})</span>
        </div>
      `;

      marker.addEventListener('click', () => {
        playClickSound();
        openRamayanaEventScreen(event.id);
      });

      ramayanaNodesLayer.appendChild(marker);
    });
  }

  // ─── TradGames Map Screen Logic ───
  function openTradGamesMapScreen() {
    if (dashboardScreen) {
      dashboardScreen.classList.remove('active');
      dashboardScreen.classList.add('hidden');
    }
    if (tradgamesMapScreen) tradgamesMapScreen.classList.remove('hidden');
    renderTradGamesMap();
  }

  function closeTradGamesMapScreen() {
    if (tradgamesMapScreen) tradgamesMapScreen.classList.add('hidden');
    if (dashboardScreen) {
      dashboardScreen.classList.remove('hidden');
      dashboardScreen.classList.add('active');
    }
  }

  if (btnBackFromTradgames) {
    btnBackFromTradgames.addEventListener('click', () => {
      playClickSound();
      closeTradGamesMapScreen();
    });
  }

  function renderTradGamesMap() {
    if (!window.PlayerState || !tradgamesNodesLayer || !tradgamesSvgPaths) return;
    const events = window.PlayerState.getTradGamesEvents();

    tradgamesSvgPaths.innerHTML = '';
    for (let i = 0; i < events.length - 1; i++) {
      const e1 = events[i];
      const e2 = events[i + 1];
      const x1 = e1.coords.left * 10.24;
      const y1 = e1.coords.top * 6.00;
      const x2 = e2.coords.left * 10.24;
      const y2 = e2.coords.top * 6.00;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const cx1 = x1 + (x2 - x1) * 0.3;
      const cy1 = y1 + (y2 - y1) * 0.1;
      const cx2 = x1 + (x2 - x1) * 0.7;
      const cy2 = y1 + (y2 - y1) * 0.9;

      path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
      path.setAttribute('class', 'timeline-conn-path');
      tradgamesSvgPaths.appendChild(path);
    }

    tradgamesNodesLayer.innerHTML = '';
    events.forEach(event => {
      const marker = document.createElement('button');
      marker.className = 'ramayana-node-marker';
      marker.style.left = `${event.coords.left}%`;
      marker.style.top = `${event.coords.top}%`;
      marker.setAttribute('type', 'button');
      marker.setAttribute('aria-label', `${event.title} (${event.location}): ${event.status}`);
      marker.dataset.eventId = event.id;

      let badgeSymbol = '◯';
      let badgeClass = 'badge-available';
      if (event.status === 'completed') { badgeSymbol = '✓'; badgeClass = 'badge-completed'; }
      else if (event.status === 'in_progress') { badgeSymbol = '◯'; badgeClass = 'badge-inprogress'; }
      else if (event.status === 'locked') { badgeSymbol = '🔒'; badgeClass = 'badge-locked'; }

      marker.innerHTML = `
        <div class="node-circle-portal">
          <img src="${event.image}" alt="${event.title}" class="node-thumb-img" loading="lazy" style="${event.imagePosition ? `object-position: ${event.imagePosition};` : ''}" />
          <span class="node-status-icon-badge ${badgeClass}">${badgeSymbol}</span>
        </div>
        <div class="node-label-pill">
          <span class="node-title-text">${event.title}</span>
          <span class="node-location-text">(${event.location})</span>
        </div>
      `;

      marker.addEventListener('click', () => {
        playClickSound();
        if (event.url) {
          if (event.url.startsWith('http')) {
            // External Netlify-hosted games: open in new tab
            window.open(event.url, '_blank');
          } else {
            // Local game (Build Harappa): navigate in same window
            window.location.href = event.url;
          }
        }
      });

      tradgamesNodesLayer.appendChild(marker);
    });
  }

  // ─── 3D. Dedicated Event Story Page Controller ───
  function openRamayanaEventScreen(eventId) {
    if (!ramayanaEventScreen || !window.PlayerState) return;
    currentActiveRamayanaEventId = eventId;

    if (ramayanaMapScreen) ramayanaMapScreen.classList.add('hidden');
    ramayanaEventScreen.classList.remove('hidden');

    renderRamayanaEventScreen(eventId);

    const scrollBody = document.getElementById('event-scroll-body');
    if (scrollBody) scrollBody.scrollTop = 0;
  }

  function closeRamayanaEventScreen() {
    stopShlokaAudio();
    if (!ramayanaEventScreen) return;
    ramayanaEventScreen.classList.add('hidden');
    if (ramayanaMapScreen) ramayanaMapScreen.classList.remove('hidden');
    renderRamayanaMap();
  }

  if (btnBackToMap) btnBackToMap.addEventListener('click', () => { playClickSound(); closeRamayanaEventScreen(); });
  if (btnFooterBackMap) btnFooterBackMap.addEventListener('click', () => { playClickSound(); closeRamayanaEventScreen(); });

  function renderRamayanaEventScreen(eventId) {
    const event = window.PlayerState.getRamayanaEvent(eventId);
    if (!event) return;

    const allEvents = window.PlayerState.getRamayanaEvents();
    const currentIndex = allEvents.findIndex(e => e.id === eventId);

    // Breadcrumb and counter
    if (eventCrumbTitle) eventCrumbTitle.textContent = event.title;
    if (eventChapterCounter) {
      eventChapterCounter.textContent = `Chapter ${event.order} of ${allEvents.length}`;
    }

    // Prev / Next Chapter Buttons
    if (btnPrevEvent) {
      btnPrevEvent.disabled = (currentIndex <= 0);
      btnPrevEvent.onclick = () => {
        if (currentIndex > 0) {
          playClickSound();
          openRamayanaEventScreen(allEvents[currentIndex - 1].id);
        }
      };
    }
    if (btnNextEvent) {
      btnNextEvent.disabled = (currentIndex >= allEvents.length - 1);
      btnNextEvent.onclick = () => {
        if (currentIndex < allEvents.length - 1) {
          playClickSound();
          openRamayanaEventScreen(allEvents[currentIndex + 1].id);
        }
      };
    }
    if (btnFooterNext) {
      btnFooterNext.disabled = (currentIndex >= allEvents.length - 1);
      btnFooterNext.onclick = () => {
        if (currentIndex < allEvents.length - 1) {
          playClickSound();
          openRamayanaEventScreen(allEvents[currentIndex + 1].id);
        }
      };
    }

    // Hero section
    if (eventHeroImg) eventHeroImg.src = event.image;
    if (eventHeroTitle) eventHeroTitle.textContent = event.title;
    if (eventHeroSubtitle) eventHeroSubtitle.textContent = event.subtitle;
    if (eventKandaPill) eventKandaPill.textContent = `${event.kanda.toUpperCase()} • TRETA YUGA`;
    if (eventGeoTag) eventGeoTag.textContent = `${event.sacredGeography.place} (${event.location})`;

    // Status badge
    if (eventHeroBadge) {
      if (event.status === 'completed') {
        eventHeroBadge.textContent = '✓ Completed Chapter';
        eventHeroBadge.className = 'hero-status-badge status-completed';
      } else if (event.status === 'in_progress') {
        eventHeroBadge.textContent = '◯ In Progress';
        eventHeroBadge.className = 'hero-status-badge status-inprogress';
      } else if (event.status === 'boss') {
        eventHeroBadge.textContent = '! Boss Confrontation';
        eventHeroBadge.className = 'hero-status-badge status-boss';
      } else if (event.status === 'locked') {
        eventHeroBadge.textContent = '🔒 Locked Chapter';
        eventHeroBadge.className = 'hero-status-badge status-locked';
      } else {
        eventHeroBadge.textContent = '◯ Available Chapter';
        eventHeroBadge.className = 'hero-status-badge status-available';
      }
    }

    // Complete chapter button text
    if (btnCompleteEventText) {
      btnCompleteEventText.textContent = (event.status === 'completed') ? 'COMPLETED ✓' : 'MARK CHAPTER COMPLETED ✓';
    }

    // Story paragraphs
    if (eventStoryParagraphs) {
      eventStoryParagraphs.innerHTML = event.story.map(para => `<p>${para}</p>`).join('');
    }

    // Valmiki Shloka
    if (eventShlokaSanskrit) eventShlokaSanskrit.textContent = event.shlokaDevanagari;
    if (eventShlokaTranslit) eventShlokaTranslit.textContent = event.shlokaTransliteration;
    if (eventShlokaMeaning) eventShlokaMeaning.textContent = event.shlokaMeaning;

    // Sacred Geography
    if (eventGeoDetails) {
      eventGeoDetails.innerHTML = `
        <div class="geo-row">
          <strong>Ancient Realm:</strong>
          <span>${event.sacredGeography.place}</span>
        </div>
        <div class="geo-row">
          <strong>Living Heritage:</strong>
          <span>${event.sacredGeography.modernName}</span>
        </div>
        <div class="geo-row">
          <strong>Spiritual Significance:</strong>
          <span>${event.sacredGeography.significance}</span>
        </div>
      `;
    }

    // Characters list
    if (eventCharactersList) {
      eventCharactersList.innerHTML = event.characters.map(char => `
        <div class="character-chip">
          <div class="char-chip-head">
            <span class="char-name">${char.name}</span>
            <span class="char-role">${char.role}</span>
          </div>
          <p class="char-desc">${char.desc}</p>
        </div>
      `).join('');
    }

    // Dharma Wisdom text
    if (eventDharmaText) eventDharmaText.textContent = event.dharmaLesson;

    // Quiz Challenge
    if (eventQuizRewards) {
      eventQuizRewards.textContent = `+${event.quiz.rewardXp} XP • +${event.quiz.rewardCoins} Coins`;
    }
    if (eventQuizPrompt) eventQuizPrompt.textContent = event.quiz.question;

    currentQuizSelectedOptionIdx = null;
    if (eventQuizFeedback) {
      eventQuizFeedback.className = 'quiz-feedback hidden';
      eventQuizFeedback.textContent = '';
    }
    if (btnSubmitEventQuiz) {
      btnSubmitEventQuiz.disabled = false;
      btnSubmitEventQuiz.querySelector('.btn-text').textContent = 'CONFIRM ANSWER';
    }

    if (eventQuizOptions) {
      eventQuizOptions.innerHTML = '';
      event.quiz.options.forEach((opt, idx) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'quiz-option-btn';
        optBtn.setAttribute('type', 'button');
        optBtn.textContent = `${String.fromCharCode(65 + idx)}) ${opt.text}`;

        optBtn.addEventListener('click', () => {
          playClickSound();
          currentQuizSelectedOptionIdx = idx;
          const allOptBtns = eventQuizOptions.querySelectorAll('.quiz-option-btn');
          allOptBtns.forEach((b, i) => {
            if (i === idx) b.classList.add('selected');
            else b.classList.remove('selected');
          });
        });

        eventQuizOptions.appendChild(optBtn);
      });
    }

    // Audio Recite button
    if (btnReciteShloka) {
      btnReciteShloka.onclick = () => {
        toggleShlokaAudio(event);
      };
    }

    // Submit Quiz button
    if (btnSubmitEventQuiz) {
      btnSubmitEventQuiz.onclick = () => {
        handleEventQuizSubmission(event);
      };
    }

    // Direct Complete button
    if (btnCompleteEvent) {
      btnCompleteEvent.onclick = () => {
        playClickSound();
        const res = window.PlayerState.completeRamayanaEvent(event.id);
        if (res) {
          playCelebrationChime();
          showRewardToast(
            res.leveledUp ? `LEVEL UP! LEVEL ${res.newLevel}` : `${event.title.toUpperCase()} MASTERED!`,
            `Earned +${res.xpGained} XP, +${res.coinsGained} Coins, and blessed with '${res.relicName}'!`,
            '🏹'
          );
          renderRamayanaEventScreen(event.id);
        }
      };
    }
  }

  function handleEventQuizSubmission(event) {
    if (currentQuizSelectedOptionIdx === null) {
      if (eventQuizFeedback) {
        eventQuizFeedback.className = 'quiz-feedback error';
        eventQuizFeedback.textContent = 'Please choose an option to confirm your answer.';
      }
      return;
    }

    const selectedOption = event.quiz.options[currentQuizSelectedOptionIdx];
    const allOptBtns = eventQuizOptions.querySelectorAll('.quiz-option-btn');

    if (selectedOption.correct) {
      playCelebrationChime();
      allOptBtns[currentQuizSelectedOptionIdx].classList.add('correct-answer');
      if (eventQuizFeedback) {
        eventQuizFeedback.className = 'quiz-feedback success';
        eventQuizFeedback.innerHTML = `<strong>Correct!</strong> ${event.quiz.explanation}`;
      }
      btnSubmitEventQuiz.disabled = true;
      btnSubmitEventQuiz.querySelector('.btn-text').textContent = 'CHAPTER MASTERED ✓';

      const res = window.PlayerState.completeRamayanaEvent(event.id);
      if (res) {
        showRewardToast(
          res.leveledUp ? `LEVEL UP! LEVEL ${res.newLevel}` : `${event.title.toUpperCase()} MASTERED!`,
          `Earned +${res.xpGained} XP, +${res.coinsGained} Coins, and blessed with '${res.relicName}'!`,
          '🏹'
        );
        if (eventHeroBadge) {
          eventHeroBadge.textContent = '✓ Completed Chapter';
          eventHeroBadge.className = 'hero-status-badge status-completed';
        }
        if (btnCompleteEventText) {
          btnCompleteEventText.textContent = 'COMPLETED ✓';
        }
      }
    } else {
      playClickSound();
      allOptBtns[currentQuizSelectedOptionIdx].classList.add('wrong-answer');
      if (eventQuizFeedback) {
        eventQuizFeedback.className = 'quiz-feedback error';
        eventQuizFeedback.textContent = 'Not quite right. Reflect upon the sacred chronicle and try again!';
      }
    }
  }

  // ─── Shloka Speech Recitation ───
  let isShlokaSpeaking = false;

  function stopShlokaAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isShlokaSpeaking = false;
    if (btnReciteShloka) {
      btnReciteShloka.classList.remove('playing');
      btnReciteShloka.querySelector('.recite-label').textContent = 'Listen Recitation';
    }
  }

  function toggleShlokaAudio(event) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isShlokaSpeaking) {
      stopShlokaAudio();
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = event.audioText || event.shlokaMeaning;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    // Try finding Hindi or Sanskrit or English voice
    const voices = window.speechSynthesis.getVoices();
    const suitableVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('sa')) || voices.find(v => v.lang.includes('en'));
    if (suitableVoice) utterance.voice = suitableVoice;

    isShlokaSpeaking = true;
    if (btnReciteShloka) {
      btnReciteShloka.classList.add('playing');
      btnReciteShloka.querySelector('.recite-label').textContent = 'Playing Recitation...';
    }

    utterance.onend = () => {
      isShlokaSpeaking = false;
      if (btnReciteShloka) {
        btnReciteShloka.classList.remove('playing');
        btnReciteShloka.querySelector('.recite-label').textContent = 'Listen Recitation';
      }
    };

    utterance.onerror = () => {
      isShlokaSpeaking = false;
      if (btnReciteShloka) {
        btnReciteShloka.classList.remove('playing');
        btnReciteShloka.querySelector('.recite-label').textContent = 'Listen Recitation';
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  // ─── Challenge Modal Dialog Logic ───
  let selectedOptionIndex = null;

  function openChallengeModal(challenge) {
    moduleKicker.textContent = challenge.kicker;
    moduleTitle.textContent = challenge.title;
    modulePrompt.textContent = challenge.prompt;

    moduleOptionsContainer.innerHTML = '';
    moduleFeedback.className = 'challenge-feedback hidden';
    moduleFeedback.textContent = '';
    selectedOptionIndex = null;
    moduleSubmitBtn.disabled = false;
    moduleSubmitBtn.querySelector('.btn-text').textContent = 'CONFIRM ANSWER';

    challenge.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `${String.fromCharCode(65 + idx)}) ${opt.text}`;

      btn.addEventListener('click', () => {
        playClickSound();
        selectedOptionIndex = idx;
        const allBtns = moduleOptionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach((b, i) => {
          if (i === idx) b.classList.add('selected');
          else b.classList.remove('selected');
        });
      });

      moduleOptionsContainer.appendChild(btn);
    });

    moduleModal.classList.add('open');
    moduleModal.setAttribute('aria-hidden', 'false');
  }

  function closeChallengeModal() {
    moduleModal.classList.remove('open');
    moduleModal.setAttribute('aria-hidden', 'true');
    currentActiveChallenge = null;
  }

  moduleCloseBtn.addEventListener('click', closeChallengeModal);

  moduleSubmitBtn.addEventListener('click', () => {
    if (selectedOptionIndex === null) {
      moduleFeedback.textContent = 'Please choose an option first.';
      moduleFeedback.className = 'challenge-feedback error';
      return;
    }

    if (!currentActiveChallenge) return;
    const selectedOpt = currentActiveChallenge.options[selectedOptionIndex];
    const optionBtns = moduleOptionsContainer.querySelectorAll('.option-btn');

    if (selectedOpt.correct) {
      optionBtns[selectedOptionIndex].classList.add('correct');
      moduleFeedback.textContent = 'Correct! Your profound understanding of ancient wisdom advances your journey.';
      moduleFeedback.className = 'challenge-feedback success';
      moduleSubmitBtn.disabled = true;

      setTimeout(() => {
        closeChallengeModal();
        if (currentActiveChallenge.onSuccess) {
          currentActiveChallenge.onSuccess();
        }
      }, 900);
    } else {
      optionBtns[selectedOptionIndex].classList.add('incorrect');
      moduleFeedback.textContent = 'Not quite. Reflect upon the virtues and civilizational truths of Bharat, and try again.';
      moduleFeedback.className = 'challenge-feedback error';
    }
  });

  // ─── Claim Daily Quest ───
  btnClaimQuest.addEventListener('click', () => {
    if (btnClaimQuest.classList.contains('ready')) {
      const claimed = window.PlayerState.claimDailyQuest();
      if (claimed) {
        playCelebrationChime();
        showRewardToast('QUEST CLAIMED!', 'Received 50 Gold Coins, 10 Gems, and 200 XP!', '🪙');
      }
    } else {
      playClickSound();
    }
  });

  // ─── Sidebar Navigation Handling ───
  sidebarNavItems.forEach(item => {
    item.addEventListener('click', () => {
      playClickSound();
      const targetTab = item.getAttribute('data-tab');

      sidebarNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      viewPanels.forEach(panel => {
        if (panel.id === `view-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ─── Populate Secondary View Tabs ───
  function populateCollectionTab(unlocks) {
    const container = document.getElementById('collection-items-container');
    if (!container) return;
    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-top: 14px;">
        ${unlocks.map(u => `
          <div style="background: rgba(22,14,8,0.85); border: 1px solid rgba(212,163,89,0.3); border-radius: 12px; padding: 14px; text-align: center;">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">${u.icon}</div>
            <h4 style="color: #FFF2D1; font-size: 0.95rem; margin-bottom: 4px;">${u.title}</h4>
            <span style="color: var(--gold-main); font-size: 0.75rem; display: block; margin-bottom: 4px;">${u.era}</span>
            <span style="color: #A08B72; font-size: 0.75rem;">Type: ${u.type}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Populate Timeline Tab Cards
  const timelineContainer = document.getElementById('timeline-cards-list');
  if (timelineContainer) {
    const eras = [
      { name: 'Satya Yuga', desc: 'The Golden Age of Truth and Cosmic Harmony', icon: '☀️' },
      { name: 'Treta Yuga', desc: 'Age of Shri Rama, King Harishchandra, and Sacred Vows', icon: '🏹', current: true },
      { name: 'Dvapara Yuga', desc: 'Age of Shri Krishna, the Kurukshetra Battle, and the Gita', icon: '🦚' },
      { name: 'Mauryan Empire', desc: 'Chanakya, Chandragupta, Ashoka & Pan-Indian Unity', icon: '🏛️' },
      { name: 'Gupta Golden Age', desc: 'Apex of Astronomy, Mathematics, Metallurgy, and Sanskrit Literature', icon: '📜' },
      { name: 'Chola Maritime Dynasty', desc: 'Oceanic Trade, Thanjavur Grand Architecture, and Cultural Spread', icon: '⚓' }
    ];
    timelineContainer.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 14px;">
        ${eras.map(e => `
          <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(24,16,9,0.85); border: 1px solid ${e.current ? 'var(--gold-main)' : 'rgba(212,163,89,0.25)'}; padding: 14px 20px; border-radius: 12px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 1.8rem;">${e.icon}</span>
              <div>
                <h4 style="color: ${e.current ? 'var(--gold-light)' : '#E8D8C4'}; font-family: var(--font-serif); font-size: 1.05rem;">${e.name} ${e.current ? '<span style="font-size: 0.75rem; background: var(--gold-main); color: #000; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">ACTIVE</span>' : ''}</h4>
                <p style="color: #A08B72; font-size: 0.85rem;">${e.desc}</p>
              </div>
            </div>
            <button class="btn-resume-glow btn-sm" onclick="this.textContent='Examined'">Explore</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Settings Tab handlers
  const inputPlayerName = document.getElementById('input-player-name');
  if (inputPlayerName) {
    inputPlayerName.addEventListener('change', (e) => {
      if (window.PlayerState && e.target.value.trim()) {
        const state = window.PlayerState.getState();
        state.user.name = e.target.value.trim();
        window.PlayerState.saveState();
        showRewardToast('PROFILE UPDATED', `Your name is now ${state.user.name}`, '👤');
      }
    });
  }

  const settingsResetBtn = document.getElementById('settings-reset-btn');
  if (settingsResetBtn) {
    settingsResetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your player state to initial values?')) {
        window.PlayerState.resetProgress();
        showRewardToast('STATE RESET', 'Default state restored.', '🔄');
      }
    });
  }

  // ─── Modal Utility (Landing Page) ───
  function openGenericInfoModal(kicker, headline, html) {
    modalKicker.textContent = kicker;
    modalHeadline.textContent = headline;
    modalBody.innerHTML = html;
    infoModal.classList.add('open');
    infoModal.setAttribute('aria-hidden', 'false');
  }

  function closeGenericInfoModal() {
    infoModal.classList.remove('open');
    infoModal.setAttribute('aria-hidden', 'true');
    playClickSound();
  }

  modalCloseBtn.addEventListener('click', closeGenericInfoModal);
  modalActionBtn.addEventListener('click', () => {
    closeGenericInfoModal();
    openDashboard();
  });

  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) closeGenericInfoModal();
  });

  // Dock items
  const modalContentMap = {
    games: { kicker: 'CHALLENGES', title: 'Ancient Strategy & Games', text: 'Master Chaturanga, Moksha Patam, and tactical warfare.' },
    history: { kicker: 'CHRONICLES', title: 'Historical Eras', text: 'Discover Indus-Sarasvati, Mauryas, Guptas, and Cholas.' },
    rewards: { kicker: 'ACHIEVEMENTS', title: 'Earn Sacred Seals', text: 'Collect historical relics and rise on national leaderboards.' },
    culture: { kicker: 'HERITAGE', title: 'Living Traditions', text: 'Explore classical arts, sacred architecture, and philosophies.' }
  };

  function setupDockListener(btn, key) {
    if (!btn) return;
    btn.addEventListener('click', () => {
      playClickSound();
      const d = modalContentMap[key];
      openGenericInfoModal(d.kicker, d.title, `<p>${d.text}</p>`);
    });
  }

  setupDockListener(dockGames, 'games');
  setupDockListener(dockHistory, 'history');
  setupDockListener(dockRewards, 'rewards');
  setupDockListener(dockCulture, 'culture');

  // ─── Ambient Canvas Particles ───
  function startAmbientCanvas() {
    if (!ambientCanvas) return;
    const ctx = ambientCanvas.getContext('2d');
    let width = (ambientCanvas.width = window.innerWidth);
    let height = (ambientCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = ambientCanvas.width = window.innerWidth;
      height = ambientCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(65, Math.floor(width / 24));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.55 - 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.3 ? 'rgba(245, 198, 108,' : 'rgba(255, 235, 175,'
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.008;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${currentAlpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(245, 198, 108, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(render);
    }

    render();
  }
});

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
    } catch (e) {}
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
    } catch (e) {}
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

  splashVideo.play().catch(() => {});

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

      card.innerHTML = `
        <div class="path-emblem-wrap">${path.emblem}</div>
        <h4 class="path-title">${path.title}</h4>
        <p class="path-subtitle">${path.subtitle}</p>
        <div class="path-mini-progress" title="${path.progress}% Complete">
          <div class="path-mini-fill" style="width: ${path.progress}%;"></div>
        </div>
      `;

      card.addEventListener('click', () => {
        playClickSound();
        launchPathModule(path);
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

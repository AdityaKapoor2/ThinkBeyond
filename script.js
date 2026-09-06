document.addEventListener('DOMContentLoaded', () => {
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

  // Modals & Toasts
  const infoModal = document.getElementById('info-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalKicker = document.getElementById('modal-kicker');
  const modalHeadline = document.getElementById('modal-headline');
  const modalBody = document.getElementById('modal-body');
  const journeyToast = document.getElementById('journey-toast');

  // Dock items
  const dockGames = document.getElementById('dock-games');
  const dockHistory = document.getElementById('dock-history');
  const dockRewards = document.getElementById('dock-rewards');
  const dockCulture = document.getElementById('dock-culture');

  let isSoundMuted = false;
  let hasTransitioned = false;
  let audioCtx = null;

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
      
      // Fundamental oscillator
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      
      // Harmonic overtone oscillator
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
    } catch (e) {
      // Audio context policy fallback
    }
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
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // ─── Transition from Splash Video to Landing Page ───
  function revealLandingPage() {
    if (hasTransitioned) return;
    hasTransitioned = true;

    // Fade out splash screen
    splashScreen.classList.add('fade-out');

    // Pause video
    setTimeout(() => {
      splashVideo.pause();
      splashScreen.style.display = 'none';
    }, 850);

    // Reveal landing page
    landingPage.classList.add('active');

    // Start golden ambient particle canvas
    startAmbientCanvas();

    // Play subtle entrance bell chime
    setTimeout(() => {
      playTempleChime(440, 2.0);
    }, 400);
  }

  // Auto-play splash video
  splashVideo.play().catch(() => {});

  // Progress Bar Tracking
  splashVideo.addEventListener('timeupdate', () => {
    if (splashVideo.duration) {
      const progress = (splashVideo.currentTime / splashVideo.duration) * 100;
      progressFill.style.width = progress + '%';
    }
  });

  // Skip button ready immediately
  skipBtn.classList.add('visible');

  // Skip Button Event
  skipBtn.addEventListener('click', () => {
    initAudio();
    revealLandingPage();
  });

  // Video Ended Event
  splashVideo.addEventListener('ended', () => {
    progressFill.style.width = '100%';
    revealLandingPage();
  });

  // ─── Audio Toggle Control ───
  audioToggleBtn.addEventListener('click', () => {
    isSoundMuted = !isSoundMuted;
    if (isSoundMuted) {
      soundOnIcon.style.display = 'none';
      soundOffIcon.style.display = 'block';
    } else {
      soundOnIcon.style.display = 'block';
      soundOffIcon.style.display = 'none';
      playClickSound();
    }
  });

  // ─── Start Journey CTA ───
  startJourneyBtn.addEventListener('click', () => {
    playTempleChime(528, 2.2);
    showToast();
  });

  function showToast() {
    journeyToast.classList.add('show');
    setTimeout(() => {
      journeyToast.classList.remove('show');
    }, 4500);
  }

  // ─── Modal Dialog Management ───
  const modalContentMap = {
    games: {
      kicker: 'CHALLENGES & STRATEGY',
      title: 'Ancient Strategy & Games',
      html: `
        <p>Step into time-honored Indian strategic games reimagined for the modern era:</p>
        <h4>Featured Gameplay Modes:</h4>
        <ul>
          <li><strong>Chaturanga Protocol:</strong> The ancient precursor to chess, testing multi-flank strategy and foresight.</li>
          <li><strong>Moksha Patam (Snakes & Ladders):</strong> Moral karma and tactical trajectory progression.</li>
          <li><strong>Pachisi Labyrinth:</strong> Four-player historical tactical race through dynastic courts.</li>
        </ul>
      `
    },
    history: {
      kicker: 'CHRONICLES OF BHARAT',
      title: 'Historical Eras & Civilizations',
      html: `
        <p>Uncover the architectural marvels, astronomical advancements, and philosophical traditions of ancient India:</p>
        <h4>Key Eras Covered:</h4>
        <ul>
          <li><strong>Indus-Sarasvati Civilization:</strong> Urban planning, granaries, and hydraulic engineering.</li>
          <li><strong>Maurya & Gupta Golden Ages:</strong> Science, mathematics (the concept of zero), metallurgy, and global trade.</li>
          <li><strong>Chola Maritime Empire:</strong> Naval supremacy and temple architecture across the Indian Ocean.</li>
        </ul>
      `
    },
    rewards: {
      kicker: 'MILESTONES & ACHIEVEMENTS',
      title: 'Earn Sacred Seals & Badges',
      html: `
        <p>Your journey awards collectible historical relics, knowledge seals, and ranking prestige:</p>
        <h4>Reward System:</h4>
        <ul>
          <li><strong>Dharma Badges:</strong> Master ethical decision-making puzzles.</li>
          <li><strong>Architectural Seals:</strong> Reconstruct grand stone temples and celestial observatories.</li>
          <li><strong>National Leaderboard:</strong> Compete in real-time hackathon challenges across India.</li>
        </ul>
      `
    },
    culture: {
      kicker: 'HERITAGE & ARTS',
      title: 'Living Traditions & Culture',
      html: `
        <p>Immerse yourself in traditional music, classical arts, Vedic literature, and temple craftsmanship:</p>
        <h4>Cultural Dimensions:</h4>
        <ul>
          <li><strong>Ragas & Harmonics:</strong> Interactive music scales aligned with planetary shifts.</li>
          <li><strong>Temple Sculpture & Vastu:</strong> Geometric harmony and sacred proportions.</li>
          <li><strong>Ancient Manuscripts:</strong> Decipher palm-leaf writings and linguistic riddles.</li>
        </ul>
      `
    }
  };

  function openModal(category) {
    const data = modalContentMap[category];
    if (!data) return;

    modalKicker.textContent = data.kicker;
    modalHeadline.textContent = data.title;
    modalBody.innerHTML = data.html;

    infoModal.classList.add('open');
    infoModal.setAttribute('aria-hidden', 'false');
    playClickSound();
  }

  function closeModal() {
    infoModal.classList.remove('open');
    infoModal.setAttribute('aria-hidden', 'true');
    playClickSound();
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalActionBtn.addEventListener('click', () => {
    closeModal();
    playTempleChime(587, 2.0);
    showToast();
  });

  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Dock items listeners
  dockGames.addEventListener('click', () => openModal('games'));
  dockHistory.addEventListener('click', () => openModal('history'));
  dockRewards.addEventListener('click', () => openModal('rewards'));
  dockCulture.addEventListener('click', () => openModal('culture'));

  // ─── Golden Dust / Firefly Particle Canvas ───
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
        vy: -Math.random() * 0.55 - 0.2, // Drift upward
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

        // Reset if drifted off screen
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

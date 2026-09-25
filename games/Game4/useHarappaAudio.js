import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * ============================================================================
 * BHARATAM: Authentic Indus Valley Procedural Audio Engine
 * ============================================================================
 * Generates thematic, high-fidelity soundscapes using the native Web Audio API:
 * - Ambient bed: River trickle, sparse distant clay-pot taps (-18dB)
 * - Tile placements: Specific ceramic, stone scrape, water gurgle, clay ring
 * - Invalid action: Soft muted double-tap
 * - Clear tile: Dry brush/sweep
 * - End turn: Resonant singing bowl / temple bell
 * - Stat increase: Ascending 3-note bansuri flute flourish
 * - Win condition: Conch shell (shankha) swell + deep mridangam/dhol thud
 * 
 * Complies with browser autoplay policies: starts ambient bed only on first interaction.
 */

export function useHarappaAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const ambientNodesRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Lazy Web Audio context initializer
  const getContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
        masterGainRef.current = audioCtxRef.current.createGain();
        masterGainRef.current.gain.value = isMuted ? 0 : 1;
        masterGainRef.current.connect(audioCtxRef.current.destination);
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [isMuted]);

  // Keep master gain synced with mute state
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : 1;
      masterGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.05);
    }
  }, [isMuted]);

  // --------------------------------------------------------------------------
  // AMBIENT BED: River trickle + sparse clay pot taps (~ -18dB)
  // --------------------------------------------------------------------------
  const startAmbientBed = useCallback(() => {
    if (ambientNodesRef.current) return; // already active
    const ctx = getContext();
    if (!ctx || !masterGainRef.current) return;

    try {
      // 1. Procedural water flow (Band-passed pink noise with slow modulations)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.06;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter to simulate river water lap
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 450;
      filter.Q.value = 1.2;

      // Gentle LFO modulating water frequency (350Hz - 550Hz)
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.18; // 0.18 Hz ripple
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 120;
      lfo.connect(filter.frequency);

      // Ambient master gain (~ -18dB -> ~0.125)
      const ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);

      noiseSource.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(masterGainRef.current);

      lfo.start();
      noiseSource.start();

      // Sparse distant clay pot taps interval
      const potTapInterval = setInterval(() => {
        if (!audioCtxRef.current || isMuted) return;
        if (Math.random() < 0.4) {
          const now = audioCtxRef.current.currentTime;
          const tapOsc = audioCtxRef.current.createOscillator();
          const tapGain = audioCtxRef.current.createGain();
          const freq = Math.random() > 0.5 ? 460 : 540;

          tapOsc.type = 'sine';
          tapOsc.frequency.setValueAtTime(freq, now);
          tapOsc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + 0.06);

          tapGain.gain.setValueAtTime(0.015, now); // very subtle
          tapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

          tapOsc.connect(tapGain);
          tapGain.connect(masterGainRef.current);

          tapOsc.start(now);
          tapOsc.stop(now + 0.08);
        }
      }, 5000);

      ambientNodesRef.current = {
        noiseSource,
        lfo,
        ambientGain,
        interval: potTapInterval
      };
    } catch (e) {
      console.warn('Ambient start failed:', e);
    }
  }, [getContext, isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (ambientNodesRef.current) {
        clearInterval(ambientNodesRef.current.interval);
        try {
          ambientNodesRef.current.noiseSource.stop();
          ambientNodesRef.current.lfo.stop();
        } catch (_) {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  // --------------------------------------------------------------------------
  // SOUND DISPATCHER: playSound(name)
  // --------------------------------------------------------------------------
  const playSound = useCallback((soundName) => {
    // Start ambient bed on first user gesture
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      startAmbientBed();
    }

    if (isMuted) return;
    const ctx = getContext();
    if (!ctx || !masterGainRef.current) return;

    const now = ctx.currentTime;

    switch (soundName) {
      // ----------------------------------------------------------------------
      // 1. TILE PLACEMENTS
      // ----------------------------------------------------------------------
      case 'place-house': {
        // Warm low ceramic thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(48, now + 0.08);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(masterGainRef.current);

        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }

      case 'place-road': {
        // Soft stone scrape / shuffle
        const bufSize = ctx.sampleRate * 0.06;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = buf;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(750, now + 0.06);
        filter.Q.value = 2.5;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);

        noise.start(now);
        noise.stop(now + 0.07);
        break;
      }

      case 'place-drain': {
        // Ceramic thud + low water-gurgle tail
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.07);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(masterGainRef.current);
        osc.start(now);
        osc.stop(now + 0.08);

        // Water gurgle bubble tail
        const gurgleOsc = ctx.createOscillator();
        const gurgleGain = ctx.createGain();
        gurgleOsc.type = 'sine';
        gurgleOsc.frequency.setValueAtTime(260, now + 0.04);
        gurgleOsc.frequency.linearRampToValueAtTime(180, now + 0.12);
        gurgleGain.gain.setValueAtTime(0.15, now + 0.04);
        gurgleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        gurgleOsc.connect(gurgleGain);
        gurgleGain.connect(masterGainRef.current);
        gurgleOsc.start(now + 0.04);
        gurgleOsc.stop(now + 0.13);
        break;
      }

      case 'place-special': // Granary, Well, Workshop
      case 'place-granary':
      case 'place-well':
      case 'place-workshop': {
        // Ceramic thud + brief resonant clay-pot ring
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(masterGainRef.current);
        osc.start(now);
        osc.stop(now + 0.09);

        // Resonant clay ring
        const ringOsc = ctx.createOscillator();
        const ringGain = ctx.createGain();
        ringOsc.type = 'sine';
        ringOsc.frequency.setValueAtTime(680, now);
        ringGain.gain.setValueAtTime(0.18, now);
        ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        ringOsc.connect(ringGain);
        ringGain.connect(masterGainRef.current);
        ringOsc.start(now);
        ringOsc.stop(now + 0.3);
        break;
      }

      // ----------------------------------------------------------------------
      // 2. INVALID ACTION (Soft low double-tap)
      // ----------------------------------------------------------------------
      case 'invalid': {
        [0, 0.07].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(110, now + delay);
          osc.frequency.linearRampToValueAtTime(80, now + delay + 0.05);

          gain.gain.setValueAtTime(0.18, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.05);

          osc.connect(gain);
          gain.connect(masterGainRef.current);
          osc.start(now + delay);
          osc.stop(now + delay + 0.06);
        });
        break;
      }

      // ----------------------------------------------------------------------
      // 3. CLEAR TILE (Light dry brush / sweep)
      // ----------------------------------------------------------------------
      case 'clear-tile': {
        const bufSize = ctx.sampleRate * 0.08;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = ctx.createBufferSource();
        noise.buffer = buf;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(2200, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(masterGainRef.current);

        noise.start(now);
        noise.stop(now + 0.09);
        break;
      }

      // ----------------------------------------------------------------------
      // 4. END TURN (Soft temple-bell / singing-bowl strike with long ring)
      // ----------------------------------------------------------------------
      case 'end-turn': {
        const harmonics = [
          { freq: 288, gain: 0.32, decay: 2.8 },
          { freq: 576, gain: 0.22, decay: 2.4 },
          { freq: 864, gain: 0.12, decay: 1.9 },
          { freq: 1152, gain: 0.06, decay: 1.4 }
        ];

        harmonics.forEach(({ freq, gain, decay }) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

          g.gain.setValueAtTime(0.001, now);
          g.gain.linearRampToValueAtTime(gain, now + 0.03);
          g.gain.exponentialRampToValueAtTime(0.0001, now + decay);

          osc.connect(g);
          g.connect(masterGainRef.current);
          osc.start(now);
          osc.stop(now + decay);
        });
        break;
      }

      // ----------------------------------------------------------------------
      // 5. STAT INCREASE (Ascending 3-note bansuri flute flourish)
      // ----------------------------------------------------------------------
      case 'stat-increase': {
        const notes = [384, 480, 576]; // Indian raga harmonic notes
        notes.forEach((freq, idx) => {
          const start = now + idx * 0.11;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.24);

          osc.connect(gain);
          gain.connect(masterGainRef.current);
          osc.start(start);
          osc.stop(start + 0.25);
        });
        break;
      }

      // ----------------------------------------------------------------------
      // 6. WIN CONDITION: Shankha (Conch shell) swell + deep mridangam/dhol hit
      // ----------------------------------------------------------------------
      case 'win': {
        // Shankha conch swell (Harmonics swelling from 220Hz upwards)
        const conchFreqs = [220, 440, 660, 880];
        conchFreqs.forEach((baseFreq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(baseFreq, now);
          osc.frequency.linearRampToValueAtTime(baseFreq * 1.04, now + 1.6);

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, now);
          filter.frequency.linearRampToValueAtTime(1400, now + 1.2);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.12, now + 0.7);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(masterGainRef.current);

          osc.start(now);
          osc.stop(now + 2.1);
        });

        // Deep resonant Mridangam / Dhol thud (Bass impact)
        const dholOsc = ctx.createOscillator();
        const dholGain = ctx.createGain();
        dholOsc.type = 'sine';
        dholOsc.frequency.setValueAtTime(78, now + 0.3);
        dholOsc.frequency.exponentialRampToValueAtTime(36, now + 0.3 + 0.45);

        dholGain.gain.setValueAtTime(0.45, now + 0.3);
        dholGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3 + 0.6);

        dholOsc.connect(dholGain);
        dholGain.connect(masterGainRef.current);

        dholOsc.start(now + 0.3);
        dholOsc.stop(now + 1.0);
        break;
      }

      default:
        console.warn(`Unrecognized sound: ${soundName}`);
    }
  }, [getContext, isMuted, startAmbientBed]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    playSound,
    isMuted,
    toggleMute,
    startAmbientBed,
  };
}

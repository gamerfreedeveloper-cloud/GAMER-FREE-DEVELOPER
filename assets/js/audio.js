/* GAMER-FREE-DEVELOPER · audio ambiental ligero · 1.0.3 */
'use strict';

(() => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 349.23,
    440.00, 587.33, 440.00, 349.23, 261.63, 329.63, 392.00, 493.88];
  const bass = [130.81, 146.83, 164.81, 146.83];
  let context;
  let master;
  let musicBus;
  let effectsBus;
  let timer;
  let nextTime = 0;
  let step = 0;
  let started = false;

  function ensureContext() {
    try {
      if (!context) {
        context = new AudioContextClass();
        master = context.createGain();
        musicBus = context.createGain();
        effectsBus = context.createGain();
        master.gain.value = 0.65;
        musicBus.gain.value = 0;
        effectsBus.gain.value = 0.7;
        musicBus.connect(master);
        effectsBus.connect(master);
        master.connect(context.destination);
      }
      if (context.state === 'suspended') context.resume().catch(() => {});
      return true;
    } catch {
      return false;
    }
  }

  function tone(frequency, at, duration, volume, wave, bus) {
    if (!context || !bus) return;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const end = at + duration;
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, at);
    envelope.gain.setValueAtTime(0.0001, at);
    envelope.gain.linearRampToValueAtTime(volume, at + Math.min(0.025, duration * 0.2));
    envelope.gain.setTargetAtTime(0.0001, Math.max(at + 0.025, end - 0.13), 0.045);
    oscillator.connect(envelope);
    envelope.connect(bus);
    oscillator.start(at);
    oscillator.stop(end + 0.02);
    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      envelope.disconnect();
    }, { once: true });
  }

  function scheduleMusic() {
    if (!context || document.hidden || context.state !== 'running') return;
    const horizon = context.currentTime + 0.9;
    while (nextTime < horizon) {
      const note = notes[step % notes.length];
      tone(note, nextTime, 0.72, 0.018, 'sine', musicBus);
      tone(note * 2, nextTime + 0.02, 0.4, 0.0045, 'triangle', musicBus);
      if (step % 4 === 0) tone(bass[(step / 4) % bass.length], nextTime, 1.35, 0.012, 'triangle', musicBus);
      nextTime += 0.64;
      step += 1;
    }
  }

  function startAmbient() {
    if (started || document.hidden || !ensureContext()) return;
    started = true;
    musicBus.gain.setTargetAtTime(0.42, context.currentTime, 0.35);
    nextTime = context.currentTime + 0.06;
    scheduleMusic();
    timer = window.setInterval(scheduleMusic, 260);
  }

  function firstInteraction() {
    startAmbient();
    document.removeEventListener('pointerdown', firstInteraction, true);
    document.removeEventListener('keydown', firstInteraction, true);
  }

  document.addEventListener('pointerdown', firstInteraction, { once: true, passive: true, capture: true });
  document.addEventListener('keydown', firstInteraction, { once: true, capture: true });

  const effects = {
    tap: [[659.25, 0.07, 0.045, 'triangle', 0]],
    nav: [[392.00, 0.09, 0.045, 'sine', 0], [587.33, 0.11, 0.035, 'triangle', 0.045]],
    open: [[523.25, 0.11, 0.045, 'triangle', 0], [659.25, 0.13, 0.035, 'sine', 0.05], [783.99, 0.15, 0.03, 'triangle', 0.1]],
    close: [[587.33, 0.09, 0.035, 'sine', 0], [440.00, 0.11, 0.03, 'triangle', 0.045]]
  };

  window.GFDAudio = Object.freeze({
    playEffect(kind = 'tap') {
      if (!context || context.state !== 'running' || document.hidden) return;
      const now = context.currentTime + 0.012;
      (effects[kind] || effects.tap).forEach(([frequency, duration, volume, wave, offset]) => {
        tone(frequency, now + offset, duration, volume, wave, effectsBus);
      });
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (!context) return;
    if (document.hidden) {
      if (timer) window.clearInterval(timer);
      timer = null;
      context.suspend().catch(() => {});
      return;
    }
    context.resume().then(() => {
      if (started && !timer) {
        nextTime = context.currentTime + 0.05;
        scheduleMusic();
        timer = window.setInterval(scheduleMusic, 260);
      }
    }).catch(() => {});
  });
})();

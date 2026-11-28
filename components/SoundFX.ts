"use client";

/**
 * Web Audio API procedural synthesizer for Hold Steel!
 * Generates all metallic UI sounds and chimes on-the-fly with 0 audio assets.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Metallic button click / select clack
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const clack = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);

    clack.type = "sine";
    clack.frequency.setValueAtTime(1600, now);
    clack.frequency.exponentialRampToValueAtTime(450, now + 0.07);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    clack.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    clack.start(now);
    osc.stop(now + 0.13);
    clack.stop(now + 0.08);
  }

  // Steel plate displacement sound (pitch ramps according to depth in rack)
  playShift(index: number = 0, totalBars: number = 4) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const clack = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 310 + (index / Math.max(1, totalBars)) * 340;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.13);

    clack.type = "sine";
    clack.frequency.setValueAtTime(1450, now + 0.05);
    clack.frequency.exponentialRampToValueAtTime(520, now + 0.11);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    clack.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    clack.start(now + 0.05);
    osc.stop(now + 0.17);
    clack.stop(now + 0.12);
  }

  // Subtle hover ticking sound
  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.03);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Heavy steel gate / enter transition sound
  playEnter() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const sub = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.18);

    sub.type = "triangle";
    sub.frequency.setValueAtTime(90, now);
    sub.frequency.exponentialRampToValueAtTime(45, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    sub.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    sub.start(now);
    osc.stop(now + 0.2);
    sub.stop(now + 0.33);
  }

  // Steel plates sliding across flat surface (table slide whoosh)
  playThrowSlide() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const friction = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Metallic resonance glide (relaxed, smooth glide down)
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.6);

    // Friction swoosh texture
    friction.type = "triangle";
    friction.frequency.setValueAtTime(440, now);
    friction.frequency.exponentialRampToValueAtTime(100, now + 0.55);

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.linearRampToValueAtTime(0.11, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    friction.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    friction.start(now);
    osc.stop(now + 0.68);
    friction.stop(now + 0.68);
  }

  // Industrial roll-up door opening sound
  playShutterRollUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const metal = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.38);

    metal.type = "triangle";
    metal.frequency.setValueAtTime(240, now);
    metal.frequency.exponentialRampToValueAtTime(520, now + 0.32);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc.connect(gain);
    metal.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    metal.start(now);
    osc.stop(now + 0.44);
    metal.stop(now + 0.34);
  }

  // Undo sound (gentle downward pitch glide)
  playUndo() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  }

  // Level unlock fanfare or selection chime
  playSelectLevel(isBoss: boolean = false) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = isBoss ? [220, 277.18, 329.63, 440] : [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + i * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isBoss ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(isBoss ? 0.18 : 0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isBoss ? 0.35 : 0.25));

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    });
  }

  // Metallic clank when clicking a locked steel plate
  playLocked() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Victory fanfare (C Major arpeggio)
  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + i * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.29);
    });
  }
}

export const sound = new SoundEngine();

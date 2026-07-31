import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  StopCircle,
  Wind,
  Clock,
  Heart,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from 'lucide-react';

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'secondHold';
type BreathingModeId = '478' | 'box' | 'coherent' | 'focus46';
type VisualThemeId = 'ocean' | 'sunset' | 'night' | 'mandala' | 'ambient' | 'kaleidoscope';

interface BreathingMode {
  id: BreathingModeId;
  name: string;
  label: string;
  description: string;
  pattern: {
    inhale: number;
    hold?: number;
    exhale: number;
    secondHold?: number;
  };
  bestFor: string;
}

const MODES: BreathingMode[] = [
  {
    id: '478',
    name: '4-7-8 Breathing',
    label: 'Deep Reset',
    description:
      'A longer exhale pattern to help your nervous system downshift. Best for evening wind-downs or after stressful tasks.',
    pattern: { inhale: 4, hold: 7, exhale: 8 },
    bestFor: 'Evening use, post-stress recovery, between long work blocks.',
  },
  {
    id: 'box',
    name: 'Box Breathing (4-4-4-4)',
    label: 'Calm Focus',
    description:
      'Balanced inhale, hold, exhale, hold. Great for quick focus resets before meetings or deep-work blocks.',
    pattern: { inhale: 4, hold: 4, exhale: 4, secondHold: 4 },
    bestFor: 'Pre-meeting focus, starting a Pomodoro, calming nerves.',
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing (5-5)',
    label: 'Balanced Energy',
    description:
      'Slow, even inhale and exhale around 5 seconds each. A gentle pattern that stabilizes breathing without making you sleepy.',
    pattern: { inhale: 5, exhale: 5 },
    bestFor: 'Longer breaks between sessions, mid-day reset, lunch pauses.',
  },
  {
    id: 'focus46',
    name: '4-6 Focus Breathing',
    label: 'Quick Boost',
    description:
      'Shorter inhale and longer exhale to quickly calm the mind while staying alert. Ideal for 2–3 minute focus breaks.',
    pattern: { inhale: 4, exhale: 6 },
    bestFor: 'Short breaks during work, quick concentration boost.',
  },
];

const SESSION_PRESETS = [
  { minutes: 2, label: '2 min — quick reset' },
  { minutes: 5, label: '5 min — between tasks' },
  { minutes: 8, label: '8 min — deeper reset' },
];

const SCALE_MIN = 0.92;
const SCALE_MAX = 1.08;

function easeInOut(t: number): number {
  return t * t * (3 - 2 * t);
}

function buildPhaseSequence(mode: BreathingMode): BreathingPhase[] {
  const p = mode.pattern;
  const seq: BreathingPhase[] = ['inhale'];
  if (p.hold && p.hold > 0) seq.push('hold');
  seq.push('exhale');
  if (p.secondHold && p.secondHold > 0) seq.push('secondHold');
  return seq;
}

function getDurationFor(mode: BreathingMode, phase: BreathingPhase): number {
  const p = mode.pattern;
  switch (phase) {
    case 'inhale':
      return p.inhale;
    case 'hold':
      return p.hold ?? 0;
    case 'exhale':
      return p.exhale;
    case 'secondHold':
      return p.secondHold ?? 0;
    default:
      return 0;
  }
}

function targetScaleForPhase(phase: BreathingPhase): number {
  switch (phase) {
    case 'inhale':
      return SCALE_MAX;
    case 'hold':
      return SCALE_MAX;
    case 'exhale':
      return SCALE_MIN;
    case 'secondHold':
      return SCALE_MIN;
    default:
      return 1;
  }
}

function getOrbGradient(theme: VisualThemeId): string {
  switch (theme) {
    case 'sunset':
      return 'from-orange-400/85 to-pink-500/85';
    case 'night':
      return 'from-indigo-500/85 to-purple-600/85';
    case 'mandala':
      return 'from-teal-400/85 to-violet-500/85';
    case 'ambient':
      return 'from-emerald-400/85 to-sky-500/85';
    case 'kaleidoscope':
      return 'from-fuchsia-500/85 to-sky-500/85';
    case 'ocean':
    default:
      return 'from-brand-500/85 to-cyan-500/85';
  }
}

function getOrbHalo(theme: VisualThemeId): string {
  switch (theme) {
    case 'sunset':
      return 'from-orange-400 to-pink-500';
    case 'night':
      return 'from-indigo-500 to-purple-600';
    case 'mandala':
      return 'from-teal-400 to-violet-500';
    case 'ambient':
      return 'from-emerald-400 to-sky-500';
    case 'kaleidoscope':
      return 'from-fuchsia-500 to-sky-500';
    case 'ocean':
    default:
      return 'from-brand-500 to-cyan-500';
  }
}

function MandalaOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mandalaGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#mandalaGradient)" />
      <circle cx="50" cy="50" r="36" stroke="white" strokeWidth="0.4" fill="none" opacity="0.5" />
      <circle cx="50" cy="50" r="28" stroke="white" strokeWidth="0.5" fill="none" opacity="0.55" />
      <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="0.5" fill="none" opacity="0.6" />
      <circle cx="50" cy="50" r="12" stroke="white" strokeWidth="0.5" fill="none" opacity="0.65" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x2 = 50 + Math.cos(angle) * 38;
        const y2 = 50 + Math.sin(angle) * 38;
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={x2}
            y2={y2}
            stroke="white"
            strokeWidth="0.35"
            opacity="0.35"
          />
        );
      })}
    </svg>
  );
}

function KaleidoscopeCanvas({
  phase,
  scale,
}: {
  phase: BreathingPhase;
  scale: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(phase);
  const scaleRefLocal = useRef(scale);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    scaleRefLocal.current = scale;
  }, [scale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let start = performance.now();

    const SEGMENTS = 8;
    const COLORS = [
      [244, 114, 182], // fuchsia-ish
      [56, 189, 248], // sky
      [167, 139, 250], // soft violet
      [45, 212, 191], // teal
    ];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = Math.min(parent.clientWidth, parent.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = (now: number) => {
      const parent = canvas.parentElement;
      if (!parent) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const size = Math.min(parent.clientWidth, parent.clientHeight);
      const cx = size / 2;
      const cy = size / 2;
      const radius = size / 2;

      const elapsed = (now - start) / 1000;
      const currentPhase = phaseRef.current;
      const breathBoost =
        currentPhase === 'inhale' ? 1.15 : currentPhase === 'exhale' ? 0.9 : 1;
      // Full rotation ~30s at rest; slightly faster on inhale
      const rotation = elapsed * ((Math.PI * 2) / 30) * breathBoost;
      const intensity = 0.22 + (scaleRefLocal.current - SCALE_MIN) * 0.8;

      ctx.clearRect(0, 0, size, size);

      // Soft radial base
      const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      base.addColorStop(0, `rgba(255,255,255,${0.12 * intensity})`);
      base.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      const wedge = (Math.PI * 2) / SEGMENTS;

      for (let i = 0; i < SEGMENTS; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation + i * wedge);

        // Mirror every other segment for kaleidoscope feel
        if (i % 2 === 1) {
          ctx.scale(-1, 1);
        }

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, wedge);
        ctx.closePath();
        ctx.clip();

        const color = COLORS[i % COLORS.length];
        const [r, g, b] = color;

        // Soft petal blobs along the wedge
        for (let k = 0; k < 3; k++) {
          const dist = radius * (0.28 + k * 0.22);
          const ang = wedge * (0.25 + k * 0.2);
          const bx = Math.cos(ang) * dist;
          const by = Math.sin(ang) * dist;
          const br = radius * (0.18 - k * 0.03);

          const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
          grad.addColorStop(0, `rgba(${r},${g},${b},${0.35 * intensity})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fill();
        }

        // Thin guiding arc
        ctx.strokeStyle = `rgba(255,255,255,${0.12 * intensity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.55, 0, wedge);
        ctx.stroke();

        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden
    />
  );
}

/** Soft wind-chime style ding using a few decaying partials */
function playChime(
  ctx: AudioContext,
  freqs: number[],
  opts?: { volume?: number; duration?: number }
) {
  const volume = opts?.volume ?? 0.045;
  const duration = opts?.duration ?? 1.2;
  const t = ctx.currentTime;

  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    const start = t + i * 0.018;
    const peak = volume * (1 - i * 0.18);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(Math.max(0.001, peak), start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  });
}

export default function BreathingTimerPage() {
  const [activeModeId, setActiveModeId] = useState<BreathingModeId>('box');
  const [sessionMinutes, setSessionMinutes] = useState<number>(5);
  const [customMinutes, setCustomMinutes] = useState<string>('10');
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [phaseRemaining, setPhaseRemaining] = useState<number>(0);
  const [orbScale, setOrbScale] = useState<number>(SCALE_MIN);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [finishingCycle, setFinishingCycle] = useState(false);
  const [visualTheme, setVisualTheme] = useState<VisualThemeId>('ocean');

  const activeMode = MODES.find((m) => m.id === activeModeId)!;
  const effectiveMinutes = isCustomActive
    ? Math.max(1, Math.min(60, Number(customMinutes) || 10))
    : sessionMinutes;

  const modeRef = useRef(activeMode);
  const sequenceRef = useRef<BreathingPhase[]>(buildPhaseSequence(activeMode));
  const phaseIndexRef = useRef(0);
  const phaseStartedAtRef = useRef(0);
  const phaseDurationSecRef = useRef(4);
  const isRunningRef = useRef(false);
  const pausedElapsedRef = useRef(0);

  const scaleRef = useRef(SCALE_MIN);
  const phaseStartScaleRef = useRef(SCALE_MIN);
  const phaseTargetScaleRef = useRef(SCALE_MAX);

  const sessionStartedAtRef = useRef(0);
  const sessionPausedAccumRef = useRef(0);
  const pauseStartedAtRef = useRef<number | null>(null);
  const sessionLimitMsRef = useRef(5 * 60 * 1000);
  const stopAfterCycleRef = useRef(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(soundEnabled);

  const orbGradient = getOrbGradient(visualTheme);
  const haloGradient = getOrbHalo(visualTheme);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  function getAudioCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AC();
    }
    return audioCtxRef.current;
  }

  async function unlockAudio() {
    const ctx = getAudioCtx();
    if (ctx?.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        // ignore
      }
    }
  }

  const playPhaseSound = useCallback((phase: BreathingPhase) => {
    if (!soundEnabledRef.current) return;
    const ctx = getAudioCtx();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') void ctx.resume();

      if (phase === 'inhale') {
        playChime(ctx, [523.25, 784.0, 1046.5], { volume: 0.035, duration: 1.4 });
      } else if (phase === 'exhale') {
        playChime(ctx, [392.0, 587.33, 784.0], { volume: 0.03, duration: 1.5 });
      } else {
        playChime(ctx, [659.25, 987.77], { volume: 0.022, duration: 1.0 });
      }
    } catch {
      // ignore
    }
  }, []);

  const playSessionEndSound = useCallback(() => {
    if (!soundEnabledRef.current) return;
    const ctx = getAudioCtx();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') void ctx.resume();
      playChime(ctx, [523.25, 659.25, 783.99], { volume: 0.04, duration: 1.6 });
      window.setTimeout(() => {
        const c = getAudioCtx();
        if (c && soundEnabledRef.current) {
          playChime(c, [392.0, 523.25, 659.25], { volume: 0.032, duration: 1.8 });
        }
      }, 320);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    modeRef.current = activeMode;
    sequenceRef.current = buildPhaseSequence(activeMode);
    if (!isRunning) {
      phaseIndexRef.current = 0;
      setCurrentPhase('inhale');
      setPhaseRemaining(0);
      scaleRef.current = SCALE_MIN;
      setOrbScale(SCALE_MIN);
    }
  }, [activeModeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const finishSession = useCallback(() => {
    isRunningRef.current = false;
    setIsRunning(false);
    stopAfterCycleRef.current = false;
    pauseStartedAtRef.current = null;
    setFinishingCycle(false);
    setSessionEnded(true);
    setPhaseRemaining(0);
    playSessionEndSound();
  }, [playSessionEndSound]);

  const applyPhase = useCallback(
    (index: number, startedAt: number) => {
      const seq = sequenceRef.current;
      const i = ((index % seq.length) + seq.length) % seq.length;
      const phase = seq[i];
      const duration = Math.max(1, getDurationFor(modeRef.current, phase));

      phaseIndexRef.current = i;
      phaseStartedAtRef.current = startedAt;
      phaseDurationSecRef.current = duration;
      pausedElapsedRef.current = 0;

      phaseStartScaleRef.current = scaleRef.current;
      phaseTargetScaleRef.current = targetScaleForPhase(phase);

      setCurrentPhase(phase);
      setPhaseRemaining(duration);
      playPhaseSound(phase);
    },
    [playPhaseSound]
  );

  function handleStart() {
    modeRef.current = activeMode;
    sequenceRef.current = buildPhaseSequence(activeMode);
    sessionLimitMsRef.current = effectiveMinutes * 60 * 1000;
    sessionStartedAtRef.current = performance.now();
    sessionPausedAccumRef.current = 0;
    pauseStartedAtRef.current = null;
    stopAfterCycleRef.current = false;
    setSessionEnded(false);
    setFinishingCycle(false);

    void unlockAudio();

    isRunningRef.current = true;
    setIsRunning(true);
    applyPhase(0, performance.now());
  }

  function handlePause() {
    isRunningRef.current = false;
    setIsRunning(false);
    pauseStartedAtRef.current = performance.now();

    const elapsed =
      (performance.now() - phaseStartedAtRef.current) / 1000 + pausedElapsedRef.current;
    pausedElapsedRef.current = Math.min(phaseDurationSecRef.current, Math.max(0, elapsed));
  }

  function handleResume() {
    if (pauseStartedAtRef.current != null) {
      sessionPausedAccumRef.current += performance.now() - pauseStartedAtRef.current;
      pauseStartedAtRef.current = null;
    }
    const already = pausedElapsedRef.current;
    phaseStartedAtRef.current = performance.now() - already * 1000;
    pausedElapsedRef.current = 0;

    void unlockAudio();
    isRunningRef.current = true;
    setIsRunning(true);
    setSessionEnded(false);
  }

  function handleStop() {
    isRunningRef.current = false;
    setIsRunning(false);
    stopAfterCycleRef.current = false;
    pauseStartedAtRef.current = null;
    phaseIndexRef.current = 0;
    pausedElapsedRef.current = 0;
    setCurrentPhase('inhale');
    setPhaseRemaining(0);
    scaleRef.current = SCALE_MIN;
    setOrbScale(SCALE_MIN);
    setSessionEnded(false);
    setFinishingCycle(false);
  }

  function handleCustomChange(value: string) {
    setCustomMinutes(value);
    setIsCustomActive(true);
  }

  function toggleSound() {
    setSoundEnabled((v) => {
      const next = !v;
      if (next) void unlockAudio();
      return next;
    });
  }

  function toggleFullscreen() {
    setIsFullscreen((v) => !v);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsFullscreen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      const ctx = audioCtxRef.current;
      if (ctx) {
        void ctx.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    let raf = 0;

    const tick = () => {
      if (!isRunningRef.current) return;

      const sessionElapsedMs =
        performance.now() - sessionStartedAtRef.current - sessionPausedAccumRef.current;

      if (sessionElapsedMs >= sessionLimitMsRef.current) {
        if (!stopAfterCycleRef.current) {
          stopAfterCycleRef.current = true;
          setFinishingCycle(true);
        }
      }

      const durationSec = phaseDurationSecRef.current;
      const elapsedSec =
        (performance.now() - phaseStartedAtRef.current) / 1000 + pausedElapsedRef.current;

      if (elapsedSec >= durationSec) {
        const seq = sequenceRef.current;
        const nextIndex = phaseIndexRef.current + 1;
        const wrapped = nextIndex % seq.length === 0;

        if (stopAfterCycleRef.current && wrapped) {
          scaleRef.current = phaseTargetScaleRef.current;
          setOrbScale(scaleRef.current);
          finishSession();
          return;
        }

        pausedElapsedRef.current = 0;
        applyPhase(nextIndex, performance.now());
      } else {
        const progress = Math.min(1, Math.max(0, elapsedSec / durationSec));
        const remaining = Math.max(0, Math.ceil(durationSec - elapsedSec));
        setPhaseRemaining(remaining);

        const t = easeInOut(progress);
        const start = phaseStartScaleRef.current;
        const target = phaseTargetScaleRef.current;
        const nextScale = start + (target - start) * t;
        scaleRef.current = nextScale;
        setOrbScale(nextScale);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isRunning, applyPhase, finishSession]);

  const orbOpacity = 0.92;
  const phaseLabel = currentPhase === 'secondHold' ? 'hold' : currentPhase;

  const orbInner = (
    <span className="relative z-10 text-3xl sm:text-4xl font-semibold tabular-nums text-white tracking-tight">
      {isRunning || phaseRemaining > 0 ? phaseRemaining : '—'}
    </span>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in relative">
      {isFullscreen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950 flex flex-col items-center justify-center"
          onClick={toggleFullscreen}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 text-xs text-gray-200 hover:bg-slate-800 transition-colors"
          >
            <Minimize2 size={12} />
            Exit focus mode
          </button>
          <div
            className="relative w-56 h-56 sm:w-64 sm:h-64 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${haloGradient} opacity-20 blur-3xl`}
            />
            <div
              className={`absolute inset-4 rounded-full bg-gradient-to-br ${orbGradient} shadow-2xl shadow-black/40 flex items-center justify-center overflow-hidden`}
              style={{
                transform: `scale(${orbScale})`,
                opacity: orbOpacity,
                willChange: 'transform',
              }}
            >
              {visualTheme === 'kaleidoscope' && (
                <KaleidoscopeCanvas phase={currentPhase} scale={orbScale} />
              )}
              {visualTheme === 'mandala' && <MandalaOverlay />}
              {orbInner}
            </div>
          </div>
          <p className="mt-6 text-sm font-medium text-white capitalize tracking-wide">
            {phaseLabel}
          </p>
          <p className="mt-2 text-xs text-gray-300">
            Breathe with the orb. Tap anywhere or press ESC to close.
          </p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white">
            <Wind size={20} />
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Focus & Calm
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-tight mb-3">
          Breathing Timer for Focus, Calm, and Deep Reset
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Choose a breathing pattern, follow the guide, and reset your mind in just a few minutes.
          Use it before deep work, between Pomodoros, or whenever you need a clearer head.
        </p>
      </div>

      <section className="mb-8 card p-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Heart size={15} className="text-brand-500" />
          Choose a breathing pattern
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                if (!isRunning) setActiveModeId(mode.id);
              }}
              className={`inline-flex flex-col items-start justify-center px-3 py-2 rounded-xl border text-xs sm:text-sm transition-colors ${
                activeModeId === mode.id
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40'
              }`}
            >
              <span className="font-semibold">{mode.name}</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">{mode.label}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {activeMode.description}
        </p>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          Best for:{' '}
          <span className="font-medium text-gray-700 dark:text-gray-200">{activeMode.bestFor}</span>
        </p>
      </section>

      <section className="mb-8 card p-6 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Clock size={15} className="text-brand-500" />
            Breathing session
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Session length: {effectiveMinutes} min
            </span>
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={12} className="text-brand-500" />
                  Sound on
                </>
              ) : (
                <>
                  <VolumeX size={12} />
                  Sound off
                </>
              )}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 size={12} />
                  Focus off
                </>
              ) : (
                <>
                  <Maximize2 size={12} />
                  Focus mode
                </>
              )}
            </button>
          </div>
        </div>

        {sessionEnded && (
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200">
            Session complete — finished on a full breathing cycle. Nice work.
          </div>
        )}

        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${haloGradient} opacity-20 blur-2xl`}
            />
            <div
              className={`absolute inset-3 rounded-full bg-gradient-to-br ${orbGradient} shadow-lg shadow-slate-900/40 flex items-center justify-center overflow-hidden`}
              style={{
                transform: `scale(${orbScale})`,
                opacity: orbOpacity,
                willChange: 'transform',
              }}
            >
              {visualTheme === 'kaleidoscope' && (
                <KaleidoscopeCanvas phase={currentPhase} scale={orbScale} />
              )}
              {visualTheme === 'mandala' && <MandalaOverlay />}
              {orbInner}
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 capitalize tracking-wide">
            {phaseLabel}
          </p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 -mt-1">
            Follow the orb — inhale as it grows, hold when steady, exhale as it softens.
          </p>
          {finishingCycle && isRunning && (
            <p className="text-[11px] text-brand-500 font-medium">Finishing this cycle…</p>
          )}
        </div>

        <div className="mt-1 space-y-1">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200">Orb visual theme</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {(
              [
                { id: 'ocean', label: 'Calm Ocean' },
                { id: 'sunset', label: 'Warm Sunset' },
                { id: 'night', label: 'Deep Night' },
                { id: 'mandala', label: 'Mandala Glow' },
                { id: 'ambient', label: 'Ambient Flow' },
                { id: 'kaleidoscope', label: 'Kaleidoscope Flow' },
              ] as const
            ).map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  if (isRunning) return;
                  setVisualTheme(theme.id);
                }}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  visualTheme === theme.id
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40'
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-4">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
            Pattern for {activeMode.name}
          </p>
          <p className="text-sm font-mono text-gray-800 dark:text-gray-100">
            Inhale {activeMode.pattern.inhale}s
            {activeMode.pattern.hold ? ` · Hold ${activeMode.pattern.hold}s` : ''}
            {' · '}
            Exhale {activeMode.pattern.exhale}s
            {activeMode.pattern.secondHold
              ? ` · Hold ${activeMode.pattern.secondHold}s`
              : ''}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200">Session length</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {SESSION_PRESETS.map((len) => (
              <button
                key={len.minutes}
                onClick={() => {
                  if (isRunning) return;
                  setSessionMinutes(len.minutes);
                  setIsCustomActive(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                  !isCustomActive && sessionMinutes === len.minutes
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40'
                }`}
              >
                {len.label}
              </button>
            ))}
            <button
              onClick={() => {
                if (!isRunning) setIsCustomActive(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                isCustomActive
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40'
              }`}
            >
              Custom
            </button>
          </div>

          {isCustomActive && (
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
              <span>Custom length:</span>
              <input
                type="number"
                min={1}
                max={60}
                value={customMinutes}
                onChange={(e) => handleCustomChange(e.target.value)}
                disabled={isRunning}
                className="w-16 h-8 rounded-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-900/80 px-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/60"
              />
              <span>min (1–60)</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2">
          {!isRunning ? (
            <button
              onClick={sessionEnded || phaseRemaining === 0 ? handleStart : handleResume}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
            >
              <Play size={14} />
              {sessionEnded || phaseRemaining === 0
                ? 'Start breathing session'
                : 'Resume'}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-sm hover:bg-slate-800 transition-colors"
            >
              <Pause size={14} />
              Pause
            </button>
          )}
          <button
            onClick={handleStop}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-slate-950/40 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
          >
            <StopCircle size={14} />
            End session
          </button>
        </div>
      </section>

      <section className="card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
          How to fit breathing into your day
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Use Box Breathing or 4–6 Focus Breathing before starting a deep-work block or Pomodoro.
          Save 4–7–8 for evening wind-downs or after stressful events. Coherent Breathing is ideal
          for mid-day breaks when you want to reset without getting sleepy.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          If you ever feel lightheaded, shorten holds or choose a pattern without holds (Coherent or
          4–6 Focus). Breathing should feel calming, not like a performance test.
        </p>
      </section>
    </div>
  );
}
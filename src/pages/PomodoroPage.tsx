import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Play, Pause, SkipForward, RotateCcw, Settings, X, Check,
  Volume2, VolumeX, ArrowLeft,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type SessionType = 'work' | 'short' | 'long';

interface Config {
  workMin: number;
  shortMin: number;
  longMin: number;
  autoStart: boolean;
  muteSound: boolean;
}

interface Preset {
  label: string;
  config: Omit<Config, 'autoStart' | 'muteSound'>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'everydayutils-pomodoro-v1';

const PRESETS: Preset[] = [
  { label: 'Classic',  config: { workMin: 25, shortMin: 5,  longMin: 20 } },
  { label: 'Extended', config: { workMin: 50, shortMin: 10, longMin: 30 } },
];

const DEFAULT_CONFIG: Config = { ...PRESETS[0].config, autoStart: false, muteSound: false };

const SESSION_META: Record<SessionType, { label: string; color: string; ring: string; bg: string }> = {
  work:  { label: 'Work',        color: '#e05252', ring: '#e05252', bg: 'bg-red-500/10'     },
  short: { label: 'Short Break', color: '#4caf82', ring: '#4caf82', bg: 'bg-emerald-500/10' },
  long:  { label: 'Long Break',  color: '#5591c7', ring: '#5591c7', bg: 'bg-blue-500/10'    },
};

const CYCLE: SessionType[] = ['work', 'short', 'work', 'short', 'work', 'short', 'work', 'long'];

const RING_R = 108;
const RING_SIZE = 260;
const RING_CENTER = RING_SIZE / 2;
const RING_CIRCUM = 2 * Math.PI * RING_R;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadConfig(): Config {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return DEFAULT_CONFIG;
}

function saveConfig(cfg: Config) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); } catch { /* ignore */ }
}

function fmt(sec: number): string {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function durationFor(type: SessionType, cfg: Config): number {
  if (type === 'work')  return cfg.workMin  * 60;
  if (type === 'short') return cfg.shortMin * 60;
  return cfg.longMin * 60;
}

function matchesPreset(cfg: Config, preset: Preset): boolean {
  return cfg.workMin === preset.config.workMin
    && cfg.shortMin === preset.config.shortMin
    && cfg.longMin  === preset.config.longMin;
}

// ─── Audio ───────────────────────────────────────────────────────────────────

function playChime(muted: boolean) {
  if (muted) return;
  try {
    const ctx = new AudioContext();
    const notes = [
      { freq: 440,    t: 0    },
      { freq: 554.37, t: 0.25 },
      { freq: 659.25, t: 0.50 },
    ];
    notes.forEach(({ freq, t }) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = ctx.currentTime + t;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.55, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);
      osc.start(start);
      osc.stop(start + 1.4);
    });
    setTimeout(() => ctx.close(), 2400);
  } catch { /* AudioContext unavailable */ }
}

// ─── Toast ───────────────────────────────────────────────────────────────────

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastState {
  id: number;
  message: string;
  action?: ToastAction;
}

let toastCounter = 0;

function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    const t = timersRef.current.get(id);
    if (t) { clearTimeout(t); timersRef.current.delete(id); }
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const show = useCallback((message: string, action?: ToastAction) => {
    const id = ++toastCounter;
    setToasts(prev => [...prev.slice(-2), { id, message, action }]);
    const timer = setTimeout(() => dismiss(id), 5000);
    timersRef.current.set(id, timer);
    return id;
  }, [dismiss]);

  return { toasts, show, dismiss };
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      role="switch"
      aria-checked={value}
      tabIndex={0}
      className="relative shrink-0 ml-4 cursor-pointer"
      onClick={() => onChange(!value)}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.stopPropagation(); onChange(!value); } }}
    >
      <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${value ? 'bg-brand-600 dark:bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

interface SettingsPanelProps {
  config: Config;
  onSave: (cfg: Config) => void;
  onClose: () => void;
  isMobile: boolean;
}

function SettingsPanel({ config, onSave, onClose, isMobile }: SettingsPanelProps) {
  const [draft, setDraft] = useState<Config>(config);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
    }
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  function setField(key: keyof Config, value: number | boolean) {
    setDraft(prev => ({ ...prev, [key]: value }));
  }

  function applyPreset(preset: Preset) {
    setDraft(prev => ({ ...preset.config, autoStart: prev.autoStart, muteSound: prev.muteSound }));
  }

  function handleSave() {
    onSave(draft);
    onClose();
  }

  const content = (
    <div className="flex flex-col" style={{ maxHeight: 'inherit', height: '100%' }}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Timer Settings</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 min-h-0">
        {/* Presets */}
        <div>
          <p className="label mb-3">Presets</p>
          <div className="flex gap-2">
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className={`flex-1 py-2 text-sm font-medium rounded-xl border transition-all duration-150 ${
                  matchesPreset(draft, p)
                    ? 'bg-brand-600 dark:bg-brand-500 text-white border-transparent'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {p.label}
                <span className="block text-xs opacity-70 mt-0.5">
                  {p.config.workMin}/{p.config.shortMin}/{p.config.longMin}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Durations */}
        <div>
          <p className="label mb-3">Durations (minutes)</p>
          <div className="space-y-3">
            {([
              { key: 'workMin'  as const, label: 'Work',        color: SESSION_META.work.color  },
              { key: 'shortMin' as const, label: 'Short Break', color: SESSION_META.short.color },
              { key: 'longMin'  as const, label: 'Long Break',  color: SESSION_META.long.color  },
            ]).map(({ key, label, color }) => (
              <div key={key} className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setField(key, Math.max(1, (draft[key] as number) - 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-base leading-none transition-colors"
                  >−</button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums text-gray-900 dark:text-gray-100">
                    {draft[key] as number}
                  </span>
                  <button
                    onClick={() => setField(key, Math.min(90, (draft[key] as number) + 1))}
                    className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-base leading-none transition-colors"
                  >+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Behavior toggles */}
        <div>
          <p className="label mb-3">Behavior</p>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer select-none">
              <span className="text-sm text-gray-700 dark:text-gray-300">Auto-start next session</span>
              <Toggle value={draft.autoStart} onChange={v => setField('autoStart', v)} />
            </label>
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 cursor-pointer select-none">
              <div className="flex items-center gap-2">
                {draft.muteSound ? <VolumeX size={14} className="text-gray-400" /> : <Volume2 size={14} className="text-gray-400" />}
                <span className="text-sm text-gray-700 dark:text-gray-300">Mute sound</span>
              </div>
              <Toggle value={draft.muteSound} onChange={v => setField('muteSound', v)} />
            </label>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-800 shrink-0">
        <button onClick={handleSave} className="w-full btn-primary">
          <Check size={15} />
          Apply Settings
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div
          className="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl flex flex-col animate-slide-in"
          style={{ maxHeight: '85dvh' }}
        >
          {content}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div
        className="absolute right-0 top-11 z-40 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden animate-fade-in"
        style={{ maxHeight: 'min(560px, 80vh)' }}
      >
        {content}
      </div>
    </>
  );
}

// ─── Toast Container ──────────────────────────────────────────────────────────

function ToastContainer({ toasts, dismiss }: { toasts: ToastState[]; dismiss: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium shadow-2xl ring-1 ring-black/10 animate-fade-in"
        >
          <span>{t.message}</span>
          {t.action && (
            <button
              onClick={() => { t.action!.onClick(); dismiss(t.id); }}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/20 dark:bg-black/10 hover:bg-white/30 dark:hover:bg-black/20 transition-colors"
            >
              {t.action.label}
            </button>
          )}
          <button onClick={() => dismiss(t.id)} className="opacity-50 hover:opacity-80 ml-1 shrink-0">
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PomodoroPage() {
  const [config, setConfig] = useState<Config>(loadConfig);
  const [cycleIdx, setCycleIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(() => durationFor(CYCLE[0], loadConfig()));
  const [running, setRunning] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { toasts, show: showToast, dismiss } = useToast();

  const intervalRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStartRef     = useRef(config.autoStart);
  const muteSoundRef     = useRef(config.muteSound);
  const configRef        = useRef(config);
  const cycleIdxRef      = useRef(cycleIdx);
  const secondsRef       = useRef(secondsLeft);
  const runningRef       = useRef(running);
  const settingsOpenRef  = useRef(settingsOpen);
  const wakeLockRef      = useRef<WakeLockSentinel | null>(null);
  const snapshotRef      = useRef<{ cycleIdx: number; secondsLeft: number } | null>(null);

  // Keep all refs in sync with state
  useEffect(() => { autoStartRef.current  = config.autoStart; },  [config.autoStart]);
  useEffect(() => { muteSoundRef.current  = config.muteSound; },  [config.muteSound]);
  useEffect(() => { configRef.current     = config; },            [config]);
  useEffect(() => { cycleIdxRef.current   = cycleIdx; },          [cycleIdx]);
  useEffect(() => { secondsRef.current    = secondsLeft; },       [secondsLeft]);
  useEffect(() => { runningRef.current    = running; },           [running]);
  useEffect(() => { settingsOpenRef.current = settingsOpen; },    [settingsOpen]);

  const sessionType = CYCLE[cycleIdx];
  const meta        = SESSION_META[sessionType];
  const totalSec    = durationFor(sessionType, config);
  const progress    = totalSec > 0 ? (totalSec - secondsLeft) / totalSec : 0;
  const strokeDashoffset = RING_CIRCUM * (1 - progress);

  // Mobile detection
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 1024); }
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // document.title
  useEffect(() => {
    document.title = `${fmt(secondsLeft)} - ${meta.label} • EverydayUtils`;
    return () => { document.title = 'EverydayUtils'; };
  }, [secondsLeft, meta.label]);

  // Screen Wake Lock
  useEffect(() => {
    if (!('wakeLock' in navigator)) return;
    if (running) {
      navigator.wakeLock.request('screen')
        .then(lock => { wakeLockRef.current = lock; })
        .catch(() => {});
    } else {
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
    }
    return () => {
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
    };
  }, [running]);

  // Re-acquire wake lock after tab becomes visible
  useEffect(() => {
    function onVisibility() {
      if (document.visibilityState === 'visible' && runningRef.current && 'wakeLock' in navigator) {
        navigator.wakeLock.request('screen')
          .then(lock => { wakeLockRef.current = lock; })
          .catch(() => {});
      }
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Core countdown
  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 1) return prev - 1;

        playChime(muteSoundRef.current);
        const nextIdx  = (cycleIdxRef.current + 1) % CYCLE.length;
        const nextType = CYCLE[nextIdx];
        const nextSecs = durationFor(nextType, configRef.current);
        setCycleIdx(nextIdx);

        if (autoStartRef.current) {
          return nextSecs;
        } else {
          clearInterval(intervalRef.current!);
          setTimeout(() => setRunning(false), 0);
          return nextSecs;
        }
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  // ── Core actions (stable — never re-created, read everything from refs) ──────

  const stopTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setRunning(false);
  }, []);

  const takeSnapshot = useCallback(() => {
    snapshotRef.current = {
      cycleIdx:    cycleIdxRef.current,
      secondsLeft: secondsRef.current,
    };
  }, []);

  const undoAction = useCallback(() => {
    const snap = snapshotRef.current;
    if (!snap) return;
    stopTimer();
    setCycleIdx(snap.cycleIdx);
    setSecondsLeft(snap.secondsLeft);
    snapshotRef.current = null;
  }, [stopTimer]);

  const handleReset = useCallback(() => {
    takeSnapshot();
    stopTimer();
    const duration = durationFor(CYCLE[cycleIdxRef.current], configRef.current);
    setSecondsLeft(duration);
    showToast('Timer reset', { label: 'Undo', onClick: undoAction });
  }, [takeSnapshot, stopTimer, undoAction, showToast]);

  const handleSkip = useCallback(() => {
    takeSnapshot();
    stopTimer();
    setCycleIdx(ci => {
      const nextIdx = (ci + 1) % CYCLE.length;
      setSecondsLeft(durationFor(CYCLE[nextIdx], configRef.current));
      return nextIdx;
    });
    showToast('Skipped to next session', { label: 'Undo', onClick: undoAction });
  }, [takeSnapshot, stopTimer, undoAction, showToast]);

  const handleToggleRunning = useCallback(() => {
    setRunning(r => !r);
  }, []);

  // Stable refs for keyboard handler
  const handleResetRef  = useRef(handleReset);
  const handleSkipRef   = useRef(handleSkip);
  const handleToggleRef = useRef(handleToggleRunning);
  useEffect(() => { handleResetRef.current  = handleReset;        }, [handleReset]);
  useEffect(() => { handleSkipRef.current   = handleSkip;         }, [handleSkip]);
  useEffect(() => { handleToggleRef.current = handleToggleRunning; }, [handleToggleRunning]);

  // Global keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if (isInput) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          handleToggleRef.current();
          break;
        case 'KeyR':
          e.preventDefault();
          handleResetRef.current();
          break;
        case 'KeyS':
          e.preventDefault();
          handleSkipRef.current();
          break;
        case 'Escape':
          if (settingsOpenRef.current) {
            e.preventDefault();
            setSettingsOpen(false);
          }
          break;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSaveConfig = useCallback((newCfg: Config) => {
    saveConfig(newCfg);
    autoStartRef.current = newCfg.autoStart;
    muteSoundRef.current = newCfg.muteSound;
    setConfig(newCfg);
    setCycleIdx(0);
    setSecondsLeft(durationFor(CYCLE[0], newCfg));
    stopTimer();
  }, [stopTimer]);

  function handlePresetClick(preset: Preset) {
    const newCfg: Config = { ...preset.config, autoStart: config.autoStart, muteSound: config.muteSound };
    handleSaveConfig(newCfg);
  }

  function handleMuteToggle() {
    const newCfg = { ...config, muteSound: !config.muteSound };
    saveConfig(newCfg);
    muteSoundRef.current = newCfg.muteSound;
    setConfig(newCfg);
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      {/* Back link */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <ArrowLeft size={16} />
          Back to Tools
        </Link>
      </div>

      {/* Page header with icon */}
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <span className="text-white text-4xl">⏱</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Pomodoro Timer</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Stay focused with structured work and break intervals. All sessions run locally — nothing is stored.
        </p>
      </div>

      {/* Timer card */}
      <div className="card shadow-md p-6 sm:p-8 flex flex-col items-center gap-6">

        {/* Top row: session badge + settings */}
        <div className="w-full flex items-center justify-between">
          <div className="w-9" />

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-500 ${meta.bg}`}
            style={{ color: meta.color }}
          >
            {meta.label}
          </div>

          <div className="relative">
            <button
              onClick={() => setSettingsOpen(o => !o)}
              aria-label="Open settings"
              className={`p-2 rounded-xl border transition-colors duration-150 ${
                settingsOpen
                  ? 'bg-brand-50 dark:bg-brand-950 border-brand-300 dark:border-brand-700 text-brand-600 dark:text-brand-400'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Settings size={16} />
            </button>
            {settingsOpen && (
              <SettingsPanel
                config={config}
                onSave={handleSaveConfig}
                onClose={() => setSettingsOpen(false)}
                isMobile={isMobile}
              />
            )}
          </div>
        </div>

        {/* Ring + timer */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: RING_SIZE, height: RING_SIZE }}
        >
          <svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx={RING_CENTER}
              cy={RING_CENTER}
              r={RING_R}
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              className="text-gray-200 dark:text-gray-800"
            />
            <circle
              cx={RING_CENTER}
              cy={RING_CENTER}
              r={RING_R}
              fill="none"
              stroke={meta.ring}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUM}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          <div className="relative z-10 text-center">
            <div
              className="font-mono text-5xl sm:text-6xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-gray-50 leading-none"
              aria-live="polite"
              aria-label={`${fmt(secondsLeft)} remaining`}
            >
              {fmt(secondsLeft)}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 font-medium">
              {Math.ceil(secondsLeft / 60)} min left
            </div>
          </div>
        </div>

        {/* Cycle indicator */}
        <div className="flex items-center gap-2" aria-label="Session cycle progress">
          {CYCLE.map((type, i) => {
            const isDone    = i < cycleIdx;
            const isCurrent = i === cycleIdx;
            return (
              <span
                key={i}
                style={{ color: isCurrent || isDone ? SESSION_META[type].color : undefined }}
                className={`text-xl leading-none transition-all duration-200 ${
                  isCurrent ? 'scale-125' : isDone ? 'opacity-50' : 'text-gray-300 dark:text-gray-700'
                }`}
                aria-hidden="true"
              >
                {isCurrent || isDone ? '●' : '○'}
              </span>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            aria-label="Reset timer"
            className="btn-secondary px-3.5 py-2.5"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={handleToggleRunning}
            aria-label={running ? 'Pause' : 'Start'}
            className="flex items-center gap-2 px-8 py-3 text-sm font-semibold rounded-xl text-white shadow-sm transition-all duration-150 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: meta.color,
              boxShadow: `0 2px 12px ${meta.color}55`,
            }}
          >
            {running ? <Pause size={18} /> : <Play size={18} />}
            {running ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={handleSkip}
            aria-label="Skip to next session"
            className="btn-secondary px-3.5 py-2.5"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Mute + Presets row */}
        <div className="w-full pt-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleMuteToggle}
              aria-label={config.muteSound ? 'Unmute sound' : 'Mute sound'}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-medium border transition-all bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
            >
              {config.muteSound ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {config.muteSound ? 'Muted' : 'Sound'}
            </button>
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => handlePresetClick(p)}
                className={`py-3 text-xs font-medium rounded-xl border transition-all ${
                  matchesPreset(config, p)
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-transparent'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="block">{p.label}</span>
                <span className="block text-[10px] opacity-60 mt-0.5">
                  {p.config.workMin}/{p.config.shortMin}/{p.config.longMin}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Session guide */}
      <div className="mt-6 card p-5">
        <p className="label mb-3">Session Cycle</p>
        <div className="space-y-2">
          {CYCLE.map((type, i) => {
            const m         = SESSION_META[type];
            const dur       = durationFor(type, config);
            const isCurrent = i === cycleIdx;
            return (
              <div
                key={i}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-300 ${
                  isCurrent ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                  <span className={`text-xs font-medium ${isCurrent ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {m.label}
                  </span>
                </div>
                <span className="text-xs font-mono tabular-nums text-gray-400 dark:text-gray-500">
                  {fmt(dur)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <p className="mt-5 text-center text-xs text-gray-400 dark:text-gray-600 leading-relaxed select-none">
        Keyboard shortcuts:&nbsp;
        <kbd className="font-mono">Space</kbd> Play/Pause&nbsp;•&nbsp;
        <kbd className="font-mono">R</kbd> Reset&nbsp;•&nbsp;
        <kbd className="font-mono">S</kbd> Skip&nbsp;•&nbsp;
        <kbd className="font-mono">Esc</kbd> Close settings
      </p>

      {/* SEO Content */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">My Everyday Pomodoro Timer</h2>
          <p className="mb-6">
            I created this timer because I needed a simple way to stay focused without distractions or privacy worries. After trying many apps, I decided to build one that runs completely in the browser.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2">How I Use It Every Day</h3>
          <p className="mb-6">
            In the morning, I list the 3–5 most important tasks I want to finish. For each task, I decide how many focused 25-minute sessions I think it will take. Then I start working one task at a time.
          </p>
          <p className="mb-6">
            When the timer ends, I step away for 5 minutes — make tea, stretch, or just look out the window. After four rounds, I take a longer break to recharge.
          </p>
          <p className="mb-6">
            This rhythm helps me get into deep work without feeling overwhelmed. The short breaks prevent me from burning out, and seeing the cycle progress keeps me motivated.
          </p>

          <p className="mt-8">
            Best of all, everything happens locally in your browser. No accounts, no tracking, no data leaves your device.
          </p>
        </div>
      </div>

      {/* Enhanced FAQ */}
      <div className="mt-10 card p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-5">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-5 last:pb-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">What is the Pomodoro Technique?</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              The Pomodoro Technique was created by Francesco Cirillo in the late 1980s. It uses a timer to break work into 25-minute focused intervals (called "Pomodoros") separated by short 5-minute breaks. After 4 Pomodoros, you take a longer break.
            </p>
          </div>

          <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-5 last:pb-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">Why does it help with focus?</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              The short, defined work periods make it easier to start tasks and maintain concentration. The regular breaks prevent mental fatigue and help sustain energy throughout the day.
            </p>
          </div>

          <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-5 last:pb-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">Can I customize the timer?</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Yes. You can use the Classic (25/5/20) or Extended (50/10/30) presets, or fully customize work, short break, and long break durations in Settings.
            </p>
          </div>

          <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-5 last:pb-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">Does it work offline?</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Yes. Once loaded, the entire timer works completely offline.
            </p>
          </div>

          <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 pb-5 last:pb-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">What keyboard shortcuts are available?</p>
            <ul className="space-y-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <li><kbd className="font-mono text-xs">Space</kbd> → Play / Pause</li>
              <li><kbd className="font-mono text-xs">R</kbd> → Reset current session</li>
              <li><kbd className="font-mono text-xs">S</kbd> → Skip to next session</li>
              <li><kbd className="font-mono text-xs">Esc</kbd> → Close settings</li>
            </ul>
          </div>

          <div className="last:border-0 pb-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5">Is this tool completely free?</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Yes. 100% free with no ads, no sign-up, and no tracking.
            </p>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
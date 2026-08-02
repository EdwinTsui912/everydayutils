import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sliders,
  Copy,
  Check,
  Layers,
  Sparkles,
  Box,
  Shield,
  RotateCcw,
  Settings,
} from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';



function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`;
}

function lighten(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const factor = amount / 100;
  return rgbToHex(
    r + (255 - r) * factor,
    g + (255 - g) * factor,
    b + (255 - b) * factor
  );
}

function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const factor = amount / 100;
  return rgbToHex(
    r - r * factor,
    g - g * factor,
    b - b * factor
  );
}

function getPaletteFromQuery(search: string) {
  const params = new URLSearchParams(search);
  const colors: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const c = params.get(`c${i}`);
    if (c) colors.push(c);
  }
  if (colors.length === 0) {
    return ['#0f766e', '#22c55e', '#64748b', '#0f172a', '#f9fafb'];
  }
  while (colors.length < 5) {
    colors.push('#0f172a');
  }
  return colors;
}

export default function CssEffectsGeneratorPage() {
  const { search } = useLocation();

  const [importedPalette, setImportedPalette] = useState<string[]>(() => getPaletteFromQuery(search));
  const [colors, setColors] = useState<string[]>(() => getPaletteFromQuery(search));
  const [lastCopied, setLastCopied] = useState<'gradient' | 'glass' | 'shadow' | null>(null);

  // effect controls
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [accentIndex, setAccentIndex] = useState(1);
  const [heroDepth, setHeroDepth] = useState(10);
  const [heroHighlight, setHeroHighlight] = useState(15);
  const [glassBorder, setGlassBorder] = useState(25);
  const [shadowBorder, setShadowBorder] = useState(35);

  useEffect(() => {
    const next = getPaletteFromQuery(search);
    setImportedPalette(next);
    setColors(next);
    setPrimaryIndex(0);
    setAccentIndex(1);
  }, [search]);

  const primary = colors[primaryIndex] || '#0f766e';
  const accent = colors[accentIndex] || lighten(primary, 20);
  const surface = colors[3] || '#0f172a';
  const neutral = colors[4] || '#f9fafb';

  useMemo(() => {
    trackToolView('css-effects-generator');
  }, []);

  const gradientCss = useMemo(() => {
    const stop1 = darken(primary, heroDepth);
    const stop2 = primary;
    const stop3 = lighten(accent, heroHighlight);
    return `/* Hero gradient using your palette */
background-image:
  radial-gradient(circle at 0% 0%, ${stop3} 0%, transparent 40%),
  linear-gradient(135deg, ${stop1} 0%, ${stop2} 45%, ${stop3} 100%);
background-color: ${surface};
color: ${neutral};`;
  }, [primary, accent, surface, neutral, heroDepth, heroHighlight]);

  const glassCss = useMemo(() => {
    const borderColor = lighten(primary, glassBorder);
    const bg = 'rgba(15, 23, 42, 0.65)';
    const shadow = `0 18px 45px rgba(15, 23, 42, 0.65)`;
    return `/* Glassmorphism card */
background: ${bg};
border: 1px solid ${borderColor};
box-shadow: ${shadow};
backdrop-filter: blur(18px);
border-radius: 1rem;
color: ${neutral};`;
  }, [primary, neutral, glassBorder]);

  const shadowCss = useMemo(() => {
    const shadowColor = `rgba(15, 23, 42, 0.35)`;
    const highlight = lighten(primary, shadowBorder);
    return `/* Soft elevated card shadow tuned to your palette */
box-shadow:
  0 1px 3px ${shadowColor},
  0 18px 45px ${shadowColor};
border-radius: 0.75rem;
border: 1px solid ${highlight};
background-color: ${neutral};`;
  }, [primary, neutral, shadowBorder]);

  function copy(text: string, label: 'gradient' | 'glass' | 'shadow') {
    navigator.clipboard.writeText(text);
    trackButtonClick('css-effects-generator', 'copy');
    trackCopySuccess('css-effects-generator');
    setLastCopied(label);
    setTimeout(() => setLastCopied(null), 1800);
  }

  function updateColor(index: number, value: string) {
    const next = [...colors];
    next[index] = value.trim();
    setColors(next);
  }

  function resetToImportedPalette() {
    setColors(importedPalette);
    setPrimaryIndex(0);
    setAccentIndex(1);
  }

  function resetEffects() {
    setPrimaryIndex(0);
    setAccentIndex(1);
    setHeroDepth(10);
    setHeroHighlight(15);
    setGlassBorder(25);
    setShadowBorder(35);
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen w-full overflow-y-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-brand-500/40">
          <Sliders size={28} className="text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          CSS Effects Generator
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Turn your color palette into production-ready gradients, glassmorphism cards, and card shadows — all computed in your browser with no tracking, no uploads.
        </p>
      </div>

      {/* Active palette + manual HEX */}
      <section className="mb-8 card p-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Layers size={15} className="text-brand-600 dark:text-brand-400" />
            Active Palette
          </h2>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-sky-50 dark:bg-sky-950/40 px-2.5 py-0.5 text-[11px] font-medium text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900">
              Works with Color Palette or manual HEX
            </span>
            <button
              type="button"
              onClick={resetToImportedPalette}
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-[11px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/40"
            >
              <RotateCcw size={11} />
              Reset to palette
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Imported from the Color Palette Generator when available, or customized manually using HEX codes below.
        </p>

        <div className="flex rounded-xl overflow-hidden h-10 border border-gray-200 dark:border-gray-700">
          {colors.map((hex, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: hex || '#0f172a' }} />
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Primary: <span className="font-mono">{primary.toUpperCase()}</span> · Accent:{' '}
          <span className="font-mono">{accent.toUpperCase()}</span>
        </p>

        <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50/70 dark:bg-slate-950/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-800 dark:text-gray-100">
              Manual HEX colors
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Paste brand colors to override the imported palette.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {colors.map((color, index) => (
              <input
                key={index}
                type="text"
                value={color}
                onChange={(e) => updateColor(index, e.target.value)}
                placeholder={index === 0 ? '#0F766E' : '#22C55E'}
                className="h-9 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-slate-900/80 px-2 text-xs font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Effect controls */}
      <section className="mb-8 card p-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Settings size={15} className="text-brand-600 dark:text-brand-400" />
            Effect Settings
          </h2>
          <button
            type="button"
            onClick={resetEffects}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 px-2.5 py-0.5 text-[11px] text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/40"
          >
            <RotateCcw size={11} />
            Reset effect settings
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Choose which palette slots act as primary and accent colors, and tune how strong the gradient, glass border, and shadow highlight appear.
        </p>

        {/* primary / accent slot selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
              Hero primary color slot
            </label>
            <select
              value={primaryIndex}
              onChange={(e) => setPrimaryIndex(Number(e.target.value))}
              className="h-8 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-900/80 px-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            >
              {colors.map((_, i) => (
                <option key={i} value={i}>
                  Slot {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
              Hero accent color slot
            </label>
            <select
              value={accentIndex}
              onChange={(e) => setAccentIndex(Number(e.target.value))}
              className="h-8 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-900/80 px-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            >
              {colors.map((_, i) => (
                <option key={i} value={i}>
                  Slot {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* strength sliders */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
              Hero depth (darken primary)
            </label>
            <input
              type="range"
              min={0}
              max={40}
              value={heroDepth}
              onChange={(e) => setHeroDepth(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Current: {heroDepth}%
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
              Hero highlight (lighten accent)
            </label>
            <input
              type="range"
              min={0}
              max={40}
              value={heroHighlight}
              onChange={(e) => setHeroHighlight(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Current: {heroHighlight}%
            </p>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-700 dark:text-gray-200">
              Glass/shadow border brightness
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={glassBorder}
              onChange={(e) => {
                const v = Number(e.target.value);
                setGlassBorder(v);
                setShadowBorder(Math.max(0, v + 10));
              }}
              className="w-full"
            />
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Glass border: {glassBorder}% · Shadow border: {shadowBorder}%
            </p>
          </div>
        </div>
      </section>
            {/* Hero Gradient Background */}
            <section className="mb-8 card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles size={16} className="text-brand-600 dark:text-brand-400" />
            Hero Gradient Background
          </h2>
          <button
            onClick={() => copy(gradientCss, 'gradient')}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            {lastCopied === 'gradient' ? (
              <>
                <Check size={13} />
                Copied
              </>
            ) : (
              <>
                <Copy size={13} />
                Copy CSS
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          A layered radial + linear gradient tuned to your palette colors — ideal for hero sections, dashboard headers, or call-to-action backgrounds.
        </p>
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 h-32 mb-3 bg-slate-950">
          <div
            className="w-full h-full flex items-center justify-center text-xs font-medium"
            style={{
              backgroundImage: `radial-gradient(circle at 0% 0%, ${lighten(
                accent,
                heroHighlight
              )} 0%, transparent 40%), linear-gradient(135deg, ${darken(
                primary,
                heroDepth
              )} 0%, ${primary} 45%, ${lighten(accent, heroHighlight)} 100%)`,
              backgroundColor: surface,
              color: neutral,
              boxShadow:
                '0 0 0 1px rgba(15,23,42,0.3), 0 40px 80px rgba(15,23,42,0.7)',
            }}
          >
            Hero gradient preview
          </div>
        </div>
        <pre className="p-4 bg-gray-950 text-emerald-400 text-xs rounded-xl overflow-x-auto font-mono leading-relaxed">
          {gradientCss}
        </pre>
      </section>

      {/* Glassmorphism Card */}
      <section className="mb-8 card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Shield size={16} className="text-brand-600 dark:text-brand-400" />
            Glassmorphism Card
          </h2>
          <button
            onClick={() => copy(glassCss, 'glass')}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            {lastCopied === 'glass' ? (
              <>
                <Check size={13} />
                Copied
              </>
            ) : (
              <>
                <Copy size={13} />
                Copy CSS
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          A balanced glassmorphism treatment — blurred background, subtle border, and tone‑matched shadow built on top of your palette. Use on dark surfaces for best results.
        </p>
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-slate-950 to-slate-800 p-6 flex items-center justify-center">
          <div
            className="px-5 py-4 text-xs font-medium"
            style={{
              background: 'rgba(15,23,42,0.65)',
              borderRadius: '1.25rem',
              border: `1px solid ${lighten(primary, glassBorder)}`,
              boxShadow: '0 20px 60px rgba(15,23,42,0.85)',
              backdropFilter: 'blur(22px)',
              color: neutral,
            }}
          >
            Glass card preview
          </div>
        </div>
        <pre className="p-4 bg-gray-950 text-emerald-400 text-xs rounded-xl overflow-x-auto font-mono leading-relaxed">
          {glassCss}
        </pre>
      </section>
            {/* Soft Card Shadow */}
            <section className="mb-8 card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Box size={16} className="text-brand-600 dark:text-brand-400" />
            Soft Card Shadow
          </h2>
          <button
            onClick={() => copy(shadowCss, 'shadow')}
            className="btn-secondary text-xs flex items-center gap-1.5"
          >
            {lastCopied === 'shadow' ? (
              <>
                <Check size={13} />
                Copied
              </>
            ) : (
              <>
                <Copy size={13} />
                Copy CSS
              </>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          A dual-layer box shadow and subtle border tuned to your palette — ideal for elevated cards and panels in dashboards or landing pages.
        </p>
        <div className="rounded-2xl overflow-hidden bg-slate-950/90 p-6 flex items-center justify-center">
          <div
            className="px-5 py-4 text-xs font-medium"
            style={{
              borderRadius: '0.9rem',
              border: `1px solid ${lighten(primary, shadowBorder)}`,
              boxShadow:
                '0 1px 3px rgba(15, 23, 42, 0.35), 0 18px 45px rgba(15, 23, 42, 0.45)',
              backgroundColor: neutral,
            }}
          >
            Soft card shadow preview
          </div>
        </div>
        <pre className="p-4 bg-gray-950 text-emerald-400 text-xs rounded-xl overflow-x-auto font-mono leading-relaxed">
          {shadowCss}
        </pre>
      </section>

      {/* SEO-ish explanation */}
      <section className="mt-16 border-top border-gray-200 dark:border-gray-800 pt-8">
        <div className="max-w-3xl mx-auto space-y-4 text-[15px] leading-[1.7] text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
            Turn Color Tokens Into Real UI Effects
          </h2>
          <p>
            The Color Palette Generator gives you clean, accessible design tokens. This CSS Effects Generator is the next
            step — it transforms those tokens into gradients, glass cards, and shadows you can paste directly into your
            project.
          </p>
          <p>
            Whether you arrive from the palette or paste your brand colors manually, everything runs 100% in your
            browser with no uploads and no tracking, so you can experiment freely and ship modern UI with real visual
            depth.
          </p>
        </div>
      </section>

      <RelatedToolsBlock currentPath="/css-effects" />
    </div>
  );
}
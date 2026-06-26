import { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, RotateCcw, Download, Lock, Unlock, AlertCircle, Sliders } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

// ─── Types ────────────────────────────────────────────────────────────────────

type HarmonyType = 'random' | 'monochromatic' | 'analogous' | 'complementary' | 'triadic';

interface SwatchColor {
  hex: string;
  locked: boolean;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

type ExportFormat = 'css' | 'tailwind' | 'hex';

// ─── Color Math ───────────────────────────────────────────────────────────────

function hexToRgb(hex: string): RGB {
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

function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

function hexToHsl(hex: string): HSL {
  let { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const linearize = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getSwatchTextColor(hex: string): string {
  return relativeLuminance(hex) > 0.35 ? '#18181b' : '#ffffff';
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

// ─── Palette Generation ───────────────────────────────────────────────────────

function generateHarmony(
  baseHue: number,
  harmony: HarmonyType,
  satAdj: number,
  lightAdj: number
): string[] {
  const baseSat = Math.max(30, Math.min(85, 60 + satAdj));
  const baseLit = Math.max(25, Math.min(75, 50 + lightAdj));

  const make = (h: number, s = baseSat, l = baseLit): string =>
    hslToHex(wrapHue(h), Math.max(10, Math.min(95, s)), Math.max(15, Math.min(85, l)));

  switch (harmony) {
    case 'monochromatic': {
      const steps = [-20, -10, 0, 12, 24];
      return steps.map(dl => make(baseHue, baseSat, baseLit + dl));
    }
    case 'analogous': {
      return [
        make(baseHue - 30),
        make(baseHue - 15),
        make(baseHue),
        make(baseHue + 15),
        make(baseHue + 30),
      ];
    }
    case 'complementary': {
      const comp = baseHue + 180;
      return [
        make(baseHue, baseSat, baseLit - 8),
        make(baseHue, baseSat - 10, baseLit + 14),
        make(baseHue, baseSat - 22, baseLit + 26),
        make(comp, baseSat, baseLit),
        make(comp, baseSat - 10, baseLit + 14),
      ];
    }
    case 'triadic': {
      return [
        make(baseHue),
        make(baseHue, baseSat - 12, baseLit + 12),
        make(baseHue + 120),
        make(baseHue + 120, baseSat - 12, baseLit + 12),
        make(baseHue + 240),
      ];
    }
    case 'random':
    default: {
      return Array.from({ length: 5 }, () => {
        const rh = Math.random() * 360;
        const rs = 45 + Math.random() * 40 + satAdj;
        const rl = 35 + Math.random() * 35 + lightAdj;
        return make(rh, rs, rl);
      });
    }
  }
}

// ─── WCAG Badge ───────────────────────────────────────────────────────────────

interface ContrastBadgeProps {
  ratio: number;
  level: 'AA' | 'AAA';
  size: 'normal' | 'large';
}

function ContrastBadge({ ratio, level, size }: ContrastBadgeProps) {
  const threshold = level === 'AAA' ? (size === 'large' ? 4.5 : 7) : (size === 'large' ? 3 : 4.5);
  const passes = ratio >= threshold;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide border ${
        passes
          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
          : 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900'
      }`}
    >
      {passes ? '✓' : '✗'}&thinsp;{level}{size === 'large' ? ' Lg' : ''}
    </span>
  );
}

// ─── Swatch Card ──────────────────────────────────────────────────────────────

interface SwatchCardProps {
  swatch: SwatchColor;
  index: number;
  onToggleLock: (i: number) => void;
  onCopy: (hex: string) => void;
  copied: string;
}

function SwatchCard({ swatch, index, onToggleLock, onCopy, copied }: SwatchCardProps) {
  const textColor = getSwatchTextColor(swatch.hex);
  const hsl = hexToHsl(swatch.hex);
  const rgb = hexToRgb(swatch.hex);
  const isCopied = copied === swatch.hex + index;
  const whiteContrast = contrastRatio(swatch.hex, '#ffffff');
  const blackContrast = contrastRatio(swatch.hex, '#000000');

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 group transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
      {/* Color block */}
      <div
        className="relative flex-1 min-h-[148px] flex flex-col items-center justify-center gap-3 p-4 transition-all duration-200"
        style={{ backgroundColor: swatch.hex }}
      >
        {/* Lock indicator */}
        {swatch.locked && (
          <div
            className="absolute top-2.5 left-2.5"
            style={{ color: textColor, opacity: 0.8 }}
          >
            <Lock size={13} />
          </div>
        )}

        {/* HEX label */}
        <span
          className="font-mono font-bold text-sm tracking-wider select-all drop-shadow-sm"
          style={{ color: textColor }}
        >
          {swatch.hex.toUpperCase()}
        </span>

        {/* Actions row — visible on hover */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onCopy(swatch.hex + index)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-150 active:scale-95 focus:outline-none"
            style={{
              backgroundColor: textColor === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
              color: textColor,
              backdropFilter: 'blur(6px)',
            }}
            title="Copy HEX"
          >
            {isCopied ? <Check size={11} /> : <Copy size={11} />}
            {isCopied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={() => onToggleLock(index)}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all duration-150 active:scale-95 focus:outline-none"
            style={{
              backgroundColor: textColor === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
              color: textColor,
            }}
            title={swatch.locked ? 'Unlock' : 'Lock'}
          >
            {swatch.locked ? <Lock size={11} /> : <Unlock size={11} />}
          </button>
        </div>

        {/* Always-visible copy affordance when not hovering */}
        <div
          className="absolute bottom-2.5 right-2.5 group-hover:opacity-0 transition-opacity duration-150"
          style={{ color: textColor, opacity: 0.45 }}
        >
          <Copy size={11} />
        </div>
      </div>

      {/* Info panel */}
      <div className="bg-white dark:bg-gray-900 px-3 py-3 space-y-2 border-t border-gray-100 dark:border-gray-800">
        <div className="space-y-0.5">
          <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 truncate">
            rgb({rgb.r}, {rgb.g}, {rgb.b})
          </p>
          <p className="font-mono text-[10px] text-gray-500 dark:text-gray-400 truncate">
            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
          </p>
        </div>
        {/* Contrast badges */}
        <div className="flex flex-wrap gap-1">
          <ContrastBadge ratio={whiteContrast} level="AA" size="normal" />
          <ContrastBadge ratio={blackContrast} level="AAA" size="normal" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const HARMONIES: { value: HarmonyType; label: string }[] = [
  { value: 'random', label: 'Random' },
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'triadic', label: 'Triadic' },
];

export default function ColorPaletteGenerator() {
  const [harmony, setHarmony] = useState<HarmonyType>('analogous');
  const [baseHue, setBaseHue] = useState<number>(() => Math.random() * 360);
  const [satAdj, setSatAdj] = useState<number>(0);
  const [lightAdj, setLightAdj] = useState<number>(0);
  const [swatches, setSwatches] = useState<SwatchColor[]>([]);
  const [copied, setCopied] = useState('');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  const [exportCopied, setExportCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => { trackToolView('palette-generator'); }, []);

  const buildPalette = useCallback(
    (hue: number, h: HarmonyType, sat: number, lit: number, prevSwatches: SwatchColor[]): SwatchColor[] => {
      const hexes = generateHarmony(hue, h, sat, lit);
      return hexes.map((hex, i) => ({
        hex,
        locked: prevSwatches[i]?.locked ?? false,
      }));
    },
    []
  );

  // Initialize on mount
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      const initialHue = Math.random() * 360;
      setBaseHue(initialHue);
      setSwatches(buildPalette(initialHue, 'analogous', 0, 0, []));
    }
  }, [buildPalette]);

  // Re-derive unlocked swatches when harmony/sat/light changes
  useEffect(() => {
    if (!isInitialized.current) return;
    setSwatches(prev => {
      const newHexes = generateHarmony(baseHue, harmony, satAdj, lightAdj);
      return newHexes.map((hex, i) => ({
        hex: prev[i]?.locked ? prev[i].hex : hex,
        locked: prev[i]?.locked ?? false,
      }));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [harmony, satAdj, lightAdj]);

  function generateNew() {
    const newHue = Math.random() * 360;
    setBaseHue(newHue);
    setSwatches(prev => {
      const newHexes = generateHarmony(newHue, harmony, satAdj, lightAdj);
      return newHexes.map((hex, i) => ({
        hex: prev[i]?.locked ? prev[i].hex : hex,
        locked: prev[i]?.locked ?? false,
      }));
    });
  }

  function handleHarmonyChange(h: HarmonyType) {
    setHarmony(h);
  }

  function toggleLock(index: number) {
    setSwatches(prev => prev.map((s, i) => i === index ? { ...s, locked: !s.locked } : s));
  }

  function handleCopy(key: string) {
    const hex = key.slice(0, 7);
    navigator.clipboard.writeText(hex.toUpperCase());
    trackButtonClick('palette-generator', 'copy');
    trackCopySuccess('palette-generator');
    setCopied(key);
    setTimeout(() => setCopied(''), 1800);
  }

  function getExportCode(): string {
    const hexes = swatches.map(s => s.hex.toUpperCase());
    if (exportFormat === 'hex') {
      return hexes.map((h, i) => `color-${i + 1}: ${h}`).join('\n');
    }
    if (exportFormat === 'css') {
      return `:root {\n${hexes.map((h, i) => `  --color-${i + 1}: ${h};`).join('\n')}\n}`;
    }
    if (exportFormat === 'tailwind') {
      const entries = hexes.map((h, i) => `        'palette-${i + 1}': '${h}',`).join('\n');
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n${entries}\n      },\n    },\n  },\n};`;
    }
    return '';
  }

  function copyExport() {
    navigator.clipboard.writeText(getExportCode());
    trackButtonClick('palette-generator', 'copy');
    trackCopySuccess('palette-generator');
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 1800);
  }

  function downloadSVG() {
    const w = 600, h = 240, cw = w / swatches.length;
    const rects = swatches.map((s, i) => {
      const tc = getSwatchTextColor(s.hex);
      return `<rect x="${i * cw}" y="0" width="${cw}" height="${h}" fill="${s.hex}"/>
<text x="${i * cw + cw / 2}" y="${h / 2 + 6}" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="${tc}">${s.hex.toUpperCase()}</text>`;
    }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${rects}</svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.svg';
    a.click();
    URL.revokeObjectURL(url);
  }

  // WCAG data for the advanced panel (against white and black)
  const wcagData = swatches.map(s => ({
    hex: s.hex,
    vsWhite: contrastRatio(s.hex, '#ffffff'),
    vsBlack: contrastRatio(s.hex, '#000000'),
  }));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen w-full overflow-y-auto animate-fade-in">

      {/* Centered Header with Icon */}
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <span className="text-white text-4xl">🎨</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Color Palette Generator</h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Generate harmonious, WCAG-accessible color palettes using pure client-side math.
          Nothing leaves your browser — no tracking, no uploads.
        </p>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
        {/* Harmony dropdown */}
        <div className="flex items-center gap-2.5">
          <label htmlFor="harmony-select" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
            Harmony
          </label>
          <select
            id="harmony-select"
            value={harmony}
            onChange={e => handleHarmonyChange(e.target.value as HarmonyType)}
            className="select text-sm pr-8 min-w-[160px]"
          >
            {HARMONIES.map(h => (
              <option key={h.value} value={h.value}>{h.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 sm:ml-auto">
          <button
            onClick={() => setShowAdvanced(v => !v)}
            className={`btn-secondary text-xs ${showAdvanced ? 'border-brand-400 dark:border-brand-600 text-brand-600 dark:text-brand-400' : ''}`}
          >
            <Sliders size={13} />
            Advanced
          </button>
          <button
            onClick={downloadSVG}
            className="btn-secondary text-xs"
            title="Download as SVG"
          >
            <Download size={13} />
            SVG
          </button>
          <button
            onClick={generateNew}
            className="btn-primary text-sm"
          >
            <RotateCcw size={14} />
            Generate New Palette
          </button>
        </div>
      </div>

      {/* ── Advanced Panel ───────────────────────────────────────────── */}
      {showAdvanced && (
        <div className="card p-5 mb-6 animate-slide-in">
          <div className="flex items-center gap-2 mb-5">
            <Sliders size={15} className="text-brand-600 dark:text-brand-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Advanced Controls</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Saturation slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="sat-slider" className="label mb-0">Saturation Shift</label>
                <span className="text-xs font-bold tabular-nums text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-lg">
                  {satAdj > 0 ? `+${satAdj}` : satAdj}
                </span>
              </div>
              <input
                id="sat-slider"
                type="range"
                min={-40}
                max={40}
                step={1}
                value={satAdj}
                onChange={e => setSatAdj(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-600">
                <span>Muted</span>
                <span>Vivid</span>
              </div>
            </div>

            {/* Lightness slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="light-slider" className="label mb-0">Lightness Shift</label>
                <span className="text-xs font-bold tabular-nums text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2 py-0.5 rounded-lg">
                  {lightAdj > 0 ? `+${lightAdj}` : lightAdj}
                </span>
              </div>
              <input
                id="light-slider"
                type="range"
                min={-30}
                max={30}
                step={1}
                value={lightAdj}
                onChange={e => setLightAdj(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-600">
                <span>Darker</span>
                <span>Lighter</span>
              </div>
            </div>
          </div>

          {/* WCAG Contrast Table */}
          {swatches.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertCircle size={12} />
                WCAG 2.2 Contrast Ratios
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 dark:text-gray-400">Color</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 dark:text-gray-400">vs White</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 dark:text-gray-400">vs Black</th>
                      <th className="px-3 py-2 text-left font-semibold text-gray-600 dark:text-gray-400">Compliance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {wcagData.map((d, i) => (
                      <tr key={i} className="bg-white dark:bg-gray-900">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md border border-gray-200 dark:border-gray-700 shrink-0" style={{ backgroundColor: d.hex }} />
                            <span className="font-mono text-gray-700 dark:text-gray-300">{d.hex.toUpperCase()}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">{d.vsWhite.toFixed(2)}:1</td>
                        <td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">{d.vsBlack.toFixed(2)}:1</td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-1">
                            <ContrastBadge ratio={d.vsWhite} level="AA" size="normal" />
                            <ContrastBadge ratio={d.vsBlack} level="AAA" size="normal" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Swatch Grid ─────────────────────────────────────────────── */}
      {swatches.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
          {swatches.map((swatch, i) => (
            <SwatchCard
              key={i}
              swatch={swatch}
              index={i}
              onToggleLock={toggleLock}
              onCopy={handleCopy}
              copied={copied}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 animate-pulse">
              <div className="min-h-[140px] bg-gray-200 dark:bg-gray-800" />
              <div className="bg-white dark:bg-gray-900 px-3 py-3 space-y-1.5">
                <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Locked colors hint ──────────────────────────────────────── */}
      {swatches.some(s => s.locked) && (
        <div className="flex items-center gap-2 mb-6 px-3.5 py-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-700 dark:text-amber-400 animate-slide-in">
          <Lock size={12} className="shrink-0" />
          {swatches.filter(s => s.locked).length} color{swatches.filter(s => s.locked).length > 1 ? 's are' : ' is'} locked — locked swatches will be preserved when generating new palettes.
        </div>
      )}

      {/* ── Export Section ──────────────────────────────────────────── */}
      <div className="card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Export Code</h2>
          <div className="flex gap-1.5">
            {(['css', 'tailwind', 'hex'] as ExportFormat[]).map(f => (
              <button
                key={f}
                onClick={() => setExportFormat(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-150 ${
                  exportFormat === f
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {f === 'tailwind' ? 'Tailwind' : f === 'css' ? 'CSS Vars' : 'HEX List'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <pre className="p-4 bg-gray-950 text-emerald-400 text-xs rounded-xl overflow-x-auto font-mono leading-relaxed min-h-[80px]">
            {getExportCode()}
          </pre>
          <button
            onClick={copyExport}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-150 focus:outline-none"
            title="Copy to clipboard"
          >
            {exportCopied ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>

        {/* Color strip preview */}
        <div className="flex rounded-xl overflow-hidden h-8 border border-gray-200 dark:border-gray-700">
          {swatches.map((s, i) => (
            <div key={i} className="flex-1 transition-all duration-300" style={{ backgroundColor: s.hex }} />
          ))}
        </div>
      </div>

      {/* ── SEO Section ─────────────────────────────────────────────── */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-14">
        <div className="max-w-3xl mx-auto px-4 space-y-10 text-[15px] leading-[1.75] text-gray-700 dark:text-gray-300">

          {/* Section 1 */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-4">
              The Importance of Color Palette Generators in Modern Design Systems
            </h2>
            <p>
              Professional color palette generators have become essential engineering utilities for UI/UX designers,
              frontend developers, and brand architects. Instead of relying on random guessing, modern product design
              requires establishing scalable design tokens. This tool helps calculate harmonious, accessible, and highly
              balanced color systems that distribute visual weight consistently across light and dark user interface (UI)
              modes, digital viewport displays, and complex component libraries.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
              The Mathematics Behind Computational Color Harmonies
            </h3>
            <p>
              Modern digital palette tools compute color variants using algorithmic geometry mapped across a 360-degree
              color wheel and perceptually uniform color spaces. Starting from a locked base HEX color coordinate, the
              script applies precise trigonometric offsets to determine adjacent or opposing hues. This automated
              calculation ensures perfect visual balance, hue distribution, and aesthetic coherence across distinct color
              space structures (such as HEX, RGB, and HSL formats) without manual calibration errors.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
              WCAG 2.2 Accessibility &amp; Automated Contrast Compliance
            </h3>
            <p>
              Beyond aesthetic coordination, architectural accessibility is critical for modern web infrastructure. This
              generator automatically calculates relative luminance values and background-to-text contrast ratio
              multipliers in real time according to strict World Wide Web Consortium (W3C) WCAG 2.2 compliance
              guidelines. By tracking these passing parameters instantly, developers can ensure body copy remains
              perfectly readable for visually impaired users, comfortably meeting AA or AAA standards for both standard
              elements and large typography assets.
            </p>
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Harmony Type</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200">Mathematical Basis</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200">Best Used For</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Accessibility Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Monochromatic</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Varying lightness/saturation on single fixed hue angle</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Minimalist interfaces, SaaS data grids, app dashboards</td>
                  <td className="px-6 py-4 font-medium text-emerald-600 dark:text-emerald-400">Excellent — highly predictable contrast mapping</td>
                </tr>
                <tr className="bg-gray-50/60 dark:bg-gray-900/60 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Analogous</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Adjacent hue angles (typically 30°–60° spatial offsets)</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Calming consumer apps, editorial sites, brand gradients</td>
                  <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">High visual harmony; requires careful layering</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Complementary</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Direct geometric opposite hue vectors (180° inversion)</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">High-conversion CTAs, prominent alert tags, bold branding</td>
                  <td className="px-6 py-4 font-medium text-amber-600 dark:text-amber-400">Extreme contrast; requires intentional padding rules</td>
                </tr>
                <tr className="bg-gray-50/60 dark:bg-gray-900/60 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Triadic</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Three equidistant intersecting vector intervals (120° steps)</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Vibrant software interfaces, creative portfolios, mobile games</td>
                  <td className="px-6 py-4 font-medium text-red-600 dark:text-red-400">Highly dynamic but requires strict primary focus allocation</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
              Privacy-First Architecture &amp; Multi-Format Code Exporting
            </h3>
            <p>
              This Color Palette Generator operates with a secure{' '}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">100% client-side</strong>{' '}
              architecture running in local browser application memory. While commercial tracking generators capture
              your aesthetic selections, palette styles, and device fingerprints to sell to advertising syndicates,
              this tool handles all matrix transformations locally. Once your scheme matches your visual criteria, copy
              clean code tokens directly to your staging repository — including CSS variables, standard raw HEX strings,
              and structured Tailwind CSS configuration theme objects. For further text cleaning or payload sanitization
              before committing code to production, seamlessly leverage our integrated{' '}
              <a href="/text-tools" className="text-brand-600 dark:text-brand-400 underline underline-offset-2 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                Text Tools Suite
              </a>.
            </p>
          </div>

          {/* Closing */}
          <p className="pb-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-8">
            Whether you are scaling a fast SaaS prototype, refreshing a commercial brand identity, or refining
            accessible typography schemes, our offline platform delivers maximum utility speed and security with total
            metadata privacy.
          </p>

        </div>
      </div>

    </div>
  );
}
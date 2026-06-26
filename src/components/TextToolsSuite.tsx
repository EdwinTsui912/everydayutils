import { useState, useMemo, useEffect } from 'react';
import { Copy, Check, RotateCcw, Trash2, FileText, Type, Scissors, Clock, Hash } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

// ── Types ──────────────────────────────────────────────────────────────────
interface TextStats {
  words: number;
  chars: number;
  charsNoSpace: number;
  sentences: number;
  paragraphs: number;
  readTime: string;
}

type Tab = 'counter' | 'sanitizer' | 'case';

// ── Helpers ────────────────────────────────────────────────────────────────
function countCjk(text: string): number {
  return (
    text.match(
      /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u30ff\uac00-\ud7af]|[\ud840-\udbff][\udc00-\udfff]/gu
    ) || []
  ).length;
}

function countWords(text: string): number {
  if (!text.trim()) return 0;
  const matches = text.match(
    /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u30ff\uac00-\ud7af]|[\ud840-\udbff][\udc00-\udfff]|[a-zA-Z0-9\u00C0-\u024F'']+/gu
  );
  return matches ? matches.length : 0;
}

function formatReadingTime(words: number, cjkChars: number): string {
  const nonCjkWords = words - cjkChars;
  const minutes = nonCjkWords / 238 + cjkChars / 255;
  if (minutes < 0.5) return '< 1 min';
  const totalSec = Math.round(minutes * 60);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (s === 0) return `${m} min`;
  return `${m} min ${s}s`;
}

function computeStats(text: string): TextStats {
  const trimmed = text.trim();
  const words = countWords(text);
  const cjk = countCjk(text);
  return {
    words,
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    sentences: trimmed ? (trimmed.match(/[.!?！？。]+(?:\s|$)/g) || []).length : 0,
    paragraphs: trimmed ? trimmed.split(/\n{2,}/).filter(p => p.trim()).length : 0,
    readTime: formatReadingTime(words, cjk),
  };
}

const TITLE_MINOR = new Set([
  'a','an','the','and','but','or','nor','for','so','yet',
  'at','by','in','of','on','to','up','as','is',
]);

function toTitleCase(s: string): string {
  return s.replace(/\S+/g, (word, offset, str) => {
    const isFirst = offset === 0 || /[.!?]\s*$/.test(str.slice(0, offset).trimEnd());
    const lower = word.toLowerCase();
    if (!isFirst && TITLE_MINOR.has(lower)) return lower;
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });
}

function toSentenceCase(s: string): string {
  return s.toLowerCase().replace(/(^|[.!?]\s+)([a-z])/g, (_, p, c) => p + c.toUpperCase());
}

function toToggleCase(s: string): string {
  return Array.from(s).map(c => {
    const up = c.toUpperCase();
    const lo = c.toLowerCase();
    if (up === lo) return c;
    return c === up ? lo : up;
  }).join('');
}

// ── Sub-components ─────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    trackButtonClick('text-tools', 'copy');
    trackCopySuccess('text-tools');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handle}
      disabled={!text}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl
        bg-blue-600 hover:bg-blue-700 active:bg-blue-800
        text-white disabled:opacity-40 disabled:cursor-not-allowed
        shadow-sm transition-all duration-150 active:scale-[0.97]"
    >
      {copied ? <><Check size={14} />Copied!</> : <><Copy size={14} />Copy Text</>}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent?: string;
}

function StatCard({ label, value, icon: Icon, accent = 'blue' }: StatCardProps) {
  const accentMap: Record<string, string> = {
    blue:    'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    violet:  'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    amber:   'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    rose:    'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
    cyan:    'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
  };
  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accentMap[accent] || accentMap.blue}`}>
        <Icon size={15} />
      </div>
      <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-50 leading-none">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function TextToolsSuite() {
  const [text, setText] = useState('');
  const [original, setOriginal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('counter');

  useEffect(() => { trackToolView('text-tools'); }, []);

  const stats = useMemo(() => computeStats(text), [text]);

  function applyTransform(fn: (s: string) => string) {
    setOriginal(prev => (prev === null ? text : prev));
    setText(fn(text));
  }

  function restoreOriginal() {
    if (original !== null) {
      setText(original);
      setOriginal(null);
    }
  }

  function clearAll() {
    setText('');
    setOriginal(null);
  }

  function handleUserEdit(value: string) {
    setText(value);
    setOriginal(null);
  }

  // Case Converter handlers
  const handleUpperCase    = () => applyTransform(s => s.toUpperCase());
  const handleLowerCase    = () => applyTransform(s => s.toLowerCase());
  const handleTitleCase    = () => applyTransform(toTitleCase);
  const handleSentenceCase = () => applyTransform(toSentenceCase);
  const handleToggleCase   = () => applyTransform(toToggleCase);

  // Sanitizer handlers
  const handleRemoveExtraSpaces = () =>
    applyTransform(t => t.replace(/[ \t]+/g, ' ').trim());
  const handleStripLineBreaks = () =>
    applyTransform(t => t.replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ').trim());
  const handleTrimLines = () =>
    applyTransform(t => t.split('\n').map(l => l.trim()).join('\n').trim());
  const handleRemoveDuplicates = () =>
    applyTransform(t => {
      const seen = new Set<string>();
      return t.split('\n')
        .filter(line => {
          const trimmed = line.trim();
          if (!trimmed || seen.has(trimmed)) return false;
          seen.add(trimmed);
          return true;
        })
        .join('\n');
    });
  const handleStripSpecialChars = () =>
    applyTransform(t =>
      t.replace(/[!@#$%^&*()_+=[\]{}|\\:;"'<>,.?/~`]/g, '')
       .replace(/[ \t]{2,}/g, ' ')
       .trim()
    );

  const canUndo = original !== null;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'counter',   label: 'Word Counter',   icon: FileText },
    { id: 'sanitizer', label: 'Sanitizer',       icon: Scissors },
    { id: 'case',      label: 'Case Converter',  icon: Type },
  ];

  const caseButtons = [
    { label: 'UPPERCASE',     sub: 'ALL CAPS',                       handler: handleUpperCase },
    { label: 'lowercase',     sub: 'all lowercase',                  handler: handleLowerCase },
    { label: 'Title Case',    sub: 'First Letter Of Each Word',      handler: handleTitleCase },
    { label: 'Sentence case', sub: 'First letter only',              handler: handleSentenceCase },
    { label: 'tOGGLE cASE',   sub: 'Invert every character',         handler: handleToggleCase },
  ] as const;

  const sanitizerButtons = [
    { label: 'Remove Extra Spaces',  sub: 'Collapse multiple spaces and tabs',    handler: handleRemoveExtraSpaces },
    { label: 'Strip Line Breaks',    sub: 'Flatten all lines into one paragraph', handler: handleStripLineBreaks },
    { label: 'Trim Lines',           sub: 'Remove leading & trailing whitespace', handler: handleTrimLines },
    { label: 'Remove Duplicates',    sub: 'Delete repeated lines',                handler: handleRemoveDuplicates },
    { label: 'Strip Special Chars',  sub: 'Remove !@#$%^&* and similar',          handler: handleStripSpecialChars },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 min-h-screen overflow-y-auto">

      {/* Centered Header with Icon */}
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <FileText size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Text Tools Suite</h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Word counter, case converter, and text sanitizer — all in one place.{' '}
          <span className="font-medium text-gray-600 dark:text-gray-300">100% client-side.</span>
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-md overflow-hidden">

        {/* Tab bar */}
        <div className="flex items-center gap-0 border-b border-gray-200 dark:border-gray-800 px-6 pt-5">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  relative inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-xl
                  transition-all duration-150 -mb-px border-b-2 focus:outline-none
                  ${active
                    ? 'text-blue-600 dark:text-blue-400 border-blue-500 bg-blue-50/60 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <Icon size={15} className={active ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'} />
                {label}
              </button>
            );
          })}
        </div>

        <div className="p-6 space-y-6">

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={e => handleUserEdit(e.target.value)}
              placeholder="Type or paste your text here… Supports English, Chinese, Japanese, Korean, and mixed text."
              rows={12}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50
                border border-gray-200 dark:border-gray-700 rounded-2xl
                text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                text-sm leading-relaxed font-mono resize-y
                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500
                transition-all duration-150"
            />
            {text.length > 0 && (
              <span className="absolute bottom-3 right-3 text-[11px] text-gray-300 dark:text-gray-600 tabular-nums pointer-events-none select-none">
                {text.length.toLocaleString()} chars
              </span>
            )}
          </div>

          {/* Tab content */}
          {activeTab === 'counter' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard label="Words"        value={stats.words}           icon={FileText} accent="blue"    />
              <StatCard label="Characters"   value={stats.chars}           icon={Hash}     accent="violet"  />
              <StatCard label="No Spaces"    value={stats.charsNoSpace}    icon={Hash}     accent="cyan"    />
              <StatCard label="Sentences"    value={stats.sentences}       icon={Type}     accent="emerald" />
              <StatCard label="Paragraphs"   value={stats.paragraphs}      icon={FileText} accent="amber"   />
              <StatCard label="Read Time"    value={stats.readTime}        icon={Clock}    accent="rose"    />
            </div>
          )}

          {activeTab === 'sanitizer' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sanitizerButtons.map(({ label, sub, handler }) => (
                <button
                  key={label}
                  onClick={handler}
                  className="group text-left px-5 py-4 rounded-2xl
                    bg-gray-50 dark:bg-gray-800/60
                    hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                    border border-gray-200 dark:border-gray-700
                    hover:border-emerald-300 dark:hover:border-emerald-700
                    transition-all duration-150 active:scale-[0.97]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 mt-0.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                      <Scissors size={14} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-tight">
                        {label}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-snug">{sub}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'case' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {caseButtons.map(({ label, sub, handler }) => (
                <button
                  key={label}
                  onClick={handler}
                  className="group text-left px-5 py-4 rounded-2xl
                    bg-gray-50 dark:bg-gray-800/60
                    hover:bg-blue-50 dark:hover:bg-blue-900/20
                    border border-gray-200 dark:border-gray-700
                    hover:border-blue-300 dark:hover:border-blue-700
                    transition-all duration-150 active:scale-[0.97]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 mt-0.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                      <Type size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors leading-tight">
                        {label}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-snug">{sub}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Action bar */}
          <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-gray-100 dark:border-gray-800">
            <CopyButton text={text} />

            {canUndo && (
              <button
                onClick={restoreOriginal}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border
                  bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-50 dark:hover:bg-gray-700
                  shadow-sm transition-all duration-150 active:scale-[0.97]"
              >
                <RotateCcw size={14} />
                Restore Original
              </button>
            )}

            {text && (
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border
                  bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800
                  text-red-600 dark:text-red-400
                  hover:bg-red-100 dark:hover:bg-red-900
                  transition-all duration-150 active:scale-[0.97]"
              >
                <Trash2 size={14} />
                Clear
              </button>
            )}

            <span className="ml-auto text-xs text-gray-400 dark:text-gray-600 hidden sm:block">
              All transforms are undoable via Restore Original
            </span>
          </div>

        </div>
      </div>

      {/* SEO Section */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">The Power of a Complete Client-Side Text Tools Suite</h2>
          <p className="mb-6">In content creation, software development, and daily productivity, efficiently processing text is crucial. Our Text Tools Suite brings together a powerful Word Counter, Character Counter, Case Converter, and Text Sanitizer into one fast, unified, privacy-first workspace.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Advanced Text Metrics and Multilingual Support</h3>
          <p className="mb-6">Our smart analytics engine provides real-time insights including word count, character count (with/without spaces), sentence and paragraph counts, and estimated reading time. It intelligently handles both Western languages and CJK (Chinese, Japanese, Korean) text — counting each character as one semantic unit where appropriate.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Powerful Case Conversion &amp; Text Sanitization</h3>
          <p className="mb-6">Transform text instantly with one-click case converters (UPPERCASE, lowercase, Title Case, Sentence case, Toggle Case). The built-in sanitizer cleans messy input by removing extra spaces, line breaks, duplicate lines, and unwanted special characters — perfect for preparing content for websites, documents, or code.</p>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3">Tool</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3">Key Functions</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-3">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Word &amp; Character Counter</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Real-time stats with CJK support</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">SEO content, essays, reports</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Case Converter</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Multiple case transformations</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Branding, headings, consistency</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Text Sanitizer</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Clean extra spaces, duplicates, special chars</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Pasting from documents or code</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-2">Why 100% Client-Side?</h3>
          <p className="mb-6">Every operation runs locally in your browser. Your text, documents, or code never leave your device — ensuring maximum privacy and lightning-fast performance even offline.</p>

          <p className="mt-8">Whether you're a writer, developer, student, or marketer, the Text Tools Suite on EverydayUtils.com delivers professional-grade text processing with complete peace of mind.</p>
        </div>
      </div>

    </div>
  );
}
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Type,
  GitCompare,
  ArrowLeftRight,
  Trash2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';

type DiffOp = 'equal' | 'insert' | 'delete' | 'replace';

interface DiffToken {
  op: DiffOp;
  text: string;
}

interface NoiseFilters {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
  ignorePunctuation: boolean;
  collapseUnchanged: boolean;
}

const DEFAULT_FILTERS: NoiseFilters = {
  ignoreWhitespace: false,
  ignoreCase: false,
  ignorePunctuation: false,
  collapseUnchanged: false,
};

function useDebounced<T>(value: T, delay = 200): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

// Normalize trailing whitespace so it never shows up as a difference.
function normalizeTrailingWhitespace(text: string): string {
  return text.replace(/[ \t]+$/gm, '');
}

function normalizeText(raw: string, filters: NoiseFilters): string {
  let t = normalizeTrailingWhitespace(raw);

  if (filters.ignoreWhitespace) {
    t = t
      .replace(/\r\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
  }

  if (filters.ignorePunctuation) {
    // Strip punctuation; keep word characters and CJK
    t = t.replace(/[^\w\s\u4e00-\u9fff]/g, ' ');
  }

  if (filters.ignoreCase) {
    t = t.toLowerCase();
  }

  return t;
}

function tokenizeWordsWithSpaces(text: string): string[] {
  if (!text) return [];
  // Keep spaces as separate tokens so we can maintain spacing in the diff output.
  return text.match(/\S+|\s+/g) || [];
}

function isWhitespaceToken(text: string): boolean {
  return /^\s+$/.test(text);
}

// LCS-based word diff for writer mode, with replace pairing.
function diffWords(left: string, right: string): DiffToken[] {
  const a = tokenizeWordsWithSpaces(left);
  const b = tokenizeWordsWithSpaces(right);
  const n = a.length;
  const m = b.length;

  // For very large inputs, fall back to crude alignment to avoid heavy computation.
  if (n > 5000 || m > 5000) {
    const max = Math.max(n, m);
    const out: DiffToken[] = [];
    for (let i = 0; i < max; i++) {
      const L = a[i] ?? '';
      const R = b[i] ?? '';
      if (L === R) out.push({ op: 'equal', text: L });
      else if (!L) out.push({ op: 'insert', text: R });
      else if (!R) out.push({ op: 'delete', text: L });
      else {
        // Large case: treat as replacement to avoid noisy insert+delete.
        out.push({ op: 'replace', text: R });
      }
    }
    return out;
  }

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const raw: DiffToken[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      raw.push({ op: 'equal', text: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      raw.push({ op: 'insert', text: b[j - 1] });
      j--;
    } else if (i > 0) {
      raw.push({ op: 'delete', text: a[i - 1] });
      i--;
    }
  }
  raw.reverse();

  // Pair delete+insert into replace where appropriate (word-level modification),
  // ignoring pure whitespace-only pairs.
  const merged: DiffToken[] = [];
  for (let k = 0; k < raw.length; k++) {
    const cur = raw[k];
    const next = raw[k + 1];

    if (cur.op === 'delete' && next?.op === 'insert') {
      const leftIsSpace = isWhitespaceToken(cur.text);
      const rightIsSpace = isWhitespaceToken(next.text);

      if (!leftIsSpace || !rightIsSpace) {
        // Treat as word-level modification: replace left with right.
        merged.push({ op: 'replace', text: next.text });
        k++; // consume the insert we just paired
        continue;
      }
    }

    merged.push(cur);
  }

  return merged;
}

function collapseUnchangedTokens(tokens: DiffToken[], contextWords = 15): DiffToken[] {
  const out: DiffToken[] = [];
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i].op !== 'equal') {
      out.push(tokens[i]);
      i++;
      continue;
    }
    let j = i;
    while (j < tokens.length && tokens[j].op === 'equal') j++;
    const run = j - i;
    if (run <= contextWords * 2 + 5) {
      for (let k = i; k < j; k++) out.push(tokens[k]);
    } else {
      for (let k = i; k < i + contextWords; k++) out.push(tokens[k]);
      out.push({
        op: 'equal',
        text: ` … ${run - contextWords * 2} unchanged words … `,
      });
      for (let k = j - contextWords; k < j; k++) out.push(tokens[k]);
    }
    i = j;
  }
  return out;
}

function extractKeywords(text: string, keywords: string[]): Set<string> {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  keywords.forEach((kw) => {
    const k = kw.trim().toLowerCase();
    if (k && lower.includes(k)) found.add(kw.trim());
  });
  return found;
}

function wordCount(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

export default function WriterDiffCheckerPage() {
  const [draft, setDraft] = useState('');
  const [edited, setEdited] = useState('');
  const [filters, setFilters] = useState<NoiseFilters>(DEFAULT_FILTERS);
  const [keywordsInput, setKeywordsInput] = useState('');
  const [focusView, setFocusView] = useState(false);

  const debouncedDraft = useDebounced(draft, 200);
  const debouncedEdited = useDebounced(edited, 200);
  const tooLarge = debouncedDraft.length + debouncedEdited.length > 250_000;

  const draftOnly = !!draft && !edited;
  const editedOnly = !!edited && !draft;

  const applyPreset = (preset: 'draft-article' | 'contract') => {
    if (preset === 'draft-article') {
      setFilters({
        ...DEFAULT_FILTERS,
        ignoreWhitespace: true,
        ignorePunctuation: false,
        collapseUnchanged: false,
      });
    } else {
      setFilters({
        ...DEFAULT_FILTERS,
        ignoreWhitespace: true,
        ignorePunctuation: false,
        collapseUnchanged: true,
      });
    }
  };

  const { tokens, stats, summarySentence } = useMemo(() => {
    const empty = {
      tokens: [] as DiffToken[],
      stats: { added: 0, deleted: 0, modified: 0, equal: 0, similarity: 100 },
      summarySentence: '',
    };
    if ((!debouncedDraft && !debouncedEdited) || tooLarge) return empty;

    const nDraft = normalizeText(debouncedDraft, filters);
    const nEdited = normalizeText(debouncedEdited, filters);

    let tokens = diffWords(nDraft, nEdited);

    if (filters.collapseUnchanged) {
      tokens = collapseUnchangedTokens(tokens, 20);
    }

    let added = 0;
    let deleted = 0;
    let modified = 0;
    let equal = 0;

    tokens.forEach((t) => {
      const isSpace = isWhitespaceToken(t.text);
      if (t.op === 'insert' && !isSpace) added++;
      else if (t.op === 'delete' && !isSpace) deleted++;
      else if (t.op === 'replace' && !isSpace) modified++;
      else if (t.op === 'equal' && !isSpace) equal++;
    });

    const total = added + deleted + modified + equal || 1;
    const similarity = Math.round((equal / total) * 100);

    const wcDraft = wordCount(debouncedDraft);
    const wcEdited = wordCount(debouncedEdited);
    const delta =
      wcDraft === 0 ? 0 : Math.round(((wcEdited - wcDraft) / Math.max(wcDraft, 1)) * 100);
    const longer =
      delta > 5
        ? `about ${delta}% longer`
        : delta < -5
        ? `about ${Math.abs(delta)}% shorter`
        : 'similar in length';

    const summarySentence =
      `This version is ${longer}. ` +
      `${added} insertion(s), ${deleted} deletion(s)` +
      (modified ? `, ${modified} modification(s)` : '') +
      `. Similarity ~${similarity}%.`;

    return { tokens, stats: { added, deleted, modified, equal, similarity }, summarySentence };
  }, [debouncedDraft, debouncedEdited, filters, tooLarge]);

  const keywordAnalysis = useMemo(() => {
    const kws = keywordsInput
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    if (!kws.length) {
      return { onlyDraft: [] as string[], onlyEdited: [] as string[], both: [] as string[] };
    }
    const inDraft = extractKeywords(draft, kws);
    const inEdited = extractKeywords(edited, kws);
    const onlyDraft = kws.filter((k) => inDraft.has(k) && !inEdited.has(k));
    const onlyEdited = kws.filter((k) => inEdited.has(k) && !inDraft.has(k));
    const both = kws.filter((k) => inDraft.has(k) && inEdited.has(k));
    return { onlyDraft, onlyEdited, both };
  }, [keywordsInput, draft, edited]);

  const handleSwap = () => {
    setDraft(edited);
    setEdited(draft);
  };

  const handleClear = () => {
    setDraft('');
    setEdited('');
  };

  const toggleFilter = (key: keyof NoiseFilters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in ${focusView ? 'relative' : ''}`}>
      {/* Hero */}
      <div
        className={`mb-8 text-center transition-opacity ${
          focusView ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white">
            <GitCompare size={18} />
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Writing Tools
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-tight mb-3">
          Writer Diff Checker — Compare Drafts & Copy Changes
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          See exactly what changed between two versions of text. Perfect for articles, landing pages,
          contracts, and any copy you care about — all comparisons run in your browser, never uploaded.
        </p>
      </div>

      <div
        className={`card p-6 space-y-6 transition-all ${
          focusView ? 'ring-2 ring-brand-500/30 shadow-xl' : ''
        }`}
      >
        {/* Header: privacy + focus toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            All comparisons run entirely in your browser. Your drafts never leave your device. No sign-up,
            no tracking.
          </p>
          <button
            type="button"
            onClick={() => setFocusView((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors shrink-0 ${
              focusView
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40'
            }`}
            aria-label={focusView ? 'Exit focus view' : 'Enter focus view'}
            aria-pressed={focusView}
          >
            {focusView ? <EyeOff size={13} /> : <Eye size={13} />}
            {focusView ? 'Exit focus view' : 'Focus view'}
          </button>
        </div>

        {/* Presets */}
        <div className={`space-y-2 ${focusView ? 'opacity-40 pointer-events-none' : ''}`}>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FileText size={14} className="text-brand-500" />
            Quick presets for common writing workflows
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => applyPreset('draft-article')}
              className="inline-flex flex-col items-start gap-0.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40 hover:border-brand-500/50 transition-colors"
            >
              <span className="font-semibold">Compare draft vs edited article</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Word-level diff, ignores whitespace to highlight actual content changes.
              </span>
            </button>
            <button
              type="button"
              onClick={() => applyPreset('contract')}
              className="inline-flex flex-col items-start gap-0.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40 hover:border-brand-500/50 transition-colors"
            >
              <span className="font-semibold">Check contract wording changes</span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Ignores whitespace and collapses large unchanged sections to focus on wording shifts.
              </span>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className={`grid gap-4 sm:grid-cols-2 ${focusView ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="space-y-1.5">
            <div className="flex items-center justify_between gap-2">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
                <Type size={13} className="text-brand-500" />
                Draft
              </p>
              <button
                type="button"
                onClick={handleSwap}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
              >
                <ArrowLeftRight size={11} />
                Swap
              </button>
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full h-48 sm:h-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-900/80 px-3 py-2 text-sm font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/60"
              placeholder="Paste or type your original draft here..."
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-200 flex items_center gap-1">
                <Type size={13} className="text-brand-500" />
                Edited version
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
              >
                <Trash2 size={11} />
                Clear both
              </button>
            </div>
            <textarea
              value={edited}
              onChange={(e) => setEdited(e.target.value)}
              className="w-full h-48 sm:h-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-900/80 px-3 py-2 text-sm font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/60"
              placeholder="Paste or type your edited version here..."
            />
          </div>
        </div>

        {/* Options */}
        <div className={`space-y-2 ${focusView ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <AlertCircle size={14} className="text-brand-500" />
              Diff options
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 px-2 py-1 rounded_full border border-gray-200 dark:border-gray-700 text-[11px] text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-950/40 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-700 dark:text-gray-300">
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ignoreWhitespace}
                onChange={() => toggleFilter('ignoreWhitespace')}
                className="rounded border-gray-300 dark:border-gray-600 text-brand-500 focus:ring-brand-500/50"
              />
              Ignore whitespace
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ignorePunctuation}
                onChange={() => toggleFilter('ignorePunctuation')}
                className="rounded border-gray-300 dark:border-gray-600 text-brand-500 focus:ring-brand-500/50"
              />
              Ignore punctuation
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ignoreCase}
                onChange={() => toggleFilter('ignoreCase')}
                className="rounded border-gray-300 dark:border-gray-600 text-brand-500 focus:ring-brand-500/50"
              />
              Ignore case
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.collapseUnchanged}
                onChange={() => toggleFilter('collapseUnchanged')}
                className="rounded border-gray-300 dark:border-gray-600 text-brand-500 focus:ring-brand-500/50"
              />
              Collapse unchanged sections
            </label>
          </div>
        </div>

        {/* Large input warning */}
        {tooLarge && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <AlertCircle size={13} />
            This text is very large. Diff is limited to avoid freezing your browser. Consider trimming or
            splitting your content.
          </div>
        )}

        {/* Empty-side explanation */}
        {(draftOnly || editedOnly) && !tooLarge && (
          <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 px-3 py-2 text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <AlertCircle size={13} className="text-brand-500" />
            {draftOnly && (
              <span>
                Edited version is empty, so the draft is shown as deleted. This is expected when you&apos;re
                starting from an original and haven&apos;t added an edited version yet.
              </span>
            )}
            {editedOnly && (
              <span>
                Draft is empty, so the edited version is shown as added. This is expected when you&apos;re
                comparing a new version against a blank starting point.
              </span>
            )}
          </div>
        )}

        {/* Summary */}
        {!tooLarge && (draft || edited) && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200">Summary</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {summarySentence}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Words added: {stats.added} · Words removed: {stats.deleted} · Modifications: {stats.modified} ·
              Similarity: {stats.similarity}%
            </p>
          </div>
        )}

        {/* Diff output (inline) */}
        {!tooLarge && tokens.length > 0 && (
          <div
            className={`mt-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4 text-sm leading-relaxed ${
              focusView ? 'ring-1 ring-brand-500/40' : ''
            }`}
          >
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-2">
              Unified diff — inline changes in natural text flow
            </p>
            <div className="text-gray-900 dark:text-gray-100">
              {tokens.map((t, idx) => {
                if (t.op === 'equal') {
                  return <span key={idx}>{t.text}</span>;
                }
                if (t.op === 'insert') {
                  return (
                    <span
                      key={idx}
                      className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 underline decoration-emerald-500/60"
                    >
                      {t.text}
                    </span>
                  );
                }
                if (t.op === 'delete') {
                  return (
                    <span
                      key={idx}
                      className="bg-red-500/10 text-red-800 dark:text-red-200 line-through decoration-red-500/70"
                    >
                      {t.text}
                    </span>
                  );
                }
                // replace (modification)
                return (
                  <span
                    key={idx}
                    className="bg-amber-500/15 text-amber-800 dark:text-amber-200 underline decoration-amber-500/70"
                  >
                    {t.text}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Keyword helper */}
        <div className={`space-y-2 ${focusView ? 'opacity-40 pointer-events-none' : ''}`}>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
            Keyword & copy check (optional)
          </p>
          <div className="flex flex-col gap-2 text-xs">
            <input
              type="text"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-900/80 px-3 py-1.5 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/60"
              placeholder="Enter important keywords separated by commas (e.g. breathing timer, Pomodoro, focus)..."
            />
            {(keywordAnalysis.onlyDraft.length ||
              keywordAnalysis.onlyEdited.length ||
              keywordAnalysis.both.length) && (
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <p className="text-[11px] font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Only in Draft
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {keywordAnalysis.onlyDraft.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-full text-[11px] bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800"
                      >
                        {kw}
                      </span>
                    ))}
                    {!keywordAnalysis.onlyDraft.length && (
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Only in Edited version
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {keywordAnalysis.onlyEdited.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800"
                      >
                        {kw}
                      </span>
                    ))}
                    {!keywordAnalysis.onlyEdited.length && (
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-gray-700 dark:text-gray-200 mb-1">
                    In both
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {keywordAnalysis.both.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-full text-[11px] bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {kw}
                      </span>
                    ))}
                    {!keywordAnalysis.both.length && (
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">None</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer: link to other tools */}
        <div className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-3 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-500 dark:text-gray-400">
          <span>
            Need to clean up messy text first? Try the{' '}
            <Link to="/blog/pdf-copy-paste-fixer" className="text-brand-500 hover:underline">
              PDF Copy-Paste Fixer
            </Link>{' '}
            or{' '}
            <Link
              to="/blog/word-counter-text-sanitizer-guide"
              className="text-brand-500 hover:underline"
            >
              Word Counter & Text Sanitizer
            </Link>
            .
          </span>
          <span className="inline-flex items-center gap-1">
            <FileText size={11} />
            <Link
              to="/blog/breathing-timer-focus-stress-sleep"
              className="text-brand-500 hover:underline"
            >
              Take a Breathing Timer break
            </Link>
          </span>
        </div>
      </div>

      <RelatedToolsBlock currentPath="/writer-diff-checker" />
    </div>
  );
}
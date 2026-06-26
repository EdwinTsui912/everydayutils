import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Copy, Check, Download, Trash2, ClipboardPaste, FileJson,
  ChevronDown, ChevronUp, Shield, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

const SAMPLES = [
  `{"name":"Jane Doe","age":32,"email":"jane@example.com","active":true,"tags":["developer","designer"],"address":{"city":"Hong Kong","country":"HK"}}`,
  `[{"id":1,"product":"Widget A","price":9.99,"inStock":true},{"id":2,"product":"Widget B","price":14.99,"inStock":false},{"id":3,"product":"Widget C","price":4.49,"inStock":true}]`,
  `{"app":{"name":"EverydayUtils","version":"1.0.0","features":{"darkMode":true,"analytics":false,"cacheTimeout":300}},"api":{"baseUrl":"https://api.example.com","timeout":5000,"retries":3}}`,
];

function byteSize(str: string): number {
  return new Blob([str]).size;
}

function sortKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeys((obj as Record<string, unknown>)[k]);
        return acc;
      }, {});
  }
  return obj;
}

function collapseJSON(str: string): string {
  const lines = str.split('\n');
  const result: string[] = [];
  let depth = 0;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    const opens = (trimmed.match(/[{[]/g) || []).length;
    const closes = (trimmed.match(/[}\]]/g) || []).length;

    if (depth === 0) {
      result.push(line);
      depth += opens - closes;
      if (depth > 0) {
        i++;
        let inner = depth;
        while (i < lines.length && inner > 0) {
          const l = lines[i].trim();
          const o = (l.match(/[{[]/g) || []).length;
          const c = (l.match(/[}\]]/g) || []).length;
          inner += o - c;
          if (inner === 0) {
            const closeLine = lines[i].trim();
            const lastResultLine = result[result.length - 1];
            const isObj = closeLine.startsWith('}');
            result[result.length - 1] = lastResultLine + (isObj ? ' {…}' : ' […]');
            if (closeLine.endsWith(',')) {
              result[result.length - 1] += ',';
            }
          }
          i++;
        }
        depth = 0;
        continue;
      }
    }
    i++;
  }
  return result.join('\n');
}

function highlightJSON(json: string): string {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            return `<span style="color:#01696f;font-weight:500">${match}</span>`;
          }
          return `<span style="color:#22c55e">${match}</span>`;
        }
        if (/true|false|null/.test(match)) {
          return `<span style="color:#a855f7">${match}</span>`;
        }
        return `<span style="color:#f97316">${match}</span>`;
      }
    );
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  col?: number;
}

function validateJSON(text: string): ValidationResult {
  if (!text.trim()) return { valid: false };
  try {
    JSON.parse(text);
    return { valid: true };
  } catch (e: unknown) {
    const msg = (e as Error).message;
    const posMatch = msg.match(/position (\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const before = text.slice(0, pos);
      const line = (before.match(/\n/g) || []).length + 1;
      const lastNl = before.lastIndexOf('\n');
      const col = pos - lastNl;
      return { valid: false, error: msg, line, col };
    }
    return { valid: false, error: msg };
  }
}

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState<2 | 4>(2);
  const [sortKeysEnabled, setSortKeysEnabled] = useState(false);
  const [output, setOutput] = useState('');
  const [validation, setValidation] = useState<ValidationResult>({ valid: false });
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [pasteError, setPasteError] = useState('');
  const [toast, setToast] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastRef.current) clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(''), 2500);
  }, []);

  useEffect(() => { trackToolView('json-formatter'); }, []);

  const runValidation = useCallback((text: string) => {
    setValidation(validateJSON(text));
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runValidation(input), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, runValidation]);

  const [lastOpWasFormat, setLastOpWasFormat] = useState(false);

  const handleFormat = useCallback(() => {
    trackButtonClick('json-formatter', 'format');
    if (!input.trim()) { showToast('Please enter some JSON first'); return; }
    const result = validateJSON(input);
    if (!result.valid) { setValidation(result); showToast('Please enter valid JSON first'); return; }
    try {
      let parsed = JSON.parse(input);
      if (sortKeysEnabled) parsed = sortKeys(parsed);
      setOutput(JSON.stringify(parsed, null, indent));
      setLastOpWasFormat(true);
      setCollapsed(false);
    } catch { /* already validated */ }
  }, [input, indent, sortKeysEnabled, showToast]);

  useEffect(() => {
    if (!lastOpWasFormat || !validation.valid || !input.trim()) return;
    try {
      let parsed = JSON.parse(input);
      if (sortKeysEnabled) parsed = sortKeys(parsed);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch { /* ignore */ }
  }, [indent]);

  const handleMinify = useCallback(() => {
    trackButtonClick('json-formatter', 'minify');
    if (!input.trim()) { showToast('Please enter some JSON first'); return; }
    const result = validateJSON(input);
    if (!result.valid) { setValidation(result); showToast('Please enter valid JSON first'); return; }
    try {
      let parsed = JSON.parse(input);
      if (sortKeysEnabled) parsed = sortKeys(parsed);
      setOutput(JSON.stringify(parsed));
      setLastOpWasFormat(false);
      setCollapsed(false);
    } catch { /* already validated */ }
  }, [input, sortKeysEnabled, showToast]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    trackButtonClick('json-formatter', 'copy');
    trackCopySuccess('json-formatter');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    trackButtonClick('json-formatter', 'download');
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  const handlePaste = useCallback(async () => {
    setPasteError('');
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      setPasteError('Clipboard access denied. Please paste manually.');
    }
  }, []);

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLES[sampleIndex]);
    setSampleIndex(i => (i + 1) % SAMPLES.length);
  }, [sampleIndex]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setValidation({ valid: false });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.shiftKey && e.key === 'F') { e.preventDefault(); handleFormat(); }
      if (mod && !e.shiftKey && e.key === 'm') { e.preventDefault(); handleMinify(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleFormat, handleMinify]);

  const isLarge = input.length > 200_000;
  const inputLines = input ? input.split('\n').length : 0;
  const formattedSize = validation.valid ? byteSize(JSON.stringify(JSON.parse(input), null, indent)) : 0;
  const minifiedSize = validation.valid ? byteSize(JSON.stringify(JSON.parse(input))) : 0;

  const displayOutput = collapsed && output ? collapseJSON(output) : output;
  const highlighted = displayOutput ? highlightJSON(displayOutput) : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Centered Header with Icon */}
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <FileJson size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">JSON Formatter & Validator</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Format, validate, minify, and inspect JSON — 100% in your browser.
        </p>
      </div>

      {/* Large file warning */}
      {isLarge && (
        <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-700 dark:text-amber-400">
          <AlertCircle size={15} className="shrink-0" />
          Large file detected. Performance may be reduced for JSON over 200 KB.
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Left Panel ── */}
        <div className="flex flex-col gap-4">
          <div className="card p-0 overflow-hidden">
            {/* Input header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Input</span>
              <div className="flex items-center gap-2">
                {input.trim() ? (
                  validation.valid ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={12} /> Valid JSON
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 px-2.5 py-1 rounded-full">
                      <AlertCircle size={12} /> Invalid JSON
                    </span>
                  )
                ) : null}
              </div>
            </div>

            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`Paste or type JSON here…\n\nExample:\n{\n  "name": "Jane Doe",\n  "age": 32\n}`}
              spellCheck={false}
              className="w-full h-72 px-4 py-3 text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none outline-none placeholder-gray-400 dark:placeholder-gray-600"
              style={{ fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,monospace" }}
            />

            {/* Error message */}
            {input.trim() && !validation.valid && validation.error && (
              <div className="px-4 py-2.5 border-t border-red-100 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30">
                <p className="text-xs text-red-600 dark:text-red-400 font-mono leading-relaxed">
                  {validation.line
                    ? `Line ${validation.line}, Col ${validation.col}: ${validation.error}`
                    : validation.error}
                </p>
              </div>
            )}

            {/* Stats */}
            {validation.valid && input.trim() && (
              <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-x-5 gap-y-1">
                {[
                  ['Chars', input.length.toLocaleString()],
                  ['Lines', inputLines.toLocaleString()],
                  ['Formatted', `${formattedSize} B`],
                  ['Minified', `${minifiedSize} B`],
                ].map(([label, value]) => (
                  <span key={label} className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{value}</span> {label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePaste}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <ClipboardPaste size={14} /> Paste
            </button>
            <button
              onClick={handleLoadSample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <FileJson size={14} /> Load Sample
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <Trash2 size={14} /> Clear
            </button>
            <label className="flex items-center gap-2 ml-auto cursor-pointer select-none">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Sort Keys</span>
              <div
                role="checkbox"
                aria-checked={sortKeysEnabled}
                tabIndex={0}
                onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && setSortKeysEnabled(v => !v)}
                onClick={() => setSortKeysEnabled(v => !v)}
                className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  sortKeysEnabled ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                style={{ height: '18px', width: '32px' }}
              >
                <span
                  className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-transform duration-200 ${
                    sortKeysEnabled ? 'translate-x-[15px]' : 'translate-x-0.5'
                  }`}
                />
              </div>
            </label>
          </div>

          {pasteError && (
            <p className="text-xs text-red-500 dark:text-red-400">{pasteError}</p>
          )}

          {/* Privacy badge */}
          <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 rounded-xl">
            <Shield size={13} className="text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <p className="text-xs text-green-700 dark:text-green-400 leading-relaxed">
              All processing happens in your browser. No data is ever sent to any server.
            </p>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="flex flex-col gap-4">
          <div className="card p-0 overflow-hidden flex flex-col">
            {/* Output header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex-wrap gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Output</span>
              <div className="flex items-center gap-2">
                {/* Indent selector */}
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                  {([2, 4] as const).map(n => (
                    <button
                      key={n}
                      onClick={() => setIndent(n)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150 ${
                        indent === n
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                    >
                      {n}sp
                    </button>
                  ))}
                </div>
                {/* Collapse/Expand */}
                {output && (
                  <button
                    onClick={() => { trackButtonClick('json-formatter', 'collapse'); setCollapsed(v => !v); }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                  >
                    {collapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
                    {collapsed ? 'Expand' : 'Collapse'}
                  </button>
                )}
              </div>
            </div>

            {/* Syntax-highlighted output */}
            <div className="flex-1 overflow-auto" style={{ minHeight: '17rem', maxHeight: '28rem' }}>
              {output ? (
                <pre
                  className="px-4 py-3 text-xs leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre"
                  style={{ fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,monospace" }}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              ) : (
                <div className="flex items-center justify-center h-full py-16 text-gray-400 dark:text-gray-600 text-sm">
                  Formatted output will appear here
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleFormat}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white transition-colors duration-150 shadow-sm"
              title="Ctrl+Shift+F"
            >
              Format
            </button>
            <button
              onClick={handleMinify}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
              title="Ctrl+M"
            >
              Minify
            </button>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              disabled={!output}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <Download size={14} /> Download
            </button>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-600">
            Shortcuts: <kbd className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">Ctrl+Shift+F</kbd> Format &nbsp;
            <kbd className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">Ctrl+M</kbd> Minify
          </p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-xl shadow-lg pointer-events-none select-none animate-fade-in">
          {toast}
        </div>
      )}

      {/* FAQ / SEO section */}
      <div className="divider" />
      <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          JSON Formatter &amp; Validator — Common Questions &amp; Use Cases
        </h2>

        {[
          {
            q: 'Is this JSON Formatter really free and private?',
            a: 'Yes, completely. There is no sign-up, no tracking, and no data ever leaves your device. Because this JSON formatter and validator runs 100% client-side in your browser, it is safe even when working with sensitive API responses, configuration files, or proprietary data.',
          },
          {
            q: 'Can I use the formatted JSON directly in my code or config files?',
            a: 'Yes. You can instantly switch between a nicely indented formatted version and a compact minified version. Both outputs are clean and ready to copy and paste into JavaScript projects, React components, Node.js configs, or any other workflow. The tool also includes a Sort Keys option to alphabetically organize object properties.',
          },
          {
            q: 'What is the difference between JSON formatting and minification?',
            a: 'JSON formatting (also called pretty printing) adds indentation and line breaks to make nested structures human-readable — ideal for debugging and code review. JSON minification removes all whitespace to produce a compact single-line string, which reduces file size and is preferred for production APIs. This tool lets you switch between both instantly and shows the exact byte size difference.',
          },
          {
            q: 'How accurate is the validation and error reporting?',
            a: "The tool uses your browser's native JSON parser for real-time validation. When invalid JSON is detected, it displays a clear error message with the exact line and column number, helping you quickly locate and fix common issues like missing commas, unquoted keys, or trailing commas.",
          },
          {
            q: 'Why is there no full recursive Tree View in this version?',
            a: 'A robust, high-performance collapsible Tree View that handles deep nesting and large files reliably is more complex than it appears. To keep the tool fast and dependable, this version includes a practical Collapse / Expand All toggle on the formatted output. A full interactive Tree View is planned for a future update based on user feedback.',
          },
          {
            q: 'Does it work with large JSON files?',
            a: 'It performs well with the file sizes developers typically work with daily. For very large JSON (over 200 KB), a gentle performance warning will appear. The tool is optimized for everyday development workflows rather than processing massive datasets directly in the browser.',
          },
          {
            q: 'What makes this JSON Formatter different from other online tools?',
            a: 'Most popular JSON formatters send your data to external servers and display ads. This tool is built with a strict privacy-first architecture — all parsing, formatting, and validation happens locally on your device. It also includes practical developer features like alphabetical key sorting, clipboard integration, accurate byte size comparison, and keyboard shortcuts (Ctrl+Shift+F to Format, Ctrl+M to Minify).',
          },
        ].map(({ q, a }) => (
          <div key={q} className="space-y-1.5">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{q}</h3>
            <p className="text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
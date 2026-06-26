import { useState, useMemo, useCallback, useEffect } from 'react';
import { Copy, Check, RotateCcw, FileText, Download, Trash2 } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

// ── Types ────────────────────────────────────────────────────────────────────

type ParagraphLength = 'short' | 'medium' | 'long' | 'verylong';
type OutputFormat    = 'text' | 'html';

interface GeneratorState {
  count:          number;
  length:         ParagraphLength;
  format:         OutputFormat;
  startWithLorem: boolean;
  seed:           number;
  cleared:        boolean;
}

interface CopyState {
  copied: boolean;
}

// ── Word pool ────────────────────────────────────────────────────────────────

const WORDS: readonly string[] = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit',
  'sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore',
  'magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation',
  'ullamco','laboris','nisi','ex','ea','commodo','consequat','duis','aute',
  'irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat',
  'nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident',
  'sunt','culpa','qui','officia','deserunt','mollit','anim','est','laborum',
  'pellentesque','habitant','morbi','tristique','senectus','netus','malesuada',
  'fames','ac','turpis','egestas','maecenas','pharetra','convallis','posuere',
  'leo','risus','porta','venenatis','vehicula','elementum','sem','lacinia',
  'quam','volutpat','condimentum','interdum','varius','id','eros','donec',
  'aliquet','pede','blandit','fringilla','purus','scelerisque','diam','facilisis',
  'augue','cursus','ante','dapibus','ligula','feugiat','vel','pretium','laoreet',
  'hendrerit','suscipit','vulputate','molestie','tortor','sollicitudin','accumsan',
  'porttitor','rutrum','nisl','ultricies','mi','ornare','aenean','euismod',
  'bibendum','nullam','tincidunt','eget','felis','congue','mauris','luctus',
];

const LOREM_OPEN = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const SENTENCE_COUNTS: Record<ParagraphLength, number> = {
  short:    3,
  medium:   5,
  long:     8,
  verylong: 12,
};

const LENGTH_LABELS: Record<ParagraphLength, string> = {
  short:    'Short',
  medium:   'Medium',
  long:     'Long',
  verylong: 'Very Long',
};

const LENGTH_HINTS: Record<ParagraphLength, string> = {
  short:    '~3 sentences per paragraph',
  medium:   '~5 sentences per paragraph',
  long:     '~8 sentences per paragraph',
  verylong: '~12 sentences per paragraph',
};

// ── RNG & generation helpers ─────────────────────────────────────────────────

function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function pickWord(rand: () => number, exclude?: string): string {
  let w: string;
  do { w = WORDS[Math.floor(rand() * WORDS.length)]; } while (w === exclude);
  return w;
}

function makeSentence(rand: () => number): string {
  const len = 8 + Math.floor(rand() * 10);
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    words.push(pickWord(rand, words[words.length - 1]));
  }
  if (len > 10 && rand() > 0.5) {
    const idx = 3 + Math.floor(rand() * 4);
    words[idx] = words[idx] + ',';
  }
  return capitalize(words.join(' ')) + '.';
}

function makeParagraph(
  rand: () => number,
  sentenceCount: number,
  isFirst: boolean,
  startWithLorem: boolean,
): string {
  const variation = Math.floor(rand() * 3) - 1;
  const target = Math.max(2, sentenceCount + variation);
  const sentences: string[] = [];
  for (let i = 0; i < target; i++) {
    sentences.push(i === 0 && isFirst && startWithLorem ? LOREM_OPEN : makeSentence(rand));
  }
  return sentences.join(' ');
}

function generateParagraphs(
  count: number,
  length: ParagraphLength,
  startWithLorem: boolean,
  seed: number,
): string[] {
  const rand = rng(seed);
  const base = SENTENCE_COUNTS[length];
  return Array.from({ length: count }, (_, i) =>
    makeParagraph(rand, base, i === 0, startWithLorem)
  );
}

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-0.5 gap-0.5">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-all duration-150 ${
            value === opt.value
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card flex-1 px-3 py-2.5 text-center min-w-[72px]">
      <div className="text-sm font-bold text-gray-900 dark:text-gray-50 tabular-nums">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function LoremIpsumGenerator() {
  const [state, setState] = useState<GeneratorState>({
    count:          5,
    length:         'medium',
    format:         'text',
    startWithLorem: true,
    seed:           Date.now(),
    cleared:        false,
  });

  const [copyState, setCopyState] = useState<CopyState>({ copied: false });

  useEffect(() => { trackToolView('lorem-ipsum-generator'); }, []);

  const set = useCallback(<K extends keyof GeneratorState>(key: K, value: GeneratorState[K]) => {
    setState(prev => ({ ...prev, [key]: value, cleared: false }));
  }, []);

  const paragraphs = useMemo(
    () => generateParagraphs(state.count, state.length, state.startWithLorem, state.seed),
    [state.count, state.length, state.startWithLorem, state.seed],
  );

  const plainText = state.cleared ? '' : paragraphs.join('\n\n');

  const outputText = useMemo(() => {
    if (state.cleared) return '';
    return state.format === 'html'
      ? paragraphs.map(p => `<p>${p}</p>`).join('\n')
      : plainText;
  }, [state.cleared, state.format, paragraphs, plainText]);

  const wordCount = useMemo(() => countWords(plainText), [plainText]);
  const charCount = plainText.length;

  const handleCopy = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    trackButtonClick('lorem-ipsum-generator', 'copy');
    trackCopySuccess('lorem-ipsum-generator');
    setCopyState({ copied: true });
    setTimeout(() => setCopyState({ copied: false }), 1500);
  }, [outputText]);

  const handleDownload = useCallback(() => {
    if (!outputText) return;
    trackButtonClick('lorem-ipsum-generator', 'download');
    const ext  = state.format === 'html' ? 'html' : 'txt';
    const mime = state.format === 'html' ? 'text/html' : 'text/plain';
    const blob = new Blob([outputText], { type: mime });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `lorem-ipsum.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [outputText, state.format]);

  const handleRegen = useCallback(() => {
    setState(prev => ({ ...prev, seed: Date.now(), cleared: false }));
  }, []);

  const handleClear = useCallback(() => {
    setState(prev => ({ ...prev, cleared: true }));
  }, []);

  const lengthOptions = (['short', 'medium', 'long', 'verylong'] as ParagraphLength[]).map(v => ({
    label: LENGTH_LABELS[v],
    value: v,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Centered Header with Icon */}
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <FileText size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Lorem Ipsum Generator</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Generate placeholder text instantly. Customize paragraph count, length, format, and more.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-start">

        {/* Controls panel */}
        <div className="w-full md:w-80 shrink-0 space-y-4">

          {/* Paragraph count */}
          <div className="card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="para-count" className="label mb-0">Paragraphs</label>
              <span className="text-sm font-bold text-teal-600 dark:text-teal-400 tabular-nums">{state.count}</span>
            </div>
            <input
              id="para-count"
              type="range"
              min={1}
              max={20}
              value={state.count}
              onChange={e => set('count', +e.target.value)}
              className="w-full"
              aria-valuemin={1}
              aria-valuemax={20}
              aria-valuenow={state.count}
              aria-valuetext={`${state.count} paragraphs`}
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 px-0.5">
              <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
            </div>
          </div>

          {/* Paragraph length */}
          <div className="card p-4 space-y-2.5">
            <span className="label">Paragraph Length</span>
            <SegmentedControl<ParagraphLength>
              value={state.length}
              onChange={v => set('length', v)}
              options={lengthOptions}
            />
            <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
              {LENGTH_HINTS[state.length]}
            </p>
          </div>

          {/* Output format */}
          <div className="card p-4 space-y-2.5">
            <span className="label">Output Format</span>
            <SegmentedControl<OutputFormat>
              value={state.format}
              onChange={v => set('format', v)}
              options={[
                { label: 'Plain Text', value: 'text' },
                { label: 'HTML',       value: 'html' },
              ]}
            />
            {state.format === 'html' && (
              <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
                Each paragraph wrapped in{' '}
                <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">&lt;p&gt;</code> tags
              </p>
            )}
          </div>

          {/* Start with Lorem option */}
          <div className="card p-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={state.startWithLorem}
                onChange={e => set('startWithLorem', e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-teal-600 rounded shrink-0"
              />
              <div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug">
                  Start with "Lorem ipsum"
                </div>
                <div className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">
                  First sentence begins with the classic phrase
                </div>
              </div>
            </label>
          </div>

          {/* Stats */}
          <div className="flex gap-2">
            <StatPill label="Words"  value={wordCount} />
            <StatPill label="Chars"  value={charCount} />
            <StatPill label="Paras"  value={state.count} />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleRegen}
              className="btn-secondary w-full gap-2"
            >
              <RotateCcw size={14} />
              New Variation
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!outputText}
                className="btn-primary flex-1 gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copyState.copied
                  ? <><Check size={14} />Copied!</>
                  : <><Copy size={14} />Copy</>}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!outputText}
                className="btn-secondary gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                title={`Download as .${state.format === 'html' ? 'html' : 'txt'}`}
                aria-label="Download"
              >
                <Download size={14} />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="btn-ghost gap-2 px-3"
                aria-label="Clear preview"
                title="Clear preview"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <FileText size={13} />
              <span>Preview</span>
              {state.format === 'html' && (
                <span className="badge bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400">HTML</span>
              )}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {state.count} paragraph{state.count !== 1 ? 's' : ''} · {wordCount.toLocaleString()} words
            </span>
          </div>

          <div className="card flex-1 overflow-hidden">
            {state.cleared ? (
              <div className="h-[calc(100vh-20rem)] min-h-[320px] flex items-center justify-center p-6">
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
                  Preview cleared. Adjust a setting or click <strong>New Variation</strong> to regenerate.
                </p>
              </div>
            ) : state.format === 'text' ? (
              <div className="h-[calc(100vh-20rem)] min-h-[320px] overflow-y-auto p-5 sm:p-6 space-y-4">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            ) : (
              <div
                className="h-[calc(100vh-20rem)] min-h-[320px] overflow-y-auto p-5 sm:p-6 [&>p]:text-sm [&>p]:sm:text-base [&>p]:text-gray-700 [&>p]:dark:text-gray-300 [&>p]:leading-relaxed [&>p]:mb-4 last:[&>p]:mb-0"
                dangerouslySetInnerHTML={{ __html: outputText }}
              />
            )}
          </div>

          <p className="text-[11px] text-gray-400 dark:text-gray-500 text-right">
            Click <strong>Copy</strong> to copy all text · <strong>Download</strong> to save as .{state.format === 'html' ? 'html' : 'txt'}
          </p>
        </div>

      </div>

      {/* SEO section */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-xl font-bold mb-4">The Purpose of Placeholder Text in Modern Design</h2>
          <p className="mb-6">Placeholder text serves as essential scaffolding in UI/UX design, web development, and graphic layout processes. It enables designers, developers, and content strategists to visualize typography, spacing, hierarchy, and overall composition without the interference of meaningful content. By filling mockups with neutral, repetitive passages, teams can iterate on visual elements like font pairing, line height, kerning, and responsive breakpoints more efficiently. This practice traces back centuries in typesetting but remains foundational in tools like Figma, Adobe XD, Sketch, and HTML/CSS prototypes today.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">What Are the Historical Origins of Lorem Ipsum?</h3>
          <p className="mb-6">Lorem Ipsum originates from a 45 BC philosophical treatise by the Roman statesman and orator Marcus Tullius Cicero. Specifically, it derives from sections 1.10.32 and 1.10.33 of his work <em>De Finibus Bonorum et Malorum</em> ("On the Ends of Good and Evil"). The original Latin text explored themes of ethics, pleasure, and pain in hedonistic philosophy. Over time, the passage was corrupted through typesetting errors, word alterations, and selective excerpting—transforming coherent prose into the nonsensical yet rhythmically familiar "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." that designers know today.</p>
          <p className="mb-6">Its modern form gained popularity in the 1960s via Letraset dry-transfer sheets and later in desktop publishing software like Aldus PageMaker. This evolution from classical Latin to industry-standard dummy text highlights how practical needs in print and digital design repurposed ancient scholarship into a tool for creative workflows.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Why Do Designers Use Placeholder Text Instead of Real Content?</h3>
          <p className="mb-6">Using real copy during early prototyping often distracts stakeholders from evaluating design quality. Meaningful text draws attention to wording, messaging, or brand voice prematurely, derailing discussions about layout balance, readability, or user flow. Placeholder text like Lorem Ipsum maintains focus on structural aspects—ensuring headlines don't break awkwardly, paragraphs flow naturally across devices, and call-to-action buttons align perfectly—before final content integration. This separation accelerates feedback loops in agile design sprints and prevents "content bias" that could skew wireframe evaluations. Once your visual layout is finalized and you are ready to transition to real copy, you can utilize our <a href="/text-tools" className="text-blue-600 dark:text-blue-400 hover:underline">Text Tools Suite</a> to scrub line breaks, clean up formatting, and analyze final copy metrics instantly client-side.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Why Choose a Client-Side Lorem Ipsum Generator for Privacy and Reliability?</h3>
          <p className="mb-6">Our Lorem Ipsum Generator on EverydayUtils.com operates <strong>100% client-side</strong> in your browser using JavaScript. Unlike server-dependent tools that transmit your generated text (and potentially project details) to remote servers, this approach ensures zero data leaves your device. No logs, no tracking, no third-party exposure—making it ideal for sensitive projects involving confidential wireframes, client mockups, or proprietary designs. It works offline, loads instantly, and eliminates latency or downtime risks associated with API-based generators. This privacy-first architecture aligns with modern data protection standards (GDPR, CCPA), offering reliability without compromising security or requiring account sign-ups.</p>

          <h3 className="text-lg font-semibold mt-8 mb-3">Comparison of Placeholder Approaches in UI/UX Prototyping</h3>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Aspect</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Lorem Ipsum</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Real Content</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Redacted Script (Blocks)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Focus on Design</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">High – Neutral rhythm preserves layout evaluation</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Low – Content distracts from visuals</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Medium – Blocks show structure but lack flow</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Readability Testing</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Excellent for typography hierarchy</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Best for final proofing</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Poor – Overly uniform, hides text density</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Stakeholder Feedback</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Promotes objective design critique</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Risks premature content debates</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Useful for privacy in early stages</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Privacy/Security</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">High (especially client-side)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Variable (depends on source)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Highest for sensitive projects</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Customization</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Flexible length, paragraphs, HTML</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fixed to actual copy</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Limited to geometric placeholders</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Use Case</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Wireframing, mockups, rapid iteration</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Final designs, accessibility testing</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Compliance-heavy or NDA projects</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8">This educational resource underscores why Lorem Ipsum remains indispensable in professional design pipelines. By understanding its roots in Cicero's 45 BC text and its strategic advantages—particularly through secure, client-side implementation—creators can produce more polished, user-centered interfaces with confidence. Whether refining a landing page, mobile app prototype, or marketing collateral, effective placeholder strategies bridge the gap between concept and polished product.</p>
        </div>
      </div>
    </div>
  );
}
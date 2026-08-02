import { useEffect, useMemo, useState } from 'react';
import { Copy, Download, RefreshCw, Trash2, KeyRound, Check, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { v7 as uuidv7 } from 'uuid';
import SEO from '../components/SEO';
import { trackToolView, trackButtonClick } from '../lib/analytics';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';





type UuidVersion = 'v4' | 'v7';
type OutputFormat = 'plain' | 'csv' | 'json' | 'sql';

const MAX_COUNT = 1000;

const FAQ_ITEMS = [
  {
    q: 'What is the difference between UUID and GUID?',
    a: 'In most software and web development contexts, UUID and GUID are used interchangeably. This tool generates standard UUID-formatted identifiers.',
  },
  {
    q: 'What is UUID v4?',
    a: 'UUID v4 is a randomly generated identifier. In modern browsers, it can be created with crypto.randomUUID(), which uses a cryptographically secure random number generator.',
  },
  {
    q: 'What is UUID v7?',
    a: 'UUID v7 is a time-ordered UUID format designed to keep identifiers sortable by creation time while still remaining unique.',
  },
  {
    q: 'Can I generate UUIDs in bulk?',
    a: 'Yes. You can generate one UUID or large batches for database seeding, test fixtures, spreadsheets, API mocks, and other developer workflows.',
  },
  {
    q: 'Does this tool upload anything?',
    a: 'No. All UUID generation and formatting happen locally in your browser. Nothing is sent to a server.',
  },
];

function generateUuidV4(): string {
  return crypto.randomUUID();
}

function generateUuidV7(): string {
  return uuidv7();
}

function makeUuid(version: UuidVersion) {
  return version === 'v4' ? generateUuidV4() : generateUuidV7();
}

function clampCount(value: number) {
  if (!Number.isFinite(value) || value < 1) return 1;
  return Math.min(MAX_COUNT, Math.floor(value));
}

function formatOutput(values: string[], format: OutputFormat) {
  if (format === 'csv') {
    return ['uuid', ...values].join('\n');
  }

  if (format === 'json') {
    return JSON.stringify(values, null, 2);
  }

  if (format === 'sql') {
    return values.map((value) => `'${value}'`).join(',\n');
  }

  return values.join('\n');
}

function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function UUIDGeneratorPage() {
  const [version, setVersion] = useState<UuidVersion>('v4');
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<OutputFormat>('plain');
  const [uuids, setUuids] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    trackToolView('uuid-generator');
  }, []);

  const outputText = useMemo(() => formatOutput(uuids, format), [uuids, format]);

  const generate = () => {
    const safeCount = clampCount(count);

    if (safeCount !== count) {
      setCount(safeCount);
      setError(`Quantity adjusted to the allowed range of 1 to ${MAX_COUNT}.`);
    } else {
      setError('');
    }

    const next = Array.from({ length: safeCount }, () => makeUuid(version));
    setUuids(next);
    setCopiedAll(false);
    setCopiedIndex(null);

    trackButtonClick('uuid-generate', {
      version,
      count: safeCount,
      format,
    });
  };

  const clearAll = () => {
    setUuids([]);
    setError('');
    setCopiedAll(false);
    setCopiedIndex(null);
    trackButtonClick('uuid-clear');
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopiedAll(true);
      setCopiedIndex(null);
      setTimeout(() => setCopiedAll(false), 1500);

      trackButtonClick('uuid-copy-all', {
        version,
        count: uuids.length,
        format,
      });
    } catch {
      setError('Clipboard access failed. Please copy manually from the output box.');
    }
  };

  const copyOne = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setCopiedAll(false);
      setTimeout(() => setCopiedIndex(null), 1200);

      trackButtonClick('uuid-copy-one', {
        version,
        index,
      });
    } catch {
      setError('Clipboard access failed. Please copy manually.');
    }
  };

  const downloadOutput = () => {
    if (!uuids.length) return;

    if (format === 'json') {
      downloadTextFile(`uuid-${version}-list.json`, outputText, 'application/json;charset=utf-8');
    } else if (format === 'csv') {
      downloadTextFile(`uuid-${version}-list.csv`, outputText, 'text/csv;charset=utf-8');
    } else {
      downloadTextFile(`uuid-${version}-list.txt`, outputText);
    }

    trackButtonClick('uuid-download', {
      version,
      count: uuids.length,
      format,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="Free UUID / GUID Generator — Bulk UUID v4 & v7 Online | EverydayUtils"
        description="Generate UUIDs and GUIDs instantly in your browser. Supports UUID v4 and v7, bulk copy, JSON/CSV/SQL output, and private client-side generation."
        keywords="uuid generator, guid generator, bulk uuid generator, uuid v4 generator, uuid v7 generator"
        url="https://everydayutils.com/uuid-generator"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white">
            <KeyRound size={20} />
          </div>
          <span className="label">Developer Tools</span>
        </div>

        <h1 className="page-title mb-2">UUID / GUID Generator</h1>
        <p className="page-subtitle">
          Generate UUID v4 or v7 values in bulk, then copy or download them in plain text, CSV, JSON, or SQL-ready format.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <div className="card p-5 h-fit">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Generator Settings
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs text-gray-400 dark:text-gray-500 mb-2">
                UUID version
              </label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as UuidVersion)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
              >
                <option value="v4">UUID v4</option>
                <option value="v7">UUID v7</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 dark:text-gray-500 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                max={MAX_COUNT}
                inputMode="numeric"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {[1, 10, 50, 100].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className="px-2.5 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 dark:text-gray-500 mb-2">
                Output format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as OutputFormat)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
              >
                <option value="plain">Plain text</option>
                <option value="csv">CSV column</option>
                <option value="json">JSON array</option>
                <option value="sql">SQL string list</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={generate}
                type="button"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <RefreshCw size={15} />
                Generate UUIDs
              </button>

              <button
                onClick={copyAll}
                type="button"
                disabled={!uuids.length}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {copiedAll ? <Check size={15} /> : <Copy size={15} />}
                {copiedAll ? 'Copied All' : 'Copy All'}
              </button>

              <button
                onClick={downloadOutput}
                type="button"
                disabled={!uuids.length}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Download size={15} />
                Download
              </button>

              <button
                onClick={clearAll}
                type="button"
                disabled={!uuids.length}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-red-500 hover:bg-red-500/5 transition-colors"
              >
                <Trash2 size={15} />
                Clear
              </button>
            </div>

            <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900">
              <p className="flex items-start gap-2 text-xs text-brand-700 dark:text-brand-300 leading-relaxed">
                <Info size={13} className="mt-0.5 shrink-0" />
                Use v4 for random general-purpose IDs. Use v7 when you want time-ordered identifiers that are friendlier for logs, inserts, and sorting.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {error && (
            <div className="card p-4">
              <p className="text-sm text-amber-600 dark:text-amber-400">{error}</p>
            </div>
          )}

          <div className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Generated Output
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {uuids.length
                    ? `${uuids.length} ${version.toUpperCase()} value${uuids.length > 1 ? 's' : ''} ready`
                    : 'Generate one or more UUIDs to see the output here'}
                </p>
              </div>

              {uuids.length > 0 && (
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {version.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {format.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {uuids.length} item{uuids.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {uuids.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={22} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose a version, set the quantity, and generate UUIDs instantly in your browser.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-4">
                  <textarea
                    readOnly
                    value={outputText}
                    className="w-full min-h-[220px] bg-gray-50 dark:bg-gray-950 px-4 py-4 text-sm font-mono text-gray-800 dark:text-gray-200 outline-none resize-y"
                  />
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Individual UUIDs
                    </h3>
                  </div>

                  <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-800">
                    {uuids.map((value, index) => (
                      <div
                        key={`${value}-${index}`}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                            #{index + 1}
                          </p>
                          <p className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                            {value}
                          </p>
                        </div>

                        <button
                          onClick={() => copyOne(value, index)}
                          type="button"
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                          {copiedIndex === index ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h2 className="font-semibold mt-8 mb-2">When to Use UUID v4 vs v7</h2>
            <p>
              UUID v4 is fully random and is the best default when you simply need a unique identifier. UUID v7 is time-ordered, which can be more useful for logs, ordered events, and database inserts that benefit from better chronological sorting.
            </p>

            <h2 className="font-semibold mt-8 mb-2">Bulk UUID Generation</h2>
            <p>
              Bulk generation is useful for test fixtures, seed data, CSV imports, mock API responses, spreadsheets, and one-off development tasks. This tool lets you copy the whole list at once or export it in a format that matches your workflow.
            </p>

            <h2 className="font-semibold mt-8 mb-2">Frequently Asked Questions</h2>
          </div>

          <div className="not-prose space-y-4 mt-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="card p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">
                  {item.q}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <RelatedToolsBlock currentPath="/uuid-generator" />

    </div>
  );
}
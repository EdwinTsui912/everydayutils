import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import RelatedToolsBlock from "../components/seo/RelatedToolsBlock";

type RegexFlags = {
  g: boolean;
  i: boolean;
  m: boolean;
  s: boolean;
  u: boolean;
  y: boolean;
};

type RegexMatch = {
  index: number;
  start: number;
  end: number;
  length: number;
  text: string;
  groups: (string | null)[];
  namedGroups?: Record<string, string | null>;
  isZeroLength: boolean;
};

type RegexPreset = {
  id: string;
  label: string;
  description: string;
  pattern: string;
  flags: RegexFlags;
  sampleText: string;
};

const DEFAULT_FLAGS: RegexFlags = {
  g: true,
  i: false,
  m: false,
  s: false,
  u: false,
  y: false,
};

const PRESETS: RegexPreset[] = [
  {
    id: "email",
    label: "Email extract",
    description: "Find email addresses in text — useful for logs, exports, or drafts.",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: { ...DEFAULT_FLAGS, g: true, i: true },
    sampleText:
      "Contact us at support@example.com or billing@everydayutils.dev. Internal test: john.doe+draft@company.co.uk.",
  },
  {
    id: "url",
    label: "URL finder",
    description: "Roughly match HTTP/HTTPS URLs in snippets or logs.",
    pattern: "https?:\\/\\/[^\\s/$.?#][^\\s]*",
    flags: { ...DEFAULT_FLAGS, g: true, i: true },
    sampleText:
      "Docs: https://everydayutils.dev/tools/regex-tester · Staging: http://localhost:4173 · Blog: https://blog.example.com/guide",
  },
  {
    id: "hashtag",
    label: "Hashtag matcher",
    description: "Find hashtags in social posts or notes.",
    pattern: "#[\\p{L}0-9_]+",
    flags: { ...DEFAULT_FLAGS, g: true, u: true },
    sampleText:
      "Today: #deepwork and #writing. Later: #regex #EverydayUtils #產品工具",
  },
  {
    id: "date",
    label: "Date (YYYY-MM-DD)",
    description: "Match simple ISO-like dates in notes or exports.",
    pattern: "\\b\\d{4}-\\d{2}-\\d{2}\\b",
    flags: { ...DEFAULT_FLAGS, g: true },
    sampleText:
      "Sprint dates: 2025-06-01 to 2025-06-14. Release freeze on 2025-05-28.",
  },
];

function flagsToString(flags: RegexFlags): string {
  return (Object.entries(flags) as [keyof RegexFlags, boolean][])
    .filter(([, active]) => active)
    .map(([name]) => name)
    .join("");
}

function parseSlashDelimitedPattern(raw: string): {
  pattern: string;
  flagsFromPattern: Partial<RegexFlags>;
} {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.lastIndexOf("/") === 0) {
    return { pattern: raw, flagsFromPattern: {} };
  }
  const lastSlash = trimmed.lastIndexOf("/");
  const pattern = trimmed.slice(1, lastSlash);
  const flagString = trimmed.slice(lastSlash + 1);
  const flagsFromPattern: Partial<RegexFlags> = {};
  for (const char of flagString) {
    if (["g", "i", "m", "s", "u", "y"].includes(char)) {
      flagsFromPattern[char as keyof RegexFlags] = true;
    }
  }
  return { pattern, flagsFromPattern };
}

function compileRegex(
  pattern: string,
  flags: RegexFlags,
): { regex: RegExp | null; error: string | null } {
  if (!pattern) {
    return { regex: null, error: null };
  }
  try {
    const regex = new RegExp(pattern, flagsToString(flags));
    return { regex, error: null };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Invalid regular expression.";
    return { regex: null, error: errorMessage };
  }
}

function computeMatches(regex: RegExp | null, text: string): RegexMatch[] {
  if (!regex || !text) return [];

  const matches: RegexMatch[] = [];
  const flags = regex.flags.includes("g") ? regex.flags : regex.flags + "g";
  const r = new RegExp(regex.source, flags);

  let match: RegExpExecArray | null;
  const safetyLimit = 5000;
  let guard = 0;

  while ((match = r.exec(text)) && guard < safetyLimit) {
    guard += 1;
    const full = match[0] ?? "";
    const start = match.index;
    const end = start + full.length;
    const groups = match.slice(1);
    const namedGroups = match.groups ?? undefined;
    const isZeroLength = full.length === 0;

    matches.push({
      index: matches.length,
      start,
      end,
      length: full.length,
      text: full,
      groups,
      namedGroups,
      isZeroLength,
    });

    if (isZeroLength) {
      r.lastIndex = r.lastIndex + 1;
    }
  }

  return matches;
}

function describeFlags(flags: RegexFlags): string {
  const parts: string[] = [];
  if (flags.g) parts.push("Global — find all matches");
  if (flags.i) parts.push("Case-insensitive");
  if (flags.m) parts.push("Multiline anchors (^ and $)");
  if (flags.s) parts.push("DotAll — . also matches newlines");
  if (flags.u) parts.push("Unicode mode");
  if (flags.y) parts.push("Sticky — match from lastIndex only");
  return parts.join(" · ");
}

function getRegexSummary(
  pattern: string,
  flags: RegexFlags,
  matches: RegexMatch[],
  error: string | null,
): string {
  if (!pattern) {
    return "Paste a regex pattern and some sample text to see live matches.";
  }
  if (error) {
    return "This pattern has a syntax error. Fix it to see matches and groups.";
  }
  if (!matches.length) {
    return "Pattern compiled successfully, but no matches were found in the current text.";
  }
  if (matches.length === 1) {
    return "Pattern compiled successfully and found 1 match. Use the inspector to see details and capture groups.";
  }
  return `Pattern compiled successfully and found ${matches.length} matches. Click a match to inspect capture groups and positions.`;
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState<string>("");
  const [flags, setFlags] = useState<RegexFlags>(DEFAULT_FLAGS);
  const [text, setText] = useState<string>("");
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number | null>(
    null,
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(
    undefined,
  );
  const [showExplain, setShowExplain] = useState<boolean>(true);

  const { regex, error } = useMemo(
    () => compileRegex(pattern, flags),
    [pattern, flags],
  );
  const matches = useMemo(
    () => computeMatches(regex, text),
    [regex, text],
  );

  useEffect(() => {
    if (!matches.length) {
      setSelectedMatchIndex(null);
    } else if (selectedMatchIndex == null || selectedMatchIndex >= matches.length) {
      setSelectedMatchIndex(0);
    }
  }, [matches, selectedMatchIndex]);

  const selectedMatch = useMemo(() => {
    if (selectedMatchIndex == null) return null;
    return matches[selectedMatchIndex] ?? null;
  }, [matches, selectedMatchIndex]);

  const handlePatternChange = useCallback(
    (value: string) => {
      setPattern(value);
    },
    [],
  );

  const handlePatternPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      const raw = e.clipboardData.getData("text");
      if (!raw) return;
      const { pattern: parsedPattern, flagsFromPattern } =
        parseSlashDelimitedPattern(raw);
      if (parsedPattern === raw) return;

      e.preventDefault();
      setPattern(parsedPattern);
      if (Object.keys(flagsFromPattern).length) {
        setFlags((prev) => ({
          ...prev,
          ...flagsFromPattern,
        }));
      }
    },
    [],
  );

  const handleToggleFlag = useCallback((flag: keyof RegexFlags) => {
    setFlags((prev) => ({
      ...prev,
      [flag]: !prev[flag],
    }));
  }, []);

  const handlePresetSelect = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setSelectedPresetId(preset.id);
    setPattern(preset.pattern);
    setFlags(preset.flags);
    setText(preset.sampleText);
    setSelectedMatchIndex(null);
  }, []);

  const handleClearAll = useCallback(() => {
    setPattern("");
    setFlags(DEFAULT_FLAGS);
    setText("");
    setSelectedMatchIndex(null);
    setSelectedPresetId(undefined);
  }, []);

  const handleCopy = useCallback((textToCopy: string) => {
    if (!textToCopy) return;
    navigator.clipboard?.writeText(textToCopy).catch(() => {
      // ignore
    });
  }, []);

  const summarySentence = useMemo(
    () => getRegexSummary(pattern, flags, matches, error),
    [pattern, flags, matches, error],
  );

  const flagsDescription = useMemo(
    () => describeFlags(flags),
    [flags],
  );

  return (
    <>
      <Helmet>
        <title>Regex Tester &amp; Debugger — Fast, Private, In-Browser Tool</title>
        <meta
          name="description"
          content="Test and debug regular expressions in your browser. See matches, capture groups, and flags in real time — with no tracking, no uploads, and no sign-up."
        />
        <meta
          name="keywords"
          content="regex tester, regex debugger, regex checker, regex groups, online regex tool, javascript regex tester, privacy-first regex, regex explain"
        />
        <link
          rel="canonical"
          href="https://everydayutils.dev/tools/regex-tester"
        />
      </Helmet>

      <div className="w-full max-w-6xl mx-auto px-4 py-8 lg:py-10">
        <header className="mb-6 lg:mb-8">
          <h1 className="text-2xl md:text-3xl
 font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Regex Tester &amp; Debugger
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            See exactly what your regular expression matches in real text. Inspect capture groups, flags, and edge
            cases — everything runs entirely in your browser, never uploaded.
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            No sign-up, no tracking, no servers. Paste sensitive logs or drafts safely — all matching happens locally.
          </p>
        </header>

        <section className="mb-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white/70 dark:bg-slate-900/60 shadow-sm">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Pattern &amp; flags
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Paste a regex pattern, choose flags, and see matches update instantly as you type.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-1 md:mt-0">
              <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 px-2 py-1 text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-medium mr-1">Presets:</span>
                <select
                  className="bg-transparent text-xs outline-none border-none focus:ring-0 px-1"
                  value={selectedPresetId ?? ""}
                  onChange={(e) => handlePresetSelect(e.target.value)}
                >
                  <option value="">Choose example…</option>
                  {PRESETS.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Reset all
              </button>
            </div>
          </div>

          <div className="px-4 py-3 space-y-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-200 md:w-24 shrink-0">
                Regex pattern
              </label>
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="text"
                  spellCheck={false}
                  value={pattern}
                  onChange={(e) => handlePatternChange(e.target.value)}
                  onPaste={handlePatternPaste}
                  placeholder="e.g. \\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b"
                  className={`w-full rounded-lg border px-3 py-1.5 text-sm font-mono tracking-tight bg-white dark:bg-slate-950/80 text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-sky-500 ${
                    error
                      ? "border-red-300 dark:border-red-500/70"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  <div className="flex flex-wrap gap-1">
                    {(["g", "i", "m", "s", "u", "y"] as (keyof RegexFlags)[]).map(
                      (flag) => (
                        <button
                          key={flag}
                          type="button"
                          onClick={() => handleToggleFlag(flag)}
                          className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                            flags[flag]
                              ? "border-sky-500 bg-sky-50 text-sky-700 dark:border-sky-400 dark:bg-sky-900/40 dark:text-sky-200"
                              : "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                          }`}
                        >
                          {flag}
                        </button>
                      ),
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(pattern)}
                      className="inline-flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Copy regex
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(`/${pattern}/${flagsToString(flags)}`)
                      }
                      className="inline-flex items-center rounded-md border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Copy /regex/flags
                    </button>
                  </div>
                </div>
                {flagsDescription && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {flagsDescription}
                  </p>
                )}
                {error && (
                  <div className="mt-1 rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] text-red-800 dark:border-red-500/70 dark:bg-red-950/60 dark:text-red-100">
                    <p className="font-medium">This regex cannot be compiled.</p>
                    <p className="mt-0.5">{error}</p>
                    <p className="mt-0.5">
                      Check for unmatched parentheses, stray brackets, missing escapes, or an invalid range.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 py-4 grid gap-4 md:grid-cols-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Test text
                </label>
                <button
                  type="button"
                  onClick={() => setText("")}
                  className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              </div>
              <textarea
                spellCheck={false}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste sample text, logs, drafts, or responses here. Matches will be highlighted in the preview."
                rows={10}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/80 px-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-sky-500 resize-y min-h-[160px]"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                All matching runs in your browser. Your text is never uploaded or logged.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Highlighted preview
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {matches.length === 0
                    ? "No matches yet."
                    : `${matches.length} match${matches.length === 1 ? "" : "es"} in this text`}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/70 px-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-50 overflow-auto max-h-[280px] whitespace-pre-wrap">
                {text ? (
                  <HighlightedText
                    text={text}
                    matches={matches}
                    selectedMatchIndex={selectedMatchIndex}
                    onSelectMatch={setSelectedMatchIndex}
                  />
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Start typing or paste sample text to see inline highlights for each match.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 py-3 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-2">
              <div>
                <h3 className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Match summary
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {summarySentence}
                </p>
              </div>
              <div className="mt-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/70">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                    Matches
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {matches.length} total
                  </p>
                </div>
                <div className="max-h-[220px] overflow-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {matches.length === 0 ? (
                    <div className="px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400">
                      No matches to show yet. Try a broader pattern or a different sample text.
                    </div>
                  ) : (
                    matches.map((m) => (
                      <button
                        key={m.index}
                        type="button"
                        onClick={() => setSelectedMatchIndex(m.index)}
                        className={`w-full text-left px-3 py-2 text-[11px] ${
                          selectedMatchIndex === m.index
                            ? "bg-sky-50/80 dark:bg-sky-900/40 text-sky-900 dark:text-sky-50"
                            : "hover:bg-slate-100/70 dark:hover:bg-slate-900/70 text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium">
                            Match {m.index + 1}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {m.start}–{m.end} · {m.length} chars
                          </span>
                        </div>
                        <div className="mt-0.5 truncate font-mono">
                          {m.text || (
                            <span className="italic text-slate-400">
                              Zero-length match
                            </span>
                          )}
                        </div>
                        {m.groups.length > 0 && (
                          <div className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                            {m.groups.length} capture group
                            {m.groups.length === 1 ? "" : "s"}
                          </div>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Match inspector
                </h3>
                {selectedMatch && (
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedMatch.text)}
                    className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    Copy match
                  </button>
                )}
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/80 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 min-h-[140px]">
                {selectedMatch ? (
                  <>
                    <p className="text-[11px] font-medium">
                      Match {selectedMatch.index + 1}
                    </p>
                    <p className="mt-1 font-mono text-[11px] break-words">
                      {selectedMatch.text || (
                        <span className="italic text-slate-400">
                          Zero-length match
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      Position {selectedMatch.start}–{selectedMatch.end} ·{" "}
                      {selectedMatch.length} character
                      {selectedMatch.length === 1 ? "" : "s"}
                      {selectedMatch.isZeroLength && " · zero-length"}
                    </p>
                    {selectedMatch.groups.length > 0 && (
                      <div className="mt-2">
                        <p className="text-[11px] font-medium mb-1">
                          Capture groups
                        </p>
                        <div className="space-y-1">
                          {selectedMatch.groups.map((value, idx) => (
                            <div
                              key={idx}
                              className="flex items-start justify-between gap-2 rounded-md bg-slate-50 dark:bg-slate-900/80 px-2 py-1"
                            >
                              <div>
                                <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                                  Group {idx + 1}
                                </p>
                                <p className="text-[11px] font-mono break-words text-slate-700 dark:text-slate-50">
                                  {value ?? (
                                    <span className="italic text-slate-400">
                                      Did not match
                                    </span>
                                  )}
                                </p>
                              </div>
                              {value && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(value)}
                                  className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                >
                                  Copy
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedMatch.namedGroups &&
                      Object.keys(selectedMatch.namedGroups).length > 0 && (
                        <div className="mt-2">
                          <p className="text-[11px] font-medium mb-1">
                            Named groups
                          </p>
                          <div className="space-y-1">
                            {Object.entries(
                              selectedMatch.namedGroups,
                            ).map(([name, value]) => (
                              <div
                                key={name}
                                className="flex items-start justify-between gap-2 rounded-md bg-slate-50 dark:bg-slate-900/80 px-2 py-1"
                              >
                                <div>
                                  <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                                    {name}
                                  </p>
                                  <p className="text-[11px] font-mono break-words text-slate-700 dark:text-slate-50">
                                    {value ?? (
                                      <span className="italic text-slate-400">
                                        Did not match
                                      </span>
                                    )}
                                  </p>
                                </div>
                                {value && (
                                  <button
                                    type="button"
                                    onClick={() => handleCopy(value)}
                                    className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                  >
                                    Copy
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    When there are matches, click one in the list to see its full text, position, and capture groups
                    here.
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Regex explanation
                </h3>
                <button
                  type="button"
                  onClick={() => setShowExplain((prev) => !prev)}
                  className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {showExplain ? "Hide" : "Show"}
                </button>
              </div>
              {showExplain && (
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/80 px-3 py-2 text-[11px] text-slate-700 dark:text-slate-200 min-h-[140px]">
                  {pattern ? (
                    <RegexExplain pattern={pattern} flags={flags} />
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">
                      Start with a simple pattern like{" "}
                      <span className="font-mono">\\d+</span> or{" "}
                      <span className="font-mono">^https?</span>, then add anchors, groups, and character classes as
                      you go. This panel gives you a plain-language overview of the main pieces — it does not replace
                      full docs, but it should help you debug faster.
                    </p>
                  )}
                </div>
              )}
              <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/80 px-3 py-2 text-[11px] text-slate-500 dark:text-slate-400">
                <p className="font-medium text-slate-700 dark:text-slate-200">
                  Privacy &amp; engine notes
                </p>
                <p className="mt-1">
                  All matching uses your browser’s JavaScript RegExp engine. Some patterns may behave differently in
                  other regex engines (PCRE, Python, .NET), especially around lookbehinds and Unicode.
                </p>
                <p className="mt-1">
                  EverydayUtils never uploads your text, patterns, or matches. Everything stays on this device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ / SEO content */}
        <section className="mt-8 mb-6">
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white/70 dark:bg-slate-900/60 shadow-sm px-4 py-4 md:px-6 md:py-5">
            <h2 className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Regex Tester FAQ
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/70 px-3 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Is this regex tester really private?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  Yes. This regex tester runs 100% in your browser — there are no API calls, accounts, or tracking
                  scripts. Your regex patterns, sample text, and results never leave your device, which makes it safe
                  for production logs, customer data, and internal documents.
                </p>
              </div>

              <div className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/70 px-3 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Which regex engine does this use?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  The tool uses the built-in JavaScript <span className="font-mono">RegExp</span> engine in your
                  browser. That means behavior exactly matches what you would see in frontend JavaScript, many Node.js
                  services, and browser-based tools — including support for flags like{" "}
                  <span className="font-mono">g</span>, <span className="font-mono">i</span>,{" "}
                  <span className="font-mono">m</span>, and <span className="font-mono">s</span>.
                </p>
              </div>

              <div className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/70 px-3 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Can I use this to debug capture groups?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  Yes. Every match shows its index, length, and all capture groups, including named groups where
                  available. Click a match to inspect its groups, copy values, and verify that your pattern is capturing
                  exactly what you expect.
                </p>
              </div>

              <div className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/70 px-3 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  How is this different from other online regex testers?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  Most online regex testers push your text to a server and show raw matches in a noisy UI. EverydayUtils
                  focuses on fast, readable debugging: inline highlights, a clear match inspector, short explanations of
                  the main regex pieces, and a strict privacy-first approach — no ads, no accounts, no distraction.
                </p>
              </div>

              <div className="rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/70 px-3 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Who is this regex tool for?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  This tool is built for developers, QA testers, writers, and analysts who work with real-world text.
                  Use it to check validation rules, clean up exports, debug logs, or quickly prototype patterns before
                  shipping them into code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related tools from global relatedToolsMap */}
        <RelatedToolsBlock currentPath="/regex-tester" />
      </div>
    </>
  );
}

type HighlightedTextProps = {
  text: string;
  matches: RegexMatch[];
  selectedMatchIndex: number | null;
  onSelectMatch: (index: number) => void;
};

function HighlightedText({
  text,
  matches,
  selectedMatchIndex,
  onSelectMatch,
}: HighlightedTextProps) {
  if (!matches.length) {
    return <>{text}</>;
  }

  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((m, idx) => {
    if (m.start > lastIndex) {
      segments.push(
        <span key={`plain-${idx}-${lastIndex}`} className="whitespace-pre-wrap">
          {text.slice(lastIndex, m.start)}
        </span>,
      );
    }
    const isSelected = selectedMatchIndex === m.index;
    segments.push(
      <button
        key={`match-${idx}-${m.index}`}
        type="button"
        onClick={() => onSelectMatch(m.index)}
        className={`whitespace-pre-wrap rounded px-0.5 ${
          isSelected
            ? "bg-sky-500/30 text-slate-900 dark:text-slate-50 border border-sky-500/60"
            : "bg-amber-200/60 dark:bg-amber-500/40 text-slate-900 dark:text-slate-50 border border-amber-300/60 dark:border-amber-400/60"
        }`}
      >
        {m.text || (
          <span className="italic text-slate-700 dark:text-slate-100">∅</span>
        )}
      </button>,
    );
    lastIndex = m.end;
  });

  if (lastIndex < text.length) {
    segments.push(
      <span key={`plain-final-${lastIndex}`} className="whitespace-pre-wrap">
        {text.slice(lastIndex)}
      </span>,
    );
  }

  return <>{segments}</>;
}

type RegexExplainProps = {
  pattern: string;
  flags: RegexFlags;
};

function RegexExplain({ pattern, flags }: RegexExplainProps) {
  const hasStartAnchor = pattern.startsWith("^");
  const hasEndAnchor = pattern.endsWith("$");
  const hasDigitClass = /\\d/.test(pattern);
  const hasWordClass = /\\w/.test(pattern);
  const hasWhitespaceClass = /\\s/.test(pattern);
  const hasGroups = /\((?!\?:)/.test(pattern);
  const hasNonCapturing = /\(\?:/.test(pattern);
  const hasAlternation = /\|/.test(pattern);
  const hasQuantifier = /[*+?{]/.test(pattern);
  const hasLookahead = /\(\?[=!]/.test(pattern);
  const hasLookbehind = /\(\?<[=!]/.test(pattern);

  return (
    <div className="space-y-1">
      <p className="text-[11px]">
        <span className="font-medium">Pattern:</span>{" "}
        <span className="font-mono break-words">{pattern}</span>
      </p>
      <p className="text-[11px]">
        <span className="font-medium">Flags:</span>{" "}
        <span className="font-mono">{`/${flagsToString(flags) || ""}`}</span>{" "}
        <span className="text-slate-500 dark:text-slate-400">
          ({describeFlags(flags) || "No special flags enabled"})
        </span>
      </p>
      <ul className="mt-1 space-y-0.5 list-disc list-inside">
        {hasStartAnchor && (
          <li className="text-[11px]">
            <span className="font-mono">^</span> anchors the match to the start of the line or string (depending on{" "}
            <span className="font-mono">m</span> flag).
          </li>
        )}
        {hasEndAnchor && (
          <li className="text-[11px]">
            <span className="font-mono">$</span> anchors the match to the end of the line or string.
          </li>
        )}
        {hasDigitClass && (
          <li className="text-[11px]">
            <span className="font-mono">\\d</span> matches any digit. Use{" "}
            <span className="font-mono">\\D</span> to match non-digits.
          </li>
        )}
        {hasWordClass && (
          <li className="text-[11px]">
            <span className="font-mono">\\w</span> matches “word” characters (letters, digits, underscore) in
            JavaScript regex.
          </li>
        )}
        {hasWhitespaceClass && (
          <li className="text-[11px]">
            <span className="font-mono">\\s</span> matches whitespace (spaces, tabs, newlines). Use{" "}
            <span className="font-mono">\\S</span> for non-whitespace.
          </li>
        )}
        {hasGroups && (
          <li className="text-[11px]">
            Parentheses <span className="font-mono">( )</span> create capture groups. You can see each group’s value in
            the inspector.
          </li>
        )}
        {hasNonCapturing && (
          <li className="text-[11px]">
            <span className="font-mono">(?:...)</span> defines a non-capturing group — it groups tokens without storing
            the match.
          </li>
        )}
        {hasAlternation && (
          <li className="text-[11px]">
            <span className="font-mono">|</span> is alternation (OR). The engine will try the left side before the
            right side.
          </li>
        )}
        {hasQuantifier && (
          <li className="text-[11px]">
            Quantifiers like <span className="font-mono">*</span>,{" "}
            <span className="font-mono">+</span>, <span className="font-mono">?</span>, and{" "}
            <span className="font-mono">{`{n,m}`}</span> control how many times a token repeats. Add{" "}
            <span className="font-mono">?</span> after them to make them lazy.
          </li>
        )}
        {hasLookahead && (
          <li className="text-[11px]">
            Lookaheads (<span className="font-mono">(?=...)</span> and{" "}
            <span className="font-mono">(?!...)</span>) match based on what follows, without consuming characters.
          </li>
        )}
        {hasLookbehind && (
          <li className="text-[11px]">
            Lookbehinds (<span className="font-mono">(?&lt;=...)</span> and{" "}
            <span className="font-mono">(?&lt;!...)</span>) match based on what comes before. Not all JavaScript
            environments support every lookbehind pattern.
          </li>
        )}
        {!hasStartAnchor &&
          !hasEndAnchor &&
          !hasDigitClass &&
          !hasWordClass &&
          !hasWhitespaceClass &&
          !hasGroups &&
          !hasNonCapturing &&
          !hasAlternation &&
          !hasQuantifier &&
          !hasLookahead &&
          !hasLookbehind && (
            <li className="text-[11px] text-slate-500 dark:text-slate-400">
              This pattern does not use anchors, character classes, or groups that need extra explanation. Use the
              highlights and inspector to see exactly what it matches.
            </li>
          )}
      </ul>
    </div>
  );
}
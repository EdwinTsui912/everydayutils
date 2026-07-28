import { useState, useEffect, useCallback } from 'react';
import { Clock, Copy, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';


type TimestampUnit = 'seconds' | 'milliseconds';


const TIMEZONES = [
  'UTC',
  'Local',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Hong_Kong',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Australia/Sydney',
];


const FAQ_ITEMS = [
  {
    q: "What's the difference between Unix timestamp seconds and milliseconds?",
    a: "Seconds count elapsed time since the epoch in whole seconds; milliseconds multiply that by 1,000 for finer precision. Most Unix/Linux systems and databases use seconds, while JavaScript's Date.now() defaults to milliseconds — mixing the two up is the most common timestamp bug.",
  },
  {
    q: 'Can you convert dates before 1970 with a Unix timestamp?',
    a: 'Yes — negative Unix timestamps represent dates before the January 1, 1970 epoch, and this converter fully supports them in both directions.',
  },
  {
    q: 'Why does my date show an unusual timezone offset for very old dates?',
    a: 'Dates before global time zone standardization (pre-1900s) use historical Local Mean Time rather than a modern fixed offset. This is accurate browser behavior, not a bug.',
  },
  {
    q: 'Why was my date rejected as invalid?',
    a: 'The tool checks for real calendar dates, so inputs like February 30 or February 29 in a non-leap year are rejected with a clear error. This prevents silent miscalculations that could shift your result by a day or more without warning.',
  },
  {
    q: 'Does this tool store or send my data anywhere?',
    a: 'No. All conversion happens locally in your browser using JavaScript, and no timestamps or dates are ever transmitted to a server, logged, or stored.',
  },
  {
    q: "What does 'unusually far from today' mean when I see that warning?",
    a: "This warning appears when your converted date falls hundreds or thousands of years in the past or future, which usually means seconds and milliseconds were mixed up. It's a safety check, not an error.",
  },
];


function detectUnit(value: string): TimestampUnit {
  const digits = value.replace(/[^0-9]/g, '').length;
  return digits >= 13 ? 'milliseconds' : 'seconds';
}


function getRelativeTime(date: Date): string {
  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const absSec = Math.abs(diffSec);
  const isPast = diffSec < 0;


  const YEAR_SEC = 365.25 * 24 * 60 * 60;
  const MONTH_SEC = YEAR_SEC / 12;
  const WEEK_SEC = 7 * 24 * 60 * 60;
  const DAY_SEC = 24 * 60 * 60;
  const HOUR_SEC = 60 * 60;
  const MINUTE_SEC = 60;


  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });


  let value: number;
  let unit: Intl.RelativeTimeFormatUnit;


  if (absSec >= YEAR_SEC * 0.96) {
    value = Math.round(absSec / YEAR_SEC);
    unit = 'year';
  } else if (absSec >= MONTH_SEC * 0.96) {
    value = Math.round(absSec / MONTH_SEC);
    unit = 'month';
  } else if (absSec >= WEEK_SEC) {
    value = Math.round(absSec / WEEK_SEC);
    unit = 'week';
  } else if (absSec >= DAY_SEC) {
    value = Math.round(absSec / DAY_SEC);
    unit = 'day';
  } else if (absSec >= HOUR_SEC) {
    value = Math.round(absSec / HOUR_SEC);
    unit = 'hour';
  } else if (absSec >= MINUTE_SEC) {
    value = Math.round(absSec / MINUTE_SEC);
    unit = 'minute';
  } else {
    value = absSec;
    unit = 'second';
  }


  return rtf.format(isPast ? -value : value, unit);
}


function formatInTimezone(date: Date, timezone: string): string {
  try {
    const tz = timezone === 'Local' ? undefined : timezone;
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return 'Invalid timezone';
  }
}


function parseStrictDate(input: string): Date | null {
  const parsed = new Date(input);
  if (isNaN(parsed.getTime())) return null;


  // Guard against silent rollover (e.g. "Feb 30" -> "Mar 1")
  const numericMatch = input.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (numericMatch) {
    const [, y, m, d] = numericMatch;
    if (
      parsed.getFullYear() !== parseInt(y, 10) ||
      parsed.getMonth() + 1 !== parseInt(m, 10) ||
      parsed.getDate() !== parseInt(d, 10)
    ) {
      return null;
    }
  }


  const namedMonthMatch = input.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/);
  if (namedMonthMatch) {
    const [, , d, y] = namedMonthMatch;
    if (parsed.getFullYear() !== parseInt(y, 10) || parsed.getDate() !== parseInt(d, 10)) {
      return null;
    }
  }


  return parsed;
}


function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);


  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [text]);


  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg text-gray-400 hover:text-brand-500 hover:bg-brand-500/10 transition-colors"
      aria-label="Copy to clipboard"
      type="button"
    >
      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
    </button>
  );
}


function OutputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="min-w-0 flex-1">
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</div>
        <div className="text-sm font-mono text-gray-800 dark:text-gray-200 truncate">{value}</div>
      </div>
      <CopyButton text={value} />
    </div>
  );
}


export default function TimestampConverterPage() {
  const [timestampInput, setTimestampInput] = useState('');
  const [unit, setUnit] = useState<TimestampUnit>('seconds');
  const [autoUnit, setAutoUnit] = useState(true);
  const [dateInput, setDateInput] = useState('');
  const [pickerInput, setPickerInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [timezone, setTimezone] = useState('Local');
  const [timestampError, setTimestampError] = useState('');
  const [dateError, setDateError] = useState('');
  const [rangeWarning, setRangeWarning] = useState('');


  const [convertedFromTimestamp, setConvertedFromTimestamp] = useState<Date | null>(null);
  const [convertedFromDate, setConvertedFromDate] = useState<{ seconds: string; milliseconds: string } | null>(null);


  useEffect(() => {
    if (!timestampInput.trim()) {
      setConvertedFromTimestamp(null);
      setTimestampError('');
      setRangeWarning('');
      return;
    }


    const cleaned = timestampInput.trim().replace(/,/g, '');
    if (!/^-?\d+$/.test(cleaned)) {
      setTimestampError('Timestamp must be a whole number');
      setConvertedFromTimestamp(null);
      setRangeWarning('');
      return;
    }


    const effectiveUnit = autoUnit ? detectUnit(cleaned) : unit;
    if (autoUnit) setUnit(effectiveUnit);


    const num = parseInt(cleaned, 10);
    const ms = effectiveUnit === 'seconds' ? num * 1000 : num;
    const date = new Date(ms);


    if (isNaN(date.getTime()) || date.getFullYear() > 9999 || date.getFullYear() < -270000) {
      setTimestampError('Timestamp is out of valid range');
      setConvertedFromTimestamp(null);
      setRangeWarning('');
      return;
    }


    setTimestampError('');
    setConvertedFromTimestamp(date);


    if (date.getFullYear() < 1900 || date.getFullYear() > 2200) {
      setRangeWarning('This date is unusually far from today — double check you selected the right unit (seconds vs milliseconds).');
    } else {
      setRangeWarning('');
    }
  }, [timestampInput, autoUnit, unit]);


  useEffect(() => {
    const source = pickerInput || dateInput;
    if (!source.trim()) {
      setConvertedFromDate(null);
      setDateError('');
      return;
    }


    const parsed = parseStrictDate(source);
    if (!parsed) {
      setDateError('Enter a valid date (e.g. 2026-07-27 10:08 or July 27, 2026)');
      setConvertedFromDate(null);
      return;
    }


    setDateError('');
    setConvertedFromDate({
      seconds: Math.floor(parsed.getTime() / 1000).toString(),
      milliseconds: parsed.getTime().toString(),
    });
  }, [dateInput, pickerInput]);


  const handleNow = () => {
    const now = new Date();
    setTimestampInput(Math.floor(now.getTime() / 1000).toString());
    setAutoUnit(true);
  };


  const handleReset = () => {
    setTimestampInput('');
    setDateInput('');
    setPickerInput('');
    setTimestampError('');
    setDateError('');
    setRangeWarning('');
  };


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="Free Unix Timestamp Converter — Epoch to Date & Back (2026)"
        description="Convert Unix timestamps to human-readable dates and back, instantly. Auto-detects seconds vs milliseconds, supports timezones, and runs 100% in your browser."
        keywords="unix timestamp converter, epoch converter, timestamp to date, convert unix time, epoch time converter"
        url="https://everydayutils.com/timestamp-converter"
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
            <Clock size={20} />
          </div>
          <span className="label">Developer Tools</span>
        </div>
        <h1 className="page-title mb-2">Timestamp Converter</h1>
        <p className="page-subtitle">
          Convert Unix timestamps to human-readable dates and back — instantly, privately, no sign-up.
        </p>
      </div>


      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button onClick={handleNow} className="btn-primary inline-flex items-center gap-2" type="button">
          <Clock size={16} />
          Use Current Time
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors"
          type="button"
        >
          <RotateCcw size={14} />
          Reset
        </button>


        <div className="flex items-center gap-2 ml-auto">
          <label className="text-xs text-gray-400 dark:text-gray-500">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1.5 text-gray-700 dark:text-gray-200"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Timestamp → Date
          </h2>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="e.g. 1753592880"
              aria-describedby={timestampError ? 'timestamp-error' : undefined}
              className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-mono text-gray-800 dark:text-gray-200"
            />
            <label className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
              <input
                type="checkbox"
                checked={autoUnit}
                onChange={(e) => setAutoUnit(e.target.checked)}
                className="rounded"
              />
              Auto-detect
            </label>
          </div>


          {!autoUnit && (
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setUnit('seconds')}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  unit === 'seconds' ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                Seconds
              </button>
              <button
                type="button"
                onClick={() => setUnit('milliseconds')}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  unit === 'milliseconds' ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                Milliseconds
              </button>
            </div>
          )}


          {timestampError && (
            <p id="timestamp-error" role="alert" className="text-xs text-red-500 mb-3">
              {timestampError}
            </p>
          )}


          {rangeWarning && !timestampError && (
            <p className="flex items-start gap-1.5 text-xs text-amber-500 mb-3">
              <AlertTriangle size={13} className="mt-0.5 flex-shrink-0" />
              {rangeWarning}
            </p>
          )}


          {convertedFromTimestamp && !timestampError && (
            <div className="mt-2">
              <OutputRow label={`Date (${timezone})`} value={formatInTimezone(convertedFromTimestamp, timezone)} />
              <OutputRow label="ISO 8601" value={convertedFromTimestamp.toISOString()} />
              <OutputRow label="RFC 2822" value={convertedFromTimestamp.toUTCString()} />
              <OutputRow label="Relative" value={getRelativeTime(convertedFromTimestamp)} />
            </div>
          )}
        </div>


        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Date → Timestamp
          </h2>


          <label className="block text-xs text-gray-400 dark:text-gray-500 mb-1">
            Pick a date and time
          </label>
          <input
            type="datetime-local"
            value={pickerInput}
            onChange={(e) => {
              setPickerInput(e.target.value);
              if (e.target.value) setDateInput('');
            }}
            aria-describedby={dateError ? 'date-error' : undefined}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 mb-2"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            Interpreted in your local timezone.
          </p>


          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-xs text-brand-500 hover:underline mb-3"
          >
            {showAdvanced ? 'Hide advanced text input' : 'Or type a date manually'}
          </button>


          {showAdvanced && (
            <>
              <input
                type="text"
                value={dateInput}
                onChange={(e) => {
                  setDateInput(e.target.value);
                  if (e.target.value) setPickerInput('');
                }}
                placeholder="e.g. 2026-07-27 10:08 or July 27, 2026"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm font-mono text-gray-800 dark:text-gray-200 mb-2"
              />
              <p className="flex items-start gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-3">
                <AlertTriangle size={13} className="mt-0.5 flex-shrink-0" />
                Use YYYY-MM-DD or a named month (e.g. "July 27, 2026") to avoid ambiguity —
                slash-formatted dates (07/08/2026) may be misinterpreted.
              </p>
            </>
          )}


          {dateError && (
            <p id="date-error" role="alert" className="text-xs text-red-500 mb-3">
              {dateError}
            </p>
          )}


          {convertedFromDate && !dateError && (
            <div className="mt-2">
              <OutputRow label="Unix Timestamp (seconds)" value={convertedFromDate.seconds} />
              <OutputRow label="Unix Timestamp (milliseconds)" value={convertedFromDate.milliseconds} />
            </div>
          )}
        </div>
      </div>


      <div className="mt-12 prose prose-zinc dark:prose-invert max-w-none">
        <h2 className="font-semibold mt-8 mb-2">What Is a Unix Timestamp?</h2>
        <p>
          A Unix timestamp (also called epoch time) counts the number of seconds that have
          elapsed since January 1, 1970, 00:00:00 UTC. It's the standard way computers track
          time internally, since it's a single number rather than a formatted date string.
        </p>


        <h2 className="font-semibold mt-8 mb-2">Seconds vs Milliseconds</h2>
        <p>
          Unix timestamps in seconds are typically 10 digits (e.g. 1753592880), while
          JavaScript and many APIs use milliseconds, which are 13 digits (e.g. 1753592880000).
          This tool automatically detects which format you're using based on digit length, but
          you can manually override it if your data is ambiguous.
        </p>


        <h2 className="font-semibold mt-8 mb-2">Common Timestamp Debugging Scenarios</h2>
        <p>
          Developers most often reach for a timestamp converter when reading server logs,
          inspecting API response payloads, debugging JWT expiration (exp) claims, or checking
          database record creation times stored as epoch values. Because this tool runs
          entirely in your browser, none of that data — including production timestamps — is
          ever sent to a server.
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
  );
}
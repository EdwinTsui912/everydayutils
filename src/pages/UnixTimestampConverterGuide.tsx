import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';


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


const OUTPUT_FORMATS = [
  { format: 'Local date/time', example: 'July 27, 2026 at 09:09:34 PM', use: 'Human-readable display' },
  { format: 'ISO 8601', example: '2026-07-27T13:09:34.000Z', use: 'APIs, databases, JavaScript Date' },
  { format: 'RFC 2822', example: 'Mon, 27 Jul 2026 13:09:34 GMT', use: 'Email headers, older HTTP standards' },
  { format: 'Relative', example: '"2 years ago" / "in 3 days"', use: 'Social feeds, activity logs' },
  { format: 'Unix seconds', example: '1785157774', use: 'Most backend/database timestamps' },
  { format: 'Unix milliseconds', example: '1785157774000', use: 'JavaScript Date.now(), frontend timing' },
];


const USE_CASES = [
  'Checking if a JWT token expired timestamp has already passed',
  'Debugging API responses that return created_at or expires_at as raw integers',
  "Converting a scheduled event's timestamp into your local timezone for a meeting",
  'Reverse-converting a specific date into a timestamp for a database query or test fixture',
];


export default function UnixTimestampConverterGuide() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <SEO
        title="Convert Unix Timestamp to Date Online (Free, No Sign-Up) — 2026 Guide"
        description="Convert Unix timestamp to date and back for free — no sign-up, 100% private, browser-based. Supports epoch seconds, milliseconds, ISO 8601, and timezone conversion."
        keywords="unix timestamp converter, convert unix timestamp to date, epoch time converter, timestamp to date online, unix timestamp seconds vs milliseconds"
        url="https://everydayutils.com/blog/unix-timestamp-converter-guide"
      />


      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Convert Unix Timestamp to Date Online (Free, No Sign-Up)',
            description:
              'Convert Unix timestamp to date and back for free — no sign-up, 100% private, browser-based. Supports epoch seconds, milliseconds, ISO 8601, and timezone conversion.',
            url: 'https://everydayutils.com/blog/unix-timestamp-converter-guide',
            datePublished: '2026-07-28',
            dateModified: '2026-07-28',
            author: { '@type': 'Organization', name: 'EverydayUtils' },
            publisher: { '@type': 'Organization', name: 'EverydayUtils' },
          })}
        </script>
      </Helmet>


      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <Calendar size={13} />
          <span>July 28, 2026</span>
          <span>·</span>
          <span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-tight mb-4">
          Convert Unix Timestamp to Date Online (Free, No Sign-Up)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          A practical guide to converting Unix timestamps to human-readable dates and back —
          covering seconds vs milliseconds, timezones, and common debugging scenarios.
        </p>
      </div>


      {/* CTA */}
      <Link
        to="/timestamp-converter"
        className="inline-flex items-center gap-2 mb-12 px-4 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
      >
        <Clock size={16} />
        Try the Timestamp Converter
        <ArrowRight size={15} />
      </Link>


      {/* Body */}
      <div className="space-y-12">
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            What Is a Unix Timestamp?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            A Unix timestamp is the number of seconds (or milliseconds) elapsed since January 1,
            1970, at 00:00:00 UTC — known as the "Unix epoch." Nearly every programming language,
            database, and API uses this format internally because it's compact and easy to sort
            or compare, but a raw number like{' '}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono">
              1785157774
            </code>{' '}
            is meaningless to a human reading a log file or API response.
          </p>
        </section>


        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            When You Need to Convert Epoch Time to a Readable Date
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
            Developers run into raw timestamps constantly in server logs, JWT tokens, database
            records, and third-party API payloads, and manually calculating what a number like{' '}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono">
              1753617627
            </code>{' '}
            means isn't practical. Common scenarios include:
          </p>
          <ul className="space-y-3">
            {USE_CASES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>


        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            How to Convert Unix Timestamp to Date (Step by Step)
          </h2>
          <ol className="space-y-3 list-decimal list-outside pl-5">
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed pl-1">
              Paste a Unix timestamp (seconds or milliseconds) to get the human-readable date, or
              type a date like "July 27, 2026" or "2026-07-27 10:08" to get the timestamp back.
            </li>
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed pl-1">
              The tool auto-detects whether your input is a timestamp or a date — no need to
              specify which.
            </li>
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed pl-1">
              Results show Local time, ISO 8601, RFC 2822, and a relative time string (e.g.,
              "2 years ago") side by side.
            </li>
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed pl-1">
              Use the built-in date picker for a faster, error-free way to select dates without
              typing.
            </li>
          </ol>
        </section>


        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Supported Output Formats
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/60">
                  <th className="text-left font-semibold text-gray-700 dark:text-gray-200 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                    Format
                  </th>
                  <th className="text-left font-semibold text-gray-700 dark:text-gray-200 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                    Example Output
                  </th>
                  <th className="text-left font-semibold text-gray-700 dark:text-gray-200 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                    Typical Use Case
                  </th>
                </tr>
              </thead>
              <tbody>
                {OUTPUT_FORMATS.map((row, idx) => (
                  <tr
                    key={row.format}
                    className={idx !== OUTPUT_FORMATS.length - 1 ? 'border-b border-gray-100 dark:border-gray-800/60' : ''}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {row.format}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {row.example}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>


        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Built-In Safeguards
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The converter validates input carefully so you don't get silently wrong results. It
            rejects impossible dates like February 30 or February 29 on a non-leap year with a
            clear error message, strips stray commas from pasted numbers, and flags unusually
            distant dates in case you accidentally entered milliseconds where seconds were
            expected. Negative timestamps (dates before 1970) are also fully supported for
            edge-case testing.
          </p>
        </section>


        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Unix Timestamp Converter vs. Google's Built-In Tool
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Google's quick timestamp conversion works for a single check but doesn't show ISO
            8601 and RFC 2822 side by side, doesn't handle milliseconds automatically, and won't
            validate malformed input. This tool runs entirely in your browser, so nothing is sent
            to a server — it's a private unix timestamp converter with no data collection, making
            it safe to paste sensitive production timestamps or internal IDs.
          </p>
        </section>


        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="card p-5">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {item.q}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>


      {/* Bottom CTA */}
      <div className="mt-14 p-6 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Ready to convert a timestamp?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Free, private, and instant — no sign-up required.
        </p>
        <Link
          to="/timestamp-converter"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          <Clock size={16} />
          Open Timestamp Converter
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Regex,
  CheckCircle,
  Shield,
  Type,
  Braces,
  ArrowRightLeft,
  GitCompare,
} from 'lucide-react';
import SEO from '../components/SEO';

const EMAIL_REGEX_EXAMPLE = '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i';

const relatedTools = [
  {
    title: 'Text Tools Suite',
    slug: '/text-tools',
    tag: 'Text Tools',
    blurb: 'Word count, sanitize, and case-convert text before or after you extract matches with regex.',
    icon: Type,
  },
  {
    title: 'JSON Formatter & Validator',
    slug: '/json-formatter',
    tag: 'Developer Tools',
    blurb: 'Pretty-print and validate payloads when your regex is part of an API or config workflow.',
    icon: Braces,
  },
  {
    title: 'URL Encoder / Decoder',
    slug: '/url-encoder',
    tag: 'Developer Tools',
    blurb: 'Encode query strings and decode messy URLs when patterns need to handle percent-encoding.',
    icon: ArrowRightLeft,
  },
  {
    title: 'Diff Checker',
    slug: '/writer-diff-checker',
    tag: 'Text & Code',
    blurb: 'Compare two versions of a file or draft after you’ve cleaned or rewritten matched text.',
    icon: GitCompare,
  },
];

const faqs = [
  {
    q: 'Can I safely paste real logs or drafts here?',
    a: 'Yes. The tester runs entirely in your browser. Your pattern and sample text are not sent to a server, and EverydayUtils does not log the content you paste for matching.',
  },
  {
    q: 'Which regex flavour does it use?',
    a: 'It uses the JavaScript RegExp engine in your browser—the same flavour you get in the console, Node (with the same engine constraints), and most front-end code.',
  },
  {
    q: 'Will it handle lookaheads, lookbehinds, and Unicode?',
    a: 'If your browser supports a feature, the tester will too. Lookaheads, lookbehinds, Unicode property escapes, and the u flag work when the engine supports them. If something isn’t supported, you’ll get a clear compilation error instead of a silent failure.',
  },
  {
    q: 'Why does it show multiple matches when I didn’t set g?',
    a: 'For display, the tool runs an internal pass that walks the string so you can see every match and group in one list. That doesn’t change the semantics of the pattern you wrote; it’s only so debugging isn’t limited to the first hit.',
  },
];

export default function RegexTesterBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="Regex Tester & Debugger — See Every Match and Capture Group | EverydayUtils"
        description="A free, private regex tester that shows live matches, capture groups, flags, and presets in your browser. Debug email, URL, log, and SEO patterns with no sign-up and no tracking."
        keywords="regex tester, regex debugger, online regex tester, javascript regex, capture groups, regex flags, free regex tool, private regex tester"
        url="https://www.everydayutils.com/blog/regex-tester-debugger"
      />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} /> Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Developer Tools</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Developer Tools
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} /> 8 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">August 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          The Regex Tester I Reach For When My Pattern Makes No Sense
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          A human guide to EverydayUtils’ Regex Tester &amp; Debugger — built to show you exactly what your
          regex matches in real text, with capture groups, flags, presets, and zero tracking.
        </p>
      </header>

      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex-shrink-0">
            <Regex size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              Try the Regex Tester &amp; Debugger
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Paste a pattern, toggle flags, and see live matches — nothing is ever sent to a server.
            </p>
          </div>
        </div>
        <Link to="/regex-tester" className="btn-primary text-sm flex-shrink-0">
          Open Regex Tester
        </Link>
      </div>

      <div className="space-y-10">
        <section>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            There’s a very specific kind of frustration that only regex can produce.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            You write what feels like a simple pattern — something like{' '}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono break-all">
              {EMAIL_REGEX_EXAMPLE}
            </code>{' '}
            — hit run, and either everything matches or nothing does. No middle ground. No clear explanation. Just a
            green check or a silent fail while you stare at the same three lines of sample text.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            After too many of those moments, I wanted a free Regex Tester &amp; Debugger that doesn’t stop at
            “compiled successfully.” It needed to show what the pattern actually matched, where, and which groups
            captured what — entirely in the browser, with no account and no tracking.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            When “Regex compiled” isn’t enough
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            The classic trap is the email-in-a-log problem. Your pattern works on one line. On the next line it fails
            for no obvious reason. On a third line it matches the address and three extra characters you didn’t want.
            Each fix breaks the previous case.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            A lot of online testers only show a single “match” badge. That might be fine for a toy example. It is not
            fine when you’re debugging production logs, form validation, or Search Console filters. You need visibility,
            not reassurance.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 font-semibold text-gray-800 dark:text-gray-200">
            Show me every match and what each group captured, line by line.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            That became the rule for this tool: don’t just say “it matches.” Explain where and how — positions, full
            match text, numbered groups, named groups, and even zero-length matches when they appear.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What this tester actually shows you
          </h2>
          <ul className="space-y-2 mb-4">
            {[
              'It compiles your pattern and surfaces readable errors — unmatched parentheses, invalid ranges, missing escapes — instead of a generic failure.',
              'It finds all matches in the sample text, not only the first one.',
              'For each match it records position, full text, numbered groups, named groups, and zero-length matches when they occur.',
              'On zero-length matches it nudges the engine forward so you don’t get stuck in a hidden loop while debugging.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The result is a click-through list of matches you can inspect, not a vague “yes, something matched
            somewhere.” When a pattern is almost right, that list is usually where the bug becomes obvious.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            You don’t have to start from an empty pattern
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Starting regex from scratch can feel like building with punctuation. Presets give you a working baseline
            so you can bend the pattern toward your real data instead of inventing syntax under pressure.
          </p>
          <ul className="space-y-2 mb-4">
            {[
              'Email extract — for addresses in plain text or logs',
              'URL finder — for http(s) links in mixed content',
              'Hashtag matcher — including multilingual tags such as #產品工具',
              'Date (YYYY-MM-DD) — for structured date strings in exports and filenames',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Each preset comes with sample text. Load one, replace the sample with a slice of your real input, and
            adjust flags or the pattern until the match list looks right. That is usually faster than staring at a
            blank pattern field.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Where this becomes useful in real work
          </h2>

          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Form and email validation that doesn’t hate users
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Overly strict email patterns reject valid addresses; overly loose ones accept nonsense. Testing against a
            small set of real examples — including plus-addressing, subdomains, and longer TLDs — is the only way to
            know which side you’re on before the form ships.
          </p>

          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Logs: turning a wall of text into structured data
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            When you’re skimming error dumps or access logs, a pattern with capture groups can pull IDs, paths, and
            status codes into a readable list. Seeing every match and group side by side beats scrolling and
            copy-pasting by hand.
          </p>

          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Cleaning up text before it hits other tools
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Sometimes the job is extract, then clean. After you confirm a pattern, you can take the matched text into
            the{' '}
            <Link to="/text-tools" className="text-brand-500 hover:underline">
              Text Tools Suite
            </Link>{' '}
            for counting or sanitizing, or keep the{' '}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono">
              /pattern/flags
            </code>{' '}
            form ready to paste into code.
          </p>

          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Regex for SEO and Search Console
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Filters for long-tail queries, brand terms, or transactional phrases are easy to get wrong in Google Search
            Console. Debugging the pattern on a paste of real queries first — then copying a confirmed expression —
            saves a lot of trial-and-error inside GSC itself.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            A quick peek under the hood
          </h2>
          <ul className="space-y-2 mb-4">
            {[
              'Flags are tracked as an object { g, i, m, s, u, y } and converted to a string when the RegExp is built.',
              'A /pattern/gi-style string can be parsed into pattern plus flags so you can paste expressions as you write them in code.',
              'Compilation sits in try/catch with friendly error messages instead of a blank failure.',
              'A separate RegExp with g ensured is used for walking the display list of matches.',
              'Zero-length matches advance lastIndex so the UI doesn’t spin forever on edge cases.',
              'Status copy stays plain: paste a regex, report a syntax error, or say how many matches were found.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            None of that requires a network call. Pattern, flags, and sample text stay on your device for the whole
            session.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Getting started in under a minute
          </h2>
          <ol className="space-y-2 list-decimal list-inside">
            <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Open the{' '}
              <Link to="/regex-tester" className="text-brand-500 hover:underline">
                Regex Tester
              </Link>{' '}
              and pick a preset that is close to your problem.
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Replace the sample text with a few lines of your real input.
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Tweak the pattern and toggle flags until the match list looks right.
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Inspect positions and capture groups on a couple of matches — that is where subtle bugs show up.
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Copy the working pattern (and flags) into your code, form validator, or Search Console filter.
            </li>
          </ol>
        </section>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Pattern, flags, and sample text stay in your
            browser. No account, no tracking, and no server-side processing of what you paste.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-5">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">You May Also Like</h2>
          <div className="space-y-3">
            {relatedTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  to={tool.slug}
                  className="card p-4 flex items-start gap-3 hover:border-brand-500/40 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/10 to-cyan-500/10 dark:from-brand-500/20 dark:to-cyan-500/20 flex items-center justify-center text-brand-500">
                      <Icon size={16} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-0.5">
                      {tool.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
                      {tool.blurb}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-10">
        <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-6 text-center">
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">
            Ready to see what your pattern actually matches?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Free, private, and 100% in your browser — no sign-up required.
          </p>
          <Link to="/regex-tester" className="btn-primary inline-flex items-center gap-2">
            Open Regex Tester
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
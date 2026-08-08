import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, ArrowRightLeft, CheckCircle, Shield } from 'lucide-react';
import SEO from '../components/SEO';


const features = [
  { label: 'Instant encode and decode', detail: 'Toggle between modes and see the result update automatically as you type, with no manual submit button needed.' },
  { label: 'Swap direction in one click', detail: "Made a mistake or want to reverse a result? The Swap button flips the mode and drops your output straight back in as input." },
  { label: 'Prettify for decoded query strings', detail: "When decoding, Prettify breaks the result onto new lines at each ?, &, and # so long query strings are actually readable." },
  { label: '"+" as space toggle', detail: 'Query strings sometimes encode spaces as + instead of %20. This decode-only option lets you convert those correctly instead of leaving literal plus signs in the output.' },
  { label: 'Clear error handling', detail: "Malformed percent-sequences during decoding show a specific error message instead of silently failing or crashing." },
  { label: '100% client-side & private', detail: "Everything runs through the browser's built-in encodeURIComponent and decodeURIComponent. Nothing is sent to a server." },
];


const faqs = [
  {
    q: 'What is the difference between encoding and decoding a URL?',
    a: 'Encoding converts characters that are unsafe in a URL — spaces, ampersands, slashes, and so on — into a %XX escape sequence. Decoding reverses that process, turning the escaped text back into readable characters.',
  },
  {
    q: "Why would I need to treat '+' as a space?",
    a: "Some systems, particularly older form submissions and query strings, encode spaces as a plus sign rather than %20. If you're decoding that kind of string and see literal plus signs where spaces should be, this toggle fixes it.",
  },
  {
    q: 'What does Prettify actually do?',
    a: "Prettify only applies to decoded output, and it inserts a line break before every question mark, ampersand, and hash symbol. It's meant for making long query strings with multiple parameters easier to scan, not for reformatting the encode side.",
  },
  {
    q: 'Why am I getting an error when I try to decode something?',
    a: "That happens when the input has a malformed percent-sequence — for example, a stray % that isn't followed by two valid hex digits. The tool surfaces a specific message rather than failing silently, so you know the input itself is broken.",
  },
  {
    q: 'Is this tool actually private?',
    a: "Yes. The encoding and decoding both run using the browser's native encodeURIComponent and decodeURIComponent functions. Nothing you type is sent anywhere — it never leaves the tab.",
  },
  {
    q: "Why is '!' encoded when JavaScript's own encodeURIComponent doesn't touch it?",
    a: "JavaScript's built-in encodeURIComponent intentionally leaves a handful of characters unescaped, including '!', even though some strict URI specs still treat it as reserved. This tool adds one extra step to convert any '!' into %21 after the standard encoding pass, so the output stays safe in contexts that are stricter than the browser default.",
  },
];


export default function URLEncoderBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="Free URL Encoder / Decoder — Fix Query Strings Instantly | EverydayUtils"
        description="Encode or decode URLs and query strings instantly with clear error messages, prettify formatting, and plus-as-space handling. 100% private and client-side."
        keywords="url encoder decoder, percent encoding tool, encode url online, decode url online, query string decoder"
        url="https://www.everydayutils.com/blog/free-url-encoder-decoder"
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
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">Developer Tools</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"><Clock size={11} /> 5 min read</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 23, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free URL Encoder / Decoder — Fix Broken Links and Query Strings Instantly
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Encode or decode URLs and query strings the moment you paste them in, with proper error messages when something's actually broken — all running privately in your browser.
        </p>
      </header>


      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white flex-shrink-0">
            <ArrowRightLeft size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/url-encoder" className="btn-primary text-sm flex-shrink-0">
          Open URL Encoder / Decoder
        </Link>
      </div>


      <div className="space-y-10">


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why URL Encoding Still Trips People Up</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            URLs can't contain spaces or many special characters directly, so browsers and servers rely on percent-encoding to represent them safely. That's straightforward in theory, but in practice it becomes a real source of bugs — a broken callback URL, an API parameter that silently drops half its value, or a query string that looks fine until you actually decode it and realize a plus sign was supposed to be a space.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Most of the time you don't need a deep explanation of percent-encoding rules — you just need to paste a string, see it converted correctly, and get an actual explanation when something's malformed instead of a blank result.
          </p>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">What This Tool Actually Does</h2>
          <ul className="space-y-3">
            {features.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-800 dark:text-gray-200 font-semibold">{item.label}</strong>{' '}
                  — {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">How I Actually Use It</h2>
          <ol className="space-y-4">
            {[
              'Paste the string into the input box — the result updates automatically after a brief pause, no button needed.',
              'Switch between Encode and Decode using the toggle at the top depending on which direction you need.',
              'If decoding a long query string, hit Prettify to break it onto separate lines at each ?, &, and # for readability.',
              'If a decoded result has stray plus signs where spaces should be, check "Treat + as space" to fix it.',
              'Click Copy Result to grab the output, or Swap to flip direction and continue working with what you just produced.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Link to="/url-encoder" className="btn-primary inline-flex items-center gap-2">
              Open URL Encoder / Decoder Now
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>


        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Encoding and decoding happen entirely in your browser using native JavaScript functions. Nothing you paste is ever sent to a server.
          </p>
        </div>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">Frequently Asked Questions</h2>
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
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Tools</h2>
          <div className="flex flex-col gap-2">
            <Link to="/blog/json-formatter-guide" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              The Best Free JSON Formatter in 2026
            </Link>
            <Link to="/base64" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              Base64 Encoder / Decoder
            </Link>
          </div>
        </section>


      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, ArrowRightLeft, Clock } from 'lucide-react';

export default function UrlEncoderBlogPost() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} />
          Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">URL Encoder Guide</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Developer Tools
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            6 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">June 27, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free URL Encoder &amp; Decoder Online — Encode &amp; Decode URLs Safely (2026)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          If you’ve ever pasted a URL with a space or special character and watched it break, you know how frustrating it can be.
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Whether you’re building APIs, debugging tracking links, or sharing WiFi passwords via QR codes, you need a reliable, private way to handle URL encoding.
        </p>
      </header>

      {/* Top CTA */}
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
          Open URL Encoder
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        {/* Why it matters */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why URL Encoding Matters
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            URLs follow strict rules. Characters like spaces, &, ?, #, and many others have special meanings and must be converted into percent-encoded format (e.g. space becomes %20) before they can be safely used in a web address.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Without proper encoding, your links break, API calls fail, and tracking parameters get corrupted. This tool makes the process fast, accurate, and completely private.
          </p>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Makes This Tool Different
          </h2>
          <ul className="space-y-3">
            {[
              'Real-time encoding and decoding as you type',
              'Support for + as space (important for form data and query strings)',
              'Prettify option — splits complex query strings into readable lines',
              'One-click copy to clipboard',
              '100% client-side — your data never leaves your device',
              'Works offline once the page loads',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* %20 vs + */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            %20 vs + — Why It Matters
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            In standard URLs, spaces are encoded as <code>%20</code>. In HTML form submissions and query strings, spaces are often represented as <code>+</code>.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
            Our tool includes a “Treat + as space” toggle so you get the correct result for your use case.
          </p>
        </section>

        {/* How to Use */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How to Use the Tool
          </h2>
          <ol className="space-y-3">
            {[
              'Paste your text or URL into the input box',
              'Choose Encode or Decode mode',
              'For query strings, enable "Treat + as space"',
              'Click Prettify to make long query strings readable',
              'Copy the result with one click',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-5">
            <Link to="/url-encoder" className="btn-primary inline-flex items-center gap-2 text-sm">
              <ArrowRightLeft size={14} />
              Open URL Encoder Now
              <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* Privacy */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Why Privacy Matters
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Many online encoding tools send your input to their servers. That means your API keys, tracking parameters, or sensitive data pass through someone else’s infrastructure.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            EverydayUtils runs everything locally in your browser. Once the page loads, you can even disconnect from the internet and the tool will still work.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: 'Is this URL encoder really free?',
                a: 'Yes. Completely free with no limits, no sign-up, and no premium version.',
              },
              {
                q: 'How private is it?',
                a: 'Extremely private. All processing happens locally in your browser. Your data is never sent to any server.',
              },
              {
                q: 'What’s the difference between %20 and +?',
                a: '%20 is the standard percent-encoded space. The + sign is a legacy convention used in form submissions. Our tool lets you choose which behavior you need.',
              },
              {
                q: 'Does it work with Chinese characters?',
                a: 'Yes. The tool fully supports UTF-8, including Chinese, Japanese, Korean, Arabic, and emoji.',
              },
              {
                q: 'Does it work offline?',
                a: 'Yes — once the page has loaded, it functions without any server connection.',
              },
            ].map((faq) => (
              <div key={faq.q} className="card p-5">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Tools</h2>
          <div className="flex flex-col gap-2">
            <Link to="/base64" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              Base64 Encoder / Decoder
            </Link>
            <Link to="/json-formatter" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              JSON Formatter &amp; Validator
            </Link>
            <Link to="/qr-generator" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              QR Code Generator
            </Link>
          </div>
        </section>

        <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 pt-6 leading-relaxed">
          EverydayUtils is built with one simple goal: create genuinely useful tools that respect your time and privacy.
        </p>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, ArrowRightLeft } from 'lucide-react';

export default function UrlEncoderBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

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
          <span className="text-xs text-gray-400 dark:text-gray-500">July 22, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free URL Encoder & Decoder Online — Instant, Private & Client-Side (2026)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Encode or decode URLs, query strings, and special characters instantly in your browser. 100% private, no sign-up, no tracking.
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
          Open URL Encoder / Decoder
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Do We Need URL Encoding?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            URLs can only contain certain characters. Spaces, question marks, ampersands, and many special characters must be converted (percent-encoded) so they don’t break the URL.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What This Tool Does
          </h2>
          <ul className="space-y-3">
            {[
              'Encode any text into safe URL format',
              'Decode encoded URLs back to readable text',
              'Handle + as space for query strings (common in forms)',
              'Prettify long URLs for easier reading',
              'Real-time conversion with error handling',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Privacy First
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Everything runs locally in your browser. No data is sent to any server — perfect for API keys, sensitive links, or private parameters.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is the difference between encodeURI and encodeURIComponent?',
                a: 'encodeURIComponent encodes everything (including / ? & =), while encodeURI keeps structural characters intact. This tool uses encodeURIComponent for individual parameter values.',
              },
              {
                q: 'Why replace ! with %21?',
                a: 'Although RFC allows ! in URLs, many systems expect it encoded. We force %21 for maximum compatibility.',
              },
              {
                q: 'Is it really free and private?',
                a: 'Yes. Completely free, no sign-up, no tracking, and all processing happens in your browser.',
              },
            ].map((item) => (
              <div key={item.q} className="card p-5">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.q}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-6 text-center">
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to encode or decode URLs?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Fast, private, and developer-friendly.
            </p>
            <Link to="/url-encoder" className="btn-primary inline-flex items-center gap-2">
              Open URL Encoder / Decoder Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
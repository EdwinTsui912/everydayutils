import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Type } from 'lucide-react';

export default function WordCounterGuideBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} />
          Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Text Tools Guide</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Productivity Tools
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            8 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 22, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          The Word Counter &amp; Text Sanitizer I Actually Use Every Day (Especially for Chinese + English)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Most free word counters break when you paste mixed English and Chinese text. I built this one because I got tired of fighting formatting issues in Hong Kong.
        </p>
      </header>

      {/* Top CTA */}
      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white flex-shrink-0">
            <Type size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/text-tools" className="btn-primary text-sm flex-shrink-0">
          Open Text Tools Suite
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Most Word Counters Struggle with Chinese Text
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            English word counters rely on spaces. Chinese doesn't use spaces between words. This causes many tools to either count every character as a word or completely break on mixed content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Makes This Text Tools Suite Different
          </h2>
          <ul className="space-y-3">
            {[
              'Accurate bilingual word & character counting',
              'Powerful text sanitizer for messy copied content',
              'Multiple case converters (Title Case, Sentence case, etc.)',
              'Real-time reading time estimation',
              '100% client-side — nothing leaves your device',
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
            Who Uses This Tool
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Students in Hong Kong', desc: 'Bilingual essays and reports become much less stressful.' },
              { title: 'Professionals & Writers', desc: 'Clean up reports and emails before pasting into documents.' },
              { title: 'Translators', desc: 'Handles mixed English-Chinese text without breaking spacing.' },
              { title: 'Anyone with Messy PDFs', desc: 'Fixes broken copied text from scanned documents.' },
            ].map((item) => (
              <div key={item.title} className="card p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Pro Tips I Use Every Day
          </h2>
          <ul className="space-y-3">
            {[
              'Paste the full block at once — the sanitizer works better with more context',
              'Use "Remove Line Breaks" first, then "Fix Paragraph Breaks"',
              'For bilingual content, it respects character boundaries correctly',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Does it accurately count Chinese words?',
                a: 'It handles bilingual text better than most tools. For Chinese content, it uses character counting, which is the standard most writers and editors in Hong Kong actually use.',
              },
              {
                q: 'Is there a limit on how much text I can paste?',
                a: 'No practical limit. Everything runs locally on your device.',
              },
              {
                q: 'Can I use it on mobile?',
                a: 'Yes. It works well on both desktop and mobile browsers.',
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
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to clean and count text more efficiently?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              No sign-up. No tracking. Just paste and go.
            </p>
            <Link to="/text-tools" className="btn-primary inline-flex items-center gap-2">
              Open Text Tools Suite Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
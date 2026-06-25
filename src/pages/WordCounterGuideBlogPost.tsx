import { Link } from 'react-router-dom';
import { CheckCircle, Shield, AlertTriangle, ChevronRight, Type, Lightbulb } from 'lucide-react';

const chineseProblems = [
  'Count every single Chinese character as a "word" (which wildly inflates the number)',
  'Break completely when English and Chinese are mixed together',
  'Create messy spacing and line breaks after cleaning',
];

const sanitizerFeatures = [
  { label: 'Remove Line Breaks', detail: 'joins broken sentences' },
  { label: 'Fix Paragraph Breaks', detail: 'restores proper spacing' },
  { label: 'Strip Extra Spaces', detail: 'cleans up double spaces and gaps' },
  { label: 'Remove Special Characters', detail: 'for stubborn artifacts' },
];

const audiences = [
  {
    title: 'Students in Hong Kong',
    detail:
      'Writing bilingual essays or reports becomes much less stressful. You can get accurate word and character counts without fighting formatting issues.',
  },
  {
    title: 'Professionals and Content Writers',
    detail:
      'Quickly clean up text from reports, emails, or research papers before pasting into Notion, Word, or Google Docs.',
  },
  {
    title: 'Translators and Bilingual Workers',
    detail:
      'The sanitizer handles mixed-language documents without destroying spacing between English words and Chinese characters.',
  },
  {
    title: 'Anyone Tired of Messy PDFs',
    detail:
      'Scanned documents and older files often copy terribly. This tool fixes most of those issues in seconds.',
  },
];

const faqs = [
  {
    q: 'Does it accurately count Chinese words?',
    a: 'It handles bilingual text better than most tools. For Chinese content, it uses character counting, which is the standard most writers and editors in Hong Kong actually use.',
  },
  {
    q: 'What\'s the difference between "Remove Line Breaks" and "Fix Paragraph Breaks"?',
    a: 'Remove Line Breaks joins sentences that were split mid-line. Fix Paragraph Breaks restores the proper spacing between distinct paragraphs. For best results, use both — in that order.',
  },
  {
    q: 'Is there a limit on how much text I can paste?',
    a: 'No. You can process long documents because everything runs on your device.',
  },
  {
    q: 'Can I use it on mobile?',
    a: 'Yes, it works well on both desktop and mobile browsers.',
  },
  {
    q: 'Is it really free?',
    a: 'Completely free. No sign-up, no limits, no hidden fees.',
  },
];

export default function WordCounterGuideBlogPost() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        The Word Counter &amp; Text Sanitizer I Actually Use Every Day (Especially for Chinese + English)
      </h1>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        If you write, study, or work with text regularly, you've probably used a word counter more
        times than you can count. But here's the frustrating reality — most free ones are either full
        of ads, force you to sign up, or completely fall apart the moment you paste Chinese or mixed
        English-Chinese content.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        As someone living and working in Hong Kong, this problem annoyed me enough that I decided to
        build my own solution. That's how the Word Counter &amp; Text Sanitizer in EverydayUtils came
        about — simple, private, and actually works well with bilingual text.
      </p>

      {/* Why most tools struggle */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why Most Word Counters Struggle with Chinese Text
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          English word counters rely on spaces. Chinese doesn't use spaces between words. Because of
          this, many tools either:
        </p>
        <ul className="space-y-2.5 mb-4">
          {chineseProblems.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 dark:text-gray-500 italic">
          This is especially painful for Hong Kong students, professionals handling Chinese-English
          reports, or anyone dealing with mixed-language documents.
        </p>
      </section>

      {/* What makes it different */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          What Makes EverydayUtils Different
        </h2>

        {/* Counting */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Accurate Counting for Bilingual Text
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            Paste anything — pure English, pure Chinese, or a mix — and you get:
          </p>
          <ul className="space-y-1.5">
            {[
              'Word count (English style)',
              'Character count (with and without spaces)',
              'Sentence and paragraph count',
              'Estimated reading time',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle size={13} className="text-brand-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sanitizer */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Powerful Text Sanitizer
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Copy messy text from a PDF, website, or email and it quickly fixes it. As covered in the{' '}
            <Link to="/blog/pdf-copy-paste-fixer" className="text-brand-500 hover:underline">
              PDF Copy-Paste Fixer guide
            </Link>
            , this is excellent for cleaning up copied text.
          </p>
          <div className="space-y-1.5">
            {sanitizerFeatures.map((btn) => (
              <div key={btn.label} className="flex items-start gap-2">
                <CheckCircle size={13} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-800 dark:text-gray-200 font-semibold">{btn.label}</strong>
                  {' '}— {btn.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Case converter */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 mb-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Case Converter</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            One-click changes between UPPERCASE, lowercase, Title Case, Sentence case, and more.
            Surprisingly useful when preparing titles or headings.
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy:</strong> Everything runs 100% in your browser.
            No data is sent anywhere.
          </p>
        </div>

        <div className="mt-4">
          <Link to="/text-tools" className="btn-primary inline-flex items-center gap-2 text-sm">
            <Type size={14} />
            Open the Word Counter &amp; Text Sanitizer
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Who uses it */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Who Actually Uses This Tool
        </h2>
        <div className="space-y-4">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro tips */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Pro Tips I Use Every Day
        </h2>
        <ul className="space-y-2.5">
          {[
            'Paste the full block of text instead of small pieces — the sanitizer works better with more context.',
            'For messy copied text, use "Remove Line Breaks" first, then "Fix Paragraph Breaks".',
            'The reading time estimate adjusts reasonably for mixed English and Chinese content.',
            'Try the case converter before manually editing titles — it saves more time than you\'d think.',
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-3">
              <Lightbulb size={14} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why client-side */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why I Made It Client-Side Only
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Many popular text tools send your pasted content to their servers. For casual use that might
          be fine, but when you're working with client documents, personal writing, or sensitive
          information, it's better to keep everything private.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          That's why EverydayUtils processes everything locally in your browser — the same approach we
          use for the{' '}
          <Link to="/password-generator" className="text-brand-500 hover:underline">Password Generator</Link>
          {' '}and{' '}
          <Link to="/qr-generator" className="text-brand-500 hover:underline">WiFi QR Code tool</Link>.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
            >
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{faq.q}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-8 p-5 rounded-xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
          Ready to try it yourself?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          No sign-up. No tracking. Just paste your text and go.
        </p>
        <Link to="/text-tools" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Type size={14} />
          Open the Word Counter &amp; Text Sanitizer
          <ChevronRight size={14} />
        </Link>
      </section>

      {/* Related */}
      <section className="mb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Articles</h2>
        <div className="flex flex-col gap-2">
          <Link to="/blog/pdf-copy-paste-fixer" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            The PDF Copy-Paste Fixer: How to Clean Messy Text in Seconds
          </Link>
          <Link to="/blog/how-to-create-strong-passwords" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            How to Create Strong Passwords in 2026
          </Link>
        </div>
      </section>

      <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 pt-6 leading-relaxed">
        EverydayUtils is built with one simple goal: create genuinely useful tools that respect your
        time and privacy.
      </p>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { CheckCircle, Shield, AlertTriangle, ChevronRight, FileText, Lightbulb } from 'lucide-react';

const problems = [
  'Hard line breaks in the middle of sentences',
  'Extra or missing spaces',
  'Leftover hyphens from justified text',
  'Broken character encoding (especially with Traditional Chinese or mixed-language content)',
  'Hidden artifacts from scanned or older PDFs',
];

const audiences = [
  {
    title: 'Students and Researchers',
    detail:
      'Copying from journals or e-books becomes painless. You can focus on your work instead of fixing formatting for half an hour.',
  },
  {
    title: 'Professionals Working with Documents',
    detail:
      'Contracts, financial reports, meeting notes, and scanned files often copy terribly. This tool quickly turns them into clean, usable text.',
  },
  {
    title: 'Writers and Content Creators',
    detail:
      'Pulling quotes from books or articles is much smoother. The sanitizer also works well with Traditional Chinese and mixed English-Chinese content — something many generic cleaners struggle with.',
  },
  {
    title: 'Anyone Dealing with Scanned or Old PDFs',
    detail:
      'OCR-generated text is often the messiest. The tool handles odd spacing and broken sentences surprisingly well.',
  },
];

const faqs = [
  {
    q: 'Does it work well with Chinese text?',
    a: 'Yes. It was built with bilingual users in mind and handles English + Traditional Chinese (and mixed text) much better than most generic tools.',
  },
  {
    q: 'Is there a limit on how much text I can clean?',
    a: 'No practical limit. You can process multiple pages at once since it runs locally on your device.',
  },
  {
    q: 'Will it remove bold or italic formatting?',
    a: 'It focuses on structural cleaning (line breaks, spacing, etc.). Basic formatting is mostly preserved, but the main goal is clean, readable plain text.',
  },
  {
    q: 'How is this different from other online cleaners?',
    a: 'Most others require sign-ups or send your data to servers. This one is completely free, private, and has no limits.',
  },
];

const steps = [
  'Copy the messy text from your PDF.',
  <>Go to the <Link to="/text-tools" className="text-brand-500 hover:underline font-medium">EverydayUtils Text Sanitizer</Link>.</>,
  'Paste the text into the box.',
  <>Click the buttons you need:</>,
  'Copy the clean text and paste it wherever you need.',
];

const buttons = [
  { label: 'Remove Line Breaks', detail: 'joins broken sentences' },
  { label: 'Fix Paragraph Breaks', detail: 'restores proper paragraph spacing' },
  { label: 'Strip Extra Spaces', detail: 'cleans up double spaces and gaps' },
  { label: 'Remove Special Characters', detail: 'for stubborn artifacts' },
];

export default function PdfCopyPasteFixerBlogPost() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        The PDF Copy-Paste Fixer: How to Clean Messy Text from PDFs in Seconds (2026 Guide)
      </h1>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
        If you've ever copied text from a PDF, you know exactly how frustrating it can be. One moment
        you're pulling a clean paragraph from a report or research paper — the next, you're looking at
        a jumbled mess of random line breaks, extra spaces, stray hyphens, and weird formatting that
        makes the text almost unusable.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        Here's a straightforward guide on why this problem happens and how to fix messy PDF text in
        seconds using the EverydayUtils Text Sanitizer.
      </p>

      {/* Why it goes wrong */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why Copying Text from PDFs Always Goes Wrong
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          PDFs are designed for visual consistency, not easy editing. They treat text like it's
          printed on paper — placing characters at exact positions. When you copy that text, your
          computer doesn't understand paragraphs or sentences. It just grabs whatever lines it sees.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Common problems include:</p>
        <ul className="space-y-2.5">
          {problems.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-500 italic">
          This isn't your fault — it's just how PDFs work.
        </p>
      </section>

      {/* The fix */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          The Fastest Way to Clean PDF Text in 2026
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          You don't need complicated software or manual editing. Here's the simple process:
        </p>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        {/* Sub-list for step 4 buttons */}
        <div className="ml-9 mt-2 space-y-1.5">
          {buttons.map((btn) => (
            <div key={btn.label} className="flex items-start gap-2">
              <CheckCircle size={13} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-800 dark:text-gray-200 font-semibold">{btn.label}</strong>
                {' '}— {btn.detail}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
          The whole thing usually takes less than 15 seconds.
        </p>

        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Everything processes locally in
            your browser. Your text never leaves your device.
          </p>
        </div>

        <div className="mt-4">
          <Link to="/text-tools" className="btn-primary inline-flex items-center gap-2 text-sm">
            <FileText size={14} />
            Try the Text Sanitizer Now
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Who benefits */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Who Benefits Most from This Tool
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
          Pro Tips for Better Results
        </h2>
        <ul className="space-y-2.5">
          {[
            'Paste the entire block at once rather than small pieces — the tool works better with more context.',
            'Use "Remove Line Breaks" first, then "Fix Paragraph Breaks" for the cleanest output.',
            'For bilingual English + Chinese documents, this sanitizer was specifically tuned to respect character boundaries.',
            "Feel free to try different combinations of buttons. Since everything runs locally, there's no risk.",
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
          Why Client-Side Processing Matters
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Many online text cleaners send your pasted content to their servers. That might be fine for
          casual use, but when you're working with contracts, client emails, research notes, or
          sensitive information, it's better to keep everything private.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          EverydayUtils processes everything locally in your browser. Your text never leaves your
          device — the same privacy-first approach we use for the{' '}
          <Link to="/password-generator" className="text-brand-500 hover:underline">Password Generator</Link>{' '}
          and{' '}
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
          Ready to fix your PDF formatting problems?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          No sign-up. No tracking. Just paste, clean, and copy.
        </p>
        <Link to="/text-tools" className="btn-primary inline-flex items-center gap-2 text-sm">
          <FileText size={14} />
          Try the Text Sanitizer &amp; Cleaner Now
          <ChevronRight size={14} />
        </Link>
      </section>

      {/* Related tools */}
      <section className="mb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Tools</h2>
        <div className="flex flex-col gap-2">
          <Link to="/password-generator" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            Password Generator
          </Link>
          <Link to="/qr-generator" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            WiFi QR Code Generator
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

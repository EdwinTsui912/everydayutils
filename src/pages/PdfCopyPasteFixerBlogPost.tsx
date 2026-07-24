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
    detail: 'Copying from journals or e-books becomes painless. You can focus on your work instead of fixing formatting for half an hour.',
  },
  {
    title: 'Professionals Working with Documents',
    detail: 'Contracts, financial reports, meeting notes, and scanned files often copy terribly. This tool quickly turns them into clean, usable text.',
  },
  {
    title: 'Writers and Content Creators',
    detail: 'Pulling quotes from books or articles is much smoother. The sanitizer also works well with Traditional Chinese and mixed English-Chinese content — something many generic cleaners struggle with.',
  },
  {
    title: 'Anyone Dealing with Scanned or Old PDFs',
    detail: 'OCR-generated text is often the messiest. The tool handles odd spacing and broken sentences surprisingly well.',
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
    a: 'It focuses on structural cleaning (line breaks, spacing, duplicate lines, etc.). Basic formatting is mostly preserved, but the main goal is clean, readable plain text.',
  },
  {
    q: 'How is this different from other online cleaners?',
    a: 'Most others require sign-ups or send your data to servers. This one is completely free, private, has no limits, and lets you undo any cleanup step with one click.',
  },
];

const steps = [
  'Copy the messy text from your PDF.',
  <>Go to the <Link to="/text-tools" className="text-blue-600 dark:text-blue-400 hover:underline">EverydayUtils Text Tools Suite</Link>.</>,
  'Paste the text into the box, then click the Sanitizer tab (it opens on Word Counter by default).',
  'Click the cleanup buttons you need — each one applies instantly and can be undone.',
  'Copy the clean text and paste it wherever you need.',
];

const buttons = [
  { label: 'Remove Extra Spaces', detail: 'collapses multiple spaces and tabs into one' },
  { label: 'Strip Line Breaks', detail: 'flattens all lines into one continuous paragraph' },
  { label: 'Trim Lines', detail: 'removes leading and trailing whitespace from each line' },
  { label: 'Remove Duplicates', detail: 'deletes repeated lines, useful for messy OCR output' },
  { label: 'Strip Special Chars', detail: 'removes stubborn artifact characters left behind by scanning' },
];

export default function PdfCopyPasteFixerBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">Text Tools</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          The PDF Copy-Paste Fixer: How to Clean Messy Text from PDFs in Seconds
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          If you've ever copied text from a PDF, you know exactly how frustrating it can be. One moment you're pulling a clean paragraph from a report or research paper — the next, you're looking at a jumbled mess of random line breaks, extra spaces, stray hyphens, and weird formatting that makes the text almost unusable.
        </p>
      </header>

      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex-shrink-0">
            <FileText size={18} />
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

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why This Happens</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            PDFs are designed for visual consistency, not easy editing. They treat text like it's printed on paper — placing characters at exact positions. When you copy that text, your computer doesn't understand paragraphs or sentences. It just grabs whatever lines it sees.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">Common problems include:</p>
          <ul className="space-y-2">
            {problems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed mt-4">This isn't your fault — it's just how PDFs work.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">How to Fix It in Under 15 Seconds</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            You don't need complicated software or manual editing. The cleanup tools live inside the Text Tools Suite, under the <strong className="text-gray-800 dark:text-gray-200">Sanitizer</strong> tab — here's the process:
          </p>
          <ol className="space-y-2 list-decimal list-inside">
            {steps.map((step, i) => (
              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Five Cleanup Buttons</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Once you're on the Sanitizer tab, you'll see five one-click buttons. You can click as many as you need, in any order, and undo everything at once with Restore Original if a result isn't what you expected:
          </p>
          <div className="space-y-3">
            {buttons.map((b) => (
              <div key={b.label} className="card p-4 flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{b.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Note: the Sanitizer sits alongside a Word Counter and Case Converter in the same Text Tools Suite — all three share one pasted-in block of text, so you can switch tabs without losing your place.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Who This Helps Most</h2>
          <div className="space-y-4">
            {audiences.map((item) => (
              <div key={item.title} className="card p-5">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Everything processes locally in your browser. Your text never leaves your device — the same privacy-first approach we use for the{' '}
            <Link to="/password-generator" className="underline">Password Generator</Link>{' '}and{' '}
            <Link to="/blog/how-to-create-wifi-qr-code" className="underline">WiFi QR Code tool</Link>.
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

      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-10">
        <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-6 text-center">
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to fix your PDF formatting problems?</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No sign-up. No tracking. Just paste, clean, and copy.</p>
          <Link to="/text-tools" className="btn-primary inline-flex items-center gap-2">
            Open Text Tools Suite
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>

    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, ChevronRight, Clock, Type, Hash, Scissors } from 'lucide-react';
import SEO from '../components/SEO';

const stats = [
  { label: 'Words', detail: 'Counted using a CJK-aware matcher, not a simple space-split, so mixed English + Chinese text is counted correctly' },
  { label: 'Characters', detail: 'Total character count, including spaces' },
  { label: 'No Spaces', detail: 'Character count with all whitespace stripped out' },
  { label: 'Sentences', detail: 'Detected from sentence-ending punctuation (., !, ?)' },
  { label: 'Paragraphs', detail: 'Detected from blank-line breaks between blocks of text' },
  { label: 'Read Time', detail: 'Estimated using separate reading speeds for CJK characters and non-CJK words, so the estimate stays realistic for mixed content' },
];

const sanitizerButtons = [
  { label: 'Remove Extra Spaces', detail: 'collapses multiple spaces and tabs into one' },
  { label: 'Strip Line Breaks', detail: 'flattens all lines into one continuous paragraph' },
  { label: 'Trim Lines', detail: 'removes leading and trailing whitespace from each line' },
  { label: 'Remove Duplicates', detail: 'deletes repeated lines, useful for messy pasted lists' },
  { label: 'Strip Special Chars', detail: 'removes stubborn punctuation-style artifact characters' },
];

const caseButtons = [
  { label: 'UPPERCASE', detail: 'ALL CAPS' },
  { label: 'lowercase', detail: 'all lowercase' },
  { label: 'Title Case', detail: 'First Letter Of Each Word' },
  { label: 'Sentence case', detail: 'First letter only' },
  { label: 'tOGGLE cASE', detail: 'Inverts every character' },
];

const faqs = [
  {
    q: 'Why do most word counters break on Chinese text?',
    a: 'English word counters rely on spaces to separate words. Chinese, Japanese, and Korean text does not use spaces between words at all, so a space-splitting counter either treats the entire string as one giant "word" or miscounts badly on any mixed-language paragraph.',
  },
  {
    q: 'How does this tool handle mixed English and Chinese content?',
    a: 'It detects CJK characters separately from Latin-script words, counting each CJK character as its own semantic unit while still counting English words normally by spacing. The reading-time estimate also uses different speeds for CJK characters versus non-CJK words, so a paragraph that mixes both languages gets a more realistic estimate than either method alone would produce.',
  },
  {
    q: 'Can I undo a cleanup step if the result looks wrong?',
    a: 'Yes. Every transform — case conversion or sanitizing — can be reversed with the Restore Original button, so experimenting with different cleanup options is safe.',
  },
  {
    q: 'Do I need to switch pages to count, clean, and convert case?',
    a: 'No. Word Counter, Sanitizer, and Case Converter are three tabs inside the same Text Tools Suite page, and they all operate on the same pasted-in text, so you can flip between tabs without losing your place.',
  },
  {
    q: 'Is my text uploaded anywhere?',
    a: 'No. Everything — counting, sanitizing, and case conversion — runs locally in your browser. Nothing is sent to a server, logged, or tracked.',
  },
];

export default function WordCounterGuideBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="Word Counter & Text Sanitizer for Chinese + English | EverydayUtils"
        description="A word counter that actually understands mixed Chinese and English text, plus a text sanitizer and case converter — all free, private, and browser-based."
        keywords="word counter chinese english, cjk word counter, text sanitizer online, case converter tool, character counter mixed language"
        url="https://www.everydayutils.com/blog/word-counter-text-sanitizer-guide"
      />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} /> Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Text Tools</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">Text Tools</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"><Clock size={11} /> 8 min read</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          The Word Counter & Text Sanitizer I Actually Use Every Day (Especially for Chinese + English)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          English word counters rely on spaces. Chinese doesn't use spaces between words. This causes many tools to either count every character as a word or completely break on mixed content — here's how a properly bilingual-aware counter actually works.
        </p>
      </header>

      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex-shrink-0">
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

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why English-Only Word Counters Fail on Chinese</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Most word counters were built around one assumption: words are separated by spaces. That works fine for English, but Chinese, Japanese, and Korean text doesn't use spaces between words at all. Feed a typical counter a paragraph of Traditional Chinese, and it either reports the whole block as a single "word," or it collapses into character-counting mode and calls that a word count — neither of which is actually useful.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The Text Tools Suite handles this by detecting CJK characters separately from Latin-script words. Each CJK character is counted as its own semantic unit, while English words are still counted by spacing — so a paragraph mixing both languages gets a count that actually reflects both halves correctly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Six Real-Time Stats</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Paste or type into the box, and the Word Counter tab updates six stats instantly, with no button to click:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="card p-4 flex items-start gap-3">
                <Hash size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{s.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Sanitizer Tab</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Switch to the Sanitizer tab on the same page to clean up messy pasted text — from PDFs, emails, or old documents — using five one-click buttons:
          </p>
          <div className="space-y-3">
            {sanitizerButtons.map((b) => (
              <div key={b.label} className="card p-4 flex items-start gap-3">
                <Scissors size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{b.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Case Converter Tab</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            A third tab, Case Converter, handles quick text-casing changes — useful for headings, branding, or cleaning up ALL-CAPS text someone pasted in:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseButtons.map((b) => (
              <div key={b.label} className="card p-4 flex items-start gap-3">
                <Type size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{b.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">One Shared Workspace, One Undo Button</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            All three tabs — Word Counter, Sanitizer, and Case Converter — read from and write to the same block of pasted text, so switching tabs never loses your place. Every transform can be reversed instantly with Restore Original, and Clear wipes the workspace when you're starting fresh.
          </p>
        </section>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Everything — counting, sanitizing, and case conversion — runs locally in your browser. Your text is never uploaded, logged, or tracked.
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
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to clean and count text more efficiently?</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No sign-up. No tracking. Just paste and go.</p>
          <Link to="/text-tools" className="btn-primary inline-flex items-center gap-2">
            Open Text Tools Suite Now
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>

    </div>
  );
}
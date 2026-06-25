import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, ChevronRight, AlignLeft } from 'lucide-react';

const features = [
  { label: 'Live Preview', detail: 'see the text update instantly as you adjust settings' },
  { label: 'Plain Text or Clean HTML Output', detail: 'ready to paste straight into your code or design tool' },
  { label: 'Flexible Controls', detail: 'choose number of paragraphs and length (Short / Medium / Long)' },
  { label: 'Classic Opening Toggle', detail: 'start with "Lorem ipsum dolor sit amet…" or get fully random text' },
  { label: 'New Variation Button', detail: 'refresh the text without losing your settings' },
  { label: 'Real-time Statistics', detail: 'live word count, character count, and paragraph count' },
  { label: '100% Client-Side', detail: 'everything runs locally in your browser — nothing is uploaded or tracked' },
];

const audiences = [
  {
    title: 'Web & UI/UX Designers',
    detail: 'Testing layouts in Figma or Tailwind — get realistic placeholder text that mimics real reading flow without distracting content.',
  },
  {
    title: 'Frontend Developers',
    detail: 'Building React, Vue, or plain HTML components — paste clean <p> tags directly into your markup without any cleanup.',
  },
  {
    title: 'Marketers',
    detail: 'Creating email campaigns and landing page mockups — fill templates quickly with properly-lengthed placeholder copy.',
  },
  {
    title: 'Students & Writers',
    detail: 'Need clean filler text quickly for presentations, templates, or layout exercises — no accounts, no friction.',
  },
];

const faqs = [
  {
    q: 'Is it really free and private?',
    a: 'Yes. No sign-up, no tracking, and no data ever leaves your device.',
  },
  {
    q: 'Can I use the HTML output directly in my code?',
    a: 'Absolutely. It generates clean <p> tags ready to paste into your project.',
  },
  {
    q: 'Why no natural English mode?',
    a: 'Real English text distracts people from evaluating the actual design and typography. Classic Lorem Ipsum keeps the focus on layout and structure.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Once the page loads, it works completely offline.',
  },
  {
    q: 'Is there any limit?',
    a: 'No limit. Generate as many paragraphs as you need and use "New Variation" anytime.',
  },
];

export default function LoremIpsumBlogPost() {
  useEffect(() => {
    document.title = 'Free Lorem Ipsum Generator — Live Preview, HTML Output, No Ads';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = 'Generate realistic placeholder text instantly with live preview, HTML output, and real-time stats. 100% client-side, no ads, no tracking, no sign-up — built for designers and developers.';
    return () => {
      document.title = 'EverydayUtils';
      if (meta) meta.content = '';
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        Why I Built a Free, Private Lorem Ipsum Generator (No Ads, No Signup)
      </h1>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        If you've ever designed a website layout, built a frontend component, or mocked up a landing
        page, you know that exact moment of frustration — the structure looks great, but the page is
        completely blank.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        You need realistic placeholder text to test typography, spacing, line heights, and overall
        flow, but the final copy isn't ready yet. That's exactly why Lorem Ipsum has remained the
        industry standard for decades.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        After using too many slow, ad-heavy, and privacy-questionable generators, I decided to build a
        cleaner version and added it to EverydayUtils.com.
      </p>

      {/* Problem */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          The Problem with Most Free Lorem Ipsum Generators
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Search for "lorem ipsum generator" and you'll usually land on pages full of ads, pop-ups, or
          tools that require sign-up. Some even process everything on their servers. For quick personal
          mockups this is annoying. For client work or confidential projects, it feels unnecessarily
          risky.
        </p>
      </section>

      {/* History */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          What Is Lorem Ipsum? (Quick History)
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Lorem Ipsum originates from a work by the Roman philosopher Cicero written around 45 BC. The
          scrambled version we use today has been popular in the design industry since the 1960s. It
          mimics the natural rhythm of English without using real words that might distract people from
          judging the actual layout.
        </p>
      </section>

      {/* What makes it different */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          What Makes This Lorem Ipsum Generator Different
        </h2>
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 mb-4">
          <div className="space-y-2.5">
            {features.map((f) => (
              <div key={f.label} className="flex items-start gap-2">
                <CheckCircle size={13} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-800 dark:text-gray-200 font-semibold">{f.label}</strong>
                  {' '}— {f.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 mb-4">
          <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            The same privacy-first philosophy applies across all tools on EverydayUtils — including the{' '}
            <Link to="/text-tools" className="underline hover:no-underline">
              Word Counter &amp; Text Sanitizer
            </Link>{' '}
            and{' '}
            <Link to="/password-generator" className="underline hover:no-underline">
              Password Generator
            </Link>.
          </p>
        </div>

        <Link to="/lorem-ipsum-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <AlignLeft size={14} />
          Try the Free Lorem Ipsum Generator
          <ChevronRight size={14} />
        </Link>
      </section>

      {/* Audience */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Who This Tool Is For
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

      {/* Privacy */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why Privacy Matters for Placeholder Text Tools
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          When you're working on client projects or unreleased features, even dummy text can feel
          sensitive. Most online generators process everything server-side. Because this tool runs
          entirely in your browser, your data never leaves your device.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          It's the same approach used for the{' '}
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
          Ready to replace those clunky generators?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          No sign-up. No ads. No tracking. Just instant placeholder text.
        </p>
        <Link to="/lorem-ipsum-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <AlignLeft size={14} />
          Try the Free Lorem Ipsum Generator Now
          <ChevronRight size={14} />
        </Link>
      </section>

      {/* Related */}
      <section className="mb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Articles</h2>
        <div className="flex flex-col gap-2">
          <Link to="/blog/word-counter-text-sanitizer-guide" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            The Word Counter &amp; Text Sanitizer I Actually Use Every Day
          </Link>
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

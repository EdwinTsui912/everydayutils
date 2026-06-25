import { Link } from 'react-router-dom';
import { CheckCircle, Palette, ChevronRight, Shield } from 'lucide-react';

const features = [
  { label: 'Instant harmonious palettes', detail: 'Generate balanced, visually cohesive color schemes with a single click or spacebar press.' },
  { label: 'Clean Tailwind CSS export', detail: 'One-click copy of your tailwind.config.js color block — paste it directly into your project.' },
  { label: 'Multiple color formats', detail: 'Every shade available as HEX, RGB, HSL, and CSS custom properties.' },
  { label: 'Live preview', detail: 'See how colors work together in real time before you commit to a palette.' },
  { label: '100% client-side & private', detail: 'All generation happens locally in your browser. Nothing is sent to any server.' },
];

const steps = [
  <>Go to the <Link to="/palette-generator" className="text-brand-500 hover:underline">Color Palette Generator</Link></>,
  <>Click <strong className="text-gray-800 dark:text-gray-200 font-semibold">"Generate"</strong> or press the <strong className="text-gray-800 dark:text-gray-200 font-semibold">spacebar</strong> for a fresh palette</>,
  <>Click any color swatch to <strong className="text-gray-800 dark:text-gray-200 font-semibold">copy its HEX code</strong></>,
  <>Click the Tailwind button to copy the <strong className="text-gray-800 dark:text-gray-200 font-semibold">ready-to-paste config snippet</strong></>,
];

const faqs = [
  {
    q: 'Is this color palette generator really free?',
    a: 'Yes — completely free with no limits, no sign-up, and no premium version.',
  },
  {
    q: 'How private is it?',
    a: 'Extremely private. All generation happens locally in your browser. No color data is ever sent to a server.',
  },
  {
    q: 'Does it export proper Tailwind CSS code?',
    a: 'Yes. The export is formatted exactly as you would write it in your tailwind.config.js file, ready to drop in without editing.',
  },
  {
    q: 'Can I use the generated palettes for commercial projects?',
    a: 'Absolutely. All generated palettes are yours to use freely, commercially or otherwise.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes. The tool is fully responsive and works smoothly on phones and tablets.',
  },
];

export default function ColorPaletteBlogPost() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        Free Tailwind CSS Color Palette Generator – Instant, Private &amp; No Sign-Up (2026)
      </h1>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        If you've ever spent way too long picking colors for a new project — staring at endless shades,
        trying to make them harmonious, then manually typing Tailwind classes — you know how painful it can be.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
        I've been there many times while building side projects. That's exactly why I created a dedicated
        free color palette generator inside EverydayUtils.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        <strong className="text-gray-800 dark:text-gray-200">EverydayUtils Color Palette Generator</strong> is
        a free, browser-based tool that creates harmonious color schemes and exports them as ready-to-use
        Tailwind CSS configuration code — with no account required and no data sent to any server.
      </p>

      {/* Why color palettes matter */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why Good Color Palettes Still Matter in 2026
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Even with AI design tools, getting colors right remains one of the biggest factors in how
          professional your website looks. A well-chosen palette improves:
        </p>
        <ul className="space-y-2">
          {['Brand consistency across all pages and components', 'Readability and accessible contrast ratios', 'Visual hierarchy that guides users naturally', 'Overall user experience and perceived quality'].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What makes it different */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          What Makes EverydayUtils Different
        </h2>
        <ul className="space-y-3">
          {features.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-800 dark:text-gray-200 font-semibold">{item.label}</strong>{' '}
                — {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* How to use */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          How to Use the Color Palette Generator
        </h2>
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
      </section>

      {/* Privacy callout */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 mb-8">
        <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
          <strong className="font-semibold">Privacy Note:</strong> All palette generation happens entirely
          in your browser. No color data, no settings, and no usage is ever sent to any server.
        </p>
      </div>

      {/* CTA */}
      <section className="mb-8">
        <Link to="/palette-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Palette size={14} />
          Try the Color Palette Generator
          <ChevronRight size={14} />
        </Link>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{faq.q}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mb-8 p-5 rounded-xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20 dark:border-brand-500/20">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Ready to design faster?</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No sign-up. No tracking. Instant Tailwind-ready palettes in your browser.</p>
        <Link to="/palette-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <Palette size={14} />
          Generate a Color Palette Now
          <ChevronRight size={14} />
        </Link>
      </section>

      {/* Related */}
      <section className="mb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Articles</h2>
        <div className="flex flex-col gap-2">
          <Link to="/blog/json-formatter-guide" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            The Best Free JSON Formatter in 2026
          </Link>
          <Link to="/blog/lorem-ipsum-generator-free-private" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            Free Lorem Ipsum Generator – No Ads, No Signup
          </Link>
          <Link to="/blog/best-free-password-generator-2026" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            The Best Free Password Generator in 2026
          </Link>
        </div>
      </section>

      <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 pt-6 leading-relaxed">
        EverydayUtils is built with one core principle: useful tools that respect your privacy.
        All processing happens locally on your device.
      </p>
    </div>
  );
}

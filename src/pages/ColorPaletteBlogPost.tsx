import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock, Palette, CheckCircle, Shield } from 'lucide-react';

const differentiators = [
  { label: 'Five harmony algorithms', detail: 'Choose Random, Monochromatic, Analogous, Complementary, or Triadic — each computed from real color-wheel math, not just random hex values.' },
  { label: 'Lock any swatch', detail: 'Like one color in a palette but not the rest? Lock it, and it stays put every time you regenerate the other four.' },
  { label: 'Built-in WCAG 2.2 contrast checks', detail: 'Every swatch shows live AA/AAA contrast ratios against white and black, so you know instantly if text will actually be readable.' },
  { label: 'Advanced saturation & lightness control', detail: 'Fine-tune how muted or vivid, and how dark or light, the whole palette skews — without starting over.' },
  { label: 'Multiple export formats', detail: 'Copy as CSS custom properties, a ready-to-paste Tailwind config block, or a plain HEX list, plus a one-click SVG download of the strip itself.' },
  { label: '100% client-side & private', detail: 'All the color math runs locally in your browser. Nothing is sent to any server.' },
];

const faqs = [
  {
    q: 'Is this color palette generator really free?',
    a: "Yes — completely free with no limits, no sign-up, and no premium version. I built it for my own projects first, so keeping it free was never really a question.",
  },
  {
    q: 'How private is it?',
    a: 'Extremely private. All the color math — hue rotation, contrast calculations, everything — happens locally in your browser, so no palette or setting is ever sent to a server or logged anywhere.',
  },
  {
    q: 'What do the different harmony types actually mean?',
    a: "Each one uses a different rule on the color wheel. Monochromatic varies only lightness and saturation on one hue; Analogous picks neighboring hues 15-30 degrees apart; Complementary uses hues directly opposite each other; Triadic spaces three hues 120 degrees apart. Random just picks hues freely each time.",
  },
  {
    q: 'How does the accessibility checking work?',
    a: "The tool calculates the real WCAG 2.2 relative luminance and contrast ratio for every color against pure white and pure black, then shows a pass/fail badge for AA and AAA compliance — the same math browsers and accessibility auditors use, not a rough estimate.",
  },
  {
    q: 'Does it export proper Tailwind CSS code?',
    a: "Yes. The export panel has a dedicated Tailwind tab that generates a ready-to-paste theme.extend.colors block for your tailwind.config.js, alongside separate tabs for CSS variables and a plain HEX list.",
  },
  {
    q: 'Can I use the generated palettes for commercial projects?',
    a: "Absolutely. Every palette the tool generates is yours to use freely, whether that's a client project, a SaaS product, or something you plan to sell.",
  },
];

export default function ColorPaletteBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} /> Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Design Tools</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">Design Tools</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"><Clock size={11} /> 6 min read</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 23, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          I Kept Rebuilding the Same Tailwind Color Config — So I Built a Tool With Real Color Theory Behind It
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Picking colors that actually work together, checking they're readable, then hand-typing them into a Tailwind config — this free tool handles all three steps at once.
        </p>
      </header>

      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white flex-shrink-0">
            <Palette size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/palette-generator" className="btn-primary text-sm flex-shrink-0">
          Open Color Palette Generator
        </Link>
      </div>

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Problem That Kept Repeating Itself</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Every time I started a new side project, I hit the same wall. I'd try random hex codes next to each other, unsure whether they were actually harmonious or just accidentally not clashing, then separately worry about whether the text on top would even be readable. Once I landed on something, I still had to manually type every shade into a tailwind.config.js file by hand.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            So I built a tool that treats color choice as actual color theory rather than guesswork — pick a harmony rule, get a mathematically consistent palette, see instantly whether it passes accessibility standards, and export it in whatever format the project needs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Five Ways to Build a Palette</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            The core of the tool is a harmony selector, and each option follows a distinct rule on the 360-degree color wheel rather than picking colors arbitrarily:
          </p>
          <ul className="space-y-2">
            {[
              'Monochromatic — one hue, varied only in lightness and saturation',
              'Analogous — neighboring hues roughly 15-30 degrees apart for a calm, cohesive feel',
              'Complementary — hues directly opposite each other for high contrast and bold branding',
              'Triadic — three hues spaced 120 degrees apart for vibrant, balanced schemes',
              'Random — no fixed rule, for open-ended exploration',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">What Makes This Generator Different</h2>
          <ul className="space-y-3">
            {differentiators.map((item) => (
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

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">How I Actually Use It</h2>
          <ol className="space-y-4">
            {[
              <>Open the <Link to="/palette-generator" className="text-brand-500 hover:underline">Color Palette Generator</Link> and pick a harmony type that fits the project's mood.</>,
              <>Click <strong className="text-gray-800 dark:text-gray-200 font-semibold">Generate New Palette</strong> until something clicks, locking any swatch I already like so it survives future regenerations.</>,
              <>Open the <strong className="text-gray-800 dark:text-gray-200 font-semibold">Advanced panel</strong> to nudge saturation or lightness, and check the WCAG contrast table to confirm text will actually be readable.</>,
              <>Switch to the <strong className="text-gray-800 dark:text-gray-200 font-semibold">Tailwind export tab</strong> and copy the ready-made config block straight into the project.</>,
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
            <Link to="/palette-generator" className="btn-primary inline-flex items-center gap-2">
              <Palette size={14} />
              Open Color Palette Generator Now
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> All palette generation and contrast math happens entirely in your browser. No color data, no settings, and no usage is ever sent to any server.
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
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Articles</h2>
          <div className="flex flex-col gap-2">
            <Link to="/blog/json-formatter-guide" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              The Best Free JSON Formatter in 2026
            </Link>
            <Link to="/blog/lorem-ipsum-generator-free-private" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              Free Lorem Ipsum Generator — No Ads, No Signup
            </Link>
            <Link to="/blog/best-free-password-generator-2026" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
              <ChevronRight size={13} />
              The Best Free Password Generator in 2026
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Palette, ArrowRight, Calendar, CheckCircle2, Braces, Wand2 } from 'lucide-react';
import SEO from '../components/SEO';

const FAQ_ITEMS = [
  {
    q: 'How many colors should a typical palette have?',
    a: 'For most web projects, one primary color, one or two accents, a small set of status colors, and a few neutral steps is usually enough. More than that often adds complexity without much benefit.',
  },
  {
    q: 'Is it safe to use the generator for client work?',
    a: 'Yes. The palette generator runs entirely in your browser. No color data, settings, or usage information is sent to any server.',
  },
  {
    q: 'Should I use the same palette for light and dark mode?',
    a: 'You can keep the same brand colors, but it is better to derive separate neutral and accent scales for dark mode. Colors that work on light backgrounds often need adjustment to stay readable and balanced on dark surfaces.',
  },
  {
    q: 'What if I already have a brand color?',
    a: 'Use your brand color as the anchor, then use the harmony rules to explore supporting colors around it. You can lock that color and generate variations until the palette feels right.',
  },
  {
    q: 'Can I export colors directly into Tailwind?',
    a: 'Yes. The tool can export CSS variables, a Tailwind config snippet, or a simple HEX list.',
  },
];

const USE_CASES = [
  'SaaS landing page where the brand color and neutrals need to feel consistent.',
  'Admin dashboard with cards, tables, and status badges that should be easy to scan.',
  'Marketing or documentation site that needs readable headings, body text, and link styles.',
  'Interfaces with light and dark modes that share the same brand colors but use different neutrals.',
  'Mobile layouts where buttons, icons, and small text must remain clear on small screens.',
  'Data-heavy charts and tables where each series needs a distinct, accessible color.',
  'Checkout and product pages where CTAs and trust messages should stand out without feeling harsh.',
  'Design systems and component libraries that need a single source of truth for colors.',
];

const RELATED_POSTS = [
  {
    slug: '/blog/color-palette-generator-tailwind',
    title: 'I Kept Rebuilding the Same Tailwind Color Config — So I Built a Tool With Real Color Theory Behind It',
    icon: Palette,
    tag: 'Design & Frontend',
  },
  {
    slug: '/blog/css-effects-generator',
    title: 'I Was Tired of Fighting Gradients and Box Shadows — So I Built a CSS Effects Generator That Actually Feels Like Design',
    icon: Wand2,
    tag: 'Developer Tools',
  },
  {
    slug: '/blog/json-formatter-guide',
    title: 'The Best Free JSON Formatter & Validator in 2026 — Privacy First',
    icon: Braces,
    tag: 'Developer Tools',
  },
  {
    slug: '/blog/free-favicon-generator',
    title: 'Free Favicon Generator — Create Every Size You Need From One Image',
    icon: Palette,
    tag: 'Developer Tools',
  },
];

export default function ColorPalettesInWildBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <SEO
        title="Color Palettes in the Wild: 8 Real Projects Where Choosing Colors Gets Hard — 2026 Guide"
        description="A practical guide to choosing Tailwind-friendly color palettes for dashboards, landing pages, dark mode UIs, and more — with real scenarios, common mistakes, and a faster way to build accessible colors."
        keywords="color palette generator, Tailwind color palette, accessible color palette, WCAG color contrast, dark mode palette, SaaS UI colors, dashboard color scheme"
        url="https://www.everydayutils.com/blog/color-palettes-in-the-wild"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: 'Color Palettes in the Wild: 8 Real Projects Where Choosing Colors Gets Hard',
            description:
              'A practical guide to choosing Tailwind-friendly color palettes for dashboards, landing pages, dark mode UIs, and more — with real scenarios, common mistakes, and a faster way to build accessible colors.',
            url: 'https://everydayutils.com/blog/color-palettes-in-the-wild',
            datePublished: '2026-08-03',
            dateModified: '2026-08-03',
            author: { '@type': 'Organization', name: 'EverydayUtils' },
            publisher: { '@type': 'Organization', name: 'EverydayUtils' },
          })}
        </script>
      </Helmet>

      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <Calendar size={13} />
          <span>August 3, 2026</span>
          <span>·</span>
          <span>9 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-tight mb-4">
          Color Palettes in the Wild: 8 Real Projects Where Choosing Colors Gets Hard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-0">
          Color decisions are rarely made in isolation. This guide looks at eight common interface
          scenarios and shows how to use a palette generator to move from trial-and-error to
          consistent, accessible choices.
        </p>
      </div>

      <Link
        to="/palette-generator"
        className="inline-flex items-center gap-2 mb-12 px-4 py-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
      >
        <Palette size={16} />
        Open Color Palette Generator
        <ArrowRight size={15} />
      </Link>

      <div className="space-y-12">
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            Why palettes feel easy in theory but difficult in real projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Reading about color theory is straightforward: pick a base hue, choose supporting
            colors on the wheel, and adjust contrast. The difficulty appears when those colors have
            to support real screens — hero sections, dashboards, charts, and light/dark modes — all
            at once.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The goal of this guide is to keep the theory in the background and focus on the
            situations you are likely to face. In each case, a small, repeatable workflow with the
            palette generator can save time and reduce guesswork.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            Where this guide is most useful
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The generator is built around harmony rules, WCAG contrast checks, and export formats
            that match typical frontend stacks. It is most helpful in scenarios like:
          </p>
          <ul className="space-y-3">
            {USE_CASES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-violet-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            1. SaaS landing page: balancing a distinct brand color with readable content
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            A typical SaaS homepage needs one clear brand color, accents for buttons and badges,
            and neutrals for backgrounds and text. The common failure mode is a strong primary
            color combined with neutrals that are too close together in brightness, which makes
            sections blend into each other.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            A practical workflow is to start from the brand color, use complementary or triadic
            harmony to generate supporting accents, then use the generator’s saturation and
            lightness sliders to adjust intensity. From there, the WCAG badges help confirm that
            headings, body text, and key buttons stay readable before anything is wired into
            Tailwind.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            2. Admin dashboard: keeping surfaces and status states clear
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Dashboards compress a lot of information into cards, tables, and charts. If the palette
            does not separate surfaces clearly — page background, card background, borders, and
            text — the interface starts to feel flat and tiring to scan.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            One approach is to build the neutral scale first using the generator’s monochromatic
            option, then add status colors using complementary or triadic harmony. The WCAG table
            in the advanced panel shows contrast values against white and black, which is useful
            when testing card headers, small labels, and status badges side by side.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            3. Content-heavy site: keeping headings and body text readable
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Documentation and long-form articles rely on a quiet palette that still supports clear
            hierarchy. Light gray text on off-white backgrounds may look minimal in a design tool
            but often fails contrast checks in practice, especially for small text and captions.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            With the generator, you can select a base neutral, use monochromatic harmony to produce
            a ladder of lightness values, and verify contrast for headings, body text, and muted
            details. Once the neutrals are stable, link and button colors can be added from an
            analogous or complementary set without undermining readability.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            4. Dark mode: avoiding low-contrast, muddy interfaces
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Dark mode is more than inverting colors. Pure black backgrounds combined with lightly
            adjusted brand colors can produce a low-contrast, hazy effect where text and icons
            never fully stand out.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            A better pattern starts with a dark neutral that is slightly off-black, then uses the
            generator to derive lighter text shades and adjusted accent colors. The contrast
            badges show how each candidate color performs against white and near-black, which helps
            confirm that headings, links, and controls remain legible before exporting the palette.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            5. Mobile UI: keeping actions and icons clear on small screens
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Colors that feel balanced on a desktop display can lose separation on small mobile
            screens. Subtle differences in hue and lightness may be harder to see, especially
            outdoors or under different brightness settings.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            When tuning a palette for mobile, it can help to increase contrast slightly for
            primary actions, navigation elements, and error states. The generator’s sliders make
            those adjustments quick, and the WCAG ratios act as a useful check for small text and
            icons.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            6. Data-heavy tables and charts: separating series without visual noise
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Data views often require multiple series colors that need to be distinct but still feel
            related. Using many saturated colors quickly leads to visual noise, while using colors
            that are too similar makes rows and chart lines hard to distinguish.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            A triadic palette generated from a chosen base hue can provide three strong anchors,
            with lighter or darker variations derived using the saturation and lightness controls.
            The resulting data colors can stay separate from the main UI palette while still
            fitting the same system.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            7. E-commerce and product pages: clear CTAs without aggressive styling
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Checkout and product pages depend on clear actions and trust signals. If the primary
            action color is too close to surrounding elements, important buttons blend in. If it is
            too strong, the page can feel harsh or distracting next to product imagery.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Using complementary harmony to define a CTA color that contrasts cleanly with the
            background, and then testing its contrast with the generator’s badges, gives a more
            measured starting point. From there, muted tones can be used for secondary actions and
            informational labels without competing with the main CTA.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            8. Design systems and component libraries: one source of truth for colors
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Without a central palette, each component or page tends to introduce new hex codes.
            Over time, this creates multiple primary colors and inconsistent neutral scales, which
            are difficult to maintain.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Defining the palette once in the generator — with explicit roles for primary, accent,
            neutral, and status colors — and then exporting it as Tailwind config or CSS variables
            provides a practical source of truth. Components can refer to named tokens rather than
            raw hex values, making it easier to revise the system later without touching every
            file.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            How the palette generator fits into this workflow
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            The generator used throughout these examples runs entirely in the browser. It offers
            five harmony options, lock controls for individual swatches, adjustable saturation and
            lightness, WCAG contrast badges, and an advanced table of ratios against white and
            black.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Once a palette is stable, you can copy CSS variables, a Tailwind colors object, or a
            simple list of HEX values directly from the export panel. The SVG download option makes
            it easy to keep a quick visual reference, and the “Open CSS Effects Generator” button
            lets you immediately test the palette on gradients, glassmorphism cards, and box
            shadows.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            Privacy and local-only processing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            All palette generation, contrast calculations, and export formatting are handled locally
            in your browser. No palette data, configuration settings, or usage metrics are sent to
            a server or stored. This is especially useful when working with client brand colors or
            internal design systems.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="card p-5">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {item.q}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-5">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RELATED_POSTS.map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.slug}
                  to={post.slug}
                  className="card group flex items-start gap-3 p-4 hover:border-violet-500/40 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 flex items-center justify-center text-violet-500 flex-shrink-0 group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors duration-200">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-violet-500">{post.tag}</span>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-0.5 leading-snug group-hover:text-violet-500 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mt-14 p-6 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Ready to refine your palette?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Generate, test, and export color palettes entirely in your browser — no sign-up, no
          tracking.
        </p>
        <Link
          to="/palette-generator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          <Palette size={16} />
          Open Color Palette Generator
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
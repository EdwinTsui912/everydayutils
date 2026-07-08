import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Braces,
  Binary,
  Link2,
  AlignLeft,
  Sparkles,
  Shield,
} from 'lucide-react';

const tools = [
  {
    title: 'JSON Formatter & Validator',
    desc: 'Format messy JSON, validate syntax, inspect nested objects, and sort keys faster.',
    href: '/json-formatter',
    cta: 'Open JSON Formatter',
    icon: Braces,
  },
  {
    title: 'Base64 Encoder / Decoder',
    desc: 'Encode and decode Base64 quickly when working with payloads, tokens, or embedded assets.',
    href: '/base64',
    cta: 'Open Base64 Tool',
    icon: Binary,
  },
  {
    title: 'URL Encoder / Decoder',
    desc: 'Encode and decode query strings and special characters without fighting broken URLs.',
    href: '/url-encoder',
    cta: 'Open URL Encoder',
    icon: Link2,
  },
  {
    title: 'Lorem Ipsum Generator',
    desc: 'Generate placeholder text instantly for layouts, components, landing pages, and mockups.',
    href: '/lorem-ipsum-generator',
    cta: 'Open Lorem Ipsum Generator',
    icon: AlignLeft,
  },
];

const workflow = [
  'Receive raw API data, then clean it with the JSON Formatter.',
  'Encode binary or special data with Base64 when needed.',
  'Build or inspect the request URL with the URL Encoder.',
  'Fill a frontend mockup with placeholder copy from the Lorem Ipsum Generator.',
];

const benefits = [
  'They remove tiny interruptions that break development flow.',
  'They keep common formatting and encoding tasks in one place.',
  'They run locally in the browser, which keeps the workflow quick and lightweight.',
  'They are useful for developers, designers, QA, and anyone working with web content.',
];

const faqs = [
  {
    q: 'What is a JSON formatter and validator?',
    a: 'It formats JSON into a readable structure and checks whether the syntax is valid.',
  },
  {
    q: 'When should I use Base64 encoding?',
    a: 'Use it when you need to safely represent binary or special data in text form.',
  },
  {
    q: 'What does a URL encoder do?',
    a: 'It converts special characters into a URL-safe format so links and query strings work correctly.',
  },
  {
    q: 'Why use Lorem Ipsum for mockups?',
    a: 'It gives you quick placeholder text so you can focus on layout and spacing during design work.',
  },
];

export default function DeveloperUtilitiesBlogPost() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="prose prose-zinc dark:prose-invert prose-lg max-w-prose mx-auto prose-p:!leading-8 prose-p:!mb-7 prose-headings:scroll-mt-24 prose-h2:!mt-20 prose-h2:!mb-6 prose-h3:!mt-10 prose-h3:!mb-4 prose-ul:!my-6 prose-ol:!my-6 prose-li:!my-2 [&>p]:!leading-8 [&>p]:!mb-7">
          <header className="not-prose mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-5">
              <Sparkles className="w-4 h-4" />
              Free browser-based developer tools
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.05] mb-6 max-w-3xl">
              Free Developer Utilities That Save Time: JSON Formatter, Base64, URL Encoder, and Lorem Ipsum
            </h1>

            <p className="text-lg text-muted-foreground leading-8 max-w-2xl">
              As a developer, I waste more time than I would like on small repetitive tasks that interrupt my flow.
            </p>
          </header>

          <div className="not-prose rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/15 via-sky-500/10 to-blue-500/15 p-5 sm:p-6 mb-14">
            <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    Explore more free utility guides
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-blue-100/80">
                    Browse practical blog posts for the tools you use every day.
                  </p>
                </div>
              </div>

              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors whitespace-nowrap"
              >
                Browse More Guides
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <p>
            You know the drill. You are in the zone, then suddenly you need to pretty-print a JSON response,
            encode something in Base64, fix a messy URL, or generate placeholder text for a new component.
          </p>

          <p>
            These are tiny tasks, but they add friction when you have to jump between random websites,
            browser tabs, or desktop apps just to finish something simple.
          </p>

          <p>
            That is why I keep a few free browser-based developer utilities handy. They help me handle
            these everyday jobs quickly, and they run locally in the browser, which keeps the workflow simple.
          </p>

          <p>Here are four tools I reach for often.</p>

          <h2>The four tools</h2>

          <div className="not-prose space-y-5 my-10">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.title}
                  className="rounded-2xl border border-border bg-card/70 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-7 mb-4">
                        {tool.desc}
                      </p>
                      <Link
                        to={tool.href}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
                      >
                        {tool.cta}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="!mt-24">Why I use them</h2>

          <p>
            Messy API responses, minified config files, broken query strings, and placeholder copy are all
            small things, but they show up constantly in frontend and backend work.
          </p>

          <p>
            A good utility tool does not need to be flashy. It just needs to solve the problem fast and get
            out of the way so you can return to the real work.
          </p>

          <ul className="list-disc pl-6 space-y-3 marker:text-blue-500 dark:marker:text-blue-400">
            <li>JSON Formatter &amp; Validator for readable API data and syntax checks.</li>
            <li>Base64 Encoder / Decoder for tokens, embedded assets, and encoded payloads.</li>
            <li>URL Encoder / Decoder for fixing query strings, callbacks, and special characters.</li>
            <li>Lorem Ipsum Generator for placeholder text in layouts, mockups, and components.</li>
          </ul>

          <h2 className="!mt-24">How they work together</h2>

          <p>
            A typical workflow for me often looks like this:
          </p>

          <ul className="list-disc pl-6 space-y-3 marker:text-blue-500 dark:marker:text-blue-400">
            {workflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p>
            It keeps everything in one place and removes a surprising number of small interruptions during development.
          </p>

          <div className="not-prose rounded-2xl border border-border bg-card/70 p-5 my-12">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3">
              Practical workflow
            </h3>
            <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-7">
              <li>Inspect raw API output with the JSON Formatter.</li>
              <li>Encode or decode payload pieces with the Base64 tool.</li>
              <li>Fix parameters and special characters with the URL Encoder.</li>
              <li>Generate placeholder copy with Lorem Ipsum while building the UI.</li>
            </ol>
          </div>

          <h2>Why these tools help</h2>

          <p>
            These are not glamorous features, but they solve real everyday problems. The best part is that
            everything runs locally in the browser, so the workflow stays quick, lightweight, and focused.
          </p>

          <ul className="list-disc pl-6 space-y-3 marker:text-blue-500 dark:marker:text-blue-400">
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="not-prose rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 my-12">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-700 dark:text-emerald-100/90 leading-7 m-0">
                Privacy First: These tools run locally in the browser, which keeps common developer tasks
                fast, lightweight, and more private.
              </p>
            </div>
          </div>

          <h2>Try the tools</h2>

          <div className="not-prose grid gap-4 my-10 sm:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.title}
                  to={tool.href}
                  className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.05] p-5 no-underline hover:border-blue-400/40 hover:bg-blue-500/[0.08] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-7 mb-0">
                        {tool.cta}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <h2>FAQ</h2>

          <div className="not-prose space-y-4 my-10">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-border bg-card/70 p-5 sm:p-6"
              >
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-7 mb-0">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <h2>Closing note</h2>

          <p>
            Small tools can save a surprising amount of time. If you work with JSON, Base64, URLs,
            or placeholder content often, having these utilities in one place makes the workflow smoother.
          </p>

          <p>
            Which small developer task wastes the most of your time?
          </p>

          <div className="not-prose rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/15 via-sky-500/10 to-blue-500/15 p-6 mt-14">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Ready to remove small development interruptions?
            </h3>
            <p className="text-gray-700 dark:text-blue-100/80 mb-4 leading-7">
              Open the tools you need and keep your workflow moving.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/json-formatter"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
              >
                Open JSON Formatter
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                Browse More Guides
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
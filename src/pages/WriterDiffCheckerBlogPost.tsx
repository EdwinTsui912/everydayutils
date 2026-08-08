import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileText,
  Type,
  Wind,
  Timer,
} from 'lucide-react';
import SEO from '../components/SEO';

const FAQ_ITEMS = [
  {
    q: 'What makes the Writer Diff Checker different from a regular code diff tool?',
    a: 'Most diff tools compare lines and characters the way compilers do. The Writer Diff Checker works at the word level in natural reading flow, highlights additions, deletions, and modifications in context, and includes writer-focused filters (ignore whitespace, punctuation, case) plus a similarity score so you can see how much the copy actually changed.',
  },
  {
    q: 'Can I use it to review AI-rewritten drafts?',
    a: 'Yes. Paste your original and the AI output side by side. Use the similarity percentage as a reality check (light edits should stay high; a full rewrite will drop noticeably), scan deletions first for missing claims or disclaimers, and review tone shifts in the highlighted modifications.',
  },
  {
    q: 'Does the tool upload my text anywhere?',
    a: 'No. The Writer Diff Checker runs entirely in your browser. Your drafts, contracts, policies, and internal docs never leave your device — the same privacy-first approach used across EverydayUtils.',
  },
  {
    q: 'What filters are available for writers?',
    a: 'You can ignore whitespace, ignore punctuation, ignore case, and collapse unchanged sections. These options are designed around editorial work rather than compiler flags, so you can focus on wording and meaning instead of spacing noise.',
  },
  {
    q: 'Is it useful for short micro-copy as well as long articles?',
    a: 'Yes. It works well for button labels, tooltips, form errors, and checkout copy as well as full blog posts, sales pages, and policy documents. The inline word-level view and summary make even small changes easy to review.',
  },
];

const RELATED_POSTS = [
  {
    slug: '/blog/word-counter-text-sanitizer-guide',
    title: 'The Word Counter & Text Sanitizer I Actually Use Every Day (Especially for Chinese + English)',
    description: 'Clean, count, and normalise your text before or after you compare drafts. Great for mixed-language content and long-form writing.',
    icon: Type,
    tag: 'Text Tools',
  },
  {
    slug: '/blog/pdf-copy-paste-fixer',
    title: 'The PDF Copy-Paste Fixer: How to Clean Messy Text from PDFs in Seconds (2026 Guide)',
    description: 'If your “draft” started as a messy copy-paste from a PDF, fix the broken line breaks and stray spaces before you run your diff.',
    icon: FileText,
    tag: 'Text Tools',
  },
  {
    slug: '/blog/breathing-timer-focus-stress-sleep',
    title: 'How a Simple Breathing Timer Quietly Fixes Your Focus, Stress, and Sleep',
    description: 'Use guided breathing between revision rounds to reset your mind and come back to your drafts with fresh focus.',
    icon: Wind,
    tag: 'Focus',
  },
  {
    slug: '/blog/pomodoro-timer-free-online',
    title: "I Couldn't Focus for More Than 12 Minutes — This Simple Timer Changed Everything",
    description: 'Combine the Writer Diff Checker with structured Pomodoro sessions to make steady, confident progress on big writing projects.',
    icon: Timer,
    tag: 'Focus',
  },
];

export default function WriterDiffCheckerBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <SEO
        title="The Writer Diff Checker I Actually Needed (Not Another Developer Diff Tool)"
        description="A privacy-first, word-level diff tool built for writers. Compare drafts, review AI edits, and see real changes with similarity score, filters, and clean inline highlighting — 100% in your browser."
        keywords="writer diff checker, text diff, word level diff, compare drafts, AI rewrite review, writing tools, privacy first, client side diff, similarity score"
        url="https://www.everydayutils.com/blog/writer-diff-checker"
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
            headline: 'The Writer Diff Checker I Actually Needed (Not Another Developer Diff Tool in Disguise)',
            description:
              'A privacy-first, word-level diff tool built for writers. Compare drafts, review AI edits, and see real changes with similarity score, filters, and clean inline highlighting — 100% in your browser.',
            url: 'https://everydayutils.com/blog/writer-diff-checker',
            datePublished: '2026-08-02',
            dateModified: '2026-08-02',
            author: { '@type': 'Organization', name: 'EverydayUtils' },
            publisher: { '@type': 'Organization', name: 'EverydayUtils' },
          })}
        </script>
      </Helmet>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <Calendar size={13} />
          <span>August 2, 2026</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60">
            <FileText size={12} />
            Text Tools
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-tight mb-4">
          The Writer Diff Checker I Actually Needed (Not Another Developer Diff Tool in Disguise)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          A word-level, privacy-first diff tool that treats you like a writer — not a compiler.
        </p>
      </div>

      {/* Top CTA */}
      <Link
        to="/writer-diff-checker"
        className="inline-flex items-center gap-2 mb-12 px-4 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
      >
        <FileText size={16} />
        Try the Writer Diff Checker
        <ArrowRight size={15} />
      </Link>

      {/* Body */}
      <article className="space-y-12">
        <section>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you write for a living—or even “just” publish the occasional landing page or newsletter—you’ve probably had this experience:
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            You know you changed something between Draft A and Draft B, but you can’t see it clearly. Traditional diff checkers flood your screen with red and green. AI assistants happily rewrite your copy, but don’t show you what they touched. You’re left with a vague sense that the new version is “different,” without any real control over what changed.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            That’s why I built the Writer Diff Checker for EverydayUtils. It’s a diff tool that finally treats you like a writer, not a compiler.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            The pain of using “developer diff” for writing
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Most popular diff checkers were built for code first:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'They compare lines and characters, not real words or sentences.',
              'A moved phrase turns half your page into “changed” lines.',
              'Small tweaks to spacing or punctuation trigger noisy red/green blocks.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you’ve tried comparing two drafts of a blog post with those tools, you’ve probably seen:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'A simple heading change highlighted as if you rewrote the entire section.',
              'Extra spaces, line breaks, and comma tweaks counted as “major” edits.',
              'No clear similarity score to tell you how much the new version actually diverged from the original.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            That’s fine when you’re reviewing a pull request. It’s terrible when you’re trying to see how your editor or AI assistant changed your copy.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
            The Writer Diff Checker flips that experience. It’s tuned for real-world writing workflows, not just JSON payloads and code reviews (though EverydayUtils has those covered in the JSON Formatter guide if you need them).
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            What the Writer Diff Checker actually does differently
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                1. Word-level diff in natural reading flow
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Instead of working line by line, the Writer Diff Checker compares text at the word level and shows differences inline:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'You paste your draft and edited version.',
                  'The output reads like a normal paragraph or page.',
                  'Additions, deletions, and modifications are highlighted in context.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                It feels more like reading a lightly marked-up document than staring at a code diff. You can skim paragraphs and still see exactly:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'Which adjectives were swapped.',
                  'Where tone shifted from “soft” to “direct”.',
                  'Which promises or disclaimers disappeared.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                For longer pieces, you can enable “Collapse unchanged sections” to fold away large chunks of identical text and focus on the changes—similar to how you might use the collapse option when reading longer guides on EverydayUtils, like the Word Counter & Text Sanitizer guide.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                2. Filters that match editorial reality
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Developer diff tools come with options like “ignore CRLF” and “whitespace mode.” Writers need something simpler:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'Ignore whitespace — stop caring about extra spaces and line breaks when you’re just reviewing the wording.',
                  'Ignore punctuation — useful when you’re polishing commas and exclamation marks but want the diff to focus on substantial changes.',
                  'Ignore case — great when you’re comparing drafts where capitalisation isn’t meaningful, or checking AI-generated variants.',
                  'Collapse unchanged sections — for long articles, sales pages, or policy docs, this keeps the view sane.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                These toggles are built around how you actually edit copy, not how a compiler thinks about input.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                3. A human-readable summary and similarity score
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Instead of a raw “diff complete,” you get a short summary near the top:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'Whether the edited version is longer, shorter, or similar in length.',
                  'How many insertions, deletions, and modifications there were.',
                  'A similarity percentage that gives you a quick sense of how heavy the edit was.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                In AI-assisted writing, that similarity score becomes your reality check:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'If you asked for “light edits” and the similarity is still 85–95%, you’re in the right ballpark.',
                  'If you asked for “minor tweaks” and see 40–50% similarity, you know the AI went much further than you intended.',
                  'You can use the Writer Diff Checker as a “trust but verify” step whenever you accept AI-suggested drafts.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                It pairs naturally with tools like PromptForge, where you craft better prompts—but still want visibility into what changed between versions.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                4. Privacy-first, like the rest of EverydayUtils
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                EverydayUtils tools share one core rule: your data stays in your browser.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                The Writer Diff Checker:
              </p>
              <ul className="space-y-2 mb-3">
                {[
                  'Runs entirely client-side. There is no server-side diff engine and no content upload.',
                  'Doesn’t require sign-up or account creation.',
                  'Doesn’t track your drafts, contracts, or internal docs.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                If you’ve already been using privacy-first tools like the PDF Copy-Paste Fixer or the Breathing Timer, you’ll recognise the same philosophy here: useful, fast, and private.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Real daily use cases where this tool shines
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Compare your draft vs your editor’s version
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                You send a long article or sales page to an editor. It comes back looking good—but you want to understand how your voice and structure changed.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                With the Writer Diff Checker:
              </p>
              <ol className="space-y-2 mb-3 list-decimal list-inside text-gray-600 dark:text-gray-300">
                <li>Paste your original into the draft box.</li>
                <li>Paste the edited version into the edited box.</li>
                <li>Turn on Collapse unchanged sections.</li>
                <li>Scan the highlighted sentences and the summary.</li>
              </ol>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                You’ll see whether they:
              </p>
              <ul className="space-y-2">
                {[
                  'Simply tightened language and fixed spelling.',
                  'Reframed entire sections or changed key claims.',
                  'Removed or softened promises you care about.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                You stay in control of your message, even as others help refine it.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Review AI-assisted copy changes before you ship
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Let’s say you used an AI assistant to rewrite your hero section or email sequence. The assistant is great at generating options, but not great at telling you exactly what it altered.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Drop your original copy and the AI output into the Writer Diff Checker:
              </p>
              <ul className="space-y-2">
                {[
                  'Focus on deleted sections first to ensure nothing important vanished—such as price points, guarantees, or legal disclaimers.',
                  'Look at modifications to see where tone shifted.',
                  'Use the similarity score to confirm whether the AI did “light editing” or a full rewrite.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                It adds a layer of safety that generic “rewrite this” prompts don’t provide.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Track micro-copy changes across your product
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Micro copy—button labels, tooltips, form errors—can make or break user experience and conversion.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                You can use the Writer Diff Checker to:
              </p>
              <ul className="space-y-2">
                {[
                  'Compare old and new button text (“Submit” vs “Get my free quote”).',
                  'Review changes to checkout copy, onboarding steps, or in-app messages.',
                  'Document exactly what changed when you test new variants.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                It’s the same mindset you might use when measuring output with the Percentage Calculator or structuring deep work with the Pomodoro Timer: small tweaks, clearly measured.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Safely compare sensitive text (contracts, policies, internal docs)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Some text is too sensitive to paste into random online tools: contracts, policy pages, internal documentation, HR communications.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Because the Writer Diff Checker is fully client-side:
              </p>
              <ul className="space-y-2">
                {[
                  'You can compare before vs after versions of contracts and policies without sending them anywhere.',
                  'Focus on modifications to see where obligations and definitions shifted.',
                  'Pair with tools like the PDF Copy-Paste Fixer when your source material started as a messy PDF export.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                You get clarity without compromising confidentiality.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            How to start using the Writer Diff Checker (today)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            You don’t need a tutorial to get value out of this tool:
          </p>
          <ol className="space-y-3 mb-4 list-decimal list-inside text-gray-600 dark:text-gray-300">
            <li>Paste your original draft on the left.</li>
            <li>Paste your edited or AI-modified version on the right.</li>
            <li>
              Adjust the toggles:
              <ul className="mt-2 ml-6 space-y-1 list-disc">
                <li>Ignore whitespace if spacing isn’t the point.</li>
                <li>Ignore punctuation if you’re focused on meaning, not commas.</li>
                <li>Collapse unchanged sections for long text.</li>
              </ul>
            </li>
            <li>Read the summary and skim the inline diff.</li>
          </ol>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            You’ll feel the difference compared to generic diff checkers immediately. Instead of drowning in noise, you see the actual changes that matter.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="card p-5">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">{item.q}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
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
                  className="card group flex flex-col gap-3 p-4 hover:border-brand-500/40 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500/10 to-cyan-500/10 dark:from-brand-500/20 dark:to-cyan-500/20 flex items-center justify-center text-brand-500 flex-shrink-0 group-hover:from-brand-500/20 group-hover:to-cyan-500/20 transition-colors duration-200">
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-brand-500">{post.tag}</span>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-0.5 leading-snug group-hover:text-brand-500 transition-colors duration-200">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <span className="text-xs font-medium text-brand-500 mt-auto inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read article
                    <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </article>

      {/* Bottom CTA */}
      <div className="mt-14 p-6 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">Ready to compare your drafts?</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Free, private, and built for writers — no sign-up required. See exactly what changed.
        </p>
        <Link
          to="/writer-diff-checker"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          <FileText size={16} />
          Open Writer Diff Checker
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Wind,
  Timer,
  Heart,
} from 'lucide-react';
import SEO from '../components/SEO';

const FAQ_ITEMS = [
  {
    q: 'What is a breathing timer?',
    a: 'A breathing timer guides you through structured inhale, hold, and exhale phases so you do not have to count in your head. Patterns like 4-7-8, box breathing, and coherent breathing are timed visually—often with an orb or countdown—so your attention can stay on the breath itself.',
  },
  {
    q: 'How is a breathing timer different from a meditation app?',
    a: 'Meditation apps often include long sessions, accounts, and content libraries. A breathing timer is deliberately minimal: no sign-up, no feed, just a few patterns and short presets (2–8 minutes) you can use between meetings or before focused work.',
  },
  {
    q: 'Which breathing pattern should I use for focus at work?',
    a: 'Box breathing (4-4-4-4) and 4-6 focus breathing work well before deep work or after a stressful call. They give your nervous system a steady rhythm without requiring a long break. Pair a 2-minute session with a Pomodoro block if you want structure for both calm and work.',
  },
  {
    q: 'Can 4-7-8 breathing help with sleep?',
    a: 'Many people use 4-7-8 (inhale 4, hold 7, exhale 8) as an evening wind-down. Slow, rhythmic breathing is associated with a calmer state that may support falling asleep more easily. It is not a medical treatment; think of it as a gentle pre-sleep habit, not a cure for insomnia.',
  },
  {
    q: 'Is this breathing timer private?',
    a: 'Yes. The EverydayUtils breathing timer runs entirely in your browser. There is no account, no tracking of your sessions, and no data sent to a server for the core experience.',
  },
  {
    q: 'How do I combine a breathing timer with the Pomodoro technique?',
    a: 'Use a short breathing session (2–3 minutes of 4-6 or box breathing) right before you start a Pomodoro work block. That way the focus timer begins after a brief reset, not while your mind is still scattered.',
  },
];

const RELATED_POSTS = [
  {
    slug: '/blog/pomodoro-timer-free-online',
    title: 'Free Pomodoro Timer Online – Accurate, Private & Mobile-Friendly Focus Tool',
    icon: Timer,
    tag: 'Productivity',
  },
  {
    slug: '/blog/15-tools-18-posts-milestone',
    title: '18 Blog Posts, 15 Tools — Building EverydayUtils in Public',
    icon: Heart,
    tag: 'Build in Public',
  },
];

export default function BreathingTimerBlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <SEO
        title="How a Simple Breathing Timer Quietly Fixes Your Focus, Stress, and Sleep"
        description="Use a free breathing timer for focus and stress with 4-7-8, box breathing, coherent breathing, and 4-6 patterns. Pair it with Pomodoro for work, meetings, and evening wind-downs—private and client-side."
        keywords="breathing timer for focus and stress, 4-7-8 breathing timer for sleep, box breathing for work stress, how to use a breathing timer with a Pomodoro timer, coherent breathing, guided breathing timer"
        url="https://www.everydayutils.com/blog/breathing-timer-focus-stress-sleep"
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
            headline:
              'How a Simple Breathing Timer Quietly Fixes Your Focus, Stress, and Sleep',
            description:
              'Use a free breathing timer for focus and stress with 4-7-8, box breathing, coherent breathing, and 4-6 patterns. Pair it with Pomodoro for work, meetings, and evening wind-downs.',
            url: 'https://everydayutils.com/blog/breathing-timer-focus-stress-sleep',
            datePublished: '2026-08-01',
            dateModified: '2026-08-01',
            author: { '@type': 'Organization', name: 'EverydayUtils' },
            publisher: { '@type': 'Organization', name: 'EverydayUtils' },
          })}
        </script>
      </Helmet>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Productivity
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            August 1, 2026
          </span>
          <span>·</span>
          <span>8 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-tight mb-4">
          How a Simple Breathing Timer Quietly Fixes Your Focus, Stress, and Sleep
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          A practical guide to 4-7-8, box breathing, coherent breathing, and short focus patterns—and how to
          stack them with Pomodoro without another complicated wellness routine.
        </p>
      </div>

      {/* Top CTA */}
      <Link
        to="/breathing-timer"
        className="inline-flex items-center gap-2 mb-12 px-4 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
      >
        <Wind size={16} />
        Try the guided breathing timer
        <ArrowRight size={15} />
      </Link>

      {/* Body */}
      <div className="space-y-12">
        <section>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you’re like most people working online, your day is a blur of tabs, notifications, and
            half-finished thoughts. You know you “should” take breaks. You’ve heard about deep breathing,
            mindfulness, and the famous Pomodoro technique. But when you’re drowning in tasks, another
            productivity hack can feel like one more thing to manage.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            That’s exactly why we built a breathing timer: not as a wellness gimmick, but as a tiny tool that
            quietly fits into the day you already have.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Instead of asking you to become a yogi overnight, our breathing timer gives you three things:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'A clear, visual guide for breathing patterns grounded in common practice and research.',
              'Session presets that fit between real meetings and Pomodoro blocks.',
              'A calm space where you can feel human for 2–8 minutes, without apps shouting at you.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Let’s break down the patterns, the ideas behind them, and—most importantly—the real-world use
            cases, so you can see how a breathing timer for focus and stress goes beyond “take a deep breath”
            advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Why a Breathing Timer Instead of Another Meditation App?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Meditation apps are great, but they often ask for long sessions, heavy onboarding, and lots of
            content. Our breathing timer takes the opposite approach:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'No account.',
              'No content feed.',
              'Just a clean interface, an orb, and four simple breathing patterns.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            You press start. The orb grows and softens in rhythm with your breath. A soft visual and optional
            chimes guide you through the phases: inhale, hold, exhale, and sometimes a second hold. You don’t
            have to count in your head; the breathing timer does it for you, so your brain can relax instead of
            doing math.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            For many people, that tiny difference—having the pattern handled for you—is what finally makes slow
            breathing for stress and focus usable during the workday.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            The Science Behind the Breathing Patterns (Without the Jargon)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            We chose four breathing patterns that are widely used in practice and reasonably supported by
            research and clinical education—not internet folklore. None of this replaces professional care; think
            of these as tools that may support calm, focus, and wind-down, not medical treatments.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                1. 4-7-8 Breathing (“Deep Reset”)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Pattern:</strong> inhale for 4 seconds, hold
                for 7, exhale for 8.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                This rhythm is sometimes called “relaxing breath.” Longer exhales and a deliberate hold are often
                linked with a calmer stress response and an easier shift toward rest. Many people use a 4-7-8
                breathing timer for sleep and evening wind-downs because the structure is simple and the long
                exhale feels grounding.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                The longer exhale and hold phase can help nudge your system toward rest-and-digest mode and away
                from a constant fight-or-flight feel—especially after a hard day.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We label it “Deep Reset” in the breathing timer because it fits well for evening wind-downs after
                a long day, post-stress recovery after tough conversations or heavy tasks, and longer breaks
                between deep work sessions.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                2. Box Breathing 4-4-4-4 (“Calm Focus”)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Pattern:</strong> inhale 4, hold 4, exhale 4,
                hold 4.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Box breathing shows up in high-stress settings—athletes, performers, and people who need a
                predictable rhythm under pressure. Everything is symmetrical: breath in, hold, breath out, hold.
                Your attention gets a steady loop to latch onto, which is why box breathing for work stress is so
                popular between meetings.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Used regularly, slow controlled breathing like this is often associated with lower anxiety and
                clearer concentration. We recommend it before important meetings, before starting a Pomodoro work
                block, and any moment you feel jittery but still need to perform.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                3. Coherent Breathing 5-5 (“Balanced Energy”)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Pattern:</strong> inhale 5 seconds, exhale 5
                seconds, repeat.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                This is often described as heart-coherent or resonant-style breathing—roughly five to six breaths
                per minute. Steady, even rhythms like this are linked in research and practice with better stress
                tolerance and a more balanced feel over time. It is not designed to knock you out; it is meant to
                steady you.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                In our breathing timer we call it “Balanced Energy” and recommend it for mid-day breaks when you
                are tired but cannot afford to get sleepy, longer 8-minute sessions between bigger work blocks, and
                gentle resets on days that feel “too much but not catastrophic.”
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                4. 4-6 Focus Breathing (“Quick Boost”)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Pattern:</strong> inhale 4 seconds, exhale 6
                seconds.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Shorter inhale, slightly longer exhale—this pattern can calm your system without feeling heavy. It
                borrows the idea that elongating the exhale can lower arousal, while keeping the total cycle short
                enough for a real workday.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We recommend it for 2–3 minute micro-breaks during intense work, right before starting a Pomodoro
                block, and those “I have three minutes and my brain feels like a browser with 50 tabs open”
                moments.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Real Use Cases: Where the Breathing Timer Actually Helps
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Theory is nice, but tools live or die on use cases. Here’s how people can realistically use a
            breathing timer alongside a Pomodoro timer and other daily habits.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Use case 1: Pre-Pomodoro reset in under 2 minutes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Pain point:</strong> You want to start a
                25-minute deep work block, but your mind is scattered. You open the Pomodoro timer and feel
                guilty about “wasting time,” so you push through while stressed—and the block ends up low-quality.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Solution:</strong>
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                <li>
                  Open the{' '}
                  <Link to="/breathing-timer" className="text-brand-500 hover:underline">
                    guided breathing timer
                  </Link>
                  .
                </li>
                <li>Choose 4-6 Focus Breathing.</li>
                <li>Select a 2-minute session preset.</li>
                <li>Watch the orb: inhale as it grows, exhale as it softens.</li>
                <li>
                  When the session ends, switch to your{' '}
                  <Link to="/pomodoro" className="text-brand-500 hover:underline">
                    Pomodoro focus timer
                  </Link>{' '}
                  and start the work block.
                </li>
              </ol>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-800 dark:text-gray-200">Result:</strong> you’ve spent two minutes
                shifting toward calm focus instead of starting already frazzled. You’re more likely to actually
                use those 25 minutes well—this is the simplest answer to how to use a breathing timer with a
                Pomodoro timer.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Use case 2: Micro-reset between back-to-back meetings
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Pain point:</strong> Your calendar is stacked.
                After one stressful call, you jump directly into another. There’s no space to process, and by 3 PM
                you feel emotionally flat and mentally overloaded.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Solution:</strong> When a meeting ends, do not
                open your inbox immediately. Open the breathing timer, choose Box Breathing (4-4-4-4), set a
                5-minute session, and breathe with the orb. Let the square rhythm pull you out of “meeting mode.”
                Only after that, scan what’s next.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-800 dark:text-gray-200">Result:</strong> you create a small emotional
                margin between events. Over a week, that often does more for stress than pretending you can handle
                every meeting back-to-back with no buffer.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Use case 3: Evening 4-7-8 for sleep, not just stress
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Pain point:</strong> You finish a long day,
                scroll on your phone, and then wonder why your mind refuses to sleep. You’ve heard “try 4-7-8
                breathing,” but counting in your head only makes you more aware of the clock.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                <strong className="text-gray-800 dark:text-gray-200">Solution:</strong> Open the breathing timer,
                select 4-7-8 Breathing, choose 8 minutes or a custom length that feels realistic, and lie down or
                sit comfortably. Let the orb guide inhale, hold, and the long exhale. Optional: turn sound on for
                gentle chimes.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Slow, rhythmic breathing like 4-7-8 is commonly used to support a calmer evening routine and may
                help with sleep onset for some people. It is a habit, not a diagnosis or a guarantee—use it as a
                quiet off-ramp from the day.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Human Pain Points This Helps Solve (Beyond “Breathe More”)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Let’s be honest: “Just breathe” can sound dismissive when you’re overwhelmed. A breathing timer with
            clear patterns and presets helps with bigger friction points:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'Decision fatigue — you don’t have to invent a technique. Pick a mode and press start.',
              'Time guilt — the timer is explicit: 2, 5, or 8 minutes. You know what you’re committing to, and you can pair it with a Pomodoro so it supports work instead of competing with it.',
              'Counting anxiety — if you’ve tried to count 4-7-8 in your head and felt more tense, you’re not alone. The orb and countdown handle the timing so you can let go.',
              'Inconsistent practice — a lightweight, visually guided tool makes small habits easier: 2 minutes before deep work, 5 minutes after heavy meetings, 8 minutes before sleep.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            In other words, this breathing timer isn’t about making you perfectly calm. It’s about giving you
            tiny, realistic levers for regulating stress and focus in the day you already live.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            How This Fits with Your Other Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you already use tools like a{' '}
            <Link to="/pomodoro" className="text-brand-500 hover:underline">
              Pomodoro timer
            </Link>{' '}
            for structured work blocks, a task list, or small daily rituals, you can position the breathing timer
            as:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'The bridge between planning and doing — 2 minutes of breathing before each work block.',
              'The buffer between intense tasks — box breathing between back-to-back meetings.',
              'The off-ramp from work into rest — 4-7-8 breathing in the evening.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            For the story behind why EverydayUtils exists as a privacy-first toolkit, see our{' '}
            <Link to="/blog/15-tools-18-posts-milestone" className="text-brand-500 hover:underline">
              milestone recap on building tools and posts in public
            </Link>
            . And if focus systems are your main struggle,{' '}
            <Link to="/blog/pomodoro-timer-free-online" className="text-brand-500 hover:underline">
              how a simple Pomodoro timer can support focus
            </Link>{' '}
            pairs naturally with a short breathing reset.
          </p>
        </section>

        {/* Pin-friendly summary */}
        <section className="card p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            Pin This Guide: 4 Breathing Patterns at a Glance
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            Save this section for later—or turn it into a Pinterest pin—as a quick reference for your day.
          </p>
          <ul className="space-y-4">
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-800 dark:text-gray-100">4-7-8 Breathing → “Deep Reset”</strong>
              <br />
              Best for evenings and post-stress resets. A natural fit as a 4-7-8 breathing timer for sleep and
              wind-down.
            </li>
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-800 dark:text-gray-100">Box Breathing → “Calm Focus”</strong>
              <br />
              Best before meetings and Pomodoro sessions. Ideal for box breathing for work stress between calls.
            </li>
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-800 dark:text-gray-100">Coherent Breathing → “Balanced Energy”</strong>
              <br />
              Best for mid-day breaks when you need steady energy, not a nap.
            </li>
            <li className="text-gray-600 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-800 dark:text-gray-100">4-6 Focus Breathing → “Quick Boost”</strong>
              <br />
              Best for 2–3 minute micro-breaks and pre-Pomodoro resets—especially if you’re learning how to use a
              breathing timer with a Pomodoro timer for deep work focus.
            </li>
          </ul>
          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Use our free{' '}
            <Link to="/breathing-timer" className="text-brand-500 hover:underline">
              breathing timer
            </Link>{' '}
            with the{' '}
            <Link to="/pomodoro" className="text-brand-500 hover:underline">
              Pomodoro timer
            </Link>{' '}
            to make this a daily habit.
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
                  className="card group flex items-start gap-3 p-4 hover:border-brand-500/40 transition-colors duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500/10 to-cyan-500/10 dark:from-brand-500/20 dark:to-cyan-500/20 flex items-center justify-center text-brand-500 flex-shrink-0 group-hover:from-brand-500/20 group-hover:to-cyan-500/20 transition-colors duration-200">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-brand-500">{post.tag}</span>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mt-0.5 leading-snug group-hover:text-brand-500 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 p-6 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Ready for a quieter kind of focus?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Free, private, and instant — no sign-up. Built for real workdays, not wellness theater.
        </p>
        <Link
          to="/breathing-timer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          <Wind size={16} />
          Open Breathing Timer
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Timer } from 'lucide-react';

export default function PomodoroTimerBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} />
          Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Pomodoro Timer Guide</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Productivity
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            7 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 22, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free Pomodoro Timer Online – Accurate, Private & Mobile-Friendly Focus Tool (2026)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          A clean, distraction-free Pomodoro timer that runs entirely in your browser. No sign-up, no tracking, works offline, and keeps your screen awake.
        </p>
      </header>

      {/* Top CTA */}
      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white flex-shrink-0">
            <Timer size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Works offline.</p>
          </div>
        </div>
        <Link to="/pomodoro" className="btn-primary text-sm flex-shrink-0">
          Open Pomodoro Timer
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why the Pomodoro Technique Works
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The Pomodoro Technique breaks work into focused 25-minute sessions followed by short breaks. This rhythm helps maintain high concentration while preventing burnout.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Makes This Timer Different
          </h2>
          <ul className="space-y-3">
            {[
              'Works completely offline',
              'Keeps your screen awake during sessions',
              'Accurate even when you switch tabs',
              'Keyboard shortcuts (Space to start/pause, R to reset, S to skip)',
              'Customizable work/break times and presets',
              'Clean, minimalist design with no distractions',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How I Use It Daily
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            I start my day by listing my top 3 tasks. For each task, I decide how many Pomodoros it needs. Then I work in focused bursts, taking short breaks to recharge. After 4 sessions, I take a longer break.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Privacy First
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Everything runs locally in your browser. No data is collected or sent anywhere.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is the timer free?',
                a: 'Yes. Completely free with no limits or sign-up.',
              },
              {
                q: 'Does it work when I switch tabs?',
                a: 'Yes. The timer continues accurately even in background tabs.',
              },
              {
                q: 'Can I customize the times?',
                a: 'Yes. You can set your own work, short break, and long break durations.',
              },
              {
                q: 'Does it keep my screen awake?',
                a: 'Yes. It uses the Wake Lock API to prevent your screen from sleeping during sessions.',
              },
            ].map((item) => (
              <div key={item.q} className="card p-5">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{item.q}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-6 text-center">
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to improve your focus?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Try the free Pomodoro timer now.
            </p>
            <Link to="/pomodoro" className="btn-primary inline-flex items-center gap-2">
              Open Pomodoro Timer Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
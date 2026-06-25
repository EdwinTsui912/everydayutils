import { Zap, Shield, Globe, MapPin, Mail, Code2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PILLARS = [
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'All processing happens locally in your browser. Your data never touches a server.',
    bg: 'bg-green-50 dark:bg-green-950/40',
    iconColor: 'text-green-600 dark:text-green-400',
    border: 'border-green-100 dark:border-green-900',
  },
  {
    icon: Globe,
    title: 'Always Free',
    desc: 'No sign-up, no paywalls, no usage limits. Free to use forever.',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-100 dark:border-blue-900',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'No server round-trips. Every tool responds the moment you interact with it.',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-100 dark:border-amber-900',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-fade-in">

      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <Zap size={28} className="text-white" />
        </div>
        <div>
          <h1 className="page-title">About EverydayUtils</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mt-2 max-w-sm mx-auto">
            A free toolkit built for the small, repetitive tasks that interrupt your day.
          </p>
        </div>
      </div>

      {/* What it is */}
      <div className="card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-50 dark:bg-brand-950/60 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles size={15} className="text-brand-600 dark:text-brand-400" />
          </div>
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">What is EverydayUtils?</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          EverydayUtils is a collection of browser-based utility tools — password generators, text formatters,
          color palette builders, QR code makers, percentage calculators, and more. Everything is in one place,
          loads instantly, and works without an account.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          The goal is simple: give you the tool, get out of your way. No ads cluttering the interface, no cookie
          banners demanding your attention, no subscription prompts. Just the tool.
        </p>
      </div>

      {/* Three pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PILLARS.map(p => (
          <div key={p.title} className={`card border ${p.border} p-5 space-y-3`}>
            <div className={`w-9 h-9 ${p.bg} rounded-xl flex items-center justify-center`}>
              <p.icon size={17} className={p.iconColor} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The person behind it */}
      <div className="card p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-50 dark:bg-brand-950/60 rounded-lg flex items-center justify-center shrink-0">
            <Code2 size={15} className="text-brand-600 dark:text-brand-400" />
          </div>
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">The person behind it</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          Hi — I'm <strong className="text-gray-800 dark:text-gray-200 font-semibold">Edwin</strong>, based in
          Hong Kong. EverydayUtils started as a personal project: I kept opening different websites to do basic
          tasks and wanted everything in one fast, clean place. I built it for myself, then put it online
          in case it's useful to others too.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          It's a side project, not a startup. There's no team, no investor deck, no growth targets —
          just a developer who wanted better tools and thought you might too.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={13} className="text-brand-500 shrink-0" />
            Hong Kong
          </div>
          <a
            href="mailto:everydayutils.contact@gmail.com"
            className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:underline transition-colors"
          >
            <Mail size={13} className="shrink-0" />
            everydayutils.contact@gmail.com
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Have feedback or a tool idea?</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Bug reports and suggestions are always welcome.</p>
        </div>
        <Link to="/contact" className="btn-primary shrink-0">
          <Mail size={14} />
          Get in Touch
        </Link>
      </div>

    </div>
  );
}

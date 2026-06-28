import { Link } from 'react-router-dom';
import { Type, KeyRound, Palette, Percent, QrCode, AlignLeft, FileJson, Timer, ArrowRight, Shield, Zap, Globe, Code2, ImageIcon, ArrowRightLeft } from 'lucide-react';

const TOOLS = [
  {
    path: '/text-tools',
    icon: Type,
    label: 'Text Tools Suite',
    description: 'Word counter, text sanitizer, and case converter — all in one place.',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    path: '/password-generator',
    icon: KeyRound,
    label: 'Password Generator',
    description: 'Generate strong passwords with strength meter and crack-time estimation.',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    path: '/username-generator',           // ← NEW
    icon: ArrowRightLeft,
    label: 'Username Generator',
    description: 'Create cool, unique usernames for gaming, Twitch, Discord, YouTube & more.',
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    path: '/url-encoder',
    icon: ArrowRightLeft,
    label: 'URL Encoder',
    description: 'Encode and decode URLs, query strings, and special characters.',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    path: '/base64',
    icon: Code2,
    label: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings instantly. Perfect for APIs and data handling.',
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    path: '/json-formatter',
    icon: FileJson,
    label: 'JSON Formatter',
    description: 'Format, minify, validate and beautify JSON instantly with real-time validation and error highlighting.',
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    path: '/image-converter',
    icon: ImageIcon,
    label: 'Image Format Converter',
    description: 'Convert JPG, PNG, WebP instantly in your browser. Fast and private.',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    path: '/qr-generator',
    icon: QrCode,
    label: 'QR Generator',
    description: 'Create QR codes for URLs, text, and WiFi networks instantly.',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    path: '/palette-generator',
    icon: Palette,
    label: 'Color Palette Generator',
    description: 'Instant harmonious palettes with HEX, RGB, HSL and Tailwind/CSS export.',
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    path: '/percentage-calculator',
    icon: Percent,
    label: 'Percentage Calculator',
    description: 'Discounts, tips, bill splitting, percentage changes and more.',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    path: '/lorem-ipsum-generator',
    icon: AlignLeft,
    label: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text with custom paragraph count, length, and HTML output.',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    path: '/pomodoro',
    icon: Timer,
    label: 'Pomodoro Timer',
    description: 'Boost focus with timed work and break sessions. Classic 25/5 or Extended 50/10 cycles.',
    bg: 'bg-red-50 dark:bg-red-950/40',
    iconColor: 'text-red-500 dark:text-red-400',
  },
];

const FEATURES = [
  { icon: Zap,    label: 'Instant & Fast',  desc: 'All tools process data instantly with no loading spinners.' },
  { icon: Shield, label: '100% Private',    desc: 'Nothing ever leaves your browser. Zero tracking, zero data collection.' },
  { icon: Globe,  label: 'Works Offline',   desc: 'Once loaded, all tools work without an internet connection.' },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-14 animate-fade-in">
      {/* Hero */}
      <div className="text-center space-y-5 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-full text-brand-700 dark:text-brand-300 text-xs font-semibold">
          <Shield size={11} />
          Privacy-first · Client-side only
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
          Free Online Web Utilities & Privacy-First Browser Tools
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Fast, useful tools that run 100% in your browser — no sign-up, no tracking, no nonsense.
        </p>
      </div>

      {/* Tools grid */}
      <section className="animate-slide-in">
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5">All Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="card-hover group p-5 flex flex-col gap-3 min-w-0"
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`p-2.5 rounded-xl shrink-0 ${tool.bg}`}>
                  <tool.icon size={20} className={tool.iconColor} />
                </div>
                <ArrowRight size={15} className="text-gray-300 dark:text-gray-600 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 break-words">{tool.label}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed break-words">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {FEATURES.map(f => (
          <div key={f.label} className="card p-5 text-center space-y-2.5 hover:shadow-md transition-shadow duration-200">
            <div className="w-10 h-10 bg-brand-50 dark:bg-brand-950/60 rounded-xl flex items-center justify-center mx-auto">
              <f.icon size={18} className="text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{f.label}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
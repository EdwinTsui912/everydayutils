import { Link } from 'react-router-dom';
import { BookOpen, QrCode, KeyRound, FileText, Type, Clock, ArrowRight, AlignLeft, Braces, Timer, Palette, Percent, ArrowRightLeft, User, Image as ImageIcon, Wand2 } from 'lucide-react';

const posts = [
  {
    title: "Stop Wasting Time with Generic AI Prompts: Meet PromptForge, the Private AI Prompt Generator That Actually Works",
    date: "June 30, 2026",
    readTime: "8 min",
    category: "AI Tools",
    slug: "/blog/promptforge-launch",
    excerpt: "Tired of vague AI responses? PromptForge is a free, 100% private AI prompt generator. Build high-quality prompts for ChatGPT, Claude, Gemini, and Grok using proven frameworks — all in your browser.",
    icon: Wand2,
    tag: "AI Tools",
  },
  {
    title: "Free Private Image Converter: Convert JPG, PNG & WebP Locally (No Upload)",
    date: "June 29, 2026",
    readTime: "5 min",
    category: "Utility Tools",
    slug: "/blog/image-converter",
    excerpt: "Convert images instantly between JPG, PNG, and WebP directly in your browser. 100% private, no uploads, no sign-up. Fast and secure local image conversion.",
    icon: ImageIcon,
    tag: "Utility Tools",
  },
  {
    title: "Best Free Username Generator 2026 – Cool, Aesthetic & Gaming Names Instantly",
    date: "June 29, 2026",
    readTime: "7 min",
    category: "Gaming & Social",
    slug: "/blog/best-free-username-generator-2026",
    excerpt: "Instantly generate cool, aesthetic, tryhard, and gaming usernames for Roblox, Discord, Instagram, TikTok and more. Free, private, no sign-up required.",
    icon: User,
    tag: "Gaming & Social",
  },
  // ... rest of your existing posts remain the same
  {
    slug: '/blog/percentage-calculator',
    title: 'Free Percentage Calculator for Discounts, Tax, Tips & More',
    excerpt:
      'Stop doing mental math at the checkout counter. Calculate discounts, tax, tips, and markups instantly — 100% private, no sign-up, works on mobile.',
    date: 'June 24, 2026',
    readTime: '3 min read',
    icon: Percent,
    tag: 'Calculators',
  },
  {
    slug: '/blog/color-palette-generator-tailwind',
    title: 'Free Tailwind CSS Color Palette Generator – Instant, Private & No Sign-Up (2026)',
    excerpt:
      'Stop manually picking colors for every project. Generate harmonious Tailwind CSS palettes in one click — export HEX, RGB, HSL, and ready-to-paste config code. 100% client-side, no account needed.',
    date: 'June 24, 2026',
    readTime: '3 min read',
    icon: Palette,
    tag: 'Design Tools',
  },
  {
    slug: '/blog/pomodoro-timer-free-online',
    title: 'Free Pomodoro Timer Online – Accurate, Private & Mobile-Friendly Focus Tool (2026)',
    excerpt:
      'A clean, 100% client-side Pomodoro timer that works offline, stays accurate in background tabs, and keeps your phone screen awake. No sign-up, no tracking.',
    date: 'June 23, 2026',
    readTime: '4 min read',
    icon: Timer,
    tag: 'Productivity',
  },
  {
    slug: '/blog/json-formatter-guide',
    title: 'The Best Free Online JSON Formatter & Validator in 2026 (Tested + Privacy First)',
    excerpt:
      'Tired of JSON tools that upload your data, show intrusive ads, or freeze on larger payloads? Here is an honest look at what a great JSON formatter needs in 2026 — and why this one is worth bookmarking.',
    date: 'June 20, 2026',
    readTime: '5 min read',
    icon: Braces,
    tag: 'Developer Tools',
  },
  {
    slug: '/blog/best-free-password-generator-2026',
    title: 'The Best Free Password Generator in 2026 (Tested + Truly Private)',
    excerpt:
      'Looking for a truly private password generator in 2026? Built for privacy from the ground up. Discover why EverydayUtils stands out with zero tracking and strong security.',
    date: 'June 18, 2026',
    readTime: '5 min read',
    icon: KeyRound,
    tag: 'Security',
  },
  {
    slug: '/blog/lorem-ipsum-generator-free-private',
    title: 'Why I Built a Free, Private Lorem Ipsum Generator (No Ads, No Signup)',
    excerpt:
      'Generate realistic placeholder text instantly with live preview, HTML output, and real-time stats. 100% client-side, no ads, no tracking, no sign-up — built for designers and developers.',
    date: 'June 16, 2026',
    readTime: '4 min read',
    icon: AlignLeft,
    tag: 'Text Tools',
  },
  {
    slug: '/blog/word-counter-text-sanitizer-guide',
    title: 'The Word Counter & Text Sanitizer I Actually Use Every Day (Especially for Chinese + English)',
    excerpt:
      'Most free word counters fall apart with Chinese or mixed-language content. Here\'s a practical guide to a bilingual-friendly tool that handles English, Traditional Chinese, and everything in between.',
    date: 'June 9, 2026',
    readTime: '4 min read',
    icon: Type,
    tag: 'Text Tools',
  },
  {
    slug: '/blog/pdf-copy-paste-fixer',
    title: 'The PDF Copy-Paste Fixer: How to Clean Messy Text from PDFs in Seconds (2026 Guide)',
    excerpt:
      "Copied text from a PDF and ended up with a mess of broken lines, extra spaces, and stray hyphens? Here's the fastest way to clean it up — no software required.",
    date: 'June 7, 2026',
    readTime: '4 min read',
    icon: FileText,
    tag: 'Text Tools',
  },
  {
    slug: '/blog/how-to-create-strong-passwords',
    title: "How to Create Strong Passwords in 2026 (That You Don't Have to Memorize)",
    excerpt:
      "Weak passwords remain one of the easiest ways hackers gain access to accounts. This guide shows you how to create truly strong passwords the smart way — and manage them without memorizing anything.",
    date: 'June 5, 2026',
    readTime: '4 min read',
    icon: KeyRound,
    tag: 'Security',
  },
  {
    slug: '/wifi-qr-guide',
    title: 'How to Create a WiFi QR Code for Guests (Free & No App Needed)',
    excerpt:
      'Let guests connect to your network instantly with a single scan — no typing long passwords, no mistakes. Generate yours in under 60 seconds.',
    date: 'June 3, 2026',
    readTime: '3 min read',
    icon: QrCode,
    tag: 'QR Codes',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white">
            <BookOpen size={20} />
          </div>
          <span className="label">Blog</span>
        </div>
        <h1 className="page-title mb-2">Guides &amp; Articles</h1>
        <p className="page-subtitle">
          Practical how-to guides for the tools you use every day.
        </p>
      </div>

      <div className="space-y-5">
        {posts.map((post) => {
          const Icon = post.icon;
          return (
            <Link
              key={post.slug}
              to={post.slug}
              className="card group flex flex-col sm:flex-row gap-5 p-6 hover:border-brand-500/40 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 dark:from-brand-500/20 dark:to-cyan-500/20 flex items-center justify-center text-brand-500 group-hover:from-brand-500/20 group-hover:to-cyan-500/20 transition-colors duration-200">
                  <Icon size={22} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1.5 group-hover:text-brand-500 transition-colors duration-200 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-brand-500 group-hover:gap-2 transition-all duration-200">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
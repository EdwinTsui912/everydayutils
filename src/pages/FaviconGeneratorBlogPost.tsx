import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Image as ImageIcon } from 'lucide-react';

export default function FaviconGeneratorBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} /> Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Favicon Generator</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Design Tools
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            4 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 12, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free Favicon Generator — Create All Sizes Instantly (PNG + ZIP)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Turn any logo or image into a complete set of favicons and app icons (16x16 to 512x512) in seconds. 
          Supports transparent PNG with custom background — 100% private, no upload required.
        </p>
      </header>

      {/* Top CTA */}
      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex-shrink-0">
            <ImageIcon size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/favicon-generator" className="btn-primary text-sm flex-shrink-0">
          Open Favicon Generator
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why You Need Proper Favicons in 2026
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            A good set of favicons makes your website look professional on browser tabs, bookmarks, mobile home screens, and app icons. 
            Without them, browsers show a default blank icon — which hurts first impressions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What This Tool Does
          </h2>
          <ul className="space-y-3">
            {[
              'Generates all standard sizes (16×16, 32×32, 48×48, 180×180, 192×192, 512×512)',
              'Supports transparent PNG with custom background color',
              'Downloads everything as a ready-to-use ZIP file',
              'Includes README.html with installation instructions',
              '100% client-side — your images never leave your device',
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
            How to Use the Favicon Generator
          </h2>
          <ol className="space-y-3 list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <li>Upload your logo or any image (transparent PNG works best)</li>
            <li>Choose background color if your image has transparency</li>
            <li>Click “Generate All Favicon Sizes”</li>
            <li>Download the complete ZIP package</li>
          </ol>

          <div className="mt-6">
            <Link to="/favicon-generator" className="btn-primary inline-flex items-center gap-2">
              Open Favicon Generator Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </section>

        {/* Privacy */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Privacy First
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            All image processing happens locally in your browser. Your logo and generated icons never leave your device.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: 'Is this favicon generator really free?',
                a: 'Yes. Completely free with no limits, no sign-up, and no premium version.',
              },
              {
                q: 'Which sizes does it generate?',
                a: 'It creates all standard sizes: 16×16, 32×32, 48×48, 180×180 (Apple), 192×192 (Android), and 512×512.',
              },
              {
                q: 'Does it support transparent images?',
                a: 'Yes. Upload a transparent PNG and choose your desired background color.',
              },
              {
                q: 'How do I install the favicons?',
                a: 'Download the ZIP, extract the files to your website root folder, and add the provided HTML links to your <head> section.',
              },
            ].map((faq) => (
              <div key={faq.q} className="card p-5">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 pt-6 leading-relaxed">
          EverydayUtils is built with one simple goal: create genuinely useful tools that respect your time and privacy.
        </p>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Image as ImageIcon } from 'lucide-react';

export default function YoutubeThumbnailBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} />
          Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">YouTube Thumbnail Guide</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Creator Tools
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            6 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 22, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free YouTube Thumbnail Generator – Create Clickable Thumbnails Fast (No Sign-Up, No Watermark)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Create professional, eye-catching YouTube thumbnails in seconds. No sign-up, no watermark, everything stays on your device.
        </p>
      </header>

      {/* Top CTA */}
      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white flex-shrink-0">
            <ImageIcon size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/youtube-thumbnail" className="btn-primary text-sm flex-shrink-0">
          Open Thumbnail Generator
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Good Thumbnails Matter
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Thumbnails are the first thing viewers see. A strong thumbnail can dramatically increase click-through rates and help your videos stand out in search and recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Makes This Tool Great
          </h2>
          <ul className="space-y-3">
            {[
              'Upload your own image or start from a template',
              'Add bold text with customizable fonts and colors',
              'Adjust layout, size, and positioning easily',
              'Real-time preview',
              'Download high-resolution PNG',
              '100% private — no uploads to any server',
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
            Privacy First
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Your images and designs never leave your device. No data is collected or sent to any server.
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
                q: 'Is the thumbnail generator free?',
                a: 'Yes. Completely free with no limits or sign-up.',
              },
              {
                q: 'Do I need to upload my video?',
                a: 'No. You only upload the image you want to turn into a thumbnail.',
              },
              {
                q: 'What resolution should I use?',
                a: 'YouTube recommends 1280x720 pixels. The tool exports at high quality.',
              },
              {
                q: 'Can I use it for other platforms?',
                a: 'Yes. The generated thumbnails work great for Instagram, TikTok, Facebook, and more.',
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
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to create better thumbnails?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Fast, private, and no watermark.
            </p>
            <Link to="/youtube-thumbnail" className="btn-primary inline-flex items-center gap-2">
              Open YouTube Thumbnail Generator Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
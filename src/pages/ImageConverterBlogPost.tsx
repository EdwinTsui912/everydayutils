import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Image as ImageIcon } from 'lucide-react';

export default function ImageConverterBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} />
          Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Image Converter Guide</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            Utility Tools
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            5 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">June 29, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free Private Image Converter: Convert JPG, PNG &amp; WebP Locally (No Upload)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Ever tried uploading an image only to be told the format isn’t supported? Or needed to convert a PNG to WebP for faster website loading but didn’t want to use heavy software?
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          That’s exactly why we built this clean, privacy-first image converter that works entirely in your browser.
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
        <Link to="/image-converter" className="btn-primary text-sm flex-shrink-0">
          Open Image Converter
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Most Online Image Converters Are Problematic
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Many popular converters require you to upload files to their servers. This creates privacy risks and adds unnecessary upload/download time.
          </p>
          <ul className="space-y-3">
            {[
              'Your images are sent to third-party servers',
              'Potential data leaks or misuse',
              'Slower performance due to network delays',
              'Annoying ads and premium upsells',
              'File size restrictions',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Makes Our Image Converter Different
          </h2>
          <ul className="space-y-3">
            {[
              '100% client-side processing — nothing is uploaded',
              'Convert between JPG, PNG, and WebP instantly',
              'No file size limits (limited only by your device)',
              'Clean, fast, and mobile-friendly interface',
              'Completely free with no sign-up or ads',
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
            Which Format Should You Choose?
          </h2>
          <ul className="space-y-4">
            <li>
              <strong className="text-gray-800 dark:text-gray-200">WebP</strong> — Best for websites. Smaller file size with excellent quality. Great for improving page speed.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">JPG</strong> — Ideal for photographs and realistic images.
            </li>
            <li>
              <strong className="text-gray-800 dark:text-gray-200">PNG</strong> — Perfect when you need transparency (logos, graphics, mockups).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How to Use the Image Converter
          </h2>
          <ol className="space-y-3">
            {[
              'Open the Image Converter tool',
              'Drag & drop your image or click to upload',
              'Select target format (JPG, PNG, or WebP)',
              'Click Convert and download instantly',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <Link to="/image-converter" className="btn-primary inline-flex items-center gap-2">
              Open Image Converter Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </section>

        {/* Privacy Note */}
        <div className="flex items-start gap-3 p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={18} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <span className="font-semibold">Privacy First:</span> All conversions happen locally in your browser. Your images never leave your device.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {[
              {
                q: 'Is my image data safe?',
                a: 'Yes. Everything runs locally in your browser. No images are uploaded to any server.',
              },
              {
                q: 'Are there file size limits?',
                a: 'No server-imposed limits. You can convert files as large as your device’s memory allows.',
              },
              {
                q: 'Does converting reduce image quality?',
                a: 'Quality loss is usually minimal. Converting to WebP often gives excellent results with much smaller file sizes.',
              },
              {
                q: 'Can I convert multiple images?',
                a: 'Currently optimized for fast single-image conversion. Bulk conversion is planned for the future.',
              },
            ].map((faq) => (
              <div key={faq.q} className="card p-5">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-6 text-center">
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to convert your images privately?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No sign-up. No uploads. Instant results.</p>
            <Link to="/image-converter" className="btn-primary inline-flex items-center gap-2">
              Open Image Converter Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Image as ImageIcon } from 'lucide-react';
import SEO from '../components/SEO';


export default function ImageConverterBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="Free Private Image Converter: JPG, PNG & WebP (No Upload) | EverydayUtils"
        description="Convert images between JPG, PNG, and WebP instantly in your browser. No sign-up, no uploads, no data collection — everything stays on your device."
        keywords="image converter, jpg to webp, png to jpg, webp converter online, free image format converter"
        url="https://everydayutils.com/blog/free-private-image-converter"
      />


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
            7 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 22, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free Private Image Converter: Convert JPG, PNG & WebP Locally (No Upload)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Convert images between popular formats instantly in your browser. No sign-up, no uploads, no data collection — everything stays on your device.
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
            Why Convert Images?
          </h2>
          <ul className="space-y-3">
            {[
              'Optimize for web (WebP is much smaller than PNG/JPG)',
              'Preserve transparency (PNG)',
              'Reduce file size for faster loading',
              'Compatibility with different platforms and social media',
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
            Supported Formats
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            JPG, PNG, WebP (and more coming soon). Convert in both directions with quality control.
          </p>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Privacy First
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            All conversion happens locally using your browser. Your images are never uploaded to any server.
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
                q: 'Is this image converter really free?',
                a: 'Yes. Completely free with no limits, no sign-up, and no premium version.',
              },
              {
                q: 'How private is it?',
                a: 'Extremely private. All processing runs locally in your browser. Your images never leave your device.',
              },
              {
                q: 'Does it support transparency?',
                a: 'Yes. Converting to PNG preserves transparency. Converting to JPG will use a white background by default.',
              },
              {
                q: 'Can I convert multiple images?',
                a: 'Yes. The tool supports batch conversion and ZIP download (coming in next update).',
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
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to convert your images?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Fast, private, and completely local.
            </p>
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
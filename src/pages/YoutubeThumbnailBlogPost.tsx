import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Image as ImageIcon, LayoutTemplate, Wand2, RotateCw } from 'lucide-react';

const whyFeatures = [
  { icon: LayoutTemplate, title: 'Locked 1280\u00d7720 Canvas', detail: "The canvas is fixed to YouTube's exact thumbnail dimensions, so there's no resizing or guessing about aspect ratio." },
  { icon: Wand2, title: 'High-Impact Text Controls', detail: 'Bold, italic, drop shadow, and adjustable outline thickness (0\u201312) on every text layer, so text stays readable even on small mobile previews.' },
  { icon: ImageIcon, title: 'Two Starter Templates', detail: 'Reaction Face and Tutorial templates pre-fill text layers and background color, giving you a working starting point instead of a blank canvas.' },
  { icon: RotateCw, title: 'Undo & Redo', detail: 'Up to seven steps of history, so experimenting with color and text changes never risks losing your progress.' },
];

const steps = [
  { title: 'Upload', detail: 'Drag and drop a background image or screenshot onto the canvas, or use the file picker.' },
  { title: 'Add & Style Text', detail: 'Click Add Text to create a layer, then adjust font size, color, bold, italic, shadow, and outline thickness for each one individually.' },
  { title: 'Position', detail: 'Click and drag any text layer directly on the canvas to move it exactly where you want.' },
  { title: 'Export', detail: 'Download the finished thumbnail as a PNG or JPG file, ready to upload to YouTube.' },
];

const faqs = [
  {
    q: 'What size are the thumbnails?',
    a: "Every thumbnail is created at YouTube's standard 1280\u00d7720 resolution — the canvas is locked to this size, so there's no need to manually resize or crop afterward.",
  },
  {
    q: 'How many templates are available?',
    a: 'There are currently two built-in templates — Reaction Face and Tutorial — each pre-loaded with a background color and styled text layers you can edit freely. More templates may be added over time.',
  },
  {
    q: 'Can I move text after adding it?',
    a: 'Yes. Click and drag any text layer directly on the canvas to reposition it. Each layer can also be selected from the Layers panel to adjust its font size, color, or effects.',
  },
  {
    q: 'Does it add a watermark to my thumbnail?',
    a: 'No. Exported PNG and JPG files have no watermark, and there is no paid tier or upgrade required to remove one.',
  },
  {
    q: 'Is my image uploaded anywhere?',
    a: 'No. The image you upload and the canvas rendering both stay entirely in your browser. Nothing is sent to a server.',
  },
];

export default function YoutubeThumbnailBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} /> Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">Creator Tools</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">Creator Tools</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"><Clock size={11} /> 6 min read</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free YouTube Thumbnail Generator — Create Clickable Thumbnails Fast (No Sign-Up, No Watermark)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Thumbnails are the first thing viewers see. A strong thumbnail can dramatically increase click-through rates and help your videos stand out in search and recommendations — here's how to build one entirely in your browser.
        </p>
      </header>

      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 text-white flex-shrink-0">
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

      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Use This Tool</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">{f.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">How to Build Your Thumbnail</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={s.title} className="card p-5 flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">{s.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Fine-Tuning Each Text Layer</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Every text layer you add has its own independent controls, so different lines of text on the same thumbnail can look completely different from each other:
          </p>
          <ul className="space-y-2">
            {[
              'Font size, adjustable from 20px up to 160px per layer',
              'Any text color via a color picker',
              'Bold and italic toggles',
              'Drop shadow for depth against busy backgrounds',
              'Outline thickness from 0 to 12, useful for making text pop against light or complex images',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Your images and designs never leave your device. No data is collected or sent to any server.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="card p-5">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">{faq.q}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-10">
        <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-6 text-center">
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to create better thumbnails?</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Fast, private, and no watermark.</p>
          <Link to="/youtube-thumbnail" className="btn-primary inline-flex items-center gap-2">
            Open YouTube Thumbnail Generator Now
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>

    </div>
  );
}
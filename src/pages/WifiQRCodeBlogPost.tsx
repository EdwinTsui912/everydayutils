import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, QrCode } from 'lucide-react';

export default function WifiQRCodeBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} />
          Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">WiFi QR Code Guide</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            QR Codes
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            3 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">June 3, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          How to Create a WiFi QR Code for Guests (Free &amp; No App Needed)
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Creating a WiFi QR code is one of the simplest ways to let guests connect to your network
          instantly — no typing long passwords, no mistakes.
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          This guide shows you how to generate a WiFi QR code in under 60 seconds using a completely
          free and private tool.
        </p>
      </header>

      {/* Top CTA */}
      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white flex-shrink-0">
            <QrCode size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Works in your browser.</p>
          </div>
        </div>
        <Link to="/qr-generator" className="btn-primary text-sm flex-shrink-0">
          Open QR Generator
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        {/* Why section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why WiFi QR Codes Are So Popular in 2026
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Guests connect with just one scan on iPhone or Android.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Perfect for homes, Airbnbs, cafes, offices, and events.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Much safer and cleaner than writing passwords on paper.
              </span>
            </li>
          </ul>
        </section>

        {/* Step-by-step section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            How to Create a WiFi QR Code (Step-by-Step)
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center">1</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">
                Go to the{' '}
                <Link to="/qr-generator" className="text-brand-500 hover:underline font-medium">
                  EverydayUtils WiFi QR Code Generator
                </Link>.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center">2</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">
                Select <span className="font-semibold text-gray-800 dark:text-gray-200">WiFi</span> as the content type.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center">3</span>
              <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">
                <p className="mb-2">Enter your network details:</p>
                <ul className="space-y-1.5 ml-1">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-500 font-bold">–</span>
                    <span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Network Name (SSID)</span>
                      {' '}— must match exactly (case-sensitive)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-500 font-bold">–</span>
                    <span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Password</span>
                      {' '}— copy and paste to avoid typos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-500 font-bold">–</span>
                    <span>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Security</span>
                      {' '}— Choose WPA2 or WPA3 (most modern routers)
                    </span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center">4</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">
                Click <span className="font-semibold text-gray-800 dark:text-gray-200">Generate</span>.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center">5</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">
                (Optional) Customize colors or size for better visibility.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center">6</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">
                Download as PNG or print it directly.
              </span>
            </li>
          </ol>

          {/* Privacy callout */}
          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
            <Shield size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
              <span className="font-semibold">Privacy Note:</span>{' '}Everything runs locally in your
              browser. Your WiFi password never leaves your device.
            </p>
          </div>

          {/* Inline CTA link */}
          <div className="mt-5">
            <Link
              to="/qr-generator"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:underline"
            >
              <ChevronRight size={15} />
              Generate WiFi QR Code Now (Free &amp; Private)
            </Link>
          </div>
        </section>

        {/* Scanning section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Do You Need an App to Scan It?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            No app is required. Modern phones handle it natively:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="card p-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">iPhone (iOS 11+)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open the Camera app and point at the QR code.</p>
            </div>
            <div className="card p-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Android</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Open the Camera app — a notification appears automatically.</p>
            </div>
          </div>
        </section>

        {/* Best practices */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Best Practices
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Always test the QR code with your own phone first.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Laminate printed versions for restaurants or offices.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Regenerate the code whenever you change your WiFi password.</span>
            </li>
          </ul>
        </section>

        {/* Related tools */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Related Tools on EverydayUtils
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link to="/password-generator" className="card p-4 hover:border-brand-500/40 transition-colors group">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-500 transition-colors mb-1">
                Password Generator
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need strong, secure passwords? Generate one instantly.
              </p>
            </Link>
            <Link to="/palette-generator" className="card p-4 hover:border-brand-500/40 transition-colors group">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-500 transition-colors mb-1">
                Color Palette Generator
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Want matching colors for printed materials?
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="card p-5">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Does the WiFi QR code expire?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                No — it works as long as your network name and password remain the same.
              </p>
            </div>
            <div className="card p-5">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Does it support WPA3 networks?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Yes. Just select WPA3 when generating.
              </p>
            </div>
            <div className="card p-5">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Is it safe to share?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Yes, as long as you treat the QR code with the same care as your actual password.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-6 text-center">
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to create yours?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Free, instant, and completely private. No account required.
            </p>
            <Link to="/qr-generator" className="btn-primary inline-flex items-center gap-2">
              Generate WiFi QR Code Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

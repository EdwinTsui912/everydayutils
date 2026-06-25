import { Link } from 'react-router-dom';
import { CheckCircle, Shield, ChevronRight } from 'lucide-react';

export default function WifiQRGuidePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        How to Create a WiFi QR Code for Guests (Free &amp; No App Needed)
      </h1>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
        Creating a WiFi QR code is one of the simplest ways to let guests connect to your network
        instantly — no typing long passwords, no mistakes.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        This guide shows you how to generate a WiFi QR code in under 60 seconds using a completely
        free and private tool.
      </p>

      {/* Why section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why WiFi QR Codes Are So Popular in 2026
        </h2>
        <ul className="space-y-2.5">
          {[
            'Guests connect with just one scan on iPhone or Android.',
            'Perfect for homes, Airbnbs, cafes, offices, and events.',
            'Much safer and cleaner than writing passwords on paper.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps section */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          How to Create a WiFi QR Code (Step-by-Step)
        </h2>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Go to the{' '}
              <Link to="/qr-generator" className="text-brand-500 hover:underline font-medium">
                EverydayUtils WiFi QR Code Generator
              </Link>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Select <strong className="text-gray-800 dark:text-gray-200 font-semibold">WiFi</strong> as the content type.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <p className="mb-2">Enter your network details:</p>
              <ul className="space-y-1.5 ml-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                <li><strong className="text-gray-700 dark:text-gray-300 font-semibold">Network Name (SSID)</strong> — must match exactly (case-sensitive)</li>
                <li><strong className="text-gray-700 dark:text-gray-300 font-semibold">Password</strong> — copy and paste to avoid typos</li>
                <li><strong className="text-gray-700 dark:text-gray-300 font-semibold">Security</strong> — Choose WPA2 or WPA3</li>
              </ul>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">4</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Click <strong className="text-gray-800 dark:text-gray-200 font-semibold">Generate</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">5</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">(Optional) Customize colors or size.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">6</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Download as PNG or print.</span>
          </li>
        </ol>

        {/* Privacy note */}
        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Everything runs locally in your browser.
            Your WiFi password never leaves your device.
          </p>
        </div>

        <div className="mt-4">
          <Link to="/qr-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
            Generate WiFi QR Code Now
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Best practices */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Best Practices</h2>
        <ul className="space-y-2.5">
          {[
            'Always test the code first.',
            'Laminate printed versions.',
            'Regenerate after changing password.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={15} className="text-cyan-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Related tools */}
      <section className="mb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Tools</h2>
        <div className="flex flex-col gap-2">
          <Link to="/password-generator" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            Password Generator
          </Link>
          <Link to="/palette-generator" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            Color Palette Generator
          </Link>
        </div>
      </section>

    </div>
  );
}

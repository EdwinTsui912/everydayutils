import { Link } from 'react-router-dom';
import { QrCode, CheckCircle, Shield, ChevronRight } from 'lucide-react';

export default function WifiQRCodeGuidePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-md">
          <QrCode size={22} className="text-white" />
        </div>
        <h1 className="page-title mb-3">
          How to Create a WiFi QR Code for Guests (Free &amp; No App Needed)
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          Creating a WiFi QR code is one of the simplest ways to let guests connect to your network
          instantly — no typing long passwords, no mistakes.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mt-2">
          This guide shows you how to generate a WiFi QR code in under 60 seconds using a completely
          free and private tool.
        </p>
      </div>

      {/* Why section */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Why Use WiFi QR Codes?</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Guests connect with one scan on iPhone or Android.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Perfect for homes, Airbnbs, cafes, offices, and events.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Safer than writing passwords on paper.</span>
          </li>
        </ul>
      </div>

      {/* Step-by-step */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Step-by-Step Guide</h2>
        <ol className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">1</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Go to the{' '}
              <Link to="/qr-generator" className="text-brand-500 hover:underline font-medium">
                QR Code Generator
              </Link>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">2</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Select <strong className="font-semibold text-gray-800 dark:text-gray-200">WiFi</strong> tab
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">3</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Enter Network Name (SSID), Password, and Security type</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">4</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Click Generate</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">5</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Download or print the QR code</span>
          </li>
        </ol>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Important:</strong> Your WiFi password never leaves your device.
          </p>
        </div>

        <Link to="/qr-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
          Open WiFi QR Code Generator
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Best practices */}
      <div className="card p-6 space-y-4">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Best Practices</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle size={15} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Test before sharing</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={15} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Regenerate after changing password</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={15} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Laminate for long-term use</span>
          </li>
        </ul>
      </div>

    </div>
  );
}

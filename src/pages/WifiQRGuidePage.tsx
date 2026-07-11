import { Link } from 'react-router-dom';
import { QrCode, CheckCircle, Shield, ChevronRight, ArrowLeft } from 'lucide-react';

export default function WifiQRCodeGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} /> Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">QR Code Generator</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <QrCode size={18} className="text-white" />
          </div>
          <span className="text-xs font-medium px-3 py-1 bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 rounded-full">Utility Tool</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
          Free QR Code Generator for WiFi, URLs, and Text — Private &amp; No Sign-Up
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Create QR codes instantly for WiFi networks, links, text, and more. Fast, 100% private, and works in your browser.
        </p>
      </header>

      {/* Why section */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Why Use QR Codes?</h2>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <CheckCircle size={18} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Guests connect to WiFi with one scan — no typing passwords</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle size={18} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Share long links, menus, or contact details instantly</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle size={18} className="text-brand-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Perfect for homes, Airbnbs, cafés, events, and businesses</span>
          </li>
        </ul>
      </div>

      {/* How to use */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">How to Use the QR Code Generator</h2>
        <ol className="space-y-5">
          <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
            <div>
              <p className="font-medium">Go to the QR Code Generator</p>
              <Link to="/qr-generator" className="text-brand-500 hover:underline">→ Open QR Code Generator</Link>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
            <div>
              <p className="font-medium">Enter your content in the box</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">The tool automatically detects URLs, plain text, or WiFi details.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center mt-0.5">3</span>
            <div>
              <p className="font-medium">For WiFi networks:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enter Network Name (SSID), Password, and Security type (WPA2/WPA3)</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-sm font-semibold flex items-center justify-center mt-0.5">4</span>
            <div>
              <p className="font-medium">Preview updates live • Download the PNG</p>
            </div>
          </li>
        </ol>

        <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <p className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
            <Shield size={16} /> Your data (including WiFi passwords) never leaves your device.
          </p>
        </div>
      </div>

      {/* Best Practices */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Best Practices</h2>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <CheckCircle size={18} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Always test the code with your own phone first</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle size={18} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Regenerate after changing your WiFi password</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle size={18} className="text-cyan-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Laminate printed codes for durability</span>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link 
          to="/qr-generator" 
          className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3"
        >
          Create Your QR Code Now
          <ChevronRight size={18} />
        </Link>
      </div>

    </div>
  );
}
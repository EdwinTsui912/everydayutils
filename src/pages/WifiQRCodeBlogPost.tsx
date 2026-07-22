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
        <span className="text-gray-600 dark:text-gray-400">QR Code Guide</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">
            QR Codes
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            6 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 22, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Free QR Code Generator for WiFi, URLs, and Text — Private & No Sign-Up
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Create QR codes instantly for WiFi networks, links, and plain text with a clean browser-based tool that keeps everything on your device.
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
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/qr-generator" className="btn-primary text-sm flex-shrink-0">
          Open QR Code Generator
        </Link>
      </div>

      {/* Article body */}
      <div className="space-y-10">

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why WiFi QR Codes Are So Useful
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Instead of reading out or writing down a complicated password, you can generate a QR code and place it somewhere visible. Guests simply scan and connect — no typing, no mistakes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What You Can Create
          </h2>
          <ul className="space-y-3">
            {[
              'URLs — Share websites, forms, booking links, menus, or documents instantly.',
              'Plain Text — Useful for short notes, messages, instructions, or contact info.',
              'WiFi Networks — The easiest way to let guests connect without typing a long password.',
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
            How to Use the QR Code Generator
          </h2>
          <ol className="space-y-4 list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>Go to the QR Code Generator.</li>
            <li>Choose the content type: URL, Text, or WiFi.</li>
            <li>Fill in the details.</li>
            <li>See the preview update live.</li>
            <li>Download the PNG when ready.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Privacy First
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            This tool runs completely client-side. Your WiFi password or any other information you enter never leaves your device.
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
                q: 'Is it really free?',
                a: 'Yes — completely free, with no sign-up, no limits, and no premium version.',
              },
              {
                q: 'Do people need a special app to scan the code?',
                a: 'No. Most modern iPhones and Android phones can scan QR codes using the built-in camera app.',
              },
              {
                q: 'Is sharing WiFi via QR code secure?',
                a: 'It’s as secure as sharing the password itself. Treat the printed code with the same care you would a written password.',
              },
              {
                q: 'Does it work offline?',
                a: 'Yes. Once the page loads, the generator works completely offline.',
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
            <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">Ready to create your first QR code?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Generate a private QR code for WiFi, URLs, or plain text in seconds.
            </p>
            <Link to="/qr-generator" className="btn-primary inline-flex items-center gap-2">
              Open QR Code Generator Now
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Download,
  FileText,
  Link as LinkIcon,
  QrCode,
  Shield,
  Wifi,
} from 'lucide-react';
import SEO from '../components/SEO';

const useCases = [
  {
    icon: LinkIcon,
    title: 'URLs',
    desc: 'Share websites, forms, booking links, menus, or documents instantly.',
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: FileText,
    title: 'Plain Text',
    desc: 'Useful for short notes, messages, instructions, or simple contact info.',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    color: 'text-violet-600 dark:text-violet-400',
  },
  {
    icon: Wifi,
    title: 'WiFi Networks',
    desc: 'The easiest way to let guests connect without typing a long password.',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
];

const practicalUses = [
  'Add a QR code to your business card that opens your website or LinkedIn profile.',
  'Share long Google Docs or meeting links quickly.',
  'Create menu QR codes for cafés or Airbnb properties.',
  'Make check-in codes for events.',
];

const steps = [
  'Go to the QR Code Generator.',
  'Choose the content type: URL, Text, or WiFi.',
  'Fill in the details.',
  'See the preview update live.',
  'Download the PNG when ready.',
];

const faqs = [
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
    q: 'Can I use it for business or events?',
    a: 'Absolutely. Many people use it for guest WiFi, menus, event check-ins, and marketing materials.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Once the page loads, the generator works completely offline.',
  },
];

export default function FreeQRCodeGeneratorBlogPost() {
  return (
    <>
      <SEO
        title="Free QR Code Generator for WiFi, URLs & Text — Private & No Sign-Up"
        description="Create QR codes instantly for WiFi networks, URLs, and text. Fast, 100% private, browser-based tool with no sign-up or tracking."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
        </div>

        <article className="space-y-10">
          <header className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-950/40 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">
              <QrCode size={14} />
              QR Codes
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 leading-tight">
                Free QR Code Generator for WiFi, URLs, and Text — Private & No Sign-Up
              </h1>

              <p className="text-lg sm:text-xl font-semibold leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl">
                Create QR codes instantly for WiFi networks, links, and plain text with a clean browser-based tool that keeps everything on your device.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>July 10, 2026</span>
                <span>•</span>
                <span>4 min read</span>
              </div>
            </div>
          </header>

          <section className="space-y-6 text-[17px] leading-8 text-gray-700 dark:text-gray-300">
            <p>
              If you’ve ever struggled to share a long WiFi password, or needed to quickly pass someone a link without typing it out, you already know how handy a good QR code generator can be.
            </p>

            <p>
              I got tired of slow, ad-filled tools that made me wonder where my data was going. So I built a simple, clean{' '}
              <Link
                to="/qr-generator"
                className="font-semibold text-brand-500 hover:text-brand-600 transition-colors"
              >
                QR code generator
              </Link>{' '}
              here on EverydayUtils that runs entirely in your browser.
            </p>

            <p>
              Here’s what it can do and why it might become one of your go-to tools.
            </p>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                What You Can Create
              </h2>
              <p className="text-[17px] leading-8 text-gray-700 dark:text-gray-300">
                The generator supports the three things people need most often.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card p-5">
                    <div
                      className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}
                    >
                      <Icon size={20} className={item.color} />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-[17px] leading-8 text-gray-700 dark:text-gray-300">
              Everything is generated locally in your browser. Nothing is uploaded or stored on any server.
            </p>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Why WiFi QR Codes Are So Useful
              </h2>
            </div>

            <div className="space-y-6 text-[17px] leading-8 text-gray-700 dark:text-gray-300">
              <p>
                This is the feature I use the most. Instead of reading out or writing down a complicated password, I just generate a QR code and place it somewhere visible.
              </p>

              <p>How it works:</p>

              <ol className="space-y-3 pl-5 list-decimal marker:text-brand-500">
                <li>Enter your Network Name (SSID).</li>
                <li>Enter the password.</li>
                <li>Choose the security type, usually WPA2 or WPA3 for most home networks.</li>
                <li>Click Generate.</li>
              </ol>

              <p>
                Guests simply open their camera app, scan the code, and connect — no typing, no mistakes.
              </p>

              <p>
                It works on modern iPhones and Android phones without needing any extra app.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Other Practical Uses
              </h2>
            </div>

            <ul className="space-y-3 text-[17px] leading-8 text-gray-700 dark:text-gray-300 pl-5 list-disc marker:text-brand-500">
              {practicalUses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                How to Use the EverydayUtils QR Code Generator
              </h2>
            </div>

            <ol className="space-y-3 text-[17px] leading-8 text-gray-700 dark:text-gray-300 pl-5 list-decimal marker:text-brand-500">
              {steps.map((step, index) => (
                <li key={index}>
                  {index === 0 ? (
                    <>
                      Go to the{' '}
                      <Link
                        to="/qr-generator"
                        className="font-semibold text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        QR Code Generator
                      </Link>.
                    </>
                  ) : (
                    step
                  )}
                </li>
              ))}
            </ol>

            <p className="text-[17px] leading-8 text-gray-700 dark:text-gray-300">
              You can adjust the size if you need a larger version for printing.
            </p>
          </section>

          <section>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/20 dark:to-gray-900 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-cyan-700 dark:text-cyan-300" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Privacy First
                  </h2>
                  <p className="text-[17px] leading-8 text-gray-700 dark:text-gray-300">
                    This tool runs completely client-side. Your WiFi password or any other information you enter never leaves your device. I built it this way because I wouldn’t trust typing my own WiFi password into a random website either.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.q} className="card p-5 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-[16px] leading-8 text-gray-700 dark:text-gray-300">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="card p-6 sm:p-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Ready to create your first QR code?
                </h2>

                <p className="text-[17px] leading-8 text-gray-700 dark:text-gray-300">
                  Generate a private QR code for WiFi, URLs, or plain text in seconds.
                </p>

                <div className="pt-1">
                  <Link to="/qr-generator" className="btn-primary">
                    <Download size={16} />
                    Open the Free QR Code Generator
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
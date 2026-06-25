import { Link } from 'react-router-dom';
import { CheckCircle, Shield, AlertTriangle, ChevronRight, KeyRound } from 'lucide-react';

const mistakes = [
  'Reusing the same password on multiple sites (one breach can expose everything)',
  'Using personal information (names, birthdays, pet names)',
  'Making passwords too short (under 12 characters)',
  'Using predictable substitutions like P@ssw0rd or July2025!',
  'Saving passwords in unsecured notes or spreadsheets',
];

const faqs = [
  {
    q: 'How long should a password be in 2026?',
    a: 'Aim for at least 16 characters. For important accounts, 20+ characters is recommended.',
  },
  {
    q: 'Is it safe to use an online password generator?',
    a: 'It depends. Many tools send your data to their servers. EverydayUtils generates passwords entirely client-side, so nothing leaves your device.',
  },
  {
    q: "Should I trust my browser's built-in password manager?",
    a: 'Yes. Modern browsers use strong encryption and are much safer than reusing weak passwords.',
  },
  {
    q: 'How often should I change my passwords?',
    a: 'Only change them if you suspect a breach. Focus on using unique, strong passwords from the start.',
  },
];

export default function StrongPasswordsBlogPost() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        How to Create Strong Passwords in 2026 (That You Don't Have to Memorize)
      </h1>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
        Weak passwords remain one of the easiest ways hackers gain access to accounts in 2026.
        Despite years of warnings, many people still rely on simple combinations like{' '}
        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">Password123!</code>{' '}
        or their pet's name.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        This guide shows you how to create truly strong passwords the smart way — and more
        importantly, how to manage them without trying to memorize long random strings.
      </p>

      {/* Why most passwords are easy to crack */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why Most Passwords Are Still Easy to Crack
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
          Modern hacking tools can test <strong className="text-gray-800 dark:text-gray-200">billions of combinations per second</strong>.
          Short or predictable passwords can be broken quickly using:
        </p>
        <ul className="space-y-2">
          {['Brute force attacks', 'Dictionary attacks', 'Credential stuffing (reusing leaked passwords on other sites)'].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Even passwords that look complex (like{' '}
          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono">P@ssw0rd2025</code>)
          are often vulnerable because they follow common human patterns.
        </p>
      </section>

      {/* What makes a password strong */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          What Makes a Password Strong in 2026?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Security experts recommend these key rules:</p>
        <ul className="space-y-2.5">
          {[
            { label: 'Length', detail: 'Minimum 16 characters (18–20+ is ideal)' },
            { label: 'Randomness', detail: 'Mix of uppercase, lowercase, numbers, and symbols' },
            { label: 'Uniqueness', detail: 'Never reuse the same password across different accounts' },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <CheckCircle size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-800 dark:text-gray-200 font-semibold">{item.label}:</strong>{' '}
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* How to use the generator */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          The Easiest Way: Use a Client-Side Password Generator
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Manually creating truly random passwords is difficult for humans. The best solution is a
          reliable password generator that works locally in your browser.
        </p>
        <ol className="space-y-3">
          {[
            <>Visit the <Link to="/password-generator" className="text-brand-500 hover:underline font-medium">EverydayUtils Password Generator</Link></>,
            <>Set the length to <strong className="text-gray-800 dark:text-gray-200 font-semibold">16–20 characters</strong></>,
            'Enable all character types (Uppercase, Lowercase, Numbers, Symbols)',
            <>Click <strong className="text-gray-800 dark:text-gray-200 font-semibold">Generate</strong></>,
            'Copy the password and save it in a password manager',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
          <Shield size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            <strong className="font-semibold">Privacy Note:</strong> Everything runs locally in your
            browser. No data is sent to any server.
          </p>
        </div>

        <div className="mt-4">
          <Link to="/password-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
            <KeyRound size={14} />
            Generate a Strong Password Now
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* How to manage passwords */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          How to Manage Strong Passwords Without Memorizing Them
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          You should <strong className="text-gray-800 dark:text-gray-200">never</strong> try to remember complex random passwords.
          Here's what actually works:
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Best Option: Use a Password Manager</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Tools like Bitwarden (free &amp; open-source), 1Password, or your browser's built-in
              manager store all your passwords securely. You only need to remember one strong master
              password.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Good Alternative: Passphrases</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
              For your master password, use 4–6 random words. Example:
            </p>
            <code className="block text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg font-mono text-gray-700 dark:text-gray-300">
              correct-horse-battery-staple-blue-moon
            </code>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Extremely difficult to crack, but much easier to remember.
            </p>
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Common Password Mistakes to Avoid
        </h2>
        <ul className="space-y-2.5">
          {mistakes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <AlertTriangle size={14} className="text-red-400 dark:text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{faq.q}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-8 p-5 rounded-xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20 dark:border-brand-500/20">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Ready to upgrade your security?</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No sign-up. No tracking. Everything happens in your browser.</p>
        <Link to="/password-generator" className="btn-primary inline-flex items-center gap-2 text-sm">
          <KeyRound size={14} />
          Generate a Strong Password Now
          <ChevronRight size={14} />
        </Link>
      </section>

      {/* Related tools */}
      <section className="mb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Related Tools</h2>
        <div className="flex flex-col gap-2">
          <Link to="/qr-generator" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            WiFi QR Code Generator
          </Link>
          <Link to="/text-tools" className="text-sm text-brand-500 hover:underline flex items-center gap-1.5">
            <ChevronRight size={13} />
            Text Tools
          </Link>
        </div>
      </section>

      <p className="mt-8 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-800 pt-6 leading-relaxed">
        EverydayUtils is built with one core principle: useful tools that respect your privacy.
        All processing happens locally on your device.
      </p>
    </div>
  );
}

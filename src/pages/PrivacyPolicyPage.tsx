import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800 last:pb-0 last:border-0">
      <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-3 text-sm">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-50 dark:bg-green-950/60 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <h1 className="page-title">Privacy Policy</h1>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">Last updated: June 2026</p>
      </div>

      <div className="p-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 rounded-2xl">
        <p className="text-sm font-semibold text-green-800 dark:text-green-300">
          The short version: We collect absolutely no data from tool usage. All tools run entirely in your browser. Nothing is ever sent to any server.
        </p>
      </div>

      <div className="card p-6 sm:p-8 space-y-6">
        <Section title="1. No Data Collection">
          <p>EverydayUtils does not collect, store, transmit, or process any personal data. We do not have user accounts, analytics tracking, advertising networks, or any data collection mechanisms.</p>
          <p>When you use any tool on this site, all computation happens entirely within your web browser on your device. No information is sent to EverydayUtils servers or any third-party servers.</p>
        </Section>

        <Section title="2. Client-Side Processing">
          <p>Every tool — including the text tools, password generator, color palette generator, QR code generator, and percentage calculators — processes all data locally using JavaScript running in your browser.</p>
          <p>Your passwords are generated locally. Your text is analyzed locally. Your QR codes are created locally. None of this data ever leaves your device.</p>
        </Section>

        <Section title="3. Cookies & Local Storage">
          <p>We use browser <strong className="text-gray-800 dark:text-gray-200">localStorage</strong> solely to remember your dark/light mode preference. This data stays on your device and is never transmitted anywhere.</p>
          <p>We do not use cookies for tracking, advertising, or analytics.</p>
        </Section>

        <Section title="4. Contact Form">
          <p>If you use the <Link to="/contact" className="text-brand-600 dark:text-brand-400 hover:underline">Contact form</Link>, the name, email, and message you submit are stored securely in our database solely for the purpose of replying to you. This data is not shared with any third party.</p>
        </Section>

        <Section title="5. Third-Party Services">
          <p>We use Google Fonts to load typography. This request may include your IP address as part of a standard web request. We do not control Google's data practices; please see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-400 hover:underline">Google's Privacy Policy</a> for more information.</p>
          <p>No advertising networks, no analytics platforms, no social media pixels.</p>
        </Section>

        <Section title="6. Changes to This Policy">
          <p>If we update this Privacy Policy, we will update the "Last updated" date at the top of this page. We will never introduce data collection without clearly updating this policy.</p>
        </Section>

        <Section title="7. Contact">
          <p>If you have questions about this privacy policy, you can reach out via the <Link to="/contact" className="text-brand-600 dark:text-brand-400 hover:underline">Contact page</Link> or email <a href="mailto:everydayutils.contact@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">everydayutils.contact@gmail.com</a>.</p>
        </Section>
      </div>
    </div>
  );
}

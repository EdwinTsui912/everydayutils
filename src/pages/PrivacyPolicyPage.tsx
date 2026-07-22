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
        <p className="text-sm text-gray-400 dark:text-gray-500">Last updated: July 2026</p>
      </div>

      <div className="p-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 rounded-2xl">
        <p className="text-sm font-semibold text-green-800 dark:text-green-300">
          The short version: We collect absolutely no data from tool usage. All tools run entirely in your browser. Nothing is ever sent to any server.
        </p>
      </div>

      <div className="card p-6 sm:p-8 space-y-6">
        <Section title="1. No Data Collection">
          <p>EverydayUtils does not collect, store, or transmit any personal data from tool usage. We do not have user accounts or tracking mechanisms for the tools themselves.</p>
        </Section>

        <Section title="2. Client-Side Only">
          <p>All tools process data entirely in your browser on your own device. Nothing is sent to our servers or any third party.</p>
        </Section>

        <Section title="3. Local Storage">
          <p>We use browser localStorage only to remember your dark/light mode preference. This data stays on your device and is never transmitted anywhere.</p>
        </Section>

        <Section title="4. Contact Form">
          <p>If you send us a message through the <Link to="/contact" className="text-brand-600 dark:text-brand-400 hover:underline">Contact page</Link>, your name, email, and message are stored securely only for the purpose of replying to you.</p>
        </Section>

        <Section title="5. Advertising">
          <p>At this time we do not display advertising. If we enable advertising in the future (for example through Google AdSense), third-party vendors may use cookies to serve ads based on your prior visits. You can manage personalized advertising through Google Ads Settings. This Privacy Policy will be updated if advertising is introduced.</p>
        </Section>

        <Section title="6. Children’s Privacy">
          <p>This site is not directed at children under 13, and we do not knowingly collect information from children.</p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>We use Google Fonts to load typography. This may involve a standard web request to Google. We do not control Google’s data practices.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>If we update this Privacy Policy, we will update the "Last updated" date. We will never introduce data collection without clearly updating this policy.</p>
        </Section>

        <Section title="9. Contact">
          <p>If you have questions, you can reach out via the <Link to="/contact" className="text-brand-600 dark:text-brand-400 hover:underline">Contact page</Link> or email <a href="mailto:everydayutils.contact@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">everydayutils.contact@gmail.com</a>.</p>
        </Section>
      </div>
    </div>
  );
}
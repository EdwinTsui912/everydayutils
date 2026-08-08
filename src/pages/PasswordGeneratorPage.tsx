import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PasswordGenerator from '../components/PasswordGenerator';
import SEO from '../components/SEO';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';


export default function PasswordGeneratorPage() {
  return (
    <>
      <SEO
        title="Free Strong Password Generator Online — No Sign-Up | EverydayUtils"
        description="Generate strong, secure, random passwords instantly. Customize length, symbols, numbers, and case — 100% free, private, and processed entirely in your browser."
        keywords="password generator, strong password generator, random password generator, secure password online"
        url="https://www.everydayutils.com/password-generator"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <PasswordGenerator />

      <RelatedToolsBlock currentPath="/password-generator" />
    </>
  );
}
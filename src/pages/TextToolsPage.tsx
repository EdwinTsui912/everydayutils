import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TextToolsSuite from '../components/TextToolsSuite';
import SEO from '../components/SEO';


export default function TextToolsPage() {
  return (
    <>
      <SEO
        title="Free Text Tools Suite Online — No Sign-Up | EverydayUtils"
        description="Word counter, case converter, and more text utilities in one place. Fast, free, and 100% private — all processing happens directly in your browser."
        keywords="text tools, word counter, case converter, character counter, text utilities online"
        url="https://everydayutils.com/text-tools"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 mb-0">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <TextToolsSuite />
    </>
  );
}
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import JSONFormatter from '../components/JSONFormatter';
import SEO from '../components/SEO';


export default function JSONFormatterPage() {
  return (
    <>
      <SEO
        title="Free JSON Formatter & Validator Online — No Sign-Up | EverydayUtils"
        description="Format, validate, and minify JSON instantly in your browser. Sort keys, syntax highlighting, and real-time error detection — 100% private, no data leaves your device."
        keywords="json formatter, json validator, json minifier, format json online, validate json free"
        url="https://everydayutils.com/json-formatter"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <JSONFormatter />
    </>
  );
}
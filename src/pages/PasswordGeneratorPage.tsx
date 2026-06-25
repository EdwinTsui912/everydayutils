import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PasswordGenerator from '../components/PasswordGenerator';

export default function PasswordGeneratorPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <PasswordGenerator />
    </>
  );
}

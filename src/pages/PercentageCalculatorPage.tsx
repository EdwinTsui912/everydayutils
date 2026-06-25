import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PercentageCalculator from '../components/PercentageCalculator';

export default function PercentageCalculatorPage() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <PercentageCalculator />
    </>
  );
}

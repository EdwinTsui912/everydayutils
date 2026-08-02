import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PercentageCalculator from '../components/PercentageCalculator';
import SEO from '../components/SEO';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';


export default function PercentageCalculatorPage() {
  return (
    <>
      <SEO
        title="Free Percentage Calculator Online — No Sign-Up | EverydayUtils"
        description="Calculate percentages, percentage change, and increase or decrease instantly. Fast, accurate, and 100% free — all processing happens in your browser."
        keywords="percentage calculator, percent change calculator, percentage increase decrease, calculate percentage online"
        url="https://everydayutils.com/percentage-calculator"
      />
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <PercentageCalculator />

      <RelatedToolsBlock currentPath="/percentage-calculator" />
    </>
  );
}
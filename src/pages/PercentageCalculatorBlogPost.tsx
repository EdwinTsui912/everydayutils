import React from 'react';
import { ArrowLeft, CheckCircle, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PercentageCalculatorBlogPost() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">

      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/blog" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
        Free Percentage Calculator for Discounts, Tax, Tips & More
      </h1>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
        Instant, private calculations — no sign-up, no ads.
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          Why a Good Percentage Calculator Still Matters
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Percentage calculations appear constantly in daily life and business: shopping discounts, sales tax, restaurant tips, investment returns, salary increases, and more.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          What Makes EverydayUtils Different
        </h2>
        <ul className="space-y-3">
          {[
            'Multiple calculation types in one clean interface',
            'Instant real-time results as you type',
            'Clean, distraction-free design',
            '100% client-side & private — nothing leaves your browser',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          How to Use the Percentage Calculator
        </h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li>Go to the <Link to="/percentage-calculator" className="text-brand-600 hover:underline">Percentage Calculator</Link></li>
          <li>Choose the type of calculation you need</li>
          <li>Enter your numbers — results update instantly</li>
        </ol>

        <p className="mt-4 text-sm"><strong>Example:</strong> A jacket costs $120 with 30% off. Enter 120 and 30 → the tool instantly shows $36 saved and a final price of $84.</p>
      </section>

      <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 mb-8">
        <Shield size={18} className="inline text-emerald-600 dark:text-emerald-400 mr-2" />
        <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
          Privacy: Everything runs 100% in your browser. No data is sent anywhere.
        </span>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: "Is this percentage calculator really free?", a: "Yes. Completely free with no limits, no sign-up, and no premium version." },
            { q: "How private is it?", a: "Extremely private. All calculations happen locally in your browser." },
            { q: "Does it work well on mobile?", a: "Yes. The interface is fully responsive." },
            { q: "Can I use it for business or tax calculations?", a: "Yes. It provides accurate results for discounts, markups, tax rates, and profit margins." },
          ].map((faq) => (
            <div key={faq.q}>
              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{faq.q}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="p-6 rounded-2xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20 text-center">
        <p className="text-lg font-medium mb-3">Ready to calculate?</p>
        <Link 
          to="/percentage-calculator" 
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-2xl font-medium transition-colors"
        >
          Try the Percentage Calculator now
          <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  );
}
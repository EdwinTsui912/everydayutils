import { Link } from 'react-router-dom';
import { Shield, Coffee } from 'lucide-react';

const NAV = [
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy', to: '/privacy-policy' },
  { label: 'Terms',   to: '/terms-of-use' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">

        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
          <Shield size={10} className="text-green-500 shrink-0" />
          <span>All tools run locally. No data collected.</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">&copy; {new Date().getFullYear()} EverydayUtils</span>
        </div>

        <nav className="flex items-center gap-0.5">
          {NAV.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-2 py-1 text-[11px] text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-150 rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://buymeacoffee.com/everydayutils"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-500 text-[11px] hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors duration-150 shrink-0"
        >
          <Coffee size={11} />
          Buy me a coffee
        </a>

        <span className="sm:hidden text-[11px] text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} EverydayUtils
        </span>

      </div>
    </footer>
  );
}

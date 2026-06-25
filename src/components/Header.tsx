import { Menu, Sun, Moon, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 px-4 h-14 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Brand shown on mobile where the sidebar is hidden */}
      <Link to="/" className="lg:hidden flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm shrink-0">
          <Zap size={13} className="text-white" />
        </div>
        <span className="font-bold text-gray-900 dark:text-gray-50 text-sm tracking-tight truncate">EverydayUtils</span>
      </Link>

      <div className="flex-1" />

      <button
        onClick={toggle}
        className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

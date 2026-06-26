import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, Type, KeyRound, Palette, Percent, QrCode,
  Info, Shield, FileText, X, Zap, Mail, BookOpen, AlignLeft, FileJson, Timer, Code2
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/', icon: Home, exact: true },
];

const TOOLS = [
  { label: 'Text Tools', path: '/text-tools', icon: Type, badge: 'Suite' },
  { label: 'Password Generator', path: '/password-generator', icon: KeyRound },
  { label: 'Base64', path: '/base64', icon: Code2 },
  { label: 'JSON Formatter', path: '/json-formatter', icon: FileJson },
  { label: 'QR Generator', path: '/qr-generator', icon: QrCode },
  { label: 'Color Palette', path: '/palette-generator', icon: Palette },
  { label: 'Percentage Calc', path: '/percentage-calculator', icon: Percent, badge: 'Suite' },
  { label: 'Lorem Ipsum', path: '/lorem-ipsum-generator', icon: AlignLeft },
  { label: 'Pomodoro Timer', path: '/pomodoro', icon: Timer },
];

const LEGAL = [
  { label: 'Blog', path: '/blog', icon: BookOpen },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Contact', path: '/contact', icon: Mail },
  { label: 'Privacy Policy', path: '/privacy-policy', icon: Shield },
  { label: 'Terms of Use', path: '/terms-of-use', icon: FileText },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

function NavItem({ path, icon: Icon, label, badge, onClick }: {
  path: string; icon: React.ElementType; label: string; badge?: string; onClick?: () => void;
}) {
  return (
    <NavLink
      to={path}
      end={path === '/'}
      onClick={() => {
        onClick?.();
        // Force scroll to top
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 10);
      }}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
          isActive
            ? 'bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/60'
        }`
      }
    >
      <Icon size={17} className="shrink-0" />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="badge bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-[10px]">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          flex flex-col transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
          <NavLink to="/" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-sm">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-50 text-base tracking-tight">
              EverydayUtils
            </span>
          </NavLink>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div className="space-y-1">
            {NAV_ITEMS.map(item => (
              <NavItem key={item.path} {...item} onClick={onClose} />
            ))}
          </div>

          <div>
            <p className="label px-3 mb-2">Tools</p>
            <div className="space-y-0.5">
              {TOOLS.map(item => (
                <NavItem key={item.path} {...item} onClick={onClose} />
              ))}
            </div>
          </div>

          <div>
            <p className="label px-3 mb-2">Info</p>
            <div className="space-y-0.5">
              {LEGAL.map(item => (
                <NavItem key={item.path} {...item} onClick={onClose} />
              ))}
            </div>
          </div>
        </nav>

        {/* Privacy badge */}
        <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 rounded-xl">
            <Shield size={14} className="text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <p className="text-xs text-green-700 dark:text-green-400 leading-relaxed">
              All tools run locally. <strong>No data leaves your browser.</strong>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

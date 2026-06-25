import { useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'eu_cookie_notice_dismissed';

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== '1';
    } catch {
      return false;
    }
  });

  if (!visible) return null;

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:px-6 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div className="flex items-start sm:items-center gap-3 px-4 py-3 rounded-2xl bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 shadow-xl text-gray-300 text-xs leading-relaxed">
          <p className="flex-1">
            This website uses <span className="text-white font-medium">localStorage</span> to remember your dark/light mode preference. No tracking or advertising cookies are used.
          </p>
          <button
            onClick={dismiss}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 text-white text-xs font-medium transition-colors"
            aria-label="Dismiss cookie notice"
          >
            Got it
            <X size={11} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

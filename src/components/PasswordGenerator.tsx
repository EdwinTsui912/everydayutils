import { useState, useCallback, useEffect } from 'react';
import { Copy, Check, RotateCcw, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Options {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  avoidAmbiguous: boolean;
}

interface Strength {
  score: number;       // 0–4
  label: string;
  barColor: string;
  textColor: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AMBIGUOUS_CHARS = new Set(['1', 'l', 'I', '0', 'O']);

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers:   '0123456789',
  symbols:   '!@#$%^&*()-_=+[]{}|;:,.<>?',
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildCharset(opts: Options): string {
  let pool = '';
  if (opts.uppercase) pool += CHARSETS.uppercase;
  if (opts.lowercase) pool += CHARSETS.lowercase;
  if (opts.numbers)   pool += CHARSETS.numbers;
  if (opts.symbols)   pool += CHARSETS.symbols;

  if (opts.avoidAmbiguous) {
    pool = pool.split('').filter(c => !AMBIGUOUS_CHARS.has(c)).join('');
  }
  return pool;
}

function secureRandom(max: number): number {
  const array = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;
  let value: number;
  do {
    window.crypto.getRandomValues(array);
    value = array[0];
  } while (value >= limit);
  return value % max;
}

function generatePassword(opts: Options): string {
  const pool = buildCharset(opts);
  if (!pool) return '';

  const guaranteed: string[] = [];
  (Object.keys(CHARSETS) as Array<keyof typeof CHARSETS>).forEach(key => {
    if (!opts[key]) return;
    let chars = CHARSETS[key];
    if (opts.avoidAmbiguous) {
      chars = chars.split('').filter(c => !AMBIGUOUS_CHARS.has(c)).join('');
    }
    if (chars.length > 0) {
      guaranteed.push(chars[secureRandom(chars.length)]);
    }
  });

  const remaining = opts.length - guaranteed.length;
  const fill = Array.from({ length: Math.max(0, remaining) }, () => pool[secureRandom(pool.length)]);

  const combined = [...guaranteed, ...fill];
  // Fisher-Yates shuffle using CSPRNG
  for (let i = combined.length - 1; i > 0; i--) {
    const j = secureRandom(i + 1);
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined.join('');
}

function getStrength(password: string, opts: Options): Strength {
  if (!password) return { score: 0, label: '', barColor: '', textColor: '' };

  const pool = buildCharset(opts);
  const entropy = password.length * Math.log2(pool.length || 1);

  if (entropy < 28) return { score: 1, label: 'Weak',      barColor: 'bg-red-500',     textColor: 'text-red-500' };
  if (entropy < 50) return { score: 2, label: 'Medium',    barColor: 'bg-amber-500',   textColor: 'text-amber-500' };
  if (entropy < 80) return { score: 3, label: 'Strong',    barColor: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' };
  return               { score: 4, label: 'Excellent',  barColor: 'bg-brand-500',   textColor: 'text-brand-600 dark:text-brand-400' };
}

// ─── Toggle Switch Sub-component ─────────────────────────────────────────────

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  sublabel: string;
  disabled?: boolean;
}

function Toggle({ id, checked, onChange, label, sublabel, disabled }: ToggleProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none ${
        disabled
          ? 'opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800'
          : checked
            ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-300 dark:border-brand-700'
            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
      }`}
    >
      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">{sublabel}</p>
      </div>
      <div className="relative shrink-0 ml-4">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${checked && !disabled ? 'bg-brand-600 dark:bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked && !disabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </label>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const DEFAULT_OPTS: Options = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  avoidAmbiguous: false,
};

export default function PasswordGenerator() {
  const [opts, setOpts] = useState<Options>(DEFAULT_OPTS);
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => { trackToolView('password-generator'); }, []);

  const activeCount = [opts.uppercase, opts.lowercase, opts.numbers, opts.symbols].filter(Boolean).length;

  const regen = useCallback((currentOpts: Options) => {
    const pool = buildCharset(currentOpts);
    if (!pool) {
      setError('Select at least one character type.');
      setPassword('');
      return;
    }
    setError('');
    setPassword(generatePassword(currentOpts));
  }, []);

  useEffect(() => {
    regen(opts);
  }, [opts, regen]);

  function setOpt<K extends keyof Options>(key: K, value: Options[K]) {
    setOpts(prev => ({ ...prev, [key]: value }));
  }

  function handleCopy() {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      trackButtonClick('password-generator', 'copy');
      trackCopySuccess('password-generator');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const strength = getStrength(password, opts);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-3">
          Password Generator
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Generate cryptographically secure passwords using your browser's built-in Web Crypto API.
          All generation happens locally — nothing is ever transmitted or stored.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Controls ── */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-5 space-y-6">

            {/* Length */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="pw-length" className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Length
                </label>
                <span className="text-sm font-bold tabular-nums text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-2.5 py-0.5 rounded-lg">
                  {opts.length}
                </span>
              </div>
              <input
                id="pw-length"
                type="range"
                min={8}
                max={64}
                value={opts.length}
                onChange={e => setOpt('length', Number(e.target.value))}
                className="w-full"
                aria-valuemin={8}
                aria-valuemax={64}
                aria-valuenow={opts.length}
              />
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-600">
                <span>8</span><span>24</span><span>40</span><span>56</span><span>64</span>
              </div>
            </div>

            {/* Character type toggles */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Character Types
              </p>
              <Toggle
                id="toggle-upper"
                checked={opts.uppercase}
                onChange={v => setOpt('uppercase', v)}
                disabled={opts.uppercase && activeCount === 1}
                label="Uppercase"
                sublabel="A – Z"
              />
              <Toggle
                id="toggle-lower"
                checked={opts.lowercase}
                onChange={v => setOpt('lowercase', v)}
                disabled={opts.lowercase && activeCount === 1}
                label="Lowercase"
                sublabel="a – z"
              />
              <Toggle
                id="toggle-numbers"
                checked={opts.numbers}
                onChange={v => setOpt('numbers', v)}
                disabled={opts.numbers && activeCount === 1}
                label="Numbers"
                sublabel="0 – 9"
              />
              <Toggle
                id="toggle-symbols"
                checked={opts.symbols}
                onChange={v => setOpt('symbols', v)}
                disabled={opts.symbols && activeCount === 1}
                label="Symbols"
                sublabel="! @ # $ % …"
              />
            </div>

            {/* Avoid ambiguous checkbox */}
            <label
              htmlFor="toggle-ambiguous"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 transition-all"
            >
              <input
                id="toggle-ambiguous"
                type="checkbox"
                checked={opts.avoidAmbiguous}
                onChange={e => setOpt('avoidAmbiguous', e.target.checked)}
                className="w-4 h-4 rounded accent-brand-600 cursor-pointer"
              />
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Avoid Ambiguous Characters</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-0.5">1, l, I, 0, O</p>
              </div>
            </label>
          </div>
        </div>

        {/* ── Output & Strength ── */}
        <div className="lg:col-span-3 flex flex-col gap-5">

          {/* Error state */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Password output */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-5 space-y-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Generated Password
            </p>

            <div className="relative flex items-center gap-2 p-4 bg-gray-50 dark:bg-zinc-950/60 border border-gray-200 dark:border-gray-700 rounded-xl min-h-[3.5rem]">
              <input
                type={visible ? 'text' : 'password'}
                readOnly
                value={password}
                aria-label="Generated password"
                className="flex-1 bg-transparent font-mono text-base sm:text-lg text-gray-900 dark:text-gray-100 tracking-wider break-all focus:outline-none select-all min-w-0"
              />
              <button
                onClick={() => setVisible(v => !v)}
                aria-label={visible ? 'Hide password' : 'Show password'}
                className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {visible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                onClick={handleCopy}
                disabled={!password}
                aria-label="Copy password"
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                  copied
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                    : 'bg-brand-600 dark:bg-brand-500 hover:bg-brand-700 dark:hover:bg-brand-600 text-white'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {copied ? <><Check size={13} />Copied!</> : <><Copy size={13} />Copy</>}
              </button>
            </div>

            {/* Strength meter */}
            {password && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Strength</span>
                  <span className={`font-bold ${strength.textColor}`}>{strength.label}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.barColor} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-600">
                  <span className="font-mono">{password.length} characters</span>
                  <span>{Math.round(password.length * Math.log2(buildCharset(opts).length || 1))} bits of entropy</span>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => { trackButtonClick('password-generator', 'generate'); regen(opts); }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-600 dark:bg-brand-500 hover:bg-brand-700 dark:hover:bg-brand-600 active:scale-[0.97] text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Generate Password
            </button>
            <button
              onClick={() => { trackButtonClick('password-generator', 'generate'); regen(opts); }}
              aria-label="Regenerate"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 active:scale-[0.97] text-gray-700 dark:text-gray-300 font-medium text-sm rounded-xl shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          </div>

          {/* Strength guide */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-5">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Strength Guide
            </p>
            <div className="space-y-2.5">
              {[
                { label: 'Weak',      desc: 'Under 28 bits — easily cracked',         bar: 'bg-red-500',     w: 'w-1/4' },
                { label: 'Medium',    desc: '28–49 bits — vulnerable to offline attacks', bar: 'bg-amber-500', w: 'w-2/4' },
                { label: 'Strong',    desc: '50–79 bits — suitable for most accounts', bar: 'bg-emerald-500', w: 'w-3/4' },
                { label: 'Excellent', desc: '80+ bits — recommended for critical accounts', bar: 'bg-brand-500', w: 'w-full' },
              ].map(({ label, desc, bar, w }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-16 shrink-0">
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${bar} ${w} rounded-full`} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-16 shrink-0">{label}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SEO Section ── */}
<div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">The Importance of Cryptographically Secure Password Generation</h2>
          <p className="mb-6">In modern cybersecurity, standard pseudo-random number generators (PRNGs) like JavaScript's native Math.random() are fundamentally flawed for security purposes. Because their outputs are mathematically predictable over time, automated scripts can determine patterns and crack generated credentials. This secure Password Generator leverages advanced cryptographic entropy to establish highly complex strings, providing a critical baseline defense against automated brute-force scripts, credential stuffing schemes, and targeted digital breaches.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">How Does This Client-Side Generator Compute Passwords?</h3>
          <p className="mb-6">Our application utilizes the native browser Web Crypto API (specifically window.crypto.getRandomValues) to achieve hardware-level randomness. When you adjust the character parameters, the underlying algorithm processes values from a cryptographically secure pseudo-random number generator (CSPRNG). This mechanism sources unpredictable system noise from your machine's processor. Because the entire computing process runs locally in temporary browser memory, your generated data is completely private. Zero strings, logs, or parameters are transmitted across the network, mitigating the risk of intercepted payloads or database surveillance.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Understanding Password Complexity vs. Brute-Force Timelines</h3>
          <p className="mb-6">Password security scales exponentially with length and character diversity rather than simple complexity tricks. Adding standard uppercase alterations or numbers to a short, 8-character string still leaves it vulnerable to instant compilation cracking via modern graphics processing units (GPUs). Extending a credential sequence past 14 characters dramatically expands the search space or "entropy bits," extending the algorithmic computation timeframe for malicious actors from mere minutes to thousands of years.</p>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Length & Diversity</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Entropy Level</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Estimated Brute-Force Time</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Optimal Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">8 Chars (Lowercase Only)</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-red-500">Very Low</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Instant (Seconds)</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Not Recommended</td></tr>
                <tr><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">10 Chars (Alphanumeric)</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-amber-500">Low</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Hours to Days</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Low-Risk Memberships</td></tr>
                <tr><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">12 Chars (Full Mixed Set)</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-blue-500">Medium</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Months to Years</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Standard Personal Email</td></tr>
                <tr><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">16+ Chars (Full Mixed Set)</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-green-500">Excellent</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Centuries / Uncrackable</td><td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Banking, Work Accounts</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-2">Essential Best Practices for Identity Protection</h3>
          <p className="mb-6">To complement high-entropy strings, you must avoid password reuse across platform profiles. If a single platform encounters a data breach, your shared credentials will instantly be weaponized across other premium directories. We recommend utilizing a localized master password manager to vault long sequences, alongside configuring multi-factor authentication (MFA/2FA) tokens to safeguard operations. If you need to evaluate or strip spaces from existing phrases before configuring account setups, you can route directly to our <a href="/text-tools" className="text-blue-600 dark:text-blue-400 hover:underline">Text Tools Suite</a> to clean strings instantly without network exposure.</p>

          <p className="mt-8">This client-side utility operates with a strict zero-tracking architecture, functioning securely offline to provide optimal tooling performance without data harvesting friction.</p>
        </div>
      </div>

    </div>
  );
}

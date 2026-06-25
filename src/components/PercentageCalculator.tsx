import { useState, useCallback, useEffect } from 'react';
import { Calculator, Percent, ArrowRightLeft, DollarSign, Users, Copy, Check, RotateCcw } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const safe = (v: string): number => {
  const n = parseFloat(v);
  return isNaN(n) ? NaN : n;
};

const LARGE_NUMBER_LIMIT = 1e15;

const formatNumber = (n: number, decimals = 2): string => {
  if (!isFinite(n) || isNaN(n)) return '—';
  if (Math.abs(n) > LARGE_NUMBER_LIMIT) return n > 0 ? '> 1 quadrillion' : '< −1 quadrillion';
  return n.toLocaleString('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
};

const fmt = formatNumber;

const fmtPct = (n: number): string => {
  if (!isFinite(n) || isNaN(n)) return '—';
  if (Math.abs(n) > LARGE_NUMBER_LIMIT) return n > 0 ? '> 1 quadrillion %' : '< −1 quadrillion %';
  const sign = n >= 0 ? '+' : '−';
  return `${sign}${fmt(Math.abs(n))}%`;
};

// ─── InputField ───────────────────────────────────────────────────────────────

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  id: string;
  integerOnly?: boolean;
}

function InputField({ label, value, onChange, prefix, suffix, placeholder, id, integerOnly }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-gray-400 dark:text-gray-500 text-sm font-medium pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          step={integerOnly ? '1' : 'any'}
          className={`input ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-10' : ''}`}
          value={value}
          onChange={e => {
            const val = e.target.value;
            if (integerOnly && val.includes('.')) return;
            onChange(val);
          }}
          onKeyDown={integerOnly ? (e) => { if (e.key === '.' || e.key === ',') e.preventDefault(); } : undefined}
          placeholder={placeholder}
        />
        {suffix && (
          <span className="absolute right-3.5 text-gray-400 dark:text-gray-500 text-sm font-medium pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── ResultRow ────────────────────────────────────────────────────────────────

interface ResultRowProps {
  label: string;
  value: string;
  accent?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  large?: boolean;
}

function ResultRow({ label, value, accent, onCopy, copied, large }: ResultRowProps) {
  const isDash = value === '—';
  const isLongValue = value.length > 14;
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 group min-w-0 ${
      accent
        ? 'bg-brand-50 dark:bg-brand-950/40 border-brand-200 dark:border-brand-800'
        : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5 truncate">{label}</p>
        <p className={`font-bold tabular-nums tracking-tight break-all ${
          large && !isLongValue ? 'text-3xl' : large && isLongValue ? 'text-xl' : isLongValue ? 'text-base' : 'text-2xl'
        } ${
          isDash
            ? 'text-gray-300 dark:text-gray-600'
            : accent
              ? 'text-brand-700 dark:text-brand-300'
              : 'text-gray-800 dark:text-gray-100'
        }`}>{value}</p>
      </div>
      {onCopy && !isDash && (
        <button
          onClick={onCopy}
          aria-label="Copy result"
          className={`ml-3 p-2 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500/40 flex-shrink-0 ${
            copied
              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-300 dark:hover:border-brand-700 opacity-0 group-hover:opacity-100'
          }`}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      )}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

function Card({ icon: Icon, title, children }: CardProps) {
  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex-shrink-0">
          <Icon size={16} className="text-brand-600 dark:text-brand-400" />
        </span>
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-[15px]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ─── 1. Percentage of a Number ────────────────────────────────────────────────

function PercentageOfNumber() {
  const [pct, setPct] = useState('');
  const [num, setNum] = useState('');
  const [copied, setCopied] = useState(false);

  const p = safe(pct), n = safe(num);
  const result = (p / 100) * n;
  const resultStr = isFinite(result) && !isNaN(result) ? fmt(result) : '—';

  const copy = useCallback(() => {
    if (resultStr === '—') return;
    navigator.clipboard.writeText(resultStr.replace(/,/g, ''));
    trackButtonClick('percentage-calculator', 'copy');
    trackCopySuccess('percentage-calculator');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [resultStr]);

  const reset = () => { setPct(''); setNum(''); };

  return (
    <Card icon={Percent} title="Percentage of a Number">
      <p className="text-xs text-gray-400 dark:text-gray-500 -mt-2">What is X% of Y?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Percentage" value={pct} onChange={setPct} suffix="%" placeholder="15" id="pon-pct" />
        <InputField label="Of number" value={num} onChange={setNum} placeholder="850" id="pon-num" />
      </div>
      <ResultRow
        label={`${pct || '?'}% of ${num || '?'} =`}
        value={resultStr}
        accent
        onCopy={copy}
        copied={copied}
        large
      />
      <button onClick={reset} className="btn-ghost text-xs gap-1.5 h-8 px-3">
        <RotateCcw size={12} /> Reset
      </button>
    </Card>
  );
}

// ─── 2. Percentage Change ─────────────────────────────────────────────────────

function PercentageChange() {
  const [oldVal, setOldVal] = useState('');
  const [newVal, setNewVal] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const o = safe(oldVal), n = safe(newVal);
  const change = isNaN(o) || isNaN(n) ? NaN : n - o;
  const pctChange = isNaN(change) || o === 0 ? NaN : (change / Math.abs(o)) * 100;
  const isIncrease = isFinite(change) && change > 0;
  const isDecrease = isFinite(change) && change < 0;

  const copyVal = (key: string, val: string) => {
    if (val === '—') return;
    // Strip sign characters and formatting, keep the raw numeric string
    navigator.clipboard.writeText(val.replace(/[%+\-−,\s]/g, '').trim());
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const reset = () => { setOldVal(''); setNewVal(''); };

  const pctStr = isFinite(pctChange) && !isNaN(pctChange) ? fmtPct(pctChange) : '—';
  // Use − (minus sign U+2212) for negative display clarity
  const absStr = isFinite(change) && !isNaN(change)
    ? `${change >= 0 ? '+' : '−'}${fmt(Math.abs(change))}`
    : '—';

  return (
    <Card icon={ArrowRightLeft} title="Percentage Change">
      <p className="text-xs text-gray-400 dark:text-gray-500 -mt-2">Calculate increase or decrease between two values</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Original value" value={oldVal} onChange={setOldVal} placeholder="100" id="pc-old" />
        <InputField label="New value" value={newVal} onChange={setNewVal} placeholder="125" id="pc-new" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ResultRow
          label="Percent Change"
          value={pctStr}
          accent
          onCopy={() => copyVal('pct', pctStr)}
          copied={copied === 'pct'}
          large
        />
        <ResultRow
          label="Absolute Change"
          value={absStr}
          onCopy={() => copyVal('abs', absStr)}
          copied={copied === 'abs'}
          large
        />
      </div>
      {isFinite(pctChange) && !isNaN(pctChange) && (isIncrease || isDecrease) && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          isIncrease
            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
            : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
        }`}>
          <span className="text-base">{isIncrease ? '↑' : '↓'}</span>
          {isIncrease ? 'Increased' : 'Decreased'} by {fmt(Math.abs(pctChange))}% from {oldVal} to {newVal}
        </div>
      )}
      <button onClick={reset} className="btn-ghost text-xs gap-1.5 h-8 px-3">
        <RotateCcw size={12} /> Reset
      </button>
    </Card>
  );
}

// ─── 3. Discount & Markup ─────────────────────────────────────────────────────

function DiscountMarkup() {
  const [price, setPrice] = useState('');
  const [pct, setPct] = useState('');
  const [mode, setMode] = useState<'discount' | 'markup'>('discount');
  const [copied, setCopied] = useState<string | null>(null);

  const p = safe(price), d = safe(pct);
  const delta = isNaN(p) || isNaN(d) ? NaN : (Math.abs(d) / 100) * Math.abs(p);
  const final = isNaN(p) || isNaN(d) ? NaN : mode === 'discount' ? p - (d / 100) * p : p + (d / 100) * p;
  const finalStr = isFinite(final) && !isNaN(final) ? `$${fmt(final)}` : '—';
  const deltaStr = isFinite(delta) && !isNaN(delta) ? `$${fmt(delta)}` : '—';

  const copyVal = (key: string, val: string) => {
    if (val === '—') return;
    navigator.clipboard.writeText(val.replace(/[$,]/g, ''));
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const reset = () => { setPrice(''); setPct(''); };

  return (
    <Card icon={DollarSign} title="Discount & Markup">
      <p className="text-xs text-gray-400 dark:text-gray-500 -mt-2">Final price after discount or markup</p>
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
        {(['discount', 'markup'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 capitalize ${
              mode === m
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Original Price" value={price} onChange={setPrice} prefix="$" placeholder="99.99" id="dm-price" />
        <InputField label={mode === 'discount' ? 'Discount %' : 'Markup %'} value={pct} onChange={setPct} suffix="%" placeholder="20" id="dm-pct" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ResultRow
          label={`Final Price (${mode === 'discount' ? '-' : '+'}${pct || '?'}%)`}
          value={finalStr}
          accent
          onCopy={() => copyVal('final', finalStr)}
          copied={copied === 'final'}
          large
        />
        <ResultRow
          label={mode === 'discount' ? 'You Save' : 'Added Amount'}
          value={deltaStr}
          onCopy={() => copyVal('delta', deltaStr)}
          copied={copied === 'delta'}
        />
      </div>
      <button onClick={reset} className="btn-ghost text-xs gap-1.5 h-8 px-3">
        <RotateCcw size={12} /> Reset
      </button>
    </Card>
  );
}

// ─── 4. Reverse Percentage ────────────────────────────────────────────────────

function ReversePercentage() {
  const [final, setFinal] = useState('');
  const [pct, setPct] = useState('');
  const [mode, setMode] = useState<'added' | 'subtracted'>('added');
  const [copied, setCopied] = useState(false);

  const f = safe(final), p = safe(pct);
  const divisor = mode === 'added' ? 1 + p / 100 : 1 - p / 100;
  const original = isNaN(f) || isNaN(p) || divisor === 0 ? NaN : f / divisor;

  // Use proper minus sign (U+2212) for negative values
  const resultStr = isFinite(original) && !isNaN(original)
    ? `${original < 0 ? '−' : ''}$${fmt(Math.abs(original))}`
    : '—';

  const copy = () => {
    if (resultStr === '—') return;
    navigator.clipboard.writeText(fmt(Math.abs(original)).replace(/,/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const reset = () => { setFinal(''); setPct(''); };

  return (
    <Card icon={ArrowRightLeft} title="Reverse Percentage">
      <p className="text-xs text-gray-400 dark:text-gray-500 -mt-2">Find the original amount before a percentage was applied</p>
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit text-sm">
        {([['added', 'Tax / Markup Added'], ['subtracted', 'Discount Subtracted']] as const).map(([m, lbl]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3.5 py-1.5 font-medium rounded-lg transition-all duration-150 whitespace-nowrap ${
              mode === m
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Final Amount (after %)" value={final} onChange={setFinal} prefix="$" placeholder="120" id="rp-final" />
        <InputField label={mode === 'added' ? 'Tax / Markup Rate' : 'Discount Rate'} value={pct} onChange={setPct} suffix="%" placeholder="20" id="rp-pct" />
      </div>
      <ResultRow
        label={`Original amount (before ${pct || '?'}% ${mode === 'added' ? 'was added' : 'was subtracted'})`}
        value={resultStr}
        accent
        onCopy={copy}
        copied={copied}
        large
      />
      <button onClick={reset} className="btn-ghost text-xs gap-1.5 h-8 px-3">
        <RotateCcw size={12} /> Reset
      </button>
    </Card>
  );
}

// ─── 5. Tip Calculator & Bill Splitter ───────────────────────────────────────

const TIP_PRESETS = [10, 15, 18, 20, 25] as const;

function TipSplitter() {
  const [bill, setBill] = useState('');
  const [tipPct, setTipPct] = useState('18');
  const [people, setPeople] = useState('2');
  const [copied, setCopied] = useState<string | null>(null);

  const b = safe(bill) || 0;
  const t = safe(tipPct) || 0;
  // Clamp to integer — no fractional people
  const ppl = Math.max(1, Math.floor(parseInt(people) || 1));

  const tipAmt = (t / 100) * b;
  const total = b + tipAmt;
  const perPerson = total / ppl;
  const tipPerPerson = tipAmt / ppl;

  const copyVal = (key: string, n: number) => {
    if (!isFinite(n)) return;
    navigator.clipboard.writeText(fmt(n).replace(/,/g, ''));
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const reset = () => { setBill(''); setTipPct('18'); setPeople('2'); };

  return (
    <Card icon={Users} title="Tip Calculator & Bill Splitter">
      <p className="text-xs text-gray-400 dark:text-gray-500 -mt-2">Split a restaurant bill with tip across any number of people</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Bill Total" value={bill} onChange={setBill} prefix="$" placeholder="85.00" id="tip-bill" />
        <InputField
          label="Number of People"
          value={people}
          onChange={setPeople}
          placeholder="2"
          id="tip-ppl"
          integerOnly
        />
      </div>
      <div className="space-y-2">
        <label className="label">Tip Percentage</label>
        <div className="flex gap-2 flex-wrap items-center">
          {TIP_PRESETS.map(preset => (
            <button
              key={preset}
              onClick={() => setTipPct(String(preset))}
              className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-150 ${
                tipPct === String(preset)
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {preset}%
            </button>
          ))}
          <div className="relative flex items-center">
            <input
              type="number"
              className="input w-24 pr-7"
              value={tipPct}
              onChange={e => setTipPct(e.target.value)}
              placeholder="Custom"
            />
            <span className="absolute right-3 text-gray-400 text-sm pointer-events-none">%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ResultRow label="Tip Amount" value={`$${fmt(tipAmt)}`} onCopy={() => copyVal('tip', tipAmt)} copied={copied === 'tip'} />
        <ResultRow label="Total Bill" value={`$${fmt(total)}`} accent onCopy={() => copyVal('total', total)} copied={copied === 'total'} />
        <ResultRow label="Per Person" value={`$${fmt(perPerson)}`} accent onCopy={() => copyVal('per', perPerson)} copied={copied === 'per'} />
        <ResultRow label="Tip / Person" value={`$${fmt(tipPerPerson)}`} onCopy={() => copyVal('tippp', tipPerPerson)} copied={copied === 'tippp'} />
      </div>
      <button onClick={reset} className="btn-ghost text-xs gap-1.5 h-8 px-3">
        <RotateCcw size={12} /> Reset
      </button>
    </Card>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function PercentageCalculator() {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => { trackToolView('percentage-calculator'); }, []);

  return (
    <div style={{ display: 'contents' }}>
      <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 pb-32">
        <div className="max-w-5xl mx-auto py-8 px-4">

          {/* Header */}
          <div className="text-center mb-10 relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-900/40 mb-4 shadow-sm">
              <Calculator size={26} className="text-brand-600 dark:text-brand-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-3">
              Percentage Calculator
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Five essential percentage tools in one place — discounts, tip splitting, reverse percentages, and more.
              All calculations run instantly in your browser. No data is ever sent to any server.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400 dark:text-gray-500 font-medium flex-wrap">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                100% Private
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                No Account Needed
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                Instant Results
              </span>
            </div>
          </div>

          {/* Reset All */}
          <div className="flex justify-end mb-5">
            <button onClick={() => setResetKey(k => k + 1)} className="btn-secondary gap-2 text-sm">
              <RotateCcw size={14} />
              Reset All Fields
            </button>
          </div>

          {/* Calculator Grid — all 5 cards visible simultaneously */}
          <div key={resetKey} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PercentageOfNumber />
            <PercentageChange />
            <DiscountMarkup />
            <ReversePercentage />
            <div className="md:col-span-2">
              <TipSplitter />
            </div>
          </div>

          {/* SEO Section */}
          <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
            <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
              <h2 className="text-2xl font-bold mb-6">Why You Need a Reliable Percentage Calculator in 2026</h2>
              <p className="mb-6">Percentage calculations power everything from shopping discounts and tax estimates to investment returns, salary negotiations, and business KPI tracking. Our <strong>client-side percentage calculator</strong> delivers fast, accurate results without sending your sensitive numbers to any server.</p>

              <h3 className="text-lg font-semibold mt-8 mb-2">All Major Percentage Calculations in One Tool</h3>
              <p className="mb-6">This tool handles the most common percentage scenarios:</p>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li><strong>Percentage of a Number</strong> — "What is 15% of 850?"</li>
                <li><strong>Percentage Change</strong> — Calculate increase or decrease between two values</li>
                <li><strong>Discount &amp; Markup Calculator</strong> — Final price after discount or profit margin</li>
                <li><strong>Reverse Percentage</strong> — Find the original amount before tax or discount</li>
                <li><strong>Tip Calculator &amp; Bill Splitter</strong></li>
              </ul>

              <h3 className="text-lg font-semibold mt-8 mb-2">Why Choose Our 100% Client-Side Percentage Calculator?</h3>
              <p className="mb-6">Most online calculators transmit your financial data to remote servers. Ours runs <strong>entirely in your browser</strong> using native JavaScript. No data is logged, tracked, or stored — perfect for private calculations like salary raises, loan interest, profit margins, or tax planning.</p>

              <h3 className="text-lg font-semibold mt-8 mb-2">Percentage Formulas Reference Table</h3>
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-left">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-zinc-800">
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-3">Calculation Type</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-3">Formula</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-3">Common Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Percentage of a Number</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">(Part ÷ Whole) × 100</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">What is 12% of $450?</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Percentage Change</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">((New − Old) ÷ Old) × 100</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Sales increased from $80 to $95</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Final Price After Discount</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Original × (1 − Discount Rate)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">25% off on a $120 item</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 font-medium">Reverse Percentage</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Final ÷ (1 + Rate)</td>
                      <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Original price before 20% tax</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mt-8 mb-2">Best Practices for Accurate Percentage Calculations</h3>
              <p className="mb-6">Always clarify whether you need percentage points or relative percentage change. For important financial decisions, cross-verify with a spreadsheet. Round according to local regulations.</p>

              <p className="mt-8">This privacy-first <strong>percentage calculator</strong> on EverydayUtils.com combines mathematical precision, instant results, and complete data security — making it the trusted choice for students, professionals, business owners, and everyday users in 2026.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

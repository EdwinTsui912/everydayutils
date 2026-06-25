import { useState, useEffect, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, RotateCcw, Download, AlertCircle } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

type ECCLevel = 'L' | 'M' | 'Q' | 'H';

const ECC_OPTIONS: { value: ECCLevel; label: string; desc: string }[] = [
  { value: 'L', label: 'L — Low',     desc: '~7% recovery'  },
  { value: 'M', label: 'M — Medium',  desc: '~15% recovery' },
  { value: 'Q', label: 'Q — Quarter', desc: '~25% recovery' },
  { value: 'H', label: 'H — High',    desc: '~30% recovery' },
];

const DEFAULT_TEXT = 'https://everydayutils.com';

export default function QRCodeGenerator() {
  const [text, setText]       = useState(DEFAULT_TEXT);
  const [size, setSize]       = useState(320);
  const [ecc, setEcc]         = useState<ECCLevel>('M');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [error, setError]     = useState<string | null>(null);
  const [copied, setCopied]   = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => { trackToolView('qr-generator'); }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderQR = useCallback(async (
    content: string,
    canvasEl: HTMLCanvasElement,
    px: number,
    level: ECCLevel,
    fg: string,
    bg: string,
  ) => {
    try {
      await QRCode.toCanvas(canvasEl, content || ' ', {
        width: px,
        margin: 2,
        errorCorrectionLevel: level,
        color: { dark: fg, light: bg },
      });
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate QR code.');
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderQR(text, canvas, size, ecc, fgColor, bgColor);
  }, [text, size, ecc, fgColor, bgColor, renderQR]);

  async function getDataUrl(): Promise<string | null> {
    try {
      return await QRCode.toDataURL(text || ' ', {
        width: Math.max(size, 512),
        margin: 2,
        errorCorrectionLevel: ecc,
        color: { dark: fgColor, light: bgColor },
        type: 'image/png',
      });
    } catch {
      return null;
    }
  }

  async function handleDownload() {
    const dataUrl = await getDataUrl();
    if (!dataUrl) return;
    trackButtonClick('qr-generator', 'download');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

  async function handleCopy() {
    const dataUrl = await getDataUrl();
    if (!dataUrl) return;
    try {
      const res  = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      trackButtonClick('qr-generator', 'copy');
      trackCopySuccess('qr-generator');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Clipboard access denied. Try downloading instead.');
    }
  }

  function handleReset() {
    setText(DEFAULT_TEXT);
    setSize(320);
    setEcc('M');
    setFgColor('#0f172a');
    setBgColor('#ffffff');
    setError(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen w-full overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-3">
          QR Code Generator
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Generate high-quality QR codes instantly — all processing happens in your browser.
          No data is ever sent to a server, ensuring complete privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
        {/* Controls */}
        <div className="space-y-5">
          {/* Content input */}
          <div className="card p-5 space-y-3">
            <label className="label">Content</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={4}
              placeholder={"https://everydayutils.com\n\nOr try:\nhttps://example.com\nContact info · WiFi credentials · Plain text"}
              className="input resize-none font-mono text-sm leading-relaxed w-full"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
              Supports URLs, plain text, WiFi, vCard and more.<br />
              <span className="text-gray-500 dark:text-gray-400">For WiFi QR code:</span><br />
              <span className="font-mono">WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;</span><br />
              <span className="text-gray-400 dark:text-gray-500">Example: <span className="font-mono">WIFI:T:WPA;S:HomeWiFi;P:MySecretPass123;;</span></span>
            </p>
          </div>

          {/* Appearance */}
          <div className="card p-5 space-y-5">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Appearance</p>

            {/* Size slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="label mb-0">Preview Size</label>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums">{size}px</span>
              </div>
              <input
                type="range"
                min={200}
                max={600}
                step={10}
                value={size}
                onChange={e => setSize(+e.target.value)}
              />
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 select-none">
                <span>200px</span><span>400px</span><span>600px</span>
              </div>
            </div>

            {/* ECC Level */}
            <div className="space-y-2">
              <label className="label">Error Correction Level</label>
              <select
                value={ecc}
                onChange={e => setEcc(e.target.value as ECCLevel)}
                className="input"
              >
                {ECC_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label} — {o.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* Color pickers */}
            <div className="grid grid-cols-2 gap-4">
              {([
                { label: 'Foreground', value: fgColor, set: setFgColor },
                { label: 'Background', value: bgColor, set: setBgColor },
              ] as const).map(({ label, value, set }) => (
                <div key={label} className="space-y-1.5">
                  <label className="label">{label}</label>
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 shrink-0 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden" style={{ backgroundColor: value }}>
                      <input
                        type="color"
                        value={value}
                        onChange={e => set(e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        title={label}
                      />
                    </div>
                    <input
                      type="text"
                      value={value}
                      onChange={e => set(e.target.value)}
                      maxLength={7}
                      spellCheck={false}
                      className="input flex-1 font-mono text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button onClick={handleDownload} className="btn-primary flex-1 min-w-[140px]">
              {downloaded ? <><Check size={15} />Downloaded!</> : <><Download size={15} />Download PNG</>}
            </button>
            <button onClick={handleCopy} className="btn-secondary flex-1 min-w-[140px]">
              {copied ? <><Check size={15} />Copied!</> : <><Copy size={15} />Copy Image</>}
            </button>
            <button onClick={handleReset} className="btn-ghost" title="Reset to defaults">
              <RotateCcw size={15} />
              Reset
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl">
              <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center gap-4 lg:sticky lg:top-8">
          <div className="card p-5 flex flex-col items-center gap-3 w-full">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider self-start">Live Preview</p>
            <div
              className="rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-200"
              style={{ backgroundColor: bgColor }}
            >
              <canvas
                ref={canvasRef}
                style={{ display: 'block', borderRadius: '4px' }}
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Updates instantly as you type
            </p>
          </div>

          <div className="card p-4 space-y-2 w-full">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Tips</p>
            <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 list-disc list-inside">
              <li>Keep high contrast between foreground & background.</li>
              <li>Shorter content = less dense code = easier to scan.</li>
              <li>Use Level H when adding a logo overlay.</li>
              <li>Download exports at 512px minimum for print quality.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">The Purpose of QR Codes in Modern Digital Workflows</h2>
          <p className="mb-6">Quick Response (QR) codes serve as essential two-dimensional data matrices bridging physical media with digital infrastructure. They enable instant mobile camera access to web links, structured text, vCard contact configurations, and wireless network credentials without manual typing. Digital designers, growth marketers, and application developers rely heavily on secure matrix generation to optimize user experiences across physical products, digital restaurant menus, retail packaging, and corporate print collateral.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">What Is a QR Code and Who Invented It?</h3>
          <p className="mb-6">The QR code matrix layout was originally invented in 1994 by Masahiro Hara from the Japanese engineering firm Denso Wave, a prominent subsidiary of Toyota. Developed initially to track automotive components across complex manufacturing assembly lines, the technology evolved rapidly due to its open-source nature. Unlike traditional linear barcodes that only read data along a horizontal axis, a 2D QR matrix stores data both vertically and horizontally. This architectural shift allows a single code module to hold up to 7,089 numeric digits or 4,296 alphanumeric characters with exceptionally high processing speed.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Why Use a Client-Side QR Code Generator?</h3>
          <p className="mb-6">Our QR Code Generator on EverydayUtils.com operates <strong>100% client-side</strong> utilizing native browser execution. While many commercial web platforms route your raw data strings through external cloud databases to track consumer metrics and IP logs, this browser-based utility processes the generation script instantly using local JavaScript. Your inputs, destination links, or sensitive credentials never cross a network interface, providing total security against third-party analytics trackers, surveillance risks, or system downtime. The platform functions entirely offline, rendering high-resolution output files instantly on demand.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Demystifying Reed-Solomon Error Correction Levels</h3>
          <p className="mb-6">A primary advantage of the QR standard is its integration of Reed-Solomon error correction codes (ECC). This math engine generates backup data bits within the square grid pattern, ensuring your code remains perfectly scannable even if the printed graphic is partially stained, torn, or obscured by environmental wear. Choosing the correct ECC configuration ensures optimal scannability across diverse camera optics and low-light environments.</p>

          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-zinc-800">
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">ECC Level</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Data Recovery Capacity</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Optimal Operational Use Case</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Privacy Profile</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Level L (Low)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">~7% Restoration</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Clean digital screens, minimalistic marketing URLs</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Standard Security</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Level M (Medium)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">~15% Restoration</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Standard corporate pamphlets, flyers, retail menus</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Standard Security</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Level Q (Quarter)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">~25% Restoration</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">High-traffic logistics, commercial shipping labels</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Elevated Privacy</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Level H (High)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">~30% Restoration</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Heavy-wear physical media, adding embedded icons</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum Privacy</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-2">Essential Best Practices for Scan Optimization</h3>
          <p className="mb-6">To avoid optical scan failures, ensure your design retains a high contrast ratio between the foreground modules and background color blocks. Darker foreground hex keys paired with stark background canvases yield the fastest hardware capture times. Additionally, maintain a clean margin or 'quiet zone' surrounding the outer perimeter of the matrix. If you need to sanitize or strip raw text variables prior to generating your layout, you can quickly route to our local <a href="/text-tools" className="text-blue-600 dark:text-blue-400 hover:underline">Text Tools Suite</a> to structure parameters instantaneously client-side without data logging hazards.</p>

          <p className="mt-8">This client-side QR Code Generator combines speed, security, and reliability, making it the preferred choice for privacy-conscious users and professionals who need trustworthy, instantly scannable codes.</p>
        </div>
      </div>
    </div>
  );
}

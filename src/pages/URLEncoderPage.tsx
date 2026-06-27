import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, RotateCcw, ArrowLeft, ArrowRightLeft } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

type Mode = 'encode' | 'decode';

function URLEncoderPage() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [prettify, setPrettify] = useState(false);
  const [decodePlusAsSpace, setDecodePlusAsSpace] = useState(false);

  useEffect(() => { trackToolView('url-encoder'); }, []);

  const transform = useCallback((text: string, currentMode: Mode, plusAsSpace: boolean) => {
    if (!text) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (currentMode === 'encode') {
        setOutput(encodeURIComponent(text).replace(/!/g, '%21'));
        setError('');
      } else {
        const prepared = plusAsSpace ? text.replace(/\+/g, ' ') : text;
        setOutput(decodeURIComponent(prepared));
        setError('');
      }
    } catch (e) {
      setOutput('');
      setError(currentMode === 'decode' 
        ? 'Invalid encoded input. Check for malformed % sequences.' 
        : 'Encoding error.');
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      transform(input, mode, decodePlusAsSpace);
    }, 150);
    return () => clearTimeout(timeout);
  }, [input, mode, decodePlusAsSpace, transform]);

  const displayOutput = prettify && mode === 'decode' 
    ? output.replace(/\?/g, '\n?').replace(/&/g, '\n&').replace(/#/g, '\n#')
    : output;

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopySuccess('url-encoder');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const handleSwap = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
    setOutput('');
    setError('');
    setPrettify(false);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setPrettify(false);
  };

  const handlePrettify = () => {
    setPrettify(!prettify);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          <ArrowLeft size={16} />
          Back to Tools
        </Link>
      </div>

      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <ArrowRightLeft size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">URL Encoder / Decoder</h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Encode or decode URLs and query strings instantly in your browser. 100% private.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
            <button onClick={() => setMode('encode')} className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'encode' ? 'bg-white dark:bg-gray-900 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>Encode</button>
            <button onClick={() => setMode('decode')} className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'decode' ? 'bg-white dark:bg-gray-900 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>Decode</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="url-input" className="label">
                {mode === 'encode' ? 'Input (to encode)' : 'Input (to decode)'}
              </label>
              <span className="text-xs text-gray-400">{input.length} chars</span>
            </div>
            <textarea
              id="url-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? "Paste text, URL component, or query string..." : "Paste encoded string or query here..."}
              className="input min-h-[260px] resize-y font-mono text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="url-output" className="label">Result</label>
              <span className="text-xs text-gray-400">{output.length} chars</span>
            </div>
            <textarea
              id="url-output"
              value={displayOutput}
              readOnly
              className="input min-h-[260px] resize-y font-mono text-sm bg-gray-50 dark:bg-gray-900"
            />
            <button
              onClick={handleCopy}
              className="mt-3 w-full btn-secondary flex items-center justify-center gap-2 py-2.5"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy Result'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button onClick={handleSwap} className="btn-secondary flex items-center gap-2">
            <ArrowRightLeft size={16} /> Swap
          </button>
          <button onClick={handlePrettify} disabled={mode === 'encode'} className="btn-secondary flex items-center gap-2">
            {prettify ? 'Un-prettify' : 'Prettify'}
          </button>
          <button onClick={handleClear} className="btn-secondary flex items-center gap-2">
            <RotateCcw size={16} /> Clear All
          </button>
        </div>

        {mode === 'decode' && (
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="plus-space"
              checked={decodePlusAsSpace}
              onChange={(e) => setDecodePlusAsSpace(e.target.checked)}
              className="accent-brand-600"
            />
            <label htmlFor="plus-space" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              Treat + as space (for query strings)
            </label>
          </div>
        )}

        {error && <p className="text-red-600 dark:text-red-400 text-sm mt-4">{error}</p>}
      </div>

      {/* SEO Content */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">Free URL Encoder and Decoder Online</h2>
          <p className="mb-6">
            Encode or decode URLs, query strings, and special characters instantly in your browser. No sign-up, no data upload, complete privacy.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Why Use URL Encoding?</h3>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>URLs cannot contain spaces or certain special characters</li>
            <li>API requests and query parameters often need encoding</li>
            <li>Debugging broken links and form data</li>
            <li>Handling international characters safely</li>
          </ul>

          <h3 className="text-lg font-semibold mt-8 mb-2">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <p className="font-semibold">What is the difference between encode and decode?</p>
              <p>Encoding converts special characters to %XX format. Decoding reverses it back to readable text.</p>
            </div>
            <div>
              <p className="font-semibold">Why treat + as space?</p>
              <p>In query strings, + is commonly used to represent a space. This option makes decoding form data correct.</p>
            </div>
            <div>
              <p className="font-semibold">Is this tool private?</p>
              <p>Yes. Everything runs in your browser. No data is sent to any server.</p>
            </div>
          </div>

          <p className="mt-8">Whether you're a developer debugging APIs or cleaning up links, our tool makes URL encoding simple and secure.</p>
        </div>
      </div>
    </div>
  );
}

export default URLEncoderPage;
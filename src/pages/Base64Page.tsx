import { useState, useCallback, useEffect } from 'react';
import { Copy, Check, RotateCcw, Download, Upload, Code2, Trash2 } from 'lucide-react';
import { trackToolView, trackButtonClick, trackCopySuccess } from '../lib/analytics';

export default function Base64Page() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => { trackToolView('base64'); }, []);

  const encode = useCallback((text: string) => {
    try {
      const bytes = new TextEncoder().encode(text);
      let binary = '';
      bytes.forEach((b) => binary += String.fromCharCode(b));
      setOutput(btoa(binary));
      setError('');
    } catch {
      setOutput('');
      setError('Failed to encode. Please try again.');
    }
  }, []);

  const decode = useCallback((text: string) => {
    try {
      const cleaned = text.replace(/\s+/g, '');
      const binary = atob(cleaned);
      const bytes = Uint8Array.from(binary, (m) => m.charCodeAt(0));
      setOutput(new TextDecoder().decode(bytes));
      setError('');
    } catch {
      setOutput('');
      setError('Invalid Base64 string. Please check your input.');
    }
  }, []);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    if (mode === 'encode') {
      encode(input);
    } else {
      decode(input);
    }
  }, [input, mode, encode, decode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    trackButtonClick('base64', 'copy');
    trackCopySuccess('base64');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = () => {
    if (!output) return;
    trackButtonClick('base64', 'download');
    const ext = mode === 'encode' ? 'txt' : 'txt';
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-${mode}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setInput(result);
    };
    reader.readAsText(file);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setFileName('');
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError('');
  };

  const inputLength = input.length;
  const outputLength = output.length;
  const base64Size = Math.ceil(inputLength * 4 / 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 min-h-screen">

      {/* Centered Header with Icon */}
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <Code2 size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Base64 Encoder & Decoder</h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Instantly convert text to Base64 and back — 100% in your browser. No data leaves your device.
        </p>
      </div>

      <div className="card p-6 space-y-6">

        {/* Mode Toggle */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setMode('encode')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'encode'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'decode'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label">
              {mode === 'encode' ? 'Input Text' : 'Base64 String'}
            </label>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {inputLength.toLocaleString()} chars
              {mode === 'encode' && ` • ~${base64Size} Base64 chars`}
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' 
              ? "Paste or type text here..." 
              : "Paste valid Base64 string here..."}
            rows={10}
            className="input w-full resize-y font-mono"
          />

          {mode === 'decode' && (
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Paste valid Base64 string here
            </p>
          )}

          {/* File Upload */}
          {mode === 'encode' && (
            <>
              <label className="mt-3 flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Upload size={16} />
                <span className="text-sm">Upload text file</span>
                <input
                  type="file"
                  accept=".txt,.md,.json,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
                Supports .txt, .md, .json, .csv files
              </p>
            </>
          )}
        </div>

        {/* Prominent Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapMode}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl text-sm font-medium transition-all active:scale-95 border border-gray-200 dark:border-gray-700"
          >
            <RotateCcw size={16} /> Swap Input ↔ Output
          </button>
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label">Result</label>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {outputLength.toLocaleString()} chars
            </div>
          </div>

          <textarea
            value={output}
            readOnly
            rows={10}
            className="input w-full font-mono resize-y bg-gray-50 dark:bg-gray-800/50"
          />

          {error && (
            <div className="mt-3 px-4 py-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Result'}
          </button>

          <button
            onClick={handleDownload}
            disabled={!output}
            className="flex-1 btn-secondary flex items-center justify-center gap-2"
          >
            <Download size={16} /> Download
          </button>

          <button
            onClick={clearAll}
            className="btn-ghost flex items-center gap-2 px-5"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* SEO Section */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">Base64 Encoder & Decoder — Fast, Private & Reliable</h2>
          <p className="mb-6">Base64 is the standard way to safely transmit binary data as text. Our tool lets you encode and decode instantly in your browser — perfect for API testing, embedding images, or handling configuration files.</p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Why Use This Tool?</h3>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>100% client-side — your data never leaves your device</li>
            <li>Supports large text and file uploads</li>
            <li>Real-time conversion as you type</li>
            <li>Download result as .txt file</li>
            <li>Clean, modern interface matching EverydayUtils design</li>
          </ul>

          <p className="mt-8">Whether you're debugging APIs, preparing data for URLs, or working with embedded assets, this Base64 tool gives you fast, secure conversion with complete privacy.</p>
        </div>
      </div>
    </div>
  );
}
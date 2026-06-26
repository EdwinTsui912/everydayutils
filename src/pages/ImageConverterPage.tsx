import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Download, RotateCcw, Image as ImageIcon, X, CheckCircle } from 'lucide-react';
import { trackToolView, trackButtonClick } from '../lib/analytics';

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp';

export default function ImageConverterPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedUrls, setConvertedUrls] = useState<string[]>([]);
  const [format, setFormat] = useState<OutputFormat>('image/jpeg');
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { trackToolView('image-converter'); }, []);

  useEffect(() => {
    return () => convertedUrls.forEach(url => URL.revokeObjectURL(url));
  }, [convertedUrls]);

  const handleFiles = (newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...validFiles]);
    setConvertedUrls([]);
    setError('');
    setShowComplete(false);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertImage = useCallback(async (file: File, index: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;

        if (format === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) resolve(URL.createObjectURL(blob));
          else reject('Conversion failed');
        }, format, (format === 'image/jpeg' || format === 'image/webp') ? quality / 100 : undefined);
      };
      img.onerror = () => reject('Failed to load image');
      img.src = URL.createObjectURL(file);
    });
  }, [format, quality]);

  const convertAll = async () => {
    if (files.length === 0) return;

    setIsConverting(true);
    setProgress(0);
    setError('');
    setShowComplete(false);

    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await convertImage(files[i], i);
        urls.push(url);
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      setConvertedUrls(urls);
      setShowComplete(true);
      setTimeout(() => setShowComplete(false), 1500);
    } catch {
      setError('Some images could not be converted.');
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  const clearAll = () => {
    convertedUrls.forEach(url => URL.revokeObjectURL(url));
    setFiles([]);
    setConvertedUrls([]);
    setError('');
    setShowComplete(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <ImageIcon size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Image Format Converter</h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Convert JPG, PNG, WebP instantly in your browser. No upload, no tracking, 100% private.
        </p>
      </div>

      <div className="card p-6 space-y-8">
        {/* Upload Area */}
        <div 
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-3xl p-12 text-center hover:border-brand-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-lg font-medium">Drop images here or click to upload</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">JPG, PNG, WebP supported</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>

        <p className="text-xs text-center text-emerald-600 dark:text-emerald-400 font-medium">
          All processing happens locally in your browser. Your images never leave your device.
        </p>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium text-sm">Uploaded Files ({files.length})</p>
              <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500">Clear All</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-2xl text-sm">
                  <div className="flex items-center gap-3 truncate">
                    <ImageIcon size={18} className="text-gray-400" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-xs">{(file.size / 1024).toFixed(1)} KB</span>
                    <button onClick={() => removeFile(index)} className="text-red-400 hover:text-red-600">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="label">Output Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)} className="input">
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            {(format === 'image/jpeg' || format === 'image/webp') && (
              <div>
                <label className="label">Quality: {quality}%</label>
                <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
              </div>
            )}

            <div className="flex items-end">
              <button onClick={convertAll} disabled={isConverting} className="btn-primary w-full">
                {isConverting ? `Converting... ${progress}%` : `Convert ${files.length} Image${files.length > 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        )}

        {/* Conversion Complete Message */}
        {showComplete && (
          <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 py-3">
            <CheckCircle size={20} />
            <span className="font-medium">Conversion Complete!</span>
          </div>
        )}

        {/* Converted Results */}
        {convertedUrls.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4">Converted Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {convertedUrls.map((url, i) => (
                <div key={i} className="border rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                  <img src={url} alt={`Converted ${i}`} className="w-full h-48 object-contain p-4" />
                  <div className="p-3 border-t">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `converted-${i + 1}.${format.split('/')[1]}`;
                        link.click();
                      }}
                      className="w-full py-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                    >
                      Download Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
            {/* SEO Content */}
            <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">Free Image Format Converter - JPG, PNG, WebP</h2>
          <p className="mb-6">
            Convert between popular image formats instantly in your browser. No sign-up, no data upload, complete privacy.
          </p>

          <h3 className="text-lg font-semibold mt-8 mb-2">Why Convert Images?</h3>
          <ul className="list-disc pl-5 mb-6 space-y-1">
            <li>Optimize for web performance (WebP)</li>
            <li>Preserve transparency (PNG)</li>
            <li>Reduce file size for faster loading</li>
            <li>Compatibility with different platforms</li>
          </ul>

          <p className="mt-8">All conversions happen locally. Your images stay on your device.</p>
        </div>
      </div>
    </div>
  );
}
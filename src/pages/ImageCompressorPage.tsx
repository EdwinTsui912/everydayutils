import { useCallback, useMemo, useRef, useState } from 'react';
import {
  ImageDown,
  Upload,
  Download,
  RotateCcw,
  AlertTriangle,
  Check,
  X,
  Archive,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import JSZip from 'jszip';
import SEO from '../components/SEO';

type OutputFormat = 'image/jpeg' | 'image/webp' | 'image/png';
type Preset = 'web' | 'email' | 'social' | 'max' | 'custom';

interface CompressedItem {
  id: string;
  originalFile: File;
  originalUrl: string;
  compressedBlob: Blob | null;
  compressedUrl: string;
  outputName: string;
  status: 'ready' | 'processing' | 'done' | 'error';
  error?: string;
  originalSize: number;
  compressedSize: number | null;
  originalWidth: number;
  originalHeight: number;
  outputWidth: number | null;
  outputHeight: number | null;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_WARNING_MB = 20;

const FAQ_ITEMS = [
  {
    q: 'Does Image Compressor upload my files to a server?',
    a: 'No. All compression happens locally in your browser using canvas-based re-encoding, so your images never leave your device.',
  },
  {
    q: 'What image formats are supported?',
    a: 'The tool accepts JPG, PNG, and WebP input. You can export compressed images as JPEG, WebP, or PNG.',
  },
  {
    q: 'Why does PNG sometimes not shrink much?',
    a: 'PNG is lossless and is best for graphics, logos, and screenshots. Photos usually compress much better as JPEG or WebP.',
  },
  {
    q: 'What quality setting should I use?',
    a: 'For most web images, 70 to 82 works well. If you want smaller files for email or uploads, try 55 to 65. For maximum quality, stay above 85.',
  },
  {
    q: 'Can I compress multiple images at once?',
    a: 'Yes. Batch mode is supported, and you can download all compressed files together as a ZIP.',
  },
  {
    q: 'Will compression reduce image dimensions too?',
    a: 'Only if you set a max width or max height. Otherwise the tool keeps the original dimensions and only re-encodes the image.',
  },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
}

function percentSaved(original: number, compressed: number | null): string {
  if (!compressed || compressed >= original) return '0%';
  return `${Math.round(((original - compressed) / original) * 100)}%`;
}

function sanitizeBaseName(name: string): string {
  return name.replace(/\.[^.]+$/, '');
}

function extensionForFormat(format: OutputFormat): string {
  if (format === 'image/jpeg') return 'jpg';
  if (format === 'image/webp') return 'webp';
  return 'png';
}

function buildOutputName(fileName: string, format: OutputFormat): string {
  return `${sanitizeBaseName(fileName)}-compressed.${extensionForFormat(format)}`;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read image'));
    };
    img.src = objectUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: OutputFormat, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (type === 'image/png') {
      canvas.toBlob((blob) => {
        if (!blob) reject(new Error('Compression failed'));
        else resolve(blob);
      }, type);
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) reject(new Error('Compression failed'));
      else resolve(blob);
    }, type, quality);
  });
}

async function compressImageFile(
  file: File,
  format: OutputFormat,
  quality: number,
  maxWidth: number | null,
  maxHeight: number | null
) {
  const img = await loadImage(file);

  const originalWidth = img.naturalWidth;
  const originalHeight = img.naturalHeight;

  let targetWidth = originalWidth;
  let targetHeight = originalHeight;

  if (maxWidth || maxHeight) {
    const widthRatio = maxWidth ? maxWidth / originalWidth : Infinity;
    const heightRatio = maxHeight ? maxHeight / originalHeight : Infinity;
    const ratio = Math.min(widthRatio, heightRatio, 1);

    targetWidth = Math.max(1, Math.round(originalWidth * ratio));
    targetHeight = Math.max(1, Math.round(originalHeight * ratio));
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported in this browser');

  if (format === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const blob = await canvasToBlob(canvas, format, quality);
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    originalWidth,
    originalHeight,
    outputWidth: targetWidth,
    outputHeight: targetHeight,
  };
}

export default function ImageCompressorPage() {
  const [items, setItems] = useState<CompressedItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [quality, setQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');
  const [maxWidth, setMaxWidth] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [preset, setPreset] = useState<Preset>('web');
  const [globalError, setGlobalError] = useState('');
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasResults = items.some((item) => item.status === 'done' && item.compressedBlob);
  const totalOriginalSize = useMemo(
    () => items.reduce((sum, item) => sum + item.originalSize, 0),
    [items]
  );
  const totalCompressedSize = useMemo(
    () => items.reduce((sum, item) => sum + (item.compressedSize || 0), 0),
    [items]
  );

  const applyPreset = (next: Preset) => {
    setPreset(next);

    if (next === 'web') {
      setQuality(80);
      setOutputFormat('image/jpeg');
      setMaxWidth('');
      setMaxHeight('');
    } else if (next === 'email') {
      setQuality(60);
      setOutputFormat('image/jpeg');
      setMaxWidth('1600');
      setMaxHeight('');
    } else if (next === 'social') {
      setQuality(82);
      setOutputFormat('image/jpeg');
      setMaxWidth('1080');
      setMaxHeight('');
    } else if (next === 'max') {
      setQuality(42);
      setOutputFormat('image/webp');
      setMaxWidth('1920');
      setMaxHeight('');
    }
  };

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const validFiles = Array.from(files).filter((file) => ACCEPTED_TYPES.includes(file.type));

      if (!validFiles.length) {
        setGlobalError('Please select JPG, PNG, or WebP images.');
        return;
      }

      const rejectedCount = Array.from(files).length - validFiles.length;
      if (rejectedCount > 0) {
        setGlobalError(`Skipped ${rejectedCount} unsupported file${rejectedCount > 1 ? 's' : ''}.`);
      } else {
        setGlobalError('');
      }

      const nextItems: CompressedItem[] = validFiles.map((file) => ({
        id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
        originalFile: file,
        originalUrl: URL.createObjectURL(file),
        compressedBlob: null,
        compressedUrl: '',
        outputName: buildOutputName(file.name, outputFormat),
        status: 'ready',
        originalSize: file.size,
        compressedSize: null,
        originalWidth: 0,
        originalHeight: 0,
        outputWidth: null,
        outputHeight: null,
      }));

      setItems((prev) => [...nextItems, ...prev]);

      const parsedMaxWidth = maxWidth.trim() ? Math.max(1, parseInt(maxWidth, 10)) : null;
      const parsedMaxHeight = maxHeight.trim() ? Math.max(1, parseInt(maxHeight, 10)) : null;
      const encoderQuality = Math.min(1, Math.max(0.05, quality / 100));

      setIsBatchProcessing(true);

      for (const item of nextItems) {
        setItems((prev) =>
          prev.map((entry) =>
            entry.id === item.id ? { ...entry, status: 'processing', outputName: buildOutputName(entry.originalFile.name, outputFormat) } : entry
          )
        );

        try {
          const result = await compressImageFile(
            item.originalFile,
            outputFormat,
            encoderQuality,
            parsedMaxWidth,
            parsedMaxHeight
          );

          setItems((prev) =>
            prev.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    status: 'done',
                    compressedBlob: result.blob,
                    compressedUrl: result.url,
                    compressedSize: result.blob.size,
                    originalWidth: result.originalWidth,
                    originalHeight: result.originalHeight,
                    outputWidth: result.outputWidth,
                    outputHeight: result.outputHeight,
                    outputName: buildOutputName(entry.originalFile.name, outputFormat),
                  }
                : entry
            )
          );
        } catch (error) {
          setItems((prev) =>
            prev.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Compression failed',
                  }
                : entry
            )
          );
        }
      }

      setIsBatchProcessing(false);
    },
    [maxHeight, maxWidth, outputFormat, quality]
  );

  const onPickFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    await processFiles(event.target.files);
    event.target.value = '';
  };

  const onDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files?.length) {
      await processFiles(event.dataTransfer.files);
    }
  };

  const resetAll = () => {
    items.forEach((item) => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
    });

    setItems([]);
    setGlobalError('');
    setQuality(80);
    setOutputFormat('image/jpeg');
    setMaxWidth('');
    setMaxHeight('');
    setPreset('web');
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.compressedUrl) URL.revokeObjectURL(target.compressedUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const downloadOne = (item: CompressedItem) => {
    if (!item.compressedBlob) return;
    const a = document.createElement('a');
    a.href = item.compressedUrl;
    a.download = item.outputName;
    a.click();
  };

  const downloadAllZip = async () => {
    const completed = items.filter((item) => item.compressedBlob);
    if (!completed.length) return;

    const zip = new JSZip();
    completed.forEach((item) => {
      if (item.compressedBlob) zip.file(item.outputName, item.compressedBlob);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed-images.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="Free Image Compressor — Reduce JPG, PNG & WebP Size Privately"
        description="Compress images in your browser with no uploads. Reduce JPG, PNG, and WebP file size with quality controls, resizing, batch processing, and ZIP download."
        keywords="image compressor, compress image online, reduce image size, jpg compressor, webp compressor, png compressor, batch image compressor"
        url="https://www.everydayutils.com/image-compressor"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white">
            <ImageDown size={20} />
          </div>
          <span className="label">Design & Media</span>
        </div>
        <h1 className="page-title mb-2">Image Compressor</h1>
        <p className="page-subtitle">
          Compress JPG, PNG, and WebP images in your browser — privately, instantly, and with batch download support.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => inputRef.current?.click()}
          className="btn-primary inline-flex items-center gap-2"
          type="button"
        >
          <Upload size={16} />
          Select Images
        </button>

        <button
          onClick={resetAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-700 transition-colors"
          type="button"
        >
          <RotateCcw size={14} />
          Reset
        </button>

        <button
          onClick={downloadAllZip}
          disabled={!hasResults}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          type="button"
        >
          <Archive size={14} />
          Download All ZIP
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={onPickFiles}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <div className="card p-5 h-fit">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Compression Settings
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-xs text-gray-400 dark:text-gray-500 mb-2">
                Preset
              </label>
              <select
                value={preset}
                onChange={(e) => applyPreset(e.target.value as Preset)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
              >
                <option value="web">Web</option>
                <option value="email">Email</option>
                <option value="social">Social Media</option>
                <option value="max">Maximum Compression</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 dark:text-gray-500 mb-2">
                Output format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => {
                  setPreset('custom');
                  setOutputFormat(e.target.value as OutputFormat);
                }}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WebP</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <label className="text-xs text-gray-400 dark:text-gray-500">
                  Quality
                </label>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                  {quality}%
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={1}
                value={quality}
                disabled={outputFormat === 'image/png'}
                onChange={(e) => {
                  setPreset('custom');
                  setQuality(parseInt(e.target.value, 10));
                }}
                className="w-full"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {outputFormat === 'image/png'
                  ? 'PNG export is lossless, so the quality slider is disabled.'
                  : 'Lower quality means a smaller file, but more visible compression.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 dark:text-gray-500 mb-2">
                  Max width
                </label>
                <input
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder="e.g. 1920"
                  value={maxWidth}
                  onChange={(e) => {
                    setPreset('custom');
                    setMaxWidth(e.target.value);
                  }}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 dark:text-gray-500 mb-2">
                  Max height
                </label>
                <input
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder="e.g. 1080"
                  value={maxHeight}
                  onChange={(e) => {
                    setPreset('custom');
                    setMaxHeight(e.target.value);
                  }}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
              <p className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                Best results usually come from resizing large photos first, then reducing quality. PNG works best for graphics and screenshots, while JPEG and WebP are better for photos.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={onDrop}
            className={`card p-8 border-2 border-dashed transition-colors ${
              dragActive
                ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-500 flex items-center justify-center mx-auto mb-4">
                <Upload size={22} />
              </div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Drop images here
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed mb-4">
                Drag and drop JPG, PNG, or WebP files, or browse from your device. Everything is compressed locally in your browser.
              </p>
              <button
                onClick={() => inputRef.current?.click()}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-brand-500 text-white hover:bg-brand-600 transition-colors"
              >
                <Upload size={15} />
                Choose Images
              </button>
            </div>
          </div>

          {globalError && (
            <div className="card p-4">
              <p className="text-sm text-amber-600 dark:text-amber-400 flex items-start gap-2">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                {globalError}
              </p>
            </div>
          )}

          {items.length > 0 && (
            <div className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Batch Summary
                </h2>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {items.length} file{items.length > 1 ? 's' : ''}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {formatBytes(totalOriginalSize)} → {formatBytes(totalCompressedSize)}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                    {totalCompressedSize > 0 ? percentSaved(totalOriginalSize, totalCompressedSize) : '0%'} smaller
                  </span>
                </div>
              </div>

              {isBatchProcessing && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                  Compressing images…
                </p>
              )}

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 p-4"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                          {item.originalFile.name}
                        </h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                          <span>{formatBytes(item.originalSize)}</span>
                          {item.originalWidth > 0 && item.originalHeight > 0 && (
                            <span>
                              {item.originalWidth} × {item.originalHeight}
                            </span>
                          )}
                          {item.originalFile.size / (1024 * 1024) > MAX_WARNING_MB && (
                            <span className="text-amber-500 dark:text-amber-400">
                              Large file
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        type="button"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        aria-label="Remove image"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">Original</div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                          <img
                            src={item.originalUrl}
                            alt={`Original ${item.originalFile.name}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2">Compressed</div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 flex items-center justify-center">
                          {item.status === 'processing' && (
                            <p className="text-sm text-gray-400 dark:text-gray-500">Processing…</p>
                          )}

                          {item.status === 'error' && (
                            <p className="text-sm text-red-500 px-4 text-center">{item.error}</p>
                          )}

                          {item.status === 'done' && item.compressedUrl && (
                            <img
                              src={item.compressedUrl}
                              alt={`Compressed ${item.originalFile.name}`}
                              className="w-full h-full object-contain"
                            />
                          )}

                          {item.status === 'ready' && (
                            <p className="text-sm text-gray-400 dark:text-gray-500">Queued</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          <span className="text-gray-400 dark:text-gray-500">Result:</span>{' '}
                          {item.compressedSize ? formatBytes(item.compressedSize) : '—'}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          <span className="text-gray-400 dark:text-gray-500">Saved:</span>{' '}
                          {percentSaved(item.originalSize, item.compressedSize)}
                        </span>
                        {item.outputWidth && item.outputHeight && (
                          <span className="text-gray-600 dark:text-gray-300">
                            <span className="text-gray-400 dark:text-gray-500">Output:</span>{' '}
                            {item.outputWidth} × {item.outputHeight}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-start md:justify-end">
                        <button
                          onClick={() => downloadOne(item)}
                          disabled={!item.compressedBlob}
                          type="button"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Download size={14} />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 prose prose-zinc dark:prose-invert max-w-none">
            <h2 className="font-semibold mt-8 mb-2">What Image Compression Does</h2>
            <p>
              Image compression reduces file size so photos and graphics load faster, upload more reliably, and take up less storage. For most web use cases, the biggest wins come from choosing the right format and resizing oversized images before export.
            </p>

            <h2 className="font-semibold mt-8 mb-2">JPEG vs PNG vs WebP</h2>
            <p>
              JPEG works best for photos, WebP usually gives the best balance of quality and size for modern web use, and PNG is best for logos, screenshots, and transparency. If you are compressing a phone photo, JPEG or WebP will usually shrink much more than PNG.
            </p>

            <h2 className="font-semibold mt-8 mb-2">Batch Compression for Uploads</h2>
            <p>
              Batch mode is useful when preparing listings, blog media, profile photos, or email attachments. Because this tool runs locally in your browser, you can compress multiple images without uploading private files to a third-party server.
            </p>

            <h2 className="font-semibold mt-8 mb-2">Frequently Asked Questions</h2>
          </div>

          <div className="not-prose space-y-4 mt-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="card p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1.5">
                  {item.q}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
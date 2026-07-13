'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, Download, RotateCcw, Image as ImageIcon, Trash2 } from 'lucide-react';
import { trackToolView } from '../lib/analytics';
import JSZip from 'jszip';

interface GeneratedIcon {
  size: number;
  url: string;
  blob: Blob;
  filename: string;
}

export default function FaviconGeneratorPage() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    trackToolView('favicon-generator');
  }, []);

  const resetAll = () => {
    setImage(null);
    setPreviewUrl(null);
    setIcons([]);
    setBackgroundColor('#ffffff');
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG or JPG recommended)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setPreviewUrl(e.target?.result as string);
        setIcons([]);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const generateIcons = useCallback(async () => {
    if (!image || !canvasRef.current) return;

    setIsGenerating(true);
    const newIcons: GeneratedIcon[] = [];
    const sizes = [16, 32, 48, 180, 192, 512];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    for (const size of sizes) {
      canvas.width = size;
      canvas.height = size;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);

      const scale = Math.min(size / image.width, size / image.height);
      const x = (size - image.width * scale) / 2;
      const y = (size - image.height * scale) / 2;

      ctx.drawImage(image, x, y, image.width * scale, image.height * scale);

      const blob = await new Promise<Blob>((resolve) => 
        canvas.toBlob((b) => resolve(b!), 'image/png', 1.0)
      );

      const url = URL.createObjectURL(blob);
      newIcons.push({
        size,
        url,
        blob,
        filename: `favicon-${size}x${size}.png`
      });
    }

    // Apple Touch Icon
    const apple180 = newIcons.find(i => i.size === 180);
    if (apple180) {
      newIcons.push({
        size: 180,
        url: apple180.url,
        blob: apple180.blob,
        filename: 'apple-touch-icon.png'
      });
    }

    // favicon.ico (fallback)
    const ico32 = newIcons.find(i => i.size === 32);
    if (ico32) {
      newIcons.push({
        size: 0,
        url: ico32.url,
        blob: ico32.blob,
        filename: 'favicon.ico'
      });
    }

    setIcons(newIcons);
    setIsGenerating(false);
  }, [image, backgroundColor]);

  const downloadAll = async () => {
    if (icons.length === 0) return;

    setIsDownloading(true);
    const zip = new JSZip();

    icons.forEach(icon => {
      zip.file(icon.filename, icon.blob);
    });

    const htmlSnippet = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Favicons Installation Guide</title>
  <style>body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; } pre { background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; }</style>
</head>
<body>
  <h1>✅ Your Favicons are Ready</h1>
  <p>Extract this ZIP and upload the files to your website root folder.</p>
  
  <h2>Recommended HTML Code (add to &lt;head&gt; section)</h2>
  <pre><code>&lt;link rel="icon" href="/favicon.ico" sizes="any"&gt;
&lt;link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"&gt;
&lt;link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"&gt;
&lt;link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png"&gt;</code></pre>
</body>
</html>`;

    zip.file("README.html", htmlSnippet);

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'favicons.zip';
    link.click();

    setIsDownloading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4">
          <ImageIcon size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">Favicon Generator</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Turn any image into a complete set of favicons and app icons instantly
        </p>
      </div>

      {!previewUrl && (
        <div 
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center hover:border-brand-400 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
            <Upload size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload your logo or image</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">PNG or JPG recommended (transparent PNG works best)</p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
          />
          
          <button className="btn-primary px-8 py-3">Choose Image</button>
        </div>
      )}

      {previewUrl && (
        <div className="space-y-10">
          <div className="card p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Original Image</h2>
              <button 
                onClick={resetAll} 
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
                <span className="font-medium">Clear All</span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <img src={previewUrl} alt="Original" className="max-h-80 w-full object-contain rounded-2xl border border-gray-200 dark:border-gray-700" />
              </div>

              <div className="w-full lg:w-72 space-y-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-12 rounded-xl border border-gray-300 dark:border-gray-700 cursor-pointer"
                    />
                    <span className="text-sm text-gray-500 font-mono">{backgroundColor}</span>
                  </div>
                </div>

                <button 
                  onClick={generateIcons}
                  disabled={isGenerating}
                  className="w-full btn-primary py-4 text-lg font-medium"
                >
                  {isGenerating ? 'Generating Icons...' : 'Generate All Favicon Sizes'}
                </button>
              </div>
            </div>
          </div>

          {icons.length > 0 && (
            <div className="card p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Generated Icons</h2>
                <button 
                  onClick={downloadAll}
                  disabled={isDownloading}
                  className="btn-primary flex items-center gap-2"
                >
                  <Download size={18} />
                  {isDownloading ? 'Creating ZIP...' : 'Download All as ZIP'}
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {icons.map((icon) => (
                  <div key={icon.filename} className="text-center group">
                    <div className="mx-auto border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-white dark:bg-gray-900 mb-3">
                      <img src={icon.url} alt={icon.filename} className="mx-auto" />
                    </div>
                    <p className="text-sm font-mono text-gray-500">{icon.filename}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* SEO Content */}
      <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto px-4 text-sm leading-relaxed">
          <h2 className="text-2xl font-bold mb-6">Free Favicon Generator from Image – Create All Sizes Instantly</h2>
          <p className="mb-6">
            Generate a complete set of favicons including favicon.ico and apple-touch-icon.png from one uploaded image. Private, no upload required.
          </p>
        </div>
      </div>
    </div>
  );
}
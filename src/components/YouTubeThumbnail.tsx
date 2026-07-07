// YouTubeThumbnailPage.tsx
import React, { useRef, useState, useCallback, useEffect, useReducer } from 'react';
import { Upload, Download, RotateCw, Trash2, Bold, Italic, Type, Square, Circle, ArrowRight, LayoutTemplate, Layers, Image as ImageIcon, Sparkles, ShieldCheck, DollarSign, Wand2 } from 'lucide-react';

interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  shadow: boolean;
  outline: boolean;
  outlineColor: string;
  outlineThickness: number;
  alignment: 'left' | 'center' | 'right';
  fontFamily: string;
}

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

type ThumbnailState = {
  textLayers: TextLayer[];
  bgColor: string;
};

type HistoryState = {
  past: ThumbnailState[];
  present: ThumbnailState;
  future: ThumbnailState[];
};

type Action =
  | { type: 'SET'; payload: Partial<ThumbnailState> }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET'; payload: ThumbnailState };

const historyReducer = (state: HistoryState, action: Action): HistoryState => {
  switch (action.type) {
    case 'SET': {
      const newPresent = { ...state.present, ...action.payload };
      return {
        past: [...state.past.slice(-7), state.present],
        present: newPresent,
        future: [],
      };
    }
    case 'UNDO': {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case 'REDO': {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }
    case 'RESET':
      return { past: [], present: action.payload, future: [] };
    default:
      return state;
  }
};

const YouTubeThumbnailPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [historyState, dispatch] = useReducer(historyReducer, {
    past: [],
    present: { textLayers: [], bgColor: '#000000' },
    future: [],
  });

  const { textLayers, bgColor } = historyState.present;

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draftPosition, setDraftPosition] = useState<{ x: number; y: number } | null>(null);

  const templates = [
    {
      name: "Reaction Face",
      bgColor: "#0a0a0a",
      texts: [
        { text: "WHEN YOU", x: 640, y: 180, fontSize: 80, color: "#fff", bold: true, shadow: true, outline: true, outlineColor: "#000", outlineThickness: 8, alignment: "center" as const, fontFamily: "Impact" },
        { text: "SEE THE PRICE", x: 640, y: 320, fontSize: 65, color: "#ff4444", bold: true, shadow: true, outline: true, outlineColor: "#000", outlineThickness: 6, alignment: "center" as const, fontFamily: "Impact" },
        { text: "😱", x: 640, y: 500, fontSize: 120, color: "#fff", bold: true, shadow: true, outline: false, outlineColor: "#000", outlineThickness: 6, alignment: "center" as const, fontFamily: "Impact" },
      ]
    },
    {
      name: "Tutorial",
      bgColor: "#1a1a2e",
      texts: [
        { text: "HOW TO", x: 640, y: 200, fontSize: 90, color: "#fff", bold: true, shadow: true, outline: true, outlineColor: "#000", outlineThickness: 8, alignment: "center" as const, fontFamily: "Impact" },
        { text: "MASTER", x: 640, y: 310, fontSize: 70, color: "#00ff88", bold: true, shadow: true, outline: true, outlineColor: "#000", outlineThickness: 6, alignment: "center" as const, fontFamily: "Impact" },
        { text: "TRADING IN 2026", x: 640, y: 430, fontSize: 55, color: "#fff", bold: true, shadow: true, outline: false, outlineColor: "#000", outlineThickness: 6, alignment: "center" as const, fontFamily: "Impact" },
      ]
    }
  ];

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (image) {
      const ratio = Math.min(CANVAS_WIDTH / image.width, CANVAS_HEIGHT / image.height);
      const newWidth = image.width * ratio;
      const newHeight = image.height * ratio;
      ctx.drawImage(image, (CANVAS_WIDTH - newWidth) / 2, (CANVAS_HEIGHT - newHeight) / 2, newWidth, newHeight);
    }

    textLayers.forEach(layer => {
      const isDraggingThis = isDragging && layer.id === selectedLayerId && draftPosition;
      const x = isDraggingThis ? draftPosition!.x : layer.x;
      const y = isDraggingThis ? draftPosition!.y : layer.y;

      ctx.save();
      ctx.font = `${layer.bold ? 'bold ' : ''}${layer.italic ? 'italic ' : ''}${layer.fontSize}px ${layer.fontFamily}, Impact, Arial Black, sans-serif`;
      ctx.fillStyle = layer.color;
      ctx.textAlign = layer.alignment;

      if (layer.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
      }

      if (layer.outline) {
        ctx.strokeStyle = layer.outlineColor;
        ctx.lineWidth = layer.outlineThickness;
        ctx.strokeText(layer.text, x, y);
      }

      ctx.fillText(layer.text, x, y);

      if (selectedLayerId === layer.id) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        const metrics = ctx.measureText(layer.text);
        const w = metrics.width;
        ctx.strokeRect(x - (layer.alignment === 'center' ? w / 2 : 0) - 15, y - layer.fontSize, w + 30, layer.fontSize + 20);
      }
      ctx.restore();
    });
  }, [image, textLayers, bgColor, selectedLayerId, isDragging, draftPosition]);

  useEffect(() => { drawCanvas(); }, [drawCanvas]);

  const undo = () => dispatch({ type: 'UNDO' });
  const redo = () => dispatch({ type: 'REDO' });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        dispatch({ type: 'SET', payload: { textLayers, bgColor } });
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const addTextLayer = () => {
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: "YOUR TEXT HERE",
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      fontSize: 60,
      color: '#ffffff',
      bold: true,
      italic: false,
      shadow: true,
      outline: true,
      outlineColor: '#000000',
      outlineThickness: 8,
      alignment: 'center',
      fontFamily: 'Impact',
    };
    dispatch({ type: 'SET', payload: { textLayers: [...textLayers, newLayer] } });
    setSelectedLayerId(newLayer.id);
  };

  const updateTextLayer = (id: string, updates: Partial<TextLayer>) => {
    dispatch({ type: 'SET', payload: { textLayers: textLayers.map(l => l.id === id ? { ...l, ...updates } : l) } });
  };

  const deleteLayer = (id: string) => {
    dispatch({ type: 'SET', payload: { textLayers: textLayers.filter(l => l.id !== id) } });
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const loadTemplate = (tmpl: any) => {
    dispatch({ type: 'SET', payload: {
      bgColor: tmpl.bgColor,
      textLayers: tmpl.texts.map((t: any) => ({ ...t, id: Date.now().toString() + Math.random() }))
    } });
    setSelectedLayerId(null);
  };

  const exportImage = (format: 'png' | 'jpg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const link = document.createElement('a');
    link.download = `youtube-thumbnail.${format}`;
    link.href = canvas.toDataURL(mime, 0.95);
    link.click();
  };

  const clearAll = () => {
    dispatch({ type: 'RESET', payload: { textLayers: [], bgColor: '#000000' } });
    setImage(null);
    setSelectedLayerId(null);
  };

  const selectedTextLayer = textLayers.find(l => l.id === selectedLayerId);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    for (let i = textLayers.length - 1; i >= 0; i--) {
      const layer = textLayers[i];
      const ctx = canvas.getContext('2d')!;
      ctx.font = `${layer.bold ? 'bold ' : ''}${layer.italic ? 'italic ' : ''}${layer.fontSize}px ${layer.fontFamily}, Impact, Arial Black, sans-serif`;
      const metrics = ctx.measureText(layer.text);
      const w = metrics.width;
      let left = layer.x;
      if (layer.alignment === 'center') left -= w / 2;
      if (layer.alignment === 'right') left -= w;
      if (mouseX > left - 20 && mouseX < left + w + 20 && mouseY > layer.y - layer.fontSize - 10 && mouseY < layer.y + 10) {
        setSelectedLayerId(layer.id);
        setIsDragging(true);
        setDragOffset({ x: mouseX - layer.x, y: mouseY - layer.y });
        setDraftPosition({ x: layer.x, y: layer.y });
        return;
      }
    }
    setSelectedLayerId(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedLayerId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    setDraftPosition({ x: mouseX - dragOffset.x, y: mouseY - dragOffset.y });
  };

  const handleCanvasMouseUp = () => {
    if (isDragging && selectedLayerId && draftPosition) {
      updateTextLayer(selectedLayerId, { x: draftPosition.x, y: draftPosition.y });
    }
    setIsDragging(false);
    setDraftPosition(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <div className="text-center mb-12">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
          <ImageIcon size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">YouTube Thumbnail Generator</h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Create professional YouTube thumbnails instantly — 100% client-side. No sign-up, no watermark.
        </p>
      </div>

      <div className="card p-6">
        {/* Upper Bar */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex gap-3">
            <button onClick={undo} disabled={historyState.past.length === 0} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-2xl disabled:opacity-50">
              <RotateCw className="w-4 h-4" /> Undo
            </button>
            <button onClick={redo} disabled={historyState.future.length === 0} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-2xl disabled:opacity-50">
              Redo
            </button>
            <button onClick={clearAll} className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-2xl">Clear All</button>
          </div>

          <div className="flex gap-3">
            <button onClick={() => exportImage('png')} className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-2xl font-medium">PNG</button>
            <button onClick={() => exportImage('jpg')} className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-2xl font-medium">JPG</button>
          </div>
        </div>

        {/* Main Canvas Pane */}
        <div className="flex justify-center bg-gray-950 rounded-3xl p-8 min-h-[600px]">
          <div className="relative w-full max-w-[900px]">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="bg-black cursor-move w-full aspect-video border border-gray-700 rounded-3xl"
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
          </div>
        </div>

        {/* Lower Toolbar */}
        <div className="flex gap-4 mt-6">
          {/* Left Tools */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Background Color</label>
              <div className="flex gap-3">
                <input type="color" value={bgColor} onChange={(e) => dispatch({ type: 'SET', payload: { bgColor: e.target.value } })} className="w-12 h-12 rounded-xl cursor-pointer border border-gray-300 dark:border-gray-600" />
                <button onClick={() => dispatch({ type: 'SET', payload: { bgColor: '#000000' } })} className="flex-1 h-12 bg-black border border-gray-300 dark:border-gray-600 rounded-xl text-white text-sm">Black</button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">Upload Background</label>
              <label
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:border-blue-500 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      const img = new Image();
                      img.onload = () => setImage(img);
                      img.src = ev.target?.result as string;
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <span className="text-sm">Choose Image or Drag & Drop</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Templates</div>
              <div className="flex gap-2">
                {templates.map((t, i) => (
                  <button key={i} onClick={() => loadTemplate(t)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-sm">
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Tools */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="uppercase text-xs tracking-widest text-gray-500 dark:text-gray-400 mb-4">LAYERS</div>
              <div className="space-y-1">
                {textLayers.map(layer => (
                  <div key={layer.id} onClick={() => setSelectedLayerId(layer.id)}
                    className={`px-4 py-2.5 rounded-xl text-sm cursor-pointer flex justify-between items-center ${selectedLayerId === layer.id ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                    <span>{layer.text.substring(0, 25)}</span>
                    <button onClick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }} className="text-red-500">×</button>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={addTextLayer} className="w-full py-3 bg-blue-600 text-white rounded-2xl">Add Text</button>

            {selectedTextLayer && (
              <div className="space-y-4 border-t pt-6">
                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Text</label>
                  <input
                    value={selectedTextLayer.text}
                    onChange={(e) => updateTextLayer(selectedTextLayer.id, { text: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Font Size ({selectedTextLayer.fontSize}px)</label>
                  <input type="range" min={20} max={160} value={selectedTextLayer.fontSize} onChange={(e) => updateTextLayer(selectedTextLayer.id, { fontSize: Number(e.target.value) })} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Color</label>
                  <input type="color" value={selectedTextLayer.color} onChange={(e) => updateTextLayer(selectedTextLayer.id, { color: e.target.value })} className="w-full h-10" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateTextLayer(selectedTextLayer.id, { bold: !selectedTextLayer.bold })} className={`py-2 rounded-xl ${selectedTextLayer.bold ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Bold</button>
                  <button onClick={() => updateTextLayer(selectedTextLayer.id, { italic: !selectedTextLayer.italic })} className={`py-2 rounded-xl ${selectedTextLayer.italic ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Italic</button>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Outline Thickness ({selectedTextLayer.outlineThickness})</label>
                  <input type="range" min={0} max={12} value={selectedTextLayer.outlineThickness} onChange={(e) => updateTextLayer(selectedTextLayer.id, { outlineThickness: Number(e.target.value) })} className="w-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- SEO CONTENT SECTION ---------------- */}
      <div className="max-w-7xl mx-auto py-16 space-y-16">
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Free YouTube Thumbnail Generator 2026 — No Sign-up, No Watermark
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            Create high-CTR YouTube thumbnails in under 60 seconds. Upload your image, layer your text, and export a
            polished graphic directly in your browser. No accounts, no watermarks, no privacy concerns — just fast,
            effective design.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">Why Use This Tool?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="w-10 h-10 flex items-center justify-center mb-4 text-blue-600">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Optimized 1280×720 Canvas</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Forget resizing — our canvas is locked to the exact YouTube standard.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="w-10 h-10 flex items-center justify-center mb-4 text-blue-600">
                <Wand2 className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">High-Impact Text</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Easily add bold, shadows, and custom outlines to make your hooks pop on mobile.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="w-10 h-10 flex items-center justify-center mb-4 text-blue-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Templates That Work</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Don't start from scratch — use our proven layouts for tutorials and reactions.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="w-10 h-10 flex items-center justify-center mb-4 text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">Total Privacy</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Everything stays in your browser. We don't touch your images, and we don't store your data.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="w-10 h-10 flex items-center justify-center mb-4 text-blue-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-2">100% Free</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                No hidden costs, no "pro" upgrades. Just get your thumbnail and get back to editing your video.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-center">How to Build Your Thumbnail</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold mb-4">1</div>
              <div className="mb-3 text-gray-400"><Upload className="w-6 h-6" /></div>
              <h4 className="font-semibold mb-2">Upload</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Drag and drop your background image or screenshot.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold mb-4">2</div>
              <div className="mb-3 text-gray-400"><Wand2 className="w-6 h-6" /></div>
              <h4 className="font-semibold mb-2">Style</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Add text layers and use our effects to create a visual "hook."
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold mb-4">3</div>
              <div className="mb-3 text-gray-400"><LayoutTemplate className="w-6 h-6" /></div>
              <h4 className="font-semibold mb-2">Perfect</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Use templates or move elements freely with drag-and-drop.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold mb-4">4</div>
              <div className="mb-3 text-gray-400"><Download className="w-6 h-6" /></div>
              <h4 className="font-semibold mb-2">Export</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Download your high-quality PNG or JPG file instantly.
              </p>
            </div>
          </div>
        </section>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          All processing happens locally in your browser. Your images and text never leave your device.
        </p>
      </div>
    </div>
  );
};

export default YouTubeThumbnailPage;
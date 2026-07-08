import React, { useRef, useState, useCallback, useEffect, useReducer } from 'react';
import {
  Upload,
  Download,
  RotateCw,
  Trash2,
  LayoutTemplate,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Wand2,
} from 'lucide-react';

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
      name: 'Reaction Face',
      bgColor: '#0a0a0a',
      texts: [
        {
          text: 'WHEN YOU',
          x: 640,
          y: 180,
          fontSize: 80,
          color: '#fff',
          bold: true,
          shadow: true,
          outline: true,
          outlineColor: '#000',
          outlineThickness: 8,
          alignment: 'center' as const,
          fontFamily: 'Impact',
        },
        {
          text: 'SEE THE PRICE',
          x: 640,
          y: 320,
          fontSize: 65,
          color: '#ff4444',
          bold: true,
          shadow: true,
          outline: true,
          outlineColor: '#000',
          outlineThickness: 6,
          alignment: 'center' as const,
          fontFamily: 'Impact',
        },
        {
          text: '😱',
          x: 640,
          y: 500,
          fontSize: 120,
          color: '#fff',
          bold: true,
          shadow: true,
          outline: false,
          outlineColor: '#000',
          outlineThickness: 6,
          alignment: 'center' as const,
          fontFamily: 'Impact',
        },
      ],
    },
    {
      name: 'Tutorial',
      bgColor: '#1a1a2e',
      texts: [
        {
          text: 'HOW TO',
          x: 640,
          y: 200,
          fontSize: 90,
          color: '#fff',
          bold: true,
          shadow: true,
          outline: true,
          outlineColor: '#000',
          outlineThickness: 8,
          alignment: 'center' as const,
          fontFamily: 'Impact',
        },
        {
          text: 'MASTER',
          x: 640,
          y: 310,
          fontSize: 70,
          color: '#00ff88',
          bold: true,
          shadow: true,
          outline: true,
          outlineColor: '#000',
          outlineThickness: 6,
          alignment: 'center' as const,
          fontFamily: 'Impact',
        },
        {
          text: 'TRADING IN 2026',
          x: 640,
          y: 430,
          fontSize: 55,
          color: '#fff',
          bold: true,
          shadow: true,
          outline: false,
          outlineColor: '#000',
          outlineThickness: 6,
          alignment: 'center' as const,
          fontFamily: 'Impact',
        },
      ],
    },
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
      ctx.drawImage(
        image,
        (CANVAS_WIDTH - newWidth) / 2,
        (CANVAS_HEIGHT - newHeight) / 2,
        newWidth,
        newHeight
      );
    }

    textLayers.forEach((layer) => {
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
        ctx.strokeRect(
          x - (layer.alignment === 'center' ? w / 2 : 0) - 15,
          y - layer.fontSize,
          w + 30,
          layer.fontSize + 20
        );
      }

      ctx.restore();
    });
  }, [image, textLayers, bgColor, selectedLayerId, isDragging, draftPosition]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

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
      text: 'YOUR TEXT HERE',
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
    dispatch({
      type: 'SET',
      payload: { textLayers: textLayers.map((l) => (l.id === id ? { ...l, ...updates } : l)) },
    });
  };

  const deleteLayer = (id: string) => {
    dispatch({ type: 'SET', payload: { textLayers: textLayers.filter((l) => l.id !== id) } });
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const loadTemplate = (tmpl: any) => {
    dispatch({
      type: 'SET',
      payload: {
        bgColor: tmpl.bgColor,
        textLayers: tmpl.texts.map((t: any) => ({
          ...t,
          id: Date.now().toString() + Math.random(),
        })),
      },
    });
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

  const selectedTextLayer = textLayers.find((l) => l.id === selectedLayerId);

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

      if (
        mouseX > left - 20 &&
        mouseX < left + w + 20 &&
        mouseY > layer.y - layer.fontSize - 10 &&
        mouseY < layer.y + 10
      ) {
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
    <div className="page min-h-screen overflow-x-hidden px-3 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 shadow-md sm:h-16 sm:w-16 sm:mb-6">
            <ImageIcon size={28} className="text-white sm:h-8 sm:w-8" />
          </div>

          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            YouTube Thumbnail Generator
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            Create professional YouTube thumbnails instantly — 100% client-side. No sign-up, no watermark.
          </p>
        </div>

        <div className="card overflow-hidden p-3 sm:p-5 lg:p-6">
          {/* Upper Bar */}
          <div className="mb-4 border-b border-gray-200 pb-4 dark:border-gray-700 sm:mb-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap">
                <button
                  onClick={undo}
                  disabled={historyState.past.length === 0}
                  className="btn-secondary w-full min-w-0 rounded-2xl"
                >
                  <RotateCw className="h-4 w-4" />
                  Undo
                </button>

                <button
                  onClick={redo}
                  disabled={historyState.future.length === 0}
                  className="btn-secondary w-full min-w-0 rounded-2xl"
                >
                  Redo
                </button>

                <button
                  onClick={clearAll}
                  className="btn-danger col-span-2 w-full min-w-0 rounded-2xl sm:col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap">
                <button
                  onClick={() => exportImage('png')}
                  className="inline-flex w-full min-w-0 items-center justify-center rounded-2xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-900"
                >
                  PNG
                </button>

                <button
                  onClick={() => exportImage('jpg')}
                  className="inline-flex w-full min-w-0 items-center justify-center rounded-2xl bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-900"
                >
                  JPG
                </button>
              </div>
            </div>
          </div>

          {/* Main Canvas Pane */}
          <div className="overflow-hidden rounded-3xl bg-gray-950 p-3 sm:p-5 lg:p-6">
            <div className="mx-auto w-full max-w-[960px] min-w-0">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="aspect-video w-full max-w-full rounded-2xl border border-gray-700 bg-black shadow-sm sm:rounded-3xl"
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
              />
            </div>
          </div>

          {/* Lower Toolbar */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6">
            {/* Left Tools */}
            <div className="min-w-0 space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                <label className="mb-3 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Background Color
                </label>

                <div className="grid grid-cols-[56px_minmax(0,1fr)] gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => dispatch({ type: 'SET', payload: { bgColor: e.target.value } })}
                    className="h-14 w-14 cursor-pointer rounded-xl border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    onClick={() => dispatch({ type: 'SET', payload: { bgColor: '#000000' } })}
                    className="h-14 min-w-0 rounded-xl border border-gray-300 bg-black px-4 text-sm text-white dark:border-gray-600"
                  >
                    Black
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                <label className="mb-3 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Upload Background
                </label>

                <label
                  className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 px-4 text-center transition-colors hover:border-blue-500 dark:border-gray-600"
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
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <span className="text-base font-medium">Choose Image</span>
                  <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    or drag and drop
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Templates
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {templates.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => loadTemplate(t)}
                      className="min-w-0 rounded-xl bg-white px-3 py-3 text-sm shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Tools */}
            <div className="min-w-0 space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
                  Layers
                </div>

                <div className="space-y-2">
                  {textLayers.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                      No layers yet. Add text to start editing.
                    </div>
                  ) : (
                    textLayers.map((layer) => (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayerId(layer.id)}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm ${
                          selectedLayerId === layer.id
                            ? 'bg-blue-100 dark:bg-blue-900/50'
                            : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span className="min-w-0 flex-1 truncate">{layer.text.substring(0, 25)}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLayer(layer.id);
                          }}
                          className="shrink-0 text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button onClick={addTextLayer} className="btn-primary w-full rounded-2xl py-3">
                Add Text
              </button>

              {selectedTextLayer && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/60">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">Text</label>
                      <input
                        value={selectedTextLayer.text}
                        onChange={(e) =>
                          updateTextLayer(selectedTextLayer.id, { text: e.target.value })
                        }
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">
                        Font Size ({selectedTextLayer.fontSize}px)
                      </label>
                      <input
                        type="range"
                        min={20}
                        max={160}
                        value={selectedTextLayer.fontSize}
                        onChange={(e) =>
                          updateTextLayer(selectedTextLayer.id, {
                            fontSize: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">
                        Color
                      </label>
                      <input
                        type="color"
                        value={selectedTextLayer.color}
                        onChange={(e) =>
                          updateTextLayer(selectedTextLayer.id, { color: e.target.value })
                        }
                        className="h-11 w-full rounded-xl border border-gray-300 dark:border-gray-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() =>
                          updateTextLayer(selectedTextLayer.id, {
                            bold: !selectedTextLayer.bold,
                          })
                        }
                        className={`rounded-xl py-2.5 text-sm ${
                          selectedTextLayer.bold
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800'
                        }`}
                      >
                        Bold
                      </button>

                      <button
                        onClick={() =>
                          updateTextLayer(selectedTextLayer.id, {
                            italic: !selectedTextLayer.italic,
                          })
                        }
                        className={`rounded-xl py-2.5 text-sm ${
                          selectedTextLayer.italic
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800'
                        }`}
                      >
                        Italic
                      </button>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-500 dark:text-gray-400">
                        Outline Thickness ({selectedTextLayer.outlineThickness})
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={12}
                        value={selectedTextLayer.outlineThickness}
                        onChange={(e) =>
                          updateTextLayer(selectedTextLayer.id, {
                            outlineThickness: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEO CONTENT SECTION */}
        <div className="mx-auto max-w-7xl space-y-16 py-16">
          <section className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Free YouTube Thumbnail Generator 2026 — No Sign-up, No Watermark
            </h2>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Create high-CTR YouTube thumbnails in under 60 seconds. Upload your image, layer your text, and export a
              polished graphic directly in your browser. No accounts, no watermarks, no privacy concerns — just fast,
              effective design.
            </p>
          </section>

          <section>
            <h3 className="mb-8 text-center text-2xl font-bold tracking-tight">Why Use This Tool?</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-10 w-10 items-center justify-center text-blue-600">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">Optimized 1280×720 Canvas</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Forget resizing — our canvas is locked to the exact YouTube standard.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-10 w-10 items-center justify-center text-blue-600">
                  <Wand2 className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">High-Impact Text</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Easily add bold, shadows, and custom outlines to make your hooks pop on mobile.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-10 w-10 items-center justify-center text-blue-600">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">Templates That Work</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Don&apos;t start from scratch — use our proven layouts for tutorials and reactions.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-10 w-10 items-center justify-center text-blue-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">Total Privacy</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Everything stays in your browser. We don&apos;t touch your images, and we don&apos;t store your data.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-10 w-10 items-center justify-center text-blue-600">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">100% Free</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  No hidden costs, no &quot;pro&quot; upgrades. Just get your thumbnail and get back to editing your video.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-8 text-center text-2xl font-bold tracking-tight">How to Build Your Thumbnail</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">1</div>
                <div className="mb-3 text-gray-400">
                  <Upload className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">Upload</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Drag and drop your background image or screenshot.
                </p>
              </div>

              <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">2</div>
                <div className="mb-3 text-gray-400">
                  <Wand2 className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">Style</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Add text layers and use our effects to create a visual &quot;hook.&quot;
                </p>
              </div>

              <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">3</div>
                <div className="mb-3 text-gray-400">
                  <LayoutTemplate className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">Perfect</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  Use templates or move elements freely with drag-and-drop.
                </p>
              </div>

              <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">4</div>
                <div className="mb-3 text-gray-400">
                  <Download className="h-6 w-6" />
                </div>
                <h4 className="mb-2 font-semibold">Export</h4>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
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
    </div>
  );
};

export default YouTubeThumbnailPage;
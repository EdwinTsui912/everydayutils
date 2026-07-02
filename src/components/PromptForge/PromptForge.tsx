import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wand2, Copy, Share2, RotateCcw, Save, Sparkles, Clock, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { usePromptEngine } from '../../hooks/usePromptEngine';
import { PROMPT_FRAMEWORKS } from '../../data/frameworks';
import { MODEL_AFFINITIES } from '../../data/modelAffinities';
import FormField from './FormField';

export default function PromptForge() {
  const engine = usePromptEngine();
  const [showHistory, setShowHistory] = useState(false);

  const handleCopy = async () => {
    const success = await engine.copyToClipboard();
    if (success) {
      toast.success('✅ Prompt copied to clipboard!', { duration: 2000 });
    } else {
      toast.error('Failed to copy. Please select the text manually.');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('🔗 Shareable link copied!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
      <Helmet>
        <title>PromptForge - Free AI Prompt Generator | EverydayUtils</title>
        <meta name="description" content="Build high-quality, model-optimized prompts for ChatGPT, Claude, Gemini, Grok. 100% private, client-side, no tracking." />
        <meta name="keywords" content="ai prompt generator, free prompt generator, prompt engineering tool, claude prompt, chatgpt prompt builder, promptforge" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Back Button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
          <ArrowLeft size={16} />
          Back to Tools
        </Link>
      </div>

      {/* Improved Mobile-Friendly Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Wand2 className="w-8 h-8 text-violet-600 flex-shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">PromptForge</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">100% Private • Client-Side AI Prompt Generator</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <select value={engine.frameworkId} onChange={(e) => engine.selectFramework(e.target.value)} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
            {PROMPT_FRAMEWORKS.map(fw => <option key={fw.id} value={fw.id}>{fw.name}</option>)}
          </select>

          <select value={engine.modelId} onChange={(e) => engine.selectModel(e.target.value)} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
            {MODEL_AFFINITIES.map(m => <option key={m.id} value={m.id}>{m.shortName}</option>)}
          </select>

          <button onClick={engine.resetToDefaults} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl whitespace-nowrap">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>

          <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl whitespace-nowrap">
            <Clock className="w-4 h-4" /> History ({engine.history.length})
          </button>
        </div>
      </div>

      {/* Load Example Buttons */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-3">Quick Start Examples</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => engine.loadExample('costar', 'marketing')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Sparkles className="w-4 h-4" /> Marketing Email
          </button>
          <button onClick={() => engine.loadExample('costar', 'blog')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Sparkles className="w-4 h-4" /> Blog Post Outline
          </button>
          <button onClick={() => engine.loadExample('costar', 'resume')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Sparkles className="w-4 h-4" /> Resume Bullets
          </button>
          <button onClick={() => engine.loadExample('rtf', 'coding')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Sparkles className="w-4 h-4" /> Code Refactor
          </button>
          <button onClick={() => engine.loadExample('craft', 'social')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Sparkles className="w-4 h-4" /> Social Captions
          </button>
          <button onClick={() => engine.loadExample('race', 'meeting')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            <Sparkles className="w-4 h-4" /> Meeting Summary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-5 space-y-8">
          {engine.currentFramework.fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              value={engine.fields[field.id] || ''}
              onChange={(val) => engine.updateField(field.id, val)}
            />
          ))}

          <button
            onClick={() => {
              engine.saveCurrentToHistory();
              toast.success('✅ Saved to History!');
            }}
            className="w-full flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-2xl font-medium transition-all"
          >
            <Save className="w-5 h-5" />
            Save to History
          </button>
        </div>

        {/* Right: Preview + History */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Preview */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium">Live Preview</span>
              <div className={`px-4 py-1 rounded-full text-sm font-semibold ${engine.qualityScore.total >= 80 ? 'bg-emerald-100 text-emerald-700' : engine.qualityScore.total >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                {engine.qualityScore.total} / 100
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 min-h-[380px] flex flex-col">
              <pre className="flex-1 whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-100 overflow-auto">
                {engine.finalPrompt || "👈 Click any example button above or fill the fields..."}
              </pre>

              <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <button onClick={handleCopy} disabled={!engine.finalPrompt} className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold disabled:opacity-50">
                  <Copy className="w-5 h-5" />
                  Copy Prompt
                </button>

                <button onClick={handleShare} className="px-6 border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* History Panel */}
          {showHistory && engine.history.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  History ({engine.history.length})
                </h3>
                <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600">Close</button>
              </div>

              <div className="max-h-80 overflow-auto space-y-3">
                {engine.history.map((item, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer group" 
                    onClick={() => engine.loadFromHistory(item)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium">{item.label || 'Untitled Prompt'}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {item.fields.objective || item.fields.task || item.fields.request || 'No preview'}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.savedAt) engine.deleteHistoryItem(item.savedAt);
                        }} 
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-12">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Best Free AI Prompt Generator in 2026</h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 leading-relaxed">
            PromptForge is a completely private, client-side prompt engineering tool. Build better prompts for ChatGPT, Claude, Gemini, Grok and other models — without any tracking or data leaving your device.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium mb-3">For Developers</h3>
              <p className="text-gray-600 dark:text-gray-400">Generate code explanations, refactoring prompts, debugging instructions, and more with RTF framework.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium mb-3">For Marketers</h3>
              <p className="text-gray-600 dark:text-gray-400">Create compelling emails, social captions, product descriptions, and landing page copy using CRAFT and CO-STAR.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium mb-3">For Professionals</h3>
              <p className="text-gray-600 dark:text-gray-400">Summarize meetings, improve reports, prepare presentations with structured RACE and CO-STAR frameworks.</p>
            </div>
          </div>

          <h3 className="text-2xl font-medium mb-6 text-center">How to Get the Best Results</h3>
          <ol className="list-decimal pl-5 space-y-4 text-gray-600 dark:text-gray-400">
            <li>Choose the right framework for your task</li>
            <li>Use the example buttons to start fast</li>
            <li>Be specific in every field (the more detail, the better)</li>
            <li>Try different models to see how the prompt changes</li>
            <li>Copy and paste the final prompt into your AI tool</li>
          </ol>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built for privacy. No data is collected. All processing happens in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
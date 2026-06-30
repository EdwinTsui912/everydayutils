import { useState, useMemo, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { PROMPT_FRAMEWORKS } from '../data/frameworks';
import { MODEL_AFFINITIES } from '../data/modelAffinities';
import { applyModelAffinity } from '../lib/postProcessor';
import { scorePrompt } from '../lib/qualityScorer';
import { pushStateToUrl, readStateFromUrl } from '../lib/urlState';
import { saveToHistory, getHistory, deleteFromHistory } from '../lib/history';
import type { PromptState, QualityScore } from '../types/promptforge';

export const usePromptEngine = () => {
  const [frameworkId, setFrameworkId] = useState<string>('costar');
  const [modelId, setModelId] = useState<string>('chatgpt');
  const [fields, setFields] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<PromptState[]>([]);

  const currentFramework = useMemo(() => 
    PROMPT_FRAMEWORKS.find(f => f.id === frameworkId) || PROMPT_FRAMEWORKS[0], 
    [frameworkId]
  );

  const currentModel = useMemo(() => 
    MODEL_AFFINITIES.find(m => m.id === modelId) || MODEL_AFFINITIES[0], 
    [modelId]
  );

  // Load from URL on mount
  useEffect(() => {
    const initialState = readStateFromUrl();
    if (initialState) {
      setFrameworkId(initialState.frameworkId);
      setModelId(initialState.modelId);
      setFields(initialState.fields);
    }
  }, []);

  // Reset fields ONLY if they are empty
  useEffect(() => {
    if (Object.keys(fields).length === 0) {
      const defaultFields: Record<string, string> = {};
      currentFramework.fields.forEach(field => {
        defaultFields[field.id] = field.defaultValue || '';
      });
      setFields(defaultFields);
    }
  }, [currentFramework]);

  const basePrompt = useMemo(() => currentFramework.templateString(fields), [currentFramework, fields]);

  const finalPrompt = useMemo(() => applyModelAffinity(basePrompt, frameworkId, modelId, fields), [basePrompt, frameworkId, modelId, fields]);

  const qualityScore: QualityScore = useMemo(() => scorePrompt({ frameworkId, modelId, fields }, finalPrompt), [frameworkId, modelId, fields, finalPrompt]);

  // Auto update URL hash
  useEffect(() => {
    const timeout = setTimeout(() => pushStateToUrl({ frameworkId, modelId, fields }), 600);
    return () => clearTimeout(timeout);
  }, [frameworkId, modelId, fields]);

  // Load history
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const updateField = useCallback((id: string, value: string) => setFields(prev => ({ ...prev, [id]: value })), []);

  const selectFramework = useCallback((id: string) => setFrameworkId(id), []);
  const selectModel = useCallback((id: string) => setModelId(id), []);

  const copyToClipboard = useCallback(async () => {
    if (!finalPrompt) return false;
    if (!navigator.clipboard) return false;
    try {
      await navigator.clipboard.writeText(finalPrompt);
      return true;
    } catch {
      return false;
    }
  }, [finalPrompt]);

  const saveCurrentToHistory = useCallback((label?: string) => {
    const state: PromptState = {
      frameworkId,
      modelId,
      fields: { ...fields },
      savedAt: Date.now(),
      label: label || `Prompt ${new Date().toLocaleTimeString()}`,
    };
    saveToHistory(state);
    setHistory(getHistory());
  }, [frameworkId, modelId, fields]);

  const loadFromHistory = useCallback((state: PromptState) => {
    setFrameworkId(state.frameworkId);
    setModelId(state.modelId);
    setFields(state.fields);
  }, []);

  const deleteHistoryItem = useCallback((savedAt: number) => {
    deleteFromHistory(savedAt);
    setHistory(getHistory());
    toast.success('🗑️ Deleted from history');
  }, []);

  const loadExample = useCallback((exampleFrameworkId: string, exampleKey: string) => {
    const examples: any = {
      costar: {
        marketing: {
          modelId: 'chatgpt',
          fields: {
            context: 'We are launching a new privacy-first JSON formatter tool targeted at developers.',
            objective: 'Write a compelling product launch email to drive sign-ups.',
            style: 'benefit-led, concise, persuasive',
            tone: 'enthusiastic but professional',
            audience: 'busy software developers and indie hackers',
            response: 'Subject line + 3 short paragraphs + clear CTA',
          }
        },
        blog: {
          modelId: 'chatgpt',
          fields: {
            context: 'Topic is "Why privacy matters in 2026"',
            objective: 'Write a 800-word blog post outline with introduction, 5 main points, and conclusion',
            style: 'conversational yet authoritative',
            tone: 'informative and hopeful',
            audience: 'general tech-savvy readers',
            response: 'Structured outline with headings and bullet points',
          }
        },
        resume: {
          modelId: 'chatgpt',
          fields: {
            context: 'I am a mid-level product manager with 5 years experience',
            objective: 'Improve my 3 bullet points for "Led product launches" section',
            style: 'action-oriented, achievement-focused',
            tone: 'confident',
            audience: 'tech hiring managers',
            response: '3 strong bullet points using STAR method',
          }
        }
      },
      rtf: {
        coding: {
          modelId: 'chatgpt',
          fields: {
            role: 'Act as a senior TypeScript engineer with React expertise',
            task: 'Refactor the following JavaScript function into clean, modern TypeScript with proper types and comments',
            format: 'Return only the refactored code with inline comments explaining changes',
          }
        }
      },
      craft: {
        social: {
          modelId: 'chatgpt',
          fields: {
            character: 'You are a creative social media manager for small businesses',
            request: 'Write 5 engaging Instagram captions for a new eco-friendly product launch',
            assets: 'Product: Reusable stainless steel bottle. Key benefit: Keeps drinks cold for 24 hours.',
            focus: 'Emphasize sustainability and lifestyle',
            tune: 'Friendly, aspirational, with emojis',
          }
        }
      },
      race: {
        meeting: {
          modelId: 'chatgpt',
          fields: {
            role: 'You are an experienced project manager',
            action: 'Summarize the key decisions and action items from this meeting transcript',
            context: 'Team is working on a new mobile app feature with tight deadline',
            expectations: 'Return as: 1. Key Decisions 2. Action Items with owner and deadline',
          }
        }
      }
    };

    const example = examples[exampleFrameworkId]?.[exampleKey];
    if (example) {
      setFrameworkId(exampleFrameworkId);
      setModelId(example.modelId || 'chatgpt');
      setFields(example.fields);
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setFrameworkId('costar');
    setModelId('chatgpt');
    setFields({});
  }, []);

  return {
    frameworkId,
    modelId,
    fields,
    currentFramework,
    currentModel,
    finalPrompt,
    qualityScore,
    history,
    updateField,
    selectFramework,
    selectModel,
    copyToClipboard,
    saveCurrentToHistory,
    loadFromHistory,
    deleteHistoryItem,
    loadExample,
    resetToDefaults,
  };
};
import type { QualityScore, QualityDimension, PromptState } from '../types/promptforge';
import { PROMPT_FRAMEWORKS } from '../data/frameworks';

interface ScoringRule {
  label: string;
  max: number;
  evaluate: (state: PromptState, assembledPrompt: string) => { score: number; tip?: string };
}

const SCORING_RULES: ScoringRule[] = [
  {
    label: 'Required Fields Complete',
    max: 30,
    evaluate: (state) => {
      const framework = PROMPT_FRAMEWORKS.find(f => f.id === state.frameworkId);
      if (!framework) return { score: 0, tip: 'Select a framework.' };
      const required = framework.fields.filter(f => f.required);
      const filled = required.filter(f => state.fields[f.id]?.trim().length > 10);
      const score = Math.round((filled.length / required.length) * 30);
      const tip = filled.length < required.length 
        ? `Complete all required fields for +${30 - score} points.` 
        : undefined;
      return { score, tip };
    },
  },
  {
    label: 'Specificity',
    max: 20,
    evaluate: (_, prompt) => {
      const hasNumbers = /\d+/.test(prompt);
      const hasQuotes = /["']/.test(prompt);
      const hasNamedTerms = prompt.split(' ').length > 25;
      const hits = [hasNumbers, hasQuotes, hasNamedTerms].filter(Boolean).length;
      const score = Math.round((hits / 3) * 20);
      return {
        score,
        tip: score < 15 ? 'Add specific numbers, names, or constraints.' : undefined,
      };
    },
  },
  {
    label: 'Clarity & Length',
    max: 20,
    evaluate: (_, prompt) => {
      const words = prompt.trim().split(/\s+/).length;
      if (words < 30) return { score: 8, tip: 'Prompt is too short. Add more detail.' };
      if (words <= 250) return { score: 20 };
      if (words <= 400) return { score: 15 };
      return { score: 10, tip: 'Prompt may be too long. Consider splitting it.' };
    },
  },
  {
    label: 'Format Instruction',
    max: 15,
    evaluate: (_, prompt) => {
      const hasFormat = /format|output|return|table|list|json|step/i.test(prompt);
      return {
        score: hasFormat ? 15 : 0,
        tip: hasFormat ? undefined : 'Add output format instructions.',
      };
    },
  },
  {
    label: 'Model Selected',
    max: 5,
    evaluate: (state) => ({
      score: state.modelId ? 5 : 0,
      tip: state.modelId ? undefined : 'Select a target model.',
    }),
  },
];

export const scorePrompt = (state: PromptState, assembledPrompt: string): QualityScore => {
  const breakdown: QualityDimension[] = SCORING_RULES.map(rule => {
    const { score, tip } = rule.evaluate(state, assembledPrompt);
    return { label: rule.label, score, max: rule.max, tip };
  });

  const total = breakdown.reduce((sum, d) => sum + d.score, 0);
  return { total, breakdown };
};
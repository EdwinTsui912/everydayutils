import type { ModelAffinity } from '../types/promptforge';

export const MODEL_AFFINITIES: ModelAffinity[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (GPT-4o / o3)',
    shortName: 'ChatGPT',
    description: 'Balanced and versatile',
    rules: {
      wrapper: 'markdown',
      addCoT: true,
      removeFiller: false,
      xmlSections: false,
      emphasizeFormat: false,
    },
  },
  {
    id: 'claude',
    name: 'Claude (Sonnet 4 / Opus)',
    shortName: 'Claude',
    description: 'Excellent with structured XML',
    rules: {
      wrapper: 'xml',
      addCoT: true,
      removeFiller: true,
      xmlSections: true,
      emphasizeFormat: true,
    },
  },
  {
    id: 'gemini',
    name: 'Gemini (2.0)',
    shortName: 'Gemini',
    description: 'Strong for creative tasks',
    rules: {
      wrapper: 'markdown',
      addCoT: false,
      removeFiller: false,
      xmlSections: false,
      emphasizeFormat: false,
    },
  },
  {
    id: 'grok',
    name: 'Grok (xAI)',
    shortName: 'Grok',
    description: 'Direct and concise',
    rules: {
      wrapper: 'plain',
      addCoT: true,
      removeFiller: true,
      xmlSections: false,
      emphasizeFormat: false,
    },
  },
];
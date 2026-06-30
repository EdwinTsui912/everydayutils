import { MODEL_AFFINITIES } from '../data/modelAffinities';
import { PROMPT_FRAMEWORKS } from '../data/frameworks';
import type { ModelAffinityRules } from '../types/promptforge';

const FILLER_PREFIXES = [
  /^please\s+/i,
  /^could you\s+/i,
  /^can you\s+/i,
  /^i want you to\s+/i,
  /^i need you to\s+/i,
  /^kindly\s+/i,
];

const stripFiller = (text: string): string =>
  FILLER_PREFIXES.reduce((t, re) => t.replace(re, ''), text);

const buildXmlPrompt = (frameworkId: string, data: Record<string, string>): string => {
  const framework = PROMPT_FRAMEWORKS.find(f => f.id === frameworkId);
  if (!framework) return '';

  return framework.fields
    .filter(field => data[field.id]?.trim())
    .map(field => {
      const tag = field.xmlTag ?? field.id;
      const value = data[field.id].trim();
      return `<${tag}>\n${value}\n</${tag}>`;
    })
    .join('\n\n');
};

export const applyModelAffinity = (
  basePrompt: string,
  frameworkId: string,
  modelId: string,
  data: Record<string, string>
): string => {
  const model = MODEL_AFFINITIES.find(m => m.id === modelId);
  if (!model) return basePrompt.trim();

  const rules = model.rules;
  let prompt: string;

  if (rules.wrapper === 'xml' && rules.xmlSections) {
    prompt = buildXmlPrompt(frameworkId, data);
  } else {
    prompt = basePrompt;
  }

  if (rules.removeFiller) {
    prompt = prompt
      .split('\n')
      .map(line => stripFiller(line))
      .join('\n');
  }

  if (rules.addCoT) {
    prompt = `Think step by step.\n\n${prompt}`;
  }

  if (rules.emphasizeFormat) {
    prompt = `${prompt}\n\nYou MUST follow the requested format exactly. Do not add extra commentary.`;
  }

  return prompt.trim();
};
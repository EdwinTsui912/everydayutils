export type InputType = 'text' | 'textarea' | 'select' | 'slider';
export type WrapperStyle = 'xml' | 'markdown' | 'plain';

export interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  inputType: InputType;
  defaultValue?: string;
  required: boolean;
  tooltip: string;
  options?: string[];
  maxLength?: number;
  xmlTag?: string;
}

export interface PromptFramework {
  id: string;
  name: string;
  description: string;
  bestFor: string[];
  icon: string;
  fields: TemplateField[];
  templateString: (data: Record<string, string>) => string;
}

export interface ModelAffinityRules {
  wrapper: WrapperStyle;
  addCoT: boolean;
  removeFiller: boolean;
  xmlSections: boolean;
  emphasizeFormat: boolean;
}

export interface ModelAffinity {
  id: string;
  name: string;
  shortName: string;
  description: string;
  rules: ModelAffinityRules;
}

export interface QualityDimension {
  label: string;
  score: number;
  max: number;
  tip?: string;
}

export interface QualityScore {
  total: number;
  breakdown: QualityDimension[];
}

export interface PromptState {
  frameworkId: string;
  modelId: string;
  fields: Record<string, string>;
  savedAt?: number;
  label?: string;
}
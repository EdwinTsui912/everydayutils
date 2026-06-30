import type { PromptState } from '../types/promptforge';

const HASH_PREFIX = 'pf=';

export const encodeStateToHash = (state: PromptState): string => {
  try {
    const { frameworkId, modelId, fields } = state;
    const payload = JSON.stringify({ frameworkId, modelId, fields });
    const encoded = btoa(unescape(encodeURIComponent(payload)));
    return `${HASH_PREFIX}${encoded}`;
  } catch {
    return '';
  }
};

export const decodeHashToState = (hash: string): PromptState | null => {
  try {
    const raw = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!raw.startsWith(HASH_PREFIX)) return null;

    const encoded = raw.slice(HASH_PREFIX.length);
    const payload = decodeURIComponent(escape(atob(encoded)));
    const parsed = JSON.parse(payload);

    if (typeof parsed.frameworkId !== 'string' || 
        typeof parsed.modelId !== 'string' || 
        typeof parsed.fields !== 'object') {
      return null;
    }

    return parsed as PromptState;
  } catch {
    return null;
  }
};

export const pushStateToUrl = (state: PromptState): void => {
  const hash = encodeStateToHash(state);
  if (hash) {
    history.replaceState(null, '', `#${hash}`);
  }
};

export const readStateFromUrl = (): PromptState | null => {
  return decodeHashToState(window.location.hash);
};
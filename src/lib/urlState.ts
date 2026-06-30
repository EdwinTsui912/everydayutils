import type { PromptState } from '../types/promptforge';

const HASH_PREFIX = 'pf=';

const toBase64Url = (str: string): string => 
  btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromBase64Url = (str: string): string => 
  atob(str.replace(/-/g, '+').replace(/_/g, '/'));

export const encodeStateToHash = (state: PromptState): string => {
  try {
    const encoded = toBase64Url(encodeURIComponent(JSON.stringify(state)));
    return `${HASH_PREFIX}${encoded}`;
  } catch (e) {
    console.error('Encode failed:', e);
    return '';
  }
};

export const decodeHashToState = (hash: string): PromptState | null => {
  try {
    const raw = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!raw.startsWith(HASH_PREFIX)) return null;

    const encoded = raw.slice(HASH_PREFIX.length);
    const decodedStr = decodeURIComponent(fromBase64Url(encoded));
    const parsed = JSON.parse(decodedStr);

    if (typeof parsed.frameworkId !== 'string' || typeof parsed.modelId !== 'string') {
      return null;
    }

    return parsed as PromptState;
  } catch (e) {
    console.error('Decode failed:', e);
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
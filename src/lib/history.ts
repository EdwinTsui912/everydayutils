import type { PromptState } from '../types/promptforge';

const STORAGE_KEY = 'promptforge_history';
const MAX_HISTORY = 20;

const safeGet = (): PromptState[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PromptState[]) : [];
  } catch {
    return [];
  }
};

const safeSet = (history: PromptState[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Silent fail (private mode, quota, etc.)
  }
};

export const saveToHistory = (state: PromptState): void => {
  const history = safeGet();
  const entry: PromptState = { ...state, savedAt: Date.now() };
  const updated = [entry, ...history].slice(0, MAX_HISTORY);
  safeSet(updated);
};

export const getHistory = (): PromptState[] => safeGet();

export const deleteFromHistory = (savedAt: number): void => {
  const updated = safeGet().filter(entry => entry.savedAt !== savedAt);
  safeSet(updated);
};

export const clearHistory = (): void => safeSet([]);
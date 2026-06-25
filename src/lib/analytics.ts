declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const MEASUREMENT_ID = 'G-MDTMWKNS75';

function gtag(...args: unknown[]): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

export function trackPageView(path: string, title?: string): void {
  gtag('config', MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
}

export function trackToolView(toolName: string): void {
  gtag('event', 'tool_view', { tool: toolName });
}

export function trackButtonClick(
  tool: string,
  button: 'format' | 'copy' | 'download' | 'minify' | 'collapse' | 'generate' | 'reset' | 'paste' | 'export',
): void {
  gtag('event', 'button_click', { tool, button });
}

export function trackCopySuccess(tool: string): void {
  gtag('event', 'copy_success', { tool });
}

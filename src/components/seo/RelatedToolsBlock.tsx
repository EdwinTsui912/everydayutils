// components/RelatedTools/RelatedToolsBlock.tsx
import { Link } from 'react-router-dom';
import { relatedToolsMap, type RelatedToolItem } from '../../data/relatedToolsMap';

type RelatedToolsBlockProps = {
  currentPath: string;
  title?: string;
  className?: string;
};

export default function RelatedToolsBlock({
  currentPath,
  title = 'Related tools',
  className = '',
}: RelatedToolsBlockProps) {
  const items: RelatedToolItem[] = relatedToolsMap[currentPath] || [];

  if (!items.length) return null;

  return (
    <section
      className={`border border-slate-200 dark:border-slate-800 rounded-xl bg-white/70 dark:bg-slate-900/60 shadow-sm px-4 py-4 md:px-6 md:py-5 ${className}`}
    >
      <h2 className="text-sm md:text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">
        {title}
      </h2>
      <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
        Continue with the next tool that fits your workflow.
      </p>
      <div className="grid gap-3 md:grid-cols-3 text-sm">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 px-3 py-3 hover:border-sky-400 hover:bg-sky-50/70 dark:hover:border-sky-500 dark:hover:bg-sky-950/50 transition-colors"
          >
            <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
              {item.title}
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
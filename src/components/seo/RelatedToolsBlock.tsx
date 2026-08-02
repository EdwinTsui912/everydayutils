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
      aria-labelledby="related-tools-heading"
      className={`mx-auto mt-12 max-w-7xl ${className}`}
    >
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
        <div className="mb-6">
          <h2
            id="related-tools-heading"
            className="text-2xl font-bold tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Continue with the next tool that fits your workflow.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block h-full rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-700"
              >
                <span className="block text-base font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
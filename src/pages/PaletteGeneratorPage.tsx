import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ColorPaletteGenerator from '../components/ColorPaletteGenerator';
import SEO from '../components/SEO';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';

export default function PaletteGeneratorPage() {
  return (
    <>
      <SEO
        title="Free Color Palette Generator Online — No Sign-Up | EverydayUtils"
        description="Generate beautiful color palettes instantly for your design projects. Explore harmonies, shades, and export codes — 100% free and private in your browser."
        keywords="color palette generator, color scheme generator, color picker, hex color palette, design colors online"
        url="https://www.everydayutils.com/color-palette-generator"
      />
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <ColorPaletteGenerator />

      <RelatedToolsBlock currentPath="/color-palette-generator" />
    </>
  );
}
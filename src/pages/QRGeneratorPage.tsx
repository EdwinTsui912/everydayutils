import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import SEO from '../components/SEO';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';


export default function QRGeneratorPage() {
  return (
    <>
      <SEO
        title="Free QR Code Generator Online — No Sign-Up | EverydayUtils"
        description="Generate high-quality QR codes instantly for URLs, text, WiFi, and vCard. Customize colors, size, and error correction — 100% free and private in your browser."
        keywords="qr code generator, free qr code, wifi qr code, vcard qr code, qr code maker online"
        url="https://everydayutils.com/qr-code-generator"
      />
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
            <ArrowLeft size={16} />
            Back to Tools
          </Link>
        </div>
      </div>
      <QRCodeGenerator />

      <RelatedToolsBlock currentPath="/qr-generator" />
    </>
  );
}
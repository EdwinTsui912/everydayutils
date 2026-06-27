import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { trackPageView } from './lib/analytics';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import TextToolsPage from './pages/TextToolsPage';
import PasswordGeneratorPage from './pages/PasswordGeneratorPage';
import PaletteGeneratorPage from './pages/PaletteGeneratorPage';
import PercentageCalculatorPage from './pages/PercentageCalculatorPage';
import QRGeneratorPage from './pages/QRGeneratorPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import ContactPage from './pages/ContactPage';
import BlogIndexPage from './pages/BlogIndexPage';
import WifiQRCodeBlogPost from './pages/WifiQRCodeBlogPost';
import WifiQRGuidePage from './pages/WifiQRGuidePage';
import WifiQRCodeGuidePage from './pages/WifiQRCodeGuidePage';
import StrongPasswordsBlogPost from './pages/StrongPasswordsBlogPost';
import PdfCopyPasteFixerBlogPost from './pages/PdfCopyPasteFixerBlogPost';
import WordCounterGuideBlogPost from './pages/WordCounterGuideBlogPost';
import LoremIpsumBlogPost from './pages/LoremIpsumBlogPost';
import BestFreePasswordGenerator2026BlogPost from './pages/BestFreePasswordGenerator2026BlogPost';
import LoremIpsumGeneratorPage from './pages/LoremIpsumGeneratorPage';
import JSONFormatterPage from './pages/JSONFormatterPage';
import JsonFormatterGuideBlogPost from './pages/JsonFormatterGuideBlogPost';
import PomodoroPage from './pages/PomodoroPage';
import PomodoroTimerBlogPost from './pages/PomodoroTimerBlogPost';
import ColorPaletteBlogPost from './pages/ColorPaletteBlogPost';
import PercentageCalculatorBlogPost from './pages/PercentageCalculatorBlogPost';
import Base64Page from './pages/Base64Page';
import ImageConverterPage from './pages/ImageConverterPage';
import URLEncoderPage from './pages/URLEncoderPage';
import UrlEncoderBlogPost from './pages/UrlEncoderBlogPost';
function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(o => !o)} />
        <main 
  className="flex-1 overflow-y-auto" 
  ref={(el) => {
    if (el) {
      el.scrollTop = 0;
    }
  }}
>
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <PageTracker />
        <ScrollToTop />   {/* ← Add this line */}
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/text-tools" element={<TextToolsPage />} />
            <Route path="/password-generator" element={<PasswordGeneratorPage />} />
            <Route path="/palette-generator" element={<PaletteGeneratorPage />} />
            <Route path="/percentage-calculator" element={<PercentageCalculatorPage />} />
            <Route path="/qr-generator" element={<QRGeneratorPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/how-to-create-wifi-qr-code" element={<WifiQRCodeBlogPost />} />
            <Route path="/wifi-qr-guide" element={<WifiQRGuidePage />} />
            <Route path="/wifi-qr-code-guide" element={<WifiQRCodeGuidePage />} />
            <Route path="/blog/how-to-create-strong-passwords" element={<StrongPasswordsBlogPost />} />
            <Route path="/blog/pdf-copy-paste-fixer" element={<PdfCopyPasteFixerBlogPost />} />
            <Route path="/blog/word-counter-text-sanitizer-guide" element={<WordCounterGuideBlogPost />} />
            <Route path="/blog/lorem-ipsum-generator-free-private" element={<LoremIpsumBlogPost />} />
            <Route path="/blog/best-free-password-generator-2026" element={<BestFreePasswordGenerator2026BlogPost />} />
            <Route path="/lorem-ipsum-generator" element={<LoremIpsumGeneratorPage />} />
            <Route path="/json-formatter" element={<JSONFormatterPage />} />
            <Route path="/blog/json-formatter-guide" element={<JsonFormatterGuideBlogPost />} />
            <Route path="/pomodoro" element={<PomodoroPage />} />
            <Route path="/blog/pomodoro-timer-free-online" element={<PomodoroTimerBlogPost />} />
            <Route path="/blog/color-palette-generator-tailwind" element={<ColorPaletteBlogPost />} />
            <Route path="/blog/color-palette-generator" element={<ColorPaletteBlogPost />} />
            <Route path="/blog/percentage-calculator" element={<PercentageCalculatorBlogPost />} />
            <Route path="/base64" element={<Base64Page />} />
            <Route path="/image-converter" element={<ImageConverterPage />} />
            <Route path="/url-encoder" element={<URLEncoderPage />} />
            <Route path="/blog/url-encoder" element={<UrlEncoderBlogPost />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

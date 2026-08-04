import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import WifiQRCodeBlogPostUpdated from './pages/WifiQRCodeBlogPostUpdated';
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
import ImageConverterBlogPost from './pages/ImageConverterBlogPost';
import UsernameGeneratorPage from './pages/UsernameGeneratorPage';
import YouTubeThumbnailPage from './pages/YouTubeThumbnailPage';
import BestFreeUsernameGenerator2026 from './pages/best-free-username-generator-2026';
import { Toaster } from 'react-hot-toast';
import PromptForgeBlogPost from './pages/PromptForgeBlogPost';
import YoutubeThumbnailBlogPost from './pages/YoutubeThumbnailBlogPost';
import DeveloperUtilitiesBlogPost from './pages/DeveloperUtilitiesBlogPost';
import FaviconGeneratorPage from "./pages/FaviconGeneratorPage";
import FaviconGeneratorBlogPost from './pages/FaviconGeneratorBlogPost';
import WhoIsJsonBlogPost from './pages/WhoIsJsonBlogPost';
import MilestoneBlogPost from './pages/MilestoneBlogPost';
import TimestampConverterPage from './pages/TimestampConverterPage';
import UnixTimestampConverterGuide from './pages/UnixTimestampConverterGuide';
import UUIDGeneratorPage from './pages/UUIDGeneratorPage';
import UuidGeneratorBlogPost from './pages/UuidGeneratorBlogPost';
import CssEffectsGeneratorPage from './pages/CssEffectsGeneratorPage';
import CssEffectsGeneratorBlogPost from './pages/CssEffectsGeneratorBlogPost';
import BreathingTimerPage from './pages/BreathingTimerPage';
import BreathingTimerBlogPage from './pages/BreathingTimerBlogPage';
import WriterDiffCheckerPage from './pages/WriterDiffCheckerPage';
import WriterDiffCheckerBlogPost from './pages/WriterDiffCheckerBlogPost';
import YouTubeThumbnailCheatSheet from './pages/YouTubeThumbnailCheatSheet';
import TimestampsInWildBlogPost from './pages/TimestampsInWildBlogPost';
import ColorPalettesInWildBlogPost from './pages/ColorPalettesInWildBlogPost';
import FaviconInWildBlogPost from './pages/FaviconInWildBlogPost';
import PomodoroTimerRoutineBlogPost from './pages/PomodoroTimerRoutineBlogPost';

// NEW IMPORT
import PromptForge from './components/PromptForge/PromptForge';

import { Helmet } from 'react-helmet-async';

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
  useEffect(() => {
    console.log("App level useEffect running");

    const setTitle = () => {
      document.title = "EverydayUtils - Free Privacy-First Online Tools";
    };

    setTitle();
    setTimeout(setTitle, 100);
    setTimeout(setTitle, 500);
    setTimeout(setTitle, 1000);
  }, []);

  return (
    <ThemeProvider>
      <PageTracker />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/text-tools" element={<TextToolsPage />} />
          <Route path="/password-generator" element={<PasswordGeneratorPage />} />

          {/* Canonical Color Palette route */}
          <Route path="/color-palette-generator" element={<PaletteGeneratorPage />} />
          {/* Redirect old path */}
          <Route path="/palette-generator" element={<Navigate to="/color-palette-generator" replace />} />

          <Route path="/percentage-calculator" element={<PercentageCalculatorPage />} />
          <Route path="/qr-generator" element={<QRGeneratorPage />} />
          <Route path="/favicon-generator" element={<FaviconGeneratorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />

          {/* Canonical WiFi QR post — single source of truth */}
          <Route path="/blog/wifi-qr-code-guide" element={<WifiQRCodeBlogPostUpdated />} />

          {/* Retired duplicate WiFi QR pages — all redirect to the canonical post above */}
          <Route path="/blog/how-to-create-wifi-qr-code" element={<Navigate to="/blog/wifi-qr-code-guide" replace />} />
          <Route path="/blog/free-qr-code-generator-wifi-url-text" element={<Navigate to="/blog/wifi-qr-code-guide" replace />} />
          <Route path="/wifi-qr-guide" element={<Navigate to="/blog/wifi-qr-code-guide" replace />} />

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
          <Route path="/blog/who-is-json" element={<WhoIsJsonBlogPost />} />
          <Route path="/image-converter" element={<ImageConverterPage />} />
          <Route path="/url-encoder" element={<URLEncoderPage />} />
          <Route path="/blog/url-encoder" element={<UrlEncoderBlogPost />} />
          <Route path="/blog/free-developer-utilities" element={<DeveloperUtilitiesBlogPost />} />
          <Route path="/blog/promptforge-launch" element={<PromptForgeBlogPost />} />
          <Route path="/blog/youtube-thumbnail-generator" element={<YouTubeThumbnailCheatSheet />} />
          <Route path="/youtube-thumbnail" element={<YouTubeThumbnailPage />} />
          <Route path="/blog/favicon-generator" element={<FaviconGeneratorBlogPost />} />
          <Route path="/blog/image-converter" element={<ImageConverterBlogPost />} />
          <Route path="/username-generator" element={<UsernameGeneratorPage />} />
          <Route path="/blog/best-free-username-generator-2026" element={<BestFreeUsernameGenerator2026 />} />
          <Route path="/blog/unix-timestamp-converter-guide" element={<UnixTimestampConverterGuide />} />
          <Route path="/uuid-generator" element={<UUIDGeneratorPage />} />
          <Route path="/blog/uuid-generator" element={<UuidGeneratorBlogPost />} />
          <Route path="/css-effects" element={<CssEffectsGeneratorPage />} />
          <Route path="/blog/css-effects-generator" element={<CssEffectsGeneratorBlogPost />} />
          <Route path="/breathing-timer" element={<BreathingTimerPage />} />
          <Route path="/blog/breathing-timer-focus-stress-sleep" element={<BreathingTimerBlogPage />} />
          <Route path="/writer-diff-checker" element={<WriterDiffCheckerPage />} />
          <Route path="/blog/writer-diff-checker" element={<WriterDiffCheckerBlogPost />} />
          <Route path="/blog/timestamps-in-the-wild" element={<TimestampsInWildBlogPost />} />
          <Route path="/blog/color-palettes-in-the-wild" element={<ColorPalettesInWildBlogPost />} />
          <Route path='/blog/favicons-in-the-wild' element={<FaviconInWildBlogPost />} />
          <Route path="/blog/pomodoro-timer-routine" element={<PomodoroTimerRoutineBlogPost />} />



          {/* Milestone post — 15 tools, 18 posts recap */}
          <Route path="/blog/15-tools-18-posts-milestone" element={<MilestoneBlogPost />} />

          {/* Timestamp Converter */}
          <Route path="/timestamp-converter" element={<TimestampConverterPage />} />

          {/* NEW ROUTE FOR PROMPTFORGE */}
          <Route path="/promptforge" element={<PromptForge />} />
        </Routes>
      </Layout>

      <Toaster
        position="top-center"
        richColors
        closeButton
      />
    </ThemeProvider>
  );
}
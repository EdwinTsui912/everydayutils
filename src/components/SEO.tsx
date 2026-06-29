import { Helmet } from 'react-helmet-async';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
};

export default function SEO({
  title = "EverydayUtils - Free Privacy-First Online Tools",
  description = "Free privacy-first online tools: Password Generator, Username Generator, QR Code, Text Tools, Color Palette and more.",
  keywords = "free online tools, password generator, username generator, qr code generator",
  image = "https://everydayutils.com/og-image.jpg", // you can change later
  url = "https://everydayutils.com",
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
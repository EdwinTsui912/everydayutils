import YouTubeThumbnail from '../components/YouTubeThumbnail';
import SEO from '../components/SEO';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';





export default function YouTubeThumbnailPage() {
  return (
    <>
      <SEO
        title="Free YouTube Thumbnail Generator Online — No Sign-Up | EverydayUtils"
        description="Design professional YouTube thumbnails instantly. Upload an image, add bold text and templates, then export as PNG or JPG — 100% free and private in your browser."
        keywords="youtube thumbnail generator, youtube thumbnail maker, custom youtube thumbnail, thumbnail creator online"
        url="https://www.everydayutils.com/youtube-thumbnail"
      />
      <YouTubeThumbnail />


      <RelatedToolsBlock currentPath="/youtube-thumbnail" />
    </>
  );
}
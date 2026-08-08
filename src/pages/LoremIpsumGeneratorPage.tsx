import LoremIpsumGenerator from '../components/LoremIpsumGenerator';
import SEO from '../components/SEO';
import RelatedToolsBlock from '../components/seo/RelatedToolsBlock';


export default function LoremIpsumGeneratorPage() {
  return (
    <>
      <SEO
        title="Free Lorem Ipsum Generator Online — No Sign-Up | EverydayUtils"
        description="Generate placeholder Lorem Ipsum text instantly — choose paragraphs, sentences, or words. Free, fast, and 100% private in your browser."
        keywords="lorem ipsum generator, placeholder text generator, dummy text, filler text online"
        url="https://www.everydayutils.com/lorem-ipsum-generator"
      />
      <LoremIpsumGenerator />

      <RelatedToolsBlock currentPath="/lorem-ipsum-generator" />
    </>
  );
}
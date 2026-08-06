export type RelatedToolItem = {
  to: string;
  title: string;
  description: string;
};

export const relatedToolsMap: Record<string, RelatedToolItem[]> = {
  '/password-generator': [
    {
      to: '/username-generator',
      title: 'Username Generator',
      description: 'Create matching usernames for new accounts and profiles.',
    },
    {
      to: '/uuid-generator',
      title: 'UUID Generator',
      description: 'Generate unique IDs for apps, testing, and data records.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Clean and transform text used in account or admin workflows.',
    },
    {
      to: '/base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Handle encoded strings often used in technical setups.',
    },
  ],

  '/username-generator': [
    {
      to: '/password-generator',
      title: 'Password Generator',
      description: 'Create a strong password to go with your new username.',
    },
    {
      to: '/uuid-generator',
      title: 'UUID Generator',
      description: 'Generate unique IDs for users, profiles, or test data.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Refine username ideas with text cleanup and formatting tools.',
    },
    {
      to: '/lorem-ipsum-generator',
      title: 'Lorem Ipsum Generator',
      description: 'Create sample profile or layout text for mockups and demos.',
    },
  ],

  '/qr-generator': [
    {
      to: '/favicon-generator',
      title: 'Favicon Generator',
      description: 'Turn icons and simple graphics into web-ready favicon sets.',
    },
    {
      to: '/url-encoder',
      title: 'URL Encoder',
      description: 'Encode links and query strings before turning them into QR codes.',
    },
    {
      to: '/image-converter',
      title: 'Image Converter',
      description: 'Convert exported QR images into the format you need.',
    },
    {
      to: '/youtube-thumbnail',
      title: 'YouTube Thumbnail Downloader',
      description: 'Grab YouTube thumbnail images for quick asset reuse.',
    },
    {
      to: '/color-palette-generator',
      title: 'Color Palette Generator',
      description: 'Choose colors that fit branded or styled QR codes.',
    },
  ],

  '/color-palette-generator': [
    {
      to: '/css-effects',
      title: 'CSS Effects Generator',
      description: 'Apply your palette to gradients, glassmorphism, and shadows.',
    },
    {
      to: '/favicon-generator',
      title: 'Favicon Generator',
      description: 'Turn brand colors and icons into favicon-ready assets.',
    },
    {
      to: '/qr-generator',
      title: 'QR Code Generator',
      description: 'Use your chosen colors in styled QR code designs.',
    },
    {
      to: '/image-converter',
      title: 'Image Converter',
      description: 'Prepare palette-based visuals in the right file format.',
    },
  ],

  '/favicon-generator': [
    {
      to: '/image-converter',
      title: 'Image Converter',
      description: 'Convert source files before building a favicon set.',
    },
    {
      to: '/color-palette-generator',
      title: 'Color Palette Generator',
      description: 'Pick brand colors before creating icons and app assets.',
    },
    {
      to: '/qr-generator',
      title: 'QR Code Generator',
      description: 'Create matching scannable assets for branded experiences.',
    },
    {
      to: '/css-effects',
      title: 'CSS Effects Generator',
      description: 'Extend your branding from icons into full UI styling.',
    },
  ],

  '/text-tools': [
    {
      to: '/lorem-ipsum-generator',
      title: 'Lorem Ipsum Generator',
      description: 'Create placeholder copy for layouts, forms, and mock content.',
    },
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Format and validate structured text used in technical workflows.',
    },
    {
      to: '/url-encoder',
      title: 'URL Encoder',
      description: 'Encode cleaned text for URLs and query strings.',
    },
    {
      to: '/base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Convert text into or out of Base64 for data handling.',
    },
    {
      to: '/password-generator',
      title: 'Password Generator',
      description: 'Generate strong passwords after preparing account-related text.',
    },
    {
      to: '/writer-diff-checker',
      title: 'Writer Diff Checker',
      description: 'Compare draft vs edited copy to see exactly what changed.',
    },
  ],

  '/percentage-calculator': [
    {
      to: '/timestamp-converter',
      title: 'Timestamp Converter',
      description: 'Work with time-based values in logs, reports, and analysis.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Prepare written notes, calculations, or result summaries.',
    },
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Inspect data structures that include percentages or metrics.',
    },
  ],

  '/lorem-ipsum-generator': [
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Clean, transform, or count placeholder text after generation.',
    },
    {
      to: '/username-generator',
      title: 'Username Generator',
      description: 'Create sample names alongside placeholder content for mockups.',
    },
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Prepare structured sample content for technical demos.',
    },
    {
      to: '/css-effects',
      title: 'CSS Effects Generator',
      description: 'Style layouts and components while testing placeholder content.',
    },
  ],

  '/base64': [
    {
      to: '/url-encoder',
      title: 'URL Encoder',
      description: 'Handle alternate encoding workflows for text and URLs.',
    },
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Format decoded API payloads and structured data.',
    },
    {
      to: '/uuid-generator',
      title: 'UUID Generator',
      description: 'Generate IDs for payload testing and sample data work.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Clean or inspect strings before encoding or decoding.',
    },
  ],

  '/url-encoder': [
    {
      to: '/base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Switch between common text encoding workflows.',
    },
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Format request data before encoding it for transport.',
    },
    {
      to: '/qr-generator',
      title: 'QR Code Generator',
      description: 'Encode a clean link before generating a QR code.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Prepare and sanitize strings before URL encoding.',
    },
  ],

  '/image-converter': [
    {
      to: '/favicon-generator',
      title: 'Favicon Generator',
      description: 'Turn converted images into favicon and app-icon sets.',
    },
    {
      to: '/youtube-thumbnail',
      title: 'YouTube Thumbnail Downloader',
      description: 'Grab thumbnails, then convert them into other image formats.',
    },
    {
      to: '/qr-generator',
      title: 'QR Code Generator',
      description: 'Create QR images and export them for different uses.',
    },
    {
      to: '/color-palette-generator',
      title: 'Color Palette Generator',
      description: 'Match converted images with a usable design palette.',
    },
  ],

  '/pomodoro': [
    {
      to: '/breathing-timer',
      title: 'Breathing Timer',
      description: 'Take guided breathing breaks between focus sessions.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Prepare notes, task lists, and writing during work sessions.',
    },
    {
      to: '/percentage-calculator',
      title: 'Percentage Calculator',
      description: 'Track completion rates and progress toward goals.',
    },
  ],

  '/json-formatter': [
    {
      to: '/base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Decode or encode payloads before formatting JSON.',
    },
    {
      to: '/url-encoder',
      title: 'URL Encoder',
      description: 'Escape JSON snippets for URLs and query parameters.',
    },
    {
      to: '/uuid-generator',
      title: 'UUID Generator',
      description: 'Generate sample IDs for objects, payloads, and test data.',
    },
    {
      to: '/timestamp-converter',
      title: 'Timestamp Converter',
      description: 'Inspect and convert timestamp values inside JSON data.',
    },
    {
      to: '/promptforge',
      title: 'PromptForge',
      description: 'Prepare structured prompt data and reusable AI input blocks.',
    },
  ],

  '/promptforge': [
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Format structured prompt payloads and configuration data.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Clean, count, and transform prompt text before reuse.',
    },
    {
      to: '/uuid-generator',
      title: 'UUID Generator',
      description: 'Generate unique IDs for prompt versions or saved datasets.',
    },
    {
      to: '/lorem-ipsum-generator',
      title: 'Lorem Ipsum Generator',
      description: 'Create placeholder text for prompt templates and UI testing.',
    },
  ],

  '/youtube-thumbnail': [
    {
      to: '/image-converter',
      title: 'Image Converter',
      description: 'Convert downloaded thumbnails into PNG, JPG, or WebP.',
    },
    {
      to: '/qr-generator',
      title: 'QR Code Generator',
      description: 'Turn a video link into a QR code for easy sharing.',
    },
    {
      to: '/favicon-generator',
      title: 'Favicon Generator',
      description: 'Reuse thumbnail graphics or channel assets as icons.',
    },
  ],

  '/timestamp-converter': [
    {
      to: '/uuid-generator',
      title: 'UUID Generator',
      description: 'Generate event or record IDs alongside timestamp values.',
    },
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Inspect and format JSON that contains Unix timestamps.',
    },
    {
      to: '/percentage-calculator',
      title: 'Percentage Calculator',
      description: 'Calculate rates, changes, and metrics tied to time data.',
    },
    {
      to: '/base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Decode payloads that may contain timestamp fields.',
    },
  ],

  '/uuid-generator': [
    {
      to: '/password-generator',
      title: 'Password Generator',
      description: 'Generate strong credentials alongside unique identifiers.',
    },
    {
      to: '/json-formatter',
      title: 'JSON Formatter',
      description: 'Insert UUIDs into sample JSON payloads and test objects.',
    },
    {
      to: '/timestamp-converter',
      title: 'Timestamp Converter',
      description: 'Pair UUIDs with time values in logs, events, and records.',
    },
    {
      to: '/base64',
      title: 'Base64 Encoder/Decoder',
      description: 'Use generated IDs in encoded payloads and data testing.',
    },
    {
      to: '/username-generator',
      title: 'Username Generator',
      description: 'Create user-facing names alongside backend identifiers.',
    },
  ],

  '/css-effects': [
    {
      to: '/color-palette-generator',
      title: 'Color Palette Generator',
      description: 'Choose matching colors before building CSS effects.',
    },
    {
      to: '/favicon-generator',
      title: 'Favicon Generator',
      description: 'Apply the same brand direction across icons and UI styles.',
    },
    {
      to: '/image-converter',
      title: 'Image Converter',
      description: 'Prepare supporting visuals for styled interfaces and assets.',
    },
    {
      to: '/lorem-ipsum-generator',
      title: 'Lorem Ipsum Generator',
      description: 'Preview CSS components with realistic placeholder content.',
    },
  ],

  '/breathing-timer': [
    {
      to: '/pomodoro',
      title: 'Pomodoro Timer',
      description: 'Return to focused work after a guided breathing break.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Write notes, routines, or short reflections after sessions.',
    },
    {
      to: '/writer-diff-checker',
      title: 'Writer Diff Checker',
      description: 'Compare session notes or journal entries across versions.',
    },
  ],

  // NEW: Writer Diff Checker related tools
  '/writer-diff-checker': [
    {
      to: '/text-tools',
      title: 'Text Tools',
      description: 'Clean, transform, or count text before or after diffing drafts.',
    },
    {
      to: '/breathing-timer',
      title: 'Breathing Timer',
      description: 'Take a short guided breathing break between revision rounds.',
    },
    {
      to: '/pomodoro',
      title: 'Pomodoro Timer',
      description: 'Use timed focus sessions while iterating on drafts and copy.',
    },
  ],

  '/regex-tester': [
    {
      to: '/json-formatter',
      title: 'JSON Formatter & Validator',
      description:
        'Format and inspect JSON payloads after using regex to extract or clean data.',
    },
    {
      to: '/url-encoder',
      title: 'URL Encoder / Decoder',
      description:
        'Encode regex-based filters, query parameters, and route segments safely.',
    },
    {
      to: '/timestamp-converter',
      title: 'Unix Timestamp Converter',
      description:
        'Turn raw timestamps from logs into readable dates while debugging text-based issues.',
    },
    {
      to: '/text-tools',
      title: 'Text Tools Suite',
      description:
        'Clean, normalize, and inspect text before running more complex regex patterns.',
    },
  ],
};
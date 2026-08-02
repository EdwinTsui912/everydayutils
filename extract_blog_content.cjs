const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, 'src');
const pagesDir = path.join(srcDir, 'pages');
const outDir = path.join(projectRoot, 'output');
const reportPath = path.join(outDir, 'blog-content-and-internal-links.md');

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (entry.isFile()) results.push(full);
  }
  return results;
}

function decodeJsString(str) {
  return str
    .replace(/\\n/g, ' ')
    .replace(/\\r/g, ' ')
    .replace(/\\t/g, ' ')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function inferRoute(code, fileName) {
  const routeMatch = code.match(new RegExp(`<Route\\s+path=\\"([^\\"]+)\\"\\s+element=\\{<${fileName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*/?>\\}`));
  return routeMatch ? routeMatch[1] : '';
}

function extractLinks(code) {
  const links = new Set();
  const regex = /<Link[^>]*to=\"([^\"]+)\"/g;
  let m;
  while ((m = regex.exec(code))) {
    if (m[1].startsWith('/')) links.add(m[1]);
  }
  return [...links];
}

function extractHeadings(code) {
  const headings = [];
  const regex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g;
  let m;
  while ((m = regex.exec(code))) {
    const text = stripTags(m[2]);
    if (text) headings.push({ level: Number(m[1]), text });
  }
  return headings;
}

function extractParagraphs(code) {
  const paras = [];
  const regex = /<p[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = regex.exec(code))) {
    const text = stripTags(m[1]);
    if (text && text.length > 30) paras.push(text);
  }
  return paras;
}

function extractListItems(code) {
  const items = [];
  const regex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = regex.exec(code))) {
    const text = stripTags(m[1]);
    if (text && text.length > 5) items.push(text);
  }
  return items;
}

function findBlogPages() {
  if (!fs.existsSync(pagesDir)) return [];
  return walk(pagesDir).filter(f => /BlogPost|Guide|blog/i.test(path.basename(f)) && /\.(tsx|jsx)$/.test(f));
}

const appPath = path.join(srcDir, 'App.tsx');
const appCode = fs.existsSync(appPath) ? fs.readFileSync(appPath, 'utf8') : '';
const blogFiles = findBlogPages();

const reports = blogFiles.map(file => {
  const code = fs.readFileSync(file, 'utf8');
  const fileName = path.basename(file, path.extname(file));
  const route = inferRoute(appCode, fileName);
  const headings = extractHeadings(code);
  const paragraphs = extractParagraphs(code);
  const listItems = extractListItems(code);
  const links = extractLinks(code);
  return { fileName, route, headings, paragraphs, listItems, links, file };
}).sort((a,b) => (a.route || a.fileName).localeCompare(b.route || b.fileName));

let md = `# Blog Content and Internal Links Audit\n\n`;
md += `Generated from the local React/Vite codebase. This document lists detected blog page components, extracted visible content fragments, and internal links found in each file.\n\n`;
md += `## Summary\n\n`;
md += `- Blog files found: ${reports.length}\n`;
md += `- Source directory: \`src/pages\`\n`;
md += `- App routes file scanned: \`src/App.tsx\`\n\n`;

for (const page of reports) {
  md += `## ${page.route || page.fileName}\n\n`;
  md += `- Component: \`${page.fileName}\`\n`;
  md += `- Source file: \`${path.relative(projectRoot, page.file)}\`\n`;
  md += `- Internal links found: ${page.links.length}\n\n`;

  if (page.headings.length) {
    md += `### Headings\n\n`;
    for (const h of page.headings) md += `- H${h.level}: ${h.text}\n`;
    md += `\n`;
  }

  if (page.paragraphs.length) {
    md += `### Paragraphs\n\n`;
    for (const p of page.paragraphs.slice(0, 20)) md += `- ${p}\n`;
    md += `\n`;
  }

  if (page.listItems.length) {
    md += `### List Items\n\n`;
    for (const li of page.listItems.slice(0, 30)) md += `- ${li}\n`;
    md += `\n`;
  }

  md += `### Internal Links\n\n`;
  if (page.links.length) {
    for (const link of page.links) md += `- ${link}\n`;
  } else {
    md += `- None detected in JSX \`<Link to=...>\` syntax.\n`;
  }
  md += `\n`;
}

fs.writeFileSync(reportPath, md, 'utf8');
console.log(`Wrote ${reportPath}`);

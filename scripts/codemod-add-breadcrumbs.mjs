import fs from 'node:fs/promises';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const TOOLS_CONFIG = path.join(PROJECT_ROOT, 'config', 'tools.ts');

function isRouteGroup(segment) {
  return segment.startsWith('(') && segment.endsWith(')');
}

function getHrefFromPageFile(filePath) {
  const rel = path.relative(APP_DIR, filePath);
  const parts = rel.split(path.sep).filter((p) => !isRouteGroup(p));
  // parts: ["(pdf)" removed, "<slug>", "page.tsx"]
  if (parts.length < 2) return null;
  const slug = parts[parts.length - 2];
  return `/${slug}`;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walk(p)));
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      results.push(p);
    }
  }
  return results;
}

function parseToolsMap(source) {
  /** @type {Map<string, {title: string, description: string, category: string}>} */
  const map = new Map();
  const re =
    /\{\s*title:\s*'([^']+)'\s*,\s*href:\s*'([^']+)'\s*,[\s\S]*?description:\s*'([^']+)'\s*,[\s\S]*?category:\s*'([^']+)'/g;
  let match;
  while ((match = re.exec(source))) {
    const [, title, href, description, category] = match;
    map.set(href, { title, description, category });
  }
  return map;
}

function ensureBreadcrumbsImport(source) {
  if (source.includes("from '@/components/layout/Breadcrumbs'")) return source;

  const lines = source.split('\n');
  const lastImportIdx = [...lines]
    .map((l, idx) => ({ l, idx }))
    .filter(({ l }) => l.startsWith('import '))
    .slice(-1)[0]?.idx;

  const importLine = "import Breadcrumbs from '@/components/layout/Breadcrumbs';";
  if (typeof lastImportIdx === 'number') {
    lines.splice(lastImportIdx + 1, 0, importLine);
    return lines.join('\n');
  }
  return `${importLine}\n\n${source}`;
}

function injectForPdfPage(source, tool) {
  if (source.includes('<Breadcrumbs')) return null;
  if (!source.includes('lg:col-span-3')) return null;

  const next = ensureBreadcrumbsImport(source);

  const needle = '          <div className="lg:col-span-3">';
  const idx = next.indexOf(needle);
  if (idx === -1) return null;

  const insertion = `\n            <Breadcrumbs category="PDF Tools" toolName="${tool.title}" currentHref="${tool.href}" />\n            <div className="mb-6">\n              <h1 className="text-4xl font-bold text-foreground mb-2">${tool.title}</h1>\n              <p className="text-muted-foreground">${tool.description}</p>\n            </div>\n`;

  return `${next.slice(0, idx + needle.length)}${insertion}${next.slice(idx + needle.length)}`;
}

function injectForJsonPage(source, tool) {
  if (source.includes('<Breadcrumbs')) return null;

  const next = ensureBreadcrumbsImport(source);
  const needles = [
    '      <div className="max-w-7xl mx-auto px-4 py-8">',
    '      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">',
    '      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">',
  ];
  const needle = needles.find((n) => next.includes(n));
  if (!needle) return null;

  const idx = next.indexOf(needle);
  const insertion = `\n        <Breadcrumbs category="JSON Tools" toolName="${tool.title}" currentHref="${tool.href}" />\n`;
  return `${next.slice(0, idx + needle.length)}${insertion}${next.slice(idx + needle.length)}`;
}

async function main() {
  const toolsSource = await fs.readFile(TOOLS_CONFIG, 'utf8');
  const toolsMap = parseToolsMap(toolsSource);

  const pdfPages = await walk(path.join(APP_DIR, '(pdf)'));
  const jsonPages = await walk(path.join(APP_DIR, '(json)'));

  let changed = 0;

  for (const file of [...pdfPages, ...jsonPages]) {
    const href = getHrefFromPageFile(file);
    if (!href) continue;
    if (href === '/pdf-tools' || href === '/json-tools') continue;

    const tool = toolsMap.get(href);
    if (!tool) continue;

    const source = await fs.readFile(file, 'utf8');
    const augmentedTool = { ...tool, href };

    const next = file.includes(`${path.sep}(pdf)${path.sep}`)
      ? injectForPdfPage(source, augmentedTool)
      : injectForJsonPage(source, augmentedTool);

    if (!next || next === source) continue;
    await fs.writeFile(file, next, 'utf8');
    changed += 1;
  }

  // eslint-disable-next-line no-console
  console.log(`Updated ${changed} tool pages with Breadcrumbs + headings where applicable`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});



import fs from 'node:fs/promises';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const SITE_URL = 'https://rawtools.io';

function isRouteGroup(segment) {
  return segment.startsWith('(') && segment.endsWith(')');
}

function toRoutePath(filePath) {
  const rel = path.relative(APP_DIR, filePath);
  const parts = rel.split(path.sep);
  const filtered = parts.filter((p) => !isRouteGroup(p));
  // remove trailing "page.tsx"
  filtered.pop();
  return filtered.join('/');
}

function canonicalForRoute(routePath) {
  if (!routePath) return SITE_URL;
  return `${SITE_URL}/${routePath}`.replace(/\/+$/, '');
}

function ensureImport(source) {
  if (source.includes("from '@/lib/seo/metadata'")) return source;

  const lines = source.split('\n');
  const lastImportIdx = [...lines]
    .map((l, idx) => ({ l, idx }))
    .filter(({ l }) => l.startsWith('import '))
    .slice(-1)[0]?.idx;

  const importLine = "import { withCanonicalMetadata } from '@/lib/seo/metadata';";

  if (typeof lastImportIdx === 'number') {
    lines.splice(lastImportIdx + 1, 0, importLine);
    return lines.join('\n');
  }

  return `${importLine}\n\n${source}`;
}

function transformFile(source, canonical) {
  if (source.includes('generateMetadata')) return null;
  if (!source.includes('export const metadata')) return null;

  let next = source.replace(/export const metadata\b/g, 'const pageMetadata');
  next = ensureImport(next);

  if (!next.includes('const pageMetadata')) return null;

  if (next.includes('withCanonicalMetadata(pageMetadata')) return null;

  const insertion = `\n\nexport async function generateMetadata(): Promise<Metadata> {\n  return withCanonicalMetadata(pageMetadata, '${canonical}');\n}\n`;

  const idx = next.indexOf('const pageMetadata');
  const endIdx = next.indexOf('};', idx);
  if (endIdx === -1) return null;

  const afterEndIdx = endIdx + 2;
  next = `${next.slice(0, afterEndIdx)}${insertion}${next.slice(afterEndIdx)}`;
  return next;
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

async function main() {
  const files = await walk(APP_DIR);
  let changed = 0;

  for (const file of files) {
    const source = await fs.readFile(file, 'utf8');
    const routePath = toRoutePath(file);
    const canonical = canonicalForRoute(routePath);
    const transformed = transformFile(source, canonical);
    if (!transformed || transformed === source) continue;
    await fs.writeFile(file, transformed, 'utf8');
    changed += 1;
  }

  // eslint-disable-next-line no-console
  console.log(`Updated ${changed} page.tsx files`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});



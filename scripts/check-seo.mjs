import fs from 'node:fs';

const meta = fs.readFileSync('src/components/SiteMeta.astro', 'utf8');
const home = fs.readFileSync('src/pages/index.astro', 'utf8');
const requiredMetaTokens = [
  'property="og:image"',
  'name="twitter:image"',
  'summary_large_image',
  'BreadcrumbList',
  'max-image-preview:large',
];
for (const token of requiredMetaTokens) {
  if (!meta.includes(token)) throw new Error(`Missing BIR SEO token: ${token}`);
}
for (const stale of ['Registry primitives before registry data', 'before canonical JSON records are added']) {
  if (home.includes(stale)) throw new Error(`Stale BIR foundation copy remains: ${stale}`);
}
if (!fs.existsSync('public/og/bir-og.svg')) throw new Error('BIR social image is missing.');
console.log('BIR SEO audit: pass');

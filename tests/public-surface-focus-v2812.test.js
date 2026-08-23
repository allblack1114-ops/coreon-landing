'use strict';
const assert=require('assert');
const fs=require('fs');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const excluded=[
  '/vision-edge.html',
  '/use-cases/public/vision-edge.html',
  '/trust/vision-edge.html',
  '/defense-industrial-safety-solution.html',
  '/industrial-safety-risk-management.html',
  '/patent-based-safety-structure.html'
];
for(const p of excluded) assert(!sitemap.includes(`https://www.coreon-global.com${p}`),`non-core page must not occupy sitemap: ${p}`);
for(const p of ['vision-edge.html','use-cases/public/vision-edge.html','trust/vision-edge.html']) {
  const html=fs.readFileSync(p,'utf8');
  assert(html.includes('name="robots" content="noindex,follow"'),`Vision Edge pilot must be noindex: ${p}`);
  assert(/LIMITED PILOT|파일럿|PILOT|Trust Boundary|TRUST BOUNDARY|VISION ASSURANCE/i.test(html),`pilot boundary missing: ${p}`);
}
for(const p of ['https://www.coreon-global.com/','/pricing.html','/download.html','/public-proof-procurement.html','/institutional-safety-ai.html']) {
  const expected=p.startsWith('http')?p:`https://www.coreon-global.com${p}`;
  assert(sitemap.includes(expected),`core commercial page missing from sitemap: ${expected}`);
}
console.log('PASS public surface focus: core Safety AX pages indexed, pilot/adjacent pages deprioritized');

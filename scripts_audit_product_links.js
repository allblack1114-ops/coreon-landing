'use strict';
const fs=require('node:fs');
const path=require('node:path');
const ROOT=__dirname;
const policy=JSON.parse(fs.readFileSync(path.join(ROOT,'product-link-policy.json'),'utf8'));
const read=rel=>fs.readFileSync(path.join(ROOT,rel),'utf8');
const findings=[];

const homeFiles=['index.html','en/index.html'];
const hiddenHomePaths=[...policy.forbiddenDirectProductPaths,'/pricing.html','/en/pricing.html','/safety-ax-runtime.html','/en/safety-ax-runtime.html'];
const forbiddenHomePriceCopy=['149,000','490,000','18,000,000','From KRW 18','KRW 149','KRW 490','연 18,000,000','월 149,000','월 490,000'];

for(const rel of homeFiles){
  const src=read(rel);
  for(const forbidden of hiddenHomePaths){
    if(src.includes(forbidden)) findings.push({file:rel,kind:'hidden-route',value:forbidden});
  }
  for(const value of forbiddenHomePriceCopy){
    if(src.includes(value)) findings.push({file:rel,kind:'public-price',value});
  }
}

for(const rel of ['pricing.html','en/pricing.html']){
  const src=read(rel);
  if(!/name=["']robots["'][^>]+noindex/i.test(src)) findings.push({file:rel,kind:'pricing-indexability',value:'missing noindex'});
  for(const value of forbiddenHomePriceCopy){
    if(src.includes(value)) findings.push({file:rel,kind:'fixed-price-remains',value});
  }
}

const sitemap=read('sitemap.xml');
for(const hidden of ['/pricing.html','/en/pricing.html','/institutional-safety-ai.html','/en/institutional-safety-ai.html','/enterprise-multisite.html','/en/enterprise-multisite.html','/safety-ax-runtime.html','/en/safety-ax-runtime.html']){
  if(sitemap.includes(hidden)) findings.push({file:'sitemap.xml',kind:'hidden-sitemap-route',value:hidden});
}

for(const rel of ['assets/home-mobius-safety-loop.js','assets/public-positioning.js']){
  if(!fs.existsSync(path.join(ROOT,rel))) findings.push({file:rel,kind:'missing-required-surface-asset',value:rel});
}

if(findings.length){
  console.error('FAIL public homepage surface policy');
  for(const item of findings) console.error(`- ${item.file} [${item.kind}]: ${item.value}`);
  process.exit(1);
}
console.log('PASS public homepage surface: no fixed pricing, hidden product routes removed, pricing pages noindex, sitemap converged');
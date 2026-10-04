'use strict';
// 2026-10-04 대표 결정: 기본 출시 가격만 공개, Enterprise·공공·PoC·진단은 별도 견적
const assert=require('node:assert/strict');
const fs=require('node:fs');
const read=p=>fs.readFileSync(p,'utf8');
const ko=read('pricing.html');
const en=read('en/pricing.html');
const sitemap=read('sitemap.xml');
const axis=JSON.parse(read('release-axis.json'));
assert.match(axis.releaseAxis,/^v\d+\.\d+(?:\.\d+)?$/);
assert.equal(axis.operationsRelease,axis.releaseAxis);
assert.equal(axis.packageVersion,'28.33.0');
const allowed={ko:['0원','월 149,000원','월 390,000원','월 79,000원','1,490,000원'],en:['KRW 0','KRW 149,000','KRW 390,000','KRW 79,000','KRW 1,490,000']};
for(const [name,html,canon,lang] of [['Korean',ko,'https://www.coreon-global.com/pricing.html','ko'],['English',en,'https://www.coreon-global.com/en/pricing.html','en']]){
  assert(!html.includes('noindex'),`${name} launch price page must be indexable`);
  assert(html.includes(`<link rel="canonical" href="${canon}">`),`${name} canonical`);
  for(const p of allowed[lang]) assert(html.includes(p),`${name} launch price missing: ${p}`);
  const prices=(html.replace(/<style[\s\S]*?<\/style>/,'').match(/(?:KRW\s*[0-9][0-9,]*|[0-9][0-9,]*원)/g)||[]);
  for(const p of prices) assert(allowed[lang].some(a=>a.endsWith(p)||a===p||p.endsWith(a.replace(/^월 /,''))),`${name} unexpected public price: ${p}`);
  assert(/별도 견적|Custom quote/.test(html),`${name} enterprise must be quote-only`);
  assert(!/(?:18,000,000|24,000,000|15,000,000|11,000,000|USD|달러)/.test(html),`${name} must not expose enterprise, PoC or public pilot prices`);
  assert(/VAT 별도|VAT excluded/.test(html),`${name} VAT notice`);
  assert(/면제를 보장하지 않|does not guarantee exemption/.test(html),`${name} liability boundary`);
}
assert(sitemap.includes('https://www.coreon-global.com/pricing.html')&&sitemap.includes('https://www.coreon-global.com/en/pricing.html'),'launch pricing pages must be in the sitemap');
console.log(`PASS ${axis.releaseAxis} commercial authority: launch prices only, enterprise quote-only`);

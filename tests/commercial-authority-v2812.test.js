'use strict';
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
for(const [name,html,canonical] of [
  ['Korean',ko,'https://www.coreon-global.com/'],
  ['English',en,'https://www.coreon-global.com/en/']
]){
  assert(html.includes('name="robots" content="noindex,follow"'),`${name} retired price page must remain out of search results`);
  assert(html.includes(`<link rel="canonical" href="${canonical}">`),`${name} retired price page must canonicalize to the language homepage`);
  assert(!/(?:KRW|USD|EUR|원|달러)\s*[0-9]|[0-9][0-9,]*(?:원|\/mo|\/yr)/i.test(html),`${name} retired price page must not expose numeric pricing`);
}
assert(!sitemap.includes('/pricing.html'),'retired pricing pages must not return to the sitemap');
console.log(`PASS ${axis.releaseAxis} commercial authority: public numeric pricing retired and pricing pages excluded from search`);

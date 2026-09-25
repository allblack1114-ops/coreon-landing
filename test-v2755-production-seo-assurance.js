'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const ko=fs.readFileSync('index.html','utf8'),en=fs.readFileSync('en/index.html','utf8'),map=fs.readFileSync('sitemap.xml','utf8'),robots=fs.readFileSync('robots.txt','utf8');
for(const s of [ko,en]){assert.ok(s.includes('application/ld+json'));assert.ok(s.includes('COREON Safety AX Agent'));assert.ok(s.includes('#software'));assert.ok(s.includes('hreflang="ko"'));assert.ok(s.includes('hreflang="en"'));}
assert.ok(!/KRW\s*[0-9]|297,000|490,000|990,000|250,000|18M|10M/.test(en));
for(const p of ['en/use-cases/index.html','en/use-cases/public/index.html','en/use-cases/construction/index.html','en/use-cases/manufacturing/index.html','en/use-cases/consulting/index.html']) assert.ok(fs.existsSync(p),p);
for(const u of ['/use-cases/public/','/use-cases/construction/','/use-cases/manufacturing/','/use-cases/consulting/','/en/use-cases/public/','/en/use-cases/construction/','/en/use-cases/manufacturing/','/en/use-cases/consulting/']) assert.ok(map.includes(u),u);
assert.ok(!map.includes('/pricing.html'));
assert.ok(robots.includes('Allow: /'));
assert.ok(robots.includes('Sitemap: https://www.coreon-global.com/sitemap.xml'));
console.log('PASS bilingual SEO, sitemap, robots and commercial parity');

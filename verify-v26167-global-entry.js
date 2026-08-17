'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const english = fs.readFileSync(path.join(root, 'en', 'index.html'), 'utf8');
const korean = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');

for (const [name, html, lang, canonical, download] of [
  ['EN', english, 'en', 'https://www.coreon-global.com/en/', '/en/download.html?source=coreon-en-download'],
  ['KO', korean, 'ko', 'https://www.coreon-global.com/', '/download.html?source=coreon-home-download']
]) {
  assert(html.includes(`<html lang="${lang}">`), `${name} language`);
  assert(html.includes(`rel="canonical" href="${canonical}"`), `${name} canonical`);
  assert(html.includes('COREON Safety AX Agent'), `${name} product identity`);
  assert(html.includes(download), `${name} download-first route`);
  assert(!html.includes('safety-room/start?source='), `${name} homepage must not start safety work directly`);
}
assert(english.includes('Choose the operating scope that fits your organization'));
for (const plan of ['Safety Start Free', 'Safety Core', 'Safety Operations', 'Enterprise / Public']) assert(english.includes(plan), `missing scope: ${plan}`);
assert(english.includes('Human-in-the-loop'));
assert(english.includes('does not provide legal advice'));
assert(english.includes('Pricing policy:'));
assert(!/KRW\s*[0-9]|297,000|490,000|990,000|149,000|18M|10M/.test(english), 'public English homepage must not expose numeric paid pricing');
assert(korean.includes('발주처·공공기관'));
assert(korean.includes('조치 전후 증빙'));
assert(korean.includes('잔여위험 재평가'));
assert(!korean.includes('무료 안전방 시작'));
assert(!korean.includes('3분 무료 안전진단'));
assert(english.includes('hreflang="ko"'));
assert(english.includes('hreflang="en"'));
assert(korean.includes('hreflang="en"'));
assert(sitemap.includes('<loc>https://www.coreon-global.com/en/</loc>'));
console.log('product-led bilingual homepage verification: PASS');

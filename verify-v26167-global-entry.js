'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const english = fs.readFileSync(path.join(root, 'en', 'index.html'), 'utf8');
const korean = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const [name, html, lang, canonical, download] of [
  ['EN', english, 'en', 'https://www.coreon-global.com/en/', '/en/download.html?source=homepage-free-start'],
  ['KO', korean, 'ko', 'https://www.coreon-global.com/', '/download.html?source=homepage-free-start']
]) {
  assert(html.includes(`<html lang="${lang}">`), `${name} language`);
  assert(html.includes(`rel="canonical" href="${canonical}"`), `${name} canonical`);
  assert(html.includes('COREON Safety AX Agent'), `${name} product identity`);
  assert(html.includes(download), `${name} download-first route`);
  assert(!html.includes('safety-room/start?source='), `${name} homepage must not start safety work directly`);
}
for (const token of ['Human Review','Fail-Closed','Patent Pending','OPC UA','Modbus/TCP','MQTT','REST/Webhook']) assert(english.includes(token), token);
assert(english.includes('AI does not replace final safety judgment'));
assert(!/KRW\s*[0-9]|297,000|490,000|990,000|149,000|18M|10M/.test(english), 'public English homepage must not expose numeric paid pricing');
for (const token of ['조치 전후 증빙','잔여위험 재평가','경영자 보고·감사원장']) assert(korean.includes(token), token);
assert(english.includes('hreflang="ko"'));
assert(english.includes('hreflang="en"'));
assert(korean.includes('hreflang="en"'));
assert(sitemap.includes('<loc>https://www.coreon-global.com/en/</loc>'));
console.log('product-led bilingual homepage verification: PASS');

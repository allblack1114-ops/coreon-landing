'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const english = fs.readFileSync(path.join(root, 'en', 'index.html'), 'utf8');
const korean = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');

assert(english.includes('<html lang="en">'));
assert(english.includes('rel="canonical" href="https://www.coreon-global.com/en/"'));
assert(english.includes('hreflang="ko"'));
assert(english.includes('hreflang="en"'));
assert(english.includes('Choose the operating scope that fits your organization'));
for (const plan of ['Safety Start Free', 'Safety Core / Operations / Business', 'Enterprise / Public / Vision Edge']) {
  assert(english.includes(plan), `missing scope: ${plan}`);
}
assert(english.includes('Human-in-the-loop'));
assert(english.includes('does not provide legal advice'));
assert(english.includes('Pricing policy:'));
assert(!/KRW\s*[0-9]|297,000|490,000|990,000|250,000|18M|10M/.test(english), 'public English homepage must not expose numeric paid pricing');
assert(english.includes('Free 3-Minute Assessment'));
assert(english.includes('Start Safety Start Free'));
assert(english.includes('30-Second Demo'));
assert(english.includes('safety-room/start?source=coreon-en-hero&lang=en'));
assert(english.includes('/en/use-cases/'));
assert(korean.includes('3분 무료 안전진단'));
assert(korean.includes('Safety Start Free 시작'));
assert(korean.includes('safety-room/start?source=coreon-home-hero'));
assert(korean.includes('우리 조직에서는 COREON을 어떻게 사용할까요?'));
assert(korean.includes('hreflang="en"'));
assert(sitemap.includes('<loc>https://www.coreon-global.com/en/</loc>'));
assert(sitemap.includes('<loc>https://www.coreon-global.com/en/use-cases/</loc>'));

console.log('bilingual Safety Start Free and public commercial parity verification: PASS');

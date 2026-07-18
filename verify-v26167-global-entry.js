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
assert(english.includes('Six clearly separated service experiences'));
for (const plan of ['Safety Start Free', 'Safety Core', 'Safety Operations', 'Safety Business', 'Enterprise/Public', 'Vision Edge']) {
  assert(english.includes(plan), `missing plan: ${plan}`);
}
assert(english.includes('Human-in-the-loop'));
assert(english.includes('does not provide legal advice'));
assert(english.includes('COREON owner-administration'));
for (const price of ['KRW 297,000/month', 'KRW 490,000/month', 'KRW 990,000/month', 'From KRW 18M/year']) {
  assert(english.includes(price), `missing price: ${price}`);
}
assert(!english.includes('KRW 149,000/month'));
assert(english.includes('Free 3-Minute Assessment'));
assert(english.includes('Start Safety Start Free'));
assert(english.includes('safety-room/start?source=coreon-en-hero&lang=en'));
assert(korean.includes('3분 무료 안전진단'));
assert(korean.includes('Safety Start Free 시작'));
assert(korean.includes('safety-room/start?source=coreon-home-hero'));
assert(korean.includes('hreflang="en"'));
assert(sitemap.includes('<loc>https://www.coreon-global.com/en/</loc>'));

console.log('v26.168.2 bilingual Safety Start Free global entry verification: PASS');

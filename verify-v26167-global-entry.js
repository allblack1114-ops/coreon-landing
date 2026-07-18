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
assert(english.includes('Five clearly separated service experiences'));
for (const plan of ['Free Trial', 'Safety Core', 'Safety Operations', 'Enterprise/Public', 'Vision Edge']) {
  assert(english.includes(plan), `missing plan: ${plan}`);
}
assert(english.includes('Human-in-the-loop'));
assert(english.includes('does not provide legal advice'));
assert(english.includes('COREON owner-administration'));
assert(korean.includes('hreflang="en"'));
assert(sitemap.includes('<loc>https://www.coreon-global.com/en/</loc>'));

console.log('v26.167 English global entry verification: PASS');

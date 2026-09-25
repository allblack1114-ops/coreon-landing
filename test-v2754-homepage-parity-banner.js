'use strict';
const assert=require('node:assert/strict');
const fs=require('fs');
const ko=fs.readFileSync('index.html','utf8');
const en=fs.readFileSync('en/index.html','utf8');
for(const [name,html,tokens] of [
  ['ko',ko,['FROM ANY SIGNAL TO ONE GOVERNED EVENT','ROLE-BASED SAFETY OPERATIONS','INDUSTRY APPLICATIONS','SAFETY IP · APPLICATION PENDING']],
  ['en',en,['FROM ANY SIGNAL TO ONE GOVERNED EVENT','ROLE-BASED SAFETY OPERATIONS','INDUSTRY APPLICATIONS','SAFETY IP · APPLICATION PENDING']]
]) for(const token of tokens) assert.ok(html.includes(token),`${name}: ${token}`);
assert.ok(ko.includes('/download.html?source=homepage-free-start'));
assert.ok(en.includes('/en/download.html?source=homepage-free-start'));
for(const html of [ko,en]) assert.ok(!/KRW\s*[0-9]|297,000|490,000|990,000|250,000|18M|10M/.test(html),'public homepage must not expose numeric paid pricing');
console.log('PASS Korean/English homepage structure and commercial parity');

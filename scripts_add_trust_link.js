'use strict';

const fs = require('node:fs');
const path = require('node:path');

const target = path.join(__dirname, 'index.html');
let html = fs.readFileSync(target, 'utf8');
const trustLink = '          <a href="/trust/">신뢰·검증</a>\n';
const anchor = '          <a href="#pilot">파일럿</a>\n';

if (!html.includes('href="/trust/"')) {
  const count = html.split(anchor).length - 1;
  if (count !== 1) throw new Error(`homepage pilot anchor count must be 1, found ${count}`);
  html = html.replace(anchor, anchor + trustLink);
}

if (!html.includes('href="/trust/"')) throw new Error('trust link was not mounted');
if (!html.includes('href="#contact"')) throw new Error('existing contact CTA must remain');
if (!html.includes('href="#pilot"')) throw new Error('existing pilot navigation must remain');

fs.writeFileSync(target, html);
console.log('PASS homepage trust link mounted without replacing existing structure');

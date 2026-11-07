'use strict';
const assert=require('node:assert/strict');
const fs=require('fs');
const ko=fs.readFileSync('index.html','utf8');
const en=fs.readFileSync('en/index.html','utf8');
for(const [name,html,tokens] of [
  ['ko',ko,['FROM ANY SIGNAL TO ONE GOVERNED EVENT','ROLE-BASED SAFETY OPERATIONS','INDUSTRY APPLICATIONS','SAFETY IP · APPLICATION PENDING']],
  ['en',en,['FROM ANY SIGNAL TO ONE GOVERNED EVENT','ROLE-BASED SAFETY OPERATIONS','INDUSTRY APPLICATIONS','SAFETY IP · APPLICATION PENDING']]
]) for(const token of tokens) assert.ok(html.includes(token),`${name}: ${token}`);
assert.ok(/href="\/download\.html\?source=homepage-[a-z-]+"/.test(ko),'ko download-first free start CTA');
assert.ok(en.includes('/en/download.html?source=homepage-free-start'));
// R-2b(2026-11-07): 공개 요금(예: Safety Operations 월 490,000원, VAT 별도)은 현재 게시 정책이므로 '숫자 요금 금지' 검사는 폐기.
// 대신 숫자 요금을 보이면 같은 문장 안(앞 120자·뒤 60자)에 부가세 표기를 두는지만 확인한다.
for(const html of [ko]) for(const m of html.matchAll(/[0-9]{2,3},000원/g)) assert.ok(/VAT|부가세/.test(html.slice(Math.max(0,m.index-120), m.index+60)),'price without VAT note: '+html.slice(m.index-30,m.index+40));
console.log('PASS Korean/English homepage structure and commercial parity');

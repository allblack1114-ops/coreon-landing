'use strict';
const fs = require('fs');
const assert = require('assert');
const home = fs.readFileSync('index.html','utf8');
const trust = fs.readFileSync('trust/index.html','utf8');
for (const token of [
  '위험·아차사고 제보·위험성평가·TBM과 설비 신호',
  '동일 사건 ID',
  '조치 전후 증빙',
  '잔여위험 재확인',
  '경영자 보고·감사원장'
]) assert(home.includes(token), token);
// R-2b(2026-11-07): 무료 시작 CTA의 source 값이 바뀌어도 설치 우선(/download.html) 진입을 유지하는지 확인
assert(/href="\/download\.html\?source=homepage-[a-z-]+"/.test(home), 'download-first free start CTA');
assert(!home.includes('20250707030027'));
assert(trust.includes('주식회사 코레온홀딩스'));
assert(trust.includes('벤처기업'));
console.log('PASS homepage closed-loop conversion and company trust');

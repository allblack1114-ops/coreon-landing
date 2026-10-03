'use strict';
const assert=require('assert');
const fs=require('fs');
const page=fs.readFileSync('serious-accident-compliance.html','utf8');
const home=fs.readFileSync('index.html','utf8');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
// 대응표는 법률자문·면책 보장이 아님을 반드시 명시
assert(page.includes('법률 자문이 아니며'),'legal-advice boundary missing');
assert(page.includes('법적 책임 면제를 보장하지 않습니다'),'liability boundary missing');
// 미지원 항목도 공개
const n=s=>(page.match(new RegExp(`data-status="${s}"`,'g'))||[]).length;
assert(n('op')>0&&n('pa')>0&&n('cu')>0,'all three status levels must be shown');
// 홈 요약 숫자와 대응표 숫자 일치
const total=n('op')+n('pa')+n('cu');
assert(home.includes(`<b>${n('op')}</b><span>운영 지원</span>`),'home op count mismatch');
assert(home.includes(`<b>${n('pa')}</b><span>부분 지원</span>`),'home pa count mismatch');
assert(home.includes(`<b>${n('cu')}</b><span>사업장 수행·차기 개발</span>`),'home cu count mismatch');
assert(home.includes(`${total}개 항목`),'home total mismatch');
assert(home.includes('href="/serious-accident-compliance.html"'),'home link missing');
assert(sitemap.includes('https://www.coreon-global.com/serious-accident-compliance.html'),'sitemap entry missing');
// 과장 표현 금지
for(const bad of ['100% 매핑','완벽 대응','법적 책임을 면제','법 준수를 보장한다']) assert(!page.includes(bad)&&!home.includes(bad),`overclaim: ${bad}`);
console.log(`PASS compliance mapping: ${total} items (op ${n('op')}, partial ${n('pa')}, customer ${n('cu')}), boundaries and home parity`);

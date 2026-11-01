// EXEC-06 3.4: 소규모 활용 예시·조직 유형별 가치·문의 경로·가격 일치 (개발 브랜치 시험)
const fs = require('fs'), path = require('path'), assert = require('assert');
const R = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const ex = R('use-cases/small-workplace/index.html'), index = R('index.html'), hub = R('use-cases/index.html'), pricing = R('pricing.html'), sm = R('sitemap.xml');
// 1) 가상 시나리오 명시, 실제 사례·효과 주장 없음
assert(ex.includes('가상 시나리오') && ex.includes('실제 고객사의 도입 사례나 성과가 아닙니다'), 'virtual scenario label');
for (const bad of ['도입 사례 1', '% 절감', '시간 단축', '사고 감소율', '법적 의무를 자동', '책임을 면제', '완성 견적 자동 보장', '출원 중인 구조를 구현했습니다', '축소판']) assert(!ex.includes(bad), 'forbidden: ' + bad);
assert(ex.includes('보장하지 않습니다'), 'legal notice');
// 2) 조직 유형 4종
for (const k of ['소기업', '중견기업', '대기업·글로벌', '공공기관']) assert(ex.includes(k), 'org type ' + k);
// 3) 경로: 웹 무료 시작 + 다운로드 병행, 상담, 유상 실증·정식 계약, 로그인
for (const h of ['app.coreon-global.com/signup.html', '/download.html', 'app.coreon-global.com/inquiry.html', 'mailto:contact@coreon-global.com', 'app.coreon-global.com/login.html']) { assert(ex.includes(h), 'examples path ' + h); assert(index.includes(h), 'index path ' + h); }
// 4) 가격 일치: 앱 commercial-plan-billing.js(7ce7231) FREE 0원·관리자 3명, CORE 199000, OPERATIONS 490000·현장 5곳, 추가 현장 89000
const APP = { core: '199,000', ops: '490,000', site: '89,000' };
for (const v of Object.values(APP)) assert(pricing.includes(v), 'pricing has ' + v);
assert(ex.includes('월 199,000원') && ex.includes('월 490,000원, 현장 5곳 포함'), 'examples prices = app');
assert(index.includes('관리자 3명') && index.includes('월 199,000원') && index.includes('월 490,000원') && index.includes('월 89,000원'), 'index prices = app');
// 5) 연결·검색 자산
assert(hub.includes('/use-cases/small-workplace/') && index.includes('/use-cases/small-workplace/'), 'linked');
assert(sm.includes('https://www.coreon-global.com/use-cases/small-workplace/'), 'sitemap');
assert(ex.includes('rel="canonical" href="https://www.coreon-global.com/use-cases/small-workplace/"'), 'canonical');
// 6) 내부 링크 파일 존재
for (const m of ex.matchAll(/href="(\/[^"#?]*)/g)) { let p = m[1]; if (p.endsWith('/')) p += 'index.html'; assert(fs.existsSync(path.join(__dirname, '..', p)), 'missing ' + p); }
console.log('PASS homepage-exec06-sb-examples');

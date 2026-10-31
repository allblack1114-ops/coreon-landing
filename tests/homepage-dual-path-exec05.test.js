'use strict';
// EXEC-05 (2026-11-01) 시험 정책 공식 변경 기록
// 대표이사 결정 ③(웹 가입·다운로드 병행 승인)에 따라 homepage-installed-boundary-v2812.test.js 를 삭제하지 않고 유지하며,
// 이 시험이 '병행' 정책을 추가로 고정한다. 공용 assets 4종의 직접 가입 금지 규칙(v28.12)은 그대로 유지된다.
// 변경 범위: 메인 '규모별 시작' 섹션과 5인 이상 안내 페이지에서만 웹 가입을 다운로드 경로와 함께 제공한다.
const assert=require('assert');const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'..');const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const index=read('index.html');const g5=read('guides/5-plus-workplace-serious-accident-prevention.html');const cf=read('costflow-ax.html');
// 1) 기존 다운로드 경로 유지
assert(/href="\/download\.html\?source=[^"#]+(?:#install)?"/.test(index),'download path must remain on homepage');
assert(/href="\/download\.html\?source=seo-5plus[^"]*"/.test(g5),'5+ guide must keep download path');
// 2) 웹 가입 병행: 규모별 시작(소규모)과 5인 이상 안내에서만, 유입 경로(source) 표시 필수
const sb=index.slice(index.indexOf('id="by-size"'));assert(index.includes('id="by-size"'),'by-size section required');
assert(/https:\/\/app\.coreon-global\.com\/signup\.html\?source=home-size-small/.test(sb),'small-business web signup with source');
assert(/https:\/\/app\.coreon-global\.com\/signup\.html\?source=seo-5plus-web/.test(g5),'5+ guide web signup with source');
for(const m of (index+g5).matchAll(/https:\/\/app\.coreon-global\.com\/signup\.html(\?[^"]*)?"/g)) assert(m[1]&&m[1].includes('source='),'every signup link must carry source');
// 3) 법적 의무 자동 충족·책임 면제 보장 문구 금지
for(const s of [index,g5,cf]) for(const bad of ['법적 의무를 자동','책임을 면제','완성 견적 자동 보장','모든 Excel 지원','이지테크 완전 대체','최저가 자동 입찰','AI가 입찰을 대신 결정','출원 중인 구조를 구현했습니다']) assert(!s.includes(bad),'forbidden phrase: '+bad);
// 4) CostFlow 진입 준비본: 공개 전 noindex, 판매·결제 경로 없음, 미완성 표시
assert(cf.includes('noindex'),'costflow entry must be noindex until approval');
assert(!/pricing\.html|checkout|결제하기|구매하기|지금 구매/.test(cf),'costflow entry must not sell');
assert(cf.includes('고객 제출 불가')&&cf.includes('아직 안 됨'),'limitations must be shown');
assert(!read('sitemap.xml').includes('costflow-ax.html'),'not in sitemap before approval');
console.log('PASS EXEC-05 dual path (download + web signup) and CostFlow entry readiness');

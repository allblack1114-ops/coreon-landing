'use strict';
const assert=require('assert');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');

const index=read('index.html');
const enIndex=read('en/index.html');
const loader=read('assets/product-assistant.js');
const governance=read('assets/v27-73-governance.js');
const growth=read('assets/v27-72-growth-banner.js');
const plans=read('assets/v27-72-product-guide.js');
const industry=read('assets/v27-80-industry-autodesk-ratio.js');
const proof=read('assets/v28-5-proof-grade-operational-intelligence.js');
const download=read('download.html');
const downloadEn=read('en/download.html');
const releaseGate=read('assets/release-download-gate.js');

assert(index.includes('/download.html?source=coreon-home-free-start'));
assert(enIndex.includes('/en/download.html?source=coreon-en-free-start'));
assert(!index.includes('무료 진단으로 시작하고, 무료 안전방에서 직접 써보고, 필요하면 설치형 경험이나 기업·공공기관 도입으로 확장하세요.'));
assert(!loader.includes("load('/assets/v28-5-proof-grade-operational-intelligence.js?v=28.5')"));
assert(loader.includes('PROOF-GRADE SAFETY AX · v28.12'));
assert(proof.includes("eye:'PROOF-GRADE SAFETY AX · v28.12'"));
assert(!proof.includes("eye:'PROOF-GRADE SAFETY AX · v28.5'"));
for(const [name,src] of [['governance',governance],['growth',growth],['plans',plans],['industry',industry]]){
  assert(!src.includes('app.coreon-global.com/signup.html'),`${name} must not route public homepage directly into web signup workflow`);
  assert(!src.includes('/safety-room/start'),`${name} must not route public homepage directly into web Safety Room`);
}
assert(governance.includes('/download.html?source=coreon-home-governance-free'));
assert(growth.includes('/download.html?source=coreon-free-success'));
assert(plans.includes("const install=en?'/en/download.html':'/download.html'"));
assert(industry.includes('/download.html?source=coreon-industry'));
for(const [name,src] of [['ko download',download],['en download',downloadEn]]){
  assert(src.includes('release-download-gate.js?v=28.12.0'),`${name} must fail closed behind official signed release gate`);
  assert(!src.includes('releases/latest/download/'),`${name} must not expose unverified or missing static release URL`);
  assert(!/institutional web fallback/i.test(src),`${name} must not describe a second web product`);
}
assert(releaseGate.includes("EXPECTED_TAG='coreon-ax-v28.12.0'"));
assert(releaseGate.includes("REQUIRED_META='SHA256SUMS.txt'"));
assert(releaseGate.includes('release.draft||release.prerelease'));
assert(releaseGate.includes('OFFICIAL_RELEASE_ASSET_MISSING'));
assert(releaseGate.includes('OFFICIAL_RELEASE_CHECKSUM_MISSING'));
console.log('PASS v28.12 public homepage/install/download boundary: one installed product, optional public diagnosis, signed-release + checksum fail-closed');

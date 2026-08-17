'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const read=p=>fs.readFileSync(p,'utf8');
const ko=read('pricing.html');
const en=read('en/pricing.html');
const axis=JSON.parse(read('release-axis.json'));
assert.equal(axis.releaseAxis,'v28.12');
assert(ko.includes('월 149,000원'),'Korean Safety Core price must be 149k');
assert(ko.includes('월 490,000원'),'Korean Safety Operations price must be 490k');
assert(ko.includes('연 18,000,000원부터'),'Korean Enterprise/Public annual floor missing');
assert(ko.includes('기본 SaaS 도입비 없음'),'base SaaS setup-fee policy missing');
assert(!ko.includes('297,000원'),'retired Korean Safety Core price returned');
assert(!ko.includes('990,000원'),'retired Safety Business base plan returned');
assert(en.includes('KRW 149,000/mo'),'English Safety Core price must be 149k');
assert(en.includes('KRW 490,000/mo'),'English Safety Operations price must be 490k');
assert(en.includes('KRW 18,000,000/yr'),'English Enterprise/Public annual floor missing');
assert(!en.includes('KRW 297,000'),'retired English Safety Core price returned');
for(const workflow of ['.github/workflows/v27-62-search-equity-simple-product-home.yml','.github/workflows/v27-64-product-home-refinement.yml','.github/workflows/v27-66-seo-product-convergence.yml']){
  const text=read(workflow);
  assert(text.includes('149,000'),`${workflow} must recognize current 149k authority`);
  assert(!/grep -Fq ['"](?:월 )?297,000원['"] pricing\.html/.test(text),`${workflow} must not require legacy 297k as current price`);
  assert(!/! grep -Fq ['"]149,000원['"] pricing\.html/.test(text),`${workflow} must not reject current 149k price`);
}
console.log('PASS v28.12 landing commercial authority and legacy-workflow anti-regression');

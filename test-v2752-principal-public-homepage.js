'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ko=fs.readFileSync('index.html','utf8');
const en=fs.readFileSync('en/index.html','utf8');
for(const token of ['PRINCIPAL / PUBLIC ASSURANCE','발주처 안전관리','공공기관 중대재해 대응','도급·수급 안전관리','위험성평가 후속조치','중대재해 조치 증빙','기존 시스템을 바꾸라는 솔루션이 아니라','법적 책임이나 법령 준수 여부를 자동 판정하지 않습니다','20260325030049']) assert(ko.includes(token),token);
for(const token of ['PRINCIPAL / PUBLIC ASSURANCE','Principal, public-sector and contractor safety assurance','Contractor-neutral oversight','without forcing organizations to replace existing safety systems','does not automatically determine legal compliance or liability']) assert(en.includes(token),token);
assert(!ko.includes('20250707030027'));
console.log('PASS v27.52 principal/public homepage, SEO and public-claim boundary');

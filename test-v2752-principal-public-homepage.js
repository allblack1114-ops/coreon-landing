'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ko=fs.readFileSync('index.html','utf8');
const en=fs.readFileSync('en/index.html','utf8');
for(const token of ['PUBLIC · INFRASTRUCTURE','공공·시설·철도·교통','도입 상담','권한 있는 사람','법령 준수 여부를 판정하거나 법적 책임 면제를 보장하지 않습니다']) assert(ko.includes(token),token);
for(const token of ['PUBLIC · INFRASTRUCTURE','Public facilities, railway and transport','Discuss a pilot','authorized person','It does not determine legal compliance or guarantee exemption from liability']) assert(en.includes(token),token);
assert(!ko.includes('20250707030027'));
console.log('PASS principal/public positioning and public-claim boundary');

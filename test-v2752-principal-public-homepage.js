'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ko=fs.readFileSync('index.html','utf8');
const en=fs.readFileSync('en/index.html','utf8');
for(const token of ['PUBLIC · INFRASTRUCTURE','공공·시설·철도·교통','도입·실증 상담','권한 있는 사람','법률책임을 자동 판정하지 않습니다']) assert(ko.includes(token),token);
for(const token of ['PUBLIC · INFRASTRUCTURE','Public facilities, railway and transport','Discuss a pilot','authorized person','We do not automatically determine legal liability']) assert(en.includes(token),token);
assert(!ko.includes('20250707030027'));
console.log('PASS principal/public positioning and public-claim boundary');

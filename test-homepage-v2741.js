'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ko=fs.readFileSync('index.html','utf8');
const en=fs.readFileSync('en/index.html','utf8');
const hardening=fs.readFileSync('assets/client-hardening.js','utf8');

for(const phrase of ['COREON Safety AX Agent','현장에서 발견된 위험을 조치완료까지 연결합니다.','조치 전후 증빙','잔여위험 재확인','KOSHA','COREON Safety AX Agent 설치'])assert(ko.includes(phrase),phrase);
for(const phrase of ['COREON Safety AX Agent','Start free','Install COREON Safety AX Agent','Human final judgment','Serious-accident prevention'])assert(en.includes(phrase),phrase);
assert(ko.includes('href="/"'), 'Korean brand must return to canonical home');
assert(en.includes('class="brand" href="/en/"'), 'English brand must return to canonical English home');
assert(ko.includes('/download.html?source=home-download#install'));
assert(en.includes('/en/download.html?source=en-home-download#install'));

// Public entry contract: free signup, existing-user login and install are distinct.
for(const phrase of [
  'coreon-home-free&next=%2Fsafety-workspace.html',
  'coreon-home-top-free&next=%2Fsafety-workspace.html',
  'coreon-home-top-login&next=%2Fsafety-workspace.html',
  '/download.html?source=home-top-install#install',
  'coreon-en-home-free&next=%2Fen%2Fsafety-workspace.html',
  'coreon-en-home-top-free&next=%2Fen%2Fsafety-workspace.html',
  '/en/download.html?source=en-home-top-install#install',
  'combined.replaceWith(free, install)'
])assert(hardening.includes(phrase),phrase);

assert(!ko.includes('safety-room/start?source='));
assert(!en.includes('safety-room/start?source='));
assert(!ko.includes('source=coreon-home-download'));
assert(!en.includes('source=coreon-en-download'));
for(const forbidden of ['990,000원','v26.159','v27.41 Smartphone + NVIDIA Vision Edge'])assert(!ko.includes(forbidden),forbidden);
for(const forbidden of ['영국 HSE','미국 OSHA','Safe Work Australia','싱가포르 MOM','GitHub 코드·고객화면·배포 식별자','UK HSE','US OSHA','Singapore MOM','Eight stages'])assert(!ko.includes(forbidden)&&!en.includes(forbidden),forbidden);
console.log('PASS canonical homepage identity and separated public product entry contract');

'use strict';

// Triggered after the workflow was installed so GitHub Actions can apply and verify the additive patch.
const fs = require('node:fs');

function replaceOnce(text, before, after, label) {
  if (text.includes(after)) return text;
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one anchor, found ${count}`);
  return text.replace(before, after);
}

let ko = fs.readFileSync('index.html', 'utf8');
ko = replaceOnce(ko,
  '<meta name="author" content="COREON" />',
  '<meta name="author" content="주식회사 코레온홀딩스" />',
  'author metadata');
ko = replaceOnce(ko,
  '"name": "COREON",\n            "url"',
  '"name": "주식회사 코레온홀딩스",\n            "alternateName": "COREON",\n            "legalName": "주식회사 코레온홀딩스",\n            "identifier": "734-88-04053",\n            "foundingDate": "2026-07-24",\n            "url"',
  'organization schema');
ko = replaceOnce(ko,
  '"telephone": "0507-1358-1482",\n            "sameAs"',
  '"telephone": "0507-1358-1482",\n            "address": {"@type":"PostalAddress","streetAddress":"영종대로 881, 205호","addressLocality":"인천광역시 영종구","addressCountry":"KR"},\n            "sameAs"',
  'organization address');
ko = replaceOnce(ko,
  '.brand { display: flex; align-items: center; gap: 11px; color: var(--navy); font-size: 24px; font-weight: 950; }',
  '.brand { display: flex; align-items: center; gap: 11px; color: var(--navy); font-size: 24px; font-weight: 950; }\n      .brand-copy { display:flex; flex-direction:column; line-height:1.05; }\n      .brand-copy small { margin-top:5px; color:#66788c; font-size:10px; font-weight:850; letter-spacing:-0.02em; }\n      .corporate-notice { padding:10px 0; border-bottom:1px solid #cfe0ef; background:#eef6fd; color:#264867; font-size:13px; text-align:center; }\n      .corporate-notice strong { color:var(--navy); }',
  'corporate styles');
ko = replaceOnce(ko,
  '        .social a { width: 50px; height: 50px; }',
  '        .social a { width: 50px; height: 50px; }\n        .brand-copy small { display:none; }',
  'mobile brand style');
ko = replaceOnce(ko,
  '<a class="brand" href="#top" aria-label="COREON 홈"><img src="/assets/coreon-logo.png" alt="COREON 로고" /><span>COREON</span></a>',
  '<a class="brand" href="#top" aria-label="COREON 홈"><img src="/assets/coreon-logo.png" alt="COREON 로고" /><span class="brand-copy"><span>COREON</span><small>주식회사 코레온홀딩스</small></span></a>',
  'header brand');
ko = replaceOnce(ko,
  '    </header>\n\n    <div class="social"',
  '    </header>\n    <div class="corporate-notice"><strong>COREON은 주식회사 코레온홀딩스로 법인 전환되었습니다.</strong> 기존 브랜드·서비스·대표번호·대표 이메일은 동일하게 유지됩니다.</div>\n\n    <div class="social"',
  'corporate notice');
ko = replaceOnce(ko,
  '중대재해처벌법 대응을 위해 위험요인 확인, 개선조치 기록, TBM, 현장사진 증빙을 먼저 정리할 수 있도록 코레온이 3분 무료 안전진단과 Safety Start Free를 지원합니다.',
  '중대재해처벌법 대응을 위해 위험요인 확인, 개선조치 기록, TBM, 현장사진 증빙을 먼저 정리할 수 있도록 주식회사 코레온홀딩스의 COREON이 3분 무료 안전진단과 Safety Start Free를 지원합니다.',
  'hero copy');
ko = replaceOnce(ko,
  'COREON은 무료진단, 도입·기술·기업 상담과 계약 전 요청 처리에 필요한 최소한의 개인정보를 수집합니다.',
  '주식회사 코레온홀딩스(브랜드명 COREON)는 무료진단, 도입·기술·기업 상담과 계약 전 요청 처리에 필요한 최소한의 개인정보를 수집합니다.',
  'privacy controller');
ko = replaceOnce(ko,
  '<div><div class="footer-brand">COREON</div><p class="small">AX Agent · 산업안전 실행관리 · 등록특허 Safety IP · 기술 벤처기업<br />© COREON. All rights reserved.</p></div>',
  '<div><div class="footer-brand">COREON</div><p class="small"><strong>주식회사 코레온홀딩스</strong> · 대표이사 이호원<br />사업자등록번호 734-88-04053 · 법인등록번호 120111-0154907<br />인천광역시 영종구 영종대로 881, 205호(중산동, 리베라베리움)<br />대표전화 0507-1358-1482 · contact@coreon-global.com<br />COREON Safety AX Agent · 산업안전 실행관리 · 등록특허 Safety IP<br />© COREON HOLDINGS Co.,Ltd. All rights reserved.</p></div>',
  'legal footer');
fs.writeFileSync('index.html', ko);

let en = fs.readFileSync('en/index.html', 'utf8');
en = replaceOnce(en,
  '<a class="brand" href="/en/">COREON</a>',
  '<a class="brand" href="/en/">COREON <small style="display:block;font-size:10px;color:#66788c">COREON HOLDINGS Co.,Ltd</small></a>',
  'English brand');
en = replaceOnce(en,
  '<footer><div class="container">COREON · Safety AX Agent · Registered Safety IP · contact@coreon-global.com<br>© COREON. All rights reserved.</div></footer>',
  '<footer><div class="container"><strong>COREON HOLDINGS Co.,Ltd</strong> · CEO Lee Ho-won<br>Business Registration No. 734-88-04053 · Corporate Registration No. 120111-0154907<br>205, 881 Yeongjong-daero, Jung-gu, Incheon, Republic of Korea<br>0507-1358-1482 · contact@coreon-global.com<br>COREON Safety AX Agent · Registered Safety IP<br>© COREON HOLDINGS Co.,Ltd. All rights reserved.</div></footer>',
  'English footer');
fs.writeFileSync('en/index.html', en);

let privacy = fs.readFileSync('privacy.html', 'utf8');
privacy = replaceOnce(privacy,
  'COREON(이하 “회사”)은',
  '주식회사 코레온홀딩스(브랜드명 “COREON”, 이하 “회사”)는',
  'standalone privacy controller');
privacy = replaceOnce(privacy,
  'contact@coreon-global.com / +82-10-9039-1482',
  'contact@coreon-global.com / 0507-1358-1482',
  'privacy contact');
fs.writeFileSync('privacy.html', privacy);

console.log('PASS COREON Holdings corporate transition applied additively');

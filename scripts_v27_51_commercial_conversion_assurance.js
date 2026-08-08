'use strict';
const fs = require('fs');

function replaceOnce(text, from, to, label) {
  if (text.includes(to)) return text;
  if (!text.includes(from)) throw new Error(`V27_51_ANCHOR_MISSING:${label}`);
  return text.replace(from, to);
}

let home = fs.readFileSync('index.html', 'utf8');
home = replaceOnce(home,
  '<meta property="og:title" content="5인 이상 사업장 중대재해처벌법, 무엇부터 준비해야 할지 막막하다면" />',
  '<meta property="og:title" content="현장 위험제보부터 조치·사진증빙·재확인까지 한 흐름으로 | COREON Safety AX Agent" />',
  'og-title');
home = replaceOnce(home,
  'content="위험요인 확인, 개선조치 기록, TBM, 현장사진 증빙을 먼저 정리할 수 있도록 코레온이 무료 1차 안전진단과 Safety AX Agent를 지원합니다."',
  'content="사진·글·음성으로 위험을 알리면 AI가 위험후보를 정리하고, 사람이 확인해 담당자·기한·조치증빙·재확인까지 연결합니다."',
  'og-description');
home = replaceOnce(home,
`            <span class="badge">사고를 예방하는 Safety IP 전문기업</span>
            <h1>5인 이상 사업장<br />중대재해처벌법,<br /><em>무엇부터</em><br /><em>준비해야 할지</em><br />막막하다면</h1>
            <p>
              중대재해처벌법 대응을 위해 위험요인 확인, 개선조치 기록, TBM, 현장사진 증빙을 먼저 정리할 수 있도록 주식회사 코레온홀딩스의 COREON이 3분 무료 안전진단과 Safety Start Free를 지원합니다.
              <br /><strong style="color:#fff">COREON Safety AX Agent는 진단 이후의 현장 제보·담당자 조치·사진증빙·재확인까지 연결합니다.</strong>
            </p>`,
`            <span class="badge">COREON Safety AX Agent · 산업안전 실행관리 AX</span>
            <h1>현장 위험제보부터<br /><em>조치·사진증빙·재확인</em>까지<br />한 흐름으로</h1>
            <p>
              사진·글·음성으로 위험을 알리면 AI가 위험후보를 정리하고, 사람이 확인해 담당자·기한·개선조치·증빙·잔여위험 재평가까지 연결합니다.
              <br /><strong style="color:#fff">5인 이상 사업장의 중대재해 대응은 3분 무료 안전진단 또는 Safety Start Free에서 바로 시작할 수 있습니다.</strong>
            </p>`,
  'hero-value');
home = replaceOnce(home,
  '            <p class="hero-note">v27.41 Smartphone + NVIDIA Vision Edge 제한 파일럿 준비 · 실물 현장검증 진행 예정 · 안전관리자의 판단과 법률·전문가 검토를 대신하지 않습니다.</p>',
  '            <p class="hero-note">AI는 위험후보 정리와 업무 연결을 보조하며, 안전관리자의 판단과 법률·전문가 검토를 대신하지 않습니다. Vision Edge는 별도 제한 파일럿으로 검증합니다.</p>',
  'hero-tech-order');
home = replaceOnce(home,
  '<article class="trust-card"><b>Venture</b><h3>기술 벤처기업</h3><p>혁신성장형 기술기업 확인 자료를 공개합니다.</p></article>',
  '<article class="trust-card"><b>Venture Enterprise</b><h3>벤처기업확인 · 혁신성장유형</h3><p>주식회사 코레온홀딩스는 벤처기업확인기관이 발급한 벤처기업확인서를 보유하고 있습니다. 발급번호 20260325030049 · 유효기간 2026.03.25~2029.03.24.</p></article>',
  'venture-trust');
fs.writeFileSync('index.html', home);

let trust = fs.readFileSync('trust/index.html', 'utf8');
const trustBlock = '<section class="section" style="background:#fff"><div class="wrap"><div class="head"><h2>기업 신뢰 정보</h2><p>공개 신뢰 정보는 공식 확인자료에 기초하며 제품의 사고예방 또는 법적 결과를 보장하는 의미로 사용하지 않습니다.</p></div><div class="grid"><article class="card"><h3>주식회사 코레온홀딩스</h3><p>사업자등록번호 734-88-04053 · 법인등록번호 120111-0154907</p></article><article class="card"><h3>벤처기업확인 · 혁신성장유형</h3><p>발급번호 20260325030049 · 유효기간 2026.03.25~2029.03.24</p></article></div></div></section>';
if (!trust.includes('발급번호 20260325030049')) {
  const anchor = '<main><section class="section"><div class="wrap">';
  if (!trust.includes(anchor)) throw new Error('V27_51_ANCHOR_MISSING:trust-main');
  trust = trust.replace(anchor, '<main>' + trustBlock + '<section class="section"><div class="wrap">');
}
fs.writeFileSync('trust/index.html', trust);

for (const [file, required] of [
  ['index.html', ['현장 위험제보부터', '20260325030049', 'Safety Start Free']],
  ['trust/index.html', ['20260325030049', '혁신성장유형', '주식회사 코레온홀딩스']]
]) {
  const text = fs.readFileSync(file, 'utf8');
  for (const token of required) if (!text.includes(token)) throw new Error(`V27_51_VERIFY_FAILED:${file}:${token}`);
}
console.log('PASS v27.51 homepage conversion + venture trust patch');

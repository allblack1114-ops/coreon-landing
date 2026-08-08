'use strict';
const fs=require('fs');
const f='index.html';let s=fs.readFileSync(f,'utf8');
if(!s.includes('href="/use-cases/"')) s=s.replace('<a href="#features">주요기능</a>','<a href="#features">주요기능</a>\n          <a href="/use-cases/">활용가이드</a>');
if(!s.includes('id="decision-hub"')){
 const anchor='      <section id="principal-public" class="soft">';
 if(!s.includes(anchor)) throw new Error('V27_53_HOME_ANCHOR_MISSING');
 const block=`      <section id="decision-hub" class="value-section">\n        <div class="container">\n          <div class="section-head"><span class="kicker">COREON FOR YOUR ORGANIZATION</span><h2>우리 조직에서는 COREON을 어떻게 사용할까요?</h2><p>발주처·공공기관부터 건설·플랜트, 제조·물류·중소사업장, 컨설팅·수행기관까지. 기존 안전관리 체계를 바꾸지 않고 위험 발견 이후의 담당·기한·조치·증빙·재평가를 조직별 관점으로 연결합니다.</p></div>\n          <div class="grid-4">\n            <article class="card value-card"><b>01</b><h3>발주처·공공기관</h3><p>다현장·다협력사 안전이행과 미종결·기한초과·증빙누락을 확인합니다.</p></article>\n            <article class="card value-card"><b>02</b><h3>건설·플랜트·대기업</h3><p>현장 위험에서 실제 조치·증빙·본사 확인까지 연결합니다.</p></article>\n            <article class="card value-card"><b>03</b><h3>제조·물류·중소사업장</h3><p>전담 안전인력이 부족해도 사진 한 장에서 후속조치를 시작합니다.</p></article>\n            <article class="card value-card"><b>04</b><h3>컨설팅·수행기관</h3><p>기존 평가체계에 후속조치·증빙·KPI 관리만 연결합니다.</p></article>\n          </div>\n          <div class="actions"><a class="btn btn-primary" href="/use-cases/">우리 조직에 맞는 활용방법 보기</a><a class="btn btn-light" href="https://app.coreon-global.com/customer-decision-hub.html?source=coreon-home-decision-hub" target="_blank" rel="noopener">맞춤 적용화면 보기</a></div>\n        </div>\n      </section>\n\n`;
 s=s.replace(anchor,block+anchor);
}
fs.writeFileSync(f,s);
for(const x of ['COREON FOR YOUR ORGANIZATION','우리 조직에서는 COREON을 어떻게 사용할까요?','/use-cases/','customer-decision-hub.html']) if(!s.includes(x)) throw new Error('V27_53_HOME_VERIFY:'+x);
console.log('PASS v27.53 homepage decision hub');
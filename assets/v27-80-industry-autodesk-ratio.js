(()=>{const path=location.pathname.replace(/\/+$/,'')||'/';const isHome=path==='/'||path==='/en';if(!isHome)return;const isEn=(document.documentElement.lang||'').toLowerCase().startsWith('en')||path==='/en';if(document.getElementById('coreon-industry-ratio-v2780'))return;const style=document.createElement('style');style.id='coreon-industry-ratio-v2780';style.textContent=`
/* v27.80 layout provenance; public product authority is v28.12 */
@media(min-width:1100px){
  .w,#coreon-governance>div,#coreon-free-success>div,#coreon-company-trust>div,.cpg-w,.cgb{width:min(1180px,calc(100% - 72px))!important}
  .hg{min-height:520px!important;padding:38px 0!important;gap:44px!important;grid-template-columns:minmax(0,1fr) minmax(430px,.92fr)!important}
  .hero h1{font-size:clamp(40px,4.35vw,56px)!important;line-height:1.08!important;max-width:690px!important;margin:15px 0!important}
  .hero p{font-size:16.5px!important;line-height:1.68!important;max-width:700px!important}
  .hero .device.coreon-hero-image-frame{max-width:600px!important}
  .hero .coreon-hero-product-image{max-height:430px!important;object-fit:contain!important}
  section{padding:62px 0!important}
  #coreon-governance{padding:62px 0!important}
  .cgov-head{max-width:790px!important;margin-bottom:25px!important}
  .cgov-head h2{font-size:clamp(32px,3.3vw,45px)!important;line-height:1.13!important}
  .cgov-head p{font-size:15.5px!important;line-height:1.68!important}
  .cgov-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:14px!important}
  .cgov-grid article{min-height:238px!important;padding:24px 20px!important;border-radius:10px!important;display:flex!important;flex-direction:column!important}
  .cgov-grid strong{font-size:19px!important;margin:18px 0 10px!important}
  .cgov-grid p{font-size:14px!important;line-height:1.62!important}
  .flow{grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:14px!important}
  .flow .fc{min-height:175px!important;padding:25px 20px!important;border-radius:10px!important}
  .flow .fc b{font-size:17px!important;display:block!important;margin-bottom:18px!important}
  .flow .fc span{font-size:14px!important;line-height:1.6!important}
  .proof{gap:20px!important}
  .pv{min-height:430px!important;border-radius:12px!important}
  .copy{padding:25px 25px 20px!important}
  .mock{margin:0 24px 24px!important}
  .hub{gap:18px!important}
  .hub .card{min-height:285px!important;border-radius:10px!important;padding:25px!important}
  .roles .card{min-height:220px!important;border-radius:10px!important}
}
@media(min-width:760px) and (max-width:1099px){
  .hg{min-height:auto!important;padding:46px 0!important;gap:32px!important}
  .hero h1{font-size:clamp(40px,5vw,52px)!important}
  .cgov-grid{grid-template-columns:repeat(2,1fr)!important}
  .cgov-grid article{min-height:220px!important}
}
@media(max-width:759px){
  .hg{padding:36px 0!important;gap:24px!important}
  .hero h1{font-size:clamp(34px,9.8vw,43px)!important}
  .hero p{font-size:16px!important;line-height:1.62!important}
  #coreon-governance{padding:52px 0!important}
}
#coreon-industries{background:#fff;color:#10233f;padding:58px 0;border-bottom:1px solid #e0e7ee}
.cind-wrap{width:min(1180px,calc(100% - 72px));margin:auto}
.cind-head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:24px}
.cind-head>div{max-width:760px}
.cind-k{color:#0b8f83;font-size:13px;font-weight:950;letter-spacing:.04em}
.cind-head h2{font-size:clamp(30px,3.4vw,43px);line-height:1.13;letter-spacing:-.035em;margin:7px 0 10px;color:#071a33}
.cind-head p{margin:0;color:#617488;font-size:15.5px;line-height:1.65}
.cind-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.cind-card{min-height:255px;border:1px solid #dbe5ee;background:#fff;padding:23px 21px;display:flex;flex-direction:column}
.cind-card small{font-size:12px;font-weight:950;color:#0b8f83}
.cind-card h3{font-size:21px;line-height:1.25;margin:34px 0 10px;color:#071a33}
.cind-card p{font-size:14px;line-height:1.62;color:#627589;margin:0}
.cind-card a{margin-top:auto;padding-top:24px;color:#1269d3;font-size:14px;font-weight:900}
@media(max-width:900px){.cind-wrap{width:calc(100% - 36px)}.cind-grid{grid-template-columns:repeat(2,1fr)}.cind-head{align-items:flex-start;flex-direction:column}.cind-card{min-height:235px}}
@media(max-width:560px){#coreon-industries{padding:48px 0}.cind-wrap{width:calc(100% - 24px)}.cind-grid{grid-template-columns:1fr}.cind-card{min-height:215px}.cind-head h2{font-size:34px}}
`;document.head.appendChild(style);
const hero=document.querySelector('.hero');if(hero&&!document.getElementById('coreon-industries')){const sec=document.createElement('section');sec.id='coreon-industries';sec.innerHTML=isEn?`<div class="cind-wrap"><div class="cind-head"><div><span class="cind-k">INDUSTRY APPLICATIONS</span><h2>Apply the same execution workflow across different operating environments.</h2><p>COREON connects hazard discovery, human review, ownership, corrective action, evidence and verification without forcing organizations to replace their existing safety system.</p></div></div><div class="cind-grid"><article class="cind-card"><small>01 · PUBLIC</small><h3>Public agencies & owners</h3><p>Review unresolved, overdue, evidence-missing and recurring risks across multiple sites and contractors.</p><a href="https://app.coreon-global.com/en/enterprise-inquiry.html?source=coreon-industry-public">Review deployment →</a></article><article class="cind-card"><small>02 · CONSTRUCTION</small><h3>Construction & plant</h3><p>Connect field hazards to owner assignment, corrective action, photo evidence and HQ verification.</p><a href="#proof">See product workflow →</a></article><article class="cind-card"><small>03 · INDUSTRY</small><h3>Manufacturing, logistics & food</h3><p>Start follow-up from a field report and keep overdue corrective actions visible even with limited safety staff.</p><a href="/en/download.html?source=coreon-industry-en">Start free in COREON AX Agent →</a></article><article class="cind-card"><small>04 · SME</small><h3>SMEs & business owners</h3><p>Use the anonymous safety check to understand your needs, then install COREON AX Agent and continue in the Safety Start Free account.</p><a href="https://app.coreon-global.com/en/free-assessment?source=coreon-industry-sme">Free safety check →</a></article></div></div>`:`<div class="cind-wrap"><div class="cind-head"><div><span class="cind-k">INDUSTRY APPLICATIONS · 산업별 적용 분야</span><h2>산업은 달라도 위험 발견 이후의 실행은<br>하나의 흐름으로 연결합니다.</h2><p>COREON Safety AX Agent는 기존 안전관리 체계를 억지로 바꾸지 않고, 현장에서 발견한 위험을 사람의 검토·담당자·기한·조치·증빙·재확인으로 이어지게 합니다.</p></div></div><div class="cind-grid"><article class="cind-card"><small>01 · PUBLIC</small><h3>공공기관·발주처</h3><p>다현장·다협력사의 미종결, 기한초과, 증빙누락과 반복위험을 우선 확인합니다.</p><a href="https://app.coreon-global.com/enterprise-inquiry.html?source=coreon-industry-public">도입 검토하기 →</a></article><article class="cind-card"><small>02 · CONSTRUCTION</small><h3>건설·플랜트</h3><p>현장 위험에서 담당자 지정, 개선조치, 사진증빙과 본사 확인까지 업무를 끊김 없이 이어갑니다.</p><a href="#proof">제품 흐름 보기 →</a></article><article class="cind-card"><small>03 · INDUSTRY</small><h3>제조·물류·식품</h3><p>전담 안전인력이 제한적인 조직도 현장 제보에서 후속조치를 시작하고 미조치 위험을 관리합니다.</p><a href="/download.html?source=coreon-industry">COREON AX Agent에서 무료로 시작 →</a></article><article class="cind-card"><small>04 · SME</small><h3>중소사업장·대표</h3><p>무료 안전진단으로 필요한 업무를 먼저 확인하고, 실제 안전업무는 COREON AX Agent의 Safety Start Free 계정에서 이어갑니다.</p><a href="https://app.coreon-global.com/inquiry.html?source=coreon-industry-sme">무료 안전진단하기 →</a></article></div></div>`;hero.parentNode.insertBefore(sec,hero.nextSibling)}
const nav=document.querySelector('.links');if(nav&&!nav.querySelector('[data-industry-link]')){const a=document.createElement('a');a.dataset.industryLink='true';a.href='#coreon-industries';a.textContent=isEn?'Industries':'산업별 적용';const first=nav.firstElementChild;nav.insertBefore(a,first||null)}
})();
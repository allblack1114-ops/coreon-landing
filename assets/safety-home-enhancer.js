(()=>{
  const en=document.documentElement.lang==='en';
  document.body.classList.add('coreon-safety-public','coreon-product-home');

  const text=el=>String(el?.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
  const classify=t=>{
    if(/critical|치명|긴급|중대|미조치/.test(t)) return 'critical';
    if(/high risk|고위험|위험/.test(t)) return 'high';
    if(/overdue|기한초과|주의|warning|기한/.test(t)) return 'watch';
    if(/verified|검증|완료|정상|승인/.test(t)) return 'ok';
    if(/ai|integration|runtime|정보|후보/.test(t)) return 'info';
    return '';
  };
  document.querySelectorAll('.card,.audience,.problem-card,.feature,.check').forEach(el=>{const c=classify(text(el));if(c)el.classList.add(`safety-accent-${c}`)});
  document.querySelectorAll('.kpi').forEach(el=>{const c=classify(text(el));if(c)el.classList.add(`safety-kpi-${c}`)});
  document.querySelectorAll('.flow-step').forEach((el,i)=>el.dataset.safetyTone=['info','watch','high','ok','ok'][i]||'info');

  const nav=document.querySelector('.nav-links');
  if(nav){
    nav.innerHTML=en
      ? `<a href="/en/">Product</a><a href="#features">Features</a><a href="/en/use-cases/">Industries</a><a href="/en/pricing.html">Pricing</a><a class="download-link" href="/en/download.html">Download</a><a href="#contact">Support</a><a href="/" lang="ko">KO</a>`
      : `<a href="#top">제품</a><a href="#features">주요기능</a><a href="/use-cases/">산업별 활용</a><a href="/pricing.html">요금제</a><a class="download-link" href="/download.html">다운로드</a><a href="#contact">고객지원</a><a href="/en/" lang="en">EN</a>`;
  }

  const style=document.createElement('style');
  style.id='coreon-product-home-style';
  style.textContent=`
    .coreon-product-home .corporate-notice{display:none!important}
    .coreon-product-home .nav-links{gap:15px}
    .coreon-product-home .nav-links .download-link{padding:10px 15px;border-radius:999px;background:#071529;color:#fff}
    .coreon-product-home .hero-grid{min-height:620px}
    .coreon-product-home .hero h1{max-width:780px}
    .coreon-product-home .hero-art{max-width:470px}
    .coreon-product-home .industry-strip{padding:16px 0}
    .coreon-product-home .industry-row{justify-content:flex-start}
    .coreon-product-home #organization-banner{display:none}
    .coreon-product-home #decision-hub{display:none}
    .coreon-product-home .trust-band{padding-top:62px;padding-bottom:62px}
    .coreon-product-home .mall-band{padding-top:40px;padding-bottom:40px}
    .coreon-product-home .safety-legend{display:none!important}
    .coreon-product-home #coreon-ai-product-assistant{right:112px!important}
    .coreon-product-rail{position:sticky;top:76px;z-index:920;background:#071529;color:#fff;border-bottom:1px solid rgba(255,255,255,.12)}
    .coreon-product-rail .rail-inner{min-height:48px;display:flex;align-items:center;justify-content:space-between;gap:16px}
    .coreon-product-rail .rail-brand{font-size:13px;font-weight:950;white-space:nowrap}
    .coreon-product-rail .rail-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .coreon-product-rail a{display:inline-flex;align-items:center;min-height:32px;padding:0 11px;border:1px solid rgba(255,255,255,.25);border-radius:999px;color:#fff;font-size:12px;font-weight:900;text-decoration:none}
    .coreon-product-rail a.download{background:#1475e8;border-color:#1475e8}.coreon-product-rail a.free{background:#0b8f83;border-color:#0b8f83}
    .coreon-product-story{padding:68px 0;background:#f7fafc;border-bottom:1px solid #d8e4f0}
    .coreon-product-story .story-head{max-width:820px;margin-bottom:28px}.coreon-product-story .story-head small{color:#1475e8;font-weight:950;letter-spacing:.05em}.coreon-product-story h2{margin:8px 0 12px;color:#061a33;font-size:clamp(32px,4.2vw,50px);line-height:1.15}.coreon-product-story .story-head p{margin:0;color:#5d6e82;font-size:17px;line-height:1.7}
    .coreon-product-story .story-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.coreon-product-story article{padding:25px;border:1px solid #d8e4f0;border-radius:22px;background:#fff}.coreon-product-story article span{font-size:12px;font-weight:950;color:#0b8f83}.coreon-product-story article h3{margin:9px 0;color:#061a33;font-size:21px}.coreon-product-story article p{margin:0;color:#5d6e82;line-height:1.65;font-size:14px}
    @media(max-width:900px){.coreon-product-rail{top:0}.coreon-product-rail .rail-inner{padding:8px 0;align-items:flex-start;flex-direction:column}.coreon-product-story .story-grid{grid-template-columns:1fr}}
    @media(max-width:640px){.coreon-product-home .hero-grid{min-height:auto}.coreon-product-home .nav-links{gap:10px}.coreon-product-home #coreon-ai-product-assistant{right:76px!important}.coreon-product-rail .rail-brand{display:none}.coreon-product-rail .rail-actions{width:100%;display:grid;grid-template-columns:repeat(3,1fr)}.coreon-product-rail a{justify-content:center;padding:0 6px}}
  `;
  if(!document.getElementById(style.id)) document.head.appendChild(style);

  const header=document.querySelector('.site-header');
  if(header&&!document.querySelector('.coreon-product-rail')){
    const rail=document.createElement('div');rail.className='coreon-product-rail';
    rail.innerHTML=en
      ? `<div class="container rail-inner"><div class="rail-brand">COREON Safety AX Agent</div><div class="rail-actions"><a href="/en/pricing.html">Pricing</a><a class="download" href="/en/download.html">Download / Install</a><a class="free" href="https://app.coreon-global.com/free-diagnosis?source=coreon-product-rail" target="_blank" rel="noopener">Free assessment</a></div></div>`
      : `<div class="container rail-inner"><div class="rail-brand">COREON Safety AX Agent</div><div class="rail-actions"><a href="/pricing.html">요금제</a><a class="download" href="/download.html">다운로드 · 설치</a><a class="free" href="https://app.coreon-global.com/free-diagnosis?source=coreon-product-rail" target="_blank" rel="noopener">무료 안전진단</a></div></div>`;
    header.insertAdjacentElement('afterend',rail);
  }

  const hero=document.querySelector('.hero');
  if(hero){
    const actions=hero.querySelector('.actions');
    if(actions){
      actions.innerHTML=en
        ? `<a class="btn btn-primary" href="/en/download.html">Download / Install</a><a class="btn btn-guest" href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-hero" target="_blank" rel="noopener">Free safety assessment</a><a class="btn btn-light" href="/en/pricing.html">Pricing</a><a class="btn btn-light" href="#contact">Talk to COREON</a>`
        : `<a class="btn btn-primary" href="/download.html">다운로드 · 설치</a><a class="btn btn-guest" href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-hero" target="_blank" rel="noopener">3분 무료 안전진단</a><a class="btn btn-light" href="/pricing.html">요금제</a><a class="btn btn-light" href="#contact">도입 상담</a>`;
    }
    const note=hero.querySelector('.hero-note');
    if(note) note.textContent=en
      ? 'AI supports hazard organization and workflow. Qualified people remain responsible for review, action, and final safety decisions.'
      : 'AI는 위험정보 정리와 안전업무 연결을 보조하며, 검토·조치·최종 안전판단은 권한 있는 사람이 수행합니다.';
  }

  const industry=document.querySelector('.industry-row');
  if(industry){
    industry.innerHTML=en
      ? `<strong>Built for safety work across industries</strong><span>Construction</span><span>Manufacturing</span><span>Logistics</span><span>Food production</span><span>Plant</span><span>Public organizations</span><span>Owners & contractors</span><span>SMEs</span>`
      : `<strong>다양한 산업 현장에서 활용할 수 있습니다</strong><span>건설</span><span>제조</span><span>물류</span><span>식품</span><span>플랜트</span><span>공공기관</span><span>발주처·협력사</span><span>중소사업장</span>`;
  }

  if(hero&&!document.querySelector('.coreon-product-story')){
    const story=document.createElement('section');story.className='coreon-product-story';
    story.innerHTML=en
      ? `<div class="container"><div class="story-head"><small>FROM HAZARD TO VERIFIED ACTION</small><h2>Make safety action easier to see, assign, prove, and recheck.</h2><p>COREON Safety AX Agent helps teams connect field reports with responsible owners, deadlines, corrective evidence, and residual-risk review.</p></div><div class="story-grid"><article><span>01 REPORT</span><h3>Capture field hazards simply</h3><p>Workers can report hazards with text, photos, or voice so important information does not disappear across calls, chat, and paper notes.</p></article><article><span>02 ACT & PROVE</span><h3>Connect ownership and evidence</h3><p>Assign a responsible person and due date, then keep before-and-after evidence with the corrective action.</p></article><article><span>03 RECHECK</span><h3>Verify what risk remains</h3><p>Reassess residual risk and let authorized people verify the result before the work item is closed.</p></article></div></div>`
      : `<div class="container"><div class="story-head"><small>위험 발견에서 조치 확인까지</small><h2>현장 위험을 더 쉽게 보고하고, 맡기고, 증명하고, 다시 확인하세요.</h2><p>COREON Safety AX Agent는 현장 제보를 담당자·기한·개선조치·증빙·잔여위험 재평가까지 연결해 안전업무가 실제로 이어지도록 돕습니다.</p></div><div class="story-grid"><article><span>01 위험 제보</span><h3>현장 위험을 간편하게 남깁니다</h3><p>사진·글·음성으로 위험을 제보해 전화·메신저·수첩에 흩어지는 정보를 한 흐름으로 모읍니다.</p></article><article><span>02 조치·증빙</span><h3>담당자와 근거를 함께 연결합니다</h3><p>누가 언제까지 조치할지 정하고, 개선 전후 사진과 조치내용을 함께 남깁니다.</p></article><article><span>03 재확인</span><h3>조치 후 남은 위험을 다시 확인합니다</h3><p>잔여위험을 재평가하고 권한 있는 사람이 결과를 확인한 뒤 안전업무를 종결합니다.</p></article></div></div>`;
    hero.insertAdjacentElement('afterend',story);
  }

  if(!document.querySelector('script[data-coreon-product-assistant]')){
    const s=document.createElement('script');s.src='/assets/product-assistant.js?v=27.64.2';s.defer=true;s.dataset.coreonProductAssistant='v27.64.2';document.body.appendChild(s);
  }
})();
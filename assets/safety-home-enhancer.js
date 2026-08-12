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

  // Public site stays product-first: explain -> features -> industries -> plans -> download -> free start.
  const nav=document.querySelector('.nav-links');
  if(nav){
    nav.innerHTML=en
      ? `<a href="/en/">Product</a><a href="#features">Features</a><a href="/en/use-cases/">Industries</a><a href="/en/pricing.html">Plans</a><a href="/en/download.html">Download</a><a class="contact-btn" href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-nav" target="_blank" rel="noopener">Free start</a><a href="/" lang="ko">KO</a>`
      : `<a href="#top">제품</a><a href="#features">주요기능</a><a href="/use-cases/">산업별 활용</a><a href="/pricing.html">요금제</a><a href="/download.html">다운로드</a><a class="contact-btn" href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-nav" target="_blank" rel="noopener">무료 시작</a><a href="/en/" lang="en">EN</a>`;
  }

  const style=document.createElement('style');
  style.id='coreon-product-home-style';
  style.textContent=`
    .coreon-product-home .nav-links{gap:15px}
    .coreon-product-home .hero-grid{min-height:620px}
    .coreon-product-home .hero h1{max-width:780px}
    .coreon-product-home .hero-art{max-width:470px}
    .coreon-product-home .industry-strip{padding:14px 0}
    .coreon-product-home .industry-row{justify-content:flex-start}
    .coreon-product-home #organization-banner{display:none}
    .coreon-product-home #decision-hub{display:none}
    .coreon-product-home .trust-band{padding-top:62px;padding-bottom:62px}
    .coreon-product-home .mall-band{padding-top:40px;padding-bottom:40px}
    .coreon-product-home .safety-legend{display:none!important}
    .coreon-product-rail{position:sticky;top:76px;z-index:920;background:#071529;color:#fff;border-bottom:1px solid rgba(255,255,255,.12)}
    .coreon-product-rail .rail-inner{min-height:48px;display:flex;align-items:center;justify-content:space-between;gap:16px}
    .coreon-product-rail .rail-brand{font-size:13px;font-weight:950;white-space:nowrap}
    .coreon-product-rail .rail-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .coreon-product-rail a{display:inline-flex;align-items:center;min-height:32px;padding:0 11px;border:1px solid rgba(255,255,255,.25);border-radius:999px;color:#fff;font-size:12px;font-weight:900;text-decoration:none}
    .coreon-product-rail a.free{background:#1475e8;border-color:#1475e8}.coreon-product-rail a.download{background:#0b8f83;border-color:#0b8f83}
    .coreon-quick-start{background:#fff;border-bottom:1px solid #d8e4f0;padding:28px 0}
    .coreon-quick-start .quick-grid{display:grid;grid-template-columns:1.35fr repeat(3,1fr);gap:12px;align-items:stretch}
    .coreon-quick-start .quick-intro{padding:18px 10px 18px 0}
    .coreon-quick-start .quick-intro b{display:block;color:#061a33;font-size:24px;line-height:1.3;margin-bottom:7px}
    .coreon-quick-start .quick-intro span{color:#5d6e82;line-height:1.65;font-size:14px}
    .coreon-quick-start a{display:flex;flex-direction:column;justify-content:center;gap:5px;padding:20px;border:1px solid #d8e4f0;border-radius:18px;background:#f8fbfe;text-decoration:none;transition:.18s}
    .coreon-quick-start a:hover{transform:translateY(-2px);border-color:#9fc5ea;background:#fff}
    .coreon-quick-start a strong{color:#075db8;font-size:16px}.coreon-quick-start a small{color:#5d6e82;line-height:1.45}
    .coreon-quick-start a.download strong{color:#087443}.coreon-quick-start a.pricing strong{color:#8a5b00}
    .coreon-product-story{padding:72px 0;background:#f7fafc;border-bottom:1px solid #d8e4f0}
    .coreon-product-story .story-head{max-width:800px;margin-bottom:28px}.coreon-product-story .story-head small{color:#1475e8;font-weight:950;letter-spacing:.05em}.coreon-product-story h2{margin:8px 0 12px;color:#061a33;font-size:clamp(32px,4.2vw,52px);line-height:1.15}.coreon-product-story .story-head p{margin:0;color:#5d6e82;font-size:17px;line-height:1.7}
    .coreon-product-story .story-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.coreon-product-story article{padding:25px;border:1px solid #d8e4f0;border-radius:22px;background:#fff}.coreon-product-story article span{font-size:12px;font-weight:950;color:#0b8f83}.coreon-product-story article h3{margin:9px 0;color:#061a33;font-size:21px}.coreon-product-story article p{margin:0;color:#5d6e82;line-height:1.65;font-size:14px}
    @media(max-width:900px){.coreon-product-rail{top:0}.coreon-product-rail .rail-inner{padding:8px 0;align-items:flex-start;flex-direction:column}.coreon-quick-start .quick-grid{grid-template-columns:1fr 1fr}.coreon-quick-start .quick-intro{grid-column:1/-1;padding-right:0}.coreon-product-story .story-grid{grid-template-columns:1fr}}
    @media(max-width:640px){.coreon-product-home .hero-grid{min-height:auto}.coreon-quick-start .quick-grid{grid-template-columns:1fr}.coreon-quick-start .quick-intro{grid-column:auto}.coreon-product-home .nav-links{gap:10px}.coreon-product-rail .rail-brand{display:none}.coreon-product-rail .rail-actions{width:100%;display:grid;grid-template-columns:repeat(3,1fr)}.coreon-product-rail a{justify-content:center;padding:0 6px}}
  `;
  if(!document.getElementById(style.id)) document.head.appendChild(style);

  const header=document.querySelector('.site-header');
  if(header&&!document.querySelector('.coreon-product-rail')){
    const rail=document.createElement('div');rail.className='coreon-product-rail';
    rail.innerHTML=en
      ? `<div class="container rail-inner"><div class="rail-brand">COREON Safety AX Agent</div><div class="rail-actions"><a href="/en/pricing.html">Plans</a><a class="download" href="/en/download.html">Download</a><a class="free" href="https://app.coreon-global.com/free-diagnosis?source=coreon-product-rail" target="_blank" rel="noopener">Free start</a></div></div>`
      : `<div class="container rail-inner"><div class="rail-brand">COREON Safety AX Agent</div><div class="rail-actions"><a href="/pricing.html">요금제</a><a class="download" href="/download.html">다운로드</a><a class="free" href="https://app.coreon-global.com/free-diagnosis?source=coreon-product-rail" target="_blank" rel="noopener">무료 시작</a></div></div>`;
    header.insertAdjacentElement('afterend',rail);
  }

  const hero=document.querySelector('.hero');
  if(hero&&!document.querySelector('.coreon-quick-start')){
    const quick=document.createElement('section');quick.className='coreon-quick-start';quick.setAttribute('aria-label',en?'Start COREON Safety AX Agent':'COREON Safety AX Agent 시작');
    quick.innerHTML=en
      ? `<div class="container quick-grid"><div class="quick-intro"><b>Understand it here. Run safety work in the product.</b><span>The website explains COREON. The Safety AX Cloud is where teams sign in, work, and expand when they need more scale.</span></div><a href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-quick" target="_blank" rel="noopener"><strong>Free safety assessment</strong><small>Experience a useful first safety outcome</small></a><a class="pricing" href="/en/pricing.html"><strong>Plans</strong><small>Expand only when operational needs grow</small></a><a class="download" href="/en/download.html"><strong>Download / Install</strong><small>Web/PWA today, more clients only when real artifacts are ready</small></a></div>`
      : `<div class="container quick-grid"><div class="quick-intro"><b>홈페이지에서 이해하고, 제품에서 실제 안전업무를 수행하세요.</b><span>COREON은 제품을 설명하는 홈페이지와 실제 로그인·업무·무료→유료 확장이 이루어지는 Safety AX Cloud를 분리합니다.</span></div><a href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-quick" target="_blank" rel="noopener"><strong>무료 안전진단</strong><small>먼저 의미 있는 첫 안전 결과를 경험</small></a><a class="pricing" href="/pricing.html"><strong>요금제</strong><small>운영 필요가 커질 때만 자연스럽게 확장</small></a><a class="download" href="/download.html"><strong>다운로드 · 설치</strong><small>현재 Web/PWA부터 정직하게 제공</small></a></div>`;
    hero.insertAdjacentElement('afterend',quick);
  }

  if(hero&&!document.querySelector('.coreon-product-story')){
    const story=document.createElement('section');story.className='coreon-product-story';
    story.innerHTML=en
      ? `<div class="container"><div class="story-head"><small>ONE PRODUCT · MANY ORGANIZATIONS</small><h2>Start free. Prove the workflow. Expand with real operational need.</h2><p>Construction, manufacturing, logistics, food production, plant, contractors, owners, public organizations, SMEs and multinational enterprises use the same product core with different operational scale.</p></div><div class="story-grid"><article><span>01 FREE VALUE</span><h3>Complete a meaningful first safety loop</h3><p>Start from assessment or Safety Room and experience hazard reporting, human review, action ownership, evidence and residual-risk reassessment.</p></article><article><span>02 REAL WORK</span><h3>Use the product, not the brochure</h3><p>After sign-up and login, safety work continues inside COREON Safety AX Cloud with the same account and evidence chain.</p></article><article><span>03 SCALE WHEN NEEDED</span><h3>Pay for scale and governance, not artificial friction</h3><p>Multi-site, organizational operations, leadership visibility, integration and enterprise governance become relevant as actual needs grow.</p></article></div></div>`
      : `<div class="container"><div class="story-head"><small>ONE PRODUCT · MANY ORGANIZATIONS</small><h2>무료로 시작하고, 실제 업무로 가치를 확인한 뒤, 필요한 만큼 확장합니다.</h2><p>건설·제조·물류·식품·플랜트·협력업체·발주처·공공기관·중소사업장·다국적 기업까지 같은 COREON Safety AX Agent를 조직 규모와 운영 필요에 맞춰 사용합니다.</p></div><div class="story-grid"><article><span>01 무료 가치</span><h3>첫 안전 폐루프를 실제로 완료</h3><p>무료진단 또는 Safety Room에서 시작해 위험 제보, 사람 검토, 담당자·기한, 조치증빙, 잔여위험 재평가까지 의미 있는 첫 결과를 경험합니다.</p></article><article><span>02 실제 제품</span><h3>소개페이지가 아니라 제품에서 일합니다</h3><p>회원가입·로그인 후 COREON Safety AX Cloud에서 같은 계정과 Evidence Chain으로 실제 안전업무를 이어갑니다.</p></article><article><span>03 필요할 때 확장</span><h3>불편함이 아니라 운영 규모에 비용을 지불</h3><p>다현장, 조직운영, 경영확인, 시스템 연동, Enterprise 거버넌스가 실제로 필요해질 때 유료 플랜으로 확장합니다.</p></article></div></div>`;
    const quick=document.querySelector('.coreon-quick-start');(quick||hero).insertAdjacentElement('afterend',story);
  }

  // Public product pages get the AI product assistant; it has no access to tenant/private safety data.
  if(!document.querySelector('script[data-coreon-product-assistant]')){
    const s=document.createElement('script');s.src='/assets/product-assistant.js?v=27.62.0';s.defer=true;s.dataset.coreonProductAssistant='v27.62';document.body.appendChild(s);
  }
})();
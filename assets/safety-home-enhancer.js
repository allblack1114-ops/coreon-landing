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

  // Product-first navigation. Existing SEO copy, URLs and page sections remain intact.
  const nav=document.querySelector('.nav-links');
  if(nav){
    nav.innerHTML=en
      ? `<a href="/en/">Product</a><a href="/en/use-cases/">Use cases</a><a href="#features">Features</a><a href="/en/download.html">Download</a><a href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-nav" target="_blank" rel="noopener">Free start</a><a class="contact-btn" href="#contact">Contact</a><a href="/" lang="ko">KO</a>`
      : `<a href="#top">제품</a><a href="/use-cases/">산업별 활용</a><a href="#features">주요기능</a><a href="/download.html">다운로드</a><a href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-nav" target="_blank" rel="noopener">무료 시작</a><a class="contact-btn" href="#contact">도입 문의</a><a href="/en/" lang="en">EN</a>`;
  }

  // Keep the homepage visually simple like a software product site while preserving crawlable source content.
  const style=document.createElement('style');
  style.id='coreon-product-home-style';
  style.textContent=`
    .coreon-product-home .nav-links{gap:16px}
    .coreon-product-home .hero-grid{min-height:610px}
    .coreon-product-home .hero h1{max-width:760px}
    .coreon-product-home .hero-art{max-width:455px}
    .coreon-product-home .industry-strip{padding:14px 0}
    .coreon-product-home .industry-row{justify-content:flex-start}
    .coreon-product-home #organization-banner{display:none}
    .coreon-product-home #decision-hub{display:none}
    .coreon-product-home .trust-band{padding-top:62px;padding-bottom:62px}
    .coreon-product-home .mall-band{padding-top:40px;padding-bottom:40px}
    .coreon-quick-start{background:#fff;border-bottom:1px solid #d8e4f0;padding:22px 0}
    .coreon-quick-start .quick-grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:12px;align-items:stretch}
    .coreon-quick-start .quick-intro{padding:18px 8px 18px 0}
    .coreon-quick-start .quick-intro b{display:block;color:#061a33;font-size:22px;margin-bottom:7px}
    .coreon-quick-start .quick-intro span{color:#5d6e82;line-height:1.6;font-size:14px}
    .coreon-quick-start a{display:flex;flex-direction:column;justify-content:center;gap:5px;padding:18px 20px;border:1px solid #d8e4f0;border-radius:18px;background:#f8fbfe;text-decoration:none;transition:.18s}
    .coreon-quick-start a:hover{transform:translateY(-2px);border-color:#9fc5ea;background:#fff}
    .coreon-quick-start a strong{color:#075db8;font-size:16px}
    .coreon-quick-start a small{color:#5d6e82;line-height:1.45}
    .coreon-quick-start a.download strong{color:#087443}
    .coreon-quick-start a.app strong{color:#061a33}
    @media(max-width:900px){.coreon-quick-start .quick-grid{grid-template-columns:1fr 1fr}.coreon-quick-start .quick-intro{grid-column:1/-1;padding-right:0}}
    @media(max-width:640px){.coreon-product-home .hero-grid{min-height:auto}.coreon-quick-start .quick-grid{grid-template-columns:1fr}.coreon-quick-start .quick-intro{grid-column:auto}.coreon-product-home .nav-links{gap:10px}}
  `;
  if(!document.getElementById(style.id)) document.head.appendChild(style);

  const hero=document.querySelector('.hero');
  if(hero&&!document.querySelector('.coreon-quick-start')){
    const quick=document.createElement('section');
    quick.className='coreon-quick-start';
    quick.setAttribute('aria-label',en?'Start COREON Safety AX Agent':'COREON Safety AX Agent 시작');
    quick.innerHTML=en
      ? `<div class="container quick-grid"><div class="quick-intro"><b>Start the way your team prefers.</b><span>The website explains the product. Safety work runs in COREON Safety AX Cloud.</span></div><a href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-quick" target="_blank" rel="noopener"><strong>Free safety assessment</strong><small>Check your first safety priorities in minutes</small></a><a class="download" href="/en/download.html"><strong>Download / Install</strong><small>PWA install guide for Windows, Android and Apple devices</small></a><a class="app" href="https://app.coreon-global.com/login-en.html" target="_blank" rel="noopener"><strong>Open Safety AX</strong><small>Continue with the same cloud account</small></a></div>`
      : `<div class="container quick-grid"><div class="quick-intro"><b>우리 조직에 맞는 방식으로 시작하세요.</b><span>홈페이지는 제품을 소개하고, 실제 안전업무는 COREON Safety AX Cloud에서 수행합니다.</span></div><a href="https://app.coreon-global.com/free-diagnosis?source=coreon-home-quick" target="_blank" rel="noopener"><strong>3분 무료 안전진단</strong><small>첫 안전 우선순위를 빠르게 확인</small></a><a class="download" href="/download.html"><strong>다운로드 · 설치</strong><small>Windows·Android·iPhone·Mac 설치 안내</small></a><a class="app" href="https://app.coreon-global.com/login.html" target="_blank" rel="noopener"><strong>Safety AX 열기</strong><small>동일한 Cloud 계정으로 바로 업무 시작</small></a></div>`;
    hero.insertAdjacentElement('afterend',quick);
  }

  const main=document.querySelector('main');
  if(main&&!document.querySelector('.safety-legend')){
    const legend=document.createElement('div');
    legend.className='container safety-legend';
    legend.setAttribute('aria-label',en?'Safety status color legend':'안전 상태 색상 안내');
    legend.innerHTML=`<span class="safety-legend-label">${en?'Safety status':'안전 상태'}</span><span class="safety-status safety-info">${en?'AI / Info':'AI·정보'}</span><span class="safety-status safety-ok">${en?'Verified':'정상·검증'}</span><span class="safety-status safety-watch">${en?'Caution':'주의'}</span><span class="safety-status safety-high">${en?'High risk':'고위험'}</span><span class="safety-status safety-critical">${en?'Critical':'Critical'}</span>`;
    const first=main.firstElementChild;
    if(first) main.insertBefore(legend,first); else main.appendChild(legend);
  }
})();
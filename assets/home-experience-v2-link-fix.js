(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;
  const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
  const download=ko?'/download.html?source=homepage-free-start':'/en/download.html?source=en-homepage-free-start';
  const login=ko?'https://app.coreon-global.com/login.html?source=coreon-home-login&next=%2Fsafety-workspace.html':'https://app.coreon-global.com/en/login.html?source=coreon-en-home-login&next=%2Fen%2Fsafety-workspace.html';
  const freeLabel=ko?'무료로 시작하기':'Start Free';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
  const addAtlasCard=(grid,item)=>{
    if([...grid.querySelectorAll('a')].some(a=>a.getAttribute('href')===item.href)) return;
    const a=document.createElement('a'); a.className='bx2-atlas-card'; a.href=item.href;
    a.innerHTML=`<small>${esc(item.kicker)}</small><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p>`; grid.appendChild(a);
  };
  const normalizeEntry=(root=document)=>{
    root.querySelectorAll('a').forEach(a=>{
      const label=(a.textContent||'').trim();
      if((ko&&label==='무료로 시작하기')||(!ko&&/^(start free|free start|get started free)$/i.test(label))){
        a.href=download;
        a.dataset.coreonEntry='install-center';
      }
      if(/고객(?: workspace)? 로그인|기존 고객 로그인|^(sign in|login|customer workspace login)$/i.test(label)){
        a.href=login;
        a.dataset.coreonEntry='authenticated-login';
      }
    });
  };
  const mountCommercialEntry=()=>{
    const hero=document.querySelector('.hero .ctas');
    if(hero&&!hero.querySelector('[data-coreon-commercial-free]')){
      const currentPrimary=hero.querySelector('.btn.primary');
      if(currentPrimary){currentPrimary.classList.remove('primary');currentPrimary.classList.add('light');}
      const free=document.createElement('a');
      free.className='btn primary'; free.href=download; free.textContent=freeLabel;
      free.dataset.coreonCommercialFree='hero'; free.dataset.coreonEntry='install-center';
      hero.prepend(free);
    }
    const band=document.querySelector('.cta-band .ctas');
    if(band&&!band.querySelector('[data-coreon-commercial-free]')){
      const currentPrimary=band.querySelector('.btn.primary');
      if(currentPrimary){currentPrimary.classList.remove('primary');currentPrimary.classList.add('light');}
      const free=document.createElement('a');
      free.className='btn primary'; free.href=download; free.textContent=freeLabel;
      free.dataset.coreonCommercialFree='decision'; free.dataset.coreonEntry='install-center';
      band.prepend(free);
    }
    const actions=document.querySelector('.header .actions');
    if(actions&&!actions.querySelector('[data-coreon-commercial-free]')){
      const free=document.createElement('a');
      free.className='pill dark'; free.href=download; free.textContent=freeLabel;
      free.dataset.coreonCommercialFree='header'; free.dataset.coreonEntry='install-center';
      const consultation=[...actions.querySelectorAll('a')].find(a=>/도입 상담|contact|consult/i.test(a.textContent||''));
      if(consultation){consultation.classList.remove('dark');}
      actions.appendChild(free);
    }
    normalizeEntry();
  };
  const prehide=document.createElement('style'); prehide.id='coreon-hero-prehide'; prehide.textContent='.bx2-stage{visibility:hidden;opacity:0}.bx2-stage.coreon-svg-ready{visibility:visible;opacity:1}'; document.head.appendChild(prehide);
  const loadFinalPolish=()=>{
    if(!document.getElementById('coreon-home-final-polish-css')){const css=document.createElement('link');css.id='coreon-home-final-polish-css';css.rel='stylesheet';css.href='/assets/home-final-polish.css?v=20260829i';document.head.appendChild(css);}
    if(!document.getElementById('coreon-home-final-polish-js')){const js=document.createElement('script');js.id='coreon-home-final-polish-js';js.src='/assets/home-final-polish.js?v=20260829i';js.defer=true;document.body.appendChild(js);}
  };
  const loadMobiusSafetyLoop=()=>{
    if(!document.getElementById('coreon-home-mobius-css')){const css=document.createElement('link');css.id='coreon-home-mobius-css';css.rel='stylesheet';css.href='/assets/home-mobius-safety-loop.css?v=20260829i';document.head.appendChild(css);}
    if(!document.getElementById('coreon-home-mobius-js')){const js=document.createElement('script');js.id='coreon-home-mobius-js';js.src='/assets/home-mobius-safety-loop.js?v=20260829i';js.defer=true;document.body.appendChild(js);}
  };
  const apply=()=>{
    mountCommercialEntry();
    const primary=document.querySelector('.bx2-btn.primary'); if(primary) primary.href=download;
    const riskCard=[...document.querySelectorAll('.bx2-atlas-card')].find(a=>/RISK ENGINEERING/i.test(a.textContent||'')); if(riskCard) riskCard.href=ko?'/insurance-risk-engineering.html':'/en/insurance-risk-engineering.html';
    const grid=document.querySelector('.bx2-atlas-grid');
    if(grid){
      const extra=ko?[
        {kicker:'CONTRACTOR',title:'도급·협력사 안전관리',copy:'원청·발주처·협력사의 미조치·기한·증빙과 승인상태를 연결합니다.',href:'/guides/contractor-safety-management.html'},
        {kicker:'SAFETY OPERATIONS',title:'도급·다현장·프로젝트 운영',copy:'안전업무와 현장 운영정보를 책임·기한·Evidence 중심으로 확장합니다.',href:'/safety-operations.html'},
        {kicker:'SAFETY AVATAR',title:'위험인지·대화형 안전훈련',copy:'KOSHA-grounded 시나리오와 Human Review를 Safety AX 실행 흐름으로 연결합니다.',href:'/safety-avatar.html'}
      ]:[
        {kicker:'CONTRACTOR',title:'Contractor safety management',copy:'Connect principals, contractors, deadlines, evidence and review status.',href:'/guides/contractor-safety-management.html'},
        {kicker:'SAFETY OPERATIONS',title:'Contractor · multi-site · project operations',copy:'Extend safety work across operating sites using ownership, deadlines and evidence.',href:'/en/safety-operations.html'},
        {kicker:'SAFETY AVATAR',title:'Risk-awareness conversational training',copy:'Connect KOSHA-grounded scenarios and Human Review to the Safety AX workflow.',href:'/en/safety-avatar.html'}
      ]; extra.forEach(x=>addAtlasCard(grid,x));
    }
    const nav=[...document.querySelectorAll('.header .links a')];
    nav.forEach(a=>{const text=(a.textContent||'').trim();if(!ko&&text==='Product')a.href='/en/product.html';if(!ko&&/Risk Engineering/i.test(text))a.href='/en/insurance-risk-engineering.html';if(ko&&text==='제품')a.href='/product.html';if(ko&&/보험·리스크/.test(text))a.href='/insurance-risk-engineering.html';});
    loadFinalPolish(); loadMobiusSafetyLoop();
  };
  let tries=0; const timer=setInterval(()=>{tries+=1;if(document.querySelector('.hero')||document.querySelector('.bx2-hero')||tries>30){clearInterval(timer);apply();}},30);
  const observer=new MutationObserver(()=>normalizeEntry());
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();
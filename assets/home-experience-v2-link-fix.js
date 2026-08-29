(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const addAtlasCard=(grid,item)=>{
    if([...grid.querySelectorAll('a')].some(a=>a.getAttribute('href')===item.href)) return;
    const a=document.createElement('a');
    a.className='bx2-atlas-card';
    a.href=item.href;
    a.innerHTML=`<small>${esc(item.kicker)}</small><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p>`;
    grid.appendChild(a);
  };
  const apply=()=>{
    const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
    const primary=document.querySelector('.bx2-btn.primary');
    if(primary) primary.href=ko?'/product.html':'/en/product.html';
    const riskCard=[...document.querySelectorAll('.bx2-atlas-card')].find(a=>/RISK ENGINEERING/i.test(a.textContent||''));
    if(riskCard) riskCard.href=ko?'/insurance-risk-engineering.html':'/en/insurance-risk-engineering.html';
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
      ];
      extra.forEach(x=>addAtlasCard(grid,x));
    }
    const nav=[...document.querySelectorAll('.header .links a')];
    nav.forEach(a=>{
      const text=(a.textContent||'').trim();
      if(!ko&&text==='Product') a.href='/en/product.html';
      if(!ko&&/Risk Engineering/i.test(text)) a.href='/en/insurance-risk-engineering.html';
      if(ko&&text==='제품') a.href='/product.html';
      if(ko&&/보험·리스크/.test(text)) a.href='/insurance-risk-engineering.html';
    });
  };
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(document.querySelector('.bx2-hero')||tries>30){clearInterval(timer);apply();}
  },50);
})();
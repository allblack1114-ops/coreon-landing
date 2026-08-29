(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;
  const apply=()=>{
    const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
    const primary=document.querySelector('.bx2-btn.primary');
    if(primary) primary.href=ko?'/product.html':'/en/product.html';
    const riskCard=[...document.querySelectorAll('.bx2-atlas-card')].find(a=>/RISK ENGINEERING/i.test(a.textContent||''));
    if(riskCard) riskCard.href=ko?'/insurance-risk-engineering.html':'/en/insurance-risk-engineering.html';
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
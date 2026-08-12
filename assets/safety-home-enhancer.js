(()=>{
  document.body.classList.add('coreon-safety-public');
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

  const main=document.querySelector('main');
  if(main&&!document.querySelector('.safety-legend')){
    const legend=document.createElement('div');
    legend.className='container safety-legend';
    legend.setAttribute('aria-label',document.documentElement.lang==='en'?'Safety status color legend':'안전 상태 색상 안내');
    const en=document.documentElement.lang==='en';
    legend.innerHTML=`<span class="safety-legend-label">${en?'Safety status':'안전 상태'}</span><span class="safety-status safety-info">${en?'AI / Info':'AI·정보'}</span><span class="safety-status safety-ok">${en?'Verified':'정상·검증'}</span><span class="safety-status safety-watch">${en?'Caution':'주의'}</span><span class="safety-status safety-high">${en?'High risk':'고위험'}</span><span class="safety-status safety-critical">${en?'Critical':'Critical'}</span>`;
    const first=main.firstElementChild;
    if(first) main.insertBefore(legend,first); else main.appendChild(legend);
  }
})();
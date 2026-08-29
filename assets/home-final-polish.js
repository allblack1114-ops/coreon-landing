(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;

  const apply=()=>{
    const hero=document.querySelector('.bx2-hero');
    const atlas=document.querySelector('.bx2-atlas-grid');
    if(!hero||!atlas) return false;
    const ko=document.documentElement.lang.toLowerCase().startsWith('ko');

    const title=hero.querySelector('.bx2-title');
    if(title && !title.dataset.finalPolish){
      title.dataset.finalPolish='1';
      title.innerHTML=ko
        ? '<span class="mainline">위험을 발견하고,</span><span class="accent">끝까지 줄입니다.</span>'
        : '<span class="mainline">Find risk.</span><span class="accent">Reduce it to the end.</span>';
    }

    const groupDefs=ko ? [
      ['FIELD EXECUTION','현장 실행',['SAFETY EVENT','RISK ASSESSMENT','TBM','EVIDENCE']],
      ['OPERATIONS & ORGANIZATION','운영·조직',['RUNTIME','CONTRACTOR','SAFETY OPERATIONS','ENTERPRISE','PUBLIC']],
      ['INTELLIGENCE & EXPANSION','Intelligence·확장',['KOSHA','SAFETY AVATAR','VISION EDGE','RISK ENGINEERING']],
      ['TRUST & IP','신뢰·기술자산',['TRUST','SAFETY IP']]
    ] : [
      ['FIELD EXECUTION','Field execution',['SAFETY EVENT','RISK ASSESSMENT','TBM','EVIDENCE']],
      ['OPERATIONS & ORGANIZATION','Operations & organization',['RUNTIME','CONTRACTOR','SAFETY OPERATIONS','ENTERPRISE','PUBLIC']],
      ['INTELLIGENCE & EXPANSION','Intelligence & expansion',['KOSHA','SAFETY AVATAR','VISION EDGE','RISK ENGINEERING']],
      ['TRUST & IP','Trust & IP',['TRUST','SAFETY IP']]
    ];
    if(!atlas.dataset.grouped){
      const cards=[...atlas.querySelectorAll(':scope > .bx2-atlas-card')];
      if(cards.length>=12){
        atlas.dataset.grouped='1';
        atlas.innerHTML='';
        const byKey=new Map(cards.map(card=>[(card.querySelector('small')?.textContent||'').trim().toUpperCase(),card]));
        groupDefs.forEach(([eyebrow,label,keys])=>{
          const group=document.createElement('section');
          group.className='bx2-atlas-group';
          group.innerHTML=`<header><small>${eyebrow}</small><h3>${label}</h3></header><div class="bx2-atlas-subgrid"></div>`;
          const grid=group.querySelector('.bx2-atlas-subgrid');
          keys.forEach(key=>{const card=byKey.get(key);if(card)grid.appendChild(card)});
          atlas.appendChild(group);
        });
        cards.filter(c=>!c.parentElement?.classList.contains('bx2-atlas-subgrid')).forEach(c=>atlas.appendChild(c));
      }
    }

    const sceneLabels=[
      ['CUSTOMER PROBLEM','scene-problem'],['INDUSTRY APPLICATIONS','scene-industry'],
      ['RISK ENGINEERING & INSURANCE READINESS','scene-risk'],['ENTERPRISE CONTROL','scene-enterprise'],
      ['PILOT & VALIDATION','scene-pilot'],['OFFICIAL PLANS','scene-plans'],
      ['START COREON','scene-start'],['TRUST & GOVERNANCE','scene-trust']
    ];
    const all=[...document.querySelectorAll('small,span,div,p')];
    sceneLabels.forEach(([label,cls])=>{
      const marker=all.find(el=>(el.textContent||'').trim()===label);
      const section=marker?.closest('section');
      if(section)section.classList.add('bx2-late-scene',cls);
    });

    document.documentElement.dataset.coreonFinalPolish='1';
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(apply()||tries>60)clearInterval(timer);
  },60);
})();
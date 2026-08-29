(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;

  const apply=()=>{
    const stage=document.querySelector('.bx2-stage');
    if(!stage || stage.dataset.mobiusLoop==='1') return false;
    const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
    stage.dataset.mobiusLoop='1';
    stage.classList.add('coreon-mobius-stage');

    const labels=ko?[
      ['01','HAZARD','위험 발견'],
      ['02','HUMAN REVIEW','사람 검토'],
      ['03','ACTION','개선조치'],
      ['04','EVIDENCE','증빙'],
      ['05','RESIDUAL RISK','잔여위험 재평가'],
      ['06','SAFE CLOSURE','안전한 종결']
    ]:[
      ['01','HAZARD','Discovery'],
      ['02','HUMAN REVIEW','Human control'],
      ['03','ACTION','Corrective action'],
      ['04','EVIDENCE','Verified evidence'],
      ['05','RESIDUAL RISK','Reassessment'],
      ['06','SAFE CLOSURE','Verified closure']
    ];

    const nodeMarkup=labels.map((x,i)=>`<div class="mobius-step s${i+1}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('');

    stage.innerHTML=`
      <div class="mobius-ambient" aria-hidden="true"></div>
      <svg class="mobius-svg" viewBox="0 0 900 620" role="img" aria-label="COREON Safety AX continuous safety execution loop">
        <defs>
          <linearGradient id="mobiusStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2f9fd9"/>
            <stop offset="46%" stop-color="#72e8ff"/>
            <stop offset="72%" stop-color="#19c4ab"/>
            <stop offset="100%" stop-color="#2a8ed2"/>
          </linearGradient>
          <filter id="mobiusGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <path id="mobiusPath" d="M112 312 C170 95 360 110 449 304 C540 500 730 519 793 312 C728 102 541 118 449 314 C355 507 168 522 112 312 Z"/>
        </defs>
        <g class="mobius-halo">
          <use href="#mobiusPath" class="mobius-wide"/>
          <use href="#mobiusPath" class="mobius-mid"/>
          <use href="#mobiusPath" class="mobius-core-line"/>
          <use href="#mobiusPath" class="mobius-dash"/>
        </g>
        <g class="mobius-flow-dots">
          <circle r="7" class="flow-dot d1"><animateMotion dur="8s" repeatCount="indefinite"><mpath href="#mobiusPath"/></animateMotion></circle>
          <circle r="4" class="flow-dot d2"><animateMotion dur="8s" begin="-2.7s" repeatCount="indefinite"><mpath href="#mobiusPath"/></animateMotion></circle>
          <circle r="5" class="flow-dot d3"><animateMotion dur="8s" begin="-5.3s" repeatCount="indefinite"><mpath href="#mobiusPath"/></animateMotion></circle>
        </g>
      </svg>
      <div class="mobius-core-label"><b>COREON<br>Safety AX</b><small>EXECUTION ENGINE</small></div>
      ${nodeMarkup}
    `;

    document.documentElement.dataset.coreonMobiusSafetyLoop='1';
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(apply()||tries>60) clearInterval(timer);
  },60);
})();
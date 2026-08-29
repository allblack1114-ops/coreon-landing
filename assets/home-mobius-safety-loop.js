(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;

  const apply=()=>{
    const stage=document.querySelector('.bx2-stage');
    if(!stage || stage.dataset.mobiusLoop==='1') return false;
    const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
    stage.dataset.mobiusLoop='1';
    stage.classList.add('coreon-mobius-stage','coreon-reference-mobius');

    const labels=ko?[
      ['01','HAZARD','위험 발견'],
      ['02','KOSHA','공식 참고근거'],
      ['03','HUMAN REVIEW','사람 검토'],
      ['04','ACTION','개선조치'],
      ['05','EVIDENCE','증빙'],
      ['06','RESIDUAL RISK','잔여위험 재평가'],
      ['07','SAFE CLOSURE','안전한 종결']
    ]:[
      ['01','HAZARD','Discovery'],
      ['02','KOSHA','Public reference'],
      ['03','HUMAN REVIEW','Human control'],
      ['04','ACTION','Corrective action'],
      ['05','EVIDENCE','Verified evidence'],
      ['06','RESIDUAL RISK','Reassessment'],
      ['07','SAFE CLOSURE','Verified closure']
    ];

    const nodeMarkup=labels.map((x,i)=>`<div class="mobius-step s${i+1}"><small>${x[0]}</small><b>${x[1]}</b><span>${x[2]}</span></div>`).join('');

    stage.innerHTML=`
      <div class="mobius-reference-wrap" aria-hidden="true">
        <img class="mobius-reference-art" src="/assets/coreon-mobius-hero-reference.svg?v=20260829c" alt="">
        <svg class="mobius-motion-overlay" viewBox="0 0 920 670">
          <defs>
            <filter id="motionGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <path id="motionPath" d="M80 335 C145 90 350 105 455 315 C560 525 765 540 840 335 C765 120 565 125 455 340 C345 545 145 545 80 335"/>
          </defs>
          <use href="#motionPath" class="mobius-energy-line"/>
          <use href="#motionPath" class="mobius-energy-dash"/>
          <circle r="8" class="mobius-energy-dot d1"><animateMotion dur="7.6s" repeatCount="indefinite"><mpath href="#motionPath"/></animateMotion></circle>
          <circle r="5" class="mobius-energy-dot d2"><animateMotion dur="7.6s" begin="-2.5s" repeatCount="indefinite"><mpath href="#motionPath"/></animateMotion></circle>
          <circle r="6" class="mobius-energy-dot d3"><animateMotion dur="7.6s" begin="-5s" repeatCount="indefinite"><mpath href="#motionPath"/></animateMotion></circle>
        </svg>
      </div>
      <div class="mobius-core-label"><b>COREON<br>Safety AX</b><small>EXECUTION ENGINE</small></div>
      ${nodeMarkup}
    `;

    document.documentElement.dataset.coreonMobiusSafetyLoop='reference-v2';
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(apply()||tries>80) clearInterval(timer);
  },60);
})();
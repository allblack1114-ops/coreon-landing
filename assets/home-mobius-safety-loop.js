(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;

  const node=(id,x,y,title,sub,icon,delay,side='right')=>{
    const tx=side==='left'?-48:48;
    const anchor=side==='left'?'end':'start';
    return `<g class="coreon-svg-node n${id}" transform="translate(${x} ${y})" style="--node-delay:${delay}s">
      <circle class="node-halo" r="39"/><circle class="node-ring" r="31"/>${icon}
      <text class="node-title" x="${tx}" y="-2" text-anchor="${anchor}">${title}</text>
      <text class="node-sub" x="${tx}" y="19" text-anchor="${anchor}">${sub}</text>
    </g>`;
  };

  const icons={
    hazard:'<circle class="node-icon" cx="-3" cy="-4" r="12"/><path class="node-icon" d="M6 5l10 10"/>',
    kosha:'<path class="node-icon" d="M0-18l14 5v11c0 11-7 18-14 22-7-4-14-11-14-22v-11z"/><path class="node-icon" d="M-6 0l4 4 8-9"/>',
    human:'<circle class="node-icon" cy="-8" r="8"/><path class="node-icon" d="M-15 17c2-10 8-15 15-15s13 5 15 15"/>',
    action:'<circle class="node-icon" r="15"/><path class="node-icon" d="M-8 0l6 6 11-13"/>',
    evidence:'<path class="node-icon" d="M-11-17h15l9 9v25h-24zM4-17v9h9M-5 1h12M-5 8h12"/>',
    residual:'<path class="node-icon" d="M0-18l14 5v11c0 11-7 18-14 22-7-4-14-11-14-22v-11z"/><path class="node-icon" d="M-7 1l5 5 9-10"/>',
    closure:'<rect class="node-icon" x="-12" y="-4" width="24" height="20" rx="3"/><path class="node-icon" d="M-7-4v-7a7 7 0 0114 0v7M0 3v6"/>'
  };

  const apply=()=>{
    const stage=document.querySelector('.bx2-stage');
    if(!stage || stage.dataset.singleSvgHero==='1') return false;
    const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
    stage.dataset.singleSvgHero='1';
    stage.className='bx2-stage coreon-single-svg-stage';

    const labels=ko?{
      hazard:['HAZARD','위험 발견'],kosha:['KOSHA','공식 참고근거'],human:['HUMAN REVIEW','사람 검토'],action:['ACTION','개선조치'],evidence:['EVIDENCE','증빙'],residual:['RESIDUAL RISK','잔여위험 재평가'],closure:['SAFE CLOSURE','안전한 종결']
    }:{
      hazard:['HAZARD','Risk discovery'],kosha:['KOSHA','Public reference'],human:['HUMAN REVIEW','Human control'],action:['ACTION','Corrective action'],evidence:['EVIDENCE','Verified proof'],residual:['RESIDUAL RISK','Reassessment'],closure:['SAFE CLOSURE','Verified closure']
    };

    stage.innerHTML=`<svg class="coreon-safety-loop-svg" viewBox="0 0 920 670" role="img" aria-label="COREON Safety AX closed-loop safety execution">
      <defs>
        <linearGradient id="loopGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b62d7"/><stop offset=".28" stop-color="#0aa5ff"/><stop offset=".52" stop-color="#65eaff"/><stop offset=".73" stop-color="#087de9"/><stop offset="1" stop-color="#0759c6"/></linearGradient>
        <linearGradient id="loopHighlight" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#d9fbff"/><stop offset=".45" stop-color="#61e9ff"/><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#44d8ff"/></linearGradient>
        <filter id="loopGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="dotGlow" x="-120%" y="-120%" width="340%" height="340%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <path id="safetyLoopPath" d="M138 338 C190 122 350 124 459 320 C566 512 726 519 792 338 C728 157 567 158 459 348 C350 544 188 548 138 338"/>
      </defs>
      <g class="ambient-orbits"><ellipse cx="465" cy="337" rx="380" ry="272"/><ellipse cx="465" cy="337" rx="328" ry="235"/></g>
      <g class="loop-ribbon"><use href="#safetyLoopPath" class="loop-shadow"/><use href="#safetyLoopPath" class="loop-main"/><use href="#safetyLoopPath" class="loop-inner"/><use href="#safetyLoopPath" class="loop-spark"/></g>
      <g class="loop-particles">
        <circle r="7" class="light-dot dot1"><animateMotion dur="8.6s" repeatCount="indefinite"><mpath href="#safetyLoopPath"/></animateMotion></circle>
        <circle r="4.5" class="light-dot dot2"><animateMotion dur="8.6s" begin="-2.85s" repeatCount="indefinite"><mpath href="#safetyLoopPath"/></animateMotion></circle>
        <circle r="5.5" class="light-dot dot3"><animateMotion dur="8.6s" begin="-5.7s" repeatCount="indefinite"><mpath href="#safetyLoopPath"/></animateMotion></circle>
      </g>
      <g class="coreon-engine-label"><text x="666" y="318">COREON</text><text x="666" y="355">Safety AX</text><text class="engine-sub" x="666" y="382">EXECUTION ENGINE</text></g>
      ${node(1,118,112,labels.hazard[0],labels.hazard[1],icons.hazard,0)}
      ${node(2,452,72,labels.kosha[0],labels.kosha[1],icons.kosha,.45)}
      ${node(3,752,114,labels.human[0],labels.human[1],icons.human,.9)}
      ${node(4,842,338,labels.action[0],labels.action[1],icons.action,1.35,'right')}
      ${node(5,706,592,labels.evidence[0],labels.evidence[1],icons.evidence,1.8)}
      ${node(6,405,616,labels.residual[0],labels.residual[1],icons.residual,2.25)}
      ${node(7,76,342,labels.closure[0],labels.closure[1],icons.closure,2.7,'left')}
    </svg>`;
    requestAnimationFrame(()=>stage.classList.add('coreon-svg-ready'));
    document.documentElement.dataset.coreonHero='single-svg-v2';
    return true;
  };

  let tries=0; const timer=setInterval(()=>{tries+=1;if(apply()||tries>70)clearInterval(timer);},30);
})();
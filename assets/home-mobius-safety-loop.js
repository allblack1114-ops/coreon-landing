(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;

  const apply=()=>{
    const stage=document.querySelector('.bx2-stage');
    if(!stage || stage.dataset.approvedHero==='1') return false;
    stage.dataset.approvedHero='1';
    stage.classList.add('coreon-approved-hero-stage');
    stage.innerHTML=`
      <div class="coreon-approved-hero-wrap" aria-hidden="true">
        <img class="coreon-approved-hero-art" src="/assets/coreon-approved-loop-final.jpg?v=20260829h" alt="">
        <svg class="coreon-approved-motion" viewBox="0 0 850 707" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="approvedMotionGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="7" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <path id="approvedMotionPath" d="M55 353 C118 128 303 137 414 323 C530 520 715 516 795 351 C719 156 529 158 414 345 C302 530 120 528 55 353"/>
          </defs>
          <use href="#approvedMotionPath" class="approved-energy-line"/>
          <circle r="7" class="approved-light-dot d1"><animateMotion dur="8.8s" repeatCount="indefinite"><mpath href="#approvedMotionPath"/></animateMotion></circle>
          <circle r="4.5" class="approved-light-dot d2"><animateMotion dur="8.8s" begin="-2.9s" repeatCount="indefinite"><mpath href="#approvedMotionPath"/></animateMotion></circle>
          <circle r="5.5" class="approved-light-dot d3"><animateMotion dur="8.8s" begin="-5.8s" repeatCount="indefinite"><mpath href="#approvedMotionPath"/></animateMotion></circle>
        </svg>
      </div>`;
    document.documentElement.dataset.coreonApprovedHero='image-motion-v2';
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{tries+=1;if(apply()||tries>80)clearInterval(timer);},60);
})();
(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;
  const hideLegacyStage=()=>{
    const stage=document.querySelector('.bx2-stage');
    if(stage){
      stage.innerHTML='';
      stage.style.visibility='hidden';
      stage.style.opacity='0';
    }
  };
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    hideLegacyStage();
    if(document.querySelector('.bx2-stage')||tries>80) clearInterval(timer);
  },20);
})();
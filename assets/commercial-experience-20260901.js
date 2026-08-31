(() => {
  'use strict';
  const home=['/','/index.html','/en/','/en/index.html'];
  if(!home.includes(location.pathname)) return;
  const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
  const setMeta=(selector,value)=>{const node=document.querySelector(selector);if(node)node.setAttribute('content',value)};
  const hero=document.querySelector('.hero');
  if(!hero) return;
  const h1=hero.querySelector('h1');
  const lead=hero.querySelector('.lead');
  const badge=hero.querySelector('.badge');
  if(ko){
    document.title='COREON Safety AX Agent | 중대재해 예방·위험성평가·TBM 안전관리 시스템';
    setMeta('meta[name="description"]','중대재해 예방을 위해 위험 발견부터 담당자·기한, 개선조치, 사진·문서 증빙, 잔여위험 재확인과 사람 승인 종결까지 하나의 흐름으로 관리하는 COREON Safety AX Agent. 공공기관·대기업·건설·제조·물류·식품·에너지·자동차·플랜트·5인 이상 사업장을 위한 산업안전 실행 시스템입니다.');
    setMeta('meta[property="og:title"]','중대재해, 발견보다 중요한 것은 끝까지 조치하는 것입니다 | COREON');
    setMeta('meta[property="og:description"]','위험 발견 → 담당자·기한 → 개선조치 → 증빙 → 잔여위험 재확인 → 사람 승인 종결. COREON Safety AX Agent가 안전업무의 누락을 하나의 흐름으로 관리합니다.');
    if(badge) badge.textContent='중대재해 예방 · 안전업무 실행 시스템';
    if(h1) h1.innerHTML='중대재해,<br><span data-coreon-risk-accent>발견만으로는 끝나지 않습니다.</span><br><em>조치와 증빙, 재확인까지 이어져야 합니다.</em>';
    if(lead) lead.innerHTML='COREON Safety AX Agent는 <strong>위험 발견부터 담당자·기한, 개선조치, 사진·문서 증빙, 잔여위험 재확인과 사람 승인 종결까지</strong> 안전업무의 누락을 하나의 흐름으로 관리합니다. AI는 판단을 돕고, 최종 안전상태 변경은 사람이 확인합니다.';
    const why=document.querySelector('#why .head h2'); if(why) why.innerHTML='사고를 막기 위해 필요한 것은<br>위험 발견 이후의 실행입니다.';
    const whyP=document.querySelector('#why .head p'); if(whyP) whyP.textContent='보고서 한 장을 더 만드는 것이 아니라, 누가 언제까지 무엇을 조치했고 어떤 증거가 남았으며 위험이 실제로 낮아졌는지를 끝까지 확인해야 합니다.';
    const appHead=document.querySelector('#applications .head h2'); if(appHead) appHead.innerHTML='공공기관부터 5인 이상 사업장까지,<br>필요한 것은 같은 안전 실행 흐름입니다.';
    const appP=document.querySelector('#applications .head p'); if(appP) appP.textContent='건설·제조·물류·식품·에너지·자동차·플랜트 등 업종은 달라도 위험 발견, 책임 지정, 기한 관리, 개선조치, 증빙, 잔여위험 재확인과 승인이라는 핵심 질문은 같습니다.';
    document.querySelectorAll('.proof span').forEach((n,i)=>{const labels=['KOSHA 기반 참고근거','사람 검토·승인','조치·증빙 추적','잔여위험 재평가','Fail-Closed 종결'];if(labels[i])n.textContent=labels[i]});
  }else{
    document.title='COREON Safety AX Agent | Serious-Accident Prevention & Safety Execution';
    setMeta('meta[name="description"]','COREON Safety AX Agent connects hazard discovery, ownership, deadlines, corrective action, evidence, residual-risk reassessment and human-approved closure for public institutions, enterprises and field operations.');
    setMeta('meta[property="og:title"]','Safety does not end when a hazard is found | COREON Safety AX Agent');
    setMeta('meta[property="og:description"]','Find → assign → correct → prove → reassess → human-approved close. COREON connects the execution steps that are often lost after a hazard is reported.');
    if(badge) badge.textContent='Serious-Accident Prevention · Safety Execution System';
    if(h1) h1.innerHTML='Safety does not end<br>when a hazard is found.<br><em>Action, evidence and reassessment must follow.</em>';
    if(lead) lead.innerHTML='COREON Safety AX Agent connects <strong>hazard discovery, accountable ownership, deadlines, corrective action, evidence, residual-risk reassessment and human-approved closure</strong> in one controlled workflow. AI assists; people retain authority over final safety-state decisions.';
    const why=document.querySelector('#why .head h2'); if(why) why.innerHTML='The real safety gap begins<br>after a hazard is reported.';
    const appHead=document.querySelector('#applications .head h2'); if(appHead) appHead.innerHTML='From public institutions to field operations,<br>the execution questions are the same.';
  }
})();
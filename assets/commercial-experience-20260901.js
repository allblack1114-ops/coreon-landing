(() => {
  'use strict';
  const home=['/','/index.html','/en/','/en/index.html'];
  if(!home.includes(location.pathname)) return;
  const ko=document.documentElement.lang.toLowerCase().startsWith('ko');
  const setMeta=(selector,value)=>{const node=document.querySelector(selector);if(node)node.setAttribute('content',value)};
  const hero=document.querySelector('.hero');
  if(!hero) return;

  const download=ko?'/download.html?source=homepage-hero-free-start':'/en/download.html?source=en-homepage-hero-free-start';
  const product=ko?'/product.html':'/en/product.html';
  const consult=ko?'mailto:contact@coreon-global.com?subject=COREON%20Safety%20AX%20Agent%20도입%20상담':'mailto:contact@coreon-global.com?subject=COREON%20Safety%20AX%20Agent%20Consultation';
  const login=ko?'https://app.coreon-global.com/login.html?source=coreon-home-login&next=%2Fsafety-workspace.html':'https://app.coreon-global.com/en/login.html?source=coreon-en-home-login&next=%2Fen%2Fsafety-workspace.html';

  if(ko){
    document.title='COREON Safety AX Agent | 중대재해 예방·위험성평가·TBM 안전관리 시스템';
    setMeta('meta[name="description"]','중대재해 예방을 위해 위험 발견부터 담당자·기한, 개선조치, 사진·문서 증빙, 잔여위험 재확인과 사람 승인 종결까지 하나의 흐름으로 관리하는 COREON Safety AX Agent. 공공기관·대기업·건설·제조·물류·식품·에너지·자동차·플랜트·5인 이상 사업장을 위한 산업안전 실행 시스템입니다.');
    setMeta('meta[property="og:title"]','중대재해 예방, 발견보다 중요한 것은 끝까지 조치하는 것입니다 | COREON');
    setMeta('meta[property="og:description"]','위험 발견 → 담당자·기한 → 개선조치 → 증빙 → 잔여위험 재확인 → 사람 승인 종결. COREON Safety AX Agent가 안전업무의 누락을 하나의 흐름으로 관리합니다.');
  }else{
    document.title='COREON Safety AX Agent | Serious-Accident Prevention & Safety Execution';
    setMeta('meta[name="description"]','COREON Safety AX Agent connects hazard discovery, ownership, deadlines, corrective action, evidence, residual-risk reassessment and human-approved closure for public institutions, enterprises and field operations.');
    setMeta('meta[property="og:title"]','Serious-accident prevention requires action to a verified close | COREON');
    setMeta('meta[property="og:description"]','Find → assign → correct → prove → reassess → human-approved close. COREON connects the execution steps that are often lost after a hazard is reported.');
  }

  const copy=ko?{
    eyebrow:'중대재해 예방 · 산업안전 실행 시스템',
    line1:'중대재해 예방,',
    line2:'발견보다 중요한 것은',
    line3:'끝까지 조치하는 것입니다.',
    lead:'위험 발견부터 담당자·기한, 개선조치, 증빙, 잔여위험 재확인과 사람 승인 종결까지. <strong>COREON Safety AX Agent가 안전업무의 누락을 하나의 실행 흐름으로 연결합니다.</strong>',
    free:'무료로 시작하기', product:'제품 보기', consult:'도입 상담', login:'기존 고객 로그인',
    strip:['공공기관','대기업','건설·플랜트','제조','물류','식품','에너지','자동차','5인 이상 사업장'],
    control:'SAFETY EXECUTION CONTROL', assurance:'Human Review · Fail-Closed',
    stages:[['01','위험 발견','사진·글·음성'],['02','책임·기한','담당자 지정'],['03','개선조치','통제 실행'],['04','증빙','전·후 기록'],['05','잔여위험','사람 재평가'],['06','종결','권한 승인']],
    gate:'증거와 재평가가 부족하면 종결하지 않습니다.',
    required:'REQUIRED', blocked:'BLOCKED', reopen:'REOPEN',
    proof:['KOSHA 기반 참고근거','사람 검토·승인','조치·증빙 추적','잔여위험 재평가','Fail-Closed 종결']
  }:{
    eyebrow:'SERIOUS-ACCIDENT PREVENTION · SAFETY EXECUTION',
    line1:'Serious-accident prevention',
    line2:'does not stop at finding risk.',
    line3:'It must reach a verified close.',
    lead:'From hazard discovery and accountable ownership to corrective action, evidence, residual-risk reassessment and human-approved closure. <strong>COREON connects the execution steps that are often lost after a hazard is reported.</strong>',
    free:'Start Free', product:'Explore Product', consult:'Contact Sales', login:'Customer Login',
    strip:['Public Sector','Enterprise','Construction & Plant','Manufacturing','Logistics','Food','Energy','Automotive','5+ Employee Sites'],
    control:'SAFETY EXECUTION CONTROL', assurance:'Human Review · Fail-Closed',
    stages:[['01','Find risk','Photo · text · voice'],['02','Own & due','Assign responsibility'],['03','Correct','Execute controls'],['04','Prove','Before · after evidence'],['05','Reassess','Human residual-risk review'],['06','Close','Authorized approval']],
    gate:'If evidence or reassessment is insufficient, closure is blocked.',
    required:'REQUIRED', blocked:'BLOCKED', reopen:'REOPEN',
    proof:['KOSHA reference intelligence','Human review & approval','Action & evidence traceability','Residual-risk reassessment','Fail-Closed closure']
  };

  hero.classList.add('coreon-commercial-hero');
  hero.innerHTML=`<div class="coreon-hero-orbit" aria-hidden="true"></div><div class="w coreon-hero-shell">
    <div class="coreon-hero-copy">
      <div class="coreon-eyebrow"><span></span>${copy.eyebrow}</div>
      <h1>${copy.line1}<br><span>${copy.line2}</span><br><em>${copy.line3}</em></h1>
      <p class="coreon-lead">${copy.lead}</p>
      <div class="coreon-hero-actions">
        <a class="coreon-action primary" href="${download}" data-coreon-commercial-free="hero">${copy.free}</a>
        <a class="coreon-action secondary" href="${product}">${copy.product}</a>
        <a class="coreon-action text" href="${consult}">${copy.consult} <b>→</b></a>
      </div>
      <div class="coreon-login-line"><span>${ko?'이미 사용 중이신가요?':'Already using COREON?'}</span><a href="${login}">${copy.login} →</a></div>
      <div class="coreon-proof-row">${copy.proof.map(x=>`<span>${x}</span>`).join('')}</div>
    </div>
    <div class="coreon-control-board" role="img" aria-label="${ko?'위험 발견부터 사람 승인 종결까지의 Safety Execution Control 흐름':'Safety Execution Control flow from risk discovery to human-approved closure'}">
      <div class="coreon-board-head"><div><small>${copy.control}</small><strong>${ko?'위험을 발견한 뒤가 진짜 시작입니다.':'Execution starts after a hazard is found.'}</strong></div><span>${copy.assurance}</span></div>
      <div class="coreon-stage-grid">${copy.stages.map(([n,t,d])=>`<div class="coreon-stage"><b>${n}</b><strong>${t}</strong><small>${d}</small></div>`).join('')}</div>
      <div class="coreon-gate-panel"><div><small>CLOSURE GATE</small><strong>${copy.gate}</strong></div><div class="coreon-gate-status"><span class="ok">${copy.required}</span><span class="blocked">${copy.blocked}</span><span class="reopen">${copy.reopen}</span></div></div>
    </div>
  </div><div class="coreon-industry-strip"><div class="w"><strong>${ko?'적용 대상':'Designed for'}</strong>${copy.strip.map(x=>`<span>${x}</span>`).join('')}</div></div>`;

  const why=document.querySelector('#why .head h2');
  const whyP=document.querySelector('#why .head p');
  const appHead=document.querySelector('#applications .head h2');
  const appP=document.querySelector('#applications .head p');
  if(ko){
    if(why) why.innerHTML='사고를 막기 위해 필요한 것은<br>위험 발견 이후의 실행입니다.';
    if(whyP) whyP.textContent='보고서 한 장을 더 만드는 것이 아니라, 누가 언제까지 무엇을 조치했고 어떤 증거가 남았으며 위험이 실제로 낮아졌는지를 끝까지 확인해야 합니다.';
    if(appHead) appHead.innerHTML='공공기관부터 5인 이상 사업장까지,<br>필요한 것은 같은 안전 실행 흐름입니다.';
    if(appP) appP.textContent='건설·제조·물류·식품·에너지·자동차·플랜트 등 업종은 달라도 위험 발견, 책임 지정, 기한 관리, 개선조치, 증빙, 잔여위험 재확인과 승인이라는 핵심 질문은 같습니다.';
  }else{
    if(why) why.innerHTML='The real safety gap begins<br>after a hazard is reported.';
    if(appHead) appHead.innerHTML='From public institutions to field operations,<br>the execution questions are the same.';
  }
})();
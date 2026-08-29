(() => {
  'use strict';
  const homePaths = ['/', '/index.html', '/en/', '/en/index.html'];
  if (!homePaths.includes(location.pathname)) return;
  if (document.documentElement.dataset.coreonBx2 === '1') return;
  document.documentElement.dataset.coreonBx2 = '1';
  document.body.classList.add('coreon-bx2');

  const ko = document.documentElement.lang.toLowerCase().startsWith('ko');
  const T = ko ? {
    eyebrow:'COREON SAFETY INTELLIGENCE · LIVE EXECUTION',
    title:'위험을 발견하고,|끝까지 줄입니다.',
    lead:'COREON Safety AX Agent는 <strong>위험 발견 → 사람 검토 → 담당자·기한 → 개선조치 → 증빙 → 잔여위험 재평가</strong>를 하나의 실행 흐름으로 연결합니다.',
    primary:'제품 살펴보기', secondary:'무료로 시작하기',
    micro:['KOSHA 공개 안전정보','Human Review','Evidence & Residual Risk'],
    nodes:[['HAZARD','현장 위험'],['HUMAN REVIEW','사람 검토'],['ACTION','개선조치'],['EVIDENCE','증빙'],['KOSHA','공식 참고근거'],['RESIDUAL RISK','재평가']],
    scroll:'SCROLL TO EXECUTION',
    theatreK:'PRODUCT EXPERIENCE', theatreTitle:'안전업무가 실제로 움직이는 과정을 보여줍니다.', theatreLead:'제품 화면을 설명하는 데서 끝나지 않고, 위험이 들어온 뒤 누가 책임지고 언제까지 조치하며 어떤 증빙을 남기고 어떻게 종결하는지까지 이어지는 흐름을 보여줍니다.',
    callouts:[['위험 발견','사진·음성·텍스트·아차사고'],['조치와 증빙','담당자·기한·전후 Evidence'],['종결 통제','잔여위험 재평가 후 승인']],
    intelK:'PUBLIC SAFETY INTELLIGENCE', intelTitle:'공식 안전데이터를 조회가 아니라 실행으로 연결합니다.', intelLead:'KOSHA 공개 공공데이터는 COREON의 판단을 대신하지 않습니다. 공식 재해사례·첨부 근거·최근 사고 흐름을 현장 Context와 연결하고, 사람이 검토한 근거만 실제 안전업무에 활용합니다.',
    sources:[['Knowledge','국내재해사례 본문','유사 사고·위험맥락·예방대책'],['Evidence','재해사례 첨부정보','원문·첨부자료·추적 가능한 근거'],['Freshness','건설업 일별 중대재해','최근 사고 흐름과 최신성 신호']],
    outputs:[['AI Candidate','관련 근거 후보와 이유'],['Human Review','안전관리자 검토·승인'],['Safety Execution','TBM·위험성평가·조치·보고']],
    governance:['Current source only for new evidence','Stale/LKG → 신규 근거 차단','출처·버전·조회시점 추적','최종 안전판단은 사람'],
    atlasK:'PRODUCT ATLAS', atlasTitle:'모든 기능은 설명에서 끝나지 않고, 각각의 제품 페이지로 연결됩니다.', atlasLead:'COREON Safety AX Agent의 핵심 기능과 운영영역을 독립 페이지로 확인할 수 있습니다. 실제 제품 사용은 설치센터 또는 인증된 로그인 경로를 통해 연결됩니다.',
    cards:[
      ['SAFETY EVENT','위험·아차사고 → Safety Event','현장 위험을 공식 사건으로 연결하고 책임·기한·조치를 추적합니다.','/safety-event-integration.html',true],
      ['RUNTIME','Safety AX 운영 흐름','실제 실행형 Safety AX 제품 구조와 운영 Runtime을 확인합니다.','/safety-ax-runtime.html'],
      ['RISK ASSESSMENT','위험성평가','위험요인 평가를 조치·증빙·잔여위험까지 연결합니다.','/guides/risk-assessment-action-management.html'],
      ['TBM','작업 전 안전회의','TBM에서 확인한 위험이 실제 조치로 이어지도록 관리합니다.','/guides/tbm-safety-management.html'],
      ['EVIDENCE','조치·증빙·잔여위험','조치 전후 Evidence와 재평가를 통해 종결 근거를 남깁니다.','/guides/safety-action-closure-platform.html'],
      ['KOSHA','KOSHA Safety Intelligence','공개 공공데이터의 Knowledge·Evidence·Freshness를 현장 판단에 연결합니다.','/guides/kosha-public-data-safety-intelligence.html'],
      ['ENTERPRISE','다사업장·본사 운영','본사·발주처·대기업의 다현장 운영과 미조치·기한초과를 관리합니다.','/enterprise-multisite.html'],
      ['PUBLIC','공공기관·조달','공공기관 실증·도입·조달 대응 구조와 증빙을 확인합니다.','/public-proof-procurement.html'],
      ['RISK ENGINEERING','보험·리스크관리','위험개선 이력을 고객 동의 기반 Risk Engineering 데이터로 확장합니다.','/insurance-risk-engineering.html',true],
      ['VISION EDGE','Vision Edge','카메라·Edge 후보 감지를 사람 검토 후 Safety Event로 연결하는 확장 구조입니다.','/vision-edge.html'],
      ['TRUST','신뢰·보안·거버넌스','Human Review, 접근통제, 개인정보, 증빙 무결성 원칙을 확인합니다.','/trust.html'],
      ['SAFETY IP','특허·기술자산','COREON의 등록특허와 산업안전 기술자산을 확인합니다.','/patents.html']
    ]
  } : {
    eyebrow:'COREON SAFETY INTELLIGENCE · LIVE EXECUTION',
    title:'Find risk.|Reduce it to the end.',
    lead:'COREON Safety AX Agent connects <strong>hazard discovery → human review → owner & due date → corrective action → evidence → residual-risk reassessment</strong> in one execution flow.',
    primary:'Explore the product', secondary:'Start free',
    micro:['KOSHA public safety data','Human Review','Evidence & Residual Risk'],
    nodes:[['HAZARD','Field risk'],['HUMAN REVIEW','Human control'],['ACTION','Corrective action'],['EVIDENCE','Verified evidence'],['KOSHA','Public safety reference'],['RESIDUAL RISK','Reassessment']],
    scroll:'SCROLL TO EXECUTION',
    theatreK:'PRODUCT EXPERIENCE', theatreTitle:'See safety work move from discovery to verified closure.', theatreLead:'COREON does more than display a dashboard. It connects the person responsible, the deadline, corrective action, evidence and residual-risk verification after a hazard is found.',
    callouts:[['Hazard discovery','Photo · voice · text · near miss'],['Action & evidence','Owner · due date · before/after proof'],['Closure control','Residual-risk reassessment before approval']],
    intelK:'PUBLIC SAFETY INTELLIGENCE', intelTitle:'Connect public safety data to execution, not just search.', intelLead:'KOSHA public data does not replace safety judgment. COREON links accident cases, evidence and recent-fatality freshness signals to field context, then requires human review before operational use.',
    sources:[['Knowledge','Accident case content','Context · accident type · preventive actions'],['Evidence','Case attachments','Source files and traceable evidence'],['Freshness','Daily fatality status','Recent accident trend and freshness signal']],
    outputs:[['AI Candidate','Relevant evidence candidates'],['Human Review','Authorized review and approval'],['Safety Execution','TBM · assessment · action · report']],
    governance:['Current sources for new evidence','Stale/LKG → block new evidence','Track source/version/retrieved time','Final safety judgment stays human'],
    atlasK:'PRODUCT ATLAS', atlasTitle:'Every major capability leads to a dedicated product page.', atlasLead:'Explore each COREON Safety AX capability independently. Actual product use continues through the install center or authenticated sign-in.',
    cards:[
      ['SAFETY EVENT','Hazard / Near-miss → Safety Event','Turn field hazards into governed events with owners, due dates and corrective actions.','/en/safety-event-integration.html',true],
      ['RUNTIME','Safety AX Runtime','Explore the operating model behind the Safety AX execution workflow.','/en/safety-ax-runtime.html'],
      ['RISK ASSESSMENT','Risk assessment','Connect identified hazards to corrective action, evidence and residual risk.','/guides/risk-assessment-action-management.html'],
      ['TBM','Toolbox meeting','Connect pre-work safety discussion to actual field action.','/guides/tbm-safety-management.html'],
      ['EVIDENCE','Action · Evidence · Residual risk','Keep before/after evidence and reassessment as closure proof.','/guides/safety-action-closure-platform.html'],
      ['KOSHA','KOSHA Safety Intelligence','Connect Knowledge, Evidence and Freshness from public safety data to field review.','/guides/kosha-public-data-safety-intelligence.html'],
      ['ENTERPRISE','Enterprise multi-site','Manage unresolved and overdue safety actions across sites.','/en/enterprise-multisite.html'],
      ['PUBLIC','Public sector / procurement','Review public-sector pilot, proof and procurement readiness.','/en/public-proof-procurement.html'],
      ['RISK ENGINEERING','Insurance / Risk Engineering','Extend verified risk-improvement history to consent-based Risk Engineering use.','/insurance-risk-engineering.html',true],
      ['VISION EDGE','Vision Edge','Connect machine-detected candidates to human review and governed events.','/vision-edge.html'],
      ['TRUST','Trust & governance','Review human control, access boundaries, privacy and evidence integrity.','/en/trust.html'],
      ['SAFETY IP','Patents & Safety IP','Explore COREON industrial-safety intellectual property.','/patents.html']
    ]
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const titleParts = T.title.split('|');
  const nodes = T.nodes.map((n,i)=>`<div class="bx2-node n${i+1}"><b>${esc(n[0])}</b><span>${esc(n[1])}</span></div>`).join('');
  const micro = T.micro.map(x=>`<span>${esc(x)}</span>`).join('');
  const calls = T.callouts.map((x,i)=>`<div class="bx2-callout c${i+1}"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('');
  const sources = T.sources.map(x=>`<div class="bx2-source"><b>${esc(x[0])} · ${esc(x[1])}</b><span>${esc(x[2])}</span></div>`).join('');
  const outputs = T.outputs.map(x=>`<div class="bx2-output"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('');
  const governance = T.governance.map(x=>`<span>${esc(x)}</span>`).join('');
  const cards = T.cards.map(x=>`<a class="bx2-atlas-card${x[4]?' featured':''}" href="${esc(x[3])}"><small>${esc(x[0])}</small><h3>${esc(x[1])}</h3><p>${esc(x[2])}</p></a>`).join('');

  const hero = document.createElement('section');
  hero.className='bx2-hero'; hero.id='experience';
  hero.innerHTML=`<div class="bx2-wrap"><div class="bx2-copy"><span class="bx2-eyebrow"><i></i>${esc(T.eyebrow)}</span><h1 class="bx2-title">${esc(titleParts[0])}<span class="accent">${esc(titleParts[1]||'')}</span></h1><p class="bx2-lead">${T.lead}</p><div class="bx2-actions"><a class="bx2-btn primary" href="/product.html">${esc(T.primary)}</a><a class="bx2-btn secondary" href="${ko?'/download.html?source=bx2-hero#install':'/en/download.html?source=bx2-hero#install'}">${esc(T.secondary)}</a></div><div class="bx2-micro">${micro}</div></div><div class="bx2-stage" aria-hidden="true"><div class="bx2-orbit"></div><div class="bx2-orbit o2"></div><div class="bx2-line l1"></div><div class="bx2-line l2"></div><div class="bx2-line l3"></div><div class="bx2-line l4"></div>${nodes}<div class="bx2-core"><div><b>COREON<br>Safety AX</b><small>EXECUTION ENGINE</small></div></div></div></div><div class="bx2-scroll">${esc(T.scroll)}</div>`;

  const theatre=document.createElement('section'); theatre.className='bx2-theatre'; theatre.id='product-theatre';
  theatre.innerHTML=`<div class="inner"><span class="bx2-section-kicker">${esc(T.theatreK)}</span><h2 class="bx2-section-title">${esc(T.theatreTitle)}</h2><p class="bx2-section-lead">${esc(T.theatreLead)}</p><div class="bx2-product-frame"><img src="/assets/coreon-ax-hero-product.svg" alt="COREON Safety AX Agent product experience"><div class="bx2-callouts">${calls}</div></div></div>`;

  const intel=document.createElement('section'); intel.className='bx2-intelligence'; intel.id='safety-intelligence';
  intel.innerHTML=`<div class="inner"><span class="bx2-section-kicker">${esc(T.intelK)}</span><h2 class="bx2-section-title">${esc(T.intelTitle)}</h2><p class="bx2-section-lead">${esc(T.intelLead)}</p><div class="bx2-dataflow"><div class="bx2-sources">${sources}</div><div class="bx2-engine"><div><b>COREON<br>Intelligence</b><small>GROUND → REVIEW → EXECUTE</small></div></div><div class="bx2-outputs">${outputs}</div></div><div class="bx2-governance">${governance}</div></div>`;

  const atlas=document.createElement('section'); atlas.className='bx2-atlas'; atlas.id='product-atlas';
  atlas.innerHTML=`<div class="inner"><span class="bx2-section-kicker">${esc(T.atlasK)}</span><h2 class="bx2-section-title">${esc(T.atlasTitle)}</h2><p class="bx2-section-lead">${esc(T.atlasLead)}</p><div class="bx2-atlas-grid">${cards}</div></div>`;

  const main=document.querySelector('main');
  const legacyHero=document.querySelector('.hero');
  if (!main || !legacyHero) return;
  main.insertBefore(hero, legacyHero);
  const problems=document.querySelector('#problems');
  if (problems) { main.insertBefore(theatre, problems); main.insertBefore(intel, problems); main.insertBefore(atlas, problems); }

  const nav=document.querySelector('.links');
  if(nav){
    const links=ko?[
      ['제품','/product.html'],['해결 과제','#problems'],['실행 흐름','#product-theatre'],['KOSHA','#safety-intelligence'],['보험·리스크','/insurance-risk-engineering.html'],['고객별 적용','/use-cases/'],['요금제','/pricing.html']
    ]:[
      ['Product','/product.html'],['Challenges','#problems'],['Execution','#product-theatre'],['KOSHA','#safety-intelligence'],['Risk Engineering','/insurance-risk-engineering.html'],['Use cases','/en/use-cases/'],['Pricing','/en/pricing.html']
    ];
    nav.innerHTML=links.map(x=>`<a href="${x[1]}">${esc(x[0])}</a>`).join('');
  }

  const frame=theatre.querySelector('.bx2-product-frame');
  if('IntersectionObserver' in window && frame){
    new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.28}).observe(frame);
  } else if(frame){frame.classList.add('in-view')}
})();

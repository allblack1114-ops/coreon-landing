(() => {
  if (document.getElementById('coreon-sales-assistant')) return;

  const isEN = ((document.documentElement.lang || '').toLowerCase().startsWith('en') || location.pathname.startsWith('/en/'));
  const T = isEN ? {
    title:'COREON Product Guide',
    sub:'Pricing · Users/Sites · Integration · PoC · KPI · Support',
    hello:'Hello. I answer using COREON Safety AX Agent’s current public product information. What would you like to know?',
    open:'COREON Product Guide',
    placeholder:'e.g. Can COREON integrate with our EHS?',
    ask:'Ask',
    note:'Product information assistant. It does not provide final safety or legal judgments. Custom pricing, device compatibility and SLA are confirmed after review.',
    faq:'Full FAQ',
    quick:['Pricing','How many users?','API / EHS integration','PoC','Customer references'],
    fallback:'I could not find an exact answer in the public FAQ. Please include a device name, number of sites/users, or the integration target, or contact COREON.'
  } : {
    title:'COREON 제품안내',
    sub:'가격 · 현장/사용자 · 연동 · PoC · KPI · 지원',
    hello:'안녕하세요. COREON Safety AX Agent의 공개된 최신 기준으로 답변합니다. 무엇이 궁금하신가요?',
    open:'COREON 제품안내',
    placeholder:'예: 우리 회사 EHS랑 연결되나요?',
    ask:'질문',
    note:'제품 안내용 도우미입니다. 안전·법률 최종판단을 제공하지 않으며, 맞춤 견적·장비 호환·SLA는 확인 후 확정합니다.',
    faq:'전체 FAQ',
    quick:['가격','몇 명까지?','API/EHS 연동','PoC','고객 사례'],
    fallback:'공개 FAQ에서 정확한 답을 찾지 못했습니다. 장비명·현장 수·사용자 수·연동 대상 중 하나를 포함해 다시 질문하시거나 COREON에 문의해 주세요.'
  };

  const KB_KO = [
    {keys:['가격','얼마','요금','비용'],a:'Safety Start Free는 무료(현장 1개·관리자/운영자 3명·현장 참여자 무제한·1GB)입니다. Safety Core는 월 149,000원(VAT 별도, 현장 1개·관리자/운영자 10명·10GB), Safety Operations는 월 490,000원(VAT 별도, 현장 1개·관리자/운영자 50명·50GB), Enterprise/Public은 연 18,000,000원부터(VAT 별도, 다사업장 계약)입니다. API·SSO·데이터 이전·맞춤개발·출장 등은 범위에 따라 별도 견적입니다.',link:'/pricing.html',label:'요금제 보기'},
    {keys:['몇 명','사용자','인원','계정'],a:'현장 참여자는 무료 플랜을 포함해 무제한입니다. 관리자/운영자는 Start Free 3명, Core 10명, Operations 50명, Enterprise/Public 최대 300명 기준이며 계약범위에 따라 설계합니다.',link:'/pricing.html',label:'사용 규모 보기'},
    {keys:['몇 개 현장','현장 수','다사업장','현장까지'],a:'Start Free·Core·Operations는 기본 현장 1개 기준입니다. Enterprise/Public은 다사업장 운영을 전제로 조직·현장·역할 범위를 계약에 맞춰 구성합니다.',link:'/enterprise-multisite.html',label:'다사업장 보기'},
    {keys:['설치','깔아','하드웨어'],a:'기본 Safety AX는 웹 기반 SaaS라 별도 현장 장비 설치 없이 시작할 수 있습니다. 장비·센서·Vision Edge·현장 네트워크 연계가 필요한 경우에만 현장 인터페이스와 설치 범위를 별도로 확인합니다.',link:'/download.html?source=assistant-install',label:'무료 시작'},
    {keys:['api','연동','얼마 걸','기간'],a:'정해진 일수로 일괄 보장하지 않습니다. 이벤트 종류, 인증방식, 데이터 형식, Ack/Clear 상태, 보안요건을 먼저 확인합니다. REST/Webhook 읽기 연동과 장비·SCADA·전용 프로토콜 연동은 범위가 다르므로 인터페이스 확인 후 일정과 견적을 확정합니다.',link:'/safety-event-integration.html',label:'연동 범위 보기'},
    {keys:['ehs','기존 시스템','연결','erp','mes','scada'],a:'가능성을 검토할 수 있습니다. COREON은 기존 EHS·SCADA·MES·WMS·CCTV·AIoT 등을 교체하기보다, 그 신호 이후의 사람 검토·담당·기한·조치·증빙·잔여위험·승인 종결을 연결합니다. 특정 제품 호환성은 실제 API/이벤트 인터페이스 확인 후 확정합니다.',link:'/safety-event-integration.html',label:'연동 검토'},
    {keys:['poc','pilot','파일럿','실증','몇 주'],a:'기업 PoC는 현장·데이터·연동·지원 범위에 따라 별도 설계합니다. 공공기관 외부검증형 파일럿은 현재 8–12주 표준 검증 구조를 공개하고 있습니다. 단순 제품 검토는 Safety Start Free로 즉시 시작할 수 있습니다.',link:'/public-proof-procurement.html',label:'파일럿 구조 보기'},
    {keys:['kpi','효과','좋아지','성과','roi'],a:'개선효과를 선제 보장하지 않습니다. 대신 사건→담당자 지정시간, 기한초과율, 조치 종결시간, 증빙 완결률, 잔여위험 재평가 완료율, 재개방·반복위험 등을 같은 기준으로 측정해 실제 개선 여부를 검증할 수 있게 설계합니다.',link:'/product.html',label:'제품 구조 보기'},
    {keys:['고객 사례','레퍼런스','실적','사례'],a:'COREON Holdings는 국내 대형 건설기업 공급 수행과 미국 산업현장 유료 기술컨설팅 경험을 보유하고 있습니다. 다만 이를 Safety AX 도입사례로 과장하지 않습니다. Safety AX의 고객별 실증·도입 성과는 공개 가능한 검증 근거가 확보된 범위에서만 안내합니다.',link:'/trust.html',label:'검증 가능한 근거'},
    {keys:['장애','지원','문의','문제'],a:'COREON이 제품 운영과 고객 지원의 책임 창구입니다. 일반 문의는 contact@coreon-global.com으로 접수하며, Enterprise/Public의 지원시간·SLA·현장지원·연동지원 범위는 계약에서 명확히 정합니다.',link:'mailto:contact@coreon-global.com?subject=COREON%20Safety%20AX%20지원%20문의',label:'지원 문의'},
    {keys:['ai','판단','자동 종결','사람'],a:'AI는 분류·요약·추천·우선순위 후보를 보조할 수 있지만 최종 안전판단·위험수용·종결은 권한 있는 사람이 수행합니다. 필수 증거·잔여위험 검토·승인이 빠지면 종결되지 않도록 Fail-Closed 원칙을 적용합니다.',link:'/trust.html',label:'신뢰·안전 원칙'},
    {keys:['무료','체험','시작','demo','데모'],a:'Safety Start Free로 현장 1개 범위에서 핵심 Safety AX 기능을 무료로 시작할 수 있습니다. 기업·공공기관은 별도 데모 또는 도입범위 상담도 가능합니다.',link:'/download.html?source=assistant-free',label:'무료 시작'}
  ];

  const KB_EN = [
    {keys:['price','pricing','cost','how much','fee'],a:'Safety Start Free is free (1 site, 3 admin/operator users, unlimited field participants, 1GB). Safety Core is KRW 149,000/month excl. VAT (1 site, 10 admin/operator users, 10GB). Safety Operations is KRW 490,000/month excl. VAT (1 site, 50 admin/operator users, 50GB). Enterprise/Public starts from KRW 18,000,000/year excl. VAT for multi-site contracts. API, SSO, data migration, custom development and on-site work are scoped separately.',link:'/en/pricing.html',label:'View pricing'},
    {keys:['how many users','users','people','accounts'],a:'Field participants are unlimited, including on the free plan. Admin/operator limits are 3 for Start Free, 10 for Core, 50 for Operations, and up to 300 as the standard Enterprise/Public reference, subject to contract scope.',link:'/en/pricing.html',label:'View user limits'},
    {keys:['how many sites','sites','multi-site','multiple sites'],a:'Start Free, Core and Operations are based on one site by default. Enterprise/Public is designed for multi-site operation with organization, site and role scopes configured to the contract.',link:'/en/enterprise-multisite.html',label:'View multi-site model'},
    {keys:['install','installation','hardware'],a:'The core Safety AX product is web-based SaaS and can start without installing dedicated site hardware. Device, sensor, Vision Edge or site-network integration may require separate field-interface and installation review.',link:'/en/download.html?source=assistant-install',label:'Start free'},
    {keys:['api','integration','how long','timeline'],a:'COREON does not promise one fixed integration duration. We first review event types, authentication, payload format, Ack/Clear lifecycle and security requirements. Simple read-oriented REST/Webhook integration and SCADA or proprietary-protocol integration have different scopes, so schedule and price are confirmed after interface review.',link:'/en/safety-event-integration.html',label:'View integration scope'},
    {keys:['ehs','existing system','connect','erp','mes','scada'],a:'Integration can be assessed. COREON is designed to complement rather than replace EHS, SCADA, MES, WMS, CCTV or AIoT systems by adding human review, ownership, action, evidence, residual-risk reassessment and authorized closure after their signals. Compatibility with a specific product is confirmed only after reviewing the actual API/event interface.',link:'/en/safety-event-integration.html',label:'Review integration'},
    {keys:['poc','pilot','weeks','proof of concept'],a:'Enterprise PoCs are scoped according to site, data, integration and support requirements. For public-sector external validation, COREON currently publishes an 8–12 week standard pilot structure. Basic product evaluation can start immediately with Safety Start Free.',link:'/en/public-proof-procurement.html',label:'View pilot model'},
    {keys:['kpi','roi','improve','outcome','metrics'],a:'COREON does not pre-guarantee improvement results. A PoC can measure event-to-owner assignment time, overdue-action rate, closure lead time, evidence completeness, residual-risk reassessment completion and reopened/recurrent risk using consistent definitions.',link:'/en/product.html',label:'View product model'},
    {keys:['customer','reference','case study','deployment','track record'],a:'COREON Holdings has paid delivery experience with a major Korean construction company and paid industrial technical consulting experience in the United States. We do not present those as Safety AX deployments. Safety AX customer outcomes are published only where customer permission and verifiable evidence allow it.',link:'/en/trust.html',label:'View verifiable evidence'},
    {keys:['support','outage','incident','help'],a:'COREON is the accountable product-operation and customer-support contact. General support is handled via contact@coreon-global.com. Enterprise/Public support hours, SLA, on-site support and integration support are defined in the contract; unpublished SLA terms are not promised in advance.',link:'mailto:contact@coreon-global.com?subject=COREON%20Safety%20AX%20Support',label:'Contact support'},
    {keys:['ai','final decision','closure','human'],a:'No. AI may assist with classification, summarization and recommendations, but final safety judgment, risk acceptance and closure remain with authorized people. Fail-Closed rules prevent closure when required evidence, residual-risk review or approval is missing.',link:'/en/trust.html',label:'View safety principles'},
    {keys:['free','trial','start','demo'],a:'Yes. Safety Start Free allows immediate use of core Safety AX functions for one site. Enterprise and public-sector teams can also request a demo and implementation-scope review.',link:'/en/download.html?source=assistant-free',label:'Start free'}
  ];

  const KB = isEN ? KB_EN : KB_KO;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const style=document.createElement('style');
  style.textContent=`
  #coreon-sales-assistant{position:fixed;right:18px;bottom:18px;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans KR",Arial,sans-serif}
  .ca-open{border:0;border-radius:999px;background:#082844;color:#fff;padding:14px 18px;font-weight:900;box-shadow:0 16px 42px rgba(2,24,45,.28);cursor:pointer}
  .ca-panel{display:none;position:absolute;right:0;bottom:58px;width:min(390px,calc(100vw - 28px));max-height:min(650px,76vh);background:#fff;border:1px solid #dbe6ee;border-radius:22px;box-shadow:0 26px 80px rgba(3,24,46,.24);overflow:hidden}
  .ca-panel.on{display:flex;flex-direction:column}.ca-head{background:#082844;color:#fff;padding:17px 18px}.ca-head b{display:block;font-size:16px}.ca-head span{font-size:11px;color:#cfe0ee}
  .ca-log{padding:14px;overflow:auto;display:flex;flex-direction:column;gap:10px}.ca-msg{padding:11px 12px;border-radius:14px;font-size:13px;line-height:1.6;max-width:94%}.ca-bot{background:#f1f6fa;color:#17324b}.ca-user{background:#e4faf5;color:#075f57;align-self:flex-end}.ca-link{display:inline-block;margin-top:8px;font-weight:900;color:#087a69;text-decoration:none}
  .ca-quick{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 10px}.ca-quick button{border:1px solid #cfe0e9;background:#fff;border-radius:999px;padding:7px 9px;font-size:11px;font-weight:800;cursor:pointer}
  .ca-form{display:flex;gap:7px;padding:11px;border-top:1px solid #e4ebf1}.ca-form input{flex:1;min-width:0;border:1px solid #cddae5;border-radius:12px;padding:11px;font:inherit;font-size:13px}.ca-form button{border:0;background:#19a995;color:white;border-radius:12px;padding:0 13px;font-weight:900;cursor:pointer}.ca-note{padding:0 14px 12px;color:#718296;font-size:10px;line-height:1.45}
  @media(max-width:520px){#coreon-sales-assistant{right:12px;bottom:12px}.ca-panel{position:fixed;left:10px;right:10px;bottom:72px;width:auto;max-height:72vh}}
  `;
  document.head.appendChild(style);

  const root=document.createElement('div'); root.id='coreon-sales-assistant';
  root.innerHTML=`<button class="ca-open" aria-expanded="false">${T.open}</button><section class="ca-panel" role="dialog" aria-label="${T.title}"><div class="ca-head"><b>${T.title}</b><span>${T.sub}</span></div><div class="ca-log"><div class="ca-msg ca-bot">${T.hello}</div></div><div class="ca-quick">${T.quick.map(x=>'<button>'+x+'</button>').join('')}</div><form class="ca-form"><input aria-label="${T.title}" placeholder="${T.placeholder}"><button>${T.ask}</button></form><div class="ca-note">${T.note} <a href="${isEN?'/en/faq.html':'/faq.html'}">${T.faq}</a></div></section>`;
  document.body.appendChild(root);

  const panel=root.querySelector('.ca-panel'),open=root.querySelector('.ca-open'),log=root.querySelector('.ca-log'),input=root.querySelector('input');
  const say=(html,who='bot')=>{const d=document.createElement('div');d.className='ca-msg '+(who==='user'?'ca-user':'ca-bot');d.innerHTML=html;log.appendChild(d);log.scrollTop=log.scrollHeight;};
  const answer=q=>{const low=q.toLowerCase().replace(/\s+/g,' ');let best=null,score=0;for(const item of KB){const s=item.keys.reduce((n,k)=>n+(low.includes(k.toLowerCase())?1:0),0);if(s>score){score=s;best=item;}}if(!best){say(esc(T.fallback)+'<br><a class="ca-link" href="mailto:contact@coreon-global.com?subject=COREON%20Product%20Inquiry">contact@coreon-global.com →</a>');return;}say(esc(best.a)+`<br><a class="ca-link" href="${best.link}">${esc(best.label)} →</a>`);};
  open.addEventListener('click',()=>{panel.classList.toggle('on');const on=panel.classList.contains('on');open.setAttribute('aria-expanded',String(on));if(on)input.focus();});
  root.querySelector('.ca-form').addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;say(esc(q),'user');input.value='';answer(q);});
  root.querySelectorAll('.ca-quick button').forEach(b=>b.addEventListener('click',()=>{const q=b.textContent;say(esc(q),'user');answer(q);}));
})();
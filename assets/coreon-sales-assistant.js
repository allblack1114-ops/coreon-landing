(() => {
  if (document.getElementById('coreon-sales-assistant')) return;

  const KB = [
    {keys:['가격','얼마','요금','price','비용'], q:'정확히 얼마예요?', a:'Safety Start Free는 무료(현장 1개·관리자/운영자 3명·현장 참여자 무제한·1GB)입니다. Safety Core는 월 149,000원(VAT 별도, 현장 1개·관리자/운영자 10명·10GB), Safety Operations는 월 490,000원(VAT 별도, 현장 1개·관리자/운영자 50명·50GB), Enterprise/Public은 연 18,000,000원부터(VAT 별도, 다사업장 계약)입니다. API·SSO·데이터 이전·맞춤개발·출장 등은 범위에 따라 별도 견적입니다.', link:'/pricing.html', label:'요금제 보기'},
    {keys:['몇 명','사용자','인원','계정','user'], q:'몇 명까지 써요?', a:'현장 참여자는 무료 플랜을 포함해 무제한입니다. 관리자/운영자는 Start Free 3명, Core 10명, Operations 50명, Enterprise/Public 최대 300명 기준이며 계약범위에 따라 설계합니다.', link:'/pricing.html', label:'사용 규모 보기'},
    {keys:['몇 개 현장','현장 수','다사업장','site','현장까지'], q:'몇 개 현장까지 돼요?', a:'Start Free·Core·Operations는 기본 현장 1개 기준입니다. Enterprise/Public은 다사업장 운영을 전제로 조직·현장·역할 범위를 계약에 맞춰 구성합니다.', link:'/pricing.html', label:'다사업장 요금 보기'},
    {keys:['설치','깔아','installation','하드웨어'], q:'설치가 필요한가요?', a:'기본 Safety AX는 웹 기반 SaaS라 별도 현장 장비 설치 없이 시작할 수 있습니다. 장비·센서·Vision Edge·현장 네트워크 연계가 필요한 경우에만 현장 인터페이스와 설치 범위를 별도로 확인합니다.', link:'/download.html?source=assistant-install', label:'무료 시작'},
    {keys:['api','연동','얼마 걸','기간','integration'], q:'API 연동하려면 얼마나 걸려요?', a:'정해진 일수로 일괄 보장하지 않습니다. 먼저 이벤트 종류, 인증방식, 데이터 형식, Ack/Clear 상태, 보안요건을 확인합니다. 단순 REST/Webhook 등 읽기 중심 연동과 장비·SCADA·전용 프로토콜 연동은 범위가 다르므로 인터페이스 확인 후 일정과 견적을 확정합니다.', link:'/safety-event-integration.html', label:'연동 범위 보기'},
    {keys:['ehs','기존 시스템','연결','erp','mes','scada'], q:'우리 회사 EHS랑 연결되나요?', a:'가능성을 검토할 수 있습니다. COREON은 기존 EHS·SCADA·MES·WMS·CCTV·AIoT 등을 교체하기보다, 그 신호 이후의 사람 검토·담당·기한·조치·증빙·잔여위험·승인 종결을 연결하는 방식입니다. 다만 특정 제품과의 호환성은 실제 API/이벤트 인터페이스를 확인한 뒤 확정합니다.', link:'/safety-event-integration.html', label:'연동 검토'},
    {keys:['poc','pilot','파일럿','실증','몇 주'], q:'PoC는 얼마고 몇 주예요?', a:'PoC는 현장·데이터·연동·지원 범위에 따라 별도 설계합니다. 공공기관의 외부검증형 파일럿은 현재 8–12주 표준 검증 구조를 공개하고 있습니다. 단순 제품 검토는 Safety Start Free로 즉시 시작할 수 있으며, 기업 제한형 PoC는 목표·KPI·데이터 범위를 먼저 확정한 뒤 기간과 비용을 제안합니다.', link:'/public-proof-procurement.html', label:'파일럿 구조 보기'},
    {keys:['kpi','효과','좋아지','성과','roi'], q:'도입하면 어떤 KPI가 좋아지나요?', a:'COREON은 개선효과를 선제 보장하지 않습니다. 대신 PoC에서 사건→담당자 지정시간, 기한초과율, 조치 종결시간, 증빙 완결률, 잔여위험 재평가 완료율, 재개방·반복위험 등을 같은 기준으로 측정해 도입 전후를 검증할 수 있게 설계합니다.', link:'/product.html', label:'제품 구조 보기'},
    {keys:['고객 사례','레퍼런스','실적','사례','customer'], q:'실제 고객 사례가 있나요?', a:'COREON Holdings는 국내 대형 건설기업 공급 수행과 미국 산업현장 유료 기술컨설팅 경험을 보유하고 있습니다. 다만 이를 Safety AX 도입사례로 과장하지 않습니다. Safety AX의 고객별 실증·도입 성과는 공개 가능한 검증 근거가 확보된 범위에서만 안내합니다.', link:'/trust.html', label:'검증 가능한 근거'},
    {keys:['장애','지원','문의','support','문제'], q:'장애 나면 누가 지원하나요?', a:'COREON이 제품 운영과 고객 지원의 책임 창구입니다. 일반 문의는 contact@coreon-global.com으로 접수하며, Enterprise/Public의 지원시간·SLA·현장지원·연동지원 범위는 계약에서 명확히 정합니다. 공개되지 않은 SLA를 임의로 약속하지 않습니다.', link:'mailto:contact@coreon-global.com?subject=COREON%20Safety%20AX%20지원%20문의', label:'지원 문의'},
    {keys:['ai','판단','자동 종결','사람'], q:'AI가 안전판단이나 종결을 대신하나요?', a:'아닙니다. AI는 분류·요약·추천·우선순위 후보를 보조할 수 있지만, 최종 안전판단·위험수용·종결은 권한 있는 사람이 수행합니다. 필수 증거·잔여위험 검토·승인이 빠지면 종결되지 않도록 Fail-Closed 원칙을 적용합니다.', link:'/trust.html', label:'신뢰·안전 원칙'},
    {keys:['무료','체험','시작','demo','데모'], q:'바로 써볼 수 있나요?', a:'네. Safety Start Free로 현장 1개 범위에서 핵심 Safety AX 기능을 무료로 시작할 수 있습니다. 기업·공공기관은 별도 데모 또는 도입범위 상담도 가능합니다.', link:'/download.html?source=assistant-free', label:'무료 시작'}
  ];

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const style = document.createElement('style');
  style.textContent = `
  #coreon-sales-assistant{position:fixed;right:18px;bottom:18px;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans KR",Arial,sans-serif}
  .ca-open{border:0;border-radius:999px;background:#082844;color:#fff;padding:14px 18px;font-weight:900;box-shadow:0 16px 42px rgba(2,24,45,.28);cursor:pointer}
  .ca-panel{display:none;position:absolute;right:0;bottom:58px;width:min(390px,calc(100vw - 28px));max-height:min(650px,76vh);background:#fff;border:1px solid #dbe6ee;border-radius:22px;box-shadow:0 26px 80px rgba(3,24,46,.24);overflow:hidden}
  .ca-panel.on{display:flex;flex-direction:column}.ca-head{background:#082844;color:#fff;padding:17px 18px}.ca-head b{display:block;font-size:16px}.ca-head span{font-size:11px;color:#cfe0ee}
  .ca-log{padding:14px;overflow:auto;display:flex;flex-direction:column;gap:10px}.ca-msg{padding:11px 12px;border-radius:14px;font-size:13px;line-height:1.6;max-width:94%}.ca-bot{background:#f1f6fa;color:#17324b}.ca-user{background:#e4faf5;color:#075f57;align-self:flex-end}.ca-link{display:inline-block;margin-top:8px;font-weight:900;color:#087a69;text-decoration:none}
  .ca-quick{display:flex;gap:6px;flex-wrap:wrap;padding:0 14px 10px}.ca-quick button{border:1px solid #cfe0e9;background:#fff;border-radius:999px;padding:7px 9px;font-size:11px;font-weight:800;cursor:pointer}
  .ca-form{display:flex;gap:7px;padding:11px;border-top:1px solid #e4ebf1}.ca-form input{flex:1;min-width:0;border:1px solid #cddae5;border-radius:12px;padding:11px;font:inherit;font-size:13px}.ca-form button{border:0;background:#19a995;color:white;border-radius:12px;padding:0 13px;font-weight:900;cursor:pointer}
  .ca-note{padding:0 14px 12px;color:#718296;font-size:10px;line-height:1.45}
  @media(max-width:520px){#coreon-sales-assistant{right:12px;bottom:12px}.ca-panel{position:fixed;left:10px;right:10px;bottom:72px;width:auto;max-height:72vh}}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id='coreon-sales-assistant';
  root.innerHTML = `<button class="ca-open" aria-expanded="false">COREON 제품안내</button>
  <section class="ca-panel" role="dialog" aria-label="COREON 제품안내">
    <div class="ca-head"><b>COREON 제품안내</b><span>가격 · 현장/사용자 · 연동 · PoC · KPI · 지원</span></div>
    <div class="ca-log"><div class="ca-msg ca-bot">안녕하세요. COREON Safety AX Agent의 공개된 최신 기준으로 답변합니다. 무엇이 궁금하신가요?</div></div>
    <div class="ca-quick"><button>가격</button><button>몇 명까지?</button><button>API/EHS 연동</button><button>PoC</button><button>고객 사례</button></div>
    <form class="ca-form"><input aria-label="제품 질문" placeholder="예: 우리 회사 EHS랑 연결되나요?"><button>질문</button></form>
    <div class="ca-note">제품 안내용 도우미입니다. 안전·법률 최종판단을 제공하지 않으며, 맞춤 견적·장비 호환·SLA는 확인 후 확정합니다. <a href="/faq.html">전체 FAQ</a></div>
  </section>`;
  document.body.appendChild(root);

  const panel=root.querySelector('.ca-panel'), open=root.querySelector('.ca-open'), log=root.querySelector('.ca-log'), input=root.querySelector('input');
  const say=(html,who='bot')=>{const d=document.createElement('div');d.className='ca-msg '+(who==='user'?'ca-user':'ca-bot');d.innerHTML=html;log.appendChild(d);log.scrollTop=log.scrollHeight;};
  const answer=q=>{
    const low=q.toLowerCase().replace(/\s+/g,' ');
    let best=null,score=0;
    for(const item of KB){const s=item.keys.reduce((n,k)=>n+(low.includes(k.toLowerCase())?1:0),0);if(s>score){score=s;best=item;}}
    if(!best){say('공개 FAQ에서 정확한 답을 찾지 못했습니다. 장비명·현장 수·사용자 수·연동 대상 중 하나를 포함해 다시 질문하시거나, <a class="ca-link" href="mailto:contact@coreon-global.com?subject=COREON%20제품%20문의">COREON에 문의하기 →</a>');return;}
    say(esc(best.a)+`<br><a class="ca-link" href="${best.link}">${esc(best.label)} →</a>`);
  };
  open.addEventListener('click',()=>{panel.classList.toggle('on');const on=panel.classList.contains('on');open.setAttribute('aria-expanded',String(on));if(on)input.focus();});
  root.querySelector('.ca-form').addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;say(esc(q),'user');input.value='';answer(q);});
  root.querySelectorAll('.ca-quick button').forEach(b=>b.addEventListener('click',()=>{const q=b.textContent;say(esc(q),'user');answer(q);}));
})();
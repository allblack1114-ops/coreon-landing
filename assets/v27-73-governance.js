(()=>{
  if(document.getElementById('coreon-governance')) return;
  const en=(document.documentElement.lang||'ko').toLowerCase().startsWith('en');
  const app='https://app.coreon-global.com';
  const sec=document.createElement('section');
  sec.id='coreon-governance';
  sec.className='coreon-governance-home';

  const ko=`<div class="cgov-wrap">
    <div class="cgov-head">
      <b>SAFETY GOVERNANCE · 실행과 증빙</b>
      <h2>TBM·위험성평가에서 발견한 위험을<br>실제 조치와 재확인까지 연결합니다.</h2>
      <p>COREON은 법률자문이나 의무를 대신하는 프로그램이 아닙니다. 현장에서 실제로 수행한 위험 확인, 종사자 의견, 담당자·기한, 개선조치, 증빙, 재확인과 경영 점검 이력을 추적 가능한 안전업무로 연결합니다.</p>
    </div>
    <div class="cgov-grid">
      <article><small>작업 전</small><strong>TBM·위험성평가</strong><p>작업 전 확인한 위험이 이후 제보·조치와 단절되지 않도록 같은 업무 흐름에서 이어갑니다.</p></article>
      <article><small>현장 참여</small><strong>종사자 의견·피드백</strong><p>사진·글·음성 제보와 처리결과 확인을 연결하고, 최종 종결 판단은 권한 있는 사람이 수행합니다.</p></article>
      <article><small>조직 운영</small><strong>도급·협력사 이행 확인</strong><p>다현장·협력사별 미조치, 기한초과와 조치증빙을 경영·발주 관점에서 확인하도록 지원합니다.</p></article>
      <article><small>경영 확인</small><strong>정기점검·Evidence Pack</strong><p>고위험, 반복위험, 미조치와 주요 조치 이력을 검토·보고 가능한 기록으로 관리합니다.</p></article>
    </div>
    <div class="cgov-flow"><b>TBM·위험성평가</b><span>→</span><b>위험 제보</b><span>→</span><b>담당자·기한</b><span>→</span><b>개선·증빙</b><span>→</span><b>재확인·보고</b></div>
    <div class="cgov-actions"><a class="cgov-btn" href="${app}/safety-governance.html?source=coreon-home-governance">업무 흐름 자세히 보기</a><a class="cgov-btn alt" href="/download.html?source=coreon-home-governance-free">COREON AX Agent에서 무료로 시작</a></div>
    <p class="cgov-legal">※ 실제 법적 의무의 적용 여부와 이행 적정성은 사업장별 상황에 따라 권한 있는 담당자와 전문 검토가 필요합니다.</p>
  </div>`;

  const eng=`<div class="cgov-wrap">
    <div class="cgov-head">
      <b>SAFETY GOVERNANCE · EXECUTION & EVIDENCE</b>
      <h2>Connect TBM and risk assessment findings<br>to corrective action and verification.</h2>
      <p>COREON is not legal advice and does not perform statutory duties for an organization. It connects actual hazard review, worker voice, ownership, due dates, corrective action, evidence, verification and executive review into a traceable safety-work flow.</p>
    </div>
    <div class="cgov-grid">
      <article><small>Before work</small><strong>TBM / risk assessment</strong><p>Keep pre-work findings connected to later reports and corrective action.</p></article>
      <article><small>Worker voice</small><strong>Feedback loop</strong><p>Connect field reports and outcome feedback while authorized people retain final closure.</p></article>
      <article><small>Organization</small><strong>Contractor execution</strong><p>Review unresolved, overdue and evidence status across sites and contractors.</p></article>
      <article><small>Executive review</small><strong>Periodic evidence</strong><p>Organize high-risk, repeat-risk and corrective-action history for accountable review and reporting.</p></article>
    </div>
    <div class="cgov-flow"><b>TBM / assessment</b><span>→</span><b>Hazard report</b><span>→</span><b>Owner / due date</b><span>→</span><b>Action / evidence</b><span>→</span><b>Verify / report</b></div>
    <div class="cgov-actions"><a class="cgov-btn" href="${app}/en/safety-governance.html?source=coreon-en-home-governance">See the workflow</a><a class="cgov-btn alt" href="/en/download.html?source=coreon-en-home-governance-free">Start free in COREON AX Agent</a></div>
    <p class="cgov-legal">Applicability and adequacy of statutory duties depend on each workplace and require authorized human review.</p>
  </div>`;

  sec.innerHTML=en?eng:ko;

  const st=document.createElement('style');
  st.textContent=`
    #coreon-governance{padding:76px 0;background:#eef4f8;color:#10233f;border-bottom:1px solid #dbe5ee}
    .cgov-wrap{width:min(1180px,calc(100% - 36px));margin:auto}
    .cgov-head{max-width:880px;margin-bottom:30px}
    .cgov-head>b{color:#0b8f83;font-size:13px;font-weight:950}
    .cgov-head h2{font-size:clamp(34px,4.4vw,54px);line-height:1.12;letter-spacing:-.045em;margin:9px 0 14px;color:#071a33}
    .cgov-head p{color:#566b80;font-size:17px;line-height:1.75;margin:0}
    .cgov-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
    .cgov-grid article{padding:21px;border-radius:18px;background:#071a33;border:1px solid #173858;box-shadow:0 12px 30px rgba(7,26,51,.08)}
    .cgov-grid small{color:#69d7c6;font-weight:900}
    .cgov-grid strong{display:block;font-size:20px;margin:6px 0;color:#fff}
    .cgov-grid p{color:#cfdeed;line-height:1.65;margin:0}
    .cgov-flow{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:20px;padding:16px;border-radius:16px;background:#fff;border:1px solid #dbe5ee;color:#071a33;box-shadow:0 10px 24px rgba(7,26,51,.05)}
    .cgov-flow span{color:#0b8f83;font-weight:900}
    .cgov-actions{margin-top:20px;display:flex;gap:10px;flex-wrap:wrap}
    .cgov-btn{display:inline-flex;min-height:48px;align-items:center;padding:0 18px;border-radius:999px;background:#071a33;color:#fff;text-decoration:none;font-weight:950}
    .cgov-btn.alt{background:#0b8f83;color:#fff}
    .cgov-legal{margin:18px 0 0;color:#6f8396;font-size:12px;line-height:1.6}
    @media(max-width:900px){.cgov-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:560px){#coreon-governance{padding:58px 0}.cgov-wrap{width:min(100% - 24px,1180px)}.cgov-grid{grid-template-columns:1fr}.cgov-flow{align-items:flex-start;justify-content:flex-start}.cgov-actions{display:grid}.cgov-btn{width:100%;justify-content:center}.cgov-head h2{font-size:36px}.cgov-head p{font-size:16px}}
  `;
  document.head.appendChild(st);

  const hero=document.querySelector('.hero');
  if(hero&&hero.parentNode){
    hero.parentNode.insertBefore(sec,hero.nextSibling);
  }else{
    const main=document.querySelector('main');
    main?.insertBefore(sec,main.firstChild);
  }
})();
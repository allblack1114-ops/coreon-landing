(() => {
  'use strict';

  const block = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  // Deterrence only: browser-delivered code cannot be made fully inaccessible.
  document.addEventListener('contextmenu', block, { capture: true });
  document.addEventListener('dragstart', (event) => {
    if (event.target && event.target.tagName === 'IMG') block(event);
  }, { capture: true });

  document.addEventListener('keydown', (event) => {
    const key = String(event.key || '').toLowerCase();
    const ctrlOrMeta = event.ctrlKey || event.metaKey;
    const devShortcut =
      key === 'f12' ||
      (ctrlOrMeta && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      (ctrlOrMeta && ['u', 's'].includes(key));

    if (devShortcut) block(event);
  }, { capture: true });

  // Keep homepage/product terminology aligned without duplicating PC/mobile markup.
  const replacements = new Map([
    ['위험제보와 TBM·위험성평가에서 확인된 위험', '위험 발견·아차사고 제보와 TBM·위험성평가에서 확인된 위험'],
    ['위험제보와 종사자 의견', '위험·아차사고 제보와 종사자 의견'],
    ['위험제보·TBM·위험성평가', '위험·아차사고 제보 · TBM · 위험성평가'],
    ['미조치·기한초과·반복위험', '미조치·기한초과·반복위험·아차사고'],
    ['현장별 고위험·미조치·기한초과 확인', '현장별 고위험·미조치·기한초과·고잠재 아차사고 확인'],
    ['위험 발견 → 담당자·기한 → 개선조치', '위험·아차사고 발견 → 위험성평가·TBM → 담당자·기한 → 개선조치'],
    ['hazard reporting, TBM, risk assessment', 'hazard / near-miss reporting, TBM, risk assessment'],
    ['Hazard reporting & Safety Room', 'Hazard / Near-miss reporting & Safety Room'],
    ['Hazard reporting · TBM · risk assessment', 'Hazard / Near-miss reporting · TBM · risk assessment'],
    ['Open · Overdue · Recurring risks', 'Open · Overdue · Recurring · High-potential near misses']
  ]);

  const addTechnologyEvaluationTrust = () => {
    if (!['/', '/en/', '/index.html', '/en/index.html'].includes(location.pathname)) return;
    const trust = document.querySelector('#trust .trust');
    if (!trust || trust.querySelector('[data-coreon-t5]')) return;

    const ko = document.documentElement.lang.toLowerCase().startsWith('ko');
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.coreonT5 = '2026';
    card.style.gridColumn = '1 / -1';
    card.style.display = 'grid';
    card.style.gridTemplateColumns = 'minmax(220px, 320px) minmax(0, 1fr)';
    card.style.gap = '24px';
    card.style.alignItems = 'center';
    card.style.minHeight = '0';
    card.innerHTML = ko
      ? '<img src="/assets/t5-technology-excellence-2026.svg" alt="2026 기술평가 우수기업 T5 인증" style="width:100%;height:auto;display:block"><div><span class="num">외부 기술평가</span><h3>2026 기술평가 우수기업 · T5</h3><p><strong style="color:#10223b">평가기술: SaaS 기반 산업안전 관리 플랫폼 기술</strong><br>한국기술신용평가(주)의 기술평가 결과에 따른 기술평가 우수기업 인증입니다.<br>기술평가등급 T5 · 유효기간 2026.08.19 ~ 2027.08.18</p></div>'
      : '<img src="/assets/t5-technology-excellence-2026.svg" alt="2026 Technology Evaluation Excellence T5" style="width:100%;height:auto;display:block"><div><span class="num">INDEPENDENT TECHNOLOGY EVALUATION</span><h3>2026 Technology Evaluation Excellence · T5</h3><p><strong style="color:#10223b">Evaluated technology: SaaS-based industrial safety management platform technology</strong><br>Technology Evaluation Excellence certification based on the evaluation by Korea Technology Credit Bureau.<br>Technology rating T5 · Valid 2026.08.19 – 2027.08.18</p></div>';
    trust.prepend(card);

    const style = document.createElement('style');
    style.textContent = '@media(max-width:700px){[data-coreon-t5]{grid-template-columns:1fr!important;gap:16px!important}[data-coreon-t5] img{max-width:360px;margin:auto}}';
    document.head.appendChild(style);
  };

  const syncTerminology = () => {
    if (!['/', '/en/', '/index.html', '/en/index.html'].includes(location.pathname)) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      let value = node.nodeValue;
      for (const [from, to] of replacements) {
        if (value.includes(from)) value = value.replaceAll(from, to);
      }
      node.nodeValue = value;
    }

    const ko = document.documentElement.lang.toLowerCase().startsWith('ko');
    const description = ko
      ? 'COREON Safety AX Agent는 위험·아차사고 제보, TBM, 위험성평가, 담당자·기한, 개선조치, 조치 전후 증빙, 잔여위험 재확인을 하나의 현장 안전업무 흐름으로 연결합니다.'
      : 'COREON Safety AX Agent connects hazard and near-miss reporting, TBM, risk assessment, corrective action, before/after evidence and residual-risk reassessment in one controlled safety workflow.';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    const og = document.querySelector('meta[property="og:description"]');
    if (og) og.setAttribute('content', description);
    const tw = document.querySelector('meta[name="twitter:description"]');
    if (tw) tw.setAttribute('content', description);

    addTechnologyEvaluationTrust();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncTerminology, { once: true });
  else syncTerminology();
})();

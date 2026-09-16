(() => {
  'use strict';

  // 2026-08-30 Homepage ↔ Product convergence guard.
  // The canonical homepage is now rendered directly by index.html.
  // This legacy experience layer must not inject or replace Hero/section DOM.
  document.documentElement.dataset.coreonBx2 = 'disabled-by-engineering-convergence';

  // Public-copy polish: keep internal policy flags out of the customer-facing UI.
  // The underlying product principle is unchanged; only the presentation is human-readable.
  const policyNote = document.querySelector('#kosha .human');
  if (policyNote) {
    const ko = document.documentElement.lang.toLowerCase().startsWith('ko');
    policyNote.textContent = ko
      ? '공개 안전정보는 참고근거로 활용하며, 최종 판단은 권한 있는 사람이 검토합니다. 고객의 위험점수나 안전상태를 자동으로 변경하지 않습니다.'
      : 'Public safety information is used as reference evidence. Authorized people retain final review, and customer risk scores or safety states are not changed automatically.';
  }
})();

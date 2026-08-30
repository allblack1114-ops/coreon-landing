(() => {
  'use strict';

  // 2026-08-30 Homepage ↔ Product convergence guard.
  // The canonical homepage is now rendered directly by index.html.
  // This legacy experience layer must not inject or replace Hero/section DOM.
  document.documentElement.dataset.coreonBx2 = 'disabled-by-engineering-convergence';
})();

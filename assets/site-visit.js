/* SITE01(2026-11-17) 공식 홈페이지 방문 집계: 페이지 경로와 유입 출처의 건수만 보냅니다.
   쿠키·로컬 식별자·개인정보를 만들거나 보내지 않습니다. 실패해도 화면에 영향이 없습니다. */
(function () {
  try {
    if (window.__coreonSiteHit) return; window.__coreonSiteHit = 1;
    if (navigator.webdriver) return;
    var q = new URLSearchParams(location.search), internal = false;
    try {
      if (q.get('coreon_internal') === '1') localStorage.setItem('coreon_internal', '1');
      if (q.get('coreon_internal') === '0') localStorage.removeItem('coreon_internal');
      internal = localStorage.getItem('coreon_internal') === '1';
    } catch (e) {}
    var src = (q.get('utm_source') || q.get('source') || '').toLowerCase();
    if (!/^[a-z0-9_\-]{1,24}$/.test(src)) {
      var r = '';
      try { r = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : ''; } catch (e) {}
      if (!r) src = 'direct';
      else if (/(^|\.)coreon-global\.com$/.test(r)) src = 'internal_nav';
      else if (/smartstore\.naver\.com$/.test(r)) src = 'smartstore';
      else if (/blog\.naver\.com$/.test(r)) src = 'naver_blog';
      else if (/(^|\.)naver\.com$/.test(r)) src = 'naver';
      else if (/(^|\.)google\./.test(r)) src = 'google';
      else if (/(youtube\.com|youtu\.be)$/.test(r)) src = 'youtube';
      else if (/(^|\.)kmong\.com$/.test(r)) src = 'kmong';
      else if (/(daum\.net|kakao\.com)$/.test(r)) src = 'daum_kakao';
      else if (/bing\.com$/.test(r)) src = 'bing';
      else src = 'other';
    }
    if (internal) src = 'qa_internal';
    var img = new Image();
    try { img.referrerPolicy = 'no-referrer'; } catch (e) {}
    img.src = 'https://estima.coreon-global.com/api/p2/site-hit?p=' + encodeURIComponent(location.pathname) + '&s=' + encodeURIComponent(src.slice(0, 24));
  } catch (e) {}
})();

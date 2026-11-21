// 127 REV.1: company-level nav, independent pages, EN URL structure, business inquiry.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const R = path.join(__dirname, '..');
const rd = (p) => fs.readFileSync(path.join(R, p), 'utf8');
let pass = 0;
const t = (name, fn) => { fn(); pass++; console.log('PASS', name); };

const HUB_KO = ['index.html', 'company.html', 'business-inquiry.html'];
const HUB_EN = ['en/index.html', 'en/business-inquiry.html'];
const TYPES = ['제품·서비스를 찾습니다', '기술 전문가가 필요합니다', '협력업체를 찾습니다',
  '우리 제품·기술을 소개하고 싶습니다', '교육을 받거나 제공하고 싶습니다', '해결하고 싶은 문제가 있습니다'];

const nav = (html) => (html.match(/<!--NAV127-->([\s\S]*?)<!--\/NAV127-->/) || [])[1] || '';

t('hub pages carry the shared nav with published areas only', () => {
  for (const f of HUB_KO) {
    const n = nav(rd(f));
    assert(n, f + ' nav missing');
    for (const k of ['>제품<', '>서비스<', '>회사<', 'COREON Safety AX', 'COREON ESTIMA AX', '견적·적산 실무 지원', '회사소개', '기술·특허', '문의·제안하기'])
      assert(n.includes(k), f + ' nav lacks ' + k);
    for (const k of ['>공급<', '>파트너<', 'E&amp;I 기술용역', 'supply.html', 'partners.html', 'engineering-services.html'])
      assert(!n.includes(k), f + ' exposes unpublished ' + k);
  }
  for (const f of HUB_EN) {
    const n = nav(rd(f));
    for (const k of ['>Products<', '>Services<', '>Company<', '/en/safety-ax/', '/en/business-inquiry.html']) assert(n.includes(k), f + ' ' + k);
    for (const k of ['>Supply<', '>Partners<']) assert(!n.includes(k), f + ' exposes ' + k);
  }
});

t('unpublished business pages are not linked anywhere or listed in sitemap', () => {
  const files = [];
  const walk = (d) => { for (const e of fs.readdirSync(path.join(R, d), { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(html|xml|txt)$/.test(e.name)) files.push(p); } };
  walk('.');
  for (const f of files) {
    const s = rd(f);
    for (const k of ['/supply.html', '/partners.html', '/engineering-services.html']) assert(!s.includes(k), f + ' links ' + k);
    assert(!fs.existsSync(path.join(R, 'supply.html')) && !fs.existsSync(path.join(R, 'partners.html')));
  }
});

t('KR home shows equal independent cards, keeps legacy anchors', () => {
  const s = rd('index.html');
  assert(/class="bcards"/.test(s));
  assert.strictEqual((s.match(/<article class="bcard"/g) || []).length, 3);
  assert(!/class="biz/.test(s), 'old stacked biz layout still present');
  for (const id of ['business', 'about', 'contact']) assert(s.includes('id="' + id + '"'), 'anchor ' + id);
  for (const h of ['/safety-ax/', '/estima-ax.html', '/estima-pro-services.html', '/pricing.html', '/estima-pro-services.html#apply', 'https://estima.coreon-global.com/sample?utm_source=hub'])
    assert(s.includes('href="' + h + '"'), 'path ' + h);
  assert(s.includes('hreflang="en" href="https://www.coreon-global.com/en/"'));
});

t('business inquiry: six types verbatim, consent required, mailto only, no external endpoint', () => {
  const s = rd('business-inquiry.html');
  TYPES.forEach((x, i) => assert(s.includes('value="' + (i + 1) + '" data-label="' + x + '"'), 'type ' + x));
  assert(s.includes('id="agree"') && s.includes('/privacy.html') && s.includes('상담 완료 후 3년'));
  assert(s.includes("mailto:contact@coreon-global.com?subject="));
  assert(!/fetch\(|XMLHttpRequest|action="http|localStorage|sessionStorage|sendBeacon/.test(s.replace(/<script src="\/assets\/site-visit.js" defer><\/script>/, '')), 'unexpected network/storage');
  const e = rd('en/business-inquiry.html');
  assert.strictEqual((e.match(/name="itype"/g) || []).length, 6);
});

t('EN URL structure: /en/ company home, /en/safety-ax/ Safety AX, reciprocal hreflang', () => {
  const en = rd('en/index.html'), sa = rd('en/safety-ax/index.html'), ko = rd('safety-ax/index.html');
  assert(en.includes('<link rel="canonical" href="https://www.coreon-global.com/en/" />'));
  assert(en.includes('hreflang="ko" href="https://www.coreon-global.com/"'));
  assert(sa.includes('rel="canonical" href="https://www.coreon-global.com/en/safety-ax/"'));
  assert(sa.includes('hreflang="ko" href="https://www.coreon-global.com/safety-ax/"'));
  assert(ko.includes('hreflang="en" href="https://www.coreon-global.com/en/safety-ax/"'));
  assert(ko.includes('href="/en/safety-ax/">EN'));
  assert(sa.includes('Industrial Safety Management Software for Serious Accident Prevention'));
  for (const id of ['kosha', 'why', 'amr-demo', 'faq-home']) assert(en.includes('"' + id + '"'), 'legacy hash ' + id);
});

t('sitemap lists new pages and alternates; still valid', () => {
  const s = rd('sitemap.xml');
  for (const u of ['/en/safety-ax/', '/company.html', '/business-inquiry.html', '/en/business-inquiry.html'])
    assert(s.includes('<loc>https://www.coreon-global.com' + u + '</loc>'), u);
  assert(/<loc>https:\/\/www.coreon-global.com\/safety-ax\/<\/loc><xhtml:link rel="alternate" hreflang="ko"[^>]*\/><xhtml:link rel="alternate" hreflang="en" href="https:\/\/www.coreon-global.com\/en\/safety-ax\/"/.test(s));
});

t('internal absolute links on hub and changed pages resolve to files', () => {
  const pages = [...HUB_KO, ...HUB_EN, 'en/safety-ax/index.html', 'safety-ax/index.html', 'en/trust.html',
    'en/guides/amr-agv-mobile-equipment-safety.html', 'en/guides/construction-serious-accident-prevention.html',
    'en/guides/refinery-turnaround-hot-work-safety.html', 'en/guides/semiconductor-fab-gas-safety.html'];
  const bad = [];
  for (const p of pages) {
    const s = rd(p);
    for (const m of s.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      let u = m[1].split('#')[0].split('?')[0];
      if (u.startsWith('//')) continue;
      if (u.endsWith('/')) u += 'index.html';
      if (!fs.existsSync(path.join(R, decodeURIComponent(u)))) bad.push(p + ' -> ' + m[1]);
    }
  }
  assert.deepStrictEqual(bad, []);
});

t('inquiry fallback for customers without an email app; customer-facing wording', () => {
  for (const f of ['business-inquiry.html', 'en/business-inquiry.html']) {
    const s = rd(f);
    assert(s.includes('id="fb" hidden') && s.includes('id="fbText"') && s.includes('data-copy-addr') && /href="tel:/.test(s), f + ' fallback');
  }
  for (const f of [...HUB_KO, ...HUB_EN, 'en/safety-ax/index.html']) {
    const s = rd(f);
    for (const k of ['사업·제휴', 'Business inquiry', '>사업영역<']) assert(!s.includes(k), f + ' still shows ' + k);
  }
  assert(rd('index.html').includes('코레온이 하는 일') && rd('index.html').includes('찾으시는 제품이나 서비스가 있으신가요?'));
});

console.log(pass + ' checks passed');

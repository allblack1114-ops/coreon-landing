// EXEC-06 §12: 사이트맵·canonical·hreflang·robots 정합성 시험 (개발환경, 저장소 파일 기준)
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = path.join(__dirname, '..');
const B = 'https://www.coreon-global.com/';
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const sm = read('sitemap.xml');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const locset = new Set(locs);
const fileOf = (u) => { let p = u.slice(B.length); if (p === '' || p.endsWith('/')) p += 'index.html'; return p; };
let checks = 0;
const ok = (c, msg) => { assert.ok(c, msg); checks++; };

ok(locs.length > 0, 'sitemap has urls');
ok(locs.length === locset.size, 'no duplicate loc');
const titles = new Map(); const descs = new Map();
for (const u of locs) {
  ok(u.startsWith(B), `canonical host ${u}`);
  ok(!/costflow|app\.coreon-global|\/docs\/|\/tests\//i.test(u), `no private/unreleased url ${u}`);
  const f = fileOf(u);
  ok(fs.existsSync(path.join(root, f)), `file exists ${f}`);
  const s = read(f); const head = s.split('</head>')[0];
  const ctag = [...head.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]).find((t) => /rel="canonical"/.test(t)) || '';
  const canon = (ctag.match(/href="([^"]+)"/) || [])[1];
  ok(canon === u, `canonical == loc ${u} (got ${canon})`);
  ok(!/<meta name="robots" content="[^"]*noindex/i.test(head), `no noindex in sitemap ${u}`);
  const t = (head.match(/<title>([^<]*)<\/title>/) || [])[1];
  const dtag = [...head.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]).find((t) => /name="description"/.test(t)) || '';
  const d = (dtag.match(/content="([^"]*)"/) || [])[1];
  ok(t && t.trim().length > 0, `title ${u}`);
  ok(d && d.trim().length > 0, `description ${u}`);
  ok(!titles.has(t), `unique title ${u} vs ${titles.get(t)}`); titles.set(t, u);
  ok(!descs.has(d), `unique description ${u}`); descs.set(d, u);
  const altsOf = (h) => [...h.matchAll(/<link\b[^>]*>/g)].map((m) => m[0]).filter((t) => /hreflang="(ko|en)"/.test(t)).map((t) => (t.match(/href="([^"]+)"/) || [])[1]);
  for (const alt of altsOf(head)) {
    if (alt === u) continue;
    ok(locset.has(alt), `hreflang target in sitemap ${u} -> ${alt}`);
    const ah = read(fileOf(alt)).split('</head>')[0];
    ok(altsOf(ah).includes(u), `hreflang return ${alt} -> ${u}`);
  }
}
const robots = read('robots.txt');
ok(robots.includes(`Sitemap: ${B}sitemap.xml`), 'robots sitemap line');
for (const d of ['/docs/', '/tests/', '/desktop/', '/data/']) ok(robots.includes(`Disallow: ${d}`), `robots disallow ${d}`);
ok(!fs.existsSync(path.join(root, 'costflow-ax.html')), 'CostFlow entry page not in release candidate');
console.log(`seo-exec06 PASS checks=${checks} urls=${locs.length}`);

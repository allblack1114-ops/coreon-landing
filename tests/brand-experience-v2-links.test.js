const fs = require('fs');
const assert = require('node:assert/strict');

const mustExist = [
  'product.html','en/product.html',
  'insurance-risk-engineering.html','en/insurance-risk-engineering.html',
  'safety-operations.html','en/safety-operations.html',
  'safety-avatar.html','en/safety-avatar.html',
  'safety-event-integration.html','en/safety-event-integration.html',
  'safety-ax-runtime.html','en/safety-ax-runtime.html',
  'guides/risk-assessment-action-management.html',
  'guides/tbm-safety-management.html',
  'guides/safety-action-closure-platform.html',
  'guides/kosha-public-data-safety-intelligence.html',
  'guides/contractor-safety-management.html',
  'enterprise-multisite.html','en/enterprise-multisite.html',
  'public-proof-procurement.html','en/public-proof-procurement.html',
  'vision-edge.html','trust.html','en/trust.html','patents.html',
  'download.html','en/download.html'
];
for (const file of mustExist) assert.ok(fs.existsSync(file), `missing surface: ${file}`);

const loader = fs.readFileSync('assets/client-hardening.js','utf8');
assert.match(loader,/home-experience-v2\.css/);
assert.match(loader,/home-experience-v2\.js/);
assert.match(loader,/home-experience-v2-link-fix\.js/);

const exp = fs.readFileSync('assets/home-experience-v2.js','utf8');
for (const href of [
  '/safety-event-integration.html','/safety-ax-runtime.html',
  '/guides/risk-assessment-action-management.html','/guides/tbm-safety-management.html',
  '/guides/safety-action-closure-platform.html','/guides/kosha-public-data-safety-intelligence.html',
  '/enterprise-multisite.html','/public-proof-procurement.html','/insurance-risk-engineering.html',
  '/vision-edge.html','/trust.html','/patents.html'
]) assert.ok(exp.includes(href), `Product Atlas missing ${href}`);

const fix=fs.readFileSync('assets/home-experience-v2-link-fix.js','utf8');
for (const href of [
  '/guides/contractor-safety-management.html','/safety-operations.html','/en/safety-operations.html',
  '/safety-avatar.html','/en/safety-avatar.html','/en/product.html','/en/insurance-risk-engineering.html'
]) assert.ok(fix.includes(href), `Product Atlas extension missing ${href}`);

for (const file of ['product.html','insurance-risk-engineering.html','safety-operations.html','safety-avatar.html']) {
  const body=fs.readFileSync(file,'utf8');
  assert.ok(body.includes('/download.html'), `${file} missing install route`);
  assert.ok(body.includes('https://app.coreon-global.com/login.html'), `${file} missing login route`);
}
for (const file of ['en/product.html','en/insurance-risk-engineering.html','en/safety-operations.html','en/safety-avatar.html']) {
  const body=fs.readFileSync(file,'utf8');
  assert.ok(body.includes('/en/download.html'), `${file} missing install route`);
  assert.ok(body.includes('https://app.coreon-global.com/en/login.html'), `${file} missing login route`);
}

const sitemap=fs.readFileSync('sitemap.xml','utf8');
for (const path of ['product.html','insurance-risk-engineering.html','safety-operations.html','safety-avatar.html','en/product.html','en/insurance-risk-engineering.html','en/safety-operations.html','en/safety-avatar.html']) {
  assert.ok(sitemap.includes(path), `sitemap missing ${path}`);
}

console.log('PASS Brand Experience v2 marketing → detail → install/login contract');
const fs=require('fs');const assert=require('node:assert/strict');
const ko=fs.readFileSync('privacy.html','utf8'),en=fs.readFileSync('en/privacy.html','utf8');
for(const [name,s] of [['ko',ko],['en',en]]){
  for(const v of ['Render Services','Supabase','OpenAI','Cloudflare','GitHub','Google LLC']) assert.ok(s.includes(v),`${name} privacy missing processor ${v}`);
  assert.ok(/28조의8|28-8/.test(s),`${name} privacy missing overseas-transfer basis`);
  assert.ok(/싱가포르|Singapore/.test(s)&&/일본|Japan/.test(s)&&/미국|United States/.test(s),`${name} privacy missing countries`);
  assert.ok(/보호책임자|Privacy officer/.test(s),`${name} privacy missing officer`);
  assert.ok(!/Google Analytics\(GA4\)를 통해 방문자 통계를 수집/.test(s),`${name} stale GA4 claim`);
}
assert.ok(!/gtag\(|googletagmanager/.test(fs.readdirSync('.').filter(f=>f.endsWith('.html')).map(f=>fs.readFileSync(f,'utf8')).join('')),'analytics present but policy says none');
const tk=fs.readFileSync('trust.html','utf8'),te=fs.readFileSync('en/trust.html','utf8');
for(const id of ['data-location','ai-notice','retention','not-yet']){assert.ok(tk.includes(`id="${id}"`),`ko trust missing ${id}`);assert.ok(te.includes(`id="${id}"`),`en trust missing ${id}`);}
assert.ok(tk.includes('HL D&amp;I Halla')&&te.includes('HL D&I Halla'),'trust KO/EN public record parity');
assert.ok(tk.includes('제31조'),'AI Basic Act notice');
assert.ok(fs.readFileSync('index.html','utf8').includes('안전장비 등록특허 4건'),'hero patent badge scope');
assert.ok(fs.readFileSync('en/index.html','utf8').includes('4 Safety-Hardware Patents'),'en hero patent badge scope');
for(const f of ['serious-accident-compliance.html','en/serious-accident-compliance.html']) assert.ok(fs.readFileSync(f,'utf8').includes('id="criteria"'),`${f} criteria`);
assert.ok(fs.readFileSync('sitemap.xml','utf8').includes('https://www.coreon-global.com/trust.html</loc>'),'sitemap trust.html');
console.log('PASS P0 privacy/trust contract 20261003');

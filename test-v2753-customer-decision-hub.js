'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const home=fs.readFileSync('index.html','utf8');
for(const x of ['INDUSTRY APPLICATIONS','건설·플랜트·스마트건설','제조·자동차·모빌리티','에너지·발전·정비','물류·식품·다사업장','공공·시설·철도·교통','AIoT·CCTV·Digital Twin']) assert.ok(home.includes(x),x);
for(const p of ['use-cases/index.html','use-cases/public/index.html','use-cases/construction/index.html','use-cases/manufacturing/index.html','use-cases/consulting/index.html']) assert.ok(fs.existsSync(p),p);
const hub=fs.readFileSync('use-cases/index.html','utf8');
for(const x of ['발주처·공공기관·공기업','건설·플랜트·대기업','제조·물류·중소사업장','컨설팅·수행기관']) assert.ok(hub.includes(x),x);
console.log('PASS industry-first homepage and customer use-case routes');

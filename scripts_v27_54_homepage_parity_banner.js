'use strict';
const fs=require('fs');

function mustReplace(s,from,to,label){
 if(s.includes(to)) return s;
 if(!s.includes(from)) throw new Error('V27_54_ANCHOR_MISSING:'+label);
 return s.replace(from,to);
}

const koFile='index.html';
let ko=fs.readFileSync(koFile,'utf8');
const koBanner=`\n      <section id="organization-banner" style="padding:26px 0;background:#eef5ff;border-top:1px solid #d8e4f0;border-bottom:1px solid #d8e4f0">\n        <div class="container">\n          <div style="display:grid;grid-template-columns:1.3fr .7fr;gap:18px;align-items:center">\n            <div><span class="kicker">COREON FOR YOUR ORGANIZATION</span><h2 style="margin:8px 0 6px">우리 조직에서는 COREON을 어떻게 사용할까요?</h2><p style="margin:0;color:#5d6e82">기존 안전관리 체계를 바꾸지 않고, 조직별로 필요한 위험 발견 이후의 담당자·기한·조치·증빙·잔여위험 재평가 흐름을 연결합니다.</p></div>\n            <div class="actions" style="margin-top:0;justify-content:flex-end"><a class="btn btn-primary" href="/use-cases/">우리 조직 맞춤 활용 보기</a></div>\n          </div>\n          <div class="grid-4" style="margin-top:14px">\n            <a class="card" href="/use-cases/public/"><b>발주처·공공기관</b><p>다현장·다협력사 안전이행 확인</p></a>\n            <a class="card" href="/use-cases/construction/"><b>건설·플랜트·대기업</b><p>현장 위험 → 조치 → 본사 확인</p></a>\n            <a class="card" href="/use-cases/manufacturing/"><b>제조·물류·중소사업장</b><p>복잡한 서류보다 쉬운 현장 실행</p></a>\n            <a class="card" href="/use-cases/consulting/"><b>컨설팅·수행기관</b><p>기존 평가체계 + 후속조치·증빙관리</p></a>\n          </div>\n        </div>\n      </section>\n`;
if(!ko.includes('id="organization-banner"')){
 ko=mustReplace(ko,'      </section>\n\n      <div class="industry-strip"','      </section>'+koBanner+'\n      <div class="industry-strip"','ko-banner');
}
fs.writeFileSync(koFile,ko);

const enFile='en/index.html';
let en=fs.readFileSync(enFile,'utf8');
const enBanner=`\n    <section id="organization-banner" class="soft" style="padding:28px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="container"><div class="head" style="margin-bottom:18px"><small>COREON FOR YOUR ORGANIZATION</small><h2>How would COREON work in your organization?</h2><p>Keep your existing safety-management system. COREON connects the owner, due date, corrective action, evidence and residual-risk review that must happen after a risk is found.</p></div><div class="grid"><article class="card"><h3>Principals / Public Institutions</h3><p>Cross-site and contractor execution assurance.</p><a class="btn primary" href="/use-cases/public/">View use case</a></article><article class="card"><h3>Construction / EPC / Enterprise</h3><p>Field risk → action → evidence → headquarters visibility.</p><a class="btn primary" href="/use-cases/construction/">View use case</a></article><article class="card"><h3>Manufacturing / Logistics / SME</h3><p>Simple field execution without replacing existing forms.</p><a class="btn primary" href="/use-cases/manufacturing/">View use case</a></article><article class="card"><h3>Consulting / Program Operators</h3><p>Keep the assessment framework and add follow-up evidence management.</p><a class="btn primary" href="/use-cases/consulting/">View use case</a></article></div></div></section>\n`;
if(!en.includes('id="organization-banner"')){
 en=mustReplace(en,'</div></section>\n    <section id="value">','</div></section>'+enBanner+'    <section id="value">','en-banner');
}
// Navigation parity: remove public pricing emphasis and add use guide.
en=en.replace('<a href="#principal-public">Principals/Public</a><a href="#plans">Plans</a>','<a href="/use-cases/">Use Guide</a><a href="#principal-public">Principals/Public</a>');
// English public homepage must follow Korean public-price policy: no numeric paid-plan prices on the main page.
const plansRe=/<section id="plans">[\s\S]*?<\/section>\n    <section class="trust">/;
const plansReplacement=`<section id="plans"><div class="container"><div class="head"><small>CUSTOMER EXPERIENCES</small><h2>Choose the operating scope that fits your organization</h2><p>Safety Start Free is the public entry point. Paid plans, Enterprise/Public scope, integrations and Vision Edge are proposed after confirming sites, users, data boundaries and deployment requirements.</p></div><div class="grid"><article class="card"><h3>Safety Start Free</h3><p>Start with one site and a small team to experience hazard reporting, accountable action, evidence and residual-risk review.</p><div class="actions"><a class="btn primary" href="https://app.coreon-global.com/safety-room/start?source=coreon-en-plans&lang=en">Start Free</a></div></article><article class="card"><h3>Safety Core / Operations / Business</h3><p>Operational scope is selected after confirming site count, users, workflow, reporting and support requirements.</p><div class="actions"><a class="btn" href="#contact">Discuss scope</a></div></article><article class="card"><h3>Enterprise / Public / Vision Edge</h3><p>Multi-site, public-sector, integration and field-vision deployments are separately scoped and quoted after a controlled review or pilot.</p><div class="actions"><a class="btn" href="#contact">Request deployment review</a></div></article></div><p class="notice"><strong>Pricing policy:</strong> Paid pricing is not published on the public homepage. Final scope and quotation depend on the customer environment, deployment boundary and required services.</p></div></section>\n    <section class="trust">`;
if(plansRe.test(en)) en=en.replace(plansRe,plansReplacement); else if(/KRW\s+[0-9]/i.test(en)) throw new Error('V27_54_EN_PRICE_SECTION_NOT_REPLACED');
fs.writeFileSync(enFile,en);

for(const [file,tokens] of [[koFile,['id="organization-banner"','우리 조직에서는 COREON을 어떻게 사용할까요?','/use-cases/public/','/use-cases/construction/','/use-cases/manufacturing/','/use-cases/consulting/']],[enFile,['id="organization-banner"','How would COREON work in your organization?','Use Guide','Pricing policy:']]]){
 const s=fs.readFileSync(file,'utf8');
 for(const token of tokens) if(!s.includes(token)) throw new Error('V27_54_VERIFY:'+file+':'+token);
}
if(/KRW\s*[0-9]|KRW\s*[0-9]+M|297,000|490,000|990,000|250,000|18M|10M/.test(fs.readFileSync(enFile,'utf8'))) throw new Error('V27_54_EN_PUBLIC_PRICE_LEAK');
console.log('PASS v27.54 hero-adjacent organization banner and KO/EN public homepage parity');

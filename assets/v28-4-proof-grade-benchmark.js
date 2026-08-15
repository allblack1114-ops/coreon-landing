(()=>{
 const lang=(document.documentElement.lang||'ko').toLowerCase().startsWith('en')?'en':'ko';
 if(document.getElementById('coreon-proof-grade-v284'))return;
 const copy=lang==='ko'?{
  eye:'PROOF-GRADE SAFETY AX',
  title:'기능을 주장하는 것이 아니라, 실제 운영 증거로 검증합니다.',
  body:'COREON은 위험 발견부터 사람 검토, 담당자·기한, 개선조치, 전후 증빙, 잔여위험 재평가와 최종 승인까지의 운영 데이터를 연결합니다. 실제 표본이 없는 성과수치는 만들지 않습니다.',
  cards:[
   ['실증 성과','도입 전·후 기간을 명시해 조치시간, 기한준수, 증빙완결성, 위험감소를 비교합니다.'],
   ['공공 SaaS 운영','가용성, 장애 대응, 복구훈련, RTO/RPO, 데이터 반환·삭제 증거를 운영기록과 연결합니다.'],
   ['연계 시스템','외부 CCTV·IoT·ERP/MES 등의 신호는 후보로 수집하고, 사람 검토 후 공식 안전사건으로 전환합니다.'],
   ['Vision Edge 검증','오탐·미탐, Ground Truth, 모델버전, 장비상태와 Fail-safe 증거가 있을 때만 현장 성능을 주장합니다.']
  ],
  note:'검증 기준 · 구현 여부와 실제 현장 성과를 구분하며, 법적 면책·자동 적합성·무사고를 보장하지 않습니다.',
  cta:'공공기관·기업 실증 상담'
 }:{
  eye:'PROOF-GRADE SAFETY AX',
  title:'Prove the workflow with operational evidence — not feature claims.',
  body:'COREON connects operational evidence from hazard detection and human review through ownership, corrective action, before/after evidence, residual-risk reassessment and final approval. It does not invent performance metrics when real samples are unavailable.',
  cards:[
   ['Pilot outcomes','Compare explicit baseline and current periods for action time, due-date performance, evidence completeness and risk reduction.'],
   ['Public SaaS operations','Connect availability, incidents, recovery drills, RTO/RPO and data return/deletion evidence to operational records.'],
   ['System integrations','External CCTV, IoT and ERP/MES signals enter as candidates and require human review before becoming official safety events.'],
   ['Vision Edge proof','Claim field performance only with reviewed ground truth, FP/FN, model lineage, device health and fail-safe evidence.']
  ],
  note:'Verification boundary · implementation and real field outcomes are reported separately. COREON does not promise legal immunity, automatic compliance or zero incidents.',
  cta:'Discuss a Public / Enterprise pilot'
 };
 const section=document.createElement('section');
 section.id='coreon-proof-grade-v284';
 section.className='coreon-proof-grade-v284';
 section.innerHTML=`<div class="w"><div class="pg-head"><span class="pg-eye">${copy.eye}</span><h2>${copy.title}</h2><p>${copy.body}</p></div><div class="pg-grid">${copy.cards.map(c=>`<article><b>${c[0]}</b><p>${c[1]}</p></article>`).join('')}</div><div class="pg-note">${copy.note}</div><a class="pg-cta" href="${lang==='ko'?'https://app.coreon-global.com/inquiry.html?source=coreon-home-proof-grade':'https://app.coreon-global.com/en/free-assessment?source=coreon-en-proof-grade'}">${copy.cta} →</a></div>`;
 const style=document.createElement('style');
 style.textContent=`.coreon-proof-grade-v284{padding:72px 0;background:#f3f8fc}.coreon-proof-grade-v284 .pg-head{max-width:900px;margin-bottom:26px}.coreon-proof-grade-v284 .pg-eye{font-size:12px;font-weight:950;letter-spacing:.08em;color:#0b8f83}.coreon-proof-grade-v284 h2{font-size:clamp(30px,4vw,48px);line-height:1.15;letter-spacing:-.035em;margin:8px 0 14px}.coreon-proof-grade-v284 .pg-head p,.coreon-proof-grade-v284 article p{color:#63768a;line-height:1.7}.coreon-proof-grade-v284 .pg-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.coreon-proof-grade-v284 article{background:#fff;border:1px solid #dbe5ee;border-radius:18px;padding:19px;min-height:175px}.coreon-proof-grade-v284 article b{font-size:18px}.coreon-proof-grade-v284 .pg-note{margin-top:14px;padding:14px 16px;border-radius:14px;background:#fff7ed;border:1px solid #fdba74;font-size:13px;line-height:1.6}.coreon-proof-grade-v284 .pg-cta{display:inline-flex;margin-top:16px;min-height:48px;align-items:center;padding:0 18px;border-radius:999px;background:#1269d3;color:#fff;font-weight:950}@media(max-width:900px){.coreon-proof-grade-v284 .pg-grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.coreon-proof-grade-v284{padding:52px 0}.coreon-proof-grade-v284 .pg-grid{grid-template-columns:1fr}.coreon-proof-grade-v284 article{min-height:auto}.coreon-proof-grade-v284 .pg-cta{width:100%;justify-content:center}}`;
 document.head.appendChild(style);
 const trust=document.querySelector('#trust');
 if(trust)trust.parentNode.insertBefore(section,trust);else document.querySelector('main')?.appendChild(section);
})();

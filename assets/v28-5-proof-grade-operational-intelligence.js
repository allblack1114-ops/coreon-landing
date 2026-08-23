(()=>{
 const lang=(document.documentElement.lang||'ko').toLowerCase().startsWith('en')?'en':'ko';
 if(document.getElementById('coreon-proof-grade-v285'))return;
 const copy=lang==='ko'?{
  eye:'PROOF-GRADE SAFETY AX · v28.33',
  title:'운영 증거를 넘어, 데이터 거버넌스와 실증 준비도까지 검증합니다.',
  body:'COREON은 기능 존재 여부가 아니라 실제 운영에서 증명 가능한지를 기준으로 평가합니다. 표본이 없으면 성과를 만들지 않고, 고객 데이터는 기본적으로 AI 학습데이터로 간주하지 않습니다.',
  cards:[
   ['Safety Evidence Dataset','데이터 출처, 보관·삭제, 반환, 개인정보 분류, 학습 이용권한을 분리하고 검증합니다.'],
   ['DPIA / 개인정보 영향','처리목적, 데이터 흐름, 역할·권한, 보관·삭제, 사고대응과 위험처리의 증거를 확인합니다.'],
   ['Support / SLA','지원 요청의 최초응답, 해결시간, SLA 위반과 에스컬레이션을 실제 운영기록으로 측정합니다.'],
   ['Pilot Evidence Report','명시적인 Baseline과 적용기간, 실제 표본이 있을 때만 전후 비교와 실증보고를 허용합니다.'],
   ['Management Intelligence','기한초과, 미종결 고위험, 동일위험 재발, 협력사 통제공백을 실제 사건 데이터로 우선순위화합니다.']
  ],
  note:'검증 경계 · AI는 안전판단을 대체하지 않으며, 실데이터·사람 검토·운영 증거가 없으면 VERIFIED PASS를 부여하지 않습니다.',
  cta:'공공기관·기업 실증 상담'
 }:{
  eye:'PROOF-GRADE SAFETY AX · v28.33',
  title:'Verify data governance and pilot readiness — not only operational features.',
  body:'COREON evaluates whether capabilities can be proven in real operations. It does not manufacture outcomes without samples, and customer data is not treated as AI training data by default.',
  cards:[
   ['Safety Evidence Dataset','Verify provenance, retention/deletion, return, personal-data classification and training-use rights separately.'],
   ['DPIA / Privacy impact','Check processing purpose, data flows, roles, access controls, retention/deletion, incident response and risk treatment.'],
   ['Support / SLA','Measure first response, resolution time, SLA breaches and escalations from actual support records.'],
   ['Pilot Evidence Report','Allow before/after comparison only with explicit baseline/current periods and real operational samples.'],
   ['Management Intelligence','Prioritize overdue actions, open high-risk events, recurrence and contractor control gaps from real event evidence.']
  ],
  note:'Verification boundary · AI does not replace safety judgment, and VERIFIED PASS requires real data, human review and operational evidence.',
  cta:'Discuss a Public / Enterprise pilot'
 };
 const section=document.createElement('section');section.id='coreon-proof-grade-v285';section.className='coreon-proof-grade-v285';
 section.innerHTML=`<div class="w"><div class="pg-head"><span class="pg-eye">${copy.eye}</span><h2>${copy.title}</h2><p>${copy.body}</p></div><div class="pg-grid">${copy.cards.map(c=>`<article><b>${c[0]}</b><p>${c[1]}</p></article>`).join('')}</div><div class="pg-note">${copy.note}</div><a class="pg-cta" href="${lang==='ko'?'https://app.coreon-global.com/enterprise-inquiry.html?source=coreon-home-proof-grade-v2812':'https://app.coreon-global.com/en/enterprise-inquiry.html?source=coreon-en-proof-grade-v2812'}">${copy.cta} →</a></div>`;
 const style=document.createElement('style');style.textContent=`.coreon-proof-grade-v285{padding:72px 0;background:#f3f8fc}.coreon-proof-grade-v285 .pg-head{max-width:940px;margin-bottom:26px}.coreon-proof-grade-v285 .pg-eye{font-size:12px;font-weight:950;letter-spacing:.08em;color:#0b8f83}.coreon-proof-grade-v285 h2{font-size:clamp(30px,4vw,48px);line-height:1.15;letter-spacing:-.035em;margin:8px 0 14px}.coreon-proof-grade-v285 .pg-head p,.coreon-proof-grade-v285 article p{color:#63768a;line-height:1.7}.coreon-proof-grade-v285 .pg-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.coreon-proof-grade-v285 article{background:#fff;border:1px solid #dbe5ee;border-radius:18px;padding:19px;min-height:190px}.coreon-proof-grade-v285 article b{font-size:17px}.coreon-proof-grade-v285 .pg-note{margin-top:14px;padding:14px 16px;border-radius:14px;background:#fff7ed;border:1px solid #fdba74;font-size:13px;line-height:1.6}.coreon-proof-grade-v285 .pg-cta{display:inline-flex;margin-top:16px;min-height:48px;align-items:center;padding:0 18px;border-radius:999px;background:#1269d3;color:#fff;font-weight:950}@media(max-width:1100px){.coreon-proof-grade-v285 .pg-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:900px){.coreon-proof-grade-v285 .pg-grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.coreon-proof-grade-v285{padding:52px 0}.coreon-proof-grade-v285 .pg-grid{grid-template-columns:1fr}.coreon-proof-grade-v285 article{min-height:auto}.coreon-proof-grade-v285 .pg-cta{width:100%;justify-content:center}}`;
 document.head.appendChild(style);
 const old=document.getElementById('coreon-proof-grade-v284');if(old)old.remove();
 const trust=document.querySelector('#trust');if(trust)trust.parentNode.insertBefore(section,trust);else document.querySelector('main')?.appendChild(section);
})();

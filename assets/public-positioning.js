(() => {
  'use strict';
  const homePaths=['/','/index.html','/en/','/en/index.html'];
  if(!homePaths.includes(location.pathname)) return;
  const ko=document.documentElement.lang.toLowerCase().startsWith('ko');

  const apply=()=>{
    const arch=document.querySelector('.coreon-execution-architecture');
    if(arch && arch.dataset.publicPositioning!=='1'){
      const eyebrow=arch.querySelector('.coreon-exec-eyebrow');
      if(eyebrow) eyebrow.textContent='INDUSTRIAL SAFETY EXECUTION & ASSURANCE';
      const cards=Array.from(arch.querySelectorAll('.coreon-exec-layers article'));
      const copy=ko?[
        ['FIELD EXECUTION','Safety Execution','현장 사용자는 위험 제보, 책임·기한, 개선조치와 증빙에 집중합니다. 복잡한 내부 통제는 뒤에서 작동합니다.'],
        ['MANAGEMENT CONTROL','Safety Control','본사·CSO는 Critical Open Risk, Overdue Action, Evidence Gap, Reopened Case, Governance Gap을 우선 확인합니다.'],
        ['ASSURANCE','Safety Assurance','사람의 검토, 유효한 증빙, 잔여위험과 권한이 충족되어야 책임 있는 종결이 가능하도록 통제합니다.']
      ]:[
        ['FIELD EXECUTION','Safety Execution','Field users focus on reporting, ownership, corrective action and evidence while complex controls remain behind the workflow.'],
        ['MANAGEMENT CONTROL','Safety Control','Head office and executives prioritize critical open risk, overdue action, evidence gaps, reopened cases and governance gaps.'],
        ['ASSURANCE','Safety Assurance','Human review, valid evidence, residual-risk verification and authorized closure must converge before a case can be trusted as closed.']
      ];
      cards.slice(0,3).forEach((card,i)=>{
        const tag=card.querySelector(':scope > span');
        const h=card.querySelector('h3');
        const p=card.querySelector('p');
        if(tag) tag.textContent=copy[i][0];
        if(h) h.textContent=copy[i][1];
        if(p) p.textContent=copy[i][2];
      });
      const rule=arch.querySelector('.coreon-exec-rule span');
      if(rule) rule.textContent=ko?'모든 위험은 사람의 확인, 책임 있는 조치, 검증된 증빙, 잔여위험 재확인과 책임 있는 종결까지 이어져야 합니다.':'Every risk should progress through human verification, accountable action, verified evidence, residual-risk reassessment and accountable closure.';
      arch.dataset.publicPositioning='1';
    }

    document.querySelectorAll('a[href*="pricing.html"]').forEach(a=>a.remove());
    document.querySelectorAll('#plans,[data-pricing-section]').forEach(node=>node.remove());
    document.documentElement.dataset.coreonPublicPositioning='execution-assurance-v1';
  };

  apply();
  const observer=new MutationObserver(()=>apply());
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),5000);
})();
(()=>{if(document.getElementById('coreon-layout-refinement-v27736'))return;const s=document.createElement('style');s.id='coreon-layout-refinement-v27736';s.textContent=`
/* v27.73.6 — Autodesk-inspired card proportion + typography refinement, preserving COREON identity */
@media(min-width:1200px){
  .w,#coreon-governance>div,#coreon-free-success>div,#coreon-company-trust>div,.cpg-w,.cgb{width:min(1420px,calc(100% - 112px))!important}
  section{padding:66px 0!important}
  .head{max-width:820px!important;margin-bottom:28px!important}
  .head h2{font-size:clamp(32px,3vw,45px)!important;line-height:1.14!important}
  .head p{font-size:17px!important;line-height:1.68!important}
  .hero h1{font-size:clamp(46px,4.2vw,62px)!important;line-height:1.055!important}
  .hero p{font-size:18px!important;max-width:720px!important}
  .hg{gap:68px!important}
  .fc,.card,.pv{border-radius:12px!important}
  .fc,.card{padding:24px!important}
  .fc b,.card h3{font-size:20px!important;line-height:1.3!important}
  .fc span,.card p{font-size:15px!important;line-height:1.65!important}
  .proof{gap:24px!important}.copy{padding:24px!important}.copy h3{font-size:23px!important;line-height:1.28!important}.copy p{font-size:15px!important;line-height:1.65!important}
  #coreon-governance{padding:70px 0!important}
  #coreon-governance>div>div:first-child{max-width:960px!important;margin-bottom:32px!important}
  #coreon-governance h2{font-size:clamp(38px,3.3vw,50px)!important;line-height:1.12!important;max-width:1040px!important}
  #coreon-governance>div>div:first-child p{font-size:17px!important;line-height:1.68!important;max-width:900px!important}
  .cgov-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:22px!important;align-items:stretch!important}
  .cgov-grid article{aspect-ratio:1/1!important;min-height:0!important;padding:28px 26px!important;border-radius:12px!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important}
  .cgov-grid small{font-size:13px!important;letter-spacing:.01em!important}
  .cgov-grid strong{font-size:22px!important;line-height:1.25!important;margin:10px 0 16px!important}
  .cgov-grid p{font-size:15.5px!important;line-height:1.68!important;margin:0!important;max-width:29ch!important}
  .cgov-flow{margin-top:24px!important;padding:17px 22px!important;border-radius:12px!important;font-size:15px!important;gap:11px!important}
  .cgov-btn{min-height:48px!important;font-size:15px!important;padding:0 20px!important}
  .roles,.hub{gap:22px!important}
  .hub .card{min-height:250px!important}
}
@media(min-width:1500px){
  .w,#coreon-governance>div,#coreon-free-success>div,#coreon-company-trust>div,.cpg-w,.cgb{width:min(1480px,calc(100% - 128px))!important}
  .cgov-grid article{padding:30px 28px!important}
  .cgov-grid strong{font-size:23px!important}.cgov-grid p{font-size:16px!important}
}
@media(min-width:901px) and (max-width:1199px){
  .w,#coreon-governance>div,#coreon-free-success>div,#coreon-company-trust>div,.cpg-w,.cgb{width:min(100% - 56px,1120px)!important}
  .cgov-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important}
  .cgov-grid article{aspect-ratio:auto!important;min-height:220px!important;padding:26px!important;border-radius:12px!important}
  .cgov-grid strong{font-size:21px!important}.cgov-grid p{font-size:15px!important}
  #coreon-governance h2{font-size:clamp(35px,4.2vw,45px)!important}
  .hero h1{font-size:clamp(42px,5vw,56px)!important}
}
@media(max-width:900px){
  .w,#coreon-governance>div,#coreon-free-success>div,#coreon-company-trust>div,.cpg-w,.cgb{width:calc(100% - 32px)!important}
  section{padding:52px 0!important}
  .hero h1{font-size:clamp(36px,10vw,44px)!important;line-height:1.07!important}
  .hero p{font-size:16px!important;line-height:1.64!important}
  .head h2{font-size:clamp(29px,8.3vw,37px)!important;line-height:1.13!important}
  .head p{font-size:15.5px!important}
  .fc,.card,.pv{border-radius:12px!important}
  .fc,.card{padding:21px!important}.fc b,.card h3{font-size:19px!important}.fc span,.card p{font-size:14.5px!important}
  #coreon-governance{padding:52px 0!important}
  #coreon-governance h2{font-size:clamp(31px,9vw,39px)!important;line-height:1.1!important}
  #coreon-governance>div>div:first-child p{font-size:15.5px!important;line-height:1.65!important}
  .cgov-grid{grid-template-columns:1fr!important;gap:14px!important}
  .cgov-grid article{aspect-ratio:auto!important;min-height:0!important;padding:22px!important;border-radius:12px!important}
  .cgov-grid small{font-size:12px!important}.cgov-grid strong{font-size:20px!important;line-height:1.25!important;margin:8px 0 10px!important}.cgov-grid p{font-size:15px!important;line-height:1.62!important;max-width:none!important}
  .cgov-flow{padding:15px!important;font-size:13.5px!important;line-height:1.5!important;border-radius:10px!important}
  .cgov-btn{min-height:48px!important;font-size:14px!important}
}
@media(max-width:560px){
  .w,#coreon-governance>div,#coreon-free-success>div,#coreon-company-trust>div,.cpg-w,.cgb{width:calc(100% - 24px)!important}
  .hero h1{font-size:clamp(34px,10.4vw,40px)!important}
  .hero p{font-size:15.5px!important}
  .cgov-grid article{padding:20px!important}.cgov-grid strong{font-size:19px!important}.cgov-grid p{font-size:14.5px!important}
}`;document.head.appendChild(s)})();
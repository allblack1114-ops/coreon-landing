(()=>{
  const EXPECTED_TAG='coreon-ax-v28.12.0';
  const API='https://api.github.com/repos/allblack1114-ops/coreon-landing/releases/latest';
  const en=(document.documentElement.lang||'ko').toLowerCase().startsWith('en');
  const links=[...document.querySelectorAll('[data-release-asset]')];
  const state=document.querySelector('[data-release-state]');
  if(!links.length)return;
  const labels=en?{
    winPending:'Signed Windows installer pending',armPending:'Signed/notarized Apple Silicon build pending',intelPending:'Signed/notarized Intel Mac build pending',
    pending:'The official signed/notarized desktop release is not active yet. Verification builds are never exposed as customer downloads.',
    waiting:'Downloads activate automatically only after the approved signed/notarized GitHub Release is published.',
    winReady:'Official Windows download',armReady:'Official Apple Silicon download',intelReady:'Official Intel Mac download',
    ready:'COREON Safety AX Agent v28.12 signed production release verified. SHA-256 checksums are included in the GitHub Release.'
  }:{
    winPending:'공식 서명 Windows 설치파일 준비 중',armPending:'Apple Silicon 공식 서명·공증 준비 중',intelPending:'Intel Mac 공식 서명·공증 준비 중',
    pending:'현재 고객용 공식 서명·공증 Desktop Release는 아직 활성화되지 않았습니다. 검증용 빌드를 고객 다운로드로 노출하지 않습니다.',
    waiting:'공식 코드서명·공증 Release가 승인되면 다운로드가 자동으로 활성화됩니다.',
    winReady:'Windows용 공식 다운로드',armReady:'Apple Silicon 공식 다운로드',intelReady:'Intel Mac 공식 다운로드',
    ready:'COREON Safety AX Agent v28.12 공식 서명 배포가 확인되었습니다. SHA-256 검증 정보는 GitHub Release에서 함께 제공합니다.'
  };
  const textFor=(name,ready=false)=>name.includes('win-x64')?(ready?labels.winReady:labels.winPending):name.includes('arm64')?(ready?labels.armReady:labels.armPending):(ready?labels.intelReady:labels.intelPending);
  const pending=(message)=>{
    links.forEach(a=>{a.classList.add('pending');a.setAttribute('aria-disabled','true');a.href='#';a.textContent=textFor(a.dataset.releaseAsset||'',false)});
    if(state){state.classList.remove('ready');state.textContent=message||labels.waiting}
  };
  pending();
  fetch(API,{headers:{Accept:'application/vnd.github+json'}}).then(async r=>{
    if(r.status===404)throw new Error('NO_OFFICIAL_RELEASE');
    if(!r.ok)throw new Error('RELEASE_LOOKUP_FAILED');
    return r.json();
  }).then(release=>{
    if(release.draft||release.prerelease||release.tag_name!==EXPECTED_TAG)throw new Error('OFFICIAL_RELEASE_NOT_CANONICAL');
    const assets=new Map((release.assets||[]).map(x=>[x.name,x.browser_download_url]));
    for(const a of links){const name=a.dataset.releaseAsset;if(!assets.has(name))throw new Error('OFFICIAL_RELEASE_ASSET_MISSING:'+name)}
    links.forEach(a=>{const name=a.dataset.releaseAsset;a.href=assets.get(name);a.classList.remove('pending');a.removeAttribute('aria-disabled');a.textContent=textFor(name,true)});
    if(state){state.classList.add('ready');state.textContent=labels.ready}
  }).catch(()=>pending(labels.pending));
})();

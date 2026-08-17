(()=>{
  const EXPECTED_TAG='coreon-ax-v28.12.0';
  const API='https://api.github.com/repos/allblack1114-ops/coreon-landing/releases/latest';
  const links=[...document.querySelectorAll('[data-release-asset]')];
  const state=document.querySelector('[data-release-state]');
  if(!links.length)return;
  const pending=(message)=>{
    links.forEach(a=>{a.classList.add('pending');a.setAttribute('aria-disabled','true');a.href='#';const name=a.dataset.releaseAsset||'';a.textContent=name.includes('win-x64')?'공식 서명 Windows 설치파일 준비 중':name.includes('arm64')?'Apple Silicon 공식 서명·공증 준비 중':'Intel Mac 공식 서명·공증 준비 중'});
    if(state){state.classList.remove('ready');state.textContent=message||'공식 코드서명·공증 Release가 승인되면 다운로드가 자동으로 활성화됩니다.'}
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
    links.forEach(a=>{const name=a.dataset.releaseAsset;a.href=assets.get(name);a.classList.remove('pending');a.removeAttribute('aria-disabled');a.textContent=name.includes('win-x64')?'Windows용 공식 다운로드':name.includes('arm64')?'Apple Silicon 공식 다운로드':'Intel Mac 공식 다운로드'});
    if(state){state.classList.add('ready');state.textContent='COREON Safety AX Agent v28.12 공식 서명 배포가 확인되었습니다. SHA-256 검증 정보는 GitHub Release에서 함께 제공합니다.'}
  }).catch(()=>pending('현재 고객용 공식 서명·공증 Desktop Release는 아직 활성화되지 않았습니다. 검증용 빌드를 고객 다운로드로 노출하지 않습니다.'));
})();

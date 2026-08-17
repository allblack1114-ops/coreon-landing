(()=>{
  const EXPECTED_TAG='coreon-ax-v28.12.0';
  const REQUIRED_META='SHA256SUMS.txt';
  const API='https://api.github.com/repos/allblack1114-ops/coreon-landing/releases/latest';
  const en=(document.documentElement.lang||'ko').toLowerCase().startsWith('en');
  const links=[...document.querySelectorAll('[data-release-asset]')];
  const state=document.querySelector('[data-release-state]');
  if(!links.length)return;

  const fallback='https://app.coreon-global.com/customer-portal?source=desktop-install-fallback';
  const labels=en?{
    winFallback:'Use COREON now on Windows',armFallback:'Use COREON now on Apple Silicon',intelFallback:'Use COREON now on Intel Mac',
    fallback:'The native installer is being published. You can use the same COREON Safety AX Agent immediately through the authenticated product.',
    winReady:'Download Windows installer',armReady:'Download Apple Silicon installer',intelReady:'Download Intel Mac installer',
    ready:'COREON Safety AX Agent desktop installers are available now.'
  }:{
    winFallback:'Windows에서 바로 사용',armFallback:'Apple Silicon에서 바로 사용',intelFallback:'Intel Mac에서 바로 사용',
    fallback:'네이티브 설치파일 배포가 진행 중입니다. 지금도 동일한 COREON Safety AX Agent를 바로 사용할 수 있습니다.',
    winReady:'Windows 설치파일 다운로드',armReady:'Apple Silicon 설치파일 다운로드',intelReady:'Intel Mac 설치파일 다운로드',
    ready:'COREON Safety AX Agent 데스크톱 설치파일을 바로 내려받을 수 있습니다.'
  };

  const textFor=(name,ready=false)=>name.includes('win-x64')?(ready?labels.winReady:labels.winFallback):name.includes('arm64')?(ready?labels.armReady:labels.armFallback):(ready?labels.intelReady:labels.intelFallback);

  const setFallback=(message)=>{
    links.forEach(a=>{
      a.classList.remove('pending');
      a.removeAttribute('aria-disabled');
      a.href=fallback;
      a.textContent=textFor(a.dataset.releaseAsset||'',false);
    });
    if(state){state.classList.remove('ready');state.textContent=message||labels.fallback;}
  };

  setFallback();
  fetch(API,{headers:{Accept:'application/vnd.github+json'}}).then(async r=>{
    if(r.status===404)throw new Error('NO_RELEASE');
    if(!r.ok)throw new Error('RELEASE_LOOKUP_FAILED');
    return r.json();
  }).then(release=>{
    if(release.draft||release.prerelease||release.tag_name!==EXPECTED_TAG)throw new Error('RELEASE_NOT_CANONICAL');
    const assets=new Map((release.assets||[]).map(x=>[x.name,x.browser_download_url]));
    if(!assets.has(REQUIRED_META))throw new Error('CHECKSUM_MISSING');
    for(const a of links){const name=a.dataset.releaseAsset;if(!assets.has(name))throw new Error('ASSET_MISSING:'+name)}
    links.forEach(a=>{
      const name=a.dataset.releaseAsset;
      a.href=assets.get(name);
      a.classList.remove('pending');
      a.removeAttribute('aria-disabled');
      a.textContent=textFor(name,true);
    });
    if(state){state.classList.add('ready');state.textContent=labels.ready;}
  }).catch(()=>setFallback(labels.fallback));
})();

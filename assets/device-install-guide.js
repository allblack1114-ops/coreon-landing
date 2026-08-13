(()=>{
  const en=(document.documentElement.lang||'ko').toLowerCase().startsWith('en');
  const ua=navigator.userAgent||'',platform=navigator.userAgentData?.platform||navigator.platform||'';
  const ios=/iPhone|iPad|iPod/i.test(ua)||(/Mac/i.test(platform)&&navigator.maxTouchPoints>1);
  const android=/Android/i.test(ua),windows=/Windows/i.test(ua)||/Win/i.test(platform),mac=!ios&&(/Macintosh|Mac OS X/i.test(ua)||/Mac/i.test(platform));
  const device=ios?'iPhone / iPad':android?'Android':windows?'Windows':mac?'macOS':'Other';
  const message=en
    ? ios?'Use Safari → Share → Add to Home Screen.'
      : mac?'Use Safari Add to Dock or a supported browser app-install command.'
      : windows||android?'Open the COREON Install Center and use the install command offered by your supported browser.'
      :'Open the COREON Install Center to check the supported installation path for this device.'
    : ios?'Safari → 공유 → 홈 화면에 추가를 사용하세요.'
      : mac?'Safari의 Dock에 추가 또는 지원 브라우저의 앱 설치 기능을 사용하세요.'
      : windows||android?'COREON 설치센터를 열고 지원 브라우저가 제공하는 설치 기능을 사용하세요.'
      :'COREON 설치센터에서 이 기기의 지원 설치방법을 확인하세요.';
  const host=document.querySelector('[data-device-guide]');
  if(!host)return;
  host.innerHTML=`<strong>${en?'Detected device':'현재 기기'}: ${device}</strong><span>${message}</span><a href="https://app.coreon-global.com/install.html?source=public-download&device=${encodeURIComponent(device.toLowerCase())}">${en?'Open Install Center':'설치센터 열기'}</a>`;
  host.dataset.device=device.toLowerCase();
})();
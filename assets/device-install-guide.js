(()=>{
  const en=(document.documentElement.lang||'ko').toLowerCase().startsWith('en');
  const ua=navigator.userAgent||'',platform=navigator.userAgentData?.platform||navigator.platform||'';
  const ios=/iPhone|iPad|iPod/i.test(ua)||(/Mac/i.test(platform)&&navigator.maxTouchPoints>1);
  const android=/Android/i.test(ua),windows=/Windows/i.test(ua)||/Win/i.test(platform),mac=!ios&&(/Macintosh|Mac OS X/i.test(ua)||/Mac/i.test(platform));
  const device=ios?'iPhone / iPad':android?'Android':windows?'Windows':mac?'macOS':'Web';
  const message=en
    ? ios?'Use Safari → Share → Add to Home Screen. Installation is optional for field participation.'
      : mac?'Use Safari Add to Dock or a supported browser app-install command.'
      : windows||android?'Open the COREON Install Center and use the browser Install command when offered.'
      :'You can open COREON on the web now and use the Install Center on a supported device.'
    : ios?'Safari → 공유 → 홈 화면에 추가를 사용하세요. 현장 참여자에게 설치는 필수가 아닙니다.'
      : mac?'Safari의 Dock에 추가 또는 지원 브라우저의 앱 설치 기능을 사용하세요.'
      : windows||android?'COREON 설치센터를 열고 브라우저가 제공하는 설치 기능을 사용하세요.'
      :'웹에서 바로 시작할 수 있으며, 지원 기기에서는 설치센터를 이용할 수 있습니다.';
  const host=document.querySelector('[data-device-guide]');
  if(!host)return;
  host.innerHTML=`<strong>${en?'Detected device':'현재 기기'}: ${device}</strong><span>${message}</span><a href="https://app.coreon-global.com/install.html?source=public-download&device=${encodeURIComponent(device.toLowerCase())}">${en?'Open Install Center':'설치센터 열기'}</a>`;
  host.dataset.device=device.toLowerCase();
})();

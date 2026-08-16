'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const release=JSON.parse(fs.readFileSync('release-axis.json','utf8')).releaseAxis;
const ko=fs.readFileSync('index.html','utf8');
const en=fs.readFileSync('en/index.html','utf8');
for(const [lang,html] of [['ko',ko],['en',en]]){
 assert(html.includes('class="menu-toggle"'),`${lang}: mobile menu toggle missing`);
 assert(html.includes('id="site-nav"'),`${lang}: unified nav id missing`);
 assert(html.includes("classList.toggle('open')"),`${lang}: mobile menu behavior missing`);
 assert(html.includes(`data-release-axis="${release}"`),`${lang}: canonical release badge missing`);
 assert(!/v(?:19|20|21|22|23|24|25|26|27)\.\d+[^<]*<\/strong>/.test(html),`${lang}: stale visible release badge`);
}
assert(ko.includes('/download.html?source=coreon-home-free-start'),'ko: primary free-start must go to download center');
assert(ko.includes('/download.html?source=coreon-home-bottom-free'),'ko: bottom CTA must remain download-first');
assert(en.includes('/en/download.html?source=coreon-en-free-start'),'en: primary free-start must go to download center');
assert(en.includes('/en/download.html?source=coreon-en-bottom-free'),'en: bottom CTA must remain download-first');
console.log(JSON.stringify({status:'PASS',gate:'landing-surface-parity',release,koMobile:'PASS',enMobile:'PASS',downloadFirst:'PASS'}));
(()=>{const h=document.querySelector('.header');if(!h)return;const nav=h.querySelector('.nav');const links=h.querySelector('.links');if(!nav||!links)return;
const en=(document.documentElement.lang||'').startsWith('en');links.id=links.id||'site-links';
const b=document.createElement('button');b.type='button';b.className='menu-toggle';b.setAttribute('aria-controls',links.id);b.setAttribute('aria-expanded','false');b.setAttribute('aria-label',en?'Open menu':'메뉴 열기');b.innerHTML='<span aria-hidden="true"></span>';
const brand=nav.querySelector('.brand');brand?brand.after(b):nav.prepend(b);
const set=o=>{h.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));b.setAttribute('aria-label',o?(en?'Close menu':'메뉴 닫기'):(en?'Open menu':'메뉴 열기'))};
b.addEventListener('click',()=>set(!h.classList.contains('open')));
links.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&h.classList.contains('open')){set(false);b.focus()}});
matchMedia('(min-width:1381px)').addEventListener('change',e=>{if(e.matches)set(false)});})();

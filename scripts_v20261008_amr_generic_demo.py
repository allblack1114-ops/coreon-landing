"""Insert brand-neutral field-scenario demo panel (AMR·AGV / construction / energy) under the
EQUIPMENT INPUT card on KO/EN home. Idempotent: re-running replaces the panel."""
import json, re, html
V = '/assets/video/'
def vid(n): return V + n + '.mp4'
def pos(n): return V + n + '.jpg'
AMR_KO, AMR_EN = 'coreon-amr-safety-demo-ko-20261008', 'coreon-amr-safety-demo-en-20261008'
CON, ENE = 'coreon-safety-ax-construction-demo-ko-20261008', 'coreon-safety-ax-energy-demo-ko-20261008'
P = lambda n: pos(n.replace('-2026', '-poster-2026'))

NOTE_KO = ('특정 고객사·제조사와 무관한 브랜드 중립 시나리오입니다. 현장 장면은 AI로 생성한 연출이며, 제품 화면은 실제 COREON Safety AX를 시연 환경의 가상 이벤트·가상 데이터로 녹화했습니다. '
           '특정 제품·고객과의 연동·제휴·계약을 의미하지 않으며, 실제 연동 범위는 고객 현장의 인터페이스 검증 후 확정합니다.')
NOTE_EN = ('Brand-neutral scenarios unrelated to any specific customer or manufacturer. Site scenes are AI-generated; product screens are the actual COREON Safety AX recorded with virtual events and data in a demo environment. '
           'They do not imply integration, endorsement or contracts with any product or customer; actual integration scope is confirmed after interface validation at the customer site.')

SECTORS = {
 'ko': [
  dict(id='amr', tab='AMR·AGV', k='EQUIPMENT INPUT · AMR·AGV', title='로봇의 위험신호를, 검증된 안전조치 종결까지.', sub='물류·제조 현장의 반복 보호정지를 가상 이벤트로 재현한 이동장비 안전 실행 흐름',
       langs=[('ko', '한국어 3:02', vid(AMR_KO), P(AMR_KO)), ('en', 'English 3:34', vid(AMR_EN), P(AMR_EN))],
       flow=['보호정지 반복', '후보 사건 접수', '사람 검토', '담당자·기한', '현장 조치', '증빙 SHA-256', '잔여위험 재평가', '직무분리 승인', '종결 증명'],
       extra='COREON은 로봇의 운행·안전제어·비상정지를 대체하거나 변경하지 않으며, COREON의 종결은 로봇 재가동 허가가 아닙니다.'),
  dict(id='construction', tab='건설 현장', k='HUMAN · SYSTEM INPUT · 건설', title='위험 발견 이후, 종결까지를 증명합니다.', sub='주택·건축·토목·플랜트·전력인프라 현장의 서로 다른 신호를 하나의 종결 절차로',
       langs=[('ko', '한국어 2:24', vid(CON), P(CON))],
       flow=['현장 제보·CCTV·센서', '사람 확정', '담당·기한', '조치·증빙', '잔여위험 재평가', '권한자 승인', '종결 증명'],
       extra='화면의 CCTV·센서 신호는 시연용 시뮬레이터 신호입니다.'),
  dict(id='energy', tab='정유·에너지', k='SYSTEM · HUMAN INPUT · 정유·에너지', title='AI는 판단을 돕고, 결정과 종결은 사람이 합니다.', sub='정유·석유화학 정기보수(TA) 기간 협력사 화기작업 위험의 조치부터 종결까지',
       langs=[('ko', '한국어 2:35', vid(ENE), P(ENE))],
       flow=['가스감지 경보·현장 제보', 'AI 분류·안내(참고)', '사람 확정', '조치·증빙', '잔여위험 재평가', '직무분리 승인', '종결 증명'],
       extra='COREON은 공정제어·비상대응 체계를 대신하지 않습니다. 화면의 AI 안내는 규칙 기반 참고 안내입니다.'),
 ],
 'en': [
  dict(id='amr', tab='AMR/AGV', k='EQUIPMENT INPUT · AMR/AGV', title='From a robot’s safety signal to verified closure.', sub='Repeated protective stops at a logistics or manufacturing site, recreated with a virtual event',
       langs=[('en', 'English 3:34', vid(AMR_EN), P(AMR_EN)), ('ko', 'Korean 3:02', vid(AMR_KO), P(AMR_KO))],
       flow=['Repeated protective stop', 'Candidate event', 'Human review', 'Owner · deadline', 'Field action', 'Evidence SHA-256', 'Residual reassessment', 'Segregated approval', 'Closure proof'],
       extra='COREON does not replace or change robot operation, safety control or emergency stop, and a COREON closure is not a permit to restart a robot.'),
  dict(id='construction', tab='Construction', k='HUMAN · SYSTEM INPUT · CONSTRUCTION', title='After a hazard is found, prove it all the way to closure.', sub='Different signals from housing, building, civil, plant and power sites, one closure procedure',
       langs=[('ko', 'Korean narration 2:24', vid(CON), P(CON))],
       flow=['Field report · CCTV · sensor', 'Human confirmation', 'Owner · deadline', 'Action · evidence', 'Residual reassessment', 'Authorized approval', 'Closure proof'],
       extra='CCTV and sensor signals on screen come from a demo simulator. Narration and screens are in Korean.'),
  dict(id='energy', tab='Refining · Energy', k='SYSTEM · HUMAN INPUT · REFINING/ENERGY', title='AI assists the judgment. People decide and close.', sub='Hot-work risk by contractors during a refinery turnaround, from action to closure',
       langs=[('ko', 'Korean narration 2:35', vid(ENE), P(ENE))],
       flow=['Gas alarm · field report', 'AI triage (reference)', 'Human confirmation', 'Action · evidence', 'Residual reassessment', 'Segregated approval', 'Closure proof'],
       extra='COREON does not replace process control or emergency response. On-screen AI guidance is rule-based reference. Narration and screens are in Korean.'),
 ]}

def panel(lang):
    S = SECTORS[lang]; s0 = S[0]; ko = lang == 'ko'
    tabs = ''.join(f'<button type="button" role="tab" data-sector="{s["id"]}" aria-selected="{str(i == 0).lower()}">{s["tab"]}</button>' for i, s in enumerate(S))
    data = html.escape(json.dumps({s['id']: s for s in S}, ensure_ascii=False), quote=True)
    ltabs = ''.join(f'<button type="button" data-src="{u}" data-poster="{p}" aria-pressed="{str(i == 0).lower()}">{lab}</button>' for i, (l, lab, u, p) in enumerate(s0['langs']))
    chips = ''.join(f'<li>{x}</li>' for x in s0['flow'])
    b1, b2 = ('가상 데이터', 'AI 생성 장면 포함') if ko else ('Virtual data', 'Includes AI-generated scenes')
    return (f'<div class="amr-demo" id="amr-demo" data-sectors="{data}" aria-labelledby="amr-demo-title">'
            f'<div class="amr-sector" role="tablist" aria-label="{"현장 시나리오 선택" if ko else "Choose a field scenario"}">{tabs}</div>'
            f'<div class="amr-top"><div><span class="amr-k">{s0["k"]}</span><h3 id="amr-demo-title">{s0["title"]}</h3><p class="amr-sub">{s0["sub"]}</p></div>'
            f'<div class="lang-tabs" role="group" aria-label="{"영상 언어 선택" if ko else "Video language"}">{ltabs}</div></div>'
            f'<div class="player"><video id="amr-demo-video" controls preload="none" playsinline poster="{s0["langs"][0][3]}" aria-label="{"COREON 현장 시나리오 시연영상" if ko else "COREON field scenario demo video"}"><source src="{s0["langs"][0][2]}" type="video/mp4"></video></div>'
            f'<div class="amr-meta"><ul class="amr-flow">{chips}</ul><div class="amr-badges"><span>{b1}</span><span>{b2}</span></div></div>'
            f'<p class="amr-note"><span class="amr-extra">{s0["extra"]}</span> {NOTE_KO if ko else NOTE_EN}</p></div>')

CUE = {'ko': '<a class="amr-cue" href="#amr-demo">▶ AMR·AGV 시연영상</a>', 'en': '<a class="amr-cue" href="#amr-demo">▶ AMR/AGV demo</a>'}
JS = ("<script>(function(){var r=document.getElementById('amr-demo');if(!r)return;var D=JSON.parse(r.dataset.sectors),v=document.getElementById('amr-demo-video'),lt=r.querySelector('.lang-tabs');"
      "function src(u,p){v.pause();v.setAttribute('poster',p);v.querySelector('source').setAttribute('src',u);v.load();}"
      "function langs(s){lt.innerHTML='';s.langs.forEach(function(l,i){var b=document.createElement('button');b.type='button';b.textContent=l[1];b.dataset.src=l[2];b.dataset.poster=l[3];b.setAttribute('aria-pressed',i?'false':'true');lt.appendChild(b);});}"
      "lt.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.getAttribute('aria-pressed')==='true')return;lt.querySelectorAll('button').forEach(function(y){y.setAttribute('aria-pressed',y===b?'true':'false')});src(b.dataset.src,b.dataset.poster);});"
      "r.querySelectorAll('.amr-sector button').forEach(function(t){t.addEventListener('click',function(){if(t.getAttribute('aria-selected')==='true')return;r.querySelectorAll('.amr-sector button').forEach(function(y){y.setAttribute('aria-selected',y===t?'true':'false')});var s=D[t.dataset.sector];"
      "r.querySelector('.amr-k').textContent=s.k;r.querySelector('#amr-demo-title').textContent=s.title;r.querySelector('.amr-sub').textContent=s.sub;r.querySelector('.amr-extra').textContent=s.extra;"
      "r.querySelector('.amr-flow').innerHTML=s.flow.map(function(x){var li=document.createElement('li');li.textContent=x;return li.outerHTML}).join('');langs(s);src(s.langs[0][2],s.langs[0][3]);});});"
      "document.querySelectorAll('a.amr-cue').forEach(function(a){a.addEventListener('click',function(){var t=r.querySelector('.amr-sector button[data-sector=\"amr\"]');if(t)t.click();});});})();</script>")
CSS = '<link rel="stylesheet" href="/assets/amr-demo-20261008.css?v=2">'

for lang, path in [('ko', 'index.html'), ('en', 'en/index.html')]:
    h = open(path, encoding='utf-8').read()
    if 'id="amr-demo"' in h:
        h = re.sub(r'<div class="amr-demo" id="amr-demo".*?</p></div>', lambda m: panel(lang), h, count=1, flags=re.S)
        h = re.sub(r"<script>\(function\(\)\{var r=document.getElementById\('amr-demo'\).*?</script>", lambda m: JS, h, count=1, flags=re.S)
        h = re.sub(r'<link rel="stylesheet" href="/assets/amr-demo-20261008.css\?v=\d+">', CSS, h)
        open(path, 'w', encoding='utf-8').write(h); print(path, 'updated'); continue
    eq = '<article class="signal-source"><img src="/assets/industry/manufacturing-automation.jpg"'
    assert h.count(eq) == 1, path
    h = h.replace(eq, '<article class="signal-source is-amr">' + CUE[lang] + '<img src="/assets/industry/manufacturing-automation.jpg"')
    tl = h.index('<div class="tech-line">', h.index('signal-stage'))
    end = h.index('</div>', tl) + len('</div>')
    h = h[:end] + panel(lang) + h[end:]
    sec_end = h.index('</section>', end) + len('</section>')
    h = h[:sec_end] + JS + h[sec_end:]
    anchor = '<link rel="stylesheet" href="/assets/demo-video-20261004.css?v=2">'
    assert anchor in h
    h = h.replace(anchor, anchor + CSS, 1)
    open(path, 'w', encoding='utf-8').write(h); print(path, 'inserted')

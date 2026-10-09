"""v20261009 반도체 제조 시연영상 탭 추가 (KO/EN) — 반도체 탭을 첫 번째·기본 선택으로 배치.
업종 공개용: 특정 고객사·제조사 실명 없음. 사용: python3 scripts_v20261009_semiconductor_demo.py"""
import json, html, re, pathlib
root = pathlib.Path(__file__).resolve().parent
V = '/assets/video/coreon-safety-ax-semiconductor-demo-ko-20261009.mp4'
P = '/assets/video/coreon-safety-ax-semiconductor-demo-ko-poster-20261009.jpg'
SITE = 'https://www.coreon-global.com'
SEC = {
 'ko': dict(id='semiconductor', tab='반도체 제조', k='SYSTEM · EQUIPMENT INPUT · 반도체',
   title='가스 경보 이후, 종결까지를 하나의 사건으로.',
   sub='반도체 FAB 가스룸의 독성가스 1차 경보를 가상 이벤트로 재현한 안전 실행 흐름',
   langs=[['ko', '한국어 3:03', V, P]],
   flow=['가스감지 경보(읽기 전용)', '후보 사건 접수', '사람 검토', '작업중지·연계 업무', '교육 확인·작업허가', '증빙 SHA-256', '잔여위험 재평가', '직무분리 승인', '종결 증명'],
   extra='COREON은 가스감지·인터록·비상대응 체계를 대체하지 않으며 설비를 제어하지 않습니다. COREON의 종결은 장비 재가동 허가가 아닙니다.',
   guide='', guideText=''),
 'en': dict(id='semiconductor', tab='Semiconductor', k='SYSTEM · EQUIPMENT INPUT · SEMICONDUCTOR',
   title='After a gas alarm, one event all the way to closure.',
   sub='A first-stage toxic gas alarm in a fab gas room, recreated with a virtual event',
   langs=[['ko', 'Korean narration 3:03', V, P]],
   flow=['Gas alarm (read-only)', 'Candidate event', 'Human review', 'Work stop · linked tasks', 'Training check · work permit', 'Evidence SHA-256', 'Residual reassessment', 'Segregated approval', 'Closure proof'],
   extra='COREON does not replace gas detection, interlocks or emergency response and does not control equipment. A COREON closure is not a permit to restart equipment.',
   guide='', guideText=''),
}
LD = {
 'ko': dict(name='반도체 FAB 가스 경보 이후 안전조치 종결 시연 | COREON Safety AX',
   description='반도체 FAB 가스룸의 독성가스 1차 경보가 읽기 전용 신호로 접수된 뒤 사람 검토, 작업중지·연계 업무, 교육 확인·작업허가, 협력사 모바일 증빙 SHA-256, 잔여위험 재평가, 직무분리 승인, 종결증명까지 이어지는 흐름을 실제 COREON 제품 화면(가상 데이터)으로 보여드립니다. 특정 고객사와 무관한 업종 시나리오이며 현장 장면은 AI 생성 연출입니다.'),
 'en': dict(name='After a semiconductor fab gas alarm: verified safety closure | COREON Safety AX',
   description='A first-stage toxic gas alarm in a fab gas room is received as a read-only signal and moves through human review, work stop and linked tasks, training check and work permit, contractor mobile evidence with SHA-256, residual risk reassessment, segregated approval and closure proof, shown on actual COREON product screens with virtual data. Korean narration; industry scenario unrelated to any specific customer; site scenes are AI-generated.'),
}
def esc(t): return html.escape(t, quote=False)
for lang, rel in (('ko', 'index.html'), ('en', 'en/index.html')):
    f = root / rel; s = f.read_text(encoding='utf-8'); S = SEC[lang]
    if 'data-sector="semiconductor"' in s: print('skip', rel); continue
    # 1) 데이터: 반도체를 맨 앞에
    m = re.search(r'data-sectors="([^"]*)"', s)
    D = json.loads(html.unescape(m.group(1))); D = {'semiconductor': S, **D}
    s = s[:m.start(1)] + html.escape(json.dumps(D, ensure_ascii=False), quote=True).replace('&#x27;', "'") + s[m.end(1):]
    # 2) 탭: 반도체를 첫 번째·선택 상태로
    a = s.index('class="amr-sector"'); a = s.index('>', a) + 1; b = s.index('</div>', a)
    tabs = s[a:b].replace('aria-selected="true"', 'aria-selected="false"')
    s = s[:a] + f'<button type="button" role="tab" data-sector="semiconductor" aria-selected="true">{S["tab"]}</button>' + tabs + s[b:]
    # 3) 초기 표시 내용 (amr-demo 패널 안에서만)
    P0 = s.index('id="amr-demo"'); P1 = s.index('class="verified-loop"', P0); head, s, tail = s[:P0], s[P0:P1], s[P1:]
    s = re.sub(r'(<span class="amr-k">)[^<]*(</span>)', lambda m: m.group(1) + esc(S['k']) + m.group(2), s, count=1)
    s = re.sub(r'(<h3 id="amr-demo-title">)[^<]*(</h3>)', lambda m: m.group(1) + esc(S['title']) + m.group(2), s, count=1)
    s = re.sub(r'(<p class="amr-sub">)[^<]*(</p>)', lambda m: m.group(1) + esc(S['sub']) + m.group(2), s, count=1)
    a = s.index('<div class="lang-tabs"', s.index('id="amr-demo"')); a = s.index('>', a) + 1; b = s.index('</div>', a)
    s = s[:a] + f'<button type="button" data-src="{V}" data-poster="{P}" aria-pressed="true">{esc(S["langs"][0][1])}</button>' + s[b:]
    a = s.index('<video id="amr-demo-video"'); b = s.index('</video>', a)
    vid = s[a:b]
    vid = re.sub(r'poster="[^"]*"', f'poster="{P}"', vid, count=1)
    vid = re.sub(r'(<source src=")[^"]*(")', lambda m: m.group(1) + V + m.group(2), vid, count=1)
    s = s[:a] + vid + s[b:]
    s = re.sub(r'(<ul class="amr-flow">).*?(</ul>)', lambda m: m.group(1) + ''.join(f'<li>{esc(x)}</li>' for x in S['flow']) + m.group(2), s, count=1, flags=re.S)
    s = re.sub(r'(<span class="amr-extra">)[^<]*(</span>)', lambda m: m.group(1) + esc(S['extra']) + m.group(2), s, count=1)
    s = s.replace('<a class="amr-guide" href=', '<a class="amr-guide" style="display:none" href=', 1)
    s = head + s + tail
    # 4) 가이드 없는 탭은 링크 숨김
    old = "if(g&&s.guide){g.href=s.guide;g.textContent=s.guideText;}"
    assert old in s, rel
    s = s.replace(old, "if(g){g.style.display=s.guide?'':'none';if(s.guide){g.href=s.guide;g.textContent=s.guideText;}}")
    # 5) #demo-semiconductor 딥링크
    j = s.index('})();</script>', s.index("document.querySelectorAll('a.amr-cue')"))
    s = s[:j] + "function dl(){if(location.hash==='#demo-semiconductor'){var t=r.querySelector('.amr-sector button[data-sector=\"semiconductor\"]');if(t){t.click();r.scrollIntoView({block:'start'});}}}dl();window.addEventListener('hashchange',dl);" + s[j:]
    # 6) 구조화 데이터
    m = re.search(r'(<script type="application/ld\+json" id="ld-field-videos">)(.*?)(</script>)', s, re.S)
    if m:
        G = json.loads(m.group(2))
        G['@graph'].insert(0, {'@type': 'VideoObject', '@id': f'{SITE}/#video-semi_ko', **LD[lang],
            'thumbnailUrl': [SITE + P], 'uploadDate': '2026-10-09T12:00:00+09:00', 'duration': 'PT3M3S',
            'contentUrl': SITE + V, 'inLanguage': 'ko',
            'publisher': {'@type': 'Organization', 'name': '주식회사 코레온홀딩스', 'url': SITE + '/'}})
        s = s[:m.start(2)] + json.dumps(G, ensure_ascii=False) + s[m.end(2):]
    else:
        print('no ld-field-videos in', rel)
    f.write_text(s, encoding='utf-8'); print('patched', rel)
# 7) 영상 사이트맵
f = root / 'sitemap-video.xml'; s = f.read_text(encoding='utf-8')
if 'semiconductor-demo-ko-20261009' not in s:
    def entry(loc, lang):
        return (f'  <url><loc>{loc}</loc><video:video><video:thumbnail_loc>{SITE}{P}</video:thumbnail_loc>'
                f'<video:title>{esc(LD[lang]["name"])}</video:title><video:description>{esc(LD[lang]["description"])}</video:description>'
                f'<video:content_loc>{SITE}{V}</video:content_loc><video:duration>183</video:duration>'
                f'<video:publication_date>2026-10-09T12:00:00+09:00</video:publication_date><video:family_friendly>yes</video:family_friendly></video:video></url>\n')
    i = s.index('  <url>')
    s = s[:i] + entry(SITE + '/', 'ko') + entry(SITE + '/en/', 'en') + s[i:]
    f.write_text(s, encoding='utf-8'); print('patched sitemap-video.xml')

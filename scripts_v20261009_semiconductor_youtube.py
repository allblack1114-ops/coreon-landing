"""v20261009 반도체 제조 시연영상 YouTube 주소 연결: VideoObject embedUrl·sameAs, 패널 'YouTube에서 보기' 링크(새 창)."""
import json, html, re, pathlib
root = pathlib.Path(__file__).resolve().parent
YID = 'kBk3lVWsX7s'; WATCH = f'https://www.youtube.com/watch?v={YID}'
TXT = {'ko': 'YouTube에서 보기 →', 'en': 'Watch on YouTube →'}
for lang, rel in (('ko', 'index.html'), ('en', 'en/index.html')):
    f = root / rel; s = f.read_text(encoding='utf-8')
    m = re.search(r'(<script type="application/ld\+json" id="ld-field-videos">)(.*?)(</script>)', s, re.S)
    G = json.loads(m.group(2))
    for v in G['@graph']:
        if v['@id'].endswith('#video-semi_ko'):
            v['embedUrl'] = f'https://www.youtube.com/embed/{YID}'; v['sameAs'] = [WATCH]
    s = s[:m.start(2)] + json.dumps(G, ensure_ascii=False) + s[m.end(2):]
    m = re.search(r'data-sectors="([^"]*)"', s)
    D = json.loads(html.unescape(m.group(1)))
    D['semiconductor']['guide'] = WATCH; D['semiconductor']['guideText'] = TXT[lang]
    s = s[:m.start(1)] + html.escape(json.dumps(D, ensure_ascii=False), quote=True).replace('&#x27;', "'") + s[m.end(1):]
    old = re.search(r'<a class="amr-guide" style="display:none" href="[^"]*">[^<]*</a>', s).group(0)
    s = s.replace(old, f'<a class="amr-guide" href="{WATCH}" target="_blank" rel="noopener">{TXT[lang]}</a>')
    old = "if(s.guide){g.href=s.guide;g.textContent=s.guideText;}"
    assert old in s
    s = s.replace(old, "if(s.guide){g.href=s.guide;g.textContent=s.guideText;if(/^https?:/.test(s.guide)){g.target='_blank';g.rel='noopener';}else{g.removeAttribute('target');g.removeAttribute('rel');}}")
    f.write_text(s, encoding='utf-8'); print('patched', rel)
f = root / 'sitemap-video.xml'; s = f.read_text(encoding='utf-8')
if f'embed/{YID}' not in s:
    s = re.sub(r'(<video:content_loc>[^<]*semiconductor-demo-ko-20261009\.mp4</video:content_loc>)', rf'\1<video:player_loc>https://www.youtube.com/embed/{YID}</video:player_loc>', s)
    f.write_text(s, encoding='utf-8'); print('patched sitemap-video.xml')

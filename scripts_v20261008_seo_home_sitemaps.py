"""SEO 2026-10-08 part 2: home VideoObject + guide links, video sitemap, sitemap.xml, feed.xml, robots, IndexNow. Idempotent."""
import json, re, html, sys
sys.path.insert(0, '.')
from scripts_v20261008_seo_video_guides import V, G, B, vobj, vurl, turl, UP
KEY = '7c3e9a41d2b84f6e9a05c1d7e3b2f846'
TODAY = '2026-10-08'
GUIDE = {'amr': 'amr-agv-mobile-equipment-safety', 'construction': 'construction-serious-accident-prevention', 'energy': 'refinery-turnaround-hot-work-safety'}

def home(path, ko):
    s = open(path, encoding='utf-8').read()
    pre = '/guides/' if ko else '/en/guides/'
    txt = {'amr': ('AMR·AGV 이동장비 안전관리 가이드 보기 →', 'AMR/AGV mobile equipment safety guide →'),
           'construction': ('건설 현장 중대재해 예방 가이드 보기 →', 'Construction serious accident prevention guide →'),
           'energy': ('정유·석유화학 정기보수 화기작업 가이드 보기 →', 'Refinery turnaround hot-work safety guide →')}
    # 1) guide fields in data-sectors JSON
    m = re.search(r'data-sectors="([^"]*)"', s)
    D = json.loads(html.unescape(m.group(1)))
    for k in D:
        D[k]['guide'] = pre + GUIDE[k] + '.html'; D[k]['guideText'] = txt[k][0 if ko else 1]
    s = s[:m.start(1)] + html.escape(json.dumps(D, ensure_ascii=False), quote=True) + s[m.end(1):]
    # 2) guide link element after note
    if 'class="amr-guide"' not in s:
        s = s.replace('</p></div><div class="verified-loop"', f'</p><a class="amr-guide" href="{D["amr"]["guide"]}">{D["amr"]["guideText"]}</a></div><div class="verified-loop"', 1)
        assert 'class="amr-guide"' in s
    # 3) JS: update guide link on tab change
    hook = "langs(s);src(s.langs[0][2],s.langs[0][3]);"
    if "amr-guide')" not in s:
        s = s.replace(hook, "var g=r.querySelector('.amr-guide');if(g&&s.guide){g.href=s.guide;g.textContent=s.guideText;}" + hook, 1)
        assert "amr-guide')" in s
    # 4) VideoObject JSON-LD
    page = B + ('/' if ko else '/en/')
    keys = ['amr_ko', 'amr_en', 'con_ko', 'ene_ko'] if ko else ['amr_en', 'amr_ko', 'con_ko', 'ene_ko']
    ld = json.dumps({"@context": "https://schema.org", "@graph": [vobj(k, page) for k in keys]}, ensure_ascii=False).replace('</', '<\\/')
    tag = f'<script type="application/ld+json" id="ld-field-videos">{ld}</script>'
    s = re.sub(r'<script type="application/ld\+json" id="ld-field-videos">.*?</script>', '', s, flags=re.S)
    s = s.replace('</head>', tag + '</head>', 1)
    # 5) max-video-preview on robots meta
    s = re.sub(r'(<meta name="robots" content="index,follow[^"]*?)(")', lambda mm: mm.group(1) + ('' if 'max-video-preview' in mm.group(1) else ',max-video-preview:-1') + mm.group(2), s, count=1)
    open(path, 'w', encoding='utf-8').write(s)

def css():
    p = 'assets/amr-demo-20261008.css'; s = open(p, encoding='utf-8').read()
    if '.amr-guide' not in s:
        s += '\n.amr-demo .amr-guide{display:inline-block;margin-top:12px;font-weight:700;font-size:14.5px;color:#0F5FD7;text-decoration:none}.amr-demo .amr-guide:hover{text-decoration:underline}\n'
        open(p, 'w', encoding='utf-8').write(s)

def video_sitemap():
    rows = []
    for g in G:
        for lang in ['ko', 'en']:
            loc = f"{B}/guides/{g['slug']}.html" if lang == 'ko' else f"{B}/en/guides/{g['slug']}.html"
            k = g['vk'][lang]; v = V[k]; secs = sum(int(x) * m for x, m in zip(re.findall(r'(\d+)M(\d+)S', v['d'])[0], (60, 1)))
            rows.append(f"""  <url><loc>{loc}</loc><video:video><video:thumbnail_loc>{turl(k)}</video:thumbnail_loc><video:title>{html.escape(v['n'])}</video:title><video:description>{html.escape(v['desc'])}</video:description><video:content_loc>{vurl(k)}</video:content_loc><video:duration>{secs}</video:duration><video:publication_date>{UP}</video:publication_date><video:family_friendly>yes</video:family_friendly></video:video></url>""")
    open('sitemap-video.xml', 'w', encoding='utf-8').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n' + '\n'.join(rows) + '\n</urlset>\n')

def sitemap():
    s = open('sitemap.xml', encoding='utf-8').read()
    for loc in [B + '/', B + '/en/']:
        s = re.sub(r'(<url><loc>' + re.escape(loc) + r'</loc>.*?)(<lastmod>[^<]*</lastmod>)?(<changefreq>|</url>)', lambda m: m.group(1) + f'<lastmod>{TODAY}</lastmod>' + m.group(3), s, count=1)
    new = []
    for i, g in enumerate(G):
        ko = f"{B}/guides/{g['slug']}.html"; en = f"{B}/en/guides/{g['slug']}.html"
        alt = f'<xhtml:link rel="alternate" hreflang="ko" href="{ko}"/><xhtml:link rel="alternate" hreflang="en" href="{en}"/><xhtml:link rel="alternate" hreflang="x-default" href="{ko}"/>'
        for loc, pr in [(ko, '0.97'), (en, '0.80')]:
            if f'<loc>{loc}</loc>' not in s:
                new.append(f'  <url><loc>{loc}</loc>{alt}<lastmod>{TODAY}</lastmod><changefreq>monthly</changefreq><priority>{pr}</priority></url>')
    if new: s = s.replace('</urlset>', '\n'.join(new) + '\n</urlset>')
    open('sitemap.xml', 'w', encoding='utf-8').write(s)

def feed():
    s = open('feed.xml', encoding='utf-8').read()
    s = re.sub(r'<lastBuildDate>[^<]*</lastBuildDate>', '<lastBuildDate>Thu, 08 Oct 2026 20:00:00 +0900</lastBuildDate>', s, count=1)
    items = []
    for g in G:
        c = g['ko']; link = f"{B}/guides/{g['slug']}.html"; gid = f"guide-{g['slug']}-20261008"
        if gid in s: continue
        v = V[g['vk']['ko']]
        body = html.escape(f'<p>{c["lead"]}</p><p><img src="{turl(g["vk"]["ko"])}" alt="{v["n"]}"></p><p>{c["desc"]}</p>')
        items.append(f'    <item>\n      <title>{html.escape(c["title"].split(" - COREON")[0])}</title>\n      <link>{link}</link>\n      <guid isPermaLink="false">{gid}</guid>\n      <pubDate>Thu, 08 Oct 2026 20:00:00 +0900</pubDate>\n      <description>{body}</description>\n    </item>\n')
    if items:
        i = s.find('<item>'); i = s.rfind('\n', 0, i) + 1
        s = s[:i] + ''.join(items) + s[i:]
    open('feed.xml', 'w', encoding='utf-8').write(s)

def robots():
    s = open('robots.txt', encoding='utf-8').read()
    if 'sitemap-video.xml' not in s:
        s = s.rstrip('\n') + f'\nSitemap: {B}/sitemap-video.xml\n'
        s = s.replace('# COREON robots.txt (updated 2026-08-17)', '# COREON robots.txt (updated 2026-10-08)')
    open('robots.txt', 'w', encoding='utf-8').write(s)
    open(f'{KEY}.txt', 'w').write(KEY)

if __name__ == '__main__':
    home('index.html', True); home('en/index.html', False); css(); video_sitemap(); sitemap(); feed(); robots(); print('ok')

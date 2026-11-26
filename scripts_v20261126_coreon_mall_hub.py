"""코레온몰 안내 페이지(/mall/) 생성과 한국어 공통 메뉴·푸터·사이트맵·구조화 데이터 연결 (2026-11-26)."""
import re, json, pathlib
R = pathlib.Path(__file__).parent
STORE = "https://smartstore.naver.com/coreonmall"
def cat(i): return f"{STORE}/category/{i}?cp=1"

NAV_DD = '<div class="dd"><button type="button" aria-haspopup="true">스토어</button><div class="menu"><a href="/mall/" data-path="nav-mall">코레온몰<small>현장·매장·생활 공간 용품 스토어</small></a></div></div>'
NAV_M = '<p>스토어</p><a href="/mall/">코레온몰</a>'
FOOT = '<a href="/mall/" data-path="foot-mall">코레온몰</a> · '

def patch_nav(html):
    if 'href="/mall/"' in html: return html
    html = html.replace('<div class="dd"><button type="button" aria-haspopup="true">회사</button>', NAV_DD + '<div class="dd"><button type="button" aria-haspopup="true">회사</button>', 1)
    html = html.replace('<p>회사</p>', NAV_M + '<p>회사</p>', 1)
    html = html.replace('<a href="/company.html">회사소개</a> · <a href="/business-inquiry.html">', FOOT + '<a href="/company.html">회사소개</a> · <a href="/business-inquiry.html">', 1)
    return html

GROUPS = [
 ("현장 안전", [
   ("안전화·작업화", "b3cda7047c7e4560a65b4774e707633f", "단화·중단화·방한·장화"),
   ("작업복·보호구", "62a2ff40351141be902a940b9af700fb", "작업복·조끼·안전장갑·보안경"),
   ("추락방지·안전대", "21ccc372064345e09f39099897fafb8d", "안전그네·안전블럭·죔줄"),
   ("소방·화재안전", "230595391664471b9a17ecc3acb1c935", "질식소화포·소화기보관함·불티방지"),
   ("현장안전·통행관리", "4d7e72a9ebd74f97a6d14441a8f8d02b", "안전시설·경고등·표지판·제설"),
 ]),
 ("욕실·인테리어", [
   ("욕실자재", "d2c63c0c50bf42f4823314aae056b918", "양변기·세면기·수전·비데·액세서리"),
   ("타일(욕실·바닥·벽)", "1da85ce828594833a7a4d3a3cab0c6a4", "포세린·자기질 바닥·벽 타일"),
   ("무장애·욕실 안전", "17efdb931e2747729916060ad1a068a8", "안전손잡이·목욕의자·경사로"),
   ("단열벽지·인테리어", "b38726df433149a48358f492b103b35a", "단열벽지·3D브릭·폼블럭"),
   ("조명·실링팬", "f5e2e3fa7c3342fb84934ab596b47482", "센서등·매입등·펜던트·실링팬"),
 ]),
 ("매장·현장 설비", [
   ("업소용 쇼케이스·제빙기", "91e539624aa04b18bfc152761cb36f9a", "정육·냉동·베이커리·플라워 쇼케이스"),
   ("냉난방 계절가전", "a4736452e806400bafc89d2fec964c3e", "히터·온풍기·가습기"),
   ("발전기", "524ee2bce3e941c7860dc7b403703d50", "현장·비상용 발전기"),
   ("건설·토목장비", "c304aa4f77f5423da357d9668f9ca993", "절단기·다짐장비·양수기"),
   ("산업용 청소기", "d9df594c2e29427496bc5c3270546200", "현장·공장 청소 장비"),
 ]),
]

TITLE = "코레온몰 | 주식회사 코레온홀딩스 공식 온라인 스토어"
DESC = "코레온몰은 주식회사 코레온홀딩스가 운영하는 네이버 스마트스토어입니다. 산업 현장의 안전용품부터 욕실·인테리어 자재, 매장 설비까지 한곳에서 만나보세요."
URL = "https://www.coreon-global.com/mall/"

FAQ = [
 ("코레온몰은 어떤 곳인가요?", "코레온몰은 주식회사 코레온홀딩스가 운영하는 네이버 스마트스토어입니다. 산업 현장의 안전용품, 욕실·인테리어 자재, 매장과 현장 설비를 판매합니다."),
 ("주문과 결제는 어디에서 하나요?", "모든 주문은 네이버 스마트스토어 코레온몰에서 진행됩니다. 네이버페이로 결제하고, 주문·배송 조회도 네이버에서 하실 수 있습니다."),
 ("현장이나 매장에서 쓸 물량을 한꺼번에 구매하고 싶어요.", "수량이 많거나 여러 품목을 함께 준비하실 때는 문의·제안하기 또는 0507-1358-1482로 연락해 주세요. 품목과 수량을 확인해 안내해 드립니다."),
]

def build(head):
    head = re.sub(r'<title>.*?</title>', f'<title>{TITLE}</title>', head, flags=re.S)
    reps = {
     r'<meta name="description" content="[^"]*" />': f'<meta name="description" content="{DESC}" />',
     r'<link rel="canonical" href="[^"]*" />': f'<link rel="canonical" href="{URL}" />',
     r'<link rel="alternate" hreflang="ko" href="[^"]*" />': f'<link rel="alternate" hreflang="ko" href="{URL}" />',
     r'<link rel="alternate" hreflang="x-default" href="[^"]*" />': f'<link rel="alternate" hreflang="x-default" href="{URL}" />',
     r'<meta property="og:title" content="[^"]*" />': f'<meta property="og:title" content="{TITLE}" />',
     r'<meta property="og:description" content="[^"]*" />': f'<meta property="og:description" content="{DESC}" />',
     r'<meta property="og:url" content="[^"]*" />': f'<meta property="og:url" content="{URL}" />',
     r'<meta property="og:image" content="[^"]*" />': '<meta property="og:image" content="https://www.coreon-global.com/assets/coreon-logo.png" />',
    }
    for k,v in reps.items(): head = re.sub(k, v, head)
    ld = {"@context":"https://schema.org","@graph":[
      {"@type":"Organization","@id":"https://www.coreon-global.com/#org","name":"주식회사 코레온홀딩스",
       "alternateName":["코레온홀딩스","COREON HOLDINGS"],"url":"https://www.coreon-global.com/",
       "logo":"https://www.coreon-global.com/assets/coreon-logo.png","email":"contact@coreon-global.com","telephone":"+82-507-1358-1482",
       "taxID":"734-88-04053"},
      {"@type":"OnlineStore","name":"코레온몰","alternateName":["COREON MALL","코레온몰 스마트스토어"],"url":STORE,
       "description":DESC,"parentOrganization":{"@id":"https://www.coreon-global.com/#org"},"sameAs":[STORE,URL]},
      {"@type":"WebPage","url":URL,"name":TITLE,"description":DESC,"inLanguage":"ko",
       "about":{"@id":"https://www.coreon-global.com/#org"},
       "breadcrumb":{"@type":"BreadcrumbList","itemListElement":[
         {"@type":"ListItem","position":1,"name":"회사 홈","item":"https://www.coreon-global.com/"},
         {"@type":"ListItem","position":2,"name":"코레온몰","item":URL}]}},
      {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in FAQ]}
    ]}
    css = """
.mall-groups{display:grid;gap:34px}
.mall-g h3{font-size:19px;margin:0 0 12px;letter-spacing:-.02em}
.mall-cats{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
@media(max-width:1100px){.mall-cats{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:700px){.mall-cats{grid-template-columns:1fr 1fr}}
@media(max-width:700px){.mall-cats a{padding:13px;min-height:88px}.mall-cats b{font-size:15px}.mall-cats span{font-size:12.5px}}
.mall-cats a{display:flex;flex-direction:column;gap:4px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;text-decoration:none;color:var(--ink);min-height:96px}
.mall-cats a:hover{border-color:var(--teal);box-shadow:0 6px 18px rgba(10,26,47,.08)}
.mall-cats b{font-size:16px}.mall-cats span{font-size:13.5px;color:var(--muted);line-height:1.5}
.faq details{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin-bottom:10px}
.faq summary{font-weight:800;cursor:pointer}.faq p{margin:10px 0 0;color:var(--muted)}
.hero-ctas{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
#seller .info td a{overflow-wrap:anywhere}
@media(max-width:560px){#seller .info th{width:96px;white-space:nowrap}#seller .info th,#seller .info td{padding:11px 12px;font-size:14px}}
"""
    head = head.replace('</style>', css + '</style>\n<script type="application/ld+json">\n' + json.dumps(ld, ensure_ascii=False) + '\n</script>')
    return head

def body(nav, foot):
    g = []
    for gname, items in GROUPS:
        cards = "".join(f'<a href="{cat(i)}" target="_blank" rel="noopener" data-path="mall-cat"><b>{n}</b><span>{d}</span></a>' for n,i,d in items)
        g.append(f'<div class="mall-g"><h3>{gname}</h3><div class="mall-cats">{cards}</div></div>')
    faq = "".join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q,a in FAQ)
    return f"""<body>
{nav}

<main>
<section class="phero"><div class="w">
<div class="crumb"><a href="/">회사 홈</a> › 스토어 › 코레온몰</div>
<h1>코레온몰</h1>
<p>주식회사 코레온홀딩스가 운영하는 공식 온라인 스토어입니다. 산업 현장의 안전용품부터 욕실·인테리어 자재, 매장과 현장 설비까지 네이버 스마트스토어에서 편하게 주문하세요.</p>
<div class="hero-ctas"><a class="btn p" href="{STORE}" target="_blank" rel="noopener" data-path="mall-store">코레온몰 바로가기</a><a class="btn g" href="/business-inquiry.html" data-path="mall-biz-inquiry">대량 구매 문의</a></div>
</div></section>

<section class="s" id="categories"><div class="w">
<p class="eyebrow">상품 카테고리</p>
<h2>필요한 상품을 카테고리에서 바로 찾아보세요</h2>
<p class="sub">카테고리를 누르면 코레온몰의 해당 상품 목록으로 이동합니다.</p>
<div class="mall-groups">{''.join(g)}</div>
<div class="ctas" style="margin-top:28px"><a class="btn p" href="{STORE}/category/ALL?cp=1" target="_blank" rel="noopener" data-path="mall-all">전체 상품 보기</a></div>
</div></section>

<section class="s alt" id="guide"><div class="w">
<p class="eyebrow">이용 안내</p>
<h2>주문부터 배송까지 네이버에서 한 번에</h2>
<div class="grid g3">
<div class="card"><h3>네이버페이 결제</h3><p>코레온몰의 모든 상품은 네이버 스마트스토어에서 주문하고 네이버페이로 결제합니다.</p></div>
<div class="card"><h3>주문·배송 조회</h3><p>주문 확인, 배송 조회, 교환·반품 접수도 네이버 주문내역에서 바로 하실 수 있습니다.</p></div>
<div class="card"><h3>대량·현장 구매</h3><p>여러 품목을 함께 준비하시거나 수량이 많을 때는 문의해 주세요. 품목과 수량에 맞춰 안내해 드립니다.</p></div>
</div>
</div></section>

<section class="s faq" id="faq"><div class="w">
<p class="eyebrow">자주 묻는 질문</p>
<h2>코레온몰 자주 묻는 질문</h2>
{faq}
</div></section>

<section class="s alt" id="seller"><div class="w">
<p class="eyebrow">판매자 정보</p>
<h2>코레온몰 판매자 정보</h2>
<table class="info">
<tr><th>스토어</th><td>코레온몰 · <a href="{STORE}" target="_blank" rel="noopener">smartstore.naver.com/coreonmall</a></td></tr>
<tr><th>상호</th><td>주식회사 코레온홀딩스 (COREON HOLDINGS Co., Ltd.)</td></tr>
<tr><th>대표자</th><td>이호원</td></tr>
<tr><th>사업자등록번호</th><td>734-88-04053</td></tr>
<tr><th>통신판매업 신고</th><td>제2026-영종구-0119호</td></tr>
<tr><th>소재지</th><td>인천광역시 영종구 영종대로 881, 205호(중산동, 리베라베리움)</td></tr>
<tr><th>연락처</th><td>0507-1358-1482 · <a href="mailto:contact@coreon-global.com">contact@coreon-global.com</a></td></tr>
</table>
<div class="ctas" style="margin-top:22px"><a class="btn p" href="{STORE}" target="_blank" rel="noopener" data-path="mall-store-bottom">코레온몰 바로가기</a><a class="btn g" href="/company.html">회사소개</a></div>
</div></section>
</main>

{foot}
<script src="/assets/site-visit.js" defer></script>
</body>
</html>
"""

def main():
    src = (R/'company.html').read_text()
    head = src[:src.index('</style>')+len('</style>')]
    nav = patch_nav(re.search(r'<!--NAV127-->.*?<!--/NAV127-->', src, re.S).group(0))
    foot = patch_nav(re.search(r'<footer>.*?</footer>', src, re.S).group(0))
    (R/'mall').mkdir(exist_ok=True)
    (R/'mall/index.html').write_text(build(head) + "\n</head>\n" + body(nav, foot))
    # 한국어 공통 메뉴·푸터에 코레온몰 연결
    for f in ['index.html','company.html','business-inquiry.html']:
        p = R/f; h = p.read_text(); n = patch_nav(h)
        if f == 'index.html':
            n = n.replace('"alternateName":"COREON HOLDINGS"', '"alternateName":["COREON HOLDINGS","코레온홀딩스"]', 1)
            n = n.replace('"https://blog.naver.com/coreon-holdings"]', f'"https://blog.naver.com/coreon-holdings","{STORE}"]', 1)
        if f == 'company.html' and '코레온몰' not in h.split('<main>')[1]:
            n = n.replace('<tr><th>연락처</th>', f'<tr><th>온라인 스토어</th><td><a href="/mall/">코레온몰</a> · 네이버 스마트스토어</td></tr>\n<tr><th>연락처</th>', 1)
        p.write_text(n)
    # 사이트맵
    sm = R/'sitemap.xml'; s = sm.read_text()
    if '/mall/' not in s:
        s = s.replace('</urlset>', f'  <url><loc>{URL}</loc><lastmod>2026-11-26</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>\n</urlset>')
        sm.write_text(s)
    lt = R/'llms.txt'; t = lt.read_text()
    if '/mall/' not in t:
        t = t.replace('- 네이버 스마트스토어: https://smartstore.naver.com/coreonmall', '- 네이버 스마트스토어 코레온몰: https://smartstore.naver.com/coreonmall (안내 페이지: https://www.coreon-global.com/mall/)')
        lt.write_text(t)
main()

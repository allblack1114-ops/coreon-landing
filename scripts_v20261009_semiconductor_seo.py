"""SEO 2026-10-09: 반도체 제조 가이드(KO/EN) 추가 + 기존 가이드 상호링크 갱신, sitemap.xml / sitemap-video.xml / feed.xml 갱신. Idempotent."""
import re, html, sys
sys.path.insert(0, '.')
import scripts_v20261008_seo_video_guides as m
from scripts_v20261008_seo_video_guides import B, V, G, turl, vurl

SLUG = 'semiconductor-fab-gas-safety'
UP9 = '2026-10-09T12:00:00+09:00'
TODAY = '2026-10-09'
V['semi_ko'] = dict(yt='kBk3lVWsX7s', f='coreon-safety-ax-semiconductor-demo-ko-20261009', d='PT3M3S', lang='ko',
  n='반도체 FAB 가스 경보 이후 안전조치 종결 시연 | COREON Safety AX',
  desc='반도체 FAB 가스룸의 독성가스 1차 경보가 읽기 전용 신호로 접수된 뒤 사람 검토, 작업중지·연계 업무, 교육 확인·작업허가, 협력사 모바일 증빙 SHA-256, 잔여위험 재평가, 직무분리 승인, 종결증명까지 이어지는 흐름을 실제 COREON 제품 화면(가상 데이터)으로 보여드립니다. 특정 고객사와 무관한 업종 시나리오이며 현장 장면은 AI 생성 연출입니다.')

SEMI = dict(slug=SLUG, vk={'ko': 'semi_ko', 'en': 'semi_ko'},
 ko=dict(title='반도체 FAB 가스 경보 안전관리 | 경보 이후 조치·증빙·종결까지 하나의 사건으로 - COREON',
  desc='반도체 팹 가스룸 특수가스 캐비닛의 독성가스 경보를 하나의 안전 사건으로 접수하고 작업중지·작업허가·특별교육 확인·협력사 정비 증빙·잔여위험 재평가·직무분리 승인 종결까지 관리하는 반도체 제조 안전관리 가이드. 가스감지·인터록·비상대응을 대체하지 않습니다.',
  kw='반도체 안전관리,FAB 안전관리,반도체 가스 안전,특수가스 안전관리,가스룸 안전,독성가스 경보,작업허가 관리,협력사 안전관리,정비작업 안전,위험성평가 조치관리,중대재해 예방 시스템,안전보건관리체계',
  eyebrow='SEMICONDUCTOR · FAB GAS ROOM / SPECIALTY GAS', h1='반도체 FAB 가스 경보 안전관리,<br>경보 이후 종결까지를 하나의 사건으로.',
  lead='반도체 팹에서 가장 비싼 시간은 멈춘 시간이고, 가장 위험한 순간은 정비 중의 몇 분입니다. 가스룸 특수가스 캐비닛에서 독성가스 1차 경보가 울렸다면 질문은 하나입니다. 누가, 언제까지, 어떤 근거로 처리했는지 지금 바로 답할 수 있는가입니다.',
  cards=[('경보는 후보 사건', '가스감지·설비 시스템의 경보를 읽기 전용으로 받아 후보 사건으로 접수합니다. 사람이 검토하기 전에는 공식 기록이 되지 않습니다.'),
         ('작업중지·연계 업무', '작업중지와 함께 안전조치·설비점검·교육·조달·현장 재확인 업무를 사건에 연결하고 담당자와 기한을 붙입니다.'),
         ('교육 확인·작업허가', '특별교육 미이수 정비원이 있으면 작업허가를 거부하고 보충교육 업무를 만듭니다. 이수 확인 뒤 같은 범위로 허가합니다.'),
         ('협력사 증빙·승인', '협력사 정비원이 모바일로 누설시험 기록을 첨부하면 SHA-256 해시값을 함께 남기고, 원청 담당자가 확인한 뒤 승인합니다.')],
  flow=['가스 경보', '후보 사건', '사람 검토', '작업중지·연계 업무', '교육·작업허가', '협력사 증빙', '잔여위험 재평가', '직무분리 승인·종결'],
  bound_h='역할 경계', bound='COREON은 설비를 제어하지 않습니다. 연동은 읽기 전용이며 서명된 REST/Webhook 표준 계약을 쓰고, OPC UA·Modbus·MQTT는 Edge 게이트웨이를 거칩니다. 가스감지·인터록·비상대응 체계를 대체하지 않으며, COREON의 종결은 장비 재가동 허가가 아닙니다. 해시값은 파일 변경 여부를 확인하기 위한 것입니다.',
  faq=[('가스 경보가 오면 COREON이 설비를 멈추거나 제어하나요?', '아닙니다. 설비 정지와 인터록은 기존 가스감지·안전 설비가 담당합니다. COREON은 경보를 읽기 전용으로 받아 그 이후의 조치·증빙·승인·종결 업무를 관리합니다.'),
       ('협력사 정비원의 교육 이수 여부를 어떻게 확인하나요?', '작업허가 단계에서 특별교육 이수 기록을 확인하고, 미이수자가 있으면 허가를 거부한 뒤 보충교육 업무를 자동으로 만듭니다.'),
       ('잔여위험을 낮게 입력해 종결하는 것을 막을 수 있나요?', '조치 후 재산정한 값보다 낮게 확정하려는 시도는 차단되며, 허용 기준을 넘는 위험은 경영책임자급 상위 승인이 있어야 종결할 수 있습니다.'),
       ('COREON에서 종결되면 장비를 재가동해도 되나요?', '아닙니다. COREON의 종결은 안전업무 기록의 종결이며, 장비 재가동은 고객사의 기존 절차로 결정합니다.')],
  related='반도체 안전관리 · FAB 안전 · 가스안전관리 · 특수가스 · 가스룸 · 독성가스 경보 · 작업허가 · 협력사 안전관리 · 정비작업 안전 · 위험성평가 · 중대재해 예방 · 안전보건관리체계',
  crumb='반도체 FAB 가스 경보 안전관리'),
 en=dict(title='Semiconductor fab gas alarm safety | From alarm to verified closure as one event - COREON',
  desc='A guide to receiving a toxic gas alarm from a fab specialty gas cabinet as one safety event and managing work stop, permit to work, training checks, contractor maintenance evidence, residual risk reassessment and segregated approval through closure. It does not replace gas detection, interlocks or emergency response.',
  kw='semiconductor safety management,fab safety,specialty gas safety,gas room safety,toxic gas alarm,permit to work,contractor safety,maintenance safety,risk assessment action management,serious accident prevention',
  eyebrow='SEMICONDUCTOR · FAB GAS ROOM / SPECIALTY GAS', h1='Semiconductor fab gas alarms:<br>from alarm to closure as one event.',
  lead='In a fab, the most expensive time is downtime and the most dangerous moments are minutes during maintenance. When a first-stage toxic gas alarm sounds at a specialty gas cabinet, one question matters: can you show right now who handled it, by when, and on what evidence?',
  cards=[('Alarm as a candidate', 'Alarms from gas detection and equipment systems are received read-only as candidate events; nothing becomes an official record before human review.'),
         ('Work stop and linked tasks', 'A work stop is linked with safety, equipment inspection, training, procurement and field re-check tasks, each with an owner and a deadline.'),
         ('Training check and permit', 'A permit is refused if a maintenance worker lacks special training, and a make-up training task is created; the same scope is permitted after completion.'),
         ('Contractor evidence and approval', 'A contractor attaches a leak test record on mobile with its SHA-256 hash, and the host-company owner checks it before approval.')],
  flow=['Gas alarm', 'Candidate event', 'Human review', 'Work stop · tasks', 'Training · permit', 'Contractor evidence', 'Reassessment', 'Segregated approval · closure'],
  bound_h='Role boundary', bound='COREON does not control equipment. Integration is read-only over signed REST/Webhook contracts, with OPC UA, Modbus and MQTT through an Edge gateway. It does not replace gas detection, interlocks or emergency response, and a COREON closure is not an equipment restart permit. Hashes are used to detect file changes. The demo video is narrated in Korean.',
  faq=[('Does COREON stop or control equipment on a gas alarm?', 'No. Equipment shutdown and interlocks stay with existing gas detection and safety systems. COREON receives the alarm read-only and manages the action, evidence, approval and closure that follow.'),
       ('How is contractor training checked?', 'Special training records are checked at the permit step; if anyone is missing training, the permit is refused and a make-up training task is created.'),
       ('Does a COREON closure allow equipment restart?', 'No. It closes the safety work record; restart is decided by the customer’s existing procedure.')],
  related='semiconductor safety · fab safety · specialty gas safety · gas room · toxic gas alarm · permit to work · contractor safety · maintenance safety · serious accident prevention',
  crumb='Semiconductor fab gas alarm safety'))

if not any(g['slug'] == SLUG for g in G):
    G.insert(0, SEMI)

def gen_pages():
    for g in G:
        for lang in ['ko', 'en']:
            p = f"guides/{g['slug']}.html" if lang == 'ko' else f"en/guides/{g['slug']}.html"
            if g['slug'] == SLUG:
                m.UP = UP9
                out = m.page(g, lang).replace('"datePublished": "2026-10-08", "dateModified": "2026-10-08"', '"datePublished": "2026-10-09", "dateModified": "2026-10-09"')
                m.UP = '2026-10-08T20:00:00+09:00'
            else:
                out = m.page(g, lang)
            open(p, 'w', encoding='utf-8').write(out); print('wrote', p)

def video_sitemap():
    s = open('sitemap-video.xml', encoding='utf-8').read()
    k = 'semi_ko'; v = V[k]; rows = []
    for loc in [f"{B}/guides/{SLUG}.html", f"{B}/en/guides/{SLUG}.html"]:
        if f'<loc>{loc}</loc>' in s: continue
        rows.append(f"  <url><loc>{loc}</loc><video:video><video:thumbnail_loc>{turl(k)}</video:thumbnail_loc><video:title>{html.escape(v['n'])}</video:title><video:description>{html.escape(v['desc'])}</video:description><video:content_loc>{vurl(k)}</video:content_loc><video:player_loc>https://www.youtube.com/embed/{v['yt']}</video:player_loc><video:duration>183</video:duration><video:publication_date>{UP9}</video:publication_date><video:family_friendly>yes</video:family_friendly></video:video></url>")
    if rows: s = s.replace('</urlset>', '\n'.join(rows) + '\n</urlset>')
    open('sitemap-video.xml', 'w', encoding='utf-8').write(s)

def sitemap():
    s = open('sitemap.xml', encoding='utf-8').read()
    for loc in [B + '/', B + '/en/']:
        s = re.sub(r'(<url><loc>' + re.escape(loc) + r'</loc>.*?)<lastmod>[^<]*</lastmod>', lambda mm: mm.group(1) + f'<lastmod>{TODAY}</lastmod>', s, count=1)
    poster = f'<image:image><image:loc>{turl("semi_ko")}</image:loc></image:image>'
    for loc in [B + '/', B + '/en/']:
        s = re.sub(r'(<url><loc>' + re.escape(loc) + r'</loc>(?:(?!</url>).)*?<priority>[^<]*</priority>)(?!' + re.escape(poster) + ')', lambda mm: mm.group(1) + poster, s, count=1)
    # 기존 가이드는 상호링크가 바뀌었으므로 lastmod 갱신
    for g in G:
        for loc in [f"{B}/guides/{g['slug']}.html", f"{B}/en/guides/{g['slug']}.html"]:
            s = re.sub(r'(<url><loc>' + re.escape(loc) + r'</loc>.*?)<lastmod>[^<]*</lastmod>', lambda mm: mm.group(1) + f'<lastmod>{TODAY}</lastmod>', s, count=1)
    ko = f"{B}/guides/{SLUG}.html"; en = f"{B}/en/guides/{SLUG}.html"
    alt = f'<xhtml:link rel="alternate" hreflang="ko" href="{ko}"/><xhtml:link rel="alternate" hreflang="en" href="{en}"/><xhtml:link rel="alternate" hreflang="x-default" href="{ko}"/>'
    new = [f'  <url><loc>{loc}</loc>{alt}<lastmod>{TODAY}</lastmod><changefreq>monthly</changefreq><priority>{pr}</priority><image:image><image:loc>{turl("semi_ko")}</image:loc></image:image></url>'
           for loc, pr in [(ko, '0.97'), (en, '0.80')] if f'<loc>{loc}</loc>' not in s]
    if new: s = s.replace('</urlset>', '\n'.join(new) + '\n</urlset>')
    open('sitemap.xml', 'w', encoding='utf-8').write(s)

def feed():
    s = open('feed.xml', encoding='utf-8').read()
    s = re.sub(r'<lastBuildDate>[^<]*</lastBuildDate>', '<lastBuildDate>Fri, 09 Oct 2026 12:00:00 +0900</lastBuildDate>', s, count=1)
    gid = f'guide-{SLUG}-20261009'
    if gid not in s:
        c = SEMI['ko']; v = V['semi_ko']
        body = html.escape(f'<p>{c["lead"]}</p><p><img src="{turl("semi_ko")}" alt="{v["n"]}"></p><p>{c["desc"]}</p>')
        item = f'    <item>\n      <title>{html.escape(c["title"].split(" - COREON")[0])}</title>\n      <link>{B}/guides/{SLUG}.html</link>\n      <guid isPermaLink="false">{gid}</guid>\n      <pubDate>Fri, 09 Oct 2026 12:00:00 +0900</pubDate>\n      <description>{body}</description>\n    </item>\n'
        i = s.find('<item>'); i = s.rfind('\n', 0, i) + 1
        s = s[:i] + item + s[i:]
    open('feed.xml', 'w', encoding='utf-8').write(s)

def robots():
    s = open('robots.txt', encoding='utf-8').read().replace('(updated 2026-10-08)', '(updated 2026-10-09)')
    open('robots.txt', 'w', encoding='utf-8').write(s)

if __name__ == '__main__':
    gen_pages(); video_sitemap(); sitemap(); feed(); robots(); print('ok')

"""SEO 2026-10-08: VideoObject for field-scenario videos, 3 sector guides (KO/EN), video sitemap,
sitemap/feed/robots refresh, IndexNow key. Idempotent."""
import json, re, html, os
B = 'https://www.coreon-global.com'
UP = '2026-10-08T20:00:00+09:00'
V = {
 'amr_ko': dict(f='coreon-amr-safety-demo-ko-20261008', d='PT3M2S', lang='ko',
   n='AMR·AGV 보호정지 이후 안전조치 종결 시연 | COREON Safety AX',
   desc='물류·제조 현장에서 AMR·AGV 반복 보호정지 이벤트가 후보 사건으로 접수된 뒤 사람 검토, 담당자·기한, 현장 조치, SHA-256 증빙, 잔여위험 재평가, 직무분리 승인, 종결증명까지 이어지는 흐름을 실제 COREON 제품 화면(가상 데이터)으로 보여드립니다. 브랜드 중립 시나리오이며 현장 장면은 AI 생성 연출입니다.'),
 'amr_en': dict(f='coreon-amr-safety-demo-en-20261008', d='PT3M34S', lang='en',
   n='After an AMR/AGV protective stop: verified safety closure | COREON Safety AX',
   desc='How a repeated AMR/AGV protective stop becomes a candidate event and moves through human review, owner and deadline, field action, SHA-256 evidence, residual risk reassessment, segregated approval and closure proof, shown on actual COREON product screens with virtual data. Brand-neutral scenario; site scenes are AI-generated.'),
 'con_ko': dict(f='coreon-safety-ax-construction-demo-ko-20261008', d='PT2M24S', lang='ko',
   n='건설 현장 중대재해 예방: 위험 발견부터 종결까지 | COREON Safety AX 시연',
   desc='주택·건축·토목·플랜트·전력인프라 현장의 협력사 제보, CCTV AI, 가스 센서, 작업허가 점검 신호가 하나의 안전 사건으로 등록되고 사람 확정, 담당·기한, 조치·증빙, 잔여위험 재평가, 권한자 승인, 종결증명으로 이어지는 과정을 실제 제품 화면(가상 데이터)으로 보여드립니다.'),
 'ene_ko': dict(f='coreon-safety-ax-energy-demo-ko-20261008', d='PT2M34S', lang='ko',
   n='정유·석유화학 정기보수(TA) 화기작업 안전관리 | COREON Safety AX 시연',
   desc='정기보수 기간 가스감지 경보와 협력사 화기감시자 제보로 시작된 위험이 AI 분류·안내(참고), 사람의 사건 확정, 조치·증빙, 잔여위험 재평가, 직무분리 승인을 거쳐 종결되는 과정을 실제 제품 화면(가상 데이터)으로 보여드립니다. COREON은 공정제어·비상대응을 대신하지 않습니다.'),
}
def vurl(k): return f"{B}/assets/video/{V[k]['f']}.mp4"
def turl(k): return f"{B}/assets/video/{V[k]['f'].replace('-2026', '-poster-2026')}.jpg"
def vobj(k, page):
    v = V[k]
    return {"@type": "VideoObject", "@id": f"{page}#video-{k}", "name": v['n'], "description": v['desc'], "thumbnailUrl": [turl(k)],
            "uploadDate": UP, "duration": v['d'], "contentUrl": vurl(k), "inLanguage": v['lang'],
            "publisher": {"@type": "Organization", "name": "주식회사 코레온홀딩스", "url": B + "/"}}

KO_BOUND = '이 페이지와 영상은 제품의 실행·증빙 범위를 설명하며 법령 준수나 인증을 보장하지 않습니다. 법적 의무의 이행 판단과 전문인력 선임·신고는 사업장 책임입니다. 영상의 현장 장면은 AI 생성 연출이고 제품 화면은 시연 환경의 가상 데이터이며, 특정 고객사·제조사와의 연동·제휴를 의미하지 않습니다.'
EN_BOUND = 'This page and video describe the execution and evidence scope of the product; they do not guarantee legal compliance or certification. Judging fulfilment of legal duties remains the workplace’s responsibility. Site scenes are AI-generated, product screens use virtual data in a demo environment, and nothing here implies integration with or endorsement by any customer or manufacturer.'

G = [
 dict(slug='amr-agv-mobile-equipment-safety', vk={'ko': 'amr_ko', 'en': 'amr_en'},
  ko=dict(title='AMR·AGV·지게차 이동장비 안전관리 | 사람-로봇 혼재 구역 중대재해 예방 - COREON',
   desc='물류센터·공장의 AMR·AGV·지게차 반복 정지와 아차사고를 사건으로 등록하고 담당자·기한·조치·증빙·잔여위험 재평가·승인 종결까지 관리하는 이동장비 안전관리 가이드. 로봇 안전제어를 대체하지 않는 후속 실행 계층입니다.',
   kw='AMR 안전관리,AGV 안전관리,지게차 안전관리,이동장비 안전,물류센터 안전관리,사람 로봇 혼재 구역,보호정지 반복,협동로봇 안전,중대재해 예방 시스템,위험성평가 조치관리,안전보건관리체계',
   eyebrow='MOBILE EQUIPMENT · AMR / AGV / FORKLIFT', h1='AMR·AGV·지게차 이동장비 안전관리,<br>로봇이 멈춘 다음이 중요합니다.',
   lead='로봇은 사람을 감지하면 스스로 감속하고 멈춥니다. 같은 지점에서 정지가 반복된다면 적재물·동선·바닥표시처럼 사람이 고쳐야 할 원인이 남아 있다는 뜻입니다. COREON Safety AX Agent는 그 원인 개선을 담당자·기한·증빙·승인까지 하나의 기록으로 관리합니다.',
   cards=[('반복 정지는 현장 문제', '동일 지점 반복 보호정지·아차사고를 후보 사건으로 접수하고 사람이 검토해 공식 기록으로 확정합니다.'), ('담당자·기한', '시야를 가리는 적재물 제거, 정지선·횡단보도·볼록거울 설치 같은 조치를 책임자와 완료기한에 연결합니다.'), ('증빙·잔여위험', '조치 후 사진과 TBM 기록을 SHA-256 해시와 함께 남기고 잔여위험을 다시 평가합니다.'), ('직무분리 승인', '검토자는 같은 사건을 최종 승인할 수 없고, 별도 권한자가 승인해야 종결됩니다.')],
   flow=['보호정지 반복', '후보 사건', '사람 검토', '담당·기한', '현장 조치', '증빙', '잔여위험 재평가', '승인·종결'],
   bound_h='역할 경계', bound='COREON은 로봇의 감지·주행·보호정지·안전설정을 바꾸거나 대체하지 않습니다. 관제시스템 이벤트는 읽기 전용으로 받아 사람이 검토할 후보로만 쓰며, COREON의 종결은 로봇 재가동 허가가 아닙니다. 실제 연동 범위는 고객 현장의 인터페이스 검증 후 확정합니다.',
   faq=[('AMR·AGV가 이미 안전하게 멈추는데 별도 관리가 왜 필요한가요?', '정지는 로봇의 안전기능이지만, 반복 정지의 원인(적재물, 동선, 표시 불량 등)을 고치고 그 이행을 기록하는 일은 사람의 업무입니다. COREON은 이 후속 업무의 담당·기한·증빙·승인을 관리합니다.'),
        ('로봇이나 관제시스템 설정을 바꿔야 하나요?', '아닙니다. COREON은 로봇 펌웨어나 안전설정을 변경하지 않으며, 관제시스템 이벤트를 읽기 전용으로 받는 방식을 기준으로 고객 현장에서 연동 범위를 검증합니다.'),
        ('중대재해처벌법 대응에 어떻게 활용하나요?', '유해·위험요인을 확인하고 개선한 과정을 담당자·기한·증빙·승인 기록으로 남겨 경영책임자 보고와 점검에 활용할 수 있도록 지원합니다. 법적 의무 이행의 판단은 사업장 책임입니다.'),
        ('지게차·AGV 같은 다른 이동장비에도 적용되나요?', '네. 이동장비 유형과 관계없이 반복 정지·근접 아차사고·통로 위험을 같은 사건 절차로 관리할 수 있으며, 신호 연동 방식은 현장별로 확인합니다.')],
   related='AMR 안전관리 · AGV 안전 · 지게차 안전관리 · 물류센터 안전관리 · 사람 로봇 혼재 구역 · 보호정지 반복 · 이동장비 아차사고 · 중대재해 예방 시스템 · 위험성평가 조치관리 · 안전보건관리체계',
   crumb='AMR·AGV 이동장비 안전관리'),
  en=dict(title='AMR, AGV and forklift safety management | Mixed human-robot zones - COREON',
   desc='A guide to managing repeated AMR/AGV/forklift stops and near misses as safety events with owner, deadline, action, evidence, residual risk reassessment and approved closure. A follow-up execution layer that does not replace robot safety control.',
   kw='AMR safety management,AGV safety,forklift safety management,mobile equipment safety,warehouse safety,human robot mixed zone,protective stop,serious accident prevention,risk assessment action management',
   eyebrow='MOBILE EQUIPMENT · AMR / AGV / FORKLIFT', h1='AMR, AGV and forklift safety:<br>what happens after the robot stops matters.',
   lead='Robots slow down and stop when they detect a person. If stops keep repeating at one spot, a cause people must fix remains — stacked goods, walkways, floor marking. COREON Safety AX Agent manages that fix as one record, from owner and deadline to evidence and approval.',
   cards=[('Recurring stops are a site problem', 'Repeated protective stops and near misses become candidate events that a person reviews before they become official records.'), ('Owner and deadline', 'Actions such as clearing stacked goods or adding stop lines, crosswalks and mirrors are tied to an owner and a due date.'), ('Evidence and residual risk', 'After-photos and TBM records are kept with SHA-256 hashes, and residual risk is reassessed.'), ('Segregated approval', 'The reviewer cannot give final approval on the same event; a separate approver must close it.')],
   flow=['Repeated stop', 'Candidate event', 'Human review', 'Owner · deadline', 'Field action', 'Evidence', 'Reassessment', 'Approval · closure'],
   bound_h='Role boundary', bound='COREON does not change or replace robot sensing, navigation, protective stops or safety settings. Fleet events are taken read-only as review candidates, and a COREON closure is not a permit to restart a robot. Actual integration scope is confirmed after interface validation at the customer site.',
   faq=[('The AMR already stops safely. Why manage anything else?', 'Stopping is the robot’s safety function, but fixing the cause of repeated stops and recording that fix is human work. COREON manages owner, deadline, evidence and approval for that work.'),
        ('Do robot or fleet settings need to change?', 'No. COREON does not change robot firmware or safety settings; integration is validated per site based on read-only intake of fleet events.'),
        ('Does it apply to forklifts and AGVs too?', 'Yes. Repeated stops, near misses and aisle hazards from any mobile equipment can follow the same event procedure; the signal interface is confirmed per site.')],
   related='AMR safety management · AGV safety · forklift safety · warehouse safety · human-robot mixed zone · protective stop · mobile equipment near miss · serious accident prevention',
   crumb='AMR/AGV mobile equipment safety')),
 dict(slug='construction-serious-accident-prevention', vk={'ko': 'con_ko', 'en': 'con_ko'},
  ko=dict(title='건설 현장 중대재해 예방 | 위험 발견부터 조치·증빙·종결까지 - COREON Safety AX',
   desc='주택·건축·토목·플랜트·전력인프라 현장의 협력사 제보, CCTV AI, 가스 센서, 작업허가 점검 신호를 하나의 안전 사건으로 묶어 담당자·기한·조치증빙·잔여위험·승인 종결까지 관리하는 건설 현장 중대재해 예방 가이드.',
   kw='건설현장 중대재해 예방,건설 안전관리 시스템,건설현장 안전관리,협력사 안전관리,추락 위험 관리,밀폐공간 가스,작업허가 관리,LOTO,TBM 안전관리,위험성평가 조치관리,중대재해처벌법 대응 지원',
   eyebrow='CONSTRUCTION · HOUSING / BUILDING / CIVIL / PLANT / POWER', h1='건설 현장 중대재해 예방,<br>위험 발견 이후 종결까지를 증명해야 합니다.',
   lead='건설 현장의 위험 신호는 협력사 근로자의 사진 한 장, CCTV AI 감지, 가스 농도 경보, 작업허가 점검 지적처럼 서로 다른 경로로 들어옵니다. 신호는 달라도 종결까지의 절차는 하나여야 합니다.',
   cards=[('주택·건축', '갱폼·슬래브 단부 추락 위험 제보, 고층 철골 양중 구역 진입 감지.'), ('토목', '터널·밀폐공간 가스 농도 상승 경보와 측정값·기준 초과 기록.'), ('플랜트', '화기·가스 작업허가 조건 미이행 지적과 가스감지 경보.'), ('전력인프라', '정전·LOTO 확인 누락 점검 지적과 재발 방지 조치.')],
   flow=['현장 신호', '사람 확정', '담당·기한', '조치·증빙', '잔여위험 재평가', '권한자 승인', '종결 증명', '경영자 보고'],
   bound_h='적용 경계', bound='CCTV·센서 신호는 사람이 확인하기 전까지 검토 후보이며 자동 종결 근거가 되지 않습니다. 외부 시스템 연동은 고객 현장의 인터페이스 검증 후 적용합니다.',
   faq=[('협력사가 많은 건설 현장에서 조치 누락을 어떻게 막나요?', '모든 위험 신호를 담당자와 완료기한이 있는 사건으로 등록하고, 증빙·잔여위험 재평가·승인이 갖춰지지 않으면 서버가 종결을 차단합니다.'),
        ('기존 안전관리 플랫폼을 교체해야 하나요?', '아닙니다. COREON은 위험 발견 이후의 실행·증빙·종결 상태를 연결하는 보완 계층으로 적용할 수 있습니다.'),
        ('중대재해처벌법 대응에 어떤 기록이 남나요?', '위험 확인, 담당·기한, 조치 증빙(SHA-256), 잔여위험 재평가, 승인 이력이 한 사건에 남아 경영책임자 보고와 점검에 활용할 수 있도록 지원합니다. 법적 의무 이행의 판단은 사업장 책임입니다.')],
   related='건설현장 중대재해 예방 · 건설 안전관리 시스템 · 건설현장 안전관리 · 협력사 안전관리 · 추락 위험 · 밀폐공간 가스 · 작업허가 관리 · LOTO · TBM · 위험성평가 조치관리',
   crumb='건설 현장 중대재해 예방'),
  en=dict(title='Construction site serious accident prevention | From hazard to verified closure - COREON',
   desc='A guide to combining subcontractor reports, CCTV AI, gas sensors and permit-to-work findings on housing, building, civil, plant and power sites into one safety event managed through owner, deadline, evidence, residual risk and approved closure.',
   kw='construction safety management,construction serious accident prevention,subcontractor safety,fall hazard,confined space gas,permit to work,LOTO,TBM,risk assessment action management',
   eyebrow='CONSTRUCTION · HOUSING / BUILDING / CIVIL / PLANT / POWER', h1='Construction serious accident prevention:<br>prove every hazard through to closure.',
   lead='On construction sites, hazard signals arrive through different routes — a subcontractor’s photo, a CCTV AI detection, a gas alarm, a permit-to-work finding. The signals differ; the path to closure should be one.',
   cards=[('Housing · Building', 'Fall-hazard reports at slab edges, entry detection in steel lifting zones.'), ('Civil', 'Gas alarms in tunnels and confined spaces, with readings and threshold breaches.'), ('Plant', 'Hot-work and gas permit conditions not met, plus gas detection alarms.'), ('Power', 'Missed de-energization or LOTO checks, and recurrence prevention.')],
   flow=['Site signal', 'Human confirmation', 'Owner · deadline', 'Action · evidence', 'Reassessment', 'Authorized approval', 'Closure proof', 'Executive report'],
   bound_h='Scope boundary', bound='CCTV and sensor signals remain review candidates until a person confirms them and are never grounds for automatic closure. External integration is applied after interface validation at the customer site. The demo video is narrated in Korean.',
   faq=[('How do you prevent missed actions across many subcontractors?', 'Every hazard signal becomes an event with an owner and a deadline, and the server blocks closure until evidence, residual risk reassessment and approval are in place.'),
        ('Do we have to replace our existing safety platform?', 'No. COREON can be applied as a complementary layer that connects execution, evidence and closure after a hazard is found.')],
   related='construction safety management · serious accident prevention · subcontractor safety · fall hazard · confined space gas · permit to work · LOTO · TBM',
   crumb='Construction serious accident prevention')),
 dict(slug='refinery-turnaround-hot-work-safety', vk={'ko': 'ene_ko', 'en': 'ene_ko'},
  ko=dict(title='정유·석유화학 정기보수(TA) 화기작업 안전관리 | 협력사 위험 조치·종결 - COREON',
   desc='정유·석유화학 정기보수 기간 가스감지 경보와 협력사 화기감시자 제보를 안전 사건으로 등록하고, AI 참고 안내 후 사람이 확정한 조치·증빙·잔여위험 재평가·직무분리 승인으로 종결하는 화기작업 안전관리 가이드.',
   kw='정기보수 안전관리,TA 안전관리,화기작업 안전관리,정유 안전관리,석유화학 안전관리,협력사 화기작업,가스감지 경보,PSM 공정안전관리,작업허가,중대재해 예방 시스템',
   eyebrow='REFINING · PETROCHEMICAL · TURNAROUND', h1='정유·석유화학 정기보수 화기작업,<br>AI는 판단을 돕고 결정과 종결은 사람이 합니다.',
   lead='정기보수(TA) 기간에는 많은 협력사가 동시에 화기작업을 합니다. 위험 신호는 가스감지기 경보와 화기감시자의 현장 제보로 시작됩니다. COREON은 공정제어와 비상대응을 대신하지 않고, 그 이후 사람의 조치·증빙·종결을 관리합니다.',
   cards=[('입력', '가스감지 경보, 협력사 화기감시자의 모바일 사진·텍스트 제보.'), ('AI 참고 안내', '화재·폭발 위험 분류, 확인할 사항과 공식 근거를 안내합니다. 결정하지 않습니다.'), ('사람 확정', '사건 확정, 담당·기한, 잔여위험 수용, 검증·종결은 사람만 할 수 있습니다.'), ('증빙·승인', '배수구 밀폐 사진 등 조치 증빙과 잔여위험 재평가, 작성·검토·승인 분리.')],
   flow=['가스 경보·제보', 'AI 분류(참고)', '사람 확정', '담당·기한', '조치·증빙', '잔여위험 재평가', '직무분리 승인', '종결 증명'],
   bound_h='역할 경계', bound='COREON은 DCS·ESD·가스감지 설비·PSM·비상대응 체계를 대신하지 않습니다. 화면의 AI 안내는 규칙 기반 참고 안내이며, 설비 연계 범위는 고객 협의와 현장 검증으로 정합니다.',
   faq=[('AI가 위험을 판단해 작업을 멈추나요?', '아닙니다. AI는 위험 유형 분류와 확인 사항·공식 근거를 안내하는 참고 기능이며, 사건 확정과 조치·승인·종결은 사람이 합니다.'),
        ('정기보수 기간 여러 협력사의 화기작업을 어떻게 추적하나요?', '협력사·작업·담당자별로 사건을 등록하고 기한, 증빙, 잔여위험 재평가, 승인 상태를 한 화면에서 확인합니다.'),
        ('기존 PSM·작업허가 시스템과 겹치지 않나요?', 'COREON은 기존 체계를 대체하지 않고 위험 발견 이후의 조치·증빙·종결 기록을 연결하는 보완 계층으로 적용합니다.')],
   related='정기보수 안전관리 · TA 안전관리 · 화기작업 안전관리 · 정유 안전관리 · 석유화학 안전관리 · 협력사 화기작업 · 가스감지 경보 · 작업허가 · 중대재해 예방 시스템',
   crumb='정유·석유화학 정기보수 화기작업'),
  en=dict(title='Refinery turnaround hot-work safety | Contractor risk action and closure - COREON',
   desc='A guide to registering gas alarms and fire-watch reports during refinery and petrochemical turnarounds as safety events, then closing them through human-confirmed action, evidence, residual risk reassessment and segregated approval after AI reference guidance.',
   kw='turnaround safety management,hot work safety,refinery safety,petrochemical safety,contractor hot work,gas alarm,process safety management,permit to work,serious accident prevention',
   eyebrow='REFINING · PETROCHEMICAL · TURNAROUND', h1='Refinery turnaround hot work:<br>AI assists, people decide and close.',
   lead='During a turnaround, many contractors perform hot work at once. Hazard signals start with gas detector alarms and fire-watch reports. COREON does not replace process control or emergency response; it manages the human action, evidence and closure that follow.',
   cards=[('Input', 'Gas alarms and mobile photo/text reports from contractor fire watchers.'), ('AI reference', 'Classifies fire and explosion risk and points to checks and official references. It does not decide.'), ('Human decision', 'Only people confirm events, set owners and deadlines, accept residual risk and close.'), ('Evidence · approval', 'Action evidence such as a sealed drain photo, reassessment, and separated author, reviewer and approver.')],
   flow=['Gas alarm · report', 'AI triage (reference)', 'Human confirmation', 'Owner · deadline', 'Action · evidence', 'Reassessment', 'Segregated approval', 'Closure proof'],
   bound_h='Role boundary', bound='COREON does not replace DCS, ESD, gas detection, PSM or emergency response. On-screen AI guidance is rule-based reference; equipment integration scope is set through customer agreement and site validation. The demo video is narrated in Korean.',
   faq=[('Does the AI stop work on its own?', 'No. AI provides reference classification, checks and official references; people confirm events and handle action, approval and closure.'),
        ('Does it overlap with existing PSM or permit systems?', 'COREON does not replace them; it is a complementary layer that connects action, evidence and closure records after a hazard is found.')],
   related='turnaround safety · hot work safety · refinery safety · petrochemical safety · contractor hot work · gas alarm · permit to work',
   crumb='Refinery turnaround hot-work safety')),
]

CSS = ('<style>html[lang=ko] body{word-break:keep-all}.video-box{margin-top:26px;border-radius:16px;overflow:hidden;background:#0A1A2F;box-shadow:0 20px 50px rgba(7,19,31,.2)}'
       '.video-box video{display:block;width:100%;height:auto;aspect-ratio:16/9}.vnote{font-size:13px;color:#5b6b7a;margin-top:10px;line-height:1.6}'
       '.bound{margin-top:22px;border:1px solid #F2D58A;background:#FFF8E6;border-radius:14px;padding:16px 18px}.bound h3{margin:0 0 6px;font-size:16px}.bound p{margin:0;font-size:14.5px}'
       '.faq details{border-bottom:1px solid #e1e6ec;padding:14px 0}.faq summary{font-weight:700;cursor:pointer}.faq p{margin:8px 0 0;color:#3b4b5a}</style>')

def page(g, lang):
    c = g[lang]; ko = lang == 'ko'; vk = g['vk'][lang]; v = V[vk]
    path = f"/guides/{g['slug']}.html" if ko else f"/en/guides/{g['slug']}.html"
    url = B + path; ko_url = f"{B}/guides/{g['slug']}.html"; en_url = f"{B}/en/guides/{g['slug']}.html"
    home = '/' if ko else '/en/'
    graph = [
      {"@type": "Article", "headline": c['title'].split(' | ')[0], "description": c['desc'], "inLanguage": lang, "datePublished": '2026-10-08', "dateModified": '2026-10-08',
       "author": {"@type": "Organization", "name": "주식회사 코레온홀딩스"}, "publisher": {"@type": "Organization", "name": "주식회사 코레온홀딩스", "logo": {"@type": "ImageObject", "url": B + "/assets/coreon-logo.png"}},
       "mainEntityOfPage": url, "image": turl(vk), "video": {"@id": f"{url}#video-{vk}"}},
      vobj(vk, url),
      {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "COREON", "item": B + home},
        {"@type": "ListItem", "position": 2, "name": "안전 가이드" if ko else "Safety guides", "item": B + ('/use-cases/' if ko else '/en/')},
        {"@type": "ListItem", "position": 3, "name": c['crumb'], "item": url}]},
      {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in c['faq']]}]
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace('</', '<\\/')
    others = [x for x in G if x is not g]
    olinks = ''.join(f'<a class="btn" href="{"/guides/" if ko else "/en/guides/"}{x["slug"]}.html">{x[lang]["crumb"]}</a>' for x in others)
    alt_lang = f'<a href="{"/en/guides/" if ko else "/guides/"}{g["slug"]}.html" hreflang="{"en" if ko else "ko"}">{"English" if ko else "한국어"}</a>'
    vnote = ('현장 장면은 AI 생성 연출, 제품 화면은 실제 COREON Safety AX를 시연 환경의 가상 데이터로 녹화했습니다.' if ko else
             'Site scenes are AI-generated; product screens are the actual COREON Safety AX recorded with virtual data in a demo environment.')
    if not ko and v['lang'] == 'ko': vnote += ' Korean narration.'
    cards = ''.join(f'<div class="card"><small>0{i+1}</small><h3>{t}</h3><p>{d}</p></div>' for i, (t, d) in enumerate(c['cards']))
    flow = ''.join(f'<div class="step">{s}</div>' for s in c['flow'])
    faq = ''.join(f'<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>' for q, a in c['faq'])
    src = f"?source=seo-{g['slug']}"
    return f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{c['title']}</title><meta name="description" content="{html.escape(c['desc'])}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta name="keywords" content="{c['kw']}"><link rel="canonical" href="{url}"><link rel="alternate" hreflang="ko" href="{ko_url}"><link rel="alternate" hreflang="en" href="{en_url}"><link rel="alternate" hreflang="x-default" href="{ko_url}"><meta property="og:type" content="video.other"><meta property="og:locale" content="{'ko_KR' if ko else 'en_US'}"><meta property="og:site_name" content="COREON"><meta property="og:title" content="{html.escape(c['title'])}"><meta property="og:description" content="{html.escape(c['desc'])}"><meta property="og:url" content="{url}"><meta property="og:image" content="{turl(vk)}"><meta property="og:video" content="{vurl(vk)}"><meta property="og:video:type" content="video/mp4"><meta property="og:video:width" content="1280"><meta property="og:video:height" content="720"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/use-cases/style.css">{CSS}<script type="application/ld+json">{ld}</script></head><body><header class="top"><div class="wrap nav"><a class="brand" href="{home}">COREON</a><nav class="links"><a href="{home}#amr-demo">{'현장 시나리오 영상' if ko else 'Field scenario videos'}</a><a href="{'/serious-accident-compliance.html' if ko else '/en/serious-accident-compliance.html'}">{'법령 대응표' if ko else 'Compliance map'}</a>{alt_lang}<a class="btn primary" href="{'/download.html' if ko else '/en/download.html'}{src}#install">{'무료 시작' if ko else 'Get started'}</a></nav></div></header><main><section class="hero"><div class="wrap"><span class="eyebrow">{c['eyebrow']}</span><h1>{c['h1']}</h1><p>{c['lead']}</p><div class="video-box"><video controls preload="none" playsinline poster="/assets/video/{v['f'].replace('-2026', '-poster-2026')}.jpg" aria-label="{html.escape(v['n'])}"><source src="/assets/video/{v['f']}.mp4" type="video/mp4"></video></div><p class="vnote">{vnote}</p></div></section><section class="section"><div class="wrap"><div class="grid4">{cards}</div><div class="bound"><h3>{c['bound_h']}</h3><p>{c['bound']}</p></div></div></section><section class="section soft"><div class="wrap"><div class="head"><h2>{'하나의 실행 흐름' if ko else 'One execution flow'}</h2></div><div class="flow">{flow}</div><div class="head" style="margin-top:34px"><h2>{'자주 묻는 질문' if ko else 'FAQ'}</h2></div><div class="faq">{faq}</div><h2>{'관련 검색어' if ko else 'Related searches'}</h2><p>{c['related']}</p><div class="actions"><a class="btn primary" href="{'/inquiry.html' if ko else '/en/contact/sales.html'}{src}">{'30분 실제 화면 시연 요청' if ko else 'Request a 30-minute live demo'}</a><a class="btn" href="{'/guides/serious-accident-prevention-safety-ax.html' if ko else '/en/guides/serious-accident-prevention-safety-ax.html'}">{'중대재해 예방 가이드' if ko else 'Serious accident prevention guide'}</a>{olinks}</div><p class="vnote">{KO_BOUND if ko else EN_BOUND}</p></div></section></main><footer><div class="wrap">COREON HOLDINGS Co., Ltd. · COREON Safety AX Agent · contact@coreon-global.com</div></footer></body></html>'''

if __name__ == '__main__':
    for g in G:
        for lang in ['ko', 'en']:
            p = f"guides/{g['slug']}.html" if lang == 'ko' else f"en/guides/{g['slug']}.html"
            open(p, 'w', encoding='utf-8').write(page(g, lang)); print('wrote', p)

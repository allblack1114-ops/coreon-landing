from pathlib import Path

RELEASE_OLD = 'v27.61 Vendor-neutral Safety Event API'
RELEASE_NEW = 'v27.61.1 Semantic Safety Visual Convergence'
CSS = '<link rel="stylesheet" href="/assets/safety-semantic.css">'
JS = '<script src="/assets/safety-home-enhancer.js" defer></script>'

FILES = [
    Path('index.html'), Path('en/index.html'),
    Path('safety-ax-runtime.html'), Path('en/safety-ax-runtime.html'),
    Path('enterprise-multisite.html'), Path('en/enterprise-multisite.html'),
    Path('safety-event-integration.html'), Path('en/safety-event-integration.html'),
]

for path in FILES:
    if not path.exists():
        continue
    html = path.read_text(encoding='utf-8')
    if '/assets/safety-semantic.css' not in html:
        html = html.replace('</head>', CSS + '</head>', 1)
    if '/assets/safety-home-enhancer.js' not in html:
        html = html.replace('</body>', JS + '</body>', 1)
    html = html.replace(RELEASE_OLD, RELEASE_NEW)
    path.write_text(html, encoding='utf-8')
    print(f'updated {path}')

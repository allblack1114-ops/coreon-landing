const { execFileSync } = require('child_process');
const fs = require('fs');

const files = execFileSync('git', ['ls-files', '*.html'], { encoding: 'utf8' })
  .split(/\r?\n/)
  .filter(Boolean);

const forbidden = [
  '/safety-room/',
  '/free-diagnosis',
  '/ax-agent-demo',
  '/customer-decision-hub',
  '/signup.html',
  '/enterprise-public?'
];

const violations = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const fragment of forbidden) {
    // R-2 (2026-11-07): 운영 제품 도메인(app.coreon-global.com)의 무료 가입 화면 절대 링크는 허용.
    // 홈페이지 내부 상대 경로(/signup.html)는 계속 금지. 홈페이지 본문은 변경하지 않음.
    const rest = fragment === '/signup.html' ? text.split('https://app.coreon-global.com/signup.html').join('') : text;
    if (rest.includes(fragment)) violations.push(`${file}: ${fragment}`);
  }
}

if (violations.length) {
  console.error('COREON public product entry contract gate FAILED');
  for (const v of violations) console.error(`- ${v}`);
  console.error('Public pages must route product use through the install center or authenticated login.');
  process.exit(1);
}

console.log(`COREON public product entry contract gate PASSED (${files.length} HTML files checked)`);

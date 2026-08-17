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
    if (text.includes(fragment)) violations.push(`${file}: ${fragment}`);
  }
}

if (violations.length) {
  console.error('COREON public product entry contract gate FAILED');
  for (const v of violations) console.error(`- ${v}`);
  console.error('Public pages must route product use through the install center or authenticated login.');
  process.exit(1);
}

console.log(`COREON public product entry contract gate PASSED (${files.length} HTML files checked)`);

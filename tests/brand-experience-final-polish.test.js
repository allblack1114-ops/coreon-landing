const fs=require('fs');
const assert=require('node:assert/strict');

for(const file of ['assets/home-final-polish.css','assets/home-final-polish.js','assets/home-experience-v2-link-fix.js']){
  assert.ok(fs.existsSync(file),`missing ${file}`);
}
const js=fs.readFileSync('assets/home-final-polish.js','utf8');
const css=fs.readFileSync('assets/home-final-polish.css','utf8');
const loader=fs.readFileSync('assets/home-experience-v2-link-fix.js','utf8');

assert.match(js,/mainline/);
assert.match(js,/FIELD EXECUTION/);
assert.match(js,/OPERATIONS & ORGANIZATION/);
assert.match(js,/INTELLIGENCE & EXPANSION/);
assert.match(js,/TRUST & IP/);
for(const scene of ['scene-problem','scene-industry','scene-risk','scene-enterprise','scene-pilot','scene-plans','scene-start','scene-trust']) assert.ok(js.includes(scene),`missing ${scene}`);

assert.match(css,/\.bx2-title \.mainline/);
assert.match(css,/\.bx2-atlas-group/);
assert.match(css,/\.bx2-callout:after/);
assert.match(css,/scene-industry/);
assert.match(css,/scene-pilot/);
assert.match(css,/scene-trust/);

assert.match(loader,/home-final-polish\.css/);
assert.match(loader,/home-final-polish\.js/);
console.log('PASS COREON Brand Experience final polish contract');
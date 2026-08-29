'use strict';
const fs=require('node:fs');
const path=require('node:path');

const ROOT=__dirname;
const policy=JSON.parse(fs.readFileSync(path.join(ROOT,'product-link-policy.json'),'utf8'));
const scanFiles=['index.html','en/index.html','assets/home-mobius-safety-loop.js'];
const findings=[];
for(const rel of scanFiles){
  const full=path.join(ROOT,rel);
  if(!fs.existsSync(full)) throw new Error(`HOMEPAGE_AUDIT_SOURCE_MISSING:${rel}`);
  const src=fs.readFileSync(full,'utf8');
  for(const forbidden of policy.forbiddenDirectProductPaths){
    if(src.includes(forbidden)) findings.push({file:rel,path:forbidden});
  }
}
if(findings.length){
  console.error('FAIL public homepage exposes non-canonical product surfaces');
  for(const item of findings) console.error(`- ${item.file}: ${item.path}`);
  process.exit(1);
}
console.log(`PASS homepage product-link policy: ${scanFiles.length} customer-facing sources contain no HIDE/MERGE/RETIRE direct links`);

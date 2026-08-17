'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=process.cwd();
const SKIP_DIRS=new Set(['.git','node_modules']);
function walk(dir,out=[]){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(SKIP_DIRS.has(entry.name))continue;const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full,out);else if(entry.isFile()&&entry.name.endsWith('.html'))out.push(full);}return out;}
function localCandidates(file,raw){let value=String(raw||'').trim();if(!value||/^(?:#|mailto:|tel:|javascript:|data:|https?:|\/\/)/i.test(value))return [];
  value=value.split('#')[0].split('?')[0];if(!value)return [];
  let target=value.startsWith('/')?path.join(ROOT,decodeURIComponent(value.slice(1))):path.resolve(path.dirname(file),decodeURIComponent(value));
  const c=[target];if(!path.extname(target)){c.push(path.join(target,'index.html'));c.push(target+'.html');}return c;
}
const missing=[];const htmlFiles=walk(ROOT);
const attr=/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
for(const file of htmlFiles){const html=fs.readFileSync(file,'utf8');let m;while((m=attr.exec(html))){const candidates=localCandidates(file,m[1]);if(!candidates.length)continue;if(!candidates.some(p=>fs.existsSync(p)))missing.push({file:path.relative(ROOT,file),target:m[1]});}}
assert.equal(missing.length,0,'Broken local links:\n'+missing.map(x=>`${x.file} -> ${x.target}`).join('\n'));
console.log(`PASS v28.12 public link integrity across ${htmlFiles.length} HTML files`);

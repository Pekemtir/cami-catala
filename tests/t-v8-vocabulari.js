const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await(await b.newContext({viewport:{width:390,height:900}})).newPage();const e=[];p.on('pageerror',x=>e.push(x.message));p.on('console',m=>{if(m.type()==='error')e.push(m.text())});
await p.goto('file://'+process.argv[2]);
await p.evaluate(()=>window.__t.ACT.themes());
console.log((await p.locator('#app').innerText()).slice(0,500).replace(/\n/g,' | '));
await p.fill('#tsr','casa');console.log('search:',(await p.locator('#tsres').innerText()).slice(0,120).replace(/\n/g,' | '));
// quiz: answer everything correctly, check no repeats and mastery changes
const tid=await p.evaluate(()=>window.__t.go&&window.__t.S&&Object.keys(window.__t.DIC?{}:{}) );
const res=await p.evaluate(()=>{const t=window.__t;const th=t.WORDS[0].th;t.ACT.tquiz(th);const qs=t.SE.qs.map(q=>q.key);return{th,keys:qs,uniq:new Set(qs).size}});
console.log(res);
for(let i=0;i<10;i++){
 const ans=await p.evaluate(()=>window.__t.SE.cur.ans);
 if(await p.locator('#tb').count()){await p.fill('#tb',ans);await p.click('#ck')}else{await p.click('.opt >> text="'+ans.replace(/"/g,'\\"')+'"')}
 await p.waitForSelector('#nx');await p.click('#nx');
}
await p.waitForTimeout(300);
const m=await p.evaluate(()=>({m:window.__t.S.m,pct:window.__t.THM?0:0}));console.log(Object.keys(m.m).length,Object.values(m.m));
await p.evaluate(()=>window.__t.ACT.themes());console.log((await p.locator('.chip').allInnerTexts()).slice(0,6));
await p.evaluate(()=>window.__t.ACT.opdic());console.log((await p.locator('h1').first().innerText()));
await p.evaluate(()=>window.__t.ACT.themes());await p.evaluate(()=>window.__t.ACT.mixv());console.log(await p.evaluate(()=>window.__t.SE.qs.map(q=>q.key).join(',')));
console.log(e);await b.close()})();

const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const auto=`(async()=>{const D=__D;let n=0;while(D.SE&&n<80){const q=D.SE.cur;if(!q)break;
 if(q.k==='build'){D.SE.line=q.tok.map((_,i)=>i);D.ACT.check()}else if(q.k==='type'){const tb=document.querySelector('#tb');if(tb){tb.value=q.ans;D.ACT.check()}else D.ACT.pick(q.ans)}else D.ACT.pick(q.ans);
 const nx=document.querySelector('#nx');nx&&nx.click();n++}return n})()`;
// 1 puerta: sin lecciones
const g=await p.evaluate(()=>{const D=__D;const sp=D.seenPool();const vp=D.vpool();let tenses=new Set(),verbs=new Set(),th=0;
 for(let i=0;i<300;i++){const q=D.mixQ(1)[0];if(q&&q.verb){tenses.add(q.kind);}}
 D.go('themes');const lock=document.querySelectorAll('.lrow.jg-lock').length,tot=document.querySelectorAll('.lrow').length;
 return {seen:sp.length,vpool:vp,tenses:[...tenses],lock,tot,sentA2:Array.from({length:200},()=>D.sentQ()).filter(q=>q&&q.key).length}});
console.log('puerta sin progreso',JSON.stringify(g));
// 2 sobre mi
await p.evaluate(()=>__D.go('meform',null,true));
await p.fill('#mn','Eider');await p.fill('#mt','Elizondo');await p.fill('#ma','34');await p.click('[data-a=mesave]');
console.log('me',JSON.stringify(await p.evaluate(()=>__D.S.me)),JSON.stringify(await p.evaluate(()=>__D.meQs().map(q=>q.ans))));
await p.evaluate(()=>__D.ACT.meq());console.log('sesión meq',await p.evaluate(auto),'resultado',await p.evaluate(()=>document.body.innerText.match(/\d+ \/ \d+ · \d+ %/)?.[0]));
// 3 generador: desbloquear con progreso
await p.evaluate(()=>{['a11','a12','a13','a14','a15','a16','a17','a18','a19','a110'].forEach(i=>__D.S.done[i]={best:90,date:'x'})});
const gq=await p.evaluate(()=>Array.from({length:12},()=>{const q=__D.genQ();return q&&q.es+' → '+q.ans}));console.log('gen',gq.slice(0,8));
await p.evaluate(()=>__D.ACT.genq());console.log('sesión genq',await p.evaluate(auto),await p.evaluate(()=>document.body.innerText.match(/\d+ \/ \d+ · \d+ %/)?.[0]));
// 4 A2 difuminado
await p.evaluate(()=>{const l=Object.values(__D.LSM).find(x=>x.lv==='a2');__D.go('lesson',l.id,true);__D.ACT.lnext()});
console.log('blur A2:',await p.evaluate(()=>document.querySelectorAll('.blur').length));
await p.click('.blur').catch(()=>{});console.log('tras tocar:',await p.evaluate(()=>document.querySelectorAll('.blur.on').length));
await p.evaluate(()=>{const l=Object.values(__D.LSM).find(x=>x.lv==='a1');__D.go('lesson',l.id,true);__D.ACT.lnext()});
console.log('blur A1:',await p.evaluate(()=>document.querySelectorAll('.blur').length));
// listen y quiz
await p.evaluate(()=>__D.ACT.listenq());console.log('listenq',await p.evaluate(auto));
await p.evaluate(()=>__D.ACT.daily());console.log('daily',await p.evaluate(auto));
console.log('errs',errs);await b.close()})();

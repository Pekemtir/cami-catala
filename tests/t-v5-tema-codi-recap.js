const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
await p.evaluate(()=>__D.go('me'));
console.log('campo:',await p.evaluate(()=>!!document.querySelector('#tc')));
console.log('dn antes:',await p.evaluate(()=>__D.dn('x')));
await p.fill('#tc','malo');await p.click('[data-a=tcode]');console.log('malo tkey:',await p.evaluate(()=>__D.S.set.tkey));
await p.fill('#tc','irakasle2026');await p.click('[data-a=tcode]');await p.waitForTimeout(200);
console.log('ok tkey:',await p.evaluate(()=>__D.S.set.tkey),'dn:',await p.evaluate(()=>__D.dn('x')));
// lección y recap
const id=await p.evaluate(()=>Object.values(__D.LSM)[0].id);
await p.evaluate(id=>{__D.go('lesson',id)},id);
await p.evaluate(()=>__D.ACT.lpractice());
let n=0;for(;n<60;n++){const st=await p.evaluate(()=>{const D=__D;const se=D.SE;if(!se)return 'end';const q=se.cur;
 if(q.k==='build'){se.line=q.tok.map((_,i)=>i);D.ACT.check();}else if(q.k==='type'||q.k==='fill'){const tb=document.querySelector('#tb');if(tb){tb.value=q.ans;D.ACT.check()}else D.ACT.pick(q.ans)}else D.ACT.pick(q.ans);
 const nx=document.querySelector('#nx');nx&&nx.click();return 'ok'});if(st==='end')break}
console.log('preguntas pulsadas',n,'recap visible:',await p.evaluate(()=>document.body.innerText.includes('Resum de la lliçó')));
console.log('errs',errs);await b.close()})();

// Auditoría: con distintos niveles de progreso, la práctica mixta no debe pedir verbos/tiempos/palabras de lliçons no hechas.
// Uso: node t-auditoria.js <catala-debug.html>  (build con window.__D incluyendo mixQ,verbQ,S,LESSONS,seenPool,vpool,unlockedT,VPOOL)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(300);
const r=await p.evaluate(()=>{const D=__D;const out=[];const ids=D.LESSONS.map(l=>l.id);
 for(const [name,k] of [['0',0],['3',3],['9',9],['A1',26],['todo',ids.length]]){
  D.S.done={};ids.slice(0,k).forEach(i=>D.S.done[i]={best:90,date:'x'});D.S.set.tkey=0;
  const vp=new Set(D.VPOOL()),ut=new Set(D.unlockedT()),sp=new Set(D.seenPool().map(w=>w.ca));
  const fb=!vp.size,bad=[];let nv=0,nw=0;
  for(let i=0;i<400;i++){D.mixQ(1).forEach(q=>{const key=q&&q.key||'';
   if(key.startsWith('v:')){nv++;const [inf,t]=key.slice(2).split('.');if(!(vp.has(inf)||fb&&['ser','tenir'].includes(inf))||!(ut.has(t)||(!ut.size&&t==='pres')))bad.push(key)}
   if(key.startsWith('w:')){nw++;if(!sp.has(key.slice(2)))bad.push(key)}})}
  out.push({prog:name,verbQ:nv,wordQ:nw,tenses:[...ut].join('/')||'(pres)',bad:bad.length,ex:bad.slice(0,3)})}
 return out});
r.forEach(x=>console.log(JSON.stringify(x)));console.log('errs',errs);await b.close();process.exit(r.some(x=>x.bad)?1:0)})();

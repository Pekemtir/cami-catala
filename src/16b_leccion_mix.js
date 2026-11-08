/* ===== v2 · Práctica de lección VARIADA =====
   Cada intento = unas 6 preguntas fijas (las escritas a mano, rotadas por historial) + unas 6 generadas
   SOLO con lo que enseña esa lección (frases de ejemplo y palabras clave) => nada se pregunta antes de enseñarse.
   Antimemorización: subconjunto al azar, las menos vistas/falladas primero, orden barajado sin repetir tipo seguido,
   una frase solo una vez por intento, y memoria de lo ya generado para no repetirlo hasta agotar el banco. */
const LANGW='catalán';
const MIXN=17,MIXF=7;
const clnTxt=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const wordsOf=t=>t.replace(/[.,;:!?¿¡«»"…]/g,'').split(/\s+/).filter(Boolean);
const sameLen=(a,b)=>Math.abs(wordsOf(a).length-wordsOf(b).length);
function lessonItems(l){const ex=[],seen=new Set();
  (l.steps||[]).forEach(s=>(s.ex||[]).forEach(e=>{const t=clnTxt(e[0]),es=clnTxt(e[1]);
    if(!t||!es||/ [–—] /.test(t)||/ [–—] /.test(es)||t.length>70||seen.has(t))return;seen.add(t);ex.push({t,es})}));
  const kw=(l.kw||[]).map(k=>({t:clnTxt(k[0]),es:clnTxt(k[1])})).filter(k=>k.t&&k.es);
  return{ex,kw}}
function earlierItems(l){const ex=[],kw=[];for(const m of LESSONS){const it=lessonItems(m);ex.push(...it.ex);kw.push(...it.kw);if(m.id===l.id)break}return{ex,kw}}
const OKTYPE=t=>/^[\p{L}\- ]+$/u.test(t)&&t.split(' ').length<=3;
function dSent(e,c,n){const bad=x=>x.t===e.t||x.es===e.es||x.t.toLowerCase()===e.t.toLowerCase();
  const own=new Set(c.exL.map(x=>x.t)),s=c.ex.filter(x=>!bad(x)&&own.has(x.t)),o=c.ex.filter(x=>!bad(x)&&!own.has(x.t));
  const near=a=>a.slice().sort((p,q)=>sameLen(p.t,e.t)-sameLen(q.t,e.t)||rnd(3)-1);
  const out=pick(near(s).slice(0,Math.max(n+2,6)),Math.min(n,s.length));
  if(out.length<n)out.push(...pick(near(o).slice(0,8),n-out.length));return out}
function dKw(k,c,field,n){const bad=x=>x.t===k.t||x[field]===k[field];const own=new Set(c.kwL.map(x=>x.t));
  const u=[];for(const x of shuf(c.kw.filter(x=>!bad(x)&&own.has(x.t)))){if(!u.includes(x[field]))u.push(x[field]);if(u.length>=n)break}
  if(u.length<n)for(const x of shuf(c.kw.filter(x=>!bad(x)&&!own.has(x.t)))){if(!u.includes(x[field])&&x[field]!==k[field])u.push(x[field]);if(u.length>=n)break}
  return u}
const GEN={
 sentC:(e,c)=>{const d=dSent(e,c,3);if(d.length<3)return null;return{k:'choice',kind:'Traduce',p:'Traduce al '+LANGW+': «'+esc(e.es)+'»',ans:e.t,opts:d.map(x=>x.t),e:e.es+' = '+e.t,sayAns:1}},
 listen:(e,c)=>{const d=dSent(e,c,3);if(d.length<3)return null;return{k:'choice',kind:'Escucha y elige',p:'Escucha y elige el significado',say:e.t,hide:1,ans:e.es,opts:d.map(x=>x.es),e:e.t+' = '+e.es}},
 cloze:(e,c)=>{const w=e.t.split(' ');const ok=[];w.forEach((x,i)=>{const cl=x.replace(/[.,;:!?¿¡«»"…]/g,'');if(cl.length>=3&&/^[\p{L}\-]+$/u.test(cl)&&true)ok.push(i)});
   if(w.length<3||!ok.length)return null;const i=ok[rnd(ok.length)],cl=w[i].replace(/[.,;:!?¿¡«»"…]/g,'');const m=w.slice();m[i]=w[i].replace(cl,cl[0]+'___');
   return{k:'type',kind:'Completa la frase',p:'«'+esc(m.join(' '))+'»<br><small class="muted">'+esc(e.es)+'</small>',ans:cl,alts:[cl,cl.toLowerCase()],e:e.t+' = '+e.es,h:'Empieza por «'+cl[0]+'»',sayAns:0}},
 build:(e,c)=>{const tok=wordsOf(e.t);if(tok.length<3||tok.length>9)return null;
   const extra=pick([...new Set(c.ex.filter(x=>x.t!==e.t).flatMap(x=>wordsOf(x.t)).filter(w=>!tok.map(z=>z.toLowerCase()).includes(w.toLowerCase())))],2);
   return{k:'build',kind:'Construye la frase',es:e.es,tok,extra,ans:tok.join(' '),tip:e.t}},
 c1:(k,c)=>{const d=dKw(k,c,'es',3);if(d.length<3)return null;return{k:'choice',kind:'Vocabulario',p:'«'+esc(k.t)+'» significa…',say:k.t,ans:k.es,opts:d,e:k.t+' = '+k.es}},
 c2:(k,c)=>{if(k.es.length<=3)return null;const d=dKw(k,c,'t',3);if(d.length<3)return null;return{k:'choice',kind:'Vocabulario',p:'¿Cómo se dice «'+esc(k.es)+'» en '+LANGW+'?',ans:k.t,opts:d,e:k.es+' = '+k.t,sayAns:1}},
 typ:(k,c)=>{if(!OKTYPE(k.t)||k.es.length<=3)return null;return{k:'type',kind:'Escribe en '+LANGW,p:'«'+esc(k.es)+'»',ans:k.t,alts:[k.t,k.t.toLowerCase()],e:k.t+' = '+k.es,h:'Empieza por «'+k.t[0]+'»',sayAns:1}}};
function lhOf(l){S.lh=S.lh||{};return S.lh[l.id]||(S.lh[l.id]={n:0,f:{},g:[]})}
function genCands(l,c){const it=lessonItems(l),out=[];
  it.ex.forEach(e=>['sentC','listen','cloze','build'].forEach(ty=>out.push({ty,item:e,id:ty+'|'+e.t,grp:'e|'+e.t})));
  it.kw.forEach(k=>['c1','c2','typ'].forEach(ty=>out.push({ty,item:k,id:ty+'|'+k.t,grp:'k|'+k.t})));return out}
function buildLessonQs(l){const h=lhOf(l),c=earlierItems(l),n=h.n+1;const own=lessonItems(l);c.exL=own.ex;c.kwL=own.kw;
  // 1) fijas: las menos vistas / más falladas primero, con ruido para que no sea predecible
  const fx=l.qs.map((q,i)=>({i,s:(h.f[i]!=null?h.f[i]:-5)+rnd(100)/50-(S.weak&&S.weak['q:'+l.id+'#'+i]?3:0)})).sort((a,b)=>a.s-b.s);
  const cand=genCands(l,c),recent=new Set(h.g);let fresh=cand.filter(x=>!recent.has(x.id));
  let need=MIXN-MIXF;if(cand.length<need)need=cand.length;
  if(fresh.length<need*2){fresh=cand}   // banco corto: se permite repetir, pero barajado
  // 2) generadas: barajar, máx. 2 por tipo y una vez cada frase/palabra por intento
  const out=[],used=new Set(),tc={};
  for(const x of shuf(fresh)){if(out.length>=need)break;if(used.has(x.grp)||(tc[x.ty]||0)>=2)continue;
    const q=GEN[x.ty](x.item,c);if(!q)continue;q.gid=x.id;out.push(q);used.add(x.grp);tc[x.ty]=(tc[x.ty]||0)+1}
  if(out.length<need){for(const x of shuf(fresh)){if(out.length>=need)break;if(used.has(x.grp))continue;const q=GEN[x.ty](x.item,c);if(!q)continue;q.gid=x.id;out.push(q);used.add(x.grp)}}
  const nf=Math.min(l.qs.length,MIXN-out.length);
  const fixed=fx.slice(0,nf).map(o=>{h.f[o.i]=n;return lq(l.id,o.i)});
  out.forEach(q=>{h.g.push(q.gid)});h.g=h.g.slice(-40);h.n=n;
  // 3) orden barajado evitando dos del mismo tipo seguidas
  let all=shuf(fixed.concat(out));
  for(let i=1;i<all.length;i++){if(all[i].k===all[i-1].k&&all[i].kind===all[i-1].kind){for(let j=i+1;j<all.length;j++){if(all[j].kind!==all[i-1].kind){[all[i],all[j]]=[all[j],all[i]];break}}}}
  save();return all}

/* ===== NAVEGACIÓN Y PANTALLAS ===== */
let CUR={v:'home',a:null},NAV=[],TIMERS=[];
const TABS=['home','lessons','practice','dict','me'];
function clearTimers(){try{JG.stop()}catch(x){}TIMERS.forEach(t=>{clearInterval(t);clearTimeout(t)});TIMERS=[]}
function go(v,a,sub){clearTimers();if(SE)SE=null;leaveSession();
  if(sub){NAV.push(CUR)}else if(TABS.includes(v)){NAV=[]}
  CUR={v,a};show()}
function showCur(){clearTimers();SE=null;show()}
function up(){clearTimers();SE=null;leaveSession();CUR=NAV.pop()||{v:'home'};show()}
function show(){const A=$('#app');const f=V[CUR.v];const sub=!TABS.includes(CUR.v);
  document.body.classList.toggle('sub',sub);
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.v===(TABS.includes(CUR.v)?CUR.v:(CUR.tab||''))));
  $('#chips').innerHTML='<span class="chip" title="Ratxa">🔥 '+streakNow()+'</span><span class="chip" title="XP">⭐ '+S.xp+'</span>';
  A.innerHTML=f(CUR.a);window.scrollTo(0,0);if(f.post)f.post(CUR.a)}
const V={};
const pct=(a,b)=>b?Math.round(a/b*100):0;
const doneCount=lv=>Object.keys(S.done).filter(k=>k[1]===lv[1]).length;
const nextLesson=()=>LESSONS.find(l=>!S.done[l.id]);
function ring(p){const r=34,c=2*Math.PI*r;return'<svg class="ring" viewBox="0 0 80 80" role="img" aria-label="Objectiu diari"><circle class="bg" cx="40" cy="40" r="'+r+'"/><circle class="fg" cx="40" cy="40" r="'+r+'" stroke-dasharray="'+c+'" stroke-dashoffset="'+(c*(1-Math.min(1,p)))+'" transform="rotate(-90 40 40)"/><text x="40" y="47" text-anchor="middle">'+Math.round(Math.min(1,p)*100)+'%</text></svg>'}
function wotd(){const d=Math.floor(Date.now()/864e5);return WORDS[d%WORDS.length]}
V.home=()=>{const nl=nextLesson();const w=wotd();const wk=Object.keys(S.weak).length;
  let h=(!CAV&&S.set.voice&&!S.seen.voice?'<div class="card ch"><b>🔊 Veu catalana</b><p class="muted" style="margin:6px 0">No hem detectat cap veu catalana al dispositiu. Instal·la-la perquè el català soni bé (instruccions a Jo → Ajustos).</p><button class="btn sm sec" data-a="voicehide">Entesos</button></div>':'')+'<h1>Bon dia!</h1><p class="muted">Curs de català A1 + A2</p>';
  h+='<div class="card goal">'+ring(dayXP()/S.goal)+'<div class="grow"><b style="font:400 24px var(--f-d)">Objectiu d\'avui</b><div class="muted">'+dayXP()+' / '+S.goal+' XP · ratxa '+streakNow()+' '+(streakNow()===1?'dia':'dies')+'</div></div></div>';
  if(nl)h+='<button class="lrow" data-a="lesson" data-v="'+nl.id+'" style="border-color:var(--yel)"><span class="ic">'+nl.ic+'</span><span class="grow"><small>Continua · '+nl.lv.toUpperCase()+' lliçó '+nl.n+'</small><b>'+esc(nl.ca)+'</b><small>'+esc(nl.es)+'</small></span><span>▶</span></button>';
  else h+='<div class="card">🎉 Has completat tot el curs. Segueix repassant!</div>';
  h+='<div class="card"><div class="row"><div class="grow"><small class="muted">Paraula del dia</small><div style="font:400 28px var(--f-d);color:var(--yel)">'+w.em+' '+esc(w.ca)+'</div><div class="muted">'+esc(w.es)+'</div></div>'+spk(w.ca)+'</div></div>';
  h+='<div class="tiles"><button class="tile" data-a="daily"><span class="ic">📅</span><span class="t">Repte quotidià</span><span class="s">'+(S.seen['dc'+today()]?'Fet avui ✓':'10 preguntes · +30 XP')+'</span></button><button class="tile" data-a="weak"><span class="ic">🔁</span><span class="t">Paraules fluixes</span><span class="s">'+wk+' per repassar</span></button></div>';
  h+='<h2>El teu progrés</h2><div class="card"><div class="row"><b class="grow">A1</b><span class="muted">'+doneCount('a1')+' / 26</span></div><div class="bar"><i style="width:'+pct(doneCount('a1'),26)+'%"></i></div><div class="row" style="margin-top:12px"><b class="grow">A2</b><span class="muted">'+doneCount('a2')+' / 24</span></div><div class="bar"><i style="width:'+pct(doneCount('a2'),24)+'%"></i></div></div>';
  const nb=Object.keys(S.badges).length;h+='<div class="muted">Insígnies: '+nb+' / '+BADGES.length+'</div>';return h};
V.lessons=()=>{const lv=CUR.a||'a1';
  let h='<h1>Lliçons</h1><div class="pills"><button class="pill '+(lv==='a1'?'on':'')+'" data-a="lv" data-v="a1">A1 · '+doneCount('a1')+'/26</button><button class="pill '+(lv==='a2'?'on':'')+'" data-a="lv" data-v="a2">A2 · '+doneCount('a2')+'/24</button></div>';
  h+=LESSONS.filter(l=>l.lv===lv).map(l=>{const d=S.done[l.id];return'<button class="lrow'+(d?' done':'')+'" data-a="lesson" data-v="'+l.id+'"><span class="n">'+l.n+'</span><span class="ic">'+l.ic+'</span><span class="grow"><b>'+esc(l.ca)+'</b><small>'+esc(l.es)+' · '+l.min+' min</small></span>'+(d?'<span class="ck">✓ '+d.best+'%</span>':'')+'</button>'}).join('');return h};
/* ----- lección ----- */
let LP={id:'',p:0};
V.lesson=id=>{const l=LSM[id];if(LP.id!==id)LP={id,p:0};const n=l.steps.length;const p=LP.p;let h='<div class="muted">'+l.lv.toUpperCase()+' · lliçó '+l.n+'</div><h1>'+l.ic+' '+esc(l.ca)+'</h1><div class="muted">'+esc(l.es)+'</div><div class="bar"><i style="width:'+Math.round(p/(n+2)*100)+'%"></i></div>';
  if(p===0){h+='<h2>Què aprendràs</h2><div class="card"><ul style="margin:0;padding-left:20px">'+l.goals.map(g=>'<li>'+esc(g)+'</li>').join('')+'</ul></div><p class="muted">'+n+' passos · '+l.qs.length+' preguntes · ~'+l.min+' min</p>'}
  else if(p<=n){const s=l.steps[p-1];h+='<h2>'+p+'. '+esc(s.t)+'</h2><div class="card">'+s.h+(s.tb?'<div class="tw">'+s.tb+'</div>':'')+(s.ex.length?'<div>'+s.ex.map(e=>'<div class="ex">'+spk(e[0])+'<div><b>'+esc(e[0])+'</b><div class="muted'+(blr(l)?' blur" data-a="unblur" role="button" title="Toca para ver la traducción':'')+'">'+esc(e[1])+'</div></div></div>').join('')+'</div>':'')+(s.tip?'<div class="tip">💡 '+s.tip+'</div>':'')+'</div>'}
  else if(p===n+1){h+='<h2>Paraules clau</h2><div class="card">'+l.kw.map(k=>'<div class="hit">'+spk(k[0])+'<b>'+esc(k[0])+'</b><span class="es'+(blr(l)?' blur" data-a="unblur" role="button':'')+'">'+esc(k[1])+'</span></div>').join('')+'</div>'+(l.th.length?'<div class="row">'+l.th.map(t=>'<button class="btn sec sm" data-a="theme" data-v="'+t+'">'+THM[t].ic+' '+esc(THM[t].ca)+'</button>').join('')+'</div>':'')}
  else{const d=S.done[id];h+='<h2>Practica</h2><div class="card" style="text-align:center"><div class="big">'+(d?'✅':'✏️')+'</div><p>'+l.qs.length+' preguntes sobre aquesta lliçó.'+(d?'<br>Millor resultat: <b>'+d.best+'%</b>':'')+'</p><button class="btn block" data-a="lpractice">'+(d?'Torna-ho a provar':'Comença')+'</button></div>'+(d?(nextOf(id)?'<button class="btn sec block" data-a="lesson" data-v="'+nextOf(id).id+'">Següent lliçó ▶</button>':''):'')}
  h+='<div class="row" style="margin-top:16px"><button class="btn sec grow" data-a="lprev"'+(p===0?' disabled':'')+'>◀ Enrere</button>'+(p<n+2?'<button class="btn grow" data-a="lnext">'+(p===n+1?'Practica ▶':'Següent ▶')+'</button>':'')+'</div>';return h};
const nextOf=id=>{const i=LESSONS.findIndex(l=>l.id===id);return LESSONS[i+1]};
ACT.lesson=id=>{go('lesson',id,CUR.v!=='lesson');};
ACT.lnext=()=>{LP.p++;showCur()};ACT.lprev=()=>{if(LP.p>0)LP.p--;showCur()};
ACT.lpractice=()=>{const l=LSM[LP.id];const qs=shuf(l.qs.map((q,i)=>i)).map(i=>lq(l.id,i));
  startSession(qs,{per:10,bonus:20,onDone:r=>{const sc=Math.round(r.acc*100);
    if(r.acc>=.6){const o=S.done[l.id];S.done[l.id]={best:Math.max(o?o.best:0,sc),date:today()};if(sc===100)S.stat.perfect++;addXP(0);toast('Lliçó completada ✓')}else toast('Repassa la lliçó i torna-ho a provar');r.html=lessonRecap(l);save();checkBadges()}})};
function lessonRecap(l){const g=(l.goals||[]).map(x=>'<li>'+esc(x)+'</li>').join('');const kw=(l.kw||[]).slice(0,8).map(k=>Array.isArray(k)?k.join(' = '):String(k)).map(esc);return '<div class="card" style="text-align:left;margin-top:14px"><b>📌 Resum de la lliçó</b>'+(g?'<ul>'+g+'</ul>':'')+(kw.length?'<p class="muted">'+kw.join(' · ')+'</p>':'')+'</div>'}
ACT.lv=v=>{CUR.a=v;showCur()};
ACT.done=()=>showCur();ACT.up=()=>up();
ACT.tab=v=>go(v);
/* ----- práctica ----- */
V.practice=()=>{const wk=Object.keys(S.weak).length;
  const T=(a,ic,t,s)=>'<button class="tile" data-a="'+a+'"><span class="ic">'+ic+'</span><span class="t">'+t+'</span><span class="s">'+s+'</span></button>';
  return'<h1>Pràctica</h1><p class="muted">Tria com vols entrenar.</p><div class="tiles">'+
  T('weak','🔁','Paraules fluixes',wk+' per repassar')+T('daily','📅','Repte quotidià','10 preguntes')+T('themes','🗂️','Vocabulari','54 temes')+T('sentq','🧩','Constructor de frases','Ordena paraules')+
  T('vquiz','🔧','Quiz de verbs','Conjugació')+T('numq','🔢','Números','Dictat i escriptura')+T('spellq','🔤','Lletrejar','Escolta les lletres')+T('listenq','🎧','Escolta i tria','Comprensió oral')+
  T('genq','✨','Frases noves','Generador de frases')+T('meq','👤','Sobre mi',S.me?'Frases amb les teves dades':'Explica\'ns de tu')+T('games','🎮','Jocs','4 jocs')+T('tests','🧪','Test de nivell','A1 i A2')+T('self','✅','Autoavaluació','Què sé fer?')+'</div>'};
ACT.weak=()=>{const ks=shuf(Object.keys(S.weak)).slice(0,15);const qs=ks.map(keyToQ).filter(Boolean);
  if(!qs.length){toast('No tens res per repassar. Bona feina!');return}startSession(qs,{per:8,bonus:10})};
ACT.daily=()=>{const first=!S.seen['dc'+today()];startSession(mixQ(10),{per:8,bonus:first?30:10,onDone:r=>{if(r.acc>=.6){S.seen['dc'+today()]=1;save()}}})};
ACT.sentq=()=>startSession(Array.from({length:10},()=>sentQ(rnd(3)?null:'a1')),{per:8});
ACT.numq=()=>startSession(Array.from({length:10},()=>numQ(rnd(3)?100:1000)),{per:8});
ACT.spellq=()=>startSession(Array.from({length:8},spellQ),{per:10});
ACT.listenq=()=>startSession(pickWords(seenPool(),10).map(w=>vq(w,'l')),{per:6});
ACT.themes=()=>go('themes',null,true);ACT.games=()=>go('games',null,true);ACT.tests=()=>go('tests',null,true);ACT.self=()=>go('self',null,true);ACT.vquiz=()=>go('vquiz',null,true);
V.themes=()=>{const lv=CUR.a||'a1';const ts=VOCAB.filter(t=>t.lv===lv);
  const open=ts.filter(t=>themeOpen(t.id));const all=[].concat(...open.map(themeWords));const avg=all.length?Math.round(all.reduce((a,w)=>a+mast(w.ca),0)/(all.length*4)*100):0;
  return'<h1>Vocabulari</h1><p class="muted">Vocabulario por temas. Cuanto menos domines una palabra, más veces aparece.</p><div class="pills"><button class="pill '+(lv==='a1'?'on':'')+'" data-a="tlv" data-v="a1">A1</button><button class="pill '+(lv==='a2'?'on':'')+'" data-a="tlv" data-v="a2">A2</button></div>'+
  '<div class="stack" style="margin-top:12px"><input class="fld" id="tsr" type="search" placeholder="🔍 Cerca en català o castellà" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Cerca"><div class="card" id="tsres" hidden></div>'+
  '<div class="card"><div class="setrow"><span class="ic">📊</span><div class="grow"><b>Domini del nivell '+lv.toUpperCase()+'</b><small class="muted" style="display:block">'+open.length+' de '+ts.length+' temes oberts</small></div><span class="chip">'+avg+'%</span></div><div class="bar"><i style="width:'+avg+'%"></i></div></div>'+
  '<button class="btn sec block" data-a="opdic">📖 Diccionari de consulta ('+DIC.length+' paraules)</button><button class="btn block" data-a="mixv">Barreja-ho tot · 10 preguntes</button>'+
  ts.map(t=>{if(!themeOpen(t.id))return'<button class="lrow jg-lock" data-a="glocked" data-need="Acaba la lliçó on es treballa aquest tema" data-v="'+t.id+'"><span class="ic">🔒</span><span class="grow"><b>'+esc(t.ca)+'</b><small>'+esc(t.es)+' · '+t.w.length+' paraules</small></span></button>';
  const p=setPct(t);const n=themeWords(t).length;return'<div class="card"><div class="setrow"><span class="ic">'+t.ic+'</span><div class="grow"><b>'+esc(t.ca)+'</b><div class="muted">'+esc(t.es)+' · '+n+' paraules</div></div><span class="chip">'+p+'%</span></div><div class="bar"><i style="width:'+p+'%"></i></div>'+
  '<div class="words">'+t.w.slice(0,6).map(w=>'<span class="w">'+esc(w[0])+'</span>').join('')+(t.w.length>6?'<span class="w">…</span>':'')+'</div>'+
  '<div class="row" style="margin-top:12px"><button class="btn small" data-a="tquiz" data-v="'+t.id+'">Qüestionari</button><button class="btn sec small" data-a="tflash" data-v="'+t.id+'">Targetes</button><button class="btn sec small" data-a="theme" data-v="'+t.id+'">Llista</button></div></div>'}).join('')+'</div>'};
function tRes(){const q=norm(($('#tsr')||{value:''}).value);const R=$('#tsres');if(!R)return;if(!q){R.hidden=true;R.innerHTML='';return}
  const sc=e=>e.n2===q||e.n1===q||e.n3===q?0:(e.n2.startsWith(q)||e.n1.startsWith(q)||e.n3.startsWith(q))?1:(e.n1.includes(q)||e.n3.includes(q))?2:9;
  const r=DIC.map(e=>[sc(e),e]).filter(x=>x[0]<9).sort((a,b)=>a[0]-b[0]||a[1].ca.length-b[1].ca.length).slice(0,12).map(x=>x[1]);
  R.hidden=false;R.innerHTML=r.length?r.map(dRow).join(''):'<div class="muted">Cap resultat.</div>'}
document.addEventListener('input',e=>{if(e.target.id==='tsr')tRes()});
ACT.opdic=()=>{DT.tab='dic';go('dict')};
ACT.mixv=()=>{const lv=CUR.a||'a1';const ws=pickWords(seenPool().filter(w=>w.lv===lv),10);if(!ws.length){toast('Acaba alguna lliçó per obrir vocabulari');return}startSession(ws.map(w=>vq(w)),{per:8})};
ACT.tlv=v=>{CUR.a=v;showCur()};
ACT.theme=id=>go('theme',id,true);
V.theme=id=>{const t=THM[id];return'<h1>'+t.ic+' '+esc(t.ca)+'</h1><div class="muted">'+esc(t.es)+' · '+t.w.length+' paraules</div><div class="row" style="margin:12px 0"><button class="btn" data-a="tflash" data-v="'+id+'">🗂️ Targetes</button><button class="btn sec" data-a="tquiz" data-v="'+id+'">❓ Qüestionari</button></div><div class="card">'+t.w.map(w=>'<div class="hit">'+spk(w[0])+'<span style="font-size:22px">'+(w[2]||'')+'</span><b>'+esc(w[0])+'</b><span class="es">'+esc(w[1])+'</span></div>').join('')+'</div>'};
ACT.tflash=id=>{const ws=pickWords(themeWords(THM[id]),20).map(w=>({k:'flash',kind:'Targetes',ca:w.ca,es:w.es,em:w.em,key:'w:'+w.ca}));startSession(ws,{per:3,bonus:10})};
ACT.tquiz=id=>{const ws=pickWords(themeWords(THM[id]),10);startSession(ws.map(w=>vq(w)),{per:8})};
/* ----- diccionario y verbos ----- */
let DT={tab:'dic',vf:'all'};
V.dict=()=>{let h='<h1>Diccionari</h1><div class="pills"><button class="pill '+(DT.tab==='dic'?'on':'')+'" data-a="dtab" data-v="dic">📖 Paraules ('+DIC.length+')</button><button class="pill '+(DT.tab==='verbs'?'on':'')+'" data-a="dtab" data-v="verbs">🔧 Verbs ('+VLIST.length+')</button></div>';
  if(DT.tab==='dic')h+='<input class="fld" id="dq" type="search" placeholder="Cerca en català o castellà…" autocomplete="off" aria-label="Cerca"><div class="card" id="dres" style="margin-top:12px"></div>';
  else h+='<input class="fld" id="vq" type="search" placeholder="Cerca un verb…" autocomplete="off" aria-label="Cerca verb"><div class="pills" style="margin-top:10px">'+[['all','Tots'],['ar','-ar'],['inc','Incoatius'],['ir','-ir / -re'],['x','Irregulars'],['pn','Pronominals']].map(f=>'<button class="pill '+(DT.vf===f[0]?'on':'')+'" data-a="vf" data-v="'+f[0]+'">'+f[1]+'</button>').join('')+'</div><div class="card" id="vres"></div>';return h};
V.dict.post=()=>{if(DT.tab==='dic')dictRes();else verbRes()};
function dictRes(){const q=norm(($('#dq')||{value:''}).value);const R=$('#dres');if(!R)return;
  if(!q){R.innerHTML='<div class="muted">Escriu per cercar entre '+DIC.length+' entrades. Prova «casa», «cuina» o «tren».</div>'+pick(DIC,8).map(dRow).join('');return}
  const sc=e=>e.n2===q||e.n1===q||e.n3===q?0:(e.n2.startsWith(q)||e.n1.startsWith(q)||e.n3.startsWith(q))?1:(e.n1.includes(q)||e.n3.includes(q))?2:9;
  const r=DIC.map(e=>[sc(e),e]).filter(x=>x[0]<9).sort((a,b)=>a[0]-b[0]||a[1].ca.length-b[1].ca.length).slice(0,60).map(x=>x[1]);
  R.innerHTML=r.length?r.map(dRow).join(''):'<div class="muted">Cap resultat.</div>'}
const dRow=e=>'<div class="hit">'+spk(e.ca)+'<span style="font-size:20px">'+(e.em||'')+'</span><b'+(e.kind==='v'?' data-a="verb" data-v="'+esc(e.ca)+'" style="cursor:pointer;color:var(--yel)"':'')+'>'+esc(e.ca)+'</b><span class="es">'+esc(e.es)+'</span></div>';
function verbRes(){const q=norm(($('#vq')||{value:''}).value);const R=$('#vres');if(!R)return;
  const f=DT.vf;const ok=v=>f==='all'||(f==='pn'?v.pn:f==='ar'?v.kind==='ar':f==='inc'?v.kind==='inc':f==='x'?v.kind==='x':(v.kind==='ir'||v.kind==='re'));
  const l=VLIST.filter(i=>ok(VERBS[i])&&(!q||norm(i).includes(q)||norm(VERBS[i].es).includes(q)));
  R.innerHTML=l.length?l.map(i=>'<button class="hit" style="width:100%;background:none;border:0;border-bottom:1px dashed var(--line);text-align:left;color:inherit" data-a="verb" data-v="'+esc(i)+'"><b>'+esc(i)+'</b><span class="es">'+esc(VERBS[i].es)+'</span></button>').join(''):'<div class="muted">Cap verb.</div>'}
ACT.dtab=v=>{DT.tab=v;showCur()};ACT.vf=v=>{DT.vf=v;showCur()};
document.addEventListener('input',e=>{if(e.target.id==='dq')dictRes();if(e.target.id==='vq')verbRes()});
let VT={t:'pres'};
V.verb=inf=>{const v=VERBS[inf];if(!v.T[VT.t])VT.t='pres';const t=VT.t;const nm=VT_NAMES[t];const rows=v.T[t];const P=t==='imper'?IMPER_P:PRON,PE=t==='imper'?IMPER_ES:PRON_ES;
  let h='<h1>'+esc(inf)+' '+spk(inf)+'</h1><div class="muted">'+esc(v.es)+(v.pn?' · pronominal':'')+' · participi: <b>'+esc(v.pp)+'</b></div>';
  h+='<div class="pills">'+TENSES.filter(x=>v.T[x]).map(x=>'<button class="pill '+(x===t?'on':'')+'" data-a="vt" data-v="'+x+'">'+VT_NAMES[x][0]+'</button>').join('')+'</div>';
  h+='<div class="card"><b>'+nm[1]+'</b><div class="muted">'+nm[2]+'</div></div><div class="card tw"><table class="conj"><tbody>'+rows.map((f,i)=>f?'<tr><th scope="row">'+P[i]+'<br><small>'+PE[i]+'</small></th><td>'+esc(f)+'</td><td>'+spk(f)+'</td></tr>':'').join('')+'</tbody></table></div>';
  h+='<button class="btn block" data-a="vpractice" data-v="'+esc(inf)+'">🧠 Practica «'+esc(inf)+'»</button>';return h};
ACT.verb=inf=>go('verb',inf,CUR.v!=='verb');ACT.vt=t=>{VT.t=t;showCur()};
ACT.vpractice=inf=>{const qs=[];for(let i=0;i<12;i++)qs.push(verbQ(inf,VT.t==='imper'&&rnd(2)?null:(rnd(2)?VT.t:null)));startSession(qs.filter(Boolean),{per:8})};
let VQ={sel:'all'};
V.vquiz=()=>'<h1>Quiz de verbs</h1><p class="muted">Completa la forma verbal correcta. Tria el temps.</p><div class="pills"><button class="pill '+(VQ.sel==='all'?'on':'')+'" data-a="vqs" data-v="all">Tots</button>'+TENSES.map(t=>'<button class="pill '+(VQ.sel===t?'on':'')+'" data-a="vqs" data-v="'+t+'">'+VT_NAMES[t][0]+'</button>').join('')+'</div><button class="btn block" data-a="vqgo">Comença (12 preguntes)</button>';
ACT.vqs=v=>{VQ.sel=v;showCur()};
ACT.vqgo=()=>{const qs=[];while(qs.length<12){const q=verbQ(vpool()[rnd(vpool().length)],VQ.sel==='all'?null:VQ.sel);if(q)qs.push(q)}startSession(qs,{per:8})};
ACT.voicehide=()=>{S.seen.voice=1;save();showCur()};


/* ===== JUEGOS (estilo sala de juegos: Contrarellotge, Parelles, Pluja de verbs) ===== */
const JG={t:null,r:null,live:false,stop(){if(this.t){clearInterval(this.t);this.t=null}if(this.r){cancelAnimationFrame(this.r);this.r=null}this.live=false}};
const one=a=>a[rnd(a.length)];
const stripA=s=>String(s).replace(/^(el|la|l'|els|les|un|una) ?/i,'');
const GT=['pres','perf','perif','imp','fut','cond','subj'];
const dn=id=>!!(S.set.tkey||S.done[id]);
const lname=id=>{const l=LSM[id];return l?'lliçó '+l.n+' ('+l.lv.toUpperCase()+') «'+l.ca+'»':id};
const TREQ={num2:'a110',paisos:'a12',mobles:'a15',fruita:'a110',begudes:'a110',botigues:'a110',temps:'a111',salut2:'a116',roba:'a119',escola:'a120',transport:'a118',animals:'a124',natura:'a124',petites:'a114',adj3:'a119',telefon:'a125',allotjament:'a220',mitjans:'a222',oci:'a222',estudis:'a223',tecnologia:'a222',banc:'a221',habitatge:'a221',caracter:'a212',cuina:'a217',compres2:'a213'};
const THREF={};LESSONS.forEach(l=>l.th.forEach(t=>{(THREF[t]=THREF[t]||[]).push(l.id)}));
const themeReq=id=>THREF[id]||[TREQ[id]].filter(Boolean);
const MIN_DOM=60;
const themeOpen=id=>{const r=themeReq(id);return !r.length||r.some(dn)};
const TNEED={pres:'a17',perf:'a121',perif:'a21',imp:'a23',fut:'a25',cond:'a214',subj:'a215'};
const unlockedT=()=>GT.filter(t=>dn(TNEED[t]));
const IRR={ser:'a12',tenir:'a12',estar:'a15',anar:'a19',fer:'a19',poder:'a19',voler:'a19',caldre:'a115'};
const verbNeed=inf=>{const v=VERBS[inf];if(v.kind==='x')return IRR[inf]||'a121';if(v.pn)return 'a112';return v.kind==='ar'?'a17':'a18'};
const VPOOL=()=>VLIST.filter(i=>dn(verbNeed(i)));
const seenWords=()=>{const ids=VOCAB.filter(t=>themeOpen(t.id)&&(THREF[t.id]?THREF[t.id].some(dn):dn(themeReq(t.id)[0]))).map(t=>t.id);return WORDS.filter(w=>ids.includes(w.th))};
const gOpen={k:()=>dn('a17'),kw:()=>seenWords().length>=12&&openSets().length>0,mem:()=>openSets().length>0,ae:()=>dn('a17')};
const gNeed={k:'Acaba la '+lname('a17'),kw:'Acaba alguna lliçó amb vocabulari i domina el '+MIN_DOM+' % d\'un tema (Vocabulari)',mem:'Domina el '+MIN_DOM+' % d\'un tema a Vocabulari (Qüestionari i Targetes)',ae:'Acaba la '+lname('a17')};
let GS={kt:null,at:null,kwl:'',ml:'a1'};
function gbestSave(key,score,xp){S.stat.games++;const nb=score>0&&(S.best[key]==null||score>S.best[key]);if(nb)S.best[key]=score;addXP(xp);return nb}
function jgResult(title,score,unit,key,xp,again,extra){JG.stop();const nb=gbestSave(key,score,xp);
  $('#app').innerHTML='<div class="result" style="text-align:center;padding-top:24px"><div class="big">'+(nb?'🏆':'🎉')+'</div><h1>'+esc(title)+'</h1><div style="font:400 72px/1 var(--f-d);color:var(--yel)">'+score+'</div><p class="muted">'+unit+'</p><p style="color:var(--yel)">'+(nb?'Nou rècord!':'Millor: '+(S.best[key]||0))+' · +'+xp+' XP</p>'+(extra||'')+'<div style="margin-top:18px;display:grid;gap:10px"><button class="btn block" data-a="'+again+'">Una altra</button><button class="btn sec block" data-a="up">Jocs</button></div></div>';window.scrollTo(0,0)}
const jgHead=(t,chip)=>'<div class="jg-top"><button class="btn sec sm" data-a="gback" aria-label="Enrere">←</button><span class="jg-title">'+t+'</span><span class="jg-chip" id="jchip">'+(chip||'')+'</span></div>';
ACT.gback=()=>{JG.stop();showCur()};
const gcard=(a,ic,n,d,best,v,open,need)=>{open=open!==false;return'<button class="card jg-game'+(open?'':' jg-lock')+'" data-a="'+(open?a:'glocked')+'" data-need="'+esc(need||'')+'"'+(v!=null?' data-v="'+v+'"':'')+'><span class="ic">'+(open?ic:'🔒')+'</span><span><b>'+n+'</b><small>'+d+'</small>'+(open?(best!=null?'<small>🏆 Millor: '+best+'</small>':''):'<span class="jg-need">'+esc(need)+'</span>')+'</span></button>'};
ACT.glocked=(v,el)=>toast('🔒 '+(el.dataset.need||''));
V.games=()=>'<h1>Jocs</h1><p class="muted">Practica jugant. Cada joc s\'obre en avançar a les lliçons, perquè només hi surt matèria que ja coneixes. Guanyes XP en acabar cada partida.</p>'+
  gcard('g_k','⏱️','Contrarellotge de verbs','60 segons: quantes conjugacions encertes?',S.best.k,null,gOpen.k(),gNeed.k)+
  gcard('g_kw','🔤','Contrarellotge de paraules','60 segons: tria el significat de cada paraula.',S.best.kw,null,gOpen.kw(),gNeed.kw)+
  gcard('g_mem','🃏','Parelles','Memòria per temes. Contrarellotge o sense temps.',null,null,gOpen.mem(),gNeed.mem)+
  gcard('g_ae','🪂','Pluja de verbs','Formes que cauen: toca només les que et demanen.',S.best.ae,null,gOpen.ae(),gNeed.ae);
['g_k','g_kw','g_mem','g_ae'].forEach(n=>ACT[n]=()=>{if(!gOpen[n.slice(2)]()){toast('🔒 '+gNeed[n.slice(2)]);return}go(n,null,true)});
const tPills=(sel,a)=>'<div class="pills">'+GT.map(t=>{const op=dn(TNEED[t]);return'<button class="pill '+(sel.includes(t)?'on':'')+'" data-a="'+(op?a:'glocked')+'" data-need="Acaba la '+esc(lname(TNEED[t]))+'" data-v="'+t+'">'+(op?'':'🔒 ')+VT_NAMES[t][0]+'</button>'}).join('')+'</div>';
/* ---- 1 · Contrarellotge de verbs ---- */
V.g_k=()=>{const u=unlockedT();GS.kt=(GS.kt||u).filter(x=>u.includes(x));if(!GS.kt.length)GS.kt=u.slice();return'<h1>⏱️ Contrarellotge de verbs</h1><p>60 segons. Tria la forma correcta. Cada 5 encerts seguits guanyes +3 s.</p><b>Temps en joc</b>'+tPills(GS.kt,'gkt')+'<p class="muted">Només hi surten els temps i els verbs que ja has treballat. Els altres s\'obren amb les lliçons.</p><button class="btn block" data-a="gkgo">Comença</button>'};
ACT.gkt=v=>{GS.kt=GS.kt.includes(v)?(GS.kt.length>1?GS.kt.filter(x=>x!==v):GS.kt):GS.kt.concat(v);showCur()};
function convQ(inf,t){const v=VERBS[inf];const n=t==='imper'?5:6;const p=rnd(n);const ans=v.T[t]&&v.T[t][p];if(!ans)return null;
  const same=[...new Set(v.T[t].filter(f=>f&&f!==ans))];const rest=[...new Set(GT.flatMap(x=>v.T[x]||[]).filter(f=>f&&f!==ans&&!same.includes(f)))];
  const opts=[...new Set(shuf(same).concat(shuf(rest)))].slice(0,3);if(opts.length<3)return null;
  return{p:(t==='imper'?'('+IMPER_P[p]+')':PRON_S[p])+' ___',hint:inf+' · '+VT_NAMES[t][0]+' · '+(t==='imper'?IMPER_ES[p]:PRON_ES[p]),ans,opts:shuf([ans].concat(opts)),key:'v:'+inf+'.'+t+'.'+p}}
ACT.gkgo=()=>{JG.stop();const ts=GS.kt||['pres'];let t=60,sc=0,ok=0,fail=0,st=0,bs=0,q=null,lock=false;const seen=new Set();
  const vp=VPOOL();const nq=()=>{for(let n=0;n<80;n++){const x=convQ(one(vp),one(ts));if(x&&!seen.has(x.key)){seen.add(x.key);return x}}seen.clear();return convQ(one(vp),'pres')||convQ('parlar','pres')};
  const draw=()=>{$('#jq').textContent=q.p;$('#jh').textContent=q.hint;$('#jst').textContent=st>=3?'🔥 '+st:'';
    $('#jo').innerHTML=q.opts.map(o=>'<button class="jg-opt" data-o="'+esc(o)+'">'+esc(o)+'</button>').join('');
    $('#jo').querySelectorAll('.jg-opt').forEach(b=>b.onclick=()=>{if(lock)return;lock=true;const good=b.dataset.o===q.ans;
      if(good){ok++;st++;bs=Math.max(bs,st);sc+=10+Math.min(st,10)*2;b.classList.add('ok');if(st%5===0)t=Math.min(75,t+3);if(S.weak[q.key])delete S.weak[q.key];S.stat.verb++}
      else{fail++;st=0;b.classList.add('no');[...$('#jo').children].forEach(x=>{if(x.dataset.o===q.ans)x.classList.add('ok')});S.weak[q.key]=(S.weak[q.key]||0)+1}
      S.stat.tot++;if(good)S.stat.ok++;$('#jchip').textContent='⭐ '+sc;setTimeout(()=>{if(JG.live){q=nq();lock=false;draw()}},good?220:700)})};
  $('#app').innerHTML=jgHead('Contrarellotge','⭐ 0')+'<div class="timer"><i id="jtb" style="width:100%"></i></div><div class="jg-hint" id="jh"></div><div class="jg-q" id="jq"></div><div class="jg-streak" id="jst"></div><div class="jg-opts" id="jo"></div><p class="muted" style="text-align:center;margin-top:12px">⏱ <b id="jtt">60</b> s</p>';
  JG.live=true;q=nq();draw();
  JG.t=setInterval(()=>{t--;const e=$('#jtt');if(!e){JG.stop();return}e.textContent=Math.max(t,0);$('#jtb').style.width=Math.max(0,t/60*100)+'%';
    if(t<=0)jgResult('Contrarellotge',sc,ok+' encerts · '+fail+' errors · millor ratxa '+bs,'k',Math.min(40,Math.round(sc/8)+3),'gkgo')},1000)};
/* ---- 2 · Contrarellotge de paraules ---- */
V.g_kw=()=>'<h1>🔤 Contrarellotge de paraules</h1><p>60 segons. Tria el significat de cada paraula catalana. Només hi surten paraules dels temes que ja has treballat ('+seenWords().length+' paraules).</p><button class="btn block" data-a="gkwgo">Comença</button>';
ACT.gkwl=v=>{GS.kwl=v;showCur()};
ACT.gkwgo=()=>{JG.stop();const p=seenWords();let t=60,sc=0,ok=0,fail=0,st=0,bs=0,w=null,lock=false;
  const nq=()=>{w=p[rnd(p.length)];lock=false;draw()};
  const draw=()=>{const ops=shuf([w.es].concat(distract(w,3,'es')));$('#jh').textContent='Què vol dir?';$('#jq').innerHTML=(w.em?w.em+' ':'')+esc(w.ca);$('#jst').textContent=st>=3?'🔥 '+st:'';
    $('#jo').innerHTML=ops.map(o=>'<button class="jg-opt" data-o="'+esc(o)+'">'+esc(o)+'</button>').join('');
    $('#jo').querySelectorAll('.jg-opt').forEach(b=>b.onclick=()=>{if(lock)return;lock=true;const good=b.dataset.o===w.es;
      if(good){ok++;st++;bs=Math.max(bs,st);sc+=10+Math.min(st,10)*2;b.classList.add('ok');if(st%5===0)t=Math.min(75,t+3);say(w.ca)}
      else{fail++;st=0;b.classList.add('no');[...$('#jo').children].forEach(x=>{if(x.dataset.o===w.es)x.classList.add('ok')});S.weak['w:'+w.ca]=(S.weak['w:'+w.ca]||0)+1}
      S.stat.tot++;if(good)S.stat.ok++;$('#jchip').textContent='⭐ '+sc;setTimeout(()=>{if(JG.live)nq()},good?220:700)})};
  $('#app').innerHTML=jgHead('Paraules','⭐ 0')+'<div class="timer"><i id="jtb" style="width:100%"></i></div><div class="jg-hint" id="jh"></div><div class="jg-q" id="jq"></div><div class="jg-streak" id="jst"></div><div class="jg-opts" id="jo"></div><p class="muted" style="text-align:center;margin-top:12px">⏱ <b id="jtt">60</b> s</p>';
  JG.live=true;nq();
  JG.t=setInterval(()=>{t--;const e=$('#jtt');if(!e){JG.stop();return}e.textContent=Math.max(t,0);$('#jtb').style.width=Math.max(0,t/60*100)+'%';
    if(t<=0)jgResult('Paraules',sc,ok+' encerts · '+fail+' errors · millor ratxa '+bs,'kw',Math.min(40,Math.round(sc/8)+3),'gkwgo')},1000)};
/* ---- 3 · Parelles ---- */
const memSets=lv=>VOCAB.filter(t=>t.lv===lv&&t.w.length>=6);
const lessonSets=()=>VOCAB.filter(t=>t.w.length>=6&&themeOpen(t.id)&&(THREF[t.id]?THREF[t.id].some(dn):dn(themeReq(t.id)[0])));
const openSets=()=>lessonSets().filter(t=>S.set.tkey||setPct(t)>=MIN_DOM);
V.g_mem=()=>{const lv=GS.ml,op=openSets().filter(t=>t.lv===lv),all=openSets();return'<h1>🃏 Parelles</h1><p class="muted">Tria un tema. Cada tema s\'obre en acabar la lliçó on el treballes i en dominar-ne el '+MIN_DOM+' % a Vocabulari.</p><div class="pills"><button class="pill '+(lv==='a1'?'on':'')+'" data-a="gml" data-v="a1">A1</button><button class="pill '+(lv==='a2'?'on':'')+'" data-a="gml" data-v="a2">A2</button></div>'+
  '<button class="card jg-game'+(all.length?'':' jg-lock')+'" data-a="'+(all.length?'gmset':'glocked')+'" data-v="__all" data-need="Domina el '+MIN_DOM+' % d\'almenys un tema"><span class="ic">'+(all.length?'🌍':'🔒')+'</span><span><b>General</b><small>'+(all.length?'Barreja dels teus '+all.length+' temes dominats':'Domina un tema primer')+'</small></span></button><div class="jg-grid2">'+memSets(lv).map(t=>{const o=openSets().includes(t);const r=themeReq(t.id)[0];const p=setPct(t);const les=lessonSets().includes(t);const need=les?'Domina el '+MIN_DOM+' % d\'aquest tema ('+p+' % ara)':'Acaba la '+lname(r);return'<button class="card jg-game'+(o?'':' jg-lock')+'" data-a="'+(o?'gmset':'glocked')+'" data-v="'+t.id+'" data-need="'+esc(need)+'" style="padding:10px 12px;margin:0"><span class="ic" style="font-size:26px">'+(o?t.ic:'🔒')+'</span><span><b style="font-size:17px">'+esc(t.ca)+'</b><small>'+t.w.length+' paraules · '+p+' %</small><span class="bar"><i style="width:'+p+'%"></i></span></span></button>'}).join('')+'</div>'};
ACT.gml=v=>{GS.ml=v;showCur()};
ACT.gmset=id=>{const w=id==='__all'?openSets().flatMap(t=>t.w):THM[id].w;GS.mem={id,ca:id==='__all'?'General':THM[id].ca,words:w.map(x=>({ca:x[0],es:x[1],em:x[2]||''}))};go('g_memmode',null,true)};
V.g_memmode=()=>{const m=GS.mem,b=S.best;return'<h1>'+esc(m.ca)+'</h1><p class="muted">Tria com vols jugar.</p>'+gcard('gmt','⏱️','Contrarellotge','90 s: taulers de 6 parelles sense parar. Tauler complet: +20 punts i +5 s.',b['mem-'+m.id+'-t'])+gcard('gmr','🧘','Sense temps','Un tauler de 6 parelles, amb calma. Es compten els moviments.',b['mem-'+m.id+'-r'])};
ACT.gmt=()=>gmPlay('t');ACT.gmr=()=>gmPlay('r');ACT.gmagain=()=>gmPlay(GS.mem.mode);
function gmPlay(mode){JG.stop();const cfg=GS.mem;cfg.mode=mode;const timed=mode==='t',key='mem-'+cfg.id+'-'+mode;let t=90,pairs=0,boards=0,sc=0,moves=0,open=[],lock=false,cards=[],found=0;const t0=Date.now();
  const upd=()=>{const c=$('#jchip');if(c)c.textContent=timed?'⭐ '+sc:moves+' mov.'};
  const six=()=>{const out=[];for(const w of shuf(cfg.words)){if(norm(w.ca)===norm(w.es))continue;if(out.some(x=>norm(x.es)===norm(w.es)||norm(x.ca)===norm(w.ca)||norm(x.ca)===norm(w.es)||norm(x.es)===norm(w.ca)))continue;out.push(w);if(out.length===6)break}return out};
  function board(){const sx=six();cards=[];sx.forEach((w,i)=>cards.push({id:i,ca:1,a:w.em,b:w.ca},{id:i,ca:0,a:'',b:stripA(w.es)}));cards=shuf(cards);open=[];found=0;lock=false;
    $('#jg').innerHTML=cards.map((c,i)=>'<button class="jg-mc" data-i="'+i+'" aria-label="carta"><div><span class="f">❔</span><span class="b">'+(c.ca?'<span>'+c.a+'</span>'+esc(c.b):esc(c.b))+'</span></div></button>').join('');
    $('#jg').querySelectorAll('.jg-mc').forEach(el=>el.onclick=()=>flip(el))}
  function flip(el){const i=+el.dataset.i;if(lock||el.classList.contains('up'))return;el.classList.add('up');open.push(i);if(cards[i].ca)say(cards[i].b);
    if(open.length===2){moves++;const a=cards[open[0]],b=cards[open[1]],els=open.map(k=>$('#jg').children[k]);
      if(a.id===b.id&&a.ca!==b.ca){els.forEach(x=>x.classList.add('done'));open=[];found++;pairs++;sc+=10;upd();
        if(found===6){if(timed){boards++;sc+=20;t=Math.min(120,t+5);upd();lock=true;setTimeout(()=>{if(JG.live)board()},650)}
          else{const s=Math.max(0,Math.round(1000-moves*40-(Date.now()-t0)/1000*6));setTimeout(()=>{if(JG.live)jgResult(cfg.ca+' · Parelles',s,moves+' moviments · '+Math.round((Date.now()-t0)/1000)+' s',key,15,'gmagain')},700)}}}
      else{lock=true;setTimeout(()=>{els.forEach(x=>x.classList.remove('up'));open=[];lock=false},timed?550:800)}if(!timed)upd()}}
  $('#app').innerHTML=jgHead(esc(cfg.ca),timed?'⭐ 0':'0 mov.')+(timed?'<div class="timer"><i id="jtb" style="width:100%"></i></div><p class="muted" style="text-align:center">⏱ <b id="jtt">90</b> s · tauler complet: +20 i +5 s</p>':'<p class="muted" style="text-align:center">Uneix cada paraula catalana amb el seu significat.</p>')+'<div class="jg-g3" id="jg"></div>';
  JG.live=true;board();
  if(timed)JG.t=setInterval(()=>{t--;const e=$('#jtt');if(!e){JG.stop();return}e.textContent=Math.max(t,0);$('#jtb').style.width=Math.max(0,t/90*100)+'%';
    if(t<=0)jgResult(cfg.ca+' · Parelles',sc,pairs+' parelles · '+boards+' taulers complets',key,Math.min(40,Math.round(sc/8)+3),'gmagain')},1000)}
/* ---- 4 · Pluja de verbs ---- */
const aeTenseMode=()=>unlockedT().length>=2;
const aeVerbs=()=>VPOOL().filter(i=>!VERBS[i].pn&&i!=='caldre');
V.g_ae=()=>{let h='<h1>🪂 Pluja de verbs</h1>';
  if(aeTenseMode()){const u=unlockedT();GS.at=(GS.at||u).filter(x=>u.includes(x));if(GS.at.length<2)GS.at=u.slice();
    h+='<p>Cauen formes verbals. Toca <b>només</b> les del temps que et demanen. El temps canvia cada 6 encerts. Tens 3 vides.</p><b>Temps en joc (mínim 2)</b>'+tPills(GS.at,'gat')+'<p class="muted">Només hi surten temps i verbs que ja has treballat.</p><button class="btn block" data-a="gaego"'+(GS.at.length<2?' disabled':'')+'>Comença</button>'}
  else h+='<p>Cauen formes del present. Toca <b>només</b> les del verb que et demanen. El verb canvia cada 6 encerts. Tens 3 vides.</p><p class="muted">Cada partida tria 3 verbs dels que ja has treballat. Quan acabis la lliçó del perfet (A1 lliçó 21) també podràs entrenar-hi els temps verbals.</p><button class="btn block" data-a="gaego">Comença</button>';return h};
ACT.gat=v=>{GS.at=GS.at.includes(v)?GS.at.filter(x=>x!==v):GS.at.concat(v);showCur()};
function aeItem(cat,cats,mode){const verbs=mode==='tense'?aeVerbs():null;
  for(let n=0;n<80;n++){let inf,t,p=rnd(6);
    if(mode==='tense'){inf=one(verbs);t=cat}else{inf=cat;t='pres'}
    const v=VERBS[inf],f=v.T[t]&&v.T[t][p];if(!f)continue;
    if(mode==='tense'){if(cats.some(o=>o!==t&&v.T[o]&&v.T[o].includes(f)))continue}
    else{if(cats.some(o=>o!==inf&&VERBS[o].T.pres.includes(f)))continue}
    return{txt:PRON_S[p]+' '+f,ty:cat}}
  return null}
ACT.gaego=()=>{const mode=aeTenseMode()?'tense':'verb';JG.stop();
  let sel;if(mode==='tense'){if(GS.at.length<2)return;sel=GS.at.slice()}else{sel=pick(aeVerbs(),3);if(sel.length<2){toast('Encara no hi ha prou verbs');return}}
  const lab=c=>mode==='tense'?VT_NAMES[c][0]:c,dsc=c=>mode==='tense'?VT_NAMES[c][0]+' — '+VT_NAMES[c][2]:c+' ('+VERBS[c].es+')';
  let lives=3,sc=0,tgt=one(sel),items=[],last=0,spawn=0,sp=44,ok=0,pauseT=0;
  $('#app').innerHTML=jgHead('Pluja de verbs','')+'<div class="jg-target">Toca només les formes de <b id="jtg"></b></div><div class="jg-arena" id="jar"></div><p class="muted" style="text-align:center;margin-top:10px">'+(mode==='tense'?'Temps':'Verbs')+' en joc: '+sel.map(lab).join(' · ')+'</p>';
  const setT=()=>{$('#jtg').textContent=dsc(tgt)};setT();
  const hud=()=>{const c=$('#jchip');if(c)c.textContent='❤️'.repeat(lives)+'🖤'.repeat(3-lives)+' · '+sc};
  const note=(html,cls,top)=>{const ar=$('#jar');if(!ar)return null;const n=document.createElement('div');n.className='jg-notice '+(cls||'');if(top)n.style.top=top;n.innerHTML=html;ar.appendChild(n);return n};
  const lose=()=>{lives--;hud();if(lives<=0){JG.live=false;jgResult('Pluja de verbs',sc,ok+' encerts','ae',Math.min(40,ok*2+2),'gaego','<p class="muted">'+sel.map(lab).join(' · ')+'</p>')}};
  const announce=()=>{pauseT=1.6;items.forEach(o=>{o.dead=1;o.el.remove()});items=[];spawn=1.2;const lvl=Math.floor(ok/6)+1;
    const n=note('<span>Canvi! · Nivell '+lvl+'</span><b>Ara: '+esc(lab(tgt))+'</b>');const tg=document.querySelector('.jg-target');if(tg)tg.classList.add('chg');try{navigator.vibrate&&navigator.vibrate(120)}catch(e){}
    setTimeout(()=>{if(n)n.remove();if(tg)tg.classList.remove('chg')},1600)};
  const add=()=>{const good=Math.random()<.45,cat=good?tgt:one(sel.filter(x=>x!==tgt)),it=aeItem(cat,sel,mode),ar=$('#jar');if(!ar||!it)return;
    const el=document.createElement('div');el.className='jg-fall';el.textContent=it.txt;ar.appendChild(el);
    const w=ar.clientWidth-el.offsetWidth-6,o={el,y:-50,ty:it.ty};el.style.left=Math.max(2,rnd(Math.max(w,2)))+'px';items.push(o);
    el.onclick=()=>{if(o.dead)return;o.dead=1;
      if(o.ty===tgt){sc+=10;ok++;S.stat.verb++;el.classList.add('good');sp=Math.min(100,44+Math.floor(ok/6)*2.5);
        if(ok%20===0&&lives<3){lives++;const n=note('<span>20 encerts</span><b>+1 ❤️</b>','heal','25%');setTimeout(()=>n&&n.remove(),1100)}
        hud();if(ok%6===0){tgt=one(sel.filter(x=>x!==tgt));setT();announce()}}
      else{el.classList.add('bad');lose()}
      setTimeout(()=>el.remove(),250);items=items.filter(x=>x!==o)}};
  const loop=ts=>{if(!JG.live||!$('#jar'))return;if(!last)last=ts;const dt=Math.min(.1,(ts-last)/1000);last=ts;
    if(pauseT>0){pauseT-=dt;JG.r=requestAnimationFrame(loop);return}
    spawn-=dt;if(spawn<=0){add();spawn=Math.max(.9,1.6-Math.floor(ok/6)*.03)}
    const H=$('#jar').clientHeight;items.slice().forEach(o=>{o.y+=sp*dt;o.el.style.transform='translateY('+o.y+'px)';if(o.y>H-34){o.dead=1;o.el.remove();items=items.filter(x=>x!==o);if(o.ty===tgt)lose()}});
    JG.r=requestAnimationFrame(loop)};
  JG.live=true;hud();JG.r=requestAnimationFrame(loop)};


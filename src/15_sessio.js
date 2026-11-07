/* ===== SESIÓN DE PREGUNTAS ===== */
let SE=null;
function checkType(q,val){const u=nfc(val),un=norm(val);if(!un)return{ok:false};
  const alts=q.alts||[q.ans];
  for(const a of alts){if(nfc(a)===u)return{ok:true}}
  for(const a of alts){if(norm(a)===un)return{ok:true,note:'Ojo con el acento: se escribe «'+a+'».'}}
  return{ok:false}}
function startSession(qs,o){qs=qs.filter(Boolean);if(!qs.length){toast('No hi ha preguntes');return}
  SE={qs:qs.slice(),i:0,ok:0,tot:0,combo:0,max:0,xp:0,o:o||{},blk:{},retried:new Set()};
  document.body.classList.add('in-session');window.scrollTo(0,0);showQ()}
function qHead(q){const total=SE.qs.length;return'<div class="qtop"><button class="x" data-a="quit" aria-label="Surt">✕</button><div class="prog"><i style="width:'+Math.round(SE.i/total*100)+'%"></i></div><div class="combo">'+(SE.combo>1?'×'+SE.combo:'')+'</div></div>'+'<div class="qkind">'+esc(q.kind||'')+' · '+(SE.i+1)+'/'+total+'</div>'}
function showQ(){const q=SE.qs[SE.i];if(!q)return endSession();const A=$('#app');SE.cur=q;SE.locked=false;
  let h=qHead(q);
  if(q.k==='flash'){h+='<div class="flash" id="fl" data-a="flip" tabindex="0" role="button"><div class="big">'+(q.em||'')+'</div><div class="ca">'+esc(q.ca)+'</div><div class="bk" id="bk" hidden>'+esc(q.es)+'</div><small id="fh">Toca para ver el significado</small></div><div class="row" style="margin-top:12px;justify-content:center">'+spk(q.ca)+'</div><div class="fb" id="fbb" hidden><button class="btn sec" data-a="fno">Encara no</button><button class="btn" data-a="fyes">Ho sabia</button></div>';
    A.innerHTML=h;setTimeout(()=>say(q.ca),150);return}
  if(q.k==='build'){h+='<div class="prompt">'+esc(q.es)+'</div><p class="muted">Ordena las palabras en catalán.</p><div class="line" id="ln"></div><div class="bank" id="bk">'+shuf(q.tok.concat(q.extra||[]).map((w,i)=>({w,i}))).map(o=>'<button class="wt" data-a="wt" data-v="'+o.i+'">'+esc(o.w)+'</button>').join('')+'</div><button class="btn block" id="ck" data-a="check" disabled>Comprova</button>';
    SE.line=[];A.innerHTML=h+'<div class="spacer"></div>';return}
  const sayBtn=q.say?'<button class="spk" data-a="say" data-v="'+esc(q.say)+'" aria-label="Escolta">🔊</button><button class="spk" data-a="slow" data-v="'+esc(q.say)+'" aria-label="Escolta lento">🐢</button>':'';
  h+='<div class="prompt">'+(q.em?'<span class="big">'+q.em+'</span>':'')+(q.hide?'<span class="muted" style="font-size:22px">'+q.p+'</span>':q.p)+sayBtn+'</div>';
  if(q.k==='choice'){const ops=shuf([q.ans].concat(q.opts));h+='<div class="opts">'+ops.map(o=>'<button class="opt" data-a="pick" data-v="'+esc(o)+'">'+esc(o)+'</button>').join('')+'</div>'}
  else{h+='<input class="typebox" id="tb" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Respuesta"><div class="row" style="margin-top:12px"><button class="btn grow" id="ck" data-a="check">Comprova</button>'+(q.h&&!SE.o.test?'<button class="btn sec" data-a="hint">💡</button>':'')+'<button class="btn sec" data-a="idk">No ho sé</button></div><div class="muted" id="hn" style="margin-top:8px"></div>'}
  A.innerHTML=h+'<div class="spacer"></div>';
  if(q.say)setTimeout(()=>say(q.say),200);
  const tb=$('#tb');if(tb){tb.focus();tb.addEventListener('keydown',e=>{if(e.key==='Enter')ACT.check()})}}
function sheet(ok,q,note,given){const old=$('#sheet');if(old)old.remove();const d=document.createElement('div');d.id='sheet';d.className='sheet '+(ok?'good':'bad');
  const ansTxt=q.k==='build'?q.ans:q.ans;
  let h='<div class="in"><h3>'+(ok?['Molt bé!','Perfecte!','Exacte!','Sí!'][rnd(4)]:'Gairebé…')+'</h3>';
  if(!ok)h+='<p>Correcte: <b>'+esc(ansTxt)+'</b>'+(q.sayAns||q.k==='build'?' '+spk(ansTxt):'')+'</p>'+(given?'<small>Has escrit: '+esc(given)+'</small>':'');
  if(note)h+='<p>'+esc(note)+'</p>';
  const ex=q.e||q.tip;if(ex&&!SE.o.test)h+='<p>'+(q.e?esc(q.e):esc(q.tip))+'</p>';
  h+='<button class="btn block" data-a="next" id="nx">Continua</button></div>';d.innerHTML=h;document.body.appendChild(d);
  const nx=$('#nx');if(nx)nx.focus()}
function record(ok,q){SE.tot++;S.stat.tot++;
  if(q.blk!=null){const b=SE.blk[q.blk]||(SE.blk[q.blk]={ok:0,tot:0});b.tot++;if(ok)b.ok++}
  if(ok){SE.ok++;S.stat.ok++;SE.combo++;SE.max=Math.max(SE.max,SE.combo);if(q.verb)S.stat.verb++;const x=SE.o.per!=null?SE.o.per:10;SE.xp+=x+(SE.combo>=5?2:0);
    if(q.key&&S.weak[q.key]){delete S.weak[q.key]}}
  else{SE.combo=0;if(q.key&&!SE.o.test){S.weak[q.key]=(S.weak[q.key]||0)+1}
    if(!SE.o.test&&!SE.o.noRetry&&!q._r&&SE.i<SE.qs.length+3){const c=Object.assign({},q,{_r:1});SE.qs.push(c)}}
  save()}
function finishQ(ok,q,note,given){SE.locked=true;record(ok,q);sheet(ok,q,note,given)}
const ACT={};
ACT.say=v=>say(v);ACT.slow=v=>say(v,.55);
ACT.pick=(v,el)=>{if(SE.locked)return;const q=SE.cur;const ok=v===q.ans;
  document.querySelectorAll('.opt').forEach(b=>{if(b.dataset.v===q.ans)b.classList.add('good');else if(b===el)b.classList.add('bad')});
  if(q.sayAns||q.say)say(q.ans.length<60&&q.k==='choice'&&q.sayAns?q.ans:q.say||q.ans);
  finishQ(ok,q)};
ACT.check=()=>{if(SE.locked)return;const q=SE.cur;
  if(q.k==='build'){const w=SE.line.map(i=>(q.tok.concat(q.extra||[]))[i]);const ok=w.join(' ').toLowerCase()===q.ans.toLowerCase();
    $('#ln').classList.add(ok?'good':'bad');if(ok)say(q.ans);finishQ(ok,q,'',w.join(' '));return}
  const tb=$('#tb');if(!tb)return;const val=tb.value;if(!val.trim()){tb.focus();return}
  const r=checkType(q,val);tb.classList.add(r.ok?'good':'bad');tb.disabled=true;if(r.ok&&q.sayAns)say(q.ans);finishQ(r.ok,q,r.note,r.ok?'':val)};
ACT.idk=()=>{if(SE.locked)return;const tb=$('#tb');if(tb)tb.disabled=true;finishQ(false,SE.cur)};
ACT.hint=()=>{const q=SE.cur;$('#hn').textContent='💡 '+q.h};
ACT.wt=(v,el)=>{if(SE.locked)return;SE.line.push(+v);el.classList.add('gone');redrawLine()};
function redrawLine(){const q=SE.cur,all=q.tok.concat(q.extra||[]);$('#ln').innerHTML=SE.line.map((i,n)=>'<button class="wt" data-a="wl" data-v="'+n+'">'+esc(all[i])+'</button>').join('');$('#ck').disabled=!SE.line.length}
ACT.wl=(v)=>{if(SE.locked)return;const idx=SE.line.splice(+v,1)[0];const b=document.querySelector('#bk .wt[data-v="'+idx+'"]');if(b)b.classList.remove('gone');redrawLine()};
ACT.flip=()=>{const b=$('#bk');if(!b)return;b.hidden=false;$('#fbb').hidden=false;$('#fh').hidden=true};
ACT.fyes=()=>{const q=SE.cur;SE.tot++;SE.ok++;if(q.key&&S.weak[q.key])delete S.weak[q.key];SE.xp+=SE.o.per!=null?SE.o.per:3;SE.i++;save();showQ()};
ACT.fno=()=>{const q=SE.cur;SE.tot++;if(q.key)S.weak[q.key]=(S.weak[q.key]||0)+1;if(!q._r&&SE.qs.length<40)SE.qs.push(Object.assign({},q,{_r:1}));SE.i++;save();showQ()};
ACT.next=()=>{const s=$('#sheet');if(s)s.remove();SE.i++;showQ()};
ACT.quit=()=>{const s=$('#sheet');if(s)s.remove();leaveSession();showCur()};
function leaveSession(){document.body.classList.remove('in-session');try{speechSynthesis.cancel()}catch(e){}}
function endSession(){const o=SE.o;const acc=SE.tot?SE.ok/SE.tot:0;let bonus=0;
  if(!o.test&&acc>=.8)bonus=o.bonus!=null?o.bonus:15;
  addXP(SE.xp+bonus);
  const res={acc,ok:SE.ok,tot:SE.tot,xp:SE.xp+bonus,blk:SE.blk,max:SE.max};
  if(o.onDone)o.onDone(res);
  leaveSession();
  const pct=Math.round(acc*100);
  $('#app').innerHTML='<div class="card" style="text-align:center;margin-top:20px"><div class="big">'+(pct>=90?'🏆':pct>=70?'🎉':pct>=50?'👍':'💪')+'</div><h1>'+(o.test?'Resultat':'Sessió acabada')+'</h1><p style="font-size:22px">'+SE.ok+' / '+SE.tot+' · '+pct+' %</p><p class="muted">+'+(SE.xp+bonus)+' XP'+(bonus?' (inclou bonus)':'')+' · millor ratxa ×'+SE.max+'</p>'+(res.html||'')+'</div>'+(o.extra?o.extra(res):'')+'<button class="btn block" data-a="done">Continua</button>'+(S.weak&&Object.keys(S.weak).length&&!o.test?'<button class="btn sec block" style="margin-top:10px" data-a="weak">Repassa les paraules fluixes ('+Object.keys(S.weak).length+')</button>':'')}


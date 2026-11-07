
/* ===== v6: Sobre mi, generador de frases, A2 difuminado, puerta de práctica ===== */
const seenPool=()=>{const s=seenWords();if(s.length>=8)return s;const f=WORDS.filter(w=>(LSM.a11?LSM.a11.th:[]).includes(w.th));return f.length>=8?f:WORDS.filter(w=>w.lv==='a1')};
const vpool=()=>{const p=VPOOL();return p.length?p:['ser','tenir'].filter(x=>VERBS[x])};
const a2Any=()=>!!(S.set.tkey||Object.keys(S.done).some(id=>LSM[id]&&LSM[id].lv==='a2'));
/* Sobre mi */
const isVow=s=>/^[aeiouhàèéíòóúAEIOUH]/.test(s);
function meQs(){const m=S.me||{};const out=[];
  if(m.name){out.push({k:'build',kind:'Sobre mi',es:'Me llamo '+m.name+'.',tok:['em','dic',m.name],extra:['sóc','tinc'],ans:'em dic '+m.name,tip:'Dir-se: em dic…',key:'me:name'});
    out.push({k:'type',kind:'Sobre mi',p:'«Me llamo '+esc(m.name)+'»',ans:'em dic '+m.name,alts:['em dic '+m.name],e:'Em dic '+m.name+'.',h:'Empieza por «em»',key:'me:name2'})}
  if(m.town){const d=isVow(m.town)?'d\''+m.town:'de '+m.town;const tk=isVow(m.town)?['sóc','d\''+m.town]:['sóc','de',m.town];
    out.push({k:'build',kind:'Sobre mi',es:'Soy de '+m.town+'.',tok:tk,extra:['tinc','vinc'],ans:tk.join(' '),tip:'Ser + de + lloc (d\' davant vocal).',key:'me:town'});
    out.push({k:'type',kind:'Sobre mi',p:'«Soy de '+esc(m.town)+'»',ans:'sóc '+d,alts:['sóc '+d],e:'Sóc '+d+'.',h:'Empieza por «sóc»',key:'me:town2'})}
  if(m.age>0&&m.age<120){const n=catNum(+m.age);
    out.push({k:'type',kind:'Sobre mi',p:'«Tengo '+m.age+' años»',ans:'tinc '+n+' anys',alts:['tinc '+n+' anys'],e:'Tinc '+n+' anys.',h:'Tenir + número + anys',key:'me:age'});
    out.push({k:'build',kind:'Sobre mi',es:'Tengo '+m.age+' años.',tok:['tinc'].concat(n.split(' ')).concat(['anys']),extra:['sóc'],ans:'tinc '+n+' anys',tip:'La edad se dice con tenir.',key:'me:age2'})}
  return shuf(out)}
V.meform=()=>{const m=S.me||{};const f=(id,l,v,t)=>'<label class="muted">'+l+'</label><input id="'+id+'" type="'+(t||'text')+'" value="'+esc(v||'')+'" autocomplete="off" style="width:100%;padding:12px;margin:4px 0 12px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink);font:inherit">';
  return'<h1>👤 Sobre mi</h1><p class="muted">Escribe tus datos para practicar frases con ellos. Se guardan solo en este navegador.</p>'+f('mn','Nom (nombre)',m.name)+f('mt','Poble o ciutat (pueblo o ciudad)',m.town)+f('ma','Edat (edad, opcional)',m.age,'number')+'<button class="btn block" data-a="mesave">Desa</button>'+(S.me?'<button class="btn sec block" style="margin-top:10px" data-a="medel">Esborra les meves dades</button>':'')};
ACT.mesave=()=>{const n=($('#mn').value||'').trim().slice(0,30),t=($('#mt').value||'').trim().slice(0,30),a=parseInt($('#ma').value,10);
  if(!n&&!t&&!(a>0)){toast('Escriu almenys una dada');return}
  S.me={name:n,town:t,age:a>0&&a<120?a:0};save();toast('Desat ✓');up()};
ACT.medel=()=>{S.me=null;save();toast('Dades esborrades');up()};
ACT.meq=()=>{if(!S.me){go('meform',null,true);return}const q=meQs();if(!q.length){go('meform',null,true);return}startSession(q,{per:8})};
ACT.meedit=()=>go('meform',null,true);
/* Generador de frases por plantillas (solo con verbos y palabras ya estudiados) */
const GFR=[
 {need:'a12',ca:'tinc',es:'Tengo',art:'un'},{need:'a19',ca:'vull',es:'Quiero',art:'un'},{need:'a17',ca:'necessito',es:'Necesito',art:'un'},
 {need:'a11',ca:'m\'agrada',es:'Me gusta',art:'def'},{need:'a11',ca:'on és',es:'¿Dónde está',art:'def',q:1}];
const GTH=new Set(['casa','mobles','fruita','aliments','begudes','botigues','cos','roba','escola','lleure','transport','animals','familia','telefon','cuina','tecnologia','ciutat','natura']);
const NP=w=>{if(!GTH.has(w.th))return null;const m=/^(el|la|l')\s?([^ ']+)$/i.exec(w.ca),e=/^(el|la) ([^(),]+)$/i.exec(w.es);return m&&e?{w,n:m[2],ca:m[1].toLowerCase(),ea:e[1].toLowerCase(),en:e[2]}:null};
function genQ(){
  const fr=GFR.filter(f=>dn(f.need));if(!fr.length)return null;
  const nouns=seenPool().map(NP).filter(Boolean);if(nouns.length<3)return null;
  const f=one(fr),x=one(nouns);
  const un=x.ea==='el'?'un':'una';
  const defTok=x.ca==="l'"?"l'"+x.n:null;
  const tail=f.art==='un'?[un,x.n]:(defTok?[defTok]:[x.ca,x.n]);
  const tok=f.ca.split(' ').concat(tail);const eArt=f.art==='un'?un:x.ea;
  const es=f.q?'¿Dónde está '+x.ea+' '+x.en+'?':f.es+' '+eArt+' '+x.en+'.';
  const pool=WORDS.map(NP).filter(Boolean);
  const ex=pick(pool.filter(y=>y.n!==x.n).map(y=>y.n),2);
  return{k:'build',kind:'Frase nova',es,tok,extra:ex,ans:tok.join(' '),tip:f.q?'On és + article + nom.':'Verb + article + nom.',key:'g:'+f.ca+'.'+x.w.ca}}
ACT.genq=()=>{const qs=[];let t=0;while(qs.length<10&&t++<80){const q=genQ();if(q&&!qs.some(x=>x.ans===q.ans))qs.push(q)}
  if(qs.length<3){toast('Acaba més lliçons per obrir aquest generador');return}startSession(qs,{per:8})};
/* A2: traducciones difuminadas hasta tocarlas */
ACT.unblur=(v,el)=>el.classList.add('on');
ACT.blur=()=>{S.set.blur=S.set.blur===false;save();showCur()};
/* escalera de castellano (como euskera): A1 y A2 1-7 visible; A2 8+ ejemplos y palabras clave borrosos; A2 16+ también los subtítulos */
const blr=l=>l.lv==='a2'&&l.n>=8&&S.set.blur!==false;
const blrSub=l=>l.lv==='a2'&&l.n>=16&&S.set.blur!==false;
const esSub=(l,tap)=>blrSub(l)?'<span class="blur"'+(tap?' data-a="unblur" role="button" title="Toca para ver la traducción"':'')+'>'+esc(l.es)+'</span>':esc(l.es);

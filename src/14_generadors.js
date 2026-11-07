/* ===== GENERADORES DE PREGUNTAS ===== */
const TENSES=['pres','perf','perif','imp','fut','cond','subj','imper'];
const pool=lv=>lv?WORDS.filter(w=>w.lv===lv):WORDS;
function altsOf(ca){const o=[ca];ca.split(' / ').forEach(x=>{o.push(x);o.push(x.replace(ART,''))});o.push(ca.replace(ART,''));return[...new Set(o)]}
function distract(w,n,field){const p=pool(w.lv).filter(x=>x.ca!==w.ca&&x[field]!==w[field]);
  const art=(w.ca.match(ART)||[''])[0].trim().toLowerCase();
  const same=p.filter(x=>((x.ca.match(ART)||[''])[0].trim().toLowerCase())===art);
  const base=same.length>=n+3?same:p;
  const u=[];for(const x of shuf(base)){if(!u.includes(x[field]))u.push(x[field]);if(u.length>=n)break}return u}
function vq(w,mode){if(!mode){const m=mast(w.ca),r=Math.random();mode=(m>=2&&r<.5)?'t':r<.5?'c1':r<.8?'c2':'l'}const key='w:'+w.ca;
  if(mode==='c1')return{k:'choice',kind:'Vocabulari',p:'«'+esc(w.ca)+'» vol dir…',say:w.ca,ans:w.es,opts:distract(w,3,'es'),e:w.ca+' = '+w.es,key};
  if(mode==='c2')return{k:'choice',kind:'Vocabulari',p:'¿Cómo se dice «'+esc(w.es)+'» en catalán?',ans:w.ca,opts:distract(w,3,'ca'),e:w.es+' = '+w.ca,key,sayAns:1};
  if(mode==='l')return{k:'choice',kind:'Escolta i tria',p:'Escucha y elige el significado',say:w.ca,hide:1,ans:w.es,opts:distract(w,3,'es'),e:w.ca+' = '+w.es,key};
  return{k:'type',kind:'Escriu en català',p:'«'+esc(w.es)+'»',ans:w.ca,alts:altsOf(w.ca),e:w.ca+' = '+w.es,h:'Empieza por «'+w.ca[0]+'»',key,em:w.em,sayAns:1}}
function lq(lid,i){const l=LSM[lid];const q=l.qs[i];const o=Object.assign({},q,{key:'q:'+lid+'#'+i,kind:'Lliçó '+l.n+' · '+l.ca,lid});
  if(q.k==='choice'){o.opts=q.opts.slice()}
  if(q.k==='build'){o.k='build';o.ans=q.tok.join(' ')}return o}
function formOf(inf,tense,p){const v=VERBS[inf];const f=v&&v.T[tense]?v.T[tense][p]:null;return f}
function verbQ(inf,tense,p){const v=VERBS[inf];const t=tense||(()=>{const u=unlockedT();return u.length?u[rnd(u.length)]:'pres'})();const n=t==='imper'?5:6;
  let tries=0;while(tries++<20){const pp=(p==null||tries>1)?rnd(n):p;const f=formOf(inf,t,pp);if(!f||/undefined|null/.test(f))continue;
    const subj=t==='imper'?'('+IMPER_P[pp]+')':PRON_S[pp];const comp=VC[inf]||'';
    const pre=t==='subj'?'Vull que ':t==='cond'?'Si pogués, ':'';
    const post=t==='pres'&&comp?'':'';
    const sentence=pre+subj+' ____ ('+inf+') '+comp;
    const key='v:'+inf+'.'+t+'.'+pp;const name=VT_NAMES[t][0];
    if(rnd(2)){const others=shuf(v.T[t].map((x,i)=>i!==pp&&x&&x!==f&&!/undefined/.test(x)?x:null).filter(Boolean));const ops=[...new Set(others)].slice(0,3);
      if(ops.length>=2)return{k:'choice',kind:'Conjugació · '+name,p:esc(sentence.trim()),say:null,ans:f,opts:ops,e:VT_NAMES[t][2]+'. '+inf+' → '+f,key,verb:1}}
    return{k:'type',kind:'Conjugació · '+name,p:esc(sentence.trim()),ans:f,alts:[f],e:VT_NAMES[t][2]+'. '+inf+' → '+f,h:'Tiempo: '+name,key,verb:1}}
  return null}
const VLIST=Object.keys(VERBS);
function sentQ(lv){const p=SENT.filter(s=>(!lv||s.lv===lv)&&(s.lv==='a1'||a2Any()));const s=p[rnd(p.length)];const ex=s.x.length?s.x:pick(SENT.filter(z=>z!==s).flatMap(z=>z.t).filter(w=>!s.t.includes(w)),2);
  return{k:'build',kind:'Construeix la frase',es:s.es,tok:s.t,extra:[...new Set(ex)].slice(0,2),ans:s.t.join(' '),tip:s.tip,key:'s:'+SENT.indexOf(s)}}
function numQ(max){const n=rnd(max||100)+(rnd(3)?0:0);
  if(rnd(2))return{k:'type',kind:'Dictat de números',p:'Escolta i escriu el número (xifres)',say:catNum(n),ans:String(n),alts:[String(n)],e:n+' = '+catNum(n),hide:1};
  return{k:'type',kind:'Números',p:'Escribe en catalán: <b>'+n+'</b>',ans:catNum(n),alts:[catNum(n)],e:n+' = '+catNum(n),h:'Empieza por «'+catNum(n)[0]+'»',sayAns:1}}
const LETTER={a:'a',b:'be',c:'ce',d:'de',e:'e',f:'efa',g:'ge',h:'hac',i:'i',j:'jota',k:'ca',l:'ela',m:'ema',n:'ena',o:'o',p:'pe',q:'cu',r:'erra',s:'essa',t:'te',u:'u',v:'ve',w:'ve doble',x:'ics',y:'i grega',z:'zeta'};
const SPELLN=['Maria','Pere','Jordi','Anna','Laia','Marc','Joan','Berta','Pau','Queralt','Roger','Carles','Aina','Ona','Pol','Núria','Mercè'];
function spellQ(){const n=SPELLN[rnd(SPELLN.length)];const base=norm(n);const sp=base.split('').map(c=>LETTER[c]||c).join(', ');
  return{k:'type',kind:'Lletrejar',p:'Escucha cómo se deletrea un nombre y escríbelo',say:sp,hide:1,ans:n,alts:[n],e:'Es deletrea: '+sp+'.',h:n.length+' letras'}}
function keyToQ(key){try{const t=key[0],r=key.slice(2);
  if(t==='w'){const w=WM[r];return w?vq(w):null}
  if(t==='q'){const[l,i]=r.split('#');return LSM[l]&&LSM[l].qs[+i]?lq(l,+i):null}
  if(t==='v'){const[inf,te,p]=r.split('.');return VERBS[inf]?verbQ(inf,te,+p):null}
  if(t==='s'){const s=SENT[+r];return s?sentQ2(s):null}}catch(e){}return null}
function sentQ2(s){const ex=s.x.length?s.x:pick(SENT.filter(z=>z!==s).flatMap(z=>z.t).filter(w=>!s.t.includes(w)),2);return{k:'build',kind:'Construeix la frase',es:s.es,tok:s.t,extra:[...new Set(ex)].slice(0,2),ans:s.t.join(' '),tip:s.tip,key:'s:'+SENT.indexOf(s)}}
function mixQ(n){const out=[];const usedW=[];const doneL=Object.keys(S.done);const lids=doneL.length?doneL:LESSONS.filter(l=>l.lv==='a1').slice(0,6).map(l=>l.id);
  while(out.length<n){const r=rnd(10);let q=null;
    if(r<4){const l=LSM[lids[rnd(lids.length)]];q=lq(l.id,rnd(l.qs.length))}
    else if(r<7){const sp=seenPool();const w=pickWords(sp.filter(x=>!usedW.includes(x.ca)),1)[0]||sp[rnd(sp.length)];usedW.push(w.ca);q=vq(w)}
    else if(r<9){const vp=vpool();q=verbQ(vp[rnd(vp.length)])}
    else q=sentQ(rnd(2)?'a1':null);
    if(q)out.push(q)}return out}

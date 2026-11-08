/* ===== NÚCLEO: utilidades, estado, voz, XP, insignias ===== */
const $=(s,r)=>(r||document).querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const rnd=n=>Math.floor(Math.random()*n);
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=(a,n)=>shuf(a).slice(0,n);
const nfc=s=>String(s).normalize('NFC').toLowerCase().replace(/[’`´]/g,"'").replace(/[¿?¡!.,;:«»"()·]/g,'').replace(/-/g,' ').replace(/\s+/g,' ').trim();
const norm=s=>nfc(s).normalize('NFD').replace(/[̀-ͯ]/g,'').normalize('NFC');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const yest=()=>{const d=new Date(Date.now()-864e5);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const KEY='cami-catala-v1';
const DEF={v:1,xp:0,streak:0,last:'',day:{d:'',xp:0},goal:30,done:{},weak:{},m:{},badges:{},tests:{},self:{},stat:{ok:0,tot:0,verb:0,games:0,perfect:0},best:{},set:{voice:true,theme:'auto',rate:.9,voiceName:''},seen:{}};
let S;
function load(){try{const r=localStorage.getItem(KEY);S=r?Object.assign({},DEF,JSON.parse(r)):JSON.parse(JSON.stringify(DEF))}catch(e){S=JSON.parse(JSON.stringify(DEF))}
  ['done','weak','m','badges','tests','self','best','seen'].forEach(k=>{if(!S[k]||typeof S[k]!=='object')S[k]={}});
  S.stat=Object.assign({ok:0,tot:0,verb:0,games:0,perfect:0},S.stat);S.set=Object.assign({voice:true,theme:'auto',rate:.9,voiceName:''},S.set);S.day=S.day||{d:'',xp:0};
  /* v17: aprobado al 80 % -> las lecciones aprobadas con menos de 80 % vuelven a pendientes (una sola vez) */
  if(!S.mig85){S.mig85=1;Object.keys(S.done).forEach(k=>{const d=S.done[k];if(d&&(d.best||0)<80)delete S.done[k]})}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
load();
function applyTheme(){let t=S.set.theme;const r=document.documentElement;if(t==='auto'){try{t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}catch(e){t='dark'}}r.setAttribute('data-theme',t)}
try{matchMedia('(prefers-color-scheme: light)').addEventListener('change',()=>{if(S.set.theme==='auto')applyTheme()})}catch(e){}
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}
function streakNow(){return(S.last===today()||S.last===yest())?S.streak:0}
function dayXP(){return S.day.d===today()?S.day.xp:0}
const BADGES=[
['b1','🌱','Primer pas','Acaba una lliçó',()=>Object.keys(S.done).length>=1],
['b5','📚','Cinc lliçons','5 lliçons fetes',()=>Object.keys(S.done).length>=5],
['b13','🏃','Mig A1','13 lliçons de l\'A1',()=>Object.keys(S.done).filter(k=>k[1]==='1').length>=13],
['ba1','🎓','A1 complet','Les 26 lliçons de l\'A1',()=>Object.keys(S.done).filter(k=>k[1]==='1').length>=26],
['ba2','🏆','A2 complet','Les 24 lliçons de l\'A2',()=>Object.keys(S.done).filter(k=>k[1]==='2').length>=24],
['s3','🔥','3 dies seguits','Ratxa de 3 dies',()=>streakNow()>=3],
['s7','🔥','Setmana','Ratxa de 7 dies',()=>streakNow()>=7],
['s30','🌋','Un mes','Ratxa de 30 dies',()=>streakNow()>=30],
['x100','⭐','100 XP','Suma 100 XP',()=>S.xp>=100],
['x500','🌟','500 XP','Suma 500 XP',()=>S.xp>=500],
['x2000','✨','2.000 XP','Suma 2.000 XP',()=>S.xp>=2000],
['x5000','👑','5.000 XP','Suma 5.000 XP',()=>S.xp>=5000],
['v50','🔤','Conjugador','50 formes verbals correctes',()=>S.stat.verb>=50],
['g1','🎮','Jugador','Juga un joc',()=>S.stat.games>=1],
['g10','🕹️','Gamer','Juga 10 partides',()=>S.stat.games>=10],
['p1','💯','Sense errors','Una lliçó al 100 %',()=>S.stat.perfect>=1],
['t1','🧪','Test A1','Aprova el test d\'A1',()=>S.tests.a1&&S.tests.a1.pass],
['t2','🧪','Test A2','Aprova el test d\'A2',()=>S.tests.a2&&S.tests.a2.pass]];
function checkBadges(){BADGES.forEach(b=>{if(!S.badges[b[0]]&&b[4]()){S.badges[b[0]]=today();toast(b[1]+' Insígnia: '+b[2])}})}
function addXP(n){if(!n)return;const t=today();
  if(S.day.d!==t)S.day={d:t,xp:0};
  const before=S.day.xp;S.day.xp+=n;S.xp+=n;
  if(S.last!==t){S.streak=(S.last===yest())?S.streak+1:1;S.last=t}
  if(before<S.goal&&S.day.xp>=S.goal)toast('🎯 Objectiu diari assolit!');
  checkBadges();save()}
/* ----- voz ----- */
let CAV=null,VOICES=[];
const ORD={r:{1:'primer',3:'tercer'},n:{2:'segon'},t:{4:'quart'},a:{1:'primera',2:'segona',3:'tercera',4:'quarta'},'è':{5:'cinquè',6:'sisè',7:'setè',8:'vuitè',9:'novè',10:'desè'}};
const isCa=v=>/^ca([-_]|$)/i.test(v.lang)||/catal|montserrat|jordi|enric|n[uú]ria|\bona\b/i.test(v.name);
function pickVoice(){try{VOICES=speechSynthesis.getVoices()||[];const ca=VOICES.filter(isCa);
  let v=S&&S.set&&S.set.voiceName?VOICES.find(x=>x.name===S.set.voiceName):null;
  if(!v)v=ca.find(x=>/premium|enhanced|millorada|natural|neural/i.test(x.name))||ca.find(x=>!/compact/i.test(x.name))||ca[0]||null;
  CAV=v||null}catch(e){}}
try{pickVoice();speechSynthesis.onvoiceschanged=()=>{pickVoice();if(typeof CUR!=='undefined'&&CUR.v==='me'&&!document.body.classList.contains('in-session')){try{showCur()}catch(e){}}}}catch(e){}
function speakable(t){let x=String(t).replace(/<[^>]+>/g,' ');
  x=x.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}️]/gu,' ');
  x=x.replace(/\(=\s*([^)]*)\)/g,', o sigui, $1');
  x=x.replace(/\b(\d+)(r|n|t|a|è)\b/g,(m,n,s)=>(ORD[s]&&ORD[s][+n])||m);
  x=x.replace(/\b(\d+)-(\d+)\b/g,'$1 a $2');
  x=x.replace(/\b0\d{3,}\b/g,m=>m.split('').map(d=>catNum(+d)).join(' '));
  x=x.replace(/\b(\d+),(\d+)\b/g,(m,a,b)=>catNum(+a)+' amb '+catNum(+b));
  x=x.replace(/\b\d+\b/g,m=>m.length>6?m.split('').map(d=>catNum(+d)).join(' '):catNum(+m));
  x=x.replace(/%/g,' per cent').replace(/€/g,' euros');
  x=x.replace(/[«»"“”]/g,'').replace(/\s*[—–→]\s*/g,', ').replace(/…/g,', ').replace(/[+=]/g,' ').replace(/\s*\/\s*/g,', ');
  x=x.replace(/\bvint-i-/gi,'vinti ').replace(/([a-zà-ú])-(?=[a-zà-ú])/gi,'$1 ');
  return x.replace(/[’`´]/g,"'").replace(/\s+/g,' ').trim()}
function say(t,rate){if(!S.set.voice)return;try{speechSynthesis.cancel();if(!CAV)pickVoice();const u=new SpeechSynthesisUtterance(speakable(t));u.lang=CAV?CAV.lang:'ca-ES';if(CAV)u.voice=CAV;u.rate=rate||S.set.rate||.9;speechSynthesis.speak(u)}catch(e){}}
const spk=(t,c)=>'<button class="spk" data-a="say" data-v="'+esc(t)+'" aria-label="Escolta">🔊</button>';
/* ----- datos derivados ----- */
const WM={};VOCAB.forEach(th=>th.w.forEach(w=>{if(!WM[w[0]])WM[w[0]]={ca:w[0],es:w[1],em:w[2]||th.ic,th:th.id,lv:th.lv}}));
const WORDS=Object.values(WM);
const THM={};VOCAB.forEach(t=>THM[t.id]=t);
/* ----- dominio por palabra (0-4): cuanto menos se domina, más sale ----- */
const mast=k=>S.m[k]||0;
const bump=(k,ok)=>{S.m[k]=Math.max(0,Math.min(4,mast(k)+(ok?1:-1)))};
const setPct=t=>{const ws=Object.keys(t.w.reduce((a,w)=>(a[w[0]]=1,a),{}));return Math.round(ws.reduce((a,k)=>a+mast(k),0)/(ws.length*4)*100)};
const themeWords=t=>{const seen={};return t.w.filter(w=>!seen[w[0]]&&(seen[w[0]]=1)).map(w=>WM[w[0]]).filter(Boolean)};
/* elige n palabras sin repetir ni la palabra ni el significado, favoreciendo las menos dominadas */
function pickWords(pool,n,avoid){const p=pool.slice(),out=[],es={};(avoid||[]).forEach(k=>es['#'+k]=1);
  while(out.length<n&&p.length){const wts=p.map(w=>5-mast(w.ca));let r=Math.random()*wts.reduce((a,b)=>a+b,0),i=0;
    for(;i<p.length-1;i++){r-=wts[i];if(r<=0)break}
    const w=p.splice(i,1)[0];const k=nfc(w.es);if(es[k]||es['#'+w.ca])continue;es[k]=1;out.push(w)}
  return out}
const LSM={};LESSONS.forEach(l=>LSM[l.id]=l);
const ART=/^(el|la|l'|els|les|un|una)\s*/i;
const DIC=[];(function(){const seen=new Set();
  const add=(ca,es,em,kind,ref)=>{const k=norm(ca);if(!k||seen.has(k))return;seen.add(k);DIC.push({ca,es,em:em||'',kind:kind||'',ref:ref||'',n1:k,n2:norm(ca.replace(ART,'')),n3:norm(es)})};
  Object.keys(VERBS).forEach(i=>{const v=VERBS[i];add(i,v.es,'🔧','v',i)});
  WORDS.forEach(w=>add(w.ca,w.es,w.em,'w',w.th));
  (Array.isArray(DICT_RAW)?DICT_RAW:DICT_RAW.trim().split('\n')).forEach(l=>{const p=l.split('|');if(p.length>=2)add(p[0].trim(),p[1].trim(),'','d')})})();


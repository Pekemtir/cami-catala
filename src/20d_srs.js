/* ===== repetición espaciada: las palabras falladas o nuevas vuelven a los 1, 3, 7, 21 y 45 días ===== */
const INTV=[1,3,7,21,45];
const dnum=()=>{const d=new Date();return Math.floor((d.getTime()-d.getTimezoneOffset()*6e4)/864e5)};
function srsMark(k,ok){if(!k||!WM[k])return;const T=dnum();S.srs=S.srs||{};const r=S.srs[k];
  if(ok){if(r&&r.d>T)return;const i=(r?r.i:0)+1;S.srs[k]={i:i,d:T+INTV[Math.min(i-1,INTV.length-1)]}}
  else S.srs[k]={i:0,d:T+1}}
function srsDue(){const T=dnum(),s=S.srs||{};return Object.keys(s).filter(k=>s[k].d<=T&&WM[k]).sort((a,b)=>s[a].d-s[b].d).map(k=>WM[k])}
function srsCard(){const n=srsDue().length;
  return n?'<button class="lrow" data-a="srs" style="border-color:var(--yel)"><span class="ic">🧠</span><span class="grow"><small>Repàs espaiat</small><b>'+n+' paraules per avui</b><small>Tornen als 1, 3, 7 i 21 dies</small></span><span>▶</span></button>':''}
ACT.srs=()=>{const w=srsDue().slice(0,10);if(!w.length){toast('Res per repassar avui. Bona feina!');return}
  const qs=w.map(x=>vq(x)).filter(Boolean);startSession(qs,{per:8,bonus:10})};

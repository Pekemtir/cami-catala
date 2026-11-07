/* ===== AYUDAS PARA ESCRIBIR LECCIONES ===== */
const LESSONS=[];
const mt=(h,r)=>'<table class="mini"><tr>'+h.map(x=>'<th>'+x+'</th>').join('')+'</tr>'+r.map(row=>'<tr>'+row.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</table>';
const c=(p,a,w,e,h)=>({k:'choice',p,ans:a,opts:w,e:e||'',h:h||''});
const t=(p,a,e,h)=>({k:'type',p,ans:a,e:e||'',h:h||''});
const b=(es,tok,extra,tip)=>({k:'build',es,tok:tok.split(' '),extra:extra?extra.split(' '):[],tip:tip||''});
const ls=(p,a,w,e)=>({k:'listen',p:p,ans:a,opts:w,e:e||''});
const ESR=[[/\bparticipis\b/g,'participios'],[/\bparticipi\b/g,'participio'],[/\binfinitiu\b/g,'infinitivo'],[/\bgerundi\b/g,'gerundio'],[/\bindicatiu\b/g,'indicativo'],[/\blliçons\b/g,'lecciones'],[/\blliçó\b/g,'lección'],[/\bveurás\b/g,'verás']];
function esx(s){if(!s)return s;return String(s).split(/(<b>.*?<\/b>)/).map((p,i)=>i%2?p:ESR.reduce((a,r)=>a.replace(r[0],r[1]),p)).join('')}
function L(n,lv,ca,es,ic,min,goals,steps,kw,qs,th){
  qs.forEach(q=>{if(q.e)q.e=esx(q.e);if(q.h)q.h=esx(q.h);if(q.tip)q.tip=esx(q.tip)});
  LESSONS.push({id:lv+n,n,lv,ca,es,ic,min,goals:goals.map(esx),steps:steps.map(s=>({t:s[0],h:esx(s[1]),tb:s[2]||'',ex:s[3]||[],tip:esx(s[4]||'')})),kw,qs,th:th?[].concat(th):[]});
}



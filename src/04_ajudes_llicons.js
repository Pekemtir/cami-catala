/* ===== AYUDAS PARA ESCRIBIR LECCIONES ===== */
const LESSONS=[];
const mt=(h,r)=>'<table class="mini"><tr>'+h.map(x=>'<th>'+x+'</th>').join('')+'</tr>'+r.map(row=>'<tr>'+row.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</table>';
const c=(p,a,w,e,h)=>({k:'choice',p,ans:a,opts:w,e:e||'',h:h||''});
const t=(p,a,e,h)=>({k:'type',p,ans:a,e:e||'',h:h||''});
const b=(es,tok,extra,tip)=>({k:'build',es,tok:tok.split(' '),extra:extra?extra.split(' '):[],tip:tip||''});
const ls=(p,a,w,e)=>({k:'listen',p:p,ans:a,opts:w,e:e||''});
function L(n,lv,ca,es,ic,min,goals,steps,kw,qs,th){
  LESSONS.push({id:lv+n,n,lv,ca,es,ic,min,goals,steps:steps.map(s=>({t:s[0],h:s[1],tb:s[2]||'',ex:s[3]||[],tip:s[4]||''})),kw,qs,th:th?[].concat(th):[]});
}


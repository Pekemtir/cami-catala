/* ===== TESTS DE NIVEL ===== */
const TB={a1:{n:'A1',blocks:[['Bases i presentacions',1,6],['Present i verbs',7,12],['Preguntar i vida quotidiana',13,19],['Passat i serveis',20,26]]},
a2:{n:'A2',blocks:[['Passats',1,6],['Pronoms i futur',7,12],['Comparar, condicional i subjuntiu',13,18],['Opinions, connectors i vida real',19,24]]}};
V.tests=()=>{let h='<h1>Test de nivell</h1><p>40 preguntes en 4 blocs. Per aprovar cal un <b>90 %</b> total i un mínim del <b>75 %</b> a cada bloc. Sense ajudes ni explicacions fins al final. Si no aproves, pots tornar-ho a provar passades 24 hores.</p>';
  ['a1','a2'].forEach(lv=>{const r=S.tests[lv];h+='<div class="card"><h3>Test '+TB[lv].n+'</h3>'+(r?'<div>'+(r.pass?'<span class="ok">✓ Aprovat</span>':'<span class="err">No aprovat</span>')+' · '+r.pct+' % · '+esc(r.date)+'</div>'+(!r.pass&&r.next>Date.now()?'<div class="muted">Podràs tornar-ho a provar a partir de '+new Date(r.next).toLocaleString('ca-ES')+'.</div>':''):'<div class="muted">Encara no l\'has fet.</div>')+'<button class="btn block" style="margin-top:10px" data-a="tstart" data-v="'+lv+'">Comença el test '+TB[lv].n+'</button></div>'});return h};
ACT.tstart=lv=>{const r=S.tests[lv];if(r&&!r.pass&&r.next>Date.now()){toast('Encara no pots repetir el test (24 h)');return}
  const qs=[];TB[lv].blocks.forEach((b,bi)=>{const cand=[];LESSONS.filter(l=>l.lv===lv&&l.n>=b[1]&&l.n<=b[2]).forEach(l=>l.qs.forEach((q,i)=>{if(q.k==='choice'||q.k==='type'||q.k==='build')cand.push([l.id,i])}));
    pick(cand,10).forEach(c=>{const q=lq(c[0],c[1]);q.blk=bi;q.kind='Bloc '+(bi+1)+' · '+b[0];qs.push(q)})});
  startSession(qs,{test:1,per:2,noRetry:1,onDone:r2=>{const tot=r2.acc;const bl=TB[lv].blocks.map((b,i)=>{const x=r2.blk[i]||{ok:0,tot:0};return{n:b[0],p:pct(x.ok,x.tot)}});
    const pass=tot>=.9&&bl.every(b=>b.p>=75);const first=!(S.tests[lv]&&S.tests[lv].pass);
    S.tests[lv]={pass:pass||(S.tests[lv]&&S.tests[lv].pass)||false,pct:Math.round(tot*100),date:today(),next:pass?0:Date.now()+864e5,blocks:bl};
    if(!pass&&S.tests[lv].pass)S.tests[lv].next=0;
    r2.html='<h3>'+(pass?'🎓 Test '+TB[lv].n+' aprovat!':'Encara no')+'</h3>'+bl.map(b=>'<div class="res"><span>'+esc(b.n)+'</span><b class="'+(b.p>=75?'ok':'err')+'">'+b.p+' %</b></div>').join('')+(pass?'':'<p class="muted">Cal 90 % total i 75 % a cada bloc. Repassa les lliçons dels blocs en vermell i torna-ho a provar d\'aquí 24 hores.</p>');
    if(pass&&first)addXP(100);save();checkBadges()}})};

/* ===== TESTS DE NIVEL ===== */
const TB={a1:{n:'A1',blocks:[['Bases i presentacions',1,6],['Present i verbs',7,12],['Preguntar i vida quotidiana',13,19],['Passat i serveis',20,26]]},
a2:{n:'A2',blocks:[['Passats',1,6],['Pronoms i futur',7,12],['Comparar, condicional i subjuntiu',13,18],['Opinions, connectors i vida real',19,24]]}};
V.tests=()=>{let h='<h1>Test de nivell</h1><p>40 preguntes en 4 blocs. Per aprovar cal un <b>90 %</b> d\'encerts (36 de 40). Sense ajudes ni explicacions fins al final. Només es pot fer <b>un test cada 24 hores</b>. Aprovar el test d\'A1 obre les lliçons d\'A2 (també s\'obren en acabar l\'A1 o amb el codi d\'accés).</p>';
  ['a1','a2'].forEach(lv=>{const r=S.tests[lv];h+='<div class="card"><h3>Test '+TB[lv].n+'</h3>'+(r?'<div>'+(r.pass?'<span class="ok">✓ Aprovat</span>':'<span class="err">No aprovat</span>')+' · '+r.pct+' % · '+esc(r.date)+'</div>'+(r.next>Date.now()&&!S.set.tkey?'<div class="muted">Podràs fer un altre test a partir de '+new Date(r.next).toLocaleString('ca-ES')+'.</div>':''):'<div class="muted">Encara no l\'has fet.</div>')+'<button class="btn block" style="margin-top:10px" data-a="tstart" data-v="'+lv+'">Comença el test '+TB[lv].n+'</button></div>'});return h};
ACT.tstart=lv=>{const r=S.tests[lv];if(lv==='a2'&&!a2Open()){toast('🔒 Primer has d\'obrir l\'A2: acaba l\'A1 o aprova el test d\'A1');return}
  if(r&&r.next>Date.now()&&!S.set.tkey){toast('Només es pot fer un test cada 24 hores');return}
  const qs=[];TB[lv].blocks.forEach((b,bi)=>{const cand=[];LESSONS.filter(l=>l.lv===lv&&l.n>=b[1]&&l.n<=b[2]).forEach(l=>l.qs.forEach((q,i)=>{if(q.k==='choice'||q.k==='type'||q.k==='build')cand.push([l.id,i])}));
    pick(cand,10).forEach(c=>{const q=lq(c[0],c[1]);q.blk=bi;q.kind='Bloc '+(bi+1)+' · '+b[0];qs.push(q)})});
  startSession(qs,{test:1,per:2,noRetry:1,onDone:r2=>{const tot=r2.acc;const bl=TB[lv].blocks.map((b,i)=>{const x=r2.blk[i]||{ok:0,tot:0};return{n:b[0],p:pct(x.ok,x.tot)}});
    const pass=tot>=.9;const first=!(S.tests[lv]&&S.tests[lv].pass);
    S.tests[lv]={pass:pass||(S.tests[lv]&&S.tests[lv].pass)||false,pct:Math.round(tot*100),date:today(),next:Date.now()+864e5,blocks:bl};
    r2.html='<h3>'+(pass?'🎓 Test '+TB[lv].n+' aprovat!':'Encara no')+'</h3>'+bl.map(b=>'<div class="res"><span>'+esc(b.n)+'</span><b class="'+(b.p>=90?'ok':'err')+'">'+b.p+' %</b></div>').join('')+(pass?'':'<p class="muted">Cal un 90 % d\'encerts (36 de 40). Repassa les lliçons dels blocs més fluixos i torna-ho a provar d\'aquí 24 hores.</p>');
    if(pass&&first)addXP(100);save();checkBadges()}})};

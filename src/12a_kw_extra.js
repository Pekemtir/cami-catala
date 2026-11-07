/* ===== v12.1 · auditoría «nada se pregunta antes de enseñarse»: palabras clave añadidas a lecciones que preguntan vocabulario enseñado más tarde ===== */
(function(){const X={
a17:[['la biblioteca','la biblioteca'],['el dinar','la comida (del mediodía)'],['preparar','preparar']],
a19:[['el sopar','la cena'],['la compra','la compra (de comida)']],
a112:[['de seguida','enseguida'],['de pressa','deprisa']],
a113:[['malalt','enfermo']],
a115:[['marxar','irse, marcharse']],
a117:[['el gelat / els gelats','el helado / los helados']],
a124:[['la fulla','la hoja'],['cau','cae (caer)']]};
Object.keys(X).forEach(id=>{const l=LESSONS.find(x=>x.id===id);if(l)X[id].forEach(k=>{if(!l.kw.some(z=>z[0]===k[0]))l.kw.push(k)})})})();

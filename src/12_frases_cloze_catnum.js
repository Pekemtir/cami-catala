/* ===== FRASES PARA CONSTRUIR (originales) y COMPLEMENTOS PARA CLOZE ===== */
const SENT=[];
function SN(lv,s){s.trim().split('\n').forEach(l=>{const p=l.split('|');if(p.length<3)return;SENT.push({lv,es:p[0],t:p[1].trim().split(' '),x:p[3]?p[3].trim().split(' '):[],tip:p[2]})})}
SN('a1',`
Me llamo Marta|em dic Marta|Dir-se: em dic.
Soy de Valencia|sóc de València|Ser + de + lugar.
Tengo veinte años|tinc vint anys|La edad con tenir.
Vivo con mi hermana|visc amb la meva germana|Possessiu amb article: la meva.
Tu casa es muy grande|la teva casa és molt gran|Possessiu: la teva.
Mi padre trabaja en un banco|el meu pare treballa en un banc|Treballar en + lloc.
¿Dónde vives?|on vius|On + verb.
¿Cómo te llamas?|com et dius|Com et dius?
¿Qué hora es?|quina hora és|Quina hora és?
Hay un parque cerca|hi ha un parc a prop|Hi ha = hay.
El gato está debajo de la mesa|el gat és sota la taula|Sota = debajo.
La cocina es pequeña|la cuina és petita|Adjectiu femení: petita.
Quiero un café con leche|vull un cafè amb llet|Vull = quiero.
¿Cuánto cuesta este pan?|quant costa aquest pa|Quant costa?
Compro fruta en el mercado|compro fruita al mercat|a + el = al.
No tengo hambre|no tinc gana|Tenir gana.
Hoy hace calor|avui fa calor|Fa calor.
Mañana llueve|demà plou|Plou = llueve.
Me levanto a las siete|em llevo a les set|Verb pronominal.
Desayuno a las ocho|esmorzo a les vuit|Esmorzar.
Salimos de casa a las nueve|sortim de casa a les nou|Sortir de.
Trabajamos de lunes a viernes|treballem de dilluns a divendres|De… a…
Ceno con mi familia|sopo amb la meva família|Sopar.
Me gusta mucho el cine|m'agrada molt el cinema|Agradar + singular.
Nos gustan los gatos|ens agraden els gats|Agradar + plural.
Tengo que estudiar|he d'estudiar|Haver de.
Hay que pagar antes de salir|cal pagar abans de sortir|Cal + inf.
¿Puedo entrar?|puc entrar|Poder.
Vamos al cine|anem al cinema|Anar + a + el.
Voy a la escuela en autobús|vaig a l'escola en autobús|Anar en + transport.
Me duele la cabeza|em fa mal el cap|Fer mal.
Tengo fiebre|tinc febre|Tenir + malaltia.
Gira a la derecha|gira a la dreta|Imperatiu.
Sigue todo recto|continua tot recte|Continuar tot recte.
La estación está al lado del banco|l'estació és al costat del banc|Contracció del.
Esta casa es muy bonita|aquesta casa és molt bonica|Aquesta = esta.
Hoy he comido pasta|avui he menjat pasta|Perfet.
Hemos visto una película|hem vist una pel·lícula|Participi irregular: vist.
Todavía no he cenado|encara no he sopat|Encara no.
Hace dos años que vivo aquí|fa dos anys que visc aquí|Fa… que.
Mi madre es alta y delgada|la meva mare és alta i prima|Concordància.
Los niños juegan en el parque|els nens juguen al parc|Jugar a.
Mis amigos son muy simpáticos|els meus amics són molt simpàtics|Els meus.
Quiero ver a mis abuelos|vull veure els meus avis|Voler + inf.
No hablo francés|no parlo francès|Negació amb no.
El tren sale a las cinco|el tren surt a les cinc|Sortir.
Necesito un billete|necessito un bitllet|Necessitar.
Perdone, ¿dónde está el banco?|perdoni on és el banc|Perdoni = formal.
Me gusta correr por la mañana|m'agrada córrer pel matí|per + el = pel.
Mi cumpleaños es en mayo|el meu aniversari és al maig|En mes.
En verano voy a la playa|a l'estiu vaig a la platja|A l'estiu.
`);
SN('a2',`
Ayer fui al médico|ahir vaig anar al metge|Perifràstic: vaig anar.
El año pasado viajamos a Italia|l'any passat vam viatjar a Itàlia|Perifràstic: vam viatjar.
Esta semana he trabajado mucho|aquesta setmana he treballat molt|Perfet.
Cuando era niña vivía en Girona|quan era nena vivia a Girona|Imperfet.
Hacía frío y llovía|feia fred i plovia|Imperfet descriptiu.
Mañana vendré a tu casa|demà vindré a casa teva|Futur: vindré.
El mes que viene tendremos vacaciones|el mes que ve tindrem vacances|Futur: tindrem.
Voy a comprarlo|vaig a comprar-lo|Pronom darrere l'infinitiu.
Lo tengo en casa|el tinc a casa|Pronom abans del verbo.
Dame el libro|dona'm el llibre|Imperatiu + pronom.
No me lo digas|no m'ho diguis|No + subjuntiu.
Te lo doy mañana|te'l dono demà|Combinació te'l.
Tengo dos hermanos|en tinc dos|En de quantitat.
Voy allí cada día|hi vaig cada dia|Hi = allà.
Es más alto que yo|és més alt que jo|Més… que.
Ella es tan simpática como tú|ella és tan simpàtica com tu|Tan… com.
Querría un café, por favor|voldria un cafè si us plau|Cortesia: voldria.
Deberías descansar|hauries de descansar|Consell.
Quiero que vengas|vull que vinguis|Vull que + subjuntiu.
Espero que estés bien|espero que estiguis bé|Espero que + subjuntiu.
No creo que sea fácil|no crec que sigui fàcil|No crec que + subjuntiu.
Acabo de llegar|acabo d'arribar|Acabar de + inf.
Estoy leyendo un libro|estic llegint un llibre|Estar + gerundi.
Empieza a llover|comença a ploure|Començar a.
Pienso en ti|penso en tu|Pensar en.
Depende del tiempo|depèn del temps|Dependre de.
Aunque llueva, saldremos|encara que plogui sortirem|Encara que + subj.
Como llueve, me quedo en casa|com que plou em quedo a casa|Com que + causa.
Es un regalo para ti|és un regal per a tu|Per a = destinatari.
Gracias por tu ayuda|gràcies per la teva ajuda|Per = causa.
El libro que leo es interesante|el llibre que llegeixo és interessant|Que = relatiu.
La ciudad donde vivo es pequeña|la ciutat on visc és petita|On = relatiu de lloc.
Me parece una buena idea|em sembla una bona idea|Em sembla.
Estoy de acuerdo contigo|estic d'acord amb tu|D'acord amb.
Tengo una reserva a nombre de Pau|tinc una reserva a nom de Pau|A nom de.
¿A qué hora sale el próximo tren?|a quina hora surt el proper tren|Surt.
Quisiera pedir cita en el CAP|voldria demanar hora al cap|Demanar hora.
Tomé un café y salí|vaig prendre un cafè i vaig sortir|Perifràstic.
Habíamos terminado antes de cenar|havíem acabat abans de sopar|Plusquamperfet.
Si tuviera tiempo, viajaría|si tingués temps viatjaria|Imperfet de subjuntiu + condicional.
Todos los alumnos están contentos|tots els alumnes estan contents|Tots els.
Hay demasiado ruido|hi ha massa soroll|Massa.
Mi vecina es mayor|la meva veïna és gran|Gran = mayor.
Ayer vi una serie muy buena|ahir vaig veure una sèrie molt bona|Veure: vaig veure.
Escribí un correo al director|vaig escriure un correu al director|Escriure.
No pude dormir|no vaig poder dormir|No vaig poder.
`);
/* complementos para ejercicios de completar */
const VC={parlar:'català amb els amics',treballar:'en una oficina',estudiar:'a la biblioteca',cantar:'una cançó',ballar:'a la festa',escoltar:'música',mirar:'la televisió',cuinar:'el sopar',comprar:'pa',pagar:'amb targeta',buscar:'les claus',trobar:'la clau',tornar:'a casa',entrar:'a la botiga',pujar:'les escales',baixar:'del tren',girar:'a la dreta',passar:'per aquí',esperar:'l\'autobús',ajudar:'un amic',explicar:'la lliçó',trucar:'a la mare',viatjar:'a Itàlia',jugar:'a futbol',nedar:'a la piscina',caminar:'pel parc',dinar:'a casa',sopar:'a les nou',esmorzar:'cafè amb llet',començar:'a les nou',acabar:'la feina',canviar:'de feina',preparar:'el menjar',portar:'una bossa',tocar:'la guitarra',visitar:'el museu',llogar:'un pis',guanyar:'el partit',pensar:'en el futur',recordar:'aquell dia',arribar:'tard',quedar:'amb els amics',tancar:'la porta',utilitzar:'el mòbil',netejar:'la casa',convidar:'els amics',celebrar:'l\'aniversari',acompanyar:'un amic',reservar:'una taula',enviar:'un correu',menjar:'una poma',llegir:'el diari',servir:'el cafè',preferir:'el te',decidir:'quedar-se',repetir:'la frase',seguir:'el camí',dormir:'vuit hores',sentir:'música',sortir:'de casa',obrir:'la porta',collir:'flors',omplir:'el got',ser:'molt simpàtic',estar:'a casa',tenir:'una germana',anar:'a la feina',fer:'els deures',poder:'venir',voler:'un cafè',saber:'la resposta',dir:'la veritat',veure:'una pel·lícula',venir:'amb nosaltres',dur:'una motxilla',beure:'aigua',viure:'a Girona',escriure:'una carta',rebre:'un correu',perdre:'les claus',vendre:'pa',prendre:'un cafè',entendre:'el problema',treure:'la brossa',riure:'molt',moure:'la cadira',conèixer:'la ciutat',córrer:'pel parc',seure:'al sofà',resoldre:'el problema','dutxar-se':'abans de sopar','llevar-se':'a les set','rentar-se':'les mans','vestir-se':'de pressa','trobar-se':'bé','divertir-se':'molt','adormir-se':'de seguida','queixar-se':'del soroll'};
const CLOZE_FRAMES={pres:['','cada dia'],perf:['Avui',''],perif:['Ahir',''],imp:['Abans',''],fut:['Demà',''],cond:['Si pogués,',''],subj:['Vull que','']};
/* números en catalán */
const U=['zero','un','dos','tres','quatre','cinc','sis','set','vuit','nou','deu','onze','dotze','tretze','catorze','quinze','setze','disset','divuit','dinou'];
const DEC=['','','vint','trenta','quaranta','cinquanta','seixanta','setanta','vuitanta','noranta'];
function catNum(n){
  if(n<20)return U[n];
  if(n<30)return n===20?'vint':'vint-i-'+U[n-20];
  if(n<100){const d=Math.floor(n/10),u=n%10;return u?DEC[d]+'-'+U[u]:DEC[d]}
  if(n<1000){const c=Math.floor(n/100),r=n%100;const h=c===1?'cent':U[c]+'-cents';return r?h+' '+catNum(r):h}
  if(n<1000000){const m=Math.floor(n/1000),r=n%1000;const h=m===1?'mil':catNum(m)+' mil';return r?h+' '+catNum(r):h}
  return String(n);
}


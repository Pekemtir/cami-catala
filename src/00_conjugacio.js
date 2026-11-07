
(function(){
/* ===== MOTOR DE CONJUGACIÓN (reglas + irregulares) ===== */
const PRON=['jo','tu','ell / ella / vostè','nosaltres','vosaltres','ells / elles / vostès'];
const PRON_ES=['yo','tú','él / ella / usted','nosotros','vosotros','ellos / ellas / ustedes'];
const PRON_S=['jo','tu','ell','nosaltres','vosaltres','ells'];
const HAVER=['he','has','ha','hem','heu','han'];
const VAIG=['vaig','vas','va','vam','vau','van'];
const vow=/^[aeiouàèéíòóúïüh]/i;
function fx(s,end,ar){
  if(/^[eiéèí]/.test(end)){
    if(/c$/.test(s))return s.slice(0,-1)+'qu'+end;
    if(/g$/.test(s))return s+'u'+end;
    if(/ç$/.test(s))return s.slice(0,-1)+'c'+end;
    if(ar&&/gu$/.test(s))return s.slice(0,-2)+'gü'+end;
    if(ar&&/j$/.test(s))return s.slice(0,-1)+'g'+end;
  }
  return s+end;
}
const rowAr=s=>[s+'o',fx(s,'es',1),s+'a',fx(s,'em',1),fx(s,'eu',1),fx(s,'en',1)];
const rowInc=s=>[s+'eixo',s+'eixes',s+'eix',s+'im',s+'iu',s+'eixen'];
const rowIr=s=>[s+'o',s+'s',s,s+'im',s+'iu',s+'en'];
const sbAr=s=>[fx(s,'i',1),fx(s,'is',1),fx(s,'i',1),fx(s,'em',1),fx(s,'eu',1),fx(s,'in',1)];
const sbInc=s=>[s+'eixi',s+'eixis',s+'eixi',s+'im',s+'iu',s+'eixin'];
const sbIr=s=>[s+'i',s+'is',s+'i',s+'im',s+'iu',s+'in'];
const imA=s=>[s+'ava',s+'aves',s+'ava',s+'àvem',s+'àveu',s+'aven'];
const imI=s=>[s+'ia',s+'ies',s+'ia',s+'íem',s+'íeu',s+'ien'];
const imV=s=>{const a=s.slice(0,-1),l=s.slice(-1),acc={e:'è',u:'ú',i:'í'}[l]||l;return[s+'ia',s+'ies',s+'ia',a+acc+'iem',a+acc+'ieu',s+'ien']};
const FUE=['é','às','à','em','eu','an'],COE=['ia','ies','ia','íem','íeu','ien'];
/* kind: ar | inc | ir | x (irregular/explicit). o = overrides */
const VERBS={};
function addV(inf,es,kind,o){
  o=o||{};let pn=false,base=inf;
  if(/-se$/.test(inf)){pn=true;base=inf.replace(/-se$/,'')}
  const stem=base.replace(/(ar|ir|er|re)$/,'');
  const v={inf,es,kind,pn,base,o};
  let pr,sb,im,fut;
  if(kind==='ar'){pr=rowAr(stem);sb=sbAr(stem);im=imA(stem);fut=base}
  else if(kind==='inc'){pr=rowInc(stem);sb=sbInc(stem);im=imI(stem);fut=base}
  else if(kind==='ir'){pr=rowIr(stem);sb=sbIr(stem);im=imI(stem);fut=base}
  else{pr=o.pr;sb=o.sb;im=o.im||imI(o.ims);fut=o.fut||base.replace(/re$/,'r').replace(/^(.*[^r])r$/,'$1r')}
  if(o.pr)pr=o.pr;if(o.sb)sb=o.sb;if(o.im)im=o.im;
  if(o.fut)fut=o.fut;else if(/re$/.test(base))fut=base.slice(0,-1);
  const pp=o.pp||(kind==='ar'?stem+'at':(kind==='x'&&/re$|er$/.test(base)?stem+'ut':stem+'it'));
  const ip=o.ip===null?null:[o.ip||pr[2],sb[2],sb[3],sb[4],sb[5]];
  v.T={
    pres:pr,
    perf:HAVER.map(h=>h+' '+pp),
    perif:VAIG.map(h=>h+' '+base),
    imp:im,
    fut:FUE.map(e=>fut+e),
    cond:COE.map(e=>fut+e),
    subj:sb
  };
  if(ip)v.T.imper=ip;
  v.pp=pp;v.fut=fut;
  if(pn)pnize(v);
  VERBS[inf]=v;return v;
}
const PNP=['em','et','es','ens','us','es'];
function pnForm(i,f){const p=PNP[i];if(vow.test(f)&&(i<3||i===5)&&p!=='ens')return{em:'m\'',et:'t\'',es:'s\''}[p]+f;return p+' '+f}
function pnize(v){
  const T=v.T,N={};
  ['pres','imp','fut','cond','subj'].forEach(k=>{N[k]=T[k].map((f,i)=>pnForm(i,f))});
  N.perf=T.perf.map((f,i)=>{const [h,p]=f.split(' ');return pnForm(i,h)+' '+p});
  N.perif=T.perif.map((f,i)=>{const p=f.split(' ');return pnForm(i,p[0])+' '+p[1]});
  if(T.imper){
    const f=T.imper,e=x=>/[aeiouàèéíòóú]$/.test(x);
    N.imper=[e(f[0])?f[0]+'\'t':f[0]+'-te',e(f[1])?f[1]+'\'s':f[1]+'-se',f[2]+'-nos',f[3]+'-vos',f[4]+'-se'];
  }
  v.T=N;
}
const VT_NAMES={pres:['Present','Present d\'indicatiu','Lo que haces ahora o sueles hacer'],perf:['Perfet','Passat perfet','Acción pasada ya hecha, con «he/has/ha…»'],perif:['Perifràstic','Passat perifràstic','Pasado con «vaig/vas/va… + infinitivo»'],imp:['Imperfet','Passat imperfet','Pasado habitual o descripción: «parlava»'],fut:['Futur','Futur simple','Lo que harás: «parlaré»'],cond:['Condicional','Condicional simple','«parlaria»: cortesía, consejos, hipótesis'],subj:['Subjuntiu','Present de subjuntiu','Después de «vull que», «cal que», «espero que»…'],imper:['Imperatiu','Imperatiu','Órdenes y consejos: tu, vostè, nosaltres, vosaltres, vostès']};
const IMPER_P=['tu','vostè','nosaltres','vosaltres','vostès'];
const IMPER_ES=['tú','usted','nosotros','vosotros','ustedes'];
/* ---- verbos regulares en -ar ---- */
`parlar:hablar|menjar:comer|cantar:cantar|treballar:trabajar|estudiar:estudiar|ballar:bailar|escoltar:escuchar|mirar:mirar|cuinar:cocinar|comprar:comprar|pagar:pagar|buscar:buscar|trobar:encontrar|tornar:volver|entrar:entrar|pujar:subir|baixar:bajar|girar:girar|passar:pasar|esperar:esperar|ajudar:ayudar|demanar:pedir, preguntar|explicar:explicar|trucar:llamar por teléfono|viatjar:viajar|jugar:jugar|nedar:nadar|caminar:caminar|dinar:comer (al mediodía)|sopar:cenar|esmorzar:desayunar|començar:empezar|acabar:acabar|cridar:llamar, gritar|canviar:cambiar|preparar:preparar|ensenyar:enseñar, mostrar|portar:llevar, traer|tocar:tocar|dibuixar:dibujar|visitar:visitar|llogar:alquilar|guanyar:ganar|gastar:gastar|fumar:fumar|pensar:pensar|recordar:recordar|oblidar:olvidar|necessitar:necesitar|desitjar:desear|utilitzar:utilizar|arribar:llegar|quedar:quedar, citarse|tancar:cerrar|continuar:continuar|aprofitar:aprovechar|practicar:practicar|organitzar:organizar|decorar:decorar|netejar:limpiar|rentar:lavar|convidar:invitar|felicitar:felicitar|celebrar:celebrar|acompanyar:acompañar|avisar:avisar|reservar:reservar|aparcar:aparcar|enviar:enviar|rebutjar:rechazar|lliurar:entregar|calcular:calcular|completar:completar|descansar:descansar|passejar:pasear|cercar:buscar|llegar_:x`.split('|').filter(x=>!/_/.test(x)).forEach(x=>{const [a,b]=x.split(':');addV(a,b,'ar')});
/* pronominales en -ar */
`dutxar-se:ducharse|llevar-se:levantarse|rentar-se:lavarse|pentinar-se:peinarse|afaitar-se:afeitarse|maquillar-se:maquillarse|trobar-se:encontrarse, sentirse|queixar-se:quejarse|preocupar-se:preocuparse|casar-se:casarse|despertar-se:despertarse|quedar-se:quedarse|alçar-se:levantarse|acostar-se:acostarse|adonar-se:darse cuenta`.split('|').forEach(x=>{const [a,b]=x.split(':');addV(a,b,'ar')});
/* incoatius -eixo */
`llegir:leer|servir:servir|preferir:preferir|partir:partir, irse|unir:unir|definir:definir|complir:cumplir|decidir:decidir|garantir:garantizar|repetir:repetir|seguir:seguir|establir:establecer|obeir:obedecer|patir:sufrir|finir:acabar_|dirigir:dirigir|agrair:agradecer|ordenar_:x`.split('|').filter(x=>!/_/.test(x)).forEach(x=>{const [a,b]=x.split(':');addV(a,b,'inc')});
`vestir-se:vestirse|divertir-se:divertirse|aixecar_:x`.split('|').filter(x=>!/_/.test(x)).forEach(x=>{const [a,b]=x.split(':');addV(a,b,'inc')});
`dormir:dormir|sentir:sentir|adormir-se:dormirse|bullir:hervir_`.split('|').filter(x=>!/_/.test(x)).forEach(x=>{const [a,b]=x.split(':');addV(a,b,'ir')});
/* irregulares y de 2.ª conjugación: filas explícitas */
const X=(inf,es,pr,pp,ims,fut,sb,ip,extra)=>addV(inf,es,'x',Object.assign({pr:pr.split(' '),pp,ims,fut,sb:sb.split(' '),ip},extra||{}));
X('ser','ser',"sóc ets és som sou són",'estat',null,'ser',"sigui siguis sigui siguem sigueu siguin",'sigues',{im:['era','eres','era','érem','éreu','eren']});
X('estar','estar, estarse',"estic estàs està estem esteu estan",'estat','est','estar',"estigui estiguis estigui estiguem estigueu estiguin",'estigues',{im:imA('est')});
X('haver','haber (auxiliar)',"he has ha hem heu han",'hagut','hav','haur',"hagi hagis hagi hàgim hàgiu hagin",null);
X('tenir','tener',"tinc tens té tenim teniu tenen",'tingut','ten','tindr',"tingui tinguis tingui tinguem tingueu tinguin",'tingues');
X('anar','ir',"vaig vas va anem aneu van",'anat','an','anir',"vagi vagis vagi anem aneu vagin",'ves',{im:imA('an')});
X('fer','hacer',"faig fas fa fem feu fan",'fet',null,'far',"faci facis faci fem feu facin",'fes',{im:imV('fe')});
X('poder','poder',"puc pots pot podem podeu poden",'pogut','pod','podr',"pugui puguis pugui puguem pugueu puguin",null);
X('voler','querer',"vull vols vol volem voleu volen",'volgut','vol','voldr',"vulgui vulguis vulgui vulguem vulgueu vulguin",'vulgues');
X('saber','saber',"sé saps sap sabem sabeu saben",'sabut','sab','sabr',"sàpiga sàpigues sàpiga sapiguem sapigueu sàpiguen",'sàpigues');
X('dir','decir',"dic dius diu diem dieu diuen",'dit',null,'dir',"digui diguis digui diguem digueu diguin",'digues',{im:imV('de')});
X('veure','ver',"veig veus veu veiem veieu veuen",'vist',null,'veur',"vegi vegis vegi vegem vegeu vegin",'veges',{im:imV('ve')});
X('venir','venir',"vinc véns ve venim veniu vénen",'vingut','ven','vindr',"vingui vinguis vingui vinguem vingueu vinguin",'vine');
X('dur','llevar, traer',"duc duus duu duem dueu duen",'dut',null,'duur',"dugui duguis dugui duguem dugueu duguin",'duu',{im:['duia','duies','duia','dúiem','dúieu','duien']});
X('beure','beber',"bec beus beu bevem beveu beuen",'begut','bev','beur',"begui beguis begui beguem begueu beguin",'beu');
X('viure','vivir',"visc vius viu vivim viviu viuen",'viscut','viv','viur',"visqui visquis visqui visquem visqueu visquin",'viu');
X('escriure','escribir',"escric escrius escriu escrivim escriviu escriuen",'escrit','escriv','escriur',"escrigui escriguis escrigui escriguem escrigueu escriguin",'escriu');
X('rebre','recibir',"rebo reps rep rebem rebeu reben",'rebut','reb','rebr',"rebi rebis rebi rebem rebeu rebin",'rep');
X('perdre','perder',"perdo perds perd perdem perdeu perden",'perdut','perd','perdr',"perdi perdis perdi perdem perdeu perdin",'perd');
X('vendre','vender',"venc vens ven venem veneu venen",'venut','vend','vendr',"vengui venguis vengui venguem vengueu venguin",'ven');
X('prendre','tomar, coger',"prenc prens pren prenem preneu prenen",'pres','pren','prendr',"prengui prenguis prengui prenguem prengueu prenguin",'pren');
X('entendre','entender',"entenc entens entén entenem enteneu entenen",'entès','enten','entendr',"entengui entenguis entengui entenguem entengueu entenguin",'entén');
X('treure','sacar, quitar',"trec treus treu traiem traieu treuen",'tret',null,'treur',"tregui treguis tregui traguem tragueu treguin",'treu',{im:imV('tre')});
X('riure','reír',"ric rius riu riem rieu riuen",'rigut',null,'riur',"rigui riguis rigui riguem rigueu riguin",'riu',{im:imV('re')});
X('moure','mover',"moc mous mou movem moveu mouen",'mogut','mov','mour',"mogui moguis mogui moguem mogueu moguin",'mou');
X('conèixer','conocer',"conec coneixes coneix coneixem coneixeu coneixen",'conegut','coneix','coneixer',"conegui coneguis conegui coneguem conegueu coneguin",'coneix');
X('córrer','correr',"corro corres corre correm correu corren",'corregut','corr','correr',"corri corris corri correm correu corrin",'corre');
X('sortir','salir',"surto surts surt sortim sortiu surten",'sortit','sort','sortir',"surti surtis surti sortim sortiu surtin",'surt');
X('obrir','abrir',"obro obres obre obrim obriu obren",'obert','obr','obrir',"obri obris obri obrim obriu obrin",'obre');
X('cobrir','cubrir',"cobreixo cobreixes cobreix cobrim cobriu cobreixen",'cobert','cobr','cobrir',"cobreixi cobreixis cobreixi cobrim cobriu cobreixin",'cobreix');
X('morir','morir',"moro mors mor morim moriu moren",'mort','mor','morir',"mori moris mori morim moriu morin",'mor');
X('collir','recoger, coger',"cull culls cull collim colliu cullen",'collit','coll','collir',"culli cullis culli collim colliu cullin",'cull');
X('omplir','llenar',"omplo omples omple omplim ompliu omplen",'omplert','ompl','omplir',"empli?".replace('empli?','ompli')+" omplis ompli omplim ompliu omplin",'omple');
X('seure','sentarse',"sec seus seu seiem seieu seuen",'segut',null,'seur',"segui seguis segui seguem segueu seguin",'seu',{im:imV('se')});
X('caldre','hacer falta',"cal cal cal cal cal cal",'calgut','cal','caldr',"calgui calgui calgui calgui calgui calgui",null);
X('resoldre','resolver',"resolc resols resol resolem resoleu resolen",'resolt','resol','resoldr',"resolgui resolguis resolgui resolguem resolgueu resolguin",'resol');
X('dissoldre','disolver',"dissolc dissols dissol dissolem dissoleu dissolen",'dissolt','dissol','dissoldr',"dissolgui dissolguis dissolgui dissolguem dissolgueu dissolguin",'dissol');
X('descobrir','descubrir',"descobreixo descobreixes descobreix descobrim descobriu descobreixen",'descobert','descobr','descobrir',"descobreixi descobreixis descobreixi descobrim descobriu descobreixin",'descobreix');


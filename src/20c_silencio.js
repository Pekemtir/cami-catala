/* ===== MODO SILENCIO =====
   Botón 🔊/🔇 en la barra superior y dentro de cada sesión (+ ajuste «Voz» en Me → Settings).
   Con el silencio activado: no suena nada, se ocultan los botones 🔊/🐢 y NO salen ejercicios que necesiten sonido:
   «Escucha y elige» se convierte en lectura («X» significa…) y los dictados/deletreos se omiten. */
const MUTED=()=>!(S.set&&S.set.voice);
const AUDKINDS=['Dictado de números','Deletreo','Dictat de números','Lletrejar'];
function silenceQs(qs){qs=qs.filter(Boolean);if(!MUTED())return qs;
  return qs.map(q=>{
    if(AUDKINDS.includes(q.kind))return null;
    if(q.hide&&q.k==='choice'&&q.say)return Object.assign({},q,{hide:0,say:'',kind:'Vocabulario',p:'«'+esc(q.say)+'» significa…'});
    if(q.hide)return null;
    return q}).filter(Boolean)}
const _ss0=startSession;
startSession=function(qs,o){qs=silenceQs(qs);if(!qs.length){toast('🔇 Este ejercicio necesita sonido: pulsa 🔇 para activarlo');return}return _ss0(qs,o)};
const _qh0=qHead;
qHead=function(q){return _qh0(q).replace('<div class="combo">','<button class="x" data-a="mute" aria-label="Sonido">'+(MUTED()?'🔇':'🔊')+'</button><div class="combo">')};
function applyMute(){try{document.body.classList.toggle('muted',MUTED());
  document.querySelectorAll('[data-a="mute"]').forEach(b=>{b.textContent=MUTED()?'🔇':'🔊';b.setAttribute('aria-pressed',MUTED()?'true':'false')})}catch(e){}}
ACT.mute=()=>{S.set.voice=!S.set.voice;if(!S.set.voice){try{speechSynthesis.cancel()}catch(e){}}save();applyMute();
  toast(MUTED()?'🔇 Silencio: sin sonido ni ejercicios de escucha':'🔊 Sonido activado');if(CUR&&CUR.v==='me')showCur()};
const _v0=ACT.voice;ACT.voice=()=>{_v0();applyMute()};
(function(){const st=document.createElement('style');
  st.textContent='body.muted .spk{display:none!important}#mutebtn{margin-left:auto;flex:none}';document.head.appendChild(st);
  const ch=document.getElementById('chips');if(ch&&ch.parentNode){const b=document.createElement('button');b.id='mutebtn';b.className='x';b.setAttribute('data-a','mute');b.setAttribute('aria-label','Sonido');ch.parentNode.insertBefore(b,ch)}
  applyMute()})();

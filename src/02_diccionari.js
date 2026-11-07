/* ===== DICCIONARIO AMPLIADO (entradas originales ca|es) ===== */
const DICT_RAW=`
l'abric|el abrigo
l'accident|el accidente
l'acord|el acuerdo
l'activitat|la actividad
l'adult / l'adulta|el adulto / la adulta
l'agenda|la agenda
l'agricultor / l'agricultora|el agricultor / la agricultora
l'aire|el aire
l'alcalde / l'alcaldessa|el alcalde / la alcaldesa
l'alumne / l'alumna|el alumno / la alumna
l'ajuda|la ayuda
l'amistat|la amistad
l'anell|el anillo
l'angoixa|la angustia
l'anunci|el anuncio
l'aparell|el aparato
l'aprenentatge|el aprendizaje
l'argument|el argumento
l'art|el arte
l'assegurança|el seguro
l'assumpte|el asunto
l'atenció|la atención
l'autopista|la autopista
l'avantatge|la ventaja
l'aventura|la aventura
l'avís|el aviso
l'àlbum|el álbum
l'àrea|el área
l'àtic|el ático
l'escriptor / l'escriptora|el escritor / la escritora
l'escultura|la escultura
l'espai|el espacio
l'esperança|la esperanza
l'estil|el estilo
l'estómac|el estómago
l'estona|el rato
l'estranger|el extranjero
l'exemple|el ejemplo
l'èxit|el éxito
l'error|el error
l'etiqueta|la etiqueta
l'idea|la idea
l'imprevist|el imprevisto
l'impost|el impuesto
l'incendi|el incendio
l'informe|el informe
l'inici|el inicio
l'instrument|el instrumento
l'interès|el interés
l'invent|el invento
l'objecte|el objeto
l'objectiu|el objetivo
l'oceà|el océano
l'olor|el olor
l'oportunitat|la oportunidad
l'ombra|la sombra
l'ordre|el orden, la orden
l'orquestra|la orquesta
l'or|el oro
l'oxigen|el oxígeno
l'hàbit|el hábito
la història|la historia
l'home|el hombre
l'honor|el honor
l'hort|el huerto
l'humor|el humor
l'orgull|el orgullo
l'ordinador portàtil|el ordenador portátil
l'unitat|la unidad
l'univers|el universo
l'ús|el uso
l'acte|el acto
el barret|el sombrero
el balcó|el balcón
el ball|el baile
el baló|el balón
el bastó|el bastón
el bebè|el bebé
el benefici|el beneficio
el bigoti|el bigote
el blat|el trigo
el bolet|la seta
el bombó|el bombón
el braçalet|la pulsera
el bressol|la cuna
el brindis|el brindis
el cable|el cable
el cacau|el cacao
el caixer|el cajero
el calçat|el calzado
el cambrer|el camarero
el camp de futbol|el campo de fútbol
el canal|el canal
el candidat|el candidato
el cansament|el cansancio
el cant|el canto
el capítol|el capítulo
el caramel|el caramelo
el càrrec|el cargo
el cas|el caso
el castell|el castillo
el catàleg|el catálogo
el cementiri|el cementerio
el cervell|el cerebro
el cicle|el ciclo
el cinturó de seguretat|el cinturón de seguridad
el circ|el circo
el clima|el clima
el club|el club
el codi|el código
el cognom|el apellido
el col·legi|el colegio
el collaret|el collar
el comerç|el comercio
el començament|el comienzo
el comiat|la despedida
el comportament|el comportamiento
el compositor|el compositor
el compromís|el compromiso
el concurs|el concurso
el conflicte|el conflicto
el coneixement|el conocimiento
el consell|el consejo
el consum|el consumo
el contacte|el contacto
el contingut|el contenido
el control|el control
el passadís|el pasillo
el cost|el coste
el cotxet|el cochecito
el crim|el crimen
el crit|el grito
el cultiu|el cultivo
el dany|el daño
el dau|el dado
el defecte|el defecto
el delicte|el delito
el desastre|el desastre
el desert|el desierto
el desig|el deseo
el desenvolupament|el desarrollo
el despertador|el despertador
el destí|el destino
el detall|el detalle
el dia festiu|el día festivo
el dia feiner|el día laborable
el diàleg|el diálogo
el disc|el disco
el disseny|el diseño
el domicili|el domicilio
el drama|el drama
el dubte|la duda
el dret|el derecho
l'efecte|el efecto
l'eix|el eje
l'element|el elemento
l'embolic|el lío
l'embús|el atasco
l'emigrant|el emigrante
l'enemic|el enemigo
l'ensenyament|la enseñanza
l'entorn|el entorno
l'entusiasme|el entusiasmo
l'esforç|el esfuerzo
l'exemplar|el ejemplar
l'expedient|el expediente
l'experiment|el experimento
el fabricant|el fabricante
el fang|el barro
el fantasma|el fantasma
el fet|el hecho
el fideu|el fideo
el fil|el hilo
el final|el final
el flam|el flan
el fons|el fondo
el format|el formato
el fred|el frío
el fruit|el fruto
el fum|el humo
el futur|el futuro
el galop|el galope
el gènere|el género
el gest|el gesto
el govern|el gobierno
el gra|el grano
el grup|el grupo
el guió|el guion
el guany|la ganancia
el gust|el gusto
l'hivernacle|el invernadero
l'hàbitat|el hábitat
l'abella reina|la abeja reina
l'absència|la ausencia
l'acció|la acción
l'activitat física|la actividad física
l'adreça electrònica|la dirección electrónica
l'agència|la agencia
l'agulla|la aguja
l'alarma|la alarma
l'alegria|la alegría
l'alimentació|la alimentación
l'alçada|la altura
l'altura|la altura
l'amenaça|la amenaza
l'ampolla d'aigua|la botella de agua
l'animació|la animación
l'antena|la antena
l'aparença|la apariencia
l'aposta|la apuesta
l'aprovació|la aprobación
l'arracada|el pendiente
l'arquitectura|la arquitectura
l'arrel|la raíz
l'artista|el / la artista
l'ascensió|la ascensión
l'aspirina|la aspirina
l'assemblea|la asamblea
l'associació|la asociación
l'atenció al client|la atención al cliente
l'atmosfera|la atmósfera
l'audició|la audición
l'autoescola|la autoescuela
l'autoritat|la autoridad
l'autoria|la autoría
l'avaluació|la evaluación
l'avinguda|la avenida
l'aigua|el agua
la bandera|la bandera
la barba|la barba
la barca|la barca
la barreja|la mezcla
la base|la base
la bateria|la batería
la beguda|la bebida
la bellesa|la belleza
la benzina|la gasolina
la biblioteca pública|la biblioteca pública
la bicicleta elèctrica|la bicicleta eléctrica
la biografia|la biografía
la bossa de plàstic|la bolsa de plástico
la botiga d'ultramarins|la tienda de ultramarinos
la branca|la rama
la broma|la broma
la brossa|la basura
la bufanda|la bufanda
la bústia de correu|el buzón de correo
la cabana|la cabaña
la cadena|la cadena
la caixa forta|la caja fuerte
la cala|la cala
la calor|el calor
la càmera de fotos|la cámara de fotos
la campana|la campana
la cançó popular|la canción popular
la capital|la capital
la carnisseria|la carnicería
la carta de vins|la carta de vinos
la casa de colònies|la casa de colonias
la catedral|la catedral
la causa|la causa
la cadira de rodes|la silla de ruedas
la celebració|la celebración
la central|la central
la cerimònia|la ceremonia
la ciència|la ciencia
la clau anglesa|la llave inglesa
la classe d'adults|la clase de adultos
la cobertura|la cobertura
la col|la col
la coliflor|la coliflor
la comarca|la comarca
la comparació|la comparación
la companyia|la compañía
la competició|la competición
la comunicació|la comunicación
la conferència|la conferencia
la confiança|la confianza
la conversa|la conversación
la cooperació|la cooperación
la corda|la cuerda
la corona|la corona
la crema solar|la crema solar
la crisi|la crisis
la cua del supermercat|la cola del supermercado
la cultura|la cultura
la cura|el cuidado, la cura
la curiositat|la curiosidad
la decisió|la decisión
la defensa|la defensa
la democràcia|la democracia
el / la dentista|el / la dentista
la descripció|la descripción
la dieta|la dieta
la diferència|la diferencia
la dificultat|la dificultad
la dimensió|la dimensión
la direcció|la dirección
la discoteca|la discoteca
la distància|la distancia
la diversió|la diversión
la divisió|la división
la documentació|la documentación
la dona gran|la mujer mayor
la dutxa|la ducha
la duració|la duración
l'economia|la economía
l'edat|la edad
l'educació|la educación
l'electricitat|la electricidad
l'emoció|la emoción
l'energia|la energía
l'entrada|la entrada
l'enquesta|la encuesta
l'entitat|la entidad
l'equivocació|la equivocación
l'escala|la escala
l'escena|la escena
l'escola d'idiomes|la escuela de idiomas
l'esperança de vida|la esperanza de vida
l'estació de metro|la estación de metro
l'estada|la estancia
l'estratègia|la estrategia
l'estructura|la estructura
l'exigència|la exigencia
l'experiència|la experiencia
l'explicació|la explicación
l'exportació|la exportación
l'expressió|la expresión
la fàbrica|la fábrica
la facilitat|la facilidad
la falta|la falta
la fama|la fama
la fira|la feria
la fitxa|la ficha
la flama|la llama
la força|la fuerza
la forma|la forma
la fortuna|la fortuna
la foto|la foto
la frase feta|la frase hecha
la freqüència|la frecuencia
la frontera|la frontera
la funció|la función
la fusta|la madera
la galeria|la galería
la gana|el hambre
la gent|la gente
la geografia|la geografía
la gota|la gota
la gramàtica|la gramática
la gratitud|la gratitud
la guàrdia|la guardia
la guerra|la guerra
la guia|la guía
la història de l'art|la historia del arte
la identitat|la identidad
la il·lusió|la ilusión
la imatge|la imagen
la importància|la importancia
la impressió|la impresión
la indústria|la industria
la informació|la información
la infraestructura|la infraestructura
la ingesta|la ingesta
la inseguretat|la inseguridad
la instal·lació|la instalación
la intel·ligència|la inteligencia
la intenció|la intención
la invitació|la invitación
la jornada|la jornada
la justícia|la justicia
la joventut|la juventud
la lectura|la lectura
la legislació|la legislación
la lletra de la cançó|la letra de la canción
la llei|la ley
la llibertat|la libertad
la llicència|la licencia
la llista|la lista
la llum del dia|la luz del día
la mà d'obra|la mano de obra
la majoria|la mayoría
la manifestació|la manifestación
la mania|la manía
la manera|la manera
la maquinària|la maquinaria
la marca|la marca
la mar|el mar
la matèria|la materia
la mediació|la mediación
la medicina|la medicina
la mesura|la medida
la memòria|la memoria
la mentida|la mentira
la mida|el tamaño
la minoria|la minoría
la mirada|la mirada
la missió|la misión
la moda|la moda
la moneda|la moneda
la muntanya russa|la montaña rusa
la multa|la multa
la mort|la muerte
la nacionalitat|la nacionalidad
la naixença|el nacimiento
la nata|la nata
la necessitat|la necesidad
la neteja|la limpieza
la nit de Nadal|la Nochebuena
la nota de premsa|la nota de prensa
la novetat|la novedad
l'obligació|la obligación
l'obra mestra|la obra maestra
l'ocasió|la ocasión
l'ocupació|la ocupación
l'oficina de turisme|la oficina de turismo
l'onada de calor|la ola de calor
l'operació|la operación
l'oposició|la oposición
l'organització|la organización
la paciència|la paciencia
la pàgina|la página
la paraula clau|la palabra clave
la parada d'autobús|la parada de autobús
la parella de ball|la pareja de baile
la participació|la participación
la partida|la partida
la passejada|el paseo
la pausa|la pausa
la pel·lícula d'acció|la película de acción
la pena|la pena
la pensió|la pensión
la persona|la persona
la perspectiva|la perspectiva
la petjada|la huella
la pilota de futbol|el balón de fútbol
la pintura a l'oli|la pintura al óleo
la pista|la pista
la plaça major|la plaza mayor
la plantació|la plantación
la poesia|la poesía
la política|la política
la població|la población
la possibilitat|la posibilidad
la prada|el prado
la pregunta clau|la pregunta clave
la premsa|la prensa
la preocupació|la preocupación
la pressa|la prisa
la primavera passada|la primavera pasada
la prioritat|la prioridad
la privacitat|la privacidad
la producció|la producción
la professió|la profesión
la prohibició|la prohibición
la promesa|la promesa
la proposta|la propuesta
la protecció|la protección
la prova|la prueba
la província|la provincia
la publicitat|la publicidad
la qualitat|la calidad
la quantitat|la cantidad
la queixa formal|la queja formal
la qüestió|la cuestión
la raó|la razón
la realitat|la realidad
la recerca|la investigación
la reflexió|la reflexión
la regió|la región
la regla|la regla
la relació|la relación
la reparació|la reparación
la representació|la representación
la reputació|la reputación
la resposta correcta|la respuesta correcta
la responsabilitat|la responsabilidad
la restauració|la restauración
la reunió de feina|la reunión de trabajo
la revista de moda|la revista de moda
la revolució|la revolución
la riquesa|la riqueza
la ruta|la ruta
la sabata de taló|el zapato de tacón
la sala d'estar|la sala de estar
la salut mental|la salud mental
la satisfacció|la satisfacción
la secció|la sección
la seguretat|la seguridad
la selecció|la selección
el senyal|la señal
la sensació|la sensación
la sentència|la sentencia
la separació|la separación
la sessió|la sesión
la setmana passada|la semana pasada
la seu|la sede
la sigla|la sigla
la signatura digital|la firma digital
la situació|la situación
la societat|la sociedad
la solució|la solución
la sorpresa|la sorpresa
la sort|la suerte
la subvenció|la subvención
la suggerència|la sugerencia
la superfície|la superficie
la supervivència|la supervivencia
la taca|la mancha
la tarifa|la tarifa
la tasca de casa|la tarea doméstica
la tauleta digital|la tableta digital
la tècnica|la técnica
la tecnologia|la tecnología
la tela|la tela
la temporada|la temporada
la tendència|la tendencia
la tensió|la tensión
la teoria|la teoría
la terra cuita|la terracota
la titulació|la titulación
la tolerància|la tolerancia
la tonyina|el atún
la torre|la torre
la tradició|la tradición
la transformació|la transformación
la tranquil·litat|la tranquilidad
la travessia|la travesía
la tristesa profunda|la tristeza profunda
la unió|la unión
la universitat pública|la universidad pública
la urgència mèdica|la urgencia médica
la utilitat|la utilidad
la vaga|la huelga
la valoració|la valoración
la varietat|la variedad
la vegada|la vez
la velocitat|la velocidad
la venda|la venta
la veritat|la verdad
la versió|la versión
la vida|la vida
la vigilància|la vigilancia
la vinya|la viña
la violència|la violencia
la visió|la visión
la visita|la visita
la vista|la vista
la vivenda|la vivienda
la veu|la voz
la volta|la vuelta
la volta al món|la vuelta al mundo
la voluntat|la voluntad
abraçar|abrazar
absorbir|absorber
abusar|abusar
acabar de|acabar de
acceptar|aceptar
acollir|acoger
acomiadar|despedir
acordar|acordar
acostar|acercar
acostumar-se|acostumbrarse
acusar|acusar
afegir|añadir
afectar|afectar
afirmar|afirmar
agafar|coger, agarrar
agradar|gustar, agradar
aguantar|aguantar
ajornar|aplazar
alegrar|alegrar
allargar|alargar
amagar|esconder
ampliar|ampliar
analitzar|analizar
anunciar|anunciar
apagar|apagar
aparèixer|aparecer
apuntar|apuntar
aprofundir|profundizar
aprovar|aprobar
arrencar|arrancar
arrodonir|redondear
assabentar-se|enterarse
assistir|asistir
atendre|atender
atraure|atraer
atrapar|atrapar
augmentar|aumentar
baixar la veu|bajar la voz
besar|besar
buidar|vaciar
burlar-se|burlarse
cabre|caber
calmar|calmar
canviar d'idea|cambiar de idea
capir|entender, captar
carregar|cargar
casar|casar
causar|causar
cedir|ceder
celebrar|celebrar
cobrar|cobrar
combinar|combinar
comentar|comentar
compartir|compartir
comparar|comparar
competir|competir
comprendre|comprender
comptar|contar
comunicar|comunicar
concentrar-se|concentrarse
concloure|concluir
condemnar|condenar
confirmar|confirmar
confondre|confundir
conservar|conservar
considerar|considerar
construir|construir
consultar|consultar
contagiar|contagiar
contenir|contener
contrastar|contrastar
convèncer|convencer
convertir|convertir
copiar|copiar
corregir|corregir
correspondre|corresponder
costar de|costar (+ inf.)
cremar|quemar
criticar|criticar
cuidar|cuidar
curar|curar
dedicar|dedicar
defensar|defender
deixar de|dejar de
demostrar|demostrar
denunciar|denunciar
desaparèixer|desaparecer
descriure|describir
desmuntar|desmontar
destacar|destacar
detenir|detener
desenvolupar|desarrollar
desplaçar|desplazar
despertar|despertar
despedir|despedir
destruir|destruir
dibuixar|dibujar
diferenciar|diferenciar
difondre|difundir
dissenyar|diseñar
distingir|distinguir
distribuir|distribuir
dividir|dividir
dominar|dominar
dubtar|dudar
duplicar|duplicar
durar|durar
educar|educar
elegir|elegir
eliminar|eliminar
emetre|emitir
emocionar|emocionar
empènyer|empujar
encarregar|encargar
encendre|encender
encertar|acertar
encoratjar|animar
endevinar|adivinar
enfadar|enfadar
enganxar|pegar
enfrontar|enfrentar
enredar|enredar
ensopegar|tropezar
entrenar|entrenar
entristir|entristecer
envejar|envidiar
equivocar|equivocar
escapar|escapar
escollir|escoger
esdevenir|llegar a ser
esmentar|mencionar
espantar|asustar
esperar-se|esperarse
estimar|querer, amar
estalviar|ahorrar
estendre|extender
estirar|estirar
evitar|evitar
exagerar|exagerar
examinar|examinar
exigir|exigir
existir|existir
explorar|explorar
exportar|exportar
expressar|expresar
fabricar|fabricar
facilitar|facilitar
fallar|fallar
fer anys|cumplir años
fer cas|hacer caso
fer fred|hacer frío
fer por|dar miedo
fer servir|usar
ferir|herir
fixar|fijar
formar|formar
fugir|huir
funcionar|funcionar
fundar|fundar
guanyar-se la vida|ganarse la vida
guardar|guardar
guarir|curar, sanar
guiar|guiar
habitar|habitar
heretar|heredar
ignorar|ignorar
il·luminar|iluminar
imitar|imitar
impedir|impedir
imposar|imponer
importar|importar
impressionar|impresionar
incloure|incluir
incorporar|incorporar
indicar|indicar
influir|influir
informar|informar
inscriure|inscribir
inspirar|inspirar
instal·lar|instalar
interrompre|interrumpir
introduir|introducir
inventar|inventar
investigar|investigar
invitar|invitar
jurar|jurar
justificar|justificar
lamentar-se|lamentarse
lluitar|luchar
localitzar|localizar
llançar|lanzar
llevar|quitar, levantar
lligar|atar, ligar
manar|mandar
mantenir-se|mantenerse
marxar|marcharse
mastegar|masticar
mencionar|mencionar
mentir|mentir
mesurar|medir
mostrar|mostrar
motivar|motivar
multiplicar|multiplicar
néixer|nacer
navegar|navegar
negar|negar
negociar|negociar
nombrar|nombrar
notificar|notificar
obeir|obedecer
observar|observar
obtenir|obtener
ocórrer|ocurrir
odiar|odiar
omplir de|llenar de
ometre|omitir
opinar|opinar
oposar-se|oponerse
orientar|orientar
oscil·lar|oscilar
ofendre|ofender
pactar|pactar
parar|parar
parar taula|poner la mesa
participar|participar
passar-ho bé|pasarlo bien
patir|sufrir
pecar|pecar
pertànyer|pertenecer
pesar|pesar
planejar|planear
plantar|plantar
plorar|llorar
pregar|rogar, rezar
prémer|pulsar, apretar
presentar|presentar
presumir|presumir
prevenir|prevenir
prohibir|prohibir
projectar|proyectar
prometre|prometer
pronunciar|pronunciar
protegir|proteger
provar|probar
publicar|publicar
punxar|pinchar
quedar bé|quedar bien
rebaixar|rebajar
rebre amb els braços oberts|recibir con los brazos abiertos
reclamar|reclamar
recollir|recoger
reconèixer|reconocer
recuperar|recuperar
reduir|reducir
referir-se|referirse
reflexionar|reflexionar
regalar|regalar
registrar|registrar
regular|regular
rellevar|relevar
relacionar|relacionar
renovar|renovar
renunciar|renunciar
repartir|repartir
representar|representar
resistir|resistir
respectar|respetar
respirar|respirar
restar|restar
resultar|resultar
retallar|recortar
retrobar|reencontrar
revisar|revisar
riure's|reírse
robar|robar
rodar|rodar
romandre|permanecer
sacsejar|sacudir
salvar|salvar
saludar|saludar
satisfer|satisfacer
seguir|seguir
senyalar|señalar
separar|separar
servir de|servir de
significar|significar
signar|firmar
somiar|soñar
somriure|sonreír
sorprendre|sorprender
sospitar|sospechar
suportar|soportar
suposar|suponer
suspendre|suspender
tallar|cortar
temer|temer
tenir cura|cuidar
tenir en compte|tener en cuenta
tenir lloc|tener lugar
tenir mandra|tener pereza
tenir pressa|tener prisa
tirar|tirar
tolerar|tolerar
tractar|tratar
traduir|traducir
transformar|transformar
transmetre|transmitir
transportar|transportar
trencar|romper
triomfar|triunfar
trobar a faltar|echar de menos
trobar-se amb|encontrarse con
valorar|valorar
variar|variar
vigilar|vigilar
visitar|visitar
vibrar|vibrar
vomitar|vomitar
voltar|rodear
absurd / absurda|absurdo / absurda
actual|actual
adequat / adequada|adecuado / adecuada
afortunat / afortunada|afortunado / afortunada
agradable|agradable
agut / aguda|agudo / aguda
altre / altra|otro / otra
animat / animada|animado / animada
anterior|anterior
apropiat / apropiada|apropiado / apropiada
atent / atenta|atento / atenta
atractiu / atractiva|atractivo / atractiva
autèntic / autèntica|auténtico / auténtica
avançat / avançada|avanzado / avanzada
barrejat / barrejada|mezclado / mezclada
bàsic / bàsica|básico / básica
breu|breve
brillant|brillante
capaç|capaz
càlid / càlida|cálido / cálida
característic / característica|característico / característica
cert / certa|cierto / cierta
cèlebre|célebre
cívic / cívica|cívico / cívica
còmode / còmoda|cómodo / cómoda
compartit / compartida|compartido / compartida
complet / completa|completo / completa
complex / complexa|complejo / compleja
comú|común
concret / concreta|concreto / concreta
conegut / coneguda|conocido / conocida
consegüent|consecuente
contrari / contrària|contrario / contraria
cordial|cordial
corrent|corriente
cruel|cruel
cuidat / cuidada|cuidado / cuidada
curiós / curiosa|curioso / curiosa
delicat / delicada|delicado / delicada
desconegut / desconeguda|desconocido / desconocida
desitjat / desitjada|deseado / deseada
diferent|diferente
digne / digna|digno / digna
directe / directa|directo / directa
discret / discreta|discreto / discreta
divers / diversa|diverso / diversa
dret / dreta|derecho / derecha, recto / recta
dur / dura|duro / dura
econòmic / econòmica|económico / económica
efectiu / efectiva|efectivo / efectiva
elegant|elegante
elèctric / elèctrica|eléctrico / eléctrica
enorme|enorme
enèrgic / enèrgica|enérgico / enérgica
equivocat / equivocada|equivocado / equivocada
escàs / escassa|escaso / escasa
especial|especial
estranger / estrangera|extranjero / extranjera
estrany / estranya|extraño / extraña
exacte / exacta|exacto / exacta
excel·lent|excelente
excessiu / excessiva|excesivo / excesiva
exigent|exigente
exitós / exitosa|exitoso / exitosa
extens / extensa|extenso / extensa
extern / externa|externo / externa
extraordinari / extraordinària|extraordinario / extraordinaria
fals / falsa|falso / falsa
familiar|familiar
famós / famosa|famoso / famosa
fidel|fiel
final|final
fix / fixa|fijo / fija
flexible|flexible
fluix / fluixa|flojo / floja
formal|formal
fort / forta|fuerte
fresc / fresca|fresco / fresca
frèvol / frèvola|frágil
fundamental|fundamental
futur / futura|futuro / futura
general|general
genial|genial
gratuït / gratuïta|gratuito / gratuita
greu|grave
habitual|habitual
harmoniós / harmoniosa|armonioso / armoniosa
hàbil|hábil
humà / humana|humano / humana
humil|humilde
igual|igual
il·lustre|ilustre
imprescindible|imprescindible
important|importante
impossible|imposible
increïble|increíble
independent|independiente
indispensable|indispensable
infinit / infinita|infinito / infinita
inquiet / inquieta|inquieto / inquieta
inútil|inútil
just / justa|justo / justa
lliure|libre
local|local
lògic / lògica|lógico / lógica
lluminós / lluminosa|luminoso / luminosa
llunyà / llunyana|lejano / lejana
magnífic / magnífica|magnífico / magnífica
mateix / mateixa|mismo / misma
màxim / màxima|máximo / máxima
mediocre|mediocre
mínim / mínima|mínimo / mínima
modern / moderna|moderno / moderna
moderat / moderada|moderado / moderada
molest / molesta|molesto / molesta
nacional|nacional
natural|natural
necessari / necessària|necesario / necesaria
negatiu / negativa|negativo / negativa
nombrós / nombrosa|numeroso / numerosa
normal|normal
notable|notable
obvi / òbvia|obvio / obvia
ocupat / ocupada|ocupado / ocupada
òptim / òptima|óptimo / óptima
ordinari / ordinària|ordinario / ordinaria
original|original
paral·lel / paral·lela|paralelo / paralela
particular|particular
passat / passada|pasado / pasada
perfecte / perfecta|perfecto / perfecta
perillós / perillosa|peligroso / peligrosa
permanent|permanente
personal|personal
plàcid / plàcida|plácido / plácida
popular|popular
positiu / positiva|positivo / positiva
possible|posible
pràctic / pràctica|práctico / práctica
preciós / preciosa|precioso / preciosa
present|presente
principal|principal
privat / privada|privado / privada
probable|probable
profund / profunda|profundo / profunda
pròxim / pròxima|próximo / próxima
públic / pública|público / pública
pur / pura|puro / pura
rar / rara|raro / rara
real|real
recent|reciente
relatiu / relativa|relativo / relativa
rodó / rodona|redondo / redonda
rural|rural
sa / sana|sano / sana
salvatge|salvaje
satisfet / satisfeta|satisfecho / satisfecha
secret / secreta|secreto / secreta
segur / segura|seguro / segura
senzill / senzilla|sencillo / sencilla
sever / severa|severo / severa
silenciós / silenciosa|silencioso / silenciosa
similar|similar
sol / sola|solo / sola
sorollós / sorollosa|ruidoso / ruidosa
suau|suave
suficient|suficiente
superior|superior
tendre / tendra|tierno / tierna
tèxtil|textil
total|total
tradicional|tradicional
tranquil·litzador / tranquil·litzadora|tranquilizador / tranquilizadora
últim / última|último / última
únic / única|único / única
urbà / urbana|urbano / urbana
urgent|urgente
útil|útil
valent|valiente
variat / variada|variado / variada
vertader / vertadera|verdadero / verdadera
visible|visible
viu / viva|vivo / viva
vital|vital
volgut / volguda|querido / querida
vulgar|vulgar
a causa de|a causa de
a continuació|a continuación
a poc a poc|poco a poco
a part de|aparte de
a tothora|a todas horas
a través de|a través de
a vegades|a veces
abans que|antes de que
absolutament|absolutamente
ben mirat|bien mirado
bé|bien
bastant|bastante
com a mínim|como mínimo
com ara|como por ejemplo
cap enllà|más allá
cap endavant|hacia delante
cap enrere|hacia atrás
d'acord|de acuerdo
d'altra banda|por otra parte
de cap manera|de ninguna manera
de debò|de verdad
de pressa|deprisa
de tant en tant|de vez en cuando
de totes maneres|de todos modos
en aquest moment|en este momento
en efecte|en efecto
en realitat|en realidad
en veritat|en verdad
endavant|adelante
enlloc|en ningún sitio
enrere|atrás
exactament|exactamente
fins ara|hasta ahora
fins i tot|incluso
gairebé mai|casi nunca
igualment|igualmente
literalment|literalmente
malgrat|a pesar de
mentrestant|mientras tanto
més aviat|más bien
molt de temps|mucho tiempo
òbviament|obviamente
per cert|por cierto
per sort|por suerte
per fi|por fin
per poc|por poco
poc a poc|poco a poco
probablement|probablemente
només que|solo que
sobretot|sobre todo
tard o d'hora|tarde o temprano
totalment|totalmente
tothom|todo el mundo
tant de bo|ojalá
una mica|un poco
sempre més|cada vez más
l'ou|el huevo
el bou|el buey
el tren d'alta velocitat|el tren de alta velocidad
el carnet de conduir|el carné de conducir
el cotxe elèctric|el coche eléctrico
el límit de velocitat|el límite de velocidad
la multa de trànsit|la multa de tráfico
el semàfor en vermell|el semáforo en rojo
el pa de pagès|el pan de payés
el pa de pessic|el bizcocho
el sucre morè|el azúcar moreno
el mató amb mel|el requesón con miel
la crema de verdures|la crema de verduras
la sopa de peix|la sopa de pescado
l'arròs a la cassola|el arroz a la cazuela
la botifarra amb mongetes|la butifarra con judías
el suquet de peix|el suquet de pescado
la cassola|la cazuela
el forn de llenya|el horno de leña
el vi negre|el vino tinto
el vi blanc|el vino blanco
el vi rosat|el vino rosado
l'aigua amb gas|el agua con gas
l'aigua sense gas|el agua sin gas
la copa de cava|la copa de cava
el cafè amb gel|el café con hielo
la tassa de te|la taza de té
el got d'aigua|el vaso de agua
`.trim().split('\n').filter(l=>l&&l.includes('|'));


# Changelog · Camí Català

## v16 (2026-11-08)
- **Migración al 85 %:** al abrir la app (una sola vez, marca `mig85`), las lecciones ya aprobadas con menos de 85 % vuelven a pendientes y hay que repetirlas. Si eso deja el A2 sin cumplir sus condiciones, se vuelve a bloquear. Probado en node con progreso simulado; NO en navegador real.

## v15 (2026-11-08)
- **Aprobado de lección al 85 %** (antes 60 %): por debajo, la lección no cuenta como hecha y hay que repetir. El reto diario (60 %), los juegos por dominio (60 %) y el test de nivel (90 %) no cambian.
- **+5 preguntas por práctica de lección:** `MIXN` 12 → 17 y `MIXF` 6 → 7 en `src/16b_leccion_mix.js` (7 fijas + 10 generadas con lo que enseña esa lección). Medido en node con DOM simulado: 50 lecciones × 30 intentos = 17 preguntas siempre, sin duplicados ni nulos. NO probado en navegador real.

## v13 (2026-11-08)
- **Práctica de lección variada** (`src/16b_leccion_mix.js`, `buildLessonQs(l)`): cada intento = 6 preguntas fijas (las 13 escritas a mano, rotadas: primero las menos vistas y las falladas, con ruido al azar) + 6 generadas SOLO con lo que enseña esa lección (frases de ejemplo `ex` y palabras clave `kw`) ⇒ nada se pregunta antes de enseñarse. Generadas: traducir frase (4 opciones), escuchar y elegir significado, completar frase (primera letra + hueco), construir frase, vocabulario en ambos sentidos y escribir la palabra. Distractores: primero de la propia lección, luego de las anteriores.
- **Antimemorización / imprevisible:** subconjunto distinto cada vez, orden barajado sin dos tipos iguales seguidos, una frase o palabra solo una vez por intento, máx. 2 de cada tipo generado, memoria por lección en `S.lh` (últimas 40 generadas y último intento de cada fija) para no repetir hasta agotar el banco, opciones barajadas al mostrarse.
- **Medido (8 intentos seguidos, 50 lecciones, simulado en node):** 6 fijas + 6 generadas por intento; solo ~5-6 % de preguntas se repiten entre intentos seguidos (antes 100 %); ~60 preguntas distintas por lección en 8 intentos (antes 13); 0 problemas (opciones sin la correcta, duplicados, respuestas fuera de lo enseñado); 450-520 respuestas escritas generadas, todas aceptadas por `checkType`.
- Probado con `English/tests/t_mix.js`, `t_mix_check.js`, `t_mix_sample.js` (cargan la app en node con DOM simulado: `build_debug2.py <src> <html>` y `APP=<html> node t_mix.js`). NO probado en navegador real.
- También: «🔁 Repasa tus fallos» al final de la práctica de lección (igual que en inglés v1.3).

## v12.1 (2026-11-08) · auditoría «nada se pregunta antes de enseñarse»
- Auditadas las 50 lecciones con `English/tests/audit_taught.js` (`SRC=…/Catala/src node dump_lessons.js` y luego `audit_taught.js`). Nuevo `src/12a_kw_extra.js` (después de 11 en `orden.txt`) añade palabras clave a lecciones que preguntaban vocabulario enseñado más tarde: L17 biblioteca/dinar/preparar, L19 sopar/compra, L112 de seguida/de pressa, L113 malalt, L115 marxar, L117 gelats, A2 A1 L24 fulla/cau.
- Ejercicios cambiados: A1 L26 «Avui ha plogut» (perfecto no enseñado) → «Avui fa fred»; A2 L8 (a28) «escrivim» (no enseñado) → «parlem».
- Falsos positivos aceptados: formas verbales regulares/irregulares cuya regla o raíz sí se enseña (cuinen, pagues, vindrà, vingueu…).
- Probado: build desde src reproduce el HTML previo, sintaxis JS correcta. NO probado en navegador. NO subido a GitHub.

## v12 (2026-11-07)
- **Ayuda 💡 progresiva**: cada toque da más pista en las preguntas de escribir. 1.º la ayuda de siempre; 2.º «Empieza por "a"» + nº de palabras y letras; 3.º máscara con la primera letra de cada palabra (a _ _ _ _); en las lliçons 1–8 de A1 hay un 4.º toque con la mitad de las letras. Aviso «Toca 💡 otra vez para ver más» mientras queden niveles.

## v11 (2026-11-07)
- **Menos castellano progresivo en A2, como en euskera** (sin ocultar nada, todo se ve al tocar): A1 y A2 lliçons 1–7 con traducciones visibles; desde la lliçó 8 de A2 los ejemplos y las paraules clau salen borrosos; desde la 16 también el subtítulo en castellano de la lliçó (cabecera, lista e Inici) y, en Inici, la traducción de la paraula del dia. Se puede desactivar en Jo → Ajustos.

## v10 (2026-11-07)
- **A2 bloqueado**: las lliçons d'A2 (y el test de nivel A2) se abren al acabar las 26 lliçons de l'A1, al aprobar el test de nivel A1 o con el código de acceso.
- **Test de nivel**: 40 preguntas, hace falta un 90 % de aciertos (36/40; se quita el mínimo por bloque) y solo se puede hacer un test cada 24 horas (aprobado o no). El código de acceso quita la espera.

## v9 (2026-11-07)
- **Juegos bloqueados por dominio de Vocabulari**, como en euskera: Parelles solo abre un tema cuando lo dominas al 60 % (barra y % en cada tema; «General» se abre al dominar uno), y Contrarellotge de paraules exige además haber dominado al menos un tema. Siguen las puertas por lliçó. El código de acceso abre todo.

## v8 (2026-11-07)
- **Fusión de las dos líneas de desarrollo.** Hasta ahora había dos v5/v6 paralelas: la de audio + consejos (v5–v7, abajo) y la de «Sobre mi» + puertas de práctica (v5b–v6b). La web había quedado con la primera y sin la segunda; esta versión las junta (el código partido en `src/` está al día).
- **Vocabulario como en euskera**: cada tema muestra su barra y su porcentaje de dominio, más el dominio global del nivel; cada palabra tiene un nivel 0–4 que sube al acertar y baja al fallar, y cuanto menos dominas una palabra más sale. Las sesiones no repiten palabra ni significado (cuestionario de 10, tarjetas, mezcla, «Escolta i tria», práctica mixta). Las preguntas de escribir salen cuando ya dominas algo la palabra.
- Buscador dentro de Vocabulari, botón al diccionario y «Barreja-ho tot · 10 preguntes». Los temas siguen con candado hasta acabar la lliçó (puerta de práctica).
- Prueba `tests/t-v8-vocabulari.js`.

## v7 (línea audio y consejos) (2026-11-07)
- Revisión de todos los consejos de las lecciones (205 + 97): corregidos errores (géneros que no cambian respecto al castellano, colores invariables con matiz de la norma, soler, perfet/perifràstic, imperativos irregulares, conectores concesivos, etc.).
- Explicaciones más amplias en las 651 preguntas: ahora dicen la regla, un ejemplo y el contraste con el castellano.
- Nueva ayuda 💡 en las 146 preguntas de escribir: pista de la forma sin dar la respuesta.
- Arreglos puntuales: «M'agrada» (lección 28) y una opción de «per / per a» (lección 211) que contradecía el consejo.

## v6 (línea audio y consejos) (2026-11-07)
- Audio: el texto se convierte a cómo se dice antes de reproducirlo: números, años, teléfonos y códigos postales, ordinales (1r, 2a, 5è), %, €, rangos (2-1 → «dos a un»), flechas, guiones, barras y puntos suspensivos; «(= x)» se lee «o sigui, x».
- Selección de la mejor voz catalana disponible (premium/mejorada primero) y selector de voz + velocidad en Jo → Veu.
- Aviso en Inici e instrucciones (iOS/Android) cuando el dispositivo no tiene voz catalana instalada.

## v5 (línea audio y consejos) (2026-11-07)
- Audio de los números: «vint-i-cinc», «trenta-dos»… se pronuncian como se dicen (vinti cinc, trenta dos). La escritura no cambia: siguen con guiones.
- Explicaciones en castellano: corregidas palabras en catalán que se habían colado (lliçó/lliçons, participis, infinitiu, gerundi, indicatiu…) y referencias a pestañas que no existen (Repàs → Paraules fluixes).

## v6b (línea «Sobre mi») (2026-11-07)
- **Sobre mi**: formulario (nombre, pueblo, edad) y frases de práctica con tus datos (em dic…, sóc de/d'…, tinc N anys, con el número en catalán). Se guarda solo en el navegador; editable y borrable desde Jo → Ajustos.
- **Frases noves**: generador por plantillas (tinc / vull / necessito / m'agrada / on és + nombre) con solo verbos y palabras ya estudiados.
- **Puerta de práctica**: la práctica mixta, el repte quotidià, «Escolta i tria» y el quiz de verbs solo usan palabras de temas, verbos y tiempos de lliçons acabades; los temas de Vocabulari se muestran con candado hasta entonces; el constructor de frases solo usa frases A2 cuando hay alguna lliçó A2 hecha. El código de acceso lo abre todo.
- **A2 con menos castellano**: las traducciones de los ejemplos y de las paraules clau en lliçons A2 salen difuminadas hasta tocarlas (ajustable en Ajustos).
- Prueba `tests/t-v6-nuevas.js`.

## v5b (línea «Sobre mi») (2026-11-07)
- Tema **Automàtic** ahora sigue de verdad al sistema (claro/oscuro) y reacciona si cambia con la app abierta.
- Codi d'accés (hash, no legible en el HTML) en Perfil → Ajustos: abre todos los jocs sin acabar lliçons.
- Resum de la lliçó (objetivos y palabras clave) al terminar la práctica de cada lliçó.
- Prueba nueva en `tests/`.

## v4 (2026-11-07)
- Jocs con bloqueos por progreso, como en la versión euskera, para no adelantar materia: Contrarellotge de verbs y Pluja de verbs se abren al acabar la lliçó 7 (A1); Contrarellotge de paraules al tener vocabulario visto; cada tema de Parelles se abre al acabar la lliçó donde se trabaja.
- Los tiempos verbales (presente → perfet → perifràstic → imperfet → futur → condicional → subjuntiu) y los verbos (regulares, pronominales, irregulares) solo salen cuando ya se han estudiado; los demás aparecen con candado.
- Pluja de verbs: con un solo tiempo disponible, el objetivo es un verbo concreto (3 verbs per partida); desde el perfet, el objetivo es el tiempo verbal.

## v3 (2026-11-07)
- Jocs rehechos al estilo de la versión euskera: Contrarellotge de verbs (elige el tiempo, +3 s cada 5 aciertos), Contrarellotge de paraules, Parelles por temas (contrarreloj con tableros continuos o sin tiempo, con puntuación) y Pluja de verbs (formas que caen, 3 vidas, el tiempo pedido cambia cada 6 aciertos).

## v2 (2026-11-07)
- Lliçó 1: totes les lletres de l'alfabet (nom i paraula d'exemple) i les paraules d'exemple de vocals i consonants es poden escoltar amb 🔊.

## v1 (2026-11-07)
- Primera versión: 50 lecciones (A1 26 + A2 24), 54 temas de vocabulario (1.700+ palabras), diccionario de ~2.800 entradas, 149 verbos con 8 tiempos.
- Práctica: repaso de palabras flojas, reto diario, constructor de frases, números, deletreo, escucha y elige.
- Juegos: Contrarellotge, Parelles, Cursa de verbs. Test de nivel A1/A2 y autoevaluación.
- XP, rachas, insignias, copia de seguridad, tema Pissarra/Paper, pantalla legal y de créditos.

## v14 (2026-11-08) — Modo silencio
- Igual que English v1.5 (`src/20c_silencio.js`).

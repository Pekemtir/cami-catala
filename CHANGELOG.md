# Changelog · Camí Català

## v6 (2026-11-07)
- **Sobre mi**: formulario (nombre, pueblo, edad) y frases de práctica con tus datos (em dic…, sóc de/d'…, tinc N anys, con el número en catalán). Se guarda solo en el navegador; editable y borrable desde Jo → Ajustos.
- **Frases noves**: generador por plantillas (tinc / vull / necessito / m'agrada / on és + nombre) con solo verbos y palabras ya estudiados.
- **Puerta de práctica**: la práctica mixta, el repte quotidià, «Escolta i tria» y el quiz de verbs solo usan palabras de temas, verbos y tiempos de lliçons acabades; los temas de Vocabulari se muestran con candado hasta entonces; el constructor de frases solo usa frases A2 cuando hay alguna lliçó A2 hecha. El código de acceso lo abre todo.
- **A2 con menos castellano**: las traducciones de los ejemplos y de las paraules clau en lliçons A2 salen difuminadas hasta tocarlas (ajustable en Ajustos).
- Prueba `tests/t-v6-nuevas.js`.

## v5 (2026-11-07)
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

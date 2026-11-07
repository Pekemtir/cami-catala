#!/usr/bin/env python3
"""Reconstruye index.html de Camí Català concatenando las partes de src/ en el orden de orden.txt.
Uso:  python3 build.py [salida.html]   (por defecto ../index.html.nuevo)
Los archivos se leen/escriben sin tocar saltos de línea, así que el resultado es idéntico byte a byte."""
import os,sys
D=os.path.dirname(os.path.abspath(__file__))
orden=[l.strip() for l in open(D+'/orden.txt',encoding='utf-8') if l.strip()]
out=''.join(open(D+'/'+f,encoding='utf-8',newline='').read() for f in orden)
dst=sys.argv[1] if len(sys.argv)>1 else os.path.join(D,'..','index.html.nuevo')
open(dst,'w',encoding='utf-8',newline='').write(out)
print(dst,len(out.encode('utf-8')),'bytes')

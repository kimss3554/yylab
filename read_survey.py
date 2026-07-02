#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from docx import Document

docx_path = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\배이아 탐구활동 설문조사.docx"
doc = Document(docx_path)

for para in doc.paragraphs:
    if para.text.strip():
        print(para.text)

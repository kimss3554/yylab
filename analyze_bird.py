#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np

BIRD_PATH = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\배이아_새소리.xlsx"
bird = pd.read_excel(BIRD_PATH, header=1)

# 컬럼 파악
cols = list(bird.columns)
for i, c in enumerate(cols):
    print(f"[{i}] {repr(c)}")

print(f"\n행 수: {len(bird)}")
print("\n--- 각 컬럼 샘플 (처음 5개) ---")
for i, c in enumerate(cols):
    vals = bird[c].dropna().head(5).tolist()
    safe = [str(v).encode('cp949', errors='replace').decode('cp949') for v in vals]
    print(f"[{i}] {safe}")

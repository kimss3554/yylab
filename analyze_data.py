#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pandas as pd
import sys

# 경로
SURVEY_PATH = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\새소리_설문조사(응답).xlsx"
BIRD_PATH   = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\배이아_새소리.xlsx"

import os
# 없으면 Downloads에서 복사
for src, dst in [
    (r"C:\Users\yylab\Downloads\새소리_설문조사(응답).xlsx", SURVEY_PATH),
    (r"C:\Users\yylab\Downloads\배이아_새소리.xlsx", BIRD_PATH),
]:
    if not os.path.exists(dst) and os.path.exists(src):
        import shutil
        shutil.copy(src, dst)

survey = pd.read_excel(SURVEY_PATH)
bird   = pd.read_excel(BIRD_PATH, header=1)

print("=" * 60)
print("【설문 컬럼】")
for i, c in enumerate(survey.columns):
    print(f"  [{i}] {c}")

print(f"\n총 응답수: {len(survey)}\n")

print("=" * 60)
print("【Q1 연령대】")
print(survey.iloc[:, 0].value_counts().sort_index())

print("\n【Q2 새 지식】")
print(survey.iloc[:, 1].value_counts())

print("\n【Q3 A·B 같은새?】")
print(survey.iloc[:, 2].value_counts())

print("\n【Q4 A·B 확신도】")
print(survey.iloc[:, 3].value_counts().sort_index())

print("\n【Q5 C·D 같은새?】")
print(survey.iloc[:, 4].value_counts())

print("\n【Q6 C·D 확신도】")
print(survey.iloc[:, 5].value_counts().sort_index())

print("\n【Q7 AI앱 인식】")
print(survey.iloc[:, 6].value_counts())

print("\n【Q8 AI 신뢰도】")
print(survey.iloc[:, 7].value_counts())

print("\n" + "=" * 60)
print("【새소리 데이터 컬럼】")
for i, c in enumerate(bird.columns):
    print(f"  [{i}] {c}")

print(f"\n샘플 수: {len(bird)}")
print("\n【처음 5행】")
print(bird.head())

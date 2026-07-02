#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np

SURVEY_PATH = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\새소리_설문조사(응답).xlsx"
BIRD_PATH   = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\배이아_새소리.xlsx"

survey = pd.read_excel(SURVEY_PATH)
bird   = pd.read_excel(BIRD_PATH, header=1)

survey.columns = ['연령대','새지식','AB구별','AB확신도','CD구별','CD확신도','AI인식','AI신뢰도']
N = len(survey)

print(f"총 응답자: {N}명\n")

# ─── 1. 연령대 ───
print("【연령대】")
age = survey['연령대'].value_counts()
for k,v in age.items():
    print(f"  {k}: {v}명 ({v/N*100:.1f}%)")

# ─── 2. 새 지식 (정확한 수치) ───
print("\n【새 지식 수준】")
know = survey['새지식'].value_counts()
know_map = {'잘 안다':'잘 안다', '조금 안다':'조금 안다', '잘 모른다':'잘 모른다'}
for k,v in know.items():
    print(f"  {k}: {v}명 ({v/N*100:.1f}%)")

# ─── 3. A·B 지빠귀 구별 ───
print("\n【A·B 지빠귀 구별 결과】")
ab = survey['AB구별'].value_counts()
for k,v in ab.items():
    print(f"  {k}: {v}명 ({v/N*100:.1f}%)")

# A·B 확신도 평균
ab_conf = survey['AB확신도']
print(f"  A·B 평균 확신도: {ab_conf.mean():.2f}/5점")
print(f"  분포: {dict(ab_conf.value_counts().sort_index())}")

# ─── 4. C·D 직박구리·까치 ───
print("\n【C·D 직박구리·까치 구별 결과】")
cd = survey['CD구별'].value_counts()
for k,v in cd.items():
    print(f"  {k}: {v}명 ({v/N*100:.1f}%)")

cd_conf = survey['CD확신도']
print(f"  C·D 평균 확신도: {cd_conf.mean():.2f}/5점")
print(f"  분포: {dict(cd_conf.value_counts().sort_index())}")

# ─── 5. 새 지식별 교차분석 (핵심 통계!) ───
print("\n【★ 새 지식 수준별 A·B 정답률 교차분석】")
cross = pd.crosstab(survey['새지식'], survey['AB구별'])
print(cross)
print()
for know_level in survey['새지식'].unique():
    sub = survey[survey['새지식']==know_level]
    correct = (sub['AB구별']=='다른 새 소리다').sum()
    total = len(sub)
    print(f"  {know_level}: {correct}/{total}명 정답 ({correct/total*100:.1f}%)")

# ─── 6. 연령대별 교차분석 ───
print("\n【★ 연령대별 A·B 정답률 교차분석】")
for age_grp in survey['연령대'].unique():
    sub = survey[survey['연령대']==age_grp]
    correct = (sub['AB구별']=='다른 새 소리다').sum()
    total = len(sub)
    print(f"  {age_grp}: {correct}/{total}명 ({correct/total*100:.1f}%)")

# ─── 7. AI 인식도 ───
print("\n【AI 앱 인식도】")
ai_know = survey['AI인식'].value_counts()
for k,v in ai_know.items():
    print(f"  {k}: {v}명 ({v/N*100:.1f}%)")

# ─── 8. AI 신뢰도 ───
print("\n【AI 신뢰도】")
ai_trust = survey['AI신뢰도'].value_counts()
for k,v in ai_trust.items():
    print(f"  {k}: {v}명 ({v/N*100:.1f}%)")
trust_pos = survey['AI신뢰도'].isin(['매우 신뢰한다','어느 정도 신뢰한다']).sum()
print(f"  → 신뢰 합계: {trust_pos}명 ({trust_pos/N*100:.1f}%)")

# ─── 9. 새소리 데이터 분석 ───
print("\n" + "="*60)
print("【새소리 데이터 전체 구조】")
print(bird.to_string())

# 컬럼 정리
print("\n【컬럼 리스트】")
for i,c in enumerate(bird.columns):
    print(f"  [{i}] {repr(c)}")

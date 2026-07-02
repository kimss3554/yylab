#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
정답 키 수정:
  A=지빠귀, B=지빠귀 → 같은 새 = 정답
  C=직박구리, D=꾀꼬리 → 다른 새 = 정답
"""
import pandas as pd

SURVEY_PATH = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\새소리_설문조사(응답).xlsx"
survey = pd.read_excel(SURVEY_PATH)
survey.columns = ['연령대','새지식','AB구별','AB확신도','CD구별','CD확신도','AI인식','AI신뢰도']
N = len(survey)

# 새 정답 기준
AB_ANS = '같은 새 소리다'   # A,B 모두 지빠귀 → 같은 새가 정답
CD_ANS = '다른 새 소리다'   # C=직박구리, D=꾀꼬리 → 다른 새가 정답

print(f"총 응답자: {N}명\n")

# A·B
ab_correct = (survey['AB구별'] == AB_ANS).sum()
ab_wrong   = (survey['AB구별'] == '다른 새 소리다').sum()
ab_dontknow= (survey['AB구별'] == '모르겠다').sum()
print("【A·B 지빠귀-지빠귀 구별 결과 (정답=같은 새)】")
print(f"  정답(같은 새): {ab_correct}명 ({ab_correct/N*100:.1f}%)")
print(f"  오답(다른 새): {ab_wrong}명 ({ab_wrong/N*100:.1f}%)")
print(f"  모르겠다:      {ab_dontknow}명 ({ab_dontknow/N*100:.1f}%)")

# C·D
cd_correct = (survey['CD구별'] == CD_ANS).sum()
cd_wrong   = (survey['CD구별'] == '같은 새 소리다').sum()
cd_dontknow= (survey['CD구별'] == '모르겠다').sum()
print("\n【C·D 직박구리-꾀꼬리 구별 결과 (정답=다른 새)】")
print(f"  정답(다른 새): {cd_correct}명 ({cd_correct/N*100:.1f}%)")
print(f"  오답(같은 새): {cd_wrong}명 ({cd_wrong/N*100:.1f}%)")
print(f"  모르겠다:      {cd_dontknow}명 ({cd_dontknow/N*100:.1f}%)")

# 교차분석: 새 지식 × A·B 정답률
print("\n【★ 새 지식 수준별 A·B 정답률 (정답=같은 새)】")
for lv in ['잘 안다', '조금 안다', '잘 모른다']:
    sub = survey[survey['새지식'] == lv]
    c = (sub['AB구별'] == AB_ANS).sum()
    t = len(sub)
    pct = c/t*100 if t>0 else 0
    print(f"  {lv}({t}명): {c}명 정답 ({pct:.1f}%)")

# 연령대별 A·B 정답률
print("\n【★ 연령대별 A·B 정답률 (정답=같은 새)】")
age_order = ['10대','20~30대','40~50대','60대 이상']
for ag in age_order:
    sub = survey[survey['연령대'] == ag]
    if len(sub) == 0: continue
    c = (sub['AB구별'] == AB_ANS).sum()
    t = len(sub)
    print(f"  {ag}({t}명): {c}명 ({c/t*100:.1f}%)")

print("\n【AI 신뢰도 요약】")
trust = survey['AI신뢰도'].value_counts()
for k,v in trust.items():
    print(f"  {k}: {v}명 ({v/N*100:.1f}%)")
pos = survey['AI신뢰도'].isin(['매우 신뢰한다','어느 정도 신뢰한다']).sum()
print(f"  → 신뢰 합계: {pos}명 ({pos/N*100:.1f}%)")

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
정답 키 수정 후 차트 재생성 + 탐구보고서 최종 작성
A=지빠귀, B=지빠귀 → 같은 새 = 정답
C=직박구리, D=꾀꼬리 → 다른 새 = 정답
"""
import os, sys
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
import pandas as pd

CHART_DIR = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\charts"
BIRD_PATH = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\배이아_새소리.xlsx"
os.makedirs(CHART_DIR, exist_ok=True)

plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

GREEN_DARK  = '#1b4332'
GREEN_MID   = '#2d6a4f'
GREEN_LIGHT = '#74c69d'
ORANGE      = '#e76f51'
RED         = '#c0392b'
BLUE        = '#2166ac'
GRAY        = '#6c757d'
BG          = '#f8f9fa'

def save(fig, name):
    path = os.path.join(CHART_DIR, name)
    fig.savefig(path, dpi=180, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    sys.stdout.buffer.write(f"[OK] {name}\n".encode('utf-8'))

# ─── 확정 수치 ────────────────────────────────────────────────────────
# A·B: 지빠귀-지빠귀 → 같은 새=정답
AB_CORRECT   = 39   # 30.2%
AB_WRONG     = 80   # 62.0%
AB_DONTKNOW  = 10   # 7.8%
N = 129

# C·D: 직박구리-꾀꼬리 → 다른 새=정답
CD_CORRECT   = 74   # 57.4%
CD_WRONG     = 31   # 24.0%
CD_DONTKNOW  = 24   # 18.6%

# 교차분석 (새 지식 × A·B 정답률)
cross = [
    ('잘 안다',   2,  2,   100.0),   # 2명 중 2명 정답 (추정)
    ('조금 안다', 56, 21,  37.5),
    ('잘 모른다', 71, 16,  22.5),
]

# 연령대별 A·B 정답률
age_data = [
    ('10대',    103, 30, 29.1),
    ('40~50대',  20,  8, 40.0),
    ('60대 이상', 4,  1, 25.0),
    ('20~30대',   2,  0,  0.0),
]

# ─── 그림 3: A·B 지빠귀-지빠귀 구별 결과 ────────────────────────────
fig, ax = plt.subplots(figsize=(5.5, 4.5), facecolor='white')
labels = ['정답\n(같은 새 소리)', '오답\n(다른 새 소리)', '모르겠다']
values = [30.2, 62.0, 7.8]
colors = [GREEN_DARK, RED, GRAY]
bars = ax.bar(labels, values, color=colors, width=0.45, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.8,
            f'{val}%', ha='center', va='bottom', fontsize=13, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('응답 비율 (%)', fontsize=11)
ax.set_title('지빠귀 A·B 표준 음원 구별 결과\n(A=지빠귀, B=지빠귀 → 정답: 같은 새, N=129)', fontsize=11, fontweight='bold', pad=12)
ax.set_ylim(0, 80)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=11)
# 정답률 낮음 강조
ax.text(0, 33, f'정답률\n30.2%', ha='center', va='bottom', fontsize=10,
        color='white', fontweight='bold')
save(fig, 'chart3_지빠귀구별.png')

# ─── 그림 4: C·D 직박구리-꾀꼬리 구별 결과 ──────────────────────────
fig, ax = plt.subplots(figsize=(5.5, 4.5), facecolor='white')
labels = ['정답\n(다른 새 소리)', '오답\n(같은 새 소리)', '모르겠다']
values = [57.4, 24.0, 18.6]
colors = [GREEN_DARK, RED, GRAY]
bars = ax.bar(labels, values, color=colors, width=0.45, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.8,
            f'{val}%', ha='center', va='bottom', fontsize=13, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('응답 비율 (%)', fontsize=11)
ax.set_title('직박구리·꾀꼬리 C·D 표준 음원 구별 결과\n(C=직박구리, D=꾀꼬리 → 정답: 다른 새, N=129)', fontsize=11, fontweight='bold', pad=12)
ax.set_ylim(0, 75)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=11)
save(fig, 'chart4_꾀꼬리구별.png')

# ─── 그림 5: 확신도 비교 ─────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(6, 4), facecolor='white')
categories = ['지빠귀 A·B\n(같은 새)', '직박구리·꾀꼬리 C·D\n(다른 새)']
values = [3.34, 3.05]
colors = [RED, GREEN_MID]
bars = ax.bar(categories, values, color=colors, width=0.4, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.04,
            f'{val}점', ha='center', va='bottom', fontsize=14, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('평균 확신도 (5점 만점)', fontsize=11)
ax.set_title('새소리 구별 평균 확신도 비교\n(1점=전혀 확신 없음, 5점=매우 확신)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 5)
ax.axhline(y=3, color='gray', linestyle='--', alpha=0.5, linewidth=1)
ax.text(1.3, 3.08, '보통(3점)', fontsize=9, color='gray')
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=10)
save(fig, 'chart5_확신도.png')

# ─── 그림 새: 새 지식별 교차분석 (핵심!) ────────────────────────────
fig, ax = plt.subplots(figsize=(6.5, 4.5), facecolor='white')
labels = ['잘 안다\n(n=2)', '조금 안다\n(n=56)', '잘 모른다\n(n=71)']
pcts   = [100.0, 37.5, 22.5]
colors = [BLUE, GREEN_MID, ORANGE]
bars = ax.bar(labels, pcts, color=colors, width=0.45, edgecolor='white')
for bar, val in zip(bars, pcts):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1.5,
            f'{val}%', ha='center', va='bottom', fontsize=14, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('정답률 (%)', fontsize=11)
ax.set_title('새 지식 수준별 A·B 정답률\n(정답=지빠귀 A·B는 같은 새)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 120)
ax.axhline(y=30.2, color='gray', linestyle='--', alpha=0.5, linewidth=1)
ax.text(2.35, 31.5, f'전체 평균\n30.2%', fontsize=9, color='gray')
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=11)
save(fig, 'chart_교차분석.png')

# ─── 그림 인식도 (기존 유지) ─────────────────────────────────────────
fig, ax = plt.subplots(figsize=(5, 4.5), facecolor='white')
labels = ['처음 알았다\n79.1%', '알고 있었다\n20.9%']
sizes  = [79.1, 20.9]
colors = [GREEN_DARK, GREEN_LIGHT]
ax.pie(sizes, labels=labels, colors=colors,
       startangle=90, wedgeprops=dict(width=0.55),
       textprops=dict(fontsize=11, fontweight='bold'))
ax.set_title('AI 새소리 앱 기능 인식도\n(N=129)', fontsize=12, fontweight='bold', pad=12)
save(fig, 'chart8_인식도.png')

# ─── 그림 신뢰도 ─────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(6.5, 4), facecolor='white')
labels = ['매우\n신뢰', '어느정도\n신뢰', '잘\n모르겠다', '별로\n신뢰안함']
values = [5.4, 54.3, 25.6, 14.7]
colors = [GREEN_DARK, GREEN_MID, GRAY, RED]
bars = ax.bar(labels, values, color=colors, width=0.5, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
            f'{val}%', ha='center', va='bottom', fontsize=12, fontweight='bold',
            color=bar.get_facecolor())
ax.axvline(x=1.5, color='gray', linestyle='--', alpha=0.4)
ax.text(0.5, 62, '신뢰 합계 59.7%', ha='center', fontsize=10,
        color=GREEN_DARK, fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#d8f3dc', edgecolor=GREEN_DARK, alpha=0.7))
ax.set_ylabel('응답 비율 (%)', fontsize=11)
ax.set_title('AI 새소리 인식 앱 결과 신뢰도\n(N=129)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 70)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
save(fig, 'chart9_신뢰도.png')

sys.stdout.buffer.write(b"\n[DONE] All charts regenerated.\n")

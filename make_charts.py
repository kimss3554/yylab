#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
from PIL import Image
import os

OUT = r"C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아\charts"
os.makedirs(OUT, exist_ok=True)

# 한글 폰트 설정
plt.rcParams['font.family'] = 'Malgun Gothic'
plt.rcParams['axes.unicode_minus'] = False

GREEN_DARK = '#1b4332'
GREEN_MID  = '#2d6a4f'
GREEN_LIGHT= '#74c69d'
RED        = '#c0392b'
GRAY       = '#6c757d'
BG         = '#f8f9fa'

def save(fig, name):
    path = os.path.join(OUT, name)
    fig.savefig(path, dpi=180, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print("Saved: " + name)

# ── 그림 1. 두 앱 1순위 일치율 비교 ─────────────────────────────
fig, ax = plt.subplots(figsize=(6, 4), facecolor='white')
categories = ['지빠귀류\n(n=16)', '다른 새\n(n=31)']
values = [6.2, 51.6]
colors = [RED, GREEN_DARK]
bars = ax.bar(categories, values, color=colors, width=0.45, edgecolor='white', linewidth=1.5)
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1.5,
            f'{val}%', ha='center', va='bottom', fontsize=15, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('일치율 (%)', fontsize=11)
ax.set_title('두 AI 앱이 같은 새로 판단한 비율(일치율) 비교', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 70)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=11)
save(fig, 'chart1_일치율.png')

# ── 그림 2. BirdNET 평균 후보 새 수 ────────────────────────────
fig, ax = plt.subplots(figsize=(5.5, 4), facecolor='white')
categories = ['지빠귀류\n(n=16)', '다른 새\n(n=31)']
values = [2.69, 1.90]
colors = [RED, GREEN_DARK]
bars = ax.bar(categories, values, color=colors, width=0.4, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.04,
            f'{val}마리', ha='center', va='bottom', fontsize=14, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('평균 후보 수 (마리)', fontsize=11)
ax.set_title('BirdNET 평균 후보 새 수\n(숫자가 높을수록 AI가 더 헷갈림)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 3.5)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=11)
save(fig, 'chart2_후보수.png')

# ── 그림 3. 지빠귀 A·B 구별 결과 ────────────────────────────────
fig, ax = plt.subplots(figsize=(5.5, 4), facecolor='white')
labels = ['다른 새\n(정답)', '같은 새\n(오답)', '모르겠다']
values = [62.0, 30.2, 7.8]
colors = [GREEN_DARK, RED, GRAY]
bars = ax.bar(labels, values, color=colors, width=0.45, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.8,
            f'{val}%', ha='center', va='bottom', fontsize=13, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('응답 비율 (%)', fontsize=11)
ax.set_title('지빠귀 A·B 표준 음원 구별 결과\n(N=129)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 80)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=11)
save(fig, 'chart3_지빠귀구별.png')

# ── 그림 4. 직박구리·까치 C·D 구별 결과 ─────────────────────────
fig, ax = plt.subplots(figsize=(5.5, 4), facecolor='white')
labels = ['다른 새\n(정답)', '같은 새\n(오답)', '모르겠다']
values = [57.4, 32.6, 10.0]
colors = [GREEN_DARK, RED, GRAY]
bars = ax.bar(labels, values, color=colors, width=0.45, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.8,
            f'{val}%', ha='center', va='bottom', fontsize=13, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('응답 비율 (%)', fontsize=11)
ax.set_title('직박구리·까치 C·D 표준 음원 구별 결과\n(N=129)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 80)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=11)
save(fig, 'chart4_직박구리구별.png')

# ── 그림 5. 새소리 구별 평균 확신도 비교 ─────────────────────────
fig, ax = plt.subplots(figsize=(6, 4), facecolor='white')
categories = ['지빠귀 A·B\n(다른 종)', '직박구리·까치 C·D\n(다른 종)']
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
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=10)
save(fig, 'chart5_확신도.png')

# ── 그림 6. 장소별 평균 후보 새 수 ─────────────────────────────
fig, ax = plt.subplots(figsize=(6.5, 4), facecolor='white')
places = ['아파트단지\n(n=5)', '학교\n(n=4)', '집\n(n=18)', '우장산\n(n=20)']
values = [1.40, 1.67, 2.17, 2.50]
colors = [GREEN_LIGHT, GREEN_MID, GREEN_DARK, RED]
bars = ax.bar(places, values, color=colors, width=0.5, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.04,
            f'{val}', ha='center', va='bottom', fontsize=13, fontweight='bold',
            color=bar.get_facecolor() if bar.get_facecolor() != GREEN_LIGHT else GREEN_DARK)
ax.set_ylabel('평균 후보 수 (마리)', fontsize=11)
ax.set_title('장소별 평균 후보 새 수(BirdNET)\n조용할수록 낮고, 새가 많은 곳일수록 높음', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 3.5)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=10)
save(fig, 'chart6_장소별.png')

# ── 그림 7. 날씨별 평균 후보 새 수 ─────────────────────────────
fig, ax = plt.subplots(figsize=(5, 4), facecolor='white')
weathers = ['맑음', '구름·바람']
values = [1.73, 2.43]
colors = [GREEN_DARK, RED]
bars = ax.bar(weathers, values, color=colors, width=0.35, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.04,
            f'{val}', ha='center', va='bottom', fontsize=14, fontweight='bold',
            color=bar.get_facecolor())
ax.set_ylabel('평균 후보 수 (마리)', fontsize=11)
ax.set_title('날씨별 평균 후보 새 수(BirdNET)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 3.2)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=12)
save(fig, 'chart7_날씨별.png')

# ── 그림 8. AI 앱 인식도 (도넛) ─────────────────────────────────
fig, ax = plt.subplots(figsize=(5, 4.5), facecolor='white')
labels = ['처음 알았다\n79.1%', '알고 있었다\n20.9%']
sizes  = [79.1, 20.9]
colors = [GREEN_DARK, GREEN_LIGHT]
wedges, texts = ax.pie(sizes, labels=labels, colors=colors,
                       startangle=90, wedgeprops=dict(width=0.55),
                       textprops=dict(fontsize=11, fontweight='bold'))
ax.set_title('AI 새소리 앱 기능 인식도\n(N=129)', fontsize=12, fontweight='bold', pad=12)
save(fig, 'chart8_인식도.png')

# ── 그림 9. AI 결과 신뢰도 ───────────────────────────────────────
fig, ax = plt.subplots(figsize=(6.5, 4), facecolor='white')
labels = ['매우\n신뢰', '어느정도\n신뢰', '잘\n모르겠다', '신뢰하지\n않음']
values = [27.9, 31.8, 24.0, 16.3]
colors = [GREEN_DARK, GREEN_MID, GRAY, RED]
bars = ax.bar(labels, values, color=colors, width=0.5, edgecolor='white')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
            f'{val}%', ha='center', va='bottom', fontsize=12, fontweight='bold',
            color=bar.get_facecolor())
# 신뢰 합계 표시
ax.axvline(x=1.5, color='gray', linestyle='--', alpha=0.4)
ax.text(0.5, 36, '신뢰 합계 59.7%', ha='center', fontsize=10,
        color=GREEN_DARK, fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#d8f3dc', edgecolor=GREEN_DARK, alpha=0.7))
ax.set_ylabel('응답 비율 (%)', fontsize=11)
ax.set_title('AI 새소리 인식 앱 결과 신뢰도\n(N=129)', fontsize=12, fontweight='bold', pad=12)
ax.set_ylim(0, 45)
ax.set_facecolor(BG)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(labelsize=10)
save(fig, 'chart9_신뢰도.png')

print("\n모든 차트 생성 완료!")
print("저장 위치: " + OUT)

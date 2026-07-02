#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Rectangle
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import io

# A1 사이즈: 594mm × 841mm @ 300dpi = 7016 × 9933px
# 웹용 150dpi: 3508 × 4972px (작업 용이)
# 최종 300dpi로 2배 렌더링

DPI = 150
WIDTH_MM = 594
HEIGHT_MM = 841
WIDTH_PX = int(WIDTH_MM * DPI / 25.4)
HEIGHT_PX = int(HEIGHT_MM * DPI / 25.4)

print(f"포스터 사이즈: {WIDTH_PX}×{HEIGHT_PX}px ({DPI}dpi)")

# PIL로 이미지 생성 (300dpi 최종본)
img = Image.new('RGB', (WIDTH_PX * 2, HEIGHT_PX * 2), color=(255, 255, 255))
draw = ImageDraw.Draw(img)

# 폰트 설정
try:
    title_font = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 140)
    subtitle_font = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 70)
    section_font = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 55)
    text_font = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 40)
    small_font = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 32)
except:
    print("폰트 로드 실패, 기본 폰트 사용")
    title_font = subtitle_font = section_font = text_font = small_font = None

# 색상 정의
DARK_GREEN = (27, 67, 50)      # #1b4332
MINT = (116, 198, 157)         # #74c69d
LIGHT_MINT = (180, 230, 215)   # #b4e6d7
RED = (220, 53, 69)            # #dc3545
DARK_GRAY = (60, 60, 60)
LIGHT_GRAY = (200, 200, 200)

def draw_text_center(draw, text, xy, font, fill, width=None):
    """중앙 정렬 텍스트"""
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    if width:
        x = xy[0] + (width - text_width) // 2
    else:
        x = xy[0] - text_width // 2
    draw.text((x, xy[1]), text, font=font, fill=fill)

def draw_text_wrap(draw, text, xy, font, fill, max_width, line_height=50):
    """줄 바꿈 텍스트"""
    words = text.split(' ')
    lines = []
    current_line = []

    for word in words:
        current_line.append(word)
        line_text = ' '.join(current_line)
        bbox = draw.textbbox((0, 0), line_text, font=font)
        if bbox[2] - bbox[0] > max_width and len(current_line) > 1:
            current_line.pop()
            lines.append(' '.join(current_line))
            current_line = [word]
    lines.append(' '.join(current_line))

    y = xy[1]
    for line in lines:
        draw.text((xy[0], y), line, font=font, fill=fill)
        y += line_height

# ===== 포스터 디자인 =====

# 1. 상단 배경 (짙은 녹색)
draw.rectangle([(0, 0), (WIDTH_PX * 2, int(HEIGHT_PX * 2 * 0.18))], fill=DARK_GREEN)

# 2. 제목
title_text = "AI 새소리 인식 앱은 왜\n지빠귀를 헷갈릴까?"
y_pos = int(HEIGHT_PX * 2 * 0.05)
draw.text((int(WIDTH_PX * 0.15), y_pos), title_text, font=title_font, fill=(255, 255, 255))

# 3. 탐구 주제 서브타이틀
subtitle_text = "AI와 사람의 새소리 인식 능력 비교"
draw.text((int(WIDTH_PX * 0.15), int(HEIGHT_PX * 2 * 0.14)), subtitle_text, font=subtitle_font, fill=MINT)

# ===== 탐구 배경 섹션 =====
y_section = int(HEIGHT_PX * 2 * 0.22)
draw.text((int(WIDTH_PX * 0.1), y_section), "탐구 배경", font=section_font, fill=DARK_GREEN)

bg_text = "지빠귀의 울음소리가 비슷해서 AI 앱이 자주 헷갈리는 현상 발견\n→ AI는 정말 지빠귀를 구별할 수 없을까?"
draw.text((int(WIDTH_PX * 0.1), int(HEIGHT_PX * 2 * 0.28)), bg_text, font=text_font, fill=DARK_GRAY)

# ===== 연구 방법 섹션 =====
y_section = int(HEIGHT_PX * 2 * 0.38)
draw.text((int(WIDTH_PX * 0.1), y_section), "연구 방법", font=section_font, fill=DARK_GREEN)

method_text = "• 표본: 22개 종류, 47개 녹음 샘플\n• 도구: BirdNET, Bird Identifier 2개 앱 비교\n• 환경: 장소별, 날씨별, 시간별 영향 분석\n• 설문: 129명 대상 새소리 인식 조사"
draw.text((int(WIDTH_PX * 0.1), int(HEIGHT_PX * 2 * 0.44)), method_text, font=text_font, fill=DARK_GRAY)

# ===== 연구 결과 섹션 (중앙 하이라이트) =====
y_section = int(HEIGHT_PX * 2 * 0.62)
draw.text((int(WIDTH_PX * 0.1), y_section), "연구 결과", font=section_font, fill=DARK_GREEN)

# 결과1: 지빠귀 vs 다른 새
result1_y = int(HEIGHT_PX * 2 * 0.70)
draw.rectangle([(int(WIDTH_PX * 0.08), result1_y), (int(WIDTH_PX * 0.92), int(result1_y + HEIGHT_PX * 0.12))],
               outline=MINT, width=3)
draw.text((int(WIDTH_PX * 0.1), int(result1_y + 20)), "결과 1. 지빠귀는 AI도 못 구별한다",
          font=section_font, fill=RED)
result1_detail = "두 앱 1순위 일치율:  지빠귀 6.2%  |  다른 새 51.6%\nAI가 지빠귀에서 8배 이상 헷갈린다!"
draw.text((int(WIDTH_PX * 0.1), int(result1_y + 70)), result1_detail, font=text_font, fill=DARK_GRAY)

# 결과2: 환경 영향
result2_y = int(HEIGHT_PX * 2 * 0.84)
draw.text((int(WIDTH_PX * 0.1), result2_y), "결과 2. 환경이 AI 정확도에 영향", font=section_font, fill=RED)
result2_detail = "조용한 곳(아파트) ➜ 시끄러운 곳(산):  1.40 ➜ 2.50\n(숫자가 클수록 AI가 더 헷갈림)"
draw.text((int(WIDTH_PX * 0.1), int(result2_y + 55)), result2_detail, font=text_font, fill=DARK_GRAY)

# 결과3: 설문 조사
result3_y = int(HEIGHT_PX * 2 * 0.96)
draw.text((int(WIDTH_PX * 0.1), result3_y), "결과 3. 설문조사 (129명)", font=section_font, fill=RED)
result3_detail = "새 지식: 55% '잘 모른다'  |  AI 신뢰도: 60% '신뢰한다'"
draw.text((int(WIDTH_PX * 0.1), int(result3_y + 55)), result3_detail, font=text_font, fill=DARK_GRAY)

# ===== 하단 결론 =====
conclusion_y = int(HEIGHT_PX * 2 * 1.14)
draw.rectangle([(0, int(conclusion_y - 40)), (WIDTH_PX * 2, int(conclusion_y + 100))], fill=LIGHT_MINT)
draw.text((int(WIDTH_PX * 0.1), conclusion_y), "결론: AI도 사람처럼 지빠귀 구별이 어렵다. 환경이 중요한 영향을 미친다.",
          font=section_font, fill=DARK_GREEN)

# ===== 푸터 =====
footer_y = int(HEIGHT_PX * 2 * 1.26)
footer_text = "탐구 기간: 2026년 5월~6월  |  참고: BirdNET (Cornell Lab of Ornithology)"
draw.text((int(WIDTH_PX * 0.1), footer_y), footer_text, font=small_font, fill=DARK_GRAY)

# ===== 파일 저장 =====
output_path = r"C:\Users\yylab\Downloads\배이아_포스터_A1_통계활용대회.png"
img.save(output_path, dpi=(300, 300), quality=95)
print("Save completed: " + output_path)
print("File size: {:.2f}MB".format(os.path.getsize(output_path) / 1024 / 1024))

# 이미지 정보 출력
print("Image size: {}x{}px".format(img.size[0], img.size[1]))

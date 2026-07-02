#!/usr/bin/env python
"""
PDF/이미지 OCR 스크립트 (EasyOCR 사용)
사용법:
  python ocr_pdf.py <pdf_or_image_path> [출력파일.txt]
  python ocr_pdf.py raw/some.pdf                  # raw/*.txt로 저장
  python ocr_pdf.py image.png output.txt
"""
import sys
import os
import re
import numpy as np
from pathlib import Path
from PIL import Image

os.environ['PYTHONIOENCODING'] = 'utf-8'


def get_reader():
    import easyocr
    return easyocr.Reader(['ko', 'en'], gpu=False, verbose=False)


def pdf_to_images(pdf_path, dpi=200):
    import fitz
    doc = fitz.open(pdf_path)
    images = []
    for page in doc:
        mat = fitz.Matrix(dpi / 72, dpi / 72)
        pix = page.get_pixmap(matrix=mat)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        images.append(img)
    return images


def ocr_image(reader, img):
    img_array = np.array(img)
    results = reader.readtext(img_array)
    # 신뢰도 0.1 이상만, y좌표로 정렬
    results.sort(key=lambda r: r[0][0][1])  # top-left y
    lines = [text for (_, text, prob) in results if prob > 0.1]
    return '\n'.join(lines)


def main():
    if len(sys.argv) < 2:
        print("사용법: python ocr_pdf.py <파일경로> [출력파일.txt]")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    if len(sys.argv) >= 3:
        output_path = Path(sys.argv[2])
    else:
        output_path = input_path.with_suffix('.txt')

    print(f"OCR 시작: {input_path}", flush=True)
    reader = get_reader()

    if input_path.suffix.lower() == '.pdf':
        images = pdf_to_images(str(input_path))
        print(f"  페이지 수: {len(images)}", flush=True)
        all_text = []
        for i, img in enumerate(images, 1):
            print(f"  페이지 {i}/{len(images)} 처리 중...", flush=True)
            text = ocr_image(reader, img)
            all_text.append(f"=== PAGE {i} ===\n{text}")
        full_text = '\n\n'.join(all_text)
    else:
        img = Image.open(str(input_path))
        full_text = ocr_image(reader, img)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(full_text, encoding='utf-8')
    print(f"저장 완료: {output_path} ({len(full_text)}자)", flush=True)


if __name__ == '__main__':
    main()

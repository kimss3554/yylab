# 입시결과 수집 결과 — 그룹 B

> 수집일: 2026-06-14  
> 수집 방법: WebFetch를 통한 각 대학 입학처 공식 사이트 접근

---

## 수집 성공

| 대학 | 연도 | 전형 | 저장 파일 | 추합 데이터 |
|------|------|------|-----------|------------|
| — | — | — | — | — |

*직접 텍스트/PDF 추출 성공 건 없음. 아래 URL 확보 및 수집 불가 섹션 참조.*

---

## URL 확보 (직접 다운로드 필요)

### 동국대 (ipsi.dongguk.edu)

접근 가능한 데이터 페이지 목록:

| 대학 | 자료명 | URL | 사유 |
|------|--------|-----|------|
| 동국대 | 수시 합격자현황(경쟁률) 메인 | https://ipsi.dongguk.edu/admission/html/rolling/competition.asp | JS 동적 로딩, 연도별 링크가 #으로만 표시됨 |
| 동국대 | 정시 합격자현황(경쟁률) 메인 | https://ipsi.dongguk.edu/admission/html/regular/competition.asp | JS 동적 로딩, 연도별 파일은 XLS |
| 동국대 | 수시 자료 목록 (전년도 결과 포함) | https://ipsi.dongguk.edu/admission/html/rolling/data.asp | JS 동적 로딩; 2026학년도 수시 교과성적 자료(PDF) 목록 확인됨 |
| 동국대 | 정시 자료 목록 | https://ipsi.dongguk.edu/admission/html/regular/data.asp | JS 동적 로딩; 2021학년도 정시 경쟁률현황.xlsx, 추적관찰 합격표기준표.xlsx 확인됨 |
| 동국대 | 2026학년도 수시 교과성적 자료 (PDF) | https://ipsi.dongguk.edu/admission/html/rolling/data.asp?idx=169 | 브라우저 직접 접속 시 PDF 다운로드 가능 (WebFetch로 직접 URL 미추출) |
| 동국대 | 2025학년도 수시 교과성적 자료 (PDF) | https://ipsi.dongguk.edu/admission/html/rolling/data.asp?idx=168 | 브라우저 직접 접속 시 PDF 다운로드 가능 |

**동국대 확인 자료 목록 (브라우저 직접 다운로드 필요):**
- 2026학년도 수시모집 교과성적 자료 (PDF, 2026.03.25)
- 2025학년도 수시모집 교과성적 자료 (PDF, 2025.04.08)
- 2021학년도 정규전형 경쟁률현황 (XLSX)
- 2021학년도 정시 추적관찰 합격표기준표 (XLSX)
- 2021학년도 정규전형 입시 기본정보 (HWP)

---

## 수집 불가

| 대학 | URL | 사유 |
|------|-----|------|
| 건국대 | https://apply.konkuk.ac.kr/apply/html/sub04/sub04_02.asp | ECONNREFUSED (서버 연결 거부) |
| 건국대 | https://apply.konkuk.ac.kr/ | ECONNREFUSED (서버 연결 거부) |
| 홍익대 | https://iphak.hongik.ac.kr/iphak/html/sub03/sub03_05.asp | ECONNREFUSED (서버 연결 거부) |
| 홍익대 | https://iphak.hongik.ac.kr/ | 호스트 찾기 실패 (DNS/연결 오류) |
| 숙명여대 | https://admission.sookmyung.ac.kr/admission/result/ | HTTP 500 Internal Server Error |
| 숙명여대 | https://admission.sookmyung.ac.kr/admission/result/susi | HTTP 500 Internal Server Error |
| 서울시립대 | https://admission.uos.ac.kr/admission/html/sub04/sub04_04.asp | 302 리다이렉트 후 404 Not Found |
| 서울시립대 | https://admission.uos.ac.kr/ | 콘텐츠 없음 (JS 의존 빈 페이지) |
| 숭실대 | https://ipsi.ssu.ac.kr/ | 자체 서명 인증서 오류 (SSL 오류) |
| 세종대 | https://admission.sejong.ac.kr/ | ECONNREFUSED (서버 연결 거부) |
| 광운대 | https://admission.kw.ac.kr/ | ECONNREFUSED (서버 연결 거부) |
| 국민대 | https://admission.kookmin.ac.kr/ | 콘텐츠 없음 (JS 의존 빈 페이지) |
| 단국대 | https://admission.dankook.ac.kr/ | ECONNREFUSED (서버 연결 거부) |
| 가톨릭대 | https://ipsi.catholic.ac.kr/ | 콘텐츠 없음 (JS 의존 빈 페이지) |
| 한국외대 | https://enter.hufs.ac.kr/ | ECONNREFUSED (서버 연결 거부) |

---

## 수집 장애 유형 분석

| 유형 | 대학 수 | 해당 대학 |
|------|--------|-----------|
| ECONNREFUSED (서버 거부) | 7 | 건국대, 홍익대, 세종대, 광운대, 단국대, 한국외대, 숭실대(SSL) |
| JS 의존 빈 페이지 | 3 | 국민대, 가톨릭대, 서울시립대 |
| 서버 오류 (4xx/5xx) | 2 | 숙명여대(500), 동국대 일부 링크(404) |
| 부분 성공 (URL 확보) | 1 | 동국대 |

---

## 권장 조치

### 1순위: 브라우저 직접 접속으로 즉시 다운로드 가능
- **동국대**: 위 URL 확보 섹션의 data.asp?idx= 링크들 — 수시 교과성적 PDF 2개, 정시 경쟁률 XLSX

### 2순위: Selenium/Playwright 브라우저 자동화 필요
- 국민대, 가톨릭대, 서울시립대 — JS 렌더링 후 동적 로딩

### 3순위: 학교 측 직접 문의 또는 유웨이/진학사 등 입시정보 사이트 활용
- 건국대, 홍익대, 세종대, 광운대, 단국대, 한국외대
- 접속 자체가 거부되어 WebFetch로는 수집 불가

### 대체 수집 경로 (입시 통합 사이트)
- 유웨이 (www.uwayapply.com) — 대학별 입시결과 통합 제공
- 진학사 (www.jinhak.com) — 합격예측 데이터 및 입시결과
- 어디가 (www.adiga.kr) — 교육부 공식 대학입시정보포털

---

## 메모

- 동국대 입시 사이트는 접속 가능하나 실제 파일 링크는 JavaScript 클릭 이벤트로 처리됨
- 대부분 대학 입학처 사이트가 SPA(Single Page Application) 방식으로 운영되어 정적 WebFetch로는 한계
- 수시 합격자 내신 70%컷·추합 데이터는 PDF/엑셀 내부에 있어 브라우저 다운로드 후 별도 추출 필요

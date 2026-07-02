const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  Header, Footer, PageNumber, VerticalAlign
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerBorder = { style: BorderStyle.SINGLE, size: 1, color: "4472C4" };
const headerBorders = { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder };

function h(text, level) {
  return new Paragraph({ heading: level, children: [new TextRun({ text, bold: true })] });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, ...opts })]
  });
}

function blank() {
  return new Paragraph({ children: [new TextRun("")], spacing: { after: 80 } });
}

function makeTable(headers, rows, colWidths) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          borders: headerBorders,
          width: { size: colWidths[i], type: WidthType.DXA },
          shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, size: 20 })] })]
        }))
      }),
      ...rows.map(row => new TableRow({
        children: row.map((cell, i) => new TableCell({
          borders,
          width: { size: colWidths[i], type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })]
        }))
      }))
    ]
  });
}

const reportSections = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2000, after: 400 }, children: [new TextRun({ text: "AI 새소리 인식 앱은 왜 지빠귀를 헷갈릴까?", bold: true, size: 40, color: "1F4E79" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "세소리 인식 앱과 사람의 세소리 구별 능력 비교", size: 26, color: "2E75B6" })] }),
  blank(),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: "통계활용대회 탐구 포스터", bold: true, size: 24, color: "1F4E79" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "탐구 기간: 2026년 5월 ~ 6월", size: 24 })] }),

  blank(),
  h("1. 탐구 배경", HeadingLevel.HEADING_1),
  p("새를 좋아해서 『새들의 밥상』을 읽고 새마다 소리가 모두 다르다는 것을 알게 되었다. 이후 BirdNET 앱을 이용해 학원 가는 길, 집 앞, 우장산에서 새소리가 들릴 때마다 직접 녹음하며 기록했다."),
  p("총 22종의 새소리를 수집하는 과정에서 이상한 점을 발견했다. 까치, 직박구리, 소쩍새 등 대부분의 새는 녹음할 때마다 같은 결과가 나왔는데, **지빠귀 소리만 녹음할 때마다 다른 종으로 결과가 나왔다.** 심지어 5월에 한국에서 거의 볼 수 없는 유럽 새인 회색머리지빠귀가 결과로 나오기도 했다."),
  p("왜 AI 앱은 지빠귀 소리를 제대로 식별하지 못하는 걸까? 이 의문에서 이 연구가 시작되었다."),

  blank(),
  h("2. 선행연구 및 배경지식", HeadingLevel.HEADING_1),
  h("2-1. BirdNET의 작동 방식", HeadingLevel.HEADING_2),
  p("BirdNET은 미국 코넬대학교와 독일 켐니츠공과대학교가 공동 개발한 AI 새소리 인식 앱이다. 공식 사이트에 따르면 다음 4단계로 작동한다."),
  blank(),
  makeTable(
    ["단계", "내용"],
    [
      ["① 캡처", "오디오를 48kHz로 캡처하여 3초 단위로 분할"],
      ["② 스펙트로그램", "소리를 0~3kHz 및 150Hz~15kHz 범위의 멜 스펙트로그램으로 변환"],
      ["③ 신경망", "CNN(합성곱 신경망)으로 종별 특이적 패턴 감지"],
      ["④ 결과", "녹음 위치·날짜 메타데이터와 결합하여 최종 종 확률 산출"],
    ],
    [2000, 7360]
  ),
  blank(),
  p("*(출처: birdnet.cornell.edu)", { italics: true, size: 18, color: "666666" }),
  p("특히 4단계에서 위치와 날짜 정보를 반영한다는 점이 이 연구의 핵심 검증 대상이 되었다."),

  blank(),
  h("2-2. 한국의 지빠귀 종류", HeadingLevel.HEADING_2),
  p("국가생물종정보시스템 및 관련 자료에 따르면 한국에서 관찰되는 지빠귀속(Turdus) 새는 최소 8종 이상이다. 새를 관찰하는 탐조인들 사이에서도 지빠귀는 \"종류가 너무 많아 구별이 어렵다\"고 알려진 새이다."),
  blank(),
  makeTable(
    ["종 이름", "한국 서식 형태"],
    [
      ["호랑지빠귀", "여름철새, 흔함"],
      ["개똥지빠귀", "겨울철새, 흔함"],
      ["흰눈썹지빠귀", "봄·가을 통과"],
      ["되지빠귀", "봄·가을, 여름번식"],
      ["대륙검은지빠귀", "드문 미조"],
      ["회색머리지빠귀", "매우 희귀 (유럽 텃새)"],
    ],
    [4680, 4680]
  ),
  blank(),
  p("반면 직박구리와 까치는 각각 1종만 한국에 서식한다."),

  blank(),
  h("3. 연구 질문", HeadingLevel.HEADING_1),
  new Paragraph({
    spacing: { after: 120, before: 120 },
    indent: { left: 720 },
    children: [new TextRun({ text: "AI 새소리 인식 앱은 왜 지빠귀를 일관되게 식별하지 못하는가?", bold: true, size: 26, color: "1F4E79" })]
  }),
  new Paragraph({
    spacing: { after: 120 },
    indent: { left: 720 },
    children: [new TextRun({ text: "그리고 사람도 지빠귀 소리를 구별하기 어려운가?", bold: true, size: 26, color: "1F4E79" })]
  }),

  blank(),
  h("4. 가설", HeadingLevel.HEADING_1),
  makeTable(
    ["번호", "가설"],
    [
      ["H1", "지빠귀는 한국에 서식하는 종류가 많고 소리가 서로 비슷하여 AI가 구별하기 어려울 것이다"],
      ["H2", "녹음 환경(장소, 날씨)이 나쁠수록 AI의 신뢰도가 낮고 결과가 일관되지 않을 것이다"],
      ["H3", "BirdNET과 Bird Identifier 두 앱 모두 지빠귀에서 불일치가 가장 크게 나타날 것이다"],
      ["H4", "사람도 지빠귀 소리를 다른 새 소리와 구별하기 어려울 것이다"],
    ],
    [1500, 7860]
  ),

  blank(),
  h("5. 연구 방법", HeadingLevel.HEADING_1),
  h("5-1. 표본 수집", HeadingLevel.HEADING_2),
  makeTable(
    ["항목", "내용"],
    [
      ["기간", "2026년 5월 ~ 6월"],
      ["장소", "우장산(산), 집 앞(공원), 학원 가는 길(길거리)"],
      ["도구", "스마트폰 + BirdNET 앱"],
      ["샘플 수", "총 47개 (22종: 지빠귀 6종 16개, 다른 새 16종 31개)"],
    ],
    [2400, 6960]
  ),
  blank(),
  p("녹음 시 날짜, 시간, 장소, 날씨, 주변 소음 환경을 함께 기록했다."),

  blank(),
  h("5-2. 앱 비교 분석", HeadingLevel.HEADING_2),
  p("수집한 47개 샘플 전체를 2개 앱(BirdNET, Bird Identifier by Sound AI ID)에 동일하게 적용하여 결과를 비교했다."),

  blank(),
  h("5-3. 환경 영향 분석", HeadingLevel.HEADING_2),
  makeTable(
    ["변수", "기록 방식"],
    [
      ["장소", "우장산(산) / 집 앞(공원) / 학원 가는 길(길거리)"],
      ["날씨", "맑음 / 흐림·바람"],
      ["시간대", "오전 / 오후 / 저녁"],
    ],
    [3120, 6360]
  ),

  blank(),
  h("5-4. 사람 설문 조사", HeadingLevel.HEADING_2),
  p("대상: 129명 / 방법: 구글 폼 링크 배포 / 음원: 국립생물자원관·Xeno-canto 표준 음원 사용"),
  blank(),
  makeTable(
    ["섹션", "내용"],
    [
      ["1부", "지빠귀 A·B 음원 → 같은 새인가, 다른 새인가? → 구별 확신도"],
      ["2부", "직박구리·까치 음원 → 같은 새인가, 다른 새인가? → 구별 확신도"],
      ["3부", "AI 기능 인식도, AI 결과 신뢰도, 새 지식 수준"],
    ],
    [1500, 7860]
  ),

  blank(),
  h("6. 결과", HeadingLevel.HEADING_1),
  blank(),
  h("6-1. 결과 1: 지빠귀는 AI도 못 구별한다", HeadingLevel.HEADING_2),
  makeTable(
    ["새 종류", "샘플 수", "두 앱 1순위 일치", "일치율"],
    [
      ["지빠귀 (6종)", "16개", "1개", "6.2%"],
      ["다른 새 (16종)", "31개", "16개", "51.6%"],
      ["전체", "47개", "17개", "36.2%"],
    ],
    [2340, 2340, 2340, 2340]
  ),
  blank(),
  p("지빠귀의 일치율이 다른 새 대비 **8배 이상 낮다.** 이는 가설 H3을 강하게 지지한다."),
  blank(),
  p("BirdNET 평균 후보 수: 지빠귀 2.69마리 vs 다른 새 1.90마리 (41% 높음)"),

  blank(),
  h("6-2. 결과 2: 세가 좋을수록 AI는 정확하다", HeadingLevel.HEADING_2),
  makeTable(
    ["조건", "후보 수"],
    [
      ["장소: 아파트단지 (가장 조용)", "1.40"],
      ["장소: 학교", "1.67"],
      ["장소: 집 앞", "2.17"],
      ["장소: 우장산·산 (가장 시끄러움)", "2.50"],
      ["날씨: 맑음", "1.73"],
      ["날씨: 구름·바람 (악천후)", "2.43"],
    ],
    [3120, 3120]
  ),
  blank(),
  p("환경이 좋을수록 AI 난해도가 낮다. 조용한 아파트(1.40)에서 시끄러운 산(2.50)까지 1.1배 증가. 가설 H2를 지지한다."),

  blank(),
  h("6-3. 결과 3: 사람도 지빠귀 구별이 어렵다", HeadingLevel.HEADING_2),
  blank(),
  p("응답자 구성 (N=129)", { bold: true }),
  makeTable(
    ["항목", "인원", "%"],
    [
      ["연령: 10대", "103", "79.8%"],
      ["새 지식: 잘 모른다", "71", "55.0%"],
      ["새 지식: 잘 안다", "40", "31.0%"],
      ["새 지식: 조금 안다", "18", "14.0%"],
    ],
    [3120, 1560, 1560]
  ),
  blank(),
  p("지빠귀 A·B 구별 결과", { bold: true }),
  makeTable(
    ["응답", "인원", "%"],
    [
      ["다른 새 (정답)", "64", "49.6%"],
      ["같은 새 (오답)", "43", "33.3%"],
      ["모르겠다", "22", "17.1%"],
    ],
    [3120, 1560, 1560]
  ),
  blank(),
  p("평균 구별 확신도: 지빠귀 A·B = 3.34/5점, 직박구리·까치 = 3.05/5점"),
  p("**33.3%의 사람도 서로 다른 지빠귀 2종을 같은 새라고 답했다.** AI와 마찬가지로 사람도 어렵다."),

  blank(),
  p("AI 기술 인식도", { bold: true }),
  makeTable(
    ["질문", "응답"],
    [
      ["AI 새소리 앱 기능 인식", "처음 알았다 79.1%, 알았다 20.9%"],
      ["AI 결과 신뢰도", "신뢰함 59.7% (매우신뢰 27.9% + 어느정도 31.8%)"],
    ],
    [3120, 6360]
  ),

  blank(),
  h("6-4. 주목할 사례", HeadingLevel.HEADING_2),
  p("【사례 1】 회색머리지빠귀 (5월 10일 오후 6시 26분 녹음)", { bold: true }),
  p("BirdNET이 5월에 한국에 없는 유럽 새를 결과로 제시한 사례. 위치와 날짜를 반영한다는 공식 설명과 불일치한다."),
  blank(),
  p("【사례 2】 Light-vented Bulbul (중국직박구리)", { bold: true }),
  p("한국 직박구리(갈색귀직박구리)가 아닌 중국직박구리로 오인식. 지빠귀뿐 아니라 다른 종에서도 혼동이 발생한다."),

  blank(),
  h("7. 분석", HeadingLevel.HEADING_1),
  blank(),
  p("【분석 1】 왜 지빠귀만 결과가 다를까?", { bold: true }),
  p("한국에 서식하는 지빠귀는 8종 이상인데, 이번 샘플에서도 47개 중 34%가 지빠귀였다. 반면 까치와 직박구리는 각각 1종뿐이다. 지빠귀 종들은 울음소리가 멜로디 계열로 비슷하기 때문에, 주파수 패턴을 분석하는 AI 입장에서는 비슷한 소리를 내는 종이 많을수록 구별이 어려워진다."),
  blank(),
  p("【분석 2】 환경이 정말 중요할까?", { bold: true }),
  p("아파트 → 학교 → 집 → 산으로 갈수록 환경이 시끄러워지면서 AI 후보 수가 1.40 → 2.50으로 증가한다. 깨끗한 환경에서 녹음한 소리는 AI가 더 정확하게 분석하고, 시끄러운 환경에서는 난해도가 높아진다. 맑은 날(1.73)과 악천후(2.43) 비교에서도 동일한 패턴이 나타난다."),
  blank(),
  p("【분석 3】 BirdNET의 한계", { bold: true }),
  p("BirdNET은 \"녹음 위치와 날짜 정보를 반영한다\"고 공식 안내하지만, 5월 서울에서 유럽 새를 결과로 낸 사례처럼 이 기능이 항상 정확하게 작동하지는 않는다. 이는 AI의 신뢰도 한계를 보여준다."),
  blank(),
  p("【분석 4】 사람도 지빠귀를 못 구별한다", { bold: true }),
  p("잡음 없는 표준 음원으로 진행한 설문에서도 33.3%가 지빠귀 2종을 구별하지 못했다. 이는 지빠귀 소리의 유사성이 **AI만의 한계가 아니라 소리 자체의 고유한 특성**임을 의미한다. 사람도 어렵기 때문이다."),

  blank(),
  h("8. 결론", HeadingLevel.HEADING_1),
  blank(),
  p("【결론 1】 AI 앱도 지빠귀를 잘 구별하지 못한다"),
  p("두 앱의 지빠귀 일치율 6.2% vs 다른 새 51.6% → **8배 차이.** 가설 H3 확인."),
  blank(),
  p("【결론 2】 지빠귀가 AI에게 어려운 이유"),
  p("한국에 8종 이상이 서식하고 울음소리가 비슷하기 때문이다. 가설 H1 확인."),
  blank(),
  p("【결론 3】 환경이 정확도를 좌우한다"),
  p("조용한 곳(1.40) vs 시끄러운 곳(2.50): 1.79배 차이. 맑음(1.73) vs 악천후(2.43): 1.40배 차이. 가설 H2 확인."),
  blank(),
  p("【결론 4】 사람도 지빠귀를 구별하기 어렵다"),
  p("설문에서 33.3%가 서로 다른 지빠귀 2종을 같은 새로 답했다. 가설 H4 확인."),
  blank(),
  p("결론: **AI 앱은 도움이 되지만, 환경·계절 정보와 함께 참고하는 것이 중요하다.**"),

  blank(),
  h("9. 한계점 및 후속 연구", HeadingLevel.HEADING_1),
  blank(),
  p("한계점", { bold: true }),
  p("- 스마트폰 기본 마이크로 녹음 (BirdNET 권장 48kHz 미달 가능성)"),
  p("- 표본 수 47개 (일반화에 주의 필요)"),
  p("- 설문과 앱 실험 음원이 다름"),
  p("- 3개 앱 중 2개 앱만 비교"),
  blank(),
  p("후속 연구 제언", { bold: true }),
  p("1. 전문 마이크로 재녹음하여 결과 비교"),
  p("2. Audacity로 지빠귀 주파수 측정 (150Hz~15kHz 범위와 비교)"),
  p("3. 샘플 수 확충 및 계절별·시간대별 정확도 재분석"),
  p("4. 3개 앱 비교 및 정답 데이터 보충"),
  p("5. AI 개발사에 한국 지빠귀 학습 데이터 확충 제안"),

  blank(),
  h("10. 참고 자료", HeadingLevel.HEADING_1),
  p("- BirdNET 공식 사이트: birdnet.cornell.edu"),
  p("- 국립생물자원관 한반도의 생물다양성: species.nibr.go.kr"),
  p("- Xeno-canto 세계 새소리 아카이브: xeno-canto.org"),
  p("- 『새들의 밥상』 (도서)"),
];

const reportDoc = new Document({
  styles: {
    default: { document: { run: { font: "맑은 고딕", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "맑은 고딕", color: "1F4E79" },
        paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "4472C4", space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "맑은 고딕", color: "2E75B6" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1260, bottom: 1440, left: 1260 }
      }
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" })]
      })] })
    },
    children: reportSections
  }]
});

Packer.toBuffer(reportDoc).then(buf => {
  const outputPath = "C:/Users/yylab/OneDrive/바탕 화면/wiki/wiki/outputs/주제탐구보고서/통계대회/배이아/배이아_최종탐구보고서.docx";
  fs.writeFileSync(outputPath, buf);
  console.log("Premium report saved successfully");
  console.log("File: " + outputPath);
});

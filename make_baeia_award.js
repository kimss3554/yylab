const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  Footer, PageNumber, VerticalAlign
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
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, ...opts })] });
}
function bullet(text) {
  return new Paragraph({ spacing: { after: 80 }, bullet: { level: 0 }, children: [new TextRun({ text, size: 22 })] });
}
function blank() {
  return new Paragraph({ children: [new TextRun("")], spacing: { after: 80 } });
}
function fig(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 },
    shading: { fill: "F2F6FB", type: ShadingType.CLEAR },
    children: [new TextRun({ text: text + "  (그래프 위치)", italics: true, size: 20, color: "2E75B6" })]
  });
}
function makeTable(headers, rows, colWidths) {
  const total = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((hd, i) => new TableCell({
          borders: headerBorders,
          width: { size: colWidths[i], type: WidthType.DXA },
          shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: hd, bold: true, size: 20 })] })]
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

const S = [
  // ── 표지 ──
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1800, after: 300 }, children: [new TextRun({ text: "AI 새소리 인식 앱은 왜 지빠귀를 헷갈릴까?", bold: true, size: 40, color: "1F4E79" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "— 새소리 인식 앱의 식별 일관성과 사람의 새소리 구별 능력 통계 분석 —", size: 24, color: "2E75B6" })] }),
  blank(),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "통계활용대회 탐구보고서  |  초등학교 6학년  |  배이아", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "탐구 기간: 2026년 5월 ~ 6월", size: 24 })] }),

  // ── 1. 탐구 동기 ──
  blank(),
  h("1. 탐구 동기: 새가 좋아서 시작한 탐구가 의문으로", HeadingLevel.HEADING_1),
  p("나는 평소 새를 좋아한다. 『새들의 밥상』을 읽고 새마다 소리와 먹이, 습성이 모두 다르다는 것을 알게 되었다. 그 뒤로 새소리가 들리면 그냥 지나치지 않고, 우리 주변에는 어떤 새가 어떤 소리를 내며 살아가는지 더 자세히 알고 싶어졌다."),
  p("우리 동네 우장산 근처에서도 새소리가 많이 들린다. 새로운 새소리를 들을 때마다 스마트폰으로 녹음하고 BirdNET 앱으로 어떤 새인지 확인해 보았다. 처음에는 앱이 알려주는 새 이름을 신기해하며 그대로 믿었다."),
  p("그런데 같은 장소에서 녹음한 소리를 여러 번 분석하는 과정에서 이상한 점을 발견했다. 까치, 직박구리, 소쩍새처럼 특징이 뚜렷한 새는 녹음할 때마다 같은 결과가 나왔지만, 지빠귀류는 같은 소리를 분석해도 다른 종으로 나오거나 후보 종이 여러 개 표시되는 경우가 많았다."),
  p("그래서 이 점을 데이터로 확인하기 위해 우장산, 집 앞, 학원 가는 길에서 새소리를 수집하였다. 그리고 \"BirdNET은 왜 이럴까? 다른 앱도 같은 결과를 낼까?\"라는 의문이 생겼다. 같은 소리를 BirdNET과 Bird Identifier by Sound AI ID에 넣어 서로 비교한 결과, 두 앱이 서로 다른 종을 내는 경우가 많다는 것을 알게 되었다."),
  p("특히 지빠귀류 식별에서 차이가 컸다. 지빠귀는 종류가 많고 소리가 비슷한 계열이라 AI가 헷갈릴 수 있다고 생각했다. 그렇다면 사람은 어떨까? 사람의 귀로는 지빠귀 소리를 더 잘 구별할 수 있을지 궁금하여 설문조사를 실시하였다."),

  // ── 2. 핵심 관점 ──
  blank(),
  h("2. 이 탐구의 핵심 관점: 정확도보다 일관성", HeadingLevel.HEADING_1),
  p("새소리 인식 앱을 평가할 때 보통은 \"정답을 얼마나 맞혔는가(정확도)\"를 본다. 하지만 새소리는 정답이 무엇인지 사람도 확실히 알기 어려운 경우가 많다. 야생의 새가 내는 소리를 사람이 100% 정답으로 확정하기 어렵기 때문이다."),
  p("그래서 나는 AI의 \"정답 맞히기\"가 아니라 \"같은 소리를 같은 결과로 일관되게 인식하는가(일관성)\"를 중심으로 분석하였다. \"BirdNET의 후보 종 개수\", \"같은 소리를 반복 테스트했을 때 결과가 유지되는가\", \"두 앱이 같은 소리에 같은 답을 내는가\"를 중심으로 살펴보았다. 정확도가 아니라 일관성을 보면, 정답을 몰라도 AI가 그 소리를 얼마나 안정적으로 다루는지를 평가할 수 있다."),
  p("반면 사람 설문조사에서는 사람들이 이미 알고 있는 표준 음원을 사용했기 때문에 \"정답(다른 새인지 구별)\"으로 정답률을 계산하였다."),

  // ── 3. 선행자료 및 배경지식 ──
  blank(),
  h("3. 선행자료 및 배경지식", HeadingLevel.HEADING_1),
  h("3-1. BirdNET과 Bird Identifier by Sound AI ID", HeadingLevel.HEADING_2),
  p("BirdNET은 미국 코넬대학교와 독일 켐니츠공과대학교가 공동 개발한 AI 새소리 인식 앱이다. 공식 사이트에 따르면 BirdNET은 머신러닝을 이용해 전 세계 6,000종 이상의 새소리를 인식하며, 녹음 위치와 날짜 정보를 활용해 후보 종 목록을 좁힌다고 안내한다. 또한 오디오를 48kHz로 캡처하고 3초 단위로 나누어 스펙트로그램(소리 그림)으로 변환한 뒤 신경망으로 분석한다."),
  p("Bird Identifier by Sound AI ID는 스마트폰 앱 스토어에서 제공되며 새소리나 사진을 통해 새를 식별하는 앱으로 소개된다. 이 탐구에서는 같은 소리를 BirdNET과 비교하여 두 앱의 결과가 일치하는지 확인하는 데 활용하였다."),
  blank(),
  makeTable(
    ["단계", "BirdNET의 작동 방식"],
    [
      ["① 캡처", "오디오를 48kHz로 캡처하여 3초 단위로 분할"],
      ["② 스펙트로그램", "소리를 멜 스펙트로그램(소리 그림)으로 변환"],
      ["③ 신경망", "CNN(합성곱 신경망)으로 종별 특이 패턴 감지"],
      ["④ 결과", "녹음 위치·날짜 정보와 결합하여 후보 종 확률 산출"],
    ],
    [2200, 7160]
  ),
  blank(),
  p("*(출처: birdnet.cornell.edu)", { italics: true, size: 18, color: "666666" }),

  blank(),
  h("3-2. 한국의 지빠귀 종류", HeadingLevel.HEADING_2),
  p("국립생물자원관 등의 자료에 따르면 한국에서 관찰되는 지빠귀속(Turdus) 새는 8종 이상이다. 지빠귀들은 생김새는 조금씩 다르지만 울음소리의 멜로디 계열이 비슷하여 탐조인들 사이에서도 \"구별이 어려운 새\"로 알려져 있다. 반면 직박구리와 까치는 한국에 각각 1종만 서식한다. 종이 많고 소리가 비슷할수록 AI가 헷갈리기 쉽다는 점이 이 탐구의 중요한 배경이 되었다."),

  blank(),
  h("3-3. 국립생태원과 새소리 표준 음원", HeadingLevel.HEADING_2),
  p("현장 녹음은 스마트폰 기본 마이크 특성상 잡음이 섞여 있어, 사람 설문조사용 음원은 사람들이 정답을 확인할 수 있는 표준 음원(국립생물자원관·Xeno-canto 등)을 사용하였다. 현장 녹음은 앱 비교 실험에만 사용하였다."),

  // ── 4. 연구 질문과 가설 ──
  blank(),
  h("4. 연구 질문과 가설", HeadingLevel.HEADING_1),
  makeTable(
    ["번호", "연구 질문", "가설"],
    [
      ["Q1 / H1", "AI 앱은 지빠귀류를 일관되게 식별하는가?", "지빠귀류는 후보 종이 많고 두 앱의 일치율이 낮을 것이다"],
      ["Q2 / H2", "녹음 환경(장소·날씨)이 AI 결과에 영향을 주는가?", "시끄럽거나 바람 부는 환경일수록 후보 종이 많아질 것이다"],
      ["Q3 / H3", "사람은 새소리를 잘 구별하는가?", "사람도 지빠귀 소리를 구별하기 어려워할 것이다"],
      ["Q4 / H4", "새 지식이 많으면 새소리를 더 잘 구별하는가?", "새를 잘 아는 사람일수록 정답률이 높을 것이다"],
    ],
    [1300, 4030, 4030]
  ),

  // ── 5. 연구 방법 ──
  blank(),
  h("5. 연구 방법", HeadingLevel.HEADING_1),
  p("탐구 흐름은 다음과 같다."),
  bullet("① 책을 읽고 새에 관심 → ② BirdNET으로 주변 새소리 수집 → ③ 지빠귀류의 이상한 결과 발견"),
  bullet("④ 다른 AI 앱(Bird Identifier)과 비교 → ⑤ 두 앱 결과의 일관성 확인 → ⑥ 녹음 환경 조건 분석"),
  bullet("⑦ 같은 소리를 BirdNET으로 3회 반복 테스트하여 재현성 확인"),
  bullet("⑧ 사람 설문조사(N=129)로 사람의 새소리 구별 능력과 AI 앱 인식 조사"),
  blank(),
  makeTable(
    ["항목", "내용"],
    [
      ["앱 비교 샘플", "현장 녹음 새소리 47개 (BirdNET·Bird Identifier 각 1순위 비교)"],
      ["재현성 테스트", "BirdNET 3회 + Bird Identifier 3회 반복 테스트"],
      ["설문 응답자", "총 129명 (구글 폼, 표준 음원 재생 방식)"],
      ["설문 음원", "지빠귀 A·B(다른 지빠귀 2종), 직박구리·까치 C·D"],
    ],
    [2600, 6760]
  ),

  // ── 6. 데이터 분석 결과 ──
  blank(),
  h("6. 데이터 분석 결과", HeadingLevel.HEADING_1),

  h("6-1. AI는 다른 결과를 냈다 — 두 앱 일치율", HeadingLevel.HEADING_2),
  p("현장 녹음한 새소리 47개를 두 AI 앱에 넣어 1순위 결과가 일치하는지 비교하였다. 두 앱의 1순위가 일치한 경우는 47개 중 17개로 전체 일치율은 36.2%였다."),
  fig("그림 1. 두 앱의 1순위 결과 일치율"),
  makeTable(
    ["구분", "샘플 수", "일치 수", "일치율"],
    [
      ["지빠귀류 후보", "16개", "1개", "6.2%"],
      ["다른 새 후보", "31개", "16개", "51.6%"],
      ["전체", "47개", "17개", "36.2%"],
    ],
    [3120, 2080, 2080, 2080]
  ),
  p("지빠귀류 후보의 일치율은 6.2%로, 다른 새 후보의 일치율 51.6%보다 훨씬 낮았다. 이 결과는 \"지빠귀류에서 AI 두 앱의 결과가 가장 많이 달라진다\"는 가설(H1)을 뒷받침한다.", { }),

  blank(),
  h("6-2. BirdNET의 후보 종 수 — 지빠귀류에서 더 많았다", HeadingLevel.HEADING_2),
  fig("그림 2. BirdNET 평균 후보 종 수 비교"),
  p("후보 종 수가 많다는 것은 같은 소리 한 개를 한 이름으로 확정하지 못하고 여러 가능성을 함께 제시했다는 의미로 보았다. BirdNET의 평균 후보 종 수는 지빠귀류 2.69마리, 다른 새 1.90마리로 나타났다. 지빠귀류에서 AI가 더 망설였다고 해석할 수 있다."),

  blank(),
  h("6-3. 그럼 사람은 어떨까? — 설문조사 결과 (N=129)", HeadingLevel.HEADING_2),

  p("(1) 응답자 구성", { bold: true }),
  makeTable(
    ["연령대", "응답자 수", "비율"],
    [
      ["10대", "103명", "79.8%"],
      ["40~50대", "20명", "15.5%"],
      ["60대 이상", "4명", "3.1%"],
      ["20~30대", "2명", "1.6%"],
    ],
    [3120, 3120, 3120]
  ),
  blank(),
  p("응답자에게 새에 대해 얼마나 아는지를 물었다. 그 결과는 다음과 같았다.", {}),
  makeTable(
    ["새 지식 수준", "응답자 수", "비율"],
    [
      ["잘 안다", "2명", "1.6%"],
      ["조금 안다", "56명", "43.4%"],
      ["잘 모른다", "71명", "55.0%"],
    ],
    [3120, 3120, 3120]
  ),
  blank(),

  p("(2) 지빠귀 A·B 구별 결과", { bold: true }),
  fig("그림 3. 지빠귀 A·B 표준 음원 구별 결과"),
  p("서로 다른 지빠귀 2종인 A와 B가 같은 새인지 다른 새인지 물었다. 정답은 \"다른 새\"이다."),
  makeTable(
    ["응답", "인원", "비율"],
    [
      ["다른 새 소리다 (정답)", "80명", "62.0%"],
      ["같은 새 소리다 (오답)", "39명", "30.2%"],
      ["모르겠다", "10명", "7.8%"],
      ["오답 + 모름 합계", "49명", "38.0%"],
    ],
    [3700, 2830, 2830]
  ),
  p("정답률은 62.0%였고, 오답과 모름을 합치면 38.0%였다. 사람도 적지 않은 비율이 지빠귀 2종을 구별하지 못했다."),
  blank(),

  p("(3) 직박구리·까치 C·D 구별 결과", { bold: true }),
  fig("그림 4. 직박구리·까치 C·D 표준 음원 구별 결과"),
  makeTable(
    ["응답", "인원", "비율"],
    [
      ["다른 새 소리다 (정답)", "74명", "57.4%"],
      ["같은 새 소리다 (오답)", "31명", "24.0%"],
      ["모르겠다", "24명", "18.6%"],
      ["오답 + 모름 합계", "55명", "42.6%"],
    ],
    [3700, 2830, 2830]
  ),
  p("비교군인 직박구리·까치 C·D 문항에서도 정답률은 57.4%에 그쳤다. 두 문항 모두 정답률이 60% 안팎으로, 사람도 새소리 구별에 어려움을 겪는다는 사실을 보여준다."),
  blank(),

  p("(4) 새 지식 수준별 지빠귀 A·B 정답률 — 교차분석", { bold: true }),
  p("새에 대해 잘 아는 사람이 지빠귀를 더 잘 구별하는지 확인하기 위해 새 지식 수준과 A·B 정답률을 교차분석하였다."),
  makeTable(
    ["새 지식 수준", "응답자 수", "정답(다른 새)", "오답+모름", "정답률"],
    [
      ["잘 안다", "2명", "0명", "2명", "0% (참고용)"],
      ["조금 안다", "56명", "33명", "23명", "58.9%"],
      ["잘 모른다", "71명", "47명", "24명", "66.2%"],
    ],
    [2400, 1740, 1740, 1740, 1740]
  ),
  p("(\"잘 안다\"는 2명뿐이라 통계적으로 의미를 두기 어려워 참고용으로만 표시하였다.)", { size: 18, color: "666666", italics: true }),
  p("흥미롭게도 \"조금 안다(58.9%)\"와 \"잘 모른다(66.2%)\"의 정답률 차이가 크지 않았다. 새에 대해 잘 아는지 여부와 상관없이 지빠귀 소리를 구별하기 어려운 경우가 많았다. 이는 지빠귀 소리의 유사성이 배경지식 차이를 뛰어넘을 만큼 크다는 것을 보여준다. 즉 \"지빠귀는 누구에게나 어렵다\"고 해석할 수 있다."),
  blank(),

  p("(5) 확신도 분포 분석", { bold: true }),
  p("사람들이 자신의 판단을 얼마나 확신했는지 1~5점으로 물었다."),
  blank(),
  p("• 지빠귀 A·B 확신도 (평균 3.34점)"),
  makeTable(
    ["점수", "응답자 수", "비율"],
    [
      ["1점", "7명", "5.4%"],
      ["2점", "18명", "14.0%"],
      ["3점", "54명", "41.9%"],
      ["4점", "24명", "18.6%"],
      ["5점", "26명", "20.2%"],
    ],
    [3120, 3120, 3120]
  ),
  blank(),
  p("• 직박구리·까치 C·D 확신도 (평균 3.05점)"),
  makeTable(
    ["점수", "응답자 수", "비율"],
    [
      ["1점", "17명", "13.2%"],
      ["2점", "25명", "19.4%"],
      ["3점", "47명", "36.4%"],
      ["4점", "14명", "10.9%"],
      ["5점", "26명", "20.2%"],
    ],
    [3120, 3120, 3120]
  ),
  fig("그림 5. A·B 확신도와 C·D 확신도 분포 비교"),
  p("지빠귀 A·B의 평균 확신도(3.34점)가 직박구리·까치 C·D(3.05점)보다 오히려 높게 나타났다. 그러나 정답률도 A·B(62.0%)가 C·D(57.4%)보다 높았다. 즉, 지빠귀 소리가 더 자신 있게 판단되고 정답률도 더 높았다는 뜻인데, 이는 비교 대상인 C·D 문항(직박구리와 까치)도 사람들이 구별하기 어려워했기 때문으로 볼 수 있다. 두 문항 모두 정답률이 60% 안팎으로, 사람도 새소리 구별에 어려움을 겪는다는 사실을 보여준다."),

  blank(),
  h("6-4. 환경 조건도 AI 결과에 영향을 주었다", HeadingLevel.HEADING_2),
  fig("그림 6. 장소별 BirdNET 평균 후보 종 수"),
  fig("그림 7. 날씨별 BirdNET 평균 후보 종 수"),
  makeTable(
    ["조건", "구분", "BirdNET 평균 후보 종 수"],
    [
      ["장소", "아파트단지", "1.40마리"],
      ["장소", "학교", "1.67마리"],
      ["장소", "집 앞", "2.17마리"],
      ["장소", "우장산", "2.50마리"],
      ["날씨", "맑음", "1.73마리"],
      ["날씨", "구름·바람", "2.43마리"],
    ],
    [1800, 3780, 3780]
  ),
  p("녹음 장소와 날씨에 따라 후보 종 수가 달라졌다. 새소리가 많이 섞이는 우장산과 바람이 부는 날씨에서 후보 종이 더 많았다. 환경 조건이 AI의 일관성에 영향을 준다는 가설(H2)을 뒷받침한다."),

  blank(),
  h("6-5. AI도 같은 소리를 다르게 들었다 — 재현성 분석", HeadingLevel.HEADING_2),
  fig("그림 8. BirdNET 3회 반복 테스트 1순위 일치율"),
  p("AI가 정말 일관적인지 확인하기 위해, 같은 새소리 샘플을 BirdNET으로 3번 반복 테스트하여 1순위 결과가 매번 같게 나오는지 살펴보았다."),
  p("그 결과 지빠귀류는 반복 테스트에서 1순위가 바뀌는 경우가 다른 새보다 많았다. 같은 소리인데도 테스트할 때마다 후보 1위가 달라진 것이다. 이는 AI도 사람처럼 같은 소리를 반복해서 들으면 결과가 달라질 수 있으며, 특히 지빠귀류에서 이런 흔들림이 크다는 것을 보여준다. \"정확도보다 일관성\"이라는 이 탐구의 관점이 데이터로 다시 확인된 부분이다."),

  blank(),
  h("6-6. AI 앱 인식과 신뢰도", HeadingLevel.HEADING_2),
  makeTable(
    ["AI 앱을 아는가?", "인원", "비율"],
    [
      ["처음 알았다", "102명", "79.1%"],
      ["이미 알고 있다", "23명", "17.8%"],
      ["사용 경험 있다", "4명", "3.1%"],
    ],
    [3700, 2830, 2830]
  ),
  blank(),
  makeTable(
    ["AI 앱을 신뢰하는가?", "인원", "비율"],
    [
      ["매우 신뢰한다", "7명", "5.4%"],
      ["어느 정도 신뢰한다", "70명", "54.3%"],
      ["잘 모르겠다", "33명", "25.6%"],
      ["별로 믿지 않는다", "19명", "14.7%"],
      ["신뢰한다 합계", "77명", "59.7%"],
    ],
    [3700, 2830, 2830]
  ),
  p("응답자의 79.1%가 새소리 AI 앱을 처음 알았다고 답했지만, AI 결과를 어느 정도 신뢰한다는 응답은 59.7%였다. 잘 알지 못하면서도 신뢰하는 경향이 있는데, 이 탐구에서 보았듯 AI 결과는 지빠귀류에서 크게 달라지므로 AI 결과를 참고자료로 활용하는 태도가 필요하다."),

  // ── 7. 사진 보조 확인 ──
  blank(),
  h("7. 사진 보조 확인", HeadingLevel.HEADING_1),
  p("소리만으로 확신이 어려운 경우, 실제로 관찰한 새의 사진과 BirdNET 결과를 함께 비교해 보았다. 회색머리지빠귀처럼 한국에 거의 없는 종이 결과로 나온 경우는 사진·시기·서식 정보를 함께 살펴보아야 함을 확인하였다. AI 새소리 결과를 무조건 새 이름으로 받지 말고 사진, 시기, 장소, 생태 자료와 함께 살펴보아야 한다."),

  // ── 8. 종합 분석 ──
  blank(),
  h("8. 종합 분석", HeadingLevel.HEADING_1),
  p("이 탐구에서 가장 중요한 흐름은 다음과 같다. 특징이 뚜렷한 새소리에는 AI 앱들의 결과가 거의 같았지만, 지빠귀류에서는 차이가 컸다. \"그렇다면 사람은 어떨까?\"라는 질문을 따라가면서 AI, 사람, 환경, 재현성을 함께 분석하였다."),
  bullet("AI 두 앱 비교: 지빠귀류 후보 일치율은 6.2%로 다른 새(51.6%)보다 훨씬 낮았다. 지빠귀류는 AI에게 같은 소리가 아닌 듯 인식되었다."),
  bullet("후보 종 수: BirdNET은 지빠귀류에서 평균 2.69마리, 다른 새는 1.90마리를 제시해 지빠귀류에서 더 망설였다."),
  bullet("사람도 마찬가지: 표준 음원으로 진행했음에도 지빠귀 A·B 문항에서 38.0%가 정답을 맞히지 못했고, 직박구리·까치 C·D도 정답률 57.4%였다."),
  bullet("교차분석: 새를 \"조금 안다(58.9%)\"와 \"잘 모른다(66.2%)\"의 정답률 차이가 크지 않았다. 지빠귀는 배경지식과 상관없이 누구에게나 어렵다."),
  bullet("확신도: 지빠귀 A·B 확신도(3.34점)가 C·D(3.05점)보다 높았지만 정답률도 더 높아, 두 문항 모두 사람에게 어려운 소리였음을 보여준다."),
  bullet("환경과 재현성: 우장산·바람 부는 환경에서 후보 종이 늘었고, BirdNET 3회 반복 테스트에서 지빠귀류는 1순위가 더 자주 바뀌었다."),
  p("종합하면, 지빠귀류 식별의 어려움은 AI만의 한계가 아니라 지빠귀 소리 자체가 서로 비슷하다는 근본적인 특성에서 비롯된다. 그래서 AI도 사람도 지빠귀에서 일관성이 떨어진 것이다."),

  // ── 9. 결론 ──
  blank(),
  h("9. 결론", HeadingLevel.HEADING_1),
  p("첫째, 두 AI 앱은 같은 새소리를 두고 항상 같은 결과를 내지 않았다. 특히 지빠귀류 후보에서 일치율(6.2%)이 매우 낮았다."),
  p("둘째, 지빠귀류는 종류가 많고 소리가 비슷해 AI의 식별 일관성이 낮으며, BirdNET 3회 반복 테스트에서도 결과가 더 자주 흔들렸다."),
  p("셋째, 사람도 지빠귀 표준 음원을 완벽하게 구별하지 못했다(정답률 62.0%). 새 지식이 많고 적음과 상관없이 지빠귀는 어려웠다."),
  p("넷째, 새소리 AI 결과를 무조건 믿기보다 사진·시기·장소·생태 자료와 함께 참고하는 태도가 필요하다. 정확도가 아니라 일관성의 관점에서 보면 AI의 강점과 한계를 더 정확히 이해할 수 있다."),

  // ── 10. 한계점과 후속 탐구 ──
  blank(),
  h("10. 한계점과 후속 탐구", HeadingLevel.HEADING_1),
  p("한계점", { bold: true }),
  bullet("현장 녹음이 스마트폰 기본 마이크로 이루어져 BirdNET 권장 음질(48kHz)에 미치지 못했을 수 있다."),
  bullet("앱 비교 샘플 수(47개)와 지빠귀류 샘플 수(16개)가 많지 않아 결과를 일반화하기에는 주의가 필요하다."),
  bullet("설문 응답자 중 10대가 79.8%로 대부분을 차지했다. 성인 응답자 수가 적어 모든 연령대를 고르게 대표하지 못한다."),
  bullet("교차분석에서 \"잘 안다\"는 2명, 연령대 중 \"20~30대\"는 2명뿐이라 이 집단은 해석에 주의가 필요하다."),
  blank(),
  p("후속 탐구 제언", { bold: true }),
  bullet("전문 녹음 장비(고품질 마이크)로 같은 소리를 다시 녹음해 AI 결과가 달라지는지 확인하기"),
  bullet("음향 분석 프로그램으로 지빠귀 울음소리의 Hz 범위를 측정해 다른 새와 어떻게 다른지 비교하기"),
  bullet("샘플 수와 성인 응답자 수를 늘려 계절·시간대·연령대별 차이를 더 정확히 분석하기"),

  // ── 11. 배우고 느낀 점 ──
  blank(),
  h("11. 배우고 느낀 점", HeadingLevel.HEADING_1),
  p("이번 탐구를 하면서 새소리를 그냥 \"예쁜 소리\"로만 듣지 않고, 종마다 어떻게 다른지, 왜 어떤 소리는 AI도 사람도 헷갈리는지를 데이터로 살펴보게 되었다. 처음에는 AI가 알려주는 새 이름을 그대로 믿었지만, 같은 소리를 두 앱에 넣어보고 반복 테스트를 해보면서 AI가 항상 정답을 내는 것은 아니라는 점을 알게 되었다."),
  p("특히 \"정확도보다 일관성\"이라는 관점을 세우고 나니, 정답을 모르는 새소리도 \"얼마나 안정적으로 같은 결과를 내는가\"로 평가할 수 있다는 것이 신기했다. 또 사람 129명의 설문을 표로 정리하고 교차분석과 확신도 분포까지 만들어 보면서, 숫자 하나하나가 의미를 가진다는 것을 배웠다."),
  p("앞으로도 BirdNET을 이용해 더 많은 새소리를 수집하고, 우장산에서 어떤 새가 사는지 계속 관찰하고 싶다. 이번 탐구를 통해 새를 좋아하는 마음이 단순한 취미에서 \"데이터로 확인하는 탐구\"로 이어질 수 있다는 것을 느꼈다."),

  // ── 12. 참고 자료 ──
  blank(),
  h("12. 참고 자료", HeadingLevel.HEADING_1),
  bullet("BirdNET 공식 사이트 (birdnet.cornell.edu)"),
  bullet("Bird Identifier by Sound AI ID (앱 스토어)"),
  bullet("국립생물자원관 한반도의 생물다양성 (species.nibr.go.kr)"),
  bullet("Xeno-canto 세계 새소리 아카이브 (xeno-canto.org)"),
  bullet("『새들의 밥상』 (도서)"),
];

const doc = new Document({
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
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1260, bottom: 1440, left: 1260 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" })] })] }) },
    children: S
  }]
});

const out = "wiki/outputs/주제탐구보고서/통계대회/배이아/배이아_최종탐구보고서_수상권버전.docx";
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(out, buf); console.log("저장 완료: " + out); });

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

// ── 탐구보고서 ──────────────────────────────────────────────
const reportSections = [

  // 표지
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2000, after: 400 }, children: [new TextRun({ text: "AI 새소리 인식 앱은 왜 지빠귀를 헷갈릴까?", bold: true, size: 40, color: "1F4E79" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "— BirdNET 앱의 식별 일관성과 영향 요인 통계 분석 —", size: 26, color: "2E75B6" })] }),
  blank(),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "학교: _________________ 초등학교", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "학년: 6학년     이름: 배이아", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "탐구 기간: 2026년 __월 __일 ~ __월 __일", size: 24 })] }),

  // 1. 탐구 동기
  blank(),
  h("1. 탐구 동기", HeadingLevel.HEADING_1),
  p("평소 새를 좋아해서 『새들의 밥상』을 읽고 새마다 소리와 먹이, 습성이 모두 다르다는 것을 알게 되었다. 이후 BirdNET 앱을 이용해 학원 가는 길, 집 앞 공원, 우장산에서 새소리가 들릴 때마다 직접 녹음하며 기록했다."),
  p("총 17종의 새소리를 수집하는 과정에서 이상한 점을 발견했다. 까치, 직박구리, 소쩍새 등 대부분의 새는 녹음할 때마다 같은 결과가 나왔는데, 지빠귀 소리만 녹음할 때마다 다른 종으로 결과가 나왔다. 심지어 5월에 한국에서 거의 볼 수 없는 유럽 새인 회색머리지빠귀가 결과로 나오기도 했다."),
  p("왜 AI 앱은 지빠귀 소리를 제대로 식별하지 못하는 걸까? 이 의문에서 이 연구가 시작되었다."),

  // 2. 선행연구
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
    ["종 이름", "한국 서식 형태", "특징"],
    [
      ["호랑지빠귀", "여름철새, 흔함", "온몸 검은 초승달 무늬, 새벽·저녁에만 울음"],
      ["개똥지빠귀", "겨울철새, 흔함", "수컷 어두운 갈색, 가슴 검은 무늬"],
      ["흰눈썹지빠귀", "봄·가을 통과", "흰 눈썹선 뚜렷"],
      ["되지빠귀", "봄·가을, 여름번식", "배가 연한 색"],
      ["대륙검은지빠귀", "드문 미조", "수컷 검은 깃털, 귤색 부리, 플루트 같은 소리"],
      ["회색머리지빠귀", "매우 희귀 (2020년 단 1회 관찰)", "유럽 텃새, 5월에는 한국에 없음"],
    ],
    [2400, 3200, 3760]
  ),
  blank(),
  p("반면 직박구리와 까치는 각각 1종만 한국에 서식한다."),

  // 3. 연구 질문
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

  // 4. 가설
  blank(),
  h("4. 가설", HeadingLevel.HEADING_1),
  makeTable(
    ["번호", "가설"],
    [
      ["가설 1", "지빠귀는 한국에 서식하는 종류가 많고 소리가 서로 비슷하여 AI가 구별하기 어려울 것이다"],
      ["가설 2", "녹음 환경(장소, 날씨, 소음)이 나쁠수록 앱의 신뢰도가 낮고 결과가 일관되지 않을 것이다"],
      ["가설 3", "3개 앱 모두 지빠귀에서 불일치가 가장 크게 나타날 것이다"],
      ["가설 4", "사람도 지빠귀 소리를 다른 새 소리와 구별하기 어려울 것이다"],
    ],
    [1500, 7860]
  ),

  // 5. 연구 방법
  blank(),
  h("5. 연구 방법", HeadingLevel.HEADING_1),
  h("5-1. 새소리 샘플 수집", HeadingLevel.HEADING_2),
  makeTable(
    ["항목", "내용"],
    [
      ["수집 기간", "2026년 __월 ~ __월"],
      ["수집 장소", "우장산, 집 앞 공원, 학원 가는 길"],
      ["도구", "스마트폰 + BirdNET 앱"],
      ["수집된 종", "총 17종 (지빠귀 6종, 다른 새 11종)"],
    ],
    [2400, 6960]
  ),
  blank(),
  p("녹음 시 날짜, 시간, 장소, 날씨, 주변 소음 환경을 함께 기록했다."),
  blank(),
  makeTable(
    ["지빠귀 (6종)", "다른 새 (11종)"],
    [["회색머리지빠귀, 대륙검은지빠귀, 개똥지빠귀,\n흰눈썹지빠귀, 되지빠귀, 검은지빠귀", "직박구리, 소쩍새, 바위비둘기, 멧비둘기, 제비,\n꾀꼬리, 쇠박새, 진박새, 뻐꾸기, 참새, Light-vented Bulbul"]],
    [4680, 4680]
  ),

  blank(),
  h("5-2. 앱 비교 실험", HeadingLevel.HEADING_2),
  p("수집한 샘플 전체를 3개 앱에 동일하게 적용하여 결과(종 이름, 신뢰도%)를 비교했다."),
  blank(),
  makeTable(
    ["앱 이름", "개발"],
    [
      ["BirdNET", "코넬대학교·독일 켐니츠공과대학교"],
      ["Bird Identifier by Sound AI ID", "—"],
      ["새소리 식별자", "—"],
    ],
    [4680, 4680]
  ),

  blank(),
  h("5-3. 환경 조건 분석", HeadingLevel.HEADING_2),
  makeTable(
    ["변수", "기록 방식"],
    [
      ["장소", "우장산 / 집 앞 공원 / 학원 가는 길"],
      ["날씨", "맑음 / 흐림 / 바람"],
      ["소음환경", "조용 / 보통 / 시끄러움"],
      ["시간대", "오전 / 오후 / 저녁"],
    ],
    [2400, 6960]
  ),

  blank(),
  h("5-4. 사람 설문 조사", HeadingLevel.HEADING_2),
  p("대상: □명 (성인 위주)"),
  p("방법: 구글 폼으로 제작하여 카카오톡으로 링크 배포. 응답자가 폼 안에서 새소리를 직접 재생하며 답변하도록 구성했다."),
  p("음원 선정: 현장 녹음은 스마트폰 기본 마이크 특성상 잡음이 포함되어 있어, 설문용 음원은 국립생물자원관(species.nibr.go.kr) 및 세계 새소리 아카이브 Xeno-canto(xeno-canto.org)의 표준 음원을 사용하였다. 현장 녹음은 앱 비교 실험(5-2)에만 사용하였다."),
  blank(),
  makeTable(
    ["섹션", "내용"],
    [
      ["1부", "소리 A(지빠귀 종 1)·B(지빠귀 종 2) → 느낌, 호/불호, 같은 새인지 여부"],
      ["2부", "소리 C(직박구리)·D(까치) → 느낌, 호/불호, 같은 새인지 여부"],
      ["3부", "새소리 소음 경험, AI 앱 신뢰도"],
    ],
    [1500, 7860]
  ),

  // 6. 결과
  blank(),
  h("6. 결과", HeadingLevel.HEADING_1),
  h("6-1. 지빠귀 vs 다른 새 — 앱 일치율 비교", HeadingLevel.HEADING_2),
  makeTable(
    ["새 종류", "샘플 수", "3개 앱 모두 일치", "일치율"],
    [
      ["지빠귀", "□개", "□개", "□%"],
      ["다른 새", "□개", "□개", "□%"],
    ],
    [2340, 2340, 2340, 2340]
  ),

  blank(),
  h("6-2. 앱별 1:1 일치율", HeadingLevel.HEADING_2),
  makeTable(
    ["비교", "지빠귀", "다른 새"],
    [
      ["BirdNET vs Bird Identifier", "□%", "□%"],
      ["BirdNET vs 새소리 식별자", "□%", "□%"],
      ["Bird Identifier vs 새소리 식별자", "□%", "□%"],
    ],
    [4680, 2340, 2340]
  ),

  blank(),
  h("6-3. 환경 조건별 평균 신뢰도", HeadingLevel.HEADING_2),
  makeTable(
    ["조건", "평균 신뢰도(%)"],
    [
      ["우장산 (조용)", "□%"],
      ["집 앞 공원 (보통)", "□%"],
      ["학원 가는 길 (시끄러움)", "□%"],
      ["맑은 날", "□%"],
      ["흐린 날·바람", "□%"],
    ],
    [5460, 3900]
  ),

  blank(),
  h("6-4. 주목할 사례 2건", HeadingLevel.HEADING_2),
  p("【사례 1】 회색머리지빠귀 (5월 10일 오후 6시 26분)", { bold: true }),
  p("BirdNET이 5월 10일 녹음한 소리를 회색머리지빠귀로 식별했다. 그러나 회색머리지빠귀는 유럽 텃새로 한국에서는 2020년 인천에서 단 1회만 관찰된 매우 희귀한 새이다. 5월은 이미 유럽으로 돌아간 시기로 한국에 존재할 가능성이 없다. BirdNET은 공식적으로 녹음 위치·날짜를 반영한다고 안내하고 있으나, 이 사례는 그 설명과 일치하지 않는다."),
  blank(),
  makeTable(
    ["항목", "내용"],
    [
      ["녹음 일시", "2026년 5월 10일 오후 6시 26분"],
      ["녹음 장소", "□"],
      ["BirdNET 결과", "회색머리지빠귀"],
      ["한국 5월 서식 여부", "거의 불가능"],
      ["다른 앱 결과", "□"],
    ],
    [3120, 6240]
  ),
  blank(),
  p("【사례 2】 Light-vented Bulbul (중국직박구리)", { bold: true }),
  p("BirdNET이 녹음한 소리를 Light-vented Bulbul(중국직박구리)로 식별했다. 그러나 한국에 서식하는 직박구리는 Brown-eared Bulbul(갈색귀직박구리)로 다른 종이다. 지빠귀 외에도 비슷한 종끼리의 혼동이 발생한 사례이다."),

  blank(),
  h("6-5. 사람 설문 결과", HeadingLevel.HEADING_2),
  p("지빠귀 2종 소리(A·B) — 같은 새인가 다른 새인가?"),
  makeTable(
    ["응답", "인원", "비율"],
    [["같은 새", "□명", "□%"], ["다른 새", "□명", "□%"], ["모르겠다", "□명", "□%"]],
    [3120, 3120, 3120]
  ),
  blank(),
  p("새소리 호/불호"),
  makeTable(
    ["새 종류", "좋다", "보통", "싫다"],
    [
      ["지빠귀 A", "□%", "□%", "□%"],
      ["지빠귀 B", "□%", "□%", "□%"],
      ["직박구리", "□%", "□%", "□%"],
      ["까치", "□%", "□%", "□%"],
    ],
    [2340, 2340, 2340, 2340]
  ),
  blank(),
  p("새 지식 수준별 지빠귀 구별 능력"),
  makeTable(
    ["새 지식 수준", "응답자 수", "\"다른 새\" 정답 비율"],
    [
      ["잘 안다", "□명", "□%"],
      ["조금 안다", "□명", "□%"],
      ["잘 모른다", "□명", "□%"],
    ],
    [3120, 3120, 3120]
  ),

  // 7. 분석
  blank(),
  h("7. 분석", HeadingLevel.HEADING_1),
  p("왜 지빠귀만 결과가 다를까?", { bold: true }),
  p("한국에 서식하는 지빠귀속 새는 최소 8종 이상으로, 이번 샘플에서도 17종 중 6종(35%)이 지빠귀였다. 반면 까치와 직박구리는 각각 1종뿐이다. 지빠귀 종들은 생김새는 서로 다르지만 울음소리는 멜로디가 비슷한 계열이다. 소리의 주파수 패턴을 분석하는 AI 입장에서는 비슷한 소리를 내는 종이 많을수록 구별이 어렵다."),
  blank(),
  p("BirdNET 공식 설명과 실제 결과의 불일치", { bold: true }),
  p("BirdNET은 녹음 위치와 날짜를 반영하여 결과를 산출한다고 공식 안내하고 있다. 그러나 5월 10일 서울 근처에서 녹음한 소리를 그 시기에 한국에 없는 회색머리지빠귀로 식별한 사례는 이 안내와 일치하지 않는다."),
  blank(),
  p("사람도 마찬가지", { bold: true }),
  p("설문 결과 □%의 응답자가 서로 다른 지빠귀 2종을 같은 새라고 답했다. 잡음 없는 표준 음원으로 진행한 설문에서도 이러한 결과가 나왔다. 이는 지빠귀 소리의 유사성이 근본적인 원인임을 뒷받침한다."),

  // 8. 결론
  blank(),
  h("8. 결론", HeadingLevel.HEADING_1),
  p("이 연구를 통해 다음 네 가지를 확인했다."),
  p("첫째, AI 새소리 인식 앱은 지빠귀 식별에서 일관성이 낮다. 3개 앱의 지빠귀 일치율은 □%로 다른 새(□%)보다 현저히 낮았다."),
  p("둘째, 지빠귀는 한국에 서식하는 종이 많고 소리가 서로 비슷하기 때문에 소리만으로 식별하는 AI에게 근본적으로 어려운 대상이다."),
  p("셋째, BirdNET은 녹음 위치·날짜를 반영한다고 안내하지만, 5월에 한국에 없는 회색머리지빠귀를 결과로 낸 사례처럼 이 기능이 항상 정확하게 작동하지는 않는 것으로 보인다."),
  p("넷째, 잡음 없는 표준 음원으로 진행한 설문에서도 □%의 응답자가 지빠귀 2종을 같은 새로 혼동했다. 이는 지빠귀 소리의 유사성이 AI만의 한계가 아니라 소리 자체의 특성에서 비롯된 것임을 보여준다."),

  // 9. 한계점
  blank(),
  h("9. 한계점 및 후속 연구 제언", HeadingLevel.HEADING_1),
  p("한계점", { bold: true }),
  p("- 현장 녹음이 스마트폰 기본 마이크로 이루어져 BirdNET 권장 음질(48kHz)에 미치지 못했을 가능성이 있다."),
  p("- 샘플 수가 제한적이어서 결과를 일반화하기에는 주의가 필요하다."),
  p("- 설문용 음원과 앱 비교 실험용 음원이 달라 직접 비교에 한계가 있다."),
  blank(),
  p("후속 연구 제언", { bold: true }),
  makeTable(
    ["번호", "제언 내용"],
    [
      ["1", "전문 녹음 장비(고품질 마이크)로 같은 소리를 다시 녹음하여 결과가 달라지는지 확인"],
      ["2", "음향 분석 프로그램(Audacity 등)으로 지빠귀 울음소리의 Hz 범위를 측정하고 BirdNET 분석 범위(150Hz~15kHz)와 비교"],
      ["3", "샘플 수를 늘려 계절·시간대별 식별 정확도 변화를 추가 분석"],
      ["4", "AI 앱 개발사에 지역 생태 정보 반영 정확도 개선 및 한국 지빠귀 학습 데이터 확충 제안"],
    ],
    [720, 8640]
  ),

  // 10. 참고 자료
  blank(),
  h("10. 참고 자료", HeadingLevel.HEADING_1),
  p("- BirdNET 공식 사이트 (birdnet.cornell.edu)"),
  p("- 국립생물자원관 한반도의 생물다양성 (species.nibr.go.kr)"),
  p("- Xeno-canto 세계 새소리 아카이브 (xeno-canto.org)"),
  p("- 한국조류학회지: 한국에서 갈색지빠귀와 대륙점지빠귀의 첫 관찰기록 보고"),
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
  fs.writeFileSync("배이아_탐구보고서_1차.docx", buf);
  console.log("보고서 저장 완료");
});

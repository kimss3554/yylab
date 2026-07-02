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

function p(text, opts = {}) {
  return new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text, size: 22, ...opts })] });
}
function blank() { return new Paragraph({ children: [new TextRun("")], spacing: { after: 80 } }); }
function section(title) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text: title, bold: true, size: 26, color: "1F4E79" })]
  });
}
function q(num, text) {
  return new Paragraph({
    spacing: { before: 160, after: 80 },
    children: [
      new TextRun({ text: `Q${num}. `, bold: true, size: 22, color: "2E75B6" }),
      new TextRun({ text, size: 22 })
    ]
  });
}
function choice(text) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 560 },
    children: [new TextRun({ text: `□  ${text}`, size: 22 })]
  });
}
function divider() {
  return new Paragraph({
    spacing: { before: 160, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 4 } },
    children: [new TextRun("")]
  });
}
function audioBox(label) {
  return new Table({
    width: { size: 9386, type: WidthType.DXA },
    columnWidths: [9386],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 2, color: "4472C4" }, bottom: { style: BorderStyle.SINGLE, size: 2, color: "4472C4" }, left: { style: BorderStyle.SINGLE, size: 2, color: "4472C4" }, right: { style: BorderStyle.SINGLE, size: 2, color: "4472C4" } },
      shading: { fill: "EEF4FB", type: ShadingType.CLEAR },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      width: { size: 9386, type: WidthType.DXA },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `▶ ${label} 재생 (유튜브 링크 삽입)`, bold: true, size: 22, color: "2E75B6" })]
      })]
    })]})],
  });
}

const surveyChildren = [
  // 표지
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 200 }, children: [new TextRun({ text: "새소리 설문 조사", bold: true, size: 48, color: "1F4E79" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [new TextRun({ text: "배이아 탐구 활동 — AI 새소리 인식 앱과 사람의 인식 비교", size: 22, color: "555555" })] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    shading: { fill: "FFF8E1", type: ShadingType.CLEAR },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: "FFC107" }, bottom: { style: BorderStyle.SINGLE, size: 2, color: "FFC107" }, left: { style: BorderStyle.SINGLE, size: 2, color: "FFC107" }, right: { style: BorderStyle.SINGLE, size: 2, color: "FFC107" } },
    children: [new TextRun({ text: "안녕하세요! 저는 초등학교 6학년 배이아입니다. AI 새소리 인식 앱과 사람의 새소리 인식을 비교하는 탐구 활동을 하고 있습니다. 약 3분 정도 소요됩니다. 솔직하게 답해 주시면 큰 도움이 됩니다!", size: 22 })]
  }),

  blank(),
  divider(),

  // 응답자 정보
  section("응답자 정보"),
  q(1, "연령대를 선택해 주세요."),
  ...["10대", "20~30대", "40~50대", "60대 이상"].map(choice),

  blank(),
  q(2, "새에 대해 얼마나 알고 계신가요?"),
  ...["잘 안다 (새 이름을 10종 이상 말할 수 있다)", "조금 안다 (까치, 비둘기 등 몇 가지는 안다)", "잘 모른다"].map(choice),

  divider(),

  // 1부 소리 A·B
  section("1부. 소리 A, B 듣기"),
  p("아래 링크(또는 QR코드)를 눌러 소리를 들은 후 질문에 답해 주세요.", { color: "555555", italics: true }),
  blank(),
  audioBox("소리 A"),
  blank(),
  q(3, "소리 A는 어떤 느낌인가요?"),
  ...["아름답다", "보통이다", "시끄럽다", "무섭다"].map(choice),
  blank(),
  q(4, "소리 A를 들으면 기분이 어떤가요?"),
  ...["좋다", "보통", "싫다"].map(choice),

  blank(),
  audioBox("소리 B"),
  blank(),
  q(5, "소리 B는 어떤 느낌인가요?"),
  ...["아름답다", "보통이다", "시끄럽다", "무섭다"].map(choice),
  blank(),
  q(6, "소리 B를 들으면 기분이 어떤가요?"),
  ...["좋다", "보통", "싫다"].map(choice),

  blank(),
  p("소리 A와 B를 다시 한번 들어보세요.", { bold: true }),
  blank(),
  q(7, "소리 A와 소리 B는 같은 새의 소리인가요, 다른 새의 소리인가요?"),
  ...["같은 새 소리다", "다른 새 소리다", "모르겠다"].map(choice),

  divider(),

  // 2부 소리 C·D
  section("2부. 소리 C, D 듣기"),
  blank(),
  audioBox("소리 C"),
  blank(),
  q(8, "소리 C는 어떤 느낌인가요?"),
  ...["아름답다", "보통이다", "시끄럽다", "무섭다"].map(choice),
  blank(),
  q(9, "소리 C를 들으면 기분이 어떤가요?"),
  ...["좋다", "보통", "싫다"].map(choice),

  blank(),
  audioBox("소리 D"),
  blank(),
  q(10, "소리 D는 어떤 느낌인가요?"),
  ...["아름답다", "보통이다", "시끄럽다", "무섭다"].map(choice),
  blank(),
  q(11, "소리 D를 들으면 기분이 어떤가요?"),
  ...["좋다", "보통", "싫다"].map(choice),

  blank(),
  p("소리 C와 D를 다시 한번 들어보세요.", { bold: true }),
  blank(),
  q(12, "소리 C와 소리 D는 같은 새의 소리인가요, 다른 새의 소리인가요?"),
  ...["같은 새 소리다", "다른 새 소리다", "모르겠다"].map(choice),

  divider(),

  // 3부
  section("3부. 새소리에 대한 생각"),
  q(13, "평소에 새소리를 소음이라고 느낀 적이 있나요?"),
  ...["자주 있다", "가끔 있다", "없다"].map(choice),
  blank(),
  q(14, "새소리가 소음으로 느껴질 때는 언제인가요? (해당하는 것 모두 체크)"),
  ...["이른 아침에 잠을 깨울 때", "매우 시끄러울 때", "불쾌한 소리일 때", "새소리가 소음이라고 느낀 적 없다", "기타: ___________"].map(choice),
  blank(),
  q(15, "AI가 새소리를 듣고 새 종류를 알아맞힌다는 것을 알고 계셨나요?"),
  ...["알고 있었다", "몰랐다"].map(choice),
  blank(),
  q(16, "AI 새소리 인식 앱의 결과를 얼마나 신뢰하시나요?"),
  ...["매우 신뢰한다", "어느 정도 신뢰한다", "잘 모르겠다", "신뢰하지 않는다"].map(choice),

  divider(),
  blank(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160 },
    children: [new TextRun({ text: "설문에 응해 주셔서 감사합니다!", bold: true, size: 26, color: "1F4E79" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "수집된 답변은 탐구 보고서 작성에만 사용되며 다른 용도로 사용되지 않습니다.", size: 20, color: "888888" })]
  }),
];

const surveyDoc = new Document({
  styles: {
    default: { document: { run: { font: "맑은 고딕", size: 22 } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1260, right: 1260, bottom: 1260, left: 1260 }
      }
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888" })]
      })] })
    },
    children: surveyChildren
  }]
});

Packer.toBuffer(surveyDoc).then(buf => {
  fs.writeFileSync("배이아_설문조사_양식지.docx", buf);
  console.log("설문지 저장 완료");
});


const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, HeadingLevel,
        AlignmentType, WidthType, ShadingType, ImageRun } = require("docx");
const fs = require("fs");
const path = require("path");

const BASE = "C:\Users\yylab\OneDrive\바탕 화면\wiki\wiki\outputs\주제탐구보고서\통계대회\배이아";
const CHARTS = path.join(BASE, "charts");
const OUT = path.join(BASE, "배이아_최종탐구보고서_수정제출본.docx");

function img(fname, w) {
  const p = path.join(CHARTS, fname);
  if (!fs.existsSync(p)) return body("[no chart: " + fname + "]");
  const data = fs.readFileSync(p);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new ImageRun({ data, transformation: { width: w, height: Math.round(w * 0.67) }, type: "png" })],
    spacing: { before: 120, after: 120 },
  });
}
const BLUE="1a5276", LBLUE="D5E8F0", DG="444444";
const h1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun({text:t,color:BLUE,size:32,bold:true,font:"맑은 고딕"})],spacing:{before:360,after:120}});
const h2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun({text:t,color:"2471a3",size:26,bold:true,font:"맑은 고딕"})],spacing:{before:240,after:80}});
const body=t=>new Paragraph({children:[new TextRun({text:t,size:22,font:"맑은 고딕",color:DG})],spacing:{before:60,after:60}});
const bul=t=>new Paragraph({bullet:{level:0},children:[new TextRun({text:t,size:22,font:"맑은 고딕",color:DG})],spacing:{before:40,after:40}});
const cap=t=>new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:t,size:18,font:"맑은 고딕",color:"888888",italics:true})],spacing:{before:40,after:160}});
const blank=()=>new Paragraph({children:[new TextRun("")],spacing:{before:60,after:60}});
function tbl(rows){return new Table({width:{size:100,type:WidthType.PERCENTAGE},rows:rows.map((row,ri)=>new TableRow({children:row.map(cell=>new TableCell({shading:ri===0?{fill:LBLUE,type:ShadingType.CLEAR,color:"auto"}:undefined,children:[new Paragraph({children:[new TextRun({text:String(cell),size:20,font:"맑은 고딕",bold:ri===0,color:DG})],spacing:{before:40,after:40}})],margins:{top:60,bottom:60,left:100,right:100}}))}))});}

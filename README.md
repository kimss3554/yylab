# LLM 위키

LLM이 **구조화된 마크다운 위키**를 점진적으로 구축·유지하는 개인 지식 베이스입니다.  
RAG처럼 매번 raw에서 재검색하는 대신, 한 번 통합된 지식이 `wiki/`에 축적됩니다.

## 빠른 시작

1. **Obsidian**(선택): 이 폴더를 vault로 열기
2. **자료 추가**: `raw/`에 논문·기사·메모 등 저장 (수정하지 말 것)
3. **에이전트에게 요청** (Cursor 등):
   - `raw/내파일.md ingest 해줘`
   - `위키에서 ○○에 대해 질문에 답해줘`
   - `위키 상태 점검(lint) 해줘`
4. **확인**: `wiki/index.md`, 그래프 뷰, 개별 페이지

## 구조

```
raw/          # 원본 (불변)
wiki/         # LLM 관리 위키
AGENTS.md     # 에이전트 스키마 (Codex / Claude Code / Cursor 등)
```

## 문서

- 에이전트 규칙: [`AGENTS.md`](AGENTS.md)
- Cursor: [`.cursor/rules/llm-wiki.mdc`](.cursor/rules/llm-wiki.mdc)

## 팁

- Web Clipper → `raw/`에 마크다운 저장
- 이미지 → `raw/assets/`
- Git으로 버전 관리 가능

---

패턴 설명: Karpathy 등의 «LLM Wiki» 아이디어 문서를 바탕으로 한 스타터 템플릿입니다.

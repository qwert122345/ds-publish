# Design System Preview – Web

디자인시스템을 웹에서 미리볼 수 있는 정적 사이트입니다.

## 사용 방법

### 1. Figma 플러그인에서 내보내기

1. Figma에서 **Design System Preview** 플러그인 실행
2. 로딩이 끝난 후 **Export for web** 버튼 클릭
3. `design-system.json` 파일이 다운로드됩니다

### 2. 웹에서 보기

**방법 A: 로컬에서 열기**

```bash
# web 폴더에서 간단한 서버 실행 (선택)
cd web && python3 -m http.server 8080
# 브라우저에서 http://localhost:8080 접속
```

또는 `index.html`을 브라우저에서 직접 열고, **Choose JSON file**로 `design-system.json`을 선택하세요.

**방법 B: JSON 붙여넣기**

1. `index.html` 열기
2. Figma 플러그인에서 Export한 JSON 내용을 하단 텍스트 영역에 붙여넣기
3. 자동으로 표시됩니다

**방법 C: URL로 로드**

JSON을 호스팅할 경우:

```
https://yoursite.com/web/?url=https://yoursite.com/design-system.json
```

## 배포

`web` 폴더 전체를 정적 호스팅(GitHub Pages, Netlify, Vercel 등)에 올리면 됩니다.

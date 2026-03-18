# Design System Preview

현재 Figma 파일의 디자인 토큰, 컴포넌트, 스타일을 미리볼 수 있는 Figma 플러그인입니다.

## 기능

- **Token**: 변수(Variables)를 컬렉션·경로별로 그룹화, 레퍼런스 토큰 해석
- **Component**: 이름 경로별로 그룹화된 컴포넌트 목록
- **Style**: 색상, 텍스트 스타일, 효과, 그리드 스타일

## 설치 방법

1. Figma에서 **Plugins** → **Development** → **Import plugin from manifest...** 선택
2. 이 폴더의 `manifest.json` 파일 선택

## 사용 방법

- Variables·컴포넌트·스타일이 있는 Figma 파일을 연 뒤 플러그인 실행
- Token / Component / Style 탭을 눌러 화면 전환
- 아코디언 헤더를 눌러 그룹 접기/펼치기
- 컴포넌트 칩을 클릭하면 캔버스에서 해당 노드로 이동

## 개발

`code.js` 파일을 수정한 뒤 저장하면 됩니다. Figma에서 플러그인을 다시 실행하면 변경 사항이 반영됩니다. 별도 빌드 과정은 필요 없습니다.

## GitHub 업데이트

변경 사항을 GitHub에 올리려면:

```bash
git add -A
git commit -m "커밋 메시지"
git push
```

또는 `./push.sh` 스크립트를 실행해도 됩니다. (실행 권한: `chmod +x push.sh`)

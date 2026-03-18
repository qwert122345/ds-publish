# GitHub에 푸시하기

아래 명령어를 **터미널**에서 순서대로 실행하세요.

```bash
# 1. ds-publish 폴더로 이동
cd "/Users/hwannnnnnnnnnnn/Desktop/DS Q&A Bot/Cursor/ds-publish"

# 2. Git 초기화 (이미 되어 있으면 생략 가능)
git init

# 3. 파일 추가 및 커밋
git add -A
git commit -m "Initial commit: Design System Preview Figma plugin"

# 4. main 브랜치로 설정
git branch -M main

# 5. 원격 저장소 연결
git remote add origin https://github.com/qwert122345/ds-publish.git
# (이미 연결되어 있으면 오류 나올 수 있음 → "git remote remove origin" 후 다시 실행)

# 6. GitHub에 푸시
git push -u origin main
```

**중요:** `git push` 시 GitHub 로그인을 요구할 수 있습니다. 브라우저에서 인증하거나 Personal Access Token을 사용하세요.

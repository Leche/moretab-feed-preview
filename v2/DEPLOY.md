# 배포 가이드 — 기존 레포의 `v2/` 서브폴더로 공개

기존 사이트(<https://leche.github.io/moretab-design-system-web-publishing/>)는
**건드리지 않고**, 같은 레포에 `v2/` 폴더를 추가해 새 디자인 시스템을
`…/moretab-design-system-web-publishing/v2/` 경로로 공개합니다.

레포: <https://github.com/Leche/moretab-design-system-web-publishing>

---

## 원-샷 명령 (터미널에 붙여넣기)

터미널(Terminal.app)을 열고 아래 블록을 그대로 복사·붙여넣기 후 실행하면 됩니다.
*(이 블록이 이미 클립보드에 담겨 있어요 — ⌘V 한 번으로 붙여넣기 가능)*

```bash
cd ~/Desktop && \
[ -d moretab-design-system-web-publishing ] || \
  git clone https://github.com/Leche/moretab-design-system-web-publishing.git && \
cd moretab-design-system-web-publishing && \
git pull --rebase && \
rm -rf v2 && mkdir v2 && \
cp -R "/Users/leche_M3/Documents/Claude/Projects/더보기탭 디자인 시스템 구현/"* v2/ && \
rm -f v2/components/card.html v2/components/card-news.html && \
find v2 -name "*.html" -exec sed -i '' 's|assets/ds.css"|assets/ds.css?v=10"|g; s|assets/ds.js"|assets/ds.js?v=10"|g; s|../assets/ds.css"|../assets/ds.css?v=10"|g; s|../assets/ds.js"|../assets/ds.js?v=10"|g' {} + && \
git add v2 && \
git commit -m "v2: flatter GNB/LNB active — drop underline, drop sidebar bg+border, sidebar section title" && \
git push
```

### 이 블록이 하는 일

1. `~/Desktop` 으로 이동 (없으면 만들지는 않음)
2. 기존 레포가 없으면 clone (두 번째 실행부터는 스킵)
3. 원격의 최신 변경을 rebase pull
4. 기존 `v2/` 폴더가 있으면 지우고 새로 만듦
5. 현재 디자인 시스템 폴더 내용을 `v2/` 아래로 전부 복사
6. `v2/` 만 stage → 커밋 → 원격 push

### 인증 프롬프트가 뜨면?

GitHub은 2021년 이후 password 로그인을 안 받습니다. 둘 중 하나:

- **Personal Access Token (PAT):** <https://github.com/settings/tokens> 에서 `repo` 스코프로 발급 후, username = `Leche`, password = (방금 발급한 토큰) 입력
- **GitHub Desktop / gh CLI / SSH 키** 중 아무거나 이미 쓰고 계시면 자동으로 됨

---

## 확인

push가 끝나면 1~2분 내에 아래 URL에서 새 버전이 보입니다.

**공개 URL:** <https://leche.github.io/moretab-design-system-web-publishing/v2/>

기존 사이트는 `…/moretab-design-system-web-publishing/` 에 그대로 남아 있습니다.

---

## 이후 업데이트 방법

나중에 로컬에서 디자인 시스템 파일을 수정한 뒤 다시 배포하려면 위 블록을
그대로 한 번 더 실행하면 됩니다. (덮어쓰기 방식이라 단순하고 안전)

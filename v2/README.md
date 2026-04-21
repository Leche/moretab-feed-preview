# 더보기탭 디자인 시스템

카카오톡 **더보기탭** 지면을 위한 모바일 디자인 시스템 문서입니다.
Foundation · Components · Patterns · Overview 4개 축으로 구성되어 있으며,
모든 스펙은 Figma 소스(3986, 1321 노드)와 1:1로 맞춰져 있습니다.

## 구조

```
index.html                  Overview / Getting Started
assets/
  ds.css                    공통 스타일 (레이아웃 · 사이드바 · 테이블 · 미리보기 프레임)
  ds.js                     네비게이션 활성화 / data-root 경로 보정
foundation/                 색 · 타이포 · 간격 · 아이콘
components/                 10개 UI 컴포넌트 (Header, Chip, PayStrip, ServiceShortcut,
                             HomeAd, GameCard, KakaoNow, WeatherCard, TabBar)
patterns/                   앱 셸 / 세션 구조 등 조합 패턴
```

## 로컬에서 실행

별도 빌드 과정 없는 정적 사이트입니다. 정적 파일 서버로 열기만 하면 됩니다.

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

브라우저에서 `http://localhost:8000` 을 엽니다.

## 디자인 토큰

- **Gray scale:** `#191919` · `#595959` · `#767676`
- **Point red:** `#f4551e` (경보/뱃지)
- **Point blue:** `#2f7ff5` (금융 지표 하락)
- **Kakao yellow:** `#fee500` (PayStrip · NEW 태그 등 프로덕트 토큰)
- **Font:** Pretendard (jsDelivr CDN)
- **Base viewport:** 393 × device-height, 모바일 우선

## 관련 링크

- 원본 레퍼런스: <https://leche.github.io/moretab-design-system-web-publishing/>

---

© 카카오톡 디자인시스템팀 · 내부 공유용

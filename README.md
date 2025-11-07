# 한국노마드 - 디지털 노마드를 위한 도시 찾기 플랫폼

PRD 기반으로 구현한 NextJS 프로젝트입니다. Supabase Auth를 통한 이메일 인증 시스템이 포함되어 있습니다.

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Authentication**: Supabase Auth (Email only)
- **Database**: Supabase (PostgreSQL)

## 📦 프로젝트 구조

```
cc-example/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (Header, Footer 포함)
│   ├── page.tsx            # 홈페이지 (메인 로직)
│   ├── login/              # 로그인 페이지
│   ├── register/           # 회원가입 페이지
│   └── globals.css         # 글로벌 스타일 (디자인 시스템)
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # 헤더 (로고, 로그인/로그아웃 버튼)
│   │   ├── Footer.tsx      # 푸터 (링크, 저작권)
│   │   └── Container.tsx   # 레이아웃 컨테이너
│   ├── home/
│   │   ├── HeroSection.tsx      # 히어로 섹션
│   │   ├── CityCard.tsx         # 도시 카드 (필터 정보, 좋아요/싫어요)
│   │   ├── CityGrid.tsx         # 도시 그리드 레이아웃
│   │   ├── FilterSidebar.tsx    # 필터 사이드바 (예산, 지역, 환경, 계절)
│   │   └── SortOptions.tsx      # 정렬 드롭다운
│   ├── auth/
│   │   ├── AuthLayout.tsx       # 인증 페이지 레이아웃
│   │   ├── LoginForm.tsx        # 로그인 폼
│   │   └── RegisterForm.tsx     # 회원가입 폼
│   └── ui/                      # Shadcn UI 컴포넌트들
├── lib/
│   ├── constants.ts        # 상수 정의 (필터 옵션, 정렬 등)
│   ├── mock-data.ts        # Mock 도시 데이터 (10개)
│   └── utils.ts            # 유틸리티 함수
└── types/
    └── index.ts            # TypeScript 타입 정의
```

## 🎨 구현된 기능

### 핵심 기능 ✅

- ✅ **헤더**: 로고, 로그인/회원가입/로그아웃 버튼
- ✅ **히어로 섹션**: 메인 헤드라인, 통계 정보
- ✅ **도시 카드**:
  - 순위 배지 (#1, #2, #3...)
  - 도시 이름 및 설명
  - 필터 정보 (예산, 지역, 환경, 최고 계절) - Key-Value 형태로 표시
  - 좋아요/싫어요 버튼 및 카운트
- ✅ **필터 시스템**:
  - 검색 (도시명/지역)
  - 예산 필터 (라디오 버튼): 100만원 이하, 100~200만원, 200만원 이상
  - 지역 필터 (라디오 버튼): 전체, 수도권, 경상도, 전라도, 강원도, 제주도, 충청도
  - 환경 필터 (체크박스, 다중 선택): 자연친화, 도심선호, 카페작업, 코워킹 필수
  - 최고 계절 필터 (체크박스, 다중 선택): 봄, 여름, 가을, 겨울
  - 초기화 버튼
- ✅ **정렬 옵션**:
  - 좋아요 많은 순 (기본값)
  - 좋아요 적은 순
  - 이름 가나다순
- ✅ **그리드 뷰**:
  - 반응형 그리드 (Desktop 3열, Tablet 2열, Mobile 1열)
  - 더 보기 버튼 (6개씩 로드)
- ✅ **푸터**: 회사 정보, 링크, SNS
- ✅ **반응형 디자인**: Desktop, Tablet, Mobile 대응

### 인증 시스템 ✅

- ✅ **이메일 회원가입**: 비밀번호 검증, 약관 동의
- ✅ **이메일 로그인**: Supabase Auth 연동
- ✅ **로그아웃**: Server Actions 기반
- ✅ **세션 관리**: Middleware를 통한 자동 세션 갱신
- ✅ **사용자 상태**: Header에 로그인 상태 및 이메일 표시

### 제거된 기능 (Phase 1-4에서 단순화)

- ❌ **별점 시스템**: 좋아요/싫어요 버튼으로 대체
- ❌ **복잡한 지표**: 인터넷 속도, 카페 개수, 추천도, 숙소 비용 등 제거
- ❌ **실시간 날씨/공기질**: 제거 (외부 API 연동 불필요)
- ❌ **도시 상세 페이지**: 제거 ("자세히 보기" 버튼 제거)
- ❌ **복잡한 필터**: 슬라이더, 다수의 체크박스 등을 단순화된 필터로 대체

### 미구현 기능 (향후 개발)

- ⬜ 지도 뷰
- ⬜ 리스트 뷰
- ⬜ 위시리스트 기능
- ⬜ 리뷰 시스템

## 🎯 디자인 시스템

### 색상 팔레트

```css
Primary:    #3B82F6 (파란색 - CTA, 링크)
Secondary:  #10B981 (초록색 - 성공, 긍정)
Accent:     #F59E0B (주황색 - 강조, 알림)
Background: #F9FAFB (연한 회색 - 배경)
Foreground: #1F2937 (진한 회색 - 본문)

필터 배지 색상:
- 예산: 파란색
- 지역: 초록색
- 환경: 주황색
- 계절: 보라색
```

### 타이포그래피

- **Font Family**: Geist Sans (한글), Geist Mono (코드)
- **H1**: 48px / 3rem
- **H2**: 36px / 2.25rem
- **H3**: 24px / 1.5rem
- **Body**: 16px / 1rem

### 반응형 브레이크포인트

- **sm**: 640px (모바일 가로)
- **md**: 768px (태블릿)
- **lg**: 1024px (데스크톱 작음)
- **xl**: 1280px (데스크톱)

## 🏃‍♂️ 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 프로젝트 설정

#### 2.1 Supabase 프로젝트 생성

1. [Supabase 대시보드](https://supabase.com/dashboard)에서 새 프로젝트 생성
2. 프로젝트 이름과 비밀번호 설정
3. 리전 선택 (한국의 경우 Northeast Asia (Seoul) 권장)

#### 2.2 환경 변수 설정

1. `.env.local.example` 파일을 `.env.local`로 복사:
```bash
cp .env.local.example .env.local
```

2. Supabase 대시보드에서 API 키 가져오기:
   - Settings → API → Project URL과 anon public key 복사

3. `.env.local` 파일 수정:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

#### 2.3 이메일 인증 설정 (옵션)

Supabase는 기본적으로 이메일 인증을 사용합니다. 프로덕션 환경에서는:

1. Authentication → Settings → Email Templates에서 이메일 템플릿 커스터마이징
2. Authentication → URL Configuration에서 Site URL과 Redirect URLs 설정:
   - Site URL: `http://localhost:3000` (개발) 또는 배포 URL
   - Redirect URLs: `http://localhost:3000/auth/callback` 추가

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 4. 빌드

```bash
npm run build
npm start
```

## 📊 Mock 데이터

10개의 샘플 도시 데이터가 포함되어 있습니다:

1. 강남/역삼 (서울)
2. 홍대/연남 (서울)
3. 성수동 (서울)
4. 판교 (경기)
5. 해운대 (부산)
6. 제주 애월 (제주)
7. 광화문 (서울)
8. 송도 (인천)
9. 경리단길 (서울)
10. 광안리 (부산)

각 도시는 다음 정보를 포함합니다:
- 이름, 지역, 순위, 설명
- 예산 (BudgetFilter)
- 지역 (RegionFilter)
- 환경 (EnvironmentFilter[])
- 최고 계절 (SeasonFilter[])
- 좋아요 카운트, 싫어요 카운트
- 리뷰 수, 조회수

## 🔧 주요 기능 상세

### 필터링

- **검색**: 도시명/지역명 실시간 검색
- **예산**: 라디오 버튼으로 단일 선택
  - 100만원 이하
  - 100~200만원
  - 200만원 이상
- **지역**: 라디오 버튼으로 단일 선택
  - 전체, 수도권, 경상도, 전라도, 강원도, 제주도, 충청도
- **환경**: 체크박스로 다중 선택 (OR 조건)
  - 자연친화, 도심선호, 카페작업, 코워킹 필수
- **최고 계절**: 체크박스로 다중 선택 (OR 조건)
  - 봄, 여름, 가을, 겨울

### 정렬

- 좋아요 많은 순 (기본값)
- 좋아요 적은 순
- 이름 가나다순

### 좋아요/싫어요 기능

- 각 도시 카드에 좋아요/싫어요 버튼 표시
- 클릭 시 아이콘 색상 변경 및 카운트 증가/감소
- 좋아요와 싫어요는 상호 배타적 (하나를 클릭하면 다른 하나는 자동 해제)
- 클라이언트 상태 관리 (useState 사용)

### 반응형

- **Desktop (1024px+)**:
  - 3열 그리드
  - 좌측 필터 사이드바 고정
- **Tablet (768-1023px)**:
  - 2열 그리드
  - 필터는 접을 수 있는 영역
- **Mobile (<768px)**:
  - 1열 그리드
  - 필터는 아코디언 형태

## 🔐 인증 시스템 아키텍처

### Supabase Auth SSR 패턴

프로젝트는 Supabase의 최신 SSR 패턴을 사용합니다:

- **Browser Client** (`utils/supabase/client.ts`): Client Component에서 사용
- **Server Client** (`utils/supabase/server.ts`): Server Component와 Server Actions에서 사용
- **Middleware Client** (`utils/supabase/middleware.ts`): Next.js Middleware에서 세션 관리

### 주요 기능

1. **Server Actions**:
   - `app/login/actions.ts`에서 login, signup, signout 함수 제공
   - Progressive Enhancement 지원 (JavaScript 없이도 동작)

2. **Middleware 세션 관리**:
   - 모든 요청에서 자동으로 세션 갱신
   - `getUser()` 호출로 무작위 로그아웃 방지

3. **이메일 인증 콜백**:
   - `app/auth/callback/route.ts`에서 이메일 확인 처리
   - 인증 완료 후 홈으로 리디렉션

4. **사용자 상태 표시**:
   - Header는 Server Component로 사용자 세션 체크
   - 로그인 시 이메일 표시 및 로그아웃 버튼 제공

## 📝 주의사항

### 제한사항

- 도시 이미지는 배경색 + 텍스트로 대체
- Mock 데이터 사용 (실제 DB 데이터 아님)
- Supabase 환경 변수가 설정되지 않으면 인증 기능 동작하지 않음

## 🚀 향후 개발 방향

1. **백엔드 연동**:
   - Supabase Database 테이블 설계 (도시, 리뷰 등)
   - Row Level Security (RLS) 정책 적용
   - API 엔드포인트 구현
   - 좋아요/싫어요 데이터 영구 저장

2. **추가 기능**:
   - 지도 뷰 (카카오맵 SDK)
   - 리뷰 시스템 (Supabase Database 활용)
   - 위시리스트 (사용자별 저장)
   - 도시 상세 페이지
   - 소셜 로그인 (카카오, 네이버, 구글)

3. **성능 최적화**:
   - 이미지 최적화 (Next.js Image)
   - Redis 캐싱
   - SSR/ISR 활용
   - Supabase Realtime 구독

## 📄 라이선스

이 프로젝트는 PRD 기반 UI 구현 예제입니다.

## 👨‍💻 개발자

Claude Code + User

---

## 📚 참고 문서

- [Next.js App Router 공식 문서](https://nextjs.org/docs/app)
- [Supabase Auth 공식 문서](https://supabase.com/docs/guides/auth)
- [Supabase SSR 가이드](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Shadcn UI 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

**Note**: 이 프로젝트는 Supabase Auth를 활용한 실제 인증 시스템이 구현되어 있습니다. Supabase 프로젝트를 생성하고 환경 변수를 설정하면 즉시 사용 가능합니다.
# cc-example

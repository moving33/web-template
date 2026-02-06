# Web Template 프로젝트 구현 계획서

## Context

재사용 가능한 범용 풀스택 웹 프로젝트 템플릿을 `C:\dev\toy\web-templete` 디렉토리에 구축한다.
추후 다른 프로젝트에서 이 템플릿을 복사하여 빠르게 개발을 시작할 수 있도록 하는 것이 목표이다.

---

## 기술 스택 요약

| 영역 | 선택 |
|------|------|
| Framework | Next.js 16 (16.1.x), App Router only |
| React | 19.2 (Next.js 16 요구사항) |
| Language | TypeScript 5.1+ |
| Styling | Tailwind CSS v4 + shadcn/ui + next-themes |
| Package Manager | pnpm |
| Node.js | 22 LTS |
| DB/ORM | Drizzle ORM + PostgreSQL |
| State (Client) | Zustand |
| State (Server) | Tanstack Query |
| Auth | 구조만 준비 (미들웨어 스켈레톤 + 타입) |
| Testing | Vitest + React Testing Library + Playwright |
| Code Quality | ESLint + Prettier + Husky + lint-staged |
| Env Validation | @t3-oss/env-nextjs (Zod) |
| i18n | next-intl (ko + en) |
| Docker | Dockerfile + docker-compose.yml |
| CI/CD | GitHub Actions |
| Storybook | Yes |
| 디렉토리 | src/ 사용 |
| API 패턴 | Server Actions 중심 + RSC 조회 |

---

## Next.js 16 주요 변경사항 (반드시 반영)

- `middleware.ts` → `proxy.ts`로 변경
- Turbopack이 기본 번들러 (--turbopack 플래그 불필요)
- `cookies()`, `headers()`, `params`, `searchParams` 모두 async 필수
- React Compiler 안정화: `reactCompiler: true` (experimental 아님)
- `next lint` 제거됨 → ESLint 직접 실행
- `cacheLife`, `cacheTag`에서 `unstable_` 접두사 제거
- Parallel routes에 `default.js` 필수
- turbopack 설정이 `experimental.turbopack` → 최상위 `turbopack`으로 이동

---

## 폴더 구조

```
web-templete/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI
├── .husky/
│   └── pre-commit                    # lint-staged 실행
├── .storybook/
│   ├── main.ts                       # Storybook 설정
│   └── preview.ts                    # 글로벌 데코레이터
├── docker/
│   └── Dockerfile                    # 멀티스테이지 프로덕션 빌드
├── drizzle/
│   └── migrations/                   # DB 마이그레이션 파일
├── e2e/
│   ├── example.spec.ts               # 샘플 E2E 테스트
│   └── playwright.config.ts          # (루트에 배치)
├── messages/
│   ├── ko.json                       # 한국어 번역
│   └── en.json                       # 영어 번역
├── public/
│   └── (정적 파일)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx      # 로그인 페이지 (스켈레톤)
│   │   │   │   └── layout.tsx        # Auth 레이아웃 (최소 구성)
│   │   │   ├── (main)/
│   │   │   │   ├── page.tsx          # 홈 페이지
│   │   │   │   ├── layout.tsx        # 메인 레이아웃 (네비게이션+사이드바+푸터)
│   │   │   │   └── dashboard/
│   │   │   │       └── page.tsx      # 샘플 대시보드 페이지
│   │   │   ├── layout.tsx            # 로케일 레이아웃 (Providers 래핑)
│   │   │   ├── error.tsx             # 에러 페이지
│   │   │   ├── loading.tsx           # 로딩 UI
│   │   │   └── not-found.tsx         # 404 페이지
│   │   ├── layout.tsx                # Root 레이아웃 (html, body, 폰트)
│   │   └── global.css                # Tailwind + 글로벌 스타일
│   ├── features/
│   │   └── auth/
│   │       ├── actions/
│   │       │   └── auth.action.ts    # Server Action 스켈레톤
│   │       ├── components/
│   │       │   └── login-form.tsx    # 로그인 폼 컴포넌트
│   │       └── types/
│   │           └── auth.types.ts     # Auth 관련 타입
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn/ui 컴포넌트 (자동생성)
│   │   │   ├── layout/
│   │   │   │   ├── header.tsx        # 헤더/네비게이션
│   │   │   │   ├── sidebar.tsx       # 사이드바
│   │   │   │   ├── footer.tsx        # 푸터
│   │   │   │   └── theme-toggle.tsx  # 다크모드 토글
│   │   │   └── providers/
│   │   │       ├── query-provider.tsx  # Tanstack Query Provider
│   │   │       └── theme-provider.tsx  # next-themes Provider
│   │   ├── hooks/
│   │   │   └── use-media-query.ts    # 샘플 커스텀 훅
│   │   ├── lib/
│   │   │   ├── db/
│   │   │   │   ├── index.ts          # Drizzle DB 클라이언트
│   │   │   │   ├── schema.ts         # DB 스키마 정의
│   │   │   │   └── migrate.ts        # 마이그레이션 유틸
│   │   │   ├── utils.ts              # cn() 등 유틸 함수
│   │   │   └── query-client.ts       # Tanstack Query 클라이언트 설정
│   │   ├── stores/
│   │   │   └── app.store.ts          # Zustand 앱 스토어 (샘플)
│   │   └── types/
│   │       └── index.ts              # 글로벌 공통 타입
│   └── i18n/
│       ├── config.ts                 # i18n 설정 (locales, defaultLocale)
│       ├── request.ts                # next-intl getRequestConfig
│       └── navigation.ts             # 로케일 기반 네비게이션 헬퍼
├── .env.example                      # 환경변수 예시
├── .eslintrc.json                    # ESLint 설정
├── .gitignore
├── .prettierrc                       # Prettier 설정
├── .nvmrc                            # Node.js 버전 (22)
├── components.json                   # shadcn/ui 설정
├── docker-compose.yml                # 개발 환경 (PostgreSQL)
├── drizzle.config.ts                 # Drizzle Kit 설정
├── env.ts                            # T3 Env 환경변수 스키마
├── lint-staged.config.js             # lint-staged 설정
├── next.config.ts                    # Next.js 설정
├── package.json
├── playwright.config.ts              # Playwright 설정
├── postcss.config.js                 # PostCSS (Tailwind)
├── tailwind.config.ts                # Tailwind 설정
├── tsconfig.json                     # TypeScript 설정
├── vitest.config.ts                  # Vitest 설정
└── CLAUDE.md                         # Claude Code 가이드
```

---

## 구현 단계

### Phase 1: 프로젝트 초기화 및 핵심 설정

**Step 1.1 — Next.js 프로젝트 생성**
```bash
cd C:\dev\toy\web-templete
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
```
- 생성 후 불필요한 보일러플레이트 정리

**Step 1.2 — .nvmrc / .gitignore 설정**
- `.nvmrc`: `22`
- `.gitignore`: Next.js 기본 + `.env.local`, `drizzle/migrations` 등 추가

**Step 1.3 — next.config.ts 설정**
```ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  reactCompiler: true,
  // turbopack 설정은 필요시 최상위에
}

export default withNextIntl(nextConfig)
```

**Step 1.4 — TypeScript 설정 (tsconfig.json)**
- `moduleResolution: "bundler"` (T3 Env ESM 호환)
- path alias: `@/*` → `./src/*`

---

### Phase 2: 코드 품질 도구 설정

**Step 2.1 — ESLint 설정**
```bash
pnpm add -D eslint @eslint/js typescript-eslint eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks
```
- Next.js 16에서는 `next lint` 제거됨 → ESLint 직접 실행
- package.json scripts에 `"lint": "eslint src/"` 추가

**Step 2.2 — Prettier 설정**
```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```
- `.prettierrc`: singleQuote, semi, tailwindcss plugin, printWidth 등

**Step 2.3 — Husky + lint-staged 설정**
```bash
pnpm add -D husky lint-staged
pnpm exec husky init
```
- `lint-staged.config.js`: `.ts,.tsx` → eslint --fix + prettier --write

---

### Phase 3: 환경변수 및 DB 설정

**Step 3.1 — T3 Env 설정**
```bash
pnpm add @t3-oss/env-nextjs zod
```
- `env.ts`: DATABASE_URL, NEXT_PUBLIC_APP_URL 등 스키마 정의
- `.env.example`: 모든 환경변수 키 문서화

**Step 3.2 — Docker Compose (PostgreSQL)**
```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: web_template
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

**Step 3.3 — Drizzle ORM 설정**
```bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```
- `drizzle.config.ts`: PostgreSQL 연결 설정
- `src/shared/lib/db/index.ts`: DB 클라이언트 (postgres 드라이버)
- `src/shared/lib/db/schema.ts`: 샘플 users 테이블 스키마
- package.json scripts: `"db:generate"`, `"db:migrate"`, `"db:push"`, `"db:studio"`

---

### Phase 4: UI 프레임워크 설정

**Step 4.1 — shadcn/ui 초기화**
```bash
pnpm dlx shadcn@latest init
```
- `components.json`: src/shared/components/ui 경로 설정
- 기본 컴포넌트 설치: button, input, card, dropdown-menu, sheet, separator

**Step 4.2 — next-themes 설정**
```bash
pnpm add next-themes
```
- `src/shared/components/providers/theme-provider.tsx`: ThemeProvider 래핑
- `src/shared/components/layout/theme-toggle.tsx`: 라이트/다크/시스템 전환 UI

**Step 4.3 — 공통 유틸리티**
- `src/shared/lib/utils.ts`: `cn()` (clsx + tailwind-merge)

---

### Phase 5: i18n 설정

**Step 5.1 — next-intl 설치 및 설정**
```bash
pnpm add next-intl
```
- `src/i18n/config.ts`: locales (`ko`, `en`), defaultLocale (`ko`)
- `src/i18n/request.ts`: `getRequestConfig` 구현
- `src/i18n/navigation.ts`: `createNavigation()` 헬퍼
- `messages/ko.json`, `messages/en.json`: 기본 번역 키

**Step 5.2 — proxy.ts (구 middleware.ts)**
- 로케일 감지 및 라우팅
- next-intl의 createMiddleware 사용하되 파일명은 `proxy.ts`
- auth 구조를 위한 보호 라우트 체크 스켈레톤 포함

**Step 5.3 — [locale] 동적 세그먼트 구성**
- `src/app/[locale]/layout.tsx`: 로케일별 레이아웃 + Providers
- `generateStaticParams`로 locale 파라미터 생성

---

### Phase 6: 상태 관리 설정

**Step 6.1 — Zustand**
```bash
pnpm add zustand
```
- `src/shared/stores/app.store.ts`: 사이드바 열림/닫힘 등 앱 UI 상태 샘플

**Step 6.2 — Tanstack Query**
```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```
- `src/shared/lib/query-client.ts`: QueryClient 설정 (staleTime, gcTime 등)
- `src/shared/components/providers/query-provider.tsx`: QueryClientProvider + ReactQueryDevtools

---

### Phase 7: 레이아웃 및 샘플 페이지

**Step 7.1 — Root Layout**
- `src/app/layout.tsx`: `<html>`, `<body>`, 폰트 (Geist 또는 Pretendard)
- `src/app/global.css`: Tailwind 디렉티브 + CSS 변수 (다크모드)

**Step 7.2 — 로케일 Layout + Providers**
- `src/app/[locale]/layout.tsx`: NextIntlClientProvider + ThemeProvider + QueryProvider

**Step 7.3 — Main Layout (네비게이션 포함)**
- `src/app/[locale]/(main)/layout.tsx`: Header + Sidebar + Main Content + Footer
- `src/shared/components/layout/header.tsx`: 로고, 네비, 테마 토글, 언어 전환
- `src/shared/components/layout/sidebar.tsx`: 사이드바 네비게이션
- `src/shared/components/layout/footer.tsx`: 푸터

**Step 7.4 — 샘플 페이지**
- `src/app/[locale]/(main)/page.tsx`: 홈페이지 (웰컴 메시지, 기능 소개)
- `src/app/[locale]/(main)/dashboard/page.tsx`: 대시보드 샘플
- `src/app/[locale]/error.tsx`: 에러 바운더리 UI
- `src/app/[locale]/not-found.tsx`: 404 페이지
- `src/app/[locale]/loading.tsx`: 로딩 스켈레톤

**Step 7.5 — Auth 페이지 (스켈레톤)**
- `src/app/[locale]/(auth)/layout.tsx`: 인증 페이지 전용 레이아웃 (센터 정렬)
- `src/app/[locale]/(auth)/login/page.tsx`: 로그인 페이지
- `src/features/auth/components/login-form.tsx`: 로그인 폼 UI
- `src/features/auth/actions/auth.action.ts`: Server Action 스켈레톤
- `src/features/auth/types/auth.types.ts`: User, Session 등 타입 정의

---

### Phase 8: 테스트 환경 설정

**Step 8.1 — Vitest + React Testing Library**
```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```
- `vitest.config.ts`: jsdom 환경, path alias, setup files
- `src/test/setup.ts`: testing-library/jest-dom 확장
- 샘플 테스트: `src/shared/components/layout/header.test.tsx`

**Step 8.2 — Playwright**
```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```
- `playwright.config.ts`: baseURL, webServer 설정
- `e2e/example.spec.ts`: 홈페이지 접속 + 기본 렌더링 확인 테스트

---

### Phase 9: Storybook 설정

```bash
pnpm dlx storybook@latest init --type nextjs
```
- `.storybook/main.ts`: framework nextjs, Tailwind 지원
- `.storybook/preview.ts`: 글로벌 CSS import, 다크모드 데코레이터
- 샘플 스토리: `src/shared/components/layout/header.stories.tsx`

---

### Phase 10: Docker 프로덕션 빌드

**docker/Dockerfile (멀티스테이지)**
```dockerfile
# Stage 1: Dependencies
FROM node:22-alpine AS deps
# pnpm install

# Stage 2: Build
FROM node:22-alpine AS builder
# next build (standalone output)

# Stage 3: Runner
FROM node:22-alpine AS runner
# standalone 서버 실행
```
- `next.config.ts`에 `output: 'standalone'` 추가

---

### Phase 11: CI/CD (GitHub Actions)

**.github/workflows/ci.yml**
```yaml
name: CI
on: [push, pull_request]
jobs:
  lint:       # ESLint + Prettier check + TypeScript check
  test:       # Vitest 단위 테스트
  e2e:        # Playwright E2E 테스트
  build:      # next build 성공 확인
```

---

### Phase 12: 문서화

**CLAUDE.md 생성**
- 빌드/개발/테스트 명령어
- 아키텍처 개요
- 주요 패턴 (Server Actions, i18n, 상태관리 등)

---

## package.json scripts 정리

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,json}\"",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "prepare": "husky"
  }
}
```

---

## 주요 의존성 목록

**dependencies:**
- `next`, `react`, `react-dom`
- `drizzle-orm`, `postgres` (pg 드라이버)
- `zustand`
- `@tanstack/react-query`, `@tanstack/react-query-devtools`
- `next-intl`
- `next-themes`
- `@t3-oss/env-nextjs`, `zod`
- `clsx`, `tailwind-merge`
- `class-variance-authority` (shadcn/ui)
- `lucide-react` (아이콘)

**devDependencies:**
- `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
- `tailwindcss`, `postcss`, `autoprefixer`
- `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-config-prettier`, `eslint-plugin-react-hooks`
- `prettier`, `prettier-plugin-tailwindcss`
- `husky`, `lint-staged`
- `drizzle-kit`
- `vitest`, `@vitejs/plugin-react`, `jsdom`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- `@playwright/test`
- `storybook`, `@storybook/nextjs`, `@storybook/react`
- `babel-plugin-react-compiler`

---

## 검증 방법

1. **개발 서버**: `pnpm dev` → http://localhost:3000 접속, 홈페이지 렌더링 확인
2. **i18n**: `/ko`, `/en` 경로에서 언어 전환 확인
3. **다크모드**: 테마 토글 클릭하여 라이트/다크 전환 확인
4. **타입체크**: `pnpm typecheck` 에러 없음 확인
5. **린트**: `pnpm lint` 에러 없음 확인
6. **포맷**: `pnpm format:check` 통과 확인
7. **단위 테스트**: `pnpm test` 통과 확인
8. **DB**: `docker compose up -d` → `pnpm db:push` → `pnpm db:studio`로 스키마 확인
9. **E2E**: `pnpm test:e2e` 통과 확인
10. **Storybook**: `pnpm storybook` → http://localhost:6006 접속 확인
11. **프로덕션 빌드**: `pnpm build` 성공 확인
12. **Docker**: `docker build -f docker/Dockerfile .` 성공 확인

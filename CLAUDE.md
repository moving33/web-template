# Web Template - Claude Code Guide

## 개요

Next.js 16 기반 풀스택 웹 프로젝트 템플릿입니다.

## 기술 스택

| 영역            | 선택                                        |
| --------------- | ------------------------------------------- |
| Framework       | Next.js 16 (App Router)                     |
| React           | 19.x                                        |
| Language        | TypeScript 5.x                              |
| Styling         | Tailwind CSS v4 + shadcn/ui + next-themes   |
| Package Manager | pnpm                                        |
| Node.js         | 22 LTS                                      |
| DB/ORM          | Drizzle ORM + PostgreSQL                    |
| State (Client)  | Zustand                                     |
| State (Server)  | Tanstack Query                              |
| i18n            | next-intl (ko + en)                         |
| Testing         | Vitest + React Testing Library + Playwright |

## 주요 명령어

```bash
# 개발 서버
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint
pnpm lint:fix

# 포맷
pnpm format
pnpm format:check

# 타입체크
pnpm typecheck

# 단위 테스트
pnpm test
pnpm test:watch
pnpm test:coverage

# E2E 테스트
pnpm test:e2e
pnpm test:e2e:ui

# DB 관련
pnpm db:generate    # 마이그레이션 생성
pnpm db:migrate     # 마이그레이션 실행
pnpm db:push        # 스키마 직접 푸시 (개발용)
pnpm db:studio      # Drizzle Studio 실행

# Storybook
pnpm storybook
pnpm storybook:build

# Docker (개발 DB)
docker compose up -d
docker compose down
```

## 아키텍처

### 디렉토리 구조

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # 국제화 라우트
│   │   ├── (auth)/         # 인증 페이지 그룹
│   │   ├── (main)/         # 메인 레이아웃 그룹
│   │   ├── layout.tsx      # 로케일 레이아웃 (Providers)
│   │   └── ...
│   ├── layout.tsx          # Root 레이아웃
│   └── globals.css         # 글로벌 스타일
├── features/               # 기능별 모듈
│   └── auth/               # 인증 기능
│       ├── actions/        # Server Actions
│       ├── components/     # UI 컴포넌트
│       └── types/          # 타입 정의
└── shared/                 # 공유 코드
    ├── components/
    │   ├── ui/             # shadcn/ui 컴포넌트
    │   ├── layout/         # 레이아웃 컴포넌트
    │   └── providers/      # Context Providers
    ├── hooks/              # 커스텀 훅
    ├── lib/                # 유틸리티 라이브러리
    │   ├── db/             # Drizzle DB 클라이언트
    │   └── ...
    ├── stores/             # Zustand 스토어
    └── types/              # 공통 타입
```

### 주요 패턴

#### Server Actions

Server Actions는 `features/{feature}/actions/` 에 위치합니다.

```ts
'use server'
export async function someAction(input: SomeInput) {
  // 서버 로직
}
```

#### i18n (국제화)

- `proxy.ts` (구 `middleware.ts`) 에서 로케일 라우팅 처리
- `messages/ko.json`, `messages/en.json` 에 번역 키 추가
- 서버 컴포넌트: `useTranslations()` from `next-intl`
- 클라이언트 컴포넌트: `useTranslations()` from `next-intl` (use client)

#### 상태 관리

- **서버 상태**: Tanstack Query (`useQuery`, `useMutation`)
- **클라이언트 UI 상태**: Zustand (`src/shared/stores/app.store.ts`)

#### DB 스키마 추가

```ts
// src/shared/lib/db/schema.ts 에 추가
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  // ...
})
```

#### 새 shadcn/ui 컴포넌트 추가

```bash
pnpm dlx shadcn@latest add <component-name>
```

## Next.js 16 주요 변경사항

- `middleware.ts` → `proxy.ts` (파일명 변경)
- `cookies()`, `headers()`, `params`, `searchParams` 모두 **async** 필수
- `reactCompiler: true` (experimental 아님)
- `next lint` 제거 → `pnpm lint` (`eslint src/`)
- Turbopack이 기본 번들러

## 환경변수

`.env.example`을 복사하여 `.env.local` 생성:

```bash
cp .env.example .env.local
```

필수 환경변수:

- `DATABASE_URL`: PostgreSQL 연결 문자열
- `NEXT_PUBLIC_APP_URL`: 앱 URL

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// Mock i18n navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}))

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({ setTheme: vi.fn(), theme: 'light' }),
}))

// Mock i18n config
vi.mock('@/i18n/config', () => ({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
}))

// Mock useLocale
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'ko',
}))

describe('Header', () => {
  it('renders navigation links', async () => {
    const { Header } = await import('./header')
    render(<Header />)
    expect(screen.getByText('Web Template')).toBeInTheDocument()
  })
})

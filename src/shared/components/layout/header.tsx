import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { ThemeToggle } from './theme-toggle'
import { LocaleSwitcher } from './locale-switcher'
import { Separator } from '@/shared/components/ui/separator'

export function Header() {
  const t = useTranslations('common')

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold">
          Web Template
        </Link>
        <Separator orientation="vertical" className="mx-4 h-6" />
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {t('home')}
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            {t('dashboard')}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { useAppStore } from '@/shared/stores/app.store'
import { cn } from '@/shared/lib/utils'
import { Home, LayoutDashboard, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

const navItems = [
  { href: '/', icon: Home, labelKey: 'home' as const },
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' as const },
]

export function Sidebar() {
  const t = useTranslations('common')
  const { sidebarOpen, setSidebarOpen } = useAppStore()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="bg-background/80 fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'bg-background fixed top-0 left-0 z-50 h-full w-64 border-r pt-16 transition-transform duration-200 md:relative md:translate-x-0 md:pt-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <span className="font-semibold">{t('menu')}</span>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map(({ href, icon: Icon, labelKey }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  pathname === href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {t(labelKey)}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}

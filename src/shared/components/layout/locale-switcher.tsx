'use client'

import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import { locales, type Locale } from '@/i18n/config'

const localeLabels: Record<string, string> = {
  ko: '한국어',
  en: 'English',
}

export function LocaleSwitcher() {
  const locale = useLocale()
  const fullPathname = usePathname()

  const handleLocaleChange = (nextLocale: Locale) => {
    // Extract current locale from URL path (first segment)
    const segments = fullPathname.split('/')
    const currentLocaleInUrl = segments[1]

    if (locales.includes(currentLocaleInUrl as Locale)) {
      segments[1] = nextLocale
    } else {
      segments.splice(1, 0, nextLocale)
    }

    window.location.assign(segments.join('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {localeLabels[locale] ?? locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={loc === locale ? 'font-bold' : ''}
          >
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

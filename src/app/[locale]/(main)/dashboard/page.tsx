import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

const statKeys = [
  { titleKey: 'totalUsers', valueKey: 'totalUsersValue', descKey: 'totalUsersDesc' },
  { titleKey: 'activeSessions', valueKey: 'activeSessionsValue', descKey: 'activeSessionsDesc' },
  { titleKey: 'requests', valueKey: 'requestsValue', descKey: 'requestsDesc' },
  { titleKey: 'responseTime', valueKey: 'responseTimeValue', descKey: 'responseTimeDesc' },
] as const

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('dashboard')

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">{t('title')}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statKeys.map((stat) => (
          <Card key={stat.titleKey}>
            <CardHeader className="pb-2">
              <CardDescription>{t(stat.titleKey)}</CardDescription>
              <CardTitle className="text-3xl">{t(stat.valueKey)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">{t(stat.descKey)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-muted-foreground mt-8">{t('description')}</p>
    </div>
  )
}

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'

const featureKeys = [
  {
    title: 'Next.js 16',
    descKey: 'feature_nextjs' as const,
    staticDesc: 'App Router, Server Actions, React Compiler',
  },
  { title: 'TypeScript', descKey: 'feature_typescript' as const },
  { title: 'Tailwind CSS v4', descKey: 'feature_tailwind' as const },
  { title: 'shadcn/ui', descKey: 'feature_shadcn' as const },
  { title: 'Drizzle ORM', descKey: 'feature_drizzle' as const },
  { title: 'next-intl', descKey: 'feature_intl' as const },
]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('home')

  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{t('description')}</p>
        <Button asChild size="lg">
          <Link href="/dashboard">{t('getStarted')}</Link>
        </Button>
      </div>

      <h2 className="mb-6 text-2xl font-semibold">{t('features')}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureKeys.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.staticDesc ?? t(feature.descKey)}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { setRequestLocale } from 'next-intl/server'
import { Header } from '@/shared/components/layout/header'
import { Sidebar } from '@/shared/components/layout/sidebar'
import { Footer } from '@/shared/components/layout/footer'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

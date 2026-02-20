import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/navigation'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}

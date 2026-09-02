'use client'

import { usePathname } from 'next/navigation'
import { HomeFooter, HomeHeader } from '@/components/pages/NewHomePage'

const figmaShellRoutes = new Set(['/', '/contact', '/track'])

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (figmaShellRoutes.has(pathname)) return <>{children}</>

  return <>
    <HomeHeader />
    {children}
    <HomeFooter />
  </>
}

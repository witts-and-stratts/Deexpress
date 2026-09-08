'use client'

import { usePathname } from 'next/navigation'
import { HomeFooter, HomeHeader } from '@/components/pages/HomePage'

const ShellRoutes = new Set(['/', '/contact'])

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (ShellRoutes.has(pathname)) return <>{children}</>

  return <>
    <HomeHeader />
    {children}
    <HomeFooter />
  </>
}

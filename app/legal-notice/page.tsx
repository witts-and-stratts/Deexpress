import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'

export const metadata: Metadata = {
  title: 'Legal notice',
}

export default function Page() {
  return <LegalPage kind="notice" />
}

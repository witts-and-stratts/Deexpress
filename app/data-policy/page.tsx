import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'

export const metadata: Metadata = {
  title: 'Data policy',
}

export default function Page() {
  return <LegalPage kind="policy" />
}

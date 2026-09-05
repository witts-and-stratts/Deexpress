import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Data policy',
  description: 'Learn how DEexpress Logistics GmbH handles personal data and protects your privacy.',
  pathname: '/data-policy',
})

export default function Page() {
  return <LegalPage kind="policy" />
}

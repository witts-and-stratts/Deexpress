import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Legal notice',
  description: 'Legal notice and company details for DEexpress Logistics GmbH.',
  pathname: '/legal-notice',
})

export default function Page() {
  return <LegalPage kind="notice" />
}

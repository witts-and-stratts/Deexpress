import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.legalNotice,
  pathname: '/legal-notice',
})

export default function Page() {
  return <LegalPage kind="notice" />
}

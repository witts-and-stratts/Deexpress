import type { Metadata } from 'next'
import { LegalPage } from '@/components/pages/LegalPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.dataPolicy,
  pathname: '/data-policy',
})

export default function Page() {
  return <LegalPage kind="policy" />
}

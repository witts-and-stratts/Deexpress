import type { Metadata } from 'next'
import { QuotePage } from '@/components/pages/QuotePage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.quote,
  pathname: '/quote',
})

export default function Page() {
  return <QuotePage />
}

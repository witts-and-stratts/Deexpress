import type { Metadata } from 'next'
import { QuotePage } from '@/components/pages/QuotePage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Get a quote',
  description: 'Request a free, no-obligation shipping estimate from DEExpress Logistics — air, sea, vehicle and commercial cargo.',
  pathname: '/quote',
})

export default function Page() {
  return <QuotePage />
}

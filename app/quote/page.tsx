import type { Metadata } from 'next'
import { QuotePage } from '@/components/pages/QuotePage'

export const metadata: Metadata = {
  title: 'Get a quote',
  description: 'Request a free, no-obligation shipping estimate from DEExpress Logistics — air, sea, vehicle and commercial cargo.',
}

export default function Page() {
  return <QuotePage />
}

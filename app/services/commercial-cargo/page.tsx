import type { Metadata } from 'next'
import { CommercialCargoPage } from '@/components/pages/CommercialCargoPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Commercial cargo logistics from Europe',
  description: 'Reliable freight coordination for recurring and one-off commercial cargo shipments by air, sea and land.',
  pathname: '/services/commercial-cargo',
  image: '/images/service-cargo.webp',
})
export default function Page() { return <CommercialCargoPage /> }

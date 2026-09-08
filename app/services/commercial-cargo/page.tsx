import type { Metadata } from 'next'
import { CommercialCargoPage } from '@/components/pages/CommercialCargoPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.commercialCargo,
  pathname: '/services/commercial-cargo',
  image: '/images/service-cargo.webp',
})
export default function Page() { return <CommercialCargoPage /> }

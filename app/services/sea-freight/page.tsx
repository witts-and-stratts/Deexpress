import type { Metadata } from 'next'
import { SeaFreightPage } from '@/components/pages/SeaFreightPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.seaFreight,
  pathname: '/services/sea-freight',
  image: '/images/sea-shipping.webp',
})
export default function Page() { return <SeaFreightPage /> }

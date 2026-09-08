import type { Metadata } from 'next'
import { AirFreightPage } from '@/components/pages/AirFreightPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.airFreight,
  pathname: '/services/air-freight',
  image: '/images/air-freight-hero.webp',
})
export default function Page() { return <AirFreightPage /> }

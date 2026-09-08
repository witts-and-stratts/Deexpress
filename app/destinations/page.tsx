import type { Metadata } from 'next'
import { DestinationsPage } from '@/components/pages/DestinationsPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.destinations,
  pathname: '/destinations',
  image: '/images/coverage-earth.webp',
})

export default function Page() {
  return <DestinationsPage />
}

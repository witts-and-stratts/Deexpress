import type { Metadata } from 'next'
import { DestinationsPage } from '@/components/pages/DestinationsPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Destinations',
  description: 'Freight from Europe to 26 countries across Africa and destinations in the Middle East. Explore the regions DEExpress serves.',
  pathname: '/destinations',
  image: '/images/coverage-earth.webp',
})

export default function Page() {
  return <DestinationsPage />
}

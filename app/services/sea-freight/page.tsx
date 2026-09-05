import type { Metadata } from 'next'
import { SeaFreightPage } from '@/components/pages/SeaFreightPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Sea freight from Europe to Africa and the Middle East',
  description: 'Cost-efficient sea freight for containers and consolidated cargo from European ports to destinations across the DEexpress network.',
  pathname: '/services/sea-freight',
  image: '/images/sea-shipping.jpg',
})
export default function Page() { return <SeaFreightPage /> }

import type { Metadata } from 'next'
import { AirFreightPage } from '@/components/pages/AirFreightPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Air freight from Europe to Africa and the Middle East',
  description: 'Time-critical air freight from European airports to destinations across Africa and the Middle East, with export support and careful cargo handling.',
  pathname: '/services/air-freight',
  image: '/images/air-freight-hero.webp',
})
export default function Page() { return <AirFreightPage /> }

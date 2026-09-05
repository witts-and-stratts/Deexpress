import type { Metadata } from 'next'
import { VehicleShippingPage } from '@/components/pages/VehicleShippingPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Vehicle sourcing and international shipping from Europe',
  description: 'Find, purchase and ship cars, trucks, buses and special equipment from Europe through one coordinated team.',
  pathname: '/services/vehicle-shipping',
  image: '/images/vehicle-terminal.webp',
})
export default function Page() { return <VehicleShippingPage /> }

import type { Metadata } from 'next'
import { VehicleShippingPage } from '@/components/pages/VehicleShippingPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.vehicleShipping,
  pathname: '/services/vehicle-shipping',
  image: '/images/vehicle-terminal.webp',
})
export default function Page() { return <VehicleShippingPage /> }

'use client'

import { FreightServicePage } from '@/components/pages/FreightServicePage'

export function VehicleSourcingPage() {
  return <FreightServicePage
    slug="vehicle-sourcing"
    hero={{ title: 'Source the vehicle. Coordinate the journey.', text: 'Practical support from vehicle search and purchase through international shipping.', image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=85' }}
    introduction={{ text: 'We connect sourcing, purchase and onward movement around the vehicle you need,', accent: 'so the process stays clear from first search to final handover.' }}
    capabilityLabel="Vehicle sourcing capabilities"
    capabilities={['Vehicle search and purchase support', 'European seller coordination', 'Export-document preparation', 'Shipping handover planning']}
    efficiency={{ title: 'One team, from search to shipment', text: 'Vehicle sourcing becomes easier when purchase decisions and transport planning are connected.', image: '/images/service-sourcing.webp' }}
    scope={{ title: 'Clear support at every decision point.', image: '/images/car.webp', items: ['Vehicle requirements reviewed before the search begins', 'European seller and purchase coordination', 'Inspection and document support where available', 'Shipping options planned after purchase', 'One point of contact from search to handover', 'Storage support when collection dates move'] }}
    journey={{ images: ['/images/service-sourcing.webp', '/images/car.webp', '/images/service-vehicle.webp'] }}
  />
}

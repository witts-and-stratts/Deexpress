'use client'

import { FreightServicePage } from '@/components/pages/FreightServicePage'

export function VehicleSourcingPage() {
  return <FreightServicePage
    slug="vehicle-sourcing"
    heroImage='/images/service-sourcing.webp'
    efficiencyImage='/images/service-sourcing.webp'
    scopeImage='/images/car.webp'
    journey={{ images: ['/images/service-sourcing.webp', '/images/car.webp', '/images/service-vehicle.webp'] }}
  />
}

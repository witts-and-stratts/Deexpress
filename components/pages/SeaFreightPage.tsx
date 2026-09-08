'use client'

import { FreightServicePage } from '@/components/pages/FreightServicePage'

export function SeaFreightPage() {
  return (
    <FreightServicePage
      slug='sea-freight'
      heroImage={{ src: '/images/sea-shipping.webp', portrait: '/images/sea-shipping-portrait.webp' }}
      efficiencyImage={{ src: '/images/shipping-containers.webp', portrait: '/images/shipping-containers-portrait.webp' }}
      scopeImage='/images/shipping-containers2.webp'
      capabilityIcons={[
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/port.svg',
        '/images/icons/air-documentation.svg',
        '/images/icons/delivery-van.svg',
      ]}
      journey={{
        images: [
          { src: '/images/blue-stacked-container.webp', portrait: '/images/extra-containers.webp' },
          { src: '/images/port.webp', portrait: '/images/port-portrait.webp' },
          { src: '/images/deexpress-warehouse.webp', portrait: '/images/deexpress-warehouse-portrait.webp' },
          { src: '/images/port-call.webp', portrait: '/images/port-call-portrait.webp' },
        ],
      }}
    />
  )
}

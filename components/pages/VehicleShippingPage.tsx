'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

export function VehicleShippingPage() {
  return (
    <FreightServicePage
      slug='vehicle-shipping'
      heroImage={{ src: '/images/vehicle-sourcing-bmw.webp', portrait: '/images/vehicle-sourcing-bmw-portrait.webp' }}
      capabilityIcons={[
        '/images/icons/car.svg',
        '/images/icons/port.svg',
        '/images/icons/container.svg',
        '/images/icons/air-documentation.svg',
      ]}
      efficiencyImage={{ src: '/images/vehicle-fleet.webp', portrait: '/images/vehicle-fleet-portrait.webp' }}
      scopeImage='/images/vehicle-inspection.webp'
      journey={{
        images: [
          {src: '/images/vehicle-sourcing.webp', portrait: '/images/vehicle-sourcing-portrait.webp'},
          {src: '/images/vehicle-showcase-export.webp', portrait: '/images/vehicle-showcase-export-portrait.webp'},
          {src: '/images/vehicle-showcase-loading.webp', portrait: '/images/vehicle-showcase-loading-portrait.webp'},
          {src: '/images/vehicle-showcase-arrival.webp', portrait: '/images/vehicle-showcase-arrival-portrait.webp'},
        ],
      }}
    />
  );
}

'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

export function CommercialCargoPage() {
  return (
    <FreightServicePage
      slug='commercial-cargo'
      heroImage={{ src: '/images/truck-unloading-middle-commercial-dock.webp', portrait: '/images/truck-unloading-middle-commercial-dock-portrait.webp' }}
      capabilityIcons={[
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/air-airport.svg',
        '/images/icons/air-documentation.svg',
        '/images/icons/global-route.svg',
      ]}
      efficiencyImage={{ src: '/images/multimodal-logistics.webp', portrait: '/images/multimodal-logistics-portrait.webp' }}
      scopeImage='/images/air-freight-hero.webp'
      journey={{
        images: [
          {
            src: '/images/package-sorting-in-progress.webp',
            portrait: '/images/package-sorting-in-progress-portrait.webp',
          },
          {
            src: '/images/sea-and-air-transport.webp',
            portrait: '/images/sea-and-air-transport-portrait.webp',
          },
          {
            src: '/images/customs-agent-in-warehouse.webp',
            portrait: '/images/customs-agent-in-warehouse-portrait.webp',
          },
          {
            src: '/images/delivery-employee.webp',
            portrait: '/images/delivery-employee-portrait.webp',
          },
        ],
      }}
    />
  );
}

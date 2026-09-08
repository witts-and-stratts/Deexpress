'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

export function StoragePage() {
  return (
    <FreightServicePage
      slug='storage'
      heroImage={{ src: '/images/storage-showcase-warehouse.webp', portrait: '/images/storage-showcase-warehouse-portrait.webp' }}
      capabilityIcons={[
        '/images/icons/warehouse.svg',
        '/images/icons/home-appliances.svg',
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/global-route.svg',
      ]}
      efficiencyImage={{ src: '/images/storage-shipping.webp', portrait: '/images/storage-shipping-portrait.webp' }}
      scopeImage='/images/cargo-warehouse.webp'
      journey={{
        images: [
          {
            src: '/images/package-checks.webp',
            portrait: '/images/package-checks-portrait.webp',
          },
          {
            src: '/images/package-on-conveyor-belts.webp',
            portrait: '/images/package-on-conveyor-belts-portrait.webp',
          },
          {
            src: '/images/cargo-transport.webp',
            portrait: '/images/cargo-transport-portrait.webp',
          },
        ],
      }}
    />
  );
}

'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

export function PersonalEffectsPage() {
  return (
    <FreightServicePage
      slug='personal-effects'
      heroImage={{ src: '/images/personal-effect-shipping.webp', portrait: '/images/personal-effect-shipping-portrait.webp' }}
      capabilityIcons={[
        '/images/icons/home-appliances.svg',
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/air-airport.svg',
        '/images/icons/delivery-van.svg',
      ]}
      efficiencyImage={{ src: '/images/delivery-man-with-packages.webp', portrait: '/images/delivery-man-with-packages-portrait.webp' }}
      scopeImage='/images/personal-showcase-packing.webp'
      journey={{
        images: [
          {
            src: '/images/client-personal-effect-inventory.webp',
            portrait: '/images/client-personal-effect-inventory-portrait.webp',
          },
          {
            src: '/images/personal-showcase-packaging.webp',
            portrait: '/images/personal-showcase-packaging-portrait.webp',
          },
          {
            src: '/images/export-preparation-and-shipping.webp',
            portrait: '/images/export-preparation-and-shipping-portrait.webp',
          },
          {
            src: '/images/client-received-package.webp',
            portrait: '/images/client-received-package-portrait.webp',
          },
        ],
      }}
    />
  );
}

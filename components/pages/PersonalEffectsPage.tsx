'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';
import { useLang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';

export function PersonalEffectsPage() {
  const { lang } = useLang();
  const copy = SERVICE_PAGES[lang]['personal-effects'];

  return (
    <FreightServicePage
      slug='personal-effects'
      hero={{
        ...copy.hero,
        image: {
          src: '/images/personal-effect-shipping.webp',
          portrait: '/images/personal-effect-shipping-portrait.webp',
        },
      }}
      introduction={copy.introduction}
      capabilityLabel={copy.capabilityLabel}
      capabilityIcons={[
        '/images/icons/home-appliances.svg',
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/air-airport.svg',
        '/images/icons/delivery-van.svg',
      ]}
      capabilities={copy.capabilities}
      efficiency={{
        ...copy.efficiency,
        image: {
          src: '/images/delivery-man-with-packages.webp',
          portrait: '/images/delivery-man-with-packages-portrait.webp',
        },
      }}
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
        scenes: copy.process,
      }}
      work={copy.work}
      answers={copy.answers}
    />
  );
}

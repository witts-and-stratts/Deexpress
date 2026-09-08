'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';
import { useLang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';

export function StoragePage() {
  const { lang } = useLang();
  const copy = SERVICE_PAGES[lang].storage;

  return (
    <FreightServicePage
      slug='storage'
      hero={{
        ...copy.hero,
        image: {
          src: '/images/storage-showcase-warehouse.webp',
          portrait: '/images/storage-showcase-warehouse-portrait.webp',
        },
      }}
      introduction={copy.introduction}
      capabilityLabel={copy.capabilityLabel}
      capabilityIcons={[
        '/images/icons/warehouse.svg',
        '/images/icons/home-appliances.svg',
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/global-route.svg',
      ]}
      capabilities={copy.capabilities}
      efficiency={{
        ...copy.efficiency,
        image: {
          src: '/images/storage-shipping.webp',
          portrait: '/images/storage-shipping-portrait.webp',
        },
      }}
      scopeImage='/images/cargo-warehouse.webp'
      showStatistics={false}
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
        scenes: copy.process,
      }}
      work={copy.work}
      answers={copy.answers}
    />
  );
}

'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';
import { useLang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';

export function CommercialCargoPage() {
  const { lang } = useLang();
  const copy = SERVICE_PAGES[lang]['commercial-cargo'];

  return (
    <FreightServicePage
      slug='commercial-cargo'
      hero={{
        ...copy.hero,
        image: {
          src: '/images/truck-unloading-middle-commercial-dock.webp',
          portrait:
            '/images/truck-unloading-middle-commercial-dock-portrait.webp',
        },
      }}
      introduction={copy.introduction}
      capabilityLabel={copy.capabilityLabel}
      capabilities={copy.capabilities}
      capabilityIcons={[
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/air-airport.svg',
        '/images/icons/air-documentation.svg',
        '/images/icons/global-route.svg',
      ]}
      efficiency={{
        ...copy.efficiency,
        image: {
          src: '/images/multimodal-logistics.webp',
          portrait: '/images/multimodal-logistics-portrait.webp',
        },
      }}
      scopeImage='/images/air-freight-hero.webp'
      highlights={copy.highlights}
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
        scenes: copy.process,
      }}
      work={copy.work}
    />
  );
}

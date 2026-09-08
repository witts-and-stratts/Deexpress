'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';
import { useLang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';

export function VehicleShippingPage() {
  const { lang } = useLang();
  const copy = SERVICE_PAGES[lang]['vehicle-shipping'];

  return (
    <FreightServicePage
      slug='vehicle-shipping'
      hero={{
        ...copy.hero,
        image: {src: '/images/vehicle-sourcing-bmw.webp', portrait: '/images/vehicle-sourcing-bmw-portrait.webp'},
      }}
      introduction={copy.introduction}
      capabilityLabel={copy.capabilityLabel}
      capabilityIcons={[
        '/images/icons/car.svg',
        '/images/icons/port.svg',
        '/images/icons/container.svg',
        '/images/icons/air-documentation.svg',
      ]}
      capabilities={copy.capabilities}
      efficiency={{
        ...copy.efficiency,
        image: {src: '/images/vehicle-fleet.webp', portrait: '/images/vehicle-fleet-portrait.webp'},
      }}
      scopeImage='/images/vehicle-inspection.webp'
      journey={{
        images: [
          {src: '/images/vehicle-sourcing.webp', portrait: '/images/vehicle-sourcing-portrait.webp'},
          {src: '/images/vehicle-showcase-export.webp', portrait: '/images/vehicle-showcase-export-portrait.webp'},
          {src: '/images/vehicle-showcase-loading.webp', portrait: '/images/vehicle-showcase-loading-portrait.webp'},
          {src: '/images/vehicle-showcase-arrival.webp', portrait: '/images/vehicle-showcase-arrival-portrait.webp'},
        ],
        scenes: copy.process,
      }}
      work={copy.work}
      answers={copy.answers}
    />
  );
}

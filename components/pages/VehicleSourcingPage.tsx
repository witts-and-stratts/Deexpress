'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';
import { useLang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';

export function VehicleSourcingPage() {
  const { lang } = useLang();
  const copy = SERVICE_PAGES[lang]['vehicle-sourcing'];

  return (
    <FreightServicePage
      slug='vehicle-sourcing'
      hero={{
        ...copy.hero,
        image:
          'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=85',
      }}
      introduction={copy.introduction}
      capabilityLabel={copy.capabilityLabel}
      capabilities={copy.capabilities}
      efficiency={{
        ...copy.efficiency,
        image: '/images/service-sourcing.webp',
      }}
      scopeImage='/images/car.webp'
      journey={{
        images: [
          '/images/service-sourcing.webp',
          '/images/car.webp',
          '/images/service-vehicle.webp',
        ],
      }}
    />
  );
}

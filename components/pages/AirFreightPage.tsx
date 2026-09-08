'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';
import { useLang } from '@/lib/i18n';
import { SERVICE_PAGES } from '@/lib/service-pages';

export function AirFreightPage() {
  const { lang } = useLang();
  const copy = SERVICE_PAGES[lang]['air-freight'];

  return (
    <FreightServicePage
      slug='air-freight'
      hero={{
        ...copy.hero,
        image: {src: '/images/air-freight-hero.webp', portrait: '/images/air-freight-hero-portrait.webp'},
      }}
      introduction={copy.introduction}
      capabilityLabel={copy.capabilityLabel}
      capabilities={copy.capabilities}
      efficiency={{
        ...copy.efficiency,
        image: {src: '/images/air-freight-efficiency-hero.webp', portrait: '/images/air-freight-efficiency-hero-portrait.webp'},
      }}
      scopeImage='/images/airport-cargo.webp'
      highlights={copy.highlights}
      journey={{
        images: [
          {src: '/images/deexpress-cargo-processor.webp', portrait: '/images/deexpress-cargo-processor-portrait.webp'},
          {src: '/images/air-showcase-booking.webp', portrait: '/images/air-showcase-booking-portrait.webp'},
          {src: '/images/air-showcase-arrival.webp', portrait: '/images/air-showcase-arrival-portrait.webp'},
          {src: '/images/air-showcase-onward.webp', portrait: '/images/air-showcase-onward-portrait.webp'},
        ],
        scenes: copy.process,
      }}
    />
  );
}

import { FreightServicePage } from '@/components/pages/FreightServicePage';

export function AirFreightPage() {
  return (
    <FreightServicePage
      slug='air-freight'
      heroImage={{src: '/images/air-freight-hero.webp', portrait: '/images/air-freight-hero-portrait.webp'}}
      efficiencyImage={{src: '/images/air-freight-efficiency-hero.webp', portrait: '/images/air-freight-efficiency-hero-portrait.webp'}}
      scopeImage='/images/airport-cargo.webp'
      journey={{
        images: [
          {src: '/images/deexpress-cargo-processor.webp', portrait: '/images/deexpress-cargo-processor-portrait.webp'},
          {src: '/images/air-showcase-booking.webp', portrait: '/images/air-showcase-booking-portrait.webp'},
          {src: '/images/air-showcase-arrival.webp', portrait: '/images/air-showcase-arrival-portrait.webp'},
          {src: '/images/air-showcase-onward.webp', portrait: '/images/air-showcase-onward-portrait.webp'},
        ],
      }}
    />
  );
}

'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

const airFreightProcess = [
  {
    title: 'Cargo purchase & negotiations',
    text: 'For specific requests, we start by liaising with your suppliers, making transportation arrangements and purchasing your products on your behalf, with optimal payment facilitation.',
  },
  {
    title: 'Booking & export preparation',
    text: 'Once the route is agreed, the shipment is prepared for collection and airport handling. DEexpress supports the export-document process and coordinates the handovers required before departure.',
  },
  {
    title: 'Arrival, customs clearing & handling',
    text: 'We handle the customs process in the destination airport, with filing of complete paperwork and other regulatory obligations.',
  },
  {
    title: 'Onward coordination',
    text: 'At destination, the next handover is planned around the confirmed route. Where available, the service continues from airport handling to final delivery coordination.',
  },
];

export function AirFreightPage() {
  return (
    <FreightServicePage
      slug='air-freight'
      hero={{
        title: 'Worldwide air freight, delivered with confidence',
        text: 'Time-critical air freight services from Europe to Africa and beyond – we deliver your cargo safely to its destination with speed, efficiency and care.',
        image: {src: '/images/air-freight-hero.webp', portrait: '/images/air-freight-hero-portrait.webp'},
      }}
      introduction={{
        text: 'For time-critical and high-value shipments, we coordinate air freight from European airports to destinations across our network,',
        accent:
          'with careful handling and clear communication from take-off to arrival.',
      }}
      capabilityLabel='Air freight capabilities'
      capabilities={[
        'Time-critical and priority shipments',
        'Airport-to-airport coordination',
        'Export documentation support',
        'Careful handling of high-value cargo',
      ]}
      efficiency={{
        title: 'Speed meets cost efficiency',
        text: 'Tailor-made logistics services from Europe to Africa by road, air, water or rail – we deliver your cargo safely to its destination with efficiency and care.',
        image: {src: '/images/air-freight-efficiency-hero.webp', portrait: '/images/air-freight-efficiency-hero-portrait.webp'},
      }}
      scopeImage='/images/airport-cargo.webp'
      highlights={[
        {
          value: 24,
          suffix: ' hrs',
          text: 'Typical response time for initial quote planning',
        },
        {
          value: 3,
          suffix: ' stages',
          text: 'Collection, flight and arrival handovers coordinated',
        },
        {
          value: 2,
          suffix: ' weeks',
          text: 'Maximum shipping duration',
        },
        {
          value: 100,
          suffix: '%',
          text: 'Cargo-specific route planning from the outset',
        },
      ]}
      journey={ {
        heading: 'Priority shipping. Everytime',
        images: [
          {src: '/images/deexpress-cargo-processor.webp', portrait: '/images/deexpress-cargo-processor-portrait.webp'},
          {src: '/images/air-showcase-booking.webp', portrait: '/images/air-showcase-booking-portrait.webp'},
          {src: '/images/air-showcase-arrival.webp', portrait: '/images/air-showcase-arrival-portrait.webp'},
          {src: '/images/air-showcase-onward.webp', portrait: '/images/air-showcase-onward-portrait.webp'},
        ],
        scenes: airFreightProcess,
      }}
    />
  );
}

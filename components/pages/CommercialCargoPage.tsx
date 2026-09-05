'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

const commercialCargoProcess = [
  {
    title: 'Start with the business requirement',
    text: 'We begin with the goods, packing, origin, destination and delivery priority — whether the shipment is a one-off project or part of a regular supply flow.',
  },
  {
    title: 'Build the right route around the cargo',
    text: 'Air, sea, rail and road options are considered together, balancing timing, cost and the practical handling needs of your shipment.',
  },
  {
    title: 'Coordinate the movement from collection onward',
    text: 'Collection, export documents and transport handovers are planned as one connected flow, with clear communication as the cargo moves.',
  },
  {
    title: 'Keep the next shipment ready to move',
    text: 'For recurring cargo, the agreed process creates a dependable basis for the next request. For one-off shipments, delivery is coordinated around the confirmed route.',
  },
];

export function CommercialCargoPage() {
  return (
    <FreightServicePage
      slug='commercial-cargo'
      hero={{
        title: 'Commercial cargo that keeps business moving',
        text: 'Reliable freight coordination for one-off projects and recurring commercial shipments of every scale.',
        image:
          'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1600&q=85',
      }}
      introduction={{
        text: 'DEExpress plan commercial cargo around your goods, route and operating requirements,',
        accent: 'connecting air, sea and land handovers in one clear flow.',
      }}
      capabilityLabel='Commercial cargo capabilities'
      capabilities={[
        'One-off and recurring cargo',
        'Air, sea and land coordination',
        'Export documentation support',
        'Route visibility from collection onward',
      ]}
      efficiency={{
        title: 'Logistics designed around your cargo',
        text: 'The right solution for your shipment needs, not with a fixed route. Across road, air, sea and rail, we balance speed, cost and care to move your cargo safely from Europe to Africa.',
        image: '/images/service-cargo.jpg',
      }}
      scope={{
        title: 'A practical partner for every commercial movement.',
        image: '/images/train.webp',
        items: [
          'Commercial goods planned around specific delivery requirements',
          'Palletised, loose, project, oversized and sensitive cargo coordination',
          'Air, sea, rail and road options considered together',
          'Export documentation, certification, customs and regulatory coordination',
          'One point of contact, tracking and timely updates across every handover',
          'Secure short- and long-term storage, consolidation and container handling',
          'Last-mile delivery and onward distribution across local and regional networks',
          'Flexible support for one-off and recurring shipments',
        ],
      }}
      journey={{
        images: [
          '/images/service-cargo.jpg',
          '/images/train.webp',
          '/images/truck.webp',
          '/images/service-sea.webp',
        ],
        heading: 'Every commercial movement, kept connected',
        scenes: commercialCargoProcess,
      }}
      work={{
        title: 'We handle the work that matters the most',
        items: [
          {
            title: 'Commercial route coordination',
            text: 'Tailored planning across air, sea, rail and road transport, aligned to the nature of your cargo, destination and delivery timeline.',
          },
          {
            title: 'Documentation & compliance',
            text: 'Preparation and management of shipping documents, customs paperwork and cargo-specific requirements for a compliant, seamless journey.',
          },
          {
            title: 'Flexible cargo handling',
            text: 'The right equipment, consolidation, storage and handling arrangements for palletised, loose, oversized or sensitive cargo.',
          },
          {
            title: 'Delivery & distribution',
            text: 'Coordination from collection to final delivery, keeping commercial cargo moving reliably across every handover.',
          },
        ],
      }}
    />
  );
}

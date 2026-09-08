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
        title: 'Commercial cargo shipping that keeps business moving',
        text: 'Reliable freight coordination for one-off projects and recurring commercial shipments of every scale.',
        image: {
          src: '/images/truck-unloading-middle-commercial-dock.webp',
          portrait:
            '/images/truck-unloading-middle-commercial-dock-portrait.webp',
        },
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
      capabilityIcons={[
        '/images/icons/consolidated-cargo.svg',
        '/images/icons/air-airport.svg',
        '/images/icons/air-documentation.svg',
        '/images/icons/global-route.svg',
      ]}
      efficiency={{
        title: 'Logistics designed around your cargo',
        text: 'The right solution for your shipment needs, not with a fixed route. Across road, air, sea and rail, we balance speed, cost and care to move your cargo safely from Europe to Africa.',
        image: {
          src: '/images/multimodal-logistics.webp',
          portrait: '/images/multimodal-logistics-portrait.webp',
        },
      }}
      scope={{
        title: 'A practical partner for every commercial cargo movement.',
        image: '/images/air-freight-hero.webp',
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
      highlights={[
        {
          value: 4,
          suffix: ' modes',
          text: 'Air, sea, rail and road options considered together',
        },
        {
          value: 24,
          suffix: ' hrs',
          text: 'Typical response time for initial quote planning',
        },
        {
          value: 1,
          suffix: ' team',
          text: 'Coordinating cargo, documents and handovers',
        },
        {
          value: 100,
          suffix: '%',
          text: 'Planning shaped around the cargo and delivery requirement',
        },
      ]}
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
        heading: 'Logistics to keep business moving',
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

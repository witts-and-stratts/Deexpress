'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

const vehicleJourney = [
  {
    title: 'Vehicle sourcing & purchase support',
    text: 'Looking for a vehicle in Europe? We support the search, liaise with sellers and assist with purchase negotiations. Inspection and document checks are arranged where available, with shipping requirements considered from the start.',
  },
  {
    title: 'Collection & export preparation',
    text: 'Once your vehicle is ready, we coordinate collection, export documents and the port handover. Already own the vehicle? Your journey can begin here, with storage available when collection and departure dates do not align.',
  },
  {
    title: 'Vehicle loading & sea transport',
    text: 'From a single car to commercial vehicles, we plan container or roll-on/roll-off transport around the vehicle and destination. Booking, handling and loading arrangements are connected for a carefully managed departure.',
  },
  {
    title: 'Arrival & onward delivery',
    text: 'At destination, we coordinate the arrival handover and support the customs-document process. Where available, onward transport connects the port to your final delivery point, with clear communication throughout.',
  },
];

export function VehicleShippingPage() {
  return (
    <FreightServicePage
      slug='vehicle-shipping'
      hero={{
        title: 'Vehicle sourcing and shipping, delivered with confidence',
        text: 'From finding your vehicle in Europe to shipping it to Africa and the Middle East — we bring purchase support, careful handling and international transport together.',
        image: '/images/vehicle-terminal.webp',
      }}
      introduction={{
        text: 'DEExpress provides tailored vehicle sourcing and shipping services for cars, trucks, buses and special equipment. Whether you are buying in Europe or shipping a vehicle you already own,',
        accent: 'we connect every stage with personal service and careful coordination.',
      }}
      capabilityLabel='Vehicle sourcing and shipping capabilities'
      capabilities={[
        'European vehicle sourcing and purchase support',
        'Collection, storage and port coordination',
        'Container and roll-on/roll-off shipping',
        'Export documents and destination handover',
      ]}
      efficiency={{
        title: 'One vehicle or a fleet. One connected service.',
        text: 'From a private purchase to commercial vehicle requirements, we bring sourcing, collection and shipping into one plan — balancing the route, timing and handling needs of your vehicle.',
        image: '/images/vehicle-roro-loading.webp',
      }}
      scope={{
        title: 'Safe in our hands, from first search to final handover.',
        image: '/images/vehicle-inspection.webp',
        items: [
          'Vehicle search across Europe, shaped around your requirements and budget',
          'Seller liaison, purchase assistance and negotiation support',
          'Inspection and vehicle-document support where available',
          'Transport for cars, SUVs, trucks, buses and special equipment',
          'Collection from the agreed European seller or vehicle location',
          'Container and RoRo options on suitable, available routes',
          'Purchase paperwork, export documents and customs-document support',
          'Storage when purchase, collection and departure dates differ',
          'Port handling, shipment updates and destination handover coordination',
          'Onward delivery planning where available within our network',
        ],
      }}
      showStatistics={false}
      journey={{
        heading: 'From purchase to port. From port to you.',
        images: [
          '/images/vehicle-showcase-sourcing.webp',
          '/images/vehicle-showcase-export.webp',
          '/images/vehicle-showcase-loading.webp',
          '/images/vehicle-showcase-arrival.webp',
        ],
        scenes: vehicleJourney,
      }}
      work={{
        title: 'We handle the work that matters the most',
        items: [
          { title: 'Sourcing & seller coordination', text: 'Vehicle search, seller liaison and purchase support brought together around your requirements, budget and shipping destination.' },
          { title: 'Documents & export preparation', text: 'Coordination of purchase records, export documents and customs paperwork to prepare your vehicle for its international journey.' },
          { title: 'Collection & port handling', text: 'Collection, storage and loading arrangements connected to the sailing schedule, with careful handling at every stage.' },
          { title: 'Destination delivery', text: 'Arrival and onward transport coordinated around the agreed route, keeping the journey connected beyond the port.' },
        ],
      }}
      answers={{
        title: 'Vehicle sourcing & shipping FAQs',
        items: [
          { question: 'Can you ship a vehicle I already own?', answer: 'Yes. You can use our shipping service without sourcing or purchase assistance. Share the vehicle details, collection point and destination so we can plan the route.' },
          { question: 'Can you help me find and buy a vehicle in Europe?', answer: 'We support vehicle search, seller coordination and purchase negotiations. Tell us the type of vehicle, budget and destination. Inspection and document support are discussed before purchase and arranged where available.' },
          { question: 'Should I choose container or RoRo shipping?', answer: 'The choice depends on the vehicle, destination and available sailings. RoRo means roll-on/roll-off transport for suitable vehicles. We review the options with you before confirming the shipment.' },
          { question: 'What do you need to prepare a quote?', answer: 'Share the vehicle type, make and model, collection location, destination and preferred timing. Let us know whether you need sourcing, storage or onward delivery as well.' },
          { question: 'Can you store the vehicle before departure?', answer: 'Storage can be coordinated when purchase, collection and departure dates do not align. We confirm availability and arrangements as part of the shipment plan.' },
        ],
      }}
    />
  );
}

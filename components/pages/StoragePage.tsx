'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

const storageJourney = [
  {
    title: 'Storage planning & goods receipt',
    text: 'Tell us what you need to store, how much space it requires and when it will arrive. We confirm suitable arrangements and coordinate the warehouse handover, with any onward shipping requirements considered from the start.',
  },
  {
    title: 'Storage & shipment coordination',
    text: 'Your goods are held in Berlin for the agreed period, whether you need a short stay before departure or longer-term space. When several deliveries need to travel together, we discuss consolidation as part of the onward plan.',
  },
  {
    title: 'Release & onward transport',
    text: 'When you are ready, we coordinate release for collection or the next shipment. Air, sea or road transport can be connected to your storage arrangements, with the route and handover agreed before your goods leave.',
  },
];

export function StoragePage() {
  return (
    <FreightServicePage
      slug='storage'
      hero={{
        title: 'Storage that keeps your next step in sight',
        text: 'Short- and long-term storage in Berlin for personal belongings and retail goods — with careful coordination from warehouse arrival to collection or onward shipping.',
        image: '/images/storage-showcase-warehouse.webp',
      }}
      introduction={{
        text: 'DEExpress provides storage and warehousing for private and retail customers in Berlin. Whether your goods are waiting for a shipping date or need space for longer,',
        accent: 'we connect storage, handling and the next handover with personal service.',
      }}
      capabilityLabel='Storage and warehousing capabilities'
      capabilities={[
        'Short- and long-term storage in Berlin',
        'Personal belongings and retail goods',
        'Consolidation and release coordination',
        'Connected air, sea and road transport',
      ]}
      efficiency={{
        title: 'Space for your goods. Flexibility for your schedule.',
        text: 'Collection dates, deliveries and shipping schedules do not always align. We bring storage and onward transport into one plan, with the duration and arrangements shaped around your requirements.',
        image: '/images/storage-showcase-dispatch.webp',
      }}
      scope={{
        title: 'Safe in our hands, until the next handover.',
        image: '/images/storage-showcase-receiving.webp',
        items: [
          'Berlin-based storage for private and retail customers',
          'Short- and long-term arrangements, subject to availability',
          'Space requirements reviewed by item, box or pallet quantity',
          'Storage for suitable personal belongings and commercial goods',
          'Goods receipt and warehouse handover coordination',
          'Storage timed around incoming deliveries and shipping dates',
          'Consolidation support for goods travelling together',
          'Release arrangements for collection or onward shipment',
          'Connections to suitable air, sea and road freight routes',
          'Clear communication from arrival through departure',
        ],
      }}
      showStatistics={false}
      journey={{
        heading: 'From goods received to ready to go.',
        images: [
          '/images/storage-showcase-receiving.webp',
          '/images/storage-showcase-warehouse.webp',
          '/images/storage-showcase-dispatch.webp',
        ],
        scenes: storageJourney,
      }}
      work={{
        title: 'We handle the work that matters the most',
        items: [
          { title: 'Space & schedule planning', text: 'Storage requirements reviewed around your goods, expected duration and arrival date, with availability confirmed before the handover.' },
          { title: 'Receipt & storage coordination', text: 'Incoming deliveries and warehouse arrangements brought together so your goods enter storage with a clear plan for what follows.' },
          { title: 'Shipment consolidation', text: 'Support for bringing goods together before onward transport, with the timing and handling requirements agreed for your shipment.' },
          { title: 'Release & onward shipping', text: 'Collection or freight handovers coordinated around the confirmed schedule, connecting your stored goods to their next destination.' },
        ],
      }}
      answers={{
        title: 'Storage & warehousing FAQs',
        items: [
          { question: 'Where is the storage service based?', answer: 'Our storage and warehousing service is based in Berlin. Contact us with your requirements so we can confirm availability and the arrangements for bringing your goods into storage.' },
          { question: 'Can both individuals and businesses use the service?', answer: 'Yes. We provide storage for private and retail customers. Share what you need to store, including the item types, quantities and any special handling requirements, so we can confirm suitability.' },
          { question: 'Do you offer short- and long-term storage?', answer: 'Yes. Both can be discussed depending on your goods and the space available. Tell us your expected start date and duration, even if the onward shipping date is not yet confirmed.' },
          { question: 'What information do you need for a quote?', answer: 'Send a description of the goods, the number of items, boxes or pallets, approximate dimensions and weights, and your expected storage dates. Let us know whether you also need collection, consolidation or onward shipping.' },
          { question: 'Can stored goods be shipped internationally afterwards?', answer: 'Yes. Storage can connect to our freight services when your goods are ready to leave. We review the destination, shipment details and timing before confirming the onward route.' },
          { question: 'Can several deliveries be stored for one shipment?', answer: 'We can discuss consolidation support where goods need to travel together. Share the expected deliveries and destination so we can review storage, handling and departure arrangements.' },
        ],
      }}
    />
  );
}

'use client';

import { FreightServicePage } from '@/components/pages/FreightServicePage';

const personalEffectsJourney = [
  {
    title: 'Your items & your shipping needs',
    text: 'A laptop, a home appliance or a few boxes for family — tell us what you are sending and where it needs to go. We review the item details, size and preferred timing to plan a suitable air or sea freight route from Europe.',
  },
  {
    title: 'Packing guidance & collection',
    text: 'Different items need different preparation. We provide packing guidance for your shipment and review any special handling needs before collection, bringing the item list, paperwork and collection arrangements together.',
  },
  {
    title: 'Export preparation & shipping',
    text: 'With your belongings ready, we coordinate export-document support and the handover for international transport. Where storage is needed before departure, we discuss the arrangements as part of your shipment plan.',
  },
  {
    title: 'Arrival & final handover',
    text: 'As your shipment arrives, we coordinate the destination handover and guide you through the next steps. Collection or onward delivery is planned around the agreed service, with availability confirmed for your destination.',
  },
];

export function PersonalEffectsPage() {
  return (
    <FreightServicePage
      slug='personal-effects'
      hero={{
        title: 'Personal effects, delivered with care',
        text: 'Laptops, home appliances, luggage and everyday belongings — shipped from Europe with personal service and careful coordination, whether you are sending one item or several.',
        image: '/images/personal-showcase-items.webp',
      }}
      introduction={{
        text: 'DEExpress provides tailored shipping for the personal items you need or want to send to others. From a laptop or home appliance to clothing, luggage and boxed belongings,',
        accent: 'we bring practical guidance and careful handling to every stage of the journey.',
      }}
      capabilityLabel='Personal effects shipping capabilities'
      capabilities={[
        'Laptops, home appliances and personal belongings',
        'Packing guidance and collection coordination',
        'Air and sea freight options from Europe',
        'Export documents and destination handover',
      ]}
      efficiency={{
        title: 'One item or several. Care at every stage.',
        text: 'Your shipment is planned around the belongings you are sending, the time you have and the destination ahead. We connect collection, storage where needed and international transport in one manageable plan.',
        image: '/images/personal-showcase-shipping.webp',
      }}
      scope={{
        title: 'Safe in our hands, whatever you are sending.',
        image: '/images/personal-showcase-packing.webp',
        items: [
          'Laptops, home appliances, clothing, luggage and personal belongings',
          'Flexible shipment sizes, from a single item to several boxes',
          'Route planning around your destination, volume and preferred timing',
          'Air or sea freight options for suitable shipments',
          'Practical packing guidance before your belongings are collected',
          'Collection coordination from the agreed European location',
          'Item-list and export-document guidance for your shipment',
          'Storage support when collection and departure dates differ',
          'Clear communication through collection, shipping and arrival',
          'Destination collection or onward delivery planning where available',
        ],
      }}
      showStatistics={false}
      journey={{
        heading: 'From your hands to theirs, carefully coordinated.',
        images: [
          '/images/personal-showcase-items.webp',
          '/images/personal-showcase-packing.webp',
          '/images/personal-showcase-shipping.webp',
          '/images/personal-showcase-arrival.webp',
        ],
        scenes: personalEffectsJourney,
      }}
      work={{
        title: 'We handle the work that matters the most',
        items: [
          { title: 'Personal shipment planning', text: 'Air and sea freight options reviewed around your belongings, destination and timing, with the service agreed before collection.' },
          { title: 'Preparation & paperwork', text: 'Practical packing advice, item-list guidance and export-document support to help prepare your belongings for the journey.' },
          { title: 'Collection & storage', text: 'Collection and departure arrangements brought together, with storage support when your shipment is ready ahead of its departure date.' },
          { title: 'Arrival & handover', text: 'Destination arrangements explained clearly, with collection or onward delivery coordinated around the confirmed service.' },
        ],
      }}
      answers={{
        title: 'Personal effects shipping FAQs',
        items: [
          { question: 'Can I ship a laptop or home appliance?', answer: 'Yes. Personal effects shipping includes laptops and home appliances, as well as clothing, luggage and other personal belongings. Share the item type, model, condition and destination so we can confirm suitability and preparation requirements for your shipment. Let us know about any batteries or special handling needs before booking.' },
          { question: 'Can I send just one item?', answer: 'Yes. You do not need to be relocating or sending a full household shipment. We can help with a single personal item or several boxes, with the route planned around what you are sending.' },
          { question: 'What do you need to prepare a quote?', answer: 'Tell us what you are sending, the collection address, destination and preferred timing. An item list, approximate weights and dimensions, and details of any access restrictions help us plan your shipment.' },
          { question: 'Should I choose air or sea freight?', answer: 'The choice depends on the size of your shipment, your timing and the destination. We review suitable options with you and confirm the route as part of your quote.' },
          { question: 'How should I prepare my belongings?', answer: 'Prepare an item list and let us know about fragile, unusually sized or special-care items before packing. We provide packing guidance for the agreed shipment and explain what information is needed before collection.' },
          { question: 'Can my belongings be stored before shipping?', answer: 'Storage support can be discussed when your collection and shipping dates do not align. Availability and arrangements are confirmed as part of your shipment plan.' },
          { question: 'Will my belongings be delivered to my home?', answer: 'The final handover depends on the destination and agreed service. Tell us if you need home delivery when requesting a quote so we can confirm availability and any access requirements.' },
        ],
      }}
    />
  );
}

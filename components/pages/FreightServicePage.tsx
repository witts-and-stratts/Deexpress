'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/motion/Motion';
import Parallax from '@/components/Parallax';
import {
  ServiceContact,
  ServiceQuoteClosing,
} from '@/components/ServiceContact';
import {
  ServiceJourneyShowcase,
  type JourneyShowcaseImage,
} from '@/components/ServiceJourneyShowcase';
import { ServiceScopeList } from '@/components/ServiceScopeList';
import { ServiceBenefits } from '@/components/ServiceBenefits';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { EditorialProcess } from '@/components/pages/EditorialPage';
import { useLang } from '@/lib/i18n';
import {
  SERVICE_EXTRA_FAQS,
  ORIGINAL_ENGLISH_SERVICE_SCOPES,
  SERVICE_OPERATIONAL_COPY,
  SERVICE_PROOF_COPY,
  SERVICE_STORIES,
} from '@/lib/service-content';
import type { ServiceSlug } from '@/lib/site';

const originalEnglishJourneys: Partial<Record<ServiceSlug, { title: string; text: string }[]>> = {
  'air-freight': [
    { title: 'Cargo purchase & negotiations', text: 'For specific requests, we start by liaising with your suppliers, making transportation arrangements and purchasing your products on your behalf, with optimal payment facilitation.' },
    { title: 'Booking & export preparation', text: 'Once the route is agreed, the shipment is prepared for collection and airport handling. DEexpress supports the export-document process and coordinates the handovers required before departure.' },
    { title: 'Arrival, customs clearing & handling', text: 'We handle the customs process in the destination airport, with filing of complete paperwork and other regulatory obligations.' },
    { title: 'Onward coordination', text: 'At destination, the next handover is planned around the confirmed route. Where available, the service continues from airport handling to final delivery coordination.' },
  ],
  'commercial-cargo': [
    { title: 'Start with the business requirement', text: 'We begin with the goods, packing, origin, destination and delivery priority — whether the shipment is a one-off project or part of a regular supply flow.' },
    { title: 'Build the right route around the cargo', text: 'Air, sea, rail and road options are considered together, balancing timing, cost and the practical handling needs of your shipment.' },
    { title: 'Coordinate the movement from collection onward', text: 'Collection, export documents and transport handovers are planned as one connected flow, with clear communication as the cargo moves.' },
    { title: 'Keep the next shipment ready to move', text: 'For recurring cargo, the agreed process creates a dependable basis for the next request. For one-off shipments, delivery is coordinated around the confirmed route.' },
  ],
  'personal-effects': [
    { title: 'Your items & your shipping needs', text: 'A laptop, a home appliance or a few boxes for family — tell us what you are sending and where it needs to go. We review the item details, size and preferred timing to plan a suitable air or sea freight route from Europe.' },
    { title: 'Packing guidance & collection', text: 'Different items need different preparation. We provide packing guidance for your shipment and review any special handling needs before collection, bringing the item list, paperwork and collection arrangements together.' },
    { title: 'Export preparation & shipping', text: 'With your belongings ready, we coordinate export-document support and the handover for international transport. Where storage is needed before departure, we discuss the arrangements as part of your shipment plan.' },
    { title: 'Arrival & final handover', text: 'As your shipment arrives, we coordinate the destination handover and guide you through the next steps. Collection or onward delivery is planned around the agreed service, with availability confirmed for your destination.' },
  ],
  'vehicle-shipping': [
    { title: 'Vehicle sourcing & purchase support', text: 'Looking for a vehicle in Europe? We support the search, liaise with sellers and assist with purchase negotiations. Inspection and document checks are arranged where available, with shipping requirements considered from the start.' },
    { title: 'Collection & export preparation', text: 'Once your vehicle is ready, we coordinate collection, export documents and the port handover. Already own the vehicle? Your journey can begin here, with storage available when collection and departure dates do not align.' },
    { title: 'Vehicle loading & sea transport', text: 'From a single car to commercial vehicles, we plan container or roll-on/roll-off transport around the vehicle and destination. Booking, handling and loading arrangements are connected for a carefully managed departure.' },
    { title: 'Arrival & onward delivery', text: 'At destination, we coordinate the arrival handover and support the customs-document process. Where available, onward transport connects the port to your final delivery point, with clear communication throughout.' },
  ],
  storage: [
    { title: 'Storage planning & goods receipt', text: 'Tell us what you need to store, how much space it requires and when it will arrive. We confirm suitable arrangements and coordinate the warehouse handover, with any onward shipping requirements considered from the start.' },
    { title: 'Storage & shipment coordination', text: 'Your goods are held in Berlin for the agreed period, whether you need a short stay before departure or longer-term space. When several deliveries need to travel together, we discuss consolidation as part of the onward plan.' },
    { title: 'Release & onward transport', text: 'When you are ready, we coordinate release for collection or the next shipment. Air, sea or road transport can be connected to your storage arrangements, with the route and handover agreed before your goods leave.' },
  ],
};

const originalEnglishJourneyHeadings: Record<ServiceSlug, string> = {
  'air-freight': 'Quick professional process',
  'sea-freight': 'A sea route, kept connected',
  'vehicle-shipping': 'From purchase to port. From port to you.',
  'commercial-cargo': 'Every commercial movement, kept connected',
  'personal-effects': 'From your hands to theirs, carefully coordinated.',
  'vehicle-sourcing': 'Quick professional process',
  storage: 'From goods received to ready to go.',
};

type ResponsiveBackgroundImage =
  | string
  | { src: string; portrait?: string };

type ServicePageProps = {
  slug: ServiceSlug;
  heroImage: ResponsiveBackgroundImage;
  /** Icons displayed alongside capabilities, in matching order. */
  capabilityIcons?: string[];
  efficiencyImage: ResponsiveBackgroundImage;
  scopeImage: string;
  journey: {
    images: JourneyShowcaseImage[];
    portraitImages?: string[];
  };
};

const defaultCapabilityIcons = [
  '/images/icons/air-priority.svg',
  '/images/icons/air-airport.svg',
  '/images/icons/air-documentation.svg',
  '/images/icons/air-care.svg',
];

export function FreightServicePage({
  slug,
  heroImage,
  capabilityIcons = defaultCapabilityIcons,
  efficiencyImage,
  scopeImage,
  journey,
}: ServicePageProps) {
  const { lang, t } = useLang();
  const proof = SERVICE_PROOF_COPY[lang];
  const story = SERVICE_STORIES[lang][slug];
  const operational = SERVICE_OPERATIONAL_COPY[lang][slug];
  const originalEnglishScope = lang === 'en' ? ORIGINAL_ENGLISH_SERVICE_SCOPES[slug] : undefined;
  const originalEnglishJourney = lang === 'en'
    ? originalEnglishJourneys[slug] ?? SERVICE_STORIES.en[slug].scenes
    : undefined;
  const details = t.services.details[slug];
  const faqs = [
    ...story.faqs,
    ...SERVICE_EXTRA_FAQS[lang][slug],
  ];

  const heroImageSrc = typeof heroImage === 'string' ? heroImage : heroImage.src;
  const heroPortraitImage =
    typeof heroImage === 'object' ? heroImage.portrait : undefined;
  const efficiencyImageSrc =
    typeof efficiencyImage === 'string' ? efficiencyImage : efficiencyImage.src;
  const efficiencyPortraitImage =
    typeof efficiencyImage === 'object' ? efficiencyImage.portrait : undefined;

  return (
    <main className='air-freight-page'>
      <section className='air-freight-page__hero'>
        <ResponsiveImage
          className='air-freight-page__hero-image'
          src={heroImageSrc}
          portraitSrc={heroPortraitImage}
          aria-hidden='true'
        />
        <div className='air-freight-page__hero-overlay' aria-hidden='true' />
        <div className='air-freight-page__hero-copy'>
          <Reveal>
            <h1>{details.title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p>{details.tagline}</p>
          </Reveal>
        </div>
      </section>

      <section className='air-freight-page__intro grid grid-cols-12'>
        <Reveal className='col-span-12 mb-20 lg:col-span-9'>
          <h2>
            {details.summary}
          </h2>
        </Reveal>
      </section>

      <section
        className='air-freight-page__capabilities'
        aria-label={details.title}
      >
        <div className='grid grid-cols-12'>
          {details.features.map((capability, index) => (
            <div
              key={capability}
              className='col-span-12 sm:col-span-6 lg:col-span-3'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={capabilityIcons[index] ?? defaultCapabilityIcons[index]}
                alt=''
                aria-hidden='true'
              />
              <p>{capability}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='air-freight-page__efficiency-hero'>
        <ResponsiveImage
          className='air-freight-page__efficiency-image'
          src={efficiencyImageSrc}
          portraitSrc={efficiencyPortraitImage}
          aria-hidden='true'
        />
        <Parallax speed={0.2}>
          <h2>{details.title}</h2>
          <p>{details.summary}</p>
        </Parallax>
      </section>

      <section className='air-freight-page__scope grid grid-cols-12'>
        <Reveal className='air-freight-page__scope-intro col-span-12 lg:col-span-4'>
          <h2>{originalEnglishScope?.title ?? operational.fitTitle}</h2>
          <div className='air-freight-page__scope-image'>
            <Image src={scopeImage} alt='' fill aria-hidden='true' />
          </div>
        </Reveal>
        <ServiceScopeList
          items={originalEnglishScope?.items ?? operational.fit}
          className='air-freight-page__scope-list col-span-12 lg:col-start-7 lg:col-span-6'
          ariaLabel={details.title}
        />
      </section>

      <section className='air-freight-page__process'>
        <ServiceJourneyShowcase
          scenes={originalEnglishJourney ?? operational.scenes}
          images={journey.images}
          portraitImages={journey.portraitImages}
          label={details.title}
          heading={lang === 'en' ? originalEnglishJourneyHeadings[slug] : details.title}
          showNumbers={false}
        />
      </section>

      <EditorialProcess
        title={proof.title}
        items={proof.benefits}
      />

      <ServiceBenefits service={slug} />

      <section className='air-freight-page__answers grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-5'>
          <h2>{operational.faqTitle}</h2>
        </Reveal>
        <div className='col-span-12 lg:col-start-7 lg:col-span-6'>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <ChevronDown size={20} aria-hidden='true' />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ServiceContact
        title={proof.contactTitle}
        text={proof.contactText}
        callLabel={proof.callLabel}
        quoteHref={`/quote?service=${slug}`}
        quoteLabel={t.services.detailCta}
        variant='air-freight'
      />

      <ServiceQuoteClosing
        quoteHref={`/quote?service=${slug}`}
        quoteLabel={t.common.getQuote}
      />
    </main>
  );
}

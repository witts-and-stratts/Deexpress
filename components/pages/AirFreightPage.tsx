'use client';

import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/motion/Motion';
import { ServiceContact } from '@/components/ServiceContact';
import { ServiceJourneyShowcase } from '@/components/ServiceJourneyShowcase';
import { ServiceScopeList } from '@/components/ServiceScopeList';
import { Counter } from '@/components/Counter';
import { useLang } from '@/lib/i18n';
import Image from 'next/image';

import {
  SERVICE_EXTRA_FAQS,
  SERVICE_PROOF_COPY,
  SERVICE_STORIES,
} from '@/lib/service-stories';
import Parallax from '../Parallax';

const process = [
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

const capabilities = [
  {
    icon: '/images/icons/air-priority.svg',
    text: 'Time-critical and priority shipments',
  },
  {
    icon: '/images/icons/air-airport.svg',
    text: 'Airport-to-airport coordination',
  },
  {
    icon: '/images/icons/air-documentation.svg',
    text: 'Export documentation support',
  },
  {
    icon: '/images/icons/air-care.svg',
    text: 'Careful handling of high-value cargo',
  },
];

const serviceScope = [
  'European airport departures to destinations in the DEexpress network',
  'Priority consignments, smaller freight and high-value cargo',
  'Coordination from collection and export documents through destination handover',
  'European imports and exports with personal contacts from A to Z',
  'Multimodal solutions for efficiency and cost benefits',
  'Complete air freight service, from pickup to delivery',
  'Express and on-board courier services for the highest urgency',
  'Customs processing including import, export and fiscal customs',
  'Tracking & tracing for maximum transparency of your shipments',
  'Warehousing and distribution at important DEexpress locations',
  'Weekly transportation of cars & luxury goods',
];

const statistics = [
  {
    value: 5,
    suffix: ' days',
    label: (
      <>
        Average freight delivery
        <br />
        timeline
      </>
    ),
  },
  { value: 95, suffix: '%+', label: 'Autonomous resolution' },
  { value: 75, suffix: '%', label: 'Cost reduction' },
  { value: 10, suffix: 'X', label: 'Capacity increase' },
];

export function AirFreightPage() {
  const { lang, t } = useLang();
  const proof = SERVICE_PROOF_COPY[lang];
  const faqs = [
    ...SERVICE_STORIES[lang]['air-freight'].faqs,
    ...SERVICE_EXTRA_FAQS[lang]['air-freight'],
  ];

  return (
    <main className='air-freight-page'>
      <section className='air-freight-page__hero'>
        <div className='air-freight-page__hero-image' aria-hidden='true' />
        <div className='air-freight-page__hero-overlay' aria-hidden='true' />
        <div className='air-freight-page__hero-copy'>
          <Reveal>
            <h1>
              Worldwide air freight,
              <br />
              delivered with confidence
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p>
              Time-critical air freight services from Europe to Africa and
              beyond – we deliver your cargo safely to its destination with
              speed, efficiency and care.
            </p>
          </Reveal>
        </div>
      </section>

      <section className='air-freight-page__intro grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-9 mb-20'>
          <h2>
            For time-critical and high-value shipments, we coordinate air
            freight from European airports to destinations across our network,{' '}
            <span>
              with careful handling and clear communication from take-off to
              arrival.
            </span>
          </h2>
        </Reveal>
      </section>

      <section
        className='air-freight-page__capabilities'
        aria-label='Air freight capabilities'
      >
        <div className='grid grid-cols-12'>
          {capabilities.map((item) => (
            <div
              key={item.text}
              className='col-span-12 sm:col-span-6 lg:col-span-3'
            >
              <img src={item.icon} alt='' aria-hidden='true' />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='air-freight-page__efficiency-hero'>
        <div aria-hidden='true' />
        <>
          <Parallax speed={0.2}>
            <h2>Speed meets cost efficiency</h2>
            <p className=''>
              Tailor-made logistics services from Europe to Africa by road, air,
              water or rail – we deliver your cargo safely to its destination
              with efficiency and care.
            </p>
          </Parallax>
        </>
      </section>

      <section className='air-freight-page__scope grid grid-cols-12'>
        <Reveal className='air-freight-page__scope-intro col-span-12 lg:col-span-4'>
          <h2>Safe in our hands, wherever your cargo is headed.</h2>
          <div className='air-freight-page__scope-image'>
            <Image
              src='/images/air-freight-operations.png'
              alt=''
              fill
              aria-hidden='true'
            />
          </div>
        </Reveal>
        <ServiceScopeList
          items={serviceScope}
          className='air-freight-page__scope-list col-span-12 lg:col-start-7 lg:col-span-6'
          ariaLabel='Air freight service scope'
        />
      </section>

      <section className='air-freight-page__statistics'>
        <div className='grid grid-cols-12'>
          {statistics.map((stat) => (
            <article
              key={stat.suffix}
              className='col-span-12 sm:col-span-6 lg:col-span-3'
            >
              <strong>
                <Counter value={stat.value} suffix={stat.suffix} />
              </strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='air-freight-page__process'>
        <ServiceJourneyShowcase
          scenes={process}
          images={[
            '/images/air-showcase-purchase.png',
            '/images/air-showcase-booking.png',
            '/images/air-showcase-arrival.png',
            '/images/air-showcase-onward.png',
          ]}
          label='Quick professional process'
          heading='Quick professional process'
          showNumbers={false}
        />
      </section>

      <section className='air-freight-page__work'>
        <div className='grid grid-cols-12'>
          <Reveal className='col-span-12'>
            <h2>We handle the work that matters the most</h2>
          </Reveal>
          <div className='air-freight-page__work-cards col-span-12 grid grid-cols-12'>
            {[
              ...proof.benefits,
              {
                title: 'Service',
                text: 'A customer service team ready to assist quickly in English, German or French.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className='col-span-12 sm:col-span-6 lg:col-span-3'
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className='air-freight-page__answers grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-5'>
          <h2>Air freight FAQs</h2>
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
        title='Discuss your shipment with the team handling the request'
        text={proof.contactText}
        callLabel={proof.callLabel}
        quoteHref='/quote?service=air-freight'
        quoteLabel={t.services.detailCta}
        variant='air-freight'
      />

      <section className='air-freight-page__closing grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-7'>
          <h2>Ready to move?</h2>
          <p>
            Tell us what you are shipping and where it needs to go — we will
            send you a free, no-obligation estimate.
          </p>
          <Link href='/quote?service=air-freight'>
            {t.common.getQuote}
            <ArrowUpRight size={18} aria-hidden='true' />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

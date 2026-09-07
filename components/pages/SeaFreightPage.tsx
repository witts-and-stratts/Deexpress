'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Counter } from '@/components/Counter';
import { Reveal } from '@/components/motion/Motion';
import Parallax from '@/components/Parallax';
import { ServiceContact } from '@/components/ServiceContact';
import { ServiceJourneyShowcase } from '@/components/ServiceJourneyShowcase';
import { ServiceScopeList } from '@/components/ServiceScopeList';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { useLang } from '@/lib/i18n';
import {
  SERVICE_EXTRA_FAQS,
  SERVICE_PROOF_COPY,
  SERVICE_STORIES,
} from '@/lib/service-content';

const capabilities = [
  'Consolidated and single cargo shipments',
  'European cargo transportation and Port coordination',
  'Export documentation and customs processing',
  'Onward and last-mile delivery planning',
];
const scope = [
  'FCL and LCL transport to and from overseas ports worldwide',
  'Partnership-based cooperation with leading shipping companies',
  'Shipment and container weighing in line with VGM SOLAS requirements',
  'Supply-chain support including storage, distribution and value-added services',
  'Customs processing including import, export',
  'Containers to Africa and the Middle East',
  'Container stowing, unloading and securing',
  'Dangerous goods and projects for demanding requirements',
  'Door-to-door coordination from collection point to final recipient',
];
const icons = [
  '/images/icons/air-priority.svg',
  '/images/icons/air-airport.svg',
  '/images/icons/air-documentation.svg',
  '/images/icons/air-care.svg',
];
const statistics = [
  { value: 5, suffix: ' days', label: 'Average freight delivery timeline' },
  { value: 95, suffix: '%+', label: 'Autonomous resolution' },
  { value: 75, suffix: '%', label: 'Cost reduction' },
  { value: 10, suffix: 'X', label: 'Capacity increase' },
];
const freightBenefits = [
  {
    title: 'Cost efficiency',
    text: 'Sea freight offers the cheapest transport solution for large quantities of goods over long distances',
    icons: ['/images/icons/benefit-cost-efficiency.svg'],
  },
  {
    title: 'Sustainability',
    text: 'Lower CO2 emissions compared to other modes of transport make sea freight more environmentally friendly',
    icons: [
      '/images/icons/benefit-sustainability-a.svg',
      '/images/icons/benefit-sustainability-b.svg',
    ],
  },
  {
    title: 'Optimized all around',
    text: 'Our sea freight solutions combine efficiency, sustainability and global reach',
    icons: ['/images/icons/benefit-optimized.svg'],
  },
  {
    title: 'Flexibility',
    text: 'Perfect for transporting all types of goods, from general cargo to project loads',
    icons: [
      '/images/icons/benefit-flexibility-a.svg',
      '/images/icons/benefit-flexibility-b.svg',
    ],
  },
  {
    title: 'Reliability',
    text: 'Reliable routes and regular departures guarantee predictable logistics',
    icons: ['/images/icons/benefit-reliability.svg'],
  },
  {
    title: 'Global reach',
    text: 'Worldwide port connections and door-to-door coordination keep your cargo moving across borders',
    icons: ['/images/icons/benefit-optimized.svg'],
  },
];

type ResponsiveBackgroundImage = { src: string; portrait?: string };

const seaFreightHeroImage: ResponsiveBackgroundImage = {
  src: '/images/sea-shipping.webp',
  portrait: '/images/sea-shipping-portrait.webp',
};
const seaFreightEfficiencyImage: ResponsiveBackgroundImage = {
  src: '/images/shipping-containers.webp',
  portrait: '/images/shipping-containers-portrait.webp',
};

/** Sea freight is intentionally composed here—not through a shared page template. */
export function SeaFreightPage() {
  const { lang, t } = useLang();
  const proof = SERVICE_PROOF_COPY[lang];
  const story = SERVICE_STORIES[lang]['sea-freight'];
  const faqs = [...story.faqs, ...SERVICE_EXTRA_FAQS[lang]['sea-freight']];

  return (
    <main className='air-freight-page sea-freight-page'>
      <section className='air-freight-page__hero'>
        <ResponsiveImage
          className='air-freight-page__hero-image'
          src={seaFreightHeroImage.src}
          portraitSrc={seaFreightHeroImage.portrait}
          aria-hidden='true'
        />
        <div className='air-freight-page__hero-overlay' aria-hidden='true' />
        <div className='air-freight-page__hero-copy'>
          <Reveal>
            <h1>Sea Freight and cost-effect container transport</h1>
          </Reveal>
          <Reveal delay={140}>
            <p>
              Container and consolidated sea freight coordinated from Europe to
              destinations across our network.
            </p>
          </Reveal>
        </div>
      </section>

      <section className='air-freight-page__intro grid grid-cols-12'>
        <Reveal className='col-span-12 mb-40 lg:col-span-9'>
          <h2 className='text-h3'>
            DeExpress provides reliable, tailored sea freight and multimodal
            transport solutions, connecting key economic hubs across Africa and
            the Middle East through our operations in Germany.{' '}
            <span>
              Every shipment is handled with personalised, first-class service.
            </span>
          </h2>
        </Reveal>
      </section>

      <section
        className='air-freight-page__capabilities'
        aria-label='Sea freight capabilities'
      >
        <div className='grid grid-cols-12'>
          {capabilities.map((capability, index) => (
            <div
              key={capability}
              className='col-span-12 sm:col-span-6 lg:col-span-3'
            >
              <img src={icons[index]} alt='' aria-hidden='true' />
              <p>{capability}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='air-freight-page__efficiency-hero'>
        <ResponsiveImage
          className='air-freight-page__efficiency-image'
          src={seaFreightEfficiencyImage.src}
          portraitSrc={seaFreightEfficiencyImage.portrait}
          aria-hidden='true'
        />
        <Parallax speed={0.2}>
          <h2>Smarter shipping at every scale</h2>
          <p>
            From a few pallets to a full container, we coordinate the route,
            logistics and people involved—delivering greater efficiency, better
            value and a smoother shipping experience.
          </p>
        </Parallax>
      </section>

      <section className='air-freight-page__scope grid grid-cols-12'>
        <Reveal className='air-freight-page__scope-intro col-span-12 lg:col-span-4'>
          <h2>Cost efficiency and seamless port-to-point processing</h2>
          <div className='air-freight-page__scope-image'>
            <Image
              src='/images/shipping-containers2.webp'
              alt=''
              fill
              aria-hidden='true'
            />
          </div>
        </Reveal>
        <ServiceScopeList
          items={scope}
          className='air-freight-page__scope-list col-span-12 lg:col-start-7 lg:col-span-6'
          ariaLabel='Sea freight service scope'
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
          scenes={story.scenes}
          images={[
            {src: '/images/blue-stacked-container.webp', portrait: '/images/extra-containers.webp'},
            {src: '/images/port.webp', portrait: '/images/port-portrait.webp'},
            {src: '/images/deexpress-warehouse.webp', portrait: '/images/deexpress-warehouse-portrait.webp'},
            {src: '/images/port-call.webp', portrait: '/images/port-call-portrait.webp'},
          ]}
          label='Sea freight process'
          heading='A sea route, kept connected'
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

      <section className='sea-freight-page__benefits' aria-labelledby='sea-freight-benefits-title'>
        <Reveal>
          <h2 id='sea-freight-benefits-title'>Benefits of ship freight with DEexpress</h2>
        </Reveal>
        <div className='sea-freight-page__benefit-grid'>
          {freightBenefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 55}>
              <article className='sea-freight-page__benefit-card'>
                <div className={`sea-freight-page__benefit-heading sea-freight-page__benefit-heading--${index + 1}`}>
                  <span className='sea-freight-page__benefit-icon' aria-hidden='true'>
                    {benefit.icons.map((icon) => <img key={icon} src={icon} alt='' />)}
                  </span>
                  <h3>{benefit.title}</h3>
                </div>
                <p>{benefit.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className='air-freight-page__answers grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-5'>
          <h2>Sea freight FAQs</h2>
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
        quoteHref='/quote?service=sea-freight'
        quoteLabel={t.services.detailCta}
        variant='air-freight'
      />
      <section className='air-freight-page__closing grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-7'>
          <h2>Ready to move?</h2>
          <p>
            Tell us what you are moving and where it needs to go — we will send
            you a free, no-obligation estimate.
          </p>
          <Link href='/quote?service=sea-freight'>
            {t.common.getQuote}
            <ArrowUpRight size={18} aria-hidden='true' />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

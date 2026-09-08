'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Counter } from '@/components/Counter';
import { Reveal } from '@/components/motion/Motion';
import Parallax from '@/components/Parallax';
import {
  ServiceContact,
  ServiceQuoteClosing,
} from '@/components/ServiceContact';
import { ServiceJourneyShowcase } from '@/components/ServiceJourneyShowcase';
import { ServiceScopeList } from '@/components/ServiceScopeList';
import { ServiceBenefits } from '@/components/ServiceBenefits';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { EditorialProcess } from '@/components/pages/EditorialPage';
import { useLang } from '@/lib/i18n';
import {
  SERVICE_EXTRA_FAQS,
  SERVICE_PROOF_COPY,
  SERVICE_STORIES,
} from '@/lib/service-content';
import { SERVICE_SCOPES } from '@/lib/service-scopes';
import { SERVICE_PAGES } from '@/lib/service-pages';

const icons = [
  '/images/icons/consolidated-cargo.svg',
  '/images/icons/port.svg',
  '/images/icons/air-documentation.svg',
  '/images/icons/delivery-van.svg',
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
  const scope = SERVICE_SCOPES[lang]['sea-freight'];
  const copy = SERVICE_PAGES[lang]['sea-freight'];
  const shared = SERVICE_PAGES[lang].shared;
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
            <h1>{copy.hero.title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p>{copy.hero.text}</p>
          </Reveal>
        </div>
      </section>

      <section className='air-freight-page__intro grid grid-cols-12'>
        <Reveal className='col-span-12 mb-40 lg:col-span-9'>
          <h2 className='text-h3'>
            {copy.introduction.text}{' '}
            <span>
              {copy.introduction.accent}
            </span>
          </h2>
        </Reveal>
      </section>

      <section
        className='air-freight-page__capabilities'
        aria-label={copy.capabilityLabel}
      >
        <div className='grid grid-cols-12'>
          {copy.capabilities.map((capability, index) => (
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
          <h2>{copy.efficiency.title}</h2>
          <p>{copy.efficiency.text}</p>
        </Parallax>
      </section>

      <section className='air-freight-page__scope grid grid-cols-12'>
        <Reveal className='air-freight-page__scope-intro col-span-12 lg:col-span-4'>
          <h2>{scope.title}</h2>
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
          items={scope.items}
          className='air-freight-page__scope-list col-span-12 lg:col-start-7 lg:col-span-6'
          ariaLabel='Sea freight service scope'
        />
      </section>

      <section className='air-freight-page__statistics'>
        <div className='grid grid-cols-12'>
          {copy.highlights.map((highlight) => (
            <article
              key={`${highlight.value}${highlight.suffix}`}
              className='col-span-12 sm:col-span-6 lg:col-span-3'
            >
              <strong>
                <Counter value={highlight.value} suffix={highlight.suffix} />
              </strong>
              <p>{highlight.text}</p>
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
          heading={scope.journeyHeading}
          showNumbers={false}
        />
      </section>

      <EditorialProcess
        title={shared.workTitle}
        items={proof.benefits}
      />

      <ServiceBenefits service='sea-freight' />

      <section className='air-freight-page__answers grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-5'>
          <h2>{copy.faqTitle}</h2>
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
        title={shared.contactTitle}
        text={proof.contactText}
        callLabel={proof.callLabel}
        quoteHref='/quote?service=sea-freight'
        quoteLabel={t.services.detailCta}
        variant='air-freight'
      />
      <ServiceQuoteClosing
        quoteHref='/quote?service=sea-freight'
        quoteLabel={t.common.getQuote}
      />
    </main>
  );
}

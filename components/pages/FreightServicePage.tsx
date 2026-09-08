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
  SERVICE_OPERATIONAL_COPY,
  SERVICE_PROOF_COPY,
  SERVICE_STORIES,
} from '@/lib/service-content';
import type { ServiceSlug } from '@/lib/site';

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
          <h2>{operational.fitTitle}</h2>
          <div className='air-freight-page__scope-image'>
            <Image src={scopeImage} alt='' fill aria-hidden='true' />
          </div>
        </Reveal>
        <ServiceScopeList
          items={operational.fit}
          className='air-freight-page__scope-list col-span-12 lg:col-start-7 lg:col-span-6'
          ariaLabel={details.title}
        />
      </section>

      <section className='air-freight-page__process'>
        <ServiceJourneyShowcase
          scenes={operational.scenes}
          images={journey.images}
          portraitImages={journey.portraitImages}
          label={details.title}
          heading={details.title}
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

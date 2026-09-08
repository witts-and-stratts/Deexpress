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
  SERVICE_PROOF_COPY,
  SERVICE_STORIES,
} from '@/lib/service-content';
import { SERVICE_SCOPES } from '@/lib/service-scopes';
import { SERVICE_PAGES } from '@/lib/service-pages';
import type { ServiceSlug } from '@/lib/site';

type ResponsiveBackgroundImage =
  | string
  | { src: string; portrait?: string };

type ServicePageProps = {
  slug: ServiceSlug;
  hero: {
    title: string;
    text: string;
    image: ResponsiveBackgroundImage;
    portraitImage?: string;
  };
  introduction: { text: string; accent: string };
  capabilityLabel: string;
  capabilities: string[];
  /** Icons displayed alongside capabilities, in matching order. */
  capabilityIcons?: string[];
  efficiency: {
    title: string;
    text: string;
    image: ResponsiveBackgroundImage;
  };
  scopeImage: string;
  journey: {
    images: JourneyShowcaseImage[];
    portraitImages?: string[];
    heading?: string;
    scenes?: { title: string; text: string }[];
  };
  work?: { title: string; items: { title: string; text: string }[] };
  answers?: { title: string; items: { question: string; answer: string }[] };
  highlights?: { value: number; suffix: string; text: string }[];
  showStatistics?: boolean;
};

const defaultCapabilityIcons = [
  '/images/icons/air-priority.svg',
  '/images/icons/air-airport.svg',
  '/images/icons/air-documentation.svg',
  '/images/icons/air-care.svg',
];

export function FreightServicePage({
  slug,
  hero,
  introduction,
  capabilityLabel,
  capabilities,
  capabilityIcons = defaultCapabilityIcons,
  efficiency,
  scopeImage,
  journey,
  work,
  answers,
  highlights,
  showStatistics: _showStatistics,
}: ServicePageProps) {
  const { lang, t } = useLang();
  const proof = SERVICE_PROOF_COPY[lang];
  const story = SERVICE_STORIES[lang][slug];
  const scope = SERVICE_SCOPES[lang][slug];
  const faqs = answers?.items ?? [
    ...story.faqs,
    ...SERVICE_EXTRA_FAQS[lang][slug],
  ];

  const heroImage = typeof hero.image === 'string' ? hero.image : hero.image.src;
  const heroPortraitImage =
    typeof hero.image === 'object'
      ? hero.image.portrait ?? hero.portraitImage
      : hero.portraitImage;
  const efficiencyImage =
    typeof efficiency.image === 'string' ? efficiency.image : efficiency.image.src;
  const efficiencyPortraitImage =
    typeof efficiency.image === 'object' ? efficiency.image.portrait : undefined;

  return (
    <main className='air-freight-page'>
      <section className='air-freight-page__hero'>
        <ResponsiveImage
          className='air-freight-page__hero-image'
          src={heroImage}
          portraitSrc={heroPortraitImage}
          aria-hidden='true'
        />
        <div className='air-freight-page__hero-overlay' aria-hidden='true' />
        <div className='air-freight-page__hero-copy'>
          <Reveal>
            <h1>{hero.title}</h1>
          </Reveal>
          <Reveal delay={140}>
            <p>{hero.text}</p>
          </Reveal>
        </div>
      </section>

      <section className='air-freight-page__intro grid grid-cols-12'>
        <Reveal className='col-span-12 mb-20 lg:col-span-9'>
          <h2>
            {introduction.text} <span>{introduction.accent}</span>
          </h2>
        </Reveal>
      </section>

      <section
        className='air-freight-page__capabilities'
        aria-label={capabilityLabel}
      >
        <div className='grid grid-cols-12'>
          {capabilities.map((capability, index) => (
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
          src={efficiencyImage}
          portraitSrc={efficiencyPortraitImage}
          aria-hidden='true'
        />
        <Parallax speed={0.2}>
          <h2>{efficiency.title}</h2>
          <p>{efficiency.text}</p>
        </Parallax>
      </section>

      <section className='air-freight-page__scope grid grid-cols-12'>
        <Reveal className='air-freight-page__scope-intro col-span-12 lg:col-span-4'>
          <h2>{scope.title}</h2>
          <div className='air-freight-page__scope-image'>
            <Image src={scopeImage} alt='' fill aria-hidden='true' />
          </div>
        </Reveal>
        <ServiceScopeList
          items={scope.items}
          className='air-freight-page__scope-list col-span-12 lg:col-start-7 lg:col-span-6'
          ariaLabel={`${hero.title} service scope`}
        />
      </section>

      {highlights && (
        <section className='air-freight-page__statistics'>
          <div className='grid grid-cols-12'>
            {highlights.map((highlight) => (
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
      )}

      <section className='air-freight-page__process'>
        <ServiceJourneyShowcase
          scenes={journey.scenes ?? story.scenes}
          images={journey.images}
          portraitImages={journey.portraitImages}
          label={`${hero.title} process`}
          heading={scope.journeyHeading}
          showNumbers={false}
        />
      </section>

      <EditorialProcess
        title={work?.title ?? SERVICE_PAGES[lang].shared.workTitle}
        items={work?.items ?? proof.benefits}
      />

      <ServiceBenefits service={slug} />

      <section className='air-freight-page__answers grid grid-cols-12'>
        <Reveal className='col-span-12 lg:col-span-5'>
          <h2>{answers?.title ?? `${hero.title.split(',')[0]} FAQs`}</h2>
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
        title={SERVICE_PAGES[lang].shared.contactTitle}
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

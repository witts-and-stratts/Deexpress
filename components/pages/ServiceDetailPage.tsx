'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react'
import { Reveal, ParallaxImage } from '@/components/motion/Motion'
import { ServiceContact } from '@/components/ServiceContact'
import { ServiceJourneyShowcase } from '@/components/ServiceJourneyShowcase'
import { useLang } from '@/lib/i18n'
import { SERVICE_ENHANCEMENTS, SERVICE_EXTRA_FAQS, SERVICE_OPERATIONAL_COPY, SERVICE_PROOF_COPY, SERVICE_STORIES } from '@/lib/service-stories'
import { SERVICES, type ServiceSlug } from '@/lib/site'
import { AirFreightPage } from '@/components/pages/AirFreightPage'

const STORY_IMAGES: Record<ServiceSlug, string[]> = {
  'air-freight': ['/images/service-air.jpg', '/images/plane.webp', '/images/home-hero.webp'],
  'sea-freight': ['/images/service-sea.jpg', '/images/ship.webp', '/images/coverage-section.webp'],
  'vehicle-shipping': ['/images/service-vehicle.jpg', '/images/car.webp', '/images/service-cargo.jpg'],
  'commercial-cargo': ['/images/service-cargo.jpg', '/images/train.webp', '/images/truck.webp'],
  'personal-effects': ['/images/service-personal.webp', '/images/service-cargo.webp', '/images/home-hero.webp'],
  'vehicle-sourcing': ['/images/service-sourcing.jpg', '/images/car.webp', '/images/service-vehicle.webp'],
  storage: ['/images/service-cargo.webp', '/images/service-cargo.jpg', '/images/truck.webp'],
}

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const { lang, t } = useLang()
  if (slug === 'air-freight') return <AirFreightPage />
  const detail = t.services.details[slug]
  const story = SERVICE_STORIES[lang][slug]
  const operational = SERVICE_OPERATIONAL_COPY[lang][slug]
  const enhancement = SERVICE_ENHANCEMENTS[lang][slug]
  const proof = SERVICE_PROOF_COPY[lang]
  const meta = SERVICES.find((service) => service.slug === slug)!
  const sceneImages = STORY_IMAGES[slug]

  return (
    <main className="service-story">
      <section className="service-story__hero">
        <ParallaxImage src={meta.image} alt="" strength={20} className="service-story__hero-image" />
        <div aria-hidden className="service-story__hero-overlay" />
        <div className="service-story__hero-copy">
          <Reveal><h1>{detail.title}</h1></Reveal>
          <Reveal delay={140}><p>{detail.tagline}</p></Reveal>
          <Reveal delay={220}>
            <Link href={`/quote?service=${slug}`} className="service-story__hero-cta">
              {t.services.detailCta} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="service-story__opening">
        <Reveal className="service-story__opening-copy">
          <h2>{operational.fitTitle}</h2>
          <p>{detail.summary}</p>
        </Reveal>
        <Reveal delay={130} className="service-story__fit-list">
          {operational.fit.map((item) => <p key={item}><Check size={18} aria-hidden="true" /> {item}</p>)}
        </Reveal>
      </section>

      <section className="service-story__features">
        {detail.features.map((feature) => <span key={feature}>{feature}</span>)}
      </section>

      <section className="service-story__options">
        <Reveal><h2>{enhancement.optionsTitle}</h2></Reveal>
        <div>
          {enhancement.options.map((option, index) => (
            <Reveal key={option.title} delay={index * 110}>
              <article>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ServiceJourneyShowcase scenes={operational.scenes} images={sceneImages} label={`${detail.title} journey`} />

      <section className="service-story__combination">
        <Reveal className="service-story__combination-copy">
          <h2>{enhancement.combinationTitle}</h2>
          <p>{enhancement.combinationText}</p>
        </Reveal>
        <Reveal delay={120} className="service-story__combination-links">
          {story.related.map((relatedSlug) => (
            <Link key={relatedSlug} href={`/services/${relatedSlug}`}>
              {t.services.details[relatedSlug].title} <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="service-story__prepare">
        <div className="service-story__prepare-image" style={{ backgroundImage: `url(${sceneImages[2]})` }} aria-hidden="true" />
        <div className="service-story__prepare-overlay" aria-hidden="true" />
        <Reveal className="service-story__prepare-copy">
          <h2>{operational.prepareTitle}</h2>
          <ul>{story.prepare.map((item) => <li key={item}>{item}</li>)}</ul>
          <Link href={`/quote?service=${slug}`} className="service-story__hero-cta">
            {t.services.detailCta} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <section className="service-story__proof">
        <Reveal><h2>{proof.title}</h2></Reveal>
        <div>
          {proof.benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 100}>
              <article>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="service-story__answers">
        <Reveal><h2>{operational.faqTitle}</h2></Reveal>
        <div>
          {[...story.faqs, ...SERVICE_EXTRA_FAQS[lang][slug]].map((faq) => (
            <Reveal key={faq.question}>
              <details className="service-story__faq">
                <summary>{faq.question} <ChevronDown size={20} aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <ServiceContact
        title={proof.contactTitle}
        text={proof.contactText}
        callLabel={proof.callLabel}
        quoteHref={`/quote?service=${slug}`}
        quoteLabel={t.services.detailCta}
      />

      <section className="service-story__closing">
        <Reveal className="service-story__closing-copy">
          <h2>{t.home.ctaTitle}</h2>
          <p>{t.home.ctaText}</p>
          <Link href={`/quote?service=${slug}`} className="service-story__closing-cta">
            {t.common.getQuote} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal delay={120} className="service-story__related">
          <p>{t.common.ourServices}</p>
          {story.related.map((relatedSlug) => (
            <Link key={relatedSlug} href={`/services/${relatedSlug}`}>
              {t.services.details[relatedSlug].title} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </Reveal>
      </section>
    </main>
  )
}

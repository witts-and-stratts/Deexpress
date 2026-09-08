'use client'

import { Reveal } from '@/components/motion/Motion'
import { useLang } from '@/lib/i18n'
import { SERVICE_ENHANCEMENTS, SERVICE_PROOF_COPY } from '@/lib/service-content'
import type { ServiceSlug } from '@/lib/site'

export function ServiceBenefits({ service }: { service: ServiceSlug }) {
  const { lang } = useLang()
  const configured = SERVICE_ENHANCEMENTS[lang][service]
  const proof = SERVICE_PROOF_COPY[lang]
  const benefits = lang === 'en'
    ? { title: proof.title, items: proof.benefits }
    : { title: configured.optionsTitle, items: configured.options }

  return (
    <section className='service-benefits' aria-labelledby={`${service}-benefits-title`}>
      <Reveal>
        <h2 id={`${service}-benefits-title`}>{benefits.title}</h2>
      </Reveal>
      <div className='service-benefits__grid'>
        {benefits.items.map(({ title, text }, index) => (
          <Reveal key={title} delay={index * 55} className='service-benefits__item'>
            <article className='service-benefits__card'>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

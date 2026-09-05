'use client'

import { Reveal } from '@/components/Reveal'
import { useLang } from '@/lib/i18n'
import type { ServiceSlug } from '@/lib/site'
import { BtnLink, Eyebrow, PageHero, container, section, sectionHead, sectionHeadSub, sectionHeadTitle, sectionSm } from '@/components/ui'
import { ProcessSteps, ServiceCards } from '@/components/pages/HomeSections'

export function ServicesPage() {
  const { t } = useLang()
  const pathways = t.services.pathways as { title: string; text: string; services: ServiceSlug[] }[]
  return (
    <main>
      <PageHero eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.intro} />

      <section className={section}>
        <div className={container}>
          <div className="grid gap-20">
            {pathways.map((pathway) => (
              <section key={pathway.title} className="border-t border-editorial-line/60 pt-7 first:border-t-0 first:pt-0">
                <Reveal>
                  <div className="mb-9 max-w-2xl lg:mb-12">
                    <h2 className={sectionHeadTitle}>{pathway.title}</h2>
                    <p className={sectionHeadSub}>{pathway.text}</p>
                  </div>
                </Reveal>
                <ServiceCards serviceSlugs={pathway.services} />
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.home.processEyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.services.howTitle}</h2>
              <p className={sectionHeadSub}>{t.home.processSub}</p>
            </div>
          </Reveal>
          <ProcessSteps />
        </div>
      </section>

      <section className={sectionSm}>
        <div className={container}>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-navy-900 to-royal-600 p-10 text-white sm:p-16 lg:p-20">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(520px_320px_at_88%_20%,rgba(255,122,26,0.35),transparent_60%),radial-gradient(420px_300px_at_8%_100%,rgba(255,255,255,0.12),transparent_60%)]"
              />
              <div className="relative z-1 flex flex-wrap items-center justify-between gap-7 max-sm:flex-col max-sm:items-start">
                <div>
                  <h2 className="max-w-[560px] font-display text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.08] font-semibold tracking-tight">
                    {t.home.ctaTitle}
                  </h2>
                  <p className="mt-3 max-w-[520px] text-white/78">{t.home.ctaText}</p>
                </div>
                <div className="flex flex-wrap gap-3.5">
                  <BtnLink href="/quote" size="lg">{t.common.getQuote}</BtnLink>
                  <BtnLink href="/destinations" variant="outline" size="lg">{t.common.exploreDestinations}</BtnLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

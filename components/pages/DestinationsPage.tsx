'use client'

import { Reveal } from '@/components/Reveal'
import { GlobalCoverage } from '@/components/GlobalCoverage'
import { useLang } from '@/lib/i18n'
import { REGIONS } from '@/lib/site'
import { BtnLink, Eyebrow, PageHero, container, section, sectionHeadTitle, sectionSm } from '@/components/ui'

const ctaPanel =
  'relative overflow-hidden rounded-3xl bg-linear-to-br from-navy-900 to-royal-600 p-10 text-white sm:p-16 lg:p-20'
const ctaGlow =
  'absolute inset-0 bg-[radial-gradient(520px_320px_at_88%_20%,rgba(255,122,26,0.35),transparent_60%),radial-gradient(420px_300px_at_8%_100%,rgba(255,255,255,0.12),transparent_60%)]'

export function DestinationsPage() {
  const { t } = useLang()
  return (
    <main>
      <GlobalCoverage subtitle="One network. 26 destinations." searchable className="coverage--destinations" />

      <section className={`${section} bg-white`}>
        <div className={`${container} grid items-start gap-10 lg:grid-cols-12 lg:gap-24`}>
          <Reveal delay={140} className="lg:col-span-5">
            <div>
              <div className="rounded-3xl border border-orange/30 bg-orange/8 p-7 leading-relaxed sm:p-8">
                {t.destinations.note}
              </div>
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8">
                <h3 className="mb-3.5 font-display text-[1.15rem] font-semibold">{t.destinations.askCta}</h3>
                <p className="leading-relaxed text-slate-500">{t.home.ctaText}</p>
                <BtnLink href="/contact" className="mt-6 w-full">
                  {t.destinations.askCta}
                </BtnLink>
                <BtnLink href="/quote" variant="ghost" className="mt-3 w-full">
                  {t.common.getQuote}
                </BtnLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={sectionSm}>
        <div className={container}>
          <Reveal>
            <div className={ctaPanel}>
              <div aria-hidden className={ctaGlow} />
              <div className="relative z-1 flex flex-wrap items-center justify-between gap-7 max-sm:flex-col max-sm:items-start">
                <div>
                  <h2 className="max-w-[560px] font-display text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.08] font-semibold tracking-tight">
                    {t.home.ctaTitle}
                  </h2>
                  <p className="mt-3 max-w-[520px] text-white/78">{t.home.ctaText}</p>
                </div>
                <div className="flex flex-wrap gap-3.5">
                  <BtnLink href="/quote" size="lg">{t.common.getQuote}</BtnLink>
                  <BtnLink href="/contact" variant="outline" size="lg">{t.common.contactTeam}</BtnLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

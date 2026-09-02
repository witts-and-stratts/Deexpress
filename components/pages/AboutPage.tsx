'use client'

import { Check } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useLang } from '@/lib/i18n'
import { CONTACT_PERSONS, PORT_IMAGE, SITE } from '@/lib/site'
import { BtnLink, Eyebrow, PageHero, container, section, sectionHead, sectionHeadTitle, sectionSm } from '@/components/ui'

export function AboutPage() {
  const { t } = useLang()
  return (
    <main>
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} sub={t.about.intro} />

      <section className={section}>
        <div className={`${container} grid items-start gap-10 lg:grid-cols-12 lg:gap-24`}>
          <Reveal className="lg:col-span-7">
            <Eyebrow>{t.about.storyTitle}</Eyebrow>
            <p className="mt-6 mb-6 font-display text-[clamp(1.2rem,2vw,1.5rem)] leading-snug font-medium">{t.about.story[0]}</p>
            <p className="mb-4 leading-relaxed text-slate-500">{t.about.story[1]}</p>
            <p className="mb-4 leading-relaxed text-slate-500">{t.about.story[2]}</p>
            <div
              aria-hidden
              className="relative mt-7 min-h-[260px] rounded-3xl shadow-xl shadow-navy-900/20"
              style={{ backgroundImage: `url(${PORT_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="grid gap-4.5">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-linear-to-r before:from-orange before:to-orange-light">
                <h3 className="mb-3.5 font-display text-[1.4rem] font-semibold">{t.about.missionTitle}</h3>
                <p className="leading-relaxed text-slate-500">{t.about.mission}</p>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-linear-to-r before:from-royal before:to-royal-600">
                <h3 className="mb-3.5 font-display text-[1.4rem] font-semibold">{t.about.visionTitle}</h3>
                <p className="leading-relaxed text-slate-500">{t.about.vision}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-7">
                <h3 className="mb-3.5 flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">{SITE.legalName}</h3>
                {[
                  SITE.register,
                  `${SITE.street}, ${SITE.city}`,
                  `${t.contact.hours}: ${SITE.hours}`,
                ].map((line) => (
                  <p key={line} className="flex items-start gap-3 py-1.5 text-[0.92rem] text-slate-500">
                    <Check size={16} className="mt-1 shrink-0 text-royal" /> {line}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${section} bg-white`}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.about.valuesTitle}</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-editorial-line/50 bg-white p-6">
                  <h3 className="mb-2.5 font-display text-[1.08rem] font-semibold">{v.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-slate-500">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.about.leadershipTitle}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.about.leadershipTitle}</h2>
              <p className="text-[1.05rem] leading-relaxed text-slate-500">{t.about.leadershipSub}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {CONTACT_PERSONS.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <div className="flex items-center gap-5.5 rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl shadow-navy-900/10 max-sm:flex-col max-sm:items-start">
                  <span
                    className="size-24 shrink-0 rounded-2xl border-3 border-royal/15 bg-cover bg-top"
                    style={{ backgroundImage: `url(${p.photo})` }}
                    role="img"
                    aria-label={p.name}
                  />
                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold">{p.name}</h3>
                    <p className="my-1 mb-2 text-[0.8rem] font-bold tracking-[0.1em] uppercase text-orange">{t.about.managingDirector}</p>
                    <p className="text-[0.88rem] leading-normal text-slate-500">{p.languages}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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

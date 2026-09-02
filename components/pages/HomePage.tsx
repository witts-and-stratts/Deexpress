'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Check, CreditCard, Headphones, Luggage, Package, Plane,
  Radar, Search, Ship, CarFront, Warehouse, Zap,
} from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Counter } from '@/components/Counter'
import { CoverageSection } from '@/components/CoverageSection'
import { TrackingWidget } from '@/components/TrackingWidget'
import { useLang } from '@/lib/i18n'
import { HERO_IMAGE, SERVICES } from '@/lib/site'
import { BtnLink, Eyebrow, container, section, sectionHead, sectionHeadSub, sectionHeadTitle, sectionSm, sectionTint, textLink } from '@/components/ui'

const SERVICE_ICONS = { 'air-freight': Plane, 'sea-freight': Ship, 'vehicle-shipping': CarFront, 'commercial-cargo': Package, 'personal-effects': Luggage, 'vehicle-sourcing': Search, storage: Warehouse } as const
const WHY_ICONS = [Zap, Radar, CreditCard, Headphones]
const INDUSTRY_ICONS = [CarFront, Package, Ship, Warehouse]

export function HomePage() {
  const { t } = useLang()
  const router = useRouter()

  return (
    <main>
      <section className="relative overflow-hidden bg-navy-950 pt-36 pb-14 text-white sm:pt-44 lg:pt-52 lg:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(720px_480px_at_12%_8%,rgba(30,94,255,0.32),transparent_65%),radial-gradient(640px_420px_at_88%_92%,rgba(255,122,26,0.16),transparent_60%),radial-gradient(900px_500px_at_70%_10%,rgba(24,73,201,0.18),transparent_65%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_90%_80%_at_50%_20%,black_30%,transparent_75%)]"
        />
        <div className={container}>
          <div className="relative max-w-[900px]">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/6 px-4.5 py-2 text-[0.8rem] font-semibold tracking-[0.08em] uppercase text-white/85">
                <span className="relative flex size-2 motion-reduce:hidden">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-orange" />
                </span>
                {t.home.heroBadge}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 mb-5 font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.05] font-semibold tracking-tight">
                {t.home.heroTitle1}
                <br />
                <span className="bg-linear-to-br from-orange to-gold bg-clip-text text-transparent">{t.home.heroTitle2}</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="max-w-[640px] text-[1.12rem] leading-relaxed text-white/78">{t.home.heroSub}</p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <BtnLink href="/quote" size="lg">
                  {t.common.getQuote} <ArrowUpRight size={18} />
                </BtnLink>
                <form
                  className="flex min-w-[300px] flex-1 max-w-[460px] gap-2.5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const value = new FormData(e.currentTarget).get('ref') as string
                    router.push(value?.trim() ? `/track?ref=${encodeURIComponent(value.trim())}` : '/track')
                  }}
                >
                  <input
                    name="ref"
                    placeholder={t.home.heroTrackLabel}
                    aria-label={t.home.heroTrackLabel}
                    className="min-w-0 flex-1 rounded-xl border border-white/22 bg-white/7 px-4.5 py-3.5 text-white outline-none transition-colors placeholder:text-white/45 focus:border-orange"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl border border-white/35 bg-white/5 px-6 py-3.5 text-[0.93rem] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/12 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5"
                  >
                    {t.home.heroTrackBtn} <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
          <Reveal delay={400}>
            <div className="relative mt-14 grid grid-cols-2 border-t border-white/14 lg:mt-20 lg:grid-cols-4">
              {t.home.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-1.5 pt-6 pb-6 ${i % 2 === 1 ? 'border-l border-white/14 pl-6' : ''} ${
                    i > 1 ? 'border-t border-white/14 lg:border-t-0' : ''
                  } ${i > 0 ? 'lg:border-l lg:border-white/14 lg:pl-6' : ''} lg:pr-6`}
                >
                  <span className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none font-bold tracking-tight">
                    <Counter value={s.value} />
                  </span>
                  <span className="text-[0.82rem] leading-snug text-white/62">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="overflow-hidden border-y border-slate-200 bg-white" aria-hidden="true">
        <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
          {[...t.home.marquee, ...t.home.marquee].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-12 py-4.5 pr-12 pl-12 text-[0.82rem] font-bold tracking-[0.14em] whitespace-nowrap text-slate-500 uppercase after:ml-12 after:size-[7px] after:rounded-full after:bg-orange after:content-['']"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className={section}>
        <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-24`}>
          <Reveal className="lg:col-span-7">
            <Eyebrow>{t.home.introEyebrow}</Eyebrow>
            <h2 className={`${sectionHeadTitle} mb-5`}>{t.home.introTitle}</h2>
            <p className="mb-4 leading-relaxed text-slate-500">{t.home.introP1}</p>
            <p className="mb-4 leading-relaxed text-slate-500">{t.home.introP2}</p>
            <BtnLink href="/about" variant="ghost" className="mt-2">
              {t.nav.about} <ArrowRight size={16} />
            </BtnLink>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-navy-900 to-royal-600 p-8 text-white sm:p-11">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(360px_240px_at_85%_10%,rgba(255,122,26,0.3),transparent_65%)]"
              />
              <ul className="relative z-1 m-0 grid list-none gap-4 p-0">
                {t.about.values.map((v) => (
                  <li key={v.title} className="flex items-start gap-3 text-[0.95rem] leading-normal">
                    <Check size={18} className="mt-0.5 shrink-0 text-orange-light" />
                    <span><strong>{v.title}.</strong> {v.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${section} ${sectionTint}`}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.home.servicesEyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.home.servicesTitle}</h2>
              <p className={sectionHeadSub}>{t.home.servicesSub}</p>
            </div>
          </Reveal>
          <ServiceCards />
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.home.coverageEyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.home.coverageTitle}</h2>
              <p className={sectionHeadSub}>{t.home.coverageSub}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <CoverageSection ctaHref="/quote" />
          </Reveal>
        </div>
      </section>

      <section className={`${section} ${sectionTint}`}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.home.whyEyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.home.whyTitle}</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.why.map((w, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length]
              return (
                <Reveal key={w.title} delay={i * 90}>
                  <div className="rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-navy-900/10">
                    <span className="mb-5 grid size-12.5 place-items-center rounded-2xl bg-linear-to-br from-royal/12 to-royal/5 text-royal">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <h3 className="mb-2.5 font-display text-[1.15rem] font-semibold">{w.title}</h3>
                    <p className="text-[0.92rem] leading-relaxed text-slate-500">{w.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.home.processEyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.home.processTitle}</h2>
              <p className={sectionHeadSub}>{t.home.processSub}</p>
            </div>
          </Reveal>
          <ProcessSteps />
        </div>
      </section>

      <section className={`${section} relative overflow-hidden bg-navy-950 text-white`}>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(620px_420px_at_85%_30%,rgba(30,94,255,0.25),transparent_65%),radial-gradient(480px_320px_at_10%_90%,rgba(255,122,26,0.12),transparent_60%)]"
        />
        <div className={`${container} relative grid items-center gap-10 lg:grid-cols-12 lg:gap-20`}>
          <Reveal className="lg:col-span-5">
            <div>
              <Eyebrow className="text-[#9db8e8]">{t.home.trackingEyebrow}</Eyebrow>
              <h2 className="mt-4 mb-4 font-display text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.08] font-semibold tracking-tight">
                {t.home.trackingTitle}
              </h2>
              <p className="leading-relaxed text-white/72">{t.home.trackingSub}</p>
              <Link href="/track" className={`${textLink} mt-2.5`}>
                {t.nav.track} <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <TrackingWidget />
          </Reveal>
        </div>
      </section>

      <section className={`${section} ${sectionTint}`}>
        <div className={container}>
          <Reveal>
            <div className={sectionHead}>
              <Eyebrow>{t.home.industriesEyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.home.industriesTitle}</h2>
              <p className={sectionHeadSub}>{t.home.industriesSub}</p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.industries.map((ind, i) => {
              const Icon = INDUSTRY_ICONS[i % INDUSTRY_ICONS.length]
              return (
                <Reveal key={ind.title} delay={i * 90}>
                  <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1.5 hover:border-navy-900 hover:bg-navy-900 hover:text-white">
                    <span className="grid size-12.5 place-items-center rounded-2xl bg-linear-to-br from-royal/12 to-royal/5 text-royal transition-colors group-hover:from-white/15 group-hover:to-white/5 group-hover:text-white">
                      <Icon size={24} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-4.5 mb-2.5 font-display text-[1.12rem] font-semibold transition-colors group-hover:text-white">
                      {ind.title}
                    </h3>
                    <p className="text-[0.9rem] leading-relaxed text-slate-500 transition-colors group-hover:text-white/70">{ind.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-24`}>
          <Reveal>
            <div
              className="relative min-h-[440px] overflow-hidden rounded-3xl shadow-xl shadow-navy-900/20 max-lg:min-h-[300px]"
              style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              role="img"
              aria-label={t.home.sourcingTitle}
            >
              <div aria-hidden className="absolute inset-0 bg-linear-to-tr from-navy-950/50 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div>
              <Eyebrow>{t.services.details['vehicle-sourcing'].title}</Eyebrow>
              <h2 className={`${sectionHeadTitle} mt-4 mb-5`}>{t.home.sourcingTitle}</h2>
              <p className="mb-4 leading-relaxed text-slate-500">{t.home.sourcingText}</p>
              <BtnLink href="/services/vehicle-sourcing" variant="dark">
                {t.home.sourcingCta} <ArrowUpRight size={16} />
              </BtnLink>
            </div>
          </Reveal>
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
                  <BtnLink href="/quote" size="lg">
                    {t.common.getQuote} <ArrowUpRight size={18} />
                  </BtnLink>
                  <BtnLink href="/contact" variant="outline" size="lg">
                    {t.common.contactTeam}
                  </BtnLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

export function ServiceCards() {
  const { t } = useLang()
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => {
        const d = t.services.details[s.slug]
        const Icon = SERVICE_ICONS[s.slug]
        return (
          <Reveal key={s.slug} delay={(i % 3) * 100}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-royal/35 hover:shadow-xl shadow-navy-900/10"
            >
              <div
                className="relative h-50 overflow-hidden"
                style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                role="img"
                aria-label={d.title}
              >
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-950/45 to-transparent transition-transform duration-600 group-hover:scale-107" />
                <span className="absolute bottom-[-22px] left-5 z-1 grid size-13 place-items-center rounded-2xl border border-slate-200 bg-white text-royal shadow-xl shadow-navy-900/15">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 px-6 pt-9 pb-6">
                <h3 className="font-display text-[1.3rem] font-semibold">{d.title}</h3>
                <p className="flex-1 text-[0.93rem] text-slate-500">{d.tagline}</p>
                <span className={`${textLink} mt-2`}>
                  {t.common.learnMore} <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}

export function ProcessSteps() {
  const { t } = useLang()
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {t.home.steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 90}>
          <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-navy-900/10">
            <span className="mb-4.5 inline-grid size-11 place-items-center rounded-xl bg-linear-to-br from-navy-900 to-royal-600 font-display text-base font-bold text-white">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mb-2.5 font-display text-[1.12rem] font-semibold">{s.title}</h3>
            <p className="text-[0.9rem] leading-relaxed text-slate-500">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

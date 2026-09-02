'use client'

import Link from 'next/link'
import { ArrowUpRight, Check, Clock, Mail, MapPin } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useLang } from '@/lib/i18n'
import { SERVICES, SITE, type ServiceSlug } from '@/lib/site'
import { BtnLink, Eyebrow, PageHero, container, section, sectionHeadTitle, sectionSm } from '@/components/ui'

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const { t } = useLang()
  const d = t.services.details[slug]
  const meta = SERVICES.find((s) => s.slug === slug)!

  return (
    <main>
      <PageHero eyebrow={t.services.eyebrow} title={d.title} sub={d.tagline} image={meta.image} />

      <section className={section}>
        <div className={`${container} grid items-start gap-10 lg:grid-cols-12 lg:gap-24`}>
          <Reveal className="lg:col-span-7">
            <div>
              <h2 className={sectionHeadTitle}>{d.tagline}</h2>
              <p className="mt-5 mb-9 text-[1.05rem] leading-relaxed text-slate-500">{d.summary}</p>
              <ul className="m-0 grid list-none gap-x-8 p-0 sm:grid-cols-2">
                {d.features.map((f) => (
                  <li key={f} className="flex items-start gap-3.5 border-b border-slate-200 py-4 font-medium">
                    <Check size={18} className="mt-1 shrink-0 text-orange" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-5">
            <aside className="rounded-3xl border border-slate-200 bg-white p-8 lg:sticky lg:top-28">
              <h3 className="mb-3.5 font-display text-[1.15rem] font-semibold">{t.services.howTitle}</h3>
              <div className="grid gap-3">
                {t.home.steps.map((s, i) => (
                  <div key={s.title} className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-slate-500">
                    <strong className="font-display">{String(i + 1).padStart(2, '0')}</strong>
                    <span><strong className="text-ink">{s.title}.</strong> {s.text}</span>
                  </div>
                ))}
              </div>
              <BtnLink href="/quote" className="mt-6 w-full">
                {t.services.detailCta} <ArrowUpRight size={16} />
              </BtnLink>
              <div className="mt-5 grid gap-2.5">
                <span className="flex items-start gap-2.5 text-[0.92rem] text-slate-500"><Mail size={16} className="mt-1 shrink-0 text-royal" /> {SITE.email}</span>
                <span className="flex items-start gap-2.5 text-[0.92rem] text-slate-500"><Clock size={16} className="mt-1 shrink-0 text-royal" /> {SITE.hours}</span>
                <span className="flex items-start gap-2.5 text-[0.92rem] text-slate-500"><MapPin size={16} className="mt-1 shrink-0 text-royal" /> {SITE.street}, {SITE.city}</span>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className={`${sectionSm} bg-white`}>
        <div className={container}>
          <Reveal>
            <div className="mb-10 max-w-2xl lg:mb-14">
              <Eyebrow>{t.services.eyebrow}</Eyebrow>
              <h2 className={sectionHeadTitle}>{t.common.ourServices}</h2>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES.filter((s) => s.slug !== slug).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4.5 py-2 text-[0.85rem] font-semibold transition duration-300 hover:border-royal hover:text-royal"
              >
                {t.services.details[s.slug].title}
              </Link>
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

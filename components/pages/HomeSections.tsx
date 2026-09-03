'use client'

import Link from 'next/link'
import { ArrowUpRight, CarFront, Luggage, Package, Plane, Search, Ship, Warehouse } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useLang } from '@/lib/i18n'
import { SERVICES, type ServiceSlug } from '@/lib/site'
import { textLink } from '@/components/ui'

const SERVICE_ICONS = { 'air-freight': Plane, 'sea-freight': Ship, 'vehicle-shipping': CarFront, 'commercial-cargo': Package, 'personal-effects': Luggage, 'vehicle-sourcing': Search, storage: Warehouse } as const
export function ServiceCards({ serviceSlugs = SERVICES.map((service) => service.slug) }: { serviceSlugs?: ServiceSlug[] }) {
  const { t } = useLang()
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.filter((service) => serviceSlugs.includes(service.slug)).map((s, i) => {
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

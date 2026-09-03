'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { CoverageGlobe } from '@/components/CoverageGlobe'
import { REGIONS, type RegionId } from '@/lib/site'
import { useLang } from '@/lib/i18n'
import { textLink } from '@/components/ui'

export function CoverageSection({ ctaHref = '/destinations' }: { ctaHref?: string }) {
  const { t } = useLang()
  const [active, setActive] = useState<RegionId>('europe')
  const region = t.regions[active]

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/6 bg-navy-950 p-5 lg:col-span-7 sm:p-9">
        <CoverageGlobe active={active} onSelect={setActive} className="coverage-globe-canvas--panel" />
        <span className="absolute bottom-4 left-5.5 inline-flex items-center gap-1.5 text-[0.72rem] tracking-wider text-white/55">
          <MapPin size={13} /> {t.home.mapHint}
        </span>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5">
        <div id="coverage-region-panel" key={active} role="tabpanel" aria-live="polite" aria-labelledby={`coverage-region-${active}`} className="flex flex-1 flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-7 transition-colors duration-300 hover:border-royal/40 sm:p-9">
            <span className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-orange">{region.tag}</span>
            <h3 className="font-display text-2xl font-semibold">{region.name}</h3>
            <p className="flex-1 leading-relaxed text-slate-500">{region.text}</p>
            <Link href={ctaHref} className={textLink}>
              {t.common.learnMore} <ArrowUpRight size={15} />
            </Link>
        </div>

        <div className="flex flex-wrap gap-2.5" role="tablist" aria-label={t.destinations.listTitle}>
          {REGIONS.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={active === r.id}
              className={`rounded-full border px-4.5 py-2 text-[0.85rem] font-semibold transition duration-300 ${
                active === r.id
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-slate-200 bg-white hover:border-royal hover:text-royal'
              }`}
              id={`coverage-region-${r.id}`}
              aria-controls="coverage-region-panel"
              onClick={() => setActive(r.id)}
            >
              {t.regions[r.id].name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

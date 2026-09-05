'use client'

import { useLang } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import enLegal from '@/locales/en/legal.json'
import deLegal from '@/locales/de/legal.json'

const legal = { en: enLegal, de: deLegal }

export function LegalPage({ kind }: { kind: 'notice' | 'policy' }) {
  const { lang } = useLang()
  const content = legal[lang][kind]

  return (
    <main>
      <section className="pt-36 pb-20 sm:pt-44 lg:pt-48 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-[860px] rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-navy-900/10 sm:p-14">
            <p className="flex items-center gap-2.5 text-[0.78rem] font-bold tracking-[0.14em] uppercase text-royal">
              <span aria-hidden className="h-0.5 w-[26px] rounded-full bg-orange" />
              {SITE.legalName}
            </p>
            <h1 className="mt-3.5 mb-2.5 font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">{content.title}</h1>
            <p className="text-slate-500">{content.intro}</p>
            {content.sections.map((section) => (
              <div key={section.h}>
                <h2 className="mt-7 mb-3 font-display text-[1.3rem] font-semibold">{section.h}</h2>
                <p className="leading-relaxed whitespace-pre-line text-slate-500">{section.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

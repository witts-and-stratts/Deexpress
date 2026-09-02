'use client'

import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { InquiryForm } from '@/components/InquiryForm'
import { useLang } from '@/lib/i18n'
import { SITE, WHATSAPP_URL } from '@/lib/site'
import { Eyebrow, PageHero, container, section, textLink } from '@/components/ui'

export function QuotePage() {
  const { t } = useLang()
  return (
    <main>
      <PageHero eyebrow={t.quote.eyebrow} title={t.quote.title} sub={t.quote.intro} />

      <section className={section}>
        <div className={`${container} grid items-start gap-9 lg:grid-cols-12 lg:gap-18`}>
          <Reveal className="lg:col-span-5">
            <div className="grid gap-4.5">
              <div className="mb-1">
                <Eyebrow>{t.home.processEyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-tight">
                  {t.services.howTitle}
                </h2>
              </div>
              {t.home.steps.map((s, i) => (
                <div key={s.title} className="flex items-center gap-4.5 rounded-3xl border border-slate-200 bg-white p-6.5">
                  <span className="inline-grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-navy-900 to-royal-600 font-display text-base font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-display text-[1.05rem] font-semibold">{s.title}</h3>
                    <p className="text-[0.9rem] leading-relaxed text-slate-500">{s.text}</p>
                  </div>
                </div>
              ))}
              <div className="rounded-3xl border border-slate-200 bg-white p-6.5">
                <p className="flex items-start gap-2.5 py-1.5 text-[0.92rem] text-slate-500">
                  <Mail size={16} className="mt-1 shrink-0 text-royal" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-royal">{SITE.email}</a>
                </p>
                <p className="flex items-start gap-2.5 py-1.5 text-[0.92rem] text-slate-500">
                  <Phone size={16} className="mt-1 shrink-0 text-royal" />
                  <a href="tel:+4915229939834" className="hover:text-royal">+49 152 29939834</a>
                </p>
                <p className="flex items-start gap-2.5 py-1.5 text-[0.92rem] text-slate-500">
                  <Phone size={16} className="mt-1 shrink-0 text-royal" />
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-royal">
                    {t.common.whatsappChat}
                  </a>
                </p>
                <Link href="/contact" className={`${textLink} mt-2`}>{t.common.contactTeam}</Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-7">
            <div>
              <div className="mb-7">
                <Eyebrow>{t.quote.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-tight">
                  {t.quote.title}
                </h2>
              </div>
              <InquiryForm kind="quote" />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

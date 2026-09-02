'use client'

import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { InquiryForm } from '@/components/InquiryForm'
import { useLang } from '@/lib/i18n'
import { CONTACT_PERSONS, SITE, WHATSAPP_URL } from '@/lib/site'
import { BtnLink, Eyebrow, PageHero, container, section } from '@/components/ui'

export function ContactPage() {
  const { t } = useLang()
  return (
    <main>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} sub={t.contact.intro} />

      <section className={section}>
        <div className={`${container} grid items-start gap-9 lg:grid-cols-12 lg:gap-18`}>
          <Reveal className="lg:col-span-5">
            <div className="grid gap-4.5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6.5">
                <h3 className="mb-3.5 flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">
                  <MapPin size={18} className="text-royal" /> {t.contact.office}
                </h3>
                <p className="flex items-start gap-2.5 py-1.5 text-[0.92rem] leading-relaxed text-slate-500">
                  <MapPin size={16} className="mt-1 shrink-0 text-royal" />
                  {SITE.legalName}<br />{SITE.street}<br />{SITE.city}, {SITE.country}
                </p>
                <p className="flex items-start gap-2.5 py-1.5 text-[0.92rem] text-slate-500">
                  <Clock size={16} className="mt-1 shrink-0 text-royal" /> {t.contact.hours}: {SITE.hours}
                </p>
                <p className="flex items-start gap-2.5 py-1.5 text-[0.92rem] text-slate-500">
                  <Mail size={16} className="mt-1 shrink-0 text-royal" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-royal">{SITE.email}</a>
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6.5">
                <h3 className="mb-3.5 flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">
                  <Phone size={18} className="text-royal" /> {t.contact.directTitle}
                </h3>
                {CONTACT_PERSONS.map((p) => (
                  <div key={p.name} className="flex items-center gap-4 border-t border-slate-200 py-3.5 first:border-t-0">
                    <span
                      className="size-13.5 shrink-0 rounded-2xl bg-cover bg-top"
                      style={{ backgroundImage: `url(${p.photo})` }}
                      role="img"
                      aria-label={p.name}
                    />
                    <div>
                      <strong className="block text-[0.95rem]">{p.name}</strong>
                      <span className="mt-0.5 block text-[0.82rem] text-slate-500">{p.languages}</span>
                      <a href={p.phoneHref} className="text-[0.9rem] font-semibold text-royal">{p.phone}</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6.5">
                <h3 className="mb-3.5 flex items-center gap-2.5 font-display text-[1.05rem] font-semibold">
                  <MessageCircle size={18} className="text-royal" /> {t.contact.whatsappTitle}
                </h3>
                <p className="text-[0.92rem] leading-relaxed text-slate-500">{t.contact.whatsappText}</p>
                <BtnLink href={WHATSAPP_URL} className="mt-3.5" target="_blank" rel="noopener noreferrer">
                  {t.common.whatsappChat} <ArrowUpRight size={16} />
                </BtnLink>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6.5">
                <p className="text-[0.92rem] leading-relaxed text-slate-500">{t.contact.partnership}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-7">
            <div>
              <div className="mb-7">
                <Eyebrow>{t.contact.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-tight">
                  {t.contact.formTitle}
                </h2>
              </div>
              <InquiryForm kind="contact" />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

'use client'

import { useLang, type Lang } from '@/lib/i18n'
import { SITE } from '@/lib/site'

type Section = { h: string; p: string }
type LegalContent = { title: string; intro: string; sections: Section[] }

const legal: Record<Lang, { notice: LegalContent; policy: LegalContent }> = {
  en: {
    notice: {
      title: 'Legal notice',
      intro: 'Information pursuant to Sect. 5 German Telemedia Act (TMG).',
      sections: [
        { h: 'Company', p: `${SITE.legalName}\n${SITE.street}\n${SITE.city}, Germany` },
        { h: 'Represented by', p: 'Adedapo Adediran · Olagunju Olamilekan' },
        { h: 'Contact', p: 'service@deexpress-logistics.eu · +49 (0)176 87132767 · +49 (0)152 29939834' },
        { h: 'Commercial register', p: 'HRB 229599 — Amtsgericht Charlottenburg' },
        { h: 'VAT ID', p: 'DE17362750943' },
      ],
    },
    policy: {
      title: 'Data policy',
      intro: 'Summary of how DEexpress Logistics GmbH handles your personal data.',
      sections: [
        { h: 'Responsible party', p: `${SITE.legalName}, ${SITE.street}, ${SITE.city}, Germany. Contact: ${SITE.email}.` },
        { h: 'What we collect', p: 'When you use our contact or quote forms, we collect the details you provide: name, email address, phone number and shipment information. We use this data exclusively to process your inquiry.' },
        { h: 'Your rights', p: 'Under the GDPR you have the right to access, correct, delete and restrict the processing of your personal data. To exercise these rights or if you have questions about data protection, contact us at the address above.' },
        { h: 'Cookies & analytics', p: 'This website does not set marketing cookies and does not use third-party tracking. A language preference may be stored locally in your browser.' },
      ],
    },
  },
  de: {
    notice: {
      title: 'Impressum',
      intro: 'Angaben gemäß § 5 TMG.',
      sections: [
        { h: 'Unternehmen', p: `${SITE.legalName}\n${SITE.street}\n${SITE.city}, Deutschland` },
        { h: 'Vertreten durch', p: 'Adedapo Adediran · Olagunju Olamilekan' },
        { h: 'Kontakt', p: 'service@deexpress-logistics.eu · +49 (0)176 87132767 · +49 (0)152 29939834' },
        { h: 'Handelsregister', p: 'HRB 229599 — Amtsgericht Charlottenburg' },
        { h: 'Umsatzsteuer-ID', p: 'DE17362750943' },
      ],
    },
    policy: {
      title: 'Datenschutzerklärung',
      intro: 'Zusammenfassung, wie die DEexpress Logistics GmbH mit Ihren personenbezogenen Daten umgeht.',
      sections: [
        { h: 'Verantwortliche Stelle', p: `${SITE.legalName}, ${SITE.street}, ${SITE.city}, Deutschland. Kontakt: ${SITE.email}.` },
        { h: 'Welche Daten wir erheben', p: 'Wenn Sie unsere Kontakt- oder Angebotsformulare nutzen, erheben wir die von Ihnen angegebenen Daten: Name, E-Mail-Adresse, Telefonnummer und Versandinformationen. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage.' },
        { h: 'Ihre Rechte', p: 'Sie haben nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Wenden Sie sich zur Ausübung dieser Rechte oder bei Fragen zum Datenschutz an die oben genannte Adresse.' },
        { h: 'Cookies & Analyse', p: 'Diese Website setzt keine Marketing-Cookies und verwendet kein Drittanbieter-Tracking. Eine Spracheinstellung kann lokal in Ihrem Browser gespeichert werden.' },
      ],
    },
  },
}

export function LegalPage({ kind }: { kind: 'notice' | 'policy' }) {
  const { lang } = useLang()
  const l = legal[lang][kind]
  return (
    <main>
      <section className="pt-36 pb-20 sm:pt-44 lg:pt-48 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-[860px] rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-navy-900/10 sm:p-14">
            <p className="flex items-center gap-2.5 text-[0.78rem] font-bold tracking-[0.14em] uppercase text-royal">
              <span aria-hidden className="h-0.5 w-[26px] rounded-full bg-orange" />
              {SITE.legalName}
            </p>
            <h1 className="mt-3.5 mb-2.5 font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight">{l.title}</h1>
            <p className="text-slate-500">{l.intro}</p>
            {l.sections.map((s) => (
              <div key={s.h}>
                <h2 className="mt-7 mb-3 font-display text-[1.3rem] font-semibold">{s.h}</h2>
                <p className="leading-relaxed whitespace-pre-line text-slate-500">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

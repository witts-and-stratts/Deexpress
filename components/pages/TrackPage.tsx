'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { TrackingWidget } from '@/components/TrackingWidget'
import { useLang } from '@/lib/i18n'
import { EditorialHero } from '@/components/pages/EditorialPage'

export function TrackPage() {
  const { t } = useLang()
  const params = useSearchParams()
  const initialRef = params.get('ref') ?? ''

  return (
    <main className="tracking-page">
      <EditorialHero
        headingId="tracking-title"
        className="track-page__hero"
        title={t.track.title}
        intro={t.track.intro}
        introClassName="max-w-[40ch]"
        image="/images/transport-logistics-products.webp"
      />

      <section className="tracking-page__content" aria-label={t.track.title}>
        <Reveal className="tracking-page__panel">
          <TrackingWidget initialRef={initialRef} />
        </Reveal>
      </section>

      <section className="tracking-page__support">
        <p className="text-h3 text-white">{t.track.supportTitle}</p>
        <div className="tracking-page__support-actions">
          <Link href="/contact">{t.track.supportContact} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link href="/quote">{t.track.supportQuote} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  )
}

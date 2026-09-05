'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { TrackingWidget } from '@/components/TrackingWidget'
import { useLang } from '@/lib/i18n'

export function TrackPage() {
  const { t } = useLang()
  const params = useSearchParams()
  const initialRef = params.get('ref') ?? ''

  return (
    <main className="tracking-page">
      <section className="contact-page__hero track-page__hero" aria-labelledby="tracking-title">
        <div className="contact-page__hero-shade" />
        <div className="contact-page__hero-content">
          <h1 id="tracking-title" className="text-h1 text-white">{t.track.title}</h1>
          <p className="site-lead text-white max-w-[40ch]">{t.track.intro}</p>
        </div>
      </section>

      <section className="tracking-page__content" aria-label={t.track.title}>
        <Reveal className="tracking-page__panel">
          <TrackingWidget initialRef={initialRef} />
        </Reveal>
      </section>

      <section className="tracking-page__support">
        <p className="text-h3 text-white">Need help with a shipment?</p>
        <div className="tracking-page__support-actions">
          <Link href="/contact">Contact our team <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link href="/quote">Request a quote <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  )
}

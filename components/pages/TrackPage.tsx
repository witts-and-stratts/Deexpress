'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { TrackingWidget } from '@/components/TrackingWidget'
import { useLang } from '@/lib/i18n'
import { HomeFooter, HomeHeader } from '@/components/pages/HomePage'

export function TrackPage() {
  const { t } = useLang()
  const params = useSearchParams()
  const initialRef = params.get('ref') ?? ''

  return (
    <main className="tracking-page">
      <section className="tracking-page__hero">
        <HomeHeader />
        <div className="tracking-page__hero-grid">
          <Reveal className="tracking-page__hero-copy">
            <p>DEExpress shipment tracking</p>
            <h1>{t.track.title}</h1>
            <span>{t.track.intro}</span>
          </Reveal>
          <Reveal delay={140} className="tracking-page__interface">
            <TrackingWidget initialRef={initialRef} />
          </Reveal>
        </div>
      </section>

      <section className="tracking-page__note">
        <div className="tracking-page__note-copy"><p>Clarity at every handoff.</p><h2 className="text-h2">Follow your shipment from its first scan to its final delivery.</h2></div>
        <p className="tracking-page__note-detail site-body">{t.track.demoNote}</p>
      </section>

      <section className="tracking-page__support">
        <p className="text-h3">Need help with a shipment?</p>
        <div className="tracking-page__support-actions">
          <Link href="/contact">Contact our team <ArrowUpRight size={18} aria-hidden="true" /></Link>
          <Link href="/quote">Request a quote <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <HomeFooter />
    </main>
  )
}

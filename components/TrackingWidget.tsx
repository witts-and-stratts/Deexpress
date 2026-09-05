'use client'

import { useState } from 'react'
import { Hash, Search } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

const timeline = [
  { label: 'Order placed', date: 'Mar 08, 2026' },
  { label: 'Picked up', date: 'Mar 09, 2026' },
  { label: 'In transit', date: 'Mar 10–12, 2026' },
  { label: 'Out for delivery', date: 'Today' },
  { label: 'Delivered', date: 'Pending' },
]

export function TrackingWidget({ initialRef = '' }: { initialRef?: string }) {
  const { t } = useLang()
  const [ref, setRef] = useState(initialRef)
  const [activeRef, setActiveRef] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const activeStage = 3

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = ref.trim()
    if (!value) { setError(true); setActiveRef(null); return }
    setError(false)
    setActiveRef(value)
  }

  return (
    <div className="tracking-widget">
      <div className="tracking-widget__header">
        <h2>{t.track.title}</h2>
        <p>{t.track.panelIntro}</p>
      </div>
      <form className="tracking-widget__form" onSubmit={submit}>
        <label className="tracking-widget__input" htmlFor="track-ref">
          <Hash size={20} aria-hidden="true" />
          <input id="track-ref" value={ref} onChange={(event) => setRef(event.target.value)} placeholder={t.track.placeholder} autoComplete="off" />
        </label>
        <Button type="submit" size="lg" className="tracking-widget__submit"><Search aria-hidden="true" />{t.track.button}</Button>
      </form>
      {error && <p className="tracking-widget__error" role="alert">{t.track.invalid}</p>}
      {activeRef && <div className="tracking-widget__reveal" aria-live="polite">
        <div className="tracking-widget__result">
          <div className="tracking-widget__meta">
            <div><span>{t.track.trackingNumber}</span><strong>{activeRef}</strong></div>
            <div className="tracking-widget__current"><span>{t.track.currentStatus}</span><p><i aria-hidden="true" />{timeline[activeStage].label}</p></div>
          </div>
          <dl className="tracking-widget__details">
            <div><dt>{t.track.origin}</dt><dd>Berlin, Germany</dd></div>
            <div><dt>{t.track.destination}</dt><dd>Lagos, Nigeria</dd></div>
            <div><dt>{t.track.estimatedDelivery}</dt><dd>Mar 14, 2026</dd></div>
          </dl>
          <div className="tracking-widget__progress">
            <span>{t.track.progress}</span>
            <ol>{timeline.map((item, index) => <li key={item.label} className={index < activeStage ? 'is-complete' : index === activeStage ? 'is-current' : ''}><div className="tracking-widget__track"><i aria-hidden="true" /><b aria-hidden="true" /></div><strong>{item.label}</strong><small>{item.date}</small></li>)}</ol>
          </div>
        </div>
        <p className="tracking-widget__note">{t.track.demoNote}</p>
      </div>}
    </div>
  )
}

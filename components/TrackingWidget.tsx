'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, Search } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { textLink } from '@/components/ui'
import { Button } from '@/components/ui/button'

export function TrackingWidget({ initialRef = '' }: { initialRef?: string }) {
  const { t } = useLang()
  const [ref, setRef] = useState(initialRef)
  const [activeRef, setActiveRef] = useState<string | null>(initialRef || null)
  const [error, setError] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (!activeRef) return
    const target = 3 + (activeRef.length % 3)
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 1; i <= target; i++) {
      timers.push(setTimeout(() => setStage(i), 450 * i))
    }
    return () => timers.forEach(clearTimeout)
  }, [activeRef])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = ref.trim()
    if (!value) {
      setError(true)
      setActiveRef(null)
      return
    }
    setError(false)
    setStage(0)
    setActiveRef(value)
  }

  return (
    <div className="track-widget rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm sm:p-9">
      <form className="track-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="track-ref">{t.track.label}</label>
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/7 py-2 pr-2 pl-4.5">
          <Search size={18} aria-hidden className="shrink-0 text-white/50" />
          <input
            id="track-ref"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder={t.track.placeholder}
            autoComplete="off"
            className="min-w-0 flex-1 border-0 bg-transparent px-1 py-2 text-white outline-none placeholder:text-white/45"
          />
          <Button type="submit" size="sm" className="shrink-0">
            {t.track.button}
          </Button>
        </div>
        {error && <p className="mt-2.5 text-[0.85rem] text-orange-light" role="alert">{t.track.invalid}</p>}
      </form>

      {activeRef && (
        <div className="mt-6 animate-menu-rise" aria-live="polite">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-display font-semibold tracking-wide">
            <span>{activeRef}</span>
            <span className="rounded-full border border-orange/40 bg-orange/15 px-3.5 py-1.5 font-sans text-[0.78rem] font-bold text-orange-light">
              {t.track.statuses[Math.min(stage, t.track.statuses.length - 1)]}
            </span>
          </div>
          <ol className="m-0 grid list-none p-0">
            {t.track.statuses.map((s, i) => (
              <li
                key={s}
                className={`relative flex items-center gap-3.5 py-1.5 ${
                  i < stage ? 'text-white/85' : i === stage ? 'font-semibold text-white' : 'text-white/40'
                }`}
              >
                <span
                  className={`grid size-5.5 shrink-0 place-items-center rounded-full border-[1.5px] text-[0.7rem] ${
                    i < stage
                      ? 'border-orange bg-orange text-navy-950'
                      : i === stage
                        ? 'border-orange bg-transparent'
                        : 'border-white/25 bg-transparent'
                  }`}
                >
                  {i < stage ? (
                    <Check size={12} />
                  ) : i === stage ? (
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-orange" />
                    </span>
                  ) : (
                    <i className="block size-1.5 rounded-full bg-white/30" />
                  )}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <p className="mt-5 mb-3.5 text-[0.85rem] leading-relaxed text-white/55">{t.track.demoNote}</p>
      <Link href="/contact" className={textLink}>
        {t.track.contactCta} <ArrowUpRight size={15} />
      </Link>
    </div>
  )
}

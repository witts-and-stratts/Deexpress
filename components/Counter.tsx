'use client'

import { useEffect, useRef, useState } from 'react'

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        const start = performance.now()
        const dur = 1500
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(eased * value))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return <span ref={ref}>{n.toLocaleString('en-US')}{suffix}</span>
}

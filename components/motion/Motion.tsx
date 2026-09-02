'use client'

import { type CSSProperties, type ImgHTMLAttributes, type ReactNode, useEffect, useRef, useState } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsVisible(true)
      observer.disconnect()
    }, { threshold: 0.16 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`motion-reveal ${isVisible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

type ParallaxImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  strength?: number
}

export function ParallaxImage({ strength = 16, className = '', src, ...props }: ParallaxImageProps) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight
      node.style.setProperty('--parallax-y', `${Math.max(-strength, Math.min(strength, progress * strength * 2))}px`)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [strength])

  return <img ref={ref} src={src} className={`motion-parallax ${className}`} {...props} />
}

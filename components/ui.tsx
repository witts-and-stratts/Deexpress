import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { ResponsiveImage } from '@/components/ResponsiveImage'
import { cn } from '@/lib/utils'

export const container = 'site-container max-w-7xl'

export const section = 'site-section'
export const sectionSm = 'py-[clamp(2.75rem,6vw,5rem)]'
export const sectionTint = 'bg-white'

export const sectionHead = 'mb-10 max-w-2xl lg:mb-14'
export const sectionHeadTitle = 'text-h2 mt-4 mb-4'
export const sectionHeadSub = 'site-lead'

export const textLink =
  'inline-flex items-center gap-2 font-semibold text-royal transition-colors hover:text-royal-600 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`type-label flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className="h-0.5 w-[26px] rounded-full bg-orange" />
      {children}
    </p>
  )
}

const sizes = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const
const variants = {
  primary: 'default',
  dark: 'default',
  outline: 'outline',
  ghost: 'ghost',
} as const

export function BtnLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants; size?: keyof typeof sizes }) {
  return (
    <Link className={cn(buttonVariants({ variant: variants[variant], size: sizes[size] }), variant === 'dark' && 'bg-editorial-ink hover:bg-editorial-accent', className)} {...props}>
      {children}
    </Link>
  )
}

export function PageHero({ eyebrow, title, sub, image, portraitImage }: { eyebrow: string; title: ReactNode; sub: string; image?: string; portraitImage?: string }) {
  return (
    <section className="site-hero">
      {image ? (
        <ResponsiveImage
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          src={image}
          portraitSrc={portraitImage}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(700px_430px_at_88%_90%,rgba(255,180,84,.22),transparent_65%),radial-gradient(640px_420px_at_12%_8%,rgba(255,255,255,.1),transparent_65%)]"
        />
      )}
      <div aria-hidden className="site-hero-overlay" />
      <div className="site-hero-content">
        <Eyebrow className="text-orange-light">{eyebrow}</Eyebrow>
        <h1 className="text-h1 mt-4 mb-5 text-white">{title}</h1>
        <p className="site-lead max-w-[65ch] text-white/82">{sub}</p>
      </div>
    </section>
  )
}

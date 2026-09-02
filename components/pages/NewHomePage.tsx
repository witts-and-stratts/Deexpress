'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Hash, Menu, Search, X } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { useLang, type Lang } from '@/lib/i18n'
import { CoverageGlobe } from '@/components/CoverageGlobe'
import { REGIONS, type RegionId } from '@/lib/site'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { ParallaxImage, Reveal } from '@/components/motion/Motion'

const assets = {
  hero: '/images/home-hero.webp',
  logo: '/images/logo.webp',
  footerLogo: '/images/footer-logo.webp',
  air: '/images/service-air.webp',
  sea: '/images/service-sea.webp',
  vehicle: '/images/service-vehicle.webp',
  cargo: '/images/service-cargo.webp',
  personal: '/images/service-personal.webp',
  sourcing: '/images/service-sourcing.webp',
  plane: '/images/plane.webp',
  ship: '/images/ship.webp',
  train: '/images/train.webp',
  truck: '/images/truck.webp',
  car: '/images/car.webp',
  coverage: '/images/coverage-figma.webp',
  industry1: '/images/industry1.webp',
  industry2: '/images/industry2.webp',
  industry3: '/images/industry3.webp',
  industry4: '/images/industry4.webp',
  pattern: '/images/wavy-background.svg',
  globeIcon: '/images/icons/globe-icon.svg',
  multimodalIcon: '/images/icons/multimodal-icon.svg',
  regionsIcon: '/images/icons/regions-icon.svg',
}

const services = [
  ['Air freight', assets.air, 'Time-sensitive shipments, coordinated from collection to arrival.'],
  ['Sea freight', assets.sea, 'Cost-effective ocean freight for larger loads and long-distance routes.'],
  ['Vehicle shipping', assets.vehicle, 'Vehicle purchase and shipping coordinated through one logistics partner.'],
  ['Commercial cargo', assets.cargo, 'Freight planned around your business requirements and destination.'],
  ['Personal effects shipping', assets.personal, 'Careful coordination for the belongings that move with you.'],
  ['Procurement and vehicle sourcing', assets.sourcing, 'Support with sourcing and purchasing vehicles in Europe.'],
] as const

function LanguageSelector({ footer = false }: { footer?: boolean }) {
  const { lang, setLang } = useLang()
  const language = lang.toUpperCase()
  const flag = lang === 'de' ? '/flags/de.svg' : '/flags/gb.svg'
  const selectLanguage = (value: Lang) => setLang(value)

  return <DropdownMenu>
    <DropdownMenuTrigger className={footer ? 'site-footer__language' : 'site-nav__language'} aria-label="Choose language">
      <img src={flag} alt="" /> <span>{language}</span> <ChevronDown size={12} aria-hidden="true" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="language-menu">
      <DropdownMenuItem onClick={() => selectLanguage('de')} className="language-menu__item"><img src="/flags/de.svg" alt="" /> Deutsch</DropdownMenuItem>
      <DropdownMenuItem onClick={() => selectLanguage('en')} className="language-menu__item"><img src="/flags/gb.svg" alt="" /> English</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}

export function HomeHeader() {
  const [open, setOpen] = useState(false)

  return <header className={`site-nav${open ? ' site-nav--open' : ''}`}>
    <Link className="site-nav__brand" href="/" aria-label="DEexpress home"><img src={assets.logo} alt="DEexpress" /></Link>
    <Button variant="ghost" size="icon" className="site-nav__toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="home-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={22} /> : <Menu size={22} />}</Button>
    <nav className="site-nav__links" id="home-navigation"><Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/services" onClick={() => setOpen(false)}>Shipping</Link><Link href="/track" onClick={() => setOpen(false)}>Track</Link><Link href="/destinations" onClick={() => setOpen(false)}>Destinations</Link><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link><Link href="/quote" className={buttonVariants({ variant: 'default', size: 'sm' })} onClick={() => setOpen(false)}>Get a quote</Link><LanguageSelector /></nav>
  </header>
}

export function HomeFooter() {
  return <footer className="site-footer"><div className="site-footer__main"><div className="site-footer__brand"><img src={assets.footerLogo} alt="DEexpress" /><small>Logistics GmbH · Berlin</small><p>International freight, storage and vehicle logistics from Berlin to 26 countries across Africa and the Middle East.</p><strong>Move across borders.<br />Move with confidence.</strong></div><div><b>Services</b><Link href="/services">Air freight</Link><Link href="/services">Sea freight</Link><Link href="/services">Vehicle shipping</Link><Link href="/services">Commercial cargo</Link><Link href="/services">Personal effects</Link><Link href="/services">Vehicle sourcing</Link><Link href="/services">Storage</Link></div><div><b>Company</b><Link href="/about">About us</Link><Link href="/destinations">Destinations</Link><Link href="/track">Track shipment</Link><Link href="/quote">Get a quote</Link><Link href="/contact">Contact</Link></div><div><b>Contact</b><a href="mailto:service@deexpress-logistics.eu">service@deexpress-logistics.eu</a><span>+49 152 29939834</span><span>Lichtenauer Str. 51, 13055 Berlin, Germany<br /><small>Mon – Fri · 9:00 – 17:00</small></span></div></div><LanguageSelector footer /><div className="site-footer__bottom"><span>Legal notice　 Data policy</span><span>© 2026 DEexpress Logistics GmbH. All rights reserved.</span></div></footer>
}

function ServiceGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const imageRefs = useRef<Array<HTMLImageElement | null>>([])
  useEffect(() => {
    let frame = 0
    const updateImages = () => {
      const section = sectionRef.current
      if (!section) return
      const scrollRange = section.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollRange))
      const scene = progress * services.length

      imageRefs.current.forEach((image, index) => {
        if (!image) return
        const opacity = index === 0 ? 1 : Math.min(1, Math.max(0, (scene - (index - .24)) / .7))
        image.style.opacity = String(opacity)
      })
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateImages)
    }
    updateImages()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div className="service-showcase" ref={sectionRef}>
    <div className="service-showcase__visual">
      <h2 className="service-showcase__heading text-h2"><span>One system.</span><span> Multiple effects</span></h2>
      {services.map(([, image], index) => <img key={image} ref={element => { imageRefs.current[index] = element }} src={image} alt="" className="service-showcase__image" />)}
    </div>
    <div className="service-showcase__panels">
      {services.map(([title, , description]) => <section key={title} className="service-showcase__panel">
        <Link href="/services" className="service-showcase__copy">
          <strong>{title}</strong>
          <span className="service-showcase__description">{description}</span>
          <span className="service-showcase__link">Explore service <span aria-hidden="true">↗</span></span>
        </Link>
      </section>)}
    </div>
  </div>
}

function TransportRow() {
  const modes = [['Airplane', assets.plane], ['Ship', assets.ship], ['Train', assets.train], ['Truck', assets.truck]] as const
  return <div className="preference__transport">{modes.map(([name, image]) => <div className="preference__transport-item" key={name}><img src={image} alt="" /><span>{name}</span></div>)}</div>
}

const testimonial = {
  quote: '"DEexpress transformed our supply chain. Their real-time tracking and dedicated team reduced our transit times by 40% on the Berlin-Lagos corridor."',
  name: 'Marcus Weber',
  role: 'Head of Logistics, AutoTech GmbH',
}

type SplideHandle = { splide: { go: (control: string | number) => void } }

function TestimonialCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const splideRef = useRef<SplideHandle | null>(null)

  return <section className="testimonials__carousel">
    <Splide
      ref={splideRef}
      className="testimonials__splide"
      hasTrack={false}
      options={{ type: 'loop', perPage: 1, arrows: false, pagination: false, drag: true, keyboard: 'global', speed: 600 }}
      onMoved={(_, nextIndex) => setActiveSlide(nextIndex)}
      aria-label="Customer testimonials"
    >
      <SplideTrack>
        {[testimonial, testimonial, testimonial].map((item, index) => <SplideSlide key={index}>
          <span className="section-label">Testimonials</span>
          <blockquote>{item.quote}</blockquote>
          <div className="testimonials__author"><strong>{item.name}</strong><small>{item.role}</small></div>
        </SplideSlide>)}
      </SplideTrack>
      <div className="testimonials__controls">
        <div className="testimonials__arrows">
          <Button variant="secondary" size="icon" type="button" onClick={() => splideRef.current?.splide.go('<')} aria-label="Previous testimonial">←</Button>
          <Button variant="secondary" size="icon" type="button" onClick={() => splideRef.current?.splide.go('>')} aria-label="Next testimonial">→</Button>
        </div>
        <div className="testimonials__indicators" aria-label={`Testimonial ${activeSlide + 1} of 3`}>
          {[0, 1, 2].map(index => <Button key={index} variant="ghost" className={activeSlide === index ? 'is-active' : ''} type="button" onClick={() => splideRef.current?.splide.go(index)} aria-label={`Go to testimonial ${index + 1}`} />)}
        </div>
      </div>
    </Splide>
  </section>
}

export function NewHomePage() {
  const { t } = useLang()
  const [activeRegion, setActiveRegion] = useState<RegionId>('europe')
  const region = t.regions[activeRegion]

  return <main className="home-page">
    <section className="home-page__hero">
      <ParallaxImage src={assets.hero} alt="Cargo ship in a harbor" strength={18} />
      <HomeHeader />
      <div className="home-page__hero-copy"><Reveal delay={80}><h1 className="text-h1">Move what matters<br />with confidence</h1></Reveal><Reveal delay={220}><p className="site-lead">Tailor-made logistics services from Europe to Africa by road, air, water or rail – we deliver your cargo safely to its destination with efficiency and care</p></Reveal></div>
    </section>

    <section className="home-page__intro"><p className="text-h3"><strong>DEExpress coordinates air, sea and vehicle shipping from Europe to destinations across 26 African countries and the Middle East —</strong> helping individuals and businesses move internationally with greater clarity and control.</p></section>

    <section className="home-page__section services-section"><Reveal delay={100}><ServiceGrid /></Reveal></section>

    <section className="preference"><h2 className="text-h2">Ship your preference</h2><p className="site-body">From origin to destination, we follow your preference in means, cost and handling.</p><TransportRow /><div className="preference__stats"><div><img src={assets.globeIcon} alt="" /><span>26+</span><small>Destinations<br />across Africa &amp; the<br />Middle East</small></div><div><img src={assets.multimodalIcon} alt="" /><span>4</span><small>Multi-modal<br />shipping methods</small></div><div><img src={assets.regionsIcon} alt="" /><span>3</span><small>Regions served</small></div></div></section>

    <section className="coverage"><div className="coverage__copy"><h2 className="text-h2">Global Coverage<br /><span>From Europe to 26 destinations</span></h2><p className="site-lead">Our network connects European origins with destinations across Africa and the Middle East. Select a region to see how we move your freight.</p><div className="coverage__tabs" role="tablist" aria-label="Coverage regions">{REGIONS.map(({ id }) => <Button key={id} variant="outline" type="button" role="tab" aria-selected={activeRegion === id} aria-controls="coverage-panel" id={`coverage-tab-${id}`} className={activeRegion === id ? 'is-active' : ''} onClick={() => setActiveRegion(id)}>{t.regions[id].name}</Button>)}</div></div><CoverageGlobe /><aside id="coverage-panel" role="tabpanel" aria-labelledby={`coverage-tab-${activeRegion}`} className="coverage__card" aria-live="polite"><b>{region.tag}</b><h3 className="text-card-title">{region.name}</h3><p className="site-body">{region.text}</p><Link href="/destinations">Learn More <span aria-hidden="true">↗</span></Link></aside></section>

    <section className="trust"><h2 className="text-h2 text-editorial-accent">Built on speed, transparency and trust.</h2><div className="trust__grid trust__grid--principles">{[['Speed', 'We are fast and effective — from the first inquiry to the final delivery of your cargo.'], ['Tracking', 'Up-to-date status details for your customers, from the point of shipment until arrival.'], ['Flexible payment', 'Payment should not be a barrier. Contact us — we will find an option that works for you.'], ['Service', 'A customer service team that is ready to assist quickly, in English, German or French.']].map(([title, copy]) => <div className="trust__item" key={title}><strong className="text-card-title">{title}</strong><span className="site-body mt-4 max-w-[32ch] leading-[1.375]">{copy}</span></div>)}</div><div className="trust__grid trust__grid--metrics">{[['10M+', 'Interactions / month'], ['70%+', 'Autonomous resolution'], ['75%', 'Cost reduction'], ['10X', 'Capacity increase']].map(([value, label]) => <div className="trust__item" key={label}><strong className="text-metric">{value}</strong><span className="text-label">{label}</span></div>)}</div></section>

    <section className="shipment-tracking"><section className="shipment-tracking__panel site-panel"><div><h2 className="text-h2 text-editorial-accent">Track your shipment</h2><p className="site-body mt-3 mb-6">Enter your tracking number to see the latest status and estimated delivery date.</p></div><form className="shipment-tracking__form" action="/track"><label className="shipment-tracking__field"><Hash size={20} /><input name="ref" placeholder="Enter tracking number" aria-label="Enter tracking number" /></label><Button type="submit"><Search size={18} /> Track</Button></form></section></section>

    <section className="industries"><h2 className="text-h2 text-editorial-accent">Trusted across industries</h2><p className="site-body">Different cargo, different requirements — the same dependable handling.</p><div className="industries__grid">{[[assets.industry1, 'Automotive', 'Ensure your tracking number to see the latest status and estimated delivery date.'], [assets.industry2, 'Retail', 'Fast and reliable delivery of consumer goods to stores and customers.'], [assets.industry3, 'Food', 'Temperature-controlled logistics for perishable goods and ingredients.'], [assets.industry4, 'Hardware', 'Specialized handling for heavy machinery and sensitive electronic equipment.']].map(([image, title, copy]) => <article className="industries__item" key={title}><img src={image} alt="" /><div className="industries__item-copy"><strong className="text-card-title">{title}</strong><span className="site-body">{copy}</span></div></article>)}</div></section>

    <section className="testimonials" style={{ backgroundImage: `url(${assets.pattern})` }}><TestimonialCarousel /></section>
    <HomeFooter />
  </main>
}

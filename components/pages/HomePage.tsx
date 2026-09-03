'use client';

import { GlobalCoverage } from '@/components/GlobalCoverage';
import { ParallaxImage, Reveal } from '@/components/motion/Motion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLang, type Lang } from '@/lib/i18n';
import { Input } from '@base-ui/react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {
    ArrowUpRight,
    ChevronDown,
    Hash,
    Menu,
    Search,
    X
} from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import AnimatedText from '../AnimatedText';

const MotionLink = motion.create(Link);

const assets = {
  hero: '/images/home-hero.webp',
  logo: '/images/logo.webp',
  footerLogo: '/images/footer-logo.webp',
  air: '/images/service-air.jpg',
  sea: '/images/service-sea.jpg',
  vehicle: '/images/service-vehicle.jpg',
  cargo: '/images/service-cargo.jpg',
  personal: '/images/service-personal.webp',
  sourcing: '/images/service-sourcing.jpg',
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
};

const services = [
  [
    'Air freight',
    assets.air,
    'Time-sensitive shipments, coordinated from collection to arrival.',
  ],
  [
    'Sea freight',
    assets.sea,
    'Cost-effective ocean freight for larger loads and long-distance routes.',
  ],
  [
    'Vehicle shipping',
    assets.vehicle,
    'Vehicle purchase and shipping coordinated through one logistics partner.',
  ],
  [
    'Commercial cargo',
    assets.cargo,
    'Freight planned around your business requirements and destination.',
  ],
  [
    'Personal effects shipping',
    assets.personal,
    'Careful coordination for the belongings that move with you.',
  ],
  [
    'Procurement and vehicle sourcing',
    assets.sourcing,
    'Support with sourcing and purchasing vehicles in Europe.',
  ],
] as const;

function LanguageSelector({ footer = false }: { footer?: boolean }) {
  const { lang, setLang } = useLang();
  const language = lang.toUpperCase();
  const flag = lang === 'de' ? '/flags/de.svg' : '/flags/gb.svg';
  const selectLanguage = (value: Lang) => setLang(value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={footer ? 'site-footer__language' : 'site-nav__language'}
        aria-label='Choose language'
      >
        <img src={flag} alt='' /> <span>{language}</span>{' '}
        <ChevronDown size={12} aria-hidden='true' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='language-menu'>
        <DropdownMenuItem
          onClick={() => selectLanguage('de')}
          className='language-menu__item'
        >
          <img src='/flags/de.svg' alt='' /> Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => selectLanguage('en')}
          className='language-menu__item'
        >
          <img src='/flags/gb.svg' alt='' /> English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HomeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={`site-nav${open ? ' site-nav--open' : ''}`}>
        <Link className='site-nav__brand' href='/' aria-label='DEexpress home'>
          <img src={assets.logo} alt='DEexpress' />
        </Link>
        <button
          className='site-nav__toggle md:hidden'
          type='button'
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls='home-navigation'
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          <motion.span
            className='site-nav__toggle-line'
            animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className='site-nav__toggle-line'
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className='site-nav__toggle-line'
            animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
        <nav className='site-nav__links' id='home-navigation'>
          <div className='site-nav__menu-links'>
            <Link href='/about' onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href='/services' onClick={() => setOpen(false)}>
              Shipping
            </Link>
            <Link href='/track' onClick={() => setOpen(false)}>
              Track
            </Link>
            <Link href='/destinations' onClick={() => setOpen(false)}>
              Destinations
            </Link>
            <Link href='/contact' onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
          <div className='site-nav__bottom-actions'>
            <LanguageSelector />
            <Link
              href='/quote'
              className={buttonVariants({ variant: 'default', size: 'default' })}
              onClick={() => setOpen(false)}
            >
              Get a quote
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Dropdown Panel rendered outside header backdrop-filter with orchestrated motion animation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className='site-nav-mobile md:hidden'
            id='home-navigation-mobile'
            aria-label='Mobile navigation'
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.05,
                delayChildren: 0.08,
              },
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.98,
              transition: {
                duration: 0.22,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.03,
                staggerDirection: -1,
              },
            }}
          >
            <motion.div
              className='site-nav__menu-links'
              variants={{
                open: { transition: { staggerChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              {[
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Shipping' },
                { href: '/track', label: 'Track' },
                { href: '/destinations', label: 'Destinations' },
                { href: '/contact', label: 'Contact' },
              ].map((item) => (
                <MotionLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    initial: { opacity: 0, x: -14, y: 6 },
                    animate: {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    },
                    exit: {
                      opacity: 0,
                      x: -8,
                      y: -4,
                      transition: { duration: 0.18, ease: 'easeIn' },
                    },
                  }}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                >
                  {item.label}
                </MotionLink>
              ))}
            </motion.div>
            <motion.div
              className='site-nav__bottom-actions'
              variants={{
                initial: { opacity: 0, y: 14 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
                },
                exit: {
                  opacity: 0,
                  y: 8,
                  transition: { duration: 0.15, ease: 'easeIn' },
                },
              }}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <LanguageSelector />
              <Link
                href='/quote'
                className={buttonVariants({ variant: 'default', size: 'default' })}
                onClick={() => setOpen(false)}
              >
                Get a quote
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export function HomeFooter() {
  return (
    <footer className='site-footer'>
      <div className='site-footer__main'>
        <div className='site-footer__brand'>
          <img src={assets.footerLogo} alt='DEexpress' />
          <small>Logistics GmbH · Berlin</small>
          <p>
            International freight, storage and vehicle logistics from Berlin to
            26 countries across Africa and the Middle East.
          </p>
          <strong>
            Move across borders.
            <br />
            Move with confidence.
          </strong>
        </div>
        <div>
          <b>Services</b>
          <Link href='/services'>Air freight</Link>
          <Link href='/services'>Sea freight</Link>
          <Link href='/services'>Vehicle shipping</Link>
          <Link href='/services'>Commercial cargo</Link>
          <Link href='/services'>Personal effects</Link>
          <Link href='/services'>Vehicle sourcing</Link>
          <Link href='/services'>Storage</Link>
        </div>
        <div>
          <b>Company</b>
          <Link href='/about'>About us</Link>
          <Link href='/destinations'>Destinations</Link>
          <Link href='/track'>Track shipment</Link>
          <Link href='/quote'>Get a quote</Link>
          <Link href='/contact'>Contact</Link>
        </div>
        <div>
          <b>Contact</b>
          <a href='mailto:service@deexpress-logistics.eu'>
            service@deexpress-logistics.eu
          </a>
          <span>+49 152 29939834</span>
          <span>
            Lichtenauer Str. 51, 13055 Berlin, Germany
            <br />
            <small>Mon – Fri · 9:00 – 17:00</small>
          </span>
        </div>
      </div>
      <LanguageSelector footer />
      <div className='site-footer__bottom'>
        <span>Legal notice　 Data policy</span>
        <span>© 2026 DEexpress Logistics GmbH. All rights reserved.</span>
      </div>
    </footer>
  );
}

function AnimatedExploreIcon() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  return (
    <motion.span
      ref={ref}
      aria-hidden='true'
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
    >
      <ArrowUpRight className='mb-0.5' size={20} />
    </motion.span>
  );
}

function ShowcaseImage({
  image,
  index,
  sceneCount,
  progress,
  reduceMotion,
}: {
  image: string;
  index: number;
  sceneCount: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const scrollSteps = Math.max(1, sceneCount - 1);
  const start = index === 0 ? 0 : Math.max(0, (index - 0.5) / scrollSteps);
  const end = Math.min(1, start + 0.35 / scrollSteps);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [1.045, 1]);

  return (
    <motion.div
      className='absolute inset-0'
      style={{ opacity: index === 0 ? 1 : opacity, scale: reduceMotion ? 1 : scale, willChange: 'opacity, transform' }}
    >
      <Image
        src={image}
        alt=''
        fill
        sizes='100vw'
        loading='eager'
        className='service-showcase__image'
        style={{ opacity: 1 }}
      />
    </motion.div>
  );
}

function ServiceGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 700,
    damping: 45,
    mass: 0.08,
  });

  return (
    <div className='service-showcase home-service-showcase' ref={sectionRef}>
      <div className='service-showcase__visual'>
        <h2 className='service-showcase__heading text-h4'>
          <span>One system.</span>
          <span> Multiple effects</span>
        </h2>
        {services.map(([, image], index) => (
          <ShowcaseImage
            key={image}
            image={image}
            index={index}
            sceneCount={services.length}
            progress={smoothProgress}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
      <div className='service-showcase__panels'>
        {services.map(([title, , description]) => (
          <section key={title} className='service-showcase__panel'>
            <Link href='/services' className='service-showcase__copy'>
              <AnimatedText
                trigger='inView'
                delay={0.2}
                from={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <strong className='text-h2 text-white'>{title}</strong>
              </AnimatedText>
              <AnimatedText
                trigger='inView'
                delay={0.4}
                from={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <span className='service-showcase__description'>
                  {description}
                </span>
              </AnimatedText>
              <AnimatedText
                delay={0.6}
                trigger='inView'
                from={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className='flex w-full'
              >
                <span className='service-showcase__link gap-2'>
                  Explore
                  <AnimatedExploreIcon />
                </span>
              </AnimatedText>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}

function TransportRow() {
  const modes = [
    ['Airplane', assets.plane],
    ['Ship', assets.ship],
    ['Train', assets.train],
    ['Truck', assets.truck],
  ] as const;
  return (
    <div className='preference__transport'>
      {modes.map(([name, image]) => (
        <div className='preference__transport-item' key={name}>
          <img src={image} alt='' />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

const testimonial = {
  quote:
    '"DEexpress transformed our supply chain. Their real-time tracking and dedicated team reduced our transit times by 40% on the Berlin-Lagos corridor."',
  name: 'Marcus Weber',
  role: 'Head of Logistics, AutoTech GmbH',
};

type SplideHandle = { splide: { go: (control: string | number) => void } };

function TestimonialCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const splideRef = useRef<SplideHandle | null>(null);

  return (
    <section className='testimonials__carousel'>
      <Splide
        ref={splideRef}
        className='testimonials__splide'
        hasTrack={false}
        options={{
          type: 'loop',
          perPage: 1,
          arrows: false,
          pagination: false,
          drag: true,
          keyboard: 'global',
          speed: 600,
        }}
        onMoved={(_, nextIndex) => setActiveSlide(nextIndex)}
        aria-label='Customer testimonials'
      >
        <SplideTrack>
          {[testimonial, testimonial, testimonial].map((item, index) => (
            <SplideSlide key={index}>
              <span className='section-label'>Testimonials</span>
              <blockquote>{item.quote}</blockquote>
              <div className='testimonials__author'>
                <strong>{item.name}</strong>
                <small>{item.role}</small>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
        <div className='testimonials__controls'>
          <div className='testimonials__arrows'>
            <Button
              variant='secondary'
              size='icon'
              type='button'
              onClick={() => splideRef.current?.splide.go('<')}
              aria-label='Previous testimonial'
            >
              ←
            </Button>
            <Button
              variant='secondary'
              size='icon'
              type='button'
              onClick={() => splideRef.current?.splide.go('>')}
              aria-label='Next testimonial'
            >
              →
            </Button>
          </div>
          <div
            className='testimonials__indicators'
            aria-label={`Testimonial ${activeSlide + 1} of 3`}
          >
            {[0, 1, 2].map((index) => (
              <Button
                key={index}
                variant='ghost'
                className={activeSlide === index ? 'is-active' : ''}
                type='button'
                onClick={() => splideRef.current?.splide.go(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Splide>
    </section>
  );
}

export function HomePage() {
  return (
    <main className='home-page'>
      <section className='home-page__hero'>
        <ParallaxImage
          src={assets.hero}
          alt='Cargo ship in a harbor'
          strength={18}
        />
        <HomeHeader />
        <div className='home-page__hero-copy'>
          <Reveal delay={80}>
            <h1 className='text-h1 text-white'>
              Move what matters
              <br />
              with confidence
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className='site-lead text-white'>
              Tailor-made logistics services from Europe to Africa by road, air,
              water or rail – we deliver your cargo safely to its destination
              with efficiency and care
            </p>
          </Reveal>
        </div>
      </section>

      <section className='home-page__intro'>
        <AnimatedText
          trigger='inView'
          splitBy={['words']}
          stagger={0.04}
          className='text-h3 max-w-[52ch]'
        >
          <strong>
            DEExpress coordinates air, sea and vehicle shipping from Europe to
            destinations across 26 African countries and the Middle East —
          </strong>{' '}
          <span className='text-gray-500'>helping individuals and businesses move internationally with greater
          clarity and control.</span>
        </AnimatedText>
      </section>

      <section className='home-page__section services-section'>
        <ServiceGrid />
      </section>

      <section className='preference'>
        <h2 className='text-h2 text-editorial-accent'>Ship your preference</h2>
        <p className='site-body'>
          From origin to destination, we follow your preference in means, cost
          and handling.
        </p>
        <TransportRow />
        <div className='preference__stats'>
          <div>
            <img src={assets.globeIcon} alt='' />
            <span>26+</span>
            <small>
              Destinations
              <br />
              across Africa &amp; the
              <br />
              Middle East
            </small>
          </div>
          <div>
            <img src={assets.multimodalIcon} alt='' />
            <span>4</span>
            <small>
              Multi-modal
              <br />
              shipping methods
            </small>
          </div>
          <div>
            <img src={assets.regionsIcon} alt='' />
            <span>3</span>
            <small>Regions served</small>
          </div>
        </div>
      </section>

      <GlobalCoverage />

      <section className='trust'>
        <h2 className='text-h2 text-editorial-accent'>
          Built on speed, transparency and trust.
        </h2>
        <div className='trust__grid trust__grid--principles'>
          {[
            [
              'Speed',
              'We are fast and effective — from the first inquiry to the final delivery of your cargo.',
            ],
            [
              'Tracking',
              'Up-to-date status details for your customers, from the point of shipment until arrival.',
            ],
            [
              'Flexible payment',
              'Payment should not be a barrier. Contact us — we will find an option that works for you.',
            ],
            [
              'Service',
              'A customer service team that is ready to assist quickly, in English, German or French.',
            ],
          ].map(([title, copy]) => (
            <div className='trust__item' key={title}>
              <strong className='text-card-title'>{title}</strong>
              <span className='site-body mt-4 max-w-[32ch] leading-[1.375]'>
                {copy}
              </span>
            </div>
          ))}
        </div>
        <div className='trust__grid trust__grid--metrics'>
          {[
            ['10M+', 'Interactions / month'],
            ['70%+', 'Autonomous resolution'],
            ['75%', 'Cost reduction'],
            ['10X', 'Capacity increase'],
          ].map(([value, label]) => (
            <div className='trust__item' key={label}>
              <strong className='text-metric'>{value}</strong>
              <span className='text-label'>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className='shipment-tracking'>
        <section className='shipment-tracking__panel site-panel'>
          <div>
            <h2 className='text-h2 text-editorial-accent'>
              Track your shipment
            </h2>
            <p className='site-body mt-3 mb-6'>
              Enter your tracking number to see the latest status and estimated
              delivery date.
            </p>
          </div>
          <form className='shipment-tracking__form' action='/track'>
            <label className='shipment-tracking__field'>
              <Hash size={20} />
              <Input
                name='ref'
                placeholder='Enter tracking number'
                aria-label='Enter tracking number'
              />
            </label>
            <Button type='submit'>
              <Search size={18} /> Track
            </Button>
          </form>
        </section>
      </section>

      <section className='industries'>
        <h2 className='text-h2 text-editorial-accent'>
          Trusted across industries
        </h2>
        <p className='site-body'>
          Different cargo, different requirements — the same dependable
          handling.
        </p>
        <div className='industries__grid'>
          {[
            [
              assets.industry1,
              'Automotive',
              'Ensure your tracking number to see the latest status and estimated delivery date.',
            ],
            [
              assets.industry2,
              'Retail',
              'Fast and reliable delivery of consumer goods to stores and customers.',
            ],
            [
              assets.industry3,
              'Food',
              'Temperature-controlled logistics for perishable goods and ingredients.',
            ],
            [
              assets.industry4,
              'Hardware',
              'Specialized handling for heavy machinery and sensitive electronic equipment.',
            ],
          ].map(([image, title, copy]) => (
            <article className='industries__item' key={title}>
              <Image src={ image } alt={ title} fill />
              <div className='industries__item-copy'>
                <strong className='text-card-title text-white'>{title}</strong>
                <span className='site-body text-white/70'>{copy}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className='testimonials'
        style={{ backgroundImage: `url(${assets.pattern})` }}
      >
        <TestimonialCarousel />
      </section>
      <HomeFooter />
    </main>
  );
}

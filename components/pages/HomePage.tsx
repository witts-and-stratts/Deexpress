'use client';

import { GlobalCoverage } from '@/components/GlobalCoverage';
import { TrackingWidget } from '@/components/TrackingWidget';
import { Reveal } from '@/components/motion/Motion';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLang, type Lang } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AnimatedText from '../AnimatedText';
import { cn } from '@/lib/utils';
import { ResponsiveImage } from '../ResponsiveImage';
import { JourneyShowcaseImage } from '../ServiceJourneyShowcase';

const MotionLink = motion.create(Link);

const assets = {
  responsiveImages: {
    hero: { src: '/images/home-hero.webp', portrait: '/images/home-hero.webp' },
    logo: '/images/logo.webp',
    footerLogo: '/images/footer-logo.webp',
    air: {
      src: '/images/air-freight-hero.webp',
      portrait: '/images/air-freight-hero-portrait.webp',
    },
    sea: { src: '/images/port.webp', portrait: '/images/port-portrait.webp' },
    vehicle: {
      src: '/images/vehicle-showcase-loading.webp',
      portrait: '/images/vehicle-showcase-loading-portrait.webp',
    },
    cargo: {
      src: '/images/service-cargo.webp',
      portrait: '/images/truck-unloading-middle-commercial-dock-portrait.webp',
    },
    personal: {
      src: '/images/personal-effect-shipping.webp',
      portrait: '/images/personal-effect-shipping-portrait.webp',
    },
    storage: {
      src: '/images/storage-showcase-warehouse.webp',
      portrait: '/images/storage-showcase-warehouse-portrait.webp',
    },
    sourcing: {
      src: '/images/service-sourcing.webp',
      portrait: '/images/service-sourcing-portrait.webp',
    },
  } satisfies {
    hero: { src: string; portrait: string };
    logo: string;
    footerLogo: string;
    air: { src: string; portrait: string };
    sea: { src: string; portrait: string };
    vehicle: { src: string; portrait: string };
    cargo: { src: string; portrait: string };
    personal: { src: string; portrait: string };
    storage: { src: string; portrait: string };
    sourcing: { src: string; portrait: string };
  },
  plane: '/images/plane.webp',
  ship: '/images/ship.webp',
  train: '/images/train.webp',
  truck: '/images/truck.webp',
  car: '/images/car.webp',
  coverage: '/images/coverage.webp',
  industry1: '/images/industry1.webp',
  industry2: '/images/industry2.webp',
  industry3: '/images/industry3.webp',
  industry4: '/images/industry4.webp',
  pattern: '/images/wavy-background.svg',
  globeIcon: '/images/icons/globe.svg',
  multimodalIcon: '/images/icons/multi-modal.svg',
  regionsIcon: '/images/icons/regions.svg',
};

const preferenceStats = [
  {
    value: '26+',
    label: 'Destinations across Africa & the Middle East',
    icon: assets.globeIcon,
  },
  {
    value: '4',
    label: 'Multi-modal shipping methods',
    icon: assets.multimodalIcon,
  },
  {
    value: '3',
    label: 'Regions served',
    icon: assets.regionsIcon,
  },
] as const;

const services = [
  [
    'Air freight',
    assets.responsiveImages.air,
    'Time-sensitive shipments, coordinated from collection to arrival.',
  ],
  [
    'Sea freight',
    assets.responsiveImages.sea,
    'Cost-effective ocean freight for larger loads and long-distance routes.',
  ],
  [
    'Vehicle sourcing & shipping',
    assets.responsiveImages.vehicle,
    'From finding a vehicle in Europe to international shipping, coordinated through one team.',
  ],
  [
    'Commercial cargo',
    assets.responsiveImages.cargo,
    'Freight planned around your business requirements and destination.',
  ],
  [
    'Personal effects shipping',
    assets.responsiveImages.personal,
    'Careful coordination for the belongings that move with you.',
  ],
  [
    'Storage & warehousing',
    assets.responsiveImages.storage,
    'Secure storage connected to the next stage of your shipment.',
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
        <Image src={flag} alt='' width={20} height={20} />{' '}
        <span>{language}</span> <ChevronDown size={12} aria-hidden='true' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='language-menu'>
        <DropdownMenuItem
          onClick={() => selectLanguage('de')}
          className='language-menu__item'
        >
          <Image src='/flags/de.svg' alt='' width={20} height={20} /> Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => selectLanguage('en')}
          className='language-menu__item'
        >
          <Image src='/flags/gb.svg' alt='' width={20} height={20} /> English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    let previousScroll = Math.max(0, window.scrollY);
    let downwardTravel = 0;
    header.dataset.scrollHidden = 'false';

    const updateSurface = () => {
      frame = 0;
      // Clamp elastic overscroll so bouncing at either end cannot flip direction.
      const scroll = Math.max(
        0,
        Math.min(
          window.scrollY,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      const delta = scroll - previousScroll;
      previousScroll = scroll;
      if (scroll <= header.offsetHeight + 16 || delta < 0) {
        header.dataset.scrollHidden = 'false';
        downwardTravel = 0;
      } else if (delta > 0) {
        downwardTravel += delta;
        if (downwardTravel >= 8) header.dataset.scrollHidden = 'true';
      }
      const controls = header.querySelector<HTMLElement>(
        window.matchMedia('(min-width: 768px)').matches
          ? '.site-nav__links'
          : '.site-nav__toggle',
      );
      const bounds = (controls ?? header).getBoundingClientRect();
      const headerBounds = header.getBoundingClientRect();
      const headerStyle = getComputedStyle(header);
      // Keep sampling the resting position even while the header slides offscreen.
      const sampleY =
        bounds.top -
        headerBounds.top +
        bounds.height / 2 +
        (parseFloat(headerStyle.top) || 0) +
        (parseFloat(headerStyle.marginTop) || 0);
      // Sample beneath the controls, excluding the fixed navigation itself.
      const surface = document
        .elementsFromPoint(bounds.left + bounds.width / 2, sampleY)
        .find(
          (element) =>
            !header.contains(element) &&
            !element.closest('.site-nav-mobile') &&
            element.closest('main, footer'),
        );
      header.dataset.surface = surface
        ? getComputedStyle(surface)
            .getPropertyValue('--header-surface')
            .trim() || 'light'
        : 'light';
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateSurface);
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className={`site-nav${open ? ' site-nav--open' : ''}`}
      >
        <Link className='site-nav__brand' href='/' aria-label='DEexpress home'>
          <Image
            src={assets.responsiveImages.logo}
            alt='DEexpress'
            width={102}
            height={56}
          />
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
            animate={
              open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
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
              Services
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
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'site-nav__quote rounded-full bg-transparent backdrop-blur-3xl border font-medium',
              )}
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
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 },
                },
              }}
            >
              {[
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
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
                  transition: {
                    duration: 0.4,
                    delay: 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  },
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
                className={buttonVariants({
                  variant: 'default',
                  size: 'default',
                })}
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
  const { t } = useLang();
  const serviceLinks = [
    {
      href: '/services/air-freight',
      label: t.services.details['air-freight'].title,
    },
    {
      href: '/services/sea-freight',
      label: t.services.details['sea-freight'].title,
    },
    {
      href: '/services/vehicle-shipping',
      label: t.services.details['vehicle-shipping'].title,
    },
    {
      href: '/services/commercial-cargo',
      label: t.services.details['commercial-cargo'].title,
    },
    {
      href: '/services/personal-effects',
      label: t.services.details['personal-effects'].title,
    },
    {
      href: '/services/vehicle-sourcing',
      label: t.services.details['vehicle-sourcing'].title,
    },
    { href: '/services/storage', label: t.services.details.storage.title },
  ];

  return (
    <footer className='site-footer'>
      <div className='site-footer__main'>
        <div className='site-footer__brand'>
          <Image
            src={assets.responsiveImages.footerLogo}
            alt='DEexpress'
            width={200}
            height={200}
          />
        </div>
        <div className='site-footer__column'>
          <b>{t.footer.colServices}</b>
          {serviceLinks.map((service) => (
            <Link href={service.href} key={service.href}>
              {service.label}
            </Link>
          ))}
        </div>
        <div className='site-footer__column'>
          <b>{t.footer.colCompany}</b>
          <Link href='/about'>{t.nav.about}</Link>
          <Link href='/destinations'>{t.nav.destinations}</Link>
          <Link href='/track'>{t.common.trackShipment}</Link>
          <Link href='/quote'>{t.common.getQuote}</Link>
          <Link href='/contact'>{t.nav.contact}</Link>
        </div>
        <div className='site-footer__column site-footer__contact'>
          <b>{t.footer.colContact}</b>
          <div>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href='tel:+4915229939834'>+49 152 29939834</a>
          </div>
          <div>
            <span>
              {SITE.street}, {SITE.city}, {SITE.country}
            </span>
            <small>{SITE.hours}</small>
          </div>
        </div>
      </div>
      <div className='site-footer__utility'>
        <LanguageSelector footer />
      </div>
      <div className='site-footer__bottom'>
        <div>
          <Link href='/legal-notice'>{t.footer.legalNotice}</Link>
          <Link href='/data-policy'>{t.footer.dataPolicy}</Link>
        </div>
        <span>
          © 2026 {SITE.legalName}. {t.footer.rights}
        </span>
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
  image: JourneyShowcaseImage;
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
      style={{
        opacity: index === 0 ? 1 : opacity,
        scale: reduceMotion ? 1 : scale,
        willChange: 'opacity, transform',
      }}
    >
      <picture className='absolute inset-0'>
        {typeof image === 'object' && image.portrait ? (
          <source media='(orientation: portrait)' srcSet={image.portrait} />
        ) : null}
        <Image
          src={typeof image === 'string' ? image : image.src}
          alt=''
          fill
          sizes='100vw'
          loading='eager'
          className='service-showcase__image'
          style={{ opacity: 1 }}
        />
      </picture>
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
          <span>Global shipping.</span>
          <span className='opacity-70 g'> For every cargo</span>
        </h2>
        {services.map(([, image], index) => (
          <ShowcaseImage
            key={image.src}
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
          <Image src={image} alt='' width={160} height={48} />
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
              className='rounded-full bg-white'
            >
              <ArrowLeft strokeWidth={1} />
            </Button>
            <Button
              variant='secondary'
              size='icon'
              type='button'
              onClick={() => splideRef.current?.splide.go('>')}
              aria-label='Next testimonial'
              className='rounded-full bg-white'
            >
              <ArrowRight strokeWidth={1} />
            </Button>
          </div>
          <div
            className='testimonials__indicators'
            aria-label={`Testimonial ${activeSlide + 1} of 3`}
          >
            {/* {[0, 1, 2].map((index) => (
              <Button
                key={index}
                variant='ghost'
                className={cn(activeSlide === index ? 'is-active' : '', 'rounded-full h-2 min-h-1! scale-50 w-10',)}
                type='button'
                onClick={() => splideRef.current?.splide.go(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))} */}
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
        <ResponsiveImage
          aria-hidden
          src={assets.responsiveImages.hero.src}
          portraitSrc={assets.responsiveImages.hero.portrait}
          className='absolute inset-0 bg-cover bg-center'
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
          <span className='text-gray-500'>
            helping individuals and businesses move internationally with greater
            clarity and control.
          </span>
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
        <ul className='preference__stats' aria-label='DEExpress coverage at a glance'>
          {preferenceStats.map(({ value, label, icon }, index) => (
            <li className='preference__stat' key={label}>
              <Image src={ icon } alt='' width={ 200 } height={ 100 } className={ index === 0 ? 'h-12 mt-0': '' } />
              <strong>{value}</strong>
              <span>{label}</span>
            </li>
          ))}
        </ul>
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
            ['10M+', 'Total packages shipped'],
            ['<2 Hr', 'Time to issue resolution'],
            ['75%', 'Cost reduction'],
            ['67', 'Port deliveries per month'],
          ].map(([value, label]) => (
            <div className='trust__item' key={label}>
              <strong className='text-metric'>{value}</strong>
              <span className='text-label'>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className='shipment-tracking'>
        <Reveal className='shipment-tracking__panel'>
          <TrackingWidget />
        </Reveal>
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
              <Image src={image} alt={title} fill />
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

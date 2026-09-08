'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Truck } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import Parallax from '@/components/Parallax';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import {
  EditorialClosing,
  EditorialHero,
  EditorialProcess,
} from '@/components/pages/EditorialPage';
import { useLang } from '@/lib/i18n';
import type { ServiceSlug } from '@/lib/site';
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react';

const images: Record<ServiceSlug, string> = {
  'air-freight': '/images/air-freight-hero.webp',
  'sea-freight': '/images/sea-shipping.webp',
  'commercial-cargo':
    '/images/truck-unloading-middle-commercial-dock-portrait.webp',
  'vehicle-shipping': '/images/vehicle-showcase-loading.webp',
  'vehicle-sourcing': '/images/vehicle-showcase-loading.webp',
  'personal-effects': '/images/client-personal-effect-inventory.webp',
  storage: '/images/storage-showcase-warehouse.webp',
};

const processIcons = [
  '/images/icons/contact-phone.svg',
  '/images/icons/invoice.svg',
  '/images/icons/air-priority.svg',
  '/images/icons/cargo-plane.svg'
]

const shippingPartners = [
  {
    name: 'Mediterranean Shipping Company',
    src: '/images/partners/1200px-Mediterranean_Shipping_Company_logo.svg_.webp',
    width: 113,
    height: 100,
  },
  {
    name: 'Arkas Line',
    src: '/images/partners/arkas.webp',
    width: 290,
    height: 100,
  },
  {
    name: 'CMA CGM',
    src: '/images/partners/CMA_CGM.webp',
    width: 151,
    height: 100,
  },
  {
    name: 'Grimaldi Lines',
    src: '/images/partners/grimaldi-lines-logo.webp',
    width: 253,
    height: 100,
  },
  {
    name: 'Maersk',
    src: '/images/partners/Maersk_Group_Logo.svg_.webp',
    width: 436,
    height: 100,
  },
  {
    name: 'Sallaum Lines',
    src: '/images/partners/sallaum.webp',
    width: 246,
    height: 100,
  },
];

const serviceIndexVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.08,
    },
  },
};

const serviceIndexItemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ServicesPage() {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const pathways = t.services.pathways as {
    title: string;
    text: string;
    services: ServiceSlug[];
  }[];

  const ServiceDetailCard = ({
    slug,
    detail,
  }: {
    slug: ServiceSlug;
    detail: (typeof t.services.details)[ServiceSlug];
  }) => {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
      setHover(true);
    };

    const handleMouseLeave = () => {
      setHover(false);
    };

    return (
      <Link
        className='services-entry'
        href={`/services/${slug}`}
        key={slug}
        data-header-surface='dark'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='services-entry__image-layer'>
          <Parallax
            className='services-entry__parallax'
            // range={['-4%', '4%']}
            // disableOnMobile
          >
            <ResponsiveImage
              className='services-entry__image bg-cover bg-center'
              src={images[slug]}
              aria-hidden='true'
            />
          </Parallax>
        </div>
        <motion.div className='services-entry__copy'>
          <AnimatedText
            as='h3'
            className='text-h2 text-white'
            splitBy='words'
            trigger='inView'
            inViewOptions={{ once: true, amount: 0.55 }}
            initial={{ opacity: 0, y: 22 }}
            to={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            stagger={0.035}
          >
            {detail.title}
          </AnimatedText>
          {hover && (
            <>
              <AnimatePresence presenceAffectsLayout={true}>
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  layout
                >
                  <AnimatedText
                    transition={{
                      duration: 1,
                    }}
                    splitBy='words'
                  >
                    {detail.summary}
                  </AnimatedText>
                </motion.p>
              </AnimatePresence>
              <span className='editorial-link'>
                <ArrowUpRight size={40} strokeWidth={1} aria-hidden='true' />
              </span>
            </>
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <main className='editorial-page'>
      <EditorialHero
        title={ t.services.title }
        intro={ t.services.intro }
        image={ { src: '/images/container.webp', portraitSrc: '/images/container-portrait.webp' } }
        showShade={ false}
      />
      <motion.nav
        className='services-index'
        aria-label={t.services.eyebrow}
        variants={serviceIndexVariants}
        initial={reduceMotion ? false : 'hidden'}
        whileInView='visible'
        viewport={{ once: true, amount: 0.7 }}
      >
        {pathways.map((p, i) => (
          <motion.a
            key={p.title}
            href={`#service-group-${i}`}
            className='services-index__link group'
            variants={serviceIndexItemVariants}
          >
            {p.title}
            <ArrowUpRight
              size={24}
              strokeWidth={1}
              aria-hidden='true'
              className='services-index__arrow'
            />
          </motion.a>
        ))}
      </motion.nav>
      <div className='services-directory px-2'>
        {pathways.map((p, i) => (
          <section
            className='services-group'
            id={`service-group-${i}`}
            key={p.title}
            aria-labelledby={`service-heading-${i}`}
          >
            <div className='services-group__intro'>
              <Parallax speed={0.5}>
                <h2
                  className='text-h2 text-editorial-accent'
                  id={`service-heading-${i}`}
                >
                  <AnimatedText
                    splitBy='words'
                    trigger='inView'
                    inViewOptions={{ once: true, amount: 0.4 }}
                    initial={{ opacity: 0, y: 50 }}
                    to={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    stagger={0.1}
                  >
                    {p.title}
                  </AnimatedText>
                </h2>
              </Parallax>
              <AnimatedText splitBy='words' delay={0.2} trigger='inView'>
                <p className='site-lead'>{p.text}</p>
              </AnimatedText>
            </div>
            <div
              className={`services-group__list${p.services.length === 1 ? ' services-group__list--single' : ''}`}
            >
              {p.services.map((slug) => {
                const detail = t.services.details[slug];
                return (
                  <ServiceDetailCard detail={detail} slug={slug} key={slug} />
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <section
        className='services-partners editorial-section'
        aria-labelledby='shipping-partners'
      >
        <div className='editorial-section-heading'>
          <h2 id='shipping-partners' className='text-h2'>
            {t.services.partnersTitle}
          </h2>
          <p className='site-lead'>{t.services.partnersIntro}</p>
        </div>
        <div className='services-partners__rail'>
          <div className='services-partners__track'>
            {[false, true].map((isDuplicate) => (
              <ul
                className='services-partners__list'
                aria-hidden={isDuplicate || undefined}
                key={isDuplicate ? 'duplicate' : 'original'}
              >
                {shippingPartners.map((partner) => (
                  <li className='services-partners__item' key={partner.name}>
                    <Image
                      className='services-partners__logo'
                      src={partner.src}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>
      <EditorialProcess
        id='services-process'
        title={t.services.howTitle}
        intro={t.services.processIntro}
        items={ t.services.processSteps }
        processIcons={ processIcons }
        showJourney
      />
      <EditorialClosing destinations />
    </main>
  );
}

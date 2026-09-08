'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { ServiceJourneyShowcase } from '@/components/ServiceJourneyShowcase';
import {
  EditorialClosing,
  EditorialProcess,
} from '@/components/pages/EditorialPage';
import { useLang } from '@/lib/i18n';
import { CONTACT_PERSONS } from '@/lib/site';
import Image from 'next/image';
import AnimatedText from '../AnimatedText';
import Parallax from '../Parallax';
import { motion, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

const aboutImages = {
  hero: '/images/about/hero.webp',
  intro: '/images/about/intro.jpg',
  story: '/images/about/story.webp',
  vision: '/images/about/vision.webp',
  collage: [
    '/images/about/collage-1.webp',
    '/images/about/collage-3.webp',
    '/images/about/collage-2.webp',
  ],
  team: ['/images/about/team-micheal.webp', '/images/about/team-adedapo.webp'],
};

export function AboutPage() {
  const { t } = useLang();
  const aboutRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const collageContainer = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.08,
        staggerChildren: 0.16,
      },
    },
  };
  const collageItem = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 48,
      scale: reduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <main className='about editorial-page'>
      <section className='about__hero' data-header-surface='dark'>
        <ResponsiveImage
          aria-hidden
          className='absolute inset-0 bg-cover bg-center'
          src={aboutImages.hero}
        />
        <div className='about__hero-shade' />
        <div className='about__hero-copy'>
          <h1>{t.about.Title}</h1>
        </div>
      </section>
      <section
        className='about__intro'
        aria-label={t.about.intro}
        ref={aboutRef}
      >
        <div aria-hidden className='about__parcel' />
        <AnimatedText
          as='p'
          trigger='inView'
          splitBy={['words']}
          inViewOptions={{
            once: true,
          }}
          stagger={0.04}
          className='text-h3 max-w-[52ch]'
        >
          <Parallax
            speed={-1.2}
            from={{
              opacity: 20,
              y: 200,
            }}
          >
            {t.about.intro}
          </Parallax>
        </AnimatedText>
      </section>
      <section className='about__story' aria-labelledby='about-story'>
        <div className='about__story-copy'>
          <h2 id='about-story'>{t.about.storyTitle}</h2>
          <p className='about__story-lead'>{t.about.story[1]}</p>
          <p>{t.about.story[2]}</p>
          <Link className='about__outline-link' href='/destinations'>
            {t.common.exploreDestinations}
            <ArrowUpRight size={18} aria-hidden='true' />
          </Link>
        </div>
        <motion.div
          className='about__story-person-wrap'
          initial={{
            y: '40%',
          }}
          whileInView={{
            y: '0%',
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
            margin: '100px',
            // root: aboutRef,
          }}
        >
          <Image
            aria-hidden='true'
            alt=''
            width={1600}
            height={1600}
            className='about__story-person'
            src={aboutImages.story}
          />
        </motion.div>
      </section>
      <section className='about__mission' aria-labelledby='about-mission'>
        <AnimatedText as='p'
          from={ {
            opacity: 0,
            y: '10%'
          } }
          transition={ {
            duration: 1
          } }
          stagger={0.04}
          splitBy={'words'}
          trigger='inView'
          inViewOptions={ { once: true } }
        >
          {t.about.mission}
        </AnimatedText>
        <motion.div
          className='about__collage'
          aria-hidden='true'
          variants={collageContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.25 }}
        >
          {aboutImages.collage.map((image) => (
            <motion.div
              className='about__collage-item'
              key={image}
              variants={collageItem}
            >
              <Image
                src={image}
                alt=''
                width={1500}
                height={1500}
                className='about__collage-image'
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className='about__vision' data-header-surface='dark'>
        <ServiceJourneyShowcase
          scenes={[{ title: t.about.visionTitle, text: t.about.vision }]}
          images={[aboutImages.vision]}
          label={t.about.visionTitle}
          showNumbers={false}
        />
      </section>
      <EditorialProcess
        id='about-values'
        title={t.about.valuesTitle}
        items={t.about.values}
      />
      <section className='about__leadership' aria-labelledby='about-leadership'>
        <div className='about__leadership-heading'>
          <h2 id='about-leadership'>{t.about.leadershipTitle}</h2>
          <p>{t.about.leadershipSub}</p>
        </div>
        <div className='about__people'>
          {CONTACT_PERSONS.slice(0, 2).map((person, index) => (
            <article className='about__person' key={person.name}>
              <Image
                src={aboutImages.team[index]}
                alt={person.name}
                width={800}
                height={800}
              />
              <div>
                <h3>{person.name}</h3>
                <p>{t.about.managingDirector}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <EditorialClosing />
    </main>
  );
}

'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react';
import type { ServiceStory } from '@/lib/service-content';
import AnimatedText from './AnimatedText';

export type JourneyShowcaseImage =
  | string
  | {
      src: string;
      portrait?: string;
    };

const copyVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.2, 0, 0, 1],
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const copyItemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.2, 0, 0, 1] },
  },
};

function JourneyImage({
  image,
  index,
  sceneCount,
  imageCount,
  progress,
  reduceMotion,
}: {
  image: JourneyShowcaseImage;
  index: number;
  sceneCount: number;
  imageCount: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const src = typeof image === 'string' ? image : image.src;
  const portraitImage = typeof image === 'string' ? undefined : image.portrait;
  const scrollSteps = Math.max(1, sceneCount - 1);
  const start = index === 0 ? 0 : Math.max(0, (index - 0.5) / scrollSteps);
  const end = Math.min(1, start + 0.35 / scrollSteps);
  const nextEnd = (index + 0.85) / scrollSteps;
  const opacity = useTransform(() => {
    const value = progress.get();
    // Retire a covered image so only adjacent scenes can blend, in either direction.
    if (index < imageCount - 1 && value >= nextEnd) return 0;
    return index === 0
      ? 1
      : Math.max(0, Math.min(1, (value - start) / (end - start)));
  });
  const scale = useTransform(progress, [start, end], [1.06, 1]);

  return (
    <motion.div
      className='absolute inset-0'
      style={{
        opacity,
        scale: reduceMotion ? 1 : scale,
        willChange: 'opacity, transform',
      }}
    >
      <picture className='absolute inset-0'>
        {portraitImage ? (
          <source media='(orientation: portrait)' srcSet={portraitImage} />
        ) : null}
        <Image
          src={src}
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

export function ServiceJourneyShowcase({
  scenes,
  images,
  portraitImages,
  label,
  heading,
  showNumbers = true,
}: {
  scenes: ServiceStory['scenes'];
  images: JourneyShowcaseImage[];
  /** Optional portrait alternatives matched to the corresponding landscape image. */
  portraitImages?: string[];
  label: string;
  heading?: string;
  showNumbers?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className='service-showcase service-story__showcase'
      aria-label={label}
    >
      <div className='service-showcase__visual'>
        {heading ? (
          <h2 className='service-showcase__heading text-white/70'>{heading}</h2>
        ) : null}
        {images.map((image, index) => {
          const portraitImage = portraitImages?.[index];
          const responsiveImage =
            typeof image === 'string'
              ? portraitImage
                ? { src: image, portrait: portraitImage }
                : image
              : {
                  ...image,
                  portrait: image.portrait ?? portraitImage,
                };

          return (
            <JourneyImage
              key={typeof image === 'string' ? image : image.src}
              image={responsiveImage}
              index={index}
              sceneCount={scenes.length}
              imageCount={images.length}
              progress={scrollYProgress}
              reduceMotion={reduceMotion}
            />
          );
        })}
      </div>
      <div className='service-showcase__panels'>
        {scenes.map((scene, index) => (
          <article key={scene.title} className='service-showcase__panel'>
            <motion.div
              className='service-showcase__copy service-story__showcase-copy'
              variants={copyVariants}
              initial={reduceMotion ? false : 'hidden'}
              whileInView='visible'
              viewport={{ once: true, amount: 0.45 }}
            >
              {showNumbers ? (
                <motion.span variants={copyItemVariants}>
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
              ) : null}
              <AnimatedText
                from={ {
                  opacity: 0,
                }}
                trigger='inView'
              >
                <h2>{scene.title}</h2>
              </AnimatedText>
              <AnimatedText trigger='inView' splitBy='words' delay={0.5}>
                <p>{scene.text}</p>
              </AnimatedText>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  );
}

'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react'
import type { ServiceStory } from '@/lib/service-stories'

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
}

const copyItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.2, 0, 0, 1] },
  },
}

function JourneyImage({
  image,
  index,
  sceneCount,
  progress,
  reduceMotion,
}: {
  image: string
  index: number
  sceneCount: number
  progress: MotionValue<number>
  reduceMotion: boolean | null
}) {
  const scrollSteps = Math.max(1, sceneCount - 1)
  const start = index === 0 ? 0 : Math.max(0, (index - 0.5) / scrollSteps)
  const end = Math.min(1, start + 0.35 / scrollSteps)
  const opacity = useTransform(progress, [start, end], [0, 1])
  const scale = useTransform(progress, [start, end], [1.06, 1])

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity: index === 0 ? 1 : opacity, scale: reduceMotion ? 1 : scale, willChange: 'opacity, transform' }}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        className="service-showcase__image"
        style={{ opacity: 1 }}
      />
    </motion.div>
  )
}

export function ServiceJourneyShowcase({ scenes, images, label, heading, showNumbers = true }: { scenes: ServiceStory['scenes']; images: string[]; label: string; heading?: string; showNumbers?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={sectionRef} className="service-showcase service-story__showcase" aria-label={label}>
      <div className="service-showcase__visual">
        {heading ? <h2 className="service-showcase__heading">{heading}</h2> : null}
        {images.map((image, index) => (
          <JourneyImage
            key={image}
            image={image}
            index={index}
            sceneCount={scenes.length}
            progress={scrollYProgress}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
      <div className="service-showcase__panels">
        {scenes.map((scene, index) => (
          <article key={scene.title} className="service-showcase__panel">
            <motion.div
              className="service-showcase__copy service-story__showcase-copy"
              variants={copyVariants}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
            >
              {showNumbers ? <motion.span variants={copyItemVariants}>{String(index + 1).padStart(2, '0')}</motion.span> : null}
              <motion.h2 variants={copyItemVariants}>{scene.title}</motion.h2>
              <motion.p variants={copyItemVariants}>{scene.text}</motion.p>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  )
}

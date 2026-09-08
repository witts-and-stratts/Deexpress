'use client';

import { ResponsiveImage } from '@/components/ResponsiveImage';
import { useLang } from '@/lib/i18n';
import { cn } from 'cn';
import {
    ArrowUpRight,
    ClipboardPenLine,
    FileCheck2,
    PackageCheck,
    Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export type ProcessIcon = LucideIcon | StaticImageData | string;

const defaultProcessIcons: ProcessIcon[] = [
  ClipboardPenLine,
  FileCheck2,
  PackageCheck,
  Truck,
];

function isProcessImage(icon: ProcessIcon): icon is StaticImageData | string {
  return typeof icon === 'string' || (typeof icon === 'object' && 'src' in icon);
}

export function EditorialHero({
  title,
  intro,
  image,
  headingId,
  className = '',
  headingClassName = '',
  introClassName = '',
  header,
  showShade=true
}: {
  title: string;
  intro: string;
  image: string | { src: string; portraitSrc?: string };
  headingId?: string;
  className?: string;
  headingClassName?: string;
  introClassName?: string;
  header?: ReactNode;
  showShade?: boolean;
}) {
  return (
    <section
      className={`contact-page__hero editorial-hero max-md:min-h-screen ${className}`}
      aria-labelledby={headingId}
    >
      <ResponsiveImage
        className='absolute inset-0 bg-cover bg-center'
        src={typeof image === 'string' ? image : image.src}
        portraitSrc={typeof image === 'object' ? image.portraitSrc : undefined}
        aria-hidden='true'
      />
      {header}
      <div className={ cn( 'contact-page__hero-shade', {'opacity-50': !showShade})} />
      <div className='contact-page__hero-content'>
        <h1 id={headingId} className={`text-h1 text-white ${headingClassName}`}>
          {title}
        </h1>
        <p className={`site-lead text-white ${introClassName}`}>{intro}</p>
      </div>
    </section>
  );
}

export function EditorialClosing({
  destinations = false,
}: {
  destinations?: boolean;
}) {
  const { t } = useLang();
  return (
    <section
      className='editorial-section editorial-closing'
      data-header-surface='dark'
    >
      <div>
        <h2 className='text-h2 text-white'>{t.home.ctaTitle}</h2>
        <p className='site-lead text-white/85'>{t.home.ctaText}</p>
      </div>
      <div className='editorial-closing__actions'>
        <Link href='/quote'>
          {t.common.getQuote}
          <ArrowUpRight size={20} aria-hidden='true' />
        </Link>
        <Link href={destinations ? '/destinations' : '/contact'}>
          {destinations ? t.common.exploreDestinations : t.common.contactTeam}
          <ArrowUpRight size={20} aria-hidden='true' />
        </Link>
      </div>
    </section>
  );
}

export function EditorialProcess({
  title,
  intro,
  items,
  id = 'editorial-process',
  showJourney = false,
  processIcons = defaultProcessIcons,
}: {
  title: string;
  intro?: string;
  items: { title: string; text: string }[];
  id?: string;
  showJourney?: boolean;
  processIcons?: ProcessIcon[];
}) {
  const icons = processIcons.length > 0 ? processIcons : defaultProcessIcons;

  return (
    <section
      className={`editorial-section editorial-process${showJourney ? ' editorial-process--journey' : ''}`}
      data-header-surface='dark'
      aria-labelledby={id}
    >
      <div className='editorial-process__heading'>
        <h2 id={id}>{title}</h2>
        {intro ? <p className='site-lead text-white/70'>{intro}</p> : null}
      </div>
      <ol>
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];

          return (
            <li className='editorial-process__step' key={ item.title }>
            {showJourney ? (
              <div className='editorial-process__step-meta'>
                <span className='editorial-process__number'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='editorial-process__icon'>
                  {isProcessImage(Icon) ? (
                    <Image
                      src={Icon}
                      alt=''
                      width={22}
                      height={22}
                      className='size-11 object-contain'
                    />
                  ) : (
                    <Icon size={22} strokeWidth={1.5} aria-hidden='true' />
                  )}
                </span>
              </div>
            ) : null}
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
          );
        })}
      </ol>
    </section>
  );
}

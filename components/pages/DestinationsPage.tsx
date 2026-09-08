'use client';

import { Reveal } from '@/components/Reveal';
import { GlobalCoverage } from '@/components/GlobalCoverage';
import { useLang } from '@/lib/i18n';
import { REGIONS } from '@/lib/site';
import {
  BtnLink,
  Eyebrow,
  PageHero,
  container,
  section,
  sectionHeadTitle,
  sectionSm,
} from '@/components/ui';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const ctaPanel =
  'relative overflow-hidden rounded-3xl bg-linear-to-br from-navy-900 to-royal-600 p-10 text-white sm:p-16 lg:p-20';
const ctaGlow =
  'absolute inset-0 bg-[radial-gradient(520px_320px_at_88%_20%,rgba(255,122,26,0.35),transparent_60%),radial-gradient(420px_300px_at_8%_100%,rgba(255,255,255,0.12),transparent_60%)]';

export function DestinationsPage() {
  const { t } = useLang();
  return (
    <main>
      <GlobalCoverage
        subtitle={t.destinations.title}
        searchable
        className='coverage--destinations'
      />

      <section className='tracking-page__support mt-10'>
        <p className='text-h3 text-white'>{t.track.supportTitle}</p>
        <div className='tracking-page__support-actions'>
          <Link href='/contact'>
            {t.track.supportContact} <ArrowUpRight size={18} aria-hidden='true' />
          </Link>
          <Link href='/quote'>
            {t.track.supportQuote} <ArrowUpRight size={18} aria-hidden='true' />
          </Link>
        </div>
      </section>
    </main>
  );
}

'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  Clock3,
  Handshake,
  MessageCircle,
  Phone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';
import { EditorialHero } from '@/components/pages/EditorialPage';
import { SITE, WHATSAPP_URL } from '@/lib/site';
import { HomeFooter, HomeHeader } from '@/components/pages/HomePage';
import { useLang } from '@/lib/i18n';

export function ContactPage() {
  const { t } = useLang();
  const p = t.contact.page;

  const contactOptions: {
    title: string;
    value: string;
    href?: string;
    icon: LucideIcon;
    imageIcon?: string;
  }[] = [
    {
      title: p.options[0],
      value: '+49 (0)152 29939834',
      href: 'tel:+4915229939834',
      icon: Phone,
      imageIcon: '/images/icons/contact-phone.svg',
    },
    {
      title: p.options[1],
      value: '+49 (0)176 87132767',
      href: 'tel:+4917687132767',
      icon: Handshake,
      imageIcon: '/images/icons/contact-phone.svg',
    },
    {
      title: p.options[2],
      value: '+49 (0)152 29939834',
      href: WHATSAPP_URL,
      icon: MessageCircle,
      imageIcon: '/images/icons/contact-whatsapp.svg',
    },
    {
      title: p.options[3],
      value: p.officeHoursValue,
      icon: Clock3,
      imageIcon: '/images/icons/contact-hours.svg',
    },
  ];

  return (
    <main className='contact-page'>
      <EditorialHero
        headingId='contact-title'
        title={p.heroTitle}
        intro={p.heroIntro}
        image='/images/contact/hero.webp'
        header={<HomeHeader />}
      />

      <section
        className='contact-page__options'
        aria-labelledby='contact-options-title'
      >
        <div className='contact-page__options-intro pb-40'>
          <h2 id='contact-options-title' className='text-h3'>
            {p.optionsTitle}
          </h2>
          <p className='site-lead'>{p.shippingRequestTitle}</p>
          <div>
            <span>
              {p.shippingRequestText}
            </span>
            <Link
              href='/quote'
              className='flex gap-2 text-editorial-accent mt-8'
            >
              {p.shippingRequestLink}{' '}
              <ArrowUpRight size={18} aria-hidden='true' className='mt-1' />
            </Link>
          </div>
        </div>
        <div className='contact-page__option-grid'>
          {contactOptions.map(
            ({ title, value, href, icon: Icon, imageIcon }) => (
              <article key={title} className='contact-page__option'>
                {imageIcon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className='contact-page__option-icon'
                    src={imageIcon}
                    alt=''
                    aria-hidden='true'
                  />
                ) : (
                  <Icon
                    className='contact-page__option-icon'
                    size={42}
                    strokeWidth={1.15}
                    aria-hidden='true'
                  />
                )}
                <p>{title}</p>
                {href ? (
                  <a
                    href={href}
                    target={href === WHATSAPP_URL ? '_blank' : undefined}
                    rel={
                      href === WHATSAPP_URL ? 'noopener noreferrer' : undefined
                    }
                    className='text-xl'
                  >
                    {value}
                  </a>
                ) : (
                  <strong className='text-xl'>{value}</strong>
                )}
              </article>
            ),
          )}
        </div>
      </section>

      <section
        className='contact-page__form-section'
        aria-labelledby='contact-form-title'
      >
        <div className='contact-page__form-copy'>
          <h2 id='contact-form-title' className='text-h2'>
            {p.businessTitle}
          </h2>
          <p>
            {p.businessText}{' '}
            <strong>
              {p.businessEmphasis}
            </strong>
          </p>
          <p>{p.responseTime}</p>
        </div>
        <div className='contact-page__form'>
          <InquiryForm kind='contact' />
        </div>
      </section>

      <section
        className='contact-page__location'
        aria-labelledby='find-us-title'
      >
        <div>
          <h2 id='find-us-title' className='text-h3'>
            {p.locationTitle}
          </h2>
          <address>
            {SITE.legalName}
            <br />
            {SITE.street}
            <br />
            {SITE.city}, {SITE.country}
          </address>
        </div>
        <div
          className='contact-page__map'
          role='img'
          aria-label={p.mapLabel}
        />
      </section>
      <HomeFooter />
    </main>
  );
}

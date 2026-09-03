'use client'

import Link from 'next/link'
import { ArrowUpRight, Clock3, MessageCircle, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { InquiryForm } from '@/components/InquiryForm'
import { SITE, WHATSAPP_URL } from '@/lib/site'
import { HomeFooter, HomeHeader } from '@/components/pages/HomePage'

const contactOptions: { title: string; value: string; href?: string; icon: LucideIcon }[] = [
  { title: 'Hotline for shipment, tracking and other urgent information', value: '+49 (0)152 29939834', href: 'tel:+4915229939834', icon: Phone },
  { title: 'Partnerships, vehicle procurement and sourcing', value: '+49 (0)152 29939834', href: 'tel:+4915229939834', icon: Phone },
  { title: 'Instant customer support via call or WhatsApp message', value: '+49 221 98232-601', href: WHATSAPP_URL, icon: MessageCircle },
  { title: 'Office hours', value: 'Mon – Fri · 9:00 – 17:00', icon: Clock3 },
]

export function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-page__hero" aria-labelledby="contact-title">
        <HomeHeader />
        <div className="contact-page__hero-shade" />
        <div className="contact-page__hero-content">
          <h1 id="contact-title" className="text-h1">Talk to us</h1>
          <p className="site-lead">Whether you need a custom freight quote, shipment updates, or want to discuss a partnership—our teams in Berlin and across Africa are here to assist.</p>
        </div>
      </section>

      <section className="contact-page__options" aria-labelledby="contact-options-title">
        <div className="contact-page__options-intro">
          <h2 id="contact-options-title" className="text-h3">Contact Options</h2>
          <p className="site-lead">Shipping Request</p>
          <div>
            <span>For shipping request, please use our special shipping request form. This gives us all the necessary details to offer you a tailor-made solution.</span>
            <Link href="/quote">Shipping request form <ArrowUpRight size={13} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="contact-page__option-grid">
          {contactOptions.map(({ title, value, href, icon: Icon }) => (
            <article key={title} className="contact-page__option">
              <Icon size={42} strokeWidth={1.15} aria-hidden="true" />
              <p>{title}</p>
              {href ? <a href={href} target={href === WHATSAPP_URL ? '_blank' : undefined} rel={href === WHATSAPP_URL ? 'noopener noreferrer' : undefined}>{value}</a> : <strong>{value}</strong>}
            </article>
          ))}
        </div>
      </section>

      <section className="contact-page__form-section" aria-labelledby="contact-form-title">
        <div className="contact-page__form-copy">
          <h2 id="contact-form-title" className="text-h2">How can we assist your business?</h2>
          <p>Tell us what you need and we’ll get back to you with a tailored solution. <strong>Whether you need a freight quote, shipment updates, or want to discuss a partnership — our team is here to help.</strong></p>
          <p>We typically respond within 2 business hours.</p>
        </div>
        <div className="contact-page__form"><InquiryForm kind="contact" /></div>
      </section>

      <section className="contact-page__location" aria-labelledby="find-us-title">
        <div>
          <h2 id="find-us-title" className="text-h3">Find us in Berlin</h2>
          <address>{SITE.legalName}<br />{SITE.street}<br />{SITE.city}, {SITE.country}</address>
        </div>
        <div className="contact-page__map" role="img" aria-label="Map showing the Berlin office location" />
      </section>
      <HomeFooter />
    </main>
  )
}

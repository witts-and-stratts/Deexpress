import { Phone, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { CONTACT_PERSONS } from '@/lib/site'

export function ServiceContact({ title, text, callLabel, quoteHref, quoteLabel, variant = 'default' }: { title: string; text: string; callLabel: string; quoteHref: string; quoteLabel: string; variant?: 'default' | 'air-freight' }) {
  const contact = CONTACT_PERSONS[0]

  if (variant === 'air-freight') {
    return (
      <section className="service-contact service-contact--air-freight">
        <div className="service-contact__air-copy"><h2>{title}</h2><p>{text}</p></div>
        <img className="service-contact__air-portrait" src="/images/air-contact-micheal.webp" alt={contact.name} />
        <div className="service-contact__air-person">
          <strong>{contact.name}</strong>
          <span>{contact.languages}</span>
          <div className="service-contact__air-actions">
            <a href={contact.phoneHref}><img src="/images/icons/air-contact-phone.svg" alt="" aria-hidden="true" /> {callLabel}</a>
            <Link href={quoteHref}>{quoteLabel}<img src="/images/icons/air-contact-arrow.svg" alt="" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="service-contact">
      <div className="service-contact__portrait" style={{ backgroundImage: `url(${contact.photo})` }} aria-hidden="true" />
      <div className="service-contact__copy">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="service-contact__person">
          <strong>{contact.name}</strong>
          <span>{contact.languages}</span>
        </div>
        <div className="service-contact__actions">
          <a href={contact.phoneHref}><Phone size={17} aria-hidden="true" /> {callLabel}</a>
          <Link href={quoteHref}>{quoteLabel} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}

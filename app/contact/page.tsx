import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: 'Contact DEExpress Logistics GmbH in Berlin — by form, phone, email or WhatsApp. We answer in English, German and French.',
  pathname: '/contact',
})

export default function Page() {
  return <ContactPage />
}

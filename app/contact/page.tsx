import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact DEExpress Logistics GmbH in Berlin — by form, phone, email or WhatsApp. We answer in English, German and French.',
}

export default function Page() {
  return <ContactPage />
}

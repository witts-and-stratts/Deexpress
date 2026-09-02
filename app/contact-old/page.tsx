import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Contact (previous design)',
  robots: { index: false, follow: false },
}

export default function ContactOldPage() {
  return <ContactPage />
}

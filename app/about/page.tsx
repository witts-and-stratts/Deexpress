import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About us',
  description: 'DEexpress Logistics GmbH — a Berlin-based international logistics and freight forwarding company serving Europe, Africa and the Middle East.',
}

export default function Page() {
  return <AboutPage />
}

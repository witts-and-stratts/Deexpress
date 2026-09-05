import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'About us',
  description: 'DEexpress Logistics GmbH — a Berlin-based international logistics and freight forwarding company serving Europe, Africa and the Middle East.',
  pathname: '/about',
})

export default function Page() {
  return <AboutPage />
}

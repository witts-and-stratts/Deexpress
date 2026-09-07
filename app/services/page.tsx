import type { Metadata } from 'next'
import { ServicesPage } from '@/components/pages/ServicesPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description: 'Air freight, sea freight, vehicle sourcing and shipping, commercial cargo, personal effects and storage from Berlin to Africa and the Middle East.',
  pathname: '/services',
  image: '/images/service-cargo.webp',
})

export default function Page() {
  return <ServicesPage />
}

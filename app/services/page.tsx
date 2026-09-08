import type { Metadata } from 'next'
import { ServicesPage } from '@/components/pages/ServicesPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.services,
  pathname: '/services',
  image: '/images/service-cargo.webp',
})

export default function Page() {
  return <ServicesPage />
}

import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.contact,
  pathname: '/contact',
})

export default function Page() {
  return <ContactPage />
}

import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.about,
  pathname: '/about',
})

export default function Page() {
  return <AboutPage />
}

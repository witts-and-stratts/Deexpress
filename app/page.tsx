import type { Metadata } from 'next'
import { HomePage } from '@/components/pages/HomePage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.home,
  pathname: '/',
})

export default function Page() {
  return <HomePage />
}

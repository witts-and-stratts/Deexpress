import type { Metadata } from 'next'
import { StoragePage } from '@/components/pages/StoragePage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.storage,
  pathname: '/services/storage',
  image: '/images/blue-stacked-container.webp',
})
export default function Page() { return <StoragePage /> }

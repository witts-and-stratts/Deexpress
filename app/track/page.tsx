import type { Metadata } from 'next'
import { Suspense } from 'react'
import { TrackPage } from '@/components/pages/TrackPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.track,
  pathname: '/track',
})

export default function Page() {
  return (
    <Suspense>
      <TrackPage />
    </Suspense>
  )
}

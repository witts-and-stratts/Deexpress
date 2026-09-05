import type { Metadata } from 'next'
import { Suspense } from 'react'
import { TrackPage } from '@/components/pages/TrackPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Track shipment',
  description: 'Track your DEExpress shipment — enter your tracking reference to see the latest available status.',
  pathname: '/track',
})

export default function Page() {
  return (
    <Suspense>
      <TrackPage />
    </Suspense>
  )
}

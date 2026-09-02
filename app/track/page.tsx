import type { Metadata } from 'next'
import { Suspense } from 'react'
import { TrackPage } from '@/components/pages/TrackPage'

export const metadata: Metadata = {
  title: 'Track shipment',
  description: 'Track your DEExpress shipment — enter your tracking reference to see the latest available status.',
}

export default function Page() {
  return (
    <Suspense>
      <TrackPage />
    </Suspense>
  )
}

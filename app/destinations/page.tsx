import type { Metadata } from 'next'
import { DestinationsPage } from '@/components/pages/DestinationsPage'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Freight from Europe to 26 countries across Africa and destinations in the Middle East. Explore the regions DEExpress serves.',
}

export default function Page() {
  return <DestinationsPage />
}

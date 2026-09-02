import type { Metadata } from 'next'
import { ServicesPage } from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Air freight, sea freight, vehicle shipping, commercial cargo, personal effects, vehicle sourcing and storage from Berlin to Africa and the Middle East.',
}

export default function Page() {
  return <ServicesPage />
}

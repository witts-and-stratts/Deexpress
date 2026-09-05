import type { Metadata } from 'next'
import { StoragePage } from '@/components/pages/StoragePage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Storage and warehousing in Berlin',
  description: 'Flexible short- and long-term storage in Berlin, connected directly to your international shipping schedule.',
  pathname: '/services/storage',
  image: '/images/blue-stacked-container.jpg',
})
export default function Page() { return <StoragePage /> }

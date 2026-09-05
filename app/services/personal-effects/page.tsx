import type { Metadata } from 'next'
import { PersonalEffectsPage } from '@/components/pages/PersonalEffectsPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Personal effects shipping from Europe',
  description: 'Ship boxes, luggage and household goods from Europe with practical guidance and careful international freight coordination.',
  pathname: '/services/personal-effects',
  image: '/images/service-personal.webp',
})
export default function Page() { return <PersonalEffectsPage /> }

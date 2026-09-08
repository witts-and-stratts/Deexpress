import type { Metadata } from 'next'
import { PersonalEffectsPage } from '@/components/pages/PersonalEffectsPage'
import { pageMetadata } from '@/lib/seo'
import { metadataCopy } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
  ...metadataCopy.personalEffects,
  pathname: '/services/personal-effects',
  image: '/images/service-personal.webp',
})
export default function Page() { return <PersonalEffectsPage /> }

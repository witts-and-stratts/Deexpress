import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetailPage } from '@/components/pages/ServiceDetailPage'
import { SERVICES, type ServiceSlug } from '@/lib/site'

const TITLES: Record<ServiceSlug, string> = {
  'air-freight': 'Air freight',
  'sea-freight': 'Sea freight',
  'vehicle-shipping': 'Vehicle shipping',
  'commercial-cargo': 'Commercial cargo',
  'personal-effects': 'Personal effects',
  'vehicle-sourcing': 'Vehicle sourcing',
  storage: 'Storage & warehousing',
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (!(slug in TITLES)) return {}
  return { title: TITLES[slug as ServiceSlug] }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!(slug in TITLES)) notFound()
  return <ServiceDetailPage slug={slug as ServiceSlug} />
}

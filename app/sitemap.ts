import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

const routes = [
  { path: '', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/services/air-freight', priority: 0.8 },
  { path: '/services/sea-freight', priority: 0.8 },
  { path: '/services/vehicle-shipping', priority: 0.8 },
  { path: '/services/commercial-cargo', priority: 0.8 },
  { path: '/services/personal-effects', priority: 0.8 },
  { path: '/services/storage', priority: 0.8 },
  { path: '/destinations', priority: 0.8 },
  { path: '/about', priority: 0.6 },
  { path: '/contact', priority: 0.7 },
  { path: '/quote', priority: 0.7 },
  { path: '/track', priority: 0.5 },
  { path: '/legal-notice', priority: 0.2 },
  { path: '/data-policy', priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: 'monthly',
    priority,
  }))
}

import enScopes from '@/locales/en/services/scopes.json'
import deScopes from '@/locales/de/services/scopes.json'
import type { ServiceSlug } from '@/lib/site'

type ServiceScopes = typeof enScopes

const de: ServiceScopes = deScopes

export const SERVICE_SCOPES: Record<'en' | 'de', Record<ServiceSlug, ServiceScopes[ServiceSlug]>> = {
  en: enScopes,
  de,
}

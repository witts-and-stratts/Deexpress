import enPages from '@/locales/en/services/pages.json'
import dePages from '@/locales/de/services/pages.json'

type ServicePages = typeof enPages

const de: ServicePages = dePages

export const SERVICE_PAGES: Record<'en' | 'de', ServicePages> = {
  en: enPages,
  de,
}

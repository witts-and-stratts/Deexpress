import enContent from '@/locales/en/services/content.json'
import deContent from '@/locales/de/services/content.json'
import type { ServiceSlug } from '@/lib/site'

type ServiceContent = typeof enContent

const de: ServiceContent = deContent

export type ServiceStory = ServiceContent['stories'][ServiceSlug]
export type ServiceEnhancement = ServiceContent['enhancements'][ServiceSlug]
export type ServiceOperationalCopy = ServiceContent['operational'][ServiceSlug]

export const SERVICE_STORIES = { en: enContent.stories, de: de.stories }
export const SERVICE_ENHANCEMENTS = { en: enContent.enhancements, de: de.enhancements }
export const SERVICE_PROOF_COPY = { en: enContent.proof, de: de.proof }
export const SERVICE_EXTRA_FAQS = { en: enContent.extraFaqs, de: de.extraFaqs }
export const SERVICE_OPERATIONAL_COPY = { en: enContent.operational, de: de.operational }

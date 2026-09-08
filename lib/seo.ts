import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

type PageMetadataOptions = {
  title: string
  description: string
  pathname: string
  image?: string
}

export function pageMetadata({ title, description, pathname, image = '/images/home-hero.webp' }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: pathname,
      languages: {
        'en-US': `${pathname}?lang=en`,
        'de-DE': `${pathname}?lang=de`,
        'x-default': pathname,
      },
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: pathname,
      siteName: SITE.name,
      type: 'website',
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: `${title} | ${SITE.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [image],
    },
  }
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.legalName,
      url: SITE.url,
      logo: `${SITE.url}/images/logo.webp`,
      email: SITE.email,
      telephone: '+49 152 29939834',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.street,
        postalCode: '13055',
        addressLocality: 'Berlin',
        addressCountry: 'DE',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+49 152 29939834',
        email: SITE.email,
        contactType: 'customer service',
        availableLanguage: ['English', 'German', 'French'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#organization` },
      inLanguage: ['en', 'de'],
    },
  ],
}

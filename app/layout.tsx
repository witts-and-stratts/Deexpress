import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'
import { organizationSchema } from '@/lib/seo'
import { RouteShell } from '@/components/RouteShell'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'DEexpress Logistics GmbH — International Freight from Berlin to Africa & the Middle East',
    template: '%s | DEExpress Logistics',
  },
  description:
    'Air, sea, rail and road freight from Berlin to 26 countries across Africa and the Middle East. Vehicle sourcing and shipping, commercial cargo, personal effects and storage.',
  metadataBase: new URL('https://deexpress-logistics.eu'),
  applicationName: 'DEexpress Logistics',
  keywords: ['international freight', 'freight forwarding Berlin', 'air freight Africa', 'sea freight Africa', 'vehicle shipping', 'logistics Germany'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'DEExpress Logistics GmbH',
    description: 'International freight from Berlin to 26 countries across Africa and the Middle East.',
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'DEexpress Logistics',
    images: [{ url: '/images/home-hero.webp', width: 1200, height: 630, alt: 'DEexpress Logistics international freight' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEexpress Logistics GmbH',
    description: 'International freight from Berlin to 26 countries across Africa and the Middle East.',
    images: ['/images/home-hero.webp'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans text-ink antialiased`}>
        <LanguageProvider>
          <RouteShell>{children}</RouteShell>
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'
import { RouteShell } from '@/components/RouteShell'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'DEexpress Logistics GmbH — International Freight from Berlin to Africa & the Middle East',
    template: '%s | DEExpress Logistics',
  },
  description:
    'Air, sea, rail and road freight from Berlin to 26 countries across Africa and the Middle East. Vehicle shipping, commercial cargo, personal effects, sourcing and storage.',
  metadataBase: new URL('https://deexpress-logistics.eu'),
  openGraph: {
    title: 'DEExpress Logistics GmbH',
    description: 'International freight from Berlin to 26 countries across Africa and the Middle East.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans text-ink antialiased`}>
        <LanguageProvider>
          <RouteShell>{children}</RouteShell>
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  )
}

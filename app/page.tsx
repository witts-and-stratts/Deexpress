import type { Metadata } from 'next'
import { HomePage } from '@/components/pages/HomePage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'International freight from Berlin to Africa and the Middle East',
  description: 'DEexpress coordinates air, sea and land freight from Berlin to 26 countries across Africa and the Middle East for individuals and businesses.',
  pathname: '/',
})

export default function Page() {
  return <HomePage />
}

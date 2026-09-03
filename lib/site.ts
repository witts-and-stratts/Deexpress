export const SITE = {
  name: 'DEexpress Logistics',
  legalName: 'DEexpress Logistics GmbH',
  street: 'Lichtenauer Str. 51',
  city: '13055 Berlin',
  country: 'Germany',
  email: 'service@deexpress-logistics.eu',
  whatsapp: '4915229939834',
  hours: 'Mon – Fri · 9:00 – 17:00',
  register: 'HRB 229599 · Amtsgericht Charlottenburg',
  vat: 'DE17362750943',
  url: 'https://deexpress-logistics.eu',
}

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}`

export const CONTACT_PERSONS = [
  {
    name: 'Olagunju Micheal',
    phone: '+49 152 29939834',
    phoneHref: 'tel:+4915229939834',
    languages: 'English · Deutsch · Français',
    photo: 'https://deexpress-logistics.eu/wp-content/uploads/2021/06/Olagunju-Micheal.webp',
  },
  {
    name: 'Adediran Adedapo',
    phone: '+49 176 87132767',
    phoneHref: 'tel:+4917687132767',
    languages: 'English',
    photo: 'https://deexpress-logistics.eu/wp-content/uploads/2021/06/Adediran-Adedapo.webp',
  },
]

export type ServiceSlug =
  | 'air-freight'
  | 'sea-freight'
  | 'vehicle-shipping'
  | 'commercial-cargo'
  | 'personal-effects'
  | 'vehicle-sourcing'
  | 'storage'

export const SERVICES: { slug: ServiceSlug; image: string }[] = [
  { slug: 'air-freight', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=85' },
  { slug: 'sea-freight', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=85' },
  { slug: 'vehicle-shipping', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1600&q=85' },
  { slug: 'commercial-cargo', image: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1600&q=85' },
  { slug: 'personal-effects', image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1600&q=85' },
  { slug: 'vehicle-sourcing', image: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=85' },
  { slug: 'storage', image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=85' },
]

export type RegionId = 'europe' | 'north-africa' | 'west-africa' | 'central-africa' | 'east-africa' | 'southern-africa' | 'middle-east'

export const REGIONS: { id: RegionId; col: number; row: number }[] = [
  { id: 'europe', col: 12, row: 2 },
  { id: 'north-africa', col: 20, row: 8 },
  { id: 'west-africa', col: 12, row: 17 },
  { id: 'central-africa', col: 18, row: 21 },
  { id: 'east-africa', col: 27, row: 19 },
  { id: 'southern-africa', col: 22, row: 32 },
  { id: 'middle-east', col: 31, row: 8 },
]

export type DestinationCountry = { name: string; region: Exclude<RegionId, 'europe'> }

// Curated regional coverage assumptions used by the destination search. Keep this list configurable as confirmed country coverage evolves.
export const DESTINATION_COUNTRIES: DestinationCountry[] = [
  { name: 'Algeria', region: 'north-africa' },
  { name: 'Egypt', region: 'north-africa' },
  { name: 'Morocco', region: 'north-africa' },
  { name: 'Tunisia', region: 'north-africa' },
  { name: 'Benin', region: 'west-africa' },
  { name: 'Côte d’Ivoire', region: 'west-africa' },
  { name: 'Ghana', region: 'west-africa' },
  { name: 'Guinea', region: 'west-africa' },
  { name: 'Liberia', region: 'west-africa' },
  { name: 'Nigeria', region: 'west-africa' },
  { name: 'Senegal', region: 'west-africa' },
  { name: 'Sierra Leone', region: 'west-africa' },
  { name: 'Cameroon', region: 'central-africa' },
  { name: 'Chad', region: 'central-africa' },
  { name: 'Equatorial Guinea', region: 'central-africa' },
  { name: 'Gabon', region: 'central-africa' },
  { name: 'Republic of the Congo', region: 'central-africa' },
  { name: 'Ethiopia', region: 'east-africa' },
  { name: 'Kenya', region: 'east-africa' },
  { name: 'Rwanda', region: 'east-africa' },
  { name: 'Tanzania', region: 'east-africa' },
  { name: 'Uganda', region: 'east-africa' },
  { name: 'Angola', region: 'southern-africa' },
  { name: 'Namibia', region: 'southern-africa' },
  { name: 'South Africa', region: 'southern-africa' },
  { name: 'Zambia', region: 'southern-africa' },
  { name: 'Oman', region: 'middle-east' },
  { name: 'Qatar', region: 'middle-east' },
  { name: 'Saudi Arabia', region: 'middle-east' },
  { name: 'United Arab Emirates', region: 'middle-east' },
]

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=2400&q=90'
export const BREAK_IMAGE = 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=2200&q=88'
export const PORT_IMAGE = 'https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?auto=format&fit=crop&w=2000&q=85'
export const WAREHOUSE_IMAGE = 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=85'

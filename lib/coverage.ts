import type { RegionId } from '@/lib/site'

// Regional anchors illustrate coverage, not ports or operational routes.
export const COVERAGE_REGIONS: { id: RegionId; lat: number; lng: number }[] = [
  { id: 'europe', lat: 51, lng: 12 },
  { id: 'north-africa', lat: 30, lng: 9 },
  { id: 'west-africa', lat: 9, lng: -9 },
  { id: 'central-africa', lat: -2, lng: 17 },
  { id: 'east-africa', lat: 7, lng: 39 },
  { id: 'southern-africa', lat: -28, lng: 24 },
  { id: 'middle-east', lat: 29, lng: 49 },
]

export const COVERAGE_OVERVIEW = { lat: 30, lng: 20, altitude: 1.5 }
export function coverageCamera(id: RegionId | null) {
  const region = COVERAGE_REGIONS.find(region => region.id === id)
  return region ? { lat: region.lat, lng: region.lng, altitude: 1.5 } : COVERAGE_OVERVIEW
}
export function parseCoverageRegion(value: string | null): RegionId | null {
  return COVERAGE_REGIONS.find(region => region.id === value)?.id ?? null
}

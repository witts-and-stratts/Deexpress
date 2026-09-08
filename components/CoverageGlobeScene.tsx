'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import { Color, MeshPhongMaterial } from 'three'
import { coverageCamera } from '@/lib/coverage'
import type { RegionId } from '@/lib/site'
import { useLang } from '@/lib/i18n'

type City = { city: string; country: string; lat: number; lng: number };
type CityRoute = { source: City; destination: City; region: Exclude<RegionId, 'europe'>; altitude?: number };
type GlobePoint = City & {
  kind: 'city' | 'stardust';
  radius?: number;
  altitude?: number;
  color?: string;
};

const BERLIN: City = {
  city: 'Berlin',
  country: 'Germany',
  lat: 52.52,
  lng: 13.405,
};
const AFRICAN_CITIES: City[] = [
  { city: 'Casablanca', country: 'Morocco', lat: 33.573, lng: -7.589 },
  { city: 'Algiers', country: 'Algeria', lat: 36.753, lng: 3.058 },
  { city: 'Tunis', country: 'Tunisia', lat: 36.806, lng: 10.181 },
  { city: 'Cairo', country: 'Egypt', lat: 30.044, lng: 31.235 },
  { city: 'Marrakesh', country: 'Morocco', lat: 31.629, lng: -7.981 },
  { city: 'Tangier', country: 'Morocco', lat: 35.759, lng: -5.834 },
  { city: 'Alexandria', country: 'Egypt', lat: 31.2, lng: 29.918 },
  { city: 'Sfax', country: 'Tunisia', lat: 34.74, lng: 10.76 },
  { city: 'Dakar', country: 'Senegal', lat: 14.716, lng: -17.467 },
  { city: 'Thiès', country: 'Senegal', lat: 14.791, lng: -16.926 },
  { city: 'Conakry', country: 'Guinea', lat: 9.641, lng: -13.578 },
  { city: 'Monrovia', country: 'Liberia', lat: 6.315, lng: -10.807 },
  { city: 'Freetown', country: 'Sierra Leone', lat: 8.465, lng: -13.231 },
  { city: 'Cotonou', country: 'Benin', lat: 6.37, lng: 2.391 },
  { city: 'Accra', country: 'Ghana', lat: 5.603, lng: -0.187 },
  { city: 'Kumasi', country: 'Ghana', lat: 6.688, lng: -1.624 },
  { city: 'Lagos', country: 'Nigeria', lat: 6.524, lng: 3.379 },
  { city: 'Port Harcourt', country: 'Nigeria', lat: 4.815, lng: 7.049 },
  { city: 'Abidjan', country: 'Côte d’Ivoire', lat: 5.36, lng: -4.008 },
  { city: 'Bouaké', country: 'Côte d’Ivoire', lat: 7.69, lng: -5.03 },
  { city: 'Douala', country: 'Cameroon', lat: 4.051, lng: 9.767 },
  { city: 'Yaoundé', country: 'Cameroon', lat: 3.848, lng: 11.502 },
  { city: 'Libreville', country: 'Gabon', lat: 0.416, lng: 9.467 },
  { city: 'Port-Gentil', country: 'Gabon', lat: -0.719, lng: 8.781 },
  { city: 'Brazzaville', country: 'Republic of the Congo', lat: -4.263, lng: 15.242 },
  { city: 'Pointe-Noire', country: 'Republic of the Congo', lat: -4.778, lng: 11.863 },
  { city: 'Addis Ababa', country: 'Ethiopia', lat: 9.03, lng: 38.74 },
  { city: 'Mekelle', country: 'Ethiopia', lat: 13.496, lng: 39.476 },
  { city: 'Kigali', country: 'Rwanda', lat: -1.944, lng: 30.061 },
  { city: 'Kampala', country: 'Uganda', lat: 0.347, lng: 32.582 },
  { city: 'Nairobi', country: 'Kenya', lat: -1.286, lng: 36.817 },
  { city: 'Mombasa', country: 'Kenya', lat: -4.043, lng: 39.668 },
  { city: 'Dar es Salaam', country: 'Tanzania', lat: -6.792, lng: 39.208 },
  { city: 'Arusha', country: 'Tanzania', lat: -3.386, lng: 36.683 },
  { city: 'Johannesburg', country: 'South Africa', lat: -26.204, lng: 28.047 },
  { city: 'Durban', country: 'South Africa', lat: -29.858, lng: 31.021 },
  { city: 'Pretoria', country: 'South Africa', lat: -25.747, lng: 28.229 },
  { city: 'Cape Town', country: 'South Africa', lat: -33.925, lng: 18.424 },
  { city: 'Luanda', country: 'Angola', lat: -8.839, lng: 13.289 },
  { city: 'Benguela', country: 'Angola', lat: -12.576, lng: 13.406 },
  { city: 'Lusaka', country: 'Zambia', lat: -15.387, lng: 28.322 },
  { city: 'Kitwe', country: 'Zambia', lat: -12.802, lng: 28.214 },
  { city: 'Windhoek', country: 'Namibia', lat: -22.56, lng: 17.065 },
  { city: 'Walvis Bay', country: 'Namibia', lat: -22.957, lng: 14.505 },
];
const CITY_REGIONS: Record<string, Exclude<RegionId, 'europe'>> = {
  Casablanca: 'north-africa',
  Algiers: 'north-africa',
  Tunis: 'north-africa',
  Cairo: 'north-africa',
  Marrakesh: 'north-africa',
  Tangier: 'north-africa',
  Alexandria: 'north-africa',
  Sfax: 'north-africa',
  Dakar: 'west-africa',
  Thiès: 'west-africa',
  Conakry: 'west-africa',
  Monrovia: 'west-africa',
  Freetown: 'west-africa',
  Cotonou: 'west-africa',
  Accra: 'west-africa',
  Kumasi: 'west-africa',
  Lagos: 'west-africa',
  'Port Harcourt': 'west-africa',
  Abidjan: 'west-africa',
  Bouaké: 'west-africa',
  Douala: 'central-africa',
  Yaoundé: 'central-africa',
  Libreville: 'central-africa',
  'Port-Gentil': 'central-africa',
  Brazzaville: 'central-africa',
  'Pointe-Noire': 'central-africa',
  'Addis Ababa': 'east-africa',
  Mekelle: 'east-africa',
  Kigali: 'east-africa',
  Kampala: 'east-africa',
  Nairobi: 'east-africa',
  Mombasa: 'east-africa',
  'Dar es Salaam': 'east-africa',
  Arusha: 'east-africa',
  Johannesburg: 'southern-africa',
  Durban: 'southern-africa',
  Pretoria: 'southern-africa',
  'Cape Town': 'southern-africa',
  Luanda: 'southern-africa',
  Benguela: 'southern-africa',
  Lusaka: 'southern-africa',
  Kitwe: 'southern-africa',
  Windhoek: 'southern-africa',
  'Walvis Bay': 'southern-africa',
};
const CITY_ROUTES: CityRoute[] = AFRICAN_CITIES.map((destination) => ({
  source: BERLIN,
  destination,
  region: CITY_REGIONS[destination.city],
}));
const COVERAGE_CITIES: GlobePoint[] = [BERLIN, ...AFRICAN_CITIES].map((city) => ({
  ...city,
  kind: 'city',
}));

// A stable scatter keeps the selection marker from jumping when the globe rerenders.
// These points deliberately sit around existing destinations: they read as a regional
// constellation, without suggesting additional, unconfirmed service locations.
function createStarDust(active: RegionId): GlobePoint[] {
  const anchors =
    active === 'europe'
      ? [BERLIN]
      : AFRICAN_CITIES.filter((city) => CITY_REGIONS[city.city] === active).slice(0, 8);
  const fallbackAnchors: Record<RegionId, City[]> = {
    europe: [BERLIN],
    'north-africa': [AFRICAN_CITIES[0]],
    'west-africa': [AFRICAN_CITIES[8]],
    'central-africa': [AFRICAN_CITIES[20]],
    'east-africa': [AFRICAN_CITIES[26]],
    'southern-africa': [AFRICAN_CITIES[34]],
    'middle-east': [
      { city: 'Muscat', country: 'Oman', lat: 23.588, lng: 58.382 },
      { city: 'Doha', country: 'Qatar', lat: 25.285, lng: 51.531 },
      { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.714, lng: 46.675 },
      { city: 'Dubai', country: 'United Arab Emirates', lat: 25.205, lng: 55.271 },
    ],
  };
  const selectedAnchors = anchors.length ? anchors : fallbackAnchors[active];

  return selectedAnchors.flatMap((anchor, anchorIndex) =>
    Array.from({ length: 7 }, (_, particleIndex) => {
      const angle = (particleIndex / 7) * Math.PI * 2 + anchorIndex * 0.7;
      const distance = 0.24 + ((particleIndex + anchorIndex) % 3) * 0.11;
      return {
        ...anchor,
        city: `${anchor.city}-dust-${particleIndex}`,
        lat: anchor.lat + Math.sin(angle) * distance,
        lng: anchor.lng + Math.cos(angle) * distance,
        kind: 'stardust' as const,
        radius: particleIndex % 3 === 0 ? 0.04 : 0.019,
        altitude: particleIndex % 3 === 0 ? 0.028 : 0.016,
        color: particleIndex % 3 === 0 ? '#ffd978' : '#d99a20',
      };
    }),
  );
}

export default function CoverageGlobeScene({ active, preview, onSelect, onPreview, resetKey, width, height, visible, reducedMotion, fallback }: {
  active: RegionId | null; preview: RegionId | null; onSelect: (region: RegionId) => void
  onPreview?: (region: RegionId | null) => void; resetKey: number
  width: number; height: number; visible: boolean; reducedMotion: boolean; fallback: ReactNode
}) {
  const { t } = useLang()
  const globe = useRef<GlobeMethods | undefined>(undefined)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState<'timeout' | 'context-lost' | null>(null)
  const highlight = preview ?? active
  const material = useMemo(() => new MeshPhongMaterial({
    color: new Color('#332cb3'), emissive: new Color('#17126f'), emissiveIntensity: .32,
    bumpScale: 13, shininess: 12, specular: new Color('#5a55c7'),
  }), [])

  useEffect(() => () => material.dispose(), [material])
  useEffect(() => {
    if (ready) return
    const timer = window.setTimeout(() => setFailed('timeout'), 12000)
    return () => clearTimeout(timer)
  }, [ready])
  useEffect(() => {
    if (ready) {
      globe.current?.pointOfView(coverageCamera(active), reducedMotion ? 0 : 850)
      const controls = globe.current?.controls()
      if (controls) controls.enableDamping = !reducedMotion
    }
  }, [active, ready, reducedMotion, resetKey])
  useEffect(() => {
    if (!ready) return
    const update = () => {
      if (visible && !document.hidden) globe.current?.resumeAnimation()
      else globe.current?.pauseAnimation()
    }
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [ready, visible])
  useEffect(() => {
    if (!ready) return
    const canvas = globe.current?.renderer().domElement
    const lost = (event: Event) => { event.preventDefault(); setFailed('context-lost') }
    canvas?.addEventListener('webglcontextlost', lost)
    return () => canvas?.removeEventListener('webglcontextlost', lost)
  }, [ready])

  const regionForCity = useCallback((item: object): RegionId => {
    const city = (item as City).city
    return city === 'Berlin' ? 'europe' : CITY_REGIONS[city] ?? 'middle-east'
  }, [])
  const routes = useMemo(() => CITY_ROUTES.flatMap(route =>
    Array.from({ length: route.region === highlight ? 4 : 1 }, (_, index) => ({ ...route, altitude: .18 + index * .04 }))
  ), [highlight])
  const points = useMemo(() => [...COVERAGE_CITIES, ...(highlight ? createStarDust(highlight) : [])], [highlight])
  const labels = useMemo(() => [...COVERAGE_CITIES, { city: t.regions['middle-east'].name, country: '', lat: 28, lng: 45 }], [t])
  const arcColor = useCallback(() => ['rgba(0, 255, 0, 0.32)', 'rgba(255, 0, 0, 0.32)'], [])

  if (failed) return <div data-globe-failure={failed}>{fallback}</div>
  return (
    <>
      {!ready && fallback}
      <div className={`coverage-globe-scene ${ready ? 'is-ready' : ''}`}>
        <Globe ref={globe} width={width} height={height} backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="/images/coverage-night.webp" bumpImageUrl="/images/coverage-topology.webp" globeMaterial={material}
          animateIn={false}
          arcsData={routes}
          arcLabel={(item: object) => `${(item as CityRoute).source.city} → ${(item as CityRoute).destination.city}`}
          arcStartLat={(item: object) => (item as CityRoute).source.lat}
          arcStartLng={(item: object) => (item as CityRoute).source.lng}
          arcEndLat={(item: object) => (item as CityRoute).destination.lat}
          arcEndLng={(item: object) => (item as CityRoute).destination.lng}
          arcAltitude={(item: object) => (item as CityRoute).altitude ?? .18}
          arcStroke={.3} arcDashLength={reducedMotion ? 1 : .75} arcDashGap={reducedMotion ? 0 : 1}
          arcDashInitialGap={(item: object) => ((item as CityRoute).destination.lng + 180) / 360}
          arcDashAnimateTime={reducedMotion || !visible ? 0 : 4000}
          arcColor={arcColor} arcsTransitionDuration={0}
          onArcClick={(item: object) => onSelect((item as CityRoute).region)}
          pointsData={points}
          pointColor={(item: object) => (item as GlobePoint).color ?? 'orange'}
          pointRadius={(item: object) => (item as GlobePoint).radius ?? .035}
          pointAltitude={(item: object) => (item as GlobePoint).altitude ?? .01}
          pointsTransitionDuration={0}
          onPointClick={(item: object) => { if ((item as GlobePoint).kind === 'city') onSelect(regionForCity(item)) }}
          labelsData={labels} labelText={(item: object) => (item as City).city}
          labelSize={.55} labelColor={() => 'rgba(255,255,255,0.9)'} labelDotRadius={.16}
          labelsTransitionDuration={0}
          onLabelClick={(item: object) => onSelect(regionForCity(item))}
          onLabelHover={(item: object | null) => onPreview?.(item ? regionForCity(item) : null)}
          onGlobeReady={() => {
            const instance = globe.current
            if (!instance) { console.warn('GL ready before ref'); return }
            instance.pointOfView(coverageCamera(active))
            instance.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
            const controls = instance.controls()
            controls.enableZoom = false
            controls.enablePan = false
            controls.enableDamping = !reducedMotion
            controls.autoRotate = false
            controls.rotateSpeed = .6
            // Horizontal dragging rotates; vertical touch gestures remain page scrolling.
            instance.renderer().domElement.style.touchAction = 'pan-y'
            setReady(true)
          }}
        />
      </div>
    </>
  )
}

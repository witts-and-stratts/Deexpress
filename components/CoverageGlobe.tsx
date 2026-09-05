'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Color, MeshPhongMaterial } from 'three';
import type { GlobeMethods } from 'react-globe.gl';
import type { RegionId } from '@/lib/site';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

type City = { city: string; country: string; lat: number; lng: number };
type CityRoute = { source: City; destination: City; region: Exclude<RegionId, 'europe'>; altitude?: number };
type GlobePoint = City & {
  kind: 'city' | 'stardust';
  radius?: number;
  altitude?: number;
  color?: string;
};

const REGION_CAMERAS: Record<
  RegionId,
  { lat: number; lng: number; altitude: number }
> = {
  europe: { lat: 52.52, lng: 13.405, altitude: 1.7 },
  'north-africa': { lat: 31, lng: 10, altitude: 1.75 },
  'west-africa': { lat: 10, lng: -3, altitude: 1.8 },
  'central-africa': { lat: 4, lng: 17, altitude: 1.8 },
  'east-africa': { lat: 0, lng: 36, altitude: 1.8 },
  'southern-africa': { lat: -27, lng: 25, altitude: 1.8 },
  'middle-east': { lat: 28, lng: 45, altitude: 1.75 },
};

const DEFAULT_CAMERA = { lat: 30, lng: 20, altitude: 2 };
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

// The route data and visual configuration are intentionally the official Globe.gl airline-routes example.
export function CoverageGlobe({
  active,
  className = '',
}: {
  active: RegionId;
  onSelect: (region: RegionId) => void;
  className?: string;
}) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const hostRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [canUseWebGL, setCanUseWebGL] = useState(false);
  const globeMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        color: new Color('#332cb3'),
        emissive: new Color('#17126f'),
        emissiveIntensity: 0.32,
        bumpScale: 13,
        shininess: 12,
        specular: new Color('#5a55c7'),
      }),
    [],
  );

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const webgl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const frame = window.requestAnimationFrame(() =>
      setCanUseWebGL(Boolean(webgl)),
    );
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: Math.round(entry.contentRect.width),
        height: Math.round(entry.contentRect.height),
      }),
    );
    observer.observe(host);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    globeRef.current?.pointOfView(REGION_CAMERAS[active], 1400);
  }, [active]);

  const arcLabel = useCallback((route: object) => {
    const item = route as CityRoute;
    return `${item.source.city} → ${item.destination.city}`;
  }, []);
  const arcStartLat = useCallback(
    (route: object) => (route as CityRoute).source.lat,
    [],
  );
  const arcStartLng = useCallback(
    (route: object) => (route as CityRoute).source.lng,
    [],
  );
  const arcEndLat = useCallback(
    (route: object) => (route as CityRoute).destination.lat,
    [],
  );
  const arcEndLng = useCallback(
    (route: object) => (route as CityRoute).destination.lng,
    [],
  );
  const arcDashInitialGap = useCallback(() => Math.random(), []);
  const arcColor = useCallback(
    () => ['rgba(0, 255, 0, 0.32)', 'rgba(255, 0, 0, 0.32)'],
    [],
  );
  const activeRoutes = useMemo(
    () =>
      CITY_ROUTES.flatMap((route) =>
        Array.from({ length: route.region === active ? 4 : 1 }, (_, index) => ({
          ...route,
          altitude: 0.18 + index * 0.04,
        })),
      ),
    [active],
  );
  const globePoints = useMemo(
    () => [...COVERAGE_CITIES, ...createStarDust(active)],
    [active],
  );
  const pointColor = useCallback(
    (point: object) => (point as GlobePoint).color ?? 'orange',
    [],
  );
  const pointRadius = useCallback(
    (point: object) => (point as GlobePoint).radius ?? 0.035,
    [],
  );
  const pointAltitude = useCallback(
    (point: object) => (point as GlobePoint).altitude ?? 0.01,
    [],
  );

  return (
    <div
      ref={hostRef}
      className={`coverage-globe-canvas ${className}`}
      aria-label='International outbound airline routes globe'
    >
      {canUseWebGL && size.width > 0 ? (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor='rgba(0,0,0,0)'
          globeImageUrl='//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg'
          bumpImageUrl='//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png'
          globeMaterial={globeMaterial}
          arcsData={activeRoutes}
          arcLabel={arcLabel}
          arcStartLat={arcStartLat}
          arcStartLng={arcStartLng}
          arcEndLat={arcEndLat}
          arcEndLng={arcEndLng}
          arcAltitude={(route: object) => (route as CityRoute).altitude ?? 0.18}
          arcStroke={0.3}
          arcDashLength={0.75}
          arcDashGap={1}
          arcDashInitialGap={arcDashInitialGap}
          arcDashAnimateTime={4000}
          arcColor={arcColor}
          arcsTransitionDuration={0}
          pointsData={globePoints}
          pointColor={pointColor}
          pointAltitude={pointAltitude}
          pointRadius={pointRadius}
          pointsMerge
          pointsTransitionDuration={0}
          labelsData={COVERAGE_CITIES}
          labelText={(city: object) => (city as City).city}
          labelSize={0.55}
          labelColor={() => 'rgba(255,255,255,0.9)'}
          labelDotRadius={0.16}
          onGlobeReady={() => {
            globeRef.current?.pointOfView(DEFAULT_CAMERA);
            globeRef.current
              ?.renderer()
              .setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            const controls = globeRef.current?.controls();
            if (controls) controls.enableZoom = false;
          }}
        />
      ) : null}
    </div>
  );
}

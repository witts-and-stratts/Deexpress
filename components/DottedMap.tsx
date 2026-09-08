'use client'

import { useMemo, useState } from 'react'
import { REGIONS, type RegionId } from '@/lib/site'
import { MAP_COLS, MAP_ROWS, buildLandSet } from '@/lib/map'
import { useLang } from '@/lib/i18n'

const SPACING = 20
const W = MAP_COLS * SPACING
const H = MAP_ROWS * SPACING

const px = (col: number) => col * SPACING + SPACING / 2
const py = (row: number) => row * SPACING + SPACING / 2

export function DottedMap({ active, onSelect }: { active: RegionId | null; onSelect: (id: RegionId | null) => void }) {
  const { t } = useLang()
  const [hover, setHover] = useState<RegionId | null>(null)
  const land = useMemo(() => buildLandSet(), [])
  const effective = hover ?? active

  const dots = useMemo(() => {
    const out: { key: string; x: number; y: number; land: boolean }[] = []
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        out.push({ key: `${r}:${c}`, x: px(c), y: py(r), land: land.has(`${r}:${c}`) })
      }
    }
    return out
  }, [land])

  const europe = REGIONS.find((r) => r.id === 'europe')!
  const targets = REGIONS.filter((r) => r.id !== 'europe')

  const arcs = targets.map((r) => {
    const x1 = px(europe.col)
    const y1 = py(europe.row)
    const x2 = px(r.col)
    const y2 = py(r.row)
    const cx = (x1 + x2) / 2 + (y2 - y1) * 0.22
    const cy = (y1 + y2) / 2 - (x2 - x1) * 0.22
    return { id: r.id, d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}` }
  })

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full min-h-[380px]"
      role="img"
      aria-label={t.coverage.mapLabel}
    >
      {dots.map((d) => (
        <circle
          key={d.key}
          cx={d.x}
          cy={d.y}
          r={d.land ? 3.1 : 2.2}
          className={d.land ? 'fill-map/30' : 'fill-map/10'}
        />
      ))}

      {arcs.map((a) => (
        <path
          key={a.id}
          d={a.d}
          className={`fill-none stroke-[1.6] transition-colors duration-300 ${
            effective === a.id ? 'animate-arc-flow stroke-orange [stroke-dasharray:5_7]' : 'stroke-map/15'
          }`}
        />
      ))}

      {targets.map((r) => {
        const cx = px(r.col)
        const cy = py(r.row)
        const isActive = effective === r.id
        return (
          <g
            key={r.id}
            className="group cursor-pointer"
            onClick={() => onSelect(isActive && hover === null ? null : r.id)}
            onMouseEnter={() => setHover(r.id)}
            onMouseLeave={() => setHover(null)}
            role="button"
            tabIndex={0}
            aria-label={t.regions[r.id].name}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(isActive && hover === null ? null : r.id)
              }
            }}
          >
            <circle cx={cx} cy={cy} r="26" className="fill-transparent" />
            {isActive && (
              <circle
                cx={cx}
                cy={cy}
                r="16"
                className="animate-dm-ping fill-none stroke-orange stroke-[1.6] [transform-box:fill-box] [transform-origin:center]"
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r="7"
              className={`stroke-2 stroke-white/75 transition-colors duration-300 group-hover:fill-orange ${
                isActive ? 'fill-orange' : 'fill-royal'
              }`}
            />
            <text
              x={cx + 15}
              y={cy + 4}
              className={`pointer-events-none text-[15px] transition-all duration-300 group-hover:fill-white group-hover:font-semibold ${
                isActive ? 'fill-white font-semibold' : 'fill-white/60 font-medium'
              }`}
            >
              {t.regions[r.id].name}
            </text>
          </g>
        )
      })}

      <g className="group" aria-label={t.coverage.origin}>
        <circle
          cx={px(europe.col)}
          cy={py(europe.row)}
          r="16"
          className="animate-dm-ping [animation-duration:2.4s] fill-none stroke-orange stroke-[1.6] [transform-box:fill-box] [transform-origin:center]"
        />
        <circle cx={px(europe.col)} cy={py(europe.row)} r="8" className="fill-orange stroke-2 stroke-white/75" />
        <text
          x={px(europe.col) + 16}
          y={py(europe.row) - 8}
          className="pointer-events-none fill-orange-light text-[13px] font-bold tracking-[0.08em]"
        >
          BERLIN · HQ
        </text>
      </g>
    </svg>
  )
}

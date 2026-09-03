'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CoverageGlobe } from '@/components/CoverageGlobe'
import { useLang } from '@/lib/i18n'
import { DESTINATION_COUNTRIES, REGIONS, type RegionId } from '@/lib/site'
import { cn } from '@/lib/utils'

export function GlobalCoverage({ subtitle = 'From Europe to 26 destinations', searchable = false, className = '' }: { subtitle?: string; searchable?: boolean; className?: string }) {
  const { t } = useLang()
  const [activeRegion, setActiveRegion] = useState<RegionId>('north-africa')
  const [countrySearchOpen, setCountrySearchOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')
  const region = t.regions[activeRegion]

  return (
    <section className={`coverage ${className}`}>
      <div className='coverage__copy'>
        <h2 className='text-h2 text-white'>
          Global Coverage
          <br />
          <span>{subtitle}</span>
        </h2>
        <p className='site-lead text-white/60'>
          Our network connects European origins with destinations across Africa and the Middle East. Select a region to see how we move your freight.
        </p>
        <div className='coverage__tabs' role='tablist' aria-label='Coverage regions'>
          {REGIONS.map(({ id }) => (
            <Button
              key={id}
              variant='outline'
              type='button'
              role='tab'
              aria-selected={activeRegion === id}
              aria-controls='coverage-panel'
              id={`coverage-tab-${id}`}
              className={cn(activeRegion === id ? 'is-active' : '', 'rounded-full')}
              onClick={() => setActiveRegion(id)}
            >
              {t.regions[id].name}
            </Button>
          ))}
        </div>
      </div>
      <CoverageGlobe active={activeRegion} onSelect={setActiveRegion} />
      <aside id='coverage-panel' role='tabpanel' aria-labelledby={`coverage-tab-${activeRegion}`} className='coverage__card' aria-live='polite'>
        <b>{region.tag}</b>
        <h3 className='text-card-title'>{region.name}</h3>
        <p className='site-body'>{region.text}</p>
        <Link href='/destinations' className='gap-2 flex items-center hover:scale-125 transition-transform duration-600 ease-out'>
          Learn More <ArrowUpRight aria-hidden='true' size={20} className='mb-0' />
        </Link>
      </aside>
      {searchable && (
        <Popover open={countrySearchOpen} onOpenChange={setCountrySearchOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={countrySearchOpen}
              aria-label={t.destinations.searchPlaceholder}
              className='coverage__search w-full justify-between border-white/35 bg-editorial-accent/80 text-white hover:translate-y-0 hover:border-white/55 hover:bg-white/15'
            >
              <span className='truncate'>{selectedCountry || t.destinations.searchPlaceholder}</span>
              <ChevronsUpDown aria-hidden='true' className='ml-2 opacity-60' />
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' side='bottom' sideOffset={8} className='w-(--radix-popover-trigger-width) p-0 bg-editorial-accent/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg'>
            <Command>
              <CommandInput placeholder={t.destinations.searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{t.destinations.searchNoResults}</CommandEmpty>
                <CommandGroup heading={t.destinations.searchPlaceholder}>
                  {DESTINATION_COUNTRIES.map((country) => (
                    <CommandItem
                      key={country.name}
                      value={`${country.name} ${t.regions[country.region].name}`}
                      onSelect={() => {
                        setSelectedCountry(country.name)
                        setActiveRegion(country.region)
                        setCountrySearchOpen(false)
                      }}
                      className='justify-between gap-4'
                    >
                      <span>{country.name}</span>
                      <span className='flex items-center gap-2 text-xs text-white/60'>
                        {t.regions[country.region].name}
                        <Check aria-hidden='true' className={cn('size-3.5 text-orange', selectedCountry === country.name ? 'opacity-100' : 'opacity-0')} />
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </section>
  )
}

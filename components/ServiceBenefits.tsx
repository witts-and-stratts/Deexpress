'use client'

import type { LucideIcon } from 'lucide-react'
import { Boxes, CarFront, Clock, FileCheck2, Globe2, Handshake, HeartHandshake, Luggage, PackageCheck, Plane, Route, ShieldCheck, Truck, Warehouse } from 'lucide-react'
import { Reveal } from '@/components/motion/Motion'
import type { ServiceSlug } from '@/lib/site'

type Benefit = { title: string; text: string; icon: LucideIcon }

const benefitsByService: Partial<Record<ServiceSlug, { title: string; items: Benefit[] }>> = {
  'air-freight': {
    title: 'Benefits of air freight with DEexpress',
    items: [
      { title: 'Speed when timing matters', text: 'Air freight keeps time-sensitive shipments moving on the fastest suitable route.', icon: Clock },
      { title: 'Worldwide connections', text: 'European airport departures connect your cargo with destinations across our network.', icon: Globe2 },
      { title: 'Care for valuable cargo', text: 'High-value and priority shipments receive careful handling at every handover.', icon: ShieldCheck },
      { title: 'Clear documentation', text: 'Export-document support helps prepare your shipment before airport handling.', icon: FileCheck2 },
      { title: 'Flexible routing', text: 'Air, road and other transport options can be connected around your needs.', icon: Route },
      { title: 'Delivery coordination', text: 'Collection, arrival and onward delivery are planned as one connected journey.', icon: Truck },
    ],
  },
  'commercial-cargo': {
    title: 'Benefits of commercial cargo with DEexpress',
    items: [
      { title: 'Built around your cargo', text: 'Routes and handling are planned around the type, scale and delivery needs of your goods.', icon: PackageCheck },
      { title: 'Multimodal options', text: 'Air, sea, rail and road can work together to support the right route.', icon: Route },
      { title: 'Flexible handling', text: 'Suitable arrangements are coordinated for palletised, loose, oversized and sensitive cargo.', icon: Boxes },
      { title: 'Documentation support', text: 'Shipping paperwork and customs requirements are coordinated around the agreed movement.', icon: FileCheck2 },
      { title: 'Reliable handovers', text: 'Collection, storage and onward delivery are connected through a clear operating plan.', icon: Handshake },
      { title: 'Scales with demand', text: 'Support is available for one-off projects as well as recurring commercial shipments.', icon: Truck },
    ],
  },
  'personal-effects': {
    title: 'Benefits of personal effects shipping with DEexpress',
    items: [
      { title: 'Personal guidance', text: 'Your shipment is planned around the belongings, destination and timing that matter to you.', icon: HeartHandshake },
      { title: 'Flexible shipment sizes', text: 'Suitable options are available from a single item to several boxes and belongings.', icon: Luggage },
      { title: 'Careful preparation', text: 'Practical packing and item-list guidance helps prepare belongings before collection.', icon: PackageCheck },
      { title: 'Air or sea options', text: 'The transport route can be reviewed around your timing, destination and shipment size.', icon: Plane },
      { title: 'Storage when needed', text: 'Storage support can connect collection dates with your planned departure.', icon: Warehouse },
      { title: 'Clear handover', text: 'Destination collection or onward delivery is coordinated around the confirmed service.', icon: Route },
    ],
  },
  storage: {
    title: 'Benefits of storage with DEexpress',
    items: [
      { title: 'Flexible timing', text: 'Short- and long-term arrangements can be planned around your shipping schedule.', icon: Clock },
      { title: 'Space for your goods', text: 'Storage is available for suitable personal belongings and retail goods in Berlin.', icon: Warehouse },
      { title: 'Connected handovers', text: 'Goods receipt, storage and release are coordinated as one clear process.', icon: Handshake },
      { title: 'Consolidation support', text: 'Deliveries travelling together can be brought into one onward shipment plan.', icon: Boxes },
      { title: 'Ready for onward transport', text: 'Air, sea and road freight can connect when your goods are ready to leave.', icon: Truck },
      { title: 'Clear release planning', text: 'Collection or shipping handovers are arranged around the confirmed schedule.', icon: FileCheck2 },
    ],
  },
  'vehicle-shipping': {
    title: 'Benefits of vehicle shipping with DEexpress',
    items: [
      { title: 'One connected service', text: 'Vehicle sourcing, collection and shipping can be brought together around your requirements.', icon: CarFront },
      { title: 'Suitable shipping options', text: 'Container and roll-on/roll-off routes are reviewed around the vehicle and destination.', icon: Route },
      { title: 'Export preparation', text: 'Purchase records, export documents and customs paperwork are coordinated before departure.', icon: FileCheck2 },
      { title: 'Careful port handling', text: 'Collection, storage and loading arrangements are planned around the sailing schedule.', icon: ShieldCheck },
      { title: 'Flexible vehicle support', text: 'Cars, SUVs, trucks, buses and suitable special equipment can be considered.', icon: Truck },
      { title: 'Destination connection', text: 'Arrival and onward delivery are coordinated around the agreed route.', icon: Globe2 },
    ],
  },
  'vehicle-sourcing': {
    title: 'Benefits of vehicle sourcing with DEexpress',
    items: [
      { title: 'Focused vehicle search', text: 'The search begins with your preferred vehicle type, budget and destination.', icon: CarFront },
      { title: 'Seller coordination', text: 'European seller liaison and purchase support help keep the process connected.', icon: Handshake },
      { title: 'Document support', text: 'Purchase and export requirements can be prepared before the shipping handover.', icon: FileCheck2 },
      { title: 'Clear next steps', text: 'Inspection, collection and shipping options are considered as the purchase progresses.', icon: Route },
      { title: 'Storage flexibility', text: 'Storage support can help when collection and departure dates do not align.', icon: Warehouse },
      { title: 'Shipping-ready planning', text: 'The onward route is planned around the confirmed vehicle and destination.', icon: Truck },
    ],
  },
}

export function ServiceBenefits({ service }: { service: ServiceSlug }) {
  const benefits = benefitsByService[service]
  if (!benefits) return null

  return (
    <section className='service-benefits' aria-labelledby={`${service}-benefits-title`}>
      <Reveal>
        <h2 id={`${service}-benefits-title`}>{benefits.title}</h2>
      </Reveal>
      <div className='service-benefits__grid'>
        {benefits.items.map(({ icon: Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 55} className='service-benefits__item'>
            <article className='service-benefits__card'>
              <div className='service-benefits__heading'>
                <Icon aria-hidden='true' strokeWidth={1.7} />
                <h3>{title}</h3>
              </div>
              <p>{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

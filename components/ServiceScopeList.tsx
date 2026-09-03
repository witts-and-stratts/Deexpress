import { Reveal } from '@/components/motion/Motion'
import { Check } from 'lucide-react'

type ServiceScopeListProps = {
  items: string[]
  className?: string
  ariaLabel?: string
  animated?: boolean
}

/** A reusable checked list for service capability and scope sections. */
export function ServiceScopeList({ items, className = '', ariaLabel, animated = true }: ServiceScopeListProps) {
  const rows = items.map((item, index) => {
    const row = (
      <article>
        <p>{item}</p>
        <span className="service-scope-list__icon" aria-hidden="true"><Check size={14} strokeWidth={1.2} /></span>
      </article>
    )

    return animated ? <Reveal key={item} delay={index * 35}>{row}</Reveal> : <div key={item}>{row}</div>
  })

  return <div className={className} aria-label={ariaLabel}>{rows}</div>
}

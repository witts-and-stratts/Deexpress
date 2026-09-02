import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function FormField({ label, children, className, required, ...props }: ComponentProps<'label'> & {
  label: ReactNode
  required?: boolean
}) {
  return (
    <label className={cn('form-field', className)} {...props}>
      <span className="form-label">{label}{required && <span aria-hidden="true"> *</span>}</span>
      {children}
    </label>
  )
}

export function FormHint({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('form-hint', className)}>{children}</p>
}

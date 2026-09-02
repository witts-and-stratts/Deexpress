'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-editorial-accent text-white shadow-sm shadow-editorial-accent/25 hover:-translate-y-0.5 hover:bg-editorial-accent-hover',
        secondary: 'bg-editorial-surface text-editorial-ink hover:-translate-y-0.5 hover:bg-editorial-line/30',
        outline: 'border border-current/30 bg-transparent text-current hover:-translate-y-0.5 hover:bg-current/10',
        ghost: 'text-editorial-accent hover:bg-editorial-accent/8',
        link: 'min-h-0 px-0 py-0 text-editorial-accent underline-offset-4 hover:underline',
        inverse: 'bg-white text-editorial-accent hover:-translate-y-0.5 hover:bg-editorial-surface',
      },
      size: {
        default: '',
        sm: 'min-h-9 px-3.5 py-2 text-xs',
        lg: 'min-h-12 px-6 py-3 text-base',
        icon: 'size-11 min-h-0 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, type = 'button', ...props }, ref) => (
  <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
))

Button.displayName = 'Button'

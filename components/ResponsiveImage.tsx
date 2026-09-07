import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

type ResponsiveImageProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'style'
> & {
  className: string;
  src: string;
  portraitSrc?: string;
};

/** Decorative background layer that swaps to a portrait asset when available. */
export function ResponsiveImage({
  className,
  src,
  portraitSrc,
  ...props
}: ResponsiveImageProps) {
  return (
    <div
      {...props}
      className={`responsive-image ${className}`}
      data-portrait-image={portraitSrc ? 'true' : undefined}
      style={
        {
          '--desktop-image': `url(${src})`,
          '--portrait-image': portraitSrc ? `url(${portraitSrc})` : undefined,
        } as CSSProperties
      }
    />
  );
}

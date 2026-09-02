declare module '@splidejs/react-splide' {
  import type { HTMLAttributes, ReactNode, RefAttributes } from 'react'

  type SplideInstance = {
    go: (control: string | number) => void
  }

  type SplideHandle = {
    splide: SplideInstance
  }

  type SplideProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    hasTrack?: boolean
    options?: Record<string, boolean | number | string>
    onMoved?: (splide: SplideInstance, nextIndex: number, previousIndex: number) => void
  }

  export const Splide: (props: SplideProps & RefAttributes<SplideHandle>) => ReactNode
  export const SplideTrack: (props: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) => ReactNode
  export const SplideSlide: (props: HTMLAttributes<HTMLLIElement> & { children: ReactNode }) => ReactNode
}

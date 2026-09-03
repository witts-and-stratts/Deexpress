"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type AnimatableValue = number | string;

interface ParallaxProps {
  children: ReactNode;
  /**
   * Factor to multiply the scroll distance. 0 is no effect, positive moves faster, negative moves against.
   * Default: 0.2
   */
  speed?: number;
  className?: string;
  /**
   * Direction of the default parallax movement.
   * Default: "vertical"
   */
  direction?: "vertical" | "horizontal";
  /**
   * Advanced control: pass exact pixel or percentage range for the default movement.
   * Overrides 'speed'.
   */
  range?: [AnimatableValue, AnimatableValue];
  /**
   * Starting state for custom motion properties (e.g., { opacity: 0, scale: 0.8 }).
   * Animated based on scroll progress (0 to 1).
   */
  from?: Record<string, AnimatableValue>;
  /**
   * Ending state for custom motion properties (e.g., { opacity: 1, scale: 1.2 }).
   * Animated based on scroll progress (0 to 1).
   */
  to?: Record<string, AnimatableValue>;
  /** Keeps mobile scrolling free of scroll-linked transform work. */
  disableOnMobile?: boolean;
}

function ParallaxMotion({
  children,
  speed = 0.2,
  className = "",
  direction = "vertical",
  range,
  from,
  to,
}: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // 1. Default movement logic (speed/range)
  const defaultRange: [AnimatableValue, AnimatableValue] = [
    `${-speed * 100}%`,
    `${speed * 100}%`
  ];
  const transformRange = range || defaultRange;
  const movement = useTransform(scrollYProgress, [0, 1], transformRange);

  // 2. Custom from/to properties
  const opacity = useTransform(scrollYProgress, [0, 1], [from?.opacity ?? 1, to?.opacity ?? 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [from?.scale ?? 1, to?.scale ?? 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [from?.rotate ?? 0, to?.rotate ?? 0]);
  const customX = useTransform(scrollYProgress, [0, 1], [from?.x ?? 0, to?.x ?? 0]);
  const customY = useTransform(scrollYProgress, [0, 1], [from?.y ?? 0, to?.y ?? 0]);

  // Combine styles
  const style = {
    opacity: from?.opacity !== undefined || to?.opacity !== undefined ? opacity : undefined,
    scale: from?.scale !== undefined || to?.scale !== undefined ? scale : undefined,
    rotate: from?.rotate !== undefined || to?.rotate !== undefined ? rotate : undefined,
    // Use x/y from 'from' and 'to' if provided, otherwise fallback to speed/range logic
    x: from?.x !== undefined || to?.x !== undefined 
      ? customX
      : (direction === "horizontal" ? movement : undefined),
    y: from?.y !== undefined || to?.y !== undefined 
      ? customY
      : (direction === "vertical" ? movement : undefined),
  };

  return (
    <div ref={targetRef} className={`relative ${className}`}>
      <motion.div style={style} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

export default function Parallax({ disableOnMobile = false, children, ...props }: ParallaxProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!disableOnMobile) return;

    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [disableOnMobile]);

  if (disableOnMobile && isMobile) {
    return <div className={`relative ${props.className ?? ''}`}>{children}</div>;
  }

  return <ParallaxMotion {...props} disableOnMobile={undefined}>{children}</ParallaxMotion>;
}


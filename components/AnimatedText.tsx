'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  useState,
  useMemo,
} from 'react';
import {
  motion,
  useInView,
  type TargetAndTransition,
  type Transition,
} from 'motion/react';
import sbd from 'sbd';

export type SplitBy = 'char' | 'words' | 'sentence';
export type Trigger = 'hover' | 'inView' | 'mount';

export type AnimatedTextProps = {
  /**
   * The content to animate.
   * Inline markup is allowed. AnimatedText preserves element wrappers and
   * animates the text nodes inside them.
   */
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  splitBy?: SplitBy | SplitBy[];
  initial?: TargetAndTransition;
  from?: TargetAndTransition;
  to?: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: Transition;
  delay?: number;
  delayStep?: number;
  stagger?: number;
  staggerDirection?: 'forward' | 'reverse';
  active?: boolean;
  trigger?: Trigger;
  inViewOptions?: Parameters<typeof useInView>[1];
};

type AnimatedTagProps = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const DEFAULT_TRANSITION: Omit<Transition, 'delay'> = {
  duration: 0.25,
};

const DEFAULT_SPLIT_BY: SplitBy[] = ['char'];
const DEFAULT_STAGGER = 0.03;
const SPLIT_ORDER: SplitBy[] = ['sentence', 'words', 'char'];
const SBD_OPTIONS = {
  preserve_whitespace: true,
};

function normalizeSplitBy(splitBy?: SplitBy | SplitBy[]) {
  if (!splitBy) return null;

  const requested = Array.isArray(splitBy) ? splitBy : [splitBy];
  const expanded = new Set<SplitBy>();

  for (const level of requested) {
    if (level === 'char') {
      expanded.add('words');
      expanded.add('char');
    } else if (level === 'words') {
      expanded.add('words');
    } else {
      expanded.add('sentence');
    }
  }

  const normalized = SPLIT_ORDER.filter((level) => expanded.has(level));
  return normalized.length ? normalized : null;
}

function splitText(text: string, by: SplitBy): string[] {
  switch (by) {
    case 'char':
      return text.split('');
    case 'words':
      return text.split(/(\s+)/);
    case 'sentence':
      return sbd.sentences(text, SBD_OPTIONS);
  }
}

export default function AnimatedText({
  children,
  as,
  className,
  style,
  splitBy,
  initial,
  from,
  to,
  exit,
  transition,
  delay = 0,
  delayStep,
  stagger = DEFAULT_STAGGER,
  staggerDirection = 'forward',
  active,
  trigger = 'mount',
  inViewOptions,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref as React.RefObject<HTMLElement>, inViewOptions);
  const hasElementChildren = Children.toArray(children).some((child) =>
    isValidElement(child),
  );
  const resolvedAs = as ?? (hasElementChildren ? 'div' : 'span');
  const shouldAnimate = Boolean(splitBy || trigger);
  const resolvedSequence = shouldAnimate
    ? normalizeSplitBy(splitBy ?? DEFAULT_SPLIT_BY)
    : null;

  const initialState = initial ?? from ?? { opacity: 0, y: 8 };
  const fromState = from ?? initialState;
  const toState = to ?? { opacity: 1, y: 0 };
  const exitState = exit ?? fromState;

  const isActive =
    typeof active === 'boolean'
      ? active
      : trigger === 'hover'
        ? isHovered
        : trigger === 'inView'
          ? isInView
          : true;

  const stepDelay = delayStep ?? stagger;
  let currentDelayCursor = delay;

  const Tag = useMemo(() => {
    if (typeof resolvedAs === 'string') {
      const motionComponents = motion as unknown as Record<string, React.ElementType>;
      return motionComponents[resolvedAs];
    }
    return motion(resolvedAs);
  }, [resolvedAs]) as React.ComponentType<AnimatedTagProps>;

  function renderTextNode(
    text: string,
    levelIndex: number,
    path: string,
  ): React.ReactNode[] {
    if (!resolvedSequence) {
      return [text];
    }

    const splitType = resolvedSequence[levelIndex];
    const parts = splitText(text, splitType);
    const hasNext = levelIndex + 1 < resolvedSequence.length;
    const orderedParts =
      staggerDirection === 'reverse' ? [...parts].reverse() : parts;

    return orderedParts.map((part, index) => {
      const key = `${path}-${levelIndex}-${index}`;
      const isWhitespace = /^\s+$/.test(part) || part === '';
      const display = splitType === 'sentence' ? 'block' : 'inline-block';
      const whiteSpace =
        splitType === 'char'
          ? 'pre'
          : splitType === 'words' && hasNext
            ? 'nowrap'
            : 'pre-wrap';

      if (hasNext && !isWhitespace) {
        return (
          <span key={key} style={{ display, whiteSpace }}>
            {renderTextNode(part, levelIndex + 1, key)}
          </span>
        );
      }

      if (isWhitespace) {
        return part;
      }

      const motionState = isActive ? toState : fromState;
      const resolvedTransition =
        motionState.transition ?? transition ?? DEFAULT_TRANSITION;
      const currentDelay = currentDelayCursor;
      currentDelayCursor += stepDelay;

      return (
        <motion.span
          key={key}
          initial={initialState}
          animate={motionState}
          exit={exitState}
          transition={{ ...resolvedTransition, delay: currentDelay }}
          style={{ display, whiteSpace }}
        >
          {part}
        </motion.span>
      );
    });
  }

  function renderNode(node: React.ReactNode, path: string): React.ReactNode[] {
    return Children.toArray(node).flatMap((child, index) => {
      const key = `${path}-${index}`;

      if (typeof child === 'string' || typeof child === 'number') {
        return renderTextNode(String(child), 0, key);
      }

      if (isValidElement(child)) {
        const element = child as React.ReactElement<{
          children?: React.ReactNode;
        }>;

        return [
          cloneElement(
            element,
            { key: element.key ?? key },
            renderNode(element.props.children, key),
          ),
        ];
      }

      return [];
    });
  }

  const interactionProps =
    trigger === 'hover'
      ? {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
        }
      : {};

  const content = resolvedSequence ? renderNode(children, 'root') : children;

  return (
    <Tag
      ref={ref}
      className={className}
      style={resolvedAs === 'span' ? { display: 'inline-block', ...style } : style}
      {...interactionProps}
    >
      {content}
    </Tag>
  );
}


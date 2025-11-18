import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type PropsWithChildren,
} from "react";

type RevealProps = PropsWithChildren<{
  as?: ElementType;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}>;

export function Reveal({
  as: Component = "div",
  delay = 0,
  threshold = 0.1,
  once = true,
  className,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.disconnect();
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px 20% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  const classes = ["reveal", isVisible ? "reveal--visible" : undefined, className]
    .filter((token): token is string => Boolean(token && token.length > 0))
    .join(" ");

  const inlineStyles: CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  return createElement(
    Component,
    {
      ref: ref as unknown as any,
      className: classes,
      style: inlineStyles,
    },
    children,
  );
}


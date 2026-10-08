import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  duration?: number;
  separator?: string;
}

/** Infinite ticker — duplicates content for a seamless loop. Pauses on hover. */
export function Marquee({
  items,
  reverse = false,
  className,
  itemClassName,
  duration = 42,
  separator = "/",
}: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "marquee-paused relative overflow-hidden py-3 select-none",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max items-center gap-8 whitespace-nowrap",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className={cn("flex items-center gap-8", itemClassName)}>
            <span className="font-mono text-sm tracking-wide">{item}</span>
            <span className="text-primary/50 font-mono text-xs" aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

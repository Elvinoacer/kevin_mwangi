import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Numbered editorial section heading: "02 / SELECTED SOFTWARE WORK" */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-4 mb-5",
            align === "center" && "justify-center"
          )}
        >
          <span className="mono-tag text-primary">{index}</span>
          <span className="h-px w-10 bg-primary/40" aria-hidden="true" />
          <span className="mono-tag text-muted-foreground">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.08] text-balance">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

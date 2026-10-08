"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated system architecture diagram (SVG).
 * Client → API → {Database, Cache} → Background jobs.
 * Draws itself in on view; connection dashes flow continuously.
 */

const nodes = [
  { id: "client", label: "Web / Mobile Client", x: 300, y: 34, w: 176 },
  { id: "api", label: "API Layer", x: 300, y: 118, w: 176 },
  { id: "db", label: "PostgreSQL", x: 176, y: 210, w: 152 },
  { id: "cache", label: "Cache", x: 424, y: 210, w: 152 },
  { id: "jobs", label: "Background Jobs", x: 176, y: 302, w: 152 },
];

const edges = [
  "M 388 62 L 388 106", // client -> api
  "M 350 146 L 252 196", // api -> db
  "M 426 146 L 524 196", // api -> cache
  "M 252 236 L 252 288", // db -> jobs
];

export function ArchitectureDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 752 360"
      className={cn("w-full h-auto", className)}
      role="img"
      aria-label="System architecture diagram: web or mobile client connects to an API layer, which connects to a PostgreSQL database and a cache; the database feeds background jobs."
    >
      <defs>
        <linearGradient id="node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--elevated)" />
          <stop offset="100%" stopColor="var(--surface)" />
        </linearGradient>
        <linearGradient id="edge-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--green)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--blue)" stopOpacity="0.55" />
        </linearGradient>
        <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="blur">
            <animate
              attributeName="stdDeviation"
              values="4;8;4"
              dur={reduce ? "0.01s" : "4s"}
              repeatCount="indefinite"
            />
          </feGaussianBlur>
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="url(#edge-grad)"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.18, ease: "easeInOut" }}
        />
      ))}
      {/* Flowing data dashes on top of solid edges */}
      {edges.map((d, i) => (
        <path
          key={`flow-${i}`}
          d={d}
          fill="none"
          stroke="var(--green)"
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-dash"
          opacity="0.85"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isCore = n.id === "api";
        const w = n.w;
        const x = n.x - w / 2;
        return (
          <motion.g
            key={n.id}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.12 * i, ease: "easeOut" }}
          >
            <rect
              x={x}
              y={n.y - 18}
              width={w}
              height="42"
              rx="10"
              fill="url(#node-fill)"
              stroke={isCore ? "var(--green)" : "var(--border)"}
              strokeWidth={isCore ? 1.4 : 1}
              filter={isCore ? "url(#node-glow)" : undefined}
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fill={isCore ? "var(--foreground)" : "var(--muted-foreground)"}
              fontSize="13"
              fontFamily="var(--font-geist-mono), monospace"
              fontWeight={isCore ? 600 : 400}
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}

      {/* Little status pips */}
      <motion.circle
        cx={700}
        cy={34}
        r="4"
        fill="var(--green)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0.4, 1, 0.4] }}
        viewport={{ once: false }}
        animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <text
        x={700}
        y={60}
        textAnchor="middle"
        fill="var(--muted-foreground)"
        fontSize="9"
        fontFamily="var(--font-geist-mono), monospace"
      >
        LIVE
      </text>
    </svg>
  );
}

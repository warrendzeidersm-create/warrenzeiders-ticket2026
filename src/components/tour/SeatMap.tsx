import { useState } from "react";
import { hoverFill, seatSections } from "./data";

export function SeatMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 480 300"
      className="w-full"
      role="group"
      aria-label="Interactive venue seat map"
    >
      <text x="240" y="24" textAnchor="middle" fill="#8B8B8B" fontSize="11" letterSpacing="1">
        A–H (ROWS 6–17 UNDER ROOF)
      </text>
      <rect
        x="150"
        y="230"
        width="180"
        height="50"
        rx="6"
        fill="var(--stage)"
        stroke="rgba(255,255,255,0.3)"
      />
      <text x="240" y="260" textAnchor="middle" fill="#fff" fontSize="13" letterSpacing="2">
        STAGE
      </text>

      {seatSections.map((s) => {
        const isSel = selected === s.key;
        const isActive = isSel || hovered === s.key;
        const accent = hoverFill[s.group];
        return (
          <g key={s.key}>
            <rect
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={10}
              fill={isActive ? accent : "var(--seat)"}
              stroke={isSel ? accent : "rgba(255,255,255,0.15)"}
              strokeWidth={isSel ? 2 : 1}
              tabIndex={0}
              role="button"
              aria-label={s.label}
              aria-pressed={isSel}
              style={{
                cursor: "pointer",
                transition: "fill 200ms ease, filter 200ms ease",
                filter: isSel ? `drop-shadow(0 0 10px ${accent})` : "none",
              }}
              onMouseEnter={() => setHovered(s.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(isSel ? null : s.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(isSel ? null : s.key);
                }
              }}
            />
            <text
              x={s.x + s.w / 2}
              y={s.y + s.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={isActive ? "#000" : "#fff"}
              fontSize={10}
              fontWeight={600}
              style={{ pointerEvents: "none" }}
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function SeatMapLegend() {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-vip" />
        VIP Area
      </li>
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-reserved" />
        Reserved Seating
      </li>
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-standing" />
        Standing Room Only
      </li>
    </ul>
  );
}

export function SeatMapPanel() {
  return (
    <div className="rounded-card bg-panel p-4">
      <SeatMap />
      <SeatMapLegend />
    </div>
  );
}

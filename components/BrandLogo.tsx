"use client";

import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
}

export default function BrandLogo({
  size = "md",
  showTagline = true,
  className = "",
}: BrandLogoProps) {
  // Dimension configurations
  const dimensions = {
    sm: {
      box: "w-8 h-8 rounded-lg p-1.5 gap-[2px]",
      bar1: "h-[2.5px]",
      bar2: "h-[2.5px]",
      bar3: "h-[2.5px]",
      title: "text-lg font-black tracking-tight",
      tagline: "text-[9px] font-bold tracking-[0.14em]",
      gap: "gap-2.5",
    },
    md: {
      box: "w-10 h-10 rounded-xl p-2 gap-[3px]",
      bar1: "h-[3.5px]",
      bar2: "h-[3.5px]",
      bar3: "h-[3.5px]",
      title: "text-2xl font-black tracking-tight",
      tagline: "text-[10px] font-bold tracking-[0.16em]",
      gap: "gap-3",
    },
    lg: {
      box: "w-16 h-16 rounded-2xl p-3 gap-1.5",
      bar1: "h-[5px]",
      bar2: "h-[5px]",
      bar3: "h-[5px]",
      title: "text-4xl md:text-5xl font-black tracking-tight",
      tagline: "text-xs md:text-sm font-bold tracking-[0.2em]",
      gap: "gap-4 md:gap-5",
    },
    xl: {
      box: "w-24 h-24 rounded-3xl p-4 gap-2",
      bar1: "h-[7px]",
      bar2: "h-[7px]",
      bar3: "h-[7px]",
      title: "text-5xl md:text-6xl font-black tracking-tight",
      tagline: "text-sm md:text-base font-extrabold tracking-[0.24em]",
      gap: "gap-5 md:gap-6",
    },
  }[size];

  return (
    <div className={`flex items-center select-none ${dimensions.gap} ${className}`}>
      {/* Iconic 3-Bar Steel Logo Box */}
      <div
        className={`relative flex flex-col justify-center items-center shadow-2xl transition-transform duration-300 hover:scale-105 ${dimensions.box}`}
        style={{
          background: "linear-gradient(145deg, #475569, #1e293b 60%, #0f172a)",
          boxShadow:
            "0 10px 25px -4px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
        }}
      >
        {/* Top Steel Bar (Full, Silver) */}
        <span
          className={`w-full rounded-sm relative z-10 ${dimensions.bar1}`}
          style={{
            background: "linear-gradient(90deg, #f1f5f9, #94a3b8)",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.6)",
          }}
        />

        {/* Middle Steel Bar (78% width, Electric Cyan #38bdf8, Left-aligned) */}
        <span
          className={`w-[78%] self-start rounded-sm relative z-10 ${dimensions.bar2}`}
          style={{
            background: "linear-gradient(90deg, #38bdf8, #0ea5e9)",
            boxShadow: "0 0 8px rgba(56, 189, 248, 0.6), 0 1px 2px rgba(0, 0, 0, 0.6)",
          }}
        />

        {/* Bottom Steel Bar (88% width, Silver, Right-aligned) */}
        <span
          className={`w-[88%] self-end rounded-sm relative z-10 ${dimensions.bar3}`}
          style={{
            background: "linear-gradient(90deg, #cbd5e1, #64748b)",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.6)",
          }}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <h1
          className={`uppercase font-black text-transparent bg-clip-text leading-tight ${dimensions.title}`}
          style={{
            backgroundImage:
              "linear-gradient(180deg, #ffffff 15%, #e2e8f0 55%, #94a3b8 100%)",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7))",
          }}
        >
          Hold Steel!
        </h1>
        {showTagline && (
          <span
            className={`uppercase text-[#38bdf8] font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.4)] ${dimensions.tagline}`}
          >
            Lock The Stack
          </span>
        )}
      </div>
    </div>
  );
}


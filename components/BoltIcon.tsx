"use client";

import React from "react";

interface BoltIconProps {
  earned?: boolean;
  size?: number;
  className?: string;
}

export default function BoltIcon({
  earned = true,
  size = 14,
  className = "",
}: BoltIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`inline-block shrink-0 transition-all duration-200 select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={earned ? "Earned Bolt" : "Empty Bolt Socket"}
    >
      <defs>
        {/* Polished Silver Hex Head Gradient */}
        <linearGradient
          id="silverBoltGrad"
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#f1f5f9" />
          <stop offset="60%" stopColor="#cbd5e1" />
          <stop offset="85%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Recessed Socket Inner Gradient */}
        <linearGradient
          id="socketInnerGrad"
          x1="8"
          y1="8"
          x2="16"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {earned ? (
        <g style={{ filter: "drop-shadow(0 0 4px rgba(241, 245, 249, 0.5))" }}>
          {/* Polished Hexagonal Bolt Head */}
          <polygon
            points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"
            fill="url(#silverBoltGrad)"
            stroke="#ffffff"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />

          {/* Chamfer Inset Ring */}
          <circle
            cx="12"
            cy="12"
            r="6.2"
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="0.8"
          />

          {/* Hex Socket (Allen Key Indent) */}
          <polygon
            points="12,8 15.46,10 15.46,14 12,16 8.54,14 8.54,10"
            fill="url(#socketInnerGrad)"
            stroke="#94a3b8"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
        </g>
      ) : (
        /* Empty / Unearned Socket on Steel Plate */
        <g>
          {/* Dim Recessed Hex Socket */}
          <polygon
            points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"
            fill="#090d13"
            stroke="#1e293b"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Inset Hole */}
          <circle
            cx="12"
            cy="12"
            r="3.8"
            fill="#030712"
            stroke="#1e293b"
            strokeWidth="0.8"
          />
        </g>
      )}
    </svg>
  );
}


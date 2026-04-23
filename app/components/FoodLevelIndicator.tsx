"use client";
import React, { useEffect, useRef } from "react";
import { NeuCard } from "./ui/NeuCard";

interface FoodLevelIndicatorProps {
  percentage: number; // 0–100
}

export function FoodLevelIndicator({ percentage }: FoodLevelIndicatorProps) {
  const radius = 52;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    percentage > 50
      ? "var(--neu-accent)"
      : percentage > 20
        ? "var(--neu-warning)"
        : "var(--neu-error)";

  const label =
    percentage > 50
      ? "Plenty"
      : percentage > 20
        ? "Getting Low"
        : "Refill Soon";

  return (
    <NeuCard className="p-5 flex flex-col items-center gap-3">
      <h3
        className="text-sm font-semibold tracking-wide uppercase"
        style={{ color: "var(--neu-text-muted)" }}
      >
        Food Level
      </h3>

      {/* Circular progress */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 140, height: 140 }}
      >
        {/* Outer inset ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 5px 5px 12px var(--neu-shadow), inset -5px -5px 12px var(--neu-light)",
          }}
        />

        {/* SVG progress ring */}
        <svg width="140" height="140" className="-rotate-90">
          {/* Background track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="var(--neu-shadow)"
            strokeWidth={strokeWidth}
            opacity={0.3}
          />
          {/* Animated fill */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition:
                "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease",
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute flex flex-col items-center">
          <span
            className="text-3xl font-bold"
            style={{ color: "var(--neu-text)" }}
          >
            {percentage}%
          </span>
          <span className="text-[10px] font-medium mt-0.5" style={{ color }}>
            {label}
          </span>
        </div>
      </div>

      {/* Linear bar */}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height: 8,
          boxShadow:
            "inset 2px 2px 5px var(--neu-shadow), inset -2px -2px 5px var(--neu-light)",
          background: "var(--neu-bg)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, var(--neu-accent-light))`,
          }}
        />
      </div>

      <p className="text-xs" style={{ color: "var(--neu-text-muted)" }}>
        Approx. {Math.round((percentage / 100) * 500)}g remaining
      </p>
    </NeuCard>
  );
}

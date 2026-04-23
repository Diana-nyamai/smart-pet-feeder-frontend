"use client";
import React from "react";

interface NeuCardProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function NeuCard({
  children,
  className = "",
  inset = false,
  size = "md",
  onClick,
  style,
}: NeuCardProps) {
  const shadowClass = inset
    ? "neu-inset"
    : size === "sm"
      ? "neu-raised-sm"
      : size === "lg"
        ? "neu-raised-lg"
        : "neu-raised";

  return (
    <div
      className={`rounded-2xl ${shadowClass} ${onClick ? "cursor-pointer transition-all duration-200 active:scale-[0.98]" : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

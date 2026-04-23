"use client";
import React from "react";

interface NeuBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "accent";
  className?: string;
}

export function NeuBadge({
  children,
  variant = "default",
  className = "",
}: NeuBadgeProps) {
  const colors: Record<string, string> = {
    default: "var(--neu-text-muted)",
    success: "var(--neu-success)",
    warning: "var(--neu-warning)",
    error: "var(--neu-error)",
    accent: "var(--neu-accent)",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
      style={{
        background: "var(--neu-bg)",
        color: colors[variant],
        boxShadow: `2px 2px 5px var(--neu-shadow), -2px -2px 5px var(--neu-light)`,
      }}
    >
      {children}
    </span>
  );
}

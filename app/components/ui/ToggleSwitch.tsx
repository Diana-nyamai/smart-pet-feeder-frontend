"use client";
import React, { useState } from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}

export function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 cursor-pointer select-none focus:outline-none group"
    >
      {/* Track */}
      <div
        className="relative w-12 h-6 rounded-full transition-all duration-300"
        style={{
          background: checked
            ? "linear-gradient(145deg, #4a98c8, #6bbce8)"
            : "var(--neu-bg)",
          boxShadow: checked
            ? "inset 3px 3px 8px rgba(0,0,0,0.15), inset -3px -3px 6px rgba(255,255,255,0.25)"
            : "inset 3px 3px 8px var(--neu-shadow), inset -3px -3px 8px var(--neu-light)",
        }}
      >
        {/* Thumb */}
        <div
          className="toggle-thumb absolute top-1 w-4 h-4 rounded-full"
          style={{
            background: "var(--neu-bg)",
            boxShadow: checked
              ? "2px 2px 5px rgba(0,0,0,0.2), -1px -1px 3px rgba(255,255,255,0.5)"
              : "3px 3px 7px var(--neu-shadow), -3px -3px 7px var(--neu-light)",
            left: checked ? "calc(100% - 20px)" : "4px",
          }}
        />
      </div>
      {label && (
        <span
          className="text-sm font-medium"
          style={{ color: "var(--neu-text-light)" }}
        >
          {label}
        </span>
      )}
    </button>
  );
}

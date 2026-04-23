"use client";
import React, { useState } from "react";

interface FeedNowButtonProps {
  onFeed: () => void;
  isFeeding: boolean;
}

export function FeedNowButton({ onFeed, isFeeding }: FeedNowButtonProps) {
  const [pressed, setPressed] = useState(false);

  function handlePress() {
    if (isFeeding) return;
    setPressed(true);
    onFeed();
    setTimeout(() => setPressed(false), 300);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Pulse ring behind button */}
      <div className="relative flex items-center justify-center">
        {!isFeeding && (
          <div
            className="absolute rounded-full animate-pulse-ring"
            style={{
              width: 120,
              height: 120,
              background: "var(--neu-accent-light)",
              opacity: 0.25,
            }}
          />
        )}

        {/* Main button */}
        <button
          onClick={handlePress}
          disabled={isFeeding}
          aria-label="Feed now"
          className="relative z-10 rounded-full flex flex-col items-center justify-center transition-all duration-200 focus:outline-none select-none"
          style={{
            width: 100,
            height: 100,
            background: isFeeding
              ? "linear-gradient(145deg, #4a98c8, #6bbce8)"
              : "var(--neu-bg)",
            boxShadow:
              pressed || isFeeding
                ? "inset 5px 5px 12px var(--neu-shadow), inset -5px -5px 12px var(--neu-light)"
                : "8px 8px 18px var(--neu-shadow), -8px -8px 18px var(--neu-light)",
            transform: pressed ? "scale(0.96)" : "scale(1)",
          }}
        >
          {/* Inner circle */}
          <div
            className="rounded-full flex flex-col items-center justify-center"
            style={{
              width: 72,
              height: 72,
              background: isFeeding
                ? "rgba(255,255,255,0.15)"
                : "linear-gradient(145deg, #6bbce8, #4a98c8)",
              boxShadow: isFeeding
                ? "none"
                : "4px 4px 10px rgba(60,130,180,0.4), -2px -2px 6px rgba(255,255,255,0.5)",
            }}
          >
            {isFeeding ? (
              /* Spinner */
              <svg
                className="animate-spin"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            ) : (
              /* Paw icon */
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <ellipse cx="6" cy="7" rx="2" ry="2.5" />
                <ellipse cx="10" cy="4.5" rx="1.8" ry="2.2" />
                <ellipse cx="14" cy="4.5" rx="1.8" ry="2.2" />
                <ellipse cx="18" cy="7" rx="2" ry="2.5" />
                <path d="M12 9.5c-4 0-7 2.5-6.5 6 .3 2 1.8 3.5 3.8 3.5 1 0 1.7-.3 2.7-.3s1.7.3 2.7.3c2 0 3.5-1.5 3.8-3.5.5-3.5-2.5-6-6.5-6z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      <span
        className="text-sm font-semibold tracking-wide"
        style={{
          color: isFeeding ? "var(--neu-accent)" : "var(--neu-text-light)",
        }}
      >
        {isFeeding ? "Feeding…" : "Feed Now"}
      </span>
    </div>
  );
}

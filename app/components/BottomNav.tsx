"use client";
import React from "react";
import { Home, Calendar, Bell, Settings } from "lucide-react";

export type Page = "dashboard" | "schedule" | "notifications" | "settings";

interface BottomNavProps {
  active: Page;
  onNavigate: (page: Page) => void;
  notifCount?: number;
}

const NAV_ITEMS: {
  page: Page;
  label: string;
  icon: React.FC<{ size: number; color: string }>;
}[] = [
  {
    page: "dashboard",
    label: "Home",
    icon: ({ size, color }) => <Home size={size} color={color} />,
  },
  {
    page: "schedule",
    label: "Schedule",
    icon: ({ size, color }) => <Calendar size={size} color={color} />,
  },
  {
    page: "notifications",
    label: "Alerts",
    icon: ({ size, color }) => <Bell size={size} color={color} />,
  },
  {
    page: "settings",
    label: "Settings",
    icon: ({ size, color }) => <Settings size={size} color={color} />,
  },
];

export function BottomNav({
  active,
  onNavigate,
  notifCount = 0,
}: BottomNavProps) {
  return (
    <nav
      className="sticky bottom-0 z-40 px-4 pb-safe"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
    >
      <div
        className="flex items-center justify-around py-2 rounded-2xl mx-auto max-w-sm"
        style={{
          background: "var(--neu-bg)",
          boxShadow:
            "0 -2px 20px rgba(44,95,122,0.08), 8px 8px 20px var(--neu-shadow), -8px -8px 20px var(--neu-light)",
        }}
      >
        {NAV_ITEMS.map(({ page, label, icon: Icon }) => {
          const isActive = active === page;
          const showBadge = page === "notifications" && notifCount > 0;

          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-250 focus:outline-none active:scale-95"
              style={{
                background: isActive ? "var(--neu-bg)" : "transparent",
                boxShadow: isActive
                  ? "inset 3px 3px 8px var(--neu-shadow), inset -3px -3px 8px var(--neu-light)"
                  : "none",
                minWidth: 60,
              }}
            >
              <Icon
                size={20}
                color={isActive ? "var(--neu-accent)" : "var(--neu-text-muted)"}
              />
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: isActive
                    ? "var(--neu-accent)"
                    : "var(--neu-text-muted)",
                }}
              >
                {label}
              </span>

              {/* Notification badge */}
              {showBadge && (
                <span
                  className="absolute top-1.5 right-2 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                  style={{ background: "var(--neu-error)" }}
                >
                  {notifCount > 9 ? "9+" : notifCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

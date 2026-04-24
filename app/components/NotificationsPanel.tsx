"use client";
import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Info, Bell, X } from "lucide-react";
import { NeuCard } from "./ui/NeuCard";
import { NeuBadge } from "./ui/NeuBadge";

type NotificationType = "warning" | "success" | "info";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "warning",
    title: "Low Food Level",
    message: "Food level is below 20%. Please refill the dispenser soon.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Feeding Completed",
    message: "Darcy received his scheduled 07:30 meal — 75g served.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Schedule Updated",
    message: "Evening feeding schedule has been enabled for 18:30.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "success",
    title: "Feeding Completed",
    message: "Darcy received his midday meal — 50g served.",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "warning",
    title: "Device Offline",
    message: "Feeder was briefly offline for 3 minutes. Now reconnected.",
    time: "2 days ago",
    read: true,
  },
];

const iconMap: Record<NotificationType, React.ReactNode> = {
  warning: <AlertTriangle size={18} />,
  success: <CheckCircle size={18} />,
  info: <Info size={18} />,
};

const colorMap: Record<NotificationType, string> = {
  warning: "var(--neu-warning)",
  success: "var(--neu-success)",
  info: "var(--neu-accent)",
};

const gradientMap: Record<NotificationType, string> = {
  warning: "linear-gradient(145deg, #f0c070, #e8a44a)",
  success: "linear-gradient(145deg, #80d0a8, #4caf8a)",
  info: "linear-gradient(145deg, #a8d4f0, #5ba8d6)",
};

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS,
  );

  const unread = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: number) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--neu-text)" }}
          >
            Notifications
          </h2>
          {unread > 0 && (
            <span
              className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
              style={{ background: "var(--neu-error)" }}
            >
              {unread}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold transition-all duration-200 focus:outline-none"
            style={{ color: "var(--neu-accent)" }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Empty state */}
      {notifications.length === 0 && (
        <NeuCard className="p-8 flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "var(--neu-bg)",
              boxShadow:
                "inset 4px 4px 10px var(--neu-shadow), inset -4px -4px 10px var(--neu-light)",
            }}
          >
            <Bell size={24} color="var(--neu-text-muted)" />
          </div>
          <p
            className="text-sm text-center"
            style={{ color: "var(--neu-text-muted)" }}
          >
            You&apos;re all caught up! No notifications.
          </p>
        </NeuCard>
      )}

      {/* Notification cards */}
      <div className="flex flex-col gap-3">
        {notifications.map((notif) => (
          <NeuCard
            key={notif.id}
            className={`p-4 transition-all duration-300 ${!notif.read ? "cursor-pointer" : ""}`}
            onClick={() => !notif.read && markRead(notif.id)}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                style={{
                  background: gradientMap[notif.type],
                  boxShadow:
                    "3px 3px 8px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
                  color: "white",
                }}
              >
                {iconMap[notif.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: notif.read
                        ? "var(--neu-text-light)"
                        : "var(--neu-text)",
                    }}
                  >
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: "var(--neu-accent)" }}
                    />
                  )}
                </div>
                <p
                  className="text-xs mt-0.5 leading-relaxed"
                  style={{ color: "var(--neu-text-muted)" }}
                >
                  {notif.message}
                </p>
                <p
                  className="text-[10px] mt-1.5 font-medium"
                  style={{ color: colorMap[notif.type] }}
                >
                  {notif.time}
                </p>
              </div>

              {/* Dismiss */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismiss(notif.id);
                }}
                className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none"
                aria-label="Dismiss notification"
                style={{
                  background: "var(--neu-bg)",
                  boxShadow:
                    "2px 2px 5px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
                }}
              >
                <X size={11} color="var(--neu-text-muted)" />
              </button>
            </div>

            {/* Unread indicator bar */}
            {!notif.read && (
              <div
                className="mt-3 h-0.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colorMap[notif.type]}, transparent)`,
                  opacity: 0.5,
                }}
              />
            )}
          </NeuCard>
        ))}
      </div>
    </div>
  );
}

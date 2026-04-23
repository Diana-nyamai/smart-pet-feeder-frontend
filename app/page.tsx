"use client";
import React, { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { ScheduleFeeding } from "./components/ScheduleFeeding";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { Settings } from "./components/Settings";
import { BottomNav, type Page } from "./components/BottomNav";

export default function Home() {
  const [page, setPage] = useState<Page>("dashboard");
  const [prevPage, setPrevPage] = useState<Page>("dashboard");
  const [isFeeding, setIsFeeding] = useState(false);
  const [mealsToday, setMealsToday] = useState(2);
  const [totalPortions, setTotalPortions] = useState(125);
  const [foodLevel, setFoodLevel] = useState(63);
  const [lastFed, setLastFed] = useState("2 hours ago");
  const [notifCount, setNotifCount] = useState(2);

  function handleFeedNow() {
    setIsFeeding(true);
    setTimeout(() => {
      setIsFeeding(false);
      setMealsToday((m) => m + 1);
      setTotalPortions((t) => t + 75);
      setFoodLevel((f) => Math.max(0, f - 10));
      setLastFed("just now");
    }, 2500);
  }

  function handleNavigate(newPage: Page) {
    setPrevPage(page);
    setPage(newPage);
    if (newPage === "notifications") setNotifCount(0);
  }

  const pageKey = page; // used to re-trigger fade animation on page change

  return (
    <div
      className="flex flex-col min-h-dvh"
      style={{ background: "var(--neu-bg)", maxWidth: 480, margin: "0 auto" }}
    >
      {/* Top bar */}
      <header className="px-5 pt-6 pb-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {/* Logo mark */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, #6bbce8, #4a98c8)",
              boxShadow:
                "3px 3px 8px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <ellipse
                cx="4.5"
                cy="5"
                rx="1.5"
                ry="1.8"
                fill="white"
                opacity={0.9}
              />
              <ellipse
                cx="7.5"
                cy="3.2"
                rx="1.3"
                ry="1.6"
                fill="white"
                opacity={0.9}
              />
              <ellipse
                cx="10.5"
                cy="3.2"
                rx="1.3"
                ry="1.6"
                fill="white"
                opacity={0.9}
              />
              <ellipse
                cx="13.5"
                cy="5"
                rx="1.5"
                ry="1.8"
                fill="white"
                opacity={0.9}
              />
              <path
                d="M9 7c-3 0-5.2 1.8-4.8 4.5.2 1.5 1.3 2.5 2.8 2.5.7 0 1.2-.2 2-.2s1.3.2 2 .2c1.5 0 2.6-1 2.8-2.5C14.2 8.8 12 7 9 7z"
                fill="white"
                opacity={0.9}
              />
            </svg>
          </div>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: "var(--neu-text)" }}
          >
            PawFeeder
          </span>
        </div>
        {/* Status dot */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--neu-success)" }}
          />
          <span className="text-xs" style={{ color: "var(--neu-text-muted)" }}>
            Online
          </span>
        </div>
      </header>

      {/* Page content — scrollable */}
      <main className="flex-1 overflow-y-auto" key={pageKey}>
        {page === "dashboard" && (
          <Dashboard
            catName="Darcy"
            lastFed={lastFed}
            mealsToday={mealsToday}
            totalPortions={totalPortions}
            foodLevel={foodLevel}
            isFeeding={isFeeding}
            onFeedNow={handleFeedNow}
          />
        )}
        {page === "schedule" && <ScheduleFeeding />}
        {page === "notifications" && <NotificationsPanel />}
        {page === "settings" && <Settings />}
      </main>

      {/* Bottom navigation */}
      <BottomNav
        active={page}
        onNavigate={handleNavigate}
        notifCount={notifCount}
      />
    </div>
  );
}

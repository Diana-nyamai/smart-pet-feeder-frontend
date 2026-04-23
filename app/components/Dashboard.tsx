"use client";
import React from "react";
import { Clock, Utensils, TrendingUp } from "lucide-react";
import { NeuCard } from "./ui/NeuCard";
import { NeuBadge } from "./ui/NeuBadge";
import { FeedNowButton } from "./FeedNowButton";
import { FoodLevelIndicator } from "./FoodLevelIndicator";

interface DashboardProps {
  catName: string;
  lastFed: string;
  mealsToday: number;
  totalPortions: number;
  foodLevel: number;
  isFeeding: boolean;
  onFeedNow: () => void;
}

export function Dashboard({
  catName,
  lastFed,
  mealsToday,
  totalPortions,
  foodLevel,
  isFeeding,
  onFeedNow,
}: DashboardProps) {
  return (
    <div className="flex flex-col gap-5 px-4 py-5 animate-fade-up">
      {/* Header / Cat Profile */}
      <NeuCard className="p-5 flex items-center gap-4">
        {/* Cat avatar */}
        <div
          className="relative shrink-0 rounded-full flex items-center justify-center animate-float"
          style={{
            width: 70,
            height: 70,
            background: "var(--neu-bg)",
            boxShadow:
              "5px 5px 12px var(--neu-shadow), -5px -5px 12px var(--neu-light)",
          }}
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 56,
              height: 56,
              background: "linear-gradient(145deg, #a8d4f0, #6bbce8)",
              boxShadow: "3px 3px 8px rgba(60,130,180,0.3)",
            }}
          >
            {/* Cat face SVG */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              {/* Head */}
              <circle cx="18" cy="20" r="12" fill="white" opacity={0.9} />
              {/* Left ear */}
              <polygon points="8,10 12,20 4,20" fill="white" opacity={0.9} />
              {/* Right ear */}
              <polygon points="28,10 24,20 32,20" fill="white" opacity={0.9} />
              {/* Left ear inner */}
              <polygon points="8,12 11,19 5,19" fill="#a8d4f0" opacity={0.8} />
              {/* Right ear inner */}
              <polygon
                points="28,12 25,19 31,19"
                fill="#a8d4f0"
                opacity={0.8}
              />
              {/* Eyes */}
              <ellipse cx="14" cy="19" rx="2" ry="2.2" fill="#2c5f7a" />
              <ellipse cx="22" cy="19" rx="2" ry="2.2" fill="#2c5f7a" />
              {/* Eye shine */}
              <circle cx="14.7" cy="18.3" r="0.6" fill="white" />
              <circle cx="22.7" cy="18.3" r="0.6" fill="white" />
              {/* Nose */}
              <ellipse cx="18" cy="23" rx="1.2" ry="0.8" fill="#e8a4c0" />
              {/* Mouth */}
              <path
                d="M16.5 24 Q18 25.5 19.5 24"
                stroke="#d4849c"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
              />
              {/* Whiskers left */}
              <line
                x1="6"
                y1="22"
                x2="14"
                y2="23"
                stroke="#b8cfe0"
                strokeWidth="0.6"
              />
              <line
                x1="6"
                y1="24"
                x2="14"
                y2="23.8"
                stroke="#b8cfe0"
                strokeWidth="0.6"
              />
              {/* Whiskers right */}
              <line
                x1="30"
                y1="22"
                x2="22"
                y2="23"
                stroke="#b8cfe0"
                strokeWidth="0.6"
              />
              <line
                x1="30"
                y1="24"
                x2="22"
                y2="23.8"
                stroke="#b8cfe0"
                strokeWidth="0.6"
              />
            </svg>
          </div>
          {/* Online dot */}
          <div
            className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2"
            style={{
              background: "var(--neu-success)",
              borderColor: "var(--neu-bg)",
            }}
          />
        </div>

        {/* Cat info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2
              className="text-xl font-bold truncate"
              style={{ color: "var(--neu-text)" }}
            >
              {catName}
            </h2>
            <NeuBadge variant="success">Online</NeuBadge>
          </div>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--neu-text-light)" }}
          >
            Your fluffy companion 🐾
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Clock size={13} color="var(--neu-text-muted)" />
            <span
              className="text-xs"
              style={{ color: "var(--neu-text-muted)" }}
            >
              Last fed {lastFed}
            </span>
          </div>
        </div>
      </NeuCard>

      {/* Feed Now Section */}
      <NeuCard className="p-6 flex flex-col items-center gap-4">
        <FeedNowButton onFeed={onFeedNow} isFeeding={isFeeding} />
      </NeuCard>

      {/* Daily Summary */}
      <div className="grid grid-cols-2 gap-4">
        <NeuCard className="p-4 flex flex-col gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, #a8d4f0, #6bbce8)",
              boxShadow:
                "3px 3px 7px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
            }}
          >
            <Utensils size={16} color="white" />
          </div>
          <div>
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--neu-text)" }}
            >
              {mealsToday}
            </p>
            <p className="text-xs" style={{ color: "var(--neu-text-muted)" }}>
              Meals today
            </p>
          </div>
        </NeuCard>

        <NeuCard className="p-4 flex flex-col gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, #b0e0c8, #5cba90)",
              boxShadow:
                "3px 3px 7px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
            }}
          >
            <TrendingUp size={16} color="white" />
          </div>
          <div>
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--neu-text)" }}
            >
              {totalPortions}g
            </p>
            <p className="text-xs" style={{ color: "var(--neu-text-muted)" }}>
              Served today
            </p>
          </div>
        </NeuCard>
      </div>

      {/* Food Level */}
      <FoodLevelIndicator percentage={foodLevel} />
    </div>
  );
}

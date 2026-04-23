"use client";
import React, { useState } from "react";
import { Plus, Trash2, Clock } from "lucide-react";
import { NeuCard } from "./ui/NeuCard";
import { ToggleSwitch } from "./ui/ToggleSwitch";

interface Schedule {
  id: number;
  time: string;
  portion: number;
  enabled: boolean;
  label: string;
}

const PORTION_OPTIONS = [25, 50, 75, 100, 150];

export function ScheduleFeeding() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, time: "07:30", portion: 75, enabled: true, label: "Morning" },
    { id: 2, time: "12:00", portion: 50, enabled: true, label: "Midday" },
    { id: 3, time: "18:30", portion: 75, enabled: false, label: "Evening" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTime, setNewTime] = useState("08:00");
  const [newPortion, setNewPortion] = useState(50);
  const [newLabel, setNewLabel] = useState("");

  function toggleSchedule(id: number) {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  }

  function deleteSchedule(id: number) {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  }

  function addSchedule() {
    if (!newTime) return;
    setSchedules((prev) => [
      ...prev,
      {
        id: Date.now(),
        time: newTime,
        portion: newPortion,
        enabled: true,
        label: newLabel || "Custom",
      },
    ]);
    setShowAdd(false);
    setNewLabel("");
    setNewTime("08:00");
    setNewPortion(50);
  }

  function formatTime(time: string) {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hr = h % 12 === 0 ? 12 : h % 12;
    return `${hr}:${m.toString().padStart(2, "0")} ${ampm}`;
  }

  return (
    <div className="flex flex-col gap-5 px-4 py-5 animate-fade-up">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--neu-text)" }}
          >
            Feeding Schedule
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--neu-text-muted)" }}
          >
            {schedules.filter((s) => s.enabled).length} active schedules
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none"
          aria-label="Add schedule"
          style={{
            background: "linear-gradient(145deg, #6bbce8, #4a98c8)",
            boxShadow:
              "4px 4px 10px var(--neu-shadow), -3px -3px 7px var(--neu-light)",
          }}
        >
          <Plus size={18} color="white" />
        </button>
      </div>

      {/* Schedule list */}
      <div className="flex flex-col gap-3">
        {schedules.map((schedule) => (
          <NeuCard key={schedule.id} className="p-4">
            <div className="flex items-center gap-3">
              {/* Time icon */}
              <div
                className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center"
                style={{
                  background: schedule.enabled
                    ? "linear-gradient(145deg, #a8d4f0, #5ba8d6)"
                    : "var(--neu-bg)",
                  boxShadow: schedule.enabled
                    ? "3px 3px 8px var(--neu-shadow), -2px -2px 5px var(--neu-light)"
                    : "inset 2px 2px 6px var(--neu-shadow), inset -2px -2px 6px var(--neu-light)",
                }}
              >
                <Clock
                  size={18}
                  color={schedule.enabled ? "white" : "var(--neu-text-muted)"}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-lg font-bold"
                    style={{
                      color: schedule.enabled
                        ? "var(--neu-text)"
                        : "var(--neu-text-muted)",
                    }}
                  >
                    {formatTime(schedule.time)}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--neu-text-muted)" }}
                  >
                    {schedule.label}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--neu-accent)" }}
                  >
                    {schedule.portion}g portion
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={schedule.enabled}
                  onChange={() => toggleSchedule(schedule.id)}
                />
                <button
                  onClick={() => deleteSchedule(schedule.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none"
                  aria-label="Delete schedule"
                  style={{
                    background: "var(--neu-bg)",
                    boxShadow:
                      "2px 2px 6px var(--neu-shadow), -2px -2px 6px var(--neu-light)",
                  }}
                >
                  <Trash2 size={13} color="var(--neu-error)" />
                </button>
              </div>
            </div>

            {/* Portion bar */}
            <div className="mt-3">
              <div
                className="w-full rounded-full overflow-hidden"
                style={{
                  height: 5,
                  boxShadow:
                    "inset 1px 1px 3px var(--neu-shadow), inset -1px -1px 3px var(--neu-light)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(schedule.portion / 150) * 100}%`,
                    background: schedule.enabled
                      ? "linear-gradient(90deg, var(--neu-accent), var(--neu-accent-light))"
                      : "var(--neu-shadow)",
                    opacity: schedule.enabled ? 1 : 0.5,
                  }}
                />
              </div>
            </div>
          </NeuCard>
        ))}
      </div>

      {/* Add Schedule Modal */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{
            background: "rgba(44,95,122,0.2)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAdd(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-6 pb-10 animate-fade-up"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "-4px -8px 20px var(--neu-shadow)",
            }}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-5"
              style={{ background: "var(--neu-shadow)" }}
            />
            <h3
              className="text-lg font-bold mb-5"
              style={{ color: "var(--neu-text)" }}
            >
              Add Feeding Schedule
            </h3>

            {/* Label */}
            <label className="block mb-3">
              <span
                className="text-xs font-semibold mb-1.5 block uppercase tracking-wide"
                style={{ color: "var(--neu-text-muted)" }}
              >
                Label
              </span>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g. Breakfast"
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{
                  background: "var(--neu-bg)",
                  color: "var(--neu-text)",
                  boxShadow:
                    "inset 3px 3px 7px var(--neu-shadow), inset -3px -3px 7px var(--neu-light)",
                }}
              />
            </label>

            {/* Time picker */}
            <label className="block mb-3">
              <span
                className="text-xs font-semibold mb-1.5 block uppercase tracking-wide"
                style={{ color: "var(--neu-text-muted)" }}
              >
                Time
              </span>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{
                  background: "var(--neu-bg)",
                  color: "var(--neu-text)",
                  boxShadow:
                    "inset 3px 3px 7px var(--neu-shadow), inset -3px -3px 7px var(--neu-light)",
                }}
              />
            </label>

            {/* Portion picker */}
            <div className="mb-5">
              <span
                className="text-xs font-semibold mb-2 block uppercase tracking-wide"
                style={{ color: "var(--neu-text-muted)" }}
              >
                Portion Size
              </span>
              <div className="flex gap-2 flex-wrap">
                {PORTION_OPTIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setNewPortion(p)}
                    className="px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none"
                    style={{
                      background: "var(--neu-bg)",
                      color:
                        newPortion === p
                          ? "var(--neu-accent)"
                          : "var(--neu-text-light)",
                      boxShadow:
                        newPortion === p
                          ? "inset 3px 3px 7px var(--neu-shadow), inset -3px -3px 7px var(--neu-light)"
                          : "3px 3px 7px var(--neu-shadow), -3px -3px 7px var(--neu-light)",
                    }}
                  >
                    {p}g
                  </button>
                ))}
              </div>
            </div>

            {/* Save */}
            <button
              onClick={addSchedule}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all duration-200 active:scale-[0.98] focus:outline-none"
              style={{
                background: "linear-gradient(145deg, #6bbce8, #4a98c8)",
                boxShadow:
                  "5px 5px 14px var(--neu-shadow), -4px -4px 10px var(--neu-light)",
              }}
            >
              Save Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

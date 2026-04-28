"use client";
import React, { useState } from "react";
import {
  Wifi,
  WifiOff,
  ChevronRight,
  Volume2,
  VolumeX,
  Smartphone,
  Sliders,
} from "lucide-react";
import { NeuCard } from "./ui/NeuCard";
import { ToggleSwitch } from "./ui/ToggleSwitch";

const PORTION_OPTIONS = [25, 50, 75, 100, 125, 150];

export function Settings() {
  const [defaultPortion, setDefaultPortion] = useState(75);
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [notifLowFood, setNotifLowFood] = useState(true);
  const [notifFeedComplete, setNotifFeedComplete] = useState(true);
  const [notifSchedule, setNotifSchedule] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [catName, setCatName] = useState("Darcy");

  return (
    <div className="flex flex-col gap-5 px-4 py-5 animate-fade-up">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "var(--neu-text)" }}>
          Settings
        </h2>
        <p
          className="text-xs mt-0.5"
          style={{ color: "var(--neu-text-muted)" }}
        >
          Manage your feeder preferences
        </p>
      </div>

      {/* Device */}
      <section>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 px-1"
          style={{ color: "var(--neu-text-muted)" }}
        >
          Device
        </p>
        <NeuCard className="overflow-hidden">
          {/* Connection status */}
          <div className="flex items-center gap-3 p-4">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
              style={{
                background: deviceConnected
                  ? "linear-gradient(145deg, #80d0a8, #4caf8a)"
                  : "linear-gradient(145deg, #f0a8a8, #e06b6b)",
                boxShadow:
                  "3px 3px 8px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
              }}
            >
              {deviceConnected ? (
                <Wifi size={17} color="white" />
              ) : (
                <WifiOff size={17} color="white" />
              )}
            </div>
            <div className="flex-1">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--neu-text)" }}
              >
                MeowFeeder Pro
              </p>
              <p
                className="text-xs"
                style={{
                  color: deviceConnected
                    ? "var(--neu-success)"
                    : "var(--neu-error)",
                }}
              >
                {deviceConnected ? "Connected" : "Disconnected"}
              </p>
            </div>
            <button
              onClick={() => setDeviceConnected((v) => !v)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 focus:outline-none"
              style={{
                background: "var(--neu-bg)",
                color: deviceConnected
                  ? "var(--neu-error)"
                  : "var(--neu-success)",
                boxShadow:
                  "3px 3px 7px var(--neu-shadow), -3px -3px 7px var(--neu-light)",
              }}
            >
              {deviceConnected ? "Disconnect" : "Connect"}
            </button>
          </div>

          <div
            className="h-px mx-4"
            style={{ background: "var(--neu-shadow)", opacity: 0.3 }}
          />

          {/* Cat name */}
          <div className="flex items-center gap-3 p-4">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #a8d4f0, #5ba8d6)",
                boxShadow:
                  "3px 3px 8px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
              }}
            >
              <Smartphone size={17} color="white" />
            </div>
            <div className="flex-1">
              <p
                className="text-xs mb-1"
                style={{ color: "var(--neu-text-muted)" }}
              >
                Pet Name
              </p>
              <input
                type="text"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full text-sm font-semibold bg-transparent focus:outline-none"
                style={{ color: "var(--neu-text)" }}
                maxLength={20}
              />
            </div>
            <ChevronRight size={16} color="var(--neu-text-muted)" />
          </div>
        </NeuCard>
      </section>

      {/* Portion size */}
      <section>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 px-1"
          style={{ color: "var(--neu-text-muted)" }}
        >
          Default Portion
        </p>
        <NeuCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #c0b0f0, #8878d0)",
                boxShadow:
                  "3px 3px 8px var(--neu-shadow), -2px -2px 5px var(--neu-light)",
              }}
            >
              <Sliders size={17} color="white" />
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--neu-text)" }}
              >
                Portion Size
              </p>
              <p className="text-xs" style={{ color: "var(--neu-accent)" }}>
                {defaultPortion}g per feeding
              </p>
            </div>
          </div>

          {/* Portion slider */}
          <div className="relative mt-1 mb-2">
            <div
              className="w-full h-2 rounded-full"
              style={{
                boxShadow:
                  "inset 2px 2px 5px var(--neu-shadow), inset -2px -2px 5px var(--neu-light)",
                background: "var(--neu-bg)",
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((defaultPortion - 25) / 125) * 100}%`,
                  background:
                    "linear-gradient(90deg, var(--neu-accent), var(--neu-accent-light))",
                }}
              />
            </div>
            <input
              type="range"
              min={25}
              max={150}
              step={25}
              value={defaultPortion}
              onChange={(e) => setDefaultPortion(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              aria-label="Portion size"
            />
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {PORTION_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => setDefaultPortion(p)}
                className="flex-1 min-w-11 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus:outline-none active:scale-95"
                style={{
                  background: "var(--neu-bg)",
                  color:
                    defaultPortion === p
                      ? "var(--neu-accent)"
                      : "var(--neu-text-muted)",
                  boxShadow:
                    defaultPortion === p
                      ? "inset 3px 3px 7px var(--neu-shadow), inset -3px -3px 7px var(--neu-light)"
                      : "3px 3px 7px var(--neu-shadow), -3px -3px 7px var(--neu-light)",
                }}
              >
                {p}g
              </button>
            ))}
          </div>
        </NeuCard>
      </section>

      {/* Notifications */}
      <section>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 px-1"
          style={{ color: "var(--neu-text-muted)" }}
        >
          Notifications
        </p>
        <NeuCard className="overflow-hidden">
          {[
            {
              label: "Low food level alerts",
              value: notifLowFood,
              set: setNotifLowFood,
            },
            {
              label: "Feeding completed",
              value: notifFeedComplete,
              set: setNotifFeedComplete,
            },
            {
              label: "Schedule reminders",
              value: notifSchedule,
              set: setNotifSchedule,
            },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-sm" style={{ color: "var(--neu-text)" }}>
                  {item.label}
                </span>
                <ToggleSwitch checked={item.value} onChange={item.set} />
              </div>
              {i < arr.length - 1 && (
                <div
                  className="h-px mx-4"
                  style={{ background: "var(--neu-shadow)", opacity: 0.3 }}
                />
              )}
            </React.Fragment>
          ))}
        </NeuCard>
      </section>

      {/* Sound */}
      <section>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 px-1"
          style={{ color: "var(--neu-text-muted)" }}
        >
          Sound
        </p>
        <NeuCard className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
              style={{
                background: soundEnabled
                  ? "linear-gradient(145deg, #f0d080, #d4a840)"
                  : "var(--neu-bg)",
                boxShadow: soundEnabled
                  ? "3px 3px 8px var(--neu-shadow), -2px -2px 5px var(--neu-light)"
                  : "inset 3px 3px 7px var(--neu-shadow), inset -3px -3px 7px var(--neu-light)",
              }}
            >
              {soundEnabled ? (
                <Volume2 size={17} color="white" />
              ) : (
                <VolumeX size={17} color="var(--neu-text-muted)" />
              )}
            </div>
            <p className="text-sm" style={{ color: "var(--neu-text)" }}>
              Sound effects
            </p>
          </div>
          <ToggleSwitch checked={soundEnabled} onChange={setSoundEnabled} />
        </NeuCard>
      </section>

      {/* App version */}
      <p
        className="text-center text-xs pb-4"
        style={{ color: "var(--neu-text-muted)" }}
      >
        MeowFeeder v1.0.0 · Made with 💙
      </p>
    </div>
  );
}

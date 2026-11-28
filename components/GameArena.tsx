"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import BrandLogo from "./BrandLogo";
import BoltIcon from "./BoltIcon";
import { sound } from "./SoundFX";
import { getStage } from "@/lib/stages";

interface SteelPlateDef {
  id: number;
  name: string;
  gradient: string;
  svg: React.ReactNode;
}

const STEEL_ALLOYS: SteelPlateDef[] = [
  {
    id: 0,
    name: "Crimson Steel",
    gradient: "linear-gradient(135deg, #e11d48 0%, #be123c 50%, #9f1239 100%)",
    svg: <circle cx="12" cy="12" r="7" />,
  },
  {
    id: 1,
    name: "Cobalt Alloy",
    gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)",
    svg: <polygon points="12 4 20 19 4 19" />,
  },
  {
    id: 2,
    name: "Emerald Chrome",
    gradient: "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
    svg: <rect x="5" y="5" width="14" height="14" rx="2" />,
  },
  {
    id: 3,
    name: "Brass Ingot",
    gradient: "linear-gradient(135deg, #d97706 0%, #b45309 50%, #92400e 100%)",
    svg: <polygon points="12 3 21 12 12 21 3 12" />,
  },
  {
    id: 4,
    name: "Titanium Violet",
    gradient: "linear-gradient(135deg, #9333ea 0%, #7e22ce 50%, #6b21a8 100%)",
    svg: <polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9" />,
  },
  {
    id: 5,
    name: "Tungsten Cyan",
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #155e75 100%)",
    svg: <polygon points="12 3 20 8 20 16 12 21 4 16 4 8" />,
  },
  {
    id: 6,
    name: "Silver Platinum",
    gradient: "linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)",
    svg: <polygon points="7 2 17 2 22 7 22 17 17 22 7 22 2 17 2 7" />,
  },
  {
    id: 7,
    name: "Molten Gold",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    svg: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  },
];

interface GameArenaProps {
  levelNumber: number;
  onBackToLevels: () => void;
  onNextLevel?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function GameArena({
  levelNumber,
  onBackToLevels,
  onNextLevel,
  soundEnabled,
  onToggleSound,
}: GameArenaProps) {
  // Determine level configuration based on curated stages 1-10 or generator
  const stageData = useMemo(() => getStage(levelNumber), [levelNumber]);
  const initialBars = stageData.initialRack;
  const targetIds = stageData.targetBlueprint;
  const parMoves = stageData.parMoves;
  const stageName = stageData.name;
  const lockedSet = useMemo(() => new Set(stageData.lockedIds ?? []), [stageData.lockedIds]);
  const releaseSet = useMemo(() => new Set(stageData.releaseSlots ?? []), [stageData.releaseSlots]);
  const timedLocks = useMemo(() => stageData.timedLocks ?? {}, [stageData.timedLocks]);

  const [activeRack, setActiveRack] = useState<number[]>(initialBars);
  const [timedCounters, setTimedCounters] = useState<Record<number, number>>(timedLocks);
  const [history, setHistory] = useState<{ rack: number[]; counters: Record<number, number> }[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [justMovedId, setJustMovedId] = useState<number | null>(null);

  // Entrance animation states: Rack slide-in and Blueprint rolling shutter
  const [animKey, setAnimKey] = useState(0);
  const [entranceActive, setEntranceActive] = useState(false);
  const [entranceSettled, setEntranceSettled] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(false);

  // Reset & level entry sequence
  useEffect(() => {
    setActiveRack(initialBars);
    setTimedCounters(timedLocks);
    setHistory([]);
    setMoves(0);
    setIsWon(false);
    setJustMovedId(null);

    // Trigger fluid wave entrance animation
    setEntranceActive(false);
    setEntranceSettled(false);
    setShutterOpen(false);

    const totalBars = initialBars.length;
    const timers: NodeJS.Timeout[] = [];

    const SLIDE_DURATION = 750; // Slower, chill descent
    const STAGGER_DELAY = 110;  // Relaxed rhythmic cascade

    // 1. Launch the chill descent across the rack
    timers.push(
      setTimeout(() => {
        setEntranceActive(true);
        sound.playThrowSlide();
      }, 40)
    );

    // 2. Play subtle metallic landing clinks as plates arrive in smooth succession (bottom arrives first)
    for (let step = 0; step < totalBars; step++) {
      const barIndex = totalBars - 1 - step; // bottom plate arrives first
      timers.push(
        setTimeout(() => {
          sound.playShift(barIndex, totalBars);
        }, 40 + SLIDE_DURATION + step * STAGGER_DELAY)
      );
    }

    // 3. Roll up shutter once all plates have settled on the rack
    timers.push(
      setTimeout(() => {
        setShutterOpen(true);
        sound.playShutterRollUp();
      }, 40 + SLIDE_DURATION + (totalBars - 1) * STAGGER_DELAY + 120)
    );

    // 4. Mark entrance fully settled (enables player click interactions)
    timers.push(
      setTimeout(() => {
        setEntranceSettled(true);
      }, 40 + SLIDE_DURATION + (totalBars - 1) * STAGGER_DELAY + 920)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [levelNumber, animKey]);

  const isSolved = useMemo(() => {
    return (
      moves > 0 &&
      activeRack.length === targetIds.length &&
      activeRack.every((id, idx) => id === targetIds[idx])
    );
  }, [activeRack, targetIds, moves]);

  // Check victory condition (wait for final slide animation to finish before showing modal)
  useEffect(() => {
    if (isSolved && !isWon) {
      const timer = setTimeout(() => {
        setIsWon(true);
        sound.playWin();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isSolved, isWon]);

  const isBarClickable = useCallback(
    (steelId: number, slotIndex: number, counters: Record<number, number>) => {
      const onRelease = releaseSet.has(slotIndex);
      if (lockedSet.has(steelId)) return onRelease;
      if (steelId in timedLocks) return (counters[steelId] ?? 0) === 0 || onRelease;
      return true;
    },
    [lockedSet, releaseSet, timedLocks]
  );

  // Handle Move-to-Front click
  const handleBarClick = (clickedId: number) => {
    if (isWon || isSolved || !entranceSettled) return;
    const currentIndex = activeRack.indexOf(clickedId);
    if (currentIndex === -1) return;

    if (!isBarClickable(clickedId, currentIndex, timedCounters)) {
      sound.playLocked();
      return;
    }
    if (currentIndex === 0) return; // already at top

    // Save history for undo
    setHistory((prev) => [...prev, { rack: activeRack, counters: timedCounters }]);
    setMoves((m) => m + 1);
    setJustMovedId(clickedId);

    sound.playShift(currentIndex, activeRack.length);

    // Move clicked element to the top (index 0)
    const nextRack = [
      clickedId,
      ...activeRack.slice(0, currentIndex),
      ...activeRack.slice(currentIndex + 1),
    ];

    // Update Timed Lock counters:
    // - Clicked timed bar resets & re-locks to max
    // - Unlocked (0) timed bar that shifts position re-locks to max
    // - Locked (>0) timed bar decrements by 1 on other moves
    const nextCounters: Record<number, number> = { ...timedCounters };
    for (const tidStr of Object.keys(timedLocks)) {
      const tid = Number(tidStr);
      const maxVal = timedLocks[tid];
      if (tid === clickedId) {
        nextCounters[tid] = maxVal;
      } else {
        const oldTIdx = activeRack.indexOf(tid);
        const shifted = oldTIdx !== -1 && oldTIdx < currentIndex;
        const currVal = timedCounters[tid] ?? maxVal;
        if (currVal === 0) {
          if (shifted) nextCounters[tid] = maxVal;
        } else {
          nextCounters[tid] = currVal - 1;
        }
      }
    }

    setActiveRack(nextRack);
    setTimedCounters(nextCounters);

    setTimeout(() => {
      setJustMovedId(null);
    }, 360);
  };

  const handleUndo = useCallback(() => {
    if (history.length === 0 || isWon || !entranceSettled) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setActiveRack(previous.rack);
    setTimedCounters(previous.counters);
    setMoves((m) => Math.max(0, m - 1));
    sound.playUndo();
  }, [history, isWon, entranceSettled]);

  const handleReset = useCallback(() => {
    setActiveRack(initialBars);
    setTimedCounters(timedLocks);
    setHistory([]);
    setMoves(0);
    setIsWon(false);
    setJustMovedId(null);
    setEntranceActive(false);
    setEntranceSettled(false);
    setShutterOpen(false);
    sound.playUndo();
    setAnimKey((k) => k + 1);
  }, [initialBars, timedLocks]);

  // Calculate matched count
  const matchedCount = useMemo(() => {
    return targetIds.filter((tId, idx) => activeRack[idx] === tId).length;
  }, [activeRack, targetIds]);

  // Checkpoint thresholds requested by user
  const cp1 = parMoves;
  const cp2 = parMoves + 3;
  const cp3 = parMoves + 7;
  const scaleMax = cp3 + 1; // Total track scale: par + 8 moves

  const bolt1Active = moves <= cp1;
  const bolt2Active = moves <= cp2;
  const bolt3Active = moves <= cp3;

  // Calculate earned bolts on victory based on checkpoints
  const earnedBolts = useMemo(() => {
    if (moves <= cp1) return 3;
    if (moves <= cp2) return 2;
    return 1;
  }, [moves, cp1, cp2]);

  // Proportional percentages along the track (origin 0 at 0%)
  const p1 = (cp1 / scaleMax) * 100;
  const p2 = (cp2 / scaleMax) * 100;
  const p3 = (cp3 / scaleMax) * 100;

  // Dynamic runner fill width percentage
  const runnerPercent = Math.min(100, (moves / scaleMax) * 100);

  const BAR_HEIGHT = 52;
  const BAR_GAP = 9;
  const rackHeight = activeRack.length * (BAR_HEIGHT + BAR_GAP) - BAR_GAP;

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen w-full max-w-4xl mx-auto px-4 py-6 select-none">
      {/* Header Bar */}
      <header className="w-full flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToLevels();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-all active:scale-95 text-xs font-bold shadow-md cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>LEVELS</span>
          </button>
        </div>

        {/* Right utility buttons: Stage Info, Undo Move, Reset Rack, and Sound Toggle */}
        <div className="flex items-center gap-2">
          {/* Stage Name & Indicator */}
          <div className="flex flex-col items-end pr-1 sm:pr-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 leading-tight">
              STAGE 1-{levelNumber}
            </span>
            <span className="text-[10px] font-bold text-sky-400 leading-tight">
              {stageName}
            </span>
          </div>
          {/* Undo Move */}
          <button
            onClick={handleUndo}
            disabled={history.length === 0 || isWon}
            className="h-9 px-2.5 sm:px-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            title="Undo Move"
            aria-label="Undo Move"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7v6h6" />
              <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
            </svg>
          </button>

          {/* Reset Rack */}
          <button
            onClick={handleReset}
            disabled={moves === 0 && !isWon}
            className="h-9 px-2.5 sm:px-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            title="Reset Rack"
            aria-label="Reset Rack"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="w-9 h-9 rounded-xl bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-md"
            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
          >
            {soundEnabled ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Game Arena (Left Column: Moves & Checkpoint Progress + Blueprint, Right: Active Rack) */}
      <main className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-start mb-6 mt-2">
        {/* Left Column: Moves Made & Checkpoints Console + Target Blueprint */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4">
          {/* Moves Made & Checkpoint Progress Bar */}
          <section className="p-4 md:p-5 flex flex-col">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Moves Made
                </span>
                <div className="text-3xl font-black text-white tabular-nums leading-none mt-1">
                  {moves}
                </div>
              </div>
            </div>

            {/* Checkpoint Line with 3 Bolt Checkpoints starting from 0 */}
            <div className="relative pt-3 pb-2 px-1">
              <div className="relative h-12 w-full">
                {/* Background Rail */}
                <div className="absolute top-[11px] left-0 right-0 h-[3px] bg-slate-800 rounded-full pointer-events-none" />

                {/* Dynamic Runner Fill Line */}
                <div
                  className="absolute top-[11px] left-0 h-[3px] rounded-full bg-gradient-to-r from-sky-400 to-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.6)] transition-all duration-300 pointer-events-none"
                  style={{ width: `${runnerPercent}%` }}
                />

                {/* Checkpoint 1: Par */}
                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${p1}%` }}
                >
                  <div className="w-6 h-6 flex items-center justify-center mb-0.5">
                    {bolt1Active ? (
                      <div className="transform transition-transform duration-300 hover:scale-110">
                        <BoltIcon earned={true} size={18} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner opacity-60">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-black tabular-nums transition-colors ${
                      bolt1Active ? "text-sky-400" : "text-slate-600 line-through"
                    }`}
                  >
                    {cp1}
                  </span>
                </div>

                {/* Checkpoint 2: Par + 3 */}
                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${p2}%` }}
                >
                  <div className="w-6 h-6 flex items-center justify-center mb-0.5">
                    {bolt2Active ? (
                      <div className="transform transition-transform duration-300 hover:scale-110">
                        <BoltIcon earned={true} size={18} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner opacity-60">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-black tabular-nums transition-colors ${
                      bolt2Active
                        ? moves > cp1
                          ? "text-sky-400"
                          : "text-slate-300"
                        : "text-slate-600 line-through"
                    }`}
                  >
                    {cp2}
                  </span>
                </div>

                {/* Checkpoint 3: Par + 7 */}
                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${p3}%` }}
                >
                  <div className="w-6 h-6 flex items-center justify-center mb-0.5">
                    {bolt3Active ? (
                      <div className="transform transition-transform duration-300 hover:scale-110">
                        <BoltIcon earned={true} size={18} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner opacity-60">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-black tabular-nums transition-colors ${
                      bolt3Active
                        ? moves > cp2
                          ? "text-sky-400"
                          : "text-slate-300"
                        : "text-slate-600 line-through"
                    }`}
                  >
                    {cp3}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Target Blueprint (Reference Stack) */}
          <section className="p-4 md:p-5 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                Blueprint
              </span>
            </div>

            <div className="blueprint-chamber relative overflow-hidden">
              {targetIds.map((targetId, index) => {
                const alloy = STEEL_ALLOYS[targetId];
                const isMatched = activeRack[index] === targetId;
                const isLocked = lockedSet.has(targetId) || targetId in timedLocks;

                return (
                  <div
                    key={`${targetId}-${levelNumber}-${animKey}`}
                    className={`target-blueprint-item flex items-center justify-center ${isMatched ? "matched" : ""} ${shutterOpen ? "blueprint-revealed" : ""}`}
                    style={{
                      background: alloy.gradient,
                    }}
                  >
                    <div className="flex items-center justify-center gap-1.5 relative z-10">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-sm"
                      >
                        {alloy.svg}
                      </svg>
                      {isLocked && (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white/90 drop-shadow-sm"
                          aria-label="Locked"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Industrial Rolling Shutter Door Overlay (renders AFTER plates to properly cover them) */}
              {!entranceSettled && (
                <div className={`rolling-shutter ${shutterOpen ? "shutter-opening" : ""}`}>
                  <div className="shutter-bottom-bar">
                    <div className="shutter-rivet" />
                    <div className="shutter-handle" />
                    <div className="shutter-rivet" />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Active Rack (Player Interactive Stack) - 7 or 8 cols on desktop (Moved Up!) */}
        <section className="md:col-span-7 lg:col-span-8 bg-slate-900/80 border-x border-slate-600 p-4 md:p-5 flex flex-col overflow-hidden">

          {/* Dynamic Animated Rack Container */}
          <div className="relative w-full" style={{ height: `${rackHeight}px` }}>
            {/* Release Slot Background Indicators */}
            {Array.from(releaseSet).map((slotIdx) => {
              if (slotIdx < 0 || slotIdx >= activeRack.length) return null;
              const slotTop = slotIdx * (BAR_HEIGHT + BAR_GAP) - 4;
              return (
                <div
                  key={`release-slot-${slotIdx}`}
                  className="absolute -left-1.5 -right-1.5 rounded-xl border-2 border-dashed border-emerald-400/75 bg-emerald-500/15 shadow-[0_0_16px_rgba(16,185,129,0.2)] pointer-events-none z-0"
                  style={{ top: `${slotTop}px`, height: `${BAR_HEIGHT + 8}px` }}
                />
              );
            })}

            {initialBars.map((steelId) => {
              const index = activeRack.indexOf(steelId);
              const alloy = STEEL_ALLOYS[steelId];
              const yPos = index * (BAR_HEIGHT + BAR_GAP);
              const isMoving = justMovedId === steelId;
              const isBaseLocked = lockedSet.has(steelId);
              const isTimedLocked = steelId in timedLocks;
              const timedVal = timedCounters[steelId] ?? 0;
              const timedMax = timedLocks[steelId] ?? 0;
              const onReleaseSlot = releaseSet.has(index);
              const clickable = isBarClickable(steelId, index, timedCounters);

              // Step order: 0 for bottom plate, 1 for second from bottom, etc.
              // Bottom plate arrives first, each subsequent plate follows with tight 60ms cascade
              const stepOrder = activeRack.length - 1 - index;
              const dropOffset = Math.max(280, rackHeight + 50);

              return (
                <div
                  key={`${steelId}-${levelNumber}-${animKey}`}
                  onClick={() => handleBarClick(steelId)}
                  onMouseEnter={() => {
                    if (clickable) sound.playHover();
                  }}
                  className={`steel-bar-item ${isMoving ? "moving-top" : ""} ${!clickable ? "!cursor-not-allowed brightness-90" : ""} ${onReleaseSlot && (isBaseLocked || isTimedLocked) ? "ring-2 ring-emerald-400/80" : ""}`}
                  style={{
                    background: alloy.gradient,
                    transform: entranceActive
                      ? `translate3d(0, ${yPos}px, 0)`
                      : `translate3d(0, ${yPos - dropOffset}px, 0)`,
                    opacity: entranceActive ? 1 : 0,
                    transitionDuration: entranceActive && !entranceSettled ? "750ms" : "420ms",
                    transitionTimingFunction: "cubic-bezier(0.18, 0.95, 0.25, 1)",
                    transitionDelay: entranceActive && !entranceSettled ? `${stepOrder * 110}ms` : "0ms",
                    pointerEvents: entranceSettled ? "auto" : "none",
                  }}
                >
                  {/* Plate Left Details */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-black/35 border border-white/20 flex items-center justify-center shrink-0">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {alloy.svg}
                      </svg>
                    </div>
                    <span className="text-sm text-slate-100 font-black tracking-wider drop-shadow-md">
                      {alloy.name}
                    </span>
                  </div>

                  {/* Plate Right Details: Lock / Timed Lock Badge + Position Tag */}
                  <div className="flex items-center gap-2">
                    {isBaseLocked && (
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-inner border ${
                          clickable
                            ? "bg-emerald-950/85 text-emerald-300 border-emerald-400/60"
                            : "bg-slate-950/75 text-amber-300 border-amber-400/40"
                        }`}
                        title={
                          clickable
                            ? "On Release Slot — Click to pull to top!"
                            : "Locked Steel — cannot be clicked"
                        }
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          {clickable ? (
                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                          ) : (
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          )}
                        </svg>
                        {clickable ? "RELEASED" : "LOCKED"}
                      </span>
                    )}
                    {isTimedLocked && (
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-inner border tabular-nums ${
                          clickable
                            ? "bg-emerald-950/85 text-emerald-300 border-emerald-400/60"
                            : "bg-slate-950/75 text-sky-300 border-sky-400/40"
                        }`}
                        title={
                          clickable
                            ? "Timed Lock Unlocked — Click to pull (shifting re-locks it)"
                            : `Timed Lock — ${timedVal} move(s) remaining to unlock`
                        }
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          {clickable ? (
                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                          ) : (
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          )}
                        </svg>
                        {clickable ? "UNLOCKED" : `${timedVal}/${timedMax}`}
                      </span>
                    )}
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-black/40 text-slate-200 border border-white/15">
                      #{index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* VICTORY MODAL */}
      {isWon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300 select-none">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col text-center">
            {/* Silver Bolts Rating */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="transform transition-transform hover:scale-110">
                  <BoltIcon earned={idx < earnedBolts} size={30} />
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-white mb-1">
              {earnedBolts === 3 ? "PERFECT! (PAR)" : "STACK LOCKED!"}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              The steel stack has been locked into the exact blueprint order.
            </p>

            {/* Scoreboard in Modal */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 mb-6">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Your Moves</div>
                <div className="text-xl font-black text-white tabular-nums">{moves}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Target (Par)</div>
                <div className="text-xl font-black text-sky-400 tabular-nums">{parMoves}</div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Replay
              </button>
              {levelNumber < 36 && onNextLevel ? (
                <button
                  onClick={() => {
                    sound.playEnter();
                    onNextLevel();
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg shadow-sky-500/25"
                >
                  Next Stage →
                </button>
              ) : (
                <button
                  onClick={() => {
                    sound.playEnter();
                    onBackToLevels();
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg shadow-sky-500/25"
                >
                  Back to Stages →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


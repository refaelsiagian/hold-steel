"use client";

import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import BoltIcon from "./BoltIcon";
import { sound } from "./SoundFX";
import { STAGES_1_TO_10, STAGES_11_TO_20 } from "@/lib/stages";

interface LevelInfo {
  number: number;
  unlocked: boolean;
  stars: number; // 0 to 3
  bestMoves: number | null;
  par: number;
  bars: number;
  gimmick: "Classic" | "Locked" | "Counter" | "Decoy" | "Compound" | "Boss";
}

interface LevelSelectorProps {
  onBackToTitle: () => void;
  onSelectLevel: (levelNum: number) => void;
  onOpenImport: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

// Generate sample levels 1-36 with authentic progression
function generateChapter1Levels(): LevelInfo[] {
  return Array.from({ length: 36 }, (_, i) => {
    const levelNum = i + 1;
    let gimmick: LevelInfo["gimmick"] = "Classic";
    let bars = 4;
    let par = 3;

    if (levelNum <= 10) {
      const stage = STAGES_1_TO_10[levelNum - 1];
      gimmick = "Classic";
      bars = stage.bars;
      par = stage.parMoves;
    } else if (levelNum <= 20) {
      const stage = STAGES_11_TO_20[levelNum - 11];
      gimmick = "Locked";
      bars = stage.bars;
      par = stage.parMoves;
    } else if (levelNum <= 26) {
      gimmick = "Counter";
      bars = levelNum <= 23 ? 5 : 6;
      par = 4 + Math.floor((levelNum - 20) / 3);
    } else if (levelNum <= 32) {
      gimmick = "Decoy";
      bars = 6;
      par = 4 + Math.floor((levelNum - 26) / 3);
    } else if (levelNum <= 35) {
      gimmick = "Compound";
      bars = 7;
      par = 5 + (levelNum - 32);
    } else {
      gimmick = "Boss";
      bars = 8;
      par = 7;
    }

    // Unlock levels 1 to 20 (Classic + Locked Steel progression)
    const unlocked = levelNum <= 20;
    let stars = 0;
    let bestMoves: number | null = null;

    if (levelNum <= 6) {
      stars = 3;
      bestMoves = par;
    } else if (levelNum <= 10) {
      stars = 2;
      bestMoves = par + 1;
    } else if (levelNum <= 12) {
      stars = 1;
      bestMoves = par + 3;
    }

    return {
      number: levelNum,
      unlocked,
      stars,
      bestMoves,
      par,
      bars,
      gimmick,
    };
  });
}

export default function LevelSelector({
  onBackToTitle,
  onSelectLevel,
  onOpenImport,
  soundEnabled,
  onToggleSound,
}: LevelSelectorProps) {
  const [levels] = useState<LevelInfo[]>(generateChapter1Levels);
  const [selectedLevel, setSelectedLevel] = useState<LevelInfo | null>(null);

  // Stats calculation
  const totalStars = levels.reduce((acc, l) => acc + l.stars, 0);
  const maxStars = levels.length * 3;
  const completedCount = levels.filter((l) => l.stars > 0).length;

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-5xl mx-auto px-4 py-6 select-none">
      {/* Header Bar */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToTitle();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 transition-all active:scale-95 text-xs font-bold shadow-md cursor-pointer"
            title="Back to Title"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>TITLE</span>
          </button>
        </div>

        {/* Global Bolts & Action Badges */}
        <div className="flex items-center gap-3">
          {/* Total Bolts Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-200 font-extrabold text-xs shadow-md border border-slate-700/60">
            <BoltIcon earned={true} size={15} />
            <span className="tabular-nums tracking-wider text-slate-100">
              {totalStars} / {maxStars}
            </span>
          </div>

          {/* Import Code Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenImport();
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md"
            title="Import custom level"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>CODE</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="w-8 h-8 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer shadow-md"
            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
          >
            {soundEnabled ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Chapter Selection Banner */}
      <section className="my-2 p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(14,165,233,0.4)]">
            01
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-300">
              The Foundations
            </h2>
            <p className="text-xs text-slate-400">
              Even steel longs to be on top.
            </p>
          </div>
        </div>
      </section>

      {/* 36-Level Grid */}
      <main className="flex-1 pb-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3 md:gap-4">
          {levels.map((lvl) => {
            const isBoss = lvl.number === 36;
            const isSelected = selectedLevel?.number === lvl.number;

            return (
              <button
                key={lvl.number}
                disabled={!lvl.unlocked}
                onClick={() => {
                  sound.playSelectLevel(isBoss);
                  onSelectLevel(lvl.number);
                }}
                onMouseEnter={() => {
                  if (lvl.unlocked) sound.playHover();
                }}
                className={`relative flex flex-col justify-between p-3 rounded-xl transition-all duration-200 cursor-pointer select-none min-h-[92px] border-none ${
                  !lvl.unlocked
                    ? "bg-slate-950/50 opacity-40 cursor-not-allowed"
                    : isBoss
                    ? "bg-gradient-to-b from-amber-950/40 to-slate-900 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:scale-[1.03]"
                    : "bg-gradient-to-b from-slate-700/80 to-slate-900 hover:scale-[1.03] active:scale-95"
                } ${isSelected ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-slate-950" : ""}`}
              >
                {/* Lock icon if locked */}
                {!lvl.unlocked && (
                  <div className="absolute top-2.5 right-2.5 pointer-events-none">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                )}

                {/* Level Number (Centered horizontally, and vertically from top edge to bolts) */}
                <div className="flex-1 flex items-center justify-center w-full">
                  <span
                    className={`text-sm md:text-2xl font-black tabular-nums pb-2 ${
                      isBoss
                        ? "text-amber-400 tracking-wider"
                        : "text-slate-500"
                    }`}
                  >
                    {lvl.number < 10 ? `0${lvl.number}` : lvl.number}
                  </span>
                </div>

                {/* Level Bottom: Bolt Row */}
                <div className="flex items-center justify-center gap-1.5 pb-0.5">
                  {[0, 1, 2].map((sIndex) => (
                    <BoltIcon
                      key={sIndex}
                      earned={sIndex < lvl.stars}
                      size={13}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </main>

      {/* Selected Level Launch Modal / Drawer */}
      {selectedLevel && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-slate-900 rounded-2xl p-6 shadow-2xl flex flex-col text-center">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black uppercase tracking-widest text-sky-400">
                STAGE DEPLOYMENT
              </span>
              <button
                onClick={() => setSelectedLevel(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Stage Title */}
            <h3 className="text-2xl font-black text-white mb-1">
              {selectedLevel.number === 36
                ? "Stage 36 • THE BOSS"
                : selectedLevel.number <= 10
                ? `Stage ${selectedLevel.number} • ${STAGES_1_TO_10[selectedLevel.number - 1].name}`
                : `Stage ${selectedLevel.number}`}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Gimmick: <strong className="text-sky-300">{selectedLevel.gimmick} Mechanics</strong>
            </p>

            {/* Stage Specifications Grid */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-xl mb-6">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Steel Plates</div>
                <div className="text-lg font-black text-white tabular-nums">{selectedLevel.bars} Bars</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Par Target</div>
                <div className="text-lg font-black text-sky-400 tabular-nums">{selectedLevel.par} Moves</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Silver Bolts</div>
                <div className="flex items-center justify-center gap-1 mt-1 text-slate-100 font-black text-sm">
                  {[0, 1, 2].map((i) => (
                    <BoltIcon key={i} earned={i < selectedLevel.stars} size={15} />
                  ))}
                  <span className="text-xs ml-1 text-slate-400">{selectedLevel.stars}/3</span>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <button
              onClick={() => {
                sound.playEnter();
                onSelectLevel(selectedLevel.number);
              }}
              className="w-full py-3.5 rounded-xl font-black text-base text-white uppercase tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-[0_4px_16px_rgba(14,165,233,0.4)] transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>ENTER STAGE</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


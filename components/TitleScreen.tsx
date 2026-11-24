"use client";

import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import { sound } from "./SoundFX";

interface TitleScreenProps {
  onEnter: () => void;
  onOpenTutorial: () => void;
  onOpenImport: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function TitleScreen({
  onEnter,
  onOpenTutorial,
  onOpenImport,
  soundEnabled,
  onToggleSound,
}: TitleScreenProps) {
  const [isHoveringStart, setIsHoveringStart] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-between min-h-[92vh] w-full max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Top Utility Bar */}
      <header className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-slate-900/80 border border-slate-700/60 text-sky-400 shadow-md">
            
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-400 bg-slate-900/50 border border-slate-800">
            
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="w-10 h-10 text-slate-300 hover:scale-120 flex items-center justify-center transition-all shadow-md active:scale-95"
            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Quick Help */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTutorial();
            }}
            className="w-10 h-10 text-slate-300 hover:scale-120 flex items-center justify-center transition-all shadow-md active:scale-95"
            title="How to Play"
            aria-label="How to Play"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Center Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center my-8 z-10 w-full max-w-lg">
        {/* Decorative Industrial Hazard Warning Bar */}
        <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-transparent via-sky-400/60 to-transparent mb-6 animate-pulse" />
        
        {/* HERO LOGO: Faithful recreation of the uploaded logo */}
        <div className="transform transition-transform duration-500 hover:scale-[1.02] mb-10">
          <BrandLogo size="xl" showTagline={true} />
        </div>

        {/* Big Primary Action: ENTER / START BUTTON */}
        <div className="w-full max-w-xs flex flex-col gap-3.5">
          <button
            onClick={() => {
              sound.playEnter();
              onEnter();
            }}
            onMouseEnter={() => {
              setIsHoveringStart(true);
              sound.playHover();
            }}
            onMouseLeave={() => setIsHoveringStart(false)}
            className="group relative w-full py-4 px-8 rounded-2xl font-black text-lg md:text-xl text-white uppercase tracking-wider overflow-hidden transition-all duration-200 active:scale-95 shadow-[0_12px_30px_-5px_rgba(14,165,233,0.5)] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #1e40af 100%)",
            }}
          >
            <div className="relative flex items-center justify-center gap-3">
              <span>START GAME</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${
                  isHoveringStart ? "translate-x-1.5 text-sky-200" : ""
                }`}
              >
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            </div>
          </button>

          {/* Secondary Action: IMPORT LEVEL CODE */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenImport();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full py-3 px-6 rounded-xl font-bold text-xs md:text-sm text-slate-300 hover:text-white uppercase tracking-wider bg-slate-900/60 hover:bg-slate-800/80 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Import Level Code</span>
          </button>
        </div>
      </main>

      {/* Footer Industrial Info */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2 z-10 pt-4">
        <div className="flex items-center gap-4 text-[11px]">
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}


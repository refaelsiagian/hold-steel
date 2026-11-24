"use client";

import React, { useState } from "react";
import TitleScreen from "@/components/TitleScreen";
import LevelSelector from "@/components/LevelSelector";
import GameArena from "@/components/GameArena";
import ImportModal from "@/components/ImportModal";
import TutorialModal from "@/components/TutorialModal";
import { sound } from "@/components/SoundFX";

export default function Home() {
  const [currentView, setCurrentView] = useState<"title" | "levels" | "game">("title");
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [activeStageAlert, setActiveStageAlert] = useState<string | null>(null);

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playClick();
  };

  const handleSelectLevel = (levelNum: number) => {
    setActiveLevel(levelNum);
    setCurrentView("game");
  };

  const handleLoadImportCode = (code: string) => {
    setActiveStageAlert(`Imported Level Code: ${code.slice(0, 24)}...`);
    setTimeout(() => {
      setActiveStageAlert(null);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between">
      {/* Toast Notification Banner */}
      {activeStageAlert && (
        <div className="fixed top-5 z-50 px-5 py-3 rounded-xl bg-slate-900 border border-sky-400 text-sky-200 text-xs md:text-sm font-bold shadow-[0_0_25px_rgba(56,189,248,0.3)] animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>{activeStageAlert}</span>
        </div>
      )}

      {/* Screen Routing */}
      {currentView === "title" ? (
        <TitleScreen
          onEnter={() => setCurrentView("levels")}
          onOpenTutorial={() => setIsTutorialOpen(true)}
          onOpenImport={() => setIsImportOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      ) : currentView === "levels" ? (
        <LevelSelector
          onBackToTitle={() => setCurrentView("title")}
          onSelectLevel={handleSelectLevel}
          onOpenImport={() => setIsImportOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      ) : (
        <GameArena
          levelNumber={activeLevel}
          onBackToLevels={() => setCurrentView("levels")}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      )}

      {/* Reusable Modals */}
      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onLoadCode={handleLoadImportCode}
      />

      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
}

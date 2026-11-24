"use client";

import React from "react";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialModal({ isOpen, onClose }: TutorialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col text-left max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Factory Rules & Directives
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed">
          {/* Rule 1 */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <h4 className="font-extrabold text-white text-sm mb-1 text-sky-400">
              1. Move-to-Front (MTF) Operation
            </h4>
            <p className="text-slate-400">
              Clicking any standard steel plate pulls it directly to the <strong>very top (#1 position)</strong> of the rack. All plates that were above it shift down by one level.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <h4 className="font-extrabold text-white text-sm mb-1 text-amber-400">
              2. Counter Decay (⏱)
            </h4>
            <p className="text-slate-400">
              Whenever you move any plate, all other counter plates tick down by <strong>-1</strong>. If a required plate reaches 0, it melts and you fail! Click the counter plate directly to reset its counter to max.
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <h4 className="font-extrabold text-white text-sm mb-1 text-purple-400">
              3. Locked & Special Alloys
            </h4>
            <p className="text-slate-400">
              <strong>Locked Steels</strong> cannot be clicked directly — you must cycle other plates around them. <strong>Decoys</strong> are not in the blueprint; let their counter hit 0 so they vanish!
            </p>
          </div>

          {/* Goal */}
          <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-200">
            <strong>The Objective:</strong> Match the active rack sequence to the <strong>Target Blueprint</strong> in the fewest clicks possible to earn 3 Silver Bolts!
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg shadow-sky-500/25"
        >
          Understood, Ready to Work
        </button>
      </div>
    </div>
  );
}


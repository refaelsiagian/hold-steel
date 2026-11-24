"use client";

import React, { useState } from "react";
import { sound } from "./SoundFX";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadCode: (code: string) => void;
}

export default function ImportModal({ isOpen, onClose, onLoadCode }: ImportModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Please paste a valid level code or string.");
      return;
    }
    if (!trimmed.startsWith("HS") && !trimmed.includes("|")) {
      setError("Invalid code format. Expected 'HS1|...' or 'HS-...' format.");
      return;
    }

    sound.playEnter();
    setError(null);
    onLoadCode(trimmed);
    onClose();
  };

  const handlePasteSample = () => {
    const sample = "HS1|OBJ:PLAY|R:S0,C1(c:3,m:3),L2,M3|T:3,0,1,2|P:4|A:3,1,0,3";
    setCode(sample);
    setError(null);
    sound.playClick();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Import Level String
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Paste any shared level code (e.g. <code className="text-sky-300">HS1|R:S0,C1...</code>) from friends, community boards, or custom creators.
        </p>

        {/* Input Textarea */}
        <textarea
          rows={4}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Paste level code here (e.g. HS1|OBJ:PLAY|R:S0,C1(3),L2...)"
          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-sky-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 mb-3 resize-none"
        />

        {error && (
          <div className="text-xs text-red-400 font-semibold mb-3 flex items-center gap-1.5">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Quick action buttons */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={handlePasteSample}
            className="text-xs text-sky-400 hover:text-sky-300 font-bold underline cursor-pointer"
          >
            Insert Sample Code
          </button>
          <span className="text-[11px] text-slate-500">HOLD STEEL v1</span>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/20 transition-all cursor-pointer active:scale-95"
          >
            Load Level
          </button>
        </div>
      </div>
    </div>
  );
}


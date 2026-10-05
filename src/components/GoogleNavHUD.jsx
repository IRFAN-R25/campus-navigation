import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  ArrowUpLeft,
  CornerUpRight,
  CornerUpLeft,
  Navigation,
  X,
  ChevronRight,
  ChevronLeft,
  Footprints,
  Clock,
  Compass
} from 'lucide-react';

export default function GoogleNavHUD({
  activeRoute,
  destinationName,
  destinationBuilding,
  onExitNav,
  onOpenDetails
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!activeRoute) return null;

  const steps = activeRoute.steps || [];
  const currentStep = steps[currentStepIndex] || steps[0];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Turn Icon helper matching Google Maps
  const getTurnIcon = (instruction = '') => {
    const text = instruction.toLowerCase();
    if (text.includes('left')) {
      return <CornerUpLeft className="w-7 h-7 text-white stroke-[2.5]" />;
    } else if (text.includes('right')) {
      return <CornerUpRight className="w-7 h-7 text-white stroke-[2.5]" />;
    } else {
      return <ArrowUp className="w-7 h-7 text-white stroke-[2.5]" />;
    }
  };

  return (
    <>
      {/* Top Google Maps Turn Card */}
      <div className="absolute top-3 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-[440px] z-30 animate-in fade-in slide-in-from-top-3 duration-300">
        <div className="bg-emerald-600 border border-emerald-500 rounded-2xl shadow-2xl p-3 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center shrink-0">
              {getTurnIcon(currentStep?.instruction)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-100">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
                <span className="text-[10px] bg-black/25 px-1.5 py-0.2 rounded font-bold">
                  {currentStep?.distance || 40}m
                </span>
              </div>
              <p className="text-sm font-bold text-white truncate leading-snug mt-0.5">
                {currentStep?.instruction || 'Follow the dark blue walkway'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`p-1.5 rounded-lg transition ${
                currentStepIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/20 text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === steps.length - 1}
              className={`p-1.5 rounded-lg transition ${
                currentStepIndex === steps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/20 text-white'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Google Maps Route Bar */}
      <div className="absolute bottom-4 left-3 right-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-[440px] z-30 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-3.5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400 tracking-tight leading-none">
                {activeRoute.estimatedTimeMinutes} min
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                ({activeRoute.totalDistance} m)
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium truncate mt-1">
              To: <strong className="text-white">{destinationName}</strong> {destinationBuilding ? `(${destinationBuilding})` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenDetails}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition"
            >
              All Steps
            </button>

            <button
              onClick={onExitNav}
              className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 transition active:scale-95"
              title="End Navigation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

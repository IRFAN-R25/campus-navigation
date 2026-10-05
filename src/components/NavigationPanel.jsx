import React from 'react';
import { Navigation, ArrowRight, ArrowLeftRight, Clock, Footprints, ShieldCheck, X, Compass, ChevronRight } from 'lucide-react';

export default function NavigationPanel({
  locations = [],
  startLocationId,
  endLocationId,
  onSelectStart,
  onSelectEnd,
  onSwap,
  activeRoute,
  wheelchairMode,
  onToggleWheelchair,
  onClearRoute,
  onClose
}) {
  const startLoc = locations.find(l => l.id === startLocationId);
  const endLoc = locations.find(l => l.id === endLocationId);

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-4 text-white flex flex-col gap-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <Navigation className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">Campus Directions</h3>
            <p className="text-[11px] text-slate-400">Dijkstra Shortest Walkway Route</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Origin & Destination Selectors */}
      <div className="space-y-2 relative">
        {/* Origin */}
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 bg-emerald-500/20 shrink-0" />
          <select
            value={startLocationId || ''}
            onChange={(e) => onSelectStart(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition"
          >
            <option value="">Select Starting Point...</option>
            <option value="USER_CURRENT_GPS">📍 My Current Location (GPS)</option>
            {locations.map(loc => (
              <option key={`start-${loc.id}`} value={loc.id}>
                {loc.name} {loc.building ? `(${loc.building})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-end pr-2">
          <button
            onClick={onSwap}
            title="Swap Origin and Destination"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-500 bg-rose-500/20 shrink-0" />
          <select
            value={endLocationId || ''}
            onChange={(e) => onSelectEnd(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 transition"
          >
            <option value="">Select Destination...</option>
            {locations.map(loc => (
              <option key={`end-${loc.id}`} value={loc.id}>
                {loc.name} {loc.building ? `(${loc.building})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Accessibility Toggle */}
      <div className="flex items-center justify-between px-1 py-1 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none">
          <input
            type="checkbox"
            checked={wheelchairMode}
            onChange={(e) => onToggleWheelchair(e.target.checked)}
            className="rounded border-slate-700 bg-slate-950 text-blue-500 focus:ring-0 cursor-pointer"
          />
          <span className="flex items-center gap-1.5 text-xs text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Accessible / Ramps Only
          </span>
        </label>

        {activeRoute && (
          <button
            onClick={onClearRoute}
            className="text-[11px] text-rose-400 hover:text-rose-300 hover:underline"
          >
            Clear Route
          </button>
        )}
      </div>

      {/* Active Route Summary Banner */}
      {activeRoute && (
        <div className="space-y-3 pt-1 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold text-sm">
                <Footprints className="w-4 h-4 text-blue-400" />
                <span>{activeRoute.totalDistance}m</span>
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>~{activeRoute.estimatedTimeMinutes} min walk</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Optimal
            </span>
          </div>

          {/* Turn-by-turn list */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1">
              Turn-by-Turn Walkway Steps
            </p>
            {activeRoute.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {step.stepNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-xs leading-snug">{step.instruction}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{step.distance}m along {step.pathType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

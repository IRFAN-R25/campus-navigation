import React from 'react';
import {
  User,
  Shield,
  Layers,
  Footprints,
  Heart,
  Moon,
  Info,
  ExternalLink,
  Lock,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function SettingsView({
  currentUser,
  mapLayer,
  onChangeMapLayer,
  showWalkways,
  onToggleWalkways,
  isSharingLocation,
  onToggleSharing,
  onOpenDeveloperModal,
  onLogout
}) {
  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto p-4 space-y-5">
      {/* User Profile Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-slate-800 flex items-center gap-3.5 shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
          {currentUser?.avatar || 'ST'}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white truncate">{currentUser?.name || 'Student User'}</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Verified
            </span>
          </div>
          <p className="text-xs text-blue-400 font-mono truncate">{currentUser?.email || 'student.cs22@bitsathy.ac.in'}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{currentUser?.dept || 'Computer Science & Engineering'} • Roll: {currentUser?.roll || '7376221CS101'}</p>
        </div>
      </div>

      {/* Map Preferences */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Map Rendering & View</span>
        </h4>

        <div className="divide-y divide-slate-800 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Default Campus Layer</p>
              <p className="text-[11px] text-slate-400">Choose between architectural 2D blueprint or satellite aerial view</p>
            </div>
            <select
              value={mapLayer}
              onChange={(e) => onChangeMapLayer(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="standard">Standard Blueprint</option>
              <option value="satellite">Satellite Aerial View</option>
            </select>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Walkway Network Overlay</p>
              <p className="text-[11px] text-slate-400">Display high-contrast blue pedestrian paths over campus roads</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showWalkways}
                onChange={onToggleWalkways}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:width-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Location Sharing */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-md">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Location Sharing & Privacy</span>
        </h4>

        <div className="divide-y divide-slate-800 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Active Location Sharing</p>
              <p className="text-[11px] text-slate-400">Allow approved classmates with @bitsathy.ac.in to see your location</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isSharingLocation}
                onChange={(e) => onToggleSharing(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:width-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Authorized Domain</p>
              <p className="text-[11px] text-slate-400">Restricted exclusively to Bannari Amman Institute accounts</p>
            </div>
            <span className="font-mono text-[11px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20">
              @bitsathy.ac.in
            </span>
          </div>
        </div>
      </div>

      {/* About & Developer Links */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 shadow-md">
        <button
          onClick={onOpenDeveloperModal}
          className="w-full py-2.5 flex items-center justify-between text-xs text-slate-300 hover:text-white transition group"
        >
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
            <span className="font-semibold">From the Developer</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition" />
        </button>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Campus Navigation Version</span>
          <span className="font-mono font-semibold text-slate-300">v1.0.4 (Web Build)</span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full py-3 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Switch / Sign Out Student Account</span>
      </button>
    </div>
  );
}

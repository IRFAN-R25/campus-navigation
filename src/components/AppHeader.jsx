import React, { useState, useRef, useEffect } from 'react';
import {
  Navigation,
  Search,
  X,
  Compass,
  User,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function AppHeader({
  searchQuery,
  onSearchChange,
  onSearchFocus,
  onOpenNavPanel,
  isNavPanelOpen,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenAiModal
}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shrink-0 z-30 select-none shadow-lg">
      <div className="px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/app_icon.png`}
            alt="Campus Navigation"
            className="w-8 h-8 rounded-xl object-cover shadow-md shadow-cyan-500/20 border border-cyan-500/30"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">Campus Navigation</h1>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                BIT Sathy
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Interactive Pedestrian Route Navigation</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search room, building, lab, canteen..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onSearchFocus}
              className="w-full pl-8 pr-7 py-2 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions: AI + Directions + Auth */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Ask AI Guide Button */}
          <button
            onClick={onOpenAiModal}
            title="Ask Campus AI Guide"
            className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/25 border border-cyan-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          <button
            onClick={onOpenNavPanel}
            title={isNavPanelOpen ? 'Close Directions' : 'Open Directions'}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition active:scale-95 shadow-lg ${
              isNavPanelOpen
                ? 'bg-blue-600 text-white shadow-blue-600/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
            }`}
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>{isNavPanelOpen ? 'Hide Route' : 'Directions'}</span>
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileMenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-[11px] flex items-center justify-center shadow-md">
                  {currentUser.avatar || 'ST'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-white leading-tight truncate max-w-[90px]">
                    {currentUser.name?.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono leading-none">
                    {currentUser.roll?.substring(0, 10)}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-11 w-64 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 border-b border-slate-800 pb-2.5 mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-bold text-sm text-white truncate">{currentUser.name}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {currentUser.role === 'guest' ? 'Visitor' : 'Verified'}
                      </span>
                    </div>
                    <p className="text-xs text-blue-400 font-mono truncate">{currentUser.email}</p>
                    {currentUser.dept && (
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{currentUser.dept}</p>
                    )}
                    {currentUser.roll && (
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">Roll: {currentUser.roll}</p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full p-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

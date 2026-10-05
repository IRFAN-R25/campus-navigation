import React, { useState, useEffect, useMemo } from 'react';
import AppHeader from './components/AppHeader';
import CampusMap from './components/CampusMap';
import NavigationPanel from './components/NavigationPanel';
import GoogleNavHUD from './components/GoogleNavHUD';
import AuthModal from './components/AuthModal';

import {
  CATEGORIES,
  INITIAL_NODES,
  INITIAL_EDGES,
  INITIAL_LOCATIONS,
  MAP_DIMENSIONS
} from './data/campusData';

import { calculateShortestPath } from './services/dijkstra';
import { searchLocationsWithAi } from './services/campusAiService';
import CampusAIAssistantModal from './components/CampusAIAssistantModal';
import { MapPin, Navigation, ArrowRight, X, Clock, Footprints, Sparkles } from 'lucide-react';

export default function App() {
  // AI Assistant State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Map Layer Preferences
  const [mapLayer, setMapLayer] = useState('standard'); // 'standard' or 'satellite'
  const [showWalkways, setShowWalkways] = useState(true);

  // Campus POIs (loaded from INITIAL_LOCATIONS)
  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('fmw_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  });

  // Navigation Route Planning
  const [startLocationId, setStartLocationId] = useState('USER_CURRENT_GPS');
  const [endLocationId, setEndLocationId] = useState('');
  const [wheelchairMode, setWheelchairMode] = useState(false);
  const [isNavPanelOpen, setIsNavPanelOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);

  // Selected Location for details card
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Simulated User Position (Main Gate entrance)
  const [userPosition, setUserPosition] = useState({ x: 1805, y: 299 });

  // User Authentication State (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fmw_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    return !localStorage.getItem('fmw_auth_user');
  });

  const handleLoginSuccess = (user) => {
    localStorage.setItem('fmw_auth_user', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('fmw_auth_user');
    setCurrentUser(null);
    setIsAuthModalOpen(true);
  };

  // Sync locations
  useEffect(() => {
    localStorage.setItem('fmw_locations', JSON.stringify(locations));
  }, [locations]);

  // Compute Shortest Walking Route strictly along dark blue paths via Dijkstra
  useEffect(() => {
    if (!startLocationId || !endLocationId) {
      setActiveRoute(null);
      return;
    }

    const route = calculateShortestPath(INITIAL_NODES, INITIAL_EDGES, startLocationId, endLocationId, wheelchairMode, locations);
    setActiveRoute(route);
  }, [startLocationId, endLocationId, wheelchairMode, locations]);

  // AI Semantic Search Filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchLocationsWithAi(searchQuery, locations);
  }, [searchQuery, locations]);

  // Handlers
  const handleSelectSearchResult = (loc) => {
    setSelectedLocation(loc);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleStartNavTo = (loc) => {
    setEndLocationId(loc.id);
    if (!startLocationId) {
      setStartLocationId('USER_CURRENT_GPS');
    }
    setIsNavPanelOpen(true);
    setSelectedLocation(null);
  };

  const handleSwapNav = () => {
    const temp = startLocationId;
    setStartLocationId(endLocationId);
    setEndLocationId(temp);
  };

  const startLocObj = locations.find(l => l.id === startLocationId);
  const endLocObj = locations.find(l => l.id === endLocationId);

  return (
    <div className="w-screen h-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* Clean Header with User Authentication & AI Guide */}
      <AppHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchFocus={() => setIsSearchFocused(true)}
        onOpenNavPanel={() => setIsNavPanelOpen(prev => !prev)}
        isNavPanelOpen={isNavPanelOpen}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Search Autocomplete Overlay */}
      {searchResults.length > 0 && (
        <div className="absolute top-14 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] z-40 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 divide-y divide-slate-800 animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Smart Search Results ({searchResults.length})</span>
            </span>
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto space-y-1 pt-1">
            {searchResults.map(loc => {
              const cat = CATEGORIES.find(c => c.id === loc.category_id) || CATEGORIES[0];
              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelectSearchResult(loc)}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 text-left transition flex items-center justify-between gap-2 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white group-hover:text-blue-400 transition truncate">
                        {loc.name}
                      </span>
                      {loc.isAiMatch ? (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>AI Match</span>
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full font-medium" style={{ backgroundColor: `${cat.color}25`, color: cat.color }}>
                          {cat.name.split(' ')[0]}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {loc.matchReason ? `${loc.matchReason} • ` : ''}{loc.building} {loc.floor ? `• ${loc.floor}` : ''} {loc.rooms ? `• ${loc.rooms}` : ''}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Fullscreen Map Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <CampusMap
          locations={locations}
          nodes={INITIAL_NODES}
          activeRoute={activeRoute}
          startLocation={startLocObj}
          endLocation={endLocObj}
          userPosition={userPosition}
          friends={[]}
          showWalkways={showWalkways}
          onToggleWalkways={() => setShowWalkways(prev => !prev)}
          mapLayer={mapLayer}
          onChangeMapLayer={setMapLayer}
          onSelectLocation={setSelectedLocation}
          onStartNavigationFromLocation={(loc) => {
            setStartLocationId(loc.id);
            setIsNavPanelOpen(true);
          }}
          onStartNavigationToLocation={(loc) => {
            handleStartNavTo(loc);
          }}
          onDeleteCustomPin={() => {}}
          onOpenMarkerDialog={() => {}}
          selectedLocation={selectedLocation}
        />

        {/* Floating Directions Panel */}
        {isNavPanelOpen && (
          <div className="absolute top-4 left-4 z-30 w-80 sm:w-96 max-w-[calc(100vw-32px)] animate-in fade-in slide-in-from-left-3 duration-200">
            <NavigationPanel
              locations={locations}
              startLocationId={startLocationId}
              endLocationId={endLocationId}
              onSelectStart={setStartLocationId}
              onSelectEnd={setEndLocationId}
              onSwap={handleSwapNav}
              activeRoute={activeRoute}
              wheelchairMode={wheelchairMode}
              onToggleWheelchair={setWheelchairMode}
              onClearRoute={() => {
                setEndLocationId('');
                setActiveRoute(null);
              }}
              onClose={() => setIsNavPanelOpen(false)}
            />
          </div>
        )}

        {/* Quick Location Preview Card (when a building/room is clicked on the map) */}
        {selectedLocation && !isNavPanelOpen && (
          <div className="absolute bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-96 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  {selectedLocation.building || 'Campus Building'}
                </span>
                <h3 className="text-base font-bold text-white mt-1 leading-tight">{selectedLocation.name}</h3>
                {selectedLocation.floor && (
                  <p className="text-xs text-slate-400">{selectedLocation.floor} {selectedLocation.rooms ? `• Rooms: ${selectedLocation.rooms}` : ''}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedLocation.description && (
              <p className="text-xs text-slate-300 leading-snug mb-3">
                {selectedLocation.description}
              </p>
            )}

            <button
              onClick={() => handleStartNavTo(selectedLocation)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
            >
              <Navigation className="w-4 h-4 fill-current" />
              <span>Get Directions to {selectedLocation.name.split(' ')[0]}</span>
            </button>
          </div>
        )}

        {/* Google Maps Style Navigation HUD (Top Turn Guidance + Bottom ETA Card) */}
        {activeRoute && !isNavPanelOpen && (
          <GoogleNavHUD
            activeRoute={activeRoute}
            destinationName={endLocObj?.name || 'Destination'}
            destinationBuilding={endLocObj?.building}
            onExitNav={() => {
              setEndLocationId('');
              setActiveRoute(null);
            }}
            onOpenDetails={() => setIsNavPanelOpen(true)}
          />
        )}

        {/* Floating Ask Campus AI Assistant Button */}
        {!activeRoute && (
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="absolute bottom-6 right-4 sm:right-6 z-30 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-extrabold shadow-xl shadow-cyan-600/30 flex items-center gap-2 border border-cyan-400/40 active:scale-95 transition group"
            title="Ask Campus AI Assistant"
          >
            <div className="relative">
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <span className="tracking-wide">Ask Campus AI</span>
          </button>
        )}
      </div>

      {/* User Authentication Modal (Institutional Sign In / Register / Guest) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          if (currentUser) setIsAuthModalOpen(false);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Campus AI Assistant Modal */}
      <CampusAIAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        locations={locations}
        onStartNavigation={(loc) => {
          handleStartNavTo(loc);
        }}
        onSelectLocation={(loc) => {
          setSelectedLocation(loc);
        }}
      />
    </div>
  );
}

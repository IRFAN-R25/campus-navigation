import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  Layers,
  Crosshair,
  Footprints,
  Compass,
  MapPin,
  Eye,
  EyeOff,
  Navigation,
  Share2,
  Trash2,
  Plus
} from 'lucide-react';
import { MAP_DIMENSIONS, CATEGORIES } from '../data/campusData';

export default function CampusMap({
  locations = [],
  nodes = [],
  activeRoute = null,
  startLocation = null,
  endLocation = null,
  userPosition = null,
  friends = [],
  showWalkways = true,
  onToggleWalkways,
  mapLayer = 'standard', // 'standard' or 'satellite'
  onChangeMapLayer,
  onSelectLocation,
  onStartNavigationFromLocation,
  onStartNavigationToLocation,
  onDeleteCustomPin,
  onOpenMarkerDialog,
  selectedLocation = null
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const baseLayerRef = useRef(null);
  const walkwaysLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const gpsMarkerRef = useRef(null);
  const friendsLayerRef = useRef(null);

  const bounds = [[0, 0], [MAP_DIMENSIONS.height, MAP_DIMENSIONS.width]];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        zoomSnap: 0.25,
        attributionControl: false
      });

      // Base layer
      const base = import.meta.env.BASE_URL || './';
      const initialMapUrl = mapLayer === 'satellite' ? `${base}assets/campus_map_2.png` : `${base}assets/campus_map.png`;
      baseLayerRef.current = L.imageOverlay(initialMapUrl, bounds).addTo(map);

      // Walkways overlay layer
      if (showWalkways) {
        walkwaysLayerRef.current = L.imageOverlay(`${base}assets/paths.png`, bounds, { opacity: 0.85 }).addTo(map);
      }

      map.fitBounds(bounds);
      map.setMaxBounds([[-300, -300], [MAP_DIMENSIONS.height + 300, MAP_DIMENSIONS.width + 300]]);

      routeLayerRef.current = L.layerGroup().addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);
      friendsLayerRef.current = L.layerGroup().addTo(map);

      // Map click handler for dropping pin / adding marker
      map.on('click', (e) => {
        const x = Math.round(e.latlng.lng);
        const y = Math.round(MAP_DIMENSIONS.height - e.latlng.lat);
        if (x >= 0 && x <= MAP_DIMENSIONS.width && y >= 0 && y <= MAP_DIMENSIONS.height) {
          onOpenMarkerDialog({ x, y });
        }
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Base Layer when mapLayer changes (Standard <-> Satellite)
  useEffect(() => {
    if (!mapInstanceRef.current || !baseLayerRef.current) return;
    const base = import.meta.env.BASE_URL || './';
    const url = mapLayer === 'satellite' ? `${base}assets/campus_map_2.png` : `${base}assets/campus_map.png`;
    baseLayerRef.current.setUrl(url);
  }, [mapLayer]);

  // Update Walkways Overlay Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const base = import.meta.env.BASE_URL || './';

    if (showWalkways) {
      if (!walkwaysLayerRef.current) {
        walkwaysLayerRef.current = L.imageOverlay(`${base}assets/paths.png`, bounds, { opacity: 0.85 }).addTo(mapInstanceRef.current);
      }
    } else {
      if (walkwaysLayerRef.current) {
        walkwaysLayerRef.current.remove();
        walkwaysLayerRef.current = null;
      }
    }
  }, [showWalkways]);

  // Update Route Polyline
  useEffect(() => {
    if (!mapInstanceRef.current || !routeLayerRef.current) return;
    routeLayerRef.current.clearLayers();

    if (activeRoute && activeRoute.polylineCoordinates && activeRoute.polylineCoordinates.length > 0) {
      // Dark blue background aura
      L.polyline(activeRoute.polylineCoordinates, {
        color: '#001a66',
        weight: 12,
        opacity: 0.7,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(routeLayerRef.current);

      // Main route polyline with dark blue line matching the path and flowing like Google Maps
      const routeLine = L.polyline(activeRoute.polylineCoordinates, {
        color: '#002699',
        weight: 7,
        opacity: 1.0,
        className: 'google-route-flow',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(routeLayerRef.current);

      // Pan to fit route
      mapInstanceRef.current.fitBounds(routeLine.getBounds(), { padding: [80, 80] });
    }
  }, [activeRoute]);

  // Update Markers (POIs and Start/Destination)
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    locations.forEach(loc => {
      let x, y;
      if (loc.customCoords) {
        x = loc.customCoords.x;
        y = loc.customCoords.y;
      } else {
        const node = nodes.find(n => n.id === loc.nearest_node_id);
        if (!node) return;
        x = node.x;
        y = node.y;
      }

      const isStart = startLocation?.id === loc.id;
      const isEnd = endLocation?.id === loc.id;
      const isSelected = selectedLocation?.id === loc.id;

      const latLng = [MAP_DIMENSIONS.height - y, x];
      const category = CATEGORIES.find(c => c.id === loc.category_id) || CATEGORIES[0];

      let iconHtml = '';
      if (isStart) {
        iconHtml = `<div class="pulse-marker" title="Start: ${loc.name}"></div>`;
      } else if (isEnd) {
        iconHtml = `<div class="dest-marker" title="Destination: ${loc.name}"></div>`;
      } else {
        const color = category.color || '#3b82f6';
        const ring = isSelected ? 'ring-4 ring-white shadow-2xl scale-125' : '';
        iconHtml = `
          <div class="poi-pin ${ring}" style="background-color: ${color};" title="${loc.name}">
            <span style="font-size: 11px; font-weight: 800; color: white;">📍</span>
          </div>
        `;
      }

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-poi-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16]
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(markersLayerRef.current);

      // Custom Popup
      const popupHtml = `
        <div class="p-3.5 min-w-[220px] max-w-[260px] text-slate-100">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider" style="background-color: ${category.color}25; color: ${category.color}; border: 1px solid ${category.color}40;">
              ${category.name.split(' ')[0]}
            </span>
            ${loc.floor ? `<span class="text-[11px] text-slate-400 font-medium">${loc.floor}</span>` : ''}
          </div>
          <h4 class="font-bold text-sm text-white leading-tight mb-1">${loc.name}</h4>
          ${loc.building ? `<p class="text-xs text-blue-400 font-semibold mb-1">${loc.building}</p>` : ''}
          ${loc.rooms ? `<p class="text-[11px] text-slate-300 mb-1.5">Rooms: ${loc.rooms}</p>` : ''}
          <p class="text-xs text-slate-400 mb-3 leading-snug">${loc.description || ''}</p>
          <div class="flex items-center gap-1.5 pt-2 border-t border-slate-800">
            <button onclick="window.__navToLocation('${loc.id}')" class="flex-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition">
              Directions
            </button>
            ${loc.isCustom ? `
              <button onclick="window.__deletePin('${loc.id}')" class="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg text-xs transition" title="Delete pin">
                🗑️
              </button>
            ` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { closeButton: false });
      marker.on('click', () => onSelectLocation(loc));
    });

    // Expose helpers for popup buttons
    window.__navToLocation = (locId) => {
      const target = locations.find(l => l.id === locId);
      if (target) onStartNavigationToLocation(target);
    };
    window.__deletePin = (locId) => {
      onDeleteCustomPin(locId);
    };

    return () => {
      delete window.__navToLocation;
      delete window.__deletePin;
    };
  }, [locations, nodes, startLocation, endLocation, selectedLocation]);

  // Update Friends Live Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !friendsLayerRef.current) return;
    friendsLayerRef.current.clearLayers();

    friends.forEach(friend => {
      if (!friend.coords) return;
      const latLng = [MAP_DIMENSIONS.height - friend.coords.y, friend.coords.x];

      const html = `
        <div class="person-marker ${friend.online ? 'person-marker-online' : ''} ${friend.avatarBg || 'bg-indigo-600'}" title="${friend.name} - ${friend.locationName}">
          ${friend.avatar}
        </div>
      `;

      const friendIcon = L.divIcon({
        html,
        className: 'custom-friend-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const marker = L.marker(latLng, { icon: friendIcon }).addTo(friendsLayerRef.current);

      const popupContent = `
        <div class="p-3 min-w-[200px] text-slate-100">
          <div class="flex items-center gap-2 mb-1.5">
            <div class="w-6 h-6 rounded-full ${friend.avatarBg || 'bg-indigo-600'} text-white text-[10px] font-bold flex items-center justify-center">
              ${friend.avatar}
            </div>
            <div>
              <h4 class="font-bold text-xs text-white leading-tight">${friend.name}</h4>
              <p class="text-[10px] text-emerald-400 font-semibold">${friend.online ? 'Active now' : 'Offline'}</p>
            </div>
          </div>
          <p class="text-xs text-slate-300 font-medium mb-1">📍 ${friend.locationName}</p>
          <p class="text-[10px] text-slate-400 mb-2.5">Roll: ${friend.roll}</p>
          <button onclick="window.__navToLocation('${friend.nearestNodeId}')" class="w-full px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition">
            Meet up here
          </button>
        </div>
      `;
      marker.bindPopup(popupContent, { closeButton: false });
    });
  }, [friends]);

  // User GPS marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (userPosition) {
      const latLng = [MAP_DIMENSIONS.height - userPosition.y, userPosition.x];
      if (!gpsMarkerRef.current) {
        const gpsIcon = L.divIcon({
          html: '<div class="gps-marker" title="You are here"></div>',
          className: 'custom-gps-marker',
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });
        gpsMarkerRef.current = L.marker(latLng, { icon: gpsIcon }).addTo(mapInstanceRef.current);
      } else {
        gpsMarkerRef.current.setLatLng(latLng);
      }
    } else {
      if (gpsMarkerRef.current) {
        gpsMarkerRef.current.remove();
        gpsMarkerRef.current = null;
      }
    }
  }, [userPosition]);

  // Locate User / Centering on you
  const handleLocateMe = () => {
    if (!mapInstanceRef.current) return;
    if (userPosition) {
      const latLng = [MAP_DIMENSIONS.height - userPosition.y, userPosition.x];
      mapInstanceRef.current.setView(latLng, 0.5, { animate: true });
    } else {
      // Default center: Main Gate / Admin area
      mapInstanceRef.current.setView([MAP_DIMENSIONS.height - 1800, 1600], 0, { animate: true });
    }
  };

  const handleResetBounds = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.fitBounds(bounds, { animate: true });
  };

  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Layer Toggle (Standard <-> Satellite) */}
        <button
          onClick={() => onChangeMapLayer(mapLayer === 'standard' ? 'satellite' : 'standard')}
          title={mapLayer === 'standard' ? 'Switch to Satellite View' : 'Switch to Standard Blueprint'}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-xl backdrop-blur-md transition active:scale-95 flex items-center justify-center gap-1.5 text-xs font-semibold"
        >
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="hidden sm:inline">{mapLayer === 'standard' ? 'Satellite' : 'Blueprint'}</span>
        </button>

        {/* Walkway Overlay Toggle */}
        <button
          onClick={onToggleWalkways}
          title={showWalkways ? 'Hide Walkway Paths' : 'Show Walkway Paths'}
          className={`p-2.5 rounded-xl border shadow-xl backdrop-blur-md transition active:scale-95 flex items-center justify-center gap-1.5 text-xs font-semibold ${
            showWalkways
              ? 'bg-blue-600/90 border-blue-500 text-white'
              : 'bg-slate-900/90 border-slate-700/80 text-slate-400 hover:text-white'
          }`}
        >
          <Footprints className="w-4 h-4" />
          <span className="hidden sm:inline">Walkways</span>
        </button>

        {/* Centering on you (APK String) */}
        <button
          onClick={handleLocateMe}
          title="Centering on you"
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-xl backdrop-blur-md transition active:scale-95 flex items-center justify-center"
        >
          <Crosshair className="w-4 h-4 text-emerald-400" />
        </button>

        {/* Reset View */}
        <button
          onClick={handleResetBounds}
          title="Fit Campus Map"
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-xl backdrop-blur-md transition active:scale-95 flex items-center justify-center"
        >
          <Compass className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* Map Hint Banner */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-[11px] text-slate-300 font-medium shadow-lg flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          <span>Click anywhere on the map to drop a pin</span>
        </div>
      </div>
    </div>
  );
}

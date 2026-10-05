import React, { useState } from 'react';
import { ShieldAlert, Trash2, Megaphone, MapPin, AlertTriangle, Check, Layers, RefreshCw } from 'lucide-react';

export default function AdminDashboard({
  locations = [],
  announcements = [],
  onDeleteAllMarkers,
  onDeleteSingleMarker,
  onPublishAnnouncement,
  onResetToDefaults
}) {
  const [showConfirmDeleteAll, setShowConfirmDeleteAll] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredLocations = locations.filter(l =>
    l.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (l.building && l.building.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const handlePublish = (e) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementText.trim()) return;

    onPublishAnnouncement({
      id: `ann-${Date.now()}`,
      title: announcementTitle.trim(),
      content: announcementText.trim(),
      date: 'Just now',
      pinned: true
    });

    setAnnouncementTitle('');
    setAnnouncementText('');
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-y-auto p-4 space-y-6">
      {/* Admin Panel Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-900/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 shadow-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Campus Navigation Admin Panel</h3>
            <p className="text-xs text-slate-400">Campus POI Management & Broadcast Console</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30">
          Admin Mode
        </span>
      </div>

      {/* Broadcast Campus Announcement */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-amber-400">
          <Megaphone className="w-4 h-4" />
          <h4 className="text-sm font-bold text-white">Broadcast Announcement to Students</h4>
        </div>
        <form onSubmit={handlePublish} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Announcement Title (e.g. New Walkway Route Open)"
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <textarea
            rows={2}
            required
            placeholder="Broadcast message body visible to all campus users..."
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
          />
          <div className="flex items-center justify-between pt-1">
            {publishSuccess ? (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Published to users!
              </span>
            ) : <span />}
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-600/30 transition active:scale-95"
            >
              Broadcast Now
            </button>
          </div>
        </form>
      </div>

      {/* Campus Markers Management */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <h4 className="text-sm font-bold text-white">Campus Map Markers ({locations.length})</h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetToDefaults}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
              title="Reset to default BIT Sathy markers"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            {/* Delete All Markers button matching APK string */}
            <button
              onClick={() => setShowConfirmDeleteAll(true)}
              className="px-2.5 py-1.5 bg-rose-500/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete All Markers</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Filter markers by name or building..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />

        {/* Table / List */}
        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          {filteredLocations.map(loc => (
            <div
              key={loc.id}
              className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white truncate">{loc.name}</span>
                  {loc.isCustom && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold">
                      Custom Pin
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">{loc.building} • {loc.floor || 'Ground'}</p>
              </div>

              <button
                onClick={() => onDeleteSingleMarker(loc.id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition shrink-0"
                title="Delete marker"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* App Version Management Card */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
        <h5 className="font-bold text-slate-200">App Version Management</h5>
        <p>Current APK Target: <span className="text-white font-mono font-bold">Campus Navigation v1.0.4 (Build 12)</span></p>
        <p>Target University: <span className="text-white font-semibold">Bannari Amman Institute of Technology (BIT Sathy)</span></p>
        <p className="text-[11px] text-slate-500 pt-1">Map calibrated to 3392 × 3913 high-resolution architectural canvas.</p>
      </div>

      {/* Confirm Delete All Modal (APK Dialog) */}
      {showConfirmDeleteAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl max-w-sm w-full p-5 shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete All Markers?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will remove all campus location pins and custom markers from the map database. This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setShowConfirmDeleteAll(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteAllMarkers();
                  setShowConfirmDeleteAll(false);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

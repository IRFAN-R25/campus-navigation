import React, { useState } from 'react';
import { MapPin, X, Plus, Layers, Home, Info } from 'lucide-react';
import { CATEGORIES } from '../data/campusData';

export default function MarkerDialog({ isOpen, coords, onClose, onSave }) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('cat-academic');
  const [floor, setFloor] = useState('Ground Floor');
  const [rooms, setRooms] = useState('');
  const [building, setBuilding] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: `custom-pin-${Date.now()}`,
      name: name.trim(),
      category_id: categoryId,
      building: building.trim() || name.trim(),
      floor: floor.trim(),
      rooms: rooms.trim(),
      description: description.trim() || 'Custom pin placed on campus map.',
      customCoords: coords,
      isCustom: true
    });

    // Reset
    setName('');
    setBuilding('');
    setRooms('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header matching APK text */}
        <div className="p-4 bg-gradient-to-r from-blue-900/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">Marker placed. Enter details:</h3>
              <p className="text-xs text-slate-400">Position: X {coords?.x}, Y {coords?.y}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Location / Building Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Central Library West Wing, Robotics Lab"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Floor
              </label>
              <input
                type="text"
                placeholder="e.g. Ground Floor, 2nd Floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Floors & Rooms / Labs
            </label>
            <input
              type="text"
              placeholder="e.g. Room 204, IoT Research Lab, Staff Room"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Description / Landmarks
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Beside north elevator, near water cooler"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 rounded-xl shadow-lg shadow-blue-600/30 transition"
            >
              Save Pin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

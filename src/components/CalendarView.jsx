import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, Trash2, Tag, Navigation, X } from 'lucide-react';

export default function CalendarView({
  events = [],
  onAddEvent,
  onDeleteEvent,
  onNavigateToEventLocation
}) {
  const [filter, setFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Personal Event');
  const [description, setDescription] = useState('');

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(e => e.category === filter);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onAddEvent({
      id: `ev-custom-${Date.now()}`,
      title: title.trim(),
      date,
      time: time || 'All Day',
      location: location || 'Campus',
      type,
      category: type === 'Academic Event' ? 'academic' : 'personal',
      description: description.trim(),
      badge: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      isPersonal: true
    });

    // Reset
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Campus Academic Calendar</h3>
            <p className="text-xs text-slate-400">Events, Internal Tests, Symposiums & Holidays</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-3 overflow-x-auto border-b border-slate-800 bg-slate-900/40 shrink-0">
        {[
          { id: 'all', label: 'All Events' },
          { id: 'academic', label: 'Academic' },
          { id: 'exam', label: 'Exams' },
          { id: 'sports', label: 'Sports' },
          { id: 'cultural', label: 'Cultural' },
          { id: 'holiday', label: 'Holidays' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filter === item.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-semibold">No events found</p>
            <p className="text-xs text-slate-500 mt-1">There are no events listed for this category</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${event.badge || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                    {event.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{event.date}</span>
                </div>

                <h4 className="text-base font-bold text-white leading-tight">{event.title}</h4>

                <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-xs text-slate-400 pt-1 leading-snug">{event.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {event.nearestNodeId && (
                  <button
                    onClick={() => onNavigateToEventLocation(event)}
                    className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-current" />
                    <span>Go to Venue</span>
                  </button>
                )}

                {event.isPersonal && (
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 rounded-xl transition"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add Personal Event / Reminder</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Review Presentation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:30 AM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Personal Event">Personal</option>
                    <option value="Academic Event">Academic</option>
                    <option value="Exam">Exam / Test</option>
                    <option value="Club Meet">Club Meet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Campus Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IB Block Lab 4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes, reminders, room numbers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

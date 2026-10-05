import React from 'react';
import { Map, Users, Calendar, Shield, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, onChangeTab, requestsCount = 0 }) {
  const tabs = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'friends', label: 'Friends', icon: Users, badge: requestsCount },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'admin', label: 'Admin', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around shrink-0 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
              isActive
                ? 'text-blue-400 font-bold'
                : 'text-slate-400 hover:text-slate-200 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl transition ${isActive ? 'bg-blue-500/15 text-blue-400' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>

            {tab.badge > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

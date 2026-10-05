import React, { useState } from 'react';
import {
  Users,
  Radio,
  MapPin,
  UserPlus,
  Bell,
  Check,
  X,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Navigation,
  Send
} from 'lucide-react';

export default function FriendsView({
  friends = [],
  requests = [],
  isSharingLocation = true,
  onToggleSharing,
  onLocateFriendOnMap,
  onAcceptRequest,
  onDeclineRequest,
  onSendInvite
}) {
  const [activeTab, setActiveTab] = useState('friends'); // 'friends', 'requests', 'invite'
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    if (!inviteEmail.toLowerCase().includes('@bitsathy.ac.in') && !inviteEmail.toLowerCase().includes('@')) {
      alert('Please enter a valid student email (e.g. name.dept@bitsathy.ac.in)');
      return;
    }

    onSendInvite(inviteEmail.trim());
    setInviteEmail('');
    setInviteSuccess(true);
    setTimeout(() => setInviteSuccess(false), 4000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top Banner: Sharing Controls matching APK SharingControlPage */}
      <div className="p-4 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
              isSharingLocation
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              <Radio className={`w-5 h-5 ${isSharingLocation ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Active Location Sharing</h3>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isSharingLocation
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isSharingLocation ? 'Live' : 'Paused'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isSharingLocation
                  ? 'Visible to your approved campus friends'
                  : 'Ghost Mode active. Friends cannot see your location.'}
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSharingLocation}
              onChange={(e) => onToggleSharing(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Live notification pill from APK */}
        {isSharingLocation && (
          <div className="mt-3 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2 animate-in fade-in duration-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping shrink-0" />
            <span className="leading-tight">A friend is watching your live campus location</span>
          </div>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 shrink-0">
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 border-b-2 ${
            activeTab === 'friends'
              ? 'border-blue-500 text-blue-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Friends ({friends.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 border-b-2 relative ${
            activeTab === 'requests'
              ? 'border-blue-500 text-blue-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Requests</span>
          {requests.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {requests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('invite')}
          className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 border-b-2 ${
            activeTab === 'invite'
              ? 'border-blue-500 text-blue-400 bg-slate-900/40'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Friends Tab */}
        {activeTab === 'friends' && (
          <div className="space-y-3">
            {friends.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-semibold">No friends added yet</p>
                <p className="text-xs text-slate-500 mt-1">Use the Invite tab to connect with @bitsathy.ac.in classmates</p>
              </div>
            ) : (
              friends.map((friend) => (
                <div
                  key={friend.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition flex items-center justify-between gap-3 shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className={`w-11 h-11 rounded-2xl ${friend.avatarBg || 'bg-indigo-600'} text-white text-sm font-bold flex items-center justify-center shadow-md`}>
                        {friend.avatar}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                        friend.online ? 'bg-emerald-500' : 'bg-slate-500'
                      }`} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white truncate">{friend.name}</h4>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">{friend.roll}</span>
                      </div>
                      <p className="text-xs text-blue-400 font-medium truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{friend.locationName}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{friend.lastSeen}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onLocateFriendOnMap(friend)}
                    title="View on Campus Map"
                    className="p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition active:scale-95 shrink-0 flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Navigation className="w-4 h-4 fill-current" />
                    <span className="hidden sm:inline">Track</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Requests Tab (YourRequestsPage) */}
        {activeTab === 'requests' && (
          <div className="space-y-3">
            {requests.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Bell className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-semibold">No incoming requests</p>
                <p className="text-xs text-slate-500 mt-1">When someone sends you a friend request, it will appear here.</p>
              </div>
            ) : (
              requests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-2xl ${req.avatarBg || 'bg-purple-600'} text-white text-sm font-bold flex items-center justify-center shrink-0`}>
                      {req.avatar}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{req.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{req.dept}</p>
                      <p className="text-[10px] text-slate-500">{req.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onAcceptRequest(req.id)}
                      className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition active:scale-95"
                      title="Accept Request"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeclineRequest(req.id)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition active:scale-95"
                      title="Decline"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Invite / Add Friend Tab */}
        {activeTab === 'invite' && (
          <div className="max-w-md mx-auto py-4 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
                <UserPlus className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">Search New Friends</h4>
              <p className="text-xs text-slate-400">
                Share live locations only with verified students of Bannari Amman Institute of Technology.
              </p>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Invite by email...
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student.dept@bitsathy.ac.in"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>Send Friend Invitation</span>
              </button>
            </form>

            {inviteSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Friend request sent successfully!</span>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" /> Privacy Notice
              </p>
              <p>
                By accepting, you both will be able to see each other's live locations on the campus map during college hours. You can turn on Ghost Mode at any time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

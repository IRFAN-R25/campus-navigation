import React, { useState } from 'react';
import { Compass, ShieldCheck, ArrowRight, Sparkles, Navigation, Users, Calendar } from 'lucide-react';

export default function OnboardingModal({ isOpen, onCompleteLogin }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleInstitutionalLogin = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail.endsWith('@bitsathy.ac.in')) {
      setError('Unauthorized: Only @bitsathy.ac.in accounts are allowed.');
      return;
    }

    const userName = name.trim() || cleanEmail.split('@')[0].replace('.', ' ').toUpperCase();
    onCompleteLogin({
      name: userName,
      email: cleanEmail,
      dept: 'Computer Science & Engineering',
      roll: '7376221CS' + Math.floor(100 + Math.random() * 900),
      avatar: userName.substring(0, 2).toUpperCase()
    });
  };

  const handleDemoLogin = () => {
    onCompleteLogin({
      name: 'Irfan (BIT Student)',
      email: 'irfan.cs22@bitsathy.ac.in',
      dept: 'Computer Science & Engineering',
      roll: '7376221CS108',
      avatar: 'IK'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center">
        {/* App Logo & Branding */}
        <div className="space-y-3">
          <div className="relative w-20 h-20 mx-auto">
            <img
              src={`${import.meta.env.BASE_URL}assets/app_icon.png`}
              alt="Campus Navigation App Icon"
              className="w-full h-full object-cover rounded-3xl shadow-xl shadow-blue-500/20 border-2 border-blue-500/30"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Campus Navigation</h2>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mt-0.5">
              BIT Sathy Campus Map & Directions
            </p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed px-4">
            Experience the next level of campus navigation designed for the modern student.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
            <Navigation className="w-4 h-4 mx-auto text-blue-400 mb-1" />
            <span className="text-[11px] font-semibold text-slate-300 block">Walkways</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
            <Users className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
            <span className="text-[11px] font-semibold text-slate-300 block">Live Friends</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-center">
            <Calendar className="w-4 h-4 mx-auto text-purple-400 mb-1" />
            <span className="text-[11px] font-semibold text-slate-300 block">Calendar</span>
          </div>
        </div>

        {/* Auth form */}
        <form onSubmit={handleInstitutionalLogin} className="space-y-3 text-left">
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Arun Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Institutional Email *
            </label>
            <input
              type="email"
              required
              placeholder="student.dept@bitsathy.ac.in"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-98 text-white rounded-xl text-xs font-bold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>Sign in with bitsathy mail</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Fast 1-Click Demo Explore Button */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/80 transition flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Explore Campus as Demo Student</span>
          </button>
        </div>

        <p className="text-[10px] text-slate-500">
          Bannari Amman Institute of Technology (BIT Sathy) • Built by students for students
        </p>
      </div>
    </div>
  );
}

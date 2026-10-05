import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Compass,
  CheckCircle2,
  AlertCircle,
  Building
} from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering',
  'Biotechnology',
  'Biomedical Engineering',
  'Civil Engineering',
  'Fashion Technology'
];

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regRoll, setRegRoll] = useState('');
  const [regDept, setRegDept] = useState(DEPARTMENTS[0]);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  if (!isOpen) return null;

  // Retrieve existing registered users
  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem('fmw_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = loginEmail.trim().toLowerCase();

    if (!cleanEmail.endsWith('@bitsathy.ac.in') && !cleanEmail.includes('@')) {
      setError('Please enter a valid @bitsathy.ac.in institutional email.');
      return;
    }

    const users = getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      if (existing.password && existing.password !== loginPassword) {
        setError('Incorrect password. Please try again.');
        return;
      }
      onLoginSuccess(existing);
      return;
    }

    // If not found in custom registered users, permit institutional sign in
    const userName = cleanEmail.split('@')[0].replace('.', ' ').toUpperCase();
    const defaultUser = {
      name: userName,
      email: cleanEmail,
      dept: 'Computer Science & Engineering',
      roll: '7376221CS' + Math.floor(100 + Math.random() * 900),
      avatar: userName.substring(0, 2).toUpperCase(),
      role: 'student'
    };

    onLoginSuccess(defaultUser);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = regEmail.trim().toLowerCase();

    if (!cleanEmail.endsWith('@bitsathy.ac.in')) {
      setError('Unauthorized: Registration requires an official @bitsathy.ac.in email address.');
      return;
    }

    if (!regPassword || regPassword.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    const users = getRegisteredUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      setError('An account with this institutional email already exists. Please sign in.');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: regName.trim(),
      email: cleanEmail,
      roll: regRoll.trim().toUpperCase() || '7376221CS101',
      dept: regDept,
      password: regPassword,
      avatar: regName.trim().substring(0, 2).toUpperCase(),
      role: 'student'
    };

    users.push(newUser);
    localStorage.setItem('fmw_registered_users', JSON.stringify(users));

    setSuccessMsg('Account created successfully! Logging you in...');
    setTimeout(() => {
      onLoginSuccess(newUser);
    }, 1000);
  };

  const handleGuestLogin = () => {
    const guestUser = {
      name: 'Campus Visitor',
      email: 'visitor@guest.bitsathy.ac.in',
      dept: 'General Visitor / Guest',
      roll: 'VISITOR-2026',
      avatar: 'VI',
      role: 'guest'
    };
    onLoginSuccess(guestUser);
  };

  const handleDemoStudentLogin = () => {
    const demoUser = {
      name: 'Irfan (BIT Student)',
      email: 'irfan.cs22@bitsathy.ac.in',
      dept: 'Computer Science & Engineering',
      roll: '7376221CS108',
      avatar: 'IK',
      role: 'student'
    };
    onLoginSuccess(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with App Logo */}
        <div className="p-5 pb-3 text-center space-y-2 border-b border-slate-800/80 bg-gradient-to-b from-slate-800/40 to-transparent">
          <div className="relative w-16 h-16 mx-auto">
            <img
              src={`${import.meta.env.BASE_URL}assets/app_icon.png`}
              alt="Campus Navigation"
              className="w-full h-full object-cover rounded-2xl shadow-xl shadow-cyan-500/20 border border-cyan-500/30"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Campus Navigation</h2>
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              Bannari Amman Institute of Technology
            </p>
          </div>

          {/* Login / Register Toggle Tabs */}
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800 max-w-xs mx-auto mt-2">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                tab === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                tab === 'register'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {tab === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Institutional Email (@bitsathy.ac.in)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student.dept@bitsathy.ac.in"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Password / PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password (optional for demo)"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-98 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
              >
                <span>Sign in with bitsathy mail</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Student Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arun Kumar"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="7376221CS101"
                    value={regRoll}
                    onChange={(e) => setRegRoll(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Department
                  </label>
                  <select
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    className="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d.split('(')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Institutional Email (@bitsathy.ac.in) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="student.dept@bitsathy.ac.in"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 4 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
              >
                <span>Create Student Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Access Buttons */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={handleDemoStudentLogin}
              className="w-full py-2 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/80 transition flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Sign in as Demo Student (1-Click)</span>
            </button>

            <button
              onClick={handleGuestLogin}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-medium border border-slate-800/80 transition flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Continue as Campus Visitor / Guest</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-[10px] text-slate-500">
          Only verified @bitsathy.ac.in institutional accounts are authorized for full campus student privileges.
        </div>
      </div>
    </div>
  );
}

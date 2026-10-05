import React, { useState } from 'react';
import { X, Code2, Globe, Mail, Heart, Send, Check } from 'lucide-react';

export default function ContactDeveloperModal({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header from APK */}
        <div className="p-4 bg-gradient-to-r from-blue-900/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">From the Developer</h3>
              <p className="text-xs text-slate-400">An AI-augmented Student Project</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              <strong className="text-white">Campus Navigation</strong> is an independent project purely made by students for students of <span className="text-blue-400 font-semibold">Bannari Amman Institute of Technology</span>.
            </p>
            <p className="text-slate-400">
              Designed to help freshers, visitors, and students navigate the sprawling 180+ acre campus effortlessly with accurate pedestrian walkway routing, live friend sharing, and building directories.
            </p>
          </div>

          {/* Social Links from APK strings */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-2 text-xs font-semibold"
            >
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-2 text-xs font-semibold"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:support@bitsathy.ac.in"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-2 text-xs font-semibold"
            >
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Email</span>
            </a>
          </div>

          {/* Feedback Form matching APK */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold uppercase text-slate-400">
              Send Feedback or Report Map Issue
            </label>
            <textarea
              rows={3}
              required
              placeholder="Suggest a new room pin, report wrong coordinates, or share your thoughts..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />

            {submitted ? (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Your feedback has been recorded.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

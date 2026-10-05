import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Navigation,
  MapPin,
  X,
  Bot,
  User,
  Coffee,
  BookOpen,
  HeartPulse,
  CreditCard,
  Bus,
  Laptop,
  Trophy,
  Landmark,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { queryCampusAi } from '../services/campusAiService';
import { CATEGORIES } from '../data/campusData';

export default function CampusAIAssistantModal({
  isOpen,
  onClose,
  locations,
  onStartNavigation,
  onSelectLocation
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hi! I'm your **BIT Sathy Campus AI Assistant**.\n\nAsk me anything in plain English or Tamil-English (e.g., *'Where can I get coffee?'*, *'Where to pay fees?'*, or *'Take me to Mechanical Block'*), or tap a quick prompt below!",
      locations: [],
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = 'en-IN'; // Indian English accent support

      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
        setIsListening(false);
      };

      recog.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;
    }
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleToggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use text typing.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Could not start recognition:', err);
      }
    }
  };

  const handleSendMessage = async (queryText = inputText) => {
    const textToSend = queryText.trim();
    if (!textToSend || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Simulate intelligent processing delay (~250ms)
      await new Promise(r => setTimeout(r, 280));
      const aiResponse = await queryCampusAi(textToSend, locations);

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse.text,
        locations: aiResponse.locations || [],
        action: aiResponse.action,
        tips: aiResponse.tips,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI query error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: "I ran into a temporary error answering that. Please try rephrasing your question or tap one of the quick suggestions!",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: "Conversation cleared. How can I help you navigate BIT Sathy campus today?",
        locations: [],
        timestamp: 'Just now'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full h-[85vh] sm:h-[650px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">Campus AI Guide</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  AI Active
                </span>
              </div>
              <p className="text-[10px] text-slate-400">BIT Sathy Intelligent Assistant & Directions</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearChat}
              title="Reset Chat"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 shrink-0 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 whitespace-nowrap text-[11px]">
            <button
              onClick={() => handleQuickPrompt("Where can I get coffee or snacks?")}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Coffee & Snacks</span>
            </button>
            <button
              onClick={() => handleQuickPrompt("Where are quiet study spots with AC?")}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Quiet Study</span>
            </button>
            <button
              onClick={() => handleQuickPrompt("I need medical first aid or hospital clinic")}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              <span>Medical Clinic</span>
            </button>
            <button
              onClick={() => handleQuickPrompt("Where is the 24/7 ATM to withdraw cash?")}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>ATM & Bank</span>
            </button>
            <button
              onClick={() => handleQuickPrompt("Where do college buses leave from?")}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Bus className="w-3.5 h-3.5 text-purple-400" />
              <span>Bus Terminal</span>
            </button>
            <button
              onClick={() => handleQuickPrompt("Where is computer science (CSE) lab?")}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>CSE & IT Labs</span>
            </button>
            <button
              onClick={() => handleQuickPrompt("Where can I pay college fee or see COE?")}
              className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pay Fees / COE</span>
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2.5 ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-sm shadow-md shadow-blue-600/20'
                      : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-bl-sm shadow-md'
                  }`}
                >
                  {/* Message Body */}
                  <div className="space-y-1 whitespace-pre-line">
                    {msg.text.split('\n\n').map((paragraph, i) => (
                      <p key={i}>
                        {paragraph.split('**').map((part, j) =>
                          j % 2 === 1 ? <strong key={j} className="text-white font-bold">{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>

                  {/* AI Tips */}
                  {msg.tips && (
                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-[11px] text-cyan-300/90 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-cyan-400 mt-0.5" />
                      <span>{msg.tips}</span>
                    </div>
                  )}

                  {/* Recommended Locations Interactive Cards */}
                  {msg.locations && msg.locations.length > 0 && (
                    <div className="space-y-2 pt-1 border-t border-slate-700/60">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Recommended Campus Places:
                      </div>
                      {msg.locations.map((loc) => {
                        const cat = CATEGORIES.find(c => c.id === loc.category_id) || CATEGORIES[0];
                        return (
                          <div
                            key={loc.id}
                            className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/90 hover:border-blue-500/60 transition space-y-2 text-left"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-bold text-white text-xs leading-snug">
                                  {loc.name}
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  {loc.building} {loc.floor ? `• ${loc.floor}` : ''}
                                </p>
                              </div>
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                                style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                              >
                                {cat.name.split(' ')[0]}
                              </span>
                            </div>

                            {loc.description && (
                              <p className="text-[11px] text-slate-300 line-clamp-2">
                                {loc.description}
                              </p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => {
                                  onStartNavigation(loc);
                                  onClose();
                                }}
                                className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 transition"
                              >
                                <Navigation className="w-3.5 h-3.5 fill-current" />
                                <span>Start Navigation</span>
                              </button>
                              <button
                                onClick={() => {
                                  onSelectLocation(loc);
                                  onClose();
                                }}
                                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1 transition"
                                title="Pin on Map"
                              >
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">View Pin</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="text-[9px] text-slate-400/80 text-right">
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-2 animate-pulse">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Campus AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleToggleListening}
              title={isListening ? 'Stop Listening' : 'Speak your question'}
              className={`p-2.5 rounded-xl border transition shrink-0 ${
                isListening
                  ? 'bg-rose-600 border-rose-500 text-white animate-pulse shadow-lg shadow-rose-600/40'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder={isListening ? 'Listening to your voice...' : "Ask anything (e.g. 'Where is the library?')..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 py-2.5 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`p-2.5 rounded-xl transition shrink-0 ${
                inputText.trim() && !isTyping
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          {isListening && (
            <p className="text-[10px] text-rose-400 font-medium text-center mt-1.5 animate-pulse">
              🎙️ Listening... Speak naturally (e.g., "Take me to Mechanical Block")
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

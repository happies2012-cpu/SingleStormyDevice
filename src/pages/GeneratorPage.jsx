import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, ArrowRight, ChevronRight, Cpu, Globe, Shield,
  BarChart3, Layers, Smartphone, Sparkles
} from 'lucide-react';
import { useApp } from '../App.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { INDUSTRIES, getIndustryData } from '../data/industries.js';
import { AnimatedBackground } from '../components/AnimatedBackground.jsx';
import { GlassCard } from '../components/GlassCard.jsx';
import { GlassButton } from '../components/GlassButton.jsx';
import { ThemeToggle } from '../components/ThemeToggle.jsx';

const TYPING_PHRASES = [
  'Healthcare AI Platform',
  'FinTech Neural Interface',
  'E-Commerce Matrix',
  'SaaS Command Center',
  'Real Estate Protocol',
  'EdTech Data Cluster',
];

const FEATURE_GRID = [
  { icon: Layers, label: '5 UNIQUE THEMES', desc: 'DISTINCT VISUAL PROTOCOLS' },
  { icon: BarChart3, label: '30 PAGE MODULES', desc: 'FULLY RENDERED INTERFACES' },
  { icon: Smartphone, label: 'RESPONSIVE MATRIX', desc: 'MOBILE → DESKTOP ADAPTIVE' },
  { icon: Shield, label: 'DARK / LIGHT MODES', desc: 'DUAL-STATE RENDERING' },
  { icon: Globe, label: '10 INDUSTRIES', desc: 'SECTOR PRESETS LOADED' },
  { icon: Cpu, label: 'INSTANT GENERATION', desc: 'SUB-2 SECOND DEPLOY' },
];

export default function GeneratorPage() {
  const navigate = useNavigate();
  const { setIndustryData } = useApp();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [input, setInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);
  const inputRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    if (isTyping) {
      if (charIdx < phrase.length) {
        const t = setTimeout(() => {
          setDisplayText(phrase.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setIsTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplayText(phrase.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 32);
        return () => clearTimeout(t);
      } else {
        setPhraseIdx(i => (i + 1) % TYPING_PHRASES.length);
        setIsTyping(true);
      }
    }
  }, [charIdx, isTyping, phraseIdx]);

  const handleGenerate = async (industry) => {
    if (!industry.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1100));
    const data = getIndustryData(industry);
    setIndustryData(data);
    navigate('/themes');
  };

  // Container variants for stagger
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className={`min-h-screen relative ${isDark ? 'dark bg-[#020208]' : 'bg-[#f4f6ff]'}`}>
      <AnimatedBackground />

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] grid-lines opacity-40" aria-hidden="true" />

      {/* ── NAVBAR ─────────────────────────────────── */}
      <header className="relative z-50 glass-nav sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#020208] animate-pulse" />
            </div>
            <div>
              <div className={`font-black text-[15px] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                UI SANDBOX
              </div>
              <div className="label-mono text-indigo-400">GENERATOR v2.0</div>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border label-mono ${
                isDark ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-emerald-600/30 bg-emerald-500/10 text-emerald-600'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </motion.div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pt-20 pb-10 text-center"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border label-mono ${
              isDark
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                : 'bg-indigo-500/8 border-indigo-400/30 text-indigo-600'
            }`}>
              <Zap size={12} className="text-indigo-400" />
              NEURAL INTERFACE GENERATOR · UNIT 7 ACTIVE
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className={`font-black tracking-tight leading-[1.05] mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            INITIALIZE{' '}
            <span className="text-gradient-primary">UI MATRIX</span>
            <br />
            <span className={`text-[0.65em] font-semibold tracking-tight ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              FOR ANY INDUSTRY SECTOR
            </span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={itemVariants} className="mb-6 h-10 flex items-center justify-center">
            <div className={`font-mono text-lg sm:text-xl font-medium flex items-center gap-1 ${
              isDark ? 'text-indigo-300' : 'text-indigo-600'
            }`}>
              <span className="opacity-50">{'>'}</span>
              <span className="ml-2">{displayText}</span>
              <span className="ml-0.5 w-[2px] h-5 bg-indigo-400 animate-blink rounded-full" />
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 ${isDark ? 'text-white/50' : 'text-slate-500'}`}
          >
            Deploy <strong className={isDark ? 'text-white/80' : 'text-slate-700'}>5 unique design protocols</strong> ×{' '}
            <strong className={isDark ? 'text-white/80' : 'text-slate-700'}>30 fully-rendered interface modules</strong> per industry sector.
            150 production-ready UI patterns. Zero configuration required.
          </motion.p>

          {/* ── INPUT TERMINAL ──────────────────────── */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-4">
            <div className={`relative p-1.5 rounded-2xl border ${
              isDark
                ? 'bg-white/[0.03] border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.08)]'
                : 'bg-white/80 border-black/8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]'
            } backdrop-blur-2xl`}>
              {/* Terminal header */}
              <div className={`flex items-center gap-2 px-4 py-2.5 border-b mb-1 ${isDark ? 'border-white/[0.06]' : 'border-black/[0.05]'}`}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="label-mono text-indigo-400 ml-2">INPUT SEQUENCE TERMINAL</div>
              </div>

              <div className="flex items-center gap-3 px-2">
                <span className={`label-mono ml-2 flex-shrink-0 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`}>$ sector={'>'}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGenerate(input)}
                  placeholder={`${displayText}|`}
                  disabled={generating}
                  aria-label="Enter industry sector"
                  className={`flex-1 bg-transparent py-3.5 text-base font-medium placeholder:font-normal outline-none font-mono ${
                    isDark
                      ? 'text-white placeholder:text-white/20'
                      : 'text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <GlassButton
                  onClick={() => handleGenerate(input)}
                  disabled={generating || !input.trim()}
                  loading={generating}
                  size="md"
                  iconRight={!generating ? <ArrowRight size={15} /> : undefined}
                  className={!input.trim() ? 'opacity-40' : ''}
                >
                  {generating ? 'INITIALIZING' : 'GENERATE'}
                </GlassButton>
              </div>
            </div>
            <div className={`text-center mt-3 label-mono ${isDark ? 'text-white/25' : 'text-slate-400'}`}>
              ENTER SECTOR NAME OR SELECT FROM PRESETS BELOW · PRESS ENTER TO EXECUTE
            </div>
          </motion.div>
        </motion.div>

        {/* ── GENERATING OVERLAY ──────────────────── */}
        <AnimatePresence>
          {generating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
              style={{ backdropFilter: 'blur(8px)', background: isDark ? 'rgba(2,2,8,0.85)' : 'rgba(244,246,255,0.85)' }}
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl">
                  <Cpu size={36} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-2xl animate-pulse-ring border-2 border-indigo-400/40" />
              </div>
              <div>
                <div className={`font-black text-2xl text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  INITIALIZING MATRIX
                </div>
                <div className="label-mono text-indigo-400 text-center mt-2">
                  LOADING DESIGN PROTOCOLS...
                </div>
                <div className="flex justify-center gap-1.5 mt-4">
                  {[0,1,2,3,4].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── INDUSTRY PRESETS ─────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="pb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`h-px flex-1 ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`} />
            <div className={`label-mono ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
              SECTOR PRESETS · {INDUSTRIES.length} NODES AVAILABLE
            </div>
            <div className={`h-px flex-1 ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`} />
          </div>

          <div className="grid gap-3 sm:gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}>
            {INDUSTRIES.map((ind, i) => (
              <motion.button
                key={ind.id}
                onClick={() => handleGenerate(ind.label)}
                disabled={generating}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.04, duration: 0.45, ease: [0.22,1,0.36,1] }}
                whileHover={{ scale: 1.025, y: -3 }}
                whileTap={{ scale: 0.975 }}
                className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.15]'
                    : 'bg-white/70 border-black/[0.07] hover:bg-white hover:border-black/[0.12]'
                } backdrop-blur-xl cursor-pointer`}
                style={{
                  boxShadow: isDark
                    ? '0 1px 0 rgba(255,255,255,0.04) inset'
                    : '0 1px 0 rgba(255,255,255,0.9) inset, 0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Color accent bar */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: ind.color }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110"
                  style={{ background: `${ind.color}18` }}
                >
                  {ind.icon}
                </div>

                <div className={`font-bold text-[15px] mb-1 ${isDark ? 'text-white/90' : 'text-slate-800'}`}>
                  {ind.label.toUpperCase()}
                </div>
                <div className={`label-mono mb-2 ${isDark ? 'text-white/35' : 'text-slate-400'}`}>
                  {ind.desc.toUpperCase()}
                </div>

                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="label-mono" style={{ color: ind.color }}>INITIALIZE</span>
                  <ChevronRight size={10} style={{ color: ind.color }} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* ── CAPABILITY GRID ──────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="pb-20"
        >
          <div className={`rounded-3xl border p-8 ${
            isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white/60 border-black/[0.06]'
          } backdrop-blur-2xl`}>
            <div className="grid gap-5 sm:gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {FEATURE_GRID.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.06 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-indigo-500/15 border border-indigo-500/20' : 'bg-indigo-500/10 border border-indigo-400/20'
                  }`}>
                    <f.icon size={16} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${isDark ? 'text-white/90' : 'text-slate-800'}`}>{f.label}</div>
                    <div className={`label-mono mt-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      {/* ── FOOTER ─────────────────────────────────── */}
      <footer className={`relative z-10 border-t py-6 ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <div className={`label-mono ${isDark ? 'text-white/25' : 'text-slate-400'}`}>
            UI SANDBOX GENERATOR · BUILD {new Date().getFullYear()}.{String(new Date().getMonth()+1).padStart(2,'0')}
          </div>
          <div className={`label-mono ${isDark ? 'text-white/25' : 'text-slate-400'}`}>
            SYSTEM STATUS: <span className="text-emerald-400">OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

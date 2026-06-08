import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../App.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { THEMES } from '../themes/themes.js';
import { AnimatedBackground } from '../components/AnimatedBackground.jsx';
import { ThemeToggle } from '../components/ThemeToggle.jsx';
import { GlassButton } from '../components/GlassButton.jsx';

export default function ThemeSelector() {
  const navigate = useNavigate();
  const { industryData, setSelectedTheme } = useApp();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const pickTheme = (t) => {
    setSelected(t.id);
    setTimeout(() => {
      setSelectedTheme(t);
      navigate(`/preview/${t.id}/home`);
    }, 350);
  };

  return (
    <div className={`min-h-screen relative ${isDark ? 'dark bg-[#020208]' : 'bg-[#f4f6ff]'}`}>
      <AnimatedBackground intensity={0.7} />
      <div className="fixed inset-0 pointer-events-none z-[1] grid-lines opacity-30" aria-hidden="true" />

      {/* ── NAVBAR ─────────────────────────────────── */}
      <header className="relative z-50 glass-nav sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <GlassButton variant="secondary" size="sm" onClick={() => navigate('/')} icon={<ArrowLeft size={14} />}>
            BACK
          </GlassButton>

          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl`}
              style={{ background: `${industryData.color}20` }}>
              {industryData.icon}
            </div>
            <div>
              <div className={`label-mono ${isDark ? 'text-white/40' : 'text-slate-400'}`}>ACTIVE SECTOR</div>
              <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {industryData.label.toUpperCase()} · {industryData.brandName}
              </div>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* ── CONTENT ────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
          className="text-center mb-14"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 label-mono ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-indigo-500/8 border-indigo-400/30 text-indigo-600'
          }`}>
            <Layers size={11} />
            SELECT VISUAL PROTOCOL · 5 SYSTEMS AVAILABLE
          </div>

          <h1 className={`font-black tracking-tight leading-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            CHOOSE{' '}
            <span className="text-gradient-primary">DESIGN PROTOCOL</span>
          </h1>

          <p className={`text-base max-w-xl mx-auto ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
            Each protocol includes <strong className={isDark ? 'text-white/70' : 'text-slate-700'}>30 fully-rendered interface modules</strong> optimized
            for <strong className={isDark ? 'text-white/70' : 'text-slate-700'}>{industryData.brandName}</strong>.
            Select to preview.
          </p>
        </motion.div>

        {/* Theme grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
          {THEMES.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => pickTheme(t)}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: selected === t.id ? 0.6 : 1, y: 0, scale: selected === t.id ? 0.97 : 1 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22,1,0.36,1] }}
              whileHover={{ scale: 1.015, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative text-left overflow-hidden rounded-3xl border transition-all duration-300"
              style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.75)',
                borderColor: hovered === t.id
                  ? `${t.style.primary}60`
                  : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
                boxShadow: hovered === t.id
                  ? `0 20px 60px ${t.style.primary}25, 0 0 0 1px ${t.style.primary}30`
                  : isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              {/* Top inset highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Preview panel */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: 200,
                  background: t.style.gradientHero || t.style.gradient,
                }}
              >
                {/* Badge */}
                <div
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-white label-mono text-[10px] font-bold"
                  style={{ background: t.badgeColor || t.style.primary }}
                >
                  {t.badge}
                </div>

                {/* Color swatches */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {t.preview.slice(0, 4).map((c, j) => (
                    <div key={j}
                      className="w-4 h-4 rounded-full border border-white/30 shadow-lg"
                      style={{ background: typeof c === 'string' && c.startsWith('rgba') ? 'rgba(255,255,255,0.3)' : c }}
                    />
                  ))}
                </div>

                {/* Mock browser chrome */}
                <div className={`absolute bottom-0 left-6 right-6 rounded-t-xl overflow-hidden shadow-2xl`}
                  style={{
                    background: t.style.isGlass ? 'rgba(255,255,255,0.12)' : t.style.surface,
                    border: `1px solid ${t.style.border}`,
                    borderBottom: 'none',
                  }}
                >
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: t.style.border }}>
                    {['#ef4444','#f59e0b','#10b981'].map(c => (
                      <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                    ))}
                    <div className="ml-2 flex-1 h-3 rounded-full" style={{ background: t.style.border, maxWidth: 120 }} />
                  </div>
                  <div className="p-3">
                    <div className="h-2.5 rounded-full mb-2 w-3/4" style={{ background: t.style.primary, opacity: 0.7 }} />
                    <div className="h-1.5 rounded-full mb-1.5 w-full" style={{ background: t.style.border }} />
                    <div className="h-1.5 rounded-full w-2/3" style={{ background: t.style.border }} />
                  </div>
                </div>
              </div>

              {/* Info panel */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className={`font-black text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {t.name.toUpperCase()}
                    </div>
                    <div className="label-mono mt-0.5" style={{ color: t.style.primary }}>{t.subtitle.toUpperCase()}</div>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all"
                    style={{
                      borderColor: hovered === t.id ? t.style.primary : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      background: hovered === t.id ? t.style.primary : 'transparent',
                    }}
                  >
                    {hovered === t.id
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <ChevronRight size={14} style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }} />
                    }
                  </div>
                </div>

                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/45' : 'text-slate-500'}`}>
                  {t.description}
                </p>

                <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
                  <div className={`label-mono ${isDark ? 'text-white/25' : 'text-slate-400'}`}>
                    30 MODULES · LIGHT + DARK
                  </div>
                  <div className="label-mono" style={{ color: t.style.primary }}>
                    DEPLOY →
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}

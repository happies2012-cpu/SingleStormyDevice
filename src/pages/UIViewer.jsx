import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Monitor, Tablet, Smartphone, Sun, Moon,
  ChevronLeft, ChevronRight, Layers
} from 'lucide-react';
import { useApp } from '../App.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { THEMES } from '../themes/themes.js';
import { PAGE_CATEGORIES, ALL_PAGES } from './ui/registry.js';
import { renderPage } from './ui/pages.jsx';

export default function UIViewer() {
  const navigate = useNavigate();
  const { themeId, pageId = 'home' } = useParams();
  const { industryData, selectedTheme, setSelectedTheme } = useApp();
  const { theme: appTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [device, setDevice] = useState('desktop');
  const [darkVariant, setDarkVariant] = useState(false);

  const theme = useMemo(() => THEMES.find(t => t.id === themeId) || selectedTheme, [themeId, selectedTheme]);
  const currentPage = ALL_PAGES.find(p => p.id === pageId) || ALL_PAGES[0];
  const currentIdx = ALL_PAGES.findIndex(p => p.id === pageId);
  const prevPage = ALL_PAGES[currentIdx - 1];
  const nextPage = ALL_PAGES[currentIdx + 1];

  useEffect(() => {
    if (theme && theme !== selectedTheme) setSelectedTheme(theme);
  }, [theme]);

  const themeStyle = useMemo(() => {
    if (!theme) return null;
    if (!darkVariant) return theme.style;
    const isAlreadyDark = ['dark-corporate', 'glassmorphism'].includes(theme.id);
    if (isAlreadyDark) return theme.style;
    return {
      ...theme.style,
      bg: '#0f172a',
      surface: '#1e293b',
      surface2: '#293548',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      textLight: '#64748b',
      border: '#334155',
      borderLight: '#1e293b',
      navBg: '#1e293b',
      navText: '#f1f5f9',
      sidebarBg: '#1e293b',
      sidebarText: '#94a3b8',
      sidebarActive: '#0f172a',
      sidebarActiveText: theme.style.primary,
      heroText: '#f1f5f9',
      gradientHero: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, ${theme.style.primaryDark}40 100%)`,
      shadow: '0 1px 3px rgba(0,0,0,0.4)',
      shadowMd: '0 4px 6px rgba(0,0,0,0.3)',
      shadowLg: '0 10px 25px rgba(0,0,0,0.5)',
      primaryLight: theme.style.primaryDark + '30',
    };
  }, [theme, darkVariant]);

  if (!theme || !industryData) return null;

  const deviceWidths = { mobile: 390, tablet: 820, desktop: '100%' };
  const deviceIcons = { desktop: Monitor, tablet: Tablet, mobile: Smartphone };

  return (
    <div className="flex min-h-screen bg-[#05050f] text-slate-100 font-sans overflow-hidden" style={{ height: '100vh' }}>

      {/* ── SIDEBAR ──────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 272, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 flex flex-col border-r border-white/[0.07] overflow-hidden"
            style={{
              background: 'rgba(8,8,20,0.95)',
              backdropFilter: 'blur(20px)',
              height: '100vh',
              position: 'sticky',
              top: 0,
            }}
          >
            <div className="w-[272px] flex flex-col h-full overflow-y-auto custom-scrollbar">
              {/* Header */}
              <div className="p-4 border-b border-white/[0.06] flex-shrink-0">
                <button
                  onClick={() => navigate('/themes')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-all text-[13px] font-medium w-full mb-4"
                >
                  <ChevronLeft size={13} />
                  BACK TO THEMES
                </button>

                {/* Active theme info */}
                <div
                  className="p-3 rounded-xl border"
                  style={{
                    background: `${theme.style.primary}12`,
                    borderColor: `${theme.style.primary}30`,
                  }}
                >
                  <div className="label-mono text-[10px] mb-1" style={{ color: theme.style.primary }}>
                    ACTIVE PROTOCOL
                  </div>
                  <div className="font-bold text-sm text-white">{theme.name.toUpperCase()}</div>
                  <div className="text-[11px] text-white/40 mt-0.5 font-mono">{industryData.brandName}</div>
                </div>
              </div>

              {/* Theme switcher */}
              <div className="p-4 border-b border-white/[0.06] flex-shrink-0">
                <div className="label-mono text-[10px] text-white/25 mb-2.5">SWITCH PROTOCOL</div>
                <div className="grid grid-cols-5 gap-1.5">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => navigate(`/preview/${t.id}/${pageId}`)}
                      title={t.name}
                      className="relative h-8 rounded-lg transition-all overflow-hidden"
                      style={{
                        background: t.style.gradient || t.style.primary,
                        outline: t.id === theme.id ? `2px solid white` : '2px solid transparent',
                        outlineOffset: 1,
                      }}
                    >
                      {t.id === theme.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page nav */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                {PAGE_CATEGORIES.map(cat => (
                  <div key={cat.name} className="mb-4">
                    <div className="label-mono text-[10px] text-white/25 px-2 mb-1.5">{cat.name}</div>
                    {cat.pages.map(page => {
                      const active = page.id === pageId;
                      return (
                        <button
                          key={page.id}
                          onClick={() => navigate(`/preview/${themeId}/${page.id}`)}
                          className="w-full text-left px-3 py-2 mb-0.5 rounded-lg flex items-center gap-2.5 transition-all text-[13px] font-medium"
                          style={{
                            background: active ? `${theme.style.primary}18` : 'transparent',
                            color: active ? theme.style.primary : 'rgba(148,163,184,0.7)',
                            border: active ? `1px solid ${theme.style.primary}30` : '1px solid transparent',
                          }}
                          onMouseEnter={e => {
                            if (!active) {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (!active) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'rgba(148,163,184,0.7)';
                            }
                          }}
                        >
                          <span className="text-[14px] flex-shrink-0">{page.icon}</span>
                          <span className="truncate">{page.label}</span>
                          {active && (
                            <span
                              className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: theme.style.primary }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom upgrade nudge */}
              <div className="p-4 flex-shrink-0 border-t border-white/[0.06]">
                <div
                  className="text-center p-3 rounded-xl border"
                  style={{
                    background: `${theme.style.primary}08`,
                    borderColor: `${theme.style.primary}20`,
                  }}
                >
                  <div className="label-mono text-[10px] mb-1" style={{ color: theme.style.primary }}>
                    {ALL_PAGES.findIndex(p => p.id === pageId) + 1} / {ALL_PAGES.length} MODULES
                  </div>
                  <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${((ALL_PAGES.findIndex(p => p.id === pageId) + 1) / ALL_PAGES.length) * 100}%`,
                        background: theme.style.gradient || theme.style.primary,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── TOP TOOLBAR ──────────────────────────── */}
        <div
          className="flex-shrink-0 flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] z-40"
          style={{
            background: 'rgba(8,8,20,0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Toggle sidebar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-all flex-shrink-0"
          >
            <Menu size={15} />
          </motion.button>

          {/* Page title */}
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base">{currentPage.icon}</span>
              <span className="font-bold text-sm text-white truncate">{currentPage.label.toUpperCase()}</span>
              <span className="text-[11px] text-white/25 font-mono flex-shrink-0">
                {currentIdx + 1}/{ALL_PAGES.length}
              </span>
            </div>

            {/* Prev / Next */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => prevPage && navigate(`/preview/${themeId}/${prevPage.id}`)}
                disabled={!prevPage}
                className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={() => nextPage && navigate(`/preview/${themeId}/${nextPage.id}`)}
                disabled={!nextPage}
                className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Device toggle */}
          <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
            {Object.entries(deviceIcons).map(([d, Icon]) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                title={d}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all capitalize"
                style={{
                  background: device === d ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: device === d ? '#fff' : 'rgba(148,163,184,0.6)',
                }}
              >
                <Icon size={13} />
                <span className="hidden md:inline">{d}</span>
              </button>
            ))}
          </div>

          {/* Dark / Light variant toggle for the UI page */}
          <button
            onClick={() => setDarkVariant(!darkVariant)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[12px] font-semibold transition-all"
            style={{
              background: darkVariant ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              borderColor: darkVariant ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.08)',
              color: darkVariant ? '#a5b4fc' : 'rgba(148,163,184,0.8)',
            }}
          >
            {darkVariant
              ? <><Sun size={13} /> <span className="hidden sm:inline">LIGHT</span></>
              : <><Moon size={13} /> <span className="hidden sm:inline">DARK</span></>
            }
          </button>

          {/* Theme indicator */}
          <div
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border label-mono text-[10px]"
            style={{
              background: `${theme.style.primary}10`,
              borderColor: `${theme.style.primary}25`,
              color: theme.style.primary,
            }}
          >
            <Layers size={11} />
            {theme.name.toUpperCase()}
          </div>
        </div>

        {/* ── PAGE CANVAS ──────────────────────────── */}
        <div
          className="flex-1 overflow-auto custom-scrollbar"
          style={{
            background: device !== 'desktop' ? '#0a0a1a' : 'transparent',
            padding: device !== 'desktop' ? '32px 24px' : 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <motion.div
            key={`${themeId}-${pageId}-${device}-${darkVariant}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: deviceWidths[device],
              maxWidth: '100%',
              background: themeStyle.bg,
              color: themeStyle.text,
              minHeight: device === 'desktop' ? '100%' : 700,
              borderRadius: device !== 'desktop' ? 24 : 0,
              overflow: 'hidden',
              boxShadow: device !== 'desktop'
                ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)'
                : 'none',
            }}
          >
            {renderPage(pageId, themeStyle, industryData, theme, navigate, themeId)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

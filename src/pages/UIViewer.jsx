import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../App.jsx';
import { THEMES } from '../themes/themes.js';
import { PAGE_CATEGORIES, ALL_PAGES } from './ui/registry.js';
import { renderPage } from './ui/pages.jsx';

export default function UIViewer() {
  const navigate = useNavigate();
  const { themeId, pageId = 'home' } = useParams();
  const { industryData, selectedTheme, setSelectedTheme } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [device, setDevice] = useState('desktop');
  const [darkVariant, setDarkVariant] = useState(false);

  const theme = useMemo(() => THEMES.find(t => t.id === themeId) || selectedTheme, [themeId, selectedTheme]);
  const currentPage = ALL_PAGES.find(p => p.id === pageId) || ALL_PAGES[0];

  useEffect(() => {
    if (theme && theme !== selectedTheme) setSelectedTheme(theme);
  }, [theme]);

  // Apply dark variant for themes that have light/dark
  const themeStyle = useMemo(() => {
    if (!theme) return null;
    if (!darkVariant) return theme.style;
    // Create a dark variant of light themes
    const isAlreadyDark = ['dark-corporate', 'glassmorphism'].includes(theme.id);
    if (isAlreadyDark) return theme.style;
    // Convert light theme to dark variant
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

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#0a0a1a', color: '#f1f5f9',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 280 : 0,
        background: '#0f1729',
        borderRight: '1px solid rgba(148,163,184,0.1)',
        overflowY: 'auto', overflowX: 'hidden',
        transition: 'width 0.3s',
        position: 'sticky', top: 0, height: '100vh',
        flexShrink: 0,
      }}>
        <div style={{ padding: '20px', minWidth: 280 }}>
          <button onClick={() => navigate('/themes')} style={{
            background: 'transparent', border: '1px solid rgba(148,163,184,0.2)',
            color: '#94a3b8', padding: '8px 14px', borderRadius: 8,
            cursor: 'pointer', fontSize: 13, marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>← Themes</button>

          <div style={{ marginBottom: 20, padding: 14,
            background: 'rgba(99,102,241,0.1)', borderRadius: 12,
            border: '1px solid rgba(99,102,241,0.2)',
          }}>
            <div style={{ fontSize: 11, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Active Theme</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{theme.name}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>for {industryData.brandName}</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, padding: '0 4px' }}>
              Switch Theme
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
              {THEMES.map(t => (
                <button key={t.id}
                  onClick={() => navigate(`/preview/${t.id}/${pageId}`)}
                  title={t.name}
                  style={{
                    width: '100%', height: 36, borderRadius: 8,
                    border: t.id === theme.id ? '2px solid #fff' : '2px solid transparent',
                    background: t.style.gradient || t.style.primary,
                    cursor: 'pointer',
                  }} />
              ))}
            </div>
          </div>

          {PAGE_CATEGORIES.map(cat => (
            <div key={cat.name} style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 11, color: '#64748b', textTransform: 'uppercase',
                letterSpacing: 1, marginBottom: 6, padding: '0 4px',
              }}>{cat.name}</div>
              {cat.pages.map(page => {
                const active = page.id === pageId;
                return (
                  <button key={page.id}
                    onClick={() => navigate(`/preview/${themeId}/${page.id}`)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '8px 12px', marginBottom: 2,
                      borderRadius: 8, border: 'none',
                      background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                      color: active ? '#a5b4fc' : '#94a3b8',
                      cursor: 'pointer', fontSize: 13,
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontWeight: active ? 600 : 400,
                    }}
                    onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ fontSize: 14 }}>{page.icon}</span>
                    {page.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top toolbar */}
        <div style={{
          padding: '12px 20px',
          background: '#0f1729',
          borderBottom: '1px solid rgba(148,163,184,0.1)',
          display: 'flex', alignItems: 'center', gap: 12,
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'transparent', border: '1px solid rgba(148,163,184,0.2)',
            color: '#94a3b8', width: 36, height: 36, borderRadius: 8,
            cursor: 'pointer', fontSize: 14,
          }}>☰</button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{currentPage.icon}</span>
              {currentPage.label}
              <span style={{ fontSize: 12, color: '#64748b', fontWeight: 400 }}>
                · {ALL_PAGES.findIndex(p => p.id === pageId) + 1} / {ALL_PAGES.length}
              </span>
            </div>
          </div>

          {/* Device toggle */}
          <div style={{ display: 'flex', background: '#1e293b', borderRadius: 8, padding: 3 }}>
            {[['desktop','🖥️'],['tablet','📱'],['mobile','📱']].map(([d, icon]) => (
              <button key={d} onClick={() => setDevice(d)} style={{
                padding: '6px 12px', borderRadius: 6, border: 'none',
                background: device === d ? '#334155' : 'transparent',
                color: device === d ? '#fff' : '#94a3b8',
                cursor: 'pointer', fontSize: 12, fontWeight: 500,
              }}>{d}</button>
            ))}
          </div>

          <button onClick={() => setDarkVariant(!darkVariant)} style={{
            background: darkVariant ? '#334155' : 'transparent',
            border: '1px solid rgba(148,163,184,0.2)',
            color: '#f1f5f9', padding: '6px 14px', borderRadius: 8,
            cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
          }}>{darkVariant ? '☀️ Light' : '🌙 Dark'}</button>
        </div>

        {/* Page area */}
        <div style={{
          flex: 1,
          background: device !== 'desktop' ? '#1a1a2e' : 'transparent',
          padding: device !== 'desktop' ? 24 : 0,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
        }}>
          <div style={{
            width: deviceWidths[device],
            maxWidth: '100%',
            background: themeStyle.bg,
            color: themeStyle.text,
            minHeight: device === 'desktop' ? 'calc(100vh - 60px)' : '600px',
            borderRadius: device !== 'desktop' ? 16 : 0,
            overflow: 'hidden',
            boxShadow: device !== 'desktop' ? '0 24px 80px rgba(0,0,0,0.5)' : 'none',
            transition: 'all 0.3s',
          }}>
            {renderPage(pageId, themeStyle, industryData, theme, navigate, themeId)}
          </div>
        </div>
      </main>
    </div>
  );
}

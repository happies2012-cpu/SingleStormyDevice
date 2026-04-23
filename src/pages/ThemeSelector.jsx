import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App.jsx';
import { THEMES } from '../themes/themes.js';

export default function ThemeSelector() {
  const navigate = useNavigate();
  const { industryData, setSelectedTheme } = useApp();
  const [hovered, setHovered] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('gen-dark') !== 'false');

  useEffect(() => { localStorage.setItem('gen-dark', darkMode); }, [darkMode]);

  const pickTheme = (theme) => {
    setSelectedTheme(theme);
    navigate(`/preview/${theme.id}/home`);
  };

  const bg = darkMode ? '#0a0a1a' : '#fafbff';
  const text = darkMode ? '#f8fafc' : '#0f172a';
  const textMuted = darkMode ? '#94a3b8' : '#64748b';
  const cardBg = darkMode ? 'rgba(30,41,59,0.5)' : '#ffffff';
  const border = darkMode ? 'rgba(148,163,184,0.15)' : '#e2e8f0';

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode 
        ? 'radial-gradient(ellipse at top, #1e1b4b 0%, #0a0a1a 50%, #000 100%)'
        : 'radial-gradient(ellipse at top, #eff6ff 0%, #fafbff 60%, #fff 100%)',
      color: text, fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <header style={{
        padding: '24px 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${border}`,
      }}>
        <button onClick={() => navigate('/')} style={{
          background: cardBg, border: `1px solid ${border}`,
          color: text, padding: '10px 18px', borderRadius: 100,
          cursor: 'pointer', fontSize: 14, fontWeight: 500,
        }}>← Back</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            fontSize: 36,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
          }}>{industryData.icon}</div>
          <div>
            <div style={{ fontSize: 11, color: textMuted, letterSpacing: 1, textTransform: 'uppercase' }}>Industry</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{industryData.label}</div>
          </div>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} style={{
          background: cardBg, border: `1px solid ${border}`,
          color: text, padding: '10px 18px', borderRadius: 100,
          cursor: 'pointer', fontSize: 14, fontWeight: 500,
        }}>{darkMode ? '☀️' : '🌙'}</button>
      </header>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 5% 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, marginBottom: 16,
            letterSpacing: '-0.02em',
          }}>
            Choose Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Design Theme</span>
          </h1>
          <p style={{ fontSize: 17, color: textMuted, maxWidth: 600, margin: '0 auto' }}>
            5 unique design models for <strong>{industryData.brandName}</strong>. Each theme includes 30 fully designed pages.
          </p>
        </div>

        <div style={{
          display: 'grid', gap: 28,
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        }}>
          {THEMES.map((theme, i) => (
            <button
              key={theme.id}
              onClick={() => pickTheme(theme)}
              onMouseEnter={() => setHovered(theme.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: cardBg, border: `1px solid ${hovered === theme.id ? theme.style.primary : border}`,
                borderRadius: 24, padding: 0,
                cursor: 'pointer', textAlign: 'left',
                color: text, overflow: 'hidden',
                transition: 'all 0.3s',
                transform: hovered === theme.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hovered === theme.id 
                  ? `0 24px 60px ${theme.style.primary}30`
                  : (darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)'),
              }}
            >
              {/* Preview */}
              <div style={{
                height: 180,
                background: theme.style.gradientHero || theme.style.gradient,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  padding: '6px 12px', borderRadius: 100,
                  background: theme.badgeColor, color: '#fff',
                  fontSize: 11, fontWeight: 700,
                }}>{theme.badge}</div>

                {/* Mock browser */}
                <div style={{
                  position: 'absolute', bottom: -10, left: 30, right: 30,
                  height: 120, borderRadius: '12px 12px 0 0',
                  background: theme.style.surface,
                  border: `1px solid ${theme.style.border}`,
                  boxShadow: '0 -8px 24px rgba(0,0,0,0.15)',
                  padding: 14,
                }}>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                  </div>
                  <div style={{ height: 8, width: '60%', background: theme.style.primary, borderRadius: 4, marginBottom: 8, opacity: 0.8 }} />
                  <div style={{ height: 6, width: '80%', background: theme.style.border, borderRadius: 3, marginBottom: 6 }} />
                  <div style={{ height: 6, width: '50%', background: theme.style.border, borderRadius: 3 }} />
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontWeight: 800, fontSize: 22 }}>{theme.name}</div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {theme.preview.map((c, j) => (
                      <div key={j} style={{
                        width: 18, height: 18, borderRadius: 6,
                        background: c, border: `1px solid ${border}`,
                      }} />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: textMuted, fontWeight: 500, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {theme.subtitle}
                </div>
                <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.6, marginBottom: 20 }}>
                  {theme.description}
                </p>
                <div style={{
                  padding: '12px 0', borderTop: `1px solid ${border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ fontSize: 13, color: textMuted }}>
                    📄 30 pages • 🎨 Fully styled
                  </div>
                  <div style={{
                    color: theme.style.primary, fontWeight: 700, fontSize: 14,
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    Preview →
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App.jsx';
import { INDUSTRIES, getIndustryData } from '../data/industries.js';

export default function GeneratorPage() {
  const navigate = useNavigate();
  const { setIndustryData } = useApp();
  const [input, setInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('gen-dark');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('gen-dark', darkMode);
  }, [darkMode]);

  const handleGenerate = async (industry) => {
    if (!industry.trim()) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    const data = getIndustryData(industry);
    setIndustryData(data);
    navigate('/themes');
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
      color: text,
      fontFamily: "'Inter', sans-serif",
      transition: 'background 0.3s, color 0.3s',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '10%', left: '10%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(219,39,119,0.1), transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
        }} />
      </div>

      {/* Header */}
      <header style={{
        position: 'relative', zIndex: 10,
        padding: '24px 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42, height: 42,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
          }}>✨</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>UI Sandbox</div>
            <div style={{ fontSize: 11, color: textMuted, letterSpacing: 1 }}>GENERATOR</div>
          </div>
        </div>

        <button onClick={() => setDarkMode(!darkMode)} style={{
          background: cardBg, border: `1px solid ${border}`,
          color: text, padding: '10px 18px', borderRadius: 100,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 14, fontWeight: 500,
        }}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* Hero */}
      <main style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1200, margin: '0 auto', padding: '60px 5% 80px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            display: 'inline-block', padding: '8px 18px', borderRadius: 100,
            background: darkMode ? 'rgba(99,102,241,0.15)' : '#eff6ff',
            color: darkMode ? '#a5b4fc' : '#3b82f6',
            fontSize: 13, fontWeight: 600, marginBottom: 24,
            border: `1px solid ${darkMode ? 'rgba(99,102,241,0.3)' : '#dbeafe'}`,
          }}>
            ⚡ AI-Powered UI/UX Generator
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1,
            marginBottom: 24, letterSpacing: '-0.03em',
          }}>
            Generate{' '}
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>complete UI/UX</span>
            <br />for any industry
          </h1>

          <p style={{
            fontSize: 18, color: textMuted, maxWidth: 640, margin: '0 auto 40px',
            lineHeight: 1.6,
          }}>
            Type your industry below. Get <strong>5 unique design themes</strong> with <strong>30 fully designed pages</strong> each. 
            Production-ready UI in seconds.
          </p>

          {/* Input */}
          <div style={{
            maxWidth: 640, margin: '0 auto',
            background: cardBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${border}`,
            borderRadius: 16, padding: 8,
            boxShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(99,102,241,0.15)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate(input)}
              placeholder="e.g., Healthcare, E-commerce, Fintech..."
              disabled={generating}
              style={{
                flex: 1, padding: '16px 20px', fontSize: 16,
                background: 'transparent', border: 'none', outline: 'none',
                color: text, fontFamily: 'inherit',
              }}
            />
            <button
              onClick={() => handleGenerate(input)}
              disabled={generating || !input.trim()}
              style={{
                padding: '14px 28px',
                background: input.trim() ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' : (darkMode ? '#1e293b' : '#e2e8f0'),
                color: input.trim() ? '#fff' : textMuted,
                border: 'none', borderRadius: 12,
                fontSize: 15, fontWeight: 600, cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: input.trim() ? '0 8px 24px rgba(99,102,241,0.4)' : 'none',
              }}
            >
              {generating ? (
                <>
                  <div style={{
                    width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Generating...
                </>
              ) : (
                <>Generate ✨</>
              )}
            </button>
          </div>

          <div style={{ marginTop: 16, fontSize: 13, color: textMuted }}>
            Press Enter or click Generate. Try any industry name.
          </div>
        </div>

        {/* Industry suggestions */}
        <div style={{ marginTop: 80 }}>
          <div style={{
            textAlign: 'center', marginBottom: 32,
            fontSize: 13, fontWeight: 600, letterSpacing: 2,
            color: textMuted, textTransform: 'uppercase',
          }}>
            Or pick a popular industry
          </div>

          <div style={{
            display: 'grid', gap: 16,
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}>
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.id}
                onClick={() => handleGenerate(ind.label)}
                disabled={generating}
                style={{
                  background: cardBg,
                  border: `1px solid ${border}`,
                  borderRadius: 16, padding: 20,
                  cursor: generating ? 'wait' : 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  animationDelay: `${i * 50}ms`,
                  color: text,
                  position: 'relative', overflow: 'hidden',
                }}
                className="industry-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = ind.color;
                  e.currentTarget.style.boxShadow = `0 12px 32px ${ind.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${ind.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, marginBottom: 14,
                }}>{ind.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{ind.label}</div>
                <div style={{ fontSize: 13, color: textMuted }}>{ind.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{
          marginTop: 100,
          display: 'grid', gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}>
          {[
            { icon: '🎨', title: '5 Unique Themes', desc: 'Modern, Dark, Vibrant, Glass, Nature' },
            { icon: '📄', title: '30 Pages Each', desc: 'Landing, Dashboard, Auth, eCommerce & more' },
            { icon: '🌗', title: 'Light & Dark', desc: 'Each theme optimized for both modes' },
            { icon: '📱', title: 'Fully Responsive', desc: 'Mobile, tablet, desktop ready' },
          ].map((f, i) => (
            <div key={i} style={{
              padding: 24, borderRadius: 16,
              background: cardBg, border: `1px solid ${border}`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: textMuted }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center', padding: '40px 5%', color: textMuted, fontSize: 13,
        borderTop: `1px solid ${border}`, marginTop: 60,
      }}>
        Built with ❤️ — UI Sandbox Generator © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

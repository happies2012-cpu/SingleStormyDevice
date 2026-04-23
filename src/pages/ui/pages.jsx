import React, { useState } from 'react';
import { PAGE_CATEGORIES, ALL_PAGES } from './registry.js';

// =============== SHARED HELPERS ===============

const Btn = ({ t, variant = 'primary', children, style, ...rest }) => {
  const styles = {
    primary: { background: t.gradient || t.primary, color: '#fff', boxShadow: `0 4px 14px ${t.primary}40` },
    secondary: { background: t.surface, color: t.text, border: `1px solid ${t.border}` },
    ghost: { background: 'transparent', color: t.primary, border: `1px solid ${t.primary}` },
    outline: { background: 'transparent', color: t.text, border: `1px solid ${t.border}` },
  };
  return (
    <button style={{
      padding: '11px 22px', borderRadius: t.radiusSm, border: 'none',
      fontSize: 14, fontWeight: 600, cursor: 'pointer',
      fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8,
      ...styles[variant], ...style,
    }} {...rest}>{children}</button>
  );
};

const Card = ({ t, children, style, hover = false, onClick }) => (
  <div onClick={onClick} style={{
    background: t.isGlass ? 'rgba(255,255,255,0.08)' : t.surface,
    backdropFilter: t.isGlass ? 'blur(20px)' : 'none',
    border: `1px solid ${t.border}`, borderRadius: t.radius,
    padding: 24, boxShadow: t.shadow,
    transition: 'all 0.2s', cursor: hover || onClick ? 'pointer' : 'default',
    ...style,
  }}
  onMouseEnter={hover || onClick ? (e) => {
    e.currentTarget.style.transform = t.cardHover;
    e.currentTarget.style.boxShadow = t.shadowLg;
  } : undefined}
  onMouseLeave={hover || onClick ? (e) => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = t.shadow;
  } : undefined}
  >{children}</div>
);

const Input = ({ t, ...rest }) => (
  <input {...rest} style={{
    width: '100%', padding: '12px 16px', borderRadius: t.radiusSm,
    border: `1px solid ${t.border}`, background: t.surface,
    color: t.text, fontSize: 14, fontFamily: 'inherit', outline: 'none',
    ...rest.style,
  }} />
);

const Avatar = ({ t, name, size = 40, color }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color || t.gradient || t.primary,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: size * 0.4, fontWeight: 700, flexShrink: 0,
  }}>{name}</div>
);

const Badge = ({ t, children, color }) => (
  <span style={{
    padding: '3px 10px', borderRadius: 100,
    background: color ? color + '20' : t.primaryLight,
    color: color || t.primary, fontSize: 11, fontWeight: 600,
  }}>{children}</span>
);

// =============== NAVBAR ===============

const Navbar = ({ t, ind }) => {
  const [open, setOpen] = useState(false);
  const links = ['Home', 'About', 'Services', 'Pricing', 'Blog', 'Contact'];
  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: t.isGlass ? 'rgba(255,255,255,0.08)' : t.navBg,
        backdropFilter: t.isGlass ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${t.border}`,
        padding: '14px 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: t.radiusSm,
            background: t.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#fff', fontWeight: 800,
          }}>{ind.icon}</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: t.navText }}>{ind.brandName}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-links">
          {links.map(link => (
            <a key={link} style={{
              color: t.navText, opacity: 0.85, textDecoration: 'none',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
            }}>{link}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Btn t={t} variant="outline" style={{ padding: '8px 16px', fontSize: 13 }}>Sign In</Btn>
          <Btn t={t} style={{ padding: '8px 18px', fontSize: 13 }}>Get Started</Btn>
        </div>
      </nav>
    </>
  );
};

// =============== FOOTER ===============

const Footer = ({ t, ind }) => (
  <footer style={{
    background: t.isGlass ? 'rgba(0,0,0,0.2)' : t.surface2,
    borderTop: `1px solid ${t.border}`, padding: '60px 5% 30px', color: t.text,
  }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div style={{
        display: 'grid', gap: 40, marginBottom: 40,
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: t.radiusSm, background: t.gradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{ind.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{ind.brandName}</div>
          </div>
          <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
            {ind.tagline}. Building the future of {ind.label.toLowerCase()}.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {['🐦','📘','📸','💼'].map(i => (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: t.radiusSm,
                background: t.surface, border: `1px solid ${t.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>{i}</div>
            ))}
          </div>
        </div>
        {[
          { title: 'Product', items: ['Features', 'Pricing', 'Integrations', 'Roadmap'] },
          { title: 'Company', items: ['About', 'Careers', 'Press', 'Partners'] },
          { title: 'Resources', items: ['Blog', 'Help Center', 'Community', 'API Docs'] },
          { title: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Cookies'] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 14 }}>{col.title}</div>
            {col.items.map(item => (
              <div key={item} style={{ color: t.textMuted, fontSize: 13, marginBottom: 10, cursor: 'pointer' }}>{item}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        paddingTop: 24, borderTop: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        color: t.textMuted, fontSize: 13,
      }}>
        <div>© {new Date().getFullYear()} {ind.brandName}. All rights reserved.</div>
        <div>Made with ❤️ for {ind.label}</div>
      </div>
    </div>
  </footer>
);

// =============== APP SHELL (sidebar layout) ===============

const AppShell = ({ t, ind, active, children }) => {
  const items = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'reports', icon: '📋', label: 'Reports' },
    { id: 'team', icon: '👥', label: 'Team' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'billing', icon: '🧾', label: 'Billing' },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{
        width: 260, background: t.isGlass ? 'rgba(255,255,255,0.05)' : t.sidebarBg,
        backdropFilter: t.isGlass ? 'blur(20px)' : 'none',
        borderRight: `1px solid ${t.border}`, padding: '24px 16px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 24px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: t.radiusSm, background: t.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>{ind.icon}</div>
          <div style={{ fontWeight: 800, color: t.sidebarText, fontSize: 16 }}>{ind.brandName}</div>
        </div>
        {items.map(item => {
          const isActive = active === item.id;
          return (
            <div key={item.id} style={{
              padding: '11px 14px', marginBottom: 3, borderRadius: t.radiusSm, cursor: 'pointer',
              background: isActive ? t.sidebarActive : 'transparent',
              color: isActive ? t.sidebarActiveText : t.sidebarText,
              display: 'flex', alignItems: 'center', gap: 12,
              fontSize: 14, fontWeight: isActive ? 600 : 500,
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </div>
          );
        })}

        <div style={{
          marginTop: 24, padding: 16, borderRadius: t.radius,
          background: t.isGlass ? 'rgba(255,255,255,0.05)' : t.primaryLight,
          border: `1px solid ${t.border}`,
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: t.text, marginBottom: 4 }}>🚀 Upgrade Pro</div>
          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 12 }}>Unlock all features</div>
          <Btn t={t} style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: 12 }}>Upgrade</Btn>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <header style={{
          background: t.isGlass ? 'rgba(255,255,255,0.05)' : t.navBg,
          backdropFilter: t.isGlass ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${t.border}`,
          padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
            <div style={{ position: 'relative', maxWidth: 400, flex: 1 }}>
              <Input t={t} placeholder="🔍  Search..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <span style={{ fontSize: 18 }}>🔔</span>
              <div style={{ position: 'absolute', top: -2, right: -4, width: 16, height: 16, borderRadius: '50%',
                background: '#ef4444', color: '#fff', fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
            </div>
            <div style={{ fontSize: 18, cursor: 'pointer' }}>💬</div>
            <Avatar t={t} name="JD" size={36} />
          </div>
        </header>
        <div style={{ padding: 28 }}>{children}</div>
      </div>
    </div>
  );
};

// =============== PAGES ===============

const Page = {
  // 1. HOME / LANDING
  home: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{
        background: t.gradientHero, color: t.heroText,
        padding: '90px 5% 110px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <Badge t={t}>{ind.icon} {ind.label} Platform</Badge>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, margin: '24px auto 20px', maxWidth: 880, letterSpacing: '-0.02em' }}>
          {ind.tagline}
        </h1>
        <p style={{ fontSize: 19, opacity: 0.85, maxWidth: 640, margin: '0 auto 36px', lineHeight: 1.5 }}>
          {ind.description}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Btn t={t} style={{ padding: '14px 30px', fontSize: 15 }}>Start Free Trial →</Btn>
          <Btn t={t} variant="secondary" style={{ padding: '14px 30px', fontSize: 15 }}>▶ Watch Demo</Btn>
        </div>
        <div style={{ marginTop: 56, display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap', opacity: 0.7, fontSize: 13 }}>
          ⭐⭐⭐⭐⭐ Trusted by 50,000+ teams worldwide
        </div>
      </section>

      <section style={{ padding: '80px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <Badge t={t}>Features</Badge>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '16px 0', color: t.text }}>
              Everything you need
            </h2>
            <p style={{ color: t.textMuted, fontSize: 17, maxWidth: 540, margin: '0 auto' }}>
              Powerful features designed to help your business thrive
            </p>
          </div>
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {ind.features.map((f, i) => (
              <Card key={i} t={t} hover>
                <div style={{
                  width: 50, height: 50, borderRadius: t.radiusSm,
                  background: t.primaryLight, fontSize: 24,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: t.text }}>{f.title}</h3>
                <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 5%', background: t.surface2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', textAlign: 'center' }}>
          {ind.stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: t.primary, marginBottom: 6 }}>{s.value}</div>
              <div style={{ color: t.textMuted, fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 5%', background: t.bg }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 800, marginBottom: 20, color: t.text }}>
            Ready to get started?
          </h2>
          <p style={{ color: t.textMuted, fontSize: 17, marginBottom: 30 }}>
            Join thousands of {ind.label.toLowerCase()} businesses growing with {ind.brandName}.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn t={t} style={{ padding: '14px 30px', fontSize: 15 }}>Start Free Trial</Btn>
            <Btn t={t} variant="outline" style={{ padding: '14px 30px', fontSize: 15 }}>Talk to Sales</Btn>
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 2. ABOUT
  about: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '70px 5%', textAlign: 'center' }}>
        <Badge t={t}>About Us</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '20px 0 16px' }}>
          Building the future of {ind.label}
        </h1>
        <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 700, margin: '0 auto' }}>
          We're on a mission to transform how the world experiences {ind.label.toLowerCase()}.
        </p>
      </section>
      <section style={{ padding: '70px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: 50, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: 70, alignItems: 'center' }}>
            <div>
              <Badge t={t}>Our Story</Badge>
              <h2 style={{ fontSize: 32, fontWeight: 800, margin: '14px 0 18px', color: t.text }}>
                Started with a simple vision
              </h2>
              <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.7, marginBottom: 14 }}>
                Founded in 2018, {ind.brandName} began as a small team passionate about transforming the {ind.label.toLowerCase()} industry through technology.
              </p>
              <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.7 }}>
                Today, we serve over 50,000 customers across 45+ countries, helping them streamline operations and scale faster.
              </p>
            </div>
            <div style={{
              height: 320, borderRadius: t.radiusLg, background: t.gradient,
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120,
            }}>{ind.icon}</div>
          </div>

          <div style={{ marginBottom: 60 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 30, textAlign: 'center', color: t.text }}>Our Values</h2>
            <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {[
                { i: '🎯', t: 'Mission-driven', d: 'Every decision serves our customers and their success.' },
                { i: '🤝', t: 'Customer-first', d: 'We listen, learn, and build for our users.' },
                { i: '💡', t: 'Innovation', d: 'Pushing boundaries with cutting-edge technology.' },
                { i: '🌍', t: 'Global Impact', d: 'Making a positive difference worldwide.' },
              ].map((v, i) => (
                <Card key={i} t={t}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{v.i}</div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: t.text }}>{v.t}</div>
                  <div style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.6 }}>{v.d}</div>
                </Card>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', textAlign: 'center' }}>
            {ind.stats.map((s, i) => (
              <Card key={i} t={t}>
                <div style={{ fontSize: 36, fontWeight: 800, color: t.primary, marginBottom: 4 }}>{s.value}</div>
                <div style={{ color: t.textMuted, fontSize: 13 }}>{s.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 3. SERVICES
  services: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '70px 5%', textAlign: 'center' }}>
        <Badge t={t}>What We Offer</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '20px 0 14px' }}>Our Services</h1>
        <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 600, margin: '0 auto' }}>
          Comprehensive solutions tailored for {ind.label.toLowerCase()} businesses
        </p>
      </section>
      <section style={{ padding: '70px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {[
            { icon: '🚀', title: 'Strategy & Consulting', desc: 'Expert guidance to transform your business and unlock new opportunities.', tags: ['Strategy', 'Planning', 'Consulting'] },
            { icon: '💻', title: 'Development & Engineering', desc: 'Custom software solutions built with cutting-edge technologies.', tags: ['Web', 'Mobile', 'Cloud'] },
            { icon: '🎨', title: 'Design & UX', desc: 'Beautiful, user-centered designs that engage and convert visitors.', tags: ['UI', 'UX', 'Branding'] },
            { icon: '📊', title: 'Analytics & Insights', desc: 'Data-driven insights to help you make smarter business decisions.', tags: ['Analytics', 'BI', 'Reports'] },
            { icon: '🔒', title: 'Security & Compliance', desc: 'Enterprise-grade security to protect your data and ensure compliance.', tags: ['Security', 'GDPR', 'SOC2'] },
            { icon: '🤝', title: 'Support & Training', desc: '24/7 dedicated support and comprehensive training for your team.', tags: ['Support', 'Training', 'Docs'] },
          ].map((s, i) => (
            <Card key={i} t={t} hover>
              <div style={{
                width: 60, height: 60, borderRadius: t.radius, background: t.primaryLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 18,
              }}>{s.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: t.text }}>{s.title}</h3>
              <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {s.tags.map(tag => <Badge key={tag} t={t}>{tag}</Badge>)}
              </div>
              <div style={{ color: t.primary, fontWeight: 600, fontSize: 14 }}>Learn more →</div>
            </Card>
          ))}
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 4. PRICING
  pricing: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '70px 5%', textAlign: 'center' }}>
        <Badge t={t}>Pricing</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '20px 0 14px' }}>Simple, transparent pricing</h1>
        <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 600, margin: '0 auto' }}>
          Choose the plan that fits your needs. Cancel anytime.
        </p>
      </section>
      <section style={{ padding: '70px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {ind.plans.map((p, i) => (
            <Card key={i} t={t} style={{
              border: p.highlighted ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
              transform: p.highlighted ? 'scale(1.03)' : 'none',
              position: 'relative',
              boxShadow: p.highlighted ? t.shadowLg : t.shadow,
            }}>
              {p.highlighted && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: t.gradient, color: '#fff', padding: '4px 14px', borderRadius: 100,
                  fontSize: 11, fontWeight: 700,
                }}>MOST POPULAR</div>
              )}
              <div style={{ fontSize: 14, fontWeight: 600, color: t.textMuted, marginBottom: 10 }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 44, fontWeight: 800, color: t.text }}>{p.price}</span>
                <span style={{ color: t.textMuted, fontSize: 14 }}>{p.period}</span>
              </div>
              <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 22 }}>Billed monthly. Cancel anytime.</p>
              <Btn t={t} variant={p.highlighted ? 'primary' : 'secondary'} style={{ width: '100%', justifyContent: 'center', marginBottom: 22 }}>
                Get Started
              </Btn>
              <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 18 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 11, fontSize: 14, color: t.text }}>
                    <span style={{ color: t.success, fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div style={{ marginTop: 60, textAlign: 'center', color: t.textMuted, fontSize: 14 }}>
          Need a custom solution? <span style={{ color: t.primary, fontWeight: 600, cursor: 'pointer' }}>Contact sales →</span>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 5. TESTIMONIALS
  testimonials: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '70px 5%', textAlign: 'center' }}>
        <Badge t={t}>Testimonials</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '20px 0 14px' }}>Loved by thousands</h1>
        <p style={{ fontSize: 17, opacity: 0.85 }}>See what our customers are saying</p>
      </section>
      <section style={{ padding: '70px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {[...ind.testimonials, ...ind.testimonials.map(x => ({ ...x, name: x.name + ' Jr.' }))].slice(0, 6).map((tst, i) => (
            <Card key={i} t={t}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {Array(tst.rating).fill('⭐').map((s, j) => <span key={j}>{s}</span>)}
              </div>
              <p style={{ color: t.text, fontSize: 15, lineHeight: 1.6, marginBottom: 20, fontStyle: 'italic' }}>
                "{tst.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: `1px solid ${t.border}` }}>
                <Avatar t={t} name={tst.avatar} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: t.text }}>{tst.name}</div>
                  <div style={{ fontSize: 12, color: t.textMuted }}>{tst.role} · {tst.company}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 6. PARTNERS
  partners: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '70px 5%', textAlign: 'center' }}>
        <Badge t={t}>Partners</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '20px 0 14px' }}>Our Trusted Partners</h1>
        <p style={{ fontSize: 17, opacity: 0.85 }}>We work with the best companies in the {ind.label.toLowerCase()} industry</p>
      </section>
      <section style={{ padding: '70px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: 60 }}>
            {['Acme Inc', 'Globex', 'Initech', 'Hooli', 'Vandelay', 'Massive Dynamic', 'Soylent Corp', 'Stark Industries', 'Wayne Enterprises', 'Cyberdyne', 'Tyrell Corp', 'Weyland-Yutani'].map((c, i) => (
              <Card key={i} t={t} hover style={{ textAlign: 'center', padding: 30 }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: t.text }}>{c}</div>
              </Card>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: 50, borderRadius: t.radiusLg,
            background: t.primaryLight, border: `1px solid ${t.border}` }}>
            <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12, color: t.text }}>Become a Partner</h3>
            <p style={{ color: t.textMuted, fontSize: 15, marginBottom: 20, maxWidth: 540, margin: '0 auto 20px' }}>
              Join our partner program and grow your business with us
            </p>
            <Btn t={t}>Apply Now →</Btn>
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 7. CASE STUDIES
  caseStudies: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '70px 5%', textAlign: 'center' }}>
        <Badge t={t}>Case Studies</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '20px 0 14px' }}>Success Stories</h1>
        <p style={{ fontSize: 17, opacity: 0.85 }}>Real results from real customers in {ind.label}</p>
      </section>
      <section style={{ padding: '70px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
          {[
            { co: 'Acme Corp', metric: '+340%', label: 'Revenue Growth', desc: 'How Acme tripled their revenue in 12 months using our platform.' },
            { co: 'TechFlow', metric: '85%', label: 'Time Saved', desc: 'TechFlow eliminated manual processes and saved 85% of operational time.' },
            { co: 'Globex Inc', metric: '5x', label: 'User Engagement', desc: 'Globex achieved 5x user engagement with our analytics tools.' },
            { co: 'Innovate Labs', metric: '$2.4M', label: 'Cost Savings', desc: 'Innovate Labs saved $2.4M annually after switching to {ind.brandName}.' },
          ].map((c, i) => (
            <Card key={i} t={t} hover>
              <div style={{ height: 180, background: t.gradient, borderRadius: t.radiusSm, marginBottom: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 28 }}>
                {c.co}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: t.primary }}>{c.metric}</span>
                <span style={{ color: t.textMuted, fontSize: 13 }}>{c.label}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: t.text }}>{c.co} Success Story</h3>
              <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
              <div style={{ color: t.primary, fontWeight: 600, fontSize: 14 }}>Read case study →</div>
            </Card>
          ))}
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 8. CONTACT
  contact: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '60px 5%', textAlign: 'center' }}>
        <Badge t={t}>Get in Touch</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, margin: '16px 0 12px' }}>Contact Us</h1>
        <p style={{ fontSize: 17, opacity: 0.85 }}>We'd love to hear from you</p>
      </section>
      <section style={{ padding: '70px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 30,
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)' }}>
          <div>
            {[
              { i: '📍', t: 'Visit Us', d: '123 Business Ave\nSan Francisco, CA 94103' },
              { i: '📞', t: 'Call Us', d: '+1 (555) 123-4567\nMon-Fri 9am-6pm PST' },
              { i: '📧', t: 'Email Us', d: `hello@${ind.brandName.toLowerCase().replace(/\s/g, '')}.com\nsupport@${ind.brandName.toLowerCase().replace(/\s/g, '')}.com` },
              { i: '💬', t: 'Live Chat', d: 'Available 24/7\nAverage response: 2 min' },
            ].map((c, i) => (
              <Card key={i} t={t} style={{ marginBottom: 14, padding: 20 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 24 }}>{c.i}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: t.text }}>{c.t}</div>
                    <div style={{ color: t.textMuted, fontSize: 13, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{c.d}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card t={t} style={{ padding: 30 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: t.text }}>Send us a message</h3>
            <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 22 }}>We'll get back to you within 24 hours</p>
            <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1fr 1fr', marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>First Name</label>
                <Input t={t} placeholder="John" />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Last Name</label>
                <Input t={t} placeholder="Doe" />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Email</label>
              <Input t={t} type="email" placeholder="you@example.com" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Subject</label>
              <Input t={t} placeholder="How can we help?" />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Message</label>
              <textarea rows={5} placeholder="Tell us more..." style={{
                width: '100%', padding: '12px 16px', borderRadius: t.radiusSm,
                border: `1px solid ${t.border}`, background: t.surface,
                color: t.text, fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical',
              }} />
            </div>
            <Btn t={t} style={{ width: '100%', justifyContent: 'center', padding: 14 }}>Send Message →</Btn>
          </Card>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 9. BLOG
  blog: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '60px 5%', textAlign: 'center' }}>
        <Badge t={t}>Blog</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, margin: '16px 0 12px' }}>Latest Insights</h1>
        <p style={{ fontSize: 17, opacity: 0.85 }}>News, tutorials, and stories from our team</p>
      </section>
      <section style={{ padding: '50px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 30, flexWrap: 'wrap' }}>
            {['All', 'Trends', 'Growth', 'Technology', 'Tutorial', 'Case Study', 'News'].map((c, i) => (
              <button key={c} style={{
                padding: '8px 16px', borderRadius: 100, border: `1px solid ${t.border}`,
                background: i === 0 ? t.primary : 'transparent', color: i === 0 ? '#fff' : t.text,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>

          {/* Featured */}
          <Card t={t} hover style={{ padding: 0, marginBottom: 30, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div style={{ minHeight: 280, background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100 }}>
                {ind.icon}
              </div>
              <div style={{ padding: 30 }}>
                <Badge t={t}>Featured · {ind.blogPosts[0].category}</Badge>
                <h2 style={{ fontSize: 26, fontWeight: 800, margin: '14px 0', color: t.text, lineHeight: 1.3 }}>
                  {ind.blogPosts[0].title}
                </h2>
                <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                  Discover the latest trends shaping the {ind.label.toLowerCase()} industry and learn how to stay ahead.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar t={t} name="AM" size={36} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{ind.blogPosts[0].author}</div>
                    <div style={{ fontSize: 12, color: t.textMuted }}>{ind.blogPosts[0].date} · {ind.blogPosts[0].readTime} read</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Grid */}
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {ind.blogPosts.slice(1).map((post, i) => (
              <Card key={i} t={t} hover style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 160, background: i % 2 === 0 ? t.gradient : t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50 }}>
                  {ind.icon}
                </div>
                <div style={{ padding: 22 }}>
                  <Badge t={t}>{post.category}</Badge>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: '12px 0 10px', color: t.text, lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <div style={{ fontSize: 12, color: t.textMuted }}>
                    {post.date} · {post.readTime} read
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 10. BLOG DETAIL
  blogDetail: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <article style={{ background: t.bg, padding: '50px 5%' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Badge t={t}>{ind.blogPosts[0].category}</Badge>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '16px 0 18px',
            color: t.text, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {ind.blogPosts[0].title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 30,
            paddingBottom: 20, borderBottom: `1px solid ${t.border}` }}>
            <Avatar t={t} name="AM" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: t.text }}>{ind.blogPosts[0].author}</div>
              <div style={{ fontSize: 13, color: t.textMuted }}>
                {ind.blogPosts[0].date} · {ind.blogPosts[0].readTime} read
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['🔗','🐦','📘'].map(i => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: t.radiusSm,
                  background: t.surface, border: `1px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}>{i}</div>
              ))}
            </div>
          </div>

          <div style={{ height: 360, background: t.gradient, borderRadius: t.radius, marginBottom: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120 }}>{ind.icon}</div>

          <div style={{ color: t.text, fontSize: 17, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20, fontSize: 19, fontWeight: 500, color: t.text }}>
              The {ind.label.toLowerCase()} industry is undergoing a massive transformation. New technologies, changing customer expectations, and global market shifts are reshaping how businesses operate.
            </p>
            <p style={{ marginBottom: 20, color: t.textMuted }}>
              In this comprehensive guide, we'll explore the top 10 trends shaping {ind.label.toLowerCase()} in 2024, with practical insights you can apply to your business right away.
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: '36px 0 16px', color: t.text }}>1. AI-Powered Automation</h2>
            <p style={{ marginBottom: 20, color: t.textMuted }}>
              Artificial intelligence is no longer a buzzword. Companies in {ind.label.toLowerCase()} are using AI to automate routine tasks, predict customer behavior, and personalize experiences at scale.
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: '36px 0 16px', color: t.text }}>2. Customer-Centric Design</h2>
            <p style={{ marginBottom: 20, color: t.textMuted }}>
              The modern customer expects seamless, personalized experiences. Forward-thinking {ind.label.toLowerCase()} companies are investing heavily in design and UX research.
            </p>
            <blockquote style={{
              borderLeft: `4px solid ${t.primary}`, padding: '16px 24px', margin: '30px 0',
              background: t.primaryLight, borderRadius: t.radiusSm, color: t.text,
              fontStyle: 'italic', fontSize: 18,
            }}>
              "The future of {ind.label.toLowerCase()} belongs to companies that put customers first and embrace innovation."
            </blockquote>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: '36px 0 16px', color: t.text }}>3. Data-Driven Decisions</h2>
            <p style={{ marginBottom: 20, color: t.textMuted }}>
              Data analytics has become the backbone of modern business. Companies that leverage data effectively outperform their competitors by 5x or more.
            </p>
          </div>

          <div style={{ marginTop: 50, padding: 30, borderRadius: t.radiusLg,
            background: t.primaryLight, border: `1px solid ${t.border}` }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: t.text }}>Subscribe to our newsletter</h3>
            <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 18 }}>Get the latest insights delivered to your inbox</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Input t={t} placeholder="your@email.com" style={{ flex: 1 }} />
              <Btn t={t}>Subscribe</Btn>
            </div>
          </div>
        </div>
      </article>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 11. PORTFOLIO
  portfolio: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '60px 5%', textAlign: 'center' }}>
        <Badge t={t}>Portfolio</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, margin: '16px 0 12px' }}>Our Work</h1>
        <p style={{ fontSize: 17, opacity: 0.85 }}>Showcasing our best {ind.label.toLowerCase()} projects</p>
      </section>
      <section style={{ padding: '50px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 30, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['All', 'Web Design', 'Mobile App', 'Branding', 'UX Research', 'E-commerce'].map((c, i) => (
              <button key={c} style={{
                padding: '8px 16px', borderRadius: 100, border: `1px solid ${t.border}`,
                background: i === 0 ? t.primary : 'transparent', color: i === 0 ? '#fff' : t.text,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} t={t} hover style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{
                  height: 240,
                  background: [t.gradient, t.primary, t.secondary, t.accent][i % 4],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 70, position: 'relative',
                }}>
                  {['🎨','📱','💻','🛍️','📊','🚀','✨','🎯','💡'][i]}
                </div>
                <div style={{ padding: 20 }}>
                  <Badge t={t}>{['Web Design', 'Mobile App', 'Branding'][i % 3]}</Badge>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: '12px 0 8px', color: t.text }}>
                    Project {i + 1} · {ind.label}
                  </h3>
                  <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.5 }}>
                    A stunning {ind.label.toLowerCase()} project showcasing modern design.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 12. FAQ
  faq: (t, ind) => {
    const items = [
      { q: `What is ${ind.brandName}?`, a: `${ind.brandName} is a comprehensive ${ind.label.toLowerCase()} platform built for modern businesses to manage everything in one place.` },
      { q: 'How do I get started?', a: 'Simply sign up for a free 14-day trial. No credit card required. You\'ll be up and running in minutes.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, PayPal, and bank transfers for annual plans.' },
      { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your subscription at any time. No questions asked, no cancellation fees.' },
      { q: 'Do you offer discounts for non-profits?', a: 'Absolutely. We offer 50% off for verified non-profits and educational institutions.' },
      { q: 'Is my data secure?', a: 'Yes. We use enterprise-grade encryption, are SOC2 certified, and GDPR compliant.' },
      { q: 'Do you have an API?', a: 'Yes, we offer a comprehensive REST API and webhooks for all paid plans.' },
      { q: 'How does customer support work?', a: 'We offer 24/7 email support for all plans, and priority chat support for Pro and Enterprise users.' },
    ];
    const [open, setOpen] = useState(0);
    return (
      <>
        <Navbar t={t} ind={ind} />
        <section style={{ background: t.gradientHero, color: t.heroText, padding: '60px 5%', textAlign: 'center' }}>
          <Badge t={t}>FAQ</Badge>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 800, margin: '16px 0 12px' }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: 17, opacity: 0.85 }}>Everything you need to know</p>
        </section>
        <section style={{ padding: '70px 5%', background: t.bg }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {items.map((item, i) => (
              <div key={i} onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  marginBottom: 12, borderRadius: t.radius,
                  background: t.surface, border: `1px solid ${t.border}`,
                  overflow: 'hidden', cursor: 'pointer',
                }}>
                <div style={{
                  padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontWeight: 600, fontSize: 16, color: t.text,
                }}>
                  {item.q}
                  <span style={{ fontSize: 20, color: t.primary, transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>+</span>
                </div>
                {open === i && (
                  <div style={{
                    padding: '0 24px 18px', color: t.textMuted, fontSize: 14, lineHeight: 1.7,
                    borderTop: `1px solid ${t.border}`, paddingTop: 16,
                  }}>{item.a}</div>
                )}
              </div>
            ))}
            <div style={{ marginTop: 40, textAlign: 'center', padding: 30, borderRadius: t.radius,
              background: t.primaryLight, border: `1px solid ${t.border}` }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, color: t.text }}>Still have questions?</h3>
              <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 18 }}>Our team is here to help</p>
              <Btn t={t}>Contact Support</Btn>
            </div>
          </div>
        </section>
        <Footer t={t} ind={ind} />
      </>
    );
  },

  // 13. PRODUCTS
  products: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ padding: '40px 5%', background: t.bg, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6, color: t.text }}>All Products</h1>
          <p style={{ color: t.textMuted, fontSize: 14 }}>Browse our complete {ind.label.toLowerCase()} catalog · 247 items</p>
        </div>
      </section>
      <section style={{ padding: '30px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gap: 30,
          gridTemplateColumns: '240px 1fr' }}>
          <aside>
            <Card t={t} style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: t.text }}>Categories</div>
              {['All Products', 'Featured', 'Best Sellers', 'New Arrivals', 'Sale'].map((c, i) => (
                <div key={c} style={{
                  padding: '8px 0', fontSize: 14, cursor: 'pointer',
                  color: i === 0 ? t.primary : t.textMuted, fontWeight: i === 0 ? 600 : 400,
                }}>{c}</div>
              ))}
            </Card>
            <Card t={t} style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: t.text }}>Price Range</div>
              <input type="range" min="0" max="500" style={{ width: '100%', accentColor: t.primary }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13, color: t.textMuted }}>
                <span>$0</span><span>$500</span>
              </div>
            </Card>
            <Card t={t} style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: t.text }}>Rating</div>
              {[5,4,3].map(s => (
                <div key={s} style={{ padding: '6px 0', fontSize: 14, cursor: 'pointer', color: t.textMuted }}>
                  {'⭐'.repeat(s)} & up
                </div>
              ))}
            </Card>
          </aside>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ color: t.textMuted, fontSize: 14 }}>Showing 1-12 of 247</div>
              <select style={{ padding: '8px 14px', borderRadius: t.radiusSm, border: `1px solid ${t.border}`,
                background: t.surface, color: t.text, fontSize: 13 }}>
                <option>Sort: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>

            <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
              {[...ind.products, ...ind.products].slice(0, 12).map((p, i) => (
                <Card key={i} t={t} hover style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{
                    height: 180, background: [t.gradient, t.primary, t.secondary][i % 3],
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60,
                    position: 'relative',
                  }}>
                    {ind.icon}
                    {p.badge && (
                      <div style={{
                        position: 'absolute', top: 10, left: 10,
                        padding: '3px 10px', borderRadius: 100, background: t.danger,
                        color: '#fff', fontSize: 11, fontWeight: 700,
                      }}>{p.badge}</div>
                    )}
                    <div style={{
                      position: 'absolute', top: 10, right: 10, width: 32, height: 32,
                      borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer',
                    }}>♡</div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 4 }}>{p.category}</div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: t.text }}>{p.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 12, color: t.textMuted }}>
                      ⭐ {p.rating} <span>({p.reviews})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{p.price}</span>
                      <Btn t={t} style={{ padding: '6px 12px', fontSize: 12 }}>Add +</Btn>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 40 }}>
              {['‹', '1', '2', '3', '4', '...', '21', '›'].map((p, i) => (
                <button key={i} style={{
                  width: 38, height: 38, borderRadius: t.radiusSm, border: `1px solid ${t.border}`,
                  background: p === '1' ? t.primary : t.surface, color: p === '1' ? '#fff' : t.text,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 14. PRODUCT DETAIL
  productDetail: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ padding: '30px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 24 }}>
            Home / Products / Featured / <span style={{ color: t.text }}>{ind.products[1].name}</span>
          </div>

          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginBottom: 60 }}>
            <div>
              <div style={{
                height: 460, borderRadius: t.radius, background: t.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 160, marginBottom: 14,
              }}>{ind.icon}</div>
              <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{
                    height: 90, borderRadius: t.radiusSm,
                    background: i === 1 ? t.primaryLight : t.surface2,
                    border: i === 1 ? `2px solid ${t.primary}` : `1px solid ${t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, cursor: 'pointer',
                  }}>{ind.icon}</div>
                ))}
              </div>
            </div>

            <div>
              <Badge t={t}>{ind.products[1].badge}</Badge>
              <h1 style={{ fontSize: 36, fontWeight: 800, margin: '14px 0 14px', color: t.text }}>
                {ind.products[1].name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: 14, color: t.textMuted }}>⭐ {ind.products[1].rating} ({ind.products[1].reviews} reviews)</span>
                <span style={{ color: t.success, fontSize: 14 }}>✓ In Stock</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: t.text }}>{ind.products[1].price}</span>
                <span style={{ fontSize: 18, color: t.textLight, textDecoration: 'line-through' }}>$199</span>
                <Badge t={t} color={t.success}>25% OFF</Badge>
              </div>

              <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                Premium {ind.products[1].name} designed for {ind.label.toLowerCase()} professionals. Features industry-leading capabilities with intuitive controls and elegant design.
              </p>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: t.text }}>Variant</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Standard', 'Pro', 'Premium'].map((v, i) => (
                    <button key={v} style={{
                      padding: '10px 18px', borderRadius: t.radiusSm,
                      border: `1px solid ${i === 0 ? t.primary : t.border}`,
                      background: i === 0 ? t.primaryLight : t.surface,
                      color: t.text, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    }}>{v}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: t.text }}>Quantity</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ display: 'flex', border: `1px solid ${t.border}`, borderRadius: t.radiusSm }}>
                    <button style={{ width: 38, height: 38, border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', fontSize: 16 }}>−</button>
                    <div style={{ width: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, color: t.text, fontWeight: 600 }}>1</div>
                    <button style={{ width: 38, height: 38, border: 'none', background: 'transparent', color: t.text, cursor: 'pointer', fontSize: 16 }}>+</button>
                  </div>
                  <div style={{ color: t.textMuted, fontSize: 13 }}>50+ available</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <Btn t={t} style={{ flex: 1, justifyContent: 'center', padding: 14 }}>🛒 Add to Cart</Btn>
                <Btn t={t} variant="secondary" style={{ padding: 14 }}>♡</Btn>
              </div>

              <div style={{ paddingTop: 20, borderTop: `1px solid ${t.border}` }}>
                {[
                  { i: '🚚', t: 'Free shipping on orders over $50' },
                  { i: '↩️', t: '30-day money-back guarantee' },
                  { i: '🔒', t: 'Secure payment & encryption' },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13, color: t.textMuted }}>
                    {f.i} {f.t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: 30, borderBottom: `1px solid ${t.border}`, marginBottom: 24 }}>
              {['Description', 'Specifications', 'Reviews (567)', 'Q&A'].map((tab, i) => (
                <div key={tab} style={{
                  padding: '14px 0', cursor: 'pointer',
                  color: i === 0 ? t.primary : t.textMuted, fontWeight: i === 0 ? 700 : 500,
                  borderBottom: i === 0 ? `2px solid ${t.primary}` : '2px solid transparent',
                  fontSize: 14,
                }}>{tab}</div>
              ))}
            </div>
            <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              The {ind.products[1].name} represents the pinnacle of {ind.label.toLowerCase()} innovation. Built with premium materials and engineered for performance, this product delivers exceptional value.
            </p>
            <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.8 }}>
              Whether you're a professional or enthusiast, our {ind.products[1].name} provides the perfect balance of features, performance, and reliability.
            </p>
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 15. CHECKOUT
  checkout: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ padding: '40px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: t.text }}>Checkout</h1>
          <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 30 }}>Complete your order in 3 easy steps</p>

          {/* Steps */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 40 }}>
            {['Cart', 'Shipping', 'Payment'].map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: i <= 1 ? t.primary : t.surface,
                    color: i <= 1 ? '#fff' : t.textMuted,
                    border: `2px solid ${i <= 1 ? t.primary : t.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14,
                  }}>{i + 1}</div>
                  <div style={{ fontWeight: i <= 1 ? 700 : 500, color: i <= 1 ? t.text : t.textMuted, fontSize: 14 }}>{s}</div>
                </div>
                {i < 2 && <div style={{ width: 60, height: 2, background: t.border }} />}
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: 'grid', gap: 30, gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)' }}>
            <div>
              <Card t={t} style={{ marginBottom: 18 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: t.text }}>Shipping Address</h3>
                <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1fr 1fr', marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>First Name</label>
                    <Input t={t} placeholder="John" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Last Name</label>
                    <Input t={t} placeholder="Doe" />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Address</label>
                  <Input t={t} placeholder="123 Main St" />
                </div>
                <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '2fr 1fr 1fr' }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>City</label>
                    <Input t={t} placeholder="San Francisco" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>State</label>
                    <Input t={t} placeholder="CA" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>ZIP</label>
                    <Input t={t} placeholder="94103" />
                  </div>
                </div>
              </Card>

              <Card t={t}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: t.text }}>Payment Method</h3>
                <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 18 }}>
                  {['💳 Card', '🅿️ PayPal', '🍎 Apple Pay'].map((m, i) => (
                    <button key={m} style={{
                      padding: 14, borderRadius: t.radiusSm,
                      border: `${i === 0 ? '2' : '1'}px solid ${i === 0 ? t.primary : t.border}`,
                      background: i === 0 ? t.primaryLight : t.surface,
                      color: t.text, cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    }}>{m}</button>
                  ))}
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Card Number</label>
                  <Input t={t} placeholder="1234 5678 9012 3456" />
                </div>
                <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Expiry</label>
                    <Input t={t} placeholder="MM / YY" />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>CVC</label>
                    <Input t={t} placeholder="123" />
                  </div>
                </div>
              </Card>
            </div>

            <Card t={t} style={{ height: 'fit-content', position: 'sticky', top: 80 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: t.text }}>Order Summary</h3>
              {ind.products.slice(0, 3).map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${t.border}` }}>
                  <div style={{ width: 48, height: 48, borderRadius: t.radiusSm, background: t.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{ind.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: t.textMuted }}>Qty: 1</div>
                  </div>
                  <div style={{ fontWeight: 700, color: t.text }}>{p.price}</div>
                </div>
              ))}
              <div style={{ marginTop: 14 }}>
                {[
                  ['Subtotal', '$697'],
                  ['Shipping', '$15'],
                  ['Tax', '$56'],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: t.textMuted }}>
                    <span>{l}</span><span>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}`, fontSize: 18, fontWeight: 800, color: t.text }}>
                  <span>Total</span><span>$768</span>
                </div>
              </div>
              <Btn t={t} style={{ width: '100%', justifyContent: 'center', padding: 14, marginTop: 18, fontSize: 15 }}>
                Place Order →
              </Btn>
              <div style={{ marginTop: 12, fontSize: 11, color: t.textMuted, textAlign: 'center' }}>
                🔒 Secured by 256-bit SSL encryption
              </div>
            </Card>
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 16. BILLING
  billing: (t, ind) => (
    <AppShell t={t} ind={ind} active="billing">
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, color: t.text }}>Billing & Invoices</h1>
      <p style={{ color: t.textMuted, marginBottom: 28, fontSize: 14 }}>Manage your subscription and view payment history</p>

      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 28 }}>
        {[
          { l: 'Current Plan', v: 'Professional', s: '$79/month', c: t.primary },
          { l: 'Next Billing', v: 'Apr 15', s: '$79.00', c: t.success },
          { l: 'Payment Method', v: '•••• 4242', s: 'Visa', c: t.info },
        ].map((s, i) => (
          <Card key={i} t={t}>
            <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 6 }}>{s.l}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 4 }}>{s.v}</div>
            <div style={{ fontSize: 13, color: s.c }}>{s.s}</div>
          </Card>
        ))}
      </div>

      <Card t={t}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: t.text }}>Recent Invoices</h3>
          <Btn t={t} variant="secondary" style={{ padding: '8px 16px', fontSize: 13 }}>Download All</Btn>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}` }}>
              {['Invoice', 'Date', 'Amount', 'Status', ''].map(h => (
                <th key={h} style={{ padding: '12px 8px', textAlign: 'left', color: t.textMuted, fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'INV-2024-0023', date: 'Mar 15, 2024', amt: '$79.00', status: 'Paid' },
              { id: 'INV-2024-0019', date: 'Feb 15, 2024', amt: '$79.00', status: 'Paid' },
              { id: 'INV-2024-0014', date: 'Jan 15, 2024', amt: '$79.00', status: 'Paid' },
              { id: 'INV-2023-0089', date: 'Dec 15, 2023', amt: '$79.00', status: 'Paid' },
              { id: 'INV-2023-0084', date: 'Nov 15, 2023', amt: '$79.00', status: 'Paid' },
            ].map((inv, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${t.borderLight}` }}>
                <td style={{ padding: '14px 8px', fontSize: 14, fontWeight: 600, color: t.text }}>{inv.id}</td>
                <td style={{ padding: '14px 8px', fontSize: 14, color: t.textMuted }}>{inv.date}</td>
                <td style={{ padding: '14px 8px', fontSize: 14, fontWeight: 600, color: t.text }}>{inv.amt}</td>
                <td style={{ padding: '14px 8px' }}>
                  <Badge t={t} color={t.success}>● {inv.status}</Badge>
                </td>
                <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                  <button style={{ padding: '6px 12px', borderRadius: t.radiusSm, border: `1px solid ${t.border}`,
                    background: t.surface, color: t.text, cursor: 'pointer', fontSize: 12 }}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  ),

  // 17. DASHBOARD
  dashboard: (t, ind) => (
    <AppShell t={t} ind={ind} active="dashboard">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: t.text }}>Welcome back, John 👋</h1>
          <p style={{ color: t.textMuted, fontSize: 14 }}>Here's what's happening with your {ind.label.toLowerCase()} business today.</p>
        </div>
        <Btn t={t}>+ New Project</Btn>
      </div>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 24 }}>
        {[
          { l: 'Total Revenue', v: '$48,329', c: '+12.5%', up: true, icon: '💰' },
          { l: 'Active Users', v: '12,847', c: '+8.2%', up: true, icon: '👥' },
          { l: 'New Orders', v: '342', c: '-3.1%', up: false, icon: '📦' },
          { l: 'Conversion Rate', v: '3.24%', c: '+0.5%', up: true, icon: '📈' },
        ].map((s, i) => (
          <Card key={i} t={t}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: t.radiusSm, background: t.primaryLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>{s.icon}</div>
              <Badge t={t} color={s.up ? t.success : t.danger}>{s.up ? '↑' : '↓'} {s.c}</Badge>
            </div>
            <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 4 }}>{s.l}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: t.text }}>{s.v}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', marginBottom: 24 }}>
        <Card t={t}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Revenue Overview</h3>
            <select style={{ padding: '6px 12px', borderRadius: t.radiusSm, border: `1px solid ${t.border}`,
              background: t.surface, color: t.text, fontSize: 12 }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div style={{ height: 240, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: '100%', height: `${h}%`,
                  background: i === 11 ? t.gradient : t.primaryLight,
                  borderRadius: '6px 6px 0 0',
                }} />
                <div style={{ fontSize: 10, color: t.textMuted }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card t={t}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, color: t.text }}>Top Sources</h3>
          {[
            { l: 'Direct', v: '45%', c: t.primary },
            { l: 'Social Media', v: '28%', c: t.secondary },
            { l: 'Email', v: '18%', c: t.accent },
            { l: 'Search', v: '9%', c: t.warning },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: t.text }}>
                <span>{s.l}</span><span style={{ fontWeight: 700 }}>{s.v}</span>
              </div>
              <div style={{ height: 8, background: t.borderLight, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: s.v, background: s.c, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <Card t={t}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Recent Activity</h3>
          <Btn t={t} variant="ghost" style={{ padding: '6px 14px', fontSize: 12 }}>View All</Btn>
        </div>
        {[
          { i: '✅', t: 'New order #ORD-2841 completed', s: '$249.00', time: '2 min ago' },
          { i: '👤', t: 'New user registered', s: 'sarah.j@example.com', time: '15 min ago' },
          { i: '💬', t: 'New message from customer', s: 'About product pricing', time: '1 hour ago' },
          { i: '📊', t: 'Monthly report generated', s: 'March 2024 - Available', time: '3 hours ago' },
          { i: '🎯', t: 'Campaign goal reached', s: 'Q1 sales target +120%', time: '5 hours ago' },
        ].map((a, i) => (
          <div key={i} style={{
            padding: '14px 0', display: 'flex', gap: 14, alignItems: 'center',
            borderBottom: i < 4 ? `1px solid ${t.borderLight}` : 'none',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: t.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>{a.i}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{a.t}</div>
              <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{a.s}</div>
            </div>
            <div style={{ fontSize: 12, color: t.textMuted }}>{a.time}</div>
          </div>
        ))}
      </Card>
    </AppShell>
  ),

  // 18. ANALYTICS
  analytics: (t, ind) => (
    <AppShell t={t} ind={ind} active="analytics">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: t.text }}>Analytics</h1>
          <p style={{ color: t.textMuted, fontSize: 14 }}>Real-time performance metrics</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn t={t} variant="secondary" style={{ padding: '10px 16px', fontSize: 13 }}>📅 Last 30 days</Btn>
          <Btn t={t} style={{ padding: '10px 16px', fontSize: 13 }}>↓ Export</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: 24 }}>
        {[
          { l: 'Page Views', v: '847.2K', c: '+24.3%' },
          { l: 'Unique Visitors', v: '142.8K', c: '+18.7%' },
          { l: 'Bounce Rate', v: '34.2%', c: '-5.1%' },
          { l: 'Avg. Session', v: '4m 32s', c: '+12.5%' },
          { l: 'Conversions', v: '1,847', c: '+31.2%' },
        ].map((s, i) => (
          <Card key={i} t={t}>
            <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 6 }}>{s.l}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 4 }}>{s.v}</div>
            <div style={{ fontSize: 12, color: t.success }}>{s.c}</div>
          </Card>
        ))}
      </div>

      <Card t={t} style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: t.text }}>Traffic Trends</h3>
        <div style={{ height: 280, position: 'relative', paddingLeft: 30 }}>
          <svg width="100%" height="100%" viewBox="0 0 600 280" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={t.primary} stopOpacity="0.3" />
                <stop offset="100%" stopColor={t.primary} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q60,150 120,160 T240,120 T360,140 T480,80 T600,100 L600,280 L0,280 Z" fill="url(#grad1)" />
            <path d="M0,200 Q60,150 120,160 T240,120 T360,140 T480,80 T600,100" stroke={t.primary} strokeWidth="3" fill="none" />
            {[0, 120, 240, 360, 480, 600].map((x, i) => (
              <circle key={i} cx={x} cy={[200, 160, 120, 140, 80, 100][i]} r="5" fill={t.surface} stroke={t.primary} strokeWidth="3" />
            ))}
          </svg>
        </div>
      </Card>

      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <Card t={t}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, color: t.text }}>Top Pages</h3>
          {[
            { p: '/home', v: '124K' }, { p: '/products', v: '89K' },
            { p: '/blog', v: '67K' }, { p: '/about', v: '45K' }, { p: '/pricing', v: '38K' }
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderBottom: i < 4 ? `1px solid ${t.borderLight}` : 'none', fontSize: 14 }}>
              <span style={{ color: t.text, fontWeight: 500 }}>{p.p}</span>
              <span style={{ color: t.primary, fontWeight: 700 }}>{p.v}</span>
            </div>
          ))}
        </Card>
        <Card t={t}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, color: t.text }}>Geo Distribution</h3>
          {[
            { c: '🇺🇸 United States', v: '42%' }, { c: '🇬🇧 United Kingdom', v: '18%' },
            { c: '🇩🇪 Germany', v: '12%' }, { c: '🇫🇷 France', v: '9%' }, { c: '🇯🇵 Japan', v: '7%' },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, color: t.text }}>
                <span>{p.c}</span><span style={{ fontWeight: 700 }}>{p.v}</span>
              </div>
              <div style={{ height: 6, background: t.borderLight, borderRadius: 3 }}>
                <div style={{ height: '100%', width: p.v, background: t.primary, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Card>
        <Card t={t}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18, color: t.text }}>Devices</h3>
          {[
            { i: '🖥️', d: 'Desktop', v: '52%' },
            { i: '📱', d: 'Mobile', v: '38%' },
            { i: '📲', d: 'Tablet', v: '10%' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < 2 ? `1px solid ${t.borderLight}` : 'none' }}>
              <div style={{ fontSize: 20 }}>{p.i}</div>
              <div style={{ flex: 1, fontSize: 14, color: t.text }}>{p.d}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.primary }}>{p.v}</div>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  ),

  // 19. REPORTS
  reports: (t, ind) => (
    <AppShell t={t} ind={ind} active="reports">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: t.text }}>Reports</h1>
          <p style={{ color: t.textMuted, fontSize: 14 }}>Generate and download detailed reports</p>
        </div>
        <Btn t={t}>+ Create Report</Btn>
      </div>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 24 }}>
        {[
          { i: '📊', t: 'Sales Report', d: 'Revenue analytics' },
          { i: '👥', t: 'User Report', d: 'User activity & growth' },
          { i: '📦', t: 'Inventory Report', d: 'Stock & products' },
          { i: '💰', t: 'Financial Report', d: 'P&L statements' },
        ].map((r, i) => (
          <Card key={i} t={t} hover>
            <div style={{
              width: 48, height: 48, borderRadius: t.radiusSm, background: t.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 14,
            }}>{r.i}</div>
            <div style={{ fontWeight: 700, marginBottom: 4, color: t.text }}>{r.t}</div>
            <div style={{ fontSize: 13, color: t.textMuted }}>{r.d}</div>
          </Card>
        ))}
      </div>

      <Card t={t}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: t.text }}>Generated Reports</h3>
          <Input t={t} placeholder="🔍 Search reports..." style={{ maxWidth: 240 }} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}` }}>
              {['Report Name', 'Type', 'Created', 'Size', 'Status', ''].map(h => (
                <th key={h} style={{ padding: '12px 8px', textAlign: 'left', color: t.textMuted, fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { n: 'Q1 2024 Sales Summary', type: 'Sales', date: 'Mar 31, 2024', size: '2.4 MB', status: 'Ready' },
              { n: 'Monthly User Growth', type: 'Users', date: 'Mar 28, 2024', size: '1.1 MB', status: 'Ready' },
              { n: 'Inventory Audit Q1', type: 'Inventory', date: 'Mar 25, 2024', size: '4.7 MB', status: 'Processing' },
              { n: 'Marketing Performance', type: 'Marketing', date: 'Mar 20, 2024', size: '892 KB', status: 'Ready' },
              { n: 'Customer Satisfaction', type: 'Survey', date: 'Mar 15, 2024', size: '1.8 MB', status: 'Ready' },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${t.borderLight}` }}>
                <td style={{ padding: '14px 8px', fontSize: 14, fontWeight: 600, color: t.text }}>📄 {r.n}</td>
                <td style={{ padding: '14px 8px', fontSize: 14, color: t.textMuted }}>{r.type}</td>
                <td style={{ padding: '14px 8px', fontSize: 14, color: t.textMuted }}>{r.date}</td>
                <td style={{ padding: '14px 8px', fontSize: 14, color: t.textMuted }}>{r.size}</td>
                <td style={{ padding: '14px 8px' }}>
                  <Badge t={t} color={r.status === 'Ready' ? t.success : t.warning}>● {r.status}</Badge>
                </td>
                <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                  <Btn t={t} variant="secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Download</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  ),

  // 20. NOTIFICATIONS
  notifications: (t, ind) => (
    <AppShell t={t} ind={ind} active="notifications">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: t.text }}>Notifications</h1>
          <p style={{ color: t.textMuted, fontSize: 14 }}>Stay up to date with your activity</p>
        </div>
        <Btn t={t} variant="secondary">Mark all as read</Btn>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['All (24)', 'Unread (8)', 'Mentions (3)', 'Updates'].map((tab, i) => (
          <button key={tab} style={{
            padding: '8px 16px', borderRadius: 100, border: `1px solid ${t.border}`,
            background: i === 0 ? t.primary : t.surface, color: i === 0 ? '#fff' : t.text,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{tab}</button>
        ))}
      </div>

      <Card t={t} style={{ padding: 0 }}>
        {[
          { i: '🎉', c: t.success, t: 'New milestone reached!', d: 'Your team has completed 100 projects. Congratulations!', time: '2 min ago', unread: true },
          { i: '👤', c: t.primary, t: 'New team member joined', d: 'Sarah Johnson has joined the Engineering team.', time: '1 hour ago', unread: true },
          { i: '💬', c: t.info, t: 'New comment on your post', d: 'Michael Chen commented: "Great work on the latest update!"', time: '3 hours ago', unread: true },
          { i: '📦', c: t.warning, t: 'Order #ORD-2841 shipped', d: 'Your order has been shipped and is on the way.', time: '5 hours ago', unread: false },
          { i: '🔔', c: t.danger, t: 'Subscription expires soon', d: 'Your Pro subscription expires in 7 days. Renew now to avoid interruption.', time: 'Yesterday', unread: false },
          { i: '📊', c: t.primary, t: 'Weekly report ready', d: 'Your performance report for last week is now available.', time: '2 days ago', unread: false },
          { i: '🎯', c: t.success, t: 'Goal achieved', d: 'You hit your monthly sales target! Excellent work.', time: '3 days ago', unread: false },
        ].map((n, i, arr) => (
          <div key={i} style={{
            padding: '18px 24px', display: 'flex', gap: 14, alignItems: 'flex-start',
            borderBottom: i < arr.length - 1 ? `1px solid ${t.borderLight}` : 'none',
            background: n.unread ? t.primaryLight + '30' : 'transparent',
            cursor: 'pointer',
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%', background: n.c + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
            }}>{n.i}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{n.t}</span>
                {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.primary }} />}
              </div>
              <div style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.5 }}>{n.d}</div>
            </div>
            <div style={{ fontSize: 12, color: t.textLight, whiteSpace: 'nowrap' }}>{n.time}</div>
          </div>
        ))}
      </Card>
    </AppShell>
  ),

  // 21. MESSAGES
  messages: (t, ind) => (
    <AppShell t={t} ind={ind} active="messages">
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, color: t.text }}>Messages</h1>
      <Card t={t} style={{ padding: 0, height: '70vh', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: 320, borderRight: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: 18, borderBottom: `1px solid ${t.border}` }}>
            <Input t={t} placeholder="🔍 Search conversations..." />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {[
              { n: 'Sarah Johnson', a: 'SJ', m: 'Sounds great! Let me check and get back to you.', time: '2m', unread: 2, online: true },
              { n: 'Michael Chen', a: 'MC', m: 'I just sent the proposal. Let me know what you think.', time: '15m', unread: 0, online: true },
              { n: 'Emily Rodriguez', a: 'ER', m: 'Thanks for the update!', time: '1h', unread: 0, online: false },
              { n: 'David Kim', a: 'DK', m: 'When can we schedule a call?', time: '3h', unread: 1, online: true },
              { n: 'Anna Martinez', a: 'AM', m: 'Perfect, see you tomorrow!', time: '5h', unread: 0, online: false },
              { n: 'Tom Wilson', a: 'TW', m: 'The project is going well.', time: 'Yesterday', unread: 0, online: false },
              { n: 'Lisa Brown', a: 'LB', m: 'Can you review my work?', time: '2d', unread: 0, online: false },
            ].map((c, i) => (
              <div key={i} style={{
                padding: 14, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer',
                borderBottom: `1px solid ${t.borderLight}`,
                background: i === 0 ? t.primaryLight : 'transparent',
              }}>
                <div style={{ position: 'relative' }}>
                  <Avatar t={t} name={c.a} />
                  {c.online && (
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12,
                      borderRadius: '50%', background: t.success, border: `2px solid ${t.surface}` }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: t.text }}>{c.n}</span>
                    <span style={{ fontSize: 11, color: t.textMuted }}>{c.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: t.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.m}</span>
                    {c.unread > 0 && (
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: t.primary,
                        color: '#fff', fontSize: 10, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {c.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ padding: 18, borderBottom: `1px solid ${t.border}`, display: 'flex',
            alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar t={t} name="SJ" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: t.text }}>Sarah Johnson</div>
                <div style={{ fontSize: 12, color: t.success }}>● Online</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['📞','📹','⋮'].map(i => <div key={i} style={{ width: 36, height: 36, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.textMuted }}>{i}</div>)}
            </div>
          </div>
          <div style={{ flex: 1, padding: 24, overflowY: 'auto', background: t.bg }}>
            {[
              { me: false, m: 'Hi! Just checking in on the project status.', t: '10:32 AM' },
              { me: true, m: 'Hey Sarah! Everything is on track. We finished the design phase yesterday.', t: '10:35 AM' },
              { me: false, m: 'That\'s amazing! Can you share the latest mockups?', t: '10:36 AM' },
              { me: true, m: 'Of course, sending them now. We have 5 different theme options ready for review.', t: '10:38 AM' },
              { me: false, m: 'Sounds great! Let me check and get back to you.', t: '10:40 AM' },
            ].map((msg, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: msg.me ? 'flex-end' : 'flex-start', marginBottom: 14,
              }}>
                <div style={{
                  maxWidth: '70%', padding: '11px 16px', borderRadius: t.radius,
                  background: msg.me ? t.primary : t.surface,
                  color: msg.me ? '#fff' : t.text,
                  border: msg.me ? 'none' : `1px solid ${t.border}`,
                  fontSize: 14,
                }}>
                  {msg.m}
                  <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4 }}>{msg.t}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: 16, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 10 }}>
            <Input t={t} placeholder="Type a message..." style={{ flex: 1 }} />
            <Btn t={t}>Send →</Btn>
          </div>
        </div>
      </Card>
    </AppShell>
  ),

  // 22. PROFILE
  profile: (t, ind) => (
    <AppShell t={t} ind={ind} active="profile">
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, color: t.text }}>My Profile</h1>
      <p style={{ color: t.textMuted, marginBottom: 28, fontSize: 14 }}>Manage your personal information</p>

      <Card t={t} style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ height: 160, background: t.gradient }} />
        <div style={{ padding: '0 28px 28px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginTop: -45, marginBottom: 18 }}>
            <Avatar t={t} name="JD" size={100} />
            <Btn t={t} variant="secondary">Edit Profile</Btn>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: t.text, marginBottom: 4 }}>John Doe</h2>
          <div style={{ color: t.textMuted, fontSize: 14, marginBottom: 16 }}>Senior Product Designer at {ind.brandName}</div>
          <div style={{ display: 'flex', gap: 20, fontSize: 13, color: t.textMuted, flexWrap: 'wrap' }}>
            <div>📍 San Francisco, CA</div>
            <div>📧 john@example.com</div>
            <div>🔗 johndoe.com</div>
            <div>📅 Joined Jan 2022</div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: 24 }}>
        {[
          { l: 'Total Projects', v: '47', i: '📊' },
          { l: 'Completed Tasks', v: '1,284', i: '✅' },
          { l: 'Team Members', v: '12', i: '👥' },
          { l: 'Profile Views', v: '8.4K', i: '👁️' },
        ].map((s, i) => (
          <Card key={i} t={t} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: t.radiusSm, background: t.primaryLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>{s.i}</div>
            <div>
              <div style={{ fontSize: 12, color: t.textMuted }}>{s.l}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>{s.v}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card t={t}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 18, color: t.text }}>Personal Information</h3>
        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {[
            { l: 'First Name', v: 'John' }, { l: 'Last Name', v: 'Doe' },
            { l: 'Email', v: 'john@example.com' }, { l: 'Phone', v: '+1 (555) 123-4567' },
            { l: 'Location', v: 'San Francisco, CA' }, { l: 'Time Zone', v: 'Pacific Time (PT)' },
          ].map((f, i) => (
            <div key={i}>
              <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: 'block', marginBottom: 6 }}>{f.l}</label>
              <Input t={t} defaultValue={f.v} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, display: 'block', marginBottom: 6 }}>Bio</label>
          <textarea rows={3} defaultValue={`Senior Product Designer with 8+ years of experience in ${ind.label.toLowerCase()}. Passionate about creating beautiful, user-centered designs.`} style={{
            width: '100%', padding: '12px 16px', borderRadius: t.radiusSm,
            border: `1px solid ${t.border}`, background: t.surface,
            color: t.text, fontSize: 14, fontFamily: 'inherit', outline: 'none', resize: 'vertical',
          }} />
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn t={t} variant="secondary">Cancel</Btn>
          <Btn t={t}>Save Changes</Btn>
        </div>
      </Card>
    </AppShell>
  ),

  // 23. SETTINGS
  settings: (t, ind) => (
    <AppShell t={t} ind={ind} active="settings">
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, color: t.text }}>Settings</h1>
      <p style={{ color: t.textMuted, marginBottom: 28, fontSize: 14 }}>Manage your account preferences and configuration</p>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '220px 1fr' }}>
        <Card t={t} style={{ padding: 12, height: 'fit-content' }}>
          {[
            { i: '👤', t: 'General', active: true },
            { i: '🔔', t: 'Notifications' },
            { i: '🔒', t: 'Security' },
            { i: '💳', t: 'Billing' },
            { i: '🔌', t: 'Integrations' },
            { i: '👥', t: 'Team' },
            { i: '🎨', t: 'Appearance' },
            { i: '🌐', t: 'Language' },
            { i: '⚙️', t: 'Advanced' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: t.radiusSm, marginBottom: 2,
              background: s.active ? t.primaryLight : 'transparent',
              color: s.active ? t.primary : t.text,
              fontSize: 14, fontWeight: s.active ? 600 : 500,
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            }}>{s.i} {s.t}</div>
          ))}
        </Card>

        <div>
          <Card t={t} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: t.text }}>General Settings</h3>
            <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 24 }}>Update your basic account information</p>
            <div style={{ display: 'grid', gap: 18 }}>
              {[
                { l: 'Workspace Name', v: ind.brandName },
                { l: 'Workspace URL', v: `${ind.brandName.toLowerCase().replace(/\s/g, '')}.com` },
                { l: 'Email', v: 'admin@example.com' },
                { l: 'Time Zone', v: 'Pacific Time (UTC-8)' },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>{f.l}</label>
                  <Input t={t} defaultValue={f.v} />
                </div>
              ))}
            </div>
          </Card>

          <Card t={t} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: t.text }}>Preferences</h3>
            <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 24 }}>Customize your experience</p>
            {[
              { l: 'Email notifications', d: 'Receive notifications via email', on: true },
              { l: 'Push notifications', d: 'Get push notifications on your device', on: true },
              { l: 'Marketing emails', d: 'Receive product updates and tips', on: false },
              { l: 'Two-factor authentication', d: 'Add extra security to your account', on: true },
            ].map((p, i, arr) => (
              <div key={i} style={{
                padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.borderLight}` : 'none',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: t.text, fontSize: 14, marginBottom: 2 }}>{p.l}</div>
                  <div style={{ color: t.textMuted, fontSize: 13 }}>{p.d}</div>
                </div>
                <div style={{
                  width: 44, height: 24, borderRadius: 12, position: 'relative', cursor: 'pointer',
                  background: p.on ? t.primary : t.border,
                }}>
                  <div style={{
                    position: 'absolute', top: 2, left: p.on ? 22 : 2, width: 20, height: 20, borderRadius: '50%',
                    background: '#fff', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }} />
                </div>
              </div>
            ))}
          </Card>

          <Card t={t} style={{ borderColor: t.danger + '40' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: t.danger }}>Danger Zone</h3>
            <p style={{ fontSize: 13, color: t.textMuted, marginBottom: 18 }}>Irreversible and destructive actions</p>
            <button style={{
              padding: '10px 18px', borderRadius: t.radiusSm,
              border: `1px solid ${t.danger}`, background: 'transparent', color: t.danger,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}>Delete Account</button>
          </Card>
        </div>
      </div>
    </AppShell>
  ),

  // 24. TEAM
  team: (t, ind) => (
    <AppShell t={t} ind={ind} active="team">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4, color: t.text }}>Team Members</h1>
          <p style={{ color: t.textMuted, fontSize: 14 }}>Manage your team and permissions · 12 members</p>
        </div>
        <Btn t={t}>+ Invite Member</Btn>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <Input t={t} placeholder="🔍 Search members..." style={{ maxWidth: 320, flex: 1 }} />
        <select style={{ padding: '11px 16px', borderRadius: t.radiusSm, border: `1px solid ${t.border}`,
          background: t.surface, color: t.text, fontSize: 14 }}>
          <option>All Departments</option><option>Engineering</option><option>Design</option>
        </select>
        <select style={{ padding: '11px 16px', borderRadius: t.radiusSm, border: `1px solid ${t.border}`,
          background: t.surface, color: t.text, fontSize: 14 }}>
          <option>All Roles</option><option>Admin</option><option>Member</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {[...ind.team, ...ind.team].slice(0, 12).map((m, i) => (
          <Card key={i} t={t} hover>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <Avatar t={t} name={m.avatar} size={50} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: t.text }}>{m.name}</div>
                <div style={{ fontSize: 12, color: t.textMuted }}>{m.role}</div>
              </div>
            </div>
            <Badge t={t}>{m.dept}</Badge>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${t.border}`, display: 'flex', gap: 8 }}>
              <Btn t={t} variant="secondary" style={{ flex: 1, justifyContent: 'center', padding: '7px', fontSize: 12 }}>Message</Btn>
              <Btn t={t} variant="ghost" style={{ padding: '7px 12px', fontSize: 12 }}>⋮</Btn>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  ),

  // 25. LOGIN
  login: (t, ind) => (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
      <div style={{
        background: t.gradientHero, color: t.heroText,
        padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: t.radiusSm, background: t.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{ind.icon}</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{ind.brandName}</div>
        </div>
        <div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Welcome back to {ind.brandName}
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.6, marginBottom: 30 }}>
            {ind.tagline}. Sign in to access your dashboard and continue where you left off.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex' }}>
              {['SJ','MC','ER','DK'].map((a, i) => (
                <div key={a} style={{
                  width: 36, height: 36, borderRadius: '50%', background: t.gradient,
                  border: `2px solid ${t.bgSolid || t.bg}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 12, fontWeight: 700,
                  marginLeft: i > 0 ? -10 : 0,
                }}>{a}</div>
              ))}
            </div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>Join 50,000+ users</div>
          </div>
        </div>
        <div style={{ fontSize: 13, opacity: 0.7 }}>© {new Date().getFullYear()} {ind.brandName}</div>
      </div>

      <div style={{ background: t.bg, padding: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: t.text }}>Sign in</h2>
          <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 28 }}>Enter your credentials to access your account</p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <Btn t={t} variant="secondary" style={{ flex: 1, justifyContent: 'center', padding: 11 }}>🔵 Google</Btn>
            <Btn t={t} variant="secondary" style={{ flex: 1, justifyContent: 'center', padding: 11 }}>🐙 GitHub</Btn>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: t.border }} />
            <span style={{ color: t.textMuted, fontSize: 12 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: t.border }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Email</label>
            <Input t={t} type="email" placeholder="you@example.com" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: t.text }}>Password</label>
              <a style={{ fontSize: 12, color: t.primary, fontWeight: 600 }}>Forgot?</a>
            </div>
            <Input t={t} type="password" placeholder="••••••••" />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, fontSize: 13, color: t.text, cursor: 'pointer' }}>
            <input type="checkbox" style={{ accentColor: t.primary }} />
            Remember me for 30 days
          </label>
          <Btn t={t} style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 14, marginBottom: 18 }}>
            Sign in →
          </Btn>
          <div style={{ textAlign: 'center', fontSize: 13, color: t.textMuted }}>
            Don't have an account? <span style={{ color: t.primary, fontWeight: 600, cursor: 'pointer' }}>Sign up</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // 26. SIGNUP
  signup: (t, ind) => (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: t.gradientHero, padding: 24 }}>
      <Card t={t} style={{ maxWidth: 460, width: '100%', padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: t.radius, background: t.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
            margin: '0 auto 14px',
          }}>{ind.icon}</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6, color: t.text }}>Create your account</h2>
          <p style={{ color: t.textMuted, fontSize: 13 }}>Get started with {ind.brandName} in 30 seconds</p>
        </div>

        <div style={{ display: 'grid', gap: 14, gridTemplateColumns: '1fr 1fr', marginBottom: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>First Name</label>
            <Input t={t} placeholder="John" />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Last Name</label>
            <Input t={t} placeholder="Doe" />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Work Email</label>
          <Input t={t} type="email" placeholder="you@company.com" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Password</label>
          <Input t={t} type="password" placeholder="At least 8 characters" />
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2,
                background: i <= 3 ? t.success : t.borderLight }} />
            ))}
          </div>
          <div style={{ fontSize: 11, color: t.success, marginTop: 4 }}>✓ Strong password</div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Industry</label>
          <select style={{ width: '100%', padding: '12px 16px', borderRadius: t.radiusSm,
            border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 14 }}>
            <option>{ind.label}</option>
          </select>
        </div>
        <label style={{ display: 'flex', gap: 8, marginBottom: 18, fontSize: 12, color: t.textMuted, cursor: 'pointer' }}>
          <input type="checkbox" style={{ accentColor: t.primary, marginTop: 2 }} />
          <span>I agree to the <span style={{ color: t.primary, fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: t.primary, fontWeight: 600 }}>Privacy Policy</span></span>
        </label>
        <Btn t={t} style={{ width: '100%', justifyContent: 'center', padding: 14, marginBottom: 18 }}>
          Create Account →
        </Btn>
        <div style={{ textAlign: 'center', fontSize: 13, color: t.textMuted }}>
          Already have an account? <span style={{ color: t.primary, fontWeight: 600, cursor: 'pointer' }}>Sign in</span>
        </div>
      </Card>
    </div>
  ),

  // 27. FORGOT PASSWORD
  forgot: (t, ind) => (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: t.gradientHero, padding: 24 }}>
      <Card t={t} style={{ maxWidth: 420, width: '100%', padding: 40 }}>
        <div style={{
          width: 64, height: 64, borderRadius: t.radius, background: t.primaryLight,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
          margin: '0 auto 18px',
        }}>🔐</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 8, color: t.text }}>
          Forgot password?
        </h2>
        <p style={{ color: t.textMuted, fontSize: 14, textAlign: 'center', marginBottom: 28 }}>
          No worries! Enter your email and we'll send you a link to reset your password.
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: t.text, display: 'block', marginBottom: 6 }}>Email Address</label>
          <Input t={t} type="email" placeholder="you@example.com" />
        </div>

        <Btn t={t} style={{ width: '100%', justifyContent: 'center', padding: 14, marginBottom: 18 }}>
          Send Reset Link →
        </Btn>

        <div style={{ textAlign: 'center', fontSize: 13, color: t.textMuted }}>
          Remember your password? <span style={{ color: t.primary, fontWeight: 600, cursor: 'pointer' }}>Sign in</span>
        </div>

        <div style={{ marginTop: 24, padding: 16, borderRadius: t.radiusSm, background: t.primaryLight, fontSize: 12, color: t.text, lineHeight: 1.5 }}>
          💡 <strong>Tip:</strong> Check your spam folder if you don't see the email within a few minutes.
        </div>
      </Card>
    </div>
  ),

  // 28. CAREERS
  careers: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ background: t.gradientHero, color: t.heroText, padding: '70px 5%', textAlign: 'center' }}>
        <Badge t={t}>Careers</Badge>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, margin: '20px 0 14px' }}>Join Our Team</h1>
        <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 600, margin: '0 auto 24px' }}>
          Help us build the future of {ind.label.toLowerCase()}. We're always looking for talented people.
        </p>
        <Btn t={t}>View Open Positions ↓</Btn>
      </section>

      <section style={{ padding: '60px 5%', background: t.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 14, color: t.text }}>Why work with us?</h2>
          </div>
          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 60 }}>
            {[
              { i: '💰', t: 'Competitive Salary', d: 'Top-of-market compensation + equity' },
              { i: '🏥', t: 'Health Benefits', d: 'Medical, dental & vision coverage' },
              { i: '🌴', t: 'Unlimited PTO', d: 'Take time off when you need it' },
              { i: '🏠', t: 'Remote First', d: 'Work from anywhere in the world' },
              { i: '📚', t: 'Learning Budget', d: '$2,000/year for courses & books' },
              { i: '🎯', t: 'Equity Package', d: 'Be an owner of the company' },
            ].map((p, i) => (
              <Card key={i} t={t}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.i}</div>
                <div style={{ fontWeight: 700, marginBottom: 6, color: t.text }}>{p.t}</div>
                <div style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.6 }}>{p.d}</div>
              </Card>
            ))}
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: t.text }}>Open Positions</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'].map((c, i) => (
              <button key={c} style={{
                padding: '8px 16px', borderRadius: 100, border: `1px solid ${t.border}`,
                background: i === 0 ? t.primary : t.surface, color: i === 0 ? '#fff' : t.text,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
          {[
            { t: 'Senior Frontend Engineer', dept: 'Engineering', loc: 'Remote · Worldwide', type: 'Full-time' },
            { t: 'Product Designer', dept: 'Design', loc: 'San Francisco / Remote', type: 'Full-time' },
            { t: 'Senior Product Manager', dept: 'Product', loc: 'New York / Remote', type: 'Full-time' },
            { t: 'Marketing Manager', dept: 'Marketing', loc: 'Remote · Americas', type: 'Full-time' },
            { t: 'Customer Success Lead', dept: 'Support', loc: 'Remote · Worldwide', type: 'Full-time' },
            { t: 'Backend Engineer', dept: 'Engineering', loc: 'Berlin / Remote', type: 'Full-time' },
          ].map((j, i) => (
            <Card key={i} t={t} hover style={{ marginBottom: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: t.text }}>{j.t}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 13, color: t.textMuted, flexWrap: 'wrap' }}>
                    <span>🏢 {j.dept}</span>
                    <span>📍 {j.loc}</span>
                    <span>💼 {j.type}</span>
                  </div>
                </div>
                <Btn t={t}>Apply →</Btn>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 29. JOB DETAIL
  jobDetail: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{ padding: '40px 5%', background: t.bg }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 20 }}>Careers / Engineering / <span style={{ color: t.text }}>Senior Frontend Engineer</span></div>

          <Card t={t} style={{ marginBottom: 24, padding: 30 }}>
            <Badge t={t}>Engineering</Badge>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: '14px 0 12px', color: t.text }}>Senior Frontend Engineer</h1>
            <div style={{ display: 'flex', gap: 18, fontSize: 14, color: t.textMuted, flexWrap: 'wrap', marginBottom: 24 }}>
              <span>📍 Remote · Worldwide</span>
              <span>💼 Full-time</span>
              <span>💰 $140k - $200k</span>
              <span>🏢 Engineering</span>
            </div>
            <Btn t={t} style={{ padding: '14px 30px' }}>Apply for this Position →</Btn>
          </Card>

          <Card t={t} style={{ padding: 30 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: t.text }}>About the Role</h2>
            <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              We're looking for a talented Senior Frontend Engineer to join our growing team. You'll be working on the {ind.brandName} platform, building delightful experiences for our customers in {ind.label.toLowerCase()}.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: t.text }}>What you'll do</h3>
            <ul style={{ paddingLeft: 20, color: t.textMuted, fontSize: 14, lineHeight: 1.9, marginBottom: 24 }}>
              <li>Build and maintain core features of our React-based platform</li>
              <li>Collaborate with designers to create beautiful, accessible UIs</li>
              <li>Optimize performance for our 50,000+ users worldwide</li>
              <li>Mentor junior engineers and contribute to architecture decisions</li>
              <li>Participate in code reviews and technical discussions</li>
            </ul>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: t.text }}>Requirements</h3>
            <ul style={{ paddingLeft: 20, color: t.textMuted, fontSize: 14, lineHeight: 1.9, marginBottom: 24 }}>
              <li>5+ years of React experience</li>
              <li>Strong TypeScript skills</li>
              <li>Experience with modern build tools (Vite, Webpack)</li>
              <li>Understanding of accessibility and performance</li>
              <li>Excellent communication skills</li>
            </ul>

            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: t.text }}>Benefits</h3>
            <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: 30 }}>
              {['Competitive salary + equity', 'Unlimited PTO', 'Health, dental, vision', 'Remote-first culture',
                '$2,000 learning budget', 'Home office stipend', '401(k) matching', 'Parental leave'].map(b => (
                <div key={b} style={{ display: 'flex', gap: 8, fontSize: 14, color: t.text }}>
                  <span style={{ color: t.success }}>✓</span> {b}
                </div>
              ))}
            </div>

            <Btn t={t} style={{ padding: '14px 30px' }}>Apply for this Position →</Btn>
          </Card>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),

  // 30. NOT FOUND
  notFound: (t, ind) => (
    <>
      <Navbar t={t} ind={ind} />
      <section style={{
        minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: t.bg, padding: '60px 5%', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 540 }}>
          <div style={{
            fontSize: 'clamp(100px, 18vw, 180px)', fontWeight: 900,
            background: t.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1, marginBottom: 8,
          }}>404</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, color: t.text }}>Page Not Found</h1>
          <p style={{ color: t.textMuted, fontSize: 16, lineHeight: 1.6, marginBottom: 30 }}>
            Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn t={t} style={{ padding: '14px 28px' }}>← Back to Home</Btn>
            <Btn t={t} variant="secondary" style={{ padding: '14px 28px' }}>📧 Contact Support</Btn>
          </div>

          <div style={{ marginTop: 50 }}>
            <div style={{ fontSize: 13, color: t.textMuted, marginBottom: 14 }}>Or check out these popular pages:</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Home', 'About', 'Services', 'Contact'].map(p => (
                <button key={p} style={{
                  padding: '6px 14px', borderRadius: t.radiusSm, border: `1px solid ${t.border}`,
                  background: t.surface, color: t.text, fontSize: 13, cursor: 'pointer',
                }}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer t={t} ind={ind} />
    </>
  ),
};

export const renderPage = (pageId, theme, industry) => {
  const page = Page[pageId] || Page.home;
  return page(theme, industry);
};

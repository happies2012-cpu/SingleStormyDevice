# UI Sandbox Generator

A complete React + Vite frontend application that generates production-quality UI/UX showcases for any industry. Type an industry name → get 5 unique design themes × 30 fully-designed pages each = **150 fully-styled page variations**.

## What It Does

1. **Generator (`/`)** — Enter an industry (Healthcare, E-commerce, SaaS, etc.) or pick from 10 presets. Light/dark mode toggle.
2. **Theme Selector (`/themes`)** — Pick from 5 unique design themes (Modern Light, Dark Corporate, Bold Vibrant, Glassmorphism, Nature Warm).
3. **UI Viewer (`/preview/:themeId/:pageId`)** — Browse 30 fully-designed pages with sidebar navigation, device toggle (desktop/tablet/mobile), and dark/light variant switcher.

## 30 Pages Per Theme

- **Marketing**: Home, About, Services, Pricing, Testimonials, Partners, Case Studies, Contact
- **Content**: Blog, Blog Detail, Portfolio, FAQ
- **Commerce**: Products, Product Detail, Checkout, Billing
- **Application**: Dashboard, Analytics, Reports, Notifications, Messages
- **User**: Profile, Settings, Team
- **Auth**: Login, Sign Up, Forgot Password
- **Other**: Careers, Job Detail, 404

## Tech Stack

- React 18 + Vite 5
- React Router 6
- No backend — pure frontend showcase
- Inter font, custom CSS, theme-driven styling

## Project Structure

```
src/
├── App.jsx                  # Router + AppContext
├── main.jsx                 # Entry
├── index.css                # Global styles + animations
├── data/industries.js       # 10 industries + content generator
├── themes/themes.js         # 5 design theme definitions
└── pages/
    ├── GeneratorPage.jsx    # Landing
    ├── ThemeSelector.jsx    # Theme picker
    ├── UIViewer.jsx         # Sidebar + page renderer
    └── ui/
        ├── registry.js      # Page categories/metadata
        └── pages.jsx        # All 30 page components
```

## Running

- Dev: `npm run dev` (port 5000, host 0.0.0.0) — configured as workflow "Start application"
- Build: `npm run build`
- Preview: `npm run preview`

## Notes

- Frontend-only application; no auth/database needed (it's a UI showcase generator)
- Each theme automatically computes a dark variant for light themes via the dark-mode toggle
- All pages are fully responsive (mobile/tablet/desktop)
- Routes are guarded — visiting `/themes` or `/preview/...` without industry data redirects to `/`

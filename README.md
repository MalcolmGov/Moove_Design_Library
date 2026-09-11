# Moove Digital Design Library

> A modern, white-labelable design library and dashboard system engineered for **Moove Digital's products** and **custom client engagements**.

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🌟 Highlights

- **10 Production-Ready Industry Dashboards**:
  1. **Business Overview**: Executive metrics, revenue spline, category donut, recent orders, top global markets.
  2. **Finance & Portfolio**: Dark hero card, goal progress circular gauge, asset allocation donut, stock/crypto watchlist with sparklines, recent transactions.
  3. **HR & People Ops**: Hiring conversion funnel, 92% attendance circular gauge, department breakdown donut, upcoming interviews, onboarding tracker.
  4. **CRM & Pipeline**: Sales pipeline stage bars, deal stages donut, customer acquisition spline, upcoming tasks, recent messages.
  5. **Healthcare & Hospital**: Patient visits spline, bed occupancy circular gauge, department wait times & satisfaction table, doctor schedule feed, recent admissions.
  6. **Project Management**: Project progress, sprint status card, tasks by status donut, team workload capacity bars, upcoming deadlines.
  7. **Real Estate Portfolio**: Rental revenue spline, expense breakdown donut, maintenance request tickets, property listing cards with image previews.
  8. **E-Commerce & Retail**: Sales trend spline, traffic sources donut, top products list with revenue and growth, customer segments, recent orders with status pills.
  9. **Education & LMS**: Learning progress spline, subject performance bars, upcoming classes schedule, instructor cards.
  10. **Marketing & Growth**: Campaign KPI cards, ad spend, multi-metric performance spline, traffic channels donut, channel comparison, ROI circular gauge, content calendar.

- **Dual Mode (Dark & Light)**: Complete dark mode design across every component, card, chart, and modal with instant one-click toggle.
- **White-Label Theming**: Dynamic CSS custom properties enable instant brand switching for clients (`Moove Signature`, `FinTech Emerald`, `HealthTech Sky`, `PropTech Amber`, `Marketing Violet`).
- **Data Visualization Engine**: High-performance SVG splines with gradient fills, hover tooltips, center-stat donuts, circular gauges, step-down funnels, and sparklines.
- **Accessible & Composable**: Headless, flexible UI primitives (Buttons, Badges, Stat Cards, Inputs, Avatars).

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/MalcolmGov/Moove_Design_Library.git
cd Moove_Design_Library
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to explore the interactive showcase, all 10 dashboards, and the component catalog.

### 3. Build for Production

```bash
pnpm build
```

---

## 🎨 White-Label Client Theming

Switching client themes or applying custom branding is achieved by setting the theme on the `ThemeProvider`:

```tsx
import { ThemeProvider, useTheme } from '@/lib/theme-context';

function App() {
  return (
    <ThemeProvider>
      <MyDashboardApp />
    </ThemeProvider>
  );
}

// In any child component:
function ThemeSelector() {
  const { setTheme, isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('fintech')}>FinTech Theme</button>
      <button onClick={() => setTheme('healthcare')}>Healthcare Theme</button>
      <button onClick={toggleDarkMode}>{isDarkMode ? 'Light' : 'Dark'}</button>
    </div>
  );
}
```

---

## 📁 Project Structure

```
Moove_Design_Library/
├── references/                 # 10 Reference Dashboard Inspiration Images
├── src/
│   ├── components/
│   │   ├── charts/             # AreaSplineChart, DonutChart, CircularGauge, FunnelChart, Sparkline
│   │   ├── dashboards/         # 10 Industry Dashboard Templates
│   │   ├── layout/             # Sidebar, Topbar, PageHeader, DashboardShell
│   │   ├── showcase/           # ComponentGallery, TokenGuide, ThemeDrawer
│   │   └── ui/                 # Button, Badge, Card, Input, Avatar, StatCard
│   ├── lib/
│   │   ├── theme-context.tsx   # White-label Theme Provider & Dark Mode
│   │   └── utils.ts            # Formatting helpers & cn utility
│   ├── types/                  # TypeScript interfaces & types
│   ├── App.tsx                 # Main Showcase Application
│   └── index.css               # Tailwind v4 & Design Tokens
├── package.json
└── vite.config.ts
```

---

## 📄 License

Proprietary — Created for **Moove Digital**. All rights reserved.

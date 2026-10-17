# TITAN OS — High-Performance Gym & Fitness SaaS Ecosystem

A full-featured, production-ready Gym & Fitness SaaS web application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Lucide React**, and **Recharts**.

---

## ⚡ Core Architecture & Highlights

### 1. Dual-Role Instant Switcher
- Persistent top navigation bar toggle between:
  - **Member Pro View**: High-performance athlete tracking, live logging, nutrition, classes, and analytics.
  - **Gym Admin Panel**: Enterprise facility suite covering revenue KPIs, member subscriptions, class scheduling, equipment maintenance, and broadcast announcements.

### 2. Member Pro Features
- **Live Workout Logger & Rest Timer:**
  - Start from pre-saved splits or custom canvas.
  - Log sets, reps, weight (KG/LBS), RPE (Rate of Perceived Exertion), and set tags (Warmup, Normal, Drop Set, Failure).
  - Automated PR detector with Web Audio fanfare and confetti celebrations.
  - Floating auto-synced Rest Timer with presets (30s, 60s, 90s, 120s, +15s), progress bar, audio ticks, and finish alert.
- **Biomechanical Exercise Library:**
  - Searchable catalog filterable by muscle group (Chest, Back, Legs, Shoulders, Arms, Core) and equipment (Barbell, Dumbbell, Cable, Machine, Bodyweight).
  - Step-by-step form cues, common pitfalls, and personal PR tracking.
- **AI Coach & Split Builder:**
  - Algorithmic periodization wizard based on Goal, Experience, Days/Week, and Equipment.
  - Direct 1-click save to routines and instant workout launch.
- **1RM & Visual Barbell Plate Loader:**
  - Epley and Brzycki one-rep max calculations with 50%–95% intensity percentage matrices.
  - Interactive visual barbell sleeve diagram with Olympic color-coded bumper plates (25kg Red, 20kg Blue, 15kg Yellow, 10kg Green, 5kg White, 2.5kg Black, 1.25kg Chrome).
- **Advanced Telemetry & Analytics (Recharts):**
  - Weekly Training Volume (BarChart)
  - Estimated 1RM Progression Curve for compound lifts (LineChart)
  - Body Mass & Body Fat % Progression (AreaChart)
  - Muscle Group Stimulus Distribution (PieChart)
- **Macro, Nutrition & Hydration Tracker:**
  - Surplus/deficit progress tracking for Calories, Protein, Carbohydrates, and Fats.
  - Interactive hydration station (+250ml, +500ml, +1000ml HydroJug, Reset).
  - 1-click high-protein presets and custom meal logger.
- **Class Booking & Hall of Fame Leaderboard:**
  - Reserve spots in HIIT, Spin, CrossFit, Yoga, and Strength classes with real-time capacity counters.
  - Gym-wide volume and lift leaderboards with Top 3 Gold/Silver/Bronze podiums.

### 3. Gym Admin Suite (Facility Operations)
- **Executive Revenue & KPI Dashboard:**
  - MRR ($48,920, +12.4%), Active Members (1,248), New Signups (142), Churn Rate (2.1%), Daily Check-ins (487).
  - Trailing 6-Month Gross Revenue vs Overhead AreaChart.
  - Turnstile Footfall Peak Traffic BarChart.
  - Subscription Tier Distribution PieChart.
- **Member & Subscription Management (CRUD):**
  - Searchable, filterable member database with tier badges, trainer assignments, and renewal triggers.
  - Add Member, Edit Plan, Freeze Account, and +1M / +1Y Renewal modals.
- **Trainer & Class Scheduler:**
  - Coach roster directory with client capacity and ratings.
  - Class scheduler modal with category, room, capacity, and difficulty.
- **Equipment & Maintenance Work Orders:**
  - Asset inventory with live status toggles (`Operational`, `Maintenance Required`, `Out of Order`).
  - Work order dispatch modal and service history logging.
- **Announcements & Challenge Publisher:**
  - Instant facility broadcast banner publisher that syncs immediately to the Member dashboard.
  - Monthly gym challenges with target benchmarks and rewards.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript 5.8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Celebrations:** Canvas-Confetti
- **Audio:** Web Audio API Synthesizer (Zero external audio asset dependencies)

---

## 🚀 Running the Project
```bash
# Navigate to the project directory
cd titan-os

# Install dependencies (if needed)
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

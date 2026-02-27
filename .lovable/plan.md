

# Redesign All Dashboard Pages to Match Landing Page Theme

## Overview
Transform all dashboard pages (User, Staff, Admin) to use the same dark, glassmorphic aesthetic as the Landing page -- dark `#050508` background, white text, semi-transparent glass cards with `border-white/8 bg-white/4`, and orange/violet/indigo gradient accents. Landing, Login, and Register pages remain untouched.

## Pages Affected
- `DashboardLayout.tsx` -- sidebar and main content area
- `UserDashboard.tsx`
- `BookParcel.tsx`
- `Payment.tsx`
- `OrderConfirmation.tsx`
- `TrackParcel.tsx`
- `UserOrders.tsx`
- `StaffDashboard.tsx`
- `AdminDashboard.tsx`

## Design Changes

### DashboardLayout (Sidebar + Main)
- Main area background: `bg-[#050508]` with subtle ambient glow orbs (matching landing)
- Sidebar: deeper dark `bg-[#08080c]` with `border-white/8` right border
- Sidebar nav items: `text-white/60` default, active items get orange gradient indicator
- Logo/brand area retains orange gradient icon
- All text switches from `text-foreground`/`text-muted-foreground` to `text-white`/`text-white/50`

### Card Components (applied across all pages)
- Replace `border-border bg-card` with `border-white/8 bg-white/4 backdrop-blur-sm`
- Replace `shadow-card` with no shadow (glass cards don't need shadows on dark)
- Section headers: `text-white` instead of `text-foreground`
- Sub-text: `text-white/50` instead of `text-muted-foreground`
- Accent text (tracking IDs, costs): `text-orange-400`

### Stat Cards
- Glass style: `border-white/8 bg-white/4 backdrop-blur-sm`
- Icon colors become gradient-tinted: orange-400, violet-400, indigo-400, emerald-400
- Values: `text-white` bold

### Tables (Orders, Staff Parcels, Admin)
- Table container: glass card style
- Header row: `text-white/40` uppercase tracking
- Body rows: `text-white/80`, hover `bg-white/4`
- Dividers: `border-white/6`
- Status badges: keep colored but on dark-transparent backgrounds

### Buttons
- Primary CTA: keep `bg-gradient-to-r from-orange-500 to-violet-600` (matching landing)
- Secondary/outline: `border-white/20 bg-white/5 text-white hover:bg-white/10`
- Ghost buttons: `text-white/60 hover:text-white hover:bg-white/6`

### Step Indicators (BookParcel)
- Active step: orange gradient circle
- Completed: emerald/green circle
- Inactive: `bg-white/10 text-white/40`
- Connector lines: `bg-white/10`

### Charts (AdminDashboard)
- Chart container: glass card
- Grid lines: `stroke="rgba(255,255,255,0.06)"`
- Axis text: `fill="rgba(255,255,255,0.4)"`
- Bar fill: keep orange gradient
- Tooltip: dark bg with white text

### Forms (Inputs, Selects, Textareas)
- Input fields: `border-white/10 bg-white/5 text-white placeholder:text-white/30`
- Labels: `text-white/70`
- Focus ring: `ring-orange-500/50`

### Status/Alert Boxes
- AI Validated box: `border-emerald-500/30 bg-emerald-500/10`
- Delay alert: `border-amber-500/30 bg-amber-500/10`
- Success confirmation: emerald glow circle on dark bg

### OrderConfirmation
- Centered card with glass style
- Green checkmark with `bg-emerald-500/10` circle
- Info tiles: `bg-white/5` instead of `bg-muted/50`

## Technical Details

### Files Modified (9 files)

1. **`src/components/DashboardLayout.tsx`**
   - Sidebar: `bg-[#08080c] border-r border-white/8`
   - Main: `bg-[#050508]` with decorative gradient orbs
   - Nav text/active states updated to white/orange scheme
   - Logout link: `text-white/40 hover:text-white`

2. **`src/pages/user/UserDashboard.tsx`**
   - All headings to `text-white`, subtext to `text-white/50`
   - Stat cards and table to glass style

3. **`src/pages/user/BookParcel.tsx`**
   - Step indicators, form card, inputs all dark-themed
   - AI validation box uses emerald on dark

4. **`src/pages/user/Payment.tsx`**
   - Payment method cards: glass with orange active border
   - Order summary: glass card

5. **`src/pages/user/OrderConfirmation.tsx`**
   - Confirmation card: glass style
   - Info tiles: `bg-white/5`

6. **`src/pages/user/TrackParcel.tsx`**
   - Timeline nodes: green done, dashed white/20 predicted
   - Alert box: amber on dark

7. **`src/pages/user/UserOrders.tsx`**
   - Table: glass container, white text

8. **`src/pages/staff/StaffDashboard.tsx`**
   - Stats and table: glass style with updated colors

9. **`src/pages/admin/AdminDashboard.tsx`**
   - Charts: dark-themed axes and grids
   - Anomaly panel: glass card with severity badges


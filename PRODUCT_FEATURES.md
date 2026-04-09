# AIPOSTAL: Feature Catalog

This document provides a comprehensive list of all frontend features currently implemented in the **Smooth Journey Kit (AIPOSTAL)** platform.

---

## 🌐 Public Facing (Landing Page)
- **High-End Hero Section**: Premium dark-mode design with parallax backgrounds and ambient glow effects.
- **AI Capability Cards**: Detailed showcase of AI Address Validation, ETA Prediction, and Anomaly Detection.
- **Visual Process Steps**: 4-step workflow guide from booking to delivery.
- **Role Portals**: Direct entry points for Users, Staff, and Admins.

## 👤 User (Customer) Portal
- **Intelligent Booking Wizard**:
  - **AI Address Validation**: Parses and verifies source/destination addresses.
  - **Auto Post-Office ID**: Identifies the nearest and most efficient logistics centers.
  - **Rate Estimation**: Real-time calculation based on weight and parcel type.
- **Interactive Tracking**:
  - **Milestone Navigation**: Live progress indicator (Picked → In Transit → Delivered).
  - **ETA Visualization**: ML-powered estimated delivery times.
- **Transaction Management**:
  - **Simulated Checkout**: Support for UPI, Credit Cards, and COD.
  - **Order History**: Comprehensive table of previous and active shipments.
- **User Dashboard**: Quick-view cards for total parcels, in-transit items, and saved addresses.

## 🚛 Staff & Delivery Agent Portal
- **Dual-Perspective Dashboard**: Toggle between managing office logistics and active field delivery.
- **Live Dispatch Map**:
  - **Leaflet Integration**: High-contrast map with status-coded markers.
  - **AI Route Pathing**: Animated visual routes between delivery stops.
- **Delivery Management**:
  - **Stop-by-Stop Itinerary**: Chronological list of assigned deliveries.
  - **Secure Verification**: OTP-based delivery confirmation flow.
  - **Agent Toolkit**: One-tap customer contact (masked) and GPS navigation triggers.
- **Performance Center**:
  - **Earnings Tracker**: Session-based and monthly revenue tracking for agents.
  - **Metric Progress Bars**: Visual tracking of weekly delivery targets and ratings.

## 👑 Admin Control Center
- **Executive Analytics**:
  - **Volume Trends**: Weekly bar charts for parcel throughput.
  - **Revenue Insights**: Interactive area charts with monthly growth indicators.
  - **Performance Matrix**: Staff leaderboards based on rating and on-time delivery.
- **Operational Oversight**:
  - **Regional Heatmap**: Logistics density visualization across key hubs (Delhi, Mumbai, etc.).
  - **System Alert Feed**: Live stream of SLA breaches, hub capacity warnings, and weather alerts.
- **AI Anomaly Detection**: Automated flagging of "stuck" parcels and high-risk route corridors.

## 🛠️ Global Platform Features
- **Command Palette (⌘K)**: Global search interface to find any parcel or jump between pages instantly.
- **Role-Based Navigation**: Dynamic sidebar that adapts to the authenticated user's permissions.
- **Premium UI/UX**:
  - **Glassmorphism**: Sleek, semi-transparent components.
  - **Micro-Animations**: Extensive use of Framer Motion for a "living" interface.
  - **Instant Feedback**: Toast notifications for all critical actions.

// src/styles/theme.ts
// ─── Single source of truth for all design tokens ───────────────
// Import this wherever you need colors, spacing, fonts

export const colors = {
  // Brand
  primary:       "#3b82f6",
  primaryDark:   "#314f8b",

  // Sidebar
  sidebarBg:     "#0b1f3a",
  sidebarActive: "#132a4a",
  sidebarAccent: "#3b82f6",
  sidebarStroke: "#1a3558",
  sidebarText:   "#c7d2e3",
  sidebarLocked: "#6b7c96",
  sidebarIcon:   "#9fb3d1",

  // App
  appBg:         "#f1f5f9",
  white:         "#ffffff",
  border:        "#e2e8f0",
  shadow:        "rgba(0,0,0,0.06)",

  // Text
  textPrimary:   "#1e293b",
  textSecondary: "#64748b",
  textMuted:     "#94a3b8",
  textPlaceholder:"#c0c0c0",
} as const;

export const fonts = {
  family:    '"DM Sans", "Segoe UI", sans-serif',
  sizeXs:    "11px",
  sizeSm:    "12px",
  sizeMd:    "14px",
  sizeLg:    "16px",
  sizeXl:    "20px",
  size2xl:   "32px",
  weightRegular:  400,
  weightMedium:   500,
  weightSemibold: 600,
  weightBold:     700,
  weightBlack:    800,
} as const;

export const sizes = {
  sidebarExpanded:  210,
  sidebarCollapsed: 59,
  headerHeight:     53,
  navItemHeight:    40,
  navIconSize:      20,
  navGap:           14,
  navPaddingLeft:   34,
  logoWidth:        183,
  logoHeight:       42,
} as const;

export const transitions = {
  fast:   "0.15s ease",
  normal: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
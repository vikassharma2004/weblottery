export const COLORS = {
  PRIMARY: "#FFB800",        // Gold - Reward energy (CTAs, highlights)
  PRIMARY_GRADIENT: "linear-gradient(90deg, #FFB800 0%, #FFCB45 100%)", // for buttons
  SECONDARY: "#3B82F6",      // Blue - Trust, links, headers
  SUCCESS: "#43A047",        // Confirmation, success states
  WARNING: "#FF9800",        // Alerts, minor warnings
  ERROR: "#E53935",          // Errors, invalid inputs

  BACKGROUND: "#FFF8E1",     // Warm cream - bright, friendly base
  CARD: "#FFFFFF",           // White for elevated cards
  BORDER: "#E0E0E0",         // Subtle outlines
  SHADOW: "rgba(0,0,0,0.06)",// Softer shadow for friendly tone

  TEXT: "#1E1E1E",           // Primary text
  TEXT_SECONDARY: "#6B6B6B", // Muted hints
  ACCENT: "#FFD54F",         // Soft gold hover / accent
  WHITE: "#FFFFFF",
  BLACK: "#000000",
};

export const ADMINCOLORS ={
  sidebar: "#1A1A1A",
  sidebarAccent: "#222222",
  primary: "#F5B041",
  card: "#1F1F1F",
  border: "#333333",
  accent: "#262626",
  foreground: "#FAFAFA",
  muted: "#A9A9A9",
  destructive: "#E74C3C",
}








/** helper: convert hex to rgba string */
export function hexToRgba(hex, alpha = 1) {
  let h = hex.replace('#','');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}









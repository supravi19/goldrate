export const Colors = {
  // Dark Palette (Default - Onyx & Gold)
  dark: {
    background: '#050505',
    surface: '#121212',
    border: 'rgba(255, 255, 255, 0.08)',
    text: {
      primary: '#FFFFFF',
      secondary: '#A0A0A0',
      muted: '#666666',
    },
    gold: {
      primary: '#E6B325',
      secondary: '#F5D17E',
      dark: '#926F34',
      glow: 'rgba(230, 179, 37, 0.15)',
    },
    status: {
      up: '#00FFC2',
      down: '#FF3B6B',
    },
    surfaceTint: {
      gold: '#111111',
      blue: '#111111',
      emerald: '#111111',
      rose: '#111111',
      onyx: '#111111'
    },
    accent: {
      blue: '#007AFF',
      purple: '#AF52DE',
      indigo: '#5856D6'
    }
  },
  // Light Palette (Vibrant & Layered)
  light: {
    background: '#E9ECF1', // Deeper, more sophisticated base
    surface: '#FFFFFF',
    surfaceTint: {
      gold: 'rgba(184, 134, 11, 0.08)',    // Rich Gold Dust
      blue: 'rgba(37, 99, 235, 0.08)',    // Frosted Sapphire
      emerald: 'rgba(5, 150, 105, 0.08)', // Emerald Mist
      rose: 'rgba(225, 29, 72, 0.08)',    // Rose Petal
      onyx: '#F1F5F9'                     // Professional Layer
    },
    border: 'rgba(0, 0, 0, 0.1)',
    text: {
      primary: '#0F172A', // Deep Navy Gray for better "weight"
      secondary: '#334155',
      muted: '#64748B',
    },
    gold: {
      primary: '#B8860B', // Darker Gold for premium readability
      secondary: '#D4AF37',
      dark: '#8B6508',
      glow: 'rgba(184, 134, 11, 0.12)',
    },
    status: {
      up: '#059669', // Deep Emerald
      down: '#DC2626', // Deep Crimson
    },
    accent: {
      blue: '#2563EB',
      purple: '#7C3AED',
      indigo: '#4F46E5'
    }
  },

  // Legacy flat export for compatibility during transition
  background: '#050505',
  surface: '#121212',
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0A0',
    muted: '#666666',
  },
  gold: {
    primary: '#E6B325',
    glow: 'rgba(230, 179, 37, 0.15)',
  },
  status: {
    up: '#00FFC2',
    down: '#FF3B6B',
  }
};

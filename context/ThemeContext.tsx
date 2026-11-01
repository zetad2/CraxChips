'use client';

import React, { useEffect } from 'react';
import { defineFlow, useFlow } from 'fractostate';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}

// Define FractoState atomic Flow for global theme state
export const ThemeFlow = defineFlow<ThemeState>('theme', {
  theme: 'light',
});

// Reactive hook powered directly by FractoState's useFlow
export function useTheme() {
  const [state, { ops }] = useFlow(ThemeFlow);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('crax-theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') {
        if (state.theme !== saved) {
          ops.self.theme._set(saved);
        }
        document.documentElement.classList.toggle('dark', saved === 'dark');
      }
    } catch {}
  }, []);

  const setTheme = (next: Theme) => {
    ops.self.theme._set(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        localStorage.setItem('crax-theme', next);
      } catch {}
    }
  };

  const toggleTheme = () => {
    const next: Theme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return {
    theme: state.theme,
    toggleTheme,
    setTheme,
  };
}

// FractoState is decentralized and context-free: no React Context Provider needed
// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   return <>{children}</>;
// }

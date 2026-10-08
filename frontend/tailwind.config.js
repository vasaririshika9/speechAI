/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          secondary: 'var(--color-secondary)',
          background: 'var(--color-background)',
          surface: 'var(--color-surface)',
          'surface-card': 'var(--color-surface-card)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
        },
        severity: {
          low: 'var(--severity-low)',
          'low-bg': 'var(--severity-low-bg)',
          medium: 'var(--severity-medium)',
          'medium-bg': 'var(--severity-medium-bg)',
          high: 'var(--severity-high)',
          'high-bg': 'var(--severity-high-bg)',
        }
      },
    },
  },
  plugins: [],
}

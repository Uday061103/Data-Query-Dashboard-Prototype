/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue
        secondary: '#1d4ed8', // Darker Blue
        accent: '#3b82f6', // Light Blue
        background: '#f8fafc', // Light Gray
        surface: '#ffffff',
        error: '#ef4444',
        success: '#22c55e',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // blue-500
        secondary: '#14B8A6', // teal-500
        accent: '#F59E0B', // amber-500
        neutral: {
          100: '#F3F4F6', // gray-100
          300: '#D1D5DB', // gray-300
          500: '#6B7280', // gray-500
          700: '#374151', // gray-700
          900: '#111827', // gray-900
        },
        textPrimary: '#1F2937', // gray-800
        textSecondary: '#6B7280', // gray-500
        background: '#F9FAFB', // gray-50
        'gallery-bg': '#FFFFFF', // white for main gallery background specifically
        success: '#10B981', // green-500
        danger: '#EF4444', // red-500
        info: '#3B82F6', // blue-500 (can be same as primary or a different shade)
      },
      fontFamily: {
        // Font families are not being modified in this step,
        // but this is where they would go if consolidated.
        // text: ['Inter', 'sans-serif'],
        // headings: ['Poppins', 'sans-serif'],
        // gotham: ['Gotham', 'sans-serif'],
        // montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

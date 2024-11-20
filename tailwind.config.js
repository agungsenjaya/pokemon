/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",  // Update this path to include your components
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}", // Add any other relevant paths
  ],
  presets: [require("nativewind/preset")],  // Use NativeWind preset
  theme: {
    extend: {
      // You can extend your theme here, like custom colors, spacing, etc.
    },
  },
  plugins: [],
};
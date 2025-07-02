// tailwind.config.js
module.exports = {
  darkMode: 'class', // this is required for next-themes
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'discord-dark': '#0f0f23',
        'discord-darker': '#0b0b1c',
        'discord-accent': '#5865F2',
        'discord-card': '#1e1f2b',
        // You can define bg-discord-gradient as a utility in globals if needed
      },
    },
  },
  plugins: [],
}

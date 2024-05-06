/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Poppins, sans-serif',
      paragraph: 'Roboto',
    },
    extend: {
      height: {
        screen: '100dvh',
      },
      colors: {
        High: '#FF6363',
        Medium: '#FFFDA2',
        Low: '#BAFFB4',
        Indigo: '#5260FC',
        IndigoHover: '#524CFC',
        IndigoActive: '#5238FC',
        HomeFrom: '#EFF5FB',
        HomeTo: '#FCE9FD',
      },
      fontSize: {
        h1: '4.5rem',
        h2: '3rem',
        h3: '2rem',
        h4: '1.5rem',
        h5: '1.125rem',
      },
    },
  },
  plugins: [],
};

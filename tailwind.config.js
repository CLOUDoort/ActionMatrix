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
        High1: '#FF1700',
        High2: '#FF4835',
        High3: '#FF6363',
        Medium1: '#FFE400',
        Medium2: '#FFEA38',
        Medium3: '#FFFDA2',
        Low1: '#06FF00',
        Low2: '#3AFF35',
        Low3: '#BAFFB4',
        Button: '#5260FC',
        ButtonHover: '#524CFC',
        ButtonActive: '#5238FC',
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

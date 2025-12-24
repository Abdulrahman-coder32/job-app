/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}",  // أضف css,scss لو عندك
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

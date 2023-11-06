import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'
import { nextui } from "@nextui-org/react";


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/component/*",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()]
}
export default config;

// export const content = ['./src/**/*.{js,ts,jsx,tsx}']//['./src/app/**/*.{js,ts,jsx,tsx}']//['./src/component/*']
// export const theme = {
//   extend: {
//     fontFamily: {
//       'sans': ['var(--font-manrope)', ..._fontFamily.sans]
//     }
//   }
// }
//export const plugins = []



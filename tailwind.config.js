/** @type {import('tailwindcss').Config} */

import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

export const content = ['./src/**/*.{js,ts,jsx,tsx}']//['./src/app/**/*.{js,ts,jsx,tsx}']//['./src/component/*']
export const theme = {
  extend: {
    fontFamily: {
      'sans': ['var(--font-manrope)', ..._fontFamily.sans]
    }
  }
}
export const plugins = []

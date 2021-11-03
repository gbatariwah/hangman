
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  plugins: [require('daisyui')],
  theme: {
    extend: {
      colors: require('daisyui/colors'),
    },
  },
})
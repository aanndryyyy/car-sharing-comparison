import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { svelteSVG } from 'rollup-plugin-svelte-svg'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    svelteSVG({
      // optional SVGO options
      // pass empty object to enable defaults
      svgo: {},
      // vite-specific
      // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
      // enforce: 'pre' | 'post'
      enforce: 'pre',
    }),
    sveltekit(),
    imagetools()
  ]
})

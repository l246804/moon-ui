import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue']
    }
  },
  plugins: [
    vue({ reactivityTransform: true }),
    AutoImport({ imports: ['vue', 'vue/macros'], dts: './src/auto-imports.d.ts', eslintrc: { enabled: true } })
  ]
})

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const resolveRoot = (...paths: string[]) => resolve(__dirname, ...paths)
const resolveSrc = (...paths: string[]) => resolveRoot('src', ...paths)

export default defineConfig({
  resolve: {
    alias: {
      '@': resolveSrc()
    }
  },
  build: {
    rollupOptions: {
      external: ['vue', '@vueuse/core']
    }
  },
  plugins: [
    vue({ reactivityTransform: true }),
    AutoImport({ imports: ['vue', 'vue/macros'], dts: './src/auto-imports.d.ts', eslintrc: { enabled: true } })
  ]
})

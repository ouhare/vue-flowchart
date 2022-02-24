import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'DgdFlowchart',
      fileName: (format) => `dgd-flowchart.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'mermaid', 'd3'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue()]
})

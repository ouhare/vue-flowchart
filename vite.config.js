import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'VueFlowchart',
      fileName: (format) => `vue-flowchart.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'mermaid', 'd3', 'lodash'],
      output: {
        globals: {
          vue: 'Vue',
          mermaid: 'mermaid',
          d3: 'd3',
          lodash: 'lodash'
        }
      }
    }
  },
  plugins: [vue()]
})

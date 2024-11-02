import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vs': 'monaco-editor/esm/vs'
    }
  },
  server: {
    fs: {
      allow: ['..'] // 允许访问上级目录，以便加载资源文件
    }
  },
  optimizeDeps: {
    include: ['monaco-editor']
  }
})

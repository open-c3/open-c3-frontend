import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/icons/index'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/icons/svg/')
  ],
  server: {
    host: '0.0.0.0',
    port: 3001,
    // 反向代理
    proxy: {
        '/api': {
          // http://juyun.c3.cmcloud.org/
          target: 'http://demo01.openc3.polymericcloud.com/',
          // target: 'http://10.60.77.73/',
          // target: 'http://juyun.c3.cmcloud.org/',
          // target: 'http://10.60.79.175/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api')
        }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 设置别名
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/_common.scss";`,
        // additionalData: '@import "@/assets/style/_handle.scss";' // 添加公共样式
      }
    }
  }
})

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
  build: {
    /**
     * 类型： string | string[]
     * 默认: modules
     * 设置最终构建的浏览器兼容目标
     */
    target: 'es2015',
    /**
     * 类型： string
     * 默认: dist
     * 指定输出路径（相对于 项目根目录）
     */
    outDir: 'dist',
    /**
     * 类型： string
     * 默认: assets
     * 指定生成静态资源（js、css、img、fonts）的存放路径（相对于 build.outDir）。
     */
    assetsDir: 'assets',
    /**
     * 类型： boolean
     * 默认: true
     * 启用/禁用 CSS 代码拆分。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
     */
    cssCodeSplit: true,
    /**
     * 类型： RollupOptions
     * 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
     */
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [],
      // 指定文件输出的配置
      output: {
        chunkFileNames: `assets/js/[name]-[hash].js`,
        entryFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames: `assets/[ext]/[name]-[hash].[ext]`,
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return 'vendor' //代码分割为第三方包
          }
        },
      },
    },
    terserOptions: {
      // 打包后移除console和注释
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
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

import { resolve } from 'path'
// ref: https://umijs.org/config/
export default {
  base: '/juejin-spider',
  publicPath: '/juejin-spider/',
  ignoreMomentLocale: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true, // true => reduce 的 state 为 proxy
        },
        dynamicImport: true,
        title: '掘金数据',
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        hardSource: false,
        routes: {
          exclude: [/components/, /models/],
        },
      },
    ],
  ],
  theme: './config/theme.config.js',
  alias: {
    api: resolve(__dirname, './src/services/api'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    services: resolve(__dirname, './src/services'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
    assets: resolve(__dirname, './src/assets'),
    '@': resolve(__dirname, './src'),
  },
}

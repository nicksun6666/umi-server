import { defineConfig } from '@umijs/max';
import routes from './src/routes'

export default defineConfig({
  mock:false,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'sunny',
    pure: true,
    locale: 'en-US'
  },
  hash: true,
  favicons: ['./favicon.icon'],
  define: { LOCAL_ENV: process.env.NODE_ENV },
  routes,
  npmClient: 'pnpm',
  history:{type: 'hash'},
  copy:[{
    from:'server',
    to:'dist/server'
  },{
    from:'public',
    to:'dist'
  }],
  proxy: {
    '/api': {
      'target': 'http://localhost:3002/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});


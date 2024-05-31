import { createApp } from 'vue'
import App from './App.vue'

import '/@/style/index.less'

import { setupRouter } from '/@/router'

import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/reset.css'

async function bootstrap() {
  const app = createApp(App)

  app.use(Antd)

  setupRouter(app)

  app.mount('#app')
}
bootstrap().then()

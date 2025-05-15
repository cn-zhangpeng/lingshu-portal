import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// 配置全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err, info)
}

// 注册全局组件和插件
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

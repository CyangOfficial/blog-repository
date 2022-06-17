import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { loadAllPlugins } from './plugins'
import '@/router/permission'
import '@/styles/_index.scss'
// import SlideVerify from 'vue-monoplasty-slide-verify';
import 'element-plus/dist/index.css'
const app = createApp(App)

// 加载所有插件
loadAllPlugins(app)

// app.use(SlideVerify)

app.use(store).use(router)
app.mount('#app')

// export const globalApp = app

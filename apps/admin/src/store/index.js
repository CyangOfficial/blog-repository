import { createStore } from 'vuex'
import permission from './modules/permission'
import app from './modules/app'
export default createStore({
  modules: {
    permission,
    app
  }
})

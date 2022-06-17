import { setItem, removeItem, getItem } from '@/utils/storage'
import { uploadImg } from '@/api/article'
// import { ElMessage as Msg } from 'element-plus'

const state = {
  opened: true, // 是否展开侧边栏
  visitedViews: [], // 导航栏 访问的视图
  cachedViews: [] // 缓存的标签视图
}

const mutations = {
  // 侧边栏导航状态
  SET_SIDEBARSTATUS(state, status) {
    state.opened = status
  },
  // 添加至标签栏
  ADD_TAGS(state, route) {
    const isRepeat = state.visitedViews.some(item => {
      return item.path === route.path && item.name === route.name
    })
    if (!isRepeat) {
      const baseRoute = Object.assign({}, route, { title: route.meta?.title || 'no-name' })
      state.visitedViews.push(baseRoute)
      let cachedTag = null
      try {
        cachedTag = getItem('tagNavs') && JSON.parse(getItem('tagNavs') || '')
      } catch (err) {
        cachedTag = []
      }
      if (state.visitedViews.length === 1 && state.visitedViews[0].name === 'Dashboard') return
      if (Array.isArray(cachedTag)) {
        cachedTag.push(route)
        setItem('tagNavs', state.visitedViews)
      }
    }
  },
  // 添加缓存标签
  ADD_CACHE_TAG(state, route) {
    if (state.cachedViews.includes(route.name)) return
    if (!route.meta?.noCache) {
      state.cachedViews.push(route.name)
    }
  },
  // 删除标签
  DEL_TAG(state, route) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === route.path) {
        state.visitedViews.splice(i, 1)
        removeItem('tagNavs')
        setItem('tagNavs', state.visitedViews)
        break
      }
    }
  },
  // 删除缓存标签
  DEL_CACHE_TAG(state, route) {
    const index = state.cachedViews.indexOf(route?.name)
    if (index) {
      state.cachedViews.splice(index, 1)
    }
  },
  // 关闭其它标签
  DEL_OTHERS_TAGS(state, route) {
    const currentTag = state.visitedViews.filter(item => {
      return item.meta?.affix || item.path === route.path
    })
    state.visitedViews = currentTag
    setItem('tagNavs', state.visitedViews)
  },
  // 删除其它缓存标签
  DEL_OTHERS_CACHE_TAGS(state, route) {
    const index = state.cachedViews.indexOf(route.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      state.cachedViews = []
    }
  },
  // 删除所有标签
  DEL_ALL_TAGS(state) {
    const affixTag = state.visitedViews.filter(item => item.meta?.affix)
    state.visitedViews = affixTag
    setItem('tagNavs', state.visitedViews)
  },
  DEL_ALL_CACHE_TAGS(state) {
    state.cachedTag = []
  },
  TOGGLE_SIDEBAR(state) {
    state.opened = !state.opened
  }
}

const actions = {
  setSidebarStatus({ commit }, status) {
    return new Promise(resolve => {
      commit('SET_SIDEBARSTATUS', status)
      resolve(status)
    })
  },
  addTags({ commit }, route) {
    commit('ADD_TAGS', route)
    commit('ADD_CACHE_TAG', route)
  },
  delTag({ commit }, route) {
    commit('DEL_CACHE_TAG', route)
    commit('DEL_TAG', route)
  },
  delCacheTag({ commit }, route) {
    commit('DEL_CACHE_TAG', route)
  },
  delOthersTags({ commit }, route) {
    commit('DEL_OTHERS_TAGS', route)
    commit('DEL_OTHERS_CACHE_TAGS', route)
  },
  delAllTags({ commit }) {
    commit('DEL_ALL_TAGS')
    commit('DEL_ALL_CACHE_TAGS')
  },
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  uploadPicture({ commit }, file) {
    const imgUploadVerify = (file) => {
      const isJPG = file.type === "image/jpeg";
      const imgReg = /image\/(jpg|jpeg|png|gif)/;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!imgReg.test(file.type)) {
        // Msg.error("仅支持格式：jpg,png,gif");
      }
      if (!isLt2M) {
        // Msg.error("图片大小不能超过2MB!");
      }
      return isJPG && isLt2M;
    }
    if (!imgUploadVerify(file)) return
    const formData = new FormData()
    formData.append("file", file, file.name)
    return new Promise((resolve, reject) => {
      uploadImg(formData).then(res => {
        if (res.code === 0) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

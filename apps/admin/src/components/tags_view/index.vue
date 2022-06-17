<template>
  <div class="tag-container" ref="rootRef">
    <el-scrollbar>
      <router-link
        v-for="item in visitedViews"
        :key="item"
        :to="item.path"
        class="tag-item"
        @contextmenu.prevent="openMenu(item, $event)"
      >
        <span class="tag-name">{{ item.meta.title }}</span>
        <i
          v-if="item.meta && !item.meta.affix"
          class="el-icon-close close-icon"
          @click.prevent.stop="delTag(item)"
        ></i>
      </router-link>
    </el-scrollbar>
    <ul
      class="contextmenu"
      v-show="tagVisible"
      :style="{ left: tagMouse.left + 'px', top: tagMouse.top + 'px' }"
    >
      <li @click="refershTag(selectTag)">刷新</li>
      <li v-if="!isAffix(selectTag)" @click="delTag(selectTag)">关闭</li>
      <li @click="closeOthersTags(selectTag)">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'
import { getItem } from '@/utils/storage'
import { watch, computed, onBeforeMount, reactive, toRefs, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { nextTick } from 'process'
export default {
  name: 'TagsView',
  setup () {
    const currentRoute = useRoute()
    const router = useRouter()
    const store = useStore()
    // vuex里保存的标签状态
    const visitedViews = computed(() => store.state.app.visitedViews)
    // const cachedViews = computed(() => store.state.app.cachedViews)
    const routes = computed(() => store.state.permission.routes)
    // 根节点DOM
    const rootRef = ref(null)
    // 关闭标签时，默认跳到最后一个标签
    const toLastRoute = () => {
      const lastRoute = visitedViews.value.slice(-1)[0]
      if (lastRoute && lastRoute.fullPath) {
        router.push(lastRoute.fullPath).catch(err => { console.log(err) })
      }
    }
    const state = reactive({
      tagMouse: {
        left: 0,
        top: 0
      },
      tagVisible: false,
      // 右击时选中的标签
      selectTag: {},
      // 置顶的标签页
      affixTags: [],
      delTag: (route) => {
        store.dispatch('app/delTag', route)
        if (state.isCurrentRoute(route)) {
          toLastRoute(state.visitedViews, route)
        }
      },
      // 检查关闭的是否是当前路由
      isCurrentRoute (route) {
        return route.path === currentRoute.path
      },
      isAffix (route) {
        return route.meta && route.meta.affix
      },
      openMenu (route, event) {
        const offsetLeft = rootRef.value.getBoundingClientRect().left
        // const offsetWidth = rootRef.value.getBoundingClientRect().width
        state.tagMouse.left = event.clientX - offsetLeft
        state.tagMouse.top = event.clientY
        state.tagVisible = true
        state.selectTag = route
      },
      closeMenu () {
        state.tagVisible = false
      },
      closeOthersTags (route) {
        store.dispatch('app/delOthersTags', route)
      },
      closeAllTags () {
        store.dispatch('app/delAllTags')
        toLastRoute()
      },
      refershTag (route) {
        store.dispatch('app/delCacheTag', route)
        const { fullPath } = route
        nextTick(() => {
          router.replace({ path: '/redirect' + fullPath })
        })
      }
    })
    // 添加新标签
    const addTags = () => {
      if (currentRoute.name) {
        store.dispatch('app/addTags', currentRoute)
      }
      return false
    }
    // 过滤置顶的标签
    const filterAffix = (routes, basePath) => {
      let tags = []
      routes.forEach(item => {
        if (item.meta && item.meta.affix) {
          const tagPath = path.resolve(basePath, item.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: item.name,
            meta: { ...item.meta }
          })
        }
        if (item.children) {
          const childTags = filterAffix(item.children, item.path)
          if (childTags.length >= 1) {
            tags = tags.concat(childTags)
          }
        }
      })
      return tags
    }
    // 初始化标签
    const initTags = () => {
      state.affixTags = filterAffix(routes.value)
      for (const tag of state.affixTags) {
        if (tag.name) {
          store.dispatch('app/addTags', tag)
        }
      }
      let openTags = null
      try {
        openTags = getItem('tagNavs') && JSON.parse(getItem('tagNavs') || '')
      } catch (err) {
        openTags = []
      }
      if (Array.isArray(openTags)) {
        for (const tag of openTags) {
          store.dispatch('app/addTags', tag)
        }
      }
    }
    watch(() => currentRoute.name, () => {
      addTags()
    })
    watch(() => state.tagVisible, (value) => {
      if (value) {
        document.body.addEventListener('click', state.closeMenu)
      } else {
        document.body.removeEventListener('click', state.closeMenu)
      }
    })
    onBeforeMount(() => {
      initTags()
      addTags()
    })
    return {
      visitedViews,
      rootRef,
      ...toRefs(state)
    }
  }
}
</script>
<style lang='scss' scoped>
.tag-container {
  width: 100%;
  height: 34px;
  padding: 2px 0 0 0;
  border-bottom: 1px solid #d8dce5;
  .contextmenu {
    width: 90px;
    padding: 5px 0;
    background-color: #fff;
    box-shadow: 1px 2px 3px rgb(179, 179, 179);
    border-radius: 5px;
    position: absolute;
    z-index: 99;
    li {
      text-indent: 15px;
      line-height: 25px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background-color: #eeeeee;
      }
    }
  }
  .tag-item {
    line-height: 34px;
    padding: 5px 8px;
    color: #495060;
    border: 1px solid #d8dce5;
    cursor: pointer;
    position: relative;
    font-size: 12px;
    margin-right: 5px;
    &:first-child {
      margin-left: 20px;
    }
    &.router-link-active {
      background-color: #42b983;
      color: #fff;
      .tag-name {
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #fff;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }
    .close-icon {
      font-size: 10px;
      width: 14px;
      height: 14px;
      background-color: transparent;
      border-radius: 50%;
      margin: 0 4px;
      transition: all 0.4s;
      vertical-align: 1px;
      &:hover {
        background-color: #ccc;
      }
      &::before {
        display: inline-block;
        transform: scale(0.7);
        vertical-align: -1px;
      }
    }
  }
}
</style>

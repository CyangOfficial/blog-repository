<template>
  <div class="layout-wrapper" :class="{ 'hide-sidebar': !opened }">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <NavBar />
        <TagsView />
      </div>
      <div class="app-main">
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
        <!-- <keep-alive include="Archive">
          <router-view />
          <component :is="'Archive'"></component>
        </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import SideBar from '@/components/sidebar'
import NavBar from '@/components/navigation_bar'
import TagsView from '@/components/tags_view'
export default {
  name: 'Layout',
  components: {
    SideBar,
    NavBar,
    TagsView
  },
  setup () {
    const count = ref(0)
    const store = useStore()
    const opened = computed(() => store.state.app.opened)
    const cachedViews = computed(() => store.state.app.cachedViews)

    // window.addEventListener('click', () => {
    //   console.log(cachedViews.value)
    //   store.dispatch('setSidebarStatus', !opened.value)
    // })
    return {
      count,
      opened,
      cachedViews
    }
  }
}
</script>
<style lang='scss' scoped>
.layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  &.hide-sidebar {
    .sidebar-container {
      width: 55px;
    }
    .main-container {
      margin-left: 55px;
    }
  }
  .sidebar-container {
    height: 100%;
    width: $sideBarWidth;
    background-color: $menuBg;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 999;
    transition: width .3s;
  }
  .main-container {
    height: 100%;
    margin-left: $sideBarWidth;
    position: relative;
    transition: margin-left .3s;
    .app-main {
      min-height: calc(100% - 87px);
      box-sizing: border-box;
      background-color: $appMainBg;
      padding: 20px;
    }
  }
}
</style>

<!--  -->
<template>
  <div class="sideWrap">
    <SideBarLogo />
    <el-menu
      class="sidebar-list"
      :unique-opened="true"
      :collapse="isCollapse"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :background-color="variables.menuBg"
      :default-active="activeMenu"
      @close="closeHandle"
      mode="vertical"
    >
      <SideBarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
        :is-first-level="true"
      />
    </el-menu>
  </div>
</template>

<script>
import variables from '@/styles/_variables.scss'
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import SideBarItem from './SideBarItem'
import SideBarLogo from './SideBarLogo.vue'
export default {
  name: 'Sidebar',
  components: {
    SideBarItem,
    SideBarLogo
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const isCollapse = computed(() => !store.state.app.opened)
    const routes = computed(() => store.state.permission.routes)
    const activeMenu = computed(() => {
      const { path } = route
      return path
    })
    const state = reactive({
      closeHandle: index => {
        console.log(index)
      }
    })
    return {
      isCollapse,
      routes,
      variables,
      activeMenu,
      ...toRefs(state)
    }
  }
}
</script>
<style lang='scss'>
.sidebar-container {
  // reset elementui css
  .el-menu {
    // background-color: rgba(0, 0, 0, .4) !important;
    border: none;
    height: 100%;
    width: 100%;
  }
}
</style>

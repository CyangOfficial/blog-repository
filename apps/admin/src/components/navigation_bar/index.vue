<template>
  <div class="navigation-wrapper">
    <div class="left-wrap">
      <div
        class="hamburger-wrap"
        :class="{ 'fold-menu': !opened }"
        @click="toggleSideBar"
      >
        <svg-icon name="hamburger" />
      </div>
      <div class="breadcrumb-wrap">
        <el-breadcrumb separator="/">
          <transition-group name="breadcrumb">
            <el-breadcrumb-item
              class="item-crumb"
              v-for="item in breadcrumbs"
              :key="item.path"
            >
              <template v-if="!item.hasOwnProperty('redirect')">
                <svg-icon class="icon" :name="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
              </template>
              <template v-else>
                <router-link :to="item.path">
                  <svg-icon class="icon" :name="item.meta.icon" />
                  <span>{{ item.meta.title }}</span>
                </router-link>
              </template>
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right-wrap">
      <div class="full-screen">
        <i class="el-icon-full-screen"></i>
        <!-- <svg-icon name="fullscreen" /> -->
      </div>
      <div class="avatar-container">
        <div class="drop-down">
          <el-dropdown>
            <div class="el-dropdown-link">
              <el-avatar size="small" :src="avatarUrl"></el-avatar>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>首页</el-dropdown-item>
                <el-dropdown-item>消息</el-dropdown-item>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, computed, reactive, toRefs, onBeforeMount, TransitionGroup } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'NavBar',
  components: {
    TransitionGroup
  },
  setup () {
    const currentRoute = useRoute()
    const store = useStore()
    const opened = computed(() => store.state.app.opened)
    const state = reactive({
      avatarUrl: '@/assets/imagtes/avatar.jpg',
      breadcrumbs: [],
      // 设置导航
      setBreadCrumb: () => {
        const dashboard = [{ path: '/', meta: { title: '首页', icon: 'home' }, redirect: '/dashboard' }]
        const routes = currentRoute.matched
        let matched = routes.filter(item => item.meta && item.meta.title)
        const first = matched[0]
        if (!state.isDashBoard(first)) {
          matched = dashboard.concat(matched)
        }
        state.breadcrumbs = matched
      },
      // 是否是首页
      isDashBoard: (route) => {
        const name = route?.name
        if (!name) return false
        if (name.toString().trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()) {
          return true
        }
        return false
      },
      toggleSideBar () {
        store.dispatch('app/toggleSidebar')
      }
    })
    watch(() => currentRoute.path, () => {
      state.setBreadCrumb()
    })
    onBeforeMount(() => state.setBreadCrumb())
    return {
      opened,
      ...toRefs(state)
    }
  }
}
</script>
<style lang='scss' scoped>
.navigation-wrapper {
  width: 100%;
  padding: 0 40px 0 20px;
  box-sizing: border-box;
  height: 50px;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .left-wrap {
    display: flex;
    align-items: center;
    .hamburger-wrap {
      font-size: 18px;
      margin-right: 50px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: #2d8cf0;
      }
      &.fold-menu {
        transform: rotate(90deg);
      }
    }
    .breadcrumb-wrap {
      .icon {
        font-size: 10px;
        margin-right: 4px;
      }
    }
  }
  .right-wrap {
    display: flex;
    align-items: center;
    .full-screen {
      font-size: 24px;
      margin-right: 20px;
    }
    .avatar-container {
      cursor: pointer;
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
      i.el-icon-caret-bottom {
        margin: 5px 0 0 2px;
      }
    }
  }
}
</style>

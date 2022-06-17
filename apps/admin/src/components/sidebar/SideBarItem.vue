<template>
  <div v-if="!item.meta?.hidden" class="menu-item" :class="[isCollapse ? 'simple-mode' : 'full-mode']">
    <!-- if 没有子菜单只渲染一层 -->
    <template v-if="item && isOnlyOneChild">
      <router-link :to="resolvePath(isOnlyOneChild.path)">
        <el-menu-item class="sidebar-item" :index="resolvePath(isOnlyOneChild.path)">
          <svg-icon :name="isOnlyOneChild.meta.icon" />
          <span>{{ isOnlyOneChild.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <!-- else 有子菜单 调用自己渲染下一层 -->
    <el-submenu :show-timeout="0" :hide-timeout="0" v-else :index="resolvePath(item.path)">
      <!-- 二级菜单标题 -->
      <template #title>
        <svg-icon :name="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 递归调用自己, 渲染子菜单 -->
      <template v-if="item.children">
        <SideBarItem
          v-for="child in item.children"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          :item="child"
          :is-first-level="false"
          class="nest-item"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { computed } from 'vue'
import path from 'path'
export default {
  name: 'SideBarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    },
    basePath: {
      type: String,
      required: true
    },
    isFirstLevel: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const childNumber = computed(() => {
      if (props.item.children) {
        const showChildren = props.item.children.filter(item => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showChildren.length
      }
      return 0
    })
    const isOnlyOneChild = computed(() => {
      const item = props.item
      if (item.children) {
        /**
         * 如果子路由长度大于1， 此处表示有二级路由 返回null,
         * 为null时会重新调用此组件，并迭代当前路由的子路由
         */
        if (childNumber.value > 1) {
          return null
        }
        /**
         * 如果不存在meta就返回它的子路由，
         * 当只有一级路由时才没有meta属性
         */
        for (const child of item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      /**
       * 1、如果不存在children 表示是子路由
       * 2、如果没有子级，则返回自身并移除路径，
       *    因为this.basePath已经包含子项的路径
      */
      return { ...item, path: '' }
    })
    const resolvePath = (routePath) => {
      return path.resolve(props.basePath, routePath)
    }
    return {
      resolvePath,
      isOnlyOneChild
    }
  }
}
</script>
<style lang='scss' scoped>
.svg-icon {
  margin-right: 15px;
  font-size: 16px;
}
.menu-item {
  .el-menu-item,
  .el-submenu__title {
    // min-width: $sideBarWidth !important;
    color: $menuText !important;
    background-color: $menuBg !important;
    transition: color 0.5s;
    &:hover {
      color: $menuHover !important;
    }
  }
  // 子菜单背景色
  .el-menu .nest-item .sidebar-item {
    background-color: $subMenuBg !important;
  }
  // 激活样式
  .router-link-active .sidebar-item {
    color: $menuActiveText !important;
    background-color: $menuActiveBg !important;
  }
  // 子菜单激活样式
  .nest-item .router-link-active .sidebar-item {
    color: $subMenuActiveText !important;
    background-color: $subMenuActiveBg !important;
  }
}
.simple-mode {
  .el-menu-item,
  .el-submenu__title {
    span {
      visibility: hidden !important;
    }
  }
}
</style>

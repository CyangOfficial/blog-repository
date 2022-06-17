<!--  -->
<template>
  <header id="head-container" :class="{ 'scroll-top': isScrollTop }">
    <div class="bg-block"></div>
    <nav class="navBar d-flex jc-between ai-center">
      <a href="" class="yang-logo"></a>
      <div class="nav-content d-flex ai-center">
        <div class="menu-icon" @click="$store.commit('toggleSidebar')">
          <svg-icon name="menu" />
        </div>
        <div class="navs d-flex">
          <nuxt-link class="nav_link" to="/"
            ><svg-icon name="house" />首页</nuxt-link
          >
          <nuxt-link class="nav_link" to="/post"
            ><svg-icon name="post" />文章</nuxt-link
          >
          <nuxt-link class="nav_link" to="/archive"
            ><svg-icon name="archive" />归档</nuxt-link
          >
          <nuxt-link class="nav_link" to="/about"
            ><svg-icon name="person" />关于</nuxt-link
          >
        </div>
        <!-- <div class="search-box d-flex align-items-center">
          <button type="submit">
            <i class="bi bi-search"></i>
          </button>
          <input
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            type="search"
            placeholder="搜点什么呢？"
          />
        </div> -->
        <div class="right-btn d-flex ai-center">
          <button type="search" class="search-btn">
            <svg-icon name="search"></svg-icon>
          </button>
          <button
            class="theme-button"
            :class="{
              'default-theme': blogTheme === 'default-theme',
              'dark-theme': blogTheme === 'dark-theme',
            }"
            @click="$store.commit('toogleTheme')"
          >
            <svg-icon name="sun" class="svg-theme"></svg-icon>
            <svg-icon name="moon" class="svg-theme"></svg-icon>
          </button>
        </div>
      </div>
    </nav>
    <div class="search-panel"></div>
  </header>
</template>

<script>
import { throttle } from '@/utils'
export default {
  name: 'Header',
  data () {
    return {
      isScrollTop: true,
      defaultTheme: true
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        // console.log(window)
        // if (route.fullPath === '/') {
        //   this.isScrollTop = true
        //   document.body.addEventListener('scroll', this.scrollHandle)
        // } else {
        //   this.isScrollTop = false
        //   document.body.removeEventListener('scroll', this.scrollHandle)
        // }
      },
      immediate: true
    }
  },
  computed: {
    blogTheme () {
      return this.$store.state.blogTheme
    }
  },
  created () {

  },
  mounted () {
    this.$store.commit('initStoreHandle')
    window.addEventListener('scroll', this.scrollHandle)
  },
  methods: {
    scrollHandle: throttle(function () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isScrollTop = scrollTop === 0
      // if (scrollTop > 300) { }
    }, 200)
  }
}
</script>
<style lang="scss">
#head-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: #000 0 1px 40px -8px;
  padding: 0 2.4rem;
  z-index: 5;
  transition: all 0.5s ease;
  opacity: 1;
  @include mobile() {
    padding: 0.4rem 1rem;
  }
  .bg-block {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0.9;
    backdrop-filter: blur(5px);
    @include theme_transition(background);
    @include mobile(pc) {
      @include background_color("bg-color");
    }
    @include mobile() {
      @include background_color("m-header-bg");
      backdrop-filter: blur(5px);
      // display: none;
      &.scroll-top {
        box-shadow: none;
      }
    }
  }
  &:hover {
    opacity: 1;
  }
  .navBar {
    .yang-logo {
      display: block;
      height: 50px;
      width: 230px;
      background: url("~/assets/images/blog-logo.png") no-repeat center / cover;
    }
    .menu-icon {
      display: none;
      @include mobile() {
        display: block;
        @include font_color("m-header");
        .svg-icon {
          width: 2rem;
          height: 2rem;
        }
      }
    }

    @include mobile() {
      .yang-logo {
        display: none;
      }
      .nav-content {
        @include mobile() {
          flex: 1;
          justify-content: space-between;
          width: 100%;
        }
        .navs {
          display: none;
        }
      }
    }
    .navs {
      height: 100%;
      margin-right: 2rem;
      .nav_link {
        display: block;
        @include font_color("navs-color");
        text-decoration: none;
        font-size: 1.1rem;
        margin-left: 1.6rem;
        height: 4.5rem;
        line-height: 4.5rem;
        position: relative;
        @include theme_transition(color);
        .nav-icon {
          margin-right: 0.4rem;
        }
        .svg-icon {
          width: 1.1rem;
          height: 1.1rem;
          margin: -0.2rem 0.4rem 0 0;
        }
        &::after {
          content: "";
          width: 0;
          height: 0.3rem;
          background: #ffaa0d;
          position: absolute;
          bottom: 0;
          left: 0;
          transition: all 0.3s;
        }
        &:hover {
          color: #ffaa0d !important;
          .svg-icon {
            display: inline-block;
            animation: shaking 5s infinite ease-in-out;
          }
          &::after {
            width: 100%;
          }
        }
      }
    }
    .search-box {
      font-size: 1.5rem;
      border: 1px solid #8f8484;
      border-radius: 0.3rem;
      padding: 0 0.4rem;
      height: 2.3rem;
      margin-right: 2rem;
      @include border-color("navs-color");
      button {
        border: none;
        background: none;
        display: inline-block;
        font-size: 1rem;
        padding: 0;
        margin-right: 0.5rem;
        cursor: pointer;
        @include font_color("navs-color");
      }
      input {
        border: none;
        outline: none;
        padding: 0;
        height: 1.2rem;
        background: transparent;
        @include font_color("navs-color");
        font-size: 0.9rem;
        width: 14rem;
        &::placeholder {
          font-size: 0.9rem;
          line-height: 1.5rem;
          @include font_color("navs-color");
        }
      }
    }
    .search-btn {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 1rem;
      cursor: pointer;
      background: none;
      outline: none;
      border: none;
      @include mobile() {
        width: 2rem;
        height: 2rem;
        padding: 0;
        -webkit-tap-highlight-color: transparent;
      }
      .svg-icon {
        @include mobile() {
          @include font_color("m-header");
        }
        @include mobile(pc) {
          @include font_color("navs-color");
        }
      }
    }
    .theme-button {
      width: 5rem;
      height: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
      border-radius: 1.5rem;
      transition: all 0.5s;
      overflow: hidden;
      cursor: pointer;
      &.default-theme {
        background: linear-gradient(rgb(57, 89, 138), rgb(121, 215, 237));
        .icon-moon {
          transform: translateY(-5rem);
        }
        .icon-sun {
          transform: translateY(0);
        }
      }
      &.dark-theme {
        background: linear-gradient(rgb(9, 18, 54), rgb(30, 33, 93));
        .icon-sun {
          transform: translateY(-5rem);
        }
        .icon-moon {
          transform: translateY(0);
        }
      }
      .svg-theme {
        width: 1.6rem;
        transform: translateY(0);
        transition: all 0.5s;
      }
    }
  }
  .search-panel {
    width: 28.6rem;
    height: calc(100vh - 4.5rem);
    position: fixed;
    right: -30rem;
    top: 4.5rem;
    background: #fff;
  }
}
</style>
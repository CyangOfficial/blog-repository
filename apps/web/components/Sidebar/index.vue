<template>
  <aside id="sidebar" :class="{ open: sidebarOpened }">
    <div class="overview">
      <div class="auth-info d-flex jc-center ai-center">
        <div class="avatar">
          <img class="w-100 h-100" src="../../assets/images/avatar.jpg" />
        </div>
        <h2 class="name">Cyang Official Blog</h2>
        <h2 class="sub-name">楊的博客 &amp; 编程笔记</h2>
        <div class="meta-intro d-flex jc-center">
          <div class="item posts">
            <nuxt-link to="/post" class="meta-link">
              <span class="num">0</span>
              <span class="tit">文章</span>
            </nuxt-link>
          </div>
          <div class="item posts">
            <nuxt-link to="/archive" class="meta-link">
              <span class="num">0</span>
              <span class="tit">归档</span>
            </nuxt-link>
          </div>
          <div class="item posts">
            <nuxt-link to="/" class="meta-link">
              <span class="num">0</span>
              <span class="tit">标签</span>
            </nuxt-link>
          </div>
        </div>
        <p class="social d-flex">
          <a href="">
            <svg-icon name="github" />
          </a>
          <a href="">
            <svg-icon name="github" />
          </a>
          <a href="">
            <svg-icon name="github" />
          </a>
          <a href="">
            <svg-icon name="github" />
          </a><a href="">
            <svg-icon name="github" />
          </a>
        </p>
      </div>
      <nav class="navs d-flex jc-center ai-center">
        <nuxt-link to="/" class="nav-item">
          <svg-icon name="house" />首页
        </nuxt-link>
        <nuxt-link to="/post" class="nav-item">
          <svg-icon name="post" />文章
        </nuxt-link>
        <nuxt-link to="/archive" class="nav-item">
          <svg-icon name="archive" />归档
        </nuxt-link>
        <nuxt-link to="/" class="nav-item">
          <svg-icon name="about" />关于
        </nuxt-link>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    sidebarOpened() {
      return this.$store.state.sidebarOpened;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
#sidebar {
  width: 60vw;
  height: 100vh;
  // background-color: #fff;
  @include background_color("bg-color");
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  transform: translateX(-70vw);
  transition: transform 0.5s ease;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.5);

  &.open {
    transform: translateX(0);
  }

  @include mobile(pc) {
    display: none;
  }

  .overview {
    width: 100%;
    height: 100%;
    padding: 1rem 0;

    .auth-info {
      flex-direction: column;

      .avatar {
        width: 8rem;
        height: 8rem;
        background-color: #ccc;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0.4rem 2rem rgba(161, 177, 204, 0.6);
      }

      .sub-name {
        font-size: 1rem;
        // color: #999;
        @include font_color("sidebar-tit2");
        font-weight: normal;
        line-height: 2em;
      }

      .name {
        font-size: 0.9rem;
        @include font_color("sidebar-tit1");
        line-height: 2em;
        font-weight: 400;
        margin-top: 1rem;
      }

      .meta-intro {
        margin-top: 0.5rem;

        .item {
          padding: 0 0.9rem;
          position: relative;

          // border-right: 1px solid #ccc;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            display: block;
            background: #ccc;
            width: 1px;
            height: 100%;
            transform: scaleX(0.5);
          }

          &:last-child {
            &::after {
              height: 0;
            }

            border: none;
          }

          .meta-link {
            color: #666;
            @include font_color("sidebar-tit3");
            text-align: center;

            span {
              display: block;

              &.num {
                font-weight: 700;
                line-height: 1.5rem;
              }
            }
          }
        }
      }

      .social {
        margin-top: 1.5rem;

        a {
          width: 1.5rem;
          height: 1.5rem;
          color: #000;
          margin-left: 0.8rem;

          &:first-child {
            margin: 0;
          }
        }
      }
    }

    .navs {
      flex-direction: column;
      margin-top: 2rem;

      .nav-item {
        // color: rgb(70, 70, 70);
        @include font_color("sidebar-navs");
        // margin-top: 2rem;
        line-height: 3em;

        .svg-icon {
          width: 1.1rem;
          height: 1.1rem;
          margin: -0.3rem 0.5rem 0 0;
        }
      }
    }
  }
}
</style>

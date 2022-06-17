<!--  -->
<template>
  <main id="main-container">
    <Header />
    <Sidebar />
    <div v-if="!isMobile" @click="scrollTop" class="cat-top m-hidden" :class="{ down: catDown }"></div>
    <div @click="clickMask" ref="layer" class="mask-layer" :class="{ show: sidebarOpened }"></div>
    <nuxt />
    <MPlayer :list="musicLists" />
    <Footer />
  </main>
</template>

<script>
import { throttle } from "@/utils";
import Sidebar from "@/components/Sidebar";
import { lock, unlock } from "tua-body-scroll-lock";
import MPlayer from '@/components/Player'
export default {
  data() {
    return {
      catDown: false,
      musicLists: [
        {
          title: 'Warmest Regards',
          artist: 'Half Moon Run',
          lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
          src: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
          pic: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg'
        },
        {
          title: 'Warmest Regards',
          artist: 'Half Moon Run',
          lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
          src: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
          pic: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg'
        },
        {
          title: 'Warmest Regards',
          artist: 'Half Moon Run',
          lrc: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).lrc',
          src: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/Half%20Moon%20Run%20-%20Warmest%20Regards%20(Extended%20Version).mp3',
          pic: 'https://cyy-blog-1258211293.cos.ap-beijing.myqcloud.com/player/WarmestRegards.jpg'
        }
      ]
    };
  },
  components: {
    Sidebar,
    MPlayer
  },
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    sidebarOpened() {
      return this.$store.state.sidebarOpened;
    }
  },
  watch: {
    "$store.state.sidebarOpened"(n, o) {
      if (n) {
        const layer = this.$refs["layer"];
        // const sidebar = document.querySelector('#sidebar')
        // 解决移动端穿透问题
        lock(layer);
      } else {
        unlock();
      }
    },
    $route(n, o) {
      if (this.$store.state.isMobile) {
        this.$store.commit("toggleSidebar", false);
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  methods: {
    scrollHandle: throttle(function () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.catDown = scrollTop > 400;
    }, 300),
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    clickMask() {
      this.$store.commit("toggleSidebar");
    }
  }
};
</script>

<style lang="scss" scope>
#main-container {
  overflow-x: hidden;
  @include background_color("bg-color");
  @include theme_transition(background);

  .cat-top {
    width: 4.67rem;
    height: 0;
    position: fixed;
    right: 4rem;
    top: 0;
    z-index: 4;
    background: url("~/assets/images/scroll.png") no-repeat center bottom;
    background-size: cover;
    cursor: url("https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/cursor/ayuda.cur"), auto;
    transition: height 0.5s ease;
    animation: float 2s linear infinite;
    cursor: pointer;

    &.down {
      height: 70vh;
    }
  }

  .mask-layer {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    display: none;

    @include mobile() {
      &.show {
        display: block;
      }
    }
  }

  .player-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    z-index: 99;
    overflow: visible;
    max-width: 400px;
    box-shadow: none;
  }
}
</style>

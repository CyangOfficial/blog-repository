<template>
  <section id="home-container">
    <HomeBanner />
    <section class="content">
      <section class="notice d-flex ai-center">
        <svg-icon name="notice"></svg-icon>
        {{ notice }}
      </section>
      <h2 class="section-title d-flex ai-center jc-start m-hidden">
        <svg-icon name="hot" />Hot Section!
      </h2>
      <section class="new-block-section d-flex jc-between m-hidden">
        <a
          href="https://github.com/CyangOfficial/nuxt-blog"
          class="item-block"
          target="_blank"
          v-for="item in newReleaseData"
          :key="item.title"
        >
          <div
            class="block-wrap"
            :data-title="item.title"
            :data-intro="item.intro"
          >
            <img class="img" :src="item.img" :alt="item.title" />
            <div class="mask"></div>
          </div>
        </a>
      </section>
      <h2 class="section-title d-flex ai-center jc-start">
        <svg-icon name="new" />Latest Posts!
      </h2>
      <div class="skeleton-wrap" v-if="!postList.length">
        <PostLoader v-for="item in 3" :key="item" />
      </div>
      <div class="latest-posts" v-else>
        <PostItem
          ref="postItem"
          :postList="postList"
          :pageSize="postParams.pageSize"
          :listNum="listNum"
        />
        <div v-if="!isLastPage" class="foot-loading">
          <SvgIcon name="loading" />
        </div>
        <p v-if="isLastPage" class="foot-text">到底啦~</p>
      </div>
    </section>
  </section>
</template>

<script>
import HomeBanner from "@/components/HomeBanner";
import PostLoader from "@/components/PostLoader";
import Sidebar from "@/components/Sidebar";
import PostItem from "@/components/PostItem";
import { getPosts } from "@/api/post";
import SvgIcon from "../components/SvgIcon/index.vue";
export default {
  name: "Home",
  components: {
    HomeBanner,
    PostLoader,
    Sidebar,
    PostItem,
    SvgIcon
  },
  scrollToTop: false,
  data() {
    return {
      notice: "欢迎来到我的博客~",
      newReleaseData: Object.freeze([
        {
          href: "https://github.com/CyangOfficial/nuxt-blog",
          title: "Cyang Nuxt Blog",
          intro: "基于 Nuxt 实现的个人博客",
          img: require("@/assets/images/blog-section-cover.jpg")
        },
        {
          href: "https://github.com/CyangOfficial/nuxt-blog",
          title: "Admin Manager",
          intro: "vue3.0 elementui-plus",
          img: require("@/assets/images/admin-1.jpg")
        },
        {
          href: "https://github.com/CyangOfficial/nuxt-blog",
          title: "Nest Server",
          intro: "基于 express 的 Nest 框架",
          img: require("@/assets/images/coding.jpg")
        }
      ]),
      postList: [],
      postParams: {
        page: 1,
        pageSize: 5
      },
      listNum: 5,
      isLastPage: false,
      postLoading: true,
      loadMoreObserver: null,
      lazyObserver: null
    };
  },
  mounted() {
    console.log('mounted')
    this.fetchPostData();
  },
  methods: {
    // 观察底部loading是否进入可视区
    observeLoadText() {
      const footEl = document.querySelector(".foot-loading");
      this.loadMoreObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.postParams.page += 1;
          this.fetchPostData();
          this.loadMoreObserver.unobserve(entries[0].target);
        }
      });
      footEl && this.loadMoreObserver.observe(footEl);
    },
    fetchPostData() {
      console.log('fetchHandle')
      getPosts(this.postParams)
        .then(res => {
          const { result } = res;
          if (result.items.length > 0) {
            this.postList.push(...result.items);
            this.listNum = result.items.length;
            this.isLastPage = (result.page * result.pageSize) > result.total
            if (this.isLastPage) {
              this.loadMoreObserver.disconnect();
            }
            this.$nextTick(() => {
              this.observeLoadText();
              // 从第2页开始加载
              if (this.postParams.page > 1) {
                const childItems = Array.from(
                  this.$refs.postItem.$el.childNodes
                ).slice(this.listNum * -1);
                childItems.forEach(item => {
                  const imgItem = item.querySelector(".poster-img");
                  this.$refs.postItem.observer.observe(imgItem);
                });
              }
            });
          } else {
            this.isLastPage = true
            this.listNum = 0;
            this.postLoading = false;
            this.$refs.postItem.observer.disconnect();
          }
        })
        .catch(err => {
          this.listNum = 0;
          this.observer.disconnect();
          console.log(err);
        });
    },
    fetchMockData() {
      return new Promise(resolve => {
        setTimeout(() => {
          const postList = [];
          for (let i = 0; i < 5; i++) {
            postList.push({
              posterUrl:
                "https://sakura.2heng.xin/wp-content/uploads/2018/05/r63888719_by__LM7_-1024x534.jpg",
              createdAt: "2021-08-02",
              title: "WebP 全方位能力检测",
              pv: 100,
              likes: 15,
              tag: ["javascript"],
              summary: `一直以来，习惯在 flex 布局中使用 gap
                      这个属性设置间距，一直以来也都是在最新的 Chrome
                      上调试，所以从来没有想在 flex gap 在其他`
            });
          }
          resolve(postList);
        }, 1500);
      });
    }
  }
};
</script>
<style lang="scss" scope>
#home-container {
  .content {
    max-width: 59rem;
    margin: 0 auto;
    @include mobile() {
      max-width: 100vw;
      padding: 0 1rem;
    }
    .notice {
      padding: 1.25rem;
      border: 1px dashed #e6e6e6;
      width: 100%;
      border-radius: 0.6rem;
      margin-top: 3rem;
      @include background_color("notice-bg-color");
      @include font_color("notice-color");
      @include border_color("notice-border");
      @include theme_transition();
      @include mobile() {
        margin-bottom: 3rem;
      }
      .icon-notice {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 1rem;
        @include mobile() {
          height: 1.2rem;
        }
      }
    }
    .section-title {
      font-size: 1.3rem;
      margin: 4rem 0 2rem;
      font-weight: 400;
      padding-bottom: 0.6rem;
      border-bottom: 1px dashed rgb(230, 230, 230);
      @include font_color("section-title");
      @include mobile() {
        margin: 2rem 0;
        font-size: 1.1rem;
      }
      .svg-icon {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 0.8rem;
        @include mobile() {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
    }
    .new-block-section {
      .item-block {
        width: 32%;
        border-radius: 0.625rem;
        overflow: hidden;
        .block-wrap {
          height: 11rem;
          position: relative;
          color: #fff;
          text-align: center;
          &::before {
            content: attr(data-title);
            width: 100%;
            line-height: 2.8rem;
            font-size: 1.2rem;
            background-color: black;
            position: absolute;
            left: 19rem;
            top: 1.4rem;
            z-index: 2;
            transition: all 0.4s linear;
          }
          &::after {
            content: attr(data-intro);
            width: 100%;
            font-style: italic;
            font-size: 0.9rem;
            color: #bbbbbb;
            position: absolute;
            right: 19rem;
            bottom: 1.5rem;
            z-index: 2;
            transition: all 0.4s linear;
          }
          &:hover {
            .mask {
              background-color: rgba(0, 0, 0, 0.5);
            }
            &::before {
              left: 0;
            }
            &::after {
              right: 0;
            }
          }
          .img {
            width: 100%;
            min-height: 100%;
          }
          .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0);
            z-index: 1;
            transition: all 0.4s linear;
          }
        }
      }
    }
    .skeleton-wrap {
      .post-loader-wrap:nth-of-type(2n) {
        @include mobile(pc) {
          transform: rotateY(180deg);
        }
      }
    }
    .latest-posts {
      .foot-loading {
        text-align: center;
        margin: 0 auto;
        @include font_color("notice-bg-color");
        .svg-icon {
          width: 3rem;
          height: 3rem;
        }
      }
      .foot-text {
        text-align: center;
        @include font_color("post-title");
      }
    }
  }
}
</style>

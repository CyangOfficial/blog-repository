<template>
  <div class="post-detail-container">
    <div class="top-bg w-100" :class="{ 'fixed-top': fixedTop }">
      <div
        class="post-cover h-100"
        :style="{ backgroundImage: `url(${postCover})` }"
      >
        <!-- <img src="@/assets/images/post-top-bg.jpg" alt="啦啦" /> -->
      </div>
      <header class="post-info">
        <h1 class="post-title">{{ postTitle }}</h1>
        <div class="post-meta">
          <span class="create-time">发布于 {{ createdAt }}</span>
          <span class="pv">浏览量 {{ pv }}</span>
          <span class="like">喜欢 {{ like }}</span>
        </div>
      </header>
    </div>
    <main class="post-wrap">
      <article>
        <article class="post-main">
          <aside class="toc-wrap m-hidden" :class="{ fixed: fixedDoc }">
          <ol class="toc-list">
            <li
              class="toc-list-item"
              :style="{ padding: `10px 0 5px ${item.indent * 5}px` }"
              v-for="(item, index) in anchors"
              :key="index"
              @click="handleAnchorClick(item)"
            >
              <a href="#">{{ item.title }}</a>
              <!-- <a href="#" :class="{'active': nowToc}">{{ item.title }}</a> -->
            </li>
          </ol>
        </aside>
          <div class="post-body">
            <VMdPreview
              ref="preview"
              class="vue-md-ediotr"
              :text="markdownContent"
            />
          </div>
          <section class="post-context d-flex">
            <nuxt-link to="/post/123" class="nuxt-link prev">
              <div class="post-squares">
                <div class="picture">
                  <img :src="ctxCover.prev" alt="" />
                </div>
                <p class="text-info tit1">PREVIOUS POST</p>
                <p class="text-info tit2">为文章添加一个目录</p>
              </div>
            </nuxt-link>
            <nuxt-link to="/post/456" class="nuxt-link next">
              <div class="post-squares">
                <div class="picture">
                  <img :src="ctxCover.next" alt="" />
                </div>
                <p class="text-info tit1">NEXT POST</p>
                <p class="text-info tit2">为文章添加一个目录</p>
              </div>
            </nuxt-link>
          </section>
        </article>
      </article>
    </main>
  </div>
</template>

<script>
import { getItemPost } from "@/api/post";
export default {
  validate({ params, query }) {
    console.log(params);
    return true;
  },
  asyncData(ctx, callback) {
    const { params } = ctx;
    getItemPost({ _id: params.id })
      .then(res => {
        const item = res.result.items;
        const data = {
          markdownContent: item.content,
          postTitle: item.title,
          createdAt: item.createdAt,
          pv: item.pv,
          like: item.like
        };
        callback(null, data);
      })
      .catch(err => {
        callback({ statusCode: 404, message: "Post not found" });
      });
  },
  head() {
    return {
      title: this.postTitle
    };
  },
  data() {
    return {
      postCover: require("@/assets/images/post-top-bg.jpg"),
      ctxCover: {
        prev: require("@/assets/images/ctx1.jpg"),
        next: require("@/assets/images/ctx2.jpg")
      },
      fixedTop: false,
      anchors: [],
      fixedDoc: false
    };
  },
  created() {
    // this.fetchItemPost();
  },
  mounted() {
    this.listenTopbg();
    // this.listenDoc()
    const anchors = this.$refs.preview.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
    const titles = Array.from(anchors).filter(item => !!item.innerText.trim());
    const hTags = Array.from(new Set(titles.map(item => item.tagName))).sort();
    this.anchors = titles.map(el => ({
      title: el.innerText,
      lineIndex: el.getAttribute("data-v-md-line"),
      indent: hTags.indexOf(el.tagName)
    }));
  },
  methods: {
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;
      const heading = document.querySelector(`[data-v-md-line="${lineIndex}"]`);
      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60
        });
      }
    },
    listenDoc() {
      // const docDom = document.querySelector('.toc-wrap')
      // window.addEventListener('scroll', (ev) => {
      //   console.log(ev)
      // })
    },
    listenTopbg() {
      // const bgHeight = document.querySelector('.top-bg').clientHeight
      window.addEventListener("scroll", ev => {
        // const togBgDom = document.querySelector(".top-bg");
        // const headHeight = 45;
        // const scrollTop = togBgDom.getBoundingClientRect().top;
        // const bgHeight = togBgDom.getBoundingClientRect().height;
        // if (Math.abs(scrollTop) > bgHeight - headHeight) {
        //   this.fixedTop = true;
        // } else {
        //   this.fixedTop = false;
        // }

        const documentScrollTop = document.documentElement.scrollTop;
        this.fixedDoc = documentScrollTop > 22 * 16;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.post-detail-container {
  .top-bg {
    height: 28rem;
    overflow: hidden;
    // display: flex;
    // align-items: center;
    position: relative;
    @include mobile() {
      height: 18rem;
    }
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
    }
    &.fixed-top {
      // position: fixed;
      // top: -22.2rem;
      // left: 0;
    }

    picture,
    img {
      width: 100%;
      height: auto;
      margin-bottom: 3rem;
    }

    .head-tit {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%);
      text-align: center;
      font-size: 2.4rem;
      color: #eaeaea;
      text-align: right;
      -webkit-font-smoothing: antialiased;
    }

    .post-cover {
      background-size: cover;
      background-repeat: no-repeat;
    }

    .post-info {
      width: 45%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 4rem;
      color: $white1;
      text-align: left;

      @include mobile() {
        width: 100%;
        padding: 0 1rem;
        bottom: 2rem;
      }

      .post-title {
        text-shadow: 2px 2px 10px #000;

        @include mobile() {
          font-size: 1.625rem;
        }
      }

      .post-meta {
        margin-top: 1.5rem;

        span {
          margin-right: 1rem;
          text-shadow: 2px 2px 10px #000;
        }
        @include mobile() {
          font-size: 0.825rem;
          // font-family: 'Merriweather Sans',Helvetica,Tahoma,Arial,'PingFang SC','Hiragino Sans GB','Microsoft Yahei','WenQuanYi Micro Hei',sans-serif;
        }
      }
    }
  }

  .post-wrap {
    margin-top: 3rem;

    @include mobile() {
      margin-top: 2rem;
    }

    .post-main {
      max-width: 58rem;
      margin: 0 auto;
      position: relative;

      @include mobile() {
        padding: 0 1rem;
      }
    }

    .toc-wrap {
      position: absolute;
      top: 0;
      right: calc((100% - 928px - 550px)/2);
      &.fixed {
        position: fixed;
        top: 5rem;
      }
      .toc-list {
        list-style-type: none;
        position: relative;
        overflow: hidden;
        padding-left: 1rem;
        .toc-list-item {
          a {
            font-size: 1.1rem;
            color: rgb(102, 102, 102);
            font-weight: normal;
            height: 100%;
            &::before {
              content: '';
              background-color: #eee;
              display: inline-block;
              height: inherit;
              position: absolute;
              left: 0;
              width: 2px;
            }
          }
        }
      }
    }
  }
}

.post-context {
  margin-top: 4rem;

  @include mobile() {
    flex-direction: column;
    margin-top: 2rem;
  }

  .nuxt-link {
    flex: 1;

    // @include mobile() {
    //   flex-grow: 1;
    //   flex: none;
    // }
    .post-squares {
      max-height: 9rem;
      padding: 2rem;
      position: relative;
      overflow: hidden;

      &:hover {
        &::before {
          background: rgba(0, 0, 0, 0.4);
        }
      }

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
      }

      @include mobile() {
        padding: 1rem;
      }

      .picture {
        position: absolute;
        inset: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
      }

      .text-info {
        position: relative;
        z-index: 5;
        color: #fff;
      }

      .tit1 {
        margin-bottom: 1rem;
      }

      .tit2 {
        margin-bottom: 1rem;
      }
    }
  }
}

// Markdown theme css
.post-body {
  ::v-deep.v-md-editor-preview {
    & > div {
      @include background_color("bg-color");
      @include theme_transition(background);
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    em,
    blockquote,
    th,
    td,
    hr,
    p,
    li {
      @include font_color("post-level-title");
      @include theme_transition();
    }
    p > code {
      @include background_color("single-code");
      @include font_color("post-level-title");
      @include theme_transition();
    }
    // h1,
    // h2,
    // h3,
    // h4,
    // h5,
    // h6 {
    //   // @include border_color("md-level-border");
    // }
  }
}
</style>

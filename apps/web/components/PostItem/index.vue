<template>
  <div class="post-entry">
    <section
      class="item-post d-flex"
      v-for="(item, index) in postList"
      :key="index"
    >
      <nuxt-link :to="'/post/' + item._id" class="post-cover">
        <img
          class="poster-img"
          :data-src="item.posterUrl"
          style="height: 100%"
          :src="item.posterUrl + '?imageView2/3/w/50|imageMogr2/blur/40x5'"
          :alt="item.title"
        />
        <!-- <progressive-img
          :src="item.posterUrl"
          :placeholder="item.posterUrl + '?imageView2/3/w/50'"
        /> -->
      </nuxt-link>
      <div class="post-wrap">
        <p class="create-time">
          <svg-icon name="time" />发布于：{{ item.createdAt }}
        </p>
        <nuxt-link :to="'/post/' + item._id" class="post-links post-title">
          <h2>{{ item.title }}</h2>
        </nuxt-link>
        <div class="post-meta">
          <span class="item-meta"><svg-icon name="eye" />{{ item.pv }} 热度</span>
          <span class="item-meta"
            ><svg-icon name="heart_hollow" />{{ item.like }} 喜欢</span
          >
          <span class="item-meta">
            <nuxt-link :to="'/post/' + item._id"
              ><svg-icon name="folder" />{{ item.tags && item.tags[0] }}</nuxt-link
            >
          </span>
        </div>
        <p class="post-intro">{{ item.summary }}</p>
        <nuxt-link :to="'/post/' + item._id" class="post-menu m-hidden">
          <svg-icon name="ellipsis"></svg-icon>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    postList: {
      type: Array,
      required: true,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 5
    },
    listNum: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      observer: null
    };
  },
  mounted() {
    this.handleLzay();
  },
  watch: {
    postList() {
      this.$nextTick(() => {
        const posterImg = Array.from(document.querySelectorAll(".poster-img")).slice(this.listNum * -1)
        console.log(posterImg)
        posterImg.forEach(item => {
          this.observer.observe(item);
        });
      });
    }
  },
  methods: {
    handleLzay() {
      const posterImg = document.querySelectorAll(".poster-img");
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            item.target.src = item.target.dataset.src;
            item.target.removeAttribute("data-src");
            this.observer.unobserve(item.target);
          }
        });
      });
      posterImg.forEach(item => {
        this.observer.observe(item);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.post-entry {
  .item-post {
    width: 100%;
    height: 20rem;
    color: #969696;
    margin-bottom: 3rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 20px -8px,
      rgba(0, 0, 0, 0.5) -1px -1px 20px -8px;
    border-radius: 0.5rem;
    text-align: right;
    overflow: hidden;
    @include background_color("post-bg");
    @include theme_transition(background);
    @include mobile(pc) {
      &:nth-of-type(2n) {
        flex-direction: row-reverse;
        text-align: left;
      }
    }
    @include mobile() {
      height: auto;
      flex-direction: column;
    }
  }
}
.post-cover {
  width: 33rem;
  overflow: hidden;
  @include theme_transition(background);
  /deep/ .progressive-image {
    min-height: 100%;
    .progressive-image-main {
      height: 100%;
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  img {
    width: 100%;
    // min-height: 100%;
    transition: all 0.5s ease;
    &:hover {
      transform: scale(1.05);
    }
  }
  @include mobile() {
    width: 100%;
    height: 14rem;
  }
}
.post-wrap {
  width: 26rem;
  padding: 1.8rem 2.4rem;
  @include mobile() {
    width: 100%;
    padding: 0.6rem 1rem;
    text-align: left;
  }
  .svg-icon {
    width: 1rem;
    height: 1rem;
  }
  .create-time {
    font-size: 0.75rem;
    line-height: 2em;
    .svg-icon {
      margin: -0.1rem 0.5rem 0 0;
    }
  }
  .post-title {
    text-decoration: none;
    @include font_color("post-title");
    h2 {
      font-size: 1.3rem;
      line-height: 3rem;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      @include mobile() {
        line-height: 2em;
      }
    }
  }
  .post-meta {
    line-height: 2em;
    @include mobile() {
      line-height: 1.5em;
    }
    .item-meta {
      font-size: 0.75rem;
      margin-right: 1.2rem;
      color: #888;
      @include font_color("post-meta");
      a {
        @include font_color("post-meta");
        &:hover {
          @include themeify {
            color: themed("post-hover") !important;
          }
        }
      }
      .svg-icon {
        margin: -0.1rem 0.3rem 0 0;
      }
    }
  }
  .post-intro {
    min-height: 8rem;
    margin: 0.8rem 0 0.6rem;
    font-size: 1.1rem;
    line-height: 1.5em;
    @include font_color("post-content");
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    @include mobile() {
      min-height: 6rem;
      margin: 0.8rem 0 0.6rem;
    }
  }
  .post-menu {
    .svg-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    @include font_color("post-content");
    &:hover {
      @include themeify {
        color: themed("post-hover") !important;
      }
    }
  }
  .post-links {
    transition: all 0.2s ease;
    &:hover {
      @include themeify {
        color: themed("post-hover") !important;
      }
    }
  }
}
</style>

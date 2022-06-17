<!--  -->
<template>
  <div class="post-container">
    <Banner title="文章" imgName="Attack-on-Titan.jpg" />
    <div class="content d-flex jc-between">
      <div class="post-container">
        <div class="skeleton-wrap" v-if="postSkeleton">
          <PostLoader v-for="item in 3" :key="item" />
        </div>
        <div class="post-list" v-else>
          <PostItem :postList="postList" :listNum="listNum" />
        </div>
        <div class="pagination d-flex jc-center" v-show="!isLastPage">
          <a v-show="!loading" href="javascript:;" class="loading" @click="showMorePost">加载更多</a>
          <SvgIcon v-show="loading" name="loading" />
        </div>
        <!-- <Pagination
          :current-page="postParams.page"
          :page-size="postParams.pageSize"
          :total="postParams.total"
          @current-change="changePage"
        /> -->
      </div>
      <div class="right-container m-hidden">
        <h3 class="r-head d-flex ai-center">
          <svg-icon name="ranking" />排行榜
        </h3>
        <template v-if="!rankingList.length">
          <RankingLoader v-for="item in 8" :key="item" primaryColor="#" />
        </template>

        <div class="ranking-list" v-else>
          <nuxt-link v-for="(item, index) in rankingList" :key="index" class="item-rank" to="post">
            <div class="rank-wrap">
              <div class="blur" :style="{ backgroundImage: `url(${item.cover})` }"></div>
              <div class="ranking-content d-flex ai-center jc-between">
                <div class="post-intro">
                  <p class="title">{{ item.title }}</p>
                  <p class="link">{{ item.link }}</p>
                </div>
                <div class="pic">
                  <img :src="item.cover" :alt="item.title" class="cover" />
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <!-- <h3 class="r-head d-flex ai-center">
          <svg-icon name="tag1" />分 类
        </h3>
        <div class="classification">文章分类</div> -->
        <h3 class="r-head tag d-flex ai-center">
          <svg-icon name="tag1" />标签云
        </h3>
        <div class="tag-list">
          <nuxt-link to="/post?123" v-for="item in tags" :key="item">
            <span class="item-tag">{{ item }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RankingLoader from "@/components/RankingLoader";
import { getPosts } from "@/api/post";
import SvgIcon from "../../components/SvgIcon/index.vue";
import Banner from '@/components/banner'
export default {
  components: {
    RankingLoader,
    SvgIcon,
    Banner
  },
  data() {
    return {
      postList: [],
      rankingList: [],
      tags: [],
      postParams: {
        page: 1,
        pageSize: 5,
        total: 0
      },
      listNum: 5,
      loading: false,
      isLastPage: false,
      postSkeleton: true
    };
  },
  created() {
    // this.postHandle()
    this.postHandle();
    this.rankingHandle();
    this.tagHandle();
  },
  methods: {
    changePage(page) {
      this.postParams.page = page;
      window.scrollTo(0, 0);
      this.postHandle();
    },
    showMorePost() {
      this.postParams.page += 1
      this.postHandle()
    },
    postHandle() {
      // this.postList = [];
      // this.postSkeleton = true;
      this.loading = true
      const { page, pageSize } = this.postParams;
      const params = { page, pageSize };
      getPosts(params)
        .then(res => {
          this.loading = false
          this.postSkeleton = false;
          const { result } = res;
          if (result.items.length > 0) {
            const lastPage = (result.page * result.pageSize) > result.total
            this.listNum = result.items.length
            this.isLastPage = lastPage
            this.postList.push(...result.items);
            this.postParams.total = result.total;
          } else {
            this.listNum = 0
            this.isLastPage = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchRankingList() {
      return new Promise(resolve => {
        setTimeout(() => {
          const data = new Array(7).fill({
            title: "关于我",
            link: "https://www.cyang.com",
            cover: require("@/assets/images/post-cover.jpg")
          });
          resolve(data);
        }, 1000);
      });
    },
    fetchTagList() {
      return new Promise(resolve => {
        setTimeout(() => {
          const tags = [
            "CSS3",
            "CSS",
            "HTML5",
            "GIT",
            "javascript",
            "Web Api",
            "Poem",
            "About Me",
            "正则表达式",
            "大事记",
            "汇率计算器",
            "面试",
            "Music",
            "Vue",
            "ElementUi",
            "VantUi",
            "Nest.js",
            "微信小程序"
          ];
          resolve(tags);
        }, 1000);
      });
    },
    // async postHandle() {
    //   const list = await this.fetchPostData();
    //   this.postList = list;
    // },
    async rankingHandle() {
      const data = await this.fetchRankingList();
      this.rankingList = data;
    },
    async tagHandle() {
      const data = await this.fetchTagList();
      this.tags = data;
    }
  }
};
</script>
<style lang="scss" scope>
.post-container {
  width: 100%;

  // .header-bg {
  //   width: 100vw;
  //   height: 30rem;
  //   overflow: hidden;
  //   display: flex;
  //   align-items: center;
  //   position: relative;
  //   overflow: hidden;

  //   @include mobile() {
  //     height: 17.5rem;
  //     align-items: flex-start;
  //     margin: 0;
  //   }

  //   picture,
  //   img {
  //     width: 100%;
  //     height: auto;
  //     margin-bottom: 3rem;

  //     @include mobile() {
  //       width: 100%;
  //       height: 100%;
  //       margin: 0 auto;
  //     }
  //   }

  //   .head-tit {
  //     position: absolute;
  //     left: 50%;
  //     top: 50%;
  //     transform: translate(-50%);
  //     text-align: center;
  //     font-size: 2.4rem;
  //     color: #eaeaea;
  //     text-align: right;
  //     // color: transparent;
  //     // -webkit-text-fill-color: transparent;
  //     -webkit-font-smoothing: antialiased;

  //     // background: linear-gradient(
  //     //   to left,
  //     //   rgb(241, 241, 240) 33%,
  //     //   rgb(252, 239, 232) 73%
  //     // );
  //     // background-clip: text;
  //     @include mobile() {
  //       font-size: 2rem;
  //       font-weight: 700;
  //     }
  //   }
  // }

  .content {
    width: 85rem;
    margin: 3rem auto 0;

    @include mobile() {
      max-width: 100vw;
      padding: 0 1rem;
    }

    .post-container {
      width: 56rem;

      @include mobile() {
        // width: auto;
      }

      .post-list {
        width: 100%;
      }

      .pagination {
        a {
          padding: 0.8rem 2.1rem;
          border: 1px solid #d6d6d6;
          border-radius: 3.125rem;
          color: #adadad;
          transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;

          &:hover {
            box-shadow: 0 0 4px rgba(255, 165, 0, 0.85);
            border-color: #fe9600;
            color: #fe9600;
          }

          &.loading {
            // background: url('https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/wordpress-rotating-ball-o.svg');
            // background: url('~/assets/svg/wordpress-rotating-ball-o.svg');
            background-position: center;
            background-repeat: no-repeat;
            color: #555;
            // border: none;
            background-size: auto 100%;
          }
        }

        .svg-icon {
          width: 3rem;
          height: 3rem;
        }
      }
    }
  }
}

.r-head {
  width: 20rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed #e6e6e6;
  @include font_color("post-r-text1");
  @include theme_transition(color);
  margin-bottom: 2rem;

  &.tag {
    margin-top: 4rem;
    margin-bottom: 1rem;
  }

  .svg-icon {
    width: 2rem;
    height: 2rem;
    margin-right: 0.8rem;
  }
}

.right-container {
  width: 25rem;
  // margin-left: 4rem;
  // flex-grow: 1;
  overflow: hidden;
}

.ranking-list {
  .rank-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 0.6rem;
    margin-bottom: 1rem;

    .blur {
      filter: blur(5px);
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      inset: 0;
    }
  }
}

.ranking-content {
  padding: 0.9rem;
  // background-color: rgba(245, 245, 245, 0.8);
  @include background_color("ranking-bg");
  @include theme_transition("background");
  position: relative;

  .post-intro {
    .title {
      font-size: 1.2rem;
      @include font_color("post-r-text1");
      @include theme_transition(color);
    }

    .link {
      display: block;
      margin-top: 0.8rem;
      width: 20rem;
      font-size: 1rem;
      line-height: 1.25;
      @include font_color("ranking-link");
      @include theme_transition(color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .cover {
    width: 4rem;
    height: 4rem;
    border-radius: 0.6rem;
    object-fit: cover;
  }
}

.tag-list {
  width: 100%;

  .item-tag {
    display: inline-block;
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
    padding: 0 0.375rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgb(0, 150, 94);
    background-color: rgba(0, 150, 94, 0.1);
    border-radius: 0.1875rem;

    &:hover {
      background-color: rgba(0, 150, 94, 0.2);
    }
  }
}
</style>

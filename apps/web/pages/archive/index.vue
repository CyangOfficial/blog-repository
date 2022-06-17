<template>
  <section id="archive-container">
    <Banner title="归档" imgName="Attack-on-Titan.jpg" />
    <section class="archive-main">
      <template v-for="item in 5">
        <h3 class="year">2022</h3>
        <ul class="month-list">
          <li v-for="(item, index) in 3">
            <span class="month-tit">0{{ index + 1 }}月(2篇文章)</span>
            <ul class="month-post-list">
              <li v-for="(item, index) in 2">
                <a href="/archive" class="title"><span class="day">0{{ index + 1 }}日</span>解决移动端浏览器 vh 单位异常问题(10PV)</a>
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </section>
  </section>
</template>

<script>
import Banner from '@/components/banner'
export default {
  name: "Archive",
  component: [
    Banner
  ],
  data() {
    return {};
  },
  methods: {
    fetchArchiveData() {
      return new Promise((resolve, reject) => {
        // const data = 
      })
    },
  }
};
</script>

<style lang="scss" scope>
#archive-container {
  .archive-main {
    max-width: 45rem;
    margin: 0 auto;

    @include mobile() {
      width: 100vw;
      padding: 0 1.5rem;
      box-sizing: border-box;
    }

    .year {
      font-size: 2rem;
      margin-left: 6.7rem;
      @include font_color("post-content");
      @include theme_transition(color);

      @include mobile() {
        margin-left: 5.5rem;
        font-size: 1.8rem;
      }
    }

    .month-list {
      position: relative;
      background: transparent;
      margin: 0.5rem 0;

      li {
        margin-bottom: 0.5rem;
        @include mobile() {
          &:last-child ul li:last-child {
            margin: 0;
          }
        }
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 9rem;
        width: 4px;
        height: 100%;
        background: rgb(110, 202, 245);
        z-index: 0;
      }

      @include mobile() {
        &::after {
          left: 7.5rem;
        }
      }

      .month-tit {
        display: block;
        @include font_color("post-content");
        @include theme_transition(color);
        position: relative;
        font-size: 1.2rem;
        font-weight: bold;
        top: 1rem;
        margin: 0.5rem 0 1.5rem;
        overflow: hidden;
        line-height: 1.8;

        @include mobile() {
          font-size: 1rem;
          margin: 0.8rem 0 1.5rem;
        }

        &::before {
          content: "";
          position: absolute;
          top: 0.6rem;
          left: 8.64rem;
          width: 1rem;
          height: 1rem;
          background: rgb(110, 202, 245);
          border-radius: 50%;
          z-index: 2;

          @include mobile() {
            width: 0.8rem;
            height: 0.8rem;
            left: 7.24rem;
          }
        }

        &::after {
          content: "";
          position: absolute;
          box-shadow: 1px 1px 1px #bbb;
          top: 0.4rem;
          left: 8.42rem;
          width: 1.4rem;
          height: 1.4rem;
          background: #fff;
          border-radius: 50%;
          z-index: 1;

          @include mobile() {
            width: 1.2rem;
            height: 1.2rem;
            left: 7rem;
          }
        }


      }

      .month-post-list {
        // will-change: transform;
        // transition: all 1s linear 0s;
        position: relative;
        z-index: 1;

        li {
          padding-left: 10rem;
          line-height: 2.4;
          position: relative;
          font-size: 1.1rem;

          @include mobile() {
            padding-left: 8.7rem;
            font-size: 0.9rem;

            &:last-child {
              margin-bottom: -0.8rem;
            }
          }

          &::before {
            content: "";
            position: absolute;
            left: 8.77rem;
            top: 1rem;
            width: 0.7rem;
            height: 0.7rem;
            background: rgb(110, 202, 245);
            border-radius: 50%;
            z-index: 1;

            @include mobile() {
              width: 0.55rem;
              height: 0.55rem;
              left: 7.37rem;
              top: 0.4rem;
            }
          }

          &::after {
            content: "";
            position: absolute;
            top: 0.8rem;
            left: 8.54rem;
            width: 1.1rem;
            height: 1.1rem;
            background: #fff;
            border-radius: 50%;
            box-shadow: 1px 1px 1px #bbb;
            z-index: 0;

            @include mobile() {
              width: 0.9rem;
              height: 0.9rem;
              left: 7.18rem;
              top: 0.24rem;
            }
          }
        }

        .day {
          display: inline-block;
          margin-right: 0.5rem;
          font-weight: bold;
          color: rgb(110, 202, 245);
        }

        .title {
          display: inline-block;
          font-weight: 500;
          line-height: 1.5;
          @include font_color("post-content");
          @include theme_transition(color);

          &:hover {
            color: rgb(255, 165, 0) !important;
          }
        }

      }
    }
  }
}
</style>

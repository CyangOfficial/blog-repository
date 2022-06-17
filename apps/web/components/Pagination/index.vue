<template>
  <div class="pagination-container d-flex">
    <button
      @click="handleChangePage(internalCurrentPage - 1)"
      class="btn prev-btn"
    >
      <SvgIcon name="arrow" />
    </button>
    <ul class="pager d-flex">
      <li
        @click="handleChangePage(1)"
        class="number"
        :class="{ active: internalCurrentPage === 1 }"
      >
        1
      </li>
      <li v-if="showPrevMore" class="more">...</li>
      <li
        class="number"
        :class="{ active: page === internalCurrentPage }"
        @click="handleChangePage(page)"
        v-for="page in pagers"
      >
        {{ page }}
      </li>
      <li v-if="showNextMore" class="more">...</li>
      <li
        class="number"
        @click="handleChangePage(pageCount)"
        :class="{ active: internalCurrentPage === pageCount }"
      >
        {{ pageCount }}
      </li>
    </ul>
    <button
      @click="handleChangePage(internalCurrentPage + 1)"
      class="btn next-btn"
    >
      <SvgIcon name="arrow" />
    </button>
  </div>
</template>
<script>
import SvgIcon from "../SvgIcon/index.vue";
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    // 每页显示个数
    pageSize: {
      type: Number,
      default: 0
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: 1
    },
    // 最大页码按钮数
    pagerCount: {
      type: Number,
      default: 7
    }
  },
  watch: {
    currentPage(n, o) {
      n !== o && (this.internalCurrentPage = n);
    },
    pageSize(n, o) {
      n !== o && (this.pageCount = Math.ceil(this.total / this.pageSize));
    },
    // pagerCount(n, o) {
    //   n !== o && (this.pagerCount = n)
    // },
    total(n, o) {
      n !== o && (this.pageCount = Math.ceil(this.total / this.pageSize));
    }
  },
  computed: {
    pagers() {
      const total = Number(this.total);
      const pageSize = Number(this.pageSize);
      const currentPage = Number(this.internalCurrentPage);
      // 最大页码按钮数
      const pagerCount = Number(this.pagerCount);
      const halfPagerCount = (pagerCount - 1) / 2;
      let showPrevMore = false;
      let showNextMore = false;
      // 总页数
      this.pageCount = Math.ceil(total / pageSize);
      if (this.pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true;
        }
        if (currentPage < this.pageCount - halfPagerCount) {
          showNextMore = true;
        }
      }
      this.showPrevMore = showPrevMore;
      this.showNextMore = showNextMore;
      const pageArr = [];
      if (showPrevMore && !showNextMore) {
        const startPage = this.pageCount - (pagerCount - 2);
        for (let i = startPage; i < this.pageCount; i++) {
          pageArr.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          pageArr.push(i);
        }
      } else if (showPrevMore && showNextMore) {
        const offsetPage = Math.floor(pagerCount / 2) - 1;
        const startPage = currentPage - offsetPage;
        const endPage = currentPage + offsetPage;
        for (let i = startPage; i <= endPage; i++) {
          pageArr.push(i);
        }
      } else {
        for (let i = 2; i < this.pageCount; i++) {
          pageArr.push(i);
        }
      }
      return pageArr;
    }
  },
  data() {
    return {
      showPrevMore: false,
      showPrevMore: false,
      internalCurrentPage: 1,
      pageCount: 0
    };
  },
  methods: {
    handleChangePage(page) {
      const newPage = Number(page);
      if (this.internalCurrentPage != newPage) {
        this.internalCurrentPage = newPage;
        if (newPage < 1) {
          this.internalCurrentPage = 1;
          return
        } else if (newPage > this.pageCount) {
          this.internalCurrentPage = this.pageCount;
          return
        }
        this.$emit("current-change", newPage);
      }
    }
  },
  components: { SvgIcon }
};
</script>
<style lang="scss">
.pagination-container {
  .pager {
    margin: 0 0.37rem;
    li {
      list-style: none;
      border-radius: 50%;
      margin: 0 0.2rem;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      user-select: none;
      cursor: pointer;
      border: 1px solid #dfdfdf;
      @include background_color("pagination-bg");
      @include font_color("pagination-color");
      @include theme_transition();
      &:hover {
        background-color: rgb(22, 22, 22);
      }
      &.active {
        @include background_color("pagination-active-bg");
        @include font_color("pagination-active-color");
        // color: #fff;
        border-color: rgba(65, 96, 250, 0.5) !important;
      }
    }
  }
  .btn {
    border: none;
    cursor: pointer;
    user-select: none;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid #dfdfdf;
    @include background_color("pagination-bg");
    @include font_color("pagination-color");
    @include theme_transition();
    &.next-btn {
      transform: rotate(180deg);
    }
    &:hover {
      background-color: #dfdfdf;
    }
  }
}
</style>

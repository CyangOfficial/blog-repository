<template>
  <div id="banner-container">
    <picture>
      <!-- <source type="image/webp" srcset="@/assets/images/wallhaven.webp" /> -->
      <img :src="require('@/assets/images/' + imgName)" :alt="title" />
    </picture>
    <h2 class="head-tit">{{ formatTitle }}</h2>
  </div>
</template>

<script>

export default {
  name: 'Banner',
  props: {
    title: {
      type: String,
      default: '文章'
    },
    imgName: {
      type: String,
      default: ''
    }
  },
  computed: {
    formatTitle() {
      return this.title.split('').join(' ')
    },
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
#banner-container {
  width: 100vw;
  height: 32rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 4rem;

  @include mobile() {
    width: 100%;
    height: 100%;
    height: 17.5rem;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  picture {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.head-tit {
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%);
  text-align: center;
  font-size: 2.4rem;
  color: #eaeaea;
  text-align: right;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  @include mobile() {
    font-size: 2rem;
    font-weight: 700;
  }
}
</style>

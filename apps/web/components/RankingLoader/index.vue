<template>
  <div class="ranking-loader-wrap">
    <client-only>
      <ContentLoader :width="500" :height="96" :primaryColor="primaryColor" :secondaryColor="secondaryColor">
        <rect x="15" y="25" rx="3" ry="3" width="100" height="15" />
        <rect x="15" y="60" rx="3" ry="3" width="200" height="15" />
        <rect x="410" y="16" rx="6" ry="6" width="70" height="70" />
      </ContentLoader>
    </client-only>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      isMobile() {
        return this.$store.state.isMobile
      },
      primaryColor() {
        return this.$store.state.blogTheme === "default-theme" ? "#EDEDED" : "#2A2C2D"
      },
      secondaryColor() {
        return this.$store.state.blogTheme === "default-theme" ? "#E7E7E7" : "#3e4041"
      },
    },
    methods: {},
  }

</script>
<style lang='scss' scoped>
  .ranking-loader-wrap {
    box-shadow: rgba(150, 150, 150, 0.5) 0px 1px 20px -8px;
    margin-bottom: 3rem;
    background-color: #F4F4F4;
  }

</style>

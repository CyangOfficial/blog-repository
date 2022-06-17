<template>
  <div class="post-loader-wrap">
    <div class="pc-loader" v-if="!isMobile">
      <ContentLoader
        :width="944"
        :height="320"
        :primaryColor="primaryColor"
        :secondaryColor="secondaryColor"
      >
        <rect x="0" y="0" rx="3" ry="3" width="528" height="330" />
        <rect x="750" y="28" rx="3" ry="3" width="160" height="18" />
        <rect x="660" y="70" rx="3" ry="3" width="250" height="20" />
        <rect x="660" y="110" rx="3" ry="3" width="70" height="12" />
        <rect x="750" y="110" rx="3" ry="3" width="70" height="12" />
        <rect x="840" y="110" rx="3" ry="3" width="70" height="12" />
        <rect x="570" y="150" rx="3" ry="3" width="340" height="12" />
        <rect x="570" y="170" rx="3" ry="3" width="340" height="12" />
        <rect x="570" y="190" rx="3" ry="3" width="340" height="12" />
        <rect x="570" y="210" rx="3" ry="3" width="340" height="12" />
        <rect x="570" y="230" rx="3" ry="3" width="340" height="12" />
        <rect x="860" y="280" rx="3" ry="3" width="50" height="12" />
      </ContentLoader>
    </div>
    <div class="m-loader" v-else>
      <ContentLoader
        :width="1024"
        :height="1150"
        :primaryColor="primaryColor"
        :secondaryColor="secondaryColor"
      >
        <rect x="0" y="0" rx="3" ry="3" width="1024" height="560" />
        <rect x="50" y="600" rx="3" ry="3" width="300" height="22" />
        <rect x="50" y="680" rx="3" ry="3" width="400" height="30" />
        <rect x="50" y="760" rx="3" ry="3" width="120" height="20" />
        <rect x="190" y="760" rx="3" ry="3" width="120" height="20" />
        <rect x="330" y="760" rx="3" ry="3" width="120" height="20" />
        <rect x="50" y="870" rx="3" ry="3" width="700" height="22" />
        <rect x="50" y="940" rx="3" ry="3" width="700" height="22" />
        <rect x="50" y="1000" rx="3" ry="3" width="700" height="22" />
        <rect x="50" y="1060" rx="3" ry="3" width="700" height="22" />
      </ContentLoader>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isMobile() {
      return this.$store.state.isMobile;
    },
    primaryColor() {
      return this.$store.state.blogTheme === "default-theme"
        ? "#f3f3f3"
        : "#2A2C2D";
    },
    secondaryColor() {
      return this.$store.state.blogTheme === "default-theme"
        ? "#ecebeb"
        : "#3e4041";
    }
  }
};
</script>
<style lang="scss">
.post-loader-wrap {
  box-shadow: rgba(150, 150, 150, 0.5) 0px 1px 20px -8px;
  margin-bottom: 3rem;
}
</style>

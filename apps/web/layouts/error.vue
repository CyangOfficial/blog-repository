<template>
  <main id="error-container">
    <SvgIcon name="error_404" />
  </main>
</template>

<script>
import SvgIcon from "../components/SvgIcon/index.vue";
export default {
  name: "BlogError",
  layout: "error",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  components: { SvgIcon }
};
</script>

<style lang="scss" scope>
#error-container {
  height: 100vh;
  padding-top: 4.5rem;
  .svg-icon {
    width: 100%;
    height: 100%;
  }
}
</style>

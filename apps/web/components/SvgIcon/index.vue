<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    },
    svgClass () {
      return this.name ? `svg-icon icon-${this.name}` : 'svg-icon'
    }
  }
}
</script>
<style lang='scss'>
.svg-icon {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
  color: inherit;
  display: inline-block
}
</style>
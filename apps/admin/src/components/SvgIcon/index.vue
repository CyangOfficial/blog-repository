<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const iconName = computed(() => `#icon-${props.name}`)
    const svgClass = computed(() => {
      if (props.name) {
        return `svg-icon icon-${props.name}`
      }
      return 'svg-icon'
    })

    return {
      iconName,
      svgClass
    }
  }
}
</script>

<style lang="scss" scope>
.svg-icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
  color: inherit;
}
</style>

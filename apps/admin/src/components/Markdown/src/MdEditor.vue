<template>
  <VueMarkdownEditor v-model="mdVal" height="400px" />
</template>

<script lang="ts">
  // import '@kangc/v-md-editor/lib/theme/style/vuepress';
  import { defineComponent, ref } from 'vue';
  import VueMarkdownEditor from '@kangc/v-md-editor';
  export default defineComponent({
    components: {
      VueMarkdownEditor,
    },
    inheritAttrs: false,
    props: {
      value: { type: String, default: '' },
    },
    setup() {
      const mdVal = ref('');

      return {
        mdVal,
      };
    },
  });
</script>

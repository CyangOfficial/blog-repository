<!--  -->
<template>
  <div class="editor-container">
    <v-md-editor
      v-model="postContent"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      height="500px"
      :left-toolbar="leftToolBar"
    ></v-md-editor>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { inject, nextTick } from "vue";
import { useStore } from "vuex";
export default {
  name: "VueEditor",
  components: {},
  setup() {
    const store = useStore();
    const postContent = inject('postContent')
    const leftToolBar = ref(
      "undo redo clear | tip h bold italic strikethrough quote | ul ol table hr | link emoji image code | todo-list | save"
    ); 
    const handleUploadImage = async (event, insertImage, files) => {
      if (files.length > 1) {
        Msg.error("仅支持单张上传");
      }
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      const result = await store.dispatch("app/uploadPicture", files[0]);
      if (!result) return;
      // 此处只做示例
      insertImage({
        url: result.url,
        desc: result.name,
        width: "auto",
        height: "auto",
      });
    };
    // const mermaidSrc = import('@/')
    const loadMermaid = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/public/javascript/v-m-editor/mermaid.min.js";
      console.log(script);
      nextTick(() => {
        document.body.appendChild(script);
      });
    };
    // created(loadMermaid)
    return {
      postContent,
      leftToolBar,
      handleUploadImage,
    };
  },
};
</script>
<style lang='scss'>
</style>

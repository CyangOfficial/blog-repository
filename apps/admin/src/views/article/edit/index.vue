<template>
  <div class="create-article-container">
    <el-form
      :hide-required-asterisk="true"
      label-width="100px"
      :model="formModel"
    >
      <el-form-item label="封面：">
        <el-upload
          class="avatar-uploader"
          accept="jpeg,jpg,png,gif"
          action=""
          :show-file-list="false"
          :http-request="uploadImage"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar-img" />
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input
          size="small"
          style="width: 300px"
          placeholder="请输入标题"
          v-model="formModel.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input
          style="width: 400px"
          type="textarea"
          :rows="3"
          placeholder="请输入摘要"
          v-model="formModel.summary"
        ></el-input>
      </el-form-item>
      <el-form-item class="tags-wrap" label="标签：">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="deleteTag(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="tagValue"
          class="input-new-tag"
          size="mini"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button
        >
      </el-form-item>
      <el-form-item label="内容：">
        <vue-editor />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishHandle">发布</el-button>
        <el-button type="info">保存至草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs, ref, inject, provide, nextTick } from "vue";
import VueEditor from "@/components/vue-editor";
import { useStore } from "vuex";
import { createPost } from '@/api/article'
export default {
  name: "Create",
  components: {
    VueEditor,
  },
  setup() {
    const Msg = inject("$message");
    const avatarUrl = ref("");
    const store = useStore();
    const postContent = ref("");
    provide("postContent", postContent);
    const state = reactive({
      formModel: {
        title: "",
        summary: "",
      },
      uploadImage: async (params) => {
        const { file } = params;
        const result = await store.dispatch("app/uploadPicture", file);
        avatarUrl.value = result?.url || "";
      },
      publishHandle() {
        const params = {
          title: state.formModel.title,
          summary: state.formModel.summary,
          content: postContent.value,
          posterUrl: avatarUrl.value,
          tags: tagState.dynamicTags,
          lastModifiedDate: new Date(),
          isPublic: true
        }
        createPost(params).then(res => {
          if (res.code === 0) {
            Msg.success('发布成功')
          }
        })
      },
    });
    
    // tags标签数据
    const tagState = reactive({
      dynamicTags: [],
      inputVisible: false,
      saveTagInput: "",
      tagValue: "",
      deleteTag(tag) {
        tagState.dynamicTags.splice(tagState.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        tagState.inputVisible = true;
        nextTick((_) => {
          tagState.saveTagInput.input.focus();
        });
      },
      handleInputConfirm() {
        const tagValue = tagState.tagValue;
        if (tagValue) {
          tagState.dynamicTags.push(tagValue);
        }
        tagState.inputVisible = false;
        tagState.tagValue = "";
      },
    });
    return {
      ...toRefs(state),
      ...toRefs(tagState),
      avatarUrl,
    };
  },
};
</script>
<style lang='scss' scoped>
.create-article-container {
  background-color: #fff;
  padding: 20px;
  height: 100%;
}

// 头像框样式
/deep/ .avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    height: 110px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 220px;
    height: 100%;
    text-align: center;
  }
  .avatar-uploader-icon svg {
    // margin-top: 74px; /* (178px - 28px) / 2 - 1px */
  }
  .avatar-img {
    width: 220px;
    height: 100%;
    display: block;
  }
}
// 标签样式
/deep/ .tags-wrap {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>

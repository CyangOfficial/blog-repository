<template>
  <div class="article-list-container">
    <div class="table-menu-panel">
      <div class="left-menu">
        <el-form :inline="true">
          <el-form-item>
            <el-input
              size="small"
              v-model="words"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary"
              ><i class="el-icon-search"></i> 查询</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary"
              ><i class="el-icon-plus"></i> 添加</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-panel">
      <el-table
        :loading="tableLoading"
        :header-cell-style="{ 'background-color': '#F5F7FA' }"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="标题" width="120">
          <template #default="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="摘要" width="120">
          <template #default="{ row }">
            <p>{{ row.summary }}</p>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="200">
          <template #default="{ row }">
            <span>{{
              fmtDate(row.createdAt).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新日期" width="200">
          <template #default="{ row }">
            <span>{{
              fmtDate(row.updatedAt).format("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面" width="180">
          <template #default="{ row }">
            <el-image
              style="width: 150px; height: 80px"
              :src="row.posterUrl"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="喜欢" width="100">
          <template #default="{ row }">
            <p>{{ row.like }}</p>
          </template>
        </el-table-column>
        <el-table-column label="点击量" width="100">
          <template #default="{ row }">
            <p>{{ row.pv }}</p>
          </template>
        </el-table-column>
        <el-table-column label="是否公开">
          <template #default="{ row }">
            <el-switch
              v-model="row.isPublic"
              :loading="statusLoading"
              @change="changeStatus(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <span style="display: none">{{ row.title }}</span>
            <el-icon :size="20">
              <edit />
            </el-icon>
            <!-- <i
              style="margin-right: 10px; font-size: 18px"
              class="el-icon-edit"
            ></i>
            <i style="font-size: 18px" class="el-icon-delete"></i> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs, onMounted, computed } from "vue";
import avatar from "@/assets/images/avatar.jpg";
import { getPosts, toogleStatus } from "@/api/article";
import formatDate from "dayjs";
export default {
  name: "List",
  setup() {
    const Msg = inject("$message");
    const state = reactive({
      isPublic: false,
      tableLoading: false,
      statusLoading: false,
      words: "",
      tableData: [
        {
          title: "test1",
          createdAt: "2016-05-02",
          lastModifiedDate: "2021-07-15",
          summary: "上海市普陀区金沙江路 1518 弄",
          like: 50,
          pv: 20,
          isPublic: true,
        },
        {
          title: "test2",
          createdAt: "2016-05-04",
          lastModifiedDate: "2021-07-15",
          summary: "上海市普陀区金沙江路 1517 弄",
          like: 20,
          pv: 53,
          isPublic: true,
        },
        {
          title: "test3",
          createdAt: "2016-05-01",
          lastModifiedDate: "2021-07-15",
          summary: "上海市普陀区金沙江路 1519 弄",
          like: 30,
          pv: 15,
          isPublic: true,
        },
        {
          title: "test4",
          createdAt: "2016-05-03",
          lastModifiedDate: "2021-07-15",
          summary: "上海市普陀区金沙江路 1516 弄",
          like: 10,
          pv: 50,
          isPublic: true,
        },
      ],
    });

    // 获取列表数据
    const postRequest = () => {
      state.tableLoading = true;
      getPosts().then((res) => {
        state.tableLoading = false;
        if (res.code === 0) {
          state.tableData = res.data;
        }
      });
    };

    // 公开状态切换
    const changeStatus = (row) => {
      state.statusLoading = true;
      const { _id, isPublic } = row;
      const params = { _id, isPublic };
      toogleStatus(params).then((res) => {
        state.statusLoading = false;
        if (res.code === 0) {
          const { data } = res;
          const postIdx = state.tableData.findIndex(
            (item) => item._id === data._id
          );
          state.tableData[postIdx].updatedAt = data.updatedAt;
          Msg.success(res.message);
        } else {
          Msg.error(res.message);
        }
      });
    };

    onMounted(() => {
      postRequest();
    });

    // 日期格式化
    const fmtDate = computed(() => formatDate);

    return {
      ...toRefs(state),
      avatar,
      fmtDate,
      changeStatus,
    };
  },
};
</script>
<style lang='scss' scoped>
.article-list-container {
  padding: 20px;
  background-color: #fff;

  .table-menu-panel {
    // padding: 10px 0;
  }

  .table-panel {
  }
}
</style>

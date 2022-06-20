<template>
  <div class="p-4">
    <BasicForm
      :labelWidth="100"
      :schemas="schemas"
      :actionColOptions="{ span: 24 }"
      @submit="handleSubmit"
    />
    <BasicTable
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #id="{ record }">ID: {{ record.posterUrl }}</template>
      <template #tags="{ text: tags }">
        <Tag v-for="tag in tags" :key="tag" color="green">{{ tag }}</Tag>
      </template>
      <template #posterUrl="{ text: url }">
        <Image class="post-poster" :width="150" :height="70" :src="url" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { Tag, Image } from 'ant-design-vue';
  import { postListApi } from '/@/api/request/post';
  import { FormSchema, BasicForm } from '/@/components/Form';
  import moment from 'moment';
  const columns: BasicColumn[] = [
    {
      title: 'ID',
      dataIndex: '_id',
      slots: { customRender: '_id' },
    },
    {
      title: '开始时间',
      dataIndex: 'createdAt',
      customRender: ({ text }) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '结束时间',
      dataIndex: 'updatedAt',
      customRender: ({ text }) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      slots: { customRender: 'tags' },
    },
    {
      title: '标题',
      dataIndex: 'title',
      // width: 140,
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      // width: 140,
    },
    {
      title: '封面',
      dataIndex: 'posterUrl',
      width: 250,
      slots: { customRender: 'posterUrl' },
    },
    {
      title: '浏览量',
      dataIndex: 'pv',
      slots: { customRender: 'pv' },
    },
    {
      title: '点赞',
      dataIndex: 'like',
      slots: { customRender: 'like' },
    },
  ];
  export default defineComponent({
    components: { BasicTable, Tag, Image, BasicForm },
    setup() {
      const checkedKeys = ref<Array<string | number>>([]);
      const onSelectChange = (keys) => {
        checkedKeys.value = keys;
      };
      const schemas: FormSchema[] = [
        {
          field: 'field',
          component: 'Input',
          label: '搜索',
          colProps: {
            span: 4,
            xl: 12,
            xxl: 8,
          },
          defaultValue: 'default',
          slot: 'abc',
          componentProps: {
            placeholder: '请输入关键字',
            onChange: (e) => {
              console.log(e);
            },
          },
        },
      ];
      const [registerTable] = useTable({
        title: '自定义列内容',
        titleHelpMessage: '表格中所有头像、图片均为mock生成，仅用于演示图片占位',
        api: postListApi,
        columns: columns,
        bordered: true,
        useSearchForm: false,
        formConfig: {
          labelWidth: 100,
          schemas,
        },
        tableSetting: { fullScreen: true },
        showTableSetting: true,
      });
      // setTableData([a: 1])

      const handleSubmit = () => {}

      return {
        schemas,
        registerTable,
        checkedKeys,
        onSelectChange,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less">
  .form-contrl {
    background-color: #fff;
    // &[data-theme='dark'] {
    //   background-color: #262626;
    // }
  }
  .ant-image {
    .post-poster {
      // object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
</style>

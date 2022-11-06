export default {
  size: 'small',
  expand: false,
  index: true,
  border: true,
  selection: true,
  column: [
    {
      label: "主键",
      prop: "id",
      display: false,
      hide: true,
    },
    {
      label: "模板名称",
      prop: "name",
    },
    {
      label: "页面分类",
      prop: "type",
    },
    {
      label: "图片",
      prop: "image",
    },
    {
      label: "备注",
      prop: "memo",
    },
    {
      label: "状态",
      prop: "status",
    },
    {
      label: "适用平台",
      prop: "platform",
    },
     
  ]
}

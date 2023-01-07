export default {
  size: 'small',
  maxHeight: 500,
  fit: true,
  stripe: false,
  border: true,
  expand: false,
  index: true,
  selection: true,
  column: [
    {
      label: "分类",
      prop: "name",
      hide: false,
      width: "200"
    },
    {
      label: "栏目类型",
      prop: "type",
      hide: false,
    },
    {
      label: "描述",
      prop: "description",
      hide: false,
    },
    {
      label: "状态",
      prop: "status",
      hide: true,
    },
  ]
}

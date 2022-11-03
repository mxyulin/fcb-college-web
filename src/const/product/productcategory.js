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
      label: "",
      prop: "name",
    },
    {
      label: "栏目类型",
      prop: "type",
      hide: true,
    },
    {
      label: "图片",
      prop: "image",
    },
    {
      label: "父ID",
      prop: "pid",
    },
    {
      label: "权重",
      prop: "weigh",
      hide: true,
    },
    {
      label: "描述",
      prop: "description",
      hide: true,
    },
    {
      label: "状态",
      prop: "status",
      hide: true,
    },
    {
      label: "创建人",
      prop: "createUser",
      display: false,
      hide: true,
    },
    {
      label: "创建部门",
      prop: "createDept",
      display: false,
      hide: true,
    },
    {
      label: "创建时间",
      prop: "createTime",
      display: false,
      hide: true,
    },
    {
      label: "修改人",
      prop: "updateUser",
      display: false,
      hide: true,
    },
    {
      label: "修改时间",
      prop: "updateTime",
      display: false,
      hide: true,
    },
  ]
}

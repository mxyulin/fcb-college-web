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
      search: true,
    },
    {
      label: "租户ID",
      prop: "tenantId",
      search: true,
    },
    {
      label: "动态筛选",
      prop: "dynamic",
    },
    {
      label: "分销商",
      prop: "name",
    },
    {
      label: "内容",
      prop: "content",
    },
    {
      label: "操作人类型",
      prop: "operType",
      search: true,
    },
    {
      label: "操作人",
      prop: "operId",
      display: false,
      hide: true,
    },
    {
      label: "操作人",
      prop: "createUser",
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
      search: true,
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
      search: true,
    },
    {
      label: "状态",
      prop: "status",
    },
    {
      label: "是否已删除",
      prop: "isDeleted",
    },
  ]
}

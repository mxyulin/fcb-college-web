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
      label: "租户ID",
      prop: "tenantId",
      display: false,
      hide: true,
    },
    {
      label: "附件地址",
      prop: "link",
      display: false,
      hide: true,
    },
    {
      label: "附件域名",
      prop: "domainUrl",
      display: false,
      hide: true,
    },
    {
      label: "附件名称",
      prop: "name",
      span: 24,
    },
    {
      label: "附件原名",
      prop: "originalName",
      display: false,
      hide: true,
    },
    {
      label: "附件拓展名",
      prop: "extension",
    },
    {
      label: "附件大小",
      prop: "attachSize",
      display: false,
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
      display: false,
      hide: true,
    },
    {
      label: "状态",
      prop: "status",
      display: false,
      hide: true,
    },
    {
      label: "是否已删除",
      prop: "isDeleted",
      display: false,
      hide: true,
    },
  ]
}

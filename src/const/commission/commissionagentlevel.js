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
    },
    {
      label: "租户ID",
      prop: "tenantId",
    },
    {
      label: "权重等级",
      prop: "level",
    },
    {
      label: "等级名称",
      prop: "name",
    },
    {
      label: "等级徽章",
      prop: "levelbadge",
    },
    {
      label: "一级佣金比例",
      prop: "firstproportion",
    },
    {
      label: "二级佣金比例",
      prop: "twoproportion",
    },
    {
      label: "三级佣金比例",
      prop: "threeproportion",
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
    {
      label: "状态",
      prop: "status",
      display: false,
      hide: true,
    },
    {
      label: "是否已删除",
      prop: "isDeleted",
    },
  ]
}

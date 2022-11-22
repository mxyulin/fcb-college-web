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
      label: "商品名称",
      prop: "producctId",
      search: true,
    },
    {
      label: "独立设置佣金:0=否,1=是",
      prop: "selfRules",
    },
    {
      label: "商品信息",
      prop: "commissionRules",
    },
    {
      label: "独立佣金规则",
      prop: "commissionConfig",
    },
    {
      label: "是否计入业绩:0=否,1=是",
      prop: "commissionOrderStatus",
    },
    {
      label: "创建人",
      prop: "createUser",
    },
    {
      label: "分销状态",
      prop: "createDept",
      search: true,
    },
    {
      label: "创建时间",
      prop: "createTime",
    },
    {
      label: "商品分类",
      prop: "updateUser",
      search: true,
    },
    {
      label: "活动类型",
      prop: "updateTime",
      search: true,
    },
    {
      label: "分销规则",
      prop: "status",
      search: true,
    },
    {
      label: "是否已删除",
      prop: "isDeleted",
    },
  ]
}

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
      label: "团长",
      prop: "userId",
    },
    {
      label: "商品",
      prop: "goodsId",
    },
    {
      label: "活动",
      prop: "activityId",
    },
    {
      label: "成团人数",
      prop: "num",
    },
    {
      label: "当前人数",
      prop: "currentNum",
    },
    {
      label: "过期时间",
      prop: "expiretime",
      search: true,
    },
    {
      label: "成团时间",
      prop: "finishtime",
      search: true,
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
      label: "状态:invalid=-1 已过期,ing= 1 进行中,finish=2 已成团,finish-fictitious=3 虚拟成团",
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

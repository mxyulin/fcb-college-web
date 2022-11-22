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
      label: "商品",
      prop: "goodsId",
      display: false,
      hide: true,
    },
    {
      label: "订单",
      prop: "orderId",
      display: false,
      hide: true,
    },
    {
      label: "订单商品",
      prop: "orderItemId",
      display: false,
      hide: true,
    },
    {
      label: "用户名称",
      prop: "userId",
      search: true,
    },
    {
      label: "评价星级",
      prop: "level",
      search: true,
    },
    {
      label: "评价内容",
      prop: "content",
    },
    {
      label: "评价图片",
      prop: "images",
      display: false,
      hide: true,
    },
    {
      label: "评论状态",
      prop: "status",
    },
    {
      label: "管理员 id",
      prop: "adminId",
      display: false,
    },
    {
      label: "回复内容",
      prop: "replyContent",
    },
    {
      label: "回复时间",
      prop: "replytime",
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
      label: "是否已删除",
      prop: "isDeleted",
      display: false,
      hide: true,
    },
  ]
}

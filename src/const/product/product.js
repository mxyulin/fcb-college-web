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
    },
    {
      label: "商品类型:normal=实体商品,virtual=虚拟商品",
      prop: "type",
      hide: true,
      search: true,
    },
    {
      label: "标题",
      prop: "title",
      search: true,
    },
    {
      label: "副标题",
      prop: "subtitle",
    },
    {
      label: "商品状态: 0:hidden=隐藏商品,1:up=上架,2:down=下架",
      prop: "status",
      search: true,
    },
    {
      label: "排序(从大到小)",
      prop: "weight",
      display: false,
      hide: true,
    },
    {
      label: "所属分类",
      prop: "categoryIds",
      hide: true,
    },
    {
      label: "商品主图",
      prop: "image",
    },
    {
      label: "轮播图",
      prop: "images",
    },
    {
      label: "参数详情",
      prop: "params",
      display: false,
      hide: true,
    },
    {
      label: "图文详情",
      prop: "content",
      hide: true,
    },
    {
      label: "价格",
      prop: "price",
    },
    {
      label: "原价",
      prop: "originalPrice",
    },
    {
      label: "是否多规格",
      prop: "isSku",
      hide: true,
    },
    {
      label: "收藏人数",
      prop: "likes",
      display: false,
      hide: true,
    },
    {
      label: "浏览人数",
      prop: "views",
      display: false,
      hide: true,
    },
    {
      label: "销量",
      prop: "sales",
      display: false,
      hide: true,
    },
    {
      label: "显示销量",
      prop: "showSales",
    },
    {
      label: "服务标签",
      prop: "serviceIds",
    },
    {
      label: "发货方式:express=物流快递,selfetch=用户自提,store=商家配送,autosend=自动发货",
      prop: "dispatchType",
    },
    {
      label: "发货模板",
      prop: "dispatchIds",
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
    },
  ]
}

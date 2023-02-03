export default {
  size: 'small',
  expand: false,
  index: false,
  border: true,
  viewBtn: false,
  addBtn: false,
  editBtn:false,
  delBtn:false,
  selection: true,
  column: [
    {
      label: "主键",
      prop: "id",
      hide: true,
    },
    {
      label: "商品类型",
      prop: "type",
      hide: true,
      search: false,
    },

    {
      label: "封面",
      prop: "image", 
    },
    {
      label: "名称",
      prop: "title",
      search: false,
      span:12,
    },
    {
      label: "副标题",
      hide: true,
      prop: "subtitle",
    },
    {
      label: "商品状态",
      prop: "status",
      hide: true,
      search: false,
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
      label: "轮播图",
      prop: "images",
      hide: true,
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
      hide: true,
    },
    {
      label: "规格",
      prop: "isSku", 
    },
    {
      label: "人气",
      prop: "likes",
      display: false 
    },
    {
      label: "浏览人数",
      prop: "views",
      hide: true,
    },
    {
      label: "销量",
      prop: "sales",
      display: false,
      
    },
    {
      label: "显示销量",
      prop: "showSales",
      hide: true,
    },
    {
      label: "服务标签",
      prop: "serviceIds",
      hide: true,
    },
    {
      label: "发货方式",
      prop: "dispatchType",
      hide: true,
    },
    {
      label: "发货模板",
      prop: "dispatchIds",
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
    },
  ]
}

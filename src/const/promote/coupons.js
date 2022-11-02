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
      label: "名称",
      prop: "name",
      search: true,
    },
    {
      label: "类型:cash=代金券,discount=折扣券",
      prop: "type",
      search: true,
    },
    {
      label: "适用商品",
      prop: "goodsIds",
      display: false,
      hide: true,
    },
    {
      label: "券面额",
      prop: "amount",
      display: false,
      hide: true,
    },
    {
      label: "消费门槛",
      prop: "enough",
      display: false,
      hide: true,
    },
    {
      label: "库存",
      prop: "stock",
    },
    {
      label: "每人限制",
      prop: "limit",
    },
    {
      label: "领取周期",
      prop: "gettime",
    },
    {
      label: "有效期",
      prop: "usetime",
    },
    {
      label: "描述",
      prop: "description",
      hide: true,
    },
    {
      label: "",
      prop: "usetimestart",
    },
    {
      label: "",
      prop: "usetimeend",
    },
    {
      label: "",
      prop: "gettimestart",
    },
    {
      label: "",
      prop: "gettimeend",
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

export default {
  height:'auto',
  calcHeight: 30,
  tip: false,
  searchShow: true,
  searchMenuSpan: 6,
  border: true,
  index: false,
  viewBtn: true,
  selection: true,
  dialogClickModal: false,
  column: [
    {
      label: "主键",
      prop: "id",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "封面",
      prop: "picUrls",
      type: "input",
      width: 130,//列宽度
    },
    {
      label: "文章标题",
      prop: "title",
      type: "input",
      minWidth: 'auto',//列最小宽度
    },
    {
      label: "状态",
      prop: "status",
      type: "input",
      width: 75,//列宽度
    },
    {
      label: "修改人",
      prop: "updateUser",
      type: "input",
      width:100,
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
    },
    {
      label: "修改时间",
      prop: "updateTime",
      type: "input",
      width:100,
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
    },
  ]
}

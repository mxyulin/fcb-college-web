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
    // {
    //   label: "租户ID",
    //   prop: "tenantId",
    //   type: "input",
    //   addDisplay: false,
    //   editDisplay: false,
    //   viewDisplay: false,
    //   hide: true,
    // },
    // category: "2",
    // title: "文章标题",
    // titleType: "1",   //文章标题:1 = 单标题，2= 多标题
    // otherTitle: "",  
    // content: "",    //富文本
    // coverType: "1",   //图片类型判断0代表无图1单图2多图
    // picUrls: "",     
    // copyRight: "原创",
    // author: "作者",
    {
      label: "类型",
      prop: "category",
      type: "input",
      width: 70,//列宽度
      minWidth: 'auto',//列最小宽度
    },
    {
      label: "文章标题",
      prop: "title",
      type: "input",
      minWidth: 'auto',//列最小宽度
    },
      
    {
      label: "状态",
      prop: "state",
      type: "input",
      width: 60,//列宽度
      minWidth: 'auto',//列最小宽度
    },
    
    {
      label: "创建人",
      prop: "createUser",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "创建部门",
      prop: "createDept",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "创建时间",
      prop: "createTime",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "修改人",
      prop: "updateUser",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "修改时间",
      prop: "updateTime",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
  ]
}

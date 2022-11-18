export default {
  height:'auto',
  calcHeight: 30,
  tip: false,
  searchShow: true,
  searchMenuSpan: 6,
  border: true,
  index: true,
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
      label: "学生id",
      prop: "owerId",
      type: "input",
    },
    {
      label: "题目id,多个用,分开",
      prop: "questionId",
      type: "input",
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
    {
      label: "状态",
      prop: "status",
      type: "input",
    },
    {
      label: "是否已删除",
      prop: "isDeleted",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
  ]
}

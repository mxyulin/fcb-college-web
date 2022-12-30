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
      label: "租户ID",
      prop: "tenantId",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "计费方式:number=件数,weight=重量",
      prop: "type",
      type: "input",
    },
    {
      label: "权重",
      prop: "weigh",
      type: "input",
    },
    {
      label: "首(重/件)数",
      prop: "firstNum",
      type: "input",
    },
    {
      label: "首(重/件)",
      prop: "firstPrice",
      type: "input",
    },
    {
      label: "续(重/件)数",
      prop: "additionalNum",
      type: "input",
    },
    {
      label: "续(重/件)",
      prop: "additionalPrice",
      type: "input",
    },
    {
      label: "省份",
      prop: "provinceIds",
      type: "input",
    },
    {
      label: "市级",
      prop: "cityIds",
      type: "input",
    },
    {
      label: "区域",
      prop: "areaIds",
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
      label: "状态 normal=1, hidden=0 ",
      prop: "status",
      type: "input",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
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

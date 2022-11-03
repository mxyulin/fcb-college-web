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
      label: "模板名称",
      prop: "name",
    },
    {
      label: "页面分类:shop=商城,custom=自定义,preview=临时预览",
      prop: "type",
    },
    {
      label: "图片",
      prop: "image",
    },
    {
      label: "备注",
      prop: "memo",
    },
    {
      label: "状态 normal=0, hidden=1 ",
      prop: "status",
    },
    {
      label: "适用平台:H5=H5,wxOfficialAccount=微信公众号网页,wxMiniProgram=微信小程序,App=App,preview=预览",
      prop: "platform",
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

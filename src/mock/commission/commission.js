const Mock = require('mockjs') 
const responseData = 
{
  "code": 200, 
  "success": true, 
  "data": {
      "records": [
          {
              "id": "3", 
              "createUser": "1123598813738675201", 
              "createDept": "1", 
              "createTime": "2018-12-28 11:10:28", 
              "updateUser": "1123598813738675201", 
              "updateTime": "2018-12-28 11:10:28", 
              "status": 1, 
              "isDeleted": 0, 
              "tenantId": "000000", 
              "name": "经典全品类", 
              "type": "shop", 
              "image": "http://file.shopro.top/uploads/20210527/4b4b489beed3ce4ee6f913c9b8450581.png", 
              "memo": "经典全品类电商平台", 
              "platform": "H5,wxOfficialAccount,wxMiniProgram,App"
          }, 
          {
              "id": "4", 
              "createUser": "1123598813738675201", 
              "createDept": "1", 
              "createTime": "2018-12-28 11:10:28", 
              "updateUser": "1123598813738675201", 
              "updateTime": "2018-12-28 11:10:28", 
              "status": 1, 
              "isDeleted": 0, 
              "tenantId": "000000", 
              "name": "全品类团购", 
              "type": "shop", 
              "image": "http://file.shopro.top/uploads/20210527/656fbd5f39bee1293cd83e3db9895fc3.png", 
              "memo": "社区团购等全品类站点", 
              "platform": "H5,wxOfficialAccount,wxMiniProgram,App"
          }, 
          {
              "id": "8", 
              "createUser": "1123598813738675201", 
              "createDept": "1", 
              "createTime": "2018-12-28 11:10:28", 
              "updateUser": "1123598813738675201", 
              "updateTime": "2018-12-28 11:10:28", 
              "status": 1, 
              "isDeleted": 0, 
              "tenantId": "000000", 
              "name": "临时预览 全品类团购", 
              "type": "preview", 
              "image": "", 
              "memo": "2022年11月01日 10:10:08 创建", 
              "platform": "H5,wxOfficialAccount,wxMiniProgram,App"
          }
      ], 
      "total": 3, 
      "size": 10, 
      "current": 1, 
      "orders": [ ], 
      "optimizeCountSql": true, 
      "searchCount": true, 
      "countId": "", 
      "maxLimit": -1, 
      "pages": 1
  }, 
  "msg": "操作成功"
}
// const shu = [
//     {
//         image:'http://file.shopro.top/uploads/20210527/4b4b489beed3ce4ee6f913c9b8450581.png',
//         name:'金典全品类',
//         memo:'经典全品类电商平台'
//     },{
//         image:'http://file.shopro.top/uploads/20210527/656fbd5f39bee1293cd83e3db9895fc3.png',
//         name:'全品类团购',
//         memo:'社区团购等全品类站点'
//     },{
//         image:'http://file.shopro.top/uploads/20210527/27a00b345f148391a21da4ed2e5820d3.png',
//         name:'生鲜站',
//         memo:'适用于社区生鲜电商'
//     },{
//         image:'http://file.shopro.top/uploads/20210527/119b27f6a2af61e28ff1507749d22b24.png',
//         name:'品牌站',
//         memo:'适用于独立品牌类电商'
//     },{
//         image:'http://file.shopro.top/uploads/20210527/bad68ac7a64fb6b514b123e7c4a461f8.png',
//         name:'亲子母婴',
//         memo:'适用于亲子母婴类电商'
//     }]
export default ({mock}) => {
if (!mock) return;
Mock.mock('/api/commissionAgent/commissionAgent/list', 'get', () => {
    
    return {
        ss:有毛病,
        data: responseData
    }
 })
}